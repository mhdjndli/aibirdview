// Loads the "More context from AI BirdView" sections in scripts/tool-context/*.json
// into Tool.moreContext.
//
//   npx tsx --env-file=.env.local scripts/tool-context/import.ts           # validate only
//   npx tsx --env-file=.env.local scripts/tool-context/import.ts --write   # update tools
//
// Each JSON file is an array of { slug, moreContext, sources, status }.

import { readdirSync, readFileSync } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

type Entry = { slug: string; moreContext: string; sources?: string[]; status?: string };

const prisma = new PrismaClient();
const write = process.argv.includes("--write");

function problemsFor(e: Entry): string[] {
  const out: string[] = [];
  const text = e.moreContext ?? "";
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words < 120 || words > 340) out.push(`${words} words`);
  if (/[—–]/.test(text)) out.push("contains an em/en dash");
  if (/\*\*|\]\(|^#/m.test(text)) out.push("contains markdown");
  if (!text.split("\n").some((l) => l.startsWith("- "))) out.push("no bullet list");
  return out;
}

async function main() {
  const dir = __dirname;
  const entries: Entry[] = readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .flatMap((f) => JSON.parse(readFileSync(path.join(dir, f), "utf8")) as Entry[]);

  const tools = await prisma.tool.findMany({ select: { slug: true } });
  const known = new Set(tools.map((t) => t.slug));
  const seen = new Set<string>();
  let errors = 0;
  for (const e of entries) {
    const problems = problemsFor(e);
    if (!known.has(e.slug)) problems.push("unknown slug");
    if (seen.has(e.slug)) problems.push("duplicate slug");
    seen.add(e.slug);
    if (problems.length) {
      errors += problems.length;
      console.log(`✗ ${e.slug}: ${problems.join(", ")}`);
    }
    if (e.status && e.status !== "ok") console.log(`! ${e.slug}: status ${e.status}`);
  }
  console.log(`${entries.length} entries, ${tools.length - seen.size} tools without context`);

  if (errors) {
    console.error(`\n${errors} problem(s); nothing written.`);
    process.exit(1);
  }
  if (!write) {
    console.log("Validation passed. Re-run with --write to update tools.");
    return;
  }
  for (const e of entries) {
    await prisma.tool.update({ where: { slug: e.slug }, data: { moreContext: e.moreContext.trim() } });
  }
  console.log(`updated ${entries.length} tools`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
