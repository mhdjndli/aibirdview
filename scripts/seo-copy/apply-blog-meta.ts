// Applies new search titles and descriptions for blog posts, in both the post
// sources (scripts/blog/posts/*.ts) and the database, without touching the
// body or the post's updatedAt (a meta-only change isn't a content update).
//
//   npx tsx --env-file=.env.local scripts/seo-copy/apply-blog-meta.ts          # check only
//   npx tsx --env-file=.env.local scripts/seo-copy/apply-blog-meta.ts --write
//
// Also drops month names from descriptions ("for October 2026" becomes
// "for 2026"), which read as stale a month later.

import { readFileSync, readdirSync, writeFileSync } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

type Meta = { slug: string; seoTitle?: string; seoDescription?: string };

const prisma = new PrismaClient();
const write = process.argv.includes("--write");
const postsDir = path.join(__dirname, "..", "blog", "posts");
const MONTH = /\b(?:for |as of |in )?(January|February|March|April|May|June|July|August|September|October|November|December) (20\d\d)\b/;

function problems(m: Meta): string[] {
  const out: string[] = [];
  if (m.seoTitle && (m.seoTitle.length > 60 || m.seoTitle.length < 30)) out.push(`title ${m.seoTitle.length} chars`);
  if (m.seoDescription && (m.seoDescription.length > 155 || m.seoDescription.length < 110))
    out.push(`description ${m.seoDescription.length} chars`);
  for (const s of [m.seoTitle, m.seoDescription]) if (s && /[—–]| - |"/.test(s)) out.push(`bad character in "${s}"`);
  return out;
}

function setField(src: string, field: "seoTitle" | "seoDescription", value: string): string {
  const re = new RegExp(`(${field}:\\s*)"((?:[^"\\\\]|\\\\.)*)"`);
  if (!re.test(src)) throw new Error(`no ${field} in source`);
  return src.replace(re, (_, lead) => `${lead}${JSON.stringify(value)}`);
}

async function main() {
  const wanted: Meta[] = JSON.parse(readFileSync(path.join(__dirname, "blog-meta.json"), "utf8"));
  const bySlug = new Map(wanted.map((m) => [m.slug, m]));
  const posts = await prisma.blogPost.findMany({ select: { id: true, slug: true, seoTitle: true, seoDescription: true, updatedAt: true } });
  const files = new Map(readdirSync(postsDir).filter((f) => f.endsWith(".ts")).map((f) => [f.replace(/\.ts$/, ""), path.join(postsDir, f)]));

  const changes: { post: (typeof posts)[number]; meta: Meta }[] = [];
  let bad = 0;
  for (const post of posts) {
    const meta: Meta = { slug: post.slug, ...bySlug.get(post.slug) };
    const desc = meta.seoDescription ?? post.seoDescription ?? "";
    if (MONTH.test(desc)) {
      meta.seoDescription = desc
        .replace(new RegExp(MONTH.source, "g"), (match) => match.replace(/[A-Z][a-z]+ (?=20\d\d)/, ""))
        .replace(/\s+/g, " ");
    }
    if (!meta.seoTitle && !meta.seoDescription) continue;
    const p = problems(meta);
    if (p.length) { bad++; console.log(`✗ ${post.slug}: ${p.join("; ")}`); }
    if (!files.has(post.slug)) { bad++; console.log(`✗ ${post.slug}: no source file`); }
    changes.push({ post, meta });
  }
  for (const m of wanted) if (!posts.some((p) => p.slug === m.slug)) { bad++; console.log(`✗ ${m.slug}: unknown slug`); }

  for (const { post, meta } of changes) {
    if (meta.seoTitle && meta.seoTitle !== post.seoTitle) console.log(`${post.slug}\n  T ${post.seoTitle}\n  → ${meta.seoTitle}`);
    if (meta.seoDescription && meta.seoDescription !== post.seoDescription) console.log(`${post.slug}\n  D ${post.seoDescription}\n  → ${meta.seoDescription}`);
  }
  console.log(`\n${changes.length} posts to update, ${bad} problem(s)`);
  if (bad) process.exit(1);
  if (!write) return;

  for (const { post, meta } of changes) {
    const file = files.get(post.slug)!;
    let src = readFileSync(file, "utf8");
    if (meta.seoTitle) src = setField(src, "seoTitle", meta.seoTitle);
    if (meta.seoDescription) src = setField(src, "seoDescription", meta.seoDescription);
    writeFileSync(file, src);
    await prisma.blogPost.update({
      where: { id: post.id },
      data: {
        ...(meta.seoTitle && { seoTitle: meta.seoTitle }),
        ...(meta.seoDescription && { seoDescription: meta.seoDescription }),
        updatedAt: post.updatedAt,
      },
    });
  }
  console.log(`updated ${changes.length} posts`);
}

main().finally(() => prisma.$disconnect());
