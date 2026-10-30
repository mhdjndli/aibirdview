"use client";

import Link from "next/link";
import { useMember } from "./useMember";

// Shown at the top of a tool page only to signed-in owners of that tool.
export function OwnerToolBar({ slug }: { slug: string }) {
  const member = useMember();
  if (!member?.owns.includes(slug)) return null;
  return (
    <div className="border-b border-kiwi-200 bg-kiwi-50">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-2.5 lg:px-8">
        <p className="text-[13.5px] text-kiwi-900">
          <span className="font-semibold">You manage this listing.</span> Changes you save go live right away.
        </p>
        <div className="flex items-center gap-2">
          <Link
            href={`/account/tools/${slug}#featured`}
            className="rounded-full border border-kiwi-300 bg-ink-0 px-4 py-1.5 text-[13px] font-medium text-ink-800 hover:bg-kiwi-100"
          >
            Get featured
          </Link>
          <Link
            href={`/account/tools/${slug}`}
            className="rounded-full bg-ink-900 px-4 py-1.5 text-[13px] font-medium text-ink-0 hover:bg-ink-800"
          >
            Edit listing →
          </Link>
        </div>
      </div>
    </div>
  );
}
