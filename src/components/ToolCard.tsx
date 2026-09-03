import Link from "next/link";
import type { SerializedTool, SerializedToolLite } from "@/lib/serializers";

export function ToolCard({ tool }: { tool: SerializedTool | SerializedToolLite }) {
  const category = tool.category;
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-ink-0 transition-all duration-500 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)]"
    >
      {/* Cover: the tool's logo front and center */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-ink-100 bg-ink-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 120%, rgba(0,0,0,0.05), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {tool.logoMediaId ? (
            <div className="h-[76px] w-[76px] overflow-hidden rounded-[22px] bg-ink-0 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)] ring-1 ring-ink-900/5 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-[1.06]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/media/${tool.logoMediaId}`}
                alt={`${tool.name} logo`}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div
              className="flex h-[76px] w-[76px] items-center justify-center rounded-[22px] text-[30px] font-semibold text-ink-900 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)] ring-1 ring-ink-900/5 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-[1.06]"
              style={{
                background: `linear-gradient(135deg, ${tool.swatch[0]} 0%, ${tool.swatch[1]} 100%)`,
              }}
            >
              {tool.name[0]}
            </div>
          )}
        </div>
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink-900/85 px-2.5 py-1 text-[11px] font-medium text-ink-0 backdrop-blur">
          {category?.glyph} <span>{category?.name}</span>
        </div>
        {tool.verified && (
          <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-ink-0/95 px-2 py-1 text-[11px] font-medium text-ink-800 shadow-sm">
            <VerifiedIcon /> Verified
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[17px] font-semibold tracking-[-0.022em] text-ink-900">
              {tool.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-[14px] leading-snug text-ink-500">
              {tool.tagline}
            </p>
          </div>
          <div className="shrink-0 text-right">
            {tool.ratingCount > 0 ? (
              <>
                <div className="flex items-center gap-1 text-[12px] font-medium text-ink-800">
                  <StarIcon /> {tool.rating.toFixed(1)}
                </div>
                <div className="text-[11px] text-ink-400">{tool.ratingCount.toLocaleString()}</div>
              </>
            ) : (
              <div className="text-[11px] text-ink-400">No rating yet</div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full border border-ink-200 px-2.5 py-0.5 text-[11px] font-medium text-ink-700">
            {tool.pricing}
            {tool.priceFrom && (
              <span className="text-ink-400">· from {tool.priceFrom}</span>
            )}
          </span>
          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-kiwi-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="#f5b400">
      <path d="M6 1.2l1.5 3.04 3.36.49-2.43 2.37.57 3.33L6 8.85 3 10.43l.57-3.33L1.14 4.73l3.36-.49z" />
    </svg>
  );
}
function VerifiedIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1l1.42 1.05 1.77-.06.07 1.77L10.4 5l-1.14 1.34.34 1.74-1.74.34L7 9.94l-1-1L4.65 9.94 4 8.5l-1.74-.34.34-1.74L1.6 5l1.14-1.24L2.81 2.0l1.77.06z"
        fill="#22c55e"
      />
      <path
        d="M4.2 6.1l1.2 1.2 2.4-2.6"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 6h6m0 0L6.5 3.5M9 6L6.5 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
