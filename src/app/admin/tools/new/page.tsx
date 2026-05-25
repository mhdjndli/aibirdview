import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ToolForm } from "@/components/admin/ToolForm";

export const metadata = { title: "Add tool — Admin" };

export default async function NewToolPage() {
  const categories = (await prisma.category.findMany({ orderBy: { sortOrder: "asc" } })).map(
    (c) => ({ slug: c.slug, name: c.name })
  );

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/tools" className="text-[12.5px] text-ink-500 hover:text-ink-800">
          ← All tools
        </Link>
        <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
          Add a tool
        </h1>
        <p className="mt-1 text-[13.5px] text-ink-500">
          Manually create a directory listing.
        </p>
      </div>
      <ToolForm
        mode="create"
        categories={categories}
        initial={{
          slug: "",
          name: "",
          tagline: "",
          description: "",
          longDescription: "",
          url: "",
          categorySlug: categories[0]?.slug ?? "",
          pricing: "FREEMIUM",
          priceFrom: "",
          rating: 0,
          ratingCount: 0,
          founded: "",
          featured: false,
          trending: false,
          verified: true,
          published: true,
          swatchFrom: "#c8e6a8",
          swatchTo: "#8dc474",
          features: [],
          pros: [],
          cons: [],
          tags: [],
          seoTitle: "",
          seoDescription: "",
          metaKeywords: "",
        }}
      />
    </div>
  );
}
