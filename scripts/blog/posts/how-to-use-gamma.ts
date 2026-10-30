import type { Post } from "../types";

const post: Post = {
  slug: "how-to-use-gamma",
  title: "How to Use Gamma (2026): Step-by-Step Guide to AI Presentations",
  excerpt:
    "A practical Gamma tutorial for the Gamma 5 era: write a prompt that works, pick Plan, Express or Research mode, review the agent's plan, edit with chat and the freeform canvas, apply a theme, present like a pro, and export to PowerPoint, Google Slides or PDF without surprises.",
  seoTitle: "How to Use Gamma (2026): Step-by-Step Gamma AI Tutorial",
  seoDescription:
    "Learn how to use Gamma step by step: prompts, Plan vs Express mode, editing with the agent, themes, presenting, sharing and exporting to PowerPoint or Slides.",
  metaKeywords:
    "how to use gamma, gamma tutorial, how to use gamma ai, gamma app tutorial, gamma ai presentation, how to make a presentation with gamma, gamma for beginners, gamma 5 agent, gamma export to powerpoint, gamma google slides, gamma prompts, gamma tips",
  categories: ["guides"],
  body: [
    { p: "**Quick answer: how to use Gamma.** Sign up free at gamma.app, type what you need into the prompt bar (for example, a 10-slide pitch for a meal-kit startup aimed at seed investors), keep the default **Plan** mode, answer the agent's few questions, approve its plan, and let it build. Then refine with chat requests or by editing directly, pick a theme, and click **Present** or **Share > Export** for PDF, PNG or PowerPoint. A first deck takes about 10 to 15 minutes." },
    { p: "[Gamma](/tools/gamma) is an AI tool that creates presentations, documents, social carousels and websites. This tutorial follows Gamma's official [help center](https://help.gamma.app/en/) and covers the Gamma 5 workflow released on October 6, 2026, which replaced the old one-shot generator with an agent that plans before it designs. Menu names occasionally change, so if a label differs slightly on your screen, look for the closest match. Want our opinion on whether Gamma is worth paying for? Read the full [Gamma review](/blog/gamma-review)." },

    { logos: ["gamma"] },


    { h2: "Gamma in 60 seconds" },
    { ul: [
      "**Cost to start:** free. The free plan includes 400 one-time credits and up to 10 slides per prompt.",
      "**Where it runs:** any browser at gamma.app, plus a mobile app for iOS and Android in the US and Canada.",
      "**Three creation modes:** Plan (questions and a plan first), Express (draft immediately) and Research (web sources first, Pro and above).",
      "**Three effort levels:** Lite, Standard and Max. Max is on Pro and above.",
      "**Most useful shortcuts in Present mode:** arrow keys to move, S for Spotlight, E for quick edits, Esc to exit.",
      "**Export path:** Share > Export > PDF, PNG or PowerPoint. For Google Slides, upload the PowerPoint file.",
    ] },

    { h2: "What you need before you start" },
    { table: {
      head: ["Requirement", "Details"],
      rows: [
        ["**Account**", "A free Gamma account (Google sign-in or email). Paid plans add credits and features"],
        ["**Browser**", "A current desktop browser. Exports can fail in mobile browsers, per Gamma's docs"],
        ["**Content**", "A topic, rough notes, an outline, a document, a PowerPoint file or a URL"],
        ["**Brand assets (optional)**", "Logo, colors and fonts if you want a custom theme"],
        ["**Time**", "10 to 15 minutes for a first draft, longer for Research mode"],
      ],
    } },
    { p: "Tip: the better your input, the better the deck. A rough outline you wrote yourself beats a one-line topic every time. If you want help drafting that outline, an assistant like [ChatGPT](/tools/chatgpt) or [Claude](/tools/claude) is a good first step." },

    { h2: "Step 1: Create your account and pick a format" },
    { ol: [
      "Go to gamma.app and sign up with Google or an email address.",
      "Create or join a workspace. Solo users can keep the default personal workspace.",
      "On the dashboard, decide what you are making: a presentation, a document, a webpage or social content. Gamma uses the same editor for all of them, and you can describe the format in your prompt.",
      "If you would rather use the older one-shot flow, click **Use classic generator** on the dashboard, then **Create New AI** and choose **Generate**, **Paste** or **Import**.",
    ] },

    { h2: "Step 2: Write a prompt Gamma can work with" },
    { p: "The prompt bar is where the Gamma 5 agent starts. You can type, attach files with the **+** button (**Upload Files**), choose a template, or pull content from connected tools such as Slack or meeting recorders. A strong prompt states five things: **topic, audience, goal, length and tone**." },
    { h3: "Example prompts that work" },
    { ul: [
      "`A 10-slide seed pitch deck for a meal-kit startup targeting busy parents. Audience: angel investors. Goal: secure a follow-up meeting. Include problem, solution, market size, traction, business model, team and the ask. Confident, plain tone.`",
      "`Turn the attached quarterly report into an 8-slide board update. Lead with three key numbers, then wins, risks and next-quarter priorities. Only use the attached file.`",
      "`A 12-slide lesson on photosynthesis for 9th graders, with one diagram per concept, a quick quiz at the end and speaker notes for the teacher.`",
      "`A one-page product launch website for an AI note-taking app, with hero section, three features, pricing and FAQ.`",
    ] },
    { p: "Two prompt phrases from Gamma's [agent guide](https://help.gamma.app/en/articles/15002203-how-do-i-create-with-agent-in-gamma) are worth memorizing. If your text is final, say `use this text as-is` so the agent designs around it instead of rewriting. If you want no outside material, say `only use the attached file`. Note that the agent may still run a quick web search even with Research off." },

    { h2: "Step 3: Choose a mode and an effort level" },
    { p: "Before you send the prompt, set two controls." },
    { table: {
      head: ["Control", "Option", "When to use it"],
      rows: [
        ["**Mode**", "Plan (default)", "Most decks. You answer questions and approve a plan before anything is built"],
        ["**Mode**", "Express", "Quick drafts when you are short on time. Skips questions and plan review"],
        ["**Mode**", "Research", "Fact-heavy decks. Reads web sources first, uses more credits, needs Pro and Plan mode"],
        ["**Effort**", "Lite", "Simple, everyday decks. Fewest credits"],
        ["**Effort**", "Standard", "The recommended default for most work"],
        ["**Effort**", "Max", "Important decks. Strongest models, cited research, better image model. Pro and above"],
      ],
    } },
    { p: "According to Gamma's [effort picker guide](https://help.gamma.app/en/articles/16951195-what-is-the-effort-picker-and-how-do-i-use-it), you cannot change the effort level after a conversation starts. The smart workflow: draft at Lite or Standard, and once you like the direction, start a new conversation and rerun the same prompt at Max." },

    { h2: "Step 4: Answer the agent's questions" },
    { p: "In Plan mode, the agent asks a handful of questions about your goal, audience and priorities. Each one has tappable answers and a box for your own guidance." },
    { ol: [
      "Answer the questions that matter to you in a sentence or two. Specifics beat adjectives: \"investors who know food delivery but not meal kits\" is better than \"investors\".",
      "Click **Decide for me** on questions you do not care about, or tell the agent to use its best judgment.",
      "If you uploaded images, say whether they should be used throughout. Uploaded images are used instead of automatically sourced ones.",
    ] },

    { h2: "Step 5: Review the plan (the most important step)" },
    { p: "The agent then shows a plan covering the story, the style and the look and feel. Gamma's own docs call this the most useful point to intervene, and they are right: changing the plan costs nothing, while rebuilding a finished deck costs time and credits." },
    { ul: [
      "**Check the story order.** Does each slide make one point, and does the sequence build to your ask or conclusion?",
      "**Cut slides.** AI plans run long. Merge or remove anything that does not earn its place.",
      "**Fix the style direction.** If the proposed look is wrong for your audience (too playful for a bank, too corporate for a creator), say so now.",
      "**Approve.** The agent will not build until you do.",
    ] },

    { h2: "Step 6: Let Gamma build, then edit with chat" },
    { p: "Once approved, the agent researches, writes, designs and generates images while narrating its progress. Slides appear in a live grid, and you can open any finished slide while the rest complete. The browser tab shows a yellow badge while it works and a green checkmark when done." },
    { h3: "Chat edits that work well" },
    { ul: [
      "`Tighten the executive summary to three bullets.`",
      "`Make slide 4 a comparison table of our plan vs two competitors.`",
      "`Replace the stock photos with simple illustrations in our brand colors.`",
      "`Add speaker notes to every slide, about 60 words each.`",
      "`Restyle the whole deck in a darker, more premium look. Keep all the content.`",
    ] },
    { p: "The agent makes targeted edits and leaves untouched slides, and your manual edits, alone. If the content is right but the design is wrong, ask for a **restyle** rather than regenerating. In the classic editor, the sparkle icon at the top left of a slide edits that slide with AI, and the top-right sparkle edits several slides at once on Pro." },

    { h2: "Step 7: Edit manually and apply a theme" },
    { ol: [
      "**Edit text directly** by clicking into any block. Shorten headlines to one line.",
      "**Use the freeform canvas** (new in Gamma 5) when you need an element in an exact spot: move, resize and arrange elements yourself, then hand control back to the agent.",
      "**Change the theme** from the **Theme** option in the upper right. Do this before polishing individual slides so you do not redo work.",
      "**Create a custom theme** with your logo, colors and fonts if you present for a company or client. Pro users can keep multiple brand kits.",
      "**Swap images** with AI generation, your own uploads or style references so visuals stay consistent.",
      "**Add a diagram** where a slide is a wall of text. Gamma can generate one, or you can make one in [Napkin AI](/tools/napkin-ai) and paste it in.",
    ] },

    { h2: "Step 8: Present your gamma" },
    { ol: [
      "Click **Present** in the top-right corner and choose **Full screen** or **In tab**.",
      "Use presenter view to read speaker notes privately while the audience sees only the slides.",
      "Navigate with the left and right arrows. Up and down scroll long slides or highlight toggles and nested slides.",
      "Press **S** for Spotlight, which highlights the block you are discussing and dims the rest.",
      "Press **E** for a quick fix mid-talk, such as a typo, then click **Done**.",
      "For remote audiences, share a follow link from the Present dropdown so viewers can track your position.",
    ] },
    { p: "These controls come from Gamma's [presenting guide](https://help.gamma.app/en/articles/8032935-what-s-the-best-way-to-present-my-gamma). Animations can be switched on or off under **Page setup**." },

    { h2: "Step 9: Share a link and read the analytics" },
    { ol: [
      "Click **Share** and set link access to **No access**, **View**, **Comment** or **Edit**. Workspace settings override individual links.",
      "On Pro and above, turn on **Require a password to view** under Advanced Settings for confidential decks.",
      "Use the **Embed** tab to place a gamma in a website or knowledge base.",
      "After sending, open analytics (Pro and above) to see time per slide, views per slide, how far viewers got and unique viewers over 30 days.",
    ] },
    { p: "Free plan shares show a \"Made with Gamma\" badge. Plus and higher remove it." },

    { h2: "Step 10: Export to PowerPoint, Google Slides, PDF or PNG" },
    { ol: [
      "Click **Share** in the top right and choose **Export**, or use the three-dot menu and pick **Export**.",
      "Set the card dropdown to **All cards**, or you may export only the current card.",
      "Choose **PDF**, **PNG** or **PowerPoint (PPTX)**. The file downloads and Gamma also emails a copy.",
      "Turn on **Zoom to fit** if content scales oddly in fixed-format exports.",
      "If text looks wrong, install the fonts offered in the **Install fonts** box of the export menu.",
      "For **Google Slides**, export a PPTX and upload it to Slides. Google Slides ignores fonts embedded in PowerPoint files, so open the PPTX in PowerPoint if fonts matter.",
    ] },
    { p: "Gamma has no Word export: export a PDF and convert it if you need a .docx. Free plan PDF and PPTX exports carry a badge, which upgrading removes only from future exports. Gamma's [export guide](https://help.gamma.app/en/articles/8022861-what-s-the-easiest-way-to-export-my-gamma) also notes that printing to PDF from your browser while signed in does not add the badge." },

    { h2: "Bonus: turn the same content into a website, doc or graphic" },
    { ul: [
      "**Website:** publish a gamma as a site, or create a multi-page site. Pro allows up to 10 custom domains and Ultra or Business up to 100.",
      "**Social carousel:** create square or vertical cards exported as images for LinkedIn or Instagram. For more tools, see our [best AI LinkedIn tools](/blog/best-ai-linkedin-tools).",
      "**Single graphic:** use **Imagine** from **Create > Create graphics** for posters, infographics and social images. It uses credits and is not available on Business or Enterprise plans.",
    ] },

    { h2: "Common mistakes to avoid" },
    { ul: [
      "**One-line prompts.** \"Marketing presentation\" gives you generic slides. Include audience, goal, length and tone.",
      "**Skipping the plan.** Approving a weak plan means editing a weak deck. Fix structure before building.",
      "**Using Express for important decks.** Save Express for drafts; use Plan for anything you will present.",
      "**Regenerating instead of restyling.** If only the look is wrong, ask for a restyle and keep the content.",
      "**Burning free credits on experiments.** The 400 free credits never refresh, so test with real content.",
      "**Exporting at the last minute.** PowerPoint exports often need a 10 to 20 minute tidy-up. Export early.",
      "**Overstuffed cards.** Gamma cards grow with content, which tempts you to cram. One idea per card.",
    ] },

    { h2: "Pro tips" },
    { ul: [
      "**Draft cheap, finish expensive:** Lite or Standard for exploration, then rerun the winner at Max on Pro.",
      "**Feed it context:** attach the real report, transcript or brief. Connectors to Slack and meeting recorders such as [Granola](/tools/granola) save copy-pasting.",
      "**Find your old prompt:** open the three-dot menu and choose **View Source Prompt**, or check Recent chats.",
      "**Keep decks short:** exports can fail around 150+ slides, so split very long material into several gammas.",
      "**Write the outline elsewhere first:** an outline from an assistant, edited by you, beats any one-line prompt. Our [best ChatGPT prompts](/blog/best-chatgpt-prompts) guide has outline prompts you can adapt.",
    ] },

    { h2: "Troubleshooting" },
    { table: {
      head: ["Problem", "Fix"],
      rows: [
        ["Draft is generic", "Add audience, goal and your own facts. Attach source files and say only use the attached file"],
        ["Research option is missing", "Research needs Pro or higher and Plan mode"],
        ["Max effort is missing", "Max is on Pro, Ultra, Business and Enterprise only"],
        ["Export only has one slide", "Set the card dropdown to All cards before exporting"],
        ["Fonts look wrong in Google Slides", "Open the PPTX in PowerPoint, or install the fonts listed in the export menu"],
        ["Page background disappeared on export", "Set each card's background color in the toolbar, or export PNG"],
        ["Export fails", "Retry later or on another network, compress large images, split decks over about 150 slides"],
        ["Ran out of credits", "Edit manually, earn referral credits, buy credits or upgrade"],
      ],
    } },

    { h2: "FAQ" },
    { h3: "Is Gamma free to use?" },
    { p: "Yes. Gamma's free plan gives you 400 credits at signup, which is enough for a few complete decks, with up to 10 slides per prompt and a Gamma badge on shares and exports. Free credits do not refresh, so for regular use, Plus adds 1,500 credits every month and removes the badge." },
    { h3: "How do I make a presentation in Gamma?" },
    { p: "Type a prompt describing your topic, audience, goal and length into the prompt bar, keep Plan mode, answer the agent's questions, approve its plan and let it build. Then edit through chat or directly, choose a theme, and click Present. The whole process takes about 10 to 15 minutes for a first deck." },
    { h3: "Can I use Gamma with Google Slides?" },
    { p: "Yes, indirectly. Export your gamma as a PowerPoint file, then upload it to Google Slides. Expect some cleanup, because Gamma's flexible cards become fixed slides and Google Slides ignores fonts embedded in the file. If you mostly work in Slides, compare with Gemini in Slides in our [best AI presentation makers](/blog/best-ai-presentation-makers) guide." },
    { h3: "How do I remove the Made with Gamma badge?" },
    { p: "Upgrade to Plus, Pro or Ultra, which removes the badge from shared views and from future exports. Exports made on the free plan keep the badge. Gamma's help center also notes that printing to PDF from your browser while signed in produces a copy without the badge on any plan." },
    { h3: "Can Gamma make a presentation from a PDF or Word document?" },
    { p: "Yes. Attach the file in the prompt bar, or use Import in the classic generator, and Gamma converts it into a styled deck. You can also paste text or enter a URL. Tell the agent to only use the attached file if you do not want outside material added." },
    { h3: "What is the difference between Plan and Express mode in Gamma?" },
    { p: "Plan mode asks a few questions about your goal and audience, shows a plan for story and style, and waits for your approval before building. Express skips the questions and plan review and produces a draft immediately. Plan gives better results for important decks; Express is faster for rough drafts." },
    { h3: "Is Gamma better than PowerPoint for beginners?" },
    { p: "For beginners, Gamma is usually faster and produces better-looking decks with less effort, because themes and layouts are handled for you. PowerPoint gives more precise control and works offline. Many people draft in Gamma and export to PowerPoint for final edits. Compare options in [Gamma vs Beautiful.ai](/blog/gamma-vs-beautiful-ai)." },

    { h2: "Bottom line" },
    { p: "Using Gamma well comes down to three habits: give it real input (audience, goal and your own material), spend a minute on the agent's plan before it builds, and export early if you need PowerPoint or Google Slides. Do that and Gamma turns an hour of slide wrangling into fifteen minutes of editing. Start on the free plan, and upgrade only when credits, analytics or password-protected links become worth paying for." },

    { hr: true },
    { p: "Browse more slide, writing and workflow tools in the [AI productivity tools category](/categories/productivity), or design tools in [AI design](/categories/design). If you build a presentation tool we have missed, you can [submit it for a listing](/submit)." },
  ],
};

export default post;
