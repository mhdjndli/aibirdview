"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slugify";
import { auth } from "@/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

export async function approveSubmission(submissionId: string, formData: FormData) {
  await requireAdmin();

  const sub = await prisma.submission.findUnique({ where: { id: submissionId } });
  if (!sub) throw new Error("Submission not found.");
  if (sub.status === "APPROVED") throw new Error("Already approved.");

  const categorySlug = (formData.get("category") as string) || sub.categorySlug;
  const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
  if (!category) throw new Error(`Category "${categorySlug}" doesn't exist. Add it first.`);

  const slug = await uniqueSlug(sub.name, async (s) =>
    Boolean(await prisma.tool.findUnique({ where: { slug: s } }))
  );

  const description = (formData.get("description") as string) || sub.description || sub.tagline || `${sub.name} on AI BirdView`;
  const longDescription = (formData.get("longDescription") as string) || sub.description || sub.tagline || description;

  // pick a deterministic-ish swatch
  const palettes: [string, string][] = [
    ["#c8e6a8", "#8dc474"], ["#fde68a", "#f59e0b"], ["#fecaca", "#ef4444"],
    ["#bae6fd", "#0ea5e9"], ["#ddd6fe", "#8b5cf6"], ["#a7f3d0", "#10b981"],
    ["#fed7aa", "#f97316"], ["#c7d2fe", "#6366f1"],
  ];
  const idx = Math.abs(hash(sub.id)) % palettes.length;
  const [swatchFrom, swatchTo] = palettes[idx];

  const tool = await prisma.tool.create({
    data: {
      slug,
      name: sub.name,
      tagline: sub.tagline || "",
      description,
      longDescription,
      url: sub.url,
      pricing: sub.pricing,
      priceFrom: sub.priceFrom ?? null,
      founded: sub.founded ?? null,
      featured: false,
      trending: false,
      verified: true,
      published: true,
      swatchFrom,
      swatchTo,
      categoryId: category.id,
    },
  });

  await prisma.submission.update({
    where: { id: sub.id },
    data: { status: "APPROVED", toolId: tool.id, reviewedAt: new Date() },
  });

  revalidatePath("/admin/submissions");
  revalidatePath("/tools");
  revalidatePath(`/categories/${category.slug}`);
  redirect(`/admin/tools/${tool.slug}/edit?just_approved=1`);
}

export async function rejectSubmission(submissionId: string, formData: FormData) {
  await requireAdmin();
  const reason = (formData.get("reason") as string) || null;
  await prisma.submission.update({
    where: { id: submissionId },
    data: { status: "REJECTED", rejectReason: reason, reviewedAt: new Date() },
  });
  revalidatePath("/admin/submissions");
  redirect("/admin/submissions?status=REJECTED");
}

export async function reopenSubmission(submissionId: string) {
  await requireAdmin();
  await prisma.submission.update({
    where: { id: submissionId },
    data: { status: "PENDING", reviewedAt: null, rejectReason: null },
  });
  revalidatePath("/admin/submissions");
  redirect(`/admin/submissions/${submissionId}`);
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}
