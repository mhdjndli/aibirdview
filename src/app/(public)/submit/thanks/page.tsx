import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FAST_TRACK_HOURS, FREE_REVIEW_DAYS } from "@/lib/approve-submission";
import { FAST_TRACK_PRICE_CENTS, fastTrackEnabled, formatPrice } from "@/lib/stripe";

export const metadata = {
  title: "Submission status | AI BirdView",
  robots: { index: false, follow: false },
};

// Where Stripe Checkout returns to (paid=1 on success), and where the
// fast-track link lands when the submission was already handled.
export default async function SubmitThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; paid?: string }>;
}) {
  const { id, paid } = await searchParams;
  const sub = id
    ? await prisma.submission.findUnique({
        where: { id },
        select: { id: true, name: true, status: true, paidAt: true, tool: { select: { slug: true } } },
      })
    : null;

  let title = "Submission received.";
  let body = `Your tool is in the free queue and will be reviewed and live within ${FREE_REVIEW_DAYS} days.`;
  let showUpgrade = false;
  if (!sub) {
    title = "We couldn't find that submission.";
    body = "Check the link in your confirmation email, or submit your tool again.";
  } else if (sub.status === "APPROVED") {
    title = `${sub.name} is live.`;
    body = "Your listing has been published.";
  } else if (sub.status === "REJECTED") {
    title = "This submission was reviewed.";
    body = "We weren't able to list it. Check your email for details.";
  } else if (sub.paidAt || paid === "1") {
    // The webhook can land a moment after Stripe redirects here, so trust paid=1.
    title = "Payment received. You're on the same-day track.";
    body = `We'll review ${sub.name} today and publish it within ${FAST_TRACK_HOURS} hours. A receipt and a confirmation are on their way to your inbox.`;
  } else {
    showUpgrade = fastTrackEnabled();
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-20 text-center lg:px-8">
      <h1 className="text-balance text-[34px] font-semibold tracking-[-0.028em] text-ink-900 md:text-[44px]">{title}</h1>
      <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-ink-600">{body}</p>
      {showUpgrade && sub && (
        <a
          href={`/api/checkout/fast-track?submission=${sub.id}`}
          className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-6 py-3 text-[15px] font-medium text-ink-0 hover:bg-ink-800"
        >
          Get listed today for {formatPrice(FAST_TRACK_PRICE_CENTS)} →
        </a>
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
