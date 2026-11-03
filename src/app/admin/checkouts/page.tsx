import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FEATURE_PLANS, featurePlan } from "@/lib/featured";
import { CHECKOUT_SOURCES, checkoutSource } from "@/lib/checkout-clicks";
import { formatPrice } from "@/lib/stripe";

export const metadata = { title: "Checkouts | Admin" };
export const dynamic = "force-dynamic";

const DAY_MS = 24 * 60 * 60 * 1000;

async function loadCheckouts() {
  const since7 = new Date(Date.now() - 7 * DAY_MS);
  const since30 = new Date(Date.now() - 30 * DAY_MS);
  const [clicks, submissions30] = await Promise.all([
    prisma.checkoutClick.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        submission: { select: { id: true, status: true } },
        tool: { select: { slug: true } },
      },
    }),
    prisma.submission.count({ where: { createdAt: { gte: since30 } } }),
  ]);
  return {
    clicks,
    submissions30,
    clicks7: clicks.filter((c) => c.createdAt >= since7).length,
    submitters30: new Set(clicks.filter((c) => c.submissionId && c.createdAt >= since30).map((c) => c.submissionId)).size,
  };
}

export default async function CheckoutsPage() {
  const data = await loadCheckouts().catch((err: Error) => {
    console.error("[checkout] Failed to load clicks", err.message);
    return null;
  });
  if (!data) {
    return (
      <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/60 p-12 text-center">
        <p className="text-[15px] font-medium text-ink-800">Checkout tracking isn&apos;t set up yet.</p>
        <p className="mt-1 text-[13.5px] text-ink-500">
          The CheckoutClick table is missing. Run the pending Prisma migration on the database.
        </p>
      </div>
    );
  }
  const { clicks, submissions30, clicks7, submitters30 } = data;

  const paid = clicks.filter((c) => c.paidAt);
  const revenue = paid.reduce((sum, c) => sum + c.amountCents, 0);
  const people = new Set(clicks.map((c) => c.email));
  const payers = new Set(paid.map((c) => c.email));

  // One row per person and listing, newest activity first (clicks are sorted).
  const rows = new Map<string, Row>();
  for (const c of clicks) {
    const key = `${c.email}|${c.submissionId ?? c.toolId ?? c.toolName}`;
    const row = rows.get(key) ?? {
      email: c.email,
      toolName: c.toolName,
      href: c.submission
        ? `/admin/submissions/${c.submission.id}`
        : c.tool
          ? `/admin/tools/${c.tool.slug}/edit`
          : null,
      status: c.submission?.status.toLowerCase() ?? (c.tool ? "listed" : null),
      lastAt: c.createdAt,
      clicks: 0,
      products: new Set<string>(),
      sources: new Set<string>(),
      paidCents: 0,
    };
    row.clicks++;
    for (const p of products(c)) row.products.add(p);
    row.sources.add(sourceLabel(c.source));
    if (c.paidAt) row.paidCents += c.amountCents;
    rows.set(key, row);
  }

  const productStats = [
    { label: "Same-day review", match: (c: Click) => c.fastTrack },
    ...FEATURE_PLANS.map((p) => ({ label: `Featured · ${p.label}`, match: (c: Click) => c.featurePlan === p.id })),
  ].map(({ label, match }) => tally(label, clicks.filter(match)));

  const sourceStats = [
    ...Object.entries(CHECKOUT_SOURCES).map(([key, label]) => tally(label, clicks.filter((c) => c.source === key))),
    tally("Older email links", clicks.filter((c) => !checkoutSource(c.source))),
  ];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">Checkouts</p>
        <h1 className="mt-1.5 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
          Who&apos;s trying to pay
        </h1>
        <p className="mt-1 max-w-2xl text-[13.5px] text-ink-500">
          Every time someone opens Stripe Checkout for a same-day review or a featured slot. A checkout
          that isn&apos;t paid was abandoned. Clicks before Nov 3, 2026 only show same-day review
          checkouts.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Checkout clicks" value={clicks.length.toLocaleString()} hint={`${clicks7} in the last 7 days`} />
        <Stat
          label="People who clicked"
          value={people.size.toLocaleString()}
          hint={`${submitters30} of ${submissions30} submitters in the last 30 days`}
        />
        <Stat
          label="Paid"
          value={payers.size.toLocaleString()}
          hint={people.size ? `${Math.round((payers.size / people.size) * 100)}% of people who clicked` : "No clicks yet"}
          accent={payers.size > 0}
        />
        <Stat label="Revenue" value={formatPrice(revenue)} hint={`${paid.length} paid checkout${paid.length === 1 ? "" : "s"}`} />
      </section>

      {rows.size === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/60 p-12 text-center">
          <p className="text-[15px] font-medium text-ink-800">Nobody has opened a checkout yet.</p>
          <p className="mt-1 text-[13.5px] text-ink-500">Clicks show up here the moment someone opens one.</p>
        </div>
      ) : (
        <section>
          <h2 className="mb-3 text-[15px] font-semibold tracking-[-0.01em] text-ink-900">People</h2>
          <div className="overflow-x-auto rounded-2xl border border-ink-200 bg-ink-0">
            <table className="w-full min-w-[760px] text-left text-[13.5px]">
              <thead className="bg-ink-50 text-[12px] uppercase tracking-wider text-ink-500">
                <tr>
                  <th className="px-4 py-3">Who</th>
                  <th className="px-4 py-3">Tool</th>
                  <th className="px-4 py-3">Looked at</th>
                  <th className="px-4 py-3">Clicked from</th>
                  <th className="px-4 py-3 text-right">Clicks</th>
                  <th className="px-4 py-3">Last click</th>
                  <th className="px-4 py-3">Result</th>
                </tr>
              </thead>
              <tbody>
                {[...rows.values()].map((r) => (
                  <tr key={`${r.email}|${r.toolName}|${r.href}`} className="border-t border-ink-100 align-top">
                    <td className="px-4 py-3 text-ink-800">{r.email}</td>
                    <td className="px-4 py-3">
                      {r.href ? (
                        <Link href={r.href} className="font-medium text-ink-900 hover:text-kiwi-700">
                          {r.toolName}
                        </Link>
                      ) : (
                        <span className="font-medium text-ink-900">{r.toolName}</span>
                      )}
                      {r.status && <div className="text-[12px] text-ink-500">{r.status}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {[...r.products].map((p) => (
                          <span key={p} className="rounded-full bg-ink-100 px-2 py-0.5 text-[11px] font-medium text-ink-700">
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[12.5px] text-ink-600">{[...r.sources].join(", ")}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-ink-800">{r.clicks}</td>
                    <td className="px-4 py-3 text-ink-500">
                      {r.lastAt.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                    </td>
                    <td className="px-4 py-3">
                      {r.paidCents > 0 ? (
                        <span className="rounded-full bg-kiwi-100 px-2 py-0.5 text-[11px] font-semibold text-kiwi-800">
                          Paid {formatPrice(r.paidCents)}
                        </span>
                      ) : (
                        <span className="rounded-full border border-ink-200 px-2 py-0.5 text-[11px] font-medium text-ink-500">
                          Didn&apos;t pay
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Breakdown title="By product" stats={productStats} />
        <Breakdown title="By link clicked" stats={sourceStats} />
      </section>
    </div>
  );
}

type Click = Awaited<ReturnType<typeof prisma.checkoutClick.findMany>>[number];

type Row = {
  email: string;
  toolName: string;
  href: string | null;
  status: string | null;
  lastAt: Date;
  clicks: number;
  products: Set<string>;
  sources: Set<string>;
  paidCents: number;
};

type Tally = { label: string; clicks: number; paid: number };

function tally(label: string, clicks: Click[]): Tally {
  return { label, clicks: clicks.length, paid: clicks.filter((c) => c.paidAt).length };
}

function products(c: Click) {
  const list: string[] = [];
  if (c.fastTrack) list.push("Same-day review");
  const plan = featurePlan(c.featurePlan);
  if (plan) list.push(`Featured · ${plan.label}`);
  return list;
}

function sourceLabel(source: string | null) {
  const key = checkoutSource(source);
  return key ? CHECKOUT_SOURCES[key] : "Older email link";
}

function Stat({ label, value, hint, accent }: { label: string; value: string; hint?: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "border-kiwi-300 bg-kiwi-50/40" : "border-ink-200 bg-ink-0"}`}>
      <p className="text-[12px] font-medium text-ink-500">{label}</p>
      <p className="mt-1 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">{value}</p>
      {hint && <p className="mt-1 text-[11.5px] text-ink-400">{hint}</p>}
    </div>
  );
}

function Breakdown({ title, stats }: { title: string; stats: Tally[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200 bg-ink-0">
      <table className="w-full text-left text-[13.5px]">
        <thead className="bg-ink-50 text-[12px] uppercase tracking-wider text-ink-500">
          <tr>
            <th className="px-4 py-3">{title}</th>
            <th className="px-4 py-3 text-right">Clicks</th>
            <th className="px-4 py-3 text-right">Paid</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s) => (
            <tr key={s.label} className="border-t border-ink-100">
              <td className="px-4 py-2.5 text-ink-800">{s.label}</td>
              <td className={`px-4 py-2.5 text-right tabular-nums ${s.clicks ? "text-ink-900" : "text-ink-300"}`}>{s.clicks}</td>
              <td className={`px-4 py-2.5 text-right tabular-nums ${s.paid ? "font-semibold text-kiwi-700" : "text-ink-300"}`}>{s.paid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
