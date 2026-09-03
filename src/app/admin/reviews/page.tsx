import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteReview } from "./actions";

export const metadata = { title: "Reviews — Admin" };
export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: { tool: { select: { slug: true, name: true } } },
  });

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
          Reviews
        </p>
        <h1 className="mt-1.5 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
          Visitor reviews
        </h1>
        <p className="mt-2 text-[13px] text-ink-500">
          Reviews publish immediately. Delete anything that&apos;s spam or abusive.
          The star rating shown on tool pages stays whatever you set on the tool itself.
        </p>
      </header>

      {reviews.length === 0 ? (
        <p className="rounded-2xl border border-ink-200 bg-ink-0 p-8 text-center text-[14px] text-ink-500">
          No reviews yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="rounded-2xl border border-ink-200 bg-ink-0 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/tools/${r.tool.slug}`}
                      target="_blank"
                      className="text-[14px] font-semibold text-ink-900 hover:text-kiwi-700"
                    >
                      {r.tool.name}
                    </Link>
                    <span className="text-[13px] text-amber-500">
                      {"★".repeat(r.stars)}
                      <span className="text-ink-200">{"★".repeat(5 - r.stars)}</span>
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-ink-500">
                    {r.name} · <a className="hover:text-kiwi-700" href={`mailto:${r.email}`}>{r.email}</a> ·{" "}
                    {r.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                  {r.text && (
                    <p className="mt-2 whitespace-pre-wrap text-[14px] leading-relaxed text-ink-700">
                      {r.text}
                    </p>
                  )}
                </div>
                <form action={deleteReview.bind(null, r.id)}>
                  <button
                    type="submit"
                    className="rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-[12px] font-medium text-rose-700 hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
