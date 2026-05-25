"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { Pricing } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { slugify, uniqueSlug } from "@/lib/slugify";
import { auth } from "@/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

const toolSchema = z.object({
  name: z.string().min(1).max(120),
  slug: z.string().max(120).optional(),
  tagline: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  longDescription: z.string().min(1),
  url: z.string().url(),
  categorySlug: z.string().min(1),
  pricing: z.enum(["FREE", "FREEMIUM", "FREE_TRIAL", "PAID"]),
  priceFrom: z.string().max(40).optional().nullable(),
  rating: z.coerce.number().min(0).max(5).optional(),
  ratingCount: z.coerce.number().int().min(0).optional(),
  founded: z.string().max(8).optional().nullable(),
  featured: z.coerce.boolean().optional(),
  trending: z.coerce.boolean().optional(),
  verified: z.coerce.boolean().optional(),
  published: z.coerce.boolean().optional(),
  swatchFrom: z.string().regex(/^#[0-9a-f]{6}$/i),
  swatchTo: z.string().regex(/^#[0-9a-f]{6}$/i),
  features: z.string().optional(),
  pros: z.string().optional(),
  cons: z.string().optional(),
  tags: z.string().optional(),
  seoTitle: z.string().max(140).optional().nullable(),
  seoDescription: z.string().max(320).optional().nullable(),
  metaKeywords: z.string().max(240).optional().nullable(),
});

function lines(input: string | undefined | null) {
  if (!input) return [];
  return input
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function csv(input: string | undefined | null) {
  if (!input) return [];
  return Array.from(
    new Set(
      input
        .split(/[,\n]/)
        .map((s) => s.trim())
        .filter(Boolean)
    )
  );
}

export async function saveTool(slugFromUrl: string | null, formData: FormData) {
  await requireAdmin();

  const raw: Record<string, unknown> = Object.fromEntries(formData);
  for (const flag of ["featured", "trending", "verified", "published"]) {
    raw[flag] = formData.get(flag) === "on";
  }

  const parsed = toolSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error("Validation: " + JSON.stringify(parsed.error.flatten()));
  }
  const v = parsed.data;

  const category = await prisma.category.findUnique({ where: { slug: v.categorySlug } });
  if (!category) throw new Error(`Category "${v.categorySlug}" not found.`);

  const featuresArr = lines(v.features);
  const prosArr = lines(v.pros);
  const consArr = lines(v.cons);
  const tagsArr = csv(v.tags);

  const existingTool = slugFromUrl
    ? await prisma.tool.findUnique({ where: { slug: slugFromUrl } })
    : null;

  let nextSlug = slugify(v.slug || v.name);
  if (existingTool && nextSlug !== existingTool.slug) {
    // ensure unique
    nextSlug = await uniqueSlug(nextSlug, async (s) =>
      Boolean(await prisma.tool.findFirst({ where: { slug: s, NOT: { id: existingTool.id } } }))
    );
  } else if (!existingTool) {
    nextSlug = await uniqueSlug(nextSlug, async (s) =>
      Boolean(await prisma.tool.findUnique({ where: { slug: s } }))
    );
  }

  const data = {
    slug: nextSlug,
    name: v.name,
    tagline: v.tagline,
    description: v.description,
    longDescription: v.longDescription,
    url: v.url,
    pricing: v.pricing as Pricing,
    priceFrom: v.priceFrom?.trim() || null,
    rating: v.rating ?? 0,
    ratingCount: v.ratingCount ?? 0,
    founded: v.founded?.trim() || null,
    featured: Boolean(v.featured),
    trending: Boolean(v.trending),
    verified: v.verified !== false,
    published: v.published !== false,
    swatchFrom: v.swatchFrom,
    swatchTo: v.swatchTo,
    seoTitle: v.seoTitle?.trim() || null,
    seoDescription: v.seoDescription?.trim() || null,
    metaKeywords: v.metaKeywords?.trim() || null,
    categoryId: category.id,
  };

  let toolId: string;
  if (existingTool) {
    const updated = await prisma.tool.update({ where: { id: existingTool.id }, data });
    toolId = updated.id;
  } else {
    const created = await prisma.tool.create({ data });
    toolId = created.id;
  }

  // Replace children
  await prisma.toolFeature.deleteMany({ where: { toolId } });
  if (featuresArr.length)
    await prisma.toolFeature.createMany({ data: featuresArr.map((text, i) => ({ toolId, text, order: i })) });
  await prisma.toolPro.deleteMany({ where: { toolId } });
  if (prosArr.length)
    await prisma.toolPro.createMany({ data: prosArr.map((text, i) => ({ toolId, text, order: i })) });
  await prisma.toolCon.deleteMany({ where: { toolId } });
  if (consArr.length)
    await prisma.toolCon.createMany({ data: consArr.map((text, i) => ({ toolId, text, order: i })) });
  await prisma.toolTag.deleteMany({ where: { toolId } });
  if (tagsArr.length)
    await prisma.toolTag.createMany({ data: tagsArr.map((tag) => ({ toolId, tag })) });

  revalidatePath("/admin/tools");
  revalidatePath("/tools");
  revalidatePath(`/tools/${nextSlug}`);
  revalidatePath(`/categories/${category.slug}`);
  revalidatePath("/");
  redirect(`/admin/tools/${nextSlug}/edit?saved=1`);
}

export async function deleteTool(toolId: string) {
  await requireAdmin();
  const tool = await prisma.tool.findUnique({ where: { id: toolId } });
  if (!tool) return;
  await prisma.tool.delete({ where: { id: toolId } });
  revalidatePath("/admin/tools");
  revalidatePath("/tools");
  redirect("/admin/tools");
}
