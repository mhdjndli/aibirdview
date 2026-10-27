import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slugify";
import { sendEmail } from "@/lib/email";
import { submitterApprovedEmail } from "@/lib/emails/submission-emails";
import { SITE } from "@/lib/site";

// Free submissions are published at most this many days after they arrive.
export const FREE_REVIEW_DAYS = Number(process.env.FREE_REVIEW_DAYS || 14);
// A paid same-day review is published at most this many hours after payment.
export const FAST_TRACK_HOURS = Number(process.env.FAST_TRACK_HOURS || 12);

export function freePublishBy(from = new Date()) {
  return new Date(from.getTime() + FREE_REVIEW_DAYS * 24 * 60 * 60 * 1000);
}

export function fastTrackPublishBy(from = new Date()) {
  return new Date(from.getTime() + FAST_TRACK_HOURS * 60 * 60 * 1000);
}

export type ApproveOverrides = {
  categorySlug?: string;
  description?: string;
  longDescription?: string;
};

const PALETTES: [string, string][] = [
  ["#c8e6a8", "#8dc474"], ["#fde68a", "#f59e0b"], ["#fecaca", "#ef4444"],
  ["#bae6fd", "#0ea5e9"], ["#ddd6fe", "#8b5cf6"], ["#a7f3d0", "#10b981"],
  ["#fed7aa", "#f97316"], ["#c7d2fe", "#6366f1"],
];

export async function approveSubmissionById(
  submissionId: string,
  overrides: ApproveOverrides = {}
) {
  const sub = await prisma.submission.findUnique({ where: { id: submissionId } });
  if (!sub) throw new Error("Submission not found.");
  if (sub.status === "APPROVED") throw new Error("Already approved.");

  const categorySlug = overrides.categorySlug || sub.categorySlug;
  const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
  if (!category) throw new Error(`Category "${categorySlug}" doesn't exist. Add it first.`);

  // Claim the submission before creating the tool so a concurrent approval
  // (admin click vs. auto-approve sweep) can't publish it twice.
  const claimed = await prisma.submission.updateMany({
    where: { id: sub.id, status: sub.status },
    data: { status: "APPROVED", reviewedAt: new Date(), rejectReason: null },
  });
  if (claimed.count === 0) throw new Error("Submission was just handled elsewhere.");

  try {
    const slug = await uniqueSlug(sub.name, async (s) =>
      Boolean(await prisma.tool.findUnique({ where: { slug: s } }))
    );

    const description =
      overrides.description || sub.description || sub.tagline || `${sub.name} on ${SITE.name}`;
    const longDescription =
      overrides.longDescription || sub.description || sub.tagline || description;

    const idx = Math.abs(hash(sub.id)) % PALETTES.length;
    const [swatchFrom, swatchTo] = PALETTES[idx];

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
        logoMediaId: sub.logoMediaId ?? null,
        screenshot1MediaId: sub.screenshot1MediaId ?? null,
        screenshot2MediaId: sub.screenshot2MediaId ?? null,
        screenshot3MediaId: sub.screenshot3MediaId ?? null,
      },
    });

    await prisma.submission.update({
      where: { id: sub.id },
      data: { toolId: tool.id },
    });

    // Whoever submitted the tool owns the listing and can edit it later.
    await prisma.toolOwner.upsert({
      where: { toolId_email: { toolId: tool.id, email: sub.email.trim().toLowerCase() } },
      create: { toolId: tool.id, email: sub.email.trim().toLowerCase(), method: "SUBMISSION" },
      update: { status: "ACTIVE" },
    });

    return { tool, submission: sub, category };
  } catch (err) {
    // Roll the claim back so the submission isn't stuck APPROVED with no tool.
    await prisma.submission
      .updateMany({
        where: { id: sub.id, status: "APPROVED", toolId: null },
        data: {
          status: sub.status,
          reviewedAt: sub.reviewedAt,
          rejectReason: sub.rejectReason,
        },
      })
      .catch(() => {});
    throw err;
  }
}

export async function notifySubmitterApproved(args: {
  toolName: string;
  contactName: string;
  email: string;
  toolSlug: string;
}) {
  const mail = submitterApprovedEmail({
    toolName: args.toolName,
    contactName: args.contactName,
    toolUrl: `${SITE.url}/tools/${args.toolSlug}`,
  });
  return sendEmail({
    to: args.email,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    tags: [{ name: "type", value: "submitter_approved" }],
  });
}

export type SweepResult = {
  approved: { submissionId: string; toolSlug: string; name: string; categorySlug: string }[];
  failed: { submissionId: string; name: string; error: string }[];
};

/**
 * Publish every PENDING submission whose publishBy deadline has passed.
 * Failures (e.g. unknown category) are logged and left pending for a human.
 */
export async function autoApprovePendingSubmissions(): Promise<SweepResult> {
  const now = new Date();
  const pending = await prisma.submission.findMany({
    where: {
      status: "PENDING",
      OR: [
        { publishBy: { lte: now } },
        // Created before publishBy existed: keep the old 24-hour promise.
        { publishBy: null, createdAt: { lte: new Date(now.getTime() - 24 * 60 * 60 * 1000) } },
      ],
    },
    select: { id: true, name: true },
    orderBy: { publishBy: "asc" },
  });

  const result: SweepResult = { approved: [], failed: [] };

  for (const { id, name } of pending) {
    try {
      const { tool, submission, category } = await approveSubmissionById(id);
      result.approved.push({
        submissionId: id,
        toolSlug: tool.slug,
        name: tool.name,
        categorySlug: category.slug,
      });
      await notifySubmitterApproved({
        toolName: tool.name,
        contactName: submission.contactName,
        email: submission.email,
        toolSlug: tool.slug,
      });
    } catch (err) {
      const error = (err as Error).message;
      console.error(`[auto-approve] Failed to approve submission ${id} (${name}):`, error);
      result.failed.push({ submissionId: id, name, error });
    }
  }

  return result;
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}
