// Upserts every post in scripts/blog/posts into the database.
//
//   npx tsx scripts/blog/import.ts            # validate only (no writes)
//   npx tsx scripts/blog/import.ts --write    # upsert as drafts (unpublished)
//   npx tsx scripts/blog/import.ts --publish  # upsert and publish
//
// Re-running is safe: posts are matched by slug, and an already-published
// post keeps its original publishedAt.

import { readdirSync } from "fs";
import path from "path";
import readingTime from "reading-time";
import { PrismaClient } from "@prisma/client";
import type { Post } from "./types";
import { internalLinks, renderHtml, renderJson, wordCount } from "./render";

const prisma = new PrismaClient();
const write = process.argv.includes("--write") || process.argv.includes("--publish");
const publish = process.argv.includes("--publish");

async function loadPosts(): Promise<Post[]> {
  const dir = path.join(__dirname, "posts");
  const files = readdirSync(dir).filter((f) => f.endsWith(".ts")).sort();
  const posts: Post[] = [];
  for (const f of files) {
    const mod = await import(path.join(dir, f));
    posts.push(mod.default as Post);
  }
  return posts;
}

async function main() {
  const posts = await loadPosts();
  const [tools, cats, admin] = await Promise.all([
    prisma.tool.findMany({ where: { published: true }, select: { slug: true } }),
    prisma.blogCategory.findMany({ select: { id: true, slug: true } }),
    prisma.user.findFirst({ where: { role: "ADMIN" }, select: { id: true } }),
  ]);
  const toolSlugs = new Set(tools.map((t) => t.slug));
  const catBySlug = new Map(cats.map((c) => [c.slug, c.id]));
  const staticPaths = new Set(["/", "/tools", "/categories", "/blog", "/submit", "/about"]);
  const categorySlugs = new Set(["writing", "image", "video", "audio", "code", "productivity", "marketing", "research"]);

  let errors = 0;
  const seen = new Set<string>();
  for (const post of posts) {
    const problems: string[] = [];
    if (seen.has(post.slug)) problems.push("duplicate slug");
    seen.add(post.slug);
    if (post.excerpt.length > 500) problems.push(`excerpt ${post.excerpt.length} chars`);
    if (post.seoTitle.length > 70) problems.push(`seoTitle ${post.seoTitle.length} chars`);
    if (post.seoDescription.length > 170) problems.push(`seoDescription ${post.seoDescription.length} chars`);
    for (const c of post.categories) if (!catBySlug.has(c)) problems.push(`unknown category ${c}`);
    for (const href of internalLinks(post.body)) {
      const [, kind, slug] = href.split("/");
      if (kind === "tools" && slug) {
        if (!toolSlugs.has(slug.split(/[?#]/)[0])) problems.push(`missing tool ${href}`);
      } else if (kind === "categories" && slug) {
        if (!categorySlugs.has(slug)) problems.push(`missing category ${href}`);
      } else if (kind === "blog" && slug) {
        if (!posts.some((p) => p.slug === slug)) problems.push(`missing post ${href}`);
      } else if (!staticPaths.has(href)) {
        problems.push(`unknown link ${href}`);
      }
    }
    const words = wordCount(post.body);
    console.log(`${problems.length ? "✗" : "✓"} ${post.slug} — ${words} words, ${internalLinks(post.body).length} internal links`);
    for (const p of problems) console.log(`    ${p}`);
    errors += problems.length;
  }

  if (errors) {
    console.error(`\n${errors} problem(s); nothing written.`);
    process.exit(1);
  }
  if (!write) {
    console.log("\nValidation passed. Re-run with --write (drafts) or --publish.");
    return;
  }

  for (const post of posts) {
    const contentHtml = renderHtml(post.body);
    const readingMinutes = Math.max(1, Math.round(readingTime(contentHtml.replace(/<[^>]+>/g, " ")).minutes));
    const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } });
    const published = publish || Boolean(existing?.published);
    const data = {
      title: post.title,
      excerpt: post.excerpt,
      contentJson: renderJson(post.body) as object,
      contentHtml,
      readingMinutes,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      metaKeywords: post.metaKeywords,
      published,
      publishedAt: published ? existing?.publishedAt ?? new Date() : null,
      authorId: existing?.authorId ?? admin?.id ?? null,
    };
    const saved = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      create: { slug: post.slug, ...data },
      update: data,
    });
    await prisma.blogPostOnCategory.deleteMany({ where: { postId: saved.id } });
    await prisma.blogPostOnCategory.createMany({
      data: post.categories.map((c) => ({ postId: saved.id, categoryId: catBySlug.get(c)! })),
    });
    console.log(`${published ? "published" : "draft"}: /blog/${post.slug}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
