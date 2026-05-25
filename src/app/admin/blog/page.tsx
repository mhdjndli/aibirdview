import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Blog — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const sp = await searchParams;
  const q = sp.q?.trim() || "";
  const status = sp.status || "all";

  const posts = await prisma.blogPost.findMany({
    where: {
      ...(q && {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { slug: { contains: q, mode: "insensitive" } },
        ],
      }),
      ...(status === "published" && { published: true }),
      ...(status === "drafts" && { published: false }),
    },
    orderBy: { updatedAt: "desc" },
    include: { categories: { include: { category: true } }, author: { select: { name: true, email: true } } },
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
            Content
          </p>
          <h1 className="mt-1.5 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
            Blog posts
          </h1>
          <p className="mt-1 text-[13.5px] text-ink-500">
            {posts.length} {status === "all" ? "total" : status}
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="rounded-full bg-ink-900 px-4 py-2 text-[13px] font-medium text-ink-0 hover:bg-ink-700"
        >
          + New post
        </Link>
      </header>

      <form className="flex flex-wrap items-center gap-2" action="/admin/blog">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by title or slug"
          className="min-w-[240px] flex-1 rounded-full border border-ink-200 bg-ink-0 px-4 py-2 text-[13.5px] outline-none focus:border-ink-400"
        />
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

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/60 p-12 text-center">
          <p className="text-[15px] font-medium text-ink-800">No posts yet.</p>
          <p className="mt-1 text-[13.5px] text-ink-500">
            <Link href="/admin/blog/new" className="text-kiwi-700 hover:underline">Write your first post →</Link>
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink-200 bg-ink-0">
          <table className="w-full text-left text-[13.5px]">
            <thead className="bg-ink-50 text-[12px] uppercase tracking-wider text-ink-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Categories</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-t border-ink-100">
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink-900">{p.title}</div>
                    <div className="text-[12px] text-ink-500">/blog/{p.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-ink-700">
                    {p.categories.map((c) => c.category.name).join(", ") || <span className="text-ink-400">—</span>}
                  </td>
                  <td className="px-4 py-3 text-ink-700">
                    {p.author?.name || p.author?.email || <span className="text-ink-400">—</span>}
                  </td>
                  <td className="px-4 py-3 text-ink-500">
                    {new Date(p.updatedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${p.published ? "border-kiwi-200 bg-kiwi-50 text-kiwi-700" : "border-ink-200 bg-ink-50 text-ink-500"}`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/blog/${p.id}/edit`}
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
