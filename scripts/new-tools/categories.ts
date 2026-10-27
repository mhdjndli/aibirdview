// Creates (or updates) the categories added in October 2026.
//
//   npx tsx --env-file=.env.local scripts/new-tools/categories.ts
//
// Accent classes reuse colors already present in the source so Tailwind
// generates them.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES = [
  {
    slug: "chat",
    name: "Chatbots & Assistants",
    tagline: "Ask anything, get it done",
    description: "General AI assistants, chatbots, model playgrounds, and companions for everyday questions and tasks.",
    glyph: "◍",
    accent: "text-sky-600",
    sortOrder: 9,
  },
  {
    slug: "agents",
    name: "AI Agents & Automation",
    tagline: "Work that runs itself",
    description: "Autonomous agents, workflow automation, and no-code builders that chain apps and models together.",
    glyph: "⚙",
    accent: "text-violet-600",
    sortOrder: 10,
  },
  {
    slug: "design",
    name: "Design & 3D",
    tagline: "Logos, layouts, and 3D worlds",
    description: "Logo makers, UI and web design, 3D model generators, interior design, and visual design assistants.",
    glyph: "◇",
    accent: "text-rose-500",
    sortOrder: 11,
  },
  {
    slug: "business",
    name: "Business & Finance",
    tagline: "Back office on autopilot",
    description: "AI for finance, legal, HR and recruiting, real estate, e-commerce operations, and customer support.",
    glyph: "▤",
    accent: "text-teal-600",
    sortOrder: 12,
  },
  {
    slug: "education",
    name: "Education & Learning",
    tagline: "Tutors that never sleep",
    description: "AI tutors, study helpers, language learning apps, quiz makers, and tools for teachers.",
    glyph: "✐",
    accent: "text-amber-600",
    sortOrder: 13,
  },
  {
    slug: "lifestyle",
    name: "Health & Lifestyle",
    tagline: "AI for life outside work",
    description: "Health and fitness coaches, travel planners, fashion and beauty, dating, games, and hobby tools.",
    glyph: "❖",
    accent: "text-orange-600",
    sortOrder: 14,
  },
];

async function main() {
  for (const c of CATEGORIES) {
    await prisma.category.upsert({ where: { slug: c.slug }, create: c, update: c });
    console.log(`category ${c.slug}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
