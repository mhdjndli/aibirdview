// Checks a new-tools JSON file before it is imported: required fields, copy
// rules, duplicates against the directory, alternative slugs, and the
// long-form "More context" format (subheadings, pricing section, FAQ).
//
//   npx tsx --env-file=.env.local scripts/new-tools/validate.ts <file.json>...
//   npx tsx scripts/new-tools/validate.ts <file.json>... --index existing.tsv
//
// Without --index, existing tools are read from the database. The index is a
// TSV with a header row and columns slug, name, domain, category, status.

import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { faqItems, parseMoreContext } from "../../src/lib/moreContext";

type Seed = {
  slug: string;
  name: string;
  domain: string;
  url: string;
  category: string;
  tagline: string;
  description: string;
  longDescription: string;
  pricing: string;
  priceFrom: string | null;
  founded?: string | null;
  tags: string[];
  features: string[];
  pros: string[];
  cons: string[];
  alternatives: string[];
  moreContext: string;
};

type Existing = { slug: string; name: string; domain: string; published: boolean };

const CATEGORIES = new Set([
  "writing", "image", "video", "audio", "code", "productivity", "marketing",
  "research", "chat", "agents", "design", "business", "education", "lifestyle",
]);
const PRICING = new Set(["FREE", "FREEMIUM", "FREE_TRIAL", "PAID"]);

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
const normName = (s: string) => s.toLowerCase().replace(/\.(ai|io|app|com|so|co)$/, "").replace(/[^a-z0-9]/g, "");
const normDomain = (s: string) => s.toLowerCase().replace(/^www\./, "");

async function loadExisting(indexPath: string | undefined): Promise<Existing[]> {
  if (indexPath) {
    return readFileSync(indexPath, "utf8")
      .trim()
      .split("\n")
      .slice(1)
      .map((line) => {
        const [slug, name, domain, , status] = line.split("\t");
        return { slug, name, domain: normDomain(domain), published: status === "pub" };
      });
  }
  const prisma = new PrismaClient();
  try {
    const rows = await prisma.tool.findMany({ select: { slug: true, name: true, url: true, published: true } });
    return rows.map((r) => ({
      slug: r.slug,
      name: r.name,
      domain: normDomain(new URL(r.url).hostname),
      published: r.published,
    }));
  } finally {
    await prisma.$disconnect();
  }
}

