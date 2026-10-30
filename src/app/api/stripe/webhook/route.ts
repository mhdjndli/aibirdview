import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type Stripe from "stripe";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { sendEmail, ADMIN_NOTIFY_EMAIL } from "@/lib/email";
import { FAST_TRACK_HOURS, fastTrackPublishBy } from "@/lib/approve-submission";
import { featurePlan, startPlacement, type FeaturePlan } from "@/lib/featured";
import { adminPaymentEmail, paymentReceivedEmail } from "@/lib/emails/submission-emails";
import { SITE } from "@/lib/site";

// Stripe calls this after checkout. Configure the endpoint in the Stripe
// dashboard for `checkout.session.completed` and set STRIPE_WEBHOOK_SECRET.
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!stripe || !secret || !signature) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, secret);
  } catch (err) {
    console.error("[stripe] Bad webhook signature", (err as Error).message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.payment_status === "paid") {
      if (session.metadata?.submissionId) await handleSubmissionPaid(session, session.metadata.submissionId);
      else if (session.metadata?.toolId) await handleToolFeaturePaid(session, session.metadata.toolId);
    }
  }
  return NextResponse.json({ received: true });
}

function paymentIntentId(session: Stripe.Checkout.Session) {
  return typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null;
}

/**
 * Records a featured placement for this checkout. Returns null if it was
 * already recorded, since Stripe retries webhooks.
 */
async function recordPlacement(
  session: Stripe.Checkout.Session,
  plan: FeaturePlan,
  data: { email: string; submissionId?: string; toolId?: string; refunded?: boolean }
) {
  try {
    return await prisma.featuredPlacement.create({
      data: {
        plan: plan.id,
        days: plan.days,
        amountCents: plan.cents,
        email: data.email.trim().toLowerCase(),
        submissionId: data.submissionId ?? null,
        toolId: data.toolId ?? null,
        stripeSessionId: session.id,
        stripePaymentIntentId: paymentIntentId(session),
        refundedAt: data.refunded ? new Date() : null,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") return null;
    throw err;
  }
}

// A submitter paid for a same-day review, a featured placement, or both.
async function handleSubmissionPaid(session: Stripe.Checkout.Session, submissionId: string) {
  const sub = await prisma.submission.findUnique({ where: { id: submissionId } });
  if (!sub) return;

  // Sessions created before featuring existed only carry product=fast_track.
  const meta = session.metadata ?? {};
  const fastTrack = (meta.fastTrack === "1" || meta.product === "fast_track") && !sub.paidAt;
  const plan = featurePlan(meta.featurePlan);
  const pi = paymentIntentId(session);
  const now = new Date();

  // Paid after it was already rejected: record it and refund right away.
  if (sub.status === "REJECTED") {
    const placement = plan ? await recordPlacement(session, plan, { email: sub.email, submissionId: sub.id, refunded: true }) : null;
    if (!fastTrack && !placement) return; // retry of a session we already handled
    if (fastTrack) {
      await prisma.submission.update({
        where: { id: sub.id },
        data: { fastTrack: true, paidAt: now, refundedAt: now, stripeSessionId: session.id, stripePaymentIntentId: pi },
      });
    }
    if (pi && stripe) await stripe.refunds.create({ payment_intent: pi });
    return;
  }

  const pending = sub.status === "PENDING";
  const publishBy = fastTrack && pending ? fastTrackPublishBy(now) : sub.publishBy;
  if (fastTrack) {
    await prisma.submission.update({
      where: { id: sub.id },
      data: {
        fastTrack: true,
        paidAt: now,
        amountPaidCents: Number(meta.fastTrackCents) || session.amount_total || null,
        stripeSessionId: session.id,
        stripePaymentIntentId: pi,
        publishBy,
      },
    });
  }

  let feature: { label: string; endsAt: Date | null } | null = null;
  if (plan) {
    const placement = await recordPlacement(session, plan, { email: sub.email, submissionId: sub.id });
    if (placement) {
      // Already live (paid after approval): the slot starts now.
      const endsAt = sub.toolId ? await startPlacement(placement.id, sub.toolId, plan.days) : null;
      feature = { label: plan.label, endsAt };
      if (endsAt) revalidateFeatured();
    }
  }
  if (!fastTrack && !feature) return;

  const submitterMail = paymentReceivedEmail({
    toolName: sub.name,
    fastTrackHours: fastTrack && pending ? FAST_TRACK_HOURS : null,
    feature,
  });
  const adminMail = adminPaymentEmail({ toolName: sub.name, submissionId: sub.id, publishBy, fastTrack, feature });
  await Promise.allSettled([
    sendEmail({ to: sub.email, ...submitterMail, tags: [{ name: "type", value: "submission_paid" }] }),
    sendEmail({ to: ADMIN_NOTIFY_EMAIL, ...adminMail, replyTo: sub.email, tags: [{ name: "type", value: "admin_paid" }] }),
  ]);
}

// An owner paid to feature a tool that's already listed.
async function handleToolFeaturePaid(session: Stripe.Checkout.Session, toolId: string) {
  const plan = featurePlan(session.metadata?.featurePlan);
  const email = session.metadata?.email || session.customer_details?.email || "";
  const tool = await prisma.tool.findUnique({ where: { id: toolId }, select: { id: true, slug: true, name: true } });
  if (!plan || !tool) return;

  const placement = await recordPlacement(session, plan, { email, toolId: tool.id });
  if (!placement) return;
  const endsAt = await startPlacement(placement.id, tool.id, plan.days);
  revalidateFeatured(tool.slug);

  const feature = { label: plan.label, endsAt };
  const ownerMail = paymentReceivedEmail({
    toolName: tool.name,
    fastTrackHours: null,
    feature,
    toolUrl: `${SITE.url}/tools/${tool.slug}`,
  });
  const adminMail = adminPaymentEmail({ toolName: tool.name, toolSlug: tool.slug, fastTrack: false, feature });
  await Promise.allSettled([
    email && sendEmail({ to: email, ...ownerMail, tags: [{ name: "type", value: "feature_paid" }] }),
    sendEmail({ to: ADMIN_NOTIFY_EMAIL, ...adminMail, ...(email && { replyTo: email }), tags: [{ name: "type", value: "admin_paid" }] }),
  ]);
}

function revalidateFeatured(slug?: string) {
  revalidatePath("/");
  revalidatePath("/tools");
  if (slug) revalidatePath(`/tools/${slug}`);
}
