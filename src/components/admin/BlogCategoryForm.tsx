"use client";

import { saveBlogCategory, deleteBlogCategory } from "@/app/admin/blog/actions";

export function BlogCategoryForm({
  initial,
  mode,
  categoryId,
}: {
  initial: { id: string | null; slug: string; name: string; description: string; sortOrder: number };
  mode: "create" | "edit";
  categoryId?: string;
}) {
  return (
    <form action={saveBlogCategory.bind(null, mode === "edit" ? (categoryId ?? null) : null)} className="space-y-5 max-w-xl">
      <Field label="Name" required>
        <input name="name" required defaultValue={initial.name} className={inputCls} />
      </Field>
      <Field label="Slug" hint="Auto-generated from name if blank.">
        <input name="slug" defaultValue={initial.slug} className={inputCls} />
      </Field>
      <Field label="Description">
        <textarea name="description" rows={3} defaultValue={initial.description} className={inputCls} />
      </Field>
      <Field label="Sort order">
        <input name="sortOrder" type="number" min={0} defaultValue={initial.sortOrder} className={`${inputCls} max-w-[120px]`} />
      </Field>

      <div className="flex items-center gap-3 border-t border-ink-200 pt-5">
        <button type="submit" className="rounded-full bg-ink-900 px-5 py-2.5 text-[13px] font-medium text-ink-0 hover:bg-ink-700">
          {mode === "edit" ? "Save" : "Create"}
        </button>
        {mode === "edit" && categoryId && (
          <button
            type="button"
            onClick={async () => {
              if (!confirm("Delete this blog category? Posts will lose this tag.")) return;
              await deleteBlogCategory(categoryId);
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

const inputCls = "w-full rounded-xl border border-ink-200 bg-ink-0 px-3.5 py-2 text-[13.5px] text-ink-800 placeholder:text-ink-400 outline-none focus:border-ink-400";

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