function contextProblems(t: Seed, altNames: string[]): string[] {
  const out: string[] = [];
  const text = t.moreContext ?? "";
  const n = words(text);
  if (n < 500 || n > 900) out.push(`moreContext is ${n} words (want 500-900)`);
  if (/^#(?!# )/m.test(text) || /^###/m.test(text)) out.push("moreContext uses a heading other than '## '");

  const blocks = parseMoreContext(text);
  const headings = blocks.filter((b) => b.type === "heading").map((b) => (b as { text: string }).text);
  if (blocks[0]?.type !== "paragraph") out.push("moreContext must open with an intro paragraph");
  if (headings.length < 5) out.push(`${headings.length} subheadings (want 5+)`);
  if (headings.filter((h) => h.includes(t.name)).length < 3) out.push("fewer than 3 subheadings name the tool");
  if (!headings.some((h) => /pricing/i.test(h))) out.push("no pricing subheading");
  if (!headings.some((h) => /FAQ|questions/i.test(h))) out.push("no FAQ subheading");
  if (!blocks.some((b) => b.type === "list")) out.push("no bullet list");

  const faq = faqItems(blocks);
  if (faq.length < 3 || faq.length > 6) out.push(`${faq.length} FAQ entries (want 3-6)`);
  for (const f of faq) {
    if (!f.q.endsWith("?")) out.push(`FAQ question without '?': ${f.q.slice(0, 40)}`);
    if (words(f.a) < 12) out.push(`FAQ answer too short: ${f.q.slice(0, 40)}`);
  }
  const lastHeading = blocks.map((b) => b.type).lastIndexOf("heading");
  if (blocks.slice(lastHeading + 1).some((b) => b.type !== "faq")) out.push("FAQ must be the last section");

  const mentioned = altNames.filter((name) => text.includes(name));
  if (mentioned.length < 2) out.push(`mentions ${mentioned.length} alternatives by listing name (want 2+)`);
  return out;
}

function problemsFor(t: Seed, existing: Existing[], bySlug: Map<string, Existing>, batchSlugs: Map<string, Seed>): string[] {
  const out: string[] = [];
  for (const k of ["slug", "name", "domain", "url", "category", "tagline", "description", "longDescription", "pricing", "moreContext"] as const) {
    if (typeof t[k] !== "string" || !t[k].trim()) out.push(`missing ${k}`);
  }
  if (out.length) return out;

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t.slug)) out.push("bad slug");
  if (!CATEGORIES.has(t.category)) out.push(`unknown category ${t.category}`);
  if (!PRICING.has(t.pricing)) out.push(`bad pricing ${t.pricing}`);
  if (t.priceFrom !== null && !/^[$€£]\d/.test(t.priceFrom ?? "")) out.push(`bad priceFrom ${t.priceFrom}`);
  if (t.pricing === "FREE" && t.priceFrom) out.push("FREE tool with a priceFrom");
  if (t.founded && !/^(19|20)\d\d$/.test(t.founded)) out.push(`bad founded ${t.founded}`);

  let host = "";
  try {
    const u = new URL(t.url);
    host = normDomain(u.hostname);
    if (u.protocol !== "https:") out.push("url is not https");
  } catch {
    out.push("bad url");
  }
  if (host && host !== normDomain(t.domain)) out.push(`domain ${t.domain} does not match url host ${host}`);

  const dupSlug = bySlug.get(t.slug);
  if (dupSlug) out.push(`slug already listed (${dupSlug.name})`);
  const dupDomain = existing.find((e) => e.domain === normDomain(t.domain) && !/^(github\.com|huggingface\.co|chromewebstore\.google\.com|apps\.apple\.com)$/.test(e.domain));
  if (dupDomain) out.push(`domain already listed as ${dupDomain.slug}`);
  const dupName = existing.find((e) => normName(e.name) === normName(t.name));
  if (dupName) out.push(`name already listed as ${dupName.slug}`);

  if (t.tagline.length > 100) out.push(`tagline ${t.tagline.length} chars`);
  const dw = words(t.description);
  if (dw < 15 || dw > 50) out.push(`description ${dw} words`);
  const lw = words(t.longDescription);
  if (lw < 70 || lw > 170) out.push(`longDescription ${lw} words`);
  if (!Array.isArray(t.tags) || t.tags.length < 3 || t.tags.length > 6) out.push("want 3-6 tags");
  if (!Array.isArray(t.features) || t.features.length < 4 || t.features.length > 6) out.push("want 4-6 features");
  if (!Array.isArray(t.pros) || t.pros.length < 2 || t.pros.length > 4) out.push("want 2-4 pros");
  if (!Array.isArray(t.cons) || t.cons.length < 2 || t.cons.length > 4) out.push("want 2-4 cons");

  const altNames: string[] = [];
  if (!Array.isArray(t.alternatives) || t.alternatives.length < 3 || t.alternatives.length > 8) out.push("want 3-8 alternatives");
  for (const a of t.alternatives ?? []) {
    const e = bySlug.get(a);
    const b = batchSlugs.get(a);
    if (a === t.slug) out.push("lists itself as an alternative");
    else if (e?.published) altNames.push(e.name);
    else if (b) altNames.push(b.name);
    else out.push(`alternative ${a} is not a published listing`);
  }

  const copy = [t.name, t.tagline, t.description, t.longDescription, t.moreContext, ...(t.tags ?? []), ...(t.features ?? []), ...(t.pros ?? []), ...(t.cons ?? [])].join("\n");
  if (/[—–]/.test(copy)) out.push("contains an em/en dash");
  if (/\*\*|\]\(|https?:\/\//.test(copy)) out.push("contains markdown or a raw URL");

  return [...out, ...contextProblems(t, altNames)];
}

async function main() {
  const args = process.argv.slice(2);
  const indexAt = args.indexOf("--index");
  const indexPath = indexAt >= 0 ? args[indexAt + 1] : undefined;
  const files = args.filter((a, i) => a.endsWith(".json") && (indexAt < 0 || i !== indexAt + 1));
  if (files.length === 0) throw new Error("usage: validate.ts <file.json>... [--index existing.tsv]");

  const existing = await loadExisting(indexPath);
  const bySlug = new Map(existing.map((e) => [e.slug, e]));
  const tools: Seed[] = files.flatMap((f) => {
    const raw = JSON.parse(readFileSync(f, "utf8"));
    return Array.isArray(raw) ? raw : raw.tools;
  });
  // Tools in the batch may list each other as alternatives.
  const batchSlugs = new Map(tools.map((t) => [t.slug, t]));
  const seen = new Map<string, Seed>();
  let bad = 0;
  for (const t of tools) {
    const problems = problemsFor(t, existing, bySlug, batchSlugs);
    if (seen.has(t.slug)) problems.push("duplicate slug in batch");
    const twin = [...seen.values()].find((o) => o.slug !== t.slug && (normDomain(o.domain) === normDomain(t.domain) || normName(o.name) === normName(t.name)));
    if (twin) problems.push(`same tool as ${twin.slug} in batch`);
    seen.set(t.slug, t);
    if (problems.length) {
      bad++;
      console.log(`✗ ${t.slug ?? "(no slug)"}: ${problems.join("; ")}`);
    }
  }
  console.log(`\n${tools.length} tools, ${bad} with problems`);
  if (bad) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
