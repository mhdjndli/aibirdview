import { ToolsBrowser } from "@/components/ToolsBrowser";
import { getCategories, getToolCards } from "@/lib/queries";
import { serializeCategory, serializeToolCard } from "@/lib/serializers";
import { prisma } from "@/lib/prisma";

export async function generateMetadata() {
  // "1,600+": the published count rounded down to the hundred, so the title
  // stays true between rebuilds.
  const count = await prisma.tool.count({ where: { published: true } });
  const rounded = count >= 200 ? `${(Math.floor(count / 100) * 100).toLocaleString("en-US")}+` : String(count);
  return {
    title: `Browse ${rounded} AI Tools by Category, Price and Use Case`,
    description: `Search ${rounded} AI tools for writing, images, video, voice, code and business. Filter by free plan, price and category, then compare side by side.`,
    // Search/filter state lives in the query string (?q=...), which would
    // otherwise be indexed as near-duplicate pages (see also src/proxy.ts).
    alternates: { canonical: "/tools" },
  };
}

export const revalidate = 60;

export default async function ToolsPage() {
  const [toolsRaw, categoriesRaw] = await Promise.all([
    getToolCards(),
    getCategories(),
  ]);
  // Filtering runs in the browser, so every tool ships with this page. Keep
  // these card fields slim: the full serializeTool shape made it 12MB.
  const tools = toolsRaw.map(serializeToolCard);
  const categories = categoriesRaw.map(serializeCategory);

  return (
    <div className="border-t border-ink-200/60">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-12 md:pt-20">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
          The directory
        </p>
        <h1 className="mt-2 text-[40px] font-semibold leading-[1.05] tracking-[-0.032em] text-ink-900 md:text-[56px]">
          Every AI tool worth knowing.
        </h1>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-500">
          Filter by category, pricing, and pace. Each listing has been reviewed
          by a human editor.
        </p>
      </div>

      <ToolsBrowser tools={tools} categories={categories} />
    </div>
  );
}
