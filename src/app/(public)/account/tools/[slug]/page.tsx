import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { currentMember } from "@/lib/owner-session";
import { OwnerEditForm } from "@/components/OwnerEditForm";
import { proposeEdit } from "../../actions";

export const metadata = {
  title: "Edit your listing | AI BirdView",
  robots: { index: false, follow: false },
};

export default async function EditOwnedToolPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; claimed?: string; error?: string }>;
}) {
  const { slug } = await params;
  const { saved, claimed, error } = await searchParams;
  const email = await currentMember();
  if (!email) redirect(`/signin?next=/account/tools/${slug}`);

  const tool = await prisma.tool.findUnique({
    where: { slug },
    include: {
      features: { orderBy: { order: "asc" } },
      edits: { where: { status: { in: ["PENDING", "REJECTED"] } }, orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
  if (!tool) redirect("/account");
  const owner = await prisma.toolOwner.findUnique({ where: { toolId_email: { toolId: tool.id, email } } });
  if (owner?.status !== "ACTIVE") redirect("/account");

  const latest = tool.edits[0];
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <Link href="/account" className="text-[13px] text-ink-500 hover:text-ink-800">← Your account</Link>
      <h1 className="mt-3 text-[32px] font-semibold tracking-[-0.028em] text-ink-900">Edit {tool.name}</h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">
        Keep your listing accurate. The &ldquo;More context from AI BirdView&rdquo; section,
        category and rankings are written by our editors and aren&apos;t editable here.
      </p>

      {claimed && (
        <p className="mt-6 rounded-xl border border-kiwi-200 bg-kiwi-50 px-4 py-3 text-[14px] text-kiwi-800">
          You now manage this listing.
        </p>
      )}
      {saved && (
        <p className="mt-6 rounded-xl border border-kiwi-200 bg-kiwi-50 px-4 py-3 text-[14px] text-kiwi-800">
          Saved. Your changes are live on{" "}
          <Link href={`/tools/${tool.slug}`} className="font-medium underline">your listing</Link>.
        </p>
      )}
      {error && (
        <p className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[14px] text-rose-700">{error}</p>
      )}
      {!saved && latest?.status === "REJECTED" && latest.note && (
        <p className="mt-6 rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-[14px] text-ink-700">
          An editor reverted your last edit: {latest.note}
        </p>
      )}

      <div className="mt-8">
        <OwnerEditForm
          action={proposeEdit.bind(null, tool.slug)}
          initial={{
            name: tool.name,
            tagline: tool.tagline,
            description: tool.description,
            longDescription: tool.longDescription,
            url: tool.url,
            pricing: tool.pricing,
            priceFrom: tool.priceFrom ?? "",
            founded: tool.founded ?? "",
            features: tool.features.map((f) => f.text).join("\n"),
            logoMediaId: tool.logoMediaId,
            screenshot1MediaId: tool.screenshot1MediaId,
            screenshot2MediaId: tool.screenshot2MediaId,
            screenshot3MediaId: tool.screenshot3MediaId,
          }}
        />
      </div>
    </section>
  );
}
