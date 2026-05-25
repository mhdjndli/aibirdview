"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MediaUploader() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const file = fd.get("file");
        if (!(file instanceof File) || file.size === 0) {
          setError("Pick a file first.");
          return;
        }
        setPending(true);
        setError(null);
        const res = await fetch("/api/media", { method: "POST", body: fd });
        setPending(false);
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          setError(data?.error || "Upload failed.");
          return;
        }
        (e.currentTarget as HTMLFormElement).reset();
        router.refresh();
      }}
      className="flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-ink-300 bg-ink-50/40 p-5"
    >
      <input
        name="file"
        type="file"
        accept="image/*"
        className="flex-1 text-[13.5px] text-ink-700 file:mr-3 file:rounded-full file:border-0 file:bg-ink-900 file:px-3.5 file:py-2 file:text-[12.5px] file:font-medium file:text-ink-0"
      />
      <input
        name="alt"
        placeholder="Alt text (for accessibility & SEO)"
        className="min-w-[200px] flex-1 rounded-full border border-ink-200 bg-ink-0 px-3.5 py-2 text-[13px] outline-none focus:border-ink-400"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-kiwi-500 px-4 py-2 text-[13px] font-medium text-ink-900 hover:bg-kiwi-400 disabled:opacity-60"
      >
        {pending ? "Uploading…" : "Upload"}
      </button>
      {error && <p className="w-full text-[12px] text-rose-600">{error}</p>}
    </form>
  );
}
