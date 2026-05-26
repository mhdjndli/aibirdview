import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { approveSubmission, rejectSubmission, reopenSubmission } from "./actions";

export const metadata = { title: "Review submission — Admin" };
export const dynamic = "force-dynamic";

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [submission, categories] = await Promise.all([
    prisma.submission.findUnique({
      where: { id },
      include: { tool: { select: { slug: true, name: true } } },
    }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  if (!submission) notFound();

  const screenshots = [
    submission.screenshot1MediaId,
    submission.screenshot2MediaId,
    submission.screenshot3MediaId,
  ].filter(Boolean) as string[];

  const approve = approveSubmission.bind(null, submission.id);
  const reject = rejectSubmission.bind(null, submission.id);
  const reopen = reopenSubmission.bind(null, submission.id);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/submissions" className="text-[12.5px] text-ink-500 hover:text-ink-800">
          ← All submissions
        </Link>
        <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
          {submission.name}
        </h1>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex rounded-full border border-ink-200 bg-ink-50 px-2 py-0.5 text-[11px] font-medium text-ink-700">
            {submission.status.toLowerCase()}
          </span>
          <span className="text-[12px] text-ink-500">
            Submitted {new Date(submission.createdAt).toLocaleString()}
          </span>
        </div>
        {submission.tool && (
          <p className="mt-2 text-[13px] text-kiwi-700">
            ↳ Lives at{" "}
            <Link href={`/tools/${submission.tool.slug}`} className="underline-offset-4 hover:underline">
              /tools/{submission.tool.slug}
            </Link>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Submission details */}
        <section className="rounded-2xl border border-ink-200 bg-ink-0 p-6">
          <h2 className="text-[14px] font-semibold uppercase tracking-[0.16em] text-ink-500">
            Brand assets
          </h2>
          <div className="mt-5 flex flex-wrap gap-5">
            <div>
              <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">Logo</p>
              {submission.logoMediaId ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/api/media/${submission.logoMediaId}`}
                  alt=""
                  className="h-20 w-20 rounded-2xl border border-ink-200 bg-ink-50 object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-dashed border-ink-300 bg-ink-50 text-[11px] text-ink-400">
                  none
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-500">Screenshots ({screenshots.length})</p>
              {screenshots.length === 0 ? (
                <p className="text-[12.5px] text-ink-400">None submitted</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {screenshots.map((mid) => (
                    <a key={mid} href={`/api/media/${mid}`} target="_blank" rel="noopener noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/api/media/${mid}`}
                        alt=""
                        className="h-20 w-32 rounded-xl border border-ink-200 bg-ink-50 object-cover"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <h2 className="mt-8 text-[14px] font-semibold uppercase tracking-[0.16em] text-ink-500">
            Submission
          </h2>
          <dl className="mt-5 space-y-4">
            <Row label="Website">
              <a href={submission.url} target="_blank" rel="noopener noreferrer" className="break-all text-kiwi-700 hover:underline">
                {submission.url}
              </a>
            </Row>
            <Row label="Tagline">{submission.tagline || <em className="text-ink-400">none</em>}</Row>
            <Row label="Description">
              <p className="whitespace-pre-wrap text-ink-700">
                {submission.description || <em className="text-ink-400">none</em>}
              </p>
            </Row>
            <Row label="Category">{submission.categorySlug}</Row>
            <Row label="Pricing">
              {submission.pricing.toLowerCase().replace("_", " ")}
              {submission.priceFrom && <span className="text-ink-500"> · from {submission.priceFrom}</span>}
            </Row>
            {submission.founded && <Row label="Founded">{submission.founded}</Row>}
          </dl>

          <h2 className="mt-8 text-[14px] font-semibold uppercase tracking-[0.16em] text-ink-500">
            Submitter
          </h2>
          <dl className="mt-5 space-y-4">
            <Row label="Name">{submission.contactName}</Row>
            <Row label="Email">
              <a href={`mailto:${submission.email}`} className="text-kiwi-700 hover:underline">
                {submission.email}
              </a>
            </Row>
            {submission.role && <Row label="Role">{submission.role}</Row>}
            {submission.notes && (
              <Row label="Notes">
                <p className="whitespace-pre-wrap text-ink-700">{submission.notes}</p>
              </Row>
            )}
          </dl>

          {submission.rejectReason && (
            <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-[13px] text-rose-700">
              <strong>Reject reason:</strong> {submission.rejectReason}
            </div>
          )}
        </section>

        {/* Actions */}
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          {submission.status === "PENDING" && (
            <>
              <form action={approve} className="rounded-2xl border border-kiwi-200 bg-kiwi-50/40 p-5">
                <h3 className="text-[14px] font-semibold text-kiwi-800">Approve</h3>
                <p className="mt-1 text-[12.5px] text-kiwi-700/80">
                  Creates a published Tool entry. You can edit anything afterwards.
                </p>
                <label className="mt-4 block text-[12px] font-medium text-ink-700">
                  Confirm category
                  <select
                    name="category"
                    defaultValue={categories.find((c) => c.slug === submission.categorySlug)?.slug ?? categories[0]?.slug}
                    className="mt-1 w-full rounded-lg border border-ink-200 bg-ink-0 px-2.5 py-2 text-[13px] outline-none focus:border-ink-400"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  className="mt-4 w-full rounded-full bg-kiwi-600 px-4 py-2.5 text-[13px] font-medium text-ink-0 hover:bg-kiwi-700"
                >
                  Approve & publish
                </button>
              </form>

              <form action={reject} className="rounded-2xl border border-ink-200 bg-ink-0 p-5">
                <h3 className="text-[14px] font-semibold text-ink-800">Reject</h3>
                <label className="mt-3 block text-[12px] font-medium text-ink-700">
                  Reason (optional, private)
                  <textarea
                    name="reason"
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-ink-200 bg-ink-0 px-2.5 py-2 text-[13px] outline-none focus:border-ink-400"
                    placeholder="Not a fit / not yet launched / etc."
                  />
                </label>
                <button
                  type="submit"
                  className="mt-3 w-full rounded-full border border-rose-200 bg-rose-50 px-4 py-2.5 text-[13px] font-medium text-rose-700 hover:bg-rose-100"
                >
                  Reject
                </button>
              </form>
            </>
          )}

          {(submission.status === "APPROVED" || submission.status === "REJECTED") && (
            <form action={reopen} className="rounded-2xl border border-ink-200 bg-ink-0 p-5">
              <h3 className="text-[14px] font-semibold text-ink-800">Reopen submission</h3>
              <p className="mt-1 text-[12.5px] text-ink-500">
                Move this back to the pending queue. (Doesn&apos;t delete the existing Tool if approved.)
              </p>
              <button
                type="submit"
                className="mt-4 w-full rounded-full border border-ink-200 bg-ink-50 px-4 py-2.5 text-[13px] font-medium text-ink-700 hover:bg-ink-100"
              >
                Reopen
              </button>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3 border-b border-ink-100 pb-3 last:border-none last:pb-0">
      <dt className="text-[12px] font-medium text-ink-500">{label}</dt>
      <dd className="text-[13.5px] text-ink-800">{children}</dd>
    </div>
  );
}
