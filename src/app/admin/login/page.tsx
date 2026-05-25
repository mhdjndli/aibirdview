import { LoginForm } from "@/components/admin/LoginForm";
import { LogoMark } from "@/components/Logo";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign in — AI BirdView Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <div className="min-h-[80vh] mx-auto flex max-w-md flex-col justify-center px-5 py-16">
      <div className="mb-8 flex items-center justify-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="text-kiwi-500">
            <LogoMark className="h-8 w-8" />
          </span>
          <span className="text-[17px] font-semibold tracking-[-0.022em]">
            AI <span className="text-kiwi-600">BirdView</span>
          </span>
        </Link>
      </div>

      <div className="rounded-3xl border border-ink-200 bg-ink-0 p-8 md:p-10 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.18)]">
        <h1 className="text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
          Admin sign in
        </h1>
        <p className="mt-2 text-[14px] text-ink-500">
          For editors and administrators only.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>

      <p className="mt-6 text-center text-[12px] text-ink-400">
        Not an admin? <Link href="/" className="hover:text-ink-700">Back to site</Link>
      </p>
    </div>
  );
}
