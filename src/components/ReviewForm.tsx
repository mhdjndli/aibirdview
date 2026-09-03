"use client";

import { useState } from "react";
import { EmailVerify } from "@/components/EmailVerify";

export function ReviewForm({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const emailVerified = verifiedEmail !== null && verifiedEmail === email.trim().toLowerCase();
  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (stars === 0) {
      setError("Pick a star rating.");
      return;
    }
    if (!emailVerified) {
      setError("Verify your email first.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolSlug,
          name,
          email,
          stars,
          text: text || null,
          website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-kiwi-200 bg-kiwi-50 p-6 text-center">
        <p className="text-[15px] font-medium text-ink-900">Thanks for your review.</p>
        <p className="mt-1 text-[13px] text-ink-600">
          It&apos;s live on the page — refresh to see it listed.
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-5 py-2.5 text-[14px] font-medium text-ink-0 transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-[1.02]"
      >
        Write a review
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-ink-200 bg-ink-0 p-6">
      <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink-900">
        Review {toolName}
      </p>

      <div className="mt-4 flex items-center gap-1" role="radiogroup" aria-label="Star rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={stars === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onClick={() => setStars(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            className="p-0.5 transition-transform duration-150 hover:scale-110"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 12 12"
              fill={(hovered || stars) >= n ? "#f5b400" : "#e5e5ea"}
            >
              <path d="M6 1.2l1.5 3.04 3.36.49-2.43 2.37.57 3.33L6 8.85 3 10.43l.57-3.33L1.14 4.73l3.36-.49z" />
            </svg>
          </button>
        ))}
        {stars > 0 && (
          <span className="ml-2 text-[13px] font-medium text-ink-700">{stars}/5</span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          required
          maxLength={80}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-ink-200 bg-ink-0 px-4 py-2.5 text-[14px] text-ink-900 outline-none placeholder:text-ink-400 focus:border-kiwi-400"
        />
        <input
          type="email"
          required
          maxLength={160}
          placeholder="Your email (not shown publicly)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-ink-200 bg-ink-0 px-4 py-2.5 text-[14px] text-ink-900 outline-none placeholder:text-ink-400 focus:border-kiwi-400"
        />
      </div>

      <EmailVerify
        key={email}
        email={email}
        verified={emailVerified}
        onVerified={() => setVerifiedEmail(email.trim().toLowerCase())}
      />

      <textarea
        maxLength={2000}
        rows={4}
        placeholder="Your review (optional) — what did you use it for, what worked, what didn't?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mt-3 w-full rounded-xl border border-ink-200 bg-ink-0 px-4 py-2.5 text-[14px] text-ink-900 outline-none placeholder:text-ink-400 focus:border-kiwi-400"
      />

      {/* honeypot — hidden from real visitors */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      {error && <p className="mt-3 text-[13px] text-rose-600">{error}</p>}

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-5 py-2.5 text-[14px] font-medium text-ink-0 transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-[1.02] disabled:opacity-60"
        >
          {busy ? "Submitting…" : "Submit review"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[13px] text-ink-500 hover:text-ink-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
