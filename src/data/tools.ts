export type Pricing = "Free" | "Freemium" | "Paid" | "Free Trial";

export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  url: string;
  category: string; // category slug
  tags: string[];
  pricing: Pricing;
  priceFrom?: string;
  rating: number; // out of 5
  ratingCount: number;
  founded: string;
  featured: boolean;
  trending: boolean;
  verified: boolean;
  // visual: a deterministic gradient pair used in tool cards (kiwi-tinted)
  swatch: [string, string];
  features: string[];
  pros: string[];
  cons: string[];
  alternatives: string[]; // slugs
};

const SWATCHES: [string, string][] = [
  ["#c8e6a8", "#8dc474"],
  ["#fde68a", "#f59e0b"],
  ["#fecaca", "#ef4444"],
  ["#bae6fd", "#0ea5e9"],
  ["#ddd6fe", "#8b5cf6"],
  ["#a7f3d0", "#10b981"],
  ["#fed7aa", "#f97316"],
  ["#c7d2fe", "#6366f1"],
];

export const TOOLS: Tool[] = [
  // Writing
  {
    slug: "claro-writer",
    name: "Claro Writer",
    tagline: "The long-form AI editor for serious writers",
    description:
      "Outline-aware drafting with editorial-grade revision and tone control.",
    longDescription:
      "Claro Writer pairs a long-context model with a structured outline editor so you can draft, restructure, and revise without losing the thread. It learns your voice from past work and applies house style rules across every paragraph.",
    url: "https://example.com/claro-writer",
    category: "writing",
    tags: ["Long-form", "Editor", "Style guide", "Tone control"],
    pricing: "Freemium",
    priceFrom: "$19/mo",
    rating: 4.8,
    ratingCount: 1240,
    founded: "2023",
    featured: true,
    trending: true,
    verified: true,
    swatch: SWATCHES[0],
    features: [
      "Outline-aware revisions",
      "House style enforcement",
      "Inline citation suggestions",
      "Team voice profiles",
    ],
    pros: ["Best-in-class editor", "Strong factuality", "Generous free tier"],
    cons: ["Mobile app still in beta"],
    alternatives: ["paragraph-co", "press-ai"],
  },
  {
    slug: "paragraph-co",
    name: "Paragraph",
    tagline: "Ghost-write entire essays from a single brief",
    description:
      "Turn a thirty-word brief into a polished essay with sources, headings, and a tone of voice.",
    longDescription:
      "Paragraph is a one-shot drafting agent: feed it a brief and it returns a polished, structured piece with citations.",
    url: "https://example.com/paragraph",
    category: "writing",
    tags: ["Essay", "Citations", "Briefs"],
    pricing: "Paid",
    priceFrom: "$29/mo",
    rating: 4.5,
    ratingCount: 612,
    founded: "2024",
    featured: false,
    trending: true,
    verified: true,
    swatch: SWATCHES[1],
    features: [
      "Brief → draft in 30 seconds",
      "Citation pulling from Semantic Scholar",
      "Tone matching",
    ],
    pros: ["Fast", "Great citation handling"],
    cons: ["Less control over structure"],
    alternatives: ["claro-writer", "press-ai"],
  },
  {
    slug: "press-ai",
    name: "Press.ai",
    tagline: "Newsroom-grade headline and lede generator",
    description:
      "Generates A/B-tested headlines and ledes from a story brief with newsroom voice profiles.",
    longDescription:
      "Press.ai was built with editors at three top-50 publications. It generates 12 headline variants, scores them, and suggests two for AB testing.",
    url: "https://example.com/press-ai",
    category: "writing",
    tags: ["Headlines", "Newsroom", "A/B"],
    pricing: "Freemium",
    rating: 4.6,
    ratingCount: 421,
    founded: "2024",
    featured: false,
    trending: false,
    verified: true,
    swatch: SWATCHES[2],
    features: ["12 headline variants", "Newsroom style profiles", "AB scoring"],
    pros: ["Tuned for journalism", "Great UI"],
    cons: ["Niche use case"],
    alternatives: ["claro-writer", "paragraph-co"],
  },

  // Image
  {
    slug: "ember-studio",
    name: "Ember Studio",
    tagline: "Photoreal product imagery without a studio",
    description:
      "Drop your product, pick a vibe — get magazine-grade campaign shots in minutes.",
    longDescription:
      "Ember Studio combines diffusion models with controlled 3D scene composition. Designed for DTC brands that need 200 product shots a month.",
    url: "https://example.com/ember-studio",
    category: "image",
    tags: ["Product shots", "DTC", "Photoreal", "Campaigns"],
    pricing: "Paid",
    priceFrom: "$49/mo",
    rating: 4.9,
    ratingCount: 2103,
    founded: "2023",
    featured: true,
    trending: true,
    verified: true,
    swatch: SWATCHES[3],
    features: [
      "Pose-locked product placement",
      "Brand color enforcement",
      "Batch render queue",
      "RAW PSD export",
    ],
    pros: ["Truly photoreal", "Saves agency money", "Fast batch jobs"],
    cons: ["Steep learning curve for non-designers"],
    alternatives: ["pigment-ai", "kiln"],
  },
  {
    slug: "pigment-ai",
    name: "Pigment.ai",
    tagline: "An illustration model that respects your brand",
    description:
      "Train a style adapter on five images and generate on-brand illustrations forever.",
    longDescription:
      "Pigment.ai's style-locking adapters let agencies and brands maintain a consistent illustration system across hundreds of assets.",
    url: "https://example.com/pigment",
    category: "image",
    tags: ["Illustration", "Brand", "Style adapter"],
    pricing: "Freemium",
    rating: 4.7,
    ratingCount: 870,
    founded: "2024",
    featured: false,
    trending: true,
    verified: true,
    swatch: SWATCHES[4],
    features: ["5-shot style training", "Vector export", "Brand kit lock"],
    pros: ["Consistent style", "Good vector output"],
    cons: ["Slower than typical T2I"],
    alternatives: ["ember-studio", "kiln"],
  },
  {
    slug: "kiln",
    name: "Kiln",
    tagline: "Concept art for game studios",
    description:
      "Mood-board to playable concept in one workflow. Used at three AAA studios.",
    longDescription:
      "Kiln is a concept art pipeline: gather references, lock a palette, generate variants, then polish in their built-in 2D canvas.",
    url: "https://example.com/kiln",
    category: "image",
    tags: ["Game dev", "Concept", "Pipeline"],
    pricing: "Paid",
    priceFrom: "$79/mo",
    rating: 4.4,
    ratingCount: 318,
    founded: "2023",
    featured: false,
    trending: false,
    verified: true,
    swatch: SWATCHES[5],
    features: ["Mood-board to concept", "Palette locking", "Native 2D canvas"],
    pros: ["Game studio-tuned"],
    cons: ["Expensive for hobbyists"],
    alternatives: ["pigment-ai", "ember-studio"],
  },

  // Video
  {
    slug: "reel-keeper",
    name: "Reel Keeper",
    tagline: "Turn a Zoom call into 12 social clips",
    description:
      "Upload a long-form video. Reel Keeper finds your best moments and captions them.",
    longDescription:
      "An end-to-end repurposing studio used by creator-economy teams to feed every platform from one weekly recording.",
    url: "https://example.com/reel-keeper",
    category: "video",
    tags: ["Repurposing", "Clips", "Captions"],
    pricing: "Freemium",
    priceFrom: "$15/mo",
    rating: 4.6,
    ratingCount: 1789,
    founded: "2023",
    featured: true,
    trending: true,
    verified: true,
    swatch: SWATCHES[6],
    features: ["Auto-clip detection", "Multi-format export", "Brand kits"],
    pros: ["Fast turnaround", "Great captions"],
    cons: ["Limited control over branding in free tier"],
    alternatives: ["lumen-ai", "stage-cast"],
  },
  {
    slug: "lumen-ai",
    name: "Lumen.ai",
    tagline: "Cinematic AI video for brand stories",
    description: "Storyboarded text-to-video with character consistency.",
    longDescription:
      "Lumen.ai uses character-locked diffusion to produce 30-90 second brand spots from a script.",
    url: "https://example.com/lumen",
    category: "video",
    tags: ["T2V", "Brand", "Cinematic"],
    pricing: "Paid",
    priceFrom: "$89/mo",
    rating: 4.5,
    ratingCount: 522,
    founded: "2024",
    featured: false,
    trending: true,
    verified: true,
    swatch: SWATCHES[7],
    features: [
      "Character lock across scenes",
      "Storyboard editor",
      "4K export",
    ],
    pros: ["Cinematic quality"],
    cons: ["Render times can be long"],
    alternatives: ["reel-keeper", "stage-cast"],
  },
  {
    slug: "stage-cast",
    name: "StageCast",
    tagline: "AI avatars for L&D videos",
    description:
      "Type a script, get a presenter-led training video in 32 languages.",
    longDescription:
      "StageCast is the go-to enterprise tool for L&D teams replacing legacy stock-actor videos.",
    url: "https://example.com/stagecast",
    category: "video",
    tags: ["Avatars", "Enterprise", "L&D"],
    pricing: "Paid",
    rating: 4.3,
    ratingCount: 256,
    founded: "2022",
    featured: false,
    trending: false,
    verified: true,
    swatch: SWATCHES[0],
    features: ["120 avatars", "32 languages", "SCORM export"],
    pros: ["Enterprise-grade"],
    cons: ["Avatars still feel slightly uncanny"],
    alternatives: ["lumen-ai", "reel-keeper"],
  },

  // Audio
  {
    slug: "chorus-voice",
    name: "Chorus Voice",
    tagline: "Cinematic voice cloning, honestly licensed",
    description:
      "Studio-grade voice clones with built-in consent and revocation.",
    longDescription:
      "Chorus Voice is the leading consent-first voice platform — every clone has a verified license trail.",
    url: "https://example.com/chorus",
    category: "audio",
    tags: ["Voice clone", "Consent", "TTS"],
    pricing: "Freemium",
    priceFrom: "$22/mo",
    rating: 4.8,
    ratingCount: 994,
    founded: "2023",
    featured: true,
    trending: false,
    verified: true,
    swatch: SWATCHES[1],
    features: ["Verified licensing", "Multi-lang", "Real-time TTS"],
    pros: ["Ethical defaults", "High quality"],
    cons: ["Stricter onboarding"],
    alternatives: ["scribe-fm", "metronome-music"],
  },
  {
    slug: "scribe-fm",
    name: "Scribe.fm",
    tagline: "Transcripts that respect your craft",
    description: "Speaker-aware transcripts with markdown export and timestamps.",
    longDescription:
      "Scribe.fm is built for podcasters and journalists who need exportable, editable transcripts in seconds.",
    url: "https://example.com/scribe",
    category: "audio",
    tags: ["Transcription", "Podcasts", "Markdown"],
    pricing: "Freemium",
    rating: 4.7,
    ratingCount: 1502,
    founded: "2022",
    featured: false,
    trending: true,
    verified: true,
    swatch: SWATCHES[2],
    features: ["Speaker diarization", "Markdown export", "WER < 4%"],
    pros: ["Accurate", "Clean UI"],
    cons: ["Limited live transcription"],
    alternatives: ["chorus-voice", "metronome-music"],
  },
  {
    slug: "metronome-music",
    name: "Metronome",
    tagline: "Royalty-free AI music for video creators",
    description: "Hum a melody or describe a vibe. Get a license-clear track.",
    longDescription:
      "Metronome is loved by creators who need vibe-matched background music without licensing headaches.",
    url: "https://example.com/metronome",
    category: "audio",
    tags: ["Music", "Royalty-free", "Creators"],
    pricing: "Freemium",
    rating: 4.4,
    ratingCount: 678,
    founded: "2024",
    featured: false,
    trending: false,
    verified: true,
    swatch: SWATCHES[3],
    features: ["Hum-to-track", "License-clear", "Stem export"],
    pros: ["Versatile genre coverage"],
    cons: ["Vocal generation still limited"],
    alternatives: ["chorus-voice", "scribe-fm"],
  },

  // Code
  {
    slug: "carbon-copilot",
    name: "Carbon Copilot",
    tagline: "Pair-programmer that understands your monorepo",
    description:
      "Repo-aware code suggestions, PR reviews, and refactor agents that ship.",
    longDescription:
      "Carbon Copilot indexes your monorepo and grounds suggestions in your actual codebase, not just public training data.",
    url: "https://example.com/carbon",
    category: "code",
    tags: ["Copilot", "Monorepo", "PR review"],
    pricing: "Freemium",
    priceFrom: "$25/mo",
    rating: 4.9,
    ratingCount: 3120,
    founded: "2023",
    featured: true,
    trending: true,
    verified: true,
    swatch: SWATCHES[4],
    features: [
      "Repo indexing",
      "Inline PR review",
      "Refactor agents",
      "Test generation",
    ],
    pros: ["Best repo understanding", "Polished editor integration"],
    cons: ["Enterprise pricing opaque"],
    alternatives: ["snippet-ai", "qa-sentinel"],
  },
  {
    slug: "snippet-ai",
    name: "Snippet.ai",
    tagline: "AI snippets for terminal-bound engineers",
    description:
      "Generate, save, and re-use shell + SQL snippets right from your CLI.",
    longDescription:
      "Snippet.ai is a tiny CLI that puts LLM-generated commands and queries one keystroke away.",
    url: "https://example.com/snippet",
    category: "code",
    tags: ["CLI", "Shell", "SQL"],
    pricing: "Free",
    rating: 4.5,
    ratingCount: 412,
    founded: "2024",
    featured: false,
    trending: false,
    verified: true,
    swatch: SWATCHES[5],
    features: ["Native CLI", "Shareable snippet packs", "Local-first"],
    pros: ["Free", "Privacy-respecting"],
    cons: ["No IDE integration"],
    alternatives: ["carbon-copilot", "qa-sentinel"],
  },
  {
    slug: "qa-sentinel",
    name: "QA Sentinel",
    tagline: "An AI QA engineer that ships test suites",
    description: "Reads your repo, writes integration tests, runs them in CI.",
    longDescription:
      "QA Sentinel is the test-engineer-as-a-service. It scaffolds, maintains, and triages flaky tests automatically.",
    url: "https://example.com/qa-sentinel",
    category: "code",
    tags: ["Testing", "CI", "Quality"],
    pricing: "Paid",
    priceFrom: "$59/mo",
    rating: 4.4,
    ratingCount: 198,
    founded: "2024",
    featured: false,
    trending: true,
    verified: true,
    swatch: SWATCHES[6],
    features: ["E2E test scaffolding", "Flake triage", "CI integration"],
    pros: ["Reduces test debt"],
    cons: ["Needs careful setup for monorepos"],
    alternatives: ["carbon-copilot", "snippet-ai"],
  },

  // Productivity
  {
    slug: "harbor-notes",
    name: "Harbor Notes",
    tagline: "The meeting notetaker that actually understands tasks",
    description:
      "Joins your calls, captures decisions, files action items in Linear or Jira.",
    longDescription:
      "Harbor Notes is loved by founders and PMs who never want to write meeting notes again.",
    url: "https://example.com/harbor",
    category: "productivity",
    tags: ["Meetings", "Notes", "PM"],
    pricing: "Freemium",
    priceFrom: "$12/mo",
    rating: 4.7,
    ratingCount: 1834,
    founded: "2022",
    featured: true,
    trending: true,
    verified: true,
    swatch: SWATCHES[7],
    features: [
      "Joins Zoom/Meet/Teams",
      "Action-item extraction",
      "Linear & Jira sync",
      "Searchable archive",
    ],
    pros: ["Clean integrations", "Accurate action items"],
    cons: ["Bot showing up in meetings can feel intrusive"],
    alternatives: ["beacon-inbox", "lighthouse-os"],
  },
  {
    slug: "beacon-inbox",
    name: "Beacon Inbox",
    tagline: "An AI chief of staff for your email",
    description:
      "Triages, drafts, and schedules — keeping you at inbox zero without lifting a finger.",
    longDescription:
      "Beacon Inbox is the most refined AI email assistant available — drafts in your voice and politely declines on your behalf.",
    url: "https://example.com/beacon",
    category: "productivity",
    tags: ["Email", "Calendar", "Triage"],
    pricing: "Paid",
    priceFrom: "$24/mo",
    rating: 4.6,
    ratingCount: 944,
    founded: "2023",
    featured: false,
    trending: true,
    verified: true,
    swatch: SWATCHES[0],
    features: ["Voice-matched drafts", "Smart scheduling", "Privacy mode"],
    pros: ["Genuine time saver"],
    cons: ["Premium only"],
    alternatives: ["harbor-notes", "lighthouse-os"],
  },
  {
    slug: "lighthouse-os",
    name: "Lighthouse OS",
    tagline: "Personal AI operating system",
    description:
      "Unifies email, calendar, docs, and tasks under a single conversational interface.",
    longDescription:
      "Lighthouse OS turns your workday into a conversation with one agent that has full context.",
    url: "https://example.com/lighthouse",
    category: "productivity",
    tags: ["Agent", "Personal AI", "All-in-one"],
    pricing: "Free Trial",
    priceFrom: "$39/mo",
    rating: 4.3,
    ratingCount: 412,
    founded: "2024",
    featured: false,
    trending: false,
    verified: true,
    swatch: SWATCHES[1],
    features: ["Cross-tool agent", "Memory graph", "Daily briefings"],
    pros: ["Promising vision"],
    cons: ["Still rough around edges"],
    alternatives: ["harbor-notes", "beacon-inbox"],
  },

  // Marketing
  {
    slug: "northstar-seo",
    name: "Northstar SEO",
    tagline: "Topical authority engine for content teams",
    description:
      "Map a topic, find content gaps, brief writers, and watch rankings climb.",
    longDescription:
      "Northstar SEO is the new generation of content intelligence — clusters, briefs, and outcome tracking in one place.",
    url: "https://example.com/northstar",
    category: "marketing",
    tags: ["SEO", "Briefs", "Content ops"],
    pricing: "Paid",
    priceFrom: "$99/mo",
    rating: 4.7,
    ratingCount: 612,
    founded: "2023",
    featured: true,
    trending: true,
    verified: true,
    swatch: SWATCHES[2],
    features: [
      "Topic clustering",
      "AI-generated briefs",
      "Rank tracking",
      "SERP intent analysis",
    ],
    pros: ["Excellent brief quality"],
    cons: ["Not for solo creators"],
    alternatives: ["dispatch-ads", "outreach-os"],
  },
  {
    slug: "dispatch-ads",
    name: "Dispatch Ads",
    tagline: "Creative testing for paid social, on autopilot",
    description:
      "Generates and tests 50 ad variants a week. Promotes winners automatically.",
    longDescription:
      "Dispatch Ads runs your paid social like a hedge fund — relentless testing, automatic capital allocation.",
    url: "https://example.com/dispatch",
    category: "marketing",
    tags: ["Paid social", "Creative", "Testing"],
    pricing: "Paid",
    priceFrom: "$149/mo",
    rating: 4.5,
    ratingCount: 318,
    founded: "2024",
    featured: false,
    trending: true,
    verified: true,
    swatch: SWATCHES[3],
    features: ["50 variants/week", "Auto-promote winners", "Brand safety"],
    pros: ["Genuine ROAS lift"],
    cons: ["Higher entry price"],
    alternatives: ["northstar-seo", "outreach-os"],
  },
  {
    slug: "outreach-os",
    name: "Outreach OS",
    tagline: "Hyper-personalized outbound at scale",
    description:
      "Reads each prospect's LinkedIn, podcasts, and posts — then writes one email that lands.",
    longDescription:
      "Outreach OS is the most thoughtful B2B outbound tool — every email reads like it was hand-crafted.",
    url: "https://example.com/outreach-os",
    category: "marketing",
    tags: ["Outbound", "B2B", "Personalization"],
    pricing: "Paid",
    priceFrom: "$89/mo",
    rating: 4.6,
    ratingCount: 502,
    founded: "2024",
    featured: false,
    trending: false,
    verified: true,
    swatch: SWATCHES[4],
    features: ["Deep prospect research", "One-email-one-prospect", "CRM sync"],
    pros: ["Reply rates 3-4x baseline"],
    cons: ["Volume is intentionally capped"],
    alternatives: ["northstar-seo", "dispatch-ads"],
  },

  // Research
  {
    slug: "delta-research",
    name: "Delta Research",
    tagline: "An analyst that reads 1,000 papers before lunch",
    description:
      "Citation-grade literature reviews with traceable claims and confidence scores.",
    longDescription:
      "Delta Research is used by analysts, biotech researchers, and policy teams to compress weeks of reading into hours.",
    url: "https://example.com/delta",
    category: "research",
    tags: ["Lit review", "Citations", "Analyst"],
    pricing: "Paid",
    priceFrom: "$59/mo",
    rating: 4.8,
    ratingCount: 421,
    founded: "2023",
    featured: true,
    trending: false,
    verified: true,
    swatch: SWATCHES[5],
    features: [
      "1000-paper literature reviews",
      "Confidence scoring",
      "Source-grounded answers",
    ],
    pros: ["Trustworthy citations"],
    cons: ["Best on academic content"],
    alternatives: ["sigma-data", "tide-rag"],
  },
  {
    slug: "sigma-data",
    name: "Sigma Data",
    tagline: "Talk to your warehouse in plain English",
    description: "Schema-aware SQL agent that respects your dbt models.",
    longDescription:
      "Sigma Data sits between business users and the warehouse, generating exact SQL grounded in your semantic layer.",
    url: "https://example.com/sigma",
    category: "research",
    tags: ["Analytics", "SQL", "dbt"],
    pricing: "Free Trial",
    priceFrom: "$199/mo",
    rating: 4.5,
    ratingCount: 248,
    founded: "2024",
    featured: false,
    trending: true,
    verified: true,
    swatch: SWATCHES[6],
    features: ["Semantic layer aware", "dbt integration", "Confidence flags"],
    pros: ["Catches schema mistakes"],
    cons: ["Setup needs a data engineer"],
    alternatives: ["delta-research", "tide-rag"],
  },
  {
    slug: "tide-rag",
    name: "Tide RAG",
    tagline: "Open-source RAG stack for builders",
    description:
      "Production-ready retrieval pipelines with eval, observability, and reranking.",
    longDescription:
      "Tide RAG is the developer-favorite open stack for shipping serious retrieval-augmented applications.",
    url: "https://example.com/tide",
    category: "research",
    tags: ["RAG", "Open source", "Eval"],
    pricing: "Free",
    rating: 4.7,
    ratingCount: 1110,
    founded: "2023",
    featured: false,
    trending: false,
    verified: true,
    swatch: SWATCHES[7],
    features: ["Built-in evals", "Reranker zoo", "OpenTelemetry"],
    pros: ["Open source", "Strong eval story"],
    cons: ["Self-hosted only"],
    alternatives: ["delta-research", "sigma-data"],
  },
];

export function getTool(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(slug: string) {
  return TOOLS.filter((t) => t.category === slug);
}

export function getFeaturedTools() {
  return TOOLS.filter((t) => t.featured);
}

export function getTrendingTools() {
  return TOOLS.filter((t) => t.trending);
}

export function getRelatedTools(tool: Tool) {
  return tool.alternatives
    .map((s) => TOOLS.find((t) => t.slug === s))
    .filter((t): t is Tool => Boolean(t));
}
