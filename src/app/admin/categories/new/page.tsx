import Link from "next/link";
import { CategoryForm } from "@/components/admin/CategoryForm";

export const metadata = { title: "Add category — Admin" };

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/categories" className="text-[12.5px] text-ink-500 hover:text-ink-800">
          ← All categories
        </Link>
        <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
          Add a category
        </h1>
      </div>
      <CategoryForm
        mode="create"
        initial={{
          slug: "",
          name: "",
          tagline: "",
          description: "",
          glyph: "✎",
          accent: "text-kiwi-600",
          sortOrder: 99,
        }}
      />
    </div>
  );
}
