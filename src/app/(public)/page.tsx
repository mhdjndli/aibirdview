import Link from "next/link";
import { ToolCard } from "@/components/ToolCard";
import { ToolBoard } from "@/components/ToolBoard";
import { HeroSearch } from "@/components/HeroSearch";
import { LogoMarquee } from "@/components/LogoMarquee";
import { getCategories, getTools, getToolRows, getSetting } from "@/lib/queries";
import { serializeCategory, serializeTool } from "@/lib/serializers";

export const metadata = {
  title: "AI Tools Directory: Find the Best AI Tools | AI BirdView",
  description:
    "Browse a human-reviewed directory of AI tools for writing, images, video, voice, code, productivity, marketing, and research. Compare pricing and features in one place.",
  alternates: { canonical: "/" },
};

// Tools shown per ranked board. With one board per category this links a
// large slice of the directory straight from the homepage.
const BOARD_SIZE = 8;

export const revalidate = 60;

type HeroSettings = { eyebrow?: string | null; headline?: string; subhead?: string };
type StatsSettings = { listed?: string; categories?: string; reviewTime?: string; readers?: string };

export default async function Home() {
  const [categoriesRaw, rows, featuredRaw, heroSetting, statsSetting] = await Promise.all([
    getCategories(),
    getToolRows(),
    getTools({ featured: true }),
    getSetting<HeroSettings>("hero"),
    getSetting<StatsSettings>("stats"),
  ]);

  const categories = categoriesRaw.map(serializeCategory);
  const featured = featuredRaw.map(serializeTool).slice(0, 6);
  // getToolRows() orders trending first, then by rating, then newest.
  const totalTools = rows.length;
  const trending = rows.filter((t) => t.trending).slice(0, BOARD_SIZE);
  const newest = [...rows].sort((a, b) => b.createdAt - a.createdAt).slice(0, BOARD_SIZE);
  const boards = categories
    .map((c) => ({ category: c, tools: rows.filter((t) => t.categorySlug === c.slug).slice(0, BOARD_SIZE) }))
    .filter((b) => b.tools.length > 0);

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
      {/* HEADER: title, search and categories, kept short so tools start above the fold */}
      <section className="relative overflow-hidden border-b border-ink-200">
        <div className="mesh-bg absolute inset-0 -z-10 opacity-70" aria-hidden />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-10 pb-6 md:pt-14 md:pb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            {/* The pill is part of the H1 so the page's main heading carries the
                "AI tools directory" keyword while the brand headline stays editable. */}
            <h1 className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink-200/80 bg-ink-0/70 px-3 py-1 text-[12px] font-medium text-ink-600 backdrop-blur">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-kiwi-500" />
                AI Tools Directory
                <span className="text-ink-400">·</span>
                <span className="text-ink-500">{totalTools.toLocaleString()} tools</span>
              </span>
              <span className="mt-3 block text-balance text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900 md:text-[44px]">
                {headStart}{" "}
                <span className="bg-gradient-to-br from-kiwi-500 to-kiwi-700 bg-clip-text text-transparent">
                  {headEnd.replace(/\.$/, "")}
                </span>
                {headEnd.endsWith(".") && "."}
              </span>
            </h1>
            <div className="w-full lg:max-w-md">
              <HeroSearch />
            </div>
          </div>

          <nav aria-label="Categories" className="-mx-5 mt-6 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            <ul className="flex w-max gap-2 lg:w-auto lg:flex-wrap">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-ink-200 bg-ink-0 px-3 py-1.5 text-[13px] text-ink-700 transition-colors hover:border-kiwi-400 hover:text-kiwi-700"
                  >
                    <span className={c.accent} aria-hidden>{c.glyph}</span>
                    {c.name}
                    <span className="text-ink-400">{c.toolCount}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* RANKED BOARDS: trending, newest, then every category */}
      <section className="bg-ink-50/60">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-8 md:py-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {trending.length > 0 && (
              <ToolBoard
                title="Trending now"
                glyph="↗"
                accent="text-rose-500"
                href="/tools?filter=trending"
                tools={trending}
              />
            )}
            <ToolBoard
              title="Just added"
              glyph="✦"
              accent="text-kiwi-600"
              href="/tools"
              tools={newest}
            />
            {boards.map(({ category: c, tools }) => (
              <ToolBoard
                key={c.slug}
                title={c.name}
                glyph={c.glyph}
                accent={c.accent}
                href={`/categories/${c.slug}`}
                total={c.toolCount}
                tools={tools}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-6 py-3 text-[15px] font-medium text-ink-0 transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-[1.02]"
            >
              Browse all {totalTools.toLocaleString()} AI tools →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="border-y border-ink-200">
          <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
            <div className="flex items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
                  Editor&apos;s picks
                </p>
                <h2 className="mt-3 text-[30px] font-semibold leading-[1.05] tracking-[-0.028em] text-ink-900 md:text-[40px]">
                  Featured this month.
                </h2>
              </div>
              <Link
                href="/tools?filter=featured"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-ink-0 px-4 py-2 text-[13px] font-medium text-ink-700 hover:bg-ink-100"
              >
                See all featured →
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Logo marquee */}
      <section className="bg-ink-50/60">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-8">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-500">
            Trusted by teams discovering AI at
          </p>
          <div className="mt-5">
            <LogoMarquee />
          </div>
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
            voice, coding, productivity, marketing, research, design, business,
            education, and everyday life, plus chatbots and AI agents. Every listing
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
