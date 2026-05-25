import { SubmitForm } from "@/components/SubmitForm";

export const metadata = {
  title: "Submit a tool — AI BirdView",
  description:
    "Get your AI tool reviewed by our editors and listed in the AI BirdView directory.",
};

export default function SubmitPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-200">
        <div className="mesh-bg absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-3xl px-5 lg:px-8 pt-16 pb-12 md:pt-24 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
            Submit your tool
          </p>
          <h1 className="mt-3 text-balance text-[44px] font-semibold leading-[1.05] tracking-[-0.032em] text-ink-900 md:text-[64px]">
            Put your AI in front of the people who&apos;ll use it.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-ink-500">
            Free to submit, reviewed within 48 hours, no SEO games. We test each
            tool with a real workflow before publishing.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-[12px]">
            {[
              "Free to submit",
              "48-hour review",
              "Editorial integrity",
              "Verified badge",
            ].map((b) => (
              <span
                key={b}
                className="rounded-full border border-ink-200 bg-ink-0 px-3 py-1.5 text-ink-700"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-16">
        <SubmitForm />
      </section>

      {/* Guidelines */}
      <section
        id="guidelines"
        className="mx-auto max-w-3xl px-5 lg:px-8 pb-24"
      >
        <h2 className="text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
          Listing guidelines
        </h2>
        <ol className="mt-6 space-y-4">
          {[
            "Your tool must be live and publicly accessible — no waitlists-only.",
            "It must use AI as a core part of the experience, not as a marketing label.",
            "Pricing on your site must match what you tell us here.",
            "We don't list jailbreaks, scrapers of paywalled content, or tools designed to harass.",
            "We accept a sponsorship slot, but it never affects editorial coverage.",
          ].map((g, i) => (
            <li
              key={g}
              className="flex gap-4 rounded-2xl border border-ink-200 bg-ink-0 p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kiwi-100 text-[13px] font-semibold text-kiwi-700">
                {i + 1}
              </span>
              <p className="text-[15px] leading-relaxed text-ink-700">{g}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
