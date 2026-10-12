import type { Block } from "./types";

type Mark = { type: "bold" } | { type: "italic" } | { type: "link"; attrs: Record<string, string | null> };
type TextNode = { type: "text"; text: string; marks?: Mark[] };
type Node = { type: string; attrs?: Record<string, unknown>; content?: (Node | TextNode)[] };

type Span = { text: string; bold?: boolean; italic?: boolean; href?: string };

const INLINE = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

// Nested marks (e.g. a link inside bold) are intentionally unsupported; keep
// inline formatting flat.
function parseInline(src: string): Span[] {
  const spans: Span[] = [];
  let last = 0;
  for (const m of src.matchAll(INLINE)) {
    if (m.index! > last) spans.push({ text: src.slice(last, m.index) });
    if (m[1] !== undefined) spans.push({ text: m[1], bold: true });
    else if (m[2] !== undefined) spans.push({ text: m[2], italic: true });
    else spans.push({ text: m[3], href: m[4] });
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
      if (s.href) {
        const ext = isExternal(s.href) ? ' target="_blank" rel="noopener noreferrer nofollow"' : "";
        return `<a href="${esc(s.href)}"${ext}>${t}</a>`;
      }
      if (s.bold) return `<strong>${t}</strong>`;
      if (s.italic) return `<em>${t}</em>`;
      return t;
    })
    .join("");
}

function inlineJson(src: string): TextNode[] {
  return parseInline(src).map((s) => {
    const marks: Mark[] = [];
    if (s.bold) marks.push({ type: "bold" });
    if (s.italic) marks.push({ type: "italic" });
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

export function renderHtml(blocks: Block[]): string {
  return blocks
    .map((b) => {
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

export function renderJson(blocks: Block[]): Node {
  const list = (items: string[]) => items.map((i) => ({ type: "listItem", content: [para(i)] }));
  return {
    type: "doc",
    content: blocks.map((b): Node => {
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
    for (const m of s.matchAll(INLINE)) if (m[4] && m[4].startsWith("/")) out.push(m[4]);
  };
  for (const b of blocks) {
    if ("ul" in b) b.ul.forEach(scan);
    else if ("ol" in b) b.ol.forEach(scan);
    else if (!("hr" in b)) scan(Object.values(b)[0] as string);
  }
  return out;
}

export function wordCount(blocks: Block[]): number {
  return renderHtml(blocks).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}
