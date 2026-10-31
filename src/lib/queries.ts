import { prisma } from "@/lib/prisma";
import type { Pricing } from "@prisma/client";
import { BIG_NAME_REVIEWS, FEATURED_SLOTS, PINNED_FEATURED_SLUGS, weekNumber, weekStart, weeklyShuffle } from "@/lib/featured";

export const PRICING_LABELS: Record<Pricing, string> = {
  FREE: "Free",
  FREEMIUM: "Freemium",
  FREE_TRIAL: "Free Trial",
  PAID: "Paid",
};

export const PRICING_FROM_LABEL: Record<string, Pricing> = {
  "Free": "FREE",
  "Freemium": "FREEMIUM",
  "Free Trial": "FREE_TRIAL",
  "Paid": "PAID",
};

// Categories ----------

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { tools: { where: { published: true } } } } },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: { _count: { select: { tools: { where: { published: true } } } } },
  });
}

// Tools ----------

const TOOL_INCLUDE = {
  category: true,
  features: { orderBy: { order: "asc" } },
  pros: { orderBy: { order: "asc" } },
  cons: { orderBy: { order: "asc" } },
  tags: true,
  alternatives: {
    where: { toTool: { published: true } },
    include: { toTool: { include: { category: true } } },
  },
  reviews: { orderBy: { createdAt: "desc" as const } },
  logo: true,
  thumbnail: true,
  screenshot1: true,
  screenshot2: true,
  screenshot3: true,
} as const;

export async function getTools(opts?: {
  published?: boolean;
  categorySlug?: string;
  featured?: boolean;
  trending?: boolean;
}) {
  return prisma.tool.findMany({
    where: {
      published: opts?.published ?? true,
      ...(opts?.categorySlug && { category: { slug: opts.categorySlug } }),
      ...(opts?.featured && { OR: [{ featured: true }, { featuredUntil: { gt: new Date() } }] }),
      ...(opts?.trending && { trending: true }),
    },
    include: TOOL_INCLUDE,
    orderBy: [{ trending: "desc" }, { rating: "desc" }, { createdAt: "desc" }],
  });
}

/**
 * The homepage "Featured this week" grid, FEATURED_SLOTS cards wide:
 *   1. every tool with a paid slot running (marked Sponsored), then
 *   2. the pinned tools (see PINNED_FEATURED_SLUGS), then
 *   3. a random draw of smaller tools filling what's left.
 * The draw is seeded by the week, so it changes every Monday (UTC) and is
 * identical for every visitor in between. A new sponsor takes the place of
 * one random pick; the pinned tools stay. If sponsors alone fill the grid it
 * grows past FEATURED_SLOTS rather than drop a paying tool.
 */
export async function getFeaturedTools(slots = FEATURED_SLOTS) {
  const now = new Date();
  const [sponsored, pinned] = await Promise.all([
    prisma.tool.findMany({
      where: { published: true, featuredUntil: { gt: now } },
      include: TOOL_INCLUDE,
      orderBy: { featuredUntil: "asc" },
    }),
    prisma.tool.findMany({
      where: { published: true, slug: { in: PINNED_FEATURED_SLUGS } },
      include: TOOL_INCLUDE,
    }),
  ]);
  const sponsoredSlugs = new Set(sponsored.map((t) => t.slug));
  const pins = PINNED_FEATURED_SLUGS
    .map((slug) => pinned.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t) && !sponsoredSlugs.has(t!.slug));

  const open = Math.max(0, slots - sponsored.length - pins.length);
  let random: typeof pinned = [];
  if (open > 0) {
    const pool = await prisma.tool.findMany({
      where: {
        published: true,
        trending: false,
        ratingCount: { lt: BIG_NAME_REVIEWS },
        logoMediaId: { not: null },
        slug: { notIn: [...sponsoredSlugs, ...PINNED_FEATURED_SLUGS] },
      },
      select: { slug: true },
    });
    const chosen = weeklyShuffle(pool.map((t) => t.slug), weekNumber(now)).slice(0, open);
    const tools = await prisma.tool.findMany({ where: { slug: { in: chosen } }, include: TOOL_INCLUDE });
    random = chosen.map((slug) => tools.find((t) => t.slug === slug)!).filter(Boolean);
  }

  return { sponsored, picks: [...pins, ...random], weekStart: weekStart(now) };
}

/** Just the fields a compact tool row needs, for pages that list hundreds of tools. */
export async function getToolRows() {
  const rows = await prisma.tool.findMany({
    where: { published: true },
    select: {
      slug: true,
      name: true,
      tagline: true,
      pricing: true,
      logoMediaId: true,
      swatchFrom: true,
      swatchTo: true,
      trending: true,
      createdAt: true,
      category: { select: { slug: true } },
    },
    orderBy: [{ trending: "desc" }, { rating: "desc" }, { createdAt: "desc" }],
  });
  return rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    tagline: r.tagline,
    pricing: PRICING_LABELS[r.pricing],
    logoMediaId: r.logoMediaId,
    swatch: [r.swatchFrom, r.swatchTo] as [string, string],
    trending: r.trending,
    createdAt: r.createdAt.getTime(),
    categorySlug: r.category.slug,
  }));
}

export type ToolRow = Awaited<ReturnType<typeof getToolRows>>[number];

export async function getToolBySlug(slug: string) {
  return prisma.tool.findUnique({
    where: { slug },
    include: TOOL_INCLUDE,
  });
}

export async function getAllToolSlugs() {
  const rows = await prisma.tool.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export async function getAllCategorySlugs() {
  const rows = await prisma.category.findMany({ select: { slug: true } });
  return rows.map((r) => r.slug);
}

// Blog ----------

export async function getPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { published: true, publishedAt: { lte: new Date() } },
    orderBy: { publishedAt: "desc" },
    include: { author: true, categories: { include: { category: true } }, thumbnail: true },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: true,
      categories: { include: { category: true } },
      thumbnail: true,
      ogImage: true,
    },
  });
}

export async function getAllPostSlugs() {
  const rows = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export async function getBlogCategories() {
  return prisma.blogCategory.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

// Settings ----------

export async function getSetting<T = unknown>(key: string): Promise<T | null> {
  const s = await prisma.setting.findUnique({ where: { key } });
  return (s?.value as T) ?? null;
}

export async function getAllSettings() {
  const rows = await prisma.setting.findMany();
  const out: Record<string, unknown> = {};
  for (const r of rows) out[r.key] = r.value;
  return out;
}

// Stats (admin dashboard) ----------

export async function getDashboardStats() {
  const [pending, totalTools, publishedTools, totalCategories, posts, drafts, totalSubs] =
    await Promise.all([
      prisma.submission.count({ where: { status: "PENDING" } }),
      prisma.tool.count(),
      prisma.tool.count({ where: { published: true } }),
      prisma.category.count(),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.blogPost.count({ where: { published: false } }),
      prisma.submission.count(),
    ]);
  return { pending, totalTools, publishedTools, totalCategories, posts, drafts, totalSubs };
}
