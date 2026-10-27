import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { sendEmail, ADMIN_NOTIFY_EMAIL } from "@/lib/email";
import { FAST_TRACK_HOURS, fastTrackPublishBy } from "@/lib/approve-submission";
import { adminFastTrackEmail, fastTrackPaidEmail } from "@/lib/emails/submission-emails";

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
    await handleCheckoutCompleted(event.data.object);
  }
  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const submissionId = session.metadata?.submissionId;
  if (!submissionId || session.payment_status !== "paid") return;

  const paymentIntent = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null;
  const sub = await prisma.submission.findUnique({ where: { id: submissionId } });
  if (!sub || sub.paidAt) return; // unknown, or already recorded (Stripe retries webhooks)

  const now = new Date();
  const pending = sub.status === "PENDING";
  const publishBy = pending ? fastTrackPublishBy(now) : sub.publishBy;
  await prisma.submission.update({
    where: { id: sub.id },
    data: {
      fastTrack: true,
      paidAt: now,
      amountPaidCents: session.amount_total ?? null,
      stripeSessionId: session.id,
      stripePaymentIntentId: paymentIntent,
      publishBy,
    },
  });

  // Paid after it was already rejected: refund right away.
  if (sub.status === "REJECTED" && paymentIntent && stripe) {
    await stripe.refunds.create({ payment_intent: paymentIntent });
    await prisma.submission.update({ where: { id: sub.id }, data: { refundedAt: new Date() } });
    return;
  }
  if (!pending) return;

  const submitterMail = fastTrackPaidEmail({ toolName: sub.name, hours: FAST_TRACK_HOURS });
  const adminMail = adminFastTrackEmail({ toolName: sub.name, submissionId: sub.id, publishBy: publishBy! });
  await Promise.allSettled([
    sendEmail({ to: sub.email, ...submitterMail, tags: [{ name: "type", value: "fast_track_paid" }] }),
    sendEmail({ to: ADMIN_NOTIFY_EMAIL, ...adminMail, replyTo: sub.email, tags: [{ name: "type", value: "admin_fast_track" }] }),
  ]);
}
