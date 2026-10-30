import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

// Paid placements in the homepage "Featured this week" section. Payments go
// through Stripe, so featuring is offered only when Stripe is configured.
export const FEATURE_PLANS = [
  { id: "1w", label: "1 week", days: 7, cents: 1900 },
  { id: "2w", label: "2 weeks", days: 14, cents: 2900 },
  { id: "3w", label: "3 weeks", days: 21, cents: 3900 },
  { id: "1m", label: "Full month", days: 30, cents: 4900 },
] as const;

export type FeaturePlan = (typeof FEATURE_PLANS)[number];
export type FeaturePlanId = FeaturePlan["id"];

export function featurePlan(id: string | null | undefined): FeaturePlan | null {
  return FEATURE_PLANS.find((p) => p.id === id) ?? null;
}

export function featuringEnabled() {
  return Boolean(stripe);
}

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;

/** Weeks since Monday 5 Jan 1970 UTC; the editorial picks rotate when it ticks over. */
export function weekNumber(now = new Date()) {
  return Math.floor((now.getTime() - 4 * DAY_MS) / WEEK_MS);
}

/**
 * Starts placements on a tool: each one runs after whatever the tool already
 * has booked, so buying again extends the slot instead of overlapping it.
 */
async function schedule(toolId: string, placements: { id: string; days: number }[]) {
  if (placements.length === 0) return null;
  const tool = await prisma.tool.findUnique({ where: { id: toolId }, select: { featuredUntil: true } });
  const now = new Date();
  let cursor = tool?.featuredUntil && tool.featuredUntil > now ? tool.featuredUntil : now;
  for (const p of placements) {
    const startsAt = cursor;
    const endsAt = new Date(startsAt.getTime() + p.days * DAY_MS);
    await prisma.featuredPlacement.update({ where: { id: p.id }, data: { toolId, startsAt, endsAt } });
    cursor = endsAt;
  }
  await prisma.tool.update({ where: { id: toolId }, data: { featuredUntil: cursor } });
  return cursor;
}

/** Starts a placement bought for a listed tool. Returns when the tool's featured run now ends. */
export async function startPlacement(placementId: string, toolId: string, days: number) {
  return schedule(toolId, [{ id: placementId, days }]);
}

/** Starts the placements a submitter paid for, once their tool is live. */
export async function startSubmissionPlacements(submissionId: string, toolId: string) {
  const waiting = await prisma.featuredPlacement.findMany({
    where: { submissionId, startsAt: null, refundedAt: null },
    select: { id: true, days: true },
    orderBy: { paidAt: "asc" },
  });
  return schedule(toolId, waiting);
}

/**
 * Refunds every payment on a submission we couldn't list: the same-day review
 * and any featured placement waiting for the tool. Returns true if anything was refunded.
 */
export async function refundSubmissionPayments(submissionId: string) {
  if (!stripe) return false;
  const sub = await prisma.submission.findUnique({
    where: { id: submissionId },
    select: { paidAt: true, refundedAt: true, stripePaymentIntentId: true },
  });
  const placements = await prisma.featuredPlacement.findMany({
    where: { submissionId, startsAt: null, refundedAt: null },
    select: { id: true, stripePaymentIntentId: true },
  });

  // One checkout can cover both, so refund each payment intent once.
  const intents = new Set<string>();
  if (sub?.paidAt && !sub.refundedAt && sub.stripePaymentIntentId) intents.add(sub.stripePaymentIntentId);
  for (const p of placements) if (p.stripePaymentIntentId) intents.add(p.stripePaymentIntentId);
  if (intents.size === 0) return false;

  for (const pi of intents) await stripe.refunds.create({ payment_intent: pi });
  const now = new Date();
  if (sub?.paidAt && !sub.refundedAt) {
    await prisma.submission.update({ where: { id: submissionId }, data: { refundedAt: now } });
  }
  await prisma.featuredPlacement.updateMany({
    where: { id: { in: placements.map((p) => p.id) } },
    data: { refundedAt: now },
  });
  return true;
}

export function formatDay(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}
