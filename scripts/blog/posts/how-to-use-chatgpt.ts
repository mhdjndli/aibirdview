import type { Post } from "../types";

const post: Post = {
  slug: "how-to-use-chatgpt",
  title: "How to Use ChatGPT (2026): A Step-by-Step Guide for Beginners",
  excerpt:
    "A practical beginner's tutorial for ChatGPT in 2026: create an account, write prompts that work, pick the right GPT-6 model and thinking level, upload files, search the web, make images, set up memory and Projects, hand off tasks to ChatGPT Work, and protect your privacy.",
  seoTitle: "How to Use ChatGPT (2026): Step-by-Step Beginner Guide",
  seoDescription:
    "Learn how to use ChatGPT step by step: sign up, write better prompts, choose GPT-6 models, upload files, Deep Research, images, Projects, Work and privacy tips.",
  metaKeywords:
    "how to use chatgpt, chatgpt tutorial, chatgpt for beginners, how to use chatgpt for free, chatgpt guide 2026, how to write chatgpt prompts, chatgpt tips, how to use chatgpt for work, chatgpt projects, chatgpt memory, chatgpt work agent, chatgpt deep research, is chatgpt free",
  categories: ["guides"],
  body: [
    { p: "**Quick answer: how to use ChatGPT.** Go to chatgpt.com or download the app, sign up with an email, Google, Microsoft or Apple account, and type what you need in the message box. Be specific: say who the answer is for, what format you want and any limits, such as \"explain compound interest to a 12-year-old in five bullet points\". Then refine with follow-ups like \"shorter\" or \"add an example\". The free plan is enough to learn; upgrade to Plus ($20/mo) only when you hit the limits." },
    { p: "[ChatGPT](/tools/chatgpt) is OpenAI's AI assistant. It writes, explains, summarizes, analyzes files, searches the web, makes images, talks out loud and, with the newer **ChatGPT Work** agent, completes multi-step tasks for you. This guide walks through every step a beginner needs, in the order you will need it. It is based on OpenAI's official pricing page, help center and Academy guides as of October 2026, plus public user feedback, not on paid sponsorship. Menus change often; if a button has moved, check the **+** menu or Settings." },

    { logos: ["chatgpt"] },

    { h2: "ChatGPT in 60 seconds" },
    { ul: [
      "**Cost:** free to use. Go is $8/mo, Plus $20/mo, Pro from $100/mo.",
      "**Current models:** the GPT-6 family. Free and Go use the lighter **GPT-6 Luna**, Plus uses **GPT-6 Sol** in chat, and the Pro tiers add **GPT-6 Astra** in chat.",
      "**Where it runs:** web browser, Mac and Windows desktop apps, iPhone and Android apps.",
      "**Best first habit:** give context and a format in every prompt, then iterate with follow-ups.",
      "**Privacy switch to know:** turn off model training in Settings, Data controls, or use a Temporary Chat.",
    ] },

    { h2: "Which ChatGPT plan do you need?" },
    { p: "Start free. You can learn everything in this guide on the free plan, and most people only upgrade once they hit message caps or want the agent features. Here is what each tier gets, per the [ChatGPT pricing page](https://chatgpt.com/pricing) and OpenAI's help center, as of October 2026:" },
    { table: {
      head: ["Plan", "Price", "Main model in chat", "What you get"],
      rows: [
        ["**Free**", "$0", "GPT-6 Luna", "Unlimited basic text chat, capped uploads, images and Deep Research, limited Work and Codex in the desktop app, may show ads in the US"],
        ["**Go**", "$8/mo", "GPT-6 Luna", "Roughly 10x Free's messages, uploads and images, longer memory, scheduled tasks, may show ads"],
        ["**Plus**", "$20/mo", "GPT-6 Sol", "No ads, Projects and custom GPTs, expanded Deep Research, Work on web, desktop and mobile, Codex, Sites, limited GPT-6 Astra inside Work and Codex"],
        ["**Pro**", "$100, $200 or $500/mo", "GPT-6 Sol plus GPT-6 Pro (Astra)", "5x Plus usage or more, maximum memory, Work and Codex, early features"],
        ["**Business**", "$25/seat/mo ($20 annual)", "GPT-6 Sol, limited Astra", "Admin controls, SSO, business data excluded from training by default"],
      ],
    } },
    { p: "Prices vary by country. Choosing between assistants? Our [ChatGPT review](/blog/chatgpt-review) and [Claude vs ChatGPT](/blog/claude-vs-chatgpt) comparison go deeper." },

    { h2: "Step 1: Create your account and pick an app" },
    { ol: [
      "Open **chatgpt.com** in any browser. You can chat a little without an account, but signing up saves your history and unlocks files, images and memory.",
      "Click **Sign up** and use an email address or continue with Google, Microsoft or Apple.",
      "Confirm your email and enter your name and birthday when asked.",
      "Optional: install the **desktop app** (Mac or Windows) for a keyboard shortcut and the local features of ChatGPT Work, and the **mobile app** (iOS or Android) for voice and the camera.",
    ] },

    { h2: "Step 2: Learn the interface" },
    { p: "The screen has four parts worth knowing on day one:" },
    { ul: [
      "**Sidebar (left):** New chat, search across your old chats, your Projects, and custom GPTs. Every conversation is saved here unless you use a Temporary Chat.",
      "**Model picker (top):** choose the model and how hard it should think. More on this in step 4.",
      "**Message box (bottom):** type here. The **+** button attaches files and photos and opens tools such as web search, Deep Research and image creation.",
      "**Work toggle:** switches from chat to ChatGPT Work, the agent mode for multi-step tasks (step 10).",
    ] },
    { p: "Hover over your own message to edit and resend it, which is often faster than writing a correction." },

    { h2: "Step 3: Write your first prompt" },
    { p: "A prompt is just your message. ChatGPT handles casual questions fine, but **specific prompts get dramatically better answers**. A simple formula covers most cases:" },
    { ol: [
      "**Role or audience:** who should it act as, or who is the answer for? (\"You are a patient math tutor\", \"for a busy CFO\")",
      "**Task:** what exactly should it do? Use a verb: write, summarize, compare, plan, explain.",
      "**Context:** paste the background, the draft, the data or the goal.",
      "**Format:** bullets, a table, an email, 150 words, three options.",
      "**Constraints:** tone, what to avoid, reading level, deadline.",
    ] },
    { table: {
      head: ["Weak prompt", "Better prompt"],
      rows: [
        ["`write an email to my landlord`", "`Write a polite but firm email to my landlord asking them to fix a broken heater reported 10 days ago. Mention my lease requires repairs within 7 days. Under 150 words.`"],
        ["`explain inflation`", "`Explain inflation to a high school student in 5 bullet points, with one everyday example and one common myth.`"],
        ["`help me with my resume`", "`Here is my resume and a job post. List the 5 most important gaps between them, then rewrite my summary to target this role.`"],
      ],
    } },
    { p: "Then **iterate**. Treat the first answer as a draft and steer it: `make it warmer`, `cut it by half`, `give me three alternative headlines`, `what are you assuming here?`. Start a **new chat for each new topic**, because a long thread full of old context can drag answers off course. For 50+ ready-made templates, see our [best ChatGPT prompts](/blog/best-chatgpt-prompts) library." },

    { h2: "Step 4: Choose the right model and thinking level" },
    { p: "Since October 2026, the picker shows **GPT-6** in place of the old \"Latest\" option. On paid plans, a **thinking slider** sets how long GPT-6 Sol reasons before answering, from **Instant** through Medium and High to **Extra High**, according to OpenAI's [GPT-6 in ChatGPT help article](https://help.openai.com/en/articles/20001354-gpt-6-and-other-models-in-chatgpt). Pro subscribers also see **Pro**, powered by GPT-6 Astra." },
    { table: {
      head: ["Setting", "Use it for", "Trade-off"],
      rows: [
        ["**Instant**", "Quick questions, rewrites, brainstorming, casual chat", "Fastest, least careful on hard problems"],
        ["**Medium / High**", "Analysis, planning, math, coding, comparing documents", "Slower, uses more of your limits"],
        ["**Extra High**", "Tough multi-step reasoning where accuracy matters most", "Slowest; save it for problems that need it"],
        ["**Pro (Astra)**", "The hardest research, legal, financial or technical work", "Pro tiers only, with weekly limits"],
      ],
    } },
    { p: "Free and Go users get **GPT-6 Luna**, which started rolling out to them on October 8, 2026. If an answer to a tricky question feels shallow, ask it to `think step by step and check your work`, or try the same prompt on a higher setting if your plan has one." },

    { h2: "Step 5: Upload files, photos and screenshots" },
    { p: "Click **+** (or drag a file into the chat) to attach PDFs, Word documents, spreadsheets, slides, images and code. Useful first tries:" },
    { ul: [
      "`Summarize this 40-page report in one paragraph, then list every number I should double-check.`",
      "`This is my bank export as a CSV. Group spending by category and make a bar chart.`",
      "`What's wrong with this error message?` with a screenshot attached.",
    ] },
    { p: "For spreadsheets, ChatGPT writes and runs code behind the scenes to calculate and chart, so ask it to **show the formulas or steps** for anything you plan to rely on." },

    { h2: "Step 6: Search the web and run Deep Research" },
    { p: "ChatGPT searches the web automatically when a question needs current information, such as news, prices or opening hours, and shows source links you can click. To force it, choose **Search** from the **+** menu or say `search the web for...`." },
    { p: "**Deep Research** is for bigger questions. It plans a research approach, reads many sources over several minutes and returns a long, cited report. For example: `Research the best electric cargo bikes under $3,000 sold in the US. Compare range, payload, warranty and owner complaints in a table, and cite every claim.` Free and Go have small monthly allowances; Plus and Pro get more. If research is your main use, compare it with our guide on [how to use Perplexity AI](/blog/how-to-use-perplexity-ai)." },

    { h2: "Step 7: Create images and talk with voice" },
    { p: "Ask for an image in plain language, or pick **Create image** from the **+** menu. ChatGPT generates pictures with **ChatGPT Images 2** and edits photos you upload. Describe subject, style, composition and any text: `A flat illustration of a woman reading on a rainy balcony, warm colors, square format, no text`. Free accounts get only a few images a day, while Plus gets far more." },
    { p: "**Voice** lives behind the sound-wave icon in the message box, mostly used on mobile. It is great for language practice and interview rehearsal." },

    { h2: "Step 8: Personalize ChatGPT with instructions and memory" },
    { p: "Open **Settings, Personalization** to make every answer fit you:" },
    { ul: [
      "**Custom instructions:** tell it about yourself and how to reply, for example: `I'm a nurse in Ohio. Use plain language, US units, and short paragraphs. Ask a clarifying question if my request is vague.`",
      "**Memory:** ChatGPT can remember facts you share (your job, your kids' ages, your writing style) and reference past chats. Say `remember that...` to save something, or `forget...` to remove it. You can review and delete memories in settings.",
    ] },
    { p: "Memory depth grows with your plan, from limited on Free to maximum on Pro. If you do not want a chat to influence memory, use a Temporary Chat." },

    { h2: "Step 9: Organize work with Projects and custom GPTs" },
    { p: "**Projects** group related chats with shared files and instructions, so you stop re-explaining context. Create one from the sidebar, add files (a style guide, a syllabus, a product spec) and project instructions, then start every related chat inside it. A \"Job search\" project with your resume and target roles is a good first one." },
    { p: "**Custom GPTs** (on Plus and up) are reusable mini-assistants with their own instructions, files and tools. Build one from the GPTs section when you repeat the same workflow often, like turning meeting notes into a standard recap." },

    { h2: "Step 10: Hand bigger tasks to ChatGPT Work" },
    { p: "**ChatGPT Work** is the agent mode. Instead of answering once, it gathers information, makes a plan, uses tools and connected apps, and checks back when it needs approval or is done. It is built for finished deliverables: a spreadsheet, a deck, a report, a cleaned-up folder. To use it:" },
    { ol: [
      "Click the **Work** toggle on the web or in the desktop app (on mobile, choose Work from the menu at the top).",
      "Optionally start it inside a Project so it can use that Project's files.",
      "Connect apps such as Gmail, Google Drive, Slack or Notion, and type **@** plus the app name to point it at one.",
      "Describe the goal, the sources, the audience and the output: `Using the three PDFs in this project, build a 10-slide deck for our board summarizing Q3 sales, and flag any numbers that disagree.`",
      "Review its plan, approve it, and check the result before you share it.",
    ] },
    { p: "Work can also run on a schedule, such as a Monday-morning summary of new Slack threads. On desktop it can also use local files and, if you allow it, control your computer, which is riskier. OpenAI's [ChatGPT Work guide](https://openai.com/academy/how-to-use-chatgpt-work-for-everyday-tasks) recommends supplying source materials and constraints, then asking for a usable first pass. Free and Go get limited Work access on desktop; Plus unlocks it everywhere." },
    { p: "Programmers get Codex with Plus too; our [OpenAI Codex vs Claude Code](/blog/openai-codex-vs-claude-code) comparison covers it." },

    { h2: "Step 11: Protect your privacy" },
    { ul: [
      "**Turn off training:** Settings, Data controls, then switch off the option to improve the model for everyone. Your chats stay in your history but are not used to train future models.",
      "**Use Temporary Chat** for sensitive one-offs. These chats do not appear in history, do not use or create memories, and are not used for training (OpenAI may keep them for up to 30 days for safety review).",
      "**Never paste** passwords, full card numbers, ID numbers, or confidential client data into a consumer account.",
      "**For work data**, use Business or Enterprise, where business data is excluded from training by default.",
    ] },

    { h2: "10 everyday ways to use ChatGPT" },
    { table: {
      head: ["Task", "Try this prompt"],
      rows: [
        ["**Email**", "`Reply to this email declining the meeting but offering two times next week. Friendly, 80 words.`"],
        ["**Learning**", "`Teach me how mortgages work. Ask me one question at a time and check my answers.`"],
        ["**Summaries**", "`Summarize this article in 3 bullets and tell me what the author is arguing against.`"],
        ["**Decisions**", "`I'm choosing between these two job offers. Build a weighted pros and cons table and ask me for the weights.`"],
        ["**Writing**", "`Edit this paragraph for clarity without changing my voice. Show changes in bold.`"],
        ["**Spreadsheets**", "`Write an Excel formula that flags rows where column C is more than 10% above column B.`"],
        ["**Interviews**", "`Act as the hiring manager for this job post and run a mock interview, one question at a time.`"],
      ],
    } },

    { h2: "Common mistakes beginners make" },
    { ul: [
      "**Trusting every fact.** ChatGPT can state wrong things confidently, including fake quotes and citations. Verify anything you will publish, submit or act on.",
      "**One-line prompts for complex jobs.** Give context, the audience and the format. Paste the actual material instead of describing it.",
      "**Giving up after one answer.** The second and third rounds of feedback are where answers get good.",
      "**Endless threads.** Start a new chat per topic, or use a Project to keep shared context deliberately.",
    ] },

    { h2: "Troubleshooting" },
    { ul: [
      "**\"You've hit your limit\":** wait for the reset shown in the message, switch to a lighter model, or upgrade.",
      "**A model or tool is missing:** features roll out gradually and vary by plan and country. Update the app, refresh, and check your plan.",
      "**Answers ignore your file:** say `use only the attached document` and name it. Very long files may need to be split.",
      "**Upload fails:** check the file type and size, try a PDF instead of a scan, or export a spreadsheet to CSV.",
    ] },

    { h2: "FAQ" },
    { h3: "Is ChatGPT free to use?" },
    { p: "Yes. The free plan gives unlimited basic text chats with GPT-6 Luna, plus capped file uploads, image creation, web search and a small Deep Research allowance. In the US, Free and Go may show ads. Paid plans start at $8 a month for Go and $20 for Plus, which removes ads and adds Projects, custom GPTs and full ChatGPT Work access." },
    { h3: "How do I use ChatGPT for the first time?" },
    { p: "Go to chatgpt.com, sign up with an email or a Google, Microsoft or Apple account, and type a question in the message box at the bottom. Start with something real, like drafting an email or explaining a bill. Then ask follow-ups to refine the answer, and start a new chat when you switch topics." },
    { h3: "What is the best way to write a ChatGPT prompt?" },
    { p: "Say who the answer is for, what you want it to do, the context it needs, the format and any constraints. For example: \"Write a 100-word LinkedIn post for small business owners announcing our new delivery area, upbeat tone, one emoji at most.\" Then iterate. Specific prompts with pasted source material beat vague one-liners every time." },
    { h3: "Can ChatGPT see my files and remember my conversations?" },
    { p: "It only sees files you upload or apps you connect. With memory on, it can remember details you share and reference past chats to personalize answers. You can view and delete memories in Settings, turn memory off, or use a Temporary Chat, which neither saves to history nor updates memory." },
    { h3: "What is the difference between ChatGPT and ChatGPT Work?" },
    { p: "Regular ChatGPT answers your message in the chat. ChatGPT Work is an agent mode: you give it a goal, and it plans the steps, uses connected apps and files, and produces a finished deliverable such as a spreadsheet, deck or report, checking in when it needs approval. Work is limited on Free and Go and fully available from Plus." },
    { h3: "Is ChatGPT Plus worth it?" },
    { p: "Plus is worth $20 a month if you use ChatGPT daily, hit free limits, or want GPT-6 Sol with adjustable thinking, Projects, custom GPTs, ChatGPT Work and Codex without ads. If you mostly ask occasional questions, Free or the $8 Go plan is enough. Our ChatGPT review breaks down the value plan by plan." },

    { h2: "Bottom line" },
    { p: "Learning how to use ChatGPT well takes an afternoon: sign up free, write specific prompts with context and a format, iterate on the first answer, and verify anything that matters. Once that feels natural, add custom instructions and memory, organize recurring work in Projects, and try ChatGPT Work for multi-step jobs. If ChatGPT is not clicking for you, our guides on [how to use Claude](/blog/how-to-use-claude) and [how to use Gemini](/blog/how-to-use-gemini) cover the two main rivals, and the [ChatGPT vs Gemini](/blog/chatgpt-vs-gemini) comparison helps you choose." },

    { hr: true },
    { p: "Explore more AI assistants and everyday helpers in the [AI productivity category](/categories/productivity) and the [AI chat category](/categories/chat). Built a tool we should list? [Submit it for a listing](/submit)." },
  ],
};

export default post;
