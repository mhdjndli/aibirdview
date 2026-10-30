import type { Post } from "../types";

const post: Post = {
  slug: "replit-review",
  title: "Replit Review (2026): Agent 4, Free Mode and Real Costs",
  excerpt:
    "Replit is the most complete all-in-one AI app builder: an agent, a cloud IDE, databases, hosting and even an iOS App Store flow in one browser tab. This Replit review covers Agent 4, the new Free Mode, effort-based pricing, what each plan really gets, common complaints, and when Lovable, Bolt, v0 or Cursor is the better choice.",
  seoTitle: "Replit Review (2026): Agent 4, Pricing, Pros and Cons",
  seoDescription:
    "Our Replit review for 2026: Agent 4, Free Mode, effort-based pricing, Core vs Pro, mobile apps, real user complaints, and how it compares with Lovable and Bolt.",
  metaKeywords:
    "replit review, replit agent review, replit pricing, is replit worth it, is replit free, replit agent 4, replit free mode, replit core vs pro, replit vs lovable, replit vs bolt, replit mobile app, replit effort based pricing",
  categories: ["reviews", "deep-dives"],
  body: [
    { p: "**Replit review verdict: Replit is the best all-in-one AI app builder for people who want more control than Lovable gives them, without setting up a local development environment.** Its agent plans, builds, tests and publishes full-stack web apps, mobile apps and data tools, and you can open the code in a real cloud IDE whenever you want. It suits technical founders, students, hobbyists and small teams building internal tools. Skip it if you need a predictable monthly bill, or if you are a working developer who already lives in an editor like Cursor." },
    { p: "Replit had a busy 2026. Agent 4 brought a design canvas and parallel agents, Free Mode made everyday agent work free inside paid plans, and the old free Starter plan disappeared from the pricing page. It is based on Replit's official pricing page and documentation, product announcements and public user feedback as of October 2026, not hands-on benchmark testing. Prices and allowances change often, so confirm on [Replit's pricing page](https://replit.com/pricing) before you subscribe." },

    { logos: ["replit"] },


    { h2: "Replit at a glance" },
    { ul: [
      "**What it is:** a browser-based platform with an AI agent, a full cloud IDE, databases, storage and hosting.",
      "**Best for:** technical founders, students, makers and small teams who want to ship apps without installing anything.",
      "**What it builds:** web apps, Expo mobile apps, dashboards, AI tools, slides and data visualizations, several of which can share one backend.",
      "**Pricing:** Core is $20/mo ($18/mo billed annually). Pro is $100/mo ($90/mo annually) with higher credit tiers. Enterprise is custom.",
      "**Free option:** no free plan is listed on the pricing page since September 2026. Free Mode gives no-cost agent work inside Core and Pro, within an allowance.",
      "**Billing model:** effort-based. Each finished agent request creates a checkpoint, and you pay by how much work it took.",
      "**Biggest strength:** everything from idea to published app lives in one place, including a real code editor.",
      "**Biggest weakness:** costs on paid agent modes are hard to predict until you set budget limits.",
    ] },

    { h2: "What is Replit, and what changed in 2026?" },
    { p: "[Replit](/tools/replit) started as an online coding environment where you could write and run code in dozens of languages from a browser tab. It is now best known for **Replit Agent**, which turns a plain-English description into a working app, then sets up the database, writes the backend, tests its own work and publishes it to a live URL. Unlike most vibe coding tools, the editor and shell are always one click away." },
    { p: "Three changes shaped Replit this year:" },
    { ol: [
      "**Agent 4.** Replit's fourth-generation agent, announced in early 2026, added an infinite **Design Canvas** for exploring UI variations before committing to code, and **parallel agents** that split big jobs into smaller tasks, run them in the background and merge the results. One project can now hold several outputs, such as a web app, a mobile app and a slide deck, all sharing the same backend.",
      "**Free Mode.** Launched in August 2026, Free Mode is an agent mode for everyday work that does not draw down your credits. It is available to Core and Pro subscribers within a plan allowance, always uses automatic model routing, and resets on a rolling basis. Heavier work uses the paid **Power** and **Max** modes.",
      "**No more free plan on the pricing page.** In September 2026, Replit dropped the free Starter card from its pricing page, making Core the entry tier. Replit's billing docs still describe Starter limits (daily caps, one published app for 30 days, no Plan Mode), so a free sign-up may still exist for some users, but you should treat Core as the real starting point.",
    ] },

    { h2: "Replit's key features, in depth" },

    { h3: "Replit Agent: plan, build, test, fix" },
    { p: "You describe what you want, and the agent works through it as a series of steps. According to the [Replit Agent docs](https://docs.replit.com/replitai/agent), **Plan Mode** maps the project into an ordered task list you approve before any code or data changes, which is the single best habit for avoiding wasted credits. Once it builds, the agent tests its own work, creates a **checkpoint** after each request, and lets you roll the project back to any checkpoint if a change goes wrong." },
    { p: "Model choice is handled through modes rather than a long model list. **Free Mode** routes automatically and costs nothing within your allowance. **Auto** lets Replit choose the model for paid work, **Power** is the mid-tier paid mode for everyday builds, and **Max** is the top tier for large codebases and complex features. Replit asks for confirmation before a paid action starts." },

    { h3: "Design Canvas" },
    { p: "The Design Canvas replaced Replit's earlier Design Mode. It is an infinite board where the agent generates interface variants you can compare, edit visually and then apply to your app." },

    { h3: "Parallel agents and background tasks" },
    { p: "Agent 4 can run several tasks at once in the background, for example building a settings page while another agent wires up payments. When edits conflict, specialized sub-agents resolve them before the work merges into the main project. Limits depend on your plan: the agent docs list **1 active background task on Core and 10 on Pro**." },

    { h3: "Databases, storage and integrations" },
    { p: "Replit sets up infrastructure for you, including a database when your app needs one, plus file storage and secrets for API keys. Replit recommends its Storage and Database services rather than writing data to a published app's filesystem, which gets reset. **Connectors** let the agent pull data from services such as BigQuery, Linear, Slack and Notion directly from chat. AI features in your app can call models from providers such as Anthropic, OpenAI and Google through Replit, billed at the provider's public API rate and deducted from your credits." },
    { p: "Pro adds **database rollback for up to 28 days**, a real safety net when an agent runs a destructive migration." },

    { h3: "Publishing and hosting" },
    { p: "You publish straight from the workspace, with no separate hosting account. Replit offers four deployment types: **Autoscale** for apps whose traffic rises and falls, **Static** for simple sites at lower cost, **Reserved VM** for apps that need always-on compute at a predictable price, and **Scheduled** for jobs that run at set times. Custom domains are supported, and access controls for private apps are a Pro and Enterprise feature. Hosting bills against the same credits as the agent." },

    { h3: "Mobile apps with Expo, including the App Store" },
    { p: "Replit's mobile support is one of its biggest advantages over Lovable and v0. Choose **Mobile app** on the home screen and the agent builds a React Native app with Expo: one codebase that renders native components on iOS and Android, with a server on Replit for the database, API routes and AI logic. You preview it in the built-in iOS Simulator or Android Emulator, or on your own phone with Expo Go." },
    { p: "According to Replit's [Expo guide](https://docs.replit.com/learn/mobile/expo), you can publish to TestFlight and then the App Store through a guided flow, with no Mac or Xcode required. You still need an Apple Developer Program membership and must pass Apple's review. Publishing to Google Play is not supported yet." },

    { h3: "A real cloud IDE and collaboration" },
    { p: "Behind the agent is a full development environment: editor, shell, file tree, package management, Git, and support for many languages beyond JavaScript. You can invite collaborators to work in the same project (Pro allows up to 15), import a repository, or push your code to GitHub. If you outgrow the agent, you are already in an IDE." },

    { h2: "Replit pricing in 2026: what each plan gets" },
    { p: "Here is what Replit's pricing page lists as of October 2026. All plans bill agent and cloud usage against credits, so the subscription is a floor, not a ceiling." },
    { table: {
      head: ["Plan", "Price", "What you get"],
      rows: [
        ["**Starter** (not on pricing page)", "$0", "Per the billing docs: daily agent caps, Design Canvas, 1 published app for 30 days, no Plan Mode, no connectors, no background tasks, Replit badge"],
        ["**Core**", "$20/mo, or $18/mo billed annually", "Up to 30 hours of chat and 60 projects on Free Mode, $20 toward more powerful models, unlimited workspaces, AI integrations, 1 background task"],
        ["**Pro**", "$100/mo, or $90/mo billed annually", "More Free Mode usage, $100 in credits toward the most powerful models, up to 15 collaborators, 10 background tasks, 28-day database rollback, premium support; higher tiers at $215, $425, $825 and $2,000"],
        ["**Enterprise**", "Custom", "SSO, SCIM, audit logs, advanced privacy controls, single-tenant and private networking options, dedicated support, admin-managed model access"],
      ],
    } },
    { p: "Pro credits roll over for two months, according to Replit's [AI billing docs](https://docs.replit.com/billing/ai-billing), and you can buy extra credit packs with discounts on larger purchases." },

    { h3: "How effort-based pricing works" },
    { p: "On paid modes, Replit does not charge per message or per token you can see in advance. Each time the agent finishes a request, it creates a checkpoint, and the price of that checkpoint reflects how much work it took. A small text change costs cents; a complex feature that touches many files is bundled into one larger checkpoint. Plan Mode can also incur billable reasoning on the paid path even when it changes no code. You can hover over the usage icon in the Agent tab to see what each checkpoint cost." },
    { p: "You pay for results rather than every message, but you only learn the price after the work runs. So the most important setting is in Billing: set **usage alerts** and a **budget limit** that acts as a hard cap, on day one." },

    { h2: "Pros and cons" },
    { h3: "Pros" },
    { ul: [
      "**Truly all-in-one:** agent, IDE, database, storage, hosting and domains in one tab, with nothing to install.",
      "**Real code access:** you can read, edit and run the code at any time, in many languages.",
      "**Native mobile apps:** Expo builds with a guided TestFlight and App Store flow, no Mac needed.",
      "**Design Canvas and parallel agents:** explore UI options and run several tasks at once.",
      "**Free Mode:** routine agent work costs nothing within your Core or Pro allowance.",
      "**Safety nets:** checkpoints for code and 28-day database rollback on Pro.",
    ] },
    { h3: "Cons" },
    { ul: [
      "**Unpredictable costs** on Power and Max until you set a budget limit.",
      "**No advertised free plan** since September 2026, so trying it seriously means paying $20.",
      "**Hosting draws on the same credits,** so a successful app raises your bill.",
      "**Google Play publishing is not supported yet** for mobile apps.",
    ] },

    { h2: "Limitations and common complaints" },
    { p: "Public feedback praises how quickly an idea becomes a working prototype. The complaints cluster around three themes:" },
    { ul: [
      "**Cost predictability.** The most common complaint by far. Users describe spending well beyond their plan price to finish a project, especially when the agent loops on a bug and keeps regenerating code. Free Mode softened this for everyday work, but complex builds still move to paid modes.",
      "**Reliability on bigger projects.** The agent is strongest on prototypes, MVPs and internal tools. As a codebase grows, users report more regressions and more time spent steering.",
      "**You still need judgment.** Replit itself warns that the agent's behavior is probabilistic and may make mistakes. Someone has to review security, data access and payments before real users arrive.",
    ] },

    { h2: "Replit vs the alternatives" },
    { p: "Replit competes with two groups: AI app builders that hide the code, and AI coding tools for developers. Here is how it stacks up against the five you will most often see compared with it." },
    { table: {
      head: ["Tool", "Best for", "Mobile apps", "Code access", "Paid from (as of October 2026)"],
      rows: [
        ["[Replit](/tools/replit)", "All-in-one builds with a real IDE", "Expo, iOS App Store flow", "Full IDE", "$20/mo"],
        ["[Lovable](/tools/lovable)", "Non-developers shipping web apps", "Web and PWA only", "Git sync; editing on paid plans", "$25/mo"],
        ["[Bolt.new](/tools/bolt-new)", "Flexible browser workspace", "Expo", "Code view and export", "$25/mo"],
        ["[v0](/tools/v0)", "Next.js and React on Vercel", "Web only", "GitHub sync on every plan", "$30/user/mo"],
        ["[Cursor](/tools/cursor)", "Developers in an AI editor", "Any (you build it)", "Local files", "$8/mo (Grok models only)"],
      ],
    } },
    { h3: "Replit vs Lovable" },
    { p: "[Lovable](/tools/lovable) is easier for people who never want to see code, and its built-in Lovable Cloud backend is very polished. Replit gives you more control, a real IDE, more languages and a native mobile path. Pick Lovable for a web MVP built by a non-technical founder; pick Replit if you want to understand and steer the code, or need an App Store app. See our [Lovable review](/blog/lovable-review)." },
    { h3: "Replit vs Bolt and v0" },
    { p: "[Bolt.new](/tools/bolt-new) is the closest match in spirit: a browser coding workspace with an agent and Expo support, billed in tokens rather than effort-based checkpoints. [v0](/tools/v0) is the choice for teams on Next.js and Vercel who want polished UI and pull-request workflows. We compare those two with Lovable in [Lovable vs Bolt vs v0](/blog/lovable-vs-bolt-vs-v0)." },
    { h3: "Replit vs Cursor and Claude Code" },
    { p: "If you are a developer with an existing codebase, an AI editor like [Cursor](/tools/cursor) or a terminal agent like [Claude Code](/tools/claude-code) usually beats any app builder: you keep your own tools, hosting and Git workflow. Replit wins when you want hosting, databases and deployment handled for you. See [Claude Code vs Cursor](/blog/claude-code-vs-cursor) and our roundup of the [best vibe coding tools](/blog/best-vibe-coding-tools)." },

    { h2: "Who should use Replit?" },
    { ul: [
      "**Technical founders building an MVP:** yes. You get speed now and real code you can keep developing.",
      "**Non-technical founders:** yes, but consider Lovable first if you want the most hand-holding.",
      "**Mobile app builders:** one of the best options if iOS is your target; check Google Play support first if you need Android in the store.",
      "**Professional developers on a large existing codebase:** usually no. Use Cursor, Claude Code or [GitHub Copilot](/tools/github-copilot) instead.",
    ] },

    { h2: "FAQ" },
    { h3: "Is Replit free?" },
    { p: "Not really, as of October 2026. Replit removed the free Starter plan from its pricing page in September 2026, so Core at $20 a month ($18 billed annually) is the advertised entry point. Core and Pro include Free Mode, which covers everyday agent work at no extra cost within an allowance. Replit's docs still describe a limited Starter tier, so check whether it is offered to you." },
    { h3: "Is Replit worth it in 2026?" },
    { p: "Yes, if you want an agent, a real IDE, databases and hosting in one place, and you are willing to manage your spending. Core is good value for side projects and prototypes thanks to Free Mode. Heavy builders should expect to pay more than the subscription on Power and Max modes, so set a budget limit before you start a big build." },
    { h3: "How much does Replit Agent cost?" },
    { p: "Free Mode work costs nothing within your Core or Pro allowance. Paid work in Power or Max mode uses effort-based pricing: each finished request creates a checkpoint priced by the work involved, from cents for simple fixes to more for complex features. Core includes $20 of monthly credit toward paid models and Pro includes $100, and you can buy more." },
    { h3: "Can Replit build mobile apps?" },
    { p: "Yes. Choose Mobile app as the app type and Replit Agent builds a React Native app with Expo that runs on iOS and Android. You can test it in the built-in simulator or on your phone with Expo Go, and publish to TestFlight and the App Store without a Mac. You need an Apple Developer membership. Google Play publishing is not supported yet." },
    { h3: "Is Replit better than Lovable?" },
    { p: "It depends on how technical you are. Lovable is easier for non-developers and has a very complete built-in backend for web apps. Replit gives more control, a full IDE, many languages and native mobile apps with an App Store flow. Pick Lovable to stay away from code entirely, and Replit if you want to see and steer it." },
    { h3: "Do I own the code I build on Replit?" },
    { p: "Yes. Replit apps are standard code in your project, which you can edit in the IDE, download, or push to GitHub. Data in Replit's managed database and storage needs to be exported separately if you migrate." },
    { h3: "Is Replit good for beginners?" },
    { p: "Yes, it is one of the friendliest ways to learn by building, because the agent does the heavy lifting while every file it writes stays visible. Beginners should use Plan Mode, stay on Free Mode for small changes, and set a budget limit so a long debugging session does not turn into a surprise bill." },

    { h2: "Final verdict" },
    { p: "**Replit is the most complete AI app builder you can use from a browser in 2026.** Agent 4's Design Canvas and parallel agents make it faster to explore and build, Free Mode makes routine work cheap, and the real IDE, databases, hosting and App Store flow mean you rarely need another tool. The trade-off is cost control: effort-based pricing rewards people who plan their builds and punishes long debugging loops. Start on Core, use Plan Mode, set a budget cap, and upgrade to Pro only when you need parallel agents, more credits or database rollback." },

    { hr: true },
    { p: "Compare Replit with every AI app builder, editor and coding agent we track in the [AI coding category](/categories/code), or see more [AI agents](/categories/agents). Building a tool we should know about? [Submit it for a listing](/submit)." },
  ],
};

export default post;
