import Link from "next/link";
import type { ReactNode } from "react";
import type { ContextBlock } from "@/lib/moreContext";

type LinkTarget = { name: string; slug: string };

/**
 * Renders a parsed "More context" section. The first mention of each linked
 * tool (the listing's alternatives) becomes a link to that tool's page.
 * Matching is case-sensitive so names that are also words ("Numeric",
 * "Shortcut") only link when written as the product name.
 */
export function MoreContext({ blocks, links }: { blocks: ContextBlock[]; links: LinkTarget[] }) {
  const linkify = makeLinkifier(links);
  return (
    <div className="mt-5 space-y-4">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading":
            return (
              <h3
                key={i}
                className="!mt-10 text-[21px] font-semibold tracking-[-0.018em] text-ink-900"
              >
                {b.text}
              </h3>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2.5">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[16px] leading-relaxed text-ink-700">
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-kiwi-100 text-kiwi-700">
                      <CheckIcon />
                    </span>
                    <span>{linkify(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "faq":
            return (
              <dl key={i} className="divide-y divide-ink-100 rounded-2xl border border-ink-200 bg-ink-0">
                {b.items.map((item, j) => (
                  <div key={j} className="p-5">
                    <dt className="text-[16px] font-semibold text-ink-900">{item.q}</dt>
                    <dd className="mt-2 text-[15.5px] leading-relaxed text-ink-700">{linkify(item.a)}</dd>
                  </div>
                ))}
              </dl>
            );
          default:
            return (
              <p key={i} className="text-[17px] leading-relaxed text-ink-700">
                {linkify(b.text)}
              </p>
            );
        }
      })}
    </div>
  );
}

function makeLinkifier(links: LinkTarget[]) {
  const bySlug = new Map(links.filter((l) => l.name.trim().length > 2).map((l) => [l.name, l.slug]));
  if (bySlug.size === 0) return (text: string): ReactNode => text;
  const names = [...bySlug.keys()].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(
    `(?<![\\w.])(${names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?![\\w])`,
    "g"
  );
  const linked = new Set<string>();

  return (text: string): ReactNode => {
    const out: ReactNode[] = [];
    let last = 0;
    for (const m of text.matchAll(pattern)) {
      const key = m[0];
      if (linked.has(key)) continue;
      linked.add(key);
      out.push(text.slice(last, m.index));
      out.push(
        <Link
          key={m.index}
          href={`/tools/${bySlug.get(key)}`}
          className="font-medium text-ink-900 underline decoration-kiwi-300 underline-offset-[3px] hover:decoration-kiwi-600"
        >
          {m[0]}
        </Link>
      );
      last = m.index + m[0].length;
    }
    if (out.length === 0) return text;
    out.push(text.slice(last));
    return out;
  };
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
