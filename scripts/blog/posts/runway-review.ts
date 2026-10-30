import type { Post } from "../types";

const post: Post = {
  slug: "runway-review",
  title: "Runway Review (2026): Gen-4.5, Aleph 2.0, Agent and Real Costs",
  excerpt:
    "Runway is no longer just a video generator. In 2026 it became a full production workspace with Gen-4.5, Aleph 2.0 editing, an AI agent, third-party models like Kling 4.0, and plugins for Premiere and Resolve. Here is what each plan really buys, what users complain about, and who should pick something else.",
  seoTitle: "Runway Review (2026): Features, Pricing, Pros and Cons",
  seoDescription:
    "Our Runway review for 2026: Gen-4.5, Aleph 2.0, Runway Agent, credit costs per second, every plan compared, real complaints, and the best alternatives.",
  metaKeywords:
    "runway review, runway ai review, runway ml review, runway gen-4.5, runway aleph 2.0, runway agent, runway pricing, is runway worth it, runway ai video, runway alternatives, runway credits, runway vs kling",
  categories: ["reviews", "deep-dives"],
  body: [
    { p: "**Verdict:** this Runway review comes down to one line: [Runway](/tools/runway) is the best AI video tool for people who *edit* for a living, and an expensive one for people who only want to generate clips. Agencies, editors and in-house video teams get the most complete workspace on the market: Gen-4.5 generation, Aleph 2.0 video editing, an AI agent with a timeline, third-party models such as Kling 4.0 and Seedance, team credit pools, and plugins for Premiere Pro, After Effects and DaVinci Resolve. Hobbyists and high-volume social creators should skip it, because credits run out fast and [Kling](/tools/kling-ai) gives you more seconds of video, with sound, for less money." },
    { p: "Runway changed more in 2026 than in any year since it launched Gen-1. It went from a model company with a web app to a platform that hosts other companies' models, builds apps and ads, and plugs into professional editing software. This review is based on Runway's official pricing page, changelog and help center, plus public user feedback, as of late October 2026. We did not run our own benchmark tests. If you are still choosing a category of tool, start with our guide to the [best AI video generators](/blog/best-ai-video-generators)." },

    { logos: ["runway"] },

    { h2: "Runway at a glance" },
    { ul: [
      "**What it is:** a browser-based AI video platform with in-house models (Gen-4.5, Gen-4 Turbo, Aleph 2.0), third-party models, an AI agent, an editor and an API.",
      "**Best for:** editors, agencies, brand teams and filmmakers who generate *and* edit footage, and teams that want several model families in one account.",
      "**Skip it if:** you want the cheapest cost per second, long single takes, or native dialogue from the in-house model.",
      "**Pricing:** free plan with 125 one-time credits; paid plans from $15 a month (or $12 a month billed yearly). Team plan from $69 per seat.",
      "**Standout 2026 features:** Aleph 2.0 and Edit Studio, Runway Agent 2.0 with a timeline, Team plan, Adobe and DaVinci Resolve plugins, App Studio and Runway Ads.",
      "**Biggest complaints:** credit burn, credits lost on failed or rejected generations, and refund disputes.",
    ] },

    { h2: "What changed at Runway in 2026" },
    { p: "If you last looked at Runway in 2025, the product you remember is mostly gone. Here are the releases that matter, taken from the official [Runway changelog](https://runway.com/changelog):" },
    { ul: [
      "**January:** Gen-4.5 gained image-to-video, so you can lock the first frame with your own image.",
      "**February:** third-party models arrived, starting with Kling 3.0, Sora 2 Pro and others. Later in the year Runway added Seedance 2.0 and 2.5, Wan 3.0, Gemini Omni Flash, Nano Banana 2 and Kling 4.0.",
      "**March:** Runway Characters, real-time interactive avatars available through the API.",
      "**May:** Runway Agent, a conversational creative partner, and Aleph 2.0 with the new Edit Studio.",
      "**June:** Studio (trim, stitch and export in one place) and Agent 2.0 for campaigns and multi-shot projects.",
      "**July and August:** timeline inside Agent, agent workflows, custom agent skills, compositing nodes, ProRes 4444 and PNG sequence export, and Runway Ruby, an HDR color grading model.",
      "**September:** the self-serve Team plan, Adobe Premiere Pro and After Effects plugins, and a DaVinci Resolve plugin.",
      "**October:** App Studio (build hosted creative apps from a description) and Runway Ads, which finds winning ad patterns on Meta, Google and TikTok and generates variants.",
    ] },
    { p: "The direction is clear: Runway wants to be the place where a video project lives from first idea to final export, not just the place you render a shot." },

    { h2: "Key features, tested against the docs" },
    { shot: "runway", caption: "Runway's 2026 workspace combines its own Gen-4.5 and Aleph 2.0 models with third-party models and an AI agent." },

    { h3: "Gen-4.5: the flagship generator" },
    { p: "Gen-4.5, released in December 2025, is Runway's best in-house text-to-video and image-to-video model. Public feedback praises its prompt adherence, controlled camera moves and cinematic look. Clips are short (developer listings show about 2 to 10 seconds per generation), and the model outputs **silent video**, so sound has to come from Runway's audio tools or a third-party model. Runway itself lists known weaknesses: causal reasoning, object permanence, and a tendency to show actions succeeding when they should fail. In plain terms, a glass that falls may not break, and an object that leaves the frame may not come back the same." },
    { p: "Gen-4.5 costs **12 credits per second**. Gen-4 Turbo, the faster and cheaper image-to-video option, costs roughly half that, which is why Standard plan credits stretch to about 52 seconds of Gen-4.5 or about 104 seconds of Gen-4 Turbo." },

    { h3: "Aleph 2.0 and Edit Studio: editing real footage" },
    { p: "Aleph 2.0 is the feature that sets Runway apart. It is a video-to-video model: you edit one frame, such as removing a sign, swapping a product, changing the weather or relighting a face, and Aleph carries that change through the rest of the clip while keeping the background and motion intact. It works on your own camera footage, not only on AI clips, and you can guide it with a reference image. The cost is steep at **28 credits per second** (140 credits for 5 seconds), so it is best used for targeted fixes, not for restyling every shot." },

    { h3: "Runway Agent: a producer in a chat window" },
    { p: "Runway Agent, launched in May and upgraded to Agent 2.0 in June, plans a video with you in conversation: it proposes ideas, writes scenes, picks models, generates shots, adds sound and assembles them on a timeline. Since July it can build reusable multi-step workflows and custom skills that a team can share, read PDFs up to 10MB, and use your Brand Kits as references. Independent long-term testing of Agent is still thin, so treat it as a fast way to rough out a sequence rather than a replacement for an editor." },

    { h3: "Third-party models in one account" },
    { p: "Runway now hosts models from other labs: Kling 4.0, Seedance 2.0 and 2.5, Wan 3.0, Gemini Omni Flash, Nano Banana Pro and more, plus audio models such as ElevenLabs and Lyria. This fills Runway's biggest gap, native audio, because several of those models generate sound with the picture. The trade-off is price: Kling 4.0 at 1080p costs 118 credits per 5 seconds inside Runway (89 with a 25% launch discount that runs to November 30), which is more than using Kling's own app. Our [Runway vs Kling vs Luma comparison](/blog/runway-vs-kling-vs-luma) breaks down the cost per second in each app." },

    { h3: "Pro export, HDR and color" },
    { p: "On the Max plan, Runway outputs HDR video, ProRes and image sequences, and Max subscribers get Runway Ruby, a color grading model that can grade imported footage. Enhance Frame Rate converts clips to other frame rates up to 4K and 5 minutes. These are the features that let generated shots sit next to camera footage in a real grade, and they are a big reason post-production teams pay for Max." },

    { h3: "Plugins, MCP and the API" },
    { p: "Runway's panels for Premiere Pro, After Effects and DaVinci Resolve let you generate, restyle with Aleph and drop results straight into a timeline or composition. The Runway MCP server lets other AI tools drive Runway, and it is listed on Cursor's marketplace. Developers get a separate API with model routing, cost caps and per-task credit reporting. If you work inside an NLE all day, the plugins alone can justify the subscription." },

    { h3: "Audio, voice and the rest of the toolbox" },
    { p: "Every paid plan includes music, voice and sound effects generation, text-to-speech at 1 credit per 50 characters, and 4K upscaling. Pro adds a custom voice clone and a Brand Kit. Runway also keeps its older tools for background removal, segmentation and performance capture (Act-One and Act-Two), which let you drive a character with a simple video of an actor." },

    { h2: "Runway pricing (as of October 2026)" },
    { p: "Runway sells monthly credits. Figures below come from the official [Runway pricing page](https://runway.com/pricing) and the [Team plan announcement](https://runway.com/news/company-news/introducing-team-plan). Yearly billing saves 20%." },
    { table: {
      head: ["Plan", "Monthly", "Billed yearly (per month)", "Credits", "What you really get"],
      rows: [
        ["**Free**", "$0", "n/a", "125 one-time", "A taste of selected models, 5GB storage. Enough for a few seconds of Gen-4.5."],
        ["**Standard**", "$15", "$12", "625 per month", "All models, no watermark, Agent, 4K upscaling, 3 projects, 20GB. About 52 sec of Gen-4.5."],
        ["**Pro**", "$35", "$28", "2,250 per month", "1 Brand Kit, 1 voice clone, MCP, top-ups, 5 projects, 100GB. About 187 sec of Gen-4.5."],
        ["**Max**", "$95", "$76", "9,500 per month", "HDR, ProRes, image sequences, early model access, 1-month rollover, 500GB. About 791 sec of Gen-4.5."],
        ["**Team**", "$69 per seat", "$55 per seat", "6,900 per seat, pooled", "2 to 9 seats, shared projects, comments, 1TB, 1-month rollover."],
        ["**Enterprise**", "Custom", "Custom", "Custom", "SSO, project credit caps, admin controls, more than 9 seats."],
      ],
    } },
    { h3: "What a second of video really costs" },
    { ul: [
      "**Gen-4.5:** 12 credits per second, roughly $0.29 per second on Standard at the monthly price, or about $0.12 per second on Max.",
      "**Aleph 2.0:** 28 credits per second, roughly $0.67 per second on Standard.",
      "**Kling 4.0 at 1080p:** 118 credits per 5 seconds (about 24 per second) at list price.",
      "**Seedance 2.0 Pro at 1080p:** 160 credits per 4 seconds (40 per second).",
      "**Extra credits:** sold from the dashboard with a 1,000-credit minimum, and purchased credits do not expire. Monthly plan credits do not roll over except on Max and Team.",
    ] },
    { p: "Those numbers assume every generation is a keeper. In practice you will reroll shots several times, so budget two to four times the finished length. That is why many reviewers say Pro, not Standard, is the realistic starting plan for regular work." },

    { h2: "Pros and cons" },
    { h3: "Pros" },
    { ul: [
      "**The most complete production workspace** of any AI video tool: generation, editing, agent, timeline, compositing and export.",
      "**Aleph 2.0** edits real footage frame-accurately instead of forcing you to regenerate.",
      "**Many models, one bill:** Kling, Seedance, Wan, Gemini Omni and Runway's own models in one account.",
      "**Pro finishing:** HDR, ProRes, image sequences and color grading on Max.",
      "**Fits existing workflows** through Premiere, After Effects and Resolve plugins, MCP and an API.",
      "**Real team features:** pooled credits, shared projects, comments and Brand Kits.",
    ] },
    { h3: "Cons" },
    { ul: [
      "**Expensive per second**, especially for Aleph and third-party models.",
      "**No native audio from Gen-4.5**, so dialogue needs another model or tool.",
      "**Short clips** from the in-house model compared with Kling 4.0 or Seedance 2.5 (up to 30 seconds).",
      "**Feature sprawl:** Agent, Studio, Tool Mode, Workflows and apps can overwhelm beginners.",
      "**Strict refund stance** on used credits, according to many user reports.",
    ] },

    { h2: "Common complaints from public user feedback" },
    { p: "Runway's reviews on Trustpilot are poor: the runwayml.com page showed a TrustScore of about 1.1 out of 5 from roughly 380 reviews when we checked in October 2026. Trustpilot notes the company does not invite reviews, so the sample skews toward unhappy users, but the complaints are consistent:" },
    { ul: [
      "**Credits drain faster than expected.** One reviewer reported a single 15-second clip costing 543 of a Standard month's 625 credits.",
      "**Failed or blocked generations still cost credits**, according to several users, and refunds are refused once any credits are used.",
      "**Support is mostly automated**, with slow or no escalation to a human.",
      "**Content moderation false positives** on harmless prompts.",
      "**App store billing loops**, where users who paid through Google Play were sent back and forth for refunds.",
    ] },
    { p: "Our advice: start on Standard monthly, generate drafts with cheaper models (Gen-4 Turbo or Seedance draft modes) before committing to Gen-4.5 or Aleph, and buy top-ups rather than upgrading if you only spike occasionally." },

    { h2: "Runway vs the alternatives" },
    { logos: ["kling-ai", "luma-dream-machine", "gemini-omni", "higgsfield", "ltx-studio"] },
    { h3: "Runway vs Kling" },
    { p: "[Kling](/tools/kling-ai) wins on value, length and sound: Kling 4.0 makes 3 to 30 second clips with stereo audio and lip sync, and its own plans cost less per second. Runway wins on editing, team workflow and finishing, and it can run Kling models inside its own app. See our [Kling AI review](/blog/kling-ai-review) for the full picture." },
    { h3: "Runway vs Luma" },
    { p: "[Luma Agents](/tools/luma-dream-machine), formerly Dream Machine, is the other pro-leaning platform. Its Ray3.2 model outputs native 16-bit HDR with EXR export, and Modify Video restyles real performances while keeping expressions. Choose Luma for VFX and grading pipelines, Runway for broader editing tools and NLE plugins." },
    { h3: "Runway vs Gemini Omni and Veo" },
    { p: "[Gemini Omni](/tools/gemini-omni) from Google DeepMind generates video with audio and strong world knowledge, inside the Gemini app and Google Flow. It is a strong pick if you already pay for Google AI plans. Runway hosts Gemini Omni Flash too, so the choice is mostly about which workspace you prefer." },
    { h3: "Runway vs Higgsfield and LTX Studio" },
    { p: "[Higgsfield](/tools/higgsfield) bundles many third-party models with one-click cinematic camera presets, aimed at social creators. [LTX Studio](/tools/ltx-studio) is storyboard-first, built for stringing scenes into a short film. Both are friendlier for beginners, but neither matches Runway's editing depth." },
    { table: {
      head: ["Tool", "Best for", "Native audio", "Longest clip", "Entry paid plan"],
      rows: [
        ["[Runway](/tools/runway)", "Editing, teams, finishing", "Via third-party models", "About 10 sec (Gen-4.5)", "$15/mo"],
        ["[Kling](/tools/kling-ai)", "Value, long takes, dialogue", "Yes", "30 sec (Kling 4.0)", "Under $10/mo (check promos)"],
        ["[Luma Agents](/tools/luma-dream-machine)", "HDR, VFX, restyling footage", "Via third-party models", "10 sec (20 when modifying)", "$30/mo"],
        ["[Gemini Omni](/tools/gemini-omni)", "Google users, audio and realism", "Yes", "Check Google's plan page", "Google AI plans"],
      ],
    } },

    { h2: "Who should use Runway" },
    { ul: [
      "**Editors and post houses:** Aleph 2.0, the Resolve and Premiere plugins, HDR and ProRes make Runway a real post tool.",
      "**Agencies and brand teams:** the Team plan, Brand Kits, comments and Runway Ads suit client work with many stakeholders.",
      "**Filmmakers prototyping scenes:** Gen-4.5 plus Agent and the timeline are a fast way to previsualize.",
      "**Developers:** the API, model routing and MCP are mature compared with most rivals.",
    ] },
    { h3: "Who should skip it" },
    { ul: [
      "**Volume social creators** who need many clips with sound every week: Kling or a model aggregator is cheaper.",
      "**Talking-head and training videos:** an avatar tool such as [HeyGen](/tools/heygen) or [Synthesia](/tools/synthesia) is purpose-built. See our [HeyGen vs Synthesia comparison](/blog/heygen-vs-synthesia).",
      "**Simple cutting and captions:** a regular editor is enough. Our [best AI video editors guide](/blog/best-ai-video-editors) covers options.",
    ] },
    { p: "Ready to try it? Our step-by-step guide on [how to use Runway](/blog/how-to-use-runway) walks through prompts, Aleph edits and exporting." },

    { h2: "FAQ" },
    { h3: "Is Runway AI worth it in 2026?" },
    { p: "Yes, if you edit or produce video professionally. Runway combines Gen-4.5, Aleph 2.0 editing, an AI agent, third-party models and NLE plugins in one workspace. If you only need short generated clips with sound, Kling's own plans are cheaper per second and make longer takes, so Runway is harder to justify for pure generation." },
    { h3: "Is Runway free?" },
    { p: "Runway has a free plan with 125 one-time credits and 5GB of storage, which covers about 10 seconds of Gen-4.5 video. The credits do not refresh. Paid plans start at $15 a month, or $12 a month billed yearly, and remove the watermark." },
    { h3: "How many videos can you make with Runway Standard?" },
    { p: "Standard includes 625 credits a month. At 12 credits per second, that is about 52 seconds of Gen-4.5, or roughly ten 5-second clips. With Gen-4 Turbo you get about 104 seconds. Rerolls eat into that, so most regular users end up on Pro or buy top-ups." },
    { h3: "Does Runway generate sound?" },
    { p: "Gen-4.5 outputs silent video. Runway's paid plans include music, voice and sound effects generation, and several third-party models inside Runway, such as Seedance 2.5, Wan 3.0 and Kling 4.0, generate audio with the picture. You choose the model per shot." },
    { h3: "Can I use Runway videos commercially?" },
    { p: "Runway says content you create is yours to use, and paid plans export without a watermark, so paid output is suitable for client and commercial work. Free plan exports are limited and should be treated as tests. Prompts that copy real people, brands or characters remain your legal responsibility." },
    { h3: "Is Runway better than Kling?" },
    { p: "For editing, team workflows and pro export, yes. For raw generation value, no: Kling 4.0 makes clips up to 30 seconds with stereo audio and costs less per second on its own plans. Many professionals keep Runway as the workspace and run Kling models inside it." },
    { h3: "What is the Runway Team plan?" },
    { p: "Launched in September 2026, Team costs $69 per seat per month, or $55 billed yearly, for 2 to 9 seats. Each seat adds 6,900 credits to a shared pool, unused credits roll over for one month, and the workspace includes 1TB of storage, shared projects and comments." },

    { h2: "Final verdict" },
    { p: "Runway is the most ambitious AI video platform of 2026 and the best choice when generation is one step in a real production. Aleph 2.0, the agent, the plugins and Max-tier HDR and ProRes are features rivals mostly lack. It is not the best value: credits disappear quickly, its own model is silent and short, and user complaints about refunds are real. Start on Standard for a month, learn which models you actually use, and move to Pro, Max or Team only when your work proves it." },

    { hr: true },
    { p: "Compare Runway with every other AI video generator and editor we track in the [AI video category](/categories/video). Building a video tool we have missed? [Submit it for a listing](/submit)." },
  ],
};

export default post;
