"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import {
  approveSubmissionById,
  notifySubmitterApproved,
} from "@/lib/approve-submission";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

export async function approveSubmission(submissionId: string, formData: FormData) {
  await requireAdmin();

  const { tool, submission, category } = await approveSubmissionById(submissionId, {
    categorySlug: (formData.get("category") as string) || undefined,
    description: (formData.get("description") as string) || undefined,
    longDescription: (formData.get("longDescription") as string) || undefined,
  });

  // Fire-and-forget; approval must succeed even if email delivery flakes.
  void notifySubmitterApproved({
    toolName: tool.name,
    contactName: submission.contactName,
    email: submission.email,
    toolSlug: tool.slug,
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
