import type { Block, RenderContext } from "./types";

type Mark = { type: "bold" } | { type: "italic" } | { type: "code" } | { type: "link"; attrs: Record<string, string | null> };
type TextNode = { type: "text"; text: string; marks?: Mark[] };
type Node = { type: string; attrs?: Record<string, unknown>; content?: (Node | TextNode)[] };

type Span = { text: string; bold?: boolean; italic?: boolean; code?: boolean; href?: string };

const INLINE = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`/g;
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

// Links may sit inside bold or italic (e.g. "**[Tool](/tools/x):**"); other
// nesting is unsupported, so keep inline formatting otherwise flat. `code`
// spans are literal.
function parseLinks(src: string, base: Omit<Span, "text">): Span[] {
  const spans: Span[] = [];
  let last = 0;
  for (const m of src.matchAll(LINK)) {
    if (m.index! > last) spans.push({ ...base, text: src.slice(last, m.index) });
    spans.push({ ...base, text: m[1], href: m[2] });
    last = m.index! + m[0].length;
  }
  if (last < src.length) spans.push({ ...base, text: src.slice(last) });
  return spans;
}

function parseInline(src: string): Span[] {
  const spans: Span[] = [];
  let last = 0;
  for (const m of src.matchAll(INLINE)) {
    if (m.index! > last) spans.push({ text: src.slice(last, m.index) });
    if (m[1] !== undefined) spans.push(...parseLinks(m[1], { bold: true }));
    else if (m[2] !== undefined) spans.push(...parseLinks(m[2], { italic: true }));
    else if (m[3] !== undefined) spans.push({ text: m[3], href: m[4] });
    else spans.push({ text: m[5], code: true });
    last = m.index! + m[0].length;
  }
  if (last < src.length) spans.push({ text: src.slice(last) });
  return spans.filter((s) => s.text.length > 0);
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const isExternal = (href: string) => /^https?:\/\//.test(href);

function inlineHtml(src: string): string {
  return parseInline(src)
    .map((s) => {
      const t = esc(s.text);
      let out = s.code ? `<code>${t}</code>` : t;
      if (s.href) {
        const ext = isExternal(s.href) ? ' target="_blank" rel="noopener noreferrer nofollow"' : "";
        out = `<a href="${esc(s.href)}"${ext}>${out}</a>`;
      }
      if (s.bold) out = `<strong>${out}</strong>`;
      if (s.italic) out = `<em>${out}</em>`;
      return out;
    })
    .join("");
}

function inlineJson(src: string): TextNode[] {
  return parseInline(src).map((s) => {
    const marks: Mark[] = [];
    if (s.bold) marks.push({ type: "bold" });
    if (s.italic) marks.push({ type: "italic" });
    if (s.code) marks.push({ type: "code" });
    if (s.href)
      marks.push({
        type: "link",
        attrs: isExternal(s.href)
          ? { href: s.href, target: "_blank", rel: "noopener noreferrer nofollow", class: null }
          : { href: s.href, target: null, rel: null, class: null },
      });
    return marks.length ? { type: "text", text: s.text, marks } : { type: "text", text: s.text };
  });
}

const para = (src: string): Node => {
  const content = inlineJson(src);
  return content.length ? { type: "paragraph", content } : { type: "paragraph" };
};

const EMPTY_CTX: RenderContext = { tool: () => undefined };

function need(ctx: RenderContext, slug: string) {
  const t = ctx.tool(slug);
  if (!t) throw new Error(`unknown tool ${slug}`);
  return t;
}

export function renderHtml(blocks: Block[], ctx: RenderContext = EMPTY_CTX): string {
  return blocks
    .map((b) => {
      if ("logos" in b)
        return `<div class="tool-logos">${b.logos
          .map((slug) => {
            const t = need(ctx, slug);
            const img = t.logoMediaId
              ? `<img src="/api/media/${t.logoMediaId}" alt="${esc(t.name)} logo" width="48" height="48" loading="lazy">`
              : "";
            return `<a href="/tools/${slug}" class="tool-logo">${img}<span>${esc(t.name)}</span></a>`;
          })
          .join("")}</div>`;
      if ("shot" in b) {
        const t = need(ctx, b.shot);
        if (!t.shotMediaId) throw new Error(`no screenshot for ${b.shot}`);
        const cap = b.caption ? `<figcaption>${inlineHtml(b.caption)}</figcaption>` : "";
        return `<figure><img src="/api/media/${t.shotMediaId}" alt="${esc(t.name)} homepage screenshot" loading="lazy">${cap}</figure>`;
      }
      if ("table" in b)
        return `<table><thead><tr>${b.table.head.map((h) => `<th>${inlineHtml(h)}</th>`).join("")}</tr></thead><tbody>${b.table.rows
          .map((r) => `<tr>${r.map((c) => `<td>${inlineHtml(c)}</td>`).join("")}</tr>`)
          .join("")}</tbody></table>`;
      if ("h2" in b) return `<h2>${inlineHtml(b.h2)}</h2>`;
      if ("h3" in b) return `<h3>${inlineHtml(b.h3)}</h3>`;
      if ("p" in b) return `<p>${inlineHtml(b.p)}</p>`;
      if ("ul" in b) return `<ul>${b.ul.map((i) => `<li><p>${inlineHtml(i)}</p></li>`).join("")}</ul>`;
      if ("ol" in b) return `<ol>${b.ol.map((i) => `<li><p>${inlineHtml(i)}</p></li>`).join("")}</ol>`;
      if ("quote" in b) return `<blockquote><p>${inlineHtml(b.quote)}</p></blockquote>`;
      return "<hr>";
    })
    .join("");
}

export function renderJson(blocks: Block[], ctx: RenderContext = EMPTY_CTX): Node {
  const list = (items: string[]) => items.map((i) => ({ type: "listItem", content: [para(i)] }));
  const cell = (type: string, src: string): Node => ({ type, attrs: { colspan: 1, rowspan: 1, colwidth: null }, content: [para(src)] });
  return {
    type: "doc",
    content: blocks.map((b): Node => {
      // The editor has no logo-row node, so it sees the row as linked names.
      if ("logos" in b) return para(b.logos.map((slug) => `[${need(ctx, slug).name}](/tools/${slug})`).join(" · "));
      if ("shot" in b) {
        const t = need(ctx, b.shot);
        return { type: "image", attrs: { src: `/api/media/${t.shotMediaId}`, alt: `${t.name} homepage screenshot`, title: b.caption ?? null } };
      }
      if ("table" in b)
        return {
          type: "table",
          content: [
            { type: "tableRow", content: b.table.head.map((h) => cell("tableHeader", h)) },
            ...b.table.rows.map((r) => ({ type: "tableRow", content: r.map((c) => cell("tableCell", c)) })),
          ],
        };
      if ("h2" in b) return { type: "heading", attrs: { textAlign: null, level: 2 }, content: inlineJson(b.h2) };
      if ("h3" in b) return { type: "heading", attrs: { textAlign: null, level: 3 }, content: inlineJson(b.h3) };
      if ("p" in b) return para(b.p);
      if ("ul" in b) return { type: "bulletList", content: list(b.ul) };
      if ("ol" in b) return { type: "orderedList", attrs: { start: 1, type: null }, content: list(b.ol) };
      if ("quote" in b) return { type: "blockquote", content: [para(b.quote)] };
      return { type: "horizontalRule" };
    }),
  };
}

export function internalLinks(blocks: Block[]): string[] {
  const out: string[] = [];
  const scan = (s: string) => {
    for (const span of parseInline(s)) if (span.href?.startsWith("/")) out.push(span.href);
  };
  for (const b of blocks) {
    if ("ul" in b) b.ul.forEach(scan);
    else if ("ol" in b) b.ol.forEach(scan);
    else if ("logos" in b) b.logos.forEach((slug) => out.push(`/tools/${slug}`));
    else if ("shot" in b) {
      out.push(`/tools/${b.shot}`);
      if (b.caption) scan(b.caption);
    } else if ("table" in b) [...b.table.head, ...b.table.rows.flat()].forEach(scan);
    else if (!("hr" in b)) scan(Object.values(b)[0] as string);
  }
  return out;
}

export function wordCount(blocks: Block[]): number {
  return renderHtml(blocks.filter((b) => !("logos" in b) && !("shot" in b))).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}
