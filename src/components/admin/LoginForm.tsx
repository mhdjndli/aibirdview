"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("callbackUrl") || "/admin";

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setPending(true);
        const fd = new FormData(e.currentTarget);
        const res = await signIn("credentials", {
          email: String(fd.get("email") || ""),
          password: String(fd.get("password") || ""),
          redirect: false,
        });
        setPending(false);
        if (!res || res.error) {
          setError("Invalid email or password.");
          return;
        }
        router.push(next);
        router.refresh();
      }}
      className="space-y-4"
    >
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-medium text-ink-800">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus
          className="w-full rounded-xl border border-ink-200 bg-ink-0 px-3.5 py-2.5 text-[15px] outline-none focus:border-ink-400"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-medium text-ink-800">Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-ink-200 bg-ink-0 px-3.5 py-2.5 text-[15px] outline-none focus:border-ink-400"
        />
      </label>

      {error && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[13px] text-rose-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink-900 px-5 py-3 text-[14px] font-medium text-ink-0 transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-[1.01] disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
