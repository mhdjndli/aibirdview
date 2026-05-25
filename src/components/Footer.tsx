import Link from "next/link";
import { LogoMark } from "./Logo";

const COLS = [
  {
    label: "Directory",
    links: [
      { href: "/tools", label: "Browse all" },
      { href: "/categories", label: "Categories" },
      { href: "/tools?filter=featured", label: "Featured tools" },
      { href: "/tools?filter=trending", label: "Trending this week" },
    ],
  },
  {
    label: "For makers",
    links: [
      { href: "/submit", label: "Submit a tool" },
      { href: "/submit#promote", label: "Promote your listing" },
      { href: "/submit#guidelines", label: "Listing guidelines" },
      { href: "/about#reviewers", label: "Become a reviewer" },
    ],
  },
  {
    label: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/about#press", label: "Press" },
      { href: "/about#contact", label: "Contact" },
      { href: "/about#legal", label: "Privacy & Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-200 bg-ink-50">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2 text-ink-800">
              <span className="text-kiwi-500">
                <LogoMark className="h-8 w-8" />
              </span>
              <span className="text-[17px] font-semibold tracking-[-0.022em]">
                AI <span className="text-kiwi-600">BirdView</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink-500">
              A premium, human-curated directory of the AI tools worth your time.
            </p>
            <form
              className="mt-6 flex max-w-sm overflow-hidden rounded-full border border-ink-200 bg-ink-0 focus-within:border-ink-400 transition-colors"
              action="#"
            >
              <input
                type="email"
                required
                placeholder="you@studio.com"
                aria-label="Email"
                className="flex-1 bg-transparent px-4 py-2.5 text-[14px] text-ink-800 placeholder:text-ink-400 outline-none"
              />
              <button
                type="submit"
                className="bg-ink-900 px-4 text-[13px] font-medium text-ink-0 hover:bg-ink-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-2 text-[12px] text-ink-400">
              The weekly digest. New tools, tested by humans.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.label} className="md:col-span-2 lg:col-span-2">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-500">
                {col.label}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-ink-700 hover:text-kiwi-700 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2 lg:col-span-2">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-500">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="https://twitter.com"
                  className="text-[14px] text-ink-700 hover:text-kiwi-700 transition-colors"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  className="text-[14px] text-ink-700 hover:text-kiwi-700 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@aibirdview.com"
                  className="text-[14px] text-ink-700 hover:text-kiwi-700 transition-colors"
                >
                  hello@aibirdview.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-3 border-t border-ink-200 pt-6 md:flex-row md:items-center">
          <p className="text-[12px] text-ink-500">
            © {new Date().getFullYear()} AI BirdView. Curated with care.
          </p>
          <p className="text-[12px] text-ink-400">
            Made for builders, marketers, and creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
