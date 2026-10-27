import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { EditData } from "@/app/(public)/account/actions";
import { approveEdit, rejectEdit, setOwnerStatus } from "./actions";

export const metadata = { title: "Owners & edits | Admin" };
export const dynamic = "force-dynamic";

const LABELS: Record<string, string> = {
  name: "Name", tagline: "Tagline", description: "Short description", longDescription: "What it is",
  url: "Website", pricing: "Pricing", priceFrom: "Starting price", founded: "Founded", features: "Features",
  logoMediaId: "Logo", screenshot1MediaId: "Screenshot 1", screenshot2MediaId: "Screenshot 2", screenshot3MediaId: "Screenshot 3",
};

function show(key: string, value: unknown) {
  if (value === null || value === undefined || value === "") return <span className="text-ink-400">(empty)</span>;
  if (key.endsWith("MediaId")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`/api/media/${value}`} alt="" className="h-16 rounded-lg border border-ink-200 object-cover" />;
  }
  if (Array.isArray(value)) return <ul className="list-disc pl-4">{value.map((v) => <li key={String(v)}>{String(v)}</li>)}</ul>;
  return <span className="whitespace-pre-wrap">{String(value)}</span>;
}

export default async function EditsPage() {
  const [edits, pendingClaims, recentOwners] = await Promise.all([
    prisma.toolEdit.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "asc" },
      include: { tool: { include: { features: { orderBy: { order: "asc" } } } } },
    }),
    prisma.toolOwner.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "asc" },
      include: { tool: { select: { name: true, slug: true, url: true } } },
    }),
    prisma.toolOwner.findMany({
      where: { status: "ACTIVE", method: { not: "SUBMISSION" } },
      orderBy: { createdAt: "desc" },
      take: 30,
      include: { tool: { select: { name: true, slug: true } } },
    }),
  ]);

  const section = "text-[18px] font-semibold tracking-[-0.02em] text-ink-900";
  const btn = "rounded-full px-3.5 py-1.5 text-[12.5px] font-medium";

  return (
    <div className="space-y-10">
      <header>
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">Owners</p>
        <h1 className="mt-1.5 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">Owners &amp; edits</h1>
        <p className="mt-2 text-[13px] text-ink-500">
          Owners propose changes to their listings; nothing goes live until you approve it here.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className={section}>Edits to review ({edits.length})</h2>
        {edits.length === 0 && <p className="text-[14px] text-ink-500">Nothing waiting.</p>}
        {edits.map((e) => {
          const data = e.data as EditData;
          const current: Record<string, unknown> = { ...e.tool, features: e.tool.features.map((f) => f.text) };
          return (
            <article key={e.id} className="rounded-2xl border border-ink-200 bg-ink-0 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <Link href={`/tools/${e.tool.slug}`} target="_blank" className="text-[15px] font-semibold text-ink-900 hover:text-kiwi-700">
                    {e.tool.name}
                  </Link>
                  <p className="text-[12.5px] text-ink-500">by {e.email} · {new Date(e.createdAt).toLocaleString()}</p>
                </div>
                <form action={approveEdit.bind(null, e.id)}>
                  <button className={`${btn} bg-ink-900 text-ink-0 hover:bg-ink-800`}>Approve and publish</button>
                </form>
              </div>
              <table className="mt-4 w-full text-left text-[13px]">
                <thead className="text-[11px] uppercase tracking-wider text-ink-400">
                  <tr><th className="w-36 py-1.5">Field</th><th className="py-1.5">Now</th><th className="py-1.5">Proposed</th></tr>
                </thead>
                <tbody>
                  {Object.entries(data).map(([key, value]) => (
                    <tr key={key} className="border-t border-ink-100 align-top">
                      <td className="py-2 pr-3 font-medium text-ink-700">{LABELS[key] ?? key}</td>
                      <td className="py-2 pr-3 text-ink-500">{show(key, current[key])}</td>
                      <td className="py-2 text-ink-900">{show(key, value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <form action={rejectEdit.bind(null, e.id)} className="mt-4 flex flex-wrap items-center gap-2">
                <input name="note" placeholder="Reason (sent to the owner)" className="min-w-0 flex-1 rounded-full border border-ink-200 px-3.5 py-1.5 text-[13px]" />
                <button className={`${btn} border border-ink-200 text-ink-700 hover:bg-ink-50`}>Reject</button>
              </form>
            </article>
          );
        })}
      </section>

      <section className="space-y-4">
        <h2 className={section}>Ownership requests ({pendingClaims.length})</h2>
        {pendingClaims.length === 0 && <p className="text-[14px] text-ink-500">Nothing waiting.</p>}
        {pendingClaims.map((o) => (
          <div key={o.id} className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-ink-200 bg-ink-0 p-5">
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-ink-900">{o.tool.name}</p>
              <p className="text-[12.5px] text-ink-500">{o.email} · {o.tool.url}</p>
              {o.note && <p className="mt-2 whitespace-pre-wrap text-[13px] text-ink-700">{o.note}</p>}
            </div>
            <div className="flex gap-2">
              <form action={setOwnerStatus.bind(null, o.id, "ACTIVE")}>
                <button className={`${btn} bg-ink-900 text-ink-0 hover:bg-ink-800`}>Approve</button>
              </form>
              <form action={setOwnerStatus.bind(null, o.id, "REVOKED")}>
                <button className={`${btn} border border-ink-200 text-ink-700 hover:bg-ink-50`}>Decline</button>
              </form>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className={section}>Recent claims</h2>
        <p className="text-[13px] text-ink-500">Verified by email domain or approved by you. Submitters own their tools automatically.</p>
        {recentOwners.length === 0 ? (
          <p className="text-[14px] text-ink-500">None yet.</p>
        ) : (
          <ul className="divide-y divide-ink-100 rounded-2xl border border-ink-200 bg-ink-0">
            {recentOwners.map((o) => (
              <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-[13.5px]">
                <span><span className="font-medium text-ink-900">{o.tool.name}</span> <span className="text-ink-500">· {o.email} · {o.method === "EMAIL_DOMAIN" ? "email domain" : "manual"}</span></span>
                <form action={setOwnerStatus.bind(null, o.id, "REVOKED")}>
                  <button className="text-[12.5px] text-ink-500 hover:text-rose-600">Revoke</button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
