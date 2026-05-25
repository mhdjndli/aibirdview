import { prisma } from "@/lib/prisma";
import { MediaUploader } from "@/components/admin/MediaUploader";

export const metadata = { title: "Media — Admin" };
export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const items = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    select: { id: true, filename: true, contentType: true, size: true, altText: true, createdAt: true },
  });

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">Content</p>
        <h1 className="mt-1.5 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">Media library</h1>
        <p className="mt-1 text-[13.5px] text-ink-500">{items.length} uploads</p>
      </header>

      <MediaUploader />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((m) => (
          <div key={m.id} className="rounded-xl border border-ink-200 bg-ink-0 overflow-hidden">
            <div className="aspect-square bg-ink-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api/media/${m.id}`} alt={m.altText ?? ""} className="h-full w-full object-cover" />
            </div>
            <div className="p-2.5">
              <p className="truncate text-[12.5px] font-medium text-ink-800" title={m.filename}>{m.filename}</p>
              <p className="text-[11px] text-ink-500">{(m.size / 1024).toFixed(0)} KB</p>
              <p className="mt-1 break-all text-[10.5px] text-ink-400">/api/media/{m.id}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
