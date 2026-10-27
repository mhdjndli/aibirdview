// Captures homepage screenshots for tools referenced by { shot } blocks that
// have no listing screenshot yet, so they can be reviewed before upload.
//
//   npx tsx --env-file=.env.local scripts/blog/capture-screenshots.ts <dir>           # capture to <dir>
//   npx tsx --env-file=.env.local scripts/blog/capture-screenshots.ts <dir> --upload  # upload <dir>/*.jpg
//
// Captures use headless Google Chrome at 1440x900 and are converted to JPEG
// with macOS `sips`. Delete any capture that looks wrong (cookie walls, error
// pages) before uploading. Uploads become Media rows named blog-shot-<slug>.jpg,
// which scripts/blog/import.ts picks up.

import { execFileSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import type { Post } from "./types";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SHOT_PREFIX = "blog-shot-";
const prisma = new PrismaClient();

async function shotSlugs(): Promise<Set<string>> {
  const dir = path.join(__dirname, "posts");
  const slugs = new Set<string>();
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".ts"))) {
    const post = (await import(path.join(dir, f))).default as Post;
    for (const b of post.body) if ("shot" in b) slugs.add(b.shot);
  }
  return slugs;
}

async function main() {
  const out = process.argv[2];
  if (!out) throw new Error("usage: capture-screenshots.ts <dir> [--upload]");
  mkdirSync(out, { recursive: true });

  if (process.argv.includes("--upload")) {
    for (const f of readdirSync(out).filter((f) => f.endsWith(".jpg"))) {
      const data = readFileSync(path.join(out, f));
      const filename = `${SHOT_PREFIX}${f}`;
      await prisma.media.deleteMany({ where: { filename } });
      await prisma.media.create({
        data: { filename, contentType: "image/jpeg", size: data.length, width: 1440, height: 900, data },
      });
      console.log(`uploaded ${filename}`);
    }
    return;
  }

  const slugs = await shotSlugs();
  const [tools, existing] = await Promise.all([
    prisma.tool.findMany({
      where: { slug: { in: [...slugs] } },
      select: { slug: true, url: true, screenshot1MediaId: true },
    }),
    prisma.media.findMany({ where: { filename: { startsWith: SHOT_PREFIX } }, select: { filename: true } }),
  ]);
  const have = new Set(existing.map((m) => m.filename.slice(SHOT_PREFIX.length).replace(/\.\w+$/, "")));
  for (const t of tools) {
    if (t.screenshot1MediaId || have.has(t.slug)) continue;
    const png = path.join(out, `${t.slug}.png`);
    const jpg = path.join(out, `${t.slug}.jpg`);
    try {
      execFileSync(CHROME, [
        "--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=1440,900",
        "--virtual-time-budget=8000", `--screenshot=${png}`, t.url,
      ], { stdio: "ignore", timeout: 60000 });
      execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "78", png, "--out", jpg], { stdio: "ignore" });
      console.log(`captured ${t.slug}`);
    } catch {
      console.log(`FAILED ${t.slug} (${t.url})`);
    } finally {
      if (existsSync(png)) rmSync(png);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
