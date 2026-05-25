import { ToolsBrowser } from "@/components/ToolsBrowser";
import { TOOLS } from "@/data/tools";
import { CATEGORIES } from "@/data/categories";

export const metadata = {
  title: "Browse AI tools — AI BirdView",
  description:
    "Search, filter, and compare 1,200+ AI tools across writing, image, video, audio, code, productivity, marketing, and research.",
};

export default function ToolsPage() {
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

      <ToolsBrowser tools={TOOLS} categories={CATEGORIES} />
    </div>
  );
}
