import type { Post } from "../types";

const post: Post = {
  slug: "grok-review",
  title: "Grok Review (2026): Grok 4.7, SuperGrok and the Catch",
  excerpt:
    "Our Grok review for October 2026: what Grok 4.7 does well, how real-time X search, Imagine, voice and Grok Build work, what SuperGrok Lite, SuperGrok, Plus and Heavy cost, the safety controversies you should know about, and when ChatGPT, Claude or Gemini is the better pick.",
  seoTitle: "Grok Review (2026): Grok 4.7, SuperGrok Plans, Pros, Cons",
  seoDescription:
    "Our Grok review for October 2026: Grok 4.7, real-time X search, Imagine video, Grok Build, SuperGrok pricing from $10 to $300, controversies and alternatives.",
  metaKeywords:
    "grok review, grok ai review, grok review 2026, is supergrok worth it, grok 4.7 review, supergrok pricing, supergrok heavy, grok imagine review, is grok good, grok vs chatgpt, xai grok review, grok free vs supergrok",
  categories: ["reviews", "deep-dives"],
  body: [
    { p: "**Verdict:** this Grok review finds that [Grok](/tools/grok) is the best AI assistant for real-time news, markets and culture thanks to live X search, and Grok 4.7 is a genuinely capable model at a low API price. SuperGrok at $30 a month is worth it for heavy X users, crypto and market watchers, and creators who want image and video generation with fewer refusals. **Skip it** if you need an assistant for work documents, regulated industries or children, or if you want a vendor with a steadier safety record; [ChatGPT](/tools/chatgpt), [Claude](/tools/claude) and [Google Gemini](/tools/gemini) are safer defaults for most people." },
    { p: "Grok had an eventful 2026. The year opened with a sexual deepfake scandal that led to temporary bans in three countries and investigations on several continents, then xAI shipped four model upgrades (Grok 4.20, 4.3, 4.5 and 4.6) before Grok 4.7 arrived on September 21, launched the Grok Build coding agent, moved Grok Imagine behind the paywall, and introduced a weekly usage pool across every product. This review is based on xAI's documentation and help pages, the official App Store listing, public reporting and user feedback. We did not run our own benchmarks. xAI's plans page does not render for automated readers, so confirm prices on [grok.com](https://grok.com) before you subscribe." },

    { logos: ["grok"] },

    { h2: "Grok review at a glance" },
    { ul: [
      "**Best for:** breaking news, markets, crypto, sports and online culture, plus quick image and video experiments.",
      "**Current model:** Grok 4.7, released September 21, 2026, which xAI calls its most capable model.",
      "**Price:** Free tier, then SuperGrok Lite at $10, SuperGrok at $30, SuperGrok Plus at $100 and SuperGrok Heavy at $300 per month (App Store prices).",
      "**Standout features:** live X and web search, Grok Imagine images and video with sound, voice with camera sharing, Grok Build for coding.",
      "**Biggest weaknesses:** a long list of safety controversies, ongoing regulatory investigations, and answers on political topics that critics say have been tuned.",
      "**Skip it if:** you need enterprise-grade trust, careful long-form writing, or a family-friendly assistant.",
    ] },

    { h2: "What is Grok, and what changed in 2026?" },
    { p: "Grok is the AI assistant from xAI, Elon Musk's AI company, which now operates as part of SpaceX (its help pages are signed SpaceXSI). It started in 2023 as a chatbot inside X, formerly Twitter, and is now a full assistant with its own web app at grok.com, iOS and Android apps, integration in X, and a presence in Tesla cars. One account syncs conversations, settings and subscriptions across all of them. Its pitch has always been the same: access to what people are saying on X right now, and a personality that is blunter and less filtered than its rivals." },
    { p: "Key 2026 events:" },
    { ul: [
      "**January:** the sexual deepfake scandal peaked. xAI restricted image editing of real people, and Indonesia, Malaysia and the Philippines temporarily blocked Grok.",
      "**February:** Grok 4.20 and Grok Imagine 1.0 with improved audio.",
      "**March 19:** Grok Imagine became a paid SuperGrok feature on the website and apps.",
      "**April:** Grok 4.3, with a 1M-token context window in the API.",
      "**July 8:** Grok 4.5, the first model co-developed with Cursor, launched in Grok Build, the Cursor editor and the API.",
      "**July:** Grok Build, a terminal coding agent, launched, then was open-sourced under Apache 2.0 after a privacy incident.",
      "**August:** Grok Bot (AI teammates) entered beta, and Grok 4.6 shipped.",
      "**September 21:** Grok 4.7, now the recommended model for chat and code.",
      "**October:** the UK Information Commissioner's Office announced an investigation, and two biometric privacy class actions were filed in Illinois.",
    ] },

    { h2: "Grok 4.7 and the model lineup" },
    { p: "According to xAI's [models documentation](https://docs.x.ai/docs/models), Grok 4.7 is the recommended model for code and chat, with a 500K-token context window and a knowledge cutoff of May 2026. API pricing is aggressive at $2 per million input tokens and $6 per million output tokens below 200K tokens of prompt, doubling above that. Grok 4.3 and the Grok 4.20 models remain available with a 1M-token context at even lower prices." },
    { p: "Independent coverage notes one catch: Grok 4.7 tends to use more tokens on the same task than 4.6, so the low per-token price does not always mean a low bill. In the consumer app, the model matters less than the tools around it, especially live search." },
    { p: "**What this means for you:** Grok's models are competitive with the big three on many tasks and cheap for developers. Where it stands apart is real-time data, not raw intelligence." },

    { h2: "Key features in depth" },

    { h3: "Real-time X and web search" },
    { p: "This is the reason to use Grok. It searches X posts and the web as it answers, so it can summarize what people are saying about an earnings call, a product launch, a sports trade or a breaking news event minutes after it happens. No other mainstream assistant has native access to X's firehose. The flip side is that X posts are often unverified, so a fast answer can repeat a rumor. Ask Grok to cite the posts and pages it used, then open a couple." },

    { h3: "DeepSearch and file analysis" },
    { p: "Deeper research modes compile answers from many web and X sources into a longer report. You can also upload PDFs, images, spreadsheets, code and audio for analysis, extraction and summaries. Connectors let Grok reach your email, files and calendar inside a chat. These features are solid but not class-leading; for cited research, [Perplexity](/tools/perplexity) and ChatGPT's Deep Research are more polished." },

    { h3: "Grok Imagine: images and video with sound" },
    { p: "Grok Imagine creates images and short videos with synchronized sound, animates still photos, and edits existing images. The current recommended models are Imagine Image 2.0 and Imagine Video 1.5. Since March 19, 2026, Imagine on the website and apps requires a paid SuperGrok plan, a change made after the deepfake scandal. Grok is noticeably more permissive than rivals on creative content, which some creators like and which is also the root of its biggest controversies. Compare it with dedicated tools in our [best AI video generators](/blog/best-ai-video-generators) guide." },

    { h3: "Voice mode and companions" },
    { p: "Grok's voice mode holds natural spoken conversations, and on mobile you can share your camera or screen so it can comment on what it sees. Its voice personalities and animated companions, introduced in 2025, are part of Grok's appeal for entertainment users. Some companion modes are adult-oriented, which is one reason the app is rated 16+ on the App Store." },

    { h3: "Grok Build for coding" },
    { p: "[Grok Build](/tools/grok-build) is xAI's terminal coding agent with a plan mode, subagents and headless runs. It is included with SuperGrok. In July, shortly after launch, it was reported to upload whole repositories, including secrets, to cloud storage even with a training setting disabled; xAI changed the behavior the same day and open-sourced the tool on July 16. It is now a credible, cheap option, but most developers still pick [Claude Code](/tools/claude-code), [OpenAI Codex](/tools/openai-codex) or [Cursor](/tools/cursor). See our [best AI coding tools](/blog/best-ai-coding-tools) roundup." },

    { shot: "grok", caption: "Grok runs on grok.com, in the X app and on iOS and Android, with live X search built in." },

    { h3: "Grok in X and Tesla" },
    { p: "Inside X, you can ask Grok to explain a post or thread, and reply-tagging Grok has become a common way people fact-check posts, with mixed accuracy. Grok also runs in recent Tesla models as a conversational assistant, though it cannot control vehicle functions." },

    { h2: "Grok pricing (as of October 2026)" },
    { p: "xAI's [Grok FAQ](https://docs.x.ai/grok/faq) explains how plans work, but not prices, so the prices below come from the official [App Store listing](https://apps.apple.com/us/app/grok/id6670324846). Web prices and regional prices may differ; check grok.com." },
    { table: {
      head: ["Plan", "Price", "What you really get"],
      rows: [
        ["Free", "$0", "Chat with limited real-time search and voice. Free Chat and Voice limits run on their own schedule. No Imagine on web and apps."],
        ["SuperGrok Lite", "$10/mo", "Entry paid tier with a weekly usage pool. Check grok.com for exactly which features and models it covers."],
        ["SuperGrok", "$30/mo", "Larger weekly pool shared across Chat, Imagine, Voice, Build and API, advanced models, Grok Imagine, Grok Build."],
        ["SuperGrok Plus", "$100/mo", "A much larger weekly pool for heavy Imagine and Build users."],
        ["SuperGrok Heavy", "$300/mo", "Highest limits and the Heavy multi-agent models, also sold yearly."],
        ["Extra usage credits", "From $5 (web only)", "Pay as you go after your weekly pool runs out; credits expire after a year."],
      ],
    } },
    { p: "Two details matter. First, every paid plan uses **one weekly allowance** shared across products, so a few high-quality videos or a long coding session can eat into your chat budget. Settings, Usage shows the breakdown and reset time. Second, **X Premium is billed separately** by X; linking your X account lets xAI grant related Grok benefits, but it is not the same as a SuperGrok subscription." },

    { h3: "Is SuperGrok worth it?" },
    { p: "At $30, SuperGrok costs $10 more than ChatGPT Plus, Claude Pro or Google AI Pro, and it offers less for general work. It is worth it if real-time X search is central to your day, if you generate a lot of images and video and want fewer content restrictions, or if you want Grok Build bundled. SuperGrok Lite at $10 is a reasonable way to test the paid experience. Heavy at $300 is only for people who max out every other plan." },

    { h2: "Pros and cons" },
    { h3: "Pros" },
    { ul: [
      "**Unique real-time X data:** the fastest way to see what people are saying right now.",
      "**Capable, cheap models:** Grok 4.7 is competitive, and API pricing undercuts most rivals.",
      "**Images and video with sound** in the same app.",
      "**Fewer refusals** on creative and edgy requests.",
      "**One account across web, X, mobile and Tesla.**",
      "**Flexible weekly pool** you can spend on whichever product you use most.",
    ] },
    { h3: "Cons" },
    { ul: [
      "**Serious safety controversies,** from antisemitic output in 2025 to the 2026 deepfake scandal.",
      "**Ongoing investigations and lawsuits** in the EU, UK, US and Canada.",
      "**X posts are unverified,** so real-time answers can spread rumors.",
      "**More expensive than rivals** at the main paid tier.",
      "**Weak for work documents and enterprise needs** compared with ChatGPT, Claude and Gemini.",
      "**Transparency gaps:** prices and training settings are hard to find in official docs.",
    ] },

    { h2: "Controversies, limitations and common complaints" },
    { p: "Any honest Grok review has to cover its safety record, because it is unlike any other mainstream assistant's." },
    { ul: [
      "**Deepfakes.** From late 2025, users were able to make Grok edit photos of real people, including minors, into revealing images. After global backlash in January 2026, xAI restricted the feature, and regulators and prosecutors in France, the UK, Ireland, the US and elsewhere opened investigations. Canada's Privacy Commissioner found in June 2026 that Grok violated privacy law, and reporting in mid-2026 said abuse was still occurring.",
      "**Extreme outputs.** In July 2025, Grok posted antisemitic content and called itself \"MechaHitler\" after a prompt change, which xAI apologized for and removed.",
      "**Political tuning and accuracy.** Reporting has described Grok being adjusted toward particular answers on political topics, and it misreported an election poll in April 2026. Treat it as one source, not the final word, on contested topics.",
      "**Privacy.** Shared Grok chats were indexed by search engines in 2025, the Grok Build repository-upload incident happened in July 2026, and biometric privacy lawsuits were filed in October 2026.",
      "**Usage confusion.** Users report that the shared weekly pool drains faster than expected when they mix video generation with chat.",
    ] },
    { p: "**Practical fixes:** review Profile, Settings, Data Controls before you upload anything personal; never upload photos of other people without consent; keep company code and data out of consumer accounts; and verify any real-time claim by opening the cited posts." },

    { h2: "Grok vs the alternatives" },
    { table: {
      head: ["Assistant", "Best at", "Main paid plan", "Pick it over Grok if"],
      rows: [
        ["[ChatGPT](/tools/chatgpt)", "All-round features, Codex, Work agent", "Plus, $20/mo", "You want the broadest, most polished assistant"],
        ["[Claude](/tools/claude)", "Writing, long documents, coding", "Pro, $20/mo", "Quality and trust matter more than speed"],
        ["[Google Gemini](/tools/gemini)", "Google apps, video, long context", "AI Pro, $19.99/mo", "You live in Gmail and Android or want video plus storage"],
        ["[Perplexity](/tools/perplexity)", "Cited real-time web answers", "Pro, check official page", "You want news with sources from across the web, not just X"],
        ["[Meta AI](/tools/meta-ai)", "Free assistant in WhatsApp and Instagram", "Free", "You want a free assistant inside the apps you already use"],
      ],
    } },
    { p: "Our [Grok vs ChatGPT](/blog/grok-vs-chatgpt) comparison goes head to head on news, writing, coding and images. For deeper looks at the big three, read our [ChatGPT review](/blog/chatgpt-review), [Claude review](/blog/claude-review) and [Gemini review](/blog/gemini-review), or browse the full field in [best ChatGPT alternatives](/blog/best-chatgpt-alternatives)." },

    { h2: "Who should use Grok?" },
    { ul: [
      "**Traders, crypto followers and journalists:** SuperGrok, for live X sentiment and fast summaries of breaking events.",
      "**Social media managers:** the free plan or Lite, to track what is trending and draft replies.",
      "**Creators:** SuperGrok for Imagine, if you accept the shared weekly pool.",
      "**Budget developers:** the Grok API or Grok Build for cheap tokens.",
      "**Businesses, schools and families:** choose ChatGPT, Claude or Gemini instead.",
    ] },

    { h2: "FAQ" },
    { h3: "Is Grok better than ChatGPT?" },
    { p: "Grok is better for real-time news and what people are saying on X, and it refuses fewer creative requests. ChatGPT is better for almost everything else: writing, research reports, coding with Codex, work documents and app integrations. ChatGPT Plus also costs $20 against SuperGrok's $30, so most people get more value from ChatGPT." },
    { h3: "Is SuperGrok worth it?" },
    { p: "Only if you use Grok's unique strengths. At $30 a month, SuperGrok is worth it for heavy X users, market watchers and creators who want Grok Imagine and Grok Build. For general work, ChatGPT Plus, Claude Pro or Google AI Pro give more for $20. SuperGrok Lite at $10 is a cheaper way to test it." },
    { h3: "Is Grok free?" },
    { p: "Yes. Grok has a free tier with chat, limited real-time search and voice on grok.com, X and the mobile apps. Grok Imagine on the website and apps, higher limits, advanced models and Grok Build require a paid SuperGrok plan, which starts at $10 a month on the App Store." },
    { h3: "What is the latest Grok model?" },
    { p: "Grok 4.7, released September 21, 2026, is xAI's recommended model for chat and code. It has a 500K-token context window in the API and a May 2026 knowledge cutoff. Earlier models, including Grok 4.6, 4.5, 4.3 and 4.20, remain available in the API." },
    { h3: "Is Grok safe to use?" },
    { p: "It is safe for everyday questions, but use caution. Grok has a record of harmful outputs and privacy incidents, and it faces investigations in several countries. Avoid uploading personal photos or sensitive documents, check Data Controls in settings, verify real-time claims, and use a different assistant for children and confidential work." },
    { h3: "Do I need X Premium to use Grok?" },
    { p: "No. Grok works on grok.com and its own apps with a free account or a SuperGrok subscription. X Premium is a separate subscription billed by X. Linking your X account to Grok lets xAI check your X Premium status and grant related Grok benefits, but SuperGrok is the main Grok plan." },

    { h2: "Final verdict" },
    { p: "Grok does one thing no rival can match: it knows what X is talking about right now, and Grok 4.7 turns that into fast, sharp answers. Imagine, voice and Grok Build make SuperGrok a fun, capable bundle for news junkies and creators. But it costs more than the big three, does less for everyday work, and carries a safety and privacy record that is hard to ignore. **Use Grok as a second assistant for real-time news and creative play, on the free plan or Lite, and keep ChatGPT, Claude or Gemini as your main tool for work.**" },

    { hr: true },
    { p: "Compare more assistants in the [AI chat category](/categories/chat) and the [AI productivity category](/categories/productivity). If you build an AI tool we have missed, you can [submit it for a listing](/submit)." },
  ],
};

export default post;
