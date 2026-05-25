import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getBlogCategories } from "@/lib/queries";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const cats = await getBlogCategories();
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = await prisma.blogCategory.findUnique({ where: { slug } });
  if (!cat) return {};
  return {
    title: `${cat.name} — Blog | AI BirdView`,
    description: cat.description ?? `Articles in ${cat.name}.`,
    alternates: { canonical: `/blog/category/${cat.slug}` },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = await prisma.blogCategory.findUnique({ where: { slug } });
  if (!cat) notFound();

  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
      publishedAt: { lte: new Date() },
      categories: { some: { categoryId: cat.id } },
    },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200">
        <div className="mesh-bg absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-12 md:pt-20">
          <nav className="text-[13px] text-ink-500" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:text-ink-800">Blog</Link>
            <span className="mx-2 text-ink-300">/</span>
            <span className="text-ink-800">{cat.name}</span>
          </nav>
          <h1 className="mt-5 text-[40px] font-semibold leading-[1.05] tracking-[-0.032em] text-ink-900 md:text-[52px]">
            {cat.name}
          </h1>
          {cat.description && <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-500">{cat.description}</p>}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-ink-0 transition-all duration-500 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.12)]"
            >
              <div className="aspect-[16/10] bg-kiwi-100">
                {p.thumbnailMediaId && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/api/media/${p.thumbnailMediaId}`} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex-1 p-6">
                <p className="text-[11.5px] text-ink-500">{p.readingMinutes} min read</p>
                <h3 className="mt-1.5 text-[19px] font-semibold tracking-[-0.022em] text-ink-900">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-ink-500">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
