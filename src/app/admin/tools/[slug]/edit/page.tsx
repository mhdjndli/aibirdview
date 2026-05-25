import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ToolForm } from "@/components/admin/ToolForm";

export const metadata = { title: "Edit tool — Admin" };
export const dynamic = "force-dynamic";

export default async function EditToolPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; just_approved?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const [tool, categories] = await Promise.all([
    prisma.tool.findUnique({
      where: { slug },
      include: { category: true, features: { orderBy: { order: "asc" } }, pros: { orderBy: { order: "asc" } }, cons: { orderBy: { order: "asc" } }, tags: true },
    }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!tool) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href="/admin/tools" className="text-[12.5px] text-ink-500 hover:text-ink-800">
            ← All tools
          </Link>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
            Edit {tool.name}
          </h1>
          <p className="mt-1 text-[13.5px] text-ink-500">
            Lives at{" "}
            <Link href={`/tools/${tool.slug}`} target="_blank" className="text-kiwi-700 hover:underline">
              /tools/{tool.slug}
            </Link>
          </p>
        </div>
      </div>

      {sp.saved && (
        <p className="rounded-xl border border-kiwi-200 bg-kiwi-50/60 px-4 py-2.5 text-[13px] text-kiwi-800">
          Saved.
        </p>
      )}
      {sp.just_approved && (
        <p className="rounded-xl border border-kiwi-200 bg-kiwi-50/60 px-4 py-2.5 text-[13px] text-kiwi-800">
          Submission approved. Polish the listing below.
        </p>
      )}

      <ToolForm
        mode="edit"
        toolId={tool.id}
        categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
        initial={{
          slug: tool.slug,
          name: tool.name,
          tagline: tool.tagline,
          description: tool.description,
          longDescription: tool.longDescription,
          url: tool.url,
          categorySlug: tool.category.slug,
          pricing: tool.pricing,
          priceFrom: tool.priceFrom,
          rating: tool.rating,
          ratingCount: tool.ratingCount,
          founded: tool.founded,
          featured: tool.featured,
          trending: tool.trending,
          verified: tool.verified,
          published: tool.published,
          swatchFrom: tool.swatchFrom,
          swatchTo: tool.swatchTo,
          features: tool.features.map((f) => f.text),
          pros: tool.pros.map((p) => p.text),
          cons: tool.cons.map((c) => c.text),
          tags: tool.tags.map((t) => t.tag),
          seoTitle: tool.seoTitle,
          seoDescription: tool.seoDescription,
          metaKeywords: tool.metaKeywords,
        }}
      />
    </div>
  );
}
