import Link from "next/link";
import { ToolCard } from "@/components/ToolCard";
import { ToolListItem } from "@/components/ToolListItem";
import { HeroSearch } from "@/components/HeroSearch";
import { LogoMarquee } from "@/components/LogoMarquee";
import { getCategories, getTools, getSetting } from "@/lib/queries";
import { serializeCategory, serializeTool } from "@/lib/serializers";

export const metadata = {
  title: "AI Tools Directory: Find the Best AI Tools | AI BirdView",
  description:
    "Browse a human-reviewed directory of AI tools for writing, images, video, voice, code, productivity, marketing, and research. Compare pricing and features in one place.",
  alternates: { canonical: "/" },
};

// How many tools the homepage links to directly. Enough to pass link equity
// to a large slice of the directory without turning the page into /tools.
const DIRECTORY_SIZE = 60;

export const revalidate = 60;

type HeroSettings = { eyebrow?: string | null; headline?: string; subhead?: string };
type StatsSettings = { listed?: string; categories?: string; reviewTime?: string; readers?: string };

export default async function Home() {
  const [categoriesRaw, toolsRaw, heroSetting, statsSetting] = await Promise.all([
    getCategories(),
    getTools(),
    getSetting<HeroSettings>("hero"),
    getSetting<StatsSettings>("stats"),
  ]);

  const categories = categoriesRaw.map(serializeCategory);
  // getTools() already orders trending first, then by rating.
  const tools = toolsRaw.map(serializeTool);
  const totalTools = tools.length;
  const featured = tools.filter((t) => t.featured).slice(0, 6);
  const featuredSlugs = new Set(featured.map((t) => t.slug));
  const directory = tools.filter((t) => !featuredSlugs.has(t.slug)).slice(0, DIRECTORY_SIZE);

  const hero = {
    eyebrow: heroSetting?.eyebrow ?? null,
    headline: heroSetting?.headline ?? "Find the AI that actually works.",
    subhead: heroSetting?.subhead ??
      "A premium, human-curated directory of the AI tools worth your time. Discover, compare, and launch with confidence.",
  };
  const stats = {
    listed: statsSetting?.listed ?? "1,200+",
    categories: statsSetting?.categories ?? String(categories.length),
    reviewTime: statsSetting?.reviewTime ?? "24hr",
    readers: statsSetting?.readers ?? "140k",
  };

  // Split the headline so the trailing words get the kiwi gradient
  const headlineWords = hero.headline.trim().split(/\s+/);
  const tailLen = Math.min(2, headlineWords.length);
  const headStart = headlineWords.slice(0, headlineWords.length - tailLen).join(" ");
  const headEnd = headlineWords.slice(headlineWords.length - tailLen).join(" ");

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mesh-bg absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-16 md:pt-24 md:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            {/* The pill is part of the H1 so the page's main heading carries the
                "AI tools directory" keyword while the brand headline stays editable. */}
            <h1>
              <span className="fade-up fade-up-1 inline-flex items-center gap-2 rounded-full border border-ink-200/80 bg-ink-0/70 px-3 py-1 text-[12px] font-medium text-ink-600 backdrop-blur">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-kiwi-500" />
                AI Tools Directory
                <span className="text-ink-400">·</span>
                <span className="text-ink-500">{totalTools} tools reviewed by humans</span>
              </span>
              <span className="fade-up fade-up-2 mt-6 block text-balance text-[44px] font-semibold leading-[1.04] tracking-[-0.035em] text-ink-900 md:text-[72px]">
                {headStart}{" "}
                <span className="bg-gradient-to-br from-kiwi-500 to-kiwi-700 bg-clip-text text-transparent">
                  {headEnd.replace(/\.$/, "")}
                </span>
                {headEnd.endsWith(".") && "."}
              </span>
            </h1>
            <p className="fade-up fade-up-3 mx-auto mt-5 max-w-xl text-pretty text-[17px] leading-[1.55] text-ink-500 md:text-[19px]">
              {hero.subhead}
            </p>

            <div className="fade-up fade-up-4 mt-9">
              <HeroSearch />
            </div>

            <div className="fade-up fade-up-5 mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-ink-500">
              <span>Popular:</span>
              {["AI writing", "voice clones", "code agents", "video editing"].map(
                (term) => (
                  <Link
                    key={term}
                    href={`/tools?q=${encodeURIComponent(term)}`}
                    className="text-ink-700 underline-offset-4 hover:text-kiwi-700 hover:underline"
                  >
                    {term}
                  </Link>
                )
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Logo marquee */}
      <section className="border-y border-ink-200 bg-ink-50/60">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-8">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-500">
            Trusted by teams discovering AI at
          </p>
          <div className="mt-5">
            <LogoMarquee />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20 md:py-24">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
              Browse by category
            </p>
            <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.028em] text-ink-900 md:text-[48px]">
              Browse AI tools by category.
            </h2>
          </div>
          <Link
            href="/categories"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-4 py-2 text-[13px] font-medium text-ink-700 hover:bg-ink-50"
          >
            All categories →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-ink-0 p-6 transition-all duration-500 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.12)]"
            >
              <div
                className={`mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100 text-[18px] ${c.accent}`}
              >
                {c.glyph}
              </div>
              <h3 className="text-[17px] font-semibold tracking-[-0.022em] text-ink-900">
                {c.name}
              </h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-500">
                {c.tagline}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-4 text-[12px]">
                <span className="text-ink-500">{c.toolCount} tools</span>
                <span className="font-medium text-kiwi-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Browse →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-ink-50/60 border-y border-ink-200">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-24 md:py-28">
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
                Editor&apos;s picks
              </p>
              <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.028em] text-ink-900 md:text-[48px]">
                Featured this month.
              </h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-500">
                Hand-picked by our editors after testing with real workflows,
                not paid placements.
              </p>
            </div>
            <Link
              href="/tools?filter=featured"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-ink-0 px-4 py-2 text-[13px] font-medium text-ink-700 hover:bg-ink-100"
            >
              See all featured →
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTORY */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
              The directory
            </p>
            <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.028em] text-ink-900 md:text-[48px]">
              Popular AI tools right now.
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-500">
              Trending and top-rated picks from all {totalTools} tools in the
              directory, each one checked by a human editor.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/tools?filter=trending"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-4 py-2 text-[13px] font-medium text-ink-700 hover:bg-ink-50"
            >
              Trending only
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-[13px] font-medium text-ink-0 hover:bg-ink-800"
            >
              All {totalTools} tools →
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {directory.map((t) => (
            <ToolListItem key={t.slug} tool={t} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-5 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-6 py-3 text-[15px] font-medium text-ink-0 transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-[1.02]"
          >
            Browse all {totalTools} AI tools →
          </Link>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] text-ink-500">
            <span>Or jump to:</span>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="text-ink-700 underline-offset-4 hover:text-kiwi-700 hover:underline"
              >
                {c.name}
              </Link>
            ))}
          </p>
        </div>
      </section>

      {/* WHY US + STATS */}
      <section className="border-t border-ink-200 mx-auto max-w-7xl px-5 lg:px-8 py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
            About AI BirdView
          </p>
          <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.028em] text-ink-900 md:text-[48px]">
            An AI tools directory you can trust.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-500">
            AI BirdView lists AI tools for writing, image generation, video,
            voice, coding, productivity, marketing, and research. Every listing
            is reviewed by a person before it goes live, with pricing, features,
            pros and cons, and alternatives on one page, so you can compare
            options and pick the right tool faster.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-x-8">
          {[
            [stats.listed, "Tools listed"],
            [stats.categories, "Categories"],
            [stats.reviewTime, "Median review time"],
            [stats.readers, "Monthly readers"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="text-[28px] font-semibold tracking-[-0.022em] text-ink-900 md:text-[34px]">
                {n}
              </div>
              <div className="mt-1 text-[13px] text-ink-500">{l}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              k: "Curated",
              h: "Every tool, human-reviewed.",
              p: "We test each tool against real workflows before listing. No paid placements in editorial.",
            },
            {
              k: "Comparable",
              h: "Decisions in minutes, not days.",
              p: "Side-by-side comparison. Pricing, features, and our editorial verdict, all on one page.",
            },
            {
              k: "Current",
              h: "Refreshed every week.",
              p: "Our reviewers re-evaluate every featured tool quarterly. The directory stays alive.",
            },
          ].map((card, i) => (
            <div
              key={card.k}
              className={`relative overflow-hidden rounded-3xl border border-ink-200 p-8 md:p-10 ${
                i === 0 ? "bg-ink-900 text-ink-0" : "bg-ink-0 text-ink-800"
              }`}
            >
              {i === 0 && (
                <div
                  className="absolute inset-0 -z-0 opacity-60"
                  style={{
                    background:
                      "radial-gradient(60% 80% at 80% 20%, color-mix(in oklab, #8dc474 65%, transparent), transparent 60%)",
                  }}
                  aria-hidden
                />
              )}
              <div className="relative">
                <p
                  className={`text-[12px] font-semibold uppercase tracking-[0.18em] ${
                    i === 0 ? "text-kiwi-200" : "text-kiwi-700"
                  }`}
                >
                  {card.k}
                </p>
                <h3 className="mt-3 text-[24px] font-semibold leading-tight tracking-[-0.022em] md:text-[28px]">
                  {card.h}
                </h3>
                <p
                  className={`mt-3 text-[15px] leading-relaxed ${
                    i === 0 ? "text-ink-300" : "text-ink-500"
                  }`}
                >
                  {card.p}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUBMIT CTA */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24 md:py-32">
        <div className="relative overflow-hidden rounded-[28px] bg-ink-900 px-8 py-16 text-center text-ink-0 md:px-16 md:py-24">
          <div
            className="absolute inset-0 -z-0 opacity-80"
            style={{
              background:
                "radial-gradient(40% 60% at 15% 30%, color-mix(in oklab, #8dc474 55%, transparent), transparent 60%), radial-gradient(45% 60% at 90% 80%, color-mix(in oklab, #74b25c 45%, transparent), transparent 60%)",
            }}
            aria-hidden
          />
          <div className="relative">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-200">
              Built something great?
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-balance text-[36px] font-semibold leading-[1.05] tracking-[-0.028em] md:text-[56px]">
              Get your AI tool in front of the right people.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-ink-300">
              Free to submit, live within 24 hours. Featured listings are
              hand-picked by our editors.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/submit"
                className="inline-flex items-center gap-1.5 rounded-full bg-ink-0 px-6 py-3 text-[15px] font-medium text-ink-900 transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-[1.02]"
              >
                Submit your tool →
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900/40 px-6 py-3 text-[15px] font-medium text-ink-0 hover:bg-ink-700/40"
              >
                Read our editorial policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
