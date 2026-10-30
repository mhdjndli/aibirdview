// Renders branded cover images for blog posts from the logos of the tools
// each post covers, then (optionally) uploads them as post thumbnails.
//
//   npx tsx --env-file=.env.local scripts/blog/covers.ts <dir>            # render <dir>/<slug>.jpg
//   npx tsx --env-file=.env.local scripts/blog/covers.ts <dir> --upload   # set as thumbnails
//   add --force to replace thumbnails that are already set
//
// Tools come from the post's first { logos } block, or else its first
// /tools/<slug> links. "X vs Y" posts get a head-to-head layout, posts about
// one tool (reviews and how-to tutorials) a single large logo, and everything
// else a row of logos.
// Rendering uses headless Google Chrome and macOS `sips`.

import { execFileSync } from "child_process";
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import type { Post } from "./types";
import { internalLinks } from "./render";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const W = 1600;
const H = 1000;
const prisma = new PrismaClient();

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Reviews, and tutorials whose logo row names a single tool.
const isSingle = (post: Post) => {
  if (/review/i.test(post.slug)) return true;
  const block = post.body.find((b) => "logos" in b) as { logos: string[] } | undefined;
  return /^how-to-/i.test(post.slug) && block?.logos.length === 1;
};

function toolSlugs(post: Post): string[] {
  const heading = post.title.split(":")[0];
  // "A vs B vs C" compares three tools; a review covers one.
  const limit = /\bvs\b/i.test(heading) ? heading.split(/\bvs\b/i).length : isSingle(post) ? 1 : 6;
  const block = post.body.find((b) => "logos" in b) as { logos: string[] } | undefined;
  if (block) return block.logos.slice(0, limit);
  const seen: string[] = [];
  for (const href of internalLinks(post.body)) {
    const m = href.match(/^\/tools\/([^/?#]+)/);
    if (m && !seen.includes(m[1])) seen.push(m[1]);
  }
  return seen.slice(0, limit);
}

type Logo = { name: string; slug: string; src: string | null };

// Logos drawn in white on a transparent background vanish on the white tile.
const DARK_TILES = new Set(["fathom"]);

function tile(l: Logo, size: number) {
  const inner = l.src
    ? `<img src="${l.src}" style="width:${size * 0.62}px;height:${size * 0.62}px;object-fit:contain;border-radius:${size * 0.12}px">`
    : `<span style="font-size:${size * 0.42}px;font-weight:700;color:#0b0b0d">${esc(l.name[0])}</span>`;
  const bg = DARK_TILES.has(l.slug) ? "background:#0b0b0d;" : "";
  return `<div class="tile" style="${bg}width:${size}px;height:${size}px;border-radius:${size * 0.24}px">${inner}</div>`;
}

function html(post: Post, logos: Logo[]) {
  const [heading, ...rest] = post.title.split(":");
  const sub = rest.join(":").trim();
  const isVs = /\bvs\b/i.test(heading) && logos.length >= 2 && logos.length <= 4;
  const single = !isVs && logos.length >= 1 && isSingle(post);

  let art = "";
  if (isVs) {
    const size = logos.length === 2 ? 230 : logos.length === 3 ? 200 : 170;
    art = logos
      .map((l, i) => `${i ? '<div class="vs">VS</div>' : ""}<div class="col">${tile(l, size)}<div class="name">${esc(l.name)}</div></div>`)
      .join("");
  } else if (single) {
    art = `<div class="col">${tile(logos[0], 260)}</div>`;
  } else {
    art = logos.slice(0, 6).map((l) => tile(l, 150)).join("");
  }

  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;overflow:hidden;font-family:Inter,-apple-system,Helvetica,Arial,sans-serif;
    background:#0b0b0d;color:#fff;position:relative}
  .glow{position:absolute;inset:0;background:
    radial-gradient(55% 60% at 18% 22%, rgba(141,196,116,.55), transparent 60%),
    radial-gradient(50% 55% at 88% 85%, rgba(116,178,92,.40), transparent 60%),
    radial-gradient(40% 40% at 60% 10%, rgba(200,230,168,.18), transparent 60%)}
  .grid{position:absolute;inset:0;opacity:.10;background-image:
    linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px);
    background-size:64px 64px;mask-image:radial-gradient(70% 70% at 50% 45%,#000,transparent)}
  .wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:56px;padding:0 120px}
  .art{display:flex;align-items:center;justify-content:center;gap:36px}
  .col{display:flex;flex-direction:column;align-items:center;gap:18px}
  .tile{background:#fff;display:flex;align-items:center;justify-content:center;
    box-shadow:0 30px 60px -20px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.25)}
  .name{font-size:30px;font-weight:600;letter-spacing:-.02em;color:#e3f3d3}
  .vs{width:84px;height:84px;border-radius:50%;background:#8dc474;color:#0b0b0d;font-weight:800;font-size:30px;
    display:flex;align-items:center;justify-content:center;margin-bottom:48px;box-shadow:0 0 0 10px rgba(141,196,116,.18)}
  h1{font-size:${heading.length > 42 ? 58 : 68}px;line-height:1.05;font-weight:700;letter-spacing:-.035em;text-align:center;max-width:1300px}
  .sub{margin-top:14px;font-size:28px;color:#c8e6a8;text-align:center;font-weight:500}
  .brand{position:absolute;left:56px;bottom:44px;display:flex;align-items:center;gap:12px;font-size:24px;font-weight:600;color:#fff;opacity:.9}
  .dot{width:14px;height:14px;border-radius:50%;background:#8dc474}
</style></head><body>
<div class="glow"></div><div class="grid"></div>
<div class="wrap"><div class="art">${art}</div>
<div><h1>${esc(heading.trim())}</h1>${sub ? `<div class="sub">${esc(sub)}</div>` : ""}</div></div>
<div class="brand"><span class="dot"></span>AI BirdView</div>
</body></html>`;
}

async function loadPosts(): Promise<Post[]> {
  const dir = path.join(__dirname, "posts");
  const posts: Post[] = [];
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".ts")).sort())
    posts.push((await import(path.join(dir, f))).default as Post);
  return posts;
}

async function main() {
  const out = process.argv[2];
  if (!out) throw new Error("usage: covers.ts <dir> [--upload] [--force]");
  mkdirSync(out, { recursive: true });
  const force = process.argv.includes("--force");
  const posts = await loadPosts();
  const existing = new Map(
    (await prisma.blogPost.findMany({ select: { slug: true, thumbnailMediaId: true } })).map((p) => [p.slug, p.thumbnailMediaId])
  );

  if (process.argv.includes("--upload")) {
    for (const post of posts) {
      const file = path.join(out, `${post.slug}.jpg`);
      if (!existsSync(file) || !existing.has(post.slug)) continue;
      if (existing.get(post.slug) && !force) continue;
      const data = readFileSync(file);
      const media = await prisma.media.create({
        data: { filename: `blog-cover-${post.slug}.jpg`, contentType: "image/jpeg", size: data.length, width: W, height: H, altText: post.title, data },
      });
      await prisma.blogPost.update({ where: { slug: post.slug }, data: { thumbnailMediaId: media.id } });
      console.log(`cover set: ${post.slug}`);
    }
    return;
  }

  for (const post of posts) {
    if (existing.get(post.slug) && !force) continue;
    const jpg = path.join(out, `${post.slug}.jpg`);
    if (existsSync(jpg) && !force) continue;
    const slugs = toolSlugs(post).slice(0, 6);
    const tools = await prisma.tool.findMany({ where: { slug: { in: slugs } }, select: { slug: true, name: true, logo: { select: { data: true, contentType: true } } } });
    const logos: Logo[] = slugs
      .map((s) => tools.find((t) => t.slug === s))
      .filter((t): t is NonNullable<typeof t> => Boolean(t))
      .map((t) => ({
        name: t.name,
        slug: t.slug,
        src: t.logo ? `data:${t.logo.contentType};base64,${Buffer.from(t.logo.data).toString("base64")}` : null,
      }));
    const htmlFile = path.join(out, `${post.slug}.html`);
    const png = path.join(out, `${post.slug}.png`);
    writeFileSync(htmlFile, html(post, logos));
    try {
      // Headless Chrome occasionally hangs; give up on that cover rather than the run.
      execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--window-size=${W},${H}`, "--virtual-time-budget=4000", `--screenshot=${png}`, `file://${htmlFile}`], { stdio: "ignore", timeout: 60000 });
      execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "85", png, "--out", jpg], { stdio: "ignore" });
      console.log(`rendered ${post.slug} (${logos.length} logos)`);
    } catch {
      console.log(`FAILED ${post.slug}; re-run to retry`);
    } finally {
      if (existsSync(png)) rmSync(png);
      rmSync(htmlFile);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
