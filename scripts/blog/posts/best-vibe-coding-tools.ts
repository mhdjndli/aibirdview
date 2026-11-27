/*
 * Sources checked on 2026-11-27 (official pages unless noted):
 * - https://lovable.dev/pricing : Free (5 daily build credits up to 30/month, 20 Cloud credits/month, invite-only publishing), Pro $25/mo with 100 credits, Business $50/mo, yearly billing gives 2 months free, rollover rules.
 * - https://docs.lovable.dev/introduction/subscription-plans : Pro tiers (100 credits $25, 200 $50, 400 $100 ... annual $21/mo for 100), code editing and custom domains need Pro, Git sync to GitHub, GitLab, Bitbucket on Free.
 * - https://docs.lovable.dev/introduction/plans-and-credits : Plan mode 1 credit per message, usage-based build credits (color change 0.50, add auth 1.20, landing page 2.00), Pro daily credits with no monthly cap, hosting free, 20 Cloud credits.
 * - https://docs.lovable.dev/features/cloud : Lovable Cloud includes database, auth, storage, realtime, edge functions, scheduled jobs, secrets, logs.
 * - https://docs.lovable.dev/introduction/welcome : full-stack web apps, security checks and Security center, Git sync.
 * - https://replit.com/pricing : no free plan listed; Core $20/mo ($18 annual) with $20 toward more powerful models and Free Mode up to 30 hours of chat and 60 projects; Pro $100/mo ($90 annual) with $100, 15 collaborators, 28-day database rollback; higher Pro tiers.
 * - https://docs.replit.com/billing/plans : Starter no longer available to new builders, 3-day Core trial for eligible users.
 * - https://docs.replit.com/chat/free-mode and https://docs.replit.com/chat/agent-modes : Free Mode on Core and Pro, resets every 5 hours with a weekly limit, automatic model routing; Power and Max modes use monthly credits; Replit asks before a paid action.
 * - https://docs.replit.com/tutorials/build-and-launch-a-mobile-app and https://docs.replit.com/build/mobile-upload-ios (search excerpts): Agent builds mobile apps with Expo, Launch wizard publishes to TestFlight and the App Store, Apple Developer membership required.
 * - https://bolt.new/pricing : Free 1M tokens/month with 300K daily limit; Pro $25/mo from 10M tokens, rollover up to 2 months; Teams $30/member; yearly saves up to 28%; hosting request caps 333K (Free) and 1M (Pro); unlimited databases.
 * - https://bolt.new/ : Bolt Cloud with databases, auth, hosting, custom domains; Bolt Agent Standard and Max (Max is Pro only).
 * - https://support.bolt.new/integrations/expo (search excerpt): mobile apps built with Expo, Expo Go testing, App Store and Play distribution via EAS.
 * - https://v0.app/pricing : Free 7 messages/day, Design Mode, GitHub sync, deploy to Vercel; Plus $30/user/mo with $30 monthly credits plus $2 daily login credits; Business $100/user/mo.
 * - https://v0.app/docs : Next.js, Tailwind and shadcn/ui; screenshots and Figma files to UI; one-click Vercel deploys; pull requests.
 * - https://base44.com/pricing : Free 25 message credits and 100 integration credits/month, up to 5 apps; Starter $16, Builder $40, Pro $80, Elite $160 (annual billing, monthly billing costs 20% more); code edits from Starter, GitHub from Builder.
 * - https://base44.com/ : apps, websites and AI agents; auth, database, hosting built in; Wix Payments; footer copyright Wix.com Ltd.
 * - https://www.anything.com/docs/account/subscriptions.md and https://www.anything.com/docs/account/credits.md : building requires a paid plan; Pro 20k $19/mo annual or $24 monthly; Max from $199/mo annual or $239 monthly; App Store publishing on Pro.
 * - https://aistudio.google.com/docs/aistudio-build-mode : Build mode makes React/Node.js web apps or native Android apps (Kotlin, Jetpack Compose), Firebase Firestore and Auth provisioned automatically, publish to Cloud Run (Cloud Run pricing may apply), GitHub sync, no built-in storage yet.
 * - https://aistudio.google.com/docs/pricing : free tier includes access to Google AI Studio with free tokens on some models; free-tier content may be used to improve Google products.
 * - https://www.framer.com/pricing : Free with 500 AI credits/month and a Framer domain; Basic $10/mo with 1,000 AI credits; Pro $30/mo with 3,000; AI agents consume credits.
 * - https://cursor.com/pricing : Free (limited), Plus $8 introductory (Grok models only), Premium $30 (third-party models at API list price), Super $100, Ultra $200, Teams from $30/user; weekly usage refresh; sold through X Subscription Corp.
 * - https://cursor.com/features : Agent with Plan mode, cloud agents in parallel, Bugbot code review, Cursor CLI, model list.
 * - https://claude.com/pricing : Claude Code included in Pro ($20/mo, $17 annual), Max ($100, 5x Pro), Ultra ($200, 10x Pro weekly, no 5-hour limit for verified accounts), Team and Enterprise; not in Free; limits every 5 hours and weekly.
 * - https://code.claude.com/docs/en/overview : terminal, VS Code, JetBrains, desktop app and web; edits files, runs commands, git, MCP, CLAUDE.md, subagents, scheduled tasks.
 * - https://learn.chatgpt.com/docs/pricing (redirect from developers.openai.com/codex/pricing): Codex in Free (quick coding tasks), Go $8 (lightweight tasks), Plus $20 (web, CLI, IDE extension, iOS; per-5-hour message estimates by model), Pro from $100 ($100, $200, $500; no five-hour limit), Business $20/user annual or $25 monthly; extra credits purchasable.
 * - https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus : ChatGPT Plus $20/month.
 * - https://github.com/features/copilot/plans and https://docs.github.com/en/copilot/get-started/plans : Free 2,000 completions/month with limited chat and agent use, no cloud coding agent; Pro $10 (1,500 AI credits, 1 credit = $0.01); Pro+ $39; Max $100; coding agent from Pro.
 * - https://devin.ai/desktop and https://devin.ai/pricing : Devin Desktop is the new name for Windsurf; Free (light quota, unlimited inline edits and Tab), Pro $20 (frontier models from OpenAI, Claude, Gemini, SpaceXAI; extra usage at API pricing), Max $200.
 * - https://antigravity.google/pricing : free Individual plan with a baseline agent quota refreshed weekly; higher quotas through Google AI Pro and Ultra.
 * - https://emergent.sh/pricing : Free 10 credits/month; Standard $20/mo ($17 annual) with 100 credits; Pro $200/mo ($167 annual) with 750 credits.
 * - https://en.wikipedia.org/wiki/Vibe_coding (secondary): term coined by Andrej Karpathy in an X post on February 2, 2025.
 *
 * Changes from the previous version: Windsurf listed under its new name, Devin Desktop. Anything kept, but its docs now say building needs a paid plan, so it is no longer described as free. Emergent moved to "other tools".
 */
