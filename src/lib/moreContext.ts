// Parses Tool.moreContext, the plain-text "More context from AI BirdView"
// section. The format:
//
//   - Blocks are separated by blank lines.
//   - A line starting with "## " is a subheading.
//   - Lines starting with "- " are bullets (a block of only bullets is a list).
//   - "Q: question" followed by "A: answer" lines is an FAQ entry. Consecutive
//     entries form one FAQ group, which also feeds the page's FAQPage markup.
//   - Anything else is a paragraph.

export type ContextBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "faq"; items: { q: string; a: string }[] };

export function parseMoreContext(text: string): ContextBlock[] {
  const blocks: ContextBlock[] = [];
  for (const raw of text.split(/\n\s*\n/)) {
    let lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
    while (lines.length > 0 && lines[0].startsWith("## ")) {
      blocks.push({ type: "heading", text: lines[0].slice(3).trim() });
      lines = lines.slice(1);
    }
    if (lines.length === 0) continue;

    if (lines[0].startsWith("Q: ")) {
      const answerAt = lines.findIndex((l) => l.startsWith("A: "));
      if (answerAt > 0) {
        const q = lines.slice(0, answerAt).join(" ").slice(3).trim();
        const a = lines.slice(answerAt).join(" ").slice(3).trim();
        const prev = blocks[blocks.length - 1];
        if (prev?.type === "faq") prev.items.push({ q, a });
        else blocks.push({ type: "faq", items: [{ q, a }] });
        continue;
      }
    }

    if (lines.every((l) => l.startsWith("- "))) {
      blocks.push({ type: "list", items: lines.map((l) => l.slice(2).trim()) });
    } else {
      blocks.push({ type: "paragraph", text: lines.join(" ") });
    }
  }
  return blocks;
}

export function faqItems(blocks: ContextBlock[]): { q: string; a: string }[] {
  return blocks.flatMap((b) => (b.type === "faq" ? b.items : []));
}
