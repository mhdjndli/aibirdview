import type { Prisma } from "@prisma/client";
import { PRICING_LABELS, type ToolCardRow } from "@/lib/queries";

export type PricingLabel = "Free" | "Freemium" | "Free Trial" | "Paid";

export type SerializedTool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  moreContext: string | null;
  url: string;
  category: { slug: string; name: string; glyph: string; accent: string };
  pricing: PricingLabel;
  priceFrom: string | null;
  rating: number;
  ratingCount: number;
  founded: string | null;
  /** An editors' pick or a paid featured slot that's running. */
  featured: boolean;
  trending: boolean;
  verified: boolean;
  swatch: [string, string];
  features: string[];
  pros: string[];
  cons: string[];
  tags: string[];
  alternatives: SerializedToolLite[];
  seoTitle: string | null;
  seoDescription: string | null;
  metaKeywords: string | null;
  logoMediaId: string | null;
  screenshots: string[]; // media ids (in order, only non-null)
  reviews: SerializedReview[];
};

export type SerializedReview = {
  id: string;
  name: string;
  stars: number;
  text: string | null;
  createdAt: string; // ISO
};

export type SerializedToolLite = Omit<SerializedTool, "alternatives" | "features" | "pros" | "cons" | "longDescription" | "moreContext" | "reviews"> & {
  features?: string[];
  pros?: string[];
  cons?: string[];
};

/** The fields a ToolCard renders, plus what the /tools filters search and sort on. */
export type ToolCardData = Pick<
  SerializedTool,
  | "slug"
  | "name"
  | "tagline"
  | "description"
  | "pricing"
  | "priceFrom"
  | "rating"
  | "ratingCount"
  | "founded"
  | "featured"
  | "trending"
  | "verified"
  | "swatch"
  | "tags"
  | "logoMediaId"
> & { category: Pick<SerializedTool["category"], "slug" | "name" | "glyph"> };

type ToolWithRelations = Prisma.ToolGetPayload<{
  include: {
    category: true;
    features: true;
    pros: true;
    cons: true;
    tags: true;
    alternatives: { include: { toTool: { include: { category: true } } } };
    reviews: true;
  };
}>;

function isFeatured(tool: { featured: boolean; featuredUntil: Date | null }) {
  return tool.featured || (tool.featuredUntil !== null && tool.featuredUntil > new Date());
}

// Genuine ratings: real visitor reviews take precedence; the admin-set
// rating/ratingCount only show while a tool has no reviews yet.
function displayRating(tool: { rating: number; ratingCount: number; reviews: { stars: number }[] }) {
  const reviewCount = tool.reviews.length;
  if (reviewCount === 0) return { rating: tool.rating, ratingCount: tool.ratingCount };
  return {
    rating: tool.reviews.reduce((sum, r) => sum + r.stars, 0) / reviewCount,
    ratingCount: reviewCount,
  };
}

export function serializeToolCard(tool: ToolCardRow): ToolCardData {
  return {
    slug: tool.slug,
    name: tool.name,
    tagline: tool.tagline,
    description: tool.description,
    category: tool.category,
    pricing: PRICING_LABELS[tool.pricing] as PricingLabel,
    priceFrom: tool.priceFrom,
    ...displayRating(tool),
    founded: tool.founded,
    featured: isFeatured(tool),
    trending: tool.trending,
    verified: tool.verified,
    swatch: [tool.swatchFrom, tool.swatchTo],
    tags: tool.tags.map((t) => t.tag),
    logoMediaId: tool.logoMediaId,
  };
}

export function serializeTool(tool: ToolWithRelations): SerializedTool {
  return {
    slug: tool.slug,
    name: tool.name,
    tagline: tool.tagline,
    description: tool.description,
    longDescription: tool.longDescription,
    moreContext: tool.moreContext,
    url: tool.url,
    category: {
      slug: tool.category.slug,
      name: tool.category.name,
      glyph: tool.category.glyph,
      accent: tool.category.accent,
    },
    pricing: PRICING_LABELS[tool.pricing] as PricingLabel,
    priceFrom: tool.priceFrom,
    ...displayRating(tool),
    founded: tool.founded,
    featured: isFeatured(tool),
    trending: tool.trending,
    verified: tool.verified,
    swatch: [tool.swatchFrom, tool.swatchTo],
    features: tool.features.map((f) => f.text),
    pros: tool.pros.map((p) => p.text),
    cons: tool.cons.map((c) => c.text),
    tags: tool.tags.map((t) => t.tag),
    alternatives: tool.alternatives.map((a) => ({
      slug: a.toTool.slug,
      name: a.toTool.name,
      tagline: a.toTool.tagline,
      description: a.toTool.description,
      url: a.toTool.url,
      category: {
        slug: a.toTool.category.slug,
        name: a.toTool.category.name,
        glyph: a.toTool.category.glyph,
        accent: a.toTool.category.accent,
      },
      pricing: PRICING_LABELS[a.toTool.pricing] as PricingLabel,
      priceFrom: a.toTool.priceFrom,
      rating: a.toTool.rating,
      ratingCount: a.toTool.ratingCount,
      founded: a.toTool.founded,
      featured: isFeatured(a.toTool),
      trending: a.toTool.trending,
      verified: a.toTool.verified,
      swatch: [a.toTool.swatchFrom, a.toTool.swatchTo],
      tags: [],
      seoTitle: a.toTool.seoTitle,
      seoDescription: a.toTool.seoDescription,
      metaKeywords: a.toTool.metaKeywords,
      logoMediaId: a.toTool.logoMediaId,
      screenshots: [a.toTool.screenshot1MediaId, a.toTool.screenshot2MediaId, a.toTool.screenshot3MediaId].filter(Boolean) as string[],
    })),
    seoTitle: tool.seoTitle,
    seoDescription: tool.seoDescription,
    metaKeywords: tool.metaKeywords,
    logoMediaId: tool.logoMediaId,
    screenshots: [tool.screenshot1MediaId, tool.screenshot2MediaId, tool.screenshot3MediaId].filter(Boolean) as string[],
    reviews: tool.reviews.map((r) => ({
      id: r.id,
      name: r.name,
      stars: r.stars,
      text: r.text,
      createdAt: r.createdAt.toISOString(),
    })),
  };
}

type CategoryWithCount = Prisma.CategoryGetPayload<{
  include: { _count: { select: { tools: true } } };
}>;

export type SerializedCategory = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  glyph: string;
  accent: string;
  toolCount: number;
};

export function serializeCategory(cat: CategoryWithCount): SerializedCategory {
  return {
    slug: cat.slug,
    name: cat.name,
    tagline: cat.tagline,
    description: cat.description,
    glyph: cat.glyph,
    accent: cat.accent,
    toolCount: cat._count.tools,
  };
}