import type { Post } from "../types";

const post: Post = {
  slug: "best-vibe-coding-tools",
  title: "Best Vibe Coding Tools in 2026: 13 Picks for Non-Coders and Developers",
  excerpt:
    "The best vibe coding tool depends on who is building. Non-coders get furthest with browser app builders like Lovable, Replit, Bolt, v0 and Base44, while developers should pick an AI editor or agent such as Cursor, Claude Code, OpenAI Codex or GitHub Copilot. Here are 13 picks with verified free plans, credit limits and real costs.",
  seoTitle: "13 Best Vibe Coding Tools (2026): Free and Paid, Compared",
  seoDescription:
    "The best vibe coding tools and platforms of 2026: Lovable, Replit, Cursor, Claude Code and more, compared on free plans, credit limits and real costs.",
  metaKeywords:
    "vibe coding tools, best vibe coding tools, vibe coding platform, vibe coding platforms, vibe coding app, vibe coding apps, vibe coding app builder, vibe coding tool, best ai for vibe coding, vibe coding website, vibe coding website builder, top vibe coding tools, best tools for vibe coding, vibe coding software, free vibe coding tools, best free vibe coding tools, what is the best vibe coding tool",
  categories: ["guides", "reviews"],
  body: [
    { p: "**The best vibe coding tools in 2026 split into two groups.** If you don't code, use a browser app builder: [Lovable](/tools/lovable) is the easiest way to get a web app with a database and logins, and [Replit](/tools/replit) is the best vibe coding platform if you also want a native mobile app. If you already code, use an AI editor or agent: [Cursor](/tools/cursor) if you want AI inside your editor, [Claude Code](/tools/claude-code) if you want an agent that works across your whole repo. Prices below were checked on official pricing pages in November 2026." },

    { h2: "Quick picks: the best vibe coding tool for each need" },
    { ul: [
      "**Best vibe coding app builder for non-coders:** [Lovable](/tools/lovable), with a built-in backend, from $25/mo.",
      "**Best all-in-one vibe coding platform, with mobile apps:** [Replit](/tools/replit), from $20/mo.",
      "**Best for seeing the code as it builds:** [Bolt.new](/tools/bolt-new), 1M free tokens a month.",
      "**Best for polished React interfaces:** [v0 by Vercel](/tools/v0), 7 free messages a day.",
      "**Best for internal tools without touching code:** [Base44](/tools/base44), from $16/mo billed annually.",
      "**Best vibe coding website builder:** [Framer AI](/tools/framer-ai), from $10/mo.",
      "**Best free way to prototype:** [Google AI Studio](/tools/google-ai-studio) Build mode.",
      "**Best AI editor for developers:** [Cursor](/tools/cursor), from $8/mo for Grok models.",
      "**Best coding agent for developers:** [Claude Code](/tools/claude-code), with Claude Pro at $20/mo.",
      "**Best for delegating tasks in parallel:** [OpenAI Codex](/tools/openai-codex), limited on ChatGPT Free, fuller on Plus at $20/mo.",
    ] },

    { logos: ["lovable", "replit", "cursor", "claude-code"] },

    { h2: "Vibe coding tools compared" },
    { p: "Monthly USD list prices as of November 2026. Most tools also meter credits or usage on top, covered in the costs section below." },
    { table: {
      head: ["Tool", "Best for", "Free plan", "Paid from", "Standout"],
      rows: [
        ["Lovable", "Non-coders, full-stack web apps", "Yes, 5 credits a day (max 30 a month)", "$25/mo", "Built-in database, auth and hosting"],
        ["Replit", "Web and mobile apps in one workspace", "No, Core has a 3-day trial", "$20/mo ($18 annual)", "Free Mode agent work, App Store publishing"],
        ["Bolt.new", "Builders who want to see the code", "Yes, 1M tokens a month", "$25/mo", "Unused paid tokens roll over"],
        ["v0", "React and Next.js UI on Vercel", "Yes, 7 messages a day", "$30/user/mo", "Screenshot and Figma to UI"],
        ["Base44", "Internal tools, no code", "Yes, 25 message credits a month", "$16/mo (annual)", "Backend included on every plan"],
        ["Anything", "Mobile apps for the App Store", "No building on free", "$19/mo (annual)", "iOS publishing on Pro"],
        ["Google AI Studio", "Free prototypes with Gemini", "Yes, free tier", "Pay as you go", "Firebase auth and database set up for you"],
        ["Framer AI", "Marketing websites", "Yes, 500 AI credits a month", "$10/mo", "Visual canvas, CMS, hosting"],
        ["Cursor", "Developers in an AI editor", "Yes, limited", "$8/mo (Grok only)", "Agent, cloud agents, Bugbot review"],
        ["Claude Code", "Agent work on real codebases", "No", "$20/mo (Claude Pro)", "Terminal, IDE, desktop and web"],
        ["OpenAI Codex", "Delegating tasks to the cloud", "Yes, limited", "$20/mo (ChatGPT Plus)", "Cloud tasks plus CLI and IDE"],
        ["GitHub Copilot", "Developers already on GitHub", "Yes, 2,000 completions a month", "$10/mo", "Coding agent on paid plans"],
        ["Devin Desktop", "Editor plus local and cloud agents", "Yes, light quota", "$20/mo", "Formerly Windsurf"],
      ],
    } },

    { h2: "What is vibe coding?" },
    { p: "Vibe coding means describing the software you want in plain language and letting AI write the code, then steering by what you see in the preview rather than by reading every line. Andrej Karpathy coined the term in an X post in February 2025. In 2026 it covers two kinds of product: **vibe coding app builders** that run in your browser and hide most of the code (Lovable, Replit, Bolt, v0, Base44), and **AI coding tools** that put an agent inside a developer's editor or terminal (Cursor, Claude Code, Codex, Copilot)." },

    { h2: "What is the best vibe coding tool?" },
    { p: "**For most non-coders, the best vibe coding tool is Lovable.** It builds a web app with a database, user accounts, file storage and hosting from a chat, and its free plan is enough to test an idea. Choose **Replit** instead if you need an iPhone app or want a real code workspace alongside the agent." },
    { p: "**For developers, the best vibe coding tool is Claude Code or Cursor**, depending on where you like to work. Claude Code is an agent you hand whole tasks to in a terminal, IDE or browser. Cursor is an editor with an agent beside your code. Neither hosts your app or sets up a database for you." },

    { h2: "Best vibe coding platforms for non-coders: app and website builders" },
    { p: "These run in the browser: describe the app, watch a live preview, publish without setting up servers." },

    { h3: "1. Lovable: best vibe coding app builder for non-coders" },
    { p: "[Lovable](/tools/lovable) turns a chat into a full-stack web app backed by **Lovable Cloud**: a database, sign-up and sign-in, file storage, edge functions, scheduled jobs and logs. Plan mode lets you agree on an approach before any code changes, and built-in security checks flag common problems. Git sync to GitHub, GitLab or Bitbucket works even on the free plan." },
    { ul: [
      "**Who it's for:** founders, product managers and small businesses building an MVP, client portal or internal tool.",
      "**Does well:** the most complete backend of any builder here, with no setup.",
      "**Limits:** web apps only, not native mobile. Editing code inside Lovable and custom domains need Pro. On the free plan, published apps are shared only with invited people.",
      "**Pricing (Nov 2026):** Free with 5 build credits a day, capped at 30 a month. Pro is $25/mo for 100 monthly credits plus 5 daily credits, with larger tiers up to 10,000 credits. Business is $50/mo. Yearly billing gives two months free.",
    ] },
    { p: "Read our [Lovable review](/blog/lovable-review), or follow the [step-by-step guide to building an app with Lovable](/blog/how-to-build-an-app-with-lovable)." },

    { h3: "2. Replit: best all-in-one vibe coding platform" },
    { p: "[Replit](/tools/replit) pairs an AI agent with a full cloud workspace, databases, storage and hosting. It is the strongest builder here for mobile: its agent builds apps with Expo, and a Launch wizard publishes them to TestFlight and the App Store. Everyday agent work runs in **Free Mode**, which costs nothing within your plan's allowance. Power and Max modes draw on monthly credits, and Replit asks before a paid action starts." },
    { ul: [
      "**Who it's for:** technical founders, students and anyone who wants an iPhone app without a Mac.",
      "**Does well:** real code access, mobile publishing, and 28-day database rollback on Pro.",
      "**Limits:** no free plan for new users, Free Mode resets every 5 hours with a weekly cap, and you cannot choose the model in Free Mode.",
      "**Pricing (Nov 2026):** Core $20/mo ($18 annual) with $20 toward more powerful models and a Free Mode allowance of up to 30 hours of chat. Pro $100/mo ($90 annual) with $100 in credits and up to 15 collaborators. Eligible new users get a 3-day Core trial.",
    ] },
    { p: "More detail, including how paid modes are billed, in our [Replit review](/blog/replit-review)." },

    { h3: "3. Bolt.new: best for seeing the code as it builds" },
    { p: "[Bolt.new](/tools/bolt-new) from StackBlitz is more hands-on than Lovable: you can start from a prompt, a Figma file or a GitHub repo, and the code stays part of the workspace. **Bolt Cloud** adds databases, user management and authentication, hosting with analytics and custom domains. Mobile apps are built with Expo, so you can test on your phone with Expo Go." },
    { ul: [
      "**Who it's for:** tinkerers and junior developers who want to watch and learn from what the AI writes.",
      "**Does well:** a generous free token allowance, and paid tokens that roll over for up to two months.",
      "**Limits:** users report token use climbing fast on large projects, and it is more technical than Lovable or Base44. The stronger Max agent is Pro only.",
      "**Pricing (Nov 2026):** Free with 1M tokens a month (300K a day). Pro $25/mo from 10M tokens with no daily cap. Teams $30 per member. Yearly billing saves up to 28%.",
    ] },
    { p: "See how the three best-known builders stack up in [Lovable vs Bolt vs v0](/blog/lovable-vs-bolt-vs-v0)." },

    { h3: "4. v0 by Vercel: best for polished React interfaces" },
    { p: "[v0](/tools/v0) is Vercel's builder. It works on Next.js, Tailwind and shadcn/ui, turns screenshots or Figma files into working pages, and deploys to Vercel in one click. It can also open pull requests, which helps when a developer takes over." },
    { ul: [
      "**Who it's for:** designers, front-end developers and teams already on Vercel.",
      "**Does well:** clean UI output, GitHub sync and Design Mode even on the free plan.",
      "**Limits:** per-seat pricing adds up for teams, and wiring up a backend assumes some developer knowledge.",
      "**Pricing (Nov 2026):** Free with 7 messages a day. Plus $30 per user per month with $30 of monthly credits and $2 of daily login credits. Business $100 per user.",
    ] },

    { h3: "5. Base44: best for internal tools without code" },
    { p: "[Base44](/tools/base44) builds apps, websites and AI agents from plain-language descriptions, with authentication, a database and hosting included on every plan, and payments through Wix Payments. It hides the code more than any other builder here." },
    { ul: [
      "**Who it's for:** non-technical teams and solo business owners.",
      "**Does well:** very beginner friendly, and the free plan includes the backend.",
      "**Limits:** you cannot pick the AI model, in-app code edits start on Starter, and GitHub sync starts on the $40 Builder plan.",
      "**Pricing (Nov 2026):** Free with 25 message credits a month and up to 5 apps. Starter $16/mo (100 credits), Builder $40/mo (250), Pro $80/mo (500), Elite $160/mo (1,200), all billed annually. Monthly billing costs about 20% more.",
    ] },

    { h3: "6. Anything: best for App Store apps from one prompt" },
    { p: "[Anything](/tools/create-xyz), formerly Create, is built around mobile: you describe an app and it builds it, then helps you publish to the App Store." },
    { ul: [
      "**Who it's for:** creators who want an app in the App Store rather than a website.",
      "**Does well:** a mobile-first flow with publishing built in.",
      "**Limits:** Anything's docs say building an app requires a paid plan.",
      "**Pricing (Nov 2026):** Pro 20k is $19/mo billed annually or $24 monthly, with 20,000 credits, private projects and custom domains. Max starts at $199/mo annually ($239 monthly).",
    ] },

    { h3: "7. Google AI Studio: best free way to prototype" },
    { p: "[Google AI Studio](/tools/google-ai-studio) has a **Build mode** that turns a prompt into a React web app or a native Android app with a live preview. For web apps it sets up Firebase Firestore and Firebase Authentication, including Sign in with Google, automatically. You can sync to GitHub or publish to Cloud Run." },
    { ul: [
      "**Who it's for:** anyone testing an AI-powered idea before paying for a builder.",
      "**Does well:** Google's free tier covers AI Studio access, and Gemini features are built in.",
      "**Limits:** no built-in file storage yet, no real-time co-editing, and on the free tier your content may be used to improve Google's products. Cloud Run hosting and paid models can cost money.",
      "**Pricing (Nov 2026):** free to start. Publishing to Cloud Run uses Google Cloud pricing, and API use beyond the free tier is billed per token.",
    ] },

    { h2: "Best vibe coding website builder" },

    { h3: "8. Framer AI: best for marketing websites" },
    { p: "[Framer AI](/tools/framer-ai) adds AI agents to Framer's visual website builder, so you can generate and edit pages with prompts, then fine-tune them on the canvas. Framer includes a CMS and hosting." },
    { ul: [
      "**Who it's for:** marketers, designers and founders launching a site.",
      "**Does well:** design quality and hands-on visual editing after the AI's first draft.",
      "**Limits:** websites only, with no app backend. The free plan uses a Framer domain, and a custom domain needs a paid plan.",
      "**Pricing (Nov 2026):** Free with 500 AI credits a month. Basic $10/mo with 1,000 AI credits. Pro $30/mo with 3,000.",
    ] },

    { h2: "Best vibe coding tools for developers: AI editors and agents" },
    { p: "If you can read code, these give you more control: your own stack, repo and hosting. For a wider survey, including code review bots, see our [best AI coding tools](/blog/best-ai-coding-tools) guide." },

    { h3: "9. Cursor: best AI editor for developers" },
    { p: "[Cursor](/tools/cursor) is an AI code editor. Its agent plans and builds changes across many files, with a Plan mode for review first, and cloud agents can work on longer tasks in parallel. Bugbot reviews pull requests on GitHub, and a CLI brings the agent to your terminal. Plans are now sold through X Subscription." },
    { ul: [
      "**Who it's for:** developers, and builders graduating from an app builder.",
      "**Does well:** fast in-editor agent work on any codebase, plus parallel cloud agents.",
      "**Limits:** you handle hosting and databases yourself. Claude, GPT and Gemini models are billed at API list price on Premium and above, with no included allowance.",
      "**Pricing (Nov 2026):** Free with limited usage. Plus $8/mo introductory (Grok models only). Premium $30/mo with 4x Plus usage. Super $100, Ultra $200. Usage refreshes weekly.",
    ] },
    { p: "Our [Cursor review](/blog/cursor-review) explains what the plan changes mean in practice, and [Claude Code vs Cursor](/blog/claude-code-vs-cursor) compares the two developer favorites." },

    { h3: "10. Claude Code: best coding agent for real codebases" },
    { p: "[Claude Code](/tools/claude-code) is Anthropic's agentic coding tool. It reads your codebase, edits files, runs commands and tests, and handles git, from the terminal, VS Code, JetBrains, a desktop app or the browser. A CLAUDE.md file holds project rules, and MCP connects it to tools like Jira." },
    { ul: [
      "**Who it's for:** developers and technical founders with an existing repo.",
      "**Does well:** multi-file changes on large projects, any language or stack.",
      "**Limits:** no free plan, no built-in hosting or database, and usage limits reset every 5 hours and weekly.",
      "**Pricing (Nov 2026):** included with Claude Pro at $20/mo ($17 annual), Max at $100/mo (5x Pro usage), Ultra at $200/mo, and Team and Enterprise plans.",
    ] },
    { p: "New to it? Start with [how to use Claude Code](/blog/how-to-use-claude-code)." },

    { h3: "11. OpenAI Codex: best for delegating tasks in parallel" },
    { p: "[OpenAI Codex](/tools/openai-codex) runs coding tasks in the cloud and in your own environment through a CLI, IDE extension, web app and iOS app." },
    { ul: [
      "**Who it's for:** developers who already pay for ChatGPT.",
      "**Does well:** parallel tasks on a plan many people already have.",
      "**Limits:** Plus limits are counted per 5-hour window and vary a lot by model, and you still need to review every change.",
      "**Pricing (Nov 2026):** limited on ChatGPT Free and Go ($8/mo). Included with Plus at $20/mo and Pro from $100/mo, which removes the five-hour limit. Business is $25 per user monthly or $20 billed annually.",
    ] },
    { p: "We compare the two agents head to head in [OpenAI Codex vs Claude Code](/blog/openai-codex-vs-claude-code)." },

    { h3: "12. GitHub Copilot: best value for developers on GitHub" },
    { p: "[GitHub Copilot](/tools/github-copilot) gives you completions and chat in your IDE and on github.com, and paid plans add a coding agent you can delegate work to. Usage is measured in AI credits, where one credit is one cent." },
    { ul: [
      "**Who it's for:** teams whose code lives on GitHub.",
      "**Does well:** the cheapest paid entry point here, and a real free tier.",
      "**Limits:** the free plan has no cloud coding agent and only limited chat,.",
      "**Pricing (Nov 2026):** Free with 2,000 completions a month. Pro $10/mo with $15 of AI credits. Pro+ $39/mo with $70. Max $100/mo with $200.",
    ] },
    { p: "See our [GitHub Copilot review](/blog/github-copilot-review)." },

    { h3: "13. Devin Desktop (formerly Windsurf): best editor with local and cloud agents" },
    { p: "[Devin Desktop](/tools/windsurf) is the new name for the Windsurf editor, now sold alongside the Devin agent on the same plans. It keeps the full IDE and Tab completions, and adds a command center for managing several agents, with sessions that move between your machine and Devin Cloud." },
    { ul: [
      "**Who it's for:** developers who want an editor and autonomous agents in one place.",
      "**Does well:** unlimited inline edits and Tab completions even on the free plan.",
      "**Limits:** quotas refresh daily and weekly but are not published as numbers, and extra usage is billed at API prices.",
      "**Pricing (Nov 2026):** Free with a light quota. Pro $20/mo with frontier models from OpenAI, Anthropic, Google and SpaceXAI. Max $200/mo.",
    ] },
    { p: "For editor-to-editor detail, see [Cursor vs Windsurf vs Trae](/blog/cursor-vs-windsurf-vs-trae)." },

    { h2: "Free vibe coding tools" },
    { p: "You can vibe code for free, but every free plan is capped. The most useful free allowances in November 2026:" },
    { ul: [
      "**Bolt.new:** 1M tokens a month, up to 300K a day, with hosting and databases.",
      "**Lovable:** 5 credits a day, up to 30 a month, with Lovable Cloud included. Simple edits cost under 1 credit.",
      "**v0:** 7 messages a day, with GitHub sync and Vercel deploys.",
      "**Base44:** 25 message credits a month and up to 5 apps, backend included.",
      "**Google AI Studio:** included in Google's free tier, with Build mode for web and Android prototypes. Cloud Run hosting is billed separately.",
      "**Framer AI:** 500 AI credits a month for websites on a Framer domain.",
      "**For developers:** GitHub Copilot Free (2,000 completions a month), Devin Desktop Free (unlimited Tab), Cursor Free, OpenAI Codex on ChatGPT Free, and Google Antigravity, whose free plan has a weekly agent quota.",
    ] },
    { p: "Two tools on this list have no free building: Replit (new users get a 3-day Core trial instead) and Anything. Claude Code needs a paid Claude plan. More in [the best free AI tools](/blog/best-free-ai-tools)." },

    { h2: "What vibe coding costs once you build seriously" },
    { p: "The plan price is the floor. A common complaint in public reviews of every tool here is credits spent while the AI loops on a bug it created." },
    { table: {
      head: ["Tool", "What you pay for", "Entry plan includes", "When you need more"],
      rows: [
        ["Lovable", "Credits per message, scaled by task size", "100 credits plus 5 a day for $25", "Tiers of 200 ($50), 400 ($100) and up"],
        ["Replit", "Free Mode allowance, then Power or Max credits", "$20 of credits on Core", "Pro at $100 with $100 of credits, or buy more"],
        ["Bolt.new", "Tokens", "10M tokens for $25", "Larger Pro token tiers; unused tokens roll over 2 months"],
        ["v0", "Dollar-value credits", "$30 plus $2 a day per user", "Buy more credits, shared across the team"],
        ["Base44", "Message and integration credits", "100 messages on Starter", "Builder (250), Pro (500), Elite (1,200)"],
        ["Cursor", "Weekly usage pool, plus API price for third-party models", "Grok usage on $8 Plus", "Premium, Super or Ultra, or top-offs"],
        ["Claude Code", "5-hour and weekly usage limits", "Pro usage for $20", "Max (5x) at $100, Ultra at $200"],
        ["OpenAI Codex", "Messages per 5-hour window, then credits", "Plus usage for $20", "Pro from $100, or extra credits"],
        ["GitHub Copilot", "AI credits (1 credit = $0.01)", "$15 of credits on $10 Pro", "Pro+ ($70 of credits) or Max ($200)"],
      ],
    } },
    { p: "To put Lovable's numbers in context: its docs price a color change at 0.50 credits, adding authentication at 1.20 and a landing page with images at 2.00, while Plan mode costs 1 credit per message. At those rates, Pro's 100 monthly credits cover roughly 80 to 200 typical edits, so a project you work on every day can outgrow the base tier." },
    { p: "To keep bills down on any tool: approve a plan before code is written, make one change per prompt, and after two failed fixes roll back and rephrase instead of paying for a third attempt." },

    { h2: "How to choose a vibe coding tool" },
    { ol: [
      "**If nobody on the project will read the code, use an app builder.** Lovable for web apps, Base44 for internal tools, Framer for a website.",
      "**If you need logins and saved data, rule out website builders.** Lovable, Replit, Bolt, Base44 and Google AI Studio set up auth and a database for you.",
      "**If you need an App Store app, pick Replit, Bolt or Anything.** Lovable and v0 build web apps.",
      "**If a developer will take over later, connect GitHub from day one.** Lovable, v0 and Bolt make this easy; on Base44 it starts on the $40 plan.",
      "**If you already code, skip the builders.** Use Cursor if you want AI in your editor, Claude Code or Codex if you want to hand over whole tasks, and Copilot if you want the lowest price.",
      "**If you already pay for ChatGPT or Claude, start there.** Codex comes with ChatGPT Plus and Claude Code with Claude Pro.",
      "**If your budget is zero, start with Bolt or Lovable.**",
    ] },

    { h2: "Other vibe coding tools worth a look" },
    { ul: [
      "**[Emergent](/tools/emergent):** a team of agents that builds web and mobile apps. Free with 10 credits a month, Standard $20/mo ($17 annual) with 100 credits.",
      "**[Google Antigravity](/tools/google-antigravity):** Google's agent-first coding platform, with a free individual plan and higher quotas through Google AI subscriptions.",
    ] },

    { h2: "How we picked" },
    { p: "We built this list from official pricing pages, product documentation and changelogs, and public user reviews and forum discussions, all checked in November 2026. We did not run our own benchmark tests or hands-on trials. We included tools that are actively maintained and have a clear public price. Since our last update, Windsurf became Devin Desktop, Anything's docs now say building needs a paid plan, and Replit dropped its free plan for new users. Prices change often, so confirm on the vendor's site before you buy." },

    { h2: "FAQ" },
    { h3: "What is the best free vibe coding tool?" },
    { p: "Bolt.new's free plan, at 1M tokens a month, gives the most room to experiment. Lovable's free plan (5 credits a day, up to 30 a month) is best if you need a database and logins without setup. Developers can get far on GitHub Copilot Free or Devin Desktop Free." },
    { h3: "What is the best AI for vibe coding?" },
    { p: "There is no single best model, because most builders pick the model for you: Replit routes automatically in Free Mode, and Bolt routes tasks to the right model. If you choose your own, Claude Code runs Anthropic's Claude models and Codex runs OpenAI's. Cursor's cheapest paid plan covers only Grok models." },
    { h3: "What is the best vibe coding app builder for mobile apps?" },
    { p: "Replit is the best choice for a native iPhone app, because its agent builds with Expo and its Launch wizard publishes to TestFlight and the App Store. Bolt also builds Expo apps, and Anything is built for App Store publishing on its paid plans." },
    { h3: "Can I build a website with vibe coding?" },
    { p: "Yes. For a marketing site, use Framer AI (free to $30 a month). For a site with accounts and data, such as a members area, use Lovable or Base44." },
    { h3: "Which vibe coding platform can build real-time SMS and push notifications quickly?" },
    { p: "Replit or Bolt, because push notifications are simplest in a native app and both build with Expo. For SMS, your app calls a messaging provider from server-side code, such as a Replit backend or Lovable's edge functions." },
    { h3: "Is vibe coding safe for real apps?" },
    { p: "It is safe for prototypes and low-risk internal tools. AI-built apps can ship with loose database permissions or exposed keys, and built-in checks like Lovable's security checks help but are not a full audit. Get a human review of data access, secrets and payments before real users arrive." },

    { h2: "Bottom line" },
    { p: "**Don't code? Start with Lovable**, or **Replit** if you need a mobile app. **Do code? Use Cursor or Claude Code**, or Codex and Copilot if you already pay for ChatGPT or GitHub. Build the same small app on two of them and keep the one whose result you understand best." },

    { hr: true },
    { p: "Browse every AI app builder, editor and coding agent we track in the [AI coding category](/categories/code). Building a vibe coding tool we've missed? [Submit it for a listing](/submit)." },
  ],
};

export default post;
