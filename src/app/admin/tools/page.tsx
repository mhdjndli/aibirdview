import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PRICING_LABELS } from "@/lib/queries";

export const metadata = { title: "Tools — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string; status?: string }>;
}) {
  const sp = await searchParams;
  const q = sp.q?.trim() || "";
  const cat = sp.cat || "";
  const status = sp.status || "all"; // all | published | drafts

  const [tools, categories] = await Promise.all([
    prisma.tool.findMany({
      where: {
        ...(q && {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { tagline: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
          ],
        }),
        ...(cat && { category: { slug: cat } }),
        ...(status === "published" && { published: true }),
        ...(status === "drafts" && { published: false }),
      },
      include: { category: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
            Directory
          </p>
          <h1 className="mt-1.5 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
            Tools
          </h1>
          <p className="mt-1 text-[13.5px] text-ink-500">
            {tools.length} {status === "all" ? "total" : status}
          </p>
        </div>
        <Link
          href="/admin/tools/new"
          className="rounded-full bg-ink-900 px-4 py-2 text-[13px] font-medium text-ink-0 hover:bg-ink-700"
        >
          + Add tool
        </Link>
      </header>

      <form className="flex flex-wrap items-center gap-2" action="/admin/tools">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by name, slug, tagline"
          className="min-w-[240px] flex-1 rounded-full border border-ink-200 bg-ink-0 px-4 py-2 text-[13.5px] outline-none focus:border-ink-400"
        />
        <select
          name="cat"
          defaultValue={cat}
          className="rounded-full border border-ink-200 bg-ink-0 px-3 py-2 text-[13px] outline-none focus:border-ink-400"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <select
          name="status"
          defaultValue={status}
          className="rounded-full border border-ink-200 bg-ink-0 px-3 py-2 text-[13px] outline-none focus:border-ink-400"
        >
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="drafts">Drafts</option>
        </select>
        <button className="rounded-full border border-ink-200 bg-ink-50 px-4 py-2 text-[13px] font-medium text-ink-700 hover:bg-ink-100">
          Filter
        </button>
      </form>

      {tools.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/60 p-12 text-center">
          <p className="text-[15px] font-medium text-ink-800">No tools match.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink-200 bg-ink-0">
          <table className="w-full text-left text-[13.5px]">
            <thead className="bg-ink-50 text-[12px] uppercase tracking-wider text-ink-500">
              <tr>
                <th className="px-4 py-3">Tool</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Pricing</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr key={t.id} className="border-t border-ink-100">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[14px] font-semibold text-ink-900"
                        style={{
                          background: `linear-gradient(135deg, ${t.swatchFrom} 0%, ${t.swatchTo} 100%)`,
                        }}
                      >
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="font-medium text-ink-900">{t.name}</div>
                        <div className="text-[12px] text-ink-500">/{t.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-700">{t.category.name}</td>
                  <td className="px-4 py-3 text-ink-700">
                    {PRICING_LABELS[t.pricing]}
                    {t.priceFrom && <span className="text-ink-400"> · {t.priceFrom}</span>}
                  </td>
                  <td className="px-4 py-3 text-ink-700">
                    {t.rating.toFixed(1)}{" "}
                    <span className="text-[12px] text-ink-400">({t.ratingCount})</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${t.published ? "border-kiwi-200 bg-kiwi-50 text-kiwi-700" : "border-ink-200 bg-ink-50 text-ink-500"}`}>
                      {t.published ? "Published" : "Draft"}
                    </span>
                    {t.featured && <span className="ml-1 inline-flex rounded-full bg-ink-900 px-2 py-0.5 text-[11px] font-medium text-ink-0">Featured</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/tools/${t.slug}/edit`}
                      className="rounded-full border border-ink-200 px-3 py-1 text-[12px] font-medium text-ink-700 hover:bg-ink-50"
                    >
                      Edit →
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
