"use client";

import { useState } from "react";

type CategoryOption = { slug: string; name: string };

const PRICING: { value: "FREE" | "FREEMIUM" | "FREE_TRIAL" | "PAID"; label: string }[] = [
  { value: "FREE", label: "Free" },
  { value: "FREEMIUM", label: "Freemium" },
  { value: "FREE_TRIAL", label: "Free Trial" },
  { value: "PAID", label: "Paid" },
];

export function SubmitForm({ categories }: { categories: CategoryOption[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [logoId, setLogoId] = useState<string | null>(null);
  const [shot1Id, setShot1Id] = useState<string | null>(null);
  const [shot2Id, setShot2Id] = useState<string | null>(null);
  const [shot3Id, setShot3Id] = useState<string | null>(null);

  if (submitted) {
    return (
      <div className="rounded-3xl border border-kiwi-200 bg-kiwi-50/60 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-kiwi-500 text-ink-900">
          <CheckIcon />
        </div>
        <h2 className="mt-5 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
          Submission received.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
          We&apos;ve sent a confirmation to your email and our editors will review
          your tool within 48 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setLogoId(null);
            setShot1Id(null);
            setShot2Id(null);
            setShot3Id(null);
          }}
          className="mt-6 rounded-full border border-ink-200 bg-ink-0 px-5 py-2 text-[13px] font-medium text-ink-700 hover:bg-ink-50"
        >
          Submit another tool
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        if (!fd.get("name") || !fd.get("url") || !fd.get("email")) {
          setError("Please fill in name, URL, and contact email.");
          return;
        }
        if (!logoId) {
          setError("Please upload your tool's logo.");
          return;
        }
        setError(null);
        setPending(true);
        try {
          const res = await fetch("/api/submissions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: fd.get("name"),
              url: fd.get("url"),
              tagline: fd.get("tagline") || null,
              description: fd.get("description") || null,
              category: fd.get("category"),
              pricing: fd.get("pricing"),
              priceFrom: fd.get("priceFrom") || null,
              founded: fd.get("founded") || null,
              contactName: fd.get("contactName"),
              email: fd.get("email"),
              role: fd.get("role") || null,
              notes: fd.get("notes") || null,
              terms: fd.get("terms") === "on",
              logoMediaId: logoId,
              screenshot1MediaId: shot1Id,
              screenshot2MediaId: shot2Id,
              screenshot3MediaId: shot3Id,
            }),
          });
          if (!res.ok) {
            const data = await res.json().catch(() => null);
            setError(data?.error || "Something went wrong — please try again.");
            return;
          }
          setSubmitted(true);
        } catch {
          setError("Network error — please try again.");
        } finally {
          setPending(false);
        }
      }}
      className="space-y-10"
    >
      <FieldSet
        title="The basics"
        subtitle="Tell us about the tool — keep it short."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Tool name" required>
            <input
              name="name"
              required
              placeholder="e.g. Claro Writer"
              className={inputCls}
            />
          </Field>
          <Field label="Website URL" required>
            <input
              name="url"
              type="url"
              required
              placeholder="https://"
              className={inputCls}
            />
          </Field>
        </div>
        <Field label="One-line tagline" hint="Max 80 characters.">
          <input
            name="tagline"
            maxLength={80}
            placeholder="The long-form AI editor for serious writers"
            className={inputCls}
          />
        </Field>
        <Field
          label="Description"
          hint="2–3 sentences. What is it, who is it for, what makes it different?"
        >
          <textarea
            name="description"
            rows={4}
            placeholder="What the tool does, who it's for, what's different about it."
            className={inputCls}
          />
        </Field>
      </FieldSet>

      <FieldSet
        title="Category & pricing"
        subtitle="So we know where to list it."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Primary category" required>
            <select name="category" required className={inputCls} defaultValue="">
              <option value="" disabled>
                Choose a category
              </option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Pricing model" required>
            <select name="pricing" required className={inputCls} defaultValue="">
              <option value="" disabled>
                Choose a pricing model
              </option>
              {PRICING.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Starting price (optional)">
            <input name="priceFrom" placeholder="$19/mo" className={inputCls} />
          </Field>
          <Field label="Founded">
            <input
              name="founded"
              type="number"
              min="1990"
              max="2030"
              placeholder="2024"
              className={inputCls}
            />
          </Field>
        </div>
      </FieldSet>

      <FieldSet
        title="Brand assets"
        subtitle="Logo is required. Screenshots are optional but make your listing shine."
      >
        <Field
          label="Logo"
          required
          hint="PNG, JPEG, WebP, or SVG · max 4 MB · square works best"
        >
          <SquareUploader
            mediaId={logoId}
            onChange={setLogoId}
            aspect="square"
          />
        </Field>

        <div className="mt-2">
          <p className="text-[12.5px] font-medium text-ink-800">
            Screenshots <span className="text-ink-400">(optional, up to 3)</span>
          </p>
          <p className="text-[11.5px] text-ink-500">
            16:9 product screenshots work best — they&apos;ll appear on your tool detail page.
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SquareUploader mediaId={shot1Id} onChange={setShot1Id} aspect="wide" label="Screenshot 1" />
            <SquareUploader mediaId={shot2Id} onChange={setShot2Id} aspect="wide" label="Screenshot 2" />
            <SquareUploader mediaId={shot3Id} onChange={setShot3Id} aspect="wide" label="Screenshot 3" />
          </div>
        </div>
      </FieldSet>

      <FieldSet
        title="About you"
        subtitle="We'll only use this to reach out about your listing."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Your name" required>
            <input name="contactName" required className={inputCls} />
          </Field>
          <Field label="Contact email" required>
            <input
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className={inputCls}
            />
          </Field>
        </div>
        <Field label="Your role">
          <input
            name="role"
            placeholder="Founder, marketer, friend…"
            className={inputCls}
          />
        </Field>
      </FieldSet>

      <FieldSet title="Anything else?" subtitle="Optional.">
        <Field label="Notes for the reviewer">
          <textarea
            name="notes"
            rows={3}
            placeholder="Anything our editors should know — early-stage launch, demo link, etc."
            className={inputCls}
          />
        </Field>
        <label className="flex items-start gap-3 text-[13.5px] text-ink-700">
          <input
            type="checkbox"
            name="terms"
            required
            className="mt-1 h-4 w-4 accent-kiwi-600"
          />
          <span>
            I agree to the{" "}
            <a href="#guidelines" className="text-kiwi-700 hover:underline">
              listing guidelines
            </a>{" "}
            and confirm I have the right to submit this tool.
          </span>
        </label>
      </FieldSet>

      {error && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-700">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-200 pt-6">
        <p className="text-[12px] text-ink-500">
          We&apos;ll review and respond within 48 hours.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-6 py-3 text-[14px] font-medium text-ink-0 transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-[1.02] disabled:opacity-60"
        >
          {pending ? "Submitting…" : "Submit for review →"}
        </button>
      </div>
    </form>
  );
}

