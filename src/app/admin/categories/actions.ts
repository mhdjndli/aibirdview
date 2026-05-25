"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify, uniqueSlug } from "@/lib/slugify";
import { auth } from "@/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

const categorySchema = z.object({
  name: z.string().min(1).max(60),
  slug: z.string().max(60).optional(),
  tagline: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  glyph: z.string().min(1).max(4),
  accent: z.string().min(1).max(40),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

export async function saveCategory(slugFromUrl: string | null, formData: FormData) {
  await requireAdmin();
  const parsed = categorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    throw new Error("Validation: " + JSON.stringify(parsed.error.flatten()));
  }
  const v = parsed.data;

  const existing = slugFromUrl
    ? await prisma.category.findUnique({ where: { slug: slugFromUrl } })
    : null;

  let nextSlug = slugify(v.slug || v.name);
  if (existing && nextSlug !== existing.slug) {
    nextSlug = await uniqueSlug(nextSlug, async (s) =>
      Boolean(await prisma.category.findFirst({ where: { slug: s, NOT: { id: existing.id } } }))
    );
  } else if (!existing) {
    nextSlug = await uniqueSlug(nextSlug, async (s) =>
      Boolean(await prisma.category.findUnique({ where: { slug: s } }))
    );
  }

  const data = {
    slug: nextSlug,
    name: v.name,
    tagline: v.tagline,
    description: v.description,
    glyph: v.glyph,
    accent: v.accent,
    sortOrder: v.sortOrder ?? 0,
  };

  if (existing) await prisma.category.update({ where: { id: existing.id }, data });
  else await prisma.category.create({ data });

  revalidatePath("/admin/categories");
  revalidatePath("/categories");
  redirect("/admin/categories?saved=1");
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  const count = await prisma.tool.count({ where: { categoryId: id } });
  if (count > 0) throw new Error(`Cannot delete: ${count} tool(s) still use this category.`);
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/categories");
  redirect("/admin/categories?deleted=1");
}

export async function moveCategory(id: string, direction: "up" | "down") {
  await requireAdmin();
  const all = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  const idx = all.findIndex((c) => c.id === id);
  if (idx === -1) return;
  const swapWith =
    direction === "up" ? all[idx - 1] : all[idx + 1];
  if (!swapWith) return;
  const a = all[idx];
  await prisma.$transaction([
    prisma.category.update({ where: { id: a.id }, data: { sortOrder: swapWith.sortOrder } }),
    prisma.category.update({ where: { id: swapWith.id }, data: { sortOrder: a.sortOrder } }),
  ]);
  revalidatePath("/admin/categories");
  revalidatePath("/categories");
}
