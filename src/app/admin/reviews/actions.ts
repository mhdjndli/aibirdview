"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

export async function deleteReview(reviewId: string) {
  await requireAdmin();
  const review = await prisma.review.delete({
    where: { id: reviewId },
    include: { tool: { select: { slug: true } } },
  });
  revalidatePath("/admin/reviews");
  revalidatePath(`/tools/${review.tool.slug}`);
}
