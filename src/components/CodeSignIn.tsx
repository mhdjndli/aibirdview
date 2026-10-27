"use client";

import { useState } from "react";

// Email → 6-digit code → signed in. With `slug`, the email must be on that
// tool's domain and verifying it also claims the listing.
export function CodeSignIn({
  slug,
  emailLabel = "Email",
  emailPlaceholder = "you@company.com",
  submitLabel = "Email me a code",
  next,
}: {
  slug?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  submitLabel?: string;
  next?: string;
}) {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function post(path: string, body: object) {
    setPending(true);
    setError(null);
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        return null;
      }
      return data;
    } catch {
      setError("Network error. Please try again.");
      return null;
    } finally {
      setPending(false);
    }
  }

  const input =
    "w-full rounded-xl border border-ink-200 bg-ink-0 px-4 py-3 text-[15px] text-ink-900 outline-none placeholder:text-ink-400 focus:border-ink-400";
  const button =
    "inline-flex w-full items-center justify-center rounded-full bg-ink-900 px-5 py-3 text-[15px] font-medium text-ink-0 hover:bg-ink-800 disabled:opacity-60";

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        if (step === "email") {
          if (await post("/api/account/send-code", { email, slug })) setStep("code");
        } else {
          const data = await post("/api/account/verify", { email, code, slug });
          if (data) window.location.href = next && !slug ? next : data.redirect;
        }
      }}
    >
      {step === "email" ? (
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-ink-700">{emailLabel}</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={emailPlaceholder}
            className={input}
          />
        </label>
      ) : (
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-ink-700">
            Enter the 6-digit code we sent to {email}
          </span>
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            maxLength={8}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            className={`${input} tracking-[0.3em]`}
          />
        </label>
      )}

      {error && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-700">{error}</p>
      )}

      <button type="submit" disabled={pending} className={button}>
        {pending ? "Please wait…" : step === "email" ? submitLabel : "Verify and continue"}
      </button>

      {step === "code" && (
        <button
          type="button"
          onClick={() => {
            setStep("email");
            setCode("");
            setError(null);
          }}
          className="block w-full text-center text-[13px] text-ink-500 hover:text-ink-800"
        >
          Use a different email
        </button>
      )}
    </form>
  );
}
