import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import type { Pricing } from "@prisma/client";
import { sendEmail, ADMIN_NOTIFY_EMAIL } from "@/lib/email";
import {
  adminNotificationEmail,
  submitterConfirmationEmail,
} from "@/lib/emails/submission-emails";

const submissionSchema = z.object({
  name: z.string().min(2).max(80),
  url: z.string().url(),
  tagline: z.string().max(160).optional().nullable(),
  description: z.string().max(4000).optional().nullable(),
  category: z.string().min(1),
  pricing: z.enum(["FREE", "FREEMIUM", "FREE_TRIAL", "PAID"]),
  priceFrom: z.string().max(40).optional().nullable(),
  founded: z.string().max(8).optional().nullable(),
  contactName: z.string().min(1).max(80),
  email: z.string().email(),
  role: z.string().max(80).optional().nullable(),
  notes: z.string().max(2000).optional().nullable(),
  terms: z.literal(true),
  logoMediaId: z.string().min(1, "Logo is required."),
  screenshot1MediaId: z.string().optional().nullable(),
  screenshot2MediaId: z.string().optional().nullable(),
  screenshot3MediaId: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(payload);
  if (!parsed.success) {
    const issues = parsed.error.flatten();
    const first = issues.fieldErrors
      ? Object.values(issues.fieldErrors).flat()[0]
      : undefined;
    return NextResponse.json(
      { error: first || "Invalid submission", details: issues },
      { status: 422 }
    );
  }

  const v = parsed.data;

  // Validate uploaded media exists in DB
  const referencedIds = [
    v.logoMediaId,
    v.screenshot1MediaId,
    v.screenshot2MediaId,
    v.screenshot3MediaId,
  ].filter(Boolean) as string[];

  if (referencedIds.length > 0) {
    const found = await prisma.media.findMany({
      where: { id: { in: referencedIds } },
      select: { id: true },
    });
    if (found.length !== referencedIds.length) {
      return NextResponse.json(
        { error: "One or more uploaded images couldn't be found. Please re-upload and try again." },
        { status: 422 }
      );
    }
  }

  // Resolve category name (for the email and to validate the slug exists)
  const category = await prisma.category.findUnique({
    where: { slug: v.category },
    select: { name: true, slug: true },
  });
  if (!category) {
    return NextResponse.json(
      { error: "Unknown category." },
      { status: 422 }
    );
  }

  const submission = await prisma.submission.create({
    data: {
      name: v.name,
      url: v.url,
      tagline: v.tagline ?? null,
      description: v.description ?? null,
      pricing: v.pricing as Pricing,
      priceFrom: v.priceFrom ?? null,
      founded: v.founded ?? null,
      categorySlug: v.category,
      contactName: v.contactName,
      email: v.email,
      role: v.role ?? null,
      notes: v.notes ?? null,
      logoMediaId: v.logoMediaId,
      screenshot1MediaId: v.screenshot1MediaId ?? null,
      screenshot2MediaId: v.screenshot2MediaId ?? null,
      screenshot3MediaId: v.screenshot3MediaId ?? null,
    },
    select: { id: true },
  });

  // Fire-and-forget emails (don't block the response on email delivery)
  const screenshotCount = [v.screenshot1MediaId, v.screenshot2MediaId, v.screenshot3MediaId].filter(Boolean).length;

  const submitterMail = submitterConfirmationEmail({
    toolName: v.name,
    contactName: v.contactName,
    websiteUrl: v.url,
    categoryName: category.name,
  });
  const adminMail = adminNotificationEmail({
    toolName: v.name,
    tagline: v.tagline ?? null,
    description: v.description ?? null,
    websiteUrl: v.url,
    categorySlug: v.category,
    pricing: v.pricing,
    priceFrom: v.priceFrom ?? null,
    founded: v.founded ?? null,
    contactName: v.contactName,
    contactEmail: v.email,
    contactRole: v.role ?? null,
    notes: v.notes ?? null,
    submissionId: submission.id,
    hasLogo: Boolean(v.logoMediaId),
    screenshotCount,
  });

  // Don't await — return quickly. Errors are logged inside sendEmail.
  void Promise.allSettled([
    sendEmail({
      to: v.email,
      subject: submitterMail.subject,
      html: submitterMail.html,
      text: submitterMail.text,
      tags: [{ name: "type", value: "submitter_confirmation" }],
    }),
    sendEmail({
      to: ADMIN_NOTIFY_EMAIL,
      subject: adminMail.subject,
      html: adminMail.html,
      text: adminMail.text,
      replyTo: v.email,
      tags: [
        { name: "type", value: "admin_new_submission" },
        { name: "submission_id", value: submission.id },
      ],
    }),
  ]);

  return NextResponse.json({ id: submission.id }, { status: 201 });
}
