"use client";

import { useState } from "react";
import { SquareUploader } from "@/components/SubmitForm";

export type OwnerEditValues = {
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  url: string;
  pricing: "FREE" | "FREEMIUM" | "FREE_TRIAL" | "PAID";
  priceFrom: string;
  founded: string;
  features: string;
  logoMediaId: string | null;
  screenshot1MediaId: string | null;
  screenshot2MediaId: string | null;
  screenshot3MediaId: string | null;
};

const PRICING = [
  ["FREE", "Free"],
  ["FREEMIUM", "Freemium"],
  ["FREE_TRIAL", "Free trial"],
  ["PAID", "Paid"],
] as const;

const input =
  "w-full rounded-xl border border-ink-200 bg-ink-0 px-3.5 py-2.5 text-[14.5px] text-ink-900 outline-none placeholder:text-ink-400 focus:border-ink-400";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-ink-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[12px] text-ink-400">{hint}</span>}
    </label>
  );
}

export function OwnerEditForm({
  initial,
  action,
}: {
  initial: OwnerEditValues;
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [logo, setLogo] = useState(initial.logoMediaId);
  const [shots, setShots] = useState([initial.screenshot1MediaId, initial.screenshot2MediaId, initial.screenshot3MediaId]);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="logoMediaId" value={logo ?? ""} />
      {shots.map((id, i) => (
        <input key={i} type="hidden" name={`screenshot${i + 1}MediaId`} value={id ?? ""} />
      ))}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name">
          <input name="name" required maxLength={120} defaultValue={initial.name} className={input} />
        </Field>
        <Field label="Website">
          <input name="url" type="url" required defaultValue={initial.url} className={input} />
        </Field>
      </div>
      <Field label="Tagline" hint="One line shown on cards. Max 200 characters.">
        <input name="tagline" required maxLength={200} defaultValue={initial.tagline} className={input} />
      </Field>
      <Field label="Short description" hint="2 to 3 sentences for cards and search results.">
        <textarea name="description" required rows={3} maxLength={2000} defaultValue={initial.description} className={input} />
      </Field>
      <Field label="What it is" hint="The main description on your listing page.">
        <textarea name="longDescription" required rows={6} maxLength={6000} defaultValue={initial.longDescription} className={input} />
      </Field>
      <Field label="Key features" hint="One per line, up to 12.">
        <textarea name="features" rows={5} defaultValue={initial.features} className={input} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Pricing">
          <select name="pricing" defaultValue={initial.pricing} className={input}>
            {PRICING.map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </Field>
        <Field label="Starting price" hint='e.g. "$12/mo"'>
          <input name="priceFrom" maxLength={40} defaultValue={initial.priceFrom} className={input} />
        </Field>
        <Field label="Founded" hint="Year">
          <input name="founded" maxLength={8} defaultValue={initial.founded} className={input} />
        </Field>
      </div>

      <div>
        <span className="mb-1.5 block text-[13px] font-medium text-ink-700">Logo and screenshots</span>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <SquareUploader mediaId={logo} onChange={setLogo} label="Logo" />
          {shots.map((id, i) => (
            <SquareUploader
              key={i}
              mediaId={id}
              aspect="wide"
              label={`Screenshot ${i + 1}`}
              onChange={(next) => setShots((s) => s.map((v, j) => (j === i ? next : v)))}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-200 pt-5">
        <p className="text-[12.5px] text-ink-500">Changes go live after a quick review by our editors.</p>
        <button
          type="submit"
          className="rounded-full bg-ink-900 px-6 py-2.5 text-[14px] font-medium text-ink-0 hover:bg-ink-800"
        >
          Submit changes for review
        </button>
      </div>
    </form>
  );
}
