import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { SubmissionStatus } from "@prisma/client";

export const metadata = { title: "Submissions — Admin" };
export const dynamic = "force-dynamic";

const TABS: { label: string; key: "PENDING" | "APPROVED" | "REJECTED" | "ALL" }[] = [
  { label: "Pending", key: "PENDING" },
  { label: "Approved", key: "APPROVED" },
  { label: "Rejected", key: "REJECTED" },
  { label: "All", key: "ALL" },
];

const STATUS_BADGE: Record<SubmissionStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  APPROVED: "bg-kiwi-50 text-kiwi-700 border-kiwi-200",
  REJECTED: "bg-rose-50 text-rose-700 border-rose-200",
};

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const statusFilter = (params.status as "PENDING" | "APPROVED" | "REJECTED" | "ALL") || "PENDING";

  const where = statusFilter === "ALL" ? {} : { status: statusFilter as SubmissionStatus };

  const [submissions, counts] = await Promise.all([
    prisma.submission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { tool: { select: { slug: true } } },
    }),
    prisma.submission.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
  ]);

  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count._all]));
  const totalAll = counts.reduce((s, c) => s + c._count._all, 0);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
          Submissions
        </p>
        <h1 className="mt-1.5 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
          Review queue
        </h1>
      </header>

      <nav className="flex flex-wrap gap-1.5 border-b border-ink-200 pb-3">
        {TABS.map((tab) => {
          const count =
            tab.key === "ALL"
              ? totalAll
              : countMap[tab.key] ?? 0;
          const active = statusFilter === tab.key;
          return (
            <Link
              key={tab.key}
              href={`/admin/submissions?status=${tab.key}`}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                active
                  ? "bg-ink-900 text-ink-0"
                  : "bg-ink-50 text-ink-700 hover:bg-ink-100"
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 ${active ? "text-ink-400" : "text-ink-400"}`}>
                {count}
              </span>
            </Link>
          );
        })}
      </nav>

      {submissions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/60 p-12 text-center">
          <p className="text-[15px] font-medium text-ink-800">
            Nothing here yet.
          </p>
          <p className="mt-1 text-[13.5px] text-ink-500">
            New submissions land in this queue automatically.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink-200 bg-ink-0">
          <table className="w-full text-left text-[13.5px]">
            <thead className="bg-ink-50 text-[12px] uppercase tracking-wider text-ink-500">
              <tr>
                <th className="px-4 py-3">Tool</th>
                <th className="px-4 py-3">Submitter</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Pricing</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Review</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id} className="border-t border-ink-100">
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink-900">{s.name}</div>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="block text-[12px] text-ink-500 hover:text-kiwi-700">
                      {new URL(s.url).hostname.replace(/^www\./, "")}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-ink-800">{s.contactName}</div>
                    <div className="text-[12px] text-ink-500">{s.email}</div>
                  </td>
                  <td className="px-4 py-3 text-ink-700">{s.categorySlug}</td>
                  <td className="px-4 py-3 text-ink-700">{s.pricing.toLowerCase().replace("_", " ")}</td>
                  <td className="px-4 py-3 text-ink-500">
                    {new Date(s.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${STATUS_BADGE[s.status]}`}>
                      {s.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/submissions/${s.id}`}
                      className="rounded-full border border-ink-200 px-3 py-1 text-[12px] font-medium text-ink-700 hover:bg-ink-50"
                    >
                      Open →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
