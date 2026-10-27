import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe, FAST_TRACK_PRICE_CENTS } from "@/lib/stripe";
import { FAST_TRACK_HOURS } from "@/lib/approve-submission";
import { SITE } from "@/lib/site";

// GET /api/checkout/fast-track?submission=<id>
// Linked from the confirmation email and the submit success screen, so it is a
// GET that redirects to a Stripe Checkout page for the $9 same-day review.
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("submission") ?? "";
  const thanks = `${SITE.url}/submit/thanks?id=${encodeURIComponent(id)}`;

  if (!stripe || !id) return NextResponse.redirect(`${SITE.url}/submit`, 303);

  const sub = await prisma.submission.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, status: true, paidAt: true },
  });
  if (!sub) return NextResponse.redirect(`${SITE.url}/submit`, 303);
  if (sub.status !== "PENDING" || sub.paidAt) return NextResponse.redirect(thanks, 303);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: FAST_TRACK_PRICE_CENTS,
          product_data: {
            name: `Same-day review: ${sub.name}`,
            description: `Reviewed today and published on AI BirdView within ${FAST_TRACK_HOURS} hours. Full refund if we can't list it.`,
          },
        },
      },
    ],
    customer_email: sub.email,
    client_reference_id: sub.id,
    metadata: { submissionId: sub.id, product: "fast_track" },
    payment_intent_data: { metadata: { submissionId: sub.id, product: "fast_track" } },
    success_url: `${thanks}&paid=1`,
    cancel_url: thanks,
  });

  await prisma.submission.update({ where: { id: sub.id }, data: { stripeSessionId: session.id } });
  return NextResponse.redirect(session.url ?? thanks, 303);
}
