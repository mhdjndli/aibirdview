// Blog posts are authored as a small block DSL so we can emit both the
// pre-rendered HTML (what the public page serves) and the Tiptap JSON (what
// the admin editor loads) from one source.
//
// Inline syntax inside any string: **bold**, *italic*, [text](href).
// Internal links should point at real pages, e.g. /tools/elevenlabs or
// /categories/audio — the importer verifies every /tools/<slug> link.

export type Block =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { quote: string }
  | { hr: true }
  /** Row of tool logos (tool slugs), each linking to its /tools page. */
  | { logos: string[] }
  /** Homepage screenshot of a tool (its listing screenshot, or one captured
   *  by scripts/blog/capture-screenshots.ts). Caption supports inline syntax. */
  | { shot: string; caption?: string }
  /** Comparison table. Cells support inline syntax. */
  | { table: { head: string[]; rows: string[][] } };

/** Looks up tool data the renderer needs for logos and screenshots. */
export type RenderContext = {
  tool: (slug: string) => { name: string; logoMediaId: string | null; shotMediaId: string | null } | undefined;
};

export type Post = {
  slug: string;
  title: string;
  /** 1–2 sentences shown under the H1 and on cards (max 500 chars). */
  excerpt: string;
  /** <title> tag, ~50–60 chars. The site does NOT append a suffix to this. */
  seoTitle: string;
  /** Meta description, ~140–160 chars. */
  seoDescription: string;
  metaKeywords: string;
  /** Blog category slugs: reviews | guides | news | deep-dives */
  categories: string[];
  body: Block[];
};
