import Link from "next/link";
import type { SerializedTool } from "@/lib/serializers";

// Dense row used where many tools are listed at once (homepage directory).
export function ToolListItem({ tool }: { tool: SerializedTool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex items-start gap-3.5 rounded-2xl border border-ink-200 bg-ink-0 p-4 transition-colors duration-300 hover:border-ink-300 hover:bg-ink-50/60"
    >
      {tool.logoMediaId ? (
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-ink-0 ring-1 ring-ink-900/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/media/${tool.logoMediaId}`}
            alt={`${tool.name} logo`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[18px] font-semibold text-ink-900 ring-1 ring-ink-900/5"
          style={{
            background: `linear-gradient(135deg, ${tool.swatch[0]} 0%, ${tool.swatch[1]} 100%)`,
          }}
        >
          {tool.name[0]}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-[15px] font-semibold tracking-[-0.018em] text-ink-900 group-hover:text-kiwi-700">
            {tool.name}
          </h3>
          <span className="shrink-0 rounded-full border border-ink-200 px-2 py-px text-[10.5px] font-medium text-ink-600">
            {tool.pricing}
          </span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-ink-500">
          {tool.tagline}
        </p>
        <p className="mt-1.5 text-[11.5px] text-ink-400">
          {tool.category.glyph} {tool.category.name}
        </p>
      </div>
    </Link>
  );
}
