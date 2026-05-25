import Link from "next/link";
import { getDashboardStats } from "@/lib/queries";
import { auth } from "@/auth";

export const metadata = {
  title: "Dashboard — AI BirdView Admin",
};

export default async function AdminDashboardPage() {
  const [session, stats] = await Promise.all([auth(), getDashboardStats()]);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
          Dashboard
        </p>
        <h1 className="mt-1.5 text-[28px] font-semibold tracking-[-0.022em] text-ink-900 md:text-[34px]">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}.
        </h1>
        <p className="mt-1 text-[14px] text-ink-500">
          Here&apos;s the state of AI BirdView.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Pending submissions" value={stats.pending} href="/admin/submissions" accent={stats.pending > 0} />
        <Stat label="Tools published" value={stats.publishedTools} href="/admin/tools" />
        <Stat label="Categories" value={stats.totalCategories} href="/admin/categories" />
        <Stat label="Blog posts" value={stats.posts} href="/admin/blog" hint={`${stats.drafts} drafts`} />
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Quick title="Review submissions" desc={stats.pending === 0 ? "Nothing in the queue right now." : `${stats.pending} waiting for a decision.`} href="/admin/submissions" cta="Open queue" />
        <Quick title="Write a blog post" desc="Open the editor and ship a new post." href="/admin/blog/new" cta="New post" />
        <Quick title="Add a tool manually" desc="Skip the queue — list a tool yourself." href="/admin/tools/new" cta="New tool" />
        <Quick title="Edit site settings" desc="Hero copy, social links, featured tools." href="/admin/settings" cta="Open settings" />
      </section>
    </div>
  );
}

function Stat({ label, value, href, accent, hint }: { label: string; value: number; href: string; accent?: boolean; hint?: string }) {
  return (
    <Link
      href={href}
      className={`block rounded-2xl border bg-ink-0 p-5 transition-colors ${
        accent ? "border-kiwi-300 bg-kiwi-50/40 hover:bg-kiwi-50" : "border-ink-200 hover:bg-ink-50"
      }`}
    >
      <p className="text-[12px] font-medium text-ink-500">{label}</p>
      <p className="mt-1 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">{value.toLocaleString()}</p>
      {hint && <p className="mt-1 text-[11.5px] text-ink-400">{hint}</p>}
    </Link>
  );
}

function Quick({ title, desc, href, cta }: { title: string; desc: string; href: string; cta: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-ink-200 bg-ink-0 p-5">
      <div>
        <p className="text-[15px] font-semibold tracking-[-0.022em] text-ink-900">{title}</p>
        <p className="mt-1 text-[13.5px] text-ink-500">{desc}</p>
      </div>
      <Link
        href={href}
        className="shrink-0 rounded-full border border-ink-200 bg-ink-50 px-3.5 py-1.5 text-[12.5px] font-medium text-ink-700 hover:bg-ink-100"
      >
        {cta} →
      </Link>
    </div>
  );
}
