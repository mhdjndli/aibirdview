"use client";

import { useState } from "react";
import { saveTool, deleteTool } from "@/app/admin/tools/actions";

type ToolDefaults = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  url: string;
  categorySlug: string;
  pricing: "FREE" | "FREEMIUM" | "FREE_TRIAL" | "PAID";
  priceFrom: string | null;
  rating: number;
  ratingCount: number;
  founded: string | null;
  featured: boolean;
  trending: boolean;
  verified: boolean;
  published: boolean;
  swatchFrom: string;
  swatchTo: string;
  features: string[];
  pros: string[];
  cons: string[];
  tags: string[];
  seoTitle: string | null;
  seoDescription: string | null;
  metaKeywords: string | null;
};

type CategoryOption = { slug: string; name: string };

const PRICING_OPTIONS = [
  { value: "FREE", label: "Free" },
  { value: "FREEMIUM", label: "Freemium" },
  { value: "FREE_TRIAL", label: "Free trial" },
  { value: "PAID", label: "Paid" },
] as const;

const SWATCH_PRESETS: [string, string][] = [
  ["#c8e6a8", "#8dc474"],
  ["#fde68a", "#f59e0b"],
  ["#fecaca", "#ef4444"],
  ["#bae6fd", "#0ea5e9"],
  ["#ddd6fe", "#8b5cf6"],
  ["#a7f3d0", "#10b981"],
  ["#fed7aa", "#f97316"],
  ["#c7d2fe", "#6366f1"],
];

