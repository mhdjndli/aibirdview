import Link from "next/link";
import { notFound } from "next/navigation";
import { TOOLS, getTool, getRelatedTools } from "@/data/tools";
import { getCategory } from "@/data/categories";
import { ToolCard } from "@/components/ToolCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — ${tool.tagline} · AI BirdView`,
    description: tool.description,
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  const category = getCategory(tool.category);
  const related = getRelatedTools(tool);

  return (
    <article>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-90"
          style={{
            background: `linear-gradient(180deg, ${tool.swatch[0]}26 0%, transparent 60%)`,
          }}
          aria-hidden
        />
        <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-16 md:pt-20">
          <nav className="text-[13px] text-ink-500">
            <Link href="/tools" className="hover:text-ink-800">Directory</Link>
            <span className="mx-2 text-ink-300">/</span>
            <Link
              href={`/categories/${category?.slug}`}
              className="hover:text-ink-800"
            >
              {category?.name}
            </Link>
          </nav>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl text-[36px] font-semibold text-ink-900 shadow-[0_4px_18px_-6px_rgba(0,0,0,0.18)]"
              style={{
                background: `linear-gradient(135deg, ${tool.swatch[0]} 0%, ${tool.swatch[1]} 100%)`,
              }}
            >
              {tool.name[0]}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[40px] font-semibold leading-tight tracking-[-0.032em] text-ink-900 md:text-[52px]">
                  {tool.name}
                </h1>
                {tool.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-kiwi-200 bg-kiwi-50 px-2.5 py-1 text-[11px] font-medium text-kiwi-700">
                    Verified
                  </span>
                )}
                {tool.trending && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-ink-900 px-2.5 py-1 text-[11px] font-medium text-ink-0">
                    Trending
                  </span>
                )}
              </div>
              <p className="mt-3 max-w-2xl text-[20px] leading-snug text-ink-500">
                {tool.tagline}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-5 py-2.5 text-[14px] font-medium text-ink-0 transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-[1.02]"
                >
                  Visit {tool.name} →
                </a>
                <span className="inline-flex items-center gap-1 rounded-full border border-ink-200 bg-ink-0 px-3 py-2 text-[13px] text-ink-700">
                  <StarIcon /> {tool.rating.toFixed(1)} ·{" "}
                  {tool.ratingCount.toLocaleString()} reviews
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-ink-200 bg-ink-0 px-3 py-2 text-[13px] text-ink-700">
                  {tool.pricing}
                  {tool.priceFrom && (
                    <span className="text-ink-400">· from {tool.priceFrom}</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Big preview card */}
          <div
            className="relative mt-12 aspect-[16/8] overflow-hidden rounded-3xl border border-ink-200"
            style={{
              background: `linear-gradient(135deg, ${tool.swatch[0]} 0%, ${tool.swatch[1]} 100%)`,
            }}
          >
            <div
              className="absolute inset-0 opacity-90 mix-blend-soft-light"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.5), transparent 35%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.18), transparent 40%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-[14px] uppercase tracking-[0.2em] text-ink-900/55">
                  Product preview
                </p>
                <p className="mt-2 text-[28px] font-semibold tracking-[-0.022em] text-ink-900/85 md:text-[40px]">
                  {tool.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-5 lg:px-8 mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <h2 className="text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
            What it is
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-700">
            {tool.longDescription}
          </p>

          <h3 className="mt-12 text-[22px] font-semibold tracking-[-0.022em] text-ink-900">
            Key features
          </h3>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {tool.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 rounded-xl border border-ink-200 bg-ink-0 p-4"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-kiwi-100 text-kiwi-700">
                  <CheckIcon />
                </span>
                <span className="text-[14.5px] leading-snug text-ink-700">
                  {f}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-ink-200 bg-ink-0 p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
                What we liked
              </p>
              <ul className="mt-4 space-y-2.5">
                {tool.pros.map((p) => (
                  <li key={p} className="flex gap-2 text-[14px] text-ink-700">
                    <span className="text-kiwi-600">+</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-ink-200 bg-ink-0 p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                Worth noting
              </p>
              <ul className="mt-4 space-y-2.5">
                {tool.cons.map((c) => (
                  <li key={c} className="flex gap-2 text-[14px] text-ink-700">
                    <span className="text-ink-400">·</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-ink-200 bg-ink-0 p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-500">
              At a glance
            </p>
            <dl className="mt-4 space-y-3.5 text-[13.5px]">
              <Row label="Category">
                <Link
                  href={`/categories/${category?.slug}`}
                  className="text-ink-800 hover:text-kiwi-700"
                >
                  {category?.name}
                </Link>
              </Row>
              <Row label="Pricing">
                <span className="text-ink-800">
                  {tool.pricing}
                  {tool.priceFrom && (
                    <span className="text-ink-500"> · from {tool.priceFrom}</span>
                  )}
                </span>
              </Row>
              <Row label="Founded">{tool.founded}</Row>
              <Row label="Rating">
                <span className="text-ink-800">
                  ★ {tool.rating.toFixed(1)} / 5
                </span>
              </Row>
            </dl>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {tool.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-ink-100 px-2.5 py-1 text-[11px] text-ink-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-kiwi-500 px-5 py-3 text-[14px] font-medium text-ink-900 hover:bg-kiwi-400"
          >
            Open {tool.name} →
          </a>
        </aside>
      </section>

      {/* ALTERNATIVES */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 lg:px-8 mt-24 pb-16">
          <h2 className="text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
            Alternatives
          </h2>
          <p className="mt-2 text-[14px] text-ink-500">
            Other tools we like in this space.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-ink-100 pb-2.5 last:border-none last:pb-0">
      <dt className="text-ink-500">{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path
        d="M2.5 6.5l2.4 2.4 4.6-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="#f5b400">
      <path d="M6 1.2l1.5 3.04 3.36.49-2.43 2.37.57 3.33L6 8.85 3 10.43l.57-3.33L1.14 4.73l3.36-.49z" />
    </svg>
  );
}
