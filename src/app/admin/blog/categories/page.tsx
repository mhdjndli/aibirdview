import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Blog categories — Admin" };
export const dynamic = "force-dynamic";

export default async function BlogCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  const sp = await searchParams;
  const cats = await prisma.blogCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">Content</p>
          <h1 className="mt-1.5 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">Blog categories</h1>
        </div>
        <Link href="/admin/blog/categories/new" className="rounded-full bg-ink-900 px-4 py-2 text-[13px] font-medium text-ink-0 hover:bg-ink-700">
          + Add category
        </Link>
      </header>

      {sp.saved && <p className="rounded-xl border border-kiwi-200 bg-kiwi-50/60 px-4 py-2.5 text-[13px] text-kiwi-800">Saved.</p>}
      {sp.deleted && <p className="rounded-xl border border-ink-200 bg-ink-50 px-4 py-2.5 text-[13px] text-ink-700">Deleted.</p>}

      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-ink-0">
        <table className="w-full text-left text-[13.5px]">
          <thead className="bg-ink-50 text-[12px] uppercase tracking-wider text-ink-500">
            <tr>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Posts</th>
              <th className="px-4 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {cats.map((c) => (
              <tr key={c.id} className="border-t border-ink-100">
                <td className="px-4 py-3">
                  <div className="font-medium text-ink-900">{c.name}</div>
                  <div className="text-[12px] text-ink-500">/blog/category/{c.slug}</div>
                </td>
                <td className="px-4 py-3 text-ink-600 max-w-md">{c.description || <span className="text-ink-400">—</span>}</td>
                <td className="px-4 py-3 text-ink-700">{c._count.posts}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/blog/categories/${c.id}/edit`}
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
    </div>
  );
}
