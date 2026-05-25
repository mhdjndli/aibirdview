"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import readingTime from "reading-time";
import { prisma } from "@/lib/prisma";
import { slugify, uniqueSlug } from "@/lib/slugify";
import { auth } from "@/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session;
}

const blogPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().max(200).optional(),
  excerpt: z.string().max(500),
  contentJson: z.string().min(2), // JSON string
  contentHtml: z.string().min(1),
  published: z.coerce.boolean().optional(),
  publishedAt: z.string().optional().nullable(),
  thumbnailMediaId: z.string().optional().nullable(),
  ogMediaId: z.string().optional().nullable(),
  categoryIds: z.string().optional(), // comma-separated
  seoTitle: z.string().max(140).optional().nullable(),
  seoDescription: z.string().max(320).optional().nullable(),
  metaKeywords: z.string().max(240).optional().nullable(),
});

export async function saveBlogPost(idFromUrl: string | null, formData: FormData) {
  const session = await requireAdmin();
  const raw: Record<string, unknown> = Object.fromEntries(formData);
  raw.published = formData.get("published") === "on";

  const parsed = blogPostSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error("Validation: " + JSON.stringify(parsed.error.flatten()));
  }
  const v = parsed.data;

  let contentJson: unknown;
  try {
    contentJson = JSON.parse(v.contentJson);
  } catch {
    throw new Error("Invalid content JSON.");
  }

  const existing = idFromUrl
    ? await prisma.blogPost.findUnique({ where: { id: idFromUrl } })
    : null;

  let nextSlug = slugify(v.slug || v.title);
  if (existing && nextSlug !== existing.slug) {
    nextSlug = await uniqueSlug(nextSlug, async (s) =>
      Boolean(await prisma.blogPost.findFirst({ where: { slug: s, NOT: { id: existing.id } } }))
    );
  } else if (!existing) {
    nextSlug = await uniqueSlug(nextSlug, async (s) =>
      Boolean(await prisma.blogPost.findUnique({ where: { slug: s } }))
    );
  }

  const stats = readingTime(v.contentHtml.replace(/<[^>]+>/g, " "));
  const readingMinutes = Math.max(1, Math.round(stats.minutes));

  const publishedAt = v.published
    ? existing?.publishedAt ?? (v.publishedAt ? new Date(v.publishedAt) : new Date())
    : null;

  const data = {
    slug: nextSlug,
    title: v.title,
    excerpt: v.excerpt,
    contentJson: contentJson as object,
    contentHtml: v.contentHtml,
    readingMinutes,
    published: Boolean(v.published),
    publishedAt,
    seoTitle: v.seoTitle?.trim() || null,
    seoDescription: v.seoDescription?.trim() || null,
    metaKeywords: v.metaKeywords?.trim() || null,
    thumbnailMediaId: v.thumbnailMediaId?.trim() || null,
    ogMediaId: v.ogMediaId?.trim() || null,
    authorId: (session.user as { id: string }).id,
  };

  let post;
  if (existing) post = await prisma.blogPost.update({ where: { id: existing.id }, data });
  else post = await prisma.blogPost.create({ data });

  const ids = (v.categoryIds || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  await prisma.blogPostOnCategory.deleteMany({ where: { postId: post.id } });
  if (ids.length) {
    await prisma.blogPostOnCategory.createMany({
      data: ids.map((categoryId) => ({ postId: post.id, categoryId })),
      skipDuplicates: true,
    });
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  redirect(`/admin/blog/${post.id}/edit?saved=1`);
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

// Blog categories ----------

const blogCategorySchema = z.object({
  name: z.string().min(1).max(80),
  slug: z.string().max(80).optional(),
  description: z.string().max(400).optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

export async function saveBlogCategory(idFromUrl: string | null, formData: FormData) {
  await requireAdmin();
  const parsed = blogCategorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error("Validation failed.");
  const v = parsed.data;

  const existing = idFromUrl ? await prisma.blogCategory.findUnique({ where: { id: idFromUrl } }) : null;

  let nextSlug = slugify(v.slug || v.name);
  if (existing && nextSlug !== existing.slug) {
    nextSlug = await uniqueSlug(nextSlug, async (s) =>
      Boolean(await prisma.blogCategory.findFirst({ where: { slug: s, NOT: { id: existing.id } } }))
    );
  } else if (!existing) {
    nextSlug = await uniqueSlug(nextSlug, async (s) =>
      Boolean(await prisma.blogCategory.findUnique({ where: { slug: s } }))
    );
  }

  const data = {
    slug: nextSlug,
    name: v.name,
    description: v.description?.trim() || null,
    sortOrder: v.sortOrder ?? 0,
  };

  if (existing) await prisma.blogCategory.update({ where: { id: existing.id }, data });
  else await prisma.blogCategory.create({ data });

  revalidatePath("/admin/blog/categories");
  revalidatePath("/blog");
  redirect("/admin/blog/categories?saved=1");
}

export async function deleteBlogCategory(id: string) {
  await requireAdmin();
  await prisma.blogCategory.delete({ where: { id } });
  revalidatePath("/admin/blog/categories");
  redirect("/admin/blog/categories?deleted=1");
}
