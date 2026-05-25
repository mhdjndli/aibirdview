import Link from "next/link";
import { getBlogCategories, getPublishedPosts } from "@/lib/queries";

export const metadata = {
  title: "AI Tools Blog — Reviews, Comparisons & Guides | AI BirdView",
  description: "Long-form reviews, deep dives, and guides on the AI tools worth your time.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPublishedPosts(), getBlogCategories()]);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200">
        <div className="mesh-bg absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-16 md:pt-28">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
            The blog
          </p>
          <h1 className="mt-3 text-balance text-[44px] font-semibold leading-[1.05] tracking-[-0.032em] text-ink-900 md:text-[64px]">
            Reviews, comparisons, and notes from the field.
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-500">
            We use tools in real workflows and write up what we learned. No filler, no sponcon.
          </p>
          {categories.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/category/${c.slug}`}
                  className="rounded-full border border-ink-200 bg-ink-0 px-3.5 py-1.5 text-[12.5px] font-medium text-ink-700 hover:bg-ink-50"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
        {posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-ink-200 bg-ink-50/60 p-16 text-center">
            <p className="text-[18px] font-medium text-ink-800">No posts yet.</p>
            <p className="mt-2 text-[14px] text-ink-500">Check back soon — or subscribe in the footer.</p>
          </div>
        ) : (
          <>
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group block overflow-hidden rounded-3xl border border-ink-200 bg-ink-0 transition-all duration-500 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:shadow-[0_18px_45px_-18px_rgba(0,0,0,0.16)]"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="aspect-[16/10] md:aspect-auto bg-kiwi-100">
                    {featured.thumbnailMediaId && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/api/media/${featured.thumbnailMediaId}`}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="flex flex-wrap items-center gap-2 text-[12px] text-ink-500">
                      {featured.categories.slice(0, 2).map((c) => (
                        <span key={c.categoryId} className="rounded-full bg-ink-100 px-2 py-0.5 text-ink-700">
                          {c.category.name}
                        </span>
                      ))}
                      <span>{featured.readingMinutes} min read</span>
                    </div>
                    <h2 className="mt-4 text-[28px] font-semibold leading-tight tracking-[-0.022em] text-ink-900 md:text-[34px]">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
                      {featured.excerpt}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-1 text-[13px] font-medium text-kiwi-700">
                      Read article →
                    </p>
                  </div>
                </div>
              </Link>
            )}

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-ink-0 transition-all duration-500 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.12)]"
                >
                  <div className="aspect-[16/10] bg-kiwi-100">
                    {p.thumbnailMediaId && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/api/media/${p.thumbnailMediaId}`}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-center gap-2 text-[11.5px] text-ink-500">
                      {p.categories.slice(0, 2).map((c) => (
                        <span key={c.categoryId} className="rounded-full bg-ink-100 px-2 py-0.5 text-ink-700">
                          {c.category.name}
                        </span>
                      ))}
                      <span>{p.readingMinutes} min</span>
                    </div>
                    <h3 className="mt-3 text-[19px] font-semibold tracking-[-0.022em] text-ink-900">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-ink-500">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
