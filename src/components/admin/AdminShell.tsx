"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogoMark } from "@/components/Logo";
import type { Session } from "next-auth";

type NavItem = { href: string; label: string; icon: React.ReactNode };

const NAV: { label: string; items: NavItem[] }[] = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: <DashIcon /> }],
  },
  {
    label: "Directory",
    items: [
      { href: "/admin/submissions", label: "Submissions", icon: <InboxIcon /> },
      { href: "/admin/tools", label: "Tools", icon: <ToolIcon /> },
      { href: "/admin/categories", label: "Categories", icon: <FolderIcon /> },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/blog", label: "Blog posts", icon: <PostIcon /> },
      { href: "/admin/blog/categories", label: "Blog categories", icon: <FolderIcon /> },
      { href: "/admin/media", label: "Media", icon: <ImageIcon /> },
    ],
  },
  {
    label: "Site",
    items: [
      { href: "/admin/settings", label: "Settings", icon: <CogIcon /> },
    ],
  },
];

export function AdminShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const pathname = usePathname();

  // The login page is its own thing — no shell.
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-ink-50/40 md:flex-row">
      {/* Sidebar */}
      <aside className="border-b border-ink-200 bg-ink-0 md:w-64 md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex h-14 items-center gap-2 border-b border-ink-200 px-5">
          <Link href="/admin" className="inline-flex items-center gap-2">
            <span className="text-kiwi-500">
              <LogoMark className="h-7 w-7" />
            </span>
            <span className="text-[15px] font-semibold tracking-[-0.022em]">
              AI <span className="text-kiwi-600">BirdView</span>
            </span>
            <span className="ml-1 rounded-full bg-ink-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-600">
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex flex-row gap-1 overflow-x-auto px-3 py-3 md:flex-col md:gap-0 md:overflow-visible md:py-4 scrollbar-none">
          {NAV.map((section) => (
            <div key={section.label} className="md:mb-5 md:mt-1">
              <p className="hidden md:block px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
                {section.label}
              </p>
              <ul className="flex flex-row gap-1 md:flex-col md:gap-0.5">
                {section.items.map((item) => {
                  const active =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${
                          active
                            ? "bg-kiwi-50 text-kiwi-800"
                            : "text-ink-600 hover:bg-ink-100 hover:text-ink-900"
                        }`}
                      >
                        <span className={active ? "text-kiwi-700" : "text-ink-400"}>
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {session?.user && (
          <div className="hidden md:block mt-auto border-t border-ink-200 p-3">
            <div className="rounded-xl bg-ink-50 p-3">
              <p className="text-[12.5px] font-medium text-ink-800 truncate">
                {session.user.email}
              </p>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="mt-2 w-full rounded-lg border border-ink-200 bg-ink-0 px-2.5 py-1.5 text-[12px] font-medium text-ink-700 hover:bg-ink-100"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-ink-200 bg-ink-0/85 px-5 md:px-8 backdrop-blur">
          <div className="text-[13px] text-ink-500">
            <Link href="/" target="_blank" className="hover:text-kiwi-700">
              ↗ View public site
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {session?.user?.email && (
              <span className="hidden md:inline text-[12.5px] text-ink-500">
                {session.user.email}
              </span>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="md:hidden rounded-full border border-ink-200 bg-ink-0 px-3 py-1 text-[12px] font-medium text-ink-700"
            >
              Sign out
            </button>
          </div>
        </header>
        <div className="p-5 md:p-8">{children}</div>
      </div>
    </div>
  );
}

function DashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <rect x="2.5" y="2.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9.5" y="2.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
      <rect x="2.5" y="9.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9.5" y="9.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function InboxIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 3.5h11v6h-3.5l-1 2h-2l-1-2H2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
function ToolIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M3.5 4.5h9v7h-9z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 7h4M6 9.5h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function FolderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 5.5h4l1 1.2h6v5.8h-11z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
function PostIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M3 3.5h8v9H3z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 6h4M5 8h4M5 10h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function ImageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <rect x="2.5" y="3.5" width="11" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="7" r="1" fill="currentColor" />
      <path d="M2.5 11l3-2.5 3 2 5-4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
function CogIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 1.5v1.6M8 12.9v1.6M14.5 8h-1.6M3.1 8H1.5M12.5 3.5l-1.1 1.1M4.6 11.4l-1.1 1.1M12.5 12.5l-1.1-1.1M4.6 4.6L3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
