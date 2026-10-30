import type { Post } from "../types";

const post: Post = {
  slug: "comet-browser-review",
  title: "Comet Browser Review (2026): Perplexity's Free AI Browser, Pros and Cons",
  excerpt:
    "Comet is Perplexity's free, Chromium-based AI browser. Its assistant reads your tabs, answers with citations and can complete tasks on websites. Here is what it does well, what stays on your device, what the paid Perplexity plans add, the real risks of an agentic browser, and how it compares with Dia, ChatGPT Atlas and Claude in Chrome.",
  seoTitle: "Comet Browser Review (2026): Features, Privacy, Verdict",
  seoDescription:
    "Our Comet browser review: what Perplexity's free AI browser does, the Assistant and agent tasks, privacy and security, Free vs Pro, pros, cons and alternatives.",
  metaKeywords:
    "comet browser review, comet browser, perplexity comet, comet ai browser, is comet browser free, is comet browser safe, comet assistant, comet browser privacy, comet vs chrome, comet vs dia, comet vs chatgpt atlas, perplexity browser, comet android",
  categories: ["reviews", "deep-dives"],
  body: [
    { p: "**Our Comet browser review in one line:** [Comet](/tools/comet-browser) is the best free AI browser for people who research, compare and read all day. It is Chrome underneath, so your extensions and habits carry over, and the built-in Comet Assistant can summarize pages, compare tabs, answer questions with sources and complete simple tasks on websites. Skip it if you want a hands-off agent for complex, logged-in workflows, or if you are not comfortable letting an AI act inside a browser where you are signed in to everything." },
    { p: "Perplexity launched Comet in July 2025 for its top-tier subscribers and made it a free download for everyone in October 2025. A year on, it runs on Mac, Windows and Android, with iOS listed on the official Comet page, and it has become the default answer to \"which AI browser should I try first?\". This review is based on Perplexity's Comet page, help center articles and pricing page, plus public user feedback, as of October 2026. We did not run controlled tests." },

    { logos: ["comet-browser", "perplexity"] },

    { h2: "Comet at a glance" },
    { ul: [
      "**What it is:** a Chromium-based web browser with Perplexity's AI built in.",
      "**Made by:** [Perplexity](/tools/perplexity), the AI answer engine.",
      "**Price:** free to download; paid Perplexity plans add stronger models and higher limits.",
      "**Platforms:** macOS, Windows and Android (Android 12 or later), with iOS listed on the Comet page.",
      "**Default search:** Perplexity, switchable to another engine.",
      "**Extensions:** supports most Chrome extensions, bookmarks and settings import.",
      "**Best for:** students, researchers, analysts and knowledge workers who live in tabs.",
    ] },

    { h2: "Quick verdict: who should use Comet" },
    { ul: [
      "**Yes, if** you constantly copy text from web pages into a chatbot. Comet removes that step.",
      "**Yes, if** you compare products, articles or sources across many tabs.",
      "**Yes, if** you already like Perplexity's cited answers and want them everywhere.",
      "**Yes, if** you want an AI browser without paying anything.",
      "**Think twice if** you plan to let it shop, email or fill forms on accounts that matter. Agentic browsing still carries prompt-injection risk.",
      "**Skip it if** you want a privacy-first browser with no cloud AI by default; [Brave](/tools/brave-leo) is a better fit.",
    ] },

    { h2: "What Comet is" },
    { shot: "comet-browser", caption: "Comet pairs a familiar Chromium browser with Perplexity's Assistant." },
    { p: "Comet is a full browser, not an extension. Because it is built on Chromium, the engine behind Chrome, it supports most Chrome extensions, bookmarks and page translation, and switching takes minutes. What makes it different is that Perplexity's AI is part of the browser: search defaults to Perplexity, an **Assistant** sits next to every page, and the address bar understands plain-language commands." },
    { p: "Perplexity's [Comet page](https://www.perplexity.ai/comet) pitches it as \"the AI browser that acts as a personal assistant\", with example tasks such as comparing news coverage, building a study plan from a syllabus, drafting an email reply about your schedule and shopping for an office chair. In practice, Comet is strongest at the first three: understanding and synthesizing what is on your screen." },

    { h2: "Key features in depth" },

    { h3: "Comet Assistant" },
    { p: "The Assistant panel opens beside the page you are reading. Each time you ask something, it reads the page's visible text, headlines and metadata, and you can pull in other tabs by mentioning them with `@`, for example \"compare @tab1 and @tab2 on price and battery life\". It can draft replies from a tab's content, translate sections, extract dates and locations, and summarize several tabs at once. According to the [Assistant panel help article](https://www.perplexity.ai/help-center/comet/en/articles/11734688-assistant-panel), it keeps working while you browse other pages, and you can run multiple requests in parallel." },
    { p: "There is also an **Inline Assistant** for help with selected text and a **Voice Mode** for talking to the browser." },

    { h3: "Agentic tasks" },
    { p: "Beyond answering questions, Comet can act on websites: clicking, navigating, filling forms and gathering information across sites. On Android, blue edges on the screen show when the AI is in control, and an assist button lists the steps it took. Examples Perplexity highlights include adding items to a cart, comparing prices across stores and finding and testing promo codes at checkout." },
    { p: "This is where expectations need managing. Public user feedback is consistent that Comet handles short, well-defined tasks well and struggles with long, multi-site flows, logins, CAPTCHAs and unusual page layouts. On Android, automated tasks only run while the app is open. Treat agentic tasks as a helpful shortcut, not a reliable autopilot." },

    { h3: "Search, Summarize and Browser Commands" },
    { p: "Typing in the address bar runs a Perplexity search with cited sources by default. A **Summarize** button condenses long articles, threads and videos. **Browser Commands** let you manage tabs in plain English, for example \"close all tabs older than two hours\" or \"group my research tabs by topic\", which is surprisingly useful in sprawling research sessions." },

    { h3: "Personal Search and memory" },
    { p: "**Personal Search** uses your browsing history to answer questions such as \"what was that pricing page I looked at last week?\". Comet does not keep a separate memory; it uses your Perplexity account's memory, with toggles to reference your search library and saved memories, and you can edit or delete stored items. Agent actions such as browsing and completing tasks are not saved to memory, according to the [Comet memory article](https://www.perplexity.ai/help-center/comet/en/articles/12658438-comet-memory)." },

    { h3: "Gmail and calendar connector" },
    { p: "A Gmail connector lets you ask about email and calendar items from the browser, such as \"what meetings do I have Thursday?\" or \"draft a reply proposing two times next week\". Comet always asks for approval before connecting to services like Gmail." },

    { h3: "Everyday browser features" },
    { p: "Comet includes a built-in ad blocker, a password manager, safe browsing and malware protection, safe downloads, site permissions, sync between devices and an incognito mode. Comet for Enterprise is available to Perplexity Enterprise organizations." },

    { h2: "Privacy: what stays on your device" },
    { p: "Privacy is the first question most people ask about an AI browser. Perplexity's [Assistant privacy article](https://www.perplexity.ai/help-center/comet/en/articles/12867415-comet-assistant-privacy-data-use) lays out the model:" },
    { ul: [
      "**Stays local:** your browsing history, the full list of open tabs, cookies and site data, passwords and autofill, local files, and text you type on websites unless you include it in a request.",
      "**Sent to Perplexity only when needed:** the minimal context a request requires, such as the current page for a summary or the tab you mention.",
      "**Retention:** context from those requests is stored for up to 30 days as Temporary Sessions in your Perplexity library, then deleted automatically, unless you remove the timer.",
      "**Never sold:** Perplexity says it does not sell this data. The article does not address model training, so check your Perplexity account's AI data settings.",
      "**Off-limits:** Perplexity states that Comet never has access to your passwords or payment data.",
    ] },
    { p: "You can also turn the Assistant off entirely, block it on specific sites (Perplexity's own example is your bank), and use incognito mode to stop it indexing your activity. When an advanced agent first runs, Comet asks you to allow it once, always allow it, or decline." },

    { h2: "Security: the prompt-injection question" },
    { p: "Every agentic browser shares one weakness: a web page can contain hidden instructions that try to hijack the AI. Security researchers, including Brave's team, have published prompt-injection demonstrations against AI browsers, Comet among them, and Brave wrote again in June 2026 that indirect prompt injection \"remains a fundamental security challenge\" for AI. Perplexity has added permissions, approval prompts and blocked-site controls since launch, but no vendor claims the problem is solved." },
    { p: "Our practical rules for Comet, and for any AI browser:" },
    { ol: [
      "**Keep sensitive sites blocked.** Add your bank, brokerage, health portal and work admin consoles to the Assistant's blocked list.",
      "**Choose \"allow once\" for agents** until you trust how they behave on a site.",
      "**Never let an agent finish a payment** or send a message you have not read.",
      "**Use a separate profile** for agent experiments, with fewer saved logins.",
    ] },

    { h2: "Comet pricing (as of October 2026)" },
    { p: "Comet itself is free, and you do not need a Perplexity account to start browsing and try basic AI features. Signing in saves your chats and history, syncs across devices and unlocks more powerful AI features and higher limits. Paid Perplexity plans add advanced models for the Comet Assistant, according to the [Perplexity pricing page](https://www.perplexity.ai/hub/pricing)." },
    { table: {
      head: ["Plan", "Price", "What it adds in Comet"],
      rows: [
        ["**No account**", "$0", "Browsing, Perplexity search and basic AI features"],
        ["**Perplexity Free**", "$0", "Saved chats and history, sync across devices, higher limits than signed-out use"],
        ["**Perplexity Pro**", "$20/mo, or $17/mo billed annually", "Advanced models for Comet Assistant, higher Assistant limits, plus Pro Search, Research and file uploads in Perplexity"],
        ["**Perplexity Max**", "$200/mo, or $167/mo billed annually", "Top limits and frontier models, 10,000 Perplexity Computer credits a month"],
        ["**Enterprise**", "Contact sales", "Comet for Enterprise with organization controls"],
      ],
    } },
    { p: "Perplexity does not publish exact Comet Assistant quotas per plan, and it has also offered **Comet Plus**, a news subscription that shares revenue with publishers, as a separate add-on that some Perplexity plans include. Check the Comet and pricing pages for the current details before you subscribe. For a full breakdown of what Pro and Max include, see our [Perplexity review](/blog/perplexity-review)." },
    { h3: "Do you need Perplexity Pro for Comet?" },
    { p: "No. Most people should start free, use Comet for a couple of weeks and upgrade only if they hit Assistant limits or want stronger models. If you already pay for Perplexity Pro, Comet is an easy addition that gives you more value from the same subscription." },

    { h2: "Pros and cons" },
    { h3: "Pros" },
    { ul: [
      "**Free,** with no account needed to start.",
      "**Familiar:** Chromium, Chrome extensions and one-click import.",
      "**Excellent page and tab understanding,** with cited answers from Perplexity.",
      "**Background, parallel Assistant requests** while you keep browsing.",
      "**Clear, local-by-default privacy model** with per-site blocking.",
      "**Built-in ad blocker** and natural-language tab management.",
    ] },
    { h3: "Cons" },
    { ul: [
      "**Agentic tasks are hit or miss** on complex, logged-in or multi-site flows.",
      "**Prompt injection** remains an unsolved risk for any agentic browser.",
      "**Opaque limits:** no published Assistant quotas per plan.",
      "**Perplexity as default search** will not suit everyone, though you can change it.",
      "**Mobile is less complete** than desktop, and Android tasks only run with the app open.",
    ] },

    { h2: "Comet vs other AI browsers" },
    { table: {
      head: ["Browser or agent", "Best for", "Price (as of October 2026)", "Platforms"],
      rows: [
        ["[Comet](/tools/comet-browser)", "Free AI research browsing", "Free; Perplexity Pro $20/mo", "Mac, Windows, Android, iOS listed"],
        ["[Dia](/tools/dia-browser)", "Knowledge work across tabs and work apps", "Free browser; AI plans from $10/mo", "Mac, Windows"],
        ["ChatGPT Atlas", "ChatGPT users who want an AI browser", "Free download; agent mode on paid ChatGPT plans", "Check OpenAI's site"],
        ["[Claude in Chrome](/tools/claude-in-chrome)", "Agent tasks in your existing Chrome", "Paid Claude plans, from $17/mo annual", "Chrome extension"],
        ["[Brave Leo](/tools/brave-leo)", "Privacy-first AI in the browser", "Free; Leo Premium paid", "Desktop, Android, iOS"],
      ],
    } },
    { h3: "Comet vs Dia" },
    { p: "[Dia](/tools/dia-browser), from the team behind Arc, is more polished for office work: a Morning Brief, connections to Slack, Notion, Gmail and Outlook, and profiles for work and personal browsing. But for most new Mac users its AI now sits behind paid plans, starting at $10 a month. Comet's AI is free, and its research answers come with sources." },
    { h3: "Comet vs ChatGPT Atlas" },
    { p: "OpenAI's ChatGPT Atlas puts [ChatGPT](/tools/chatgpt) in a browser, with browser memories and an agent mode for paid ChatGPT plans. If ChatGPT is your main assistant, Atlas is the natural pick; if Perplexity is, choose Comet. Our [Perplexity vs ChatGPT](/blog/perplexity-vs-chatgpt) comparison helps decide which assistant fits you." },
    { h3: "Comet vs Claude in Chrome" },
    { p: "[Claude in Chrome](/tools/claude-in-chrome) is an extension rather than a browser, so you keep Chrome and add a capable agent that works across tab groups, in the background and with per-site permissions. It is generally stronger on multi-step tasks, but it needs a paid Claude plan. Comet is better for free research browsing. Our full [best AI browsers](/blog/best-ai-browsers) guide covers ten options, and our [best AI agents](/blog/best-ai-agents) guide covers agents beyond the browser." },

    { h2: "Best use cases for Comet" },
    { ul: [
      "**Research and reading:** \"Summarize this paper and list the claims that need a source.\"",
      "**Comparisons:** \"Compare the three laptops in my open tabs on price, weight and battery in a table.\"",
      "**News:** \"How are these four outlets covering this story differently?\"",
      "**Studying:** \"Turn this syllabus into a 10-week study plan with weekly goals.\"",
      "**Inbox help:** \"What do I need to reply to today, and draft the two most urgent replies.\"",
      "**Light shopping:** price comparisons and promo codes, with you completing the payment.",
    ] },
    { p: "New to Perplexity's features? Our guide on [how to use Perplexity AI](/blog/how-to-use-perplexity-ai) explains Search, Research, Projects and model choice." },

    { h2: "FAQ" },
    { h3: "Is Comet browser free?" },
    { p: "Yes. Comet is free to download and use, and you do not even need a Perplexity account to start browsing and try basic AI features. Signing in with a free account saves history and syncs devices. Paid Perplexity plans (Pro at $20 a month, Max at $200) add stronger models and higher Comet Assistant limits." },
    { h3: "Is Comet browser safe?" },
    { p: "Comet keeps history, passwords, cookies and payment data on your device and sends only the context a request needs. The bigger risk is prompt injection when the Assistant acts on websites. Block sensitive sites, approve agents one task at a time, and never let it complete payments or send messages without checking first." },
    { h3: "Is Comet better than Chrome?" },
    { p: "For research-heavy browsing, Comet is more useful because AI help is built into every page and it still runs Chrome extensions. For pure speed, stability and Google account integration, Chrome remains the safer default, and Chrome now has Gemini built in too. Many people keep Chrome for work accounts and use Comet for research." },
    { h3: "Does Comet work on iPhone and Android?" },
    { p: "Comet for Android is on the Play Store for Android 12 or later, with task automation, voice search, summaries and tab commands. Perplexity's Comet page lists iOS as well, but some help articles are older, so check the App Store in your region. Desktop versions run on Mac and Windows." },
    { h3: "Who makes Comet browser?" },
    { p: "Comet is made by Perplexity, the company behind the Perplexity AI answer engine. It launched in July 2025 for Perplexity Max subscribers and became free for everyone in October 2025. It is built on Chromium, the open-source project that also powers Chrome, Edge, Brave and Dia." },
    { h3: "Can Comet do tasks for me?" },
    { p: "Yes, Comet's Assistant can navigate sites, click, fill forms, compare prices and find promo codes, and it can work in the background while you browse. It is reliable on short, clear tasks and less so on long, logged-in or multi-site workflows. Review each step before it buys, books or sends anything." },

    { h2: "Final verdict" },
    { p: "Comet is the easiest recommendation in AI browsing right now: it is free, it feels like Chrome, and the Assistant genuinely saves time when you read, compare and research across tabs. Its privacy model is clearer than most, with local-by-default data and per-site blocking. Agentic tasks are the weak spot, as they are for every AI browser in 2026, and prompt injection means you should keep it away from banking and payments. Download it, import your Chrome profile, use it for research for two weeks, and only pay for Perplexity Pro if you hit the limits." },

    { hr: true },
    { p: "Browse more AI browsers, extensions and assistants in the [AI productivity category](/categories/productivity) and the [AI research category](/categories/research). Building an AI browser or extension we have missed? [Submit it for a listing](/submit)." },
  ],
};

export default post;
