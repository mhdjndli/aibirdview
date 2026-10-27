import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { currentMember } from "@/lib/owner-session";
import { checkClaim, claimableDomain } from "@/lib/claim-domain";
import { CodeSignIn } from "@/components/CodeSignIn";
import { requestManualClaim } from "../../account/actions";

export const metadata = {
  title: "Claim your listing | AI BirdView",
  robots: { index: false, follow: false },
};

export default async function ClaimPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ requested?: string }>;
}) {
  const { slug } = await params;
  const { requested } = await searchParams;
  const tool = await prisma.tool.findUnique({
    where: { slug },
    select: { id: true, slug: true, name: true, url: true, published: true },
  });
  if (!tool || !tool.published) notFound();

  const email = await currentMember();
  if (email) {
    const owner = await prisma.toolOwner.findUnique({ where: { toolId_email: { toolId: tool.id, email } } });
    if (owner?.status === "ACTIVE") redirect(`/account/tools/${tool.slug}`);
  }
  const domain = claimableDomain(tool.url);
  // Signed in with an address on the tool's domain: one more code confirms the claim.
  const signedInMatches = email ? checkClaim(email, tool.url).ok : false;

  return (
    <section className="mx-auto max-w-md px-5 py-20 lg:px-0">
      <Link href={`/tools/${tool.slug}`} className="text-[13px] text-ink-500 hover:text-ink-800">← {tool.name}</Link>
      <h1 className="mt-3 text-[32px] font-semibold tracking-[-0.028em] text-ink-900">Claim {tool.name}</h1>

      {requested ? (
        <p className="mt-6 rounded-xl border border-kiwi-200 bg-kiwi-50 px-4 py-3 text-[14px] leading-relaxed text-kiwi-800">
          Thanks! We&apos;ll check your request and email you once you can manage this listing.
        </p>
      ) : domain ? (
        <>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            Verify an email address at <strong className="text-ink-900">@{domain}</strong> and you&apos;ll be
            able to update this listing&apos;s description, pricing and images.
          </p>
          <div className="mt-8">
            <CodeSignIn
              slug={tool.slug}
              emailLabel={`Your work email (@${domain})`}
              emailPlaceholder={`you@${domain}`}
              submitLabel={signedInMatches ? "Confirm with a code" : "Email me a code"}
            />
          </div>
          <p className="mt-6 text-[13px] leading-relaxed text-ink-500">
            Don&apos;t have an @{domain} address?{" "}
            {email ? (
              <a href="#manual" className="text-kiwi-700 hover:underline">Request a manual review</a>
            ) : (
              <Link href={`/signin?next=/claim/${tool.slug}`} className="text-kiwi-700 hover:underline">
                Sign in to request a manual review
              </Link>
            )}
            .
          </p>
        </>
      ) : (
        <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
          {tool.name} is hosted on a shared domain, so we verify ownership by hand.
          {email ? " Tell us how you're connected to it below." : " Sign in first, then send us a short note."}
        </p>
      )}

      {!requested && (email ? (
        <form id="manual" action={requestManualClaim.bind(null, tool.slug)} className="mt-10 space-y-3 border-t border-ink-200 pt-8">
          <p className="text-[14px] font-medium text-ink-900">Request a manual review</p>
          <textarea
            name="note"
            required
            rows={4}
            maxLength={1000}
            placeholder="Your role, and a link that shows you work on this tool (e.g. the repo, your profile, or a page listing the team)."
            className="w-full rounded-xl border border-ink-200 bg-ink-0 px-3.5 py-2.5 text-[14px] text-ink-900 outline-none focus:border-ink-400"
          />
          <button className="rounded-full border border-ink-200 px-5 py-2.5 text-[14px] font-medium text-ink-800 hover:bg-ink-50">
            Send request as {email}
          </button>
        </form>
      ) : !domain ? (
        <div className="mt-8">
          <Link href={`/signin?next=/claim/${tool.slug}`} className="rounded-full bg-ink-900 px-5 py-2.5 text-[14px] font-medium text-ink-0">
            Sign in
          </Link>
        </div>
      ) : null)}
    </section>
  );
}
