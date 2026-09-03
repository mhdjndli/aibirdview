"use client";

import { useState } from "react";

/**
 * Send-code / enter-code flow for verifying an email address.
 * Key this component by the email value (`<EmailVerify key={email} …/>`) so
 * its sent/code state resets whenever the address changes.
 */
export function EmailVerify({
  email,
  verified,
  onVerified,
}: {
  email: string;
  verified: boolean;
  onVerified: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState<"send" | "confirm" | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validEmail = /^\S+@\S+\.\S+$/.test(email.trim());

  async function send() {
    setError(null);
    setNotice(null);
    setBusy("send");
    try {
      const res = await fetch("/api/verify-email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Couldn't send the code — try again.");
        return;
      }
      setSent(true);
      setNotice("Code sent — check your inbox (and spam).");
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(null);
    }
  }

  async function confirm() {
    setError(null);
    setNotice(null);
    setBusy("confirm");
    try {
      const res = await fetch("/api/verify-email/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "That code doesn't match.");
        return;
      }
      onVerified();
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(null);
    }
  }

  if (verified) {
    return (
      <p className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-kiwi-700">
        <CheckIcon /> Email verified
      </p>
    );
  }

  return (
    <div className="mt-2">
      {!sent ? (
        <button
          type="button"
          disabled={!validEmail || busy === "send"}
          onClick={send}
          className="rounded-full border border-ink-300 bg-ink-0 px-4 py-1.5 text-[12.5px] font-medium text-ink-800 hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy === "send" ? "Sending…" : "Verify email"}
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="w-32 rounded-xl border border-ink-200 bg-ink-0 px-3.5 py-2 text-[14px] tracking-[0.2em] text-ink-900 outline-none placeholder:tracking-normal placeholder:text-ink-400 focus:border-kiwi-400"
          />
          <button
            type="button"
            disabled={code.length !== 6 || busy === "confirm"}
            onClick={confirm}
            className="rounded-full bg-ink-900 px-4 py-2 text-[12.5px] font-medium text-ink-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy === "confirm" ? "Checking…" : "Confirm"}
          </button>
          <button
            type="button"
            disabled={busy === "send"}
            onClick={send}
            className="text-[12.5px] text-ink-500 hover:text-ink-800"
          >
            Resend code
          </button>
        </div>
      )}
      {notice && <p className="mt-2 text-[12.5px] text-ink-500">{notice}</p>}
      {error && <p className="mt-2 text-[12.5px] text-rose-600">{error}</p>}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="6" fill="#22c55e" />
      <path
        d="M3.6 6.2l1.7 1.7 3.1-3.6"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
