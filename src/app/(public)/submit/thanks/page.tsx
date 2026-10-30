import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FAST_TRACK_HOURS, FREE_REVIEW_DAYS } from "@/lib/approve-submission";
import { FAST_TRACK_PRICE_CENTS, fastTrackEnabled, formatPrice } from "@/lib/stripe";
import { FEATURE_PLANS, featurePlan, featuringEnabled } from "@/lib/featured";

export const metadata = {
  title: "Submission status | AI BirdView",
  robots: { index: false, follow: false },
};

// Where Stripe Checkout returns to (paid=1 on success, plus fast=1 and/or
// feature=<plan> for what was bought), and where checkout links land when the
// submission was already handled.
export default async function SubmitThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; paid?: string; fast?: string; feature?: string }>;
}) {
  const { id, paid, fast, feature } = await searchParams;
  const sub = id
    ? await prisma.submission.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          status: true,
          paidAt: true,
          tool: { select: { slug: true } },
          featuredPlacements: { where: { refundedAt: null }, select: { plan: true } },
        },
      })
    : null;

  // The webhook can land a moment after Stripe redirects here, so trust the
  // return URL for what was just paid.
  const justPaid = paid === "1";
  const fastPaid = Boolean(sub?.paidAt) || (justPaid && fast === "1");
  const featured = featurePlan(sub?.featuredPlacements[0]?.plan ?? (justPaid ? feature : null));

  let title = "Submission received.";
  let body = `Your tool is in the free queue and will be reviewed and live within ${FREE_REVIEW_DAYS} days.`;
  let offers = false;
  if (!sub) {
    title = "We couldn't find that submission.";
    body = "Check the link in your confirmation email, or submit your tool again.";
  } else if (sub.status === "APPROVED") {
    title = `${sub.name} is live.`;
    body = "Your listing has been published.";
  } else if (sub.status === "REJECTED") {
    title = "This submission was reviewed.";
    body = "We weren't able to list it. Check your email for details.";
  } else {
    if (fastPaid) {
      title = "Payment received. You're on the same-day track.";
      body = `We'll review ${sub.name} today and publish it within ${FAST_TRACK_HOURS} hours.`;
    } else if (featured) {
      title = "Payment received.";
    }
    if (featured) {
      body += ` It will be featured on the homepage for ${featured.label.toLowerCase()}, starting the day it goes live.`;
    }
    if (fastPaid || featured) body += " A receipt and a confirmation are on their way to your inbox.";
    offers = true;
  }

  const checkout = sub ? `/api/checkout/submission?submission=${sub.id}` : "";
  const showFast = offers && !fastPaid && fastTrackEnabled();
  const showFeature = offers && !featured && featuringEnabled();

  return (
    <section className="mx-auto max-w-2xl px-5 py-20 text-center lg:px-8">
      <h1 className="text-balance text-[34px] font-semibold tracking-[-0.028em] text-ink-900 md:text-[44px]">{title}</h1>
      <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-ink-600">{body}</p>
      {showFast && (
        <a
          href={`${checkout}&fast=1`}
          className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-6 py-3 text-[15px] font-medium text-ink-0 hover:bg-ink-800"
        >
          Get listed today for {formatPrice(FAST_TRACK_PRICE_CENTS)} →
        </a>
      )}
      {showFeature && (
        <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-ink-200 bg-ink-0 p-5 text-left">
          <p className="text-[15px] font-semibold text-ink-900">Get featured this week</p>
          <p className="mt-1 text-[13.5px] leading-relaxed text-ink-600">
            Show {sub?.name} in &ldquo;Featured this week&rdquo; on the homepage, starting the day it goes
            live. Full refund if we can&apos;t list it.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {FEATURE_PLANS.map((p) => (
              <a
                key={p.id}
                href={`${checkout}&feature=${p.id}`}
                className="rounded-xl border border-ink-200 px-3 py-2.5 text-center hover:border-ink-900"
              >
                <span className="block text-[12.5px] text-ink-600">{p.label}</span>
                <span className="block text-[16px] font-semibold text-ink-900">{formatPrice(p.cents)}</span>
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[14px]">
        {sub?.tool && (
          <Link href={`/tools/${sub.tool.slug}`} className="text-kiwi-700 hover:underline">
            View your listing
          </Link>
        )}
        <Link href="/tools" className="text-ink-600 hover:text-ink-900">
          Browse the directory
        </Link>
      </div>
    </section>
  );
}
