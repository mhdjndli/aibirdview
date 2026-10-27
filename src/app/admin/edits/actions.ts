"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendEmail } from "@/lib/email";
import { ownerClaimApprovedEmail, ownerEditDecisionEmail } from "@/lib/emails/submission-emails";
import type { EditData } from "@/app/(public)/account/actions";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

const SCALARS = [
  "name", "tagline", "description", "longDescription", "url", "pricing", "priceFrom", "founded",
  "logoMediaId", "screenshot1MediaId", "screenshot2MediaId", "screenshot3MediaId",
] as const;

export async function approveEdit(editId: string) {
  await requireAdmin();
  const edit = await prisma.toolEdit.findUnique({ where: { id: editId }, include: { tool: true } });
  if (!edit || edit.status !== "PENDING") redirect("/admin/edits");

  const data = edit.data as EditData;
  const update: Prisma.ToolUpdateInput = {};
  for (const key of SCALARS) {
    if (key in data) (update as Record<string, unknown>)[key] = data[key];
  }
  await prisma.$transaction(async (tx) => {
    await tx.tool.update({ where: { id: edit.toolId }, data: update });
    if (data.features) {
      await tx.toolFeature.deleteMany({ where: { toolId: edit.toolId } });
      await tx.toolFeature.createMany({ data: data.features.map((text, order) => ({ toolId: edit.toolId, text, order })) });
    }
    await tx.toolEdit.update({ where: { id: edit.id }, data: { status: "APPROVED", reviewedAt: new Date() } });
  });

  const mail = ownerEditDecisionEmail({ toolName: data.name ?? edit.tool.name, toolSlug: edit.tool.slug, approved: true });
  void sendEmail({ to: edit.email, ...mail, tags: [{ name: "type", value: "owner_edit_approved" }] });
  revalidatePath(`/tools/${edit.tool.slug}`);
  revalidatePath("/admin/edits");
}

export async function rejectEdit(editId: string, formData: FormData) {
  await requireAdmin();
  const note = String(formData.get("note") ?? "").trim() || null;
  const edit = await prisma.toolEdit.update({
    where: { id: editId },
    data: { status: "REJECTED", note, reviewedAt: new Date() },
    include: { tool: { select: { name: true, slug: true } } },
  });
  const mail = ownerEditDecisionEmail({ toolName: edit.tool.name, toolSlug: edit.tool.slug, approved: false, note });
  void sendEmail({ to: edit.email, ...mail, tags: [{ name: "type", value: "owner_edit_rejected" }] });
  revalidatePath("/admin/edits");
}

export async function setOwnerStatus(ownerId: string, status: "ACTIVE" | "REVOKED") {
  await requireAdmin();
  const owner = await prisma.toolOwner.update({
    where: { id: ownerId },
    data: { status },
    include: { tool: { select: { name: true, slug: true } } },
  });
  if (status === "ACTIVE") {
    const mail = ownerClaimApprovedEmail({ toolName: owner.tool.name });
    void sendEmail({ to: owner.email, ...mail, tags: [{ name: "type", value: "owner_claim_approved" }] });
  }
  revalidatePath("/admin/edits");
  revalidatePath(`/tools/${owner.tool.slug}`);
}
