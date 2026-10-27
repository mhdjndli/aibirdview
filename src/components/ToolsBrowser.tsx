"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ToolCard } from "./ToolCard";
import type { SerializedTool, SerializedCategory, PricingLabel } from "@/lib/serializers";

const PRICING: PricingLabel[] = ["Free", "Freemium", "Free Trial", "Paid"];
type Sort = "trending" | "rating" | "newest" | "az";
type Flag = "featured" | "trending";

// Words that appear in nearly every query ("best AI writing tools") but say
// nothing about what the user wants.
const STOP_WORDS = new Set(["ai", "a", "an", "the", "for", "and", "best", "tool", "tools", "app", "apps"]);

// Turn a query into loose word stems so "voice clones" matches "voice cloning"
// and "AI writing" matches the "Writing & Editing" category.
function queryStems(query: string) {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w && !STOP_WORDS.has(w))
    .map((w) => w.replace(/(ing|es|s)$/, (m) => (w.length - m.length >= 3 ? "" : m)));
}

export function ToolsBrowser({
  tools,
  categories,
}: {
  tools: SerializedTool[];
  categories: SerializedCategory[];
}) {
  const [q, setQ] = useState("");
  const [cats, setCats] = useState<Set<string>>(new Set());
  const [prices, setPrices] = useState<Set<PricingLabel>>(new Set());
  const [sort, setSort] = useState<Sort>("trending");
  const [flag, setFlag] = useState<Flag | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const stems = queryStems(q);
    let out = tools.filter((t) => {
      if (stems.length) {
        const hay = [t.name, t.tagline, t.description, t.category.name, ...t.tags]
          .join(" ")
          .toLowerCase();
        if (!stems.every((s) => hay.includes(s))) return false;
      }
      if (flag && !t[flag]) return false;
      if (cats.size && !cats.has(t.category.slug)) return false;
      if (prices.size && !prices.has(t.pricing)) return false;
      return true;
    });
    switch (sort) {
      case "trending":
        out = out.sort(
          (a, b) =>
            Number(b.trending) - Number(a.trending) || b.rating - a.rating
        );
        break;
      case "rating":
        out = out.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        out = out.sort((a, b) => Number(b.founded ?? 0) - Number(a.founded ?? 0));
        break;
      case "az":
        out = out.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return out;
  }, [tools, q, flag, cats, prices, sort]);

  const toggleCat = (slug: string) => {
    const next = new Set(cats);
    next.has(slug) ? next.delete(slug) : next.add(slug);
    setCats(next);
  };
  const togglePrice = (p: PricingLabel) => {
    const next = new Set(prices);
    next.has(p) ? next.delete(p) : next.add(p);
    setPrices(next);
  };
  const clearAll = () => {
    setCats(new Set());
    setPrices(new Set());
    setQ("");
    setFlag(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 pb-24">
      {/* Only this reader opts out of prerendering, so the full list still ships in the HTML. */}
      <Suspense fallback={null}>
        <UrlFilters setQ={setQ} setFlag={setFlag} />
      </Suspense>

      {/* Search + sort bar */}
      <div className="sticky top-14 z-20 -mx-5 mb-8 border-y border-ink-200 bg-ink-0/85 px-5 py-3 backdrop-blur lg:-mx-8 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-1 min-w-[260px] items-center gap-2 rounded-full border border-ink-200 bg-ink-0 px-4">
            <SearchIcon />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, task, or tag"
              className="flex-1 bg-transparent py-2.5 text-[14px] outline-none placeholder:text-ink-400"
              aria-label="Search"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="text-[12px] text-ink-400 hover:text-ink-700"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters((s) => !s)}
            className="lg:hidden inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-ink-0 px-3.5 py-2 text-[13px] font-medium text-ink-700"
            aria-expanded={showFilters}
          >
            Filters
            {(cats.size + prices.size) > 0 && (
              <span className="rounded-full bg-kiwi-500 px-1.5 text-[10px] font-semibold text-ink-900">
                {cats.size + prices.size}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            <label className="text-[12px] text-ink-500">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-ink-200 bg-ink-0 px-3 py-2 text-[13px] text-ink-700 outline-none focus:border-ink-400"
            >
              <option value="trending">Trending</option>
              <option value="rating">Highest rated</option>
              <option value="newest">Newest</option>
              <option value="az">A → Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block lg:sticky lg:top-[140px] lg:self-start`}
        >
          <FilterGroup
            label="Categories"
            count={cats.size}
            onClear={() => setCats(new Set())}
          >
            <ul className="space-y-1.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-[14px] text-ink-700 hover:bg-ink-50">
                    <input
                      type="checkbox"
                      checked={cats.has(c.slug)}
                      onChange={() => toggleCat(c.slug)}
                      className="h-3.5 w-3.5 accent-kiwi-600"
                    />
                    <span className="flex-1">{c.name}</span>
                    <span className="text-[12px] text-ink-400">
                      {c.toolCount}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </FilterGroup>

          <FilterGroup
            label="Pricing"
            count={prices.size}
            onClear={() => setPrices(new Set())}
          >
            <ul className="space-y-1.5">
              {PRICING.map((p) => (
                <li key={p}>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-[14px] text-ink-700 hover:bg-ink-50">
                    <input
                      type="checkbox"
                      checked={prices.has(p)}
                      onChange={() => togglePrice(p)}
                      className="h-3.5 w-3.5 accent-kiwi-600"
                    />
                    <span>{p}</span>
                  </label>
                </li>
              ))}
            </ul>
          </FilterGroup>

          {(cats.size + prices.size + (q ? 1 : 0) + (flag ? 1 : 0)) > 0 && (
            <button
              onClick={clearAll}
              className="mt-2 w-full rounded-full border border-ink-200 bg-ink-0 px-3 py-2 text-[13px] font-medium text-ink-700 hover:bg-ink-50"
            >
              Clear all filters
            </button>
          )}
        </aside>

        {/* Results */}
        <div>
          <div className="mb-5 flex items-baseline justify-between gap-3">
            <p className="text-[13px] text-ink-500">
              <span className="font-medium text-ink-800">
                {filtered.length}
              </span>{" "}
              tools
            </p>
            {flag && (
              <button
                onClick={() => setFlag(null)}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-ink-0 px-3 py-1 text-[12px] font-medium text-ink-700 hover:bg-ink-50"
              >
                {flag === "featured" ? "Featured only" : "Trending only"}
                <span aria-hidden className="text-ink-400">×</span>
                <span className="sr-only">Remove filter</span>
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/60 p-12 text-center">
              <p className="text-[16px] font-medium text-ink-800">
                No tools match these filters.
              </p>
              <p className="mt-1 text-[14px] text-ink-500">
                Try removing a filter, or{" "}
                <a href="/submit" className="text-kiwi-700 underline-offset-4 hover:underline">
                  submit a tool we&apos;re missing
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Applies ?q= (hero search, sitelinks search box) and ?filter=featured|trending
// (homepage and footer links) whenever the URL changes.
function UrlFilters({
  setQ,
  setFlag,
}: {
  setQ: (q: string) => void;
  setFlag: (flag: Flag | null) => void;
}) {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const filter = params.get("filter");

  useEffect(() => {
    setQ(q);
    setFlag(filter === "featured" || filter === "trending" ? filter : null);
  }, [q, filter, setQ, setFlag]);

  return null;
}

function FilterGroup({
  label,
  count,
  onClear,
  children,
}: {
  label: string;
  count: number;
  onClear: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 rounded-2xl border border-ink-200 bg-ink-0 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-500">
          {label}
        </p>
        {count > 0 && (
          <button
            onClick={onClear}
            className="text-[12px] text-ink-400 hover:text-ink-700"
          >
            Clear
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="text-ink-400 shrink-0">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 14l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
