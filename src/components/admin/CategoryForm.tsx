"use client";

import { useState } from "react";
import { saveCategory, deleteCategory } from "@/app/admin/categories/actions";

const ACCENT_PRESETS = [
  "text-kiwi-600",
  "text-amber-600",
  "text-rose-500",
  "text-sky-600",
  "text-violet-600",
  "text-teal-600",
  "text-orange-600",
  "text-indigo-600",
  "text-emerald-600",
  "text-fuchsia-600",
];

const GLYPH_PRESETS = ["✎", "✦", "▶", "♪", "⌘", "◷", "✺", "◉", "★", "◆"];

export function CategoryForm({
  initial,
  mode,
  categoryId,
}: {
  initial: {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    glyph: string;
    accent: string;
    sortOrder: number;
  };
  mode: "create" | "edit";
  categoryId?: string;
}) {
  const [accent, setAccent] = useState(initial.accent);
  const [glyph, setGlyph] = useState(initial.glyph);

  return (
    <form action={saveCategory.bind(null, mode === "edit" ? initial.slug : null)} className="space-y-6 max-w-2xl">
      <Field label="Name" required>
        <input name="name" required defaultValue={initial.name} className={inputCls} />
      </Field>
      <Field label="Slug" hint="Auto-generated from name if blank.">
        <input name="slug" defaultValue={initial.slug} className={inputCls} />
      </Field>
      <Field label="Tagline" required>
        <input name="tagline" required maxLength={200} defaultValue={initial.tagline} className={inputCls} />
      </Field>
      <Field label="Description" required>
        <textarea name="description" required rows={4} defaultValue={initial.description} className={inputCls} />
      </Field>

      <div>
        <p className="mb-1.5 text-[12.5px] font-medium text-ink-800">Glyph</p>
        <div className="flex flex-wrap gap-1.5">
          {GLYPH_PRESETS.map((g) => (
            <button
              type="button"
              key={g}
              onClick={() => setGlyph(g)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-[18px] ${
                glyph === g
                  ? "border-ink-900 bg-ink-100"
                  : "border-ink-200 hover:bg-ink-50"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <input
          type="hidden"
          name="glyph"
          value={glyph}
        />
        <input
          type="text"
          value={glyph}
          onChange={(e) => setGlyph(e.target.value.slice(0, 4))}
          className={`${inputCls} mt-2 max-w-[80px] text-center`}
          aria-label="Custom glyph"
        />
      </div>

      <div>
        <p className="mb-1.5 text-[12.5px] font-medium text-ink-800">Accent color</p>
        <div className="flex flex-wrap gap-1.5">
          {ACCENT_PRESETS.map((a) => (
            <button
              type="button"
              key={a}
              onClick={() => setAccent(a)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-[16px] ${a} ${
                accent === a ? "border-ink-900 bg-ink-100" : "border-ink-200 hover:bg-ink-50"
              }`}
              aria-label={a}
            >
              ●
            </button>
          ))}
        </div>
        <input type="hidden" name="accent" value={accent} />
      </div>

      <Field label="Sort order">
        <input name="sortOrder" type="number" min={0} defaultValue={initial.sortOrder} className={`${inputCls} max-w-[120px]`} />
      </Field>

      <div className="flex items-center gap-3 border-t border-ink-200 pt-5">
        <button type="submit" className="rounded-full bg-ink-900 px-5 py-2.5 text-[13px] font-medium text-ink-0 hover:bg-ink-700">
          {mode === "edit" ? "Save changes" : "Create category"}
        </button>
        {mode === "edit" && categoryId && (
          <button
            type="button"
            onClick={async () => {
              if (!confirm("Delete this category? Will fail if tools still belong to it.")) return;
              try {
                await deleteCategory(categoryId);
              } catch (e) {
                alert((e as Error).message);
              }
            }}
            className="rounded-full border border-rose-200 bg-rose-50 px-5 py-2.5 text-[12.5px] font-medium text-rose-700 hover:bg-rose-100"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-ink-200 bg-ink-0 px-3.5 py-2 text-[13.5px] text-ink-800 placeholder:text-ink-400 outline-none focus:border-ink-400";

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[12.5px] font-medium text-ink-800">
          {label}
          {required && <span className="ml-0.5 text-kiwi-600">*</span>}
        </span>
        {hint && <span className="text-[11px] text-ink-400">{hint}</span>}
      </div>
      {children}
    </label>
  );
}
