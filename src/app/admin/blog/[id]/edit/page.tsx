import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export const metadata = { title: "Edit post — Admin" };
export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const [post, categories] = await Promise.all([
    prisma.blogPost.findUnique({
      where: { id },
      include: { categories: true },
    }),
    prisma.blogCategory.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href="/admin/blog" className="text-[12.5px] text-ink-500 hover:text-ink-800">
            ← All posts
          </Link>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
            Edit post
          </h1>
          <p className="mt-1 text-[13.5px] text-ink-500">
            Lives at{" "}
            <Link href={`/blog/${post.slug}`} target="_blank" className="text-kiwi-700 hover:underline">
              /blog/{post.slug}
            </Link>
          </p>
        </div>
      </div>

      {sp.saved && (
        <p className="rounded-xl border border-kiwi-200 bg-kiwi-50/60 px-4 py-2.5 text-[13px] text-kiwi-800">
          Saved.
        </p>
      )}

      <BlogPostForm
        mode="edit"
        postId={post.id}
        categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
        initial={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          contentJson: post.contentJson,
          contentHtml: post.contentHtml,
          published: post.published,
          publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
          metaKeywords: post.metaKeywords,
          thumbnailMediaId: post.thumbnailMediaId,
          ogMediaId: post.ogMediaId,
          categoryIds: post.categories.map((c) => c.categoryId),
        }}
      />
    </div>
  );
}
