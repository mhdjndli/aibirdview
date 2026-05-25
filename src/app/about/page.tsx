import Link from "next/link";

export const metadata = {
  title: "About — AI BirdView",
  description:
    "AI BirdView is a human-curated directory of AI tools, built by editors who test before they write.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200">
        <div className="mesh-bg absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-4xl px-5 lg:px-8 pt-20 pb-20 md:pt-28 md:pb-28">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
            About
          </p>
          <h1 className="mt-3 text-balance text-[48px] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-900 md:text-[80px]">
            A bird&apos;s eye view of the AI that actually works.
          </h1>
          <p className="mt-6 max-w-2xl text-[19px] leading-[1.55] text-ink-500 md:text-[21px]">
            AI BirdView is a human-curated directory of AI tools. We test, we
            write, and we&apos;ll never list a product we wouldn&apos;t use ourselves.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 lg:px-8 py-20 md:py-28">
        <p className="font-display text-[28px] leading-[1.25] tracking-[-0.01em] text-ink-800 md:text-[40px]">
          The AI tool industry moves faster than any editorial team can keep up.
          We slow down on purpose — and we&apos;d rather list 1,200 tools we&apos;ve
          really used than 50,000 we&apos;ve only skimmed.
        </p>
      </section>

      {/* Principles */}
      <section className="bg-ink-50/60 border-y border-ink-200">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-24 md:py-28">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
            Principles
          </p>
          <h2 className="mt-3 max-w-2xl text-[34px] font-semibold leading-[1.05] tracking-[-0.028em] text-ink-900 md:text-[48px]">
            Three editorial rules. Non-negotiable.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Test before we list.",
                d: "Every featured tool is used by a human reviewer with a real workflow before it ships to the directory.",
              },
              {
                n: "02",
                t: "Sponsorship ≠ editorial.",
                d: "We accept paid placement, but it&apos;s clearly labeled and never affects rankings, reviews, or trust scores.",
              },
              {
                n: "03",
                t: "Quarterly re-reviews.",
                d: "Featured tools are re-evaluated every 90 days. If a tool slips, we&apos;ll say so.",
              },
            ].map((p) => (
              <div
                key={p.n}
                className="rounded-3xl border border-ink-200 bg-ink-0 p-8"
              >
                <div className="text-[13px] font-semibold text-kiwi-700">{p.n}</div>
                <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.022em] text-ink-900">
                  {p.t}
                </h3>
                <p
                  className="mt-3 text-[15px] leading-relaxed text-ink-500"
                  dangerouslySetInnerHTML={{ __html: p.d }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="reviewers" className="mx-auto max-w-7xl px-5 lg:px-8 py-24 md:py-28">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
          The team
        </p>
        <h2 className="mt-3 max-w-2xl text-[34px] font-semibold leading-[1.05] tracking-[-0.028em] text-ink-900 md:text-[48px]">
          Editors, not algorithms.
        </h2>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-500">
          Our reviewers come from product, journalism, and engineering. Each
          one owns a specific category.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-ink-200 bg-ink-0 p-5"
            >
              <div
                className="mb-4 aspect-square w-full overflow-hidden rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${m.swatch[0]} 0%, ${m.swatch[1]} 100%)`,
                }}
              >
                <div className="flex h-full w-full items-center justify-center text-[42px] font-semibold text-ink-900/40">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
              </div>
              <p className="text-[15px] font-semibold tracking-[-0.022em] text-ink-900">
                {m.name}
              </p>
              <p className="mt-0.5 text-[13px] text-ink-500">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="bg-ink-900 text-ink-0"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-200">
                Talk to us
              </p>
              <h2 className="mt-3 text-[36px] font-semibold leading-[1.05] tracking-[-0.028em] md:text-[52px]">
                Pitches, partnerships, press.
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-300">
                We answer email within two business days. Don&apos;t spam us with
                affiliate spreadsheets.
              </p>
              <div className="mt-8 space-y-2 text-[14px]">
                <p>
                  <span className="text-ink-400">Editorial</span>{" "}
                  <a className="ml-2 hover:underline" href="mailto:editors@aibirdview.com">
                    editors@aibirdview.com
                  </a>
                </p>
                <p>
                  <span className="text-ink-400">Press</span>{" "}
                  <a className="ml-2 hover:underline" href="mailto:press@aibirdview.com">
                    press@aibirdview.com
                  </a>
                </p>
                <p>
                  <span className="text-ink-400">Partnerships</span>{" "}
                  <a className="ml-2 hover:underline" href="mailto:partners@aibirdview.com">
                    partners@aibirdview.com
                  </a>
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-ink-700 bg-ink-900/70 p-8">
              <h3 className="text-[20px] font-semibold tracking-[-0.022em]">
                Want to be reviewed?
              </h3>
              <p className="mt-2 text-[14.5px] text-ink-300">
                The fastest path to coverage is our submit form.
              </p>
              <Link
                href="/submit"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-kiwi-500 px-5 py-2.5 text-[14px] font-medium text-ink-900 hover:bg-kiwi-400"
              >
                Submit your tool →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const TEAM = [
  { name: "Maya Reyes", role: "Editor, Writing", swatch: ["#c8e6a8", "#8dc474"] },
  { name: "Ari Patel", role: "Editor, Code", swatch: ["#ddd6fe", "#8b5cf6"] },
  { name: "Sora Lin", role: "Editor, Image & Video", swatch: ["#fde68a", "#f59e0b"] },
  { name: "Jonas Webb", role: "Editor, Productivity", swatch: ["#bae6fd", "#0ea5e9"] },
  { name: "Nadia Khoury", role: "Editor, Marketing", swatch: ["#fed7aa", "#f97316"] },
  { name: "Marcus Chen", role: "Editor, Research", swatch: ["#c7d2fe", "#6366f1"] },
  { name: "Lily Tran", role: "Editor, Audio", swatch: ["#a7f3d0", "#10b981"] },
  { name: "Oren Becker", role: "Editor-in-Chief", swatch: ["#fecaca", "#ef4444"] },
];
