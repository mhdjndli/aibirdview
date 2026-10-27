"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import type { Pricing } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { currentMember, endMemberSession } from "@/lib/owner-session";
import { sendEmail, ADMIN_NOTIFY_EMAIL } from "@/lib/email";
import { adminClaimEmail, adminEditEmail } from "@/lib/emails/submission-emails";

export async function signOut() {
  await endMemberSession();
  redirect("/signin");
}

// Fields an owner may change. Editorial content (the "More context" section,
// ratings, category, badges) stays with the editors.
const editSchema = z.object({
  name: z.string().trim().min(1).max(120),
  tagline: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(2000),
  longDescription: z.string().trim().min(1).max(6000),
  url: z.string().trim().url(),
  pricing: z.enum(["FREE", "FREEMIUM", "FREE_TRIAL", "PAID"]),
  priceFrom: z.string().trim().max(40),
  founded: z.string().trim().max(8),
  features: z.string().max(2000),
  logoMediaId: z.string().max(40),
  screenshot1MediaId: z.string().max(40),
  screenshot2MediaId: z.string().max(40),
  screenshot3MediaId: z.string().max(40),
});

export type EditData = Partial<{
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  url: string;
  pricing: Pricing;
  priceFrom: string | null;
  founded: string | null;
  features: string[];
  logoMediaId: string | null;
  screenshot1MediaId: string | null;
  screenshot2MediaId: string | null;
  screenshot3MediaId: string | null;
}>;

async function requireOwner(slug: string) {
  const email = await currentMember();
  if (!email) redirect(`/signin?next=/account/tools/${slug}`);
  const tool = await prisma.tool.findUnique({
    where: { slug },
    include: { features: { orderBy: { order: "asc" } } },
  });
  if (!tool) redirect("/account");
  const owner = await prisma.toolOwner.findUnique({ where: { toolId_email: { toolId: tool.id, email } } });
  if (owner?.status !== "ACTIVE") redirect("/account");
  return { email, tool };
}

export async function proposeEdit(slug: string, formData: FormData) {
  const { email, tool } = await requireOwner(slug);
  const parsed = editSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    redirect(`/account/tools/${slug}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Check the form")}`);
  }
  const v = parsed.data;
  const nullable = (s: string) => (s ? s : null);
  const proposed: Required<EditData> = {
    name: v.name,
    tagline: v.tagline,
    description: v.description,
    longDescription: v.longDescription,
    url: v.url,
    pricing: v.pricing,
    priceFrom: nullable(v.priceFrom),
    founded: nullable(v.founded),
    features: v.features.split("\n").map((f) => f.trim()).filter(Boolean).slice(0, 12),
    logoMediaId: nullable(v.logoMediaId),
    screenshot1MediaId: nullable(v.screenshot1MediaId),
    screenshot2MediaId: nullable(v.screenshot2MediaId),
    screenshot3MediaId: nullable(v.screenshot3MediaId),
  };
  const current: Required<EditData> = {
    name: tool.name,
    tagline: tool.tagline,
    description: tool.description,
    longDescription: tool.longDescription,
    url: tool.url,
    pricing: tool.pricing,
    priceFrom: tool.priceFrom,
    founded: tool.founded,
    features: tool.features.map((f) => f.text),
    logoMediaId: tool.logoMediaId,
    screenshot1MediaId: tool.screenshot1MediaId,
    screenshot2MediaId: tool.screenshot2MediaId,
    screenshot3MediaId: tool.screenshot3MediaId,
  };

  const changes: EditData = {};
  for (const key of Object.keys(proposed) as (keyof EditData)[]) {
    if (JSON.stringify(proposed[key]) !== JSON.stringify(current[key])) {
      (changes as Record<string, unknown>)[key] = proposed[key];
    }
  }
  if (Object.keys(changes).length === 0) redirect(`/account/tools/${slug}?error=${encodeURIComponent("Nothing changed.")}`);

  const mediaIds = [changes.logoMediaId, changes.screenshot1MediaId, changes.screenshot2MediaId, changes.screenshot3MediaId].filter(
    (id): id is string => Boolean(id)
  );
  if (mediaIds.length && (await prisma.media.count({ where: { id: { in: mediaIds } } })) !== mediaIds.length) {
    redirect(`/account/tools/${slug}?error=${encodeURIComponent("An uploaded image is missing. Upload it again.")}`);
  }

  // One open edit per tool: a newer proposal replaces the pending one.
  const open = await prisma.toolEdit.findFirst({ where: { toolId: tool.id, status: "PENDING" } });
  if (open) {
    await prisma.toolEdit.update({ where: { id: open.id }, data: { data: changes, email, createdAt: new Date() } });
  } else {
    await prisma.toolEdit.create({ data: { toolId: tool.id, email, data: changes } });
  }

  const mail = adminEditEmail({ toolName: tool.name, email, fields: Object.keys(changes) });
  void sendEmail({ to: ADMIN_NOTIFY_EMAIL, ...mail, replyTo: email, tags: [{ name: "type", value: "admin_owner_edit" }] });
  redirect(`/account/tools/${slug}?sent=1`);
}

export async function requestManualClaim(slug: string, formData: FormData) {
  const email = await currentMember();
  if (!email) redirect(`/signin?next=/claim/${slug}`);
  const tool = await prisma.tool.findUnique({ where: { slug }, select: { id: true, name: true, slug: true } });
  if (!tool) redirect("/account");
  const note = String(formData.get("note") ?? "").trim().slice(0, 1000) || null;

  const existing = await prisma.toolOwner.findUnique({ where: { toolId_email: { toolId: tool.id, email } } });
  if (existing?.status === "ACTIVE") redirect(`/account/tools/${slug}`);
  await prisma.toolOwner.upsert({
    where: { toolId_email: { toolId: tool.id, email } },
    create: { toolId: tool.id, email, method: "MANUAL", status: "PENDING", note },
    update: { status: "PENDING", method: "MANUAL", note },
  });
  const mail = adminClaimEmail({ toolName: tool.name, toolSlug: tool.slug, email, pending: true, note });
  void sendEmail({ to: ADMIN_NOTIFY_EMAIL, ...mail, replyTo: email, tags: [{ name: "type", value: "admin_claim_request" }] });
  redirect(`/claim/${slug}?requested=1`);
}
