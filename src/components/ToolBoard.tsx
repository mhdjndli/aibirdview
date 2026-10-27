import Link from "next/link";
import type { ToolRow } from "@/lib/queries";

// Ranked, compact list of tools under one heading (homepage boards).
export function ToolBoard({
  title,
  glyph,
  accent,
  href,
  total,
  tools,
}: {
  title: string;
  glyph: string;
  accent: string;
  href: string;
  total?: number;
  tools: ToolRow[];
}) {
  return (
    <section className="flex flex-col rounded-2xl border border-ink-200 bg-ink-0">
      <header className="flex items-center justify-between gap-3 border-b border-ink-100 px-4 py-3">
        <h3 className="flex min-w-0 items-center gap-2.5 text-[15px] font-semibold tracking-[-0.018em] text-ink-900">
          <span
            className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ink-100 text-[14px] ${accent}`}
            aria-hidden
          >
            {glyph}
          </span>
          <Link href={href} className="truncate hover:text-kiwi-700">
            {title}
          </Link>
        </h3>
        {total !== undefined && (
          <span className="shrink-0 text-[12px] text-ink-400">{total} tools</span>
        )}
      </header>

      <ol className="flex-1 divide-y divide-ink-100">
        {tools.map((t, i) => (
          <li key={t.slug}>
            <Link
              href={`/tools/${t.slug}`}
              className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-ink-50/70"
            >
              <span className="w-4 shrink-0 text-right text-[12px] font-medium tabular-nums text-ink-400">
                {i + 1}
              </span>
              {t.logoMediaId ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/api/media/${t.logoMediaId}`}
                  alt=""
                  loading="lazy"
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0 rounded-lg object-cover ring-1 ring-ink-900/5"
                />
              ) : (
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[12px] font-semibold text-ink-900 ring-1 ring-ink-900/5"
                  style={{ background: `linear-gradient(135deg, ${t.swatch[0]} 0%, ${t.swatch[1]} 100%)` }}
                  aria-hidden
                >
                  {t.name[0]}
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate text-[14px] font-medium text-ink-900 group-hover:text-kiwi-700">
                    {t.name}
                  </span>
                  <span className="shrink-0 text-[10.5px] text-ink-400">{t.pricing}</span>
                </span>
                <span className="block truncate text-[12.5px] text-ink-500">{t.tagline}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <Link
        href={href}
        className="border-t border-ink-100 px-4 py-2.5 text-[12.5px] font-medium text-kiwi-700 hover:bg-ink-50/70"
      >
        {total !== undefined ? `See all ${total} →` : "See all →"}
      </Link>
    </section>
  );
}
