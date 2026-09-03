import type { Prisma } from "@prisma/client";
import { PRICING_LABELS } from "@/lib/queries";

export type PricingLabel = "Free" | "Freemium" | "Free Trial" | "Paid";

export type SerializedTool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  url: string;
  category: { slug: string; name: string; glyph: string; accent: string };
  pricing: PricingLabel;
  priceFrom: string | null;
  rating: number;
  ratingCount: number;
  founded: string | null;
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

export type SerializedToolLite = Omit<SerializedTool, "alternatives" | "features" | "pros" | "cons" | "longDescription" | "reviews"> & {
  features?: string[];
  pros?: string[];
  cons?: string[];
};

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

export function serializeTool(tool: ToolWithRelations): SerializedTool {
  // Genuine ratings: real visitor reviews take precedence; the admin-set
  // rating/ratingCount only show while a tool has no reviews yet.
  const reviewCount = tool.reviews.length;
  const reviewAvg =
    reviewCount > 0
      ? tool.reviews.reduce((sum, r) => sum + r.stars, 0) / reviewCount
      : 0;
  return {
    slug: tool.slug,
    name: tool.name,
    tagline: tool.tagline,
    description: tool.description,
    longDescription: tool.longDescription,
    url: tool.url,
    category: {
      slug: tool.category.slug,
      name: tool.category.name,
      glyph: tool.category.glyph,
      accent: tool.category.accent,
    },
    pricing: PRICING_LABELS[tool.pricing] as PricingLabel,
    priceFrom: tool.priceFrom,
    rating: reviewCount > 0 ? reviewAvg : tool.rating,
    ratingCount: reviewCount > 0 ? reviewCount : tool.ratingCount,
    founded: tool.founded,
    featured: tool.featured,
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
      featured: a.toTool.featured,
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
