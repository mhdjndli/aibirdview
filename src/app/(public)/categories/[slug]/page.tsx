import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/ToolCard";
import { getAllCategorySlugs, getCategoryBySlug, getTools } from "@/lib/queries";
import { serializeCategory, serializeTool } from "@/lib/serializers";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return {};
  const year = new Date().getFullYear();
  return {
    title: `Best ${cat.name} AI Tools (${year}) | AI BirdView`,
    description: cat.description,
    alternates: { canonical: `/categories/${cat.slug}` },
    openGraph: {
      title: `Best ${cat.name} AI Tools (${year}) | AI BirdView`,
      description: cat.description,
      url: `/categories/${cat.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const catRaw = await getCategoryBySlug(slug);
  if (!catRaw) notFound();
  const category = serializeCategory(catRaw);
  const tools = (await getTools({ categorySlug: slug })).map(serializeTool);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200">
        <div className="mesh-bg absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-14 md:pt-20">
          <nav className="text-[13px] text-ink-500" aria-label="Breadcrumb">
            <Link href="/categories" className="hover:text-ink-800">
              Categories
            </Link>
            <span className="mx-2 text-ink-300">/</span>
            <span className="text-ink-800">{category.name}</span>
          </nav>
          <div className="mt-6 flex items-start gap-5">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-100 text-[28px] ${category.accent}`}
            >
              {category.glyph}
            </div>
            <div>
              <h1 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.032em] text-ink-900 md:text-[56px]">
                {category.name}
              </h1>
              <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-ink-500">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
        <div className="mb-6 flex items-baseline justify-between">
          <p className="text-[13px] text-ink-500">
            <span className="font-medium text-ink-800">{tools.length}</span>{" "}
            tools in {category.name}
          </p>
          <Link
            href="/categories"
            className="text-[13px] font-medium text-kiwi-700 hover:underline"
          >
            All categories →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>
    </div>
  );
}
