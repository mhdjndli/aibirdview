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

## Submission auto-approval

Free submissions are published automatically within 14 days
(`FREE_REVIEW_DAYS`). Submitters can pay for a same-day review ($9 by default,
`FAST_TRACK_PRICE_CENTS`), which publishes within `FAST_TRACK_HOURS` (12) of
payment. Each submission stores its own `publishBy` deadline; the sweep runs
hourly from `src/instrumentation.ts`, which POSTs to `/api/cron/auto-approve`.
Approved submitters get a "your tool is live" email and own the listing.

To reject something before it goes live, use the admin submissions queue
before its deadline. Rejecting a paid submission refunds it automatically. An external scheduler can also trigger the route
directly: set `CRON_SECRET` and send it as `Authorization: Bearer <secret>`.

## Payments (Stripe)

The $9 same-day review uses Stripe Checkout. It stays hidden until these are
set on the server:

- `STRIPE_SECRET_KEY`: from Stripe Dashboard → Developers → API keys.
- `STRIPE_WEBHOOK_SECRET`: add an endpoint at
  `https://aibirdview.com/api/stripe/webhook` listening for
  `checkout.session.completed`, then copy its signing secret.
- `FAST_TRACK_PRICE_CENTS` (optional, default `900`).

## Owner accounts

Signing in is an emailed 6-digit code (`/signin`); there are no passwords.
Submitters own the tools they submitted. Others claim a listing at
`/claim/<slug>` with an email on the tool's own domain (free email providers
and shared hosts such as github.com go to manual review). Owners propose edits
from `/account`; edits go live after approval in `/admin/edits`.