export function ToolForm({
  initial,
  mode,
  categories,
  toolId,
}: {
  initial: ToolDefaults;
  mode: "create" | "edit";
  categories: CategoryOption[];
  toolId?: string;
}) {
  const [from, setFrom] = useState(initial.swatchFrom);
  const [to, setTo] = useState(initial.swatchTo);
  const [name, setName] = useState(initial.name);

  return (
    <form
      action={saveTool.bind(null, mode === "edit" ? initial.slug : null)}
      className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]"
    >
      <div className="space-y-8">
        <Card title="Basics">
          <Grid2>
            <Field label="Name" required>
              <input
                name="name"
                required
                defaultValue={initial.name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Slug" hint="Auto-generated from name if blank">
              <input
                name="slug"
                defaultValue={initial.slug}
                placeholder={slugifyPreview(name)}
                className={inputCls}
              />
            </Field>
          </Grid2>
          <Field label="Tagline" required hint="One sentence — shown in cards. Max 200 chars.">
            <input name="tagline" required maxLength={200} defaultValue={initial.tagline} className={inputCls} />
          </Field>
          <Field label="Short description" required hint="2–3 sentences for the directory card / search results.">
            <textarea name="description" required rows={3} defaultValue={initial.description} className={inputCls} />
          </Field>
          <Field label="Long description" required hint="Used on the tool detail page (under 'What it is').">
            <textarea name="longDescription" required rows={6} defaultValue={initial.longDescription} className={inputCls} />
          </Field>
          <Field label="Website URL" required>
            <input name="url" type="url" required defaultValue={initial.url} className={inputCls} />
          </Field>
        </Card>

        <Card title="Classification">
          <Grid2>
            <Field label="Category" required>
              <select name="categorySlug" required defaultValue={initial.categorySlug} className={inputCls}>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Pricing" required>
              <select name="pricing" required defaultValue={initial.pricing} className={inputCls}>
                {PRICING_OPTIONS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Starting price" hint="e.g. $19/mo">
              <input name="priceFrom" defaultValue={initial.priceFrom ?? ""} className={inputCls} />
            </Field>
            <Field label="Founded year">
              <input name="founded" defaultValue={initial.founded ?? ""} className={inputCls} />
            </Field>
            <Field label="Rating (0–5)">
              <input name="rating" type="number" step="0.1" min={0} max={5} defaultValue={initial.rating} className={inputCls} />
            </Field>
            <Field label="Rating count">
              <input name="ratingCount" type="number" min={0} defaultValue={initial.ratingCount} className={inputCls} />
            </Field>
          </Grid2>
          <Field label="Tags" hint="Comma- or newline-separated.">
            <input name="tags" defaultValue={initial.tags.join(", ")} className={inputCls} placeholder="Long-form, Editor, Tone control" />
          </Field>
        </Card>

        <Card title="Content sections (one per line)">
          <Field label="Key features">
            <textarea name="features" rows={4} defaultValue={initial.features.join("\n")} className={inputCls} placeholder="Outline-aware revisions&#10;House style enforcement" />
          </Field>
          <Grid2>
            <Field label="What we liked">
              <textarea name="pros" rows={4} defaultValue={initial.pros.join("\n")} className={inputCls} />
            </Field>
            <Field label="Worth noting">
              <textarea name="cons" rows={4} defaultValue={initial.cons.join("\n")} className={inputCls} />
            </Field>
          </Grid2>
        </Card>

        <Card title="SEO">
          <Field label="SEO title" hint="Defaults to '[Name] Review (year) — Features, Pricing & Alternatives | AI BirdView' if blank.">
            <input name="seoTitle" maxLength={140} defaultValue={initial.seoTitle ?? ""} className={inputCls} />
          </Field>
          <Field label="Meta description" hint="120–160 chars is the sweet spot.">
            <textarea name="seoDescription" rows={2} maxLength={320} defaultValue={initial.seoDescription ?? ""} className={inputCls} />
          </Field>
          <Field label="Meta keywords" hint="Optional. Some niche search engines still index these.">
            <input name="metaKeywords" defaultValue={initial.metaKeywords ?? ""} className={inputCls} />
          </Field>
        </Card>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
        <Card title="Publishing">
          <CheckRow name="published" label="Published" defaultChecked={initial.published} hint="Hide from public site if off." />
          <CheckRow name="featured" label="Featured" defaultChecked={initial.featured} hint="Appears in 'Editor's picks'." />
          <CheckRow name="trending" label="Trending" defaultChecked={initial.trending} hint="Appears in 'Trending'." />
          <CheckRow name="verified" label="Verified" defaultChecked={initial.verified} hint="Shows verified badge." />
        </Card>

        <Card title="Card visual">
          <p className="text-[12px] text-ink-500">Pick a preset or set custom hex values.</p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {SWATCH_PRESETS.map(([a, b]) => (
              <button
                type="button"
                key={`${a}${b}`}
                onClick={() => {
                  setFrom(a);
                  setTo(b);
                }}
                className={`h-10 w-full rounded-lg border ${from === a && to === b ? "border-ink-900 ring-2 ring-ink-900/10" : "border-ink-200"}`}
                style={{ background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)` }}
                aria-label="Use preset"
              />
            ))}
          </div>
          <Grid2>
            <Field label="From">
              <input name="swatchFrom" value={from} onChange={(e) => setFrom(e.target.value)} className={inputCls} />
            </Field>
            <Field label="To">
              <input name="swatchTo" value={to} onChange={(e) => setTo(e.target.value)} className={inputCls} />
            </Field>
          </Grid2>
          <div
            className="mt-3 h-20 rounded-xl border border-ink-200"
            style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
          />
        </Card>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="rounded-full bg-ink-900 px-5 py-2.5 text-[13px] font-medium text-ink-0 hover:bg-ink-700"
          >
            {mode === "edit" ? "Save changes" : "Create tool"}
          </button>
          {mode === "edit" && toolId && (
            <button
              type="button"
              onClick={async () => {
                if (!confirm(`Delete "${initial.name}" permanently?`)) return;
                await deleteTool(toolId);
              }}
              className="rounded-full border border-rose-200 bg-rose-50 px-5 py-2.5 text-[12.5px] font-medium text-rose-700 hover:bg-rose-100"
            >
              Delete tool
            </button>
          )}
        </div>
      </aside>
    </form>
  );
}

function slugifyPreview(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const inputCls =
  "w-full rounded-xl border border-ink-200 bg-ink-0 px-3.5 py-2 text-[13.5px] text-ink-800 placeholder:text-ink-400 outline-none focus:border-ink-400";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-ink-200 bg-ink-0 p-6">
      <h2 className="text-[14px] font-semibold uppercase tracking-[0.16em] text-ink-500">
        {title}
      </h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>;
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

function CheckRow({ name, label, defaultChecked, hint }: { name: string; label: string; defaultChecked?: boolean; hint?: string }) {
  return (
    <label className="flex items-start gap-3 rounded-lg px-1 py-1.5 hover:bg-ink-50">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="mt-0.5 h-4 w-4 accent-kiwi-600" />
      <span className="flex-1">
        <span className="block text-[13.5px] font-medium text-ink-800">{label}</span>
        {hint && <span className="block text-[11.5px] text-ink-500">{hint}</span>}
      </span>
    </label>
  );
}
