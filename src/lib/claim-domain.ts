// Rules for claiming a listing by email domain: an address on the tool's
// own domain proves ownership, except where the address or the tool's host
// is shared by many unrelated people.

const FREE_MAIL = new Set([
  "gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "live.com", "msn.com",
  "yahoo.com", "ymail.com", "icloud.com", "me.com", "mac.com", "aol.com", "proton.me",
  "protonmail.com", "pm.me", "gmx.com", "gmx.de", "gmx.net", "mail.com", "yandex.com",
  "yandex.ru", "zoho.com", "zohomail.com", "qq.com", "163.com", "126.com", "naver.com",
  "hey.com", "fastmail.com", "tutanota.com", "web.de", "mail.ru", "duck.com",
]);

// Hosts where many unrelated products live, so a matching address proves nothing.
const SHARED_HOSTS = [
  "github.com", "github.io", "gitlab.com", "vercel.app", "netlify.app", "pages.dev",
  "workers.dev", "herokuapp.com", "onrender.com", "fly.dev", "replit.app", "repl.co",
  "glitch.me", "notion.site", "framer.website", "framer.ai", "webflow.io", "wixsite.com",
  "squarespace.com", "carrd.co", "bubbleapps.io", "softr.app", "gumroad.com", "itch.io",
  "huggingface.co", "hf.space", "streamlit.app", "medium.com", "substack.com",
  "apps.apple.com", "play.google.com", "chromewebstore.google.com", "chrome.google.com",
  "microsoftedge.microsoft.com", "addons.mozilla.org", "producthunt.com", "linktr.ee",
  "youtube.com", "x.com", "twitter.com", "linkedin.com", "facebook.com", "instagram.com",
  "discord.com", "discord.gg", "t.me", "telegram.me", "beehiiv.com", "blogspot.com",
  "wordpress.com", "web.app", "firebaseapp.com", "azurewebsites.net", "lovable.app",
  "bolt.host", "base44.app", "typedream.app", "super.site", "durable.co",
];

// Second-level public suffixes, so "acme.co.uk" is treated as one domain.
const TWO_PART_SUFFIXES = new Set([
  "co.uk", "org.uk", "ac.uk", "gov.uk", "com.au", "net.au", "org.au", "co.nz", "co.jp",
  "co.kr", "co.in", "co.za", "com.br", "com.mx", "com.ar", "com.tr", "com.sg", "com.hk",
  "com.cn", "com.tw", "co.il", "com.my", "com.ph", "co.id", "com.vn", "com.pk", "com.ng",
  "com.eg", "com.sa", "co.th",
]);

/** "app.acme.co.uk" → "acme.co.uk"; "www.acme.com" → "acme.com". */
export function registrableDomain(host: string): string {
  const parts = host.toLowerCase().replace(/\.$/, "").split(".").filter(Boolean);
  if (parts.length <= 2) return parts.join(".");
  const lastTwo = parts.slice(-2).join(".");
  return TWO_PART_SUFFIXES.has(lastTwo) ? parts.slice(-3).join(".") : lastTwo;
}

function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

function isShared(host: string) {
  return SHARED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
}

export type ClaimCheck =
  | { ok: true; domain: string }
  | { ok: false; reason: "free-mail" | "mismatch" | "shared-host" | "bad-url"; domain?: string };

/** Can this email claim the tool at toolUrl automatically? */
export function checkClaim(email: string, toolUrl: string): ClaimCheck {
  const host = hostOf(toolUrl);
  if (!host) return { ok: false, reason: "bad-url" };
  if (isShared(host)) return { ok: false, reason: "shared-host" };
  const domain = registrableDomain(host);

  const emailDomain = email.split("@")[1]?.toLowerCase().trim() ?? "";
  if (FREE_MAIL.has(emailDomain)) return { ok: false, reason: "free-mail", domain };
  return registrableDomain(emailDomain) === domain ? { ok: true, domain } : { ok: false, reason: "mismatch", domain };
}

/** Whether a tool's listing can be claimed by email at all. */
export function claimableDomain(toolUrl: string): string | null {
  const host = hostOf(toolUrl);
  return host && !isShared(host) ? registrableDomain(host) : null;
}
