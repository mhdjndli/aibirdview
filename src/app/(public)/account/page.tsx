import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { currentMember } from "@/lib/owner-session";
import { fastTrackEnabled } from "@/lib/stripe";
import { formatDay } from "@/lib/featured";
import { signOut } from "./actions";

export const metadata = {
  title: "Your account | AI BirdView",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const email = await currentMember();
  if (!email) redirect("/signin?next=/account");

  const owned = await prisma.toolOwner.findMany({
    where: { email, status: { in: ["ACTIVE", "PENDING"] } },
    orderBy: { createdAt: "desc" },
    include: {
      tool: {
        select: {
          slug: true,
          name: true,
          tagline: true,
          logoMediaId: true,
          published: true,
          featuredUntil: true,
          edits: { where: { status: "PENDING" }, select: { id: true } },
        },
      },
    },
  });
  const submissions = await prisma.submission.findMany({
    where: { email: { equals: email, mode: "insensitive" }, status: "PENDING" },
    select: { id: true, name: true, publishBy: true, paidAt: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[34px] font-semibold tracking-[-0.028em] text-ink-900">Your account</h1>
          <p className="mt-1 text-[14px] text-ink-500">Signed in as {email}</p>
        </div>
        <form action={signOut}>
          <button className="rounded-full border border-ink-200 px-4 py-2 text-[13px] font-medium text-ink-700 hover:bg-ink-50">
            Sign out
          </button>
        </form>
      </div>

      <h2 className="mt-12 text-[20px] font-semibold tracking-[-0.02em] text-ink-900">Your tools</h2>
      {owned.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-ink-200 bg-ink-50/60 p-8 text-[14px] leading-relaxed text-ink-600">
          You don&apos;t manage any listings yet. Find your tool in the{" "}
          <Link href="/tools" className="text-kiwi-700 hover:underline">directory</Link> and click
          &ldquo;Claim this listing&rdquo;, or{" "}
          <Link href="/submit" className="text-kiwi-700 hover:underline">submit it</Link>.
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-ink-100 rounded-2xl border border-ink-200 bg-ink-0">
          {owned.map((o) => (
            <li key={o.id} className="flex items-center gap-4 p-4">
              {o.tool.logoMediaId ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`/api/media/${o.tool.logoMediaId}`} alt="" className="h-10 w-10 rounded-xl object-cover ring-1 ring-ink-900/5" />
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100 font-semibold">{o.tool.name[0]}</span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-medium text-ink-900">{o.tool.name}</p>
                <p className="truncate text-[13px] text-ink-500">
                  {o.status === "PENDING"
                    ? "Ownership request waiting for review"
                    : o.tool.featuredUntil && o.tool.featuredUntil > new Date()
                    ? `Featured until ${formatDay(o.tool.featuredUntil)}`
                    : o.tool.tagline}
                </p>
              </div>
              {o.status === "ACTIVE" && (
                <div className="flex shrink-0 items-center gap-2">
                  {o.tool.published && (
                    <Link href={`/tools/${o.tool.slug}`} className="text-[13px] text-ink-500 hover:text-ink-800">
                      View
                    </Link>
                  )}
                  <Link
                    href={`/account/tools/${o.tool.slug}`}
                    className="rounded-full bg-ink-900 px-4 py-1.5 text-[13px] font-medium text-ink-0 hover:bg-ink-800"
                  >
                    Edit
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {submissions.length > 0 && (
        <>
          <h2 className="mt-12 text-[20px] font-semibold tracking-[-0.02em] text-ink-900">Waiting to go live</h2>
          <ul className="mt-4 divide-y divide-ink-100 rounded-2xl border border-ink-200 bg-ink-0">
            {submissions.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 p-4 text-[14px]">
                <span className="font-medium text-ink-900">{s.name}</span>
                <span className="text-ink-500">
                  {s.paidAt ? "Same-day review" : "Free queue"}
                  {s.publishBy && ` · live by ${new Date(s.publishBy).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`}
                </span>
                {!s.paidAt && fastTrackEnabled() && (
                  <Link href={`/submit/thanks?id=${s.id}`} className="text-[13px] font-medium text-kiwi-700 hover:underline">
                    Get listed today →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