function SquareUploader({
  mediaId,
  onChange,
  aspect = "square",
  label,
}: {
  mediaId: string | null;
  onChange: (id: string | null) => void;
  aspect?: "square" | "wide";
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  return (
    <div>
      <label
        className={`relative flex ${
          aspect === "square" ? "aspect-square max-w-[180px]" : "aspect-[16/10]"
        } w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border transition-colors ${
          mediaId
            ? "border-ink-200 bg-ink-0"
            : "border-dashed border-ink-300 bg-ink-50/70 hover:bg-ink-50"
        } ${uploading ? "opacity-60" : ""}`}
      >
        {mediaId ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/api/media/${mediaId}`} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="px-3 text-center text-[12px] font-medium text-ink-500">
            {uploading ? "Uploading…" : label ? `+ ${label}` : "+ Upload"}
          </span>
        )}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          className="absolute inset-0 cursor-pointer opacity-0"
          disabled={uploading}
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setUploading(true);
            setErr(null);
            const fd = new FormData();
            fd.append("file", f);
            fd.append("alt", f.name);
            try {
              const res = await fetch("/api/media/public", { method: "POST", body: fd });
              if (!res.ok) {
                const data = await res.json().catch(() => null);
                setErr(data?.error || "Upload failed.");
                return;
              }
              const data = (await res.json()) as { id: string };
              onChange(data.id);
            } catch {
              setErr("Network error — please try again.");
            } finally {
              setUploading(false);
            }
          }}
        />
      </label>
      {mediaId && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="mt-1.5 text-[11.5px] text-ink-500 hover:text-rose-600"
        >
          Remove
        </button>
      )}
      {err && <p className="mt-1.5 text-[11.5px] text-rose-600">{err}</p>}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-ink-200 bg-ink-0 px-3.5 py-2.5 text-[14.5px] text-ink-800 placeholder:text-ink-400 outline-none focus:border-ink-400 transition-colors";

function FieldSet({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        <h3 className="text-[18px] font-semibold tracking-[-0.022em] text-ink-900">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-[13.5px] text-ink-500">{subtitle}</p>
        )}
      </div>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[13px] font-medium text-ink-800">
          {label}
          {required && <span className="ml-1 text-kiwi-600">*</span>}
        </span>
        {hint && <span className="text-[11.5px] text-ink-400">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12.5l4 4 10-10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
