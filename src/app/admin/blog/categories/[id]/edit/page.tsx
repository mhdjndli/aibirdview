import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogCategoryForm } from "@/components/admin/BlogCategoryForm";

export const metadata = { title: "Edit blog category — Admin" };
export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cat = await prisma.blogCategory.findUnique({ where: { id } });
  if (!cat) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/blog/categories" className="text-[12.5px] text-ink-500 hover:text-ink-800">
          ← All blog categories
        </Link>
        <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
          Edit {cat.name}
        </h1>
      </div>
      <BlogCategoryForm
        mode="edit"
        categoryId={cat.id}
        initial={{
          id: cat.id,
          slug: cat.slug,
          name: cat.name,
          description: cat.description ?? "",
          sortOrder: cat.sortOrder,
        }}
      />
    </div>
  );
}
