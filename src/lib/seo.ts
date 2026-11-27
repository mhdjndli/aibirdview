// Search snippet helpers. Google cuts titles at about 60 characters and
// descriptions at about 155, so anything we generate is trimmed to fit.

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

/** Trim to `max` characters at a word boundary, without trailing punctuation. */
export function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max + 1);
  const atSpace = cut.lastIndexOf(" ");
  return (atSpace > max * 0.6 ? cut.slice(0, atSpace) : clean.slice(0, max)).replace(/[\s,;:.\-]+$/, "");
}

/** Stored titles may say "{year}" so they stay current without an edit each January. */
export function withYear(text: string, year = new Date().getFullYear()): string {
  return text.replace(/\{year\}/g, String(year));
}

type ToolSnippetInput = {
  name: string;
  tagline: string;
  description: string;
  pricing: string;
  priceFrom: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

/**
 * The <title> for a tool page: the hand-written one when set, otherwise the
 * tool name with what it does, then a pricing hook if there is room.
 */
export function toolTitle(tool: ToolSnippetInput): string {
  if (tool.seoTitle) return withYear(tool.seoTitle);
  const what = tool.tagline.replace(/[.!]+$/, "");
  const base = `${tool.name}: ${what}`;
  if (base.length <= TITLE_MAX) {
    const hook = tool.pricing === "Free" || tool.pricing === "Freemium" ? ", Free Plan" : ", Pricing";
    return base.length + hook.length <= TITLE_MAX ? base + hook : base;
  }
  const fallback = `${tool.name}: Pricing, Features and Alternatives`;
  return fallback.length <= TITLE_MAX ? fallback : clip(base, TITLE_MAX);
}

/** The meta description for a tool page, kept to what Google shows. */
export function toolDescription(tool: ToolSnippetInput): string {
  if (tool.seoDescription) return withYear(tool.seoDescription);
  const close = " Compare pricing, pros and cons, and alternatives.";
  const body = clip(tool.description, DESCRIPTION_MAX - close.length);
  const sentence = /[.!?]$/.test(body) ? body : `${body}.`;
  return sentence.length + close.length <= DESCRIPTION_MAX ? sentence + close : clip(tool.description, DESCRIPTION_MAX);
}

/** One plain sentence about what a tool costs, for the page's pricing section. */
export function pricingSentence(name: string, pricing: string, priceFrom: string | null): string {
  switch (pricing) {
    case "Free":
      return `${name} is free to use.`;
    case "Freemium":
      return priceFrom
        ? `${name} has a free plan, and paid plans start at ${priceFrom}.`
        : `${name} has a free plan, with paid upgrades for more usage and features.`;
    case "Free Trial":
      return priceFrom
        ? `${name} offers a free trial, and paid plans start at ${priceFrom}.`
        : `${name} offers a free trial before you choose a paid plan.`;
    default:
      return priceFrom ? `${name} is a paid tool, with plans from ${priceFrom}.` : `${name} is a paid tool.`;
  }
}

/**
 * Per-category search wording and the best-of guides that cover it. Category
 * pages are directories ("89 AI Writing Tools Compared"), so they don't
 * compete with the curated "Best AI Writing Tools" posts; both link to each
 * other, and tool pages link to their category's guides.
 */
export const CATEGORY_SEO: Record<string, { phrase: string; guides: string[] }> = {
  writing: { phrase: "AI Writing Tools", guides: ["best-ai-writing-tools", "best-ai-paraphrasing-tools", "best-ai-story-generators", "best-grammarly-alternatives", "best-ai-detectors"] },
  image: { phrase: "AI Image Generators and Editors", guides: ["best-free-ai-image-generators", "best-ai-image-editors", "best-ai-image-upscalers", "best-ai-background-removers", "best-ai-headshot-generators", "best-ai-product-photo-generators", "best-ai-anime-generators"] },
  video: { phrase: "AI Video Generators and Editors", guides: ["best-ai-video-generators", "best-ai-video-editors", "best-ai-subtitle-generators", "best-ai-video-translators", "best-ai-avatar-generators", "best-ai-youtube-tools"] },
  audio: { phrase: "AI Voice and Audio Tools", guides: ["best-ai-text-to-speech-tools", "best-ai-voice-cloning-tools", "best-ai-music-generators", "best-ai-transcription-software", "best-ai-podcast-tools", "best-ai-vocal-removers"] },
  code: { phrase: "AI Coding Tools", guides: ["best-ai-coding-tools", "best-vibe-coding-tools"] },
  productivity: { phrase: "AI Productivity Tools", guides: ["best-ai-productivity-tools", "best-ai-note-taking-apps", "best-ai-meeting-transcription-tools", "best-ai-presentation-makers", "best-ai-pdf-tools", "best-ai-email-assistants", "best-ai-excel-tools"] },
  marketing: { phrase: "AI Marketing and Sales Tools", guides: ["best-ai-marketing-tools", "best-ai-seo-tools", "best-ai-social-media-tools", "best-ai-ad-generators", "best-ai-email-marketing-tools", "best-ai-sales-tools", "best-ai-linkedin-tools"] },
  research: { phrase: "AI Research and Data Tools", guides: ["best-ai-research-tools", "best-ai-data-analysis-tools"] },
  chat: { phrase: "AI Chatbots and Assistants", guides: ["best-chatgpt-alternatives", "best-chatgpt-prompts"] },
  agents: { phrase: "AI Agents and Automation Tools", guides: ["best-ai-agents"] },
  design: { phrase: "AI Design and 3D Tools", guides: ["best-ai-logo-generators", "best-ai-interior-design-tools", "best-ai-3d-model-generators", "best-ai-tattoo-generators"] },
  business: { phrase: "AI Tools for Business and Finance", guides: ["best-ai-tools-for-small-business", "best-ai-accounting-tools", "best-ai-legal-tools", "best-ai-customer-service-tools", "best-ai-resume-builders", "best-ai-fashion-model-generators"] },
  education: { phrase: "AI Tools for Education", guides: ["best-ai-tools-for-students", "best-ai-tools-for-teachers", "best-ai-study-tools", "best-ai-homework-helpers"] },
  lifestyle: { phrase: "AI Tools for Health and Lifestyle", guides: ["best-free-ai-tools"] },
};

export function categoryPhrase(slug: string, name: string): string {
  return CATEGORY_SEO[slug]?.phrase ?? `${name} AI Tools`;
}

/** "89 AI Writing Tools Compared (2026): Free and Paid", shortened to fit. */
export function categoryTitle(slug: string, name: string, count: number, year = new Date().getFullYear()): string {
  const phrase = categoryPhrase(slug, name);
  const options = [
    `${count} ${phrase} Compared (${year}): Free and Paid`,
    `${count} ${phrase} Compared (${year})`,
    `${phrase} Compared (${year})`,
    `${phrase} (${year})`,
  ];
  return options.find((t) => t.length <= TITLE_MAX) ?? clip(options[options.length - 1], TITLE_MAX);
}
