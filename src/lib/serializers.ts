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
};

export type SerializedToolLite = Omit<SerializedTool, "alternatives" | "features" | "pros" | "cons" | "longDescription"> & {
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
  };
}>;

export function serializeTool(tool: ToolWithRelations): SerializedTool {
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
    rating: tool.rating,
    ratingCount: tool.ratingCount,
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
    })),
    seoTitle: tool.seoTitle,
    seoDescription: tool.seoDescription,
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
