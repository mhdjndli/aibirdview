"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendEmail } from "@/lib/email";
import { ownerClaimApprovedEmail, ownerEditDecisionEmail } from "@/lib/emails/submission-emails";
import { applyToolChanges, splitStoredEdit, type StoredEdit } from "@/lib/tool-edits";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

/** Publishes an edit still waiting for review (owner edits now apply immediately). */
export async function approveEdit(editId: string) {
  await requireAdmin();
  const edit = await prisma.toolEdit.findUnique({ where: { id: editId }, include: { tool: true } });
  if (!edit || edit.status !== "PENDING") redirect("/admin/edits");

  const { changes } = splitStoredEdit(edit.data as StoredEdit);
  await prisma.$transaction(async (tx) => {
    await applyToolChanges(tx, edit.toolId, changes);
    await tx.toolEdit.update({ where: { id: edit.id }, data: { status: "APPROVED", reviewedAt: new Date() } });
  });

  const mail = ownerEditDecisionEmail({ toolName: changes.name ?? edit.tool.name, toolSlug: edit.tool.slug, approved: true });
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

/** Undoes a live owner edit by restoring the values it replaced. */
export async function revertEdit(editId: string, formData: FormData) {
  await requireAdmin();
  const note = String(formData.get("note") ?? "").trim() || null;
  const edit = await prisma.toolEdit.findUnique({ where: { id: editId }, include: { tool: { select: { name: true, slug: true } } } });
  if (!edit || edit.status !== "APPROVED") redirect("/admin/edits");
  const { previous } = splitStoredEdit(edit.data as StoredEdit);
  if (!previous) redirect("/admin/edits");

  await prisma.$transaction(async (tx) => {
    await applyToolChanges(tx, edit.toolId, previous);
    await tx.toolEdit.update({
      where: { id: edit.id },
      data: { status: "REJECTED", note: note ?? "Reverted by an editor", reviewedAt: new Date() },
    });
  });

  const mail = ownerEditDecisionEmail({ toolName: previous.name ?? edit.tool.name, toolSlug: edit.tool.slug, approved: false, reverted: true, note });
  void sendEmail({ to: edit.email, ...mail, tags: [{ name: "type", value: "owner_edit_reverted" }] });
  revalidatePath(`/tools/${edit.tool.slug}`);
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
