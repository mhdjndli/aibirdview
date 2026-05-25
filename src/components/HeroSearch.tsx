"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { TOOLS } from "@/data/tools";
import { CATEGORIES } from "@/data/categories";

export function HeroSearch() {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K focuses the search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    const tools = TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.tagline.toLowerCase().includes(query) ||
        t.tags.some((tag) => tag.toLowerCase().includes(query))
    ).slice(0, 5);
    const cats = CATEGORIES.filter((c) =>
      c.name.toLowerCase().includes(query)
    ).slice(0, 2);
    return [
      ...tools.map((t) => ({ type: "tool" as const, item: t })),
      ...cats.map((c) => ({ type: "category" as const, item: c })),
    ];
  }, [q]);

  const showDropdown = focused && q.trim().length > 0;

  const go = (idx: number) => {
    const r = results[idx];
    if (!r) {
      router.push(`/tools?q=${encodeURIComponent(q)}`);
      return;
    }
    if (r.type === "tool") router.push(`/tools/${r.item.slug}`);
    else router.push(`/categories/${r.item.slug}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        go(active);
      }}
      className="relative mx-auto max-w-2xl"
      role="search"
    >
      <div
        className={`flex items-center gap-3 rounded-full border bg-ink-0 px-5 transition-all duration-300 ${
          focused
            ? "border-ink-300 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)]"
            : "border-ink-200 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.10)]"
        }`}
      >
        <SearchIcon />
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((i) => Math.min(results.length - 1, i + 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => Math.max(0, i - 1));
            }
          }}
          placeholder="Search 1,200+ AI tools — by name, task, or category"
          className="flex-1 bg-transparent py-4 text-[16px] text-ink-900 placeholder:text-ink-400 outline-none md:text-[17px]"
          aria-label="Search AI tools"
        />
        <kbd className="hidden sm:inline rounded border border-ink-200 bg-ink-50 px-1.5 py-0.5 text-[11px] text-ink-500">
          ⌘K
        </kbd>
        <button
          type="submit"
          className="ml-1 inline-flex items-center gap-1 rounded-full bg-kiwi-500 px-4 py-2 text-[13px] font-medium text-ink-900 transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-[1.03] hover:bg-kiwi-400"
        >
          Search
        </button>
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 overflow-hidden rounded-2xl border border-ink-200 bg-ink-0 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.18)]">
          {results.length === 0 ? (
            <div className="p-5 text-left text-[14px] text-ink-500">
              No matches yet — try a different word, or{" "}
              <a
                href={`/tools?q=${encodeURIComponent(q)}`}
                className="text-kiwi-700 hover:underline"
              >
                browse all tools
              </a>
              .
            </div>
          ) : (
            <ul className="py-1">
              {results.map((r, i) => (
                <li key={`${r.type}-${r.item.slug}`}>
                  <a
                    href={
                      r.type === "tool"
                        ? `/tools/${r.item.slug}`
                        : `/categories/${r.item.slug}`
                    }
                    onMouseEnter={() => setActive(i)}
                    className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      active === i ? "bg-ink-50" : "bg-ink-0"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-[14px] ${
                        r.type === "tool"
                          ? "bg-kiwi-100 text-kiwi-700"
                          : "bg-ink-100 text-ink-700"
                      }`}
                    >
                      {r.type === "tool" ? r.item.name[0] : "•"}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[14px] font-medium text-ink-900">
                        {r.item.name}
                      </span>
                      <span className="block text-[12px] text-ink-500">
                        {r.type === "tool"
                          ? r.item.tagline
                          : "Category"}
                      </span>
                    </span>
                    <span className="text-[12px] text-ink-400">
                      {r.type === "tool" ? "Tool" : "Category"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-ink-400 shrink-0">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 14l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
