/**
 * Import the curated 100-tool dataset into the database as published,
 * verified listings — downloading each tool's logo into the Media table
 * and generating SEO metadata for every listing.
 *
 * Usage: npx tsx --env-file=.env.local scripts/import-tools.ts
 * Idempotent: tools whose slug already exists are skipped.
 */
import { PrismaClient } from "@prisma/client";
import { TOOLS, type ToolSeed } from "./tools-data";

const prisma = new PrismaClient();
const YEAR = new Date().getFullYear();

const PALETTES: [string, string][] = [
  ["#c8e6a8", "#8dc474"], ["#fde68a", "#f59e0b"], ["#fecaca", "#ef4444"],
  ["#bae6fd", "#0ea5e9"], ["#ddd6fe", "#8b5cf6"], ["#a7f3d0", "#10b981"],
  ["#fed7aa", "#f97316"], ["#c7d2fe", "#6366f1"],
];

async function fetchWithTimeout(url: string, ms = 15000): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AIBirdViewBot/1.0)" },
      redirect: "follow",
    });
  } finally {
    clearTimeout(t);
  }
}

type LogoResult = { buf: Buffer; contentType: string; source: string } | null;

/** Try several logo sources in order of quality. */
async function fetchLogo(domain: string): Promise<LogoResult> {
  const sources: { url: string; name: string; minBytes: number }[] = [
    { url: `https://logo.clearbit.com/${domain}?size=256`, name: "clearbit", minBytes: 1000 },
    { url: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`, name: "google-s2", minBytes: 800 },
    { url: `https://icons.duckduckgo.com/ip3/${domain}.ico`, name: "duckduckgo", minBytes: 500 },
  ];
  for (const s of sources) {
    try {
      const res = await fetchWithTimeout(s.url);
      if (!res.ok) continue;
      const ct = res.headers.get("content-type") || "";
      if (!ct.startsWith("image/")) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < s.minBytes) continue; // likely a generic placeholder icon
      return { buf, contentType: ct.split(";")[0], source: s.name };
    } catch {
      // try next source
    }
  }
  return null;
}

/** Parse PNG dimensions from the IHDR chunk, if it is a PNG. */
function pngSize(buf: Buffer): { width: number | null; height: number | null } {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  return { width: null, height: null };
}

function extFor(contentType: string) {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return "jpg";
  if (contentType.includes("svg")) return "svg";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("icon") || contentType.includes("ico")) return "ico";
  return "img";
}

const CATEGORY_KEYWORD: Record<string, string> = {
  writing: "AI writing tool",
  image: "AI image generator",
  video: "AI video tool",
  audio: "AI audio tool",
  code: "AI coding tool",
  productivity: "AI productivity tool",
  marketing: "AI marketing tool",
  research: "AI research tool",
};

function seoFor(t: ToolSeed) {
  const seoTitle = `${t.name} Review ${YEAR}: Features, Pricing, Pros & Cons | AI BirdView`.slice(0, 140);
  const base = `${t.name} review: ${t.description}`;
  const suffix = ` Compare features, pricing, and top ${t.name} alternatives.`;
  const seoDescription = (base.length + suffix.length <= 320 ? base + suffix : base).slice(0, 320);
  const kw = Array.from(
    new Set([
      t.name,
      `${t.name} review`,
      `${t.name} pricing`,
      `${t.name} alternatives`,
      CATEGORY_KEYWORD[t.category] ?? "AI tool",
      ...t.tags,
    ])
  );
  let metaKeywords = "";
  for (const k of kw) {
    const next = metaKeywords ? `${metaKeywords}, ${k}` : k;
    if (next.length > 240) break;
    metaKeywords = next;
  }
  return { seoTitle, seoDescription, metaKeywords };
}

async function main() {
  const cats = await prisma.category.findMany();
  const catBySlug = new Map(cats.map((c) => [c.slug, c.id]));

  const created: string[] = [];
  const skipped: string[] = [];
  const logoFailed: string[] = [];
  const toolIdBySlug = new Map<string, string>();

  for (let i = 0; i < TOOLS.length; i++) {
    const t = TOOLS[i];
    const categoryId = catBySlug.get(t.category);
    if (!categoryId) {
      console.error(`✗ ${t.slug}: unknown category ${t.category}`);
      continue;
    }

    const existing = await prisma.tool.findUnique({ where: { slug: t.slug }, select: { id: true } });
    if (existing) {
      toolIdBySlug.set(t.slug, existing.id);
      skipped.push(t.slug);
      console.log(`- ${t.slug}: already exists, skipped`);
      continue;
    }

    // Logo → Media
    let logoMediaId: string | null = null;
    const logo = await fetchLogo(t.domain);
    if (logo) {
      const { width, height } = pngSize(logo.buf);
      const media = await prisma.media.create({
        data: {
          filename: `${t.slug}-logo.${extFor(logo.contentType)}`,
          contentType: logo.contentType,
          size: logo.buf.length,
          width,
          height,
          altText: `${t.name} logo`,
          data: new Uint8Array(logo.buf),
        },
      });
      logoMediaId = media.id;
    } else {
      logoFailed.push(t.slug);
    }

    const [swatchFrom, swatchTo] = PALETTES[i % PALETTES.length];
    const { seoTitle, seoDescription, metaKeywords } = seoFor(t);

    const tool = await prisma.tool.create({
      data: {
        slug: t.slug,
        name: t.name,
        tagline: t.tagline,
        description: t.description,
        longDescription: t.longDescription,
        url: t.url,
        pricing: t.pricing,
        priceFrom: t.priceFrom ?? null,
        founded: t.founded ?? null,
        rating: t.rating,
        ratingCount: t.ratingCount,
        featured: Boolean(t.featured),
        trending: Boolean(t.trending),
        verified: true,
        published: true,
        swatchFrom,
        swatchTo,
        categoryId,
        logoMediaId,
        seoTitle,
        seoDescription,
        metaKeywords,
        features: { create: t.features.map((text, order) => ({ text, order })) },
        pros: { create: t.pros.map((text, order) => ({ text, order })) },
        cons: { create: t.cons.map((text, order) => ({ text, order })) },
        tags: { create: t.tags.map((tag) => ({ tag })) },
      },
    });
    toolIdBySlug.set(t.slug, tool.id);
    created.push(t.slug);
    console.log(`✓ ${t.slug} (logo: ${logo ? logo.source : "NONE"})`);
  }

  // Alternatives (after all tools exist)
  let altCount = 0;
  for (const t of TOOLS) {
    const fromId = toolIdBySlug.get(t.slug);
    if (!fromId) continue;
    for (const altSlug of t.alternatives) {
      const toId = toolIdBySlug.get(altSlug);
      if (!toId || toId === fromId) continue;
      await prisma.toolAlternative.upsert({
        where: { fromToolId_toToolId: { fromToolId: fromId, toToolId: toId } },
        update: {},
        create: { fromToolId: fromId, toToolId: toId },
      });
      altCount++;
    }
  }

  console.log(`\nDone. Created ${created.length}, skipped ${skipped.length}, alternatives linked: ${altCount}`);
  if (logoFailed.length) console.log(`Logo missing for: ${logoFailed.join(", ")}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
