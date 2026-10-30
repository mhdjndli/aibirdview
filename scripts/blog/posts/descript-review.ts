import type { Post } from "../types";

const post: Post = {
  slug: "descript-review",
  title: "Descript Review (2026): Text-Based Editing, Underlord and the Real Cost",
  excerpt:
    "Descript lets you edit video and podcasts by editing a transcript, with Underlord as an AI co-editor on top. This Descript review covers what changed in 2026, what each plan really includes, the media hour and AI credit limits people complain about, and when CapCut, Riverside or Premiere Pro is the better pick.",
  seoTitle: "Descript Review (2026): Pricing, Underlord, Pros and Cons",
  seoDescription:
    "Our Descript review for 2026: text-based editing, Underlord AI, Studio Sound, what each plan includes, credit limits, complaints and the best alternatives.",
  metaKeywords:
    "descript review, descript, descript pricing, is descript worth it, descript underlord, descript ai, descript studio sound, descript alternatives, descript vs capcut, descript free plan, descript media hours, descript ai credits, text based video editing",
  categories: ["reviews", "deep-dives"],
  body: [
    { p: "**Our Descript review verdict: [Descript](/tools/descript) is still the best editor for podcasters, YouTubers and course creators who work with talking-head video, because editing a transcript is faster than scrubbing a timeline and the Underlord AI co-editor now handles most of the cleanup for you.** Skip it if you mainly make short, music-driven clips (CapCut is cheaper and better at that), if you need frame-precise color and effects work (Premiere Pro or DaVinci Resolve), or if you hate metered usage, because Descript's plans now cap both media hours and AI credits." },
    { p: "Descript has changed more in the last year than in the previous three. It moved to a two-meter pricing model in late 2025, turned Underlord into an agent you can pick models for, and opened an API with MCP support in 2026. This review explains what the product does today, what each plan really gets you, and where users push back. It is based on Descript's official pricing page and help center, its public changelog coverage and public user feedback as of October 2026, not hands-on lab testing. For the full feature list, see the [Descript listing](/tools/descript)." },

    { logos: ["descript"] },

    { h2: "Descript at a glance" },
    { ul: [
      "**What it is:** a video and audio editor where the transcript is the timeline. Delete a sentence in the text and it disappears from the video.",
      "**Best for:** podcasts, interviews, YouTube talking-head videos, tutorials, screen recordings, webinars and course content.",
      "**AI layer:** Underlord, an AI co-editor you instruct in plain language, plus Studio Sound, filler word removal, AI voices and voice clones, Eye Contact, translation and dubbing.",
      "**Pricing:** free plan, then Hobbyist $16/mo, Creator $24/mo and Business $50/mo on annual billing ($24, $35 and $65 billed monthly).",
      "**Platforms:** desktop apps for Mac and Windows plus a browser version.",
      "**Not for:** heavy VFX, motion graphics, music videos, or anyone who wants unlimited AI use for a flat fee.",
    ] },

    { h2: "Quick verdict: who should use Descript" },
    { ul: [
      "**Buy it if** you edit spoken content every week and would rather cut text than waveforms.",
      "**Buy Creator if** you publish video in 4K, want full Underlord access or share the account with up to 3 people.",
      "**Stay on Hobbyist if** you publish one or two podcast episodes a week at 1080p and use AI features lightly.",
      "**Skip it if** your work is short-form trends, beat-synced edits or heavy effects, or if your budget cannot absorb credit top-ups.",
    ] },

    { h2: "What Descript is and what changed in 2026" },
    { p: "Descript started in 2017 as a transcription-first audio editor and grew into a full video editor. You import or record media, Descript transcribes it, and you edit the words. Cuts, rearrangements and deletions in the script apply to the audio and video underneath. Scenes, layouts, captions and B-roll sit on top, so you can go from raw recording to a finished, captioned YouTube video in one app." },
    { p: "Three changes define Descript in 2026:" },
    { ol: [
      "**Two meters instead of one.** In September 2025 Descript replaced transcription hours with **media hours** and added monthly **AI credits** for features such as Studio Sound, AI voices and Underlord actions. Its help center has a page answering [questions and concerns from the customer community](https://help.descript.com/hc/en-us/articles/40471885821325-Questions-and-concerns-we-ve-heard-from-the-customer-community) about the switch.",
      "**Underlord became an agent.** The co-editor now takes multi-step instructions, remembers custom instructions about your style, and lets paid users pick the underlying model. Third-party changelog coverage reports Claude and GPT models being added to its model picker through 2026, including Claude Opus 5 in July.",
      "**Descript opened up.** A Media Library for reusable assets arrived in April 2026, and an API with MCP support entered open beta in May, so you can trigger edits from code or from an AI assistant.",
    ] },

    { shot: "descript", caption: "Descript's homepage: the editor treats your transcript as the timeline. Source: [descript.com](https://www.descript.com)." },

    { h2: "Descript features: a deep tour" },

    { h3: "Text-based editing" },
    { p: "This is still the reason to buy Descript. After transcription, every word is linked to the media. Highlight a rambling answer and delete it, drag a paragraph to reorder the story, or strike out a false start. You can also ignore words instead of deleting them, which hides them from the final cut but keeps them recoverable." },

    { h3: "Underlord, the AI co-editor" },
    { p: "Underlord is a chat panel inside the editor. You can ask it to remove filler words and retakes, tighten pauses, add chapters, generate titles and show notes, find the best clips for social, apply a layout, or add captions in your house style. Descript's [Underlord help article](https://help.descript.com/hc/en-us/articles/36803785502221-Underlord-beta-Your-AI-co-editor-in-Descript) explains how it plans edits and asks before applying bigger changes. The useful part is that it works on the transcript you can see, so you can review and undo its edits like any other change." },
    { p: "Custom instructions let you say things like \"always keep the intro joke\" or \"cut pauses longer than 0.8 seconds\" once, rather than in every session. The model picker is a cube icon at the bottom of the chat, and premium models are limited to paid plans. Every Underlord action draws on AI credits, which is the main reason heavy users hit their limit." },

    { h3: "Studio Sound and audio cleanup" },
    { p: "Studio Sound is Descript's one-click enhancement: it removes room echo and background noise and evens out the voice so a laptop mic recording sounds closer to a treated studio. It is one of the most used features and works well on speech. Push it too hard on already clean audio and voices can sound processed, so use the intensity slider. If audio repair is your main job, compare it with the tools in our [Krisp vs Adobe Podcast vs Cleanvoice](/blog/krisp-vs-adobe-podcast-vs-cleanvoice) guide." },

    { h3: "Filler words, silence and Automatic Multicam" },
    { p: "Descript detects ums, uhs, \"you know\" and repeated words and can remove them all at once or one by one. Shorten Word Gaps trims long silences. For video podcasts with two or more cameras, Automatic Multicam switches to the active speaker based on who is talking, which saves a lot of manual cutting. For multicam work, dedicated tools like [AutoPod](/tools/autopod) still offer finer control inside Premiere; see our [AutoPod review](/blog/autopod-review)." },

    { h3: "AI voices, voice clones and Regenerate" },
    { p: "Descript's AI speakers let you type new words and have them spoken in a stock voice or a clone of your own voice, which is how you fix a misspoken word without re-recording. Regenerate re-creates a short stretch of audio so a patched word blends in naturally. Hobbyist and Creator include 25+ stock speakers, Business includes 60+, and all paid plans include custom voice clones. Descript requires you to verify that a cloned voice is yours or that you have consent." },

    { h3: "Eye Contact, layouts and design" },
    { p: "Eye Contact redirects your gaze toward the camera when you read from a script, which is handy for tutorials. Scenes and layouts give you templates for interview splits, picture-in-picture and title cards, and Quick Design applies a consistent look. Business and Enterprise add Brand Studio for locked brand templates across a team." },

    { h3: "Captions, translation and dubbing" },
    { p: "Captions come straight from the transcript, so they are usually more accurate than auto-captions from social apps. Descript can translate captions and dub audio into other languages on paid plans, and Business adds translation proofreading and \"native-sounding\" AI speakers in 14 languages. For dedicated localization, compare the tools in our guide to the [best AI video translators](/blog/best-ai-video-translators)." },

    { h3: "Recording, clips and video generation" },
    { p: "You can record your screen, camera, microphone and remote guests in Descript. Create Clips finds short moments for TikTok, Reels and Shorts and reframes them vertically. Creator also includes AI video generation with third-party models for B-roll and inserts, which uses credits." },

    { h2: "Descript pricing in 2026: what each plan really gets" },
    { p: "Prices below are per person, as listed on the official [Descript pricing page](https://www.descript.com/pricing) as of October 2026. The lower price is the annual rate per month; the higher is month-to-month." },
    { table: {
      head: ["Plan", "Price", "Media hours", "AI credits", "Export and seats", "Notable extras"],
      rows: [
        ["Free", "$0", "1/mo", "100 one-time", "720p with watermark, 1 seat", "Limited Underlord, Studio Sound and AI voices; 5GB storage"],
        ["Hobbyist", "$16/mo annual, $24 monthly", "10/mo", "400/mo", "1080p, no watermark, 1 seat", "25+ stock speakers, voice clones, translation, 100GB"],
        ["Creator", "$24/mo annual, $35 monthly", "30/mo", "800/mo", "4K, 1 to 3 seats", "Full Underlord access, AI video generation, 1TB"],
        ["Business", "$50/mo annual, $65 monthly", "40/mo", "1,500/mo", "4K, up to 5 seats", "60+ speakers, Brand Studio, translation proofread, priority support, 2TB"],
        ["Enterprise", "Custom", "Custom", "Custom", "Custom", "SSO/SCIM, audit logs, custom terms, dedicated CSM"],
      ],
    } },
    { h3: "How media hours and AI credits work in practice" },
    { p: "**Media hours** count the duration of every file you upload or record, and Descript's help center confirms that separate files count separately. A one-hour video podcast recorded as two camera tracks plus two audio tracks can burn far more than one hour. **AI credits** are spent on Underlord actions, Studio Sound, AI voices and other generative features. Credit costs per action are not always obvious in the app, which is the most common complaint in public reviews." },
    { p: "Our practical advice: a solo podcaster publishing one or two audio-first episodes a week fits Hobbyist. A YouTuber with multicam video, regular Underlord use and 4K exports needs Creator. Teams that share templates and need more credits should price Business against buying top-ups." },

    { h2: "Pros and cons" },
    { h3: "Pros" },
    { ul: [
      "**Fastest rough cuts for spoken content.** Editing by transcript is genuinely faster for interviews and talking-head video.",
      "**Underlord does real work.** Filler removal, chapters, show notes and clip finding in one instruction save hours per episode.",
      "**Studio Sound rescues bad audio.** One click fixes most echo and noise problems on speech.",
      "**All-in-one.** Recording, editing, captions, clips, translation and publishing in one tool.",
      "**Open in 2026.** The API and MCP support make Descript scriptable and connectable to AI assistants.",
    ] },
    { h3: "Cons" },
    { ul: [
      "**Two meters to watch.** Media hours and AI credits both run out, and multitrack projects use hours fast.",
      "**Credit costs are hard to predict.** Users report running out of credits mid-month on paid plans.",
      "**Weak free plan.** One media hour, 720p and a watermark make it a trial rather than a usable tier.",
      "**Not a pro finishing tool.** Color grading, keyframing and effects are basic next to Premiere Pro or Resolve.",
    ] },

    { h2: "Common complaints from public user feedback" },
    { p: "Descript's Trustpilot score is mixed, and the complaints cluster around a few themes. Most are about pricing structure rather than the editor itself:" },
    { ul: [
      "**The 2025 pricing change.** Long-time users who had near-unlimited transcription and AI tools felt the switch to media hours and credits was a downgrade.",
      "**Credits burning fast.** Several reviewers say they used a month of credits in a few sessions, especially with Studio Sound and voice regeneration.",
      "**Stability.** Crashes and slow playback show up in reviews, usually on long or complex projects.",
      "**Learning curve for video.** Audio editing is intuitive, but scenes and layouts take time to understand.",
    ] },
    { p: "If you are evaluating it, run one real project on a monthly plan and check your media hour and credit usage in account settings before committing to annual billing." },

    { h2: "Descript vs the alternatives" },
    { p: "Here is how Descript compares with the tools people most often weigh it against." },
    { table: {
      head: ["Tool", "Best for", "Free plan", "Starting paid price", "Edits by transcript"],
      rows: [
        ["[Descript](/tools/descript)", "Podcasts, talking-head video", "1 media hour, watermark", "$16/mo annual", "Yes, core workflow"],
        ["[CapCut](/tools/capcut)", "Short-form social video", "Yes, generous", "Varies by region", "Basic"],
        ["[Riverside](/tools/riverside)", "Remote recording plus editing", "2 hours, one-off", "$24/mo annual", "Yes"],
        ["[VEED](/tools/veed)", "Browser editing and subtitles", "Yes, watermark", "Check site", "Yes"],
        ["[Adobe Premiere Pro](/tools/adobe-premiere-pro)", "Professional finishing", "Trial only", "Check Adobe", "Yes, text-based editing"],
      ],
    } },
    { h3: "Descript vs CapCut" },
    { p: "[CapCut](/tools/capcut) wins for short, trend-driven clips, templates, effects and price. Descript wins for long spoken content and transcript editing. Our full [Descript vs CapCut comparison](/blog/descript-vs-capcut) goes through pricing, privacy and workflows, and our [CapCut review](/blog/capcut-review) covers it on its own." },
    { h3: "Descript vs Riverside" },
    { p: "[Riverside](/tools/riverside) is a remote recording studio first, with local recording of each guest in high quality, unlimited transcription on paid plans and a text-based editor. Its Pro plan is $24/mo billed annually per the [Riverside pricing page](https://riverside.com/pricing). If you interview remote guests every week, Riverside for recording plus Descript for editing is a common pairing, though many creators now do both in Riverside." },
    { h3: "Descript vs VEED" },
    { p: "[VEED](/tools/veed) runs in the browser and is strong at subtitles, quick social edits and team review. It is easier for marketing teams, while Descript is deeper for podcast workflows. See our [VEED review](/blog/veed-review)." },
    { h3: "Descript vs Premiere Pro" },
    { p: "[Adobe Premiere Pro](/tools/adobe-premiere-pro) now has text-based editing too, plus professional color, audio mixing and effects. It is the better choice if you finish commercial work, but it is slower to learn and has no equivalent to Underlord's one-instruction cleanup. Browse more options in our roundup of the [best AI video editors](/blog/best-ai-video-editors)." },

    { h2: "Who Descript is best for" },
    { ol: [
      "**Podcasters (audio or video):** the strongest fit. Transcript editing, filler removal, Studio Sound and show notes cover the whole workflow. See also our list of the [best AI podcast tools](/blog/best-ai-podcast-tools).",
      "**YouTubers making talking-head or tutorial content:** Creator plan for 4K, Eye Contact, layouts and clip finding.",
      "**Course creators and educators:** script-based recording, AI voice fixes and captions make updates easy.",
      "**Marketing teams producing webinars and interviews:** Business for shared templates and Brand Studio.",
      "**Journalists and researchers:** Descript is a capable transcription editor, but if you only need text, a dedicated tool is cheaper. See our guide to the [best AI transcription software](/blog/best-ai-transcription-software).",
    ] },

    { h2: "Is Descript worth it in 2026?" },
    { p: "For anyone who edits spoken content more than twice a month, yes. The time saved on rough cuts and cleanup is worth more than $16 to $24 a month for most working creators. The caveat is the meters: plan around your real media hours, keep an eye on credits during your first month, and turn on credit-heavy features like Studio Sound only where you need them." },

    { h2: "FAQ" },
    { h3: "Is Descript free?" },
    { p: "Descript has a free plan with 1 media hour a month, 100 one-time AI credits and 720p exports with a watermark. It is enough to test transcript editing and Underlord on a short project, but most people who publish regularly need Hobbyist ($16/mo annual) or Creator ($24/mo annual) for watermark-free, higher-resolution exports." },
    { h3: "Is Descript good for beginners?" },
    { p: "Yes, especially for audio and talking-head video. If you can edit a document, you can do a rough cut in Descript within an hour. Video layouts, scenes and multicam take longer to learn, and Underlord can handle a lot of the cleanup if you describe what you want in plain language." },
    { h3: "What is Descript Underlord?" },
    { p: "Underlord is Descript's AI co-editor, a chat panel that edits your project from plain-language instructions. It can remove filler words and retakes, add chapters, write titles and show notes, find social clips and apply layouts. Paid plans can choose the AI model behind it, and each action uses AI credits from your plan." },
    { h3: "How accurate is Descript transcription?" },
    { p: "Descript's transcription is accurate on clear speech in supported languages and lets you fix errors directly in the text, which also corrects captions. Accuracy drops with heavy accents, crosstalk and noisy recordings, as it does in every AI tool. You can add custom vocabulary for names and jargon to reduce corrections." },
    { h3: "Is Descript better than CapCut?" },
    { p: "For podcasts, interviews and long talking-head videos, Descript is better because you edit the transcript and Underlord automates cleanup. For short-form social clips with effects, templates and music, CapCut is better and cheaper. Many creators use both: Descript for the long edit and CapCut for vertical clips." },
    { h3: "What happens when I run out of Descript AI credits?" },
    { p: "AI features that use credits stop working until your credits reset at the next billing cycle, unless you buy a top-up. Core editing, transcript cuts and exports keep working. Check your remaining credits in account settings, and avoid applying Studio Sound or regeneration to whole files when you only need short sections." },
    { h3: "Does Descript work on Windows?" },
    { p: "Yes. Descript has desktop apps for both Windows and Mac, plus a version that runs in the browser. Projects sync through Descript's cloud storage, so you can start on one machine and finish on another. Storage ranges from 5GB on the free plan to 2TB on Business." },

    { h2: "Final verdict" },
    { p: "Descript remains the most efficient way to edit spoken video and audio in 2026. Transcript editing plus Underlord turns hours of tedious cleanup into minutes, Studio Sound fixes most audio problems, and the 2026 API makes it more flexible than ever. The trade-off is a metered pricing model that rewards planning: pick the plan that fits your real media hours, watch credits in month one, and you will likely find it pays for itself. If your content is short, visual and music-driven, start with CapCut instead." },

    { hr: true },
    { p: "Compare more editors and podcast tools in our [AI video tools category](/categories/video) and [AI audio tools category](/categories/audio). If you build an editing tool we have missed, you can [submit it for a listing](/submit)." },
  ],
};

export default post;
