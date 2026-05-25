"use client";

import { useState } from "react";
import { TiptapEditor } from "./TiptapEditor";
import { saveBlogPost, deleteBlogPost } from "@/app/admin/blog/actions";

type BlogCategoryOption = { id: string; name: string; slug: string };

type Defaults = {
  title: string;
  slug: string;
  excerpt: string;
  contentJson: unknown;
  contentHtml: string;
  published: boolean;
  publishedAt: string | null; // ISO
  seoTitle: string | null;
  seoDescription: string | null;
  metaKeywords: string | null;
  thumbnailMediaId: string | null;
  ogMediaId: string | null;
  categoryIds: string[];
};

export function BlogPostForm({
  initial,
  mode,
  postId,
  categories,
}: {
  initial: Defaults;
  mode: "create" | "edit";
  postId?: string;
  categories: BlogCategoryOption[];
}) {
  const [contentJson, setContentJson] = useState<unknown>(initial.contentJson);
  const [contentHtml, setContentHtml] = useState(initial.contentHtml);
  const [thumbnailId, setThumbnailId] = useState<string | null>(initial.thumbnailMediaId);
  const [ogId, setOgId] = useState<string | null>(initial.ogMediaId);
  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set(initial.categoryIds));

  return (
    <form
      action={saveBlogPost.bind(null, mode === "edit" ? (postId ?? null) : null)}
      className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]"
    >
      <div className="space-y-6">
        <Card>
          <Field label="Title" required>
            <input name="title" required defaultValue={initial.title} className={`${inputCls} text-[18px] font-semibold`} />
          </Field>
          <Field label="Slug" hint="Auto-generated from title if blank.">
            <input name="slug" defaultValue={initial.slug} className={inputCls} />
          </Field>
          <Field label="Excerpt" required hint="The one-sentence pitch shown in cards & meta description fallback.">
            <textarea name="excerpt" required rows={2} maxLength={500} defaultValue={initial.excerpt} className={inputCls} />
          </Field>
        </Card>

        <Card>
          <p className="mb-2 text-[12.5px] font-medium text-ink-800">Body</p>
          <TiptapEditor
            defaultContent={initial.contentJson || undefined}
            onChange={(json, html) => {
              setContentJson(json);
              setContentHtml(html);
            }}
          />
        </Card>

        <Card title="SEO">
          <Field label="SEO title" hint="Defaults to '[Post title] | AI BirdView' if blank.">
            <input name="seoTitle" maxLength={140} defaultValue={initial.seoTitle ?? ""} className={inputCls} />
          </Field>
          <Field label="Meta description" hint="120–160 chars is the sweet spot.">
            <textarea name="seoDescription" rows={2} maxLength={320} defaultValue={initial.seoDescription ?? ""} className={inputCls} />
          </Field>
          <Field label="Meta keywords">
            <input name="metaKeywords" defaultValue={initial.metaKeywords ?? ""} className={inputCls} />
          </Field>
        </Card>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
        <Card title="Publish">
          <label className="flex items-center gap-2 rounded-lg px-1 py-1.5 hover:bg-ink-50">
            <input type="checkbox" name="published" defaultChecked={initial.published} className="h-4 w-4 accent-kiwi-600" />
            <span className="text-[13.5px] font-medium text-ink-800">Published</span>
          </label>
          <Field label="Publish date" hint="Optional. Defaults to now on first publish.">
            <input
              name="publishedAt"
              type="datetime-local"
              defaultValue={initial.publishedAt ? toLocal(initial.publishedAt) : ""}
              className={inputCls}
            />
          </Field>
        </Card>

        <Card title="Thumbnail">
          <ImagePicker
            mediaId={thumbnailId}
            onChange={setThumbnailId}
            hint="Used in cards and as the default OG image."
          />
          <input type="hidden" name="thumbnailMediaId" value={thumbnailId ?? ""} />
        </Card>

        <Card title="OG image (optional)">
          <ImagePicker mediaId={ogId} onChange={setOgId} hint="Overrides thumbnail for social shares." />
          <input type="hidden" name="ogMediaId" value={ogId ?? ""} />
        </Card>

        <Card title="Categories">
          <ul className="space-y-1">
            {categories.map((c) => (
              <li key={c.id}>
                <label className="flex items-center gap-2 rounded-lg px-1 py-1 hover:bg-ink-50">
                  <input
                    type="checkbox"
                    checked={selectedCats.has(c.id)}
                    onChange={() => {
                      const n = new Set(selectedCats);
                      n.has(c.id) ? n.delete(c.id) : n.add(c.id);
                      setSelectedCats(n);
                    }}
                    className="h-4 w-4 accent-kiwi-600"
                  />
                  <span className="text-[13px] text-ink-800">{c.name}</span>
                </label>
              </li>
            ))}
          </ul>
          <input type="hidden" name="categoryIds" value={Array.from(selectedCats).join(",")} />
        </Card>

        <div className="flex flex-col gap-2">
          <button type="submit" className="rounded-full bg-ink-900 px-5 py-2.5 text-[13px] font-medium text-ink-0 hover:bg-ink-700">
            {mode === "edit" ? "Save post" : "Create post"}
          </button>
          {mode === "edit" && postId && (
            <button
              type="button"
              onClick={async () => {
                if (!confirm("Delete this post permanently?")) return;
                await deleteBlogPost(postId);
              }}
              className="rounded-full border border-rose-200 bg-rose-50 px-5 py-2.5 text-[12.5px] font-medium text-rose-700 hover:bg-rose-100"
            >
              Delete post
            </button>
          )}
        </div>
      </aside>

      <input type="hidden" name="contentJson" value={JSON.stringify(contentJson ?? {})} />
      <input type="hidden" name="contentHtml" value={contentHtml || "<p></p>"} />
    </form>
  );
}

function ImagePicker({
  mediaId,
  onChange,
  hint,
}: {
  mediaId: string | null;
  onChange: (id: string | null) => void;
  hint?: string;
}) {
  return (
    <div>
      <div
        className={`relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl border ${
          mediaId ? "border-ink-200" : "border-dashed border-ink-300 bg-ink-50/60"
        }`}
      >
        {mediaId ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/api/media/${mediaId}`} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-[12.5px] text-ink-500">No image yet</span>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <label className="cursor-pointer rounded-full border border-ink-200 bg-ink-0 px-3 py-1.5 text-[12px] font-medium text-ink-700 hover:bg-ink-50">
          {mediaId ? "Replace" : "Upload"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const fd = new FormData();
              fd.append("file", f);
              fd.append("alt", f.name);
              const res = await fetch("/api/media", { method: "POST", body: fd });
              if (!res.ok) {
                alert("Upload failed.");
                return;
              }
              const data = (await res.json()) as { id: string };
              onChange(data.id);
            }}
          />
        </label>
        {mediaId && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="rounded-full border border-ink-200 px-3 py-1.5 text-[12px] font-medium text-ink-500 hover:bg-ink-50"
          >
            Remove
          </button>
        )}
      </div>
      {hint && <p className="mt-2 text-[11.5px] text-ink-500">{hint}</p>}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-ink-200 bg-ink-0 px-3.5 py-2 text-[13.5px] text-ink-800 placeholder:text-ink-400 outline-none focus:border-ink-400";

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-ink-200 bg-ink-0 p-6">
      {title && (
        <h2 className="mb-4 text-[14px] font-semibold uppercase tracking-[0.16em] text-ink-500">{title}</h2>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

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

function toLocal(iso: string) {
  const d = new Date(iso);
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 16);
}
