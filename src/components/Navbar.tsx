"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const NAV = [
  { href: "/tools", label: "Browse" },
  { href: "/categories", label: "Categories" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[backdrop-filter,background,border-color] duration-500 ${
        scrolled ? "glass" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-ink-700 hover:text-ink-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/tools"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-ink-0/70 px-3.5 py-1.5 text-[13px] text-ink-700 hover:bg-ink-100/80 transition-colors"
            aria-label="Search"
          >
            <SearchIcon />
            <span className="hidden lg:inline">Search tools</span>
            <kbd className="hidden lg:inline rounded border border-ink-200 bg-ink-50 px-1 text-[10px] text-ink-500">
              ⌘K
            </kbd>
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-1.5 text-[13px] font-medium text-ink-0 shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-[1.02] active:scale-[0.99]"
          >
            Submit a tool
            <ArrowIcon />
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden ml-1 rounded-full border border-ink-200 p-1.5 text-ink-700"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-ink-200/80 bg-ink-0/95 backdrop-blur px-5 py-3">
          <div className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-[15px] text-ink-800 hover:bg-ink-100"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/submit"
              className="mt-2 rounded-lg px-3 py-2.5 text-[15px] font-medium text-kiwi-700 hover:bg-kiwi-50"
              onClick={() => setOpen(false)}
            >
              Submit your tool →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11 11l3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 6h6m0 0L6.5 3.5M9 6L6.5 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d={open ? "M4 4l10 10M14 4L4 14" : "M3 6h12M3 12h12"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
