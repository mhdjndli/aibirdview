import { getAllSettings } from "@/lib/queries";
import { saveSettings } from "./actions";

export const metadata = { title: "Settings — Admin" };
export const dynamic = "force-dynamic";

type HeroS = { eyebrow?: string | null; headline?: string; subhead?: string };
type StatsS = { listed?: string; categories?: string; reviewTime?: string; readers?: string };
type SocialS = { twitter?: string; linkedin?: string; email?: string };
type FooterS = { tagline?: string };

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, sp] = await Promise.all([getAllSettings(), searchParams]);
  const hero = (settings.hero ?? {}) as HeroS;
  const stats = (settings.stats ?? {}) as StatsS;
  const social = (settings.social ?? {}) as SocialS;
  const footer = (settings.footer ?? {}) as FooterS;

  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-kiwi-700">
          Site
        </p>
        <h1 className="mt-1.5 text-[28px] font-semibold tracking-[-0.022em] text-ink-900">
          Settings
        </h1>
        <p className="mt-1 text-[13.5px] text-ink-500">
          Edit the copy and links that appear across the public site.
        </p>
      </header>

      {sp.saved && (
        <p className="rounded-xl border border-kiwi-200 bg-kiwi-50/60 px-4 py-2.5 text-[13px] text-kiwi-800">
          Saved.
        </p>
      )}

      <form action={saveSettings} className="space-y-6">
        <Card title="Hero">
          <Field label="Eyebrow (small label above the headline)">
            <input name="hero_eyebrow" defaultValue={hero.eyebrow ?? ""} className={inputCls} />
          </Field>
          <Field label="Headline" hint="The last two words get the kiwi gradient.">
            <input name="hero_headline" defaultValue={hero.headline ?? ""} className={inputCls} />
          </Field>
          <Field label="Subhead">
            <textarea name="hero_subhead" rows={3} defaultValue={hero.subhead ?? ""} className={inputCls} />
          </Field>
        </Card>

        <Card title="Stats strip">
          <Grid2>
            <Field label="Tools listed">
              <input name="stat_listed" defaultValue={stats.listed ?? ""} className={inputCls} />
            </Field>
            <Field label="Categories">
              <input name="stat_categories" defaultValue={stats.categories ?? ""} className={inputCls} />
            </Field>
            <Field label="Median review time">
              <input name="stat_reviewTime" defaultValue={stats.reviewTime ?? ""} className={inputCls} />
            </Field>
            <Field label="Monthly readers">
              <input name="stat_readers" defaultValue={stats.readers ?? ""} className={inputCls} />
            </Field>
          </Grid2>
        </Card>

        <Card title="Social links">
          <Grid2>
            <Field label="Twitter / X URL">
              <input name="social_twitter" type="url" defaultValue={social.twitter ?? ""} className={inputCls} />
            </Field>
            <Field label="LinkedIn URL">
              <input name="social_linkedin" type="url" defaultValue={social.linkedin ?? ""} className={inputCls} />
            </Field>
          </Grid2>
          <Field label="Public email">
            <input name="social_email" type="email" defaultValue={social.email ?? ""} className={inputCls} />
          </Field>
        </Card>

        <Card title="Footer">
          <Field label="Tagline">
            <textarea name="footer_tagline" rows={2} defaultValue={footer.tagline ?? ""} className={inputCls} />
          </Field>
        </Card>

        <div className="flex items-center gap-3 border-t border-ink-200 pt-5">
          <button type="submit" className="rounded-full bg-ink-900 px-5 py-2.5 text-[13px] font-medium text-ink-0 hover:bg-ink-700">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-ink-200 bg-ink-0 px-3.5 py-2 text-[13.5px] text-ink-800 placeholder:text-ink-400 outline-none focus:border-ink-400";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-ink-200 bg-ink-0 p-6">
      <h2 className="text-[14px] font-semibold uppercase tracking-[0.16em] text-ink-500">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}
function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>;
}
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[12.5px] font-medium text-ink-800">{label}</span>
        {hint && <span className="text-[11px] text-ink-400">{hint}</span>}
      </div>
      {children}
    </label>
  );
}
