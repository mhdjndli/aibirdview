export const SITE = {
  name: "AI BirdView",
  url: process.env.SITE_URL || "https://aibirdview-production.up.railway.app",
  shortDescription:
    "A premium, human-curated directory of the AI tools worth your time.",
  twitter: "@aibirdview",
};

export function absoluteUrl(path: string) {
  return SITE.url.replace(/\/$/, "") + (path.startsWith("/") ? path : `/${path}`);
}
