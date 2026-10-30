import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe, FAST_TRACK_PRICE_CENTS } from "@/lib/stripe";
import { FAST_TRACK_HOURS } from "@/lib/approve-submission";
import { featurePlan } from "@/lib/featured";
import { SITE } from "@/lib/site";

// GET /api/checkout/submission?submission=<id>&fast=1&feature=<plan>
// One Stripe Checkout for whatever the submitter picked: the same-day review,
// a featured placement, or both. A GET that redirects, so it works from the
// submit form, the confirmation email and /submit/thanks.
export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const id = params.get("submission") ?? "";
  const thanks = `${SITE.url}/submit/thanks?id=${encodeURIComponent(id)}`;

  if (!stripe || !id) return NextResponse.redirect(`${SITE.url}/submit`, 303);

  const sub = await prisma.submission.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      paidAt: true,
      featuredPlacements: { where: { refundedAt: null }, select: { id: true } },
    },
  });
  if (!sub) return NextResponse.redirect(`${SITE.url}/submit`, 303);
  if (sub.status !== "PENDING") return NextResponse.redirect(thanks, 303);

  // Drop anything already paid for, so a reused link can't charge twice.
  const fast = params.get("fast") === "1" && !sub.paidAt;
  const plan = sub.featuredPlacements.length === 0 ? featurePlan(params.get("feature")) : null;
  if (!fast && !plan) return NextResponse.redirect(thanks, 303);

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  if (fast) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: FAST_TRACK_PRICE_CENTS,
        product_data: {
          name: `Same-day review: ${sub.name}`,
          description: `Reviewed today and published on ${SITE.name} within ${FAST_TRACK_HOURS} hours. Full refund if we can't list it.`,
        },
      },
    });
  }
  if (plan) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: plan.cents,
        product_data: {
          name: `Featured for ${plan.label.toLowerCase()}: ${sub.name}`,
          description: `Shown in "Featured this week" on the ${SITE.name} homepage for ${plan.days} days, starting the day your tool goes live. Full refund if we can't list it.`,
        },
      },
    });
  }

  const metadata = {
    submissionId: sub.id,
    fastTrack: fast ? "1" : "0",
    fastTrackCents: fast ? String(FAST_TRACK_PRICE_CENTS) : "0",
    featurePlan: plan?.id ?? "",
  };
  const done = new URLSearchParams({ paid: "1", ...(fast && { fast: "1" }), ...(plan && { feature: plan.id }) });
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    customer_email: sub.email,
    client_reference_id: sub.id,
    metadata,
    payment_intent_data: { metadata },
    success_url: `${thanks}&${done}`,
    cancel_url: thanks,
  });

  if (fast) await prisma.submission.update({ where: { id: sub.id }, data: { stripeSessionId: session.id } });
  return NextResponse.redirect(session.url ?? thanks, 303);
}
