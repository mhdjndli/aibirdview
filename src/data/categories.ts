export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  toolCount: number;
  // Heroicons-style outline path or simple emoji glyph for visual variety
  glyph: string;
  accent: string; // tailwind class for the icon tint
};

export const CATEGORIES: Category[] = [
  {
    slug: "writing",
    name: "Writing & Editing",
    tagline: "Long-form, copy, and ghost-drafting",
    description:
      "Drafting tools, AI editors, ghostwriters, and grammar polish for teams that ship words.",
    toolCount: 184,
    glyph: "✎",
    accent: "text-kiwi-600",
  },
  {
    slug: "image",
    name: "Image Generation",
    tagline: "From sketches to photorealism",
    description:
      "Text-to-image models, photo editors, design assistants, and visual asset libraries.",
    toolCount: 232,
    glyph: "✦",
    accent: "text-amber-600",
  },
  {
    slug: "video",
    name: "Video & Animation",
    tagline: "Cuts, captions, and avatars",
    description:
      "AI video generators, editors, lip-sync, and avatar studios for marketing and product teams.",
    toolCount: 96,
    glyph: "▶",
    accent: "text-rose-500",
  },
  {
    slug: "audio",
    name: "Audio & Voice",
    tagline: "TTS, music, transcription",
    description:
      "Voice cloning, text-to-speech, podcast editors, transcribers, and royalty-free music tools.",
    toolCount: 71,
    glyph: "♪",
    accent: "text-sky-600",
  },
  {
    slug: "code",
    name: "Code & Developer",
    tagline: "Pair-programmers and refactor bots",
    description:
      "Coding agents, code reviewers, test generators, and infra copilots for engineering teams.",
    toolCount: 128,
    glyph: "⌘",
    accent: "text-violet-600",
  },
  {
    slug: "productivity",
    name: "Productivity",
    tagline: "Meetings, docs, and inbox magic",
    description:
      "Meeting note-takers, calendar assistants, knowledge bases, and personal AI chiefs of staff.",
    toolCount: 154,
    glyph: "◷",
    accent: "text-teal-600",
  },
  {
    slug: "marketing",
    name: "Marketing & Sales",
    tagline: "Pipelines that write themselves",
    description:
      "Outbound, SEO, social, ad creative, and revenue intelligence powered by AI.",
    toolCount: 119,
    glyph: "✺",
    accent: "text-orange-600",
  },
  {
    slug: "research",
    name: "Research & Data",
    tagline: "Reasoning over big haystacks",
    description:
      "RAG, scientific assistants, market research, data analysis, and citation tooling.",
    toolCount: 64,
    glyph: "◉",
    accent: "text-indigo-600",
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
