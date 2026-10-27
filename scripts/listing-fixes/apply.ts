// Applies listing corrections from scripts/listing-fixes/fix-*.json and
// unpublishes the tools in unpublish.json.
//
//   npx tsx --env-file=.env.local scripts/listing-fixes/apply.ts                       # validate only
//   npx tsx --env-file=.env.local scripts/listing-fixes/apply.ts --write <backup.json>  # apply
//
// --write first saves every touched tool's current values to <backup.json>.

import { readdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { PrismaClient, type Pricing } from "@prisma/client";

type Changes = {
  name?: string;
  url?: string;
  tagline?: string;
  description?: string;
  longDescription?: string;
  pricing?: Pricing;
  priceFrom?: string | null;
  features?: string[];
  pros?: string[];
  cons?: string[];
  seoTitle?: string;
  seoDescription?: string;
  metaKeywords?: string;
  moreContext?: string;
};
type Fix = { slug: string; changes: Changes; note?: string };
type Unpublish = { slug: string; reason: string };

const SCALARS = ["name", "url", "tagline", "description", "longDescription", "pricing", "priceFrom", "seoTitle", "seoDescription", "metaKeywords", "moreContext"] as const;
const LISTS = ["features", "pros", "cons"] as const;
const PRICING = new Set(["FREE", "FREEMIUM", "FREE_TRIAL", "PAID"]);

const prisma = new PrismaClient();
const writeIdx = process.argv.indexOf("--write");
const backupPath = writeIdx > -1 ? process.argv[writeIdx + 1] : undefined;

function problemsFor(f: Fix): string[] {
  const out: string[] = [];
  const c = f.changes ?? {};
  for (const k of Object.keys(c))
    if (!(SCALARS as readonly string[]).includes(k) && !(LISTS as readonly string[]).includes(k)) out.push(`unknown field ${k}`);
  const text = JSON.stringify(c);
  if (/[—–]/.test(text)) out.push("contains an em/en dash");
  if (c.tagline && c.tagline.length > 200) out.push(`tagline ${c.tagline.length} chars`);
  if (c.description && c.description.length > 2000) out.push("description too long");
  if (c.seoDescription && c.seoDescription.length > 320) out.push(`seoDescription ${c.seoDescription.length} chars`);
  if (c.seoTitle && c.seoTitle.length > 140) out.push(`seoTitle ${c.seoTitle.length} chars`);
  if (c.pricing && !PRICING.has(c.pricing)) out.push(`bad pricing ${c.pricing}`);
  if (c.url) {
    try {
      new URL(c.url);
    } catch {
      out.push(`bad url ${c.url}`);
    }
  }
  for (const k of LISTS) if (c[k] && (!Array.isArray(c[k]) || c[k]!.some((s) => typeof s !== "string" || !s.trim()))) out.push(`bad ${k}`);
  for (const k of ["name", "tagline", "description", "longDescription"] as const) if (k in c && !c[k]?.trim()) out.push(`empty ${k}`);
  return out;
}

async function main() {
  const dir = __dirname;
  const fixes: Fix[] = readdirSync(dir)
    .filter((f) => /^fix-\d+\.json$/.test(f))
    .sort()
    .flatMap((f) => JSON.parse(readFileSync(path.join(dir, f), "utf8")) as Fix[])
    .filter((f) => f.changes && Object.keys(f.changes).length > 0);
  const unpublish: Unpublish[] = JSON.parse(readFileSync(path.join(dir, "unpublish.json"), "utf8"));

  const tools = await prisma.tool.findMany({ select: { slug: true, published: true } });
  const known = new Map(tools.map((t) => [t.slug, t]));
  let errors = 0;
  const seen = new Set<string>();
  for (const f of fixes) {
    const problems = problemsFor(f);
    if (!known.has(f.slug)) problems.push("unknown slug");
    if (seen.has(f.slug)) problems.push("duplicate slug");
    seen.add(f.slug);
    if (problems.length) {
      errors += problems.length;
      console.log(`✗ ${f.slug}: ${problems.join(", ")}`);
    }
  }
  for (const u of unpublish) {
    if (!known.has(u.slug)) {
      errors++;
      console.log(`✗ unpublish ${u.slug}: unknown slug`);
    }
  }
  console.log(`${fixes.length} listings to update, ${unpublish.length} to unpublish`);
  if (errors) {
    console.error(`\n${errors} problem(s); nothing written.`);
    process.exit(1);
  }
  if (!backupPath) {
    console.log("Validation passed. Re-run with --write <backup.json> to apply.");
    return;
  }

  const touched = [...new Set([...fixes.map((f) => f.slug), ...unpublish.map((u) => u.slug)])];
  const before = await prisma.tool.findMany({
    where: { slug: { in: touched } },
    include: { features: true, pros: true, cons: true },
  });
  writeFileSync(backupPath, JSON.stringify(before, null, 1));
  console.log(`backup of ${before.length} tools written to ${backupPath}`);

  for (const f of fixes) {
    const c = f.changes;
    const data: Record<string, unknown> = {};
    for (const k of SCALARS) if (k in c) data[k] = typeof c[k] === "string" ? (c[k] as string).trim() : c[k];
    const tool = await prisma.tool.update({ where: { slug: f.slug }, data, select: { id: true } });
    const lists = { features: prisma.toolFeature, pros: prisma.toolPro, cons: prisma.toolCon } as const;
    for (const k of LISTS) {
      const items = c[k];
      if (!items) continue;
      // Each delegate has the same shape; the casts keep TypeScript from
      // trying to unify three distinct model types.
      const model = lists[k] as unknown as {
        deleteMany: (a: object) => Promise<unknown>;
        createMany: (a: object) => Promise<unknown>;
      };
      await model.deleteMany({ where: { toolId: tool.id } });
      await model.createMany({ data: items.map((text, order) => ({ toolId: tool.id, text: text.trim(), order })) });
    }
    console.log(`updated ${f.slug}: ${f.note ?? Object.keys(c).join(", ")}`);
  }
  for (const u of unpublish) {
    await prisma.tool.update({ where: { slug: u.slug }, data: { published: false } });
    console.log(`unpublished ${u.slug}: ${u.reason}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
