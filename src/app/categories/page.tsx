import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { TOOLS } from "@/data/tools";

export const metadata = {
  title: "Categories — AI BirdView",
  description: "Eight worlds of AI tools. Browse by what you need to do.",
};

export default function CategoriesPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200">
        <div className="mesh-bg absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-16 md:pt-28">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
            Categories
          </p>
          <h1 className="mt-3 text-balance text-[44px] font-semibold leading-[1.05] tracking-[-0.032em] text-ink-900 md:text-[64px]">
            Find the right AI for the job you have to do.
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-500">
            We organize the directory by the task — not by the model. Pick a
            category that matches what you&apos;re trying to ship.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const sampleTools = TOOLS.filter((t) => t.category === c.slug).slice(0, 3);
            return (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-ink-200 bg-ink-0 p-7 transition-all duration-500 ease-[var(--ease-spring)] hover:-translate-y-1 hover:border-ink-300 hover:shadow-[0_18px_45px_-18px_rgba(0,0,0,0.16)]"
              >
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-100 text-[22px] ${c.accent}`}
                >
                  {c.glyph}
                </div>
                <h2 className="text-[22px] font-semibold tracking-[-0.022em] text-ink-900">
                  {c.name}
                </h2>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
                  {c.description}
                </p>

                <div className="mt-6 flex -space-x-2">
                  {sampleTools.map((t, i) => (
                    <div
                      key={t.slug}
                      className="flex h-8 w-8 items-center justify-center rounded-xl border-2 border-ink-0 text-[12px] font-semibold text-ink-900"
                      style={{
                        background: `linear-gradient(135deg, ${t.swatch[0]} 0%, ${t.swatch[1]} 100%)`,
                        zIndex: 10 - i,
                      }}
                    >
                      {t.name[0]}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-4 text-[13px]">
                  <span className="text-ink-500">{c.toolCount} tools</span>
                  <span className="font-medium text-kiwi-700 transition-transform duration-300 group-hover:translate-x-0.5">
                    Browse →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
