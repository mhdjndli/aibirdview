import Link from "next/link";
import { BlogCategoryForm } from "@/components/admin/BlogCategoryForm";

export const metadata = { title: "Add blog category — Admin" };

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/blog/categories" className="text-[12.5px] text-ink-500 hover:text-ink-800">
          ← All blog categories
        </Link>
        <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
          Add blog category
        </h1>
      </div>
      <BlogCategoryForm
        mode="create"
        initial={{ id: null, slug: "", name: "", description: "", sortOrder: 99 }}
      />
    </div>
  );
}
