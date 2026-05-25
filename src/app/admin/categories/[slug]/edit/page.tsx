import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CategoryForm } from "@/components/admin/CategoryForm";

export const metadata = { title: "Edit category — Admin" };
export const dynamic = "force-dynamic";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = await prisma.category.findUnique({ where: { slug } });
  if (!cat) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/categories" className="text-[12.5px] text-ink-500 hover:text-ink-800">
          ← All categories
        </Link>
        <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
          Edit {cat.name}
        </h1>
      </div>
      <CategoryForm
        mode="edit"
        categoryId={cat.id}
        initial={{
          slug: cat.slug,
          name: cat.name,
          tagline: cat.tagline,
          description: cat.description,
          glyph: cat.glyph,
          accent: cat.accent,
          sortOrder: cat.sortOrder,
        }}
      />
    </div>
  );
}
