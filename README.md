# AI BirdView

A premium, human-curated directory of AI tools. Built with Next.js (App Router) and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm run start
```

## Stack

- **Next.js 16** (App Router, static generation)
- **Tailwind CSS v4** with custom kiwi-green design tokens
- **TypeScript**
- Inter + Instrument Serif via `next/font`

## Project structure

```
src/
  app/                    # Pages (App Router)
    page.tsx              # Homepage
    tools/                # Directory + tool detail pages
    categories/           # Categories grid + per-category listings
    submit/               # Submit-a-tool form
    about/                # About / editorial principles
  components/             # Shared UI (Navbar, Footer, ToolCard, …)
  data/                   # Mock tools + categories (replace with DB later)
```

## Deployment

This project is configured for Railway. The `Procfile`/start command runs `next start` on `$PORT`.
