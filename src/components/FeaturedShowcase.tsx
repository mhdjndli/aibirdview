import Link from "next/link";
import type { SerializedTool } from "@/lib/serializers";
import { FEATURE_PLANS, formatDay } from "@/lib/featured";
import { formatPrice } from "@/lib/stripe";

export type FeaturedItem = { tool: SerializedTool; sponsored: boolean };

/**
 * The homepage "Featured this week" grid. Sits right under the header so a
 * tool maker sees exactly what a paid slot buys before they reach the form.
 */
export function FeaturedShowcase({ items, weekStart }: { items: FeaturedItem[]; weekStart: Date }) {
  if (items.length === 0) return null;
  const from = formatPrice(FEATURE_PLANS[0].cents);
  return (
    <section aria-labelledby="featured-heading" className="relative overflow-hidden border-b border-ink-200 bg-ink-0">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-64 opacity-70"
        style={{
          background:
            "radial-gradient(50% 100% at 20% 0%, color-mix(in oklab, var(--kiwi-100) 70%, transparent), transparent 70%), radial-gradient(40% 100% at 85% 0%, color-mix(in oklab, var(--kiwi-50) 90%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 py-10 lg:px-8 md:py-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kiwi-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-kiwi-500" />
              </span>
              Featured this week
            </p>
            <h2
              id="featured-heading"
              className="mt-3 text-[28px] font-semibold leading-[1.08] tracking-[-0.028em] text-ink-900 md:text-[36px]"
            >
              Six tools worth a closer look.
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
              A fresh set every Monday. Paid slots are marked Sponsored.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-ink-0/80 px-3 py-1.5 text-[12.5px] text-ink-600 backdrop-blur">
              <CalendarIcon />
              Week of {formatDay(weekStart)}
            </span>
            <Link
              href="/submit"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-[13px] font-medium text-ink-0 transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-[1.02]"
            >
              Feature your tool
              <span className="text-ink-400">·</span>
              <span className="text-kiwi-200">from {from}/wk</span>
            </Link>
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ tool, sponsored }, i) => (
            <li key={tool.slug} className={`fade-up fade-up-${Math.min(i + 1, 5)}`}>
              <FeaturedCard tool={tool} sponsored={sponsored} />
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-[12.5px] text-ink-400">
          Picks rotate every Monday. A sponsored tool takes one of these spots the day it goes live.{" "}
          <Link href="/submit" className="font-medium text-kiwi-700 hover:underline">
            Get yours →
          </Link>
        </p>
      </div>
    </section>
  );
}

function FeaturedCard({ tool, sponsored }: FeaturedItem) {
  const [a, b] = tool.swatch;
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-ink-200 bg-ink-0 transition-all duration-500 ease-[var(--ease-spring)] hover:-translate-y-1 hover:border-ink-300 hover:shadow-[0_28px_48px_-28px_rgba(0,0,0,0.28)]"
    >
      {/* Cover tinted with the tool's own swatch */}
      <div
        className="relative h-[120px]"
        style={{
          background: `linear-gradient(135deg, color-mix(in oklab, ${a} 55%, #fff) 0%, color-mix(in oklab, ${b} 45%, #fff) 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(70% 120% at 85% -20%, rgba(255,255,255,0.75), transparent 60%), radial-gradient(60% 80% at 0% 120%, rgba(0,0,0,0.06), transparent 60%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden
        />
        <div className="absolute left-4 top-4 flex items-center gap-1.5">
          {sponsored ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-kiwi-800 px-2.5 py-1 text-[11px] font-medium text-ink-0 shadow-sm">
              <SparkIcon /> Sponsored
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-ink-900/85 px-2.5 py-1 text-[11px] font-medium text-ink-0 backdrop-blur">
              <SparkIcon /> Featured
            </span>
          )}
        </div>
        <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-ink-0/85 px-2.5 py-1 text-[11px] font-medium text-ink-700 backdrop-blur">
          <span aria-hidden>{tool.category.glyph}</span> {tool.category.name}
        </div>

        {/* Logo straddles the cover and the body */}
        <div className="absolute -bottom-8 left-5">
          {tool.logoMediaId ? (
            <div className="h-16 w-16 overflow-hidden rounded-[18px] bg-ink-0 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] ring-4 ring-ink-0 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-[1.06]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api/media/${tool.logoMediaId}`} alt={`${tool.name} logo`} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div
              className="flex h-16 w-16 items-center justify-center rounded-[18px] text-[26px] font-semibold text-ink-900 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] ring-4 ring-ink-0 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-[1.06]"
              style={{ background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)` }}
            >
              {tool.name[0]}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-11">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex min-w-0 items-center gap-1.5 text-[18px] font-semibold tracking-[-0.022em] text-ink-900">
            <span className="truncate">{tool.name}</span>
            {tool.verified && <VerifiedIcon />}
          </h3>
          {tool.ratingCount > 0 ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-ink-100 px-2 py-0.5 text-[12px] font-medium text-ink-800">
              <StarIcon /> {tool.rating.toFixed(1)}
              <span className="text-ink-400">({tool.ratingCount})</span>
            </span>
          ) : (
            <span className="shrink-0 text-[11px] text-ink-400">New</span>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-[14px] leading-snug text-ink-600">{tool.tagline}</p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="inline-flex items-center gap-1 rounded-full border border-ink-200 px-2.5 py-0.5 text-[11px] font-medium text-ink-700">
            {tool.pricing}
            {tool.priceFrom && <span className="text-ink-400">· from {tool.priceFrom}</span>}
          </span>
          <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-kiwi-700 transition-transform duration-300 ease-[var(--ease-spring)] group-hover:translate-x-0.5">
            View tool <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SparkIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M6 0.5l1.3 3.5L11 5.3 7.3 6.6 6 10.5 4.7 6.6 1 5.3l3.7-1.3z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <rect x="1.5" y="2.5" width="9" height="8" rx="1.5" />
      <path d="M1.5 5h9M4 1.5v2M8 1.5v2" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="#f5b400" aria-hidden>
      <path d="M6 1.2l1.5 3.04 3.36.49-2.43 2.37.57 3.33L6 8.85 3 10.43l.57-3.33L1.14 4.73l3.36-.49z" />
    </svg>
  );
}
function VerifiedIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" className="shrink-0" aria-label="Verified">
      <path
        d="M6 1l1.42 1.05 1.77-.06.07 1.77L10.4 5l-1.14 1.34.34 1.74-1.74.34L7 9.94l-1-1L4.65 9.94 4 8.5l-1.74-.34.34-1.74L1.6 5l1.14-1.24L2.81 2.0l1.77.06z"
        fill="#22c55e"
      />
      <path d="M4.2 6.1l1.2 1.2 2.4-2.6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 6h6m0 0L6.5 3.5M9 6L6.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
