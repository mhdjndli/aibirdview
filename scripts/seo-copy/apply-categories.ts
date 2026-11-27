// Writes the category descriptions in categories.json (shown as each category
// page's intro and meta description).
//
//   npx tsx --env-file=.env.local scripts/seo-copy/apply-categories.ts          # check only
//   npx tsx --env-file=.env.local scripts/seo-copy/apply-categories.ts --write

import { readFileSync } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const write = process.argv.includes("--write");

async function main() {
  const rows: { slug: string; description: string }[] = JSON.parse(readFileSync(path.join(__dirname, "categories.json"), "utf8"));
  const cats = await prisma.category.findMany({ select: { slug: true, description: true } });
  let bad = 0;
  for (const r of rows) {
    const cat = cats.find((c) => c.slug === r.slug);
    if (!cat) { bad++; console.log(`✗ ${r.slug}: unknown category`); continue; }
    if (r.description.length > 155 || r.description.length < 110 || /[—–]/.test(r.description)) { bad++; console.log(`✗ ${r.slug}: ${r.description.length} chars`); }
    console.log(`${r.slug}\n  ${cat.description}\n  → ${r.description}`);
  }
  if (bad) process.exit(1);
  if (!write) return;
  for (const r of rows) await prisma.category.update({ where: { slug: r.slug }, data: { description: r.description } });
  console.log(`updated ${rows.length} categories`);
}

main().finally(() => prisma.$disconnect());
