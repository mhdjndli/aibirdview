import type { Post } from "../types";

const post: Post = {
  slug: "how-to-make-ai-videos",
  title: "How to Make AI Videos (2026): From Script to Final Cut",
  excerpt:
    "A complete, step-by-step workflow for making AI videos in 2026: choose the right type of video, write the script with ChatGPT or Claude, generate a consistent look, animate shots with Kling, Runway or Gemini Omni, add an ElevenLabs voiceover, and edit everything together in CapCut.",
  seoTitle: "How to Make AI Videos (2026): Step-by-Step Workflow",
  seoDescription:
    "Learn how to make AI videos step by step: script with ChatGPT or Claude, visuals with Kling, Runway or Veo, voice with ElevenLabs, editing in CapCut, plus costs.",
  metaKeywords:
    "how to make ai videos, how to make an ai video, ai video tutorial, how to create ai videos, make ai videos free, ai video workflow, text to video ai, image to video ai, ai video generator tutorial, ai voiceover, ai video editing, how to make ai videos for youtube",
  categories: ["guides"],
  body: [
    { p: "**Quick answer: how to make AI videos.** Decide what kind of video you need, write a script with [ChatGPT](/tools/chatgpt) or [Claude](/tools/claude), turn it into a shot list, generate a still image for each shot, animate the stills with an AI video generator such as [Kling](/tools/kling-ai), [Runway](/tools/runway) or [Gemini Omni](/tools/gemini-omni), record a voiceover with [ElevenLabs](/tools/elevenlabs), then cut everything together with music and captions in [CapCut](/tools/capcut). A polished 60-second video takes a few hours and can cost under $50 a month in tools." },
    { p: "No single app does all of this well yet. The best results still come from a pipeline where each tool does one job. This guide walks through that pipeline step by step, with example prompts, tool choices for each stage and realistic costs. Tool details and prices come from official pricing pages and documentation as of October 2026, not our own hands-on testing, so confirm current prices before you subscribe." },

    { logos: ["kling-ai", "runway", "gemini-omni", "elevenlabs", "capcut"] },

    { h2: "The AI video workflow at a glance" },
    { ul: [
      "**1. Pick the video type:** cinematic shots, a talking avatar, or script-to-video with stock footage.",
      "**2. Script:** ChatGPT or Claude, edited by you.",
      "**3. Shot list:** one line per shot with framing, action and duration.",
      "**4. Look:** generate first-frame images so every shot shares one style and character.",
      "**5. Animate:** image-to-video in Kling, Runway or Gemini Omni.",
      "**6. Voice:** ElevenLabs or your own recording.",
      "**7. Music and sound:** Suno, stock libraries or a generator's native audio.",
      "**8. Edit:** CapCut or another editor for timing, captions, transitions and export.",
    ] },

    { h2: "Step 1: Decide what kind of AI video you are making" },
    { p: "\"AI video\" covers three very different jobs, and the right tools depend on which one you mean:" },
    { table: {
      head: ["Video type", "What it looks like", "Best tools", "Typical use"],
      rows: [
        ["**Generated cinematic shots**", "New footage created from prompts and images", "[Kling](/tools/kling-ai), [Runway](/tools/runway), [Gemini Omni](/tools/gemini-omni)", "Ads, music videos, short films, B-roll"],
        ["**Avatar presenter**", "A realistic person reads your script on camera", "[HeyGen](/tools/heygen), [Synthesia](/tools/synthesia)", "Training, explainers, sales, translated videos"],
        ["**Script-to-video**", "Stock or generated clips assembled around a voiceover", "[invideo AI](/tools/invideo), [Pictory](/tools/pictory), [Fliki](/tools/fliki)", "YouTube explainers, listicles, social posts"],
      ],
    } },
    { p: "This guide focuses on the first type, because it gives you the most creative control and the techniques carry over to the others. If you want a presenter, follow our guide on [how to use HeyGen](/blog/how-to-use-heygen). If you want quick narrated videos from a script, our [invideo vs Pictory vs Fliki comparison](/blog/invideo-vs-pictory-vs-fliki) will help you pick." },

    { h2: "Step 2: Write the script with ChatGPT or Claude" },
    { p: "Start with the words, not the visuals. A script sets the length, the pacing and how many shots you need. Roughly 150 spoken words equals one minute of video." },
    { p: "Example prompt for ChatGPT or Claude:" },
    { quote: "Write a 60-second voiceover script for a short video about why octopuses are considered one of the smartest animals. Audience: curious adults on YouTube Shorts. Hook in the first 5 seconds, three surprising facts, one-line ending that invites a follow. About 150 words. Then split it into 8 to 10 shots and, for each shot, give: the narration line, a visual description, the camera move and a duration in seconds." },
    { ul: [
      "**Check every fact.** Language models still get details wrong. Verify claims before you build visuals around them.",
      "**Rewrite in your own voice.** Read it aloud and cut anything you would not say. This is also what keeps your video from feeling generic.",
      "**Keep sentences short.** AI voices and viewers both handle short sentences better.",
    ] },
    { p: "Need help with prompts? See our guides on [how to use ChatGPT](/blog/how-to-use-chatgpt) and [how to use Claude](/blog/how-to-use-claude)." },

    { h2: "Step 3: Turn the script into a shot list" },
    { p: "AI video generators make short clips, usually 5 to 10 seconds, and up to 30 seconds with Kling 4.0. Plan your video as a sequence of short shots, the way a film editor would. A simple shot list has five columns:" },
    { table: {
      head: ["#", "Narration", "Visual", "Camera", "Length"],
      rows: [
        ["1", "\"This animal can taste with its arms.\"", "Octopus arm curling over a rock, extreme close-up", "Slow push-in", "4 sec"],
        ["2", "\"It has nine brains.\"", "Octopus gliding over a coral reef", "Tracking shot, side view", "5 sec"],
        ["3", "\"And it can vanish in a second.\"", "Octopus changing color to match sand", "Locked-off, overhead", "5 sec"],
      ],
    } },
    { p: "Plan 10% to 20% more shots than you need. Some generations will fail, and spare B-roll makes editing much easier." },

    { h2: "Step 4: Create a consistent look with first-frame images" },
    { p: "The biggest difference between amateur and polished AI video is consistency: the same character, palette and lighting from shot to shot. The most reliable way to get it is to generate a still image for each shot first, then animate the stills." },
    { ol: [
      "Write a **style line** you will reuse in every image prompt, such as `natural history documentary still, deep blue water, soft caustic light, shallow depth of field, 16:9`.",
      "Generate each shot's image with an image model. [Nano Banana Pro](/tools/nano-banana-pro) is strong at keeping characters consistent from reference images, and [Midjourney](/tools/midjourney) is popular for cinematic style.",
      "For a recurring character, generate one reference image you like, then feed it back as a reference for every other shot.",
      "Set the aspect ratio now: 16:9 for YouTube, 9:16 for Shorts, Reels and TikTok.",
    ] },
    { p: "Our guide on [how to use Midjourney](/blog/how-to-use-midjourney) covers style references and character references in detail." },

    { h2: "Step 5: Animate each shot with an AI video generator" },
    { p: "Now upload each still to an image-to-video generator and write a prompt describing **only the motion**: the camera move, what the subject does and how the environment moves. The image already shows the scene, so do not describe it again." },
    { p: "Example motion prompt: `Slow push-in. The octopus uncurls one arm across the rock, suckers gripping. Sand drifts in the current. Calm, documentary pace.`" },
    { shot: "kling-ai", caption: "Kling generates clips with native audio and lip sync, and Kling 4.0 makes single takes of up to 30 seconds." },
    { h3: "Which video generator to use" },
    { table: {
      head: ["Generator", "Strengths", "Native audio", "Clip length", "Starting price (Oct 2026)"],
      rows: [
        ["[Kling](/tools/kling-ai) (Kling 4.0)", "Best value, big motion, long takes, lip sync", "Yes", "3 to 30 sec", "About $10/mo, plus daily free credits"],
        ["[Runway](/tools/runway) (Gen-4.5, Aleph 2.0)", "Cinematic camera work, editing real footage, many models in one app", "Gen-4.5 no; third-party models yes", "About 2 to 10 sec", "$15/mo ($12 annual), 125 free credits"],
        ["[Gemini Omni](/tools/gemini-omni) (and Veo 3.1)", "Realism with synchronized sound, any-input video", "Yes", "Up to 10 sec per generation", "Google AI plans; AI Pro $19.99/mo"],
        ["[Hailuo AI](/tools/hailuo-ai)", "Expressive characters and acting", "Yes", "Short clips", "About $10/mo (check site)"],
        ["[Luma](/tools/luma-dream-machine)", "HDR and VFX pipelines, restyling footage", "Via third-party models", "5 to 10 sec", "$30/mo ($25 annual)"],
      ],
    } },
    { p: "For most beginners, Kling is the easiest place to start because it is cheap and generates sound. Pick Runway if you also want to edit footage you shot yourself; our step-by-step guide on [how to use Runway](/blog/how-to-use-runway) covers it in depth. Gemini Omni is the pick for photoreal clips with dialogue if you already pay for Google's AI plans. For a deeper comparison, read [Runway vs Kling vs Luma](/blog/runway-vs-kling-vs-luma) and our ranking of the [best AI video generators](/blog/best-ai-video-generators)." },
    { h3: "Prompting tips that save credits" },
    { ul: [
      "**One action per clip.** Multi-step actions in a single generation usually break.",
      "**Use camera vocabulary:** dolly in, orbit, crane up, handheld, locked-off.",
      "**Draft short and cheap** (5 seconds, faster models or lower resolution) before rendering the final version.",
      "**Generate two or three takes per shot** and keep the best; budget credits accordingly.",
      "**Avoid on-screen text** in generated shots. Add titles and captions in your editor.",
    ] },

    { h2: "Step 6: Record the voiceover with ElevenLabs" },
    { p: "A good voice makes AI visuals feel intentional. You have two options: record yourself with a decent USB microphone, or use an AI voice. [ElevenLabs](/tools/elevenlabs) is the most popular choice for AI narration." },
    { ol: [
      "Sign up at elevenlabs.io and open the text-to-speech tool.",
      "Paste one paragraph of your script at a time. Shorter chunks are easier to fix.",
      "Pick a voice from the library, or clone your own voice (Instant Voice Cloning is on the Starter plan and up).",
      "Generate, listen, and regenerate any line with odd emphasis. Punctuation changes pacing: commas add short pauses, periods add longer ones.",
      "Download each line as a separate file so you can time it to your shots in the editor.",
    ] },
    { shot: "elevenlabs", caption: "ElevenLabs turns a script into natural narration, with a large voice library and voice cloning on paid plans." },
    { p: "ElevenLabs pricing, per its [official pricing page](https://elevenlabs.io/pricing) as of October 2026: Free gives about 10 minutes of speech a month, Starter is $6 a month for about 30 minutes with a commercial license, and Creator is $22 a month for about 121 minutes plus Professional Voice Cloning. Our [ElevenLabs tutorial](/blog/how-to-use-elevenlabs) goes deeper on voice settings." },
    { p: "If you used a generator with native audio, such as Kling or Gemini Omni, you may already have dialogue and ambient sound. You will still usually want a separate narration track for explainers." },

    { h2: "Step 7: Add music and sound effects" },
    { ul: [
      "**Music:** [Suno](/tools/suno) generates original tracks from a text prompt; check its plan terms for commercial use. Royalty-free libraries and CapCut's built-in library are the simpler option for social posts.",
      "**Sound effects:** waves, footsteps and whooshes make generated footage feel real. ElevenLabs and Runway both generate sound effects, and many editors include free libraries.",
      "**Mix:** duck the music well below the voice, and lower it further under dialogue, so narration stays clear.",
    ] },
    { p: "Our guide on [how to make a song with Suno](/blog/how-to-make-a-song-with-suno) covers writing music prompts if you want a custom score." },

    { h2: "Step 8: Edit everything together in CapCut" },
    { p: "Editing is where AI clips become a video. [CapCut](/tools/capcut) is the most common choice for beginners because it is free to start, runs on desktop, web and mobile, and has strong auto captions." },
    { ol: [
      "Create a new project in your target aspect ratio and import your clips, voiceover files and music.",
      "Lay the voiceover on the timeline first. It sets the rhythm of the whole video.",
      "Drop each clip above its narration line and trim it to fit. Cut on action or on the beat of the music.",
      "Add auto captions, then fix any misheard words. Most viewers watch short-form video with the sound off.",
      "Add titles, lower thirds and your logo as text layers, never inside the generated footage.",
      "Color-match clips that look slightly different with a single filter or adjustment layer across all of them.",
      "Export at 1080p or higher. For YouTube, 4K uploads tend to get better compression.",
    ] },
    { shot: "capcut", caption: "CapCut handles the final edit: timing clips to the voiceover, auto captions, music and export." },
    { p: "CapCut's paid plans unlock more AI tools and remove watermarks from some effects; prices vary by country, so check the app. Prefer editing by text? [Descript](/tools/descript) lets you cut video by editing a transcript, and our [Descript vs CapCut comparison](/blog/descript-vs-capcut) explains the trade-offs. For more options, see the [best AI video editors](/blog/best-ai-video-editors)." },

    { h2: "Step 9: Export, disclose and publish" },
    { ul: [
      "**Check rights:** only upload images, footage and voices you have rights to use, and never clone someone else's voice or likeness without consent.",
      "**Disclose realistic AI content.** YouTube requires creators to mark realistic altered or synthetic content in YouTube Studio's AI use setting during upload, per its [disclosure policy](https://support.google.com/youtube/answer/14328491). TikTok and Meta have similar labels.",
      "**Repurpose:** cut a long video into vertical clips with [OpusClip](/tools/opus-clip) or similar tools.",
    ] },

    { h2: "What a 60-second AI video costs" },
    { p: "A realistic monthly tool budget for one creator making a few short videos a month, using list prices as of October 2026:" },
    { table: {
      head: ["Stage", "Free route", "Budget paid route"],
      rows: [
        ["**Script**", "ChatGPT or Claude free plans", "ChatGPT Plus or Claude Pro, $20/mo (optional)"],
        ["**Images**", "Free tiers of image generators", "Included in Runway or Google AI plans, or a dedicated image plan"],
        ["**Video**", "Kling daily free credits, Runway's 125 one-time credits", "Kling Standard, about $10/mo"],
        ["**Voice**", "ElevenLabs Free (about 10 min, no commercial license)", "ElevenLabs Starter, $6/mo"],
        ["**Editing**", "CapCut free", "CapCut free, or a paid plan for extra AI tools"],
        ["**Total**", "$0, with watermarks and limits", "About $16 to $40/mo"],
      ],
    } },
    { p: "The hidden cost is rerolls. Expect to generate two to four takes for every shot you keep, so a 10-shot video may need 20 to 40 generations." },

    { h2: "Common mistakes when making AI videos" },
    { ul: [
      "**Starting with visuals instead of a script.** You end up with pretty clips that do not tell a story.",
      "**Text-to-video for everything.** Image-to-video gives far more consistent characters and framing.",
      "**Overlong shots.** Two to five seconds per shot keeps short-form videos moving.",
      "**No sound design.** Silent AI footage with only music feels hollow; add ambient sound.",
      "**Ignoring artifacts.** Watch every clip full screen for melting hands, warped faces and flickering backgrounds before you publish.",
      "**Publishing generic content at volume.** Platforms are cracking down on low-effort AI video. Our guide on [making faceless YouTube videos with AI](/blog/how-to-make-faceless-youtube-videos-with-ai) explains YouTube's monetization rules.",
    ] },

    { h2: "Troubleshooting" },
    { ul: [
      "**My character looks different in every shot:** generate stills from one reference image, reuse the same style line, and use the generator's character or element reference feature.",
      "**The clip barely moves:** add a clear camera move and subject action, and remove scene description from the motion prompt.",
      "**Lip sync looks off:** use a model with native audio and lip sync, keep the face large in frame, or use an avatar tool for talking-head segments.",
      "**The voiceover sounds robotic:** split the script into smaller chunks, adjust punctuation, try a different voice, or record yourself.",
      "**Credits run out too fast:** draft at lower resolution or with faster models, and only render finals for approved shots.",
    ] },

    { h2: "FAQ" },
    { h3: "How can I make AI videos for free?" },
    { p: "Use free tiers at every step: ChatGPT or Claude for the script, Kling's daily free credits or Runway's 125 one-time credits for clips, ElevenLabs' free plan for about 10 minutes of voice a month, and CapCut's free editor. Expect watermarks, slower queues and no commercial license on some free plans, so upgrade before publishing client work." },
    { h3: "What is the best AI video generator for beginners?" },
    { p: "Kling is a good first choice because it is inexpensive, makes long clips and generates sound with lip sync. Runway is better if you want editing tools and many models in one workspace. If you just want a narrated video from a script without generating footage, script-to-video tools like invideo AI or Pictory are simpler." },
    { h3: "How long does it take to make an AI video?" },
    { p: "A simple 30 to 60 second social video can take one to two hours once you have a routine: about 20 minutes for the script and shot list, 30 to 60 minutes generating images and clips, and 30 minutes editing. Longer or narrative videos take much more time, mostly in rerolling shots and editing." },
    { h3: "Can AI make a full video from just a text prompt?" },
    { p: "Partly. Agent features in Runway, HeyGen's Video Agent and script-to-video tools like invideo AI can produce a complete draft from one prompt, with script, voice, visuals and captions. The results are fine for quick drafts but tend to look generic, so most creators still edit the script, replace weak shots and refine the cut." },
    { h3: "Are AI-generated videos allowed on YouTube?" },
    { p: "Yes. YouTube allows AI-generated videos and they can be monetized, but realistic synthetic content must be disclosed with the AI use setting in YouTube Studio, and mass-produced, templated or repetitive videos are not eligible for the Partner Program under its inauthentic content policy. Original scripts and real editing make the difference." },
    { h3: "Can I use AI videos commercially?" },
    { p: "Usually yes on paid plans, but it depends on each tool's terms. Many free plans add watermarks or exclude commercial use, ElevenLabs' free plan has no commercial license, and you still need rights to any images, footage, logos or likenesses you upload. Check the terms page of every tool in your pipeline before client work." },

    { h2: "Bottom line" },
    { p: "Making AI videos that people actually watch is less about finding one magic tool and more about a repeatable workflow: script first, plan short shots, lock a consistent look with first-frame images, animate with a generator like Kling or Runway, add a real voice and sound, and edit with care. Start with free tiers, learn on a 30-second project, then pay for the one or two tools you lean on most." },

    { hr: true },
    { p: "Explore more AI video generators, editors and avatar tools in the [AI video category](/categories/video), and voice tools in the [AI audio category](/categories/audio). Built a tool we should list? [Submit it for a listing](/submit)." },
  ],
};

export default post;
