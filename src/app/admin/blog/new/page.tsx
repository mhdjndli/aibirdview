import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export const metadata = { title: "New post — Admin" };

export default async function NewBlogPostPage() {
  const categories = await prisma.blogCategory.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/blog" className="text-[12.5px] text-ink-500 hover:text-ink-800">
          ← All posts
        </Link>
        <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
          New blog post
        </h1>
      </div>
      <BlogPostForm
        mode="create"
        categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
        initial={{
          title: "",
          slug: "",
          excerpt: "",
          contentJson: { type: "doc", content: [{ type: "paragraph" }] },
          contentHtml: "<p></p>",
          published: false,
          publishedAt: null,
          seoTitle: "",
          seoDescription: "",
          metaKeywords: "",
          thumbnailMediaId: null,
          ogMediaId: null,
          categoryIds: [],
        }}
      />
    </div>
  );
}
