"use client";

import { moveCategory } from "@/app/admin/categories/actions";

export function CategoryRowActions({
  id,
  canUp,
  canDown,
}: {
  id: string;
  canUp: boolean;
  canDown: boolean;
}) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        disabled={!canUp}
        onClick={() => moveCategory(id, "up")}
        className="rounded-md p-1 text-ink-500 hover:bg-ink-100 disabled:opacity-30"
        aria-label="Move up"
      >
        ▲
      </button>
      <button
        type="button"
        disabled={!canDown}
        onClick={() => moveCategory(id, "down")}
        className="rounded-md p-1 text-ink-500 hover:bg-ink-100 disabled:opacity-30"
        aria-label="Move down"
      >
        ▼
      </button>
    </div>
  );
}
