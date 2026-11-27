// Loads the hand-written search titles and descriptions in
// scripts/seo-copy/tools-*.json into Tool.seoTitle / Tool.seoDescription.
//
//   npx tsx --env-file=.env.local scripts/seo-copy/apply-tools.ts          # validate only
//   npx tsx --env-file=.env.local scripts/seo-copy/apply-tools.ts --write
//
// Rules (see the guide these were written to): titles 35-60 characters,
// start with the tool name (or "What Is <name>?"), no "Review"/"Best"/site
// name/dashes/pipes, unique across the site; descriptions 120-155 characters.

import { readdirSync, readFileSync } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

type Row = { slug: string; seoTitle: string; seoDescription: string };

const prisma = new PrismaClient();
const write = process.argv.includes("--write");

// Tools whose listed name starts with "Best", which titles avoid; they lead
// with their brand or domain instead.
const LEAD_EXCEPTIONS = new Set(["best-ai-image-generator", "best-jobfinder"]);

function problems(r: Row, name: string | undefined): string[] {
  const out: string[] = [];
  const t = r.seoTitle ?? "";
  const d = r.seoDescription ?? "";
  if (t.length < 35 || t.length > 60) out.push(`title ${t.length} chars`);
  if (d.length < 120 || d.length > 155) out.push(`description ${d.length} chars`);
  if (/[—–|]| - /.test(t) || /[—–]/.test(d)) out.push("dash or pipe");
  if (/\b(review|best|#1)\b|ai birdview/i.test(t.replace(/\b(contract|code|literature|peer|resume|cv|document|essay) reviews?\b/gi, ""))) out.push("banned word in title");
  if (name && !LEAD_EXCEPTIONS.has(r.slug)) {
    // Names like "Makify AI - AI Creative Platform" lead with their first part.
    const n = name.trim().split(" - ")[0].trim().toLowerCase();
    const lead = t.toLowerCase();
    if (!lead.startsWith(n) && !lead.startsWith(`what is ${n}`)) out.push(`title doesn't start with "${name}"`);
  }
  return out;
}

async function main() {
  const dir = __dirname;
  const files = readdirSync(dir).filter((f) => /^tools-\d+\.json$/.test(f)).sort();
  const rows: Row[] = files.flatMap((f) => JSON.parse(readFileSync(path.join(dir, f), "utf8")) as Row[]);
  const tools = await prisma.tool.findMany({ where: { published: true }, select: { id: true, slug: true, name: true } });
  const bySlug = new Map(tools.map((t) => [t.slug, t]));

  let errors = 0;
  const seenSlug = new Set<string>();
  const seenTitle = new Map<string, string>();
  for (const r of rows) {
    const tool = bySlug.get(r.slug);
    const p = problems(r, tool?.name);
    if (!tool) p.push("unknown or unpublished slug");
    if (seenSlug.has(r.slug)) p.push("duplicate slug");
    seenSlug.add(r.slug);
    const key = r.seoTitle?.toLowerCase();
    if (key && seenTitle.has(key)) p.push(`same title as ${seenTitle.get(key)}`);
    if (key) seenTitle.set(key, r.slug);
    if (p.length) {
      errors += p.length;
      console.log(`✗ ${r.slug}: ${p.join(", ")}  [${r.seoTitle}]`);
    }
  }
  const missing = tools.filter((t) => !seenSlug.has(t.slug));
  console.log(`${files.length} files, ${rows.length} rows, ${errors} problem(s), ${missing.length} published tools without copy`);
  if (missing.length && missing.length <= 40) console.log("  missing:", missing.map((t) => t.slug).join(", "));
  if (errors) process.exit(1);
  if (!write) return;

  let n = 0;
  for (const r of rows) {
    await prisma.tool.update({ where: { slug: r.slug }, data: { seoTitle: r.seoTitle, seoDescription: r.seoDescription } });
    if (++n % 200 === 0) console.log(`  ${n}/${rows.length}`);
  }
  console.log(`updated ${n} tools`);
}

main().finally(() => prisma.$disconnect());
