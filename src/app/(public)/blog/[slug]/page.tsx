import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/queries";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, SITE } from "@/lib/site";
import { prisma } from "@/lib/prisma";

const EDITORIAL_TEAM = `${SITE.name} Editorial Team`;

/** A real person's name, or null for the shared admin account (shown as the editorial team). */
function personName(author: { name: string | null } | null): string | null {
  const name = author?.name?.trim();
  return name && !/^admin$/i.test(name) && !name.includes("@") ? name : null;
}

export const dynamicParams = true;
export const revalidate = 60;

// Posts render on first visit and are then cached (ISR), like tool pages.
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) return {};

  const seoTitle = post.seoTitle || post.title;
  const seoDescription = post.seoDescription || post.excerpt;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const [allPosts, reviewedTool] = await Promise.all([
    getPublishedPosts(),
    // A "<tool>-review" post sends readers on to the tool's listing.
    post.slug.endsWith("-review")
      ? prisma.tool.findFirst({
          where: { slug: post.slug.replace(/-review$/, ""), published: true },
          select: { slug: true, name: true, tagline: true },
        })
      : Promise.resolve(null),
  ]);
  const related = allPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const author = personName(post.author);
  const updated =
    post.publishedAt && post.updatedAt.getTime() - post.publishedAt.getTime() > 24 * 60 * 60 * 1000
      ? post.updatedAt
      : null;

  const ogImageUrl = post.ogMediaId
    ? absoluteUrl(`/api/media/${post.ogMediaId}`)
    : post.thumbnailMediaId
    ? absoluteUrl(`/api/media/${post.thumbnailMediaId}`)
    : undefined;

  return (
    <article>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt?.toISOString(),
            dateModified: post.updatedAt.toISOString(),
            image: ogImageUrl,
            author: author
              ? { "@type": "Person", name: author }
              : { "@type": "Organization", name: EDITORIAL_TEAM, url: absoluteUrl("/about") },
            publisher: {
              "@type": "Organization",
              name: SITE.name,
              logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.svg") },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": absoluteUrl(`/blog/${post.slug}`),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Blog", item: absoluteUrl("/blog") },
              ...(post.categories[0]
                ? [
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: post.categories[0].category.name,
                      item: absoluteUrl(`/blog/category/${post.categories[0].category.slug}`),
                    },
                  ]
                : []),
              {
                "@type": "ListItem",
                position: post.categories[0] ? 3 : 2,
                name: post.title,
                item: absoluteUrl(`/blog/${post.slug}`),
              },
            ],
          },
        ]}
      />
      <section className="relative overflow-hidden border-b border-ink-200">
        <div className="mesh-bg absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-3xl px-5 lg:px-8 pt-16 pb-12 md:pt-20">
          <nav className="text-[13px] text-ink-500" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:text-ink-800">Blog</Link>
            {post.categories[0] && (
              <>
                <span className="mx-2 text-ink-300">/</span>
                <Link
                  href={`/blog/category/${post.categories[0].category.slug}`}
                  className="hover:text-ink-800"
                >
                  {post.categories[0].category.name}
                </Link>
              </>
            )}
          </nav>

          <h1 className="mt-6 text-balance text-[40px] font-semibold leading-[1.06] tracking-[-0.032em] text-ink-900 md:text-[56px]">
            {post.title}
          </h1>
          <p className="mt-5 text-[18px] leading-relaxed text-ink-500">{post.excerpt}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-[13px] text-ink-500">
            {author ? (
              <span>{author}</span>
            ) : (
              <Link href="/about" className="hover:text-ink-800">{EDITORIAL_TEAM}</Link>
            )}
            {post.publishedAt && (
              <>
                <span className="text-ink-300">·</span>
                <time dateTime={post.publishedAt.toISOString()}>
                  {post.publishedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
              </>
            )}
            {updated && (
              <>
                <span className="text-ink-300">·</span>
                <span>
                  Updated{" "}
                  <time dateTime={updated.toISOString()}>
                    {updated.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </time>
                </span>
              </>
            )}
            <span className="text-ink-300">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </div>
      </section>

      {post.thumbnailMediaId && (
        <div className="mx-auto -mt-2 max-w-4xl px-5 lg:px-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/media/${post.thumbnailMediaId}`}
            alt={post.title}
            className="aspect-[16/8] w-full rounded-3xl border border-ink-200 object-cover"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-5 lg:px-8 py-12 md:py-16">
        <div
          className="prose prose-ink max-w-none"
          // contentHtml is generated from Tiptap on the admin side and stored sanitized
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
        {reviewedTool && (
          <Link
            href={`/tools/${reviewedTool.slug}`}
            className="group mt-12 block rounded-2xl border border-kiwi-200 bg-kiwi-50 p-6 hover:border-kiwi-300"
          >
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">In the directory</span>
            <span className="mt-2 block text-[20px] font-semibold text-ink-900 group-hover:text-kiwi-700">
              {reviewedTool.name}: pricing, features and alternatives →
            </span>
            <span className="mt-1 block text-[14px] leading-relaxed text-ink-600">{reviewedTool.tagline}</span>
          </Link>
        )}
      </div>

      {related.length > 0 && (
        <section className="border-t border-ink-200 bg-ink-50/50">
          <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
            <h2 className="text-[24px] font-semibold tracking-[-0.022em] text-ink-900 md:text-[28px]">
              Keep reading
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-ink-200 bg-ink-0 transition-all duration-500 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.12)]"
                >
                  <div className="aspect-[16/10] bg-kiwi-100">
                    {r.thumbnailMediaId && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/api/media/${r.thumbnailMediaId}`} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-[11.5px] text-ink-500">{r.readingMinutes} min read</p>
                    <h3 className="mt-1.5 text-[16px] font-semibold tracking-[-0.022em] text-ink-900 line-clamp-2">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
