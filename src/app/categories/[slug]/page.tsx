import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return {
    title: `${cat.name} AI tools — AI BirdView`,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const tools = getToolsByCategory(slug);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200">
        <div className="mesh-bg absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-14 md:pt-20">
          <nav className="text-[13px] text-ink-500">
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
            href="/tools"
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
