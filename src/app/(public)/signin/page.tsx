import { redirect } from "next/navigation";
import { CodeSignIn } from "@/components/CodeSignIn";
import { currentMember } from "@/lib/owner-session";

export const metadata = {
  title: "Sign in | AI BirdView",
  description: "Sign in to manage your AI tool's listing on AI BirdView.",
  robots: { index: false, follow: false },
};

/** Only same-site paths, so a crafted link can't bounce people off-site. */
function safeNext(next?: string) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/account";
}

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next);
  if (await currentMember()) redirect(next);

  return (
    <section className="mx-auto max-w-md px-5 py-20 lg:px-0">
      <h1 className="text-[34px] font-semibold tracking-[-0.028em] text-ink-900">Sign in</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
        Manage your tool&apos;s listing. We&apos;ll email you a 6-digit code; there&apos;s no
        password. New here? Signing in creates your account.
      </p>
      <div className="mt-8">
        <CodeSignIn next={next} />
      </div>
    </section>
  );
}
