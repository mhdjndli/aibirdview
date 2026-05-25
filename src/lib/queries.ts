import { prisma } from "@/lib/prisma";
import type { Pricing } from "@prisma/client";

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
  alternatives: { include: { toTool: { include: { category: true } } } },
  logo: true,
  thumbnail: true,
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
      ...(opts?.featured && { featured: true }),
      ...(opts?.trending && { trending: true }),
    },
    include: TOOL_INCLUDE,
    orderBy: [{ trending: "desc" }, { rating: "desc" }, { createdAt: "desc" }],
  });
}

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
