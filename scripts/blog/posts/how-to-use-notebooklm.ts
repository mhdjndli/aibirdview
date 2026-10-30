import type { Post } from "../types";

const post: Post = {
  slug: "how-to-use-notebooklm",
  title: "How to Use NotebookLM (2026): A Step-by-Step Guide to Gemini Notebook",
  excerpt:
    "NotebookLM is now called Gemini Notebook, but it works the same way: you add sources and it answers only from them, with citations. Here is how to build a notebook, chat with citations, make Audio and Video Overviews, mind maps, study guides, flashcards and quizzes, and what each plan allows.",
  seoTitle: "How to Use NotebookLM (Gemini Notebook) in 2026: Guide",
  seoDescription:
    "Learn how to use NotebookLM (now Gemini Notebook): add sources, chat with citations, make Audio and Video Overviews, flashcards and quizzes, plus 2026 limits.",
  metaKeywords:
    "how to use notebooklm, notebooklm tutorial, gemini notebook, how to use gemini notebook, notebooklm audio overview, notebooklm video overview, notebooklm source limit, notebooklm for students, notebooklm plus, notebooklm pro limits, notebooklm mind map, notebooklm flashcards",
  categories: ["guides"],
  body: [
    { p: "**Quick answer:** to use NotebookLM, create a notebook, add your sources (PDFs, Google Docs, Slides, websites, YouTube videos, audio and more), then ask questions in the chat. Every answer is grounded in those sources and cites the exact passage. From the Studio panel you can turn the same material into Audio Overviews, Video Overviews, mind maps, reports, study guides, flashcards, quizzes, slide decks and infographics. The free plan allows 100 notebooks with up to 50 sources each." },
    { p: "One thing has changed: on July 16, 2026, Google [renamed NotebookLM to Gemini Notebook](https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/). It is the same standalone research tool at a new address (notebook.google.com, with the old notebooklm.google.com links redirecting), now with deeper ties to the Gemini app and, on higher plans, a cloud computer that can run code over your sources. We use both names in this guide. The steps below come from Google's official help center and announcements as of October 2026, plus common user feedback. Google adds features often, so labels in your account may differ slightly." },
    { logos: ["notebooklm"] },

    { h2: "What NotebookLM (Gemini Notebook) is best at" },
    { ul: [
      "**Answers from your material only.** Unlike a general chatbot, [Gemini Notebook](/tools/notebooklm) does not pull in outside knowledge unless you add web sources. That cuts down on made-up answers.",
      "**Inline citations.** Each claim links to the passage it came from, so you can check it in one click.",
      "**Many formats from one set of sources.** Podcast-style audio, narrated videos, mind maps, study guides, flashcards and quizzes, all generated from the same notebook.",
      "**Free and generous.** The free tier covers most students and casual researchers.",
      "**Weak spots:** it is not a writing tool, it cannot see paywalled pages, and Studio outputs offer little manual editing.",
    ] },

    { h2: "Step 1: Create your first notebook" },
    { ol: [
      "Go to notebook.google.com (or open **Notebooks** in the Gemini app) and sign in with a Google account. Personal accounts and most Google Workspace accounts work.",
      "Click **Create new** (or **New notebook**).",
      "The add sources window opens right away. Add at least one source to start (see Step 2).",
      "Give the notebook a clear title, like \"BIO 201 Midterm\" or \"Q3 Competitor Research\".",
      "Keep one notebook per project or course.",
    ] },
    { p: "Notebooks you create in the Gemini app sync fully with the standalone Gemini Notebook site, so you can start on your phone and continue on a laptop. Mobile apps are available for Android and iOS." },

    { h2: "Step 2: Add sources (types and limits)" },
    { p: "Sources are everything NotebookLM knows in a notebook. According to Google's [supported sources page](https://support.google.com/notebooklm/answer/16215270), you can add:" },
    { ul: [
      "**Documents:** PDF, DOCX, TXT, Markdown, CSV and PPTX files, plus ePub ebooks.",
      "**Google Workspace files:** Google Docs, Google Slides (up to 100 slides) and Google Sheets (up to 100,000 tokens).",
      "**Websites:** paste one or more URLs. Only page text is imported, not images, embedded video or paywalled content.",
      "**YouTube videos:** public videos with captions. Only the transcript is imported.",
      "**Audio files:** MP3, WAV, M4A and many more. Audio is transcribed on import.",
      "**Images:** JPG, PNG, WebP, HEIC and other common formats.",
      "**Pasted text, Gemini chats, and eligible Google Play Books and textbooks.**",
    ] },
    { p: "Each source can hold up to **500,000 words or 200 MB**, whichever comes first, on every plan. Google Drive sources sync automatically every few minutes, which is handy for living documents like meeting notes. Comments and footnotes in Docs are not imported, and a multi-tab Doc or Sheet becomes a single source." },
    { h3: "Find new sources with Fast Research and Deep Research" },
    { p: "You do not have to bring everything yourself. In the Sources panel, type a research question and choose **Web** or **Drive**. **Fast Research** returns a list of relevant pages or files to import. Turn on **Deep Research** for a longer, agent-style search that reads widely and proposes a curated set of sources plus a report. Deep Research is available only to users over 18, and imported results count toward your source limit." },
    { h3: "Tips for better sources" },
    { ul: [
      "Use text-based PDFs when you can. Scanned pages with poor quality text extract badly.",
      "Split giant files by chapter so citations point to smaller, easier-to-check sources.",
      "Rename sources clearly (\"Lecture 4 slides\", \"Smith 2024 meta-analysis\").",
    ] },

    { h2: "Step 3: Chat with your sources and check citations" },
    { p: "The chat panel is the center of the notebook. Ask anything about your sources, and each answer comes with numbered citations. Hover or click a number to jump to the exact passage in the original source. If the sources do not cover your question, NotebookLM says so instead of guessing, which is the main reason people trust it for study and research." },
    { h3: "Prompts that work well" },
    { ul: [
      "\"Summarize the main argument of each source in two sentences, then tell me where they disagree.\"",
      "\"List every definition in my lecture slides as a glossary, with citations.\"",
      "\"What evidence in these papers supports the claim that remote work raises productivity? What evidence contradicts it?\"",
      "\"Explain the methods section of the Smith paper as if I am a first-year student.\"",
      "\"Create a timeline of every event mentioned in these sources.\"",
      "\"Based only on these contracts, which clauses mention termination, and how do they differ?\"",
    ] },
    { p: "Use **Configure chat** (the settings icon on the chat panel) to set a goal or role, such as a tutor that quizzes you, and to choose shorter or longer responses. Click **Save to note** on any useful answer, and notes are kept in the Studio panel. You can also turn notes into sources so later answers build on your own synthesis." },

    { h2: "Step 4: Generate Audio Overviews" },
    { p: "Audio Overviews made NotebookLM famous: two AI hosts discuss your sources like a podcast episode. Google's [Audio Overview help page](https://support.google.com/notebooklm/answer/16212820) lists four formats." },
    { table: {
      head: ["Format", "What you get", "Best for"],
      rows: [
        ["**Deep Dive** (default)", "Two hosts connect ideas across sources", "Learning a topic, commute listening"],
        ["**The Brief**", "One speaker, key takeaways in under two minutes", "Quick refreshers before a meeting or exam"],
        ["**The Critique**", "Two hosts give constructive feedback", "Reviewing your own essay, design doc or pitch"],
        ["**The Debate**", "Two hosts argue different perspectives", "Contested topics, essay prep, policy questions"],
      ],
    } },
    { ol: [
      "Open the **Studio** panel on the right and click **Audio Overview** (or the pencil icon to customize).",
      "Pick a format and a length: Shorter, Default or Longer (Longer is English only).",
      "Add a focus prompt, for example: \"Focus on chapters 3 and 4, assume the listener is a nursing student, and skip the history.\"",
      "Choose the output language. More than 80 are supported.",
      "Click **Generate**. It runs in the background and usually takes a few minutes.",
    ] },
    { p: "In English, **Interactive mode** lets you join a newly generated Deep Dive and ask the hosts a question by voice. They answer from your sources, then pick the conversation back up. You can change playback speed, download the audio, or share a link." },

    { h2: "Step 5: Make Video Overviews" },
    { p: "Video Overviews turn your sources into a narrated explainer with slides, diagrams, quotes and images pulled from your documents. Open **Video Overview** in Studio, choose a format and visual style, add a focus prompt, and generate. The standard explainer suits lessons and research summaries, and a short format covers one idea in about a minute. Google also offers **Cinematic** Video Overviews, built with its Veo video models, which reports describe as limited to Google AI Ultra subscribers, so check what your plan shows." },
    { p: "Prompt ideas: \"Explain the three causes of the 2008 financial crisis for high school students, using the charts in source 2\" or \"A two-minute onboarding video for new sales hires based on our playbook.\" Videos can be downloaded or shared. Like other Studio outputs, you cannot edit individual slides, so refine the prompt and regenerate instead." },

    { h2: "Step 6: Mind maps, reports, flashcards, quizzes and more" },
    { p: "The Studio panel holds a growing set of one-click outputs. All of them are generated only from your sources." },
    { ul: [
      "**Mind map:** a branching diagram of the main topics and how they connect. Click any node to ask the chat about it. Great for seeing the shape of an unfamiliar field.",
      "**Reports:** briefing documents, study guides, blog-style posts or a custom format you describe. A study guide includes short-answer questions, essay prompts and a glossary.",
      "**Flashcards:** question and answer cards for spaced practice. Ask for a focus or difficulty in the prompt.",
      "**Quizzes:** multiple-choice questions with explanations of why each answer is right or wrong.",
      "**Slide decks:** presentation-ready slides with a choice of format, length and style.",
      "**Infographics:** a single visual summary in portrait or landscape, downloadable as an image.",
      "**Data tables:** structured comparisons pulled out of your sources, useful for literature reviews.",
    ] },
    { p: "Each output has a customize option. Use it: \"20 flashcards on pharmacology dosages only, hard difficulty\" beats the default every time. Generated items do not count toward your notebook or source caps." },
    { h3: "Code execution on higher plans" },
    { p: "With the rename, Google started giving notebooks a secure cloud computer so Gemini Notebook can write and run code over your sources, for example to analyze a CSV or chart survey results. It launched for Google AI Ultra and some Workspace business plans, with Pro users on the web next in line, according to Google's announcement." },

    { h2: "Step 7: Share and collaborate" },
    { ol: [
      "Click **Share** in the top right of a notebook.",
      "Add people by email and choose **Viewer** (can chat and see outputs) or **Editor** (can add sources and generate outputs).",
      "Where your account allows it, set access to anyone with the link for public sharing, for example a teacher sharing a course notebook.",
      "Share individual Audio Overviews by link, or download them as files.",
    ] },
    { p: "Public link sharing is not available on some Workspace Enterprise and Education accounts, depending on admin settings. Deleting an Audio Overview breaks its share links. If you share a notebook built on Drive files, viewers see the notebook content, so check what is inside before you share." },

    { h2: "Gemini Notebook plans and limits (as of October 2026)" },
    { p: "Gemini Notebook comes free with any Google account, and higher limits come with Google AI subscriptions (Plus, Pro and Ultra). The old \"NotebookLM Plus\" upgrade is now part of those plans. Notebook and source caps below come from Google's [plan limits page](https://support.google.com/notebooklm/answer/16213268), which notes they are subject to change." },
    { table: {
      head: ["Plan", "Notebooks", "Sources per notebook", "Usage vs free", "US price"],
      rows: [
        ["**Free (standard)**", "100", "50", "1x", "$0"],
        ["**Google AI Plus**", "200", "100", "About 2x", "Check Google One"],
        ["**Google AI Pro**", "500", "300", "About 4x", "$19.99/mo"],
        ["**Google AI Ultra (20 TB)**", "500", "500", "About 5x", "Reported at $99.99/mo"],
        ["**Google AI Ultra (30 TB)**", "500", "600", "About 20x", "Reported at $199.99/mo"],
      ],
    } },
    { p: "Since **September 2, 2026**, chat and Studio usage is measured by compute rather than fixed daily counts. Your allowance refreshes every 5 hours up to a weekly limit, and heavier jobs (long chats, Video Overviews, slide decks) use more of it. When you are near the limit, Gemini Notebook may suggest a lighter output or let you schedule a video to generate later. You can see your usage in **Settings > Usage**. The usage multipliers above come from press coverage of the change, and the Ultra prices from public reports after Google's 2026 plan changes, so confirm on the [Google One plans page](https://one.google.com/about/plans) before you buy." },

    { h2: "How to use NotebookLM for students, researchers and work" },
    { h3: "For students" },
    { ol: [
      "Create one notebook per course and add each week's slides, readings and lecture recordings.",
      "After each lecture, ask: \"What are the five most important ideas from this week, and how do they connect to last week?\"",
      "Generate a study guide and 30 flashcards before each exam, then a quiz to test yourself.",
      "Listen to a Brief or Deep Dive Audio Overview on the way to class.",
      "Use the Critique format on your own essay draft to hear its weak spots.",
    ] },
    { p: "Use it to understand material, not to write assignments for you, and follow your course's AI policy. Our guide to the [best AI tools for students](/blog/best-ai-tools-for-students) covers the rest of a study stack." },
    { h3: "For researchers" },
    { ul: [
      "Load a literature set and ask for a data table of methods, sample sizes and findings.",
      "Ask \"where do these papers disagree, and why?\" to find gaps worth writing about.",
      "Use Deep Research to discover sources, then verify each one before keeping it.",
      "Pair it with discovery tools like [Elicit](/tools/elicit) or [SciSpace](/tools/scispace). See our [best AI research tools](/blog/best-ai-research-tools) roundup.",
    ] },
    { h3: "For work" },
    { ul: [
      "**Onboarding:** put policies, product docs and FAQs in a shared notebook new hires can question.",
      "**Sales and support:** load call transcripts and product specs to draft answers grounded in what is true.",
      "**Competitive research:** add competitor pages and reports, then ask for a comparison table.",
    ] },

    { h2: "Common mistakes and troubleshooting" },
    { ul: [
      "**\"The answer is missing something I know is in the file.\"** Scanned or image-heavy PDFs extract poorly. Use a text-based version, or paste the section as text.",
      "**YouTube link will not import.** The video must be public with captions, and very new uploads (under 72 hours) may not work.",
      "**Website import is empty.** Paywalled and script-heavy pages often fail. Copy the text and add it as pasted text.",
      "**Audio Overview is too general.** Add a focus prompt naming the sections, audience and depth you want, or uncheck unrelated sources first.",
      "**Hit a usage limit.** Wait for the 5-hour refresh, choose a lighter output, or check your weekly limit under Settings > Usage.",
      "**Too many unrelated sources.** Split into separate notebooks. Focused notebooks give sharper answers.",
    ] },
    { p: "Need to work with web search as well as your own files? [Perplexity](/tools/perplexity) is the better tool for open-web questions, and our [Perplexity tutorial](/blog/how-to-use-perplexity-ai) shows how to combine the two. For single-PDF chat and editing, see the [best AI PDF tools](/blog/best-ai-pdf-tools)." },
    { shot: "notebooklm", caption: "[Gemini Notebook](/tools/notebooklm), formerly NotebookLM, answers only from the sources you add, with citations." },

    { h2: "FAQ" },
    { h3: "Is NotebookLM free?" },
    { p: "Yes. Gemini Notebook, formerly NotebookLM, is free with any Google account. The free plan includes 100 notebooks with up to 50 sources each, chat with citations and all main Studio outputs, within compute-based usage limits that refresh every 5 hours. Google AI Plus, Pro and Ultra subscriptions raise notebook, source and usage limits." },
    { h3: "Is NotebookLM now called Gemini Notebook?" },
    { p: "Yes. Google renamed NotebookLM to Gemini Notebook on July 16, 2026. It remains a standalone research tool, now at notebook.google.com, and old links and shared notebooks redirect automatically. You can also open your notebooks from the Gemini app, with full syncing between the two." },
    { h3: "How many sources can I add to NotebookLM?" },
    { p: "Free accounts can add 50 sources per notebook, Google AI Plus 100, Pro 300, and Ultra 500 or 600 depending on the tier. Each source can be up to 500,000 words or 200 MB on every plan. Google Slides sources are capped at 100 slides and Google Sheets at 100,000 tokens." },
    { h3: "How do I make a NotebookLM podcast (Audio Overview)?" },
    { p: "Add your sources, open the Studio panel and click Audio Overview. Choose a format (Deep Dive, Brief, Critique or Debate), a length and a language, then add a focus prompt describing the topics and audience. Click Generate, and the episode is ready in a few minutes. You can download it or share a link." },
    { h3: "Can NotebookLM read PDFs?" },
    { p: "Yes. Upload PDFs directly or add them from Google Drive. Text-based PDFs work best, and each file can be up to 200 MB or 500,000 words. Answers cite the exact passages in the PDF, so you can check them. Scanned, low-quality PDFs may extract poorly, so run OCR first if text is missing." },
    { h3: "Does NotebookLM use my data to train AI?" },
    { p: "Google states that for qualifying work and school accounts, your uploads, queries and responses are not reviewed by humans or used to train AI models. Personal accounts follow different terms, especially for notebooks used through the Gemini app. For confidential material, use a covered work or school account and check Google's privacy pages first." },
    { h3: "What is the difference between NotebookLM and Gemini?" },
    { p: "The Gemini app is a general assistant that draws on its training and the web. Gemini Notebook answers from the sources you add, with citations, and turns them into study and research outputs. Since 2026 they are connected: you can create notebooks inside the Gemini app and add Gemini chats to a notebook as sources." },

    { h2: "Bottom line" },
    { p: "If you have a pile of material to understand, Gemini Notebook (NotebookLM) is the best free tool for the job in 2026. Create one focused notebook per project, add clean sources, ask specific questions and check the citations, then let Studio turn the same material into audio, video, mind maps, flashcards and quizzes. The free plan is enough for most students and many professionals. Upgrade to Google AI Pro only when you hit the 50-source cap or the usage limits regularly." },

    { hr: true },
    { p: "Find more tools like Gemini Notebook in our [AI research category](/categories/research) and [AI education category](/categories/education), or browse the full [AI tools directory](/tools). Building a study or research tool? [Submit it for a listing](/submit)." },
  ],
};

export default post;
