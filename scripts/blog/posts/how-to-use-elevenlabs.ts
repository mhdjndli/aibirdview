import type { Post } from "../types";

const post: Post = {
  slug: "how-to-use-elevenlabs",
  title: "How to Use ElevenLabs (2026): Step-by-Step Guide for Eleven v4",
  excerpt:
    "A practical guide to using ElevenLabs in 2026: picking a plan, generating your first voiceover, choosing models and settings, directing delivery with audio tags, cloning your voice, building audiobooks and podcasts in Studio, dubbing, sound effects, music and the API.",
  seoTitle: "How to Use ElevenLabs (2026): Step-by-Step for Eleven v4",
  seoDescription:
    "Learn how to use ElevenLabs step by step: text to speech, Eleven v4 audio tags, voice settings, voice cloning, Studio, dubbing and the API, plus credit tips.",
  metaKeywords:
    "how to use elevenlabs, elevenlabs tutorial, elevenlabs guide, how to use elevenlabs for free, elevenlabs text to speech, elevenlabs voice cloning tutorial, elevenlabs audio tags, eleven v4, elevenlabs settings, elevenlabs studio, elevenlabs dubbing, elevenlabs api tutorial",
  categories: ["guides"],
  body: [
    { p: "**To use ElevenLabs, sign up at elevenlabs.io, open Text to Speech, paste your script, pick a voice and the Eleven v4 model, and click Generate.** You can download the result as MP3 right away. From there you can direct the delivery with audio tags like `[whispers]`, clone your own voice from a minute or two of audio, build long projects in Studio, dub videos into other languages, and call the same features from the API." },
    { p: "That is the quick answer to how to use ElevenLabs. This tutorial walks through each step in detail, with example scripts, recommended settings, common mistakes and fixes. It follows the official [ElevenLabs documentation](https://elevenlabs.io/docs/overview/intro) as of October 2026, including the Eleven v4 model released on September 28. ElevenLabs updates its interface often, so if a button label differs slightly in your account, look for the closest match." },

    { logos: ["elevenlabs"] },

    { h2: "How to use ElevenLabs: a five-minute quick start" },
    { ol: [
      "Go to [elevenlabs.io](https://elevenlabs.io) and create a free account.",
      "In the left sidebar, open **Text to Speech**.",
      "Paste a short script, for example: \"Welcome back to the channel. Today we are testing three budget microphones.\"",
      "Choose a voice from the voice picker at the bottom left, and set the model to **Eleven v4**.",
      "Click **Generate speech**, listen, and click the download button.",
    ] },
    { p: "That gets you a voiceover. The rest of this guide is about getting one that sounds right the first time and does not waste credits." },

    { h2: "Step 1: Create an account and choose a plan" },
    { p: "Every ElevenLabs feature draws from one monthly credit balance. Text to speech costs about 1 credit per character, so 1,000 credits is about a minute of speech. Here is what each plan unlocks, from the official [pricing page](https://elevenlabs.io/pricing) in October 2026." },
    { table: {
      head: ["Plan", "Price", "Credits per month", "What it unlocks"],
      rows: [
        ["Free", "$0", "10,000 (about 10 min)", "Text to speech, speech to text, sound effects, Voice Design, music. Personal use only."],
        ["Starter", "$6/mo ($5 yearly)", "30,000 (about 30 min)", "Commercial license, Instant Voice Cloning, dubbing without watermark."],
        ["Creator", "$22/mo ($18.33 yearly)", "121,000 (about 2 hours)", "Professional Voice Clone, 192 kbps audio."],
        ["Pro", "$99/mo ($82.50 yearly)", "600,000 (about 10 hours)", "Lossless WAV from Studio, 44.1 kHz PCM via API."],
      ],
    } },
    { p: "**Tip:** start on Free to learn the tools, but upgrade to at least Starter before you publish anything on a monetized channel or for a client, since free audio has no commercial license. Our [ElevenLabs review](/blog/elevenlabs-review) explains the higher Scale, Business and Enterprise tiers." },

    { h2: "Step 2: Generate your first voiceover" },
    { h3: "Prepare the script" },
    { p: "The AI reads exactly what you type, so a clean script saves the most credits. The [Text to Speech docs](https://elevenlabs.io/docs/creative-platform/playground/text-to-speech) recommend proofreading carefully and writing numbers and symbols out in words. Write \"twenty twenty-six\" or \"two thousand and twenty-six\" depending on how you want it said, \"forty percent\" instead of \"40%\", and spell out abbreviations you want read as words." },
    { h3: "Choose a voice" },
    { p: "Voice choice matters more than any setting. Click the voice picker and browse the Voice Library, which holds more than 10,000 voices you can filter by language, accent, age, gender and use case (narration, conversational, characters, news). Preview a few with your actual script, then add your favorite to My Voices. If nothing fits, Voice Design creates a new voice from a description such as `a calm female voice in her 30s, warm and slightly breathy, neutral American accent, podcast host`." },
    { h3: "Choose a model" },
    { p: "The model controls quality, emotion, languages and speed. Here is how the current options compare:" },
    { table: {
      head: ["Model", "Best for", "Languages", "Max characters per generation (API)"],
      rows: [
        ["Eleven v4", "Most expressive narration, characters, dialogue", "90+", "10,000 (about 10 min)"],
        ["Eleven v4 Turbo", "Voice agents and real-time apps", "90+", "10,000"],
        ["Eleven v3", "Expressive speech with audio tags", "70+", "5,000"],
        ["Multilingual v2", "Stable, neutral long-form narration", "29", "10,000"],
        ["Flash v2.5", "Lowest latency, cheapest API usage", "32", "40,000"],
      ],
    } },
    { p: "For most people, Eleven v4 is the right default. In the web app you can generate up to 10,000 characters at once with v4 and 5,000 with the others; for anything longer, use Studio (Step 5)." },
    { h3: "Adjust the voice settings" },
    { p: "Open the settings panel to fine-tune delivery. The docs suggest starting at Stability around 50, Similarity around 75 and Style exaggeration at 0, then changing one thing at a time." },
    { ul: [
      "**Stability:** lower values give a wider emotional range and more variation between takes; higher values sound more consistent and serious. Use 30 to 45 for storytelling and 60 to 80 for tutorials and corporate audio.",
      "**Similarity:** how closely the output sticks to the original voice. Very high values can copy noise from a poor sample.",
      "**Style exaggeration:** amplifies the speaker's style, but makes output less stable. Leave it at 0 unless a character needs it.",
      "**Speed:** 0.7 to 1.2, with 1.0 as the default.",
      "**Speaker Boost:** increases likeness to the original speaker at a small latency cost. Not available on Eleven v3.",
      "**Clone Strength:** appears when you use a Professional Voice Clone with Eleven v4. Start at 0% for most voices.",
      "**Audio effects:** add Filter, Noise, Space or Distance effects (for a phone call or a big hall) and preview before you generate.",
    ] },
    { h3: "Generate, compare and download" },
    { p: "Click **Generate speech**. You get two free regenerations if you keep the text, voice and model the same, do it within two hours and do not refresh the page, so use them to compare takes. Download MP3 at 128 kbps from the button at the bottom right, or open the history tab for WAV, and click **Advanced** for 192 or 256 kbps MP3, M4A or FLAC." },

    { h2: "Step 3: Direct the performance with audio tags" },
    { p: "Eleven v3 and v4 follow inline audio tags in square brackets, which is the biggest upgrade over older text to speech. Put the tag right before the words it should affect. Some examples from the [Eleven v3 and v4 prompting guide](https://elevenlabs.io/docs/best-practices/prompting/eleven-v3):" },
    { ul: [
      "**Emotion and delivery:** `[whispers] I was not supposed to find this.` or `[sighs] Fine. We will do it your way.`",
      "**Reactions:** `That is the worst pun I have ever heard. [laughs]`",
      "**Accent or style direction:** `[strong French accent] Welcome to the bakery.`",
      "**Sound effects:** `[applause]`, `[light rain]` or `[phone buzzing]` placed where the sound should happen.",
    ] },
    { p: "Tags work best when the delivery suits the voice you picked: a deep, calm narrator voice will not shout convincingly. Always test tags on your chosen voice before a long render." },
    { h3: "Pauses and pacing" },
    { p: "Eleven v3 and v4 do not support the old `<break time=\"1.0s\" />` tags. Use ellipses (...) for hesitation, commas and full stops for rhythm, capital letters for emphasis (\"this is REALLY important\"), and line breaks between ideas. Older models still accept break tags of up to 3 seconds, but too many in one generation can make the voice unstable." },
    { h3: "Pronunciation" },
    { p: "With Eleven v4, write tricky words in IPA between forward slashes, including stress marks. For names you repeat across a project, upload a pronunciation dictionary (a TXT or PLS file) in Studio or Dubbing. Matching is case-sensitive. A quick alternative is phonetic spelling, such as \"Nguyen (win)\" or \"Siobhan (shi-vawn)\"." },
    { h3: "Multi-speaker dialogue" },
    { p: "To create a conversation, label each line with a speaker name, assign a different voice to each speaker, and add tags line by line. Eleven v4 makes each reply react to the previous line, so short back-and-forth exchanges sound far more natural than stitching separate clips together." },

    { h2: "Step 4: Clone your voice" },
    { h3: "Instant Voice Clone (Starter and up)" },
    { ol: [
      "Record one to two minutes of yourself reading naturally in a quiet, non-echoey room. Longer than about three minutes adds little.",
      "Open **Voices** in the sidebar and click the plus icon.",
      "Choose **Instant Voice Clone**, then upload or record your audio (each file must be at least 5 seconds, and at least 10 seconds in total).",
      "Name the voice, add labels, confirm you have the right and consent to clone it, and click **Save voice**.",
      "Go to **My Voices**, click **Use voice**, and test it with a script in Text to Speech.",
    ] },
    { h3: "Professional Voice Clone (Creator and up)" },
    { p: "A professional clone trains a dedicated model and sounds much closer to you. Upload 30 minutes to three hours of clean audio, complete the voice verification step that proves the voice is yours, and wait. Fine-tuning usually takes three to six hours and can take up to 24 when the queue is long. You get a pop-up and an email when it is ready." },
    { h3: "Recording tips for a better clone" },
    { ul: [
      "**Record one speaker only,** with no music, reverb or background noise.",
      "**Stay consistent.** Same mic, distance, tone and energy across every sample. The clone copies everything, including breaths and mouth clicks.",
      "**Use MP3 at 192 kbps or higher.** The docs say uncompressed WAV usually does not improve results.",
      "**Aim for healthy levels,** roughly -23 to -18 dB RMS with peaks around -3 dB.",
      "**Read the way you want to sound.** Record in your narration voice if you plan to narrate, or your conversational voice for podcasts.",
    ] },
    { p: "Need to clean a sample first? Run it through [Adobe Podcast](/tools/adobe-podcast) Enhance Speech or ElevenLabs' own Voice Isolator, and compare options in our [best AI voice cloning tools](/blog/best-ai-voice-cloning-tools) guide." },

    { h2: "Step 5: Make audiobooks, podcasts and videos in Studio" },
    { p: "Studio is the editor for anything longer than a few minutes. Open **Studio** and choose how to start:" },
    { ul: [
      "**From a prompt:** describe the project and the Studio Agent builds a first draft.",
      "**From a file:** import EPUB (best for chapter detection), PDF, DOCX, TXT, HTML or a URL. Text opens in the audio layout, video files in the video layout.",
      "**Blank:** choose an Audio project for narration and audiobooks or a Video project for voiceovers with captions.",
      "**Podcast (GenFM):** turn a document into a two-host podcast episode. This needs a paid plan.",
    ] },
    { p: "Assign voices by selecting text and choosing a voice in the sidebar, so one chapter can include a narrator and several characters. Lock finished paragraphs, regenerate single words once a paragraph has audio, and add music or sound effect tracks. Export MP3 or WAV per chapter or for the whole book; Pro and above export 192 kbps MP3 or 44.1 kHz WAV, which audiobook platforms often require. If you are making a show, our guide to the [best AI podcast tools](/blog/best-ai-podcast-tools) covers recording and editing." },

    { h2: "Step 6: Dub a video into another language" },
    { ol: [
      "Open **Dubbing** in the sidebar.",
      "Upload a video or audio file (up to 2 GB and 180 minutes) or paste a YouTube or TikTok link.",
      "Pick one or more target languages from the 90+ available.",
      "Optionally adjust **Speaker similarity** (0 to 10, default 7). Higher keeps the voice closer; lower sounds more natural in the new language.",
      "Confirm the cost, generate, and download the finished dub.",
    ] },
    { p: "Free plan dubs are watermarked, and dubbing does not include lip sync, so on-camera speakers will not match mouth movements. Read the [dubbing docs](https://elevenlabs.io/docs/creative-platform/products/dubbing) for formats, and see our [best AI video translators](/blog/best-ai-video-translators) if you need lip sync." },

    { h2: "Step 7: Add sound effects and music" },
    { p: "**Sound Effects** turns a prompt into a clip, for example `heavy wooden door creaking open in a stone castle, echo` or `UI click, soft, modern, short`. Each generation costs about 200 credits. **Music** generates songs or instrumental beds from a prompt like `upbeat lo-fi hip hop for a study vlog, no vocals, 90 seconds`, at about 900 credits per minute. Music is free to try for personal use, and commercial use starts on Starter. For full songs with vocals and deeper editing, compare it with [Suno](/tools/suno) in our [Suno review](/blog/suno-review)." },

    { h2: "Step 8: Transcribe, isolate and change voices" },
    { ul: [
      "**Speech to Text (Scribe v2):** upload audio or video for a transcript with speaker labels and timestamps in 90+ languages, about 330 credits per minute.",
      "**Voice Isolator:** strips background noise from dialogue, about 1,000 credits per minute.",
      "**Voice Changer:** record your own performance, then swap in another voice while keeping your timing and emotion. It is often the best way to get natural acting from a synthetic voice.",
    ] },

    { h2: "Step 9: Use the ElevenLabs API" },
    { ol: [
      "Open your account settings and create an API key. Keep it secret and store it in an environment variable.",
      "Install the official SDK with `pip install elevenlabs` (Python) or `npm install @elevenlabs/elevenlabs-js` (TypeScript).",
      "Copy a voice ID from My Voices or the Voice Library.",
      "Call text to speech with `model_id` set to `eleven_v4`, or `eleven_v4_turbo` for real-time apps, and save the returned audio.",
      "For raw HTTP, send a POST request to `/v1/text-to-speech/{voice_id}` with your key in the `xi-api-key` header.",
    ] },
    { p: "API usage draws from the same credits as the web app. If you want a voice agent rather than files, ElevenAgents adds a visual builder, knowledge bases and phone connections, and our guide on [how to build an AI agent with n8n](/blog/how-to-build-an-ai-agent-with-n8n) shows how to wire voice into wider automations." },

    { h2: "Common mistakes to avoid" },
    { ul: [
      "**Publishing free-plan audio.** It has no commercial license. Upgrade first.",
      "**Generating a whole script before testing.** Test one paragraph with your voice and settings, then render the rest.",
      "**Using break tags on v4.** They are ignored. Use punctuation and audio tags.",
      "**Cloning from noisy audio.** The clone reproduces the noise. Clean the sample first.",
      "**Overloading tags.** Three tags in one sentence confuse the model. Use one per idea.",
      "**Downgrading with a big credit balance.** Unused credits are forfeited when you downgrade or cancel.",
    ] },

    { h2: "Troubleshooting" },
    { ul: [
      "**The voice sounds flat:** lower Stability, switch to Eleven v4, and add an emotion tag.",
      "**The voice drifts or changes mid-script:** raise Stability, shorten paragraphs, and use one consistent voice and model.",
      "**Wrong pronunciation:** use IPA between slashes on v4, a pronunciation dictionary, or phonetic spelling.",
      "**A tag is read aloud:** keep tags short and describe delivery clearly, for example `[whispers]` rather than a long sentence.",
      "**\"No model found for this voice\":** your Professional Voice Clone is still fine-tuning. Check its status in My Voices.",
      "**An old clone sounds off on v4:** re-test it, and consider re-creating it, since some clones made before v4 benefit from retraining.",
    ] },

    { h2: "FAQ" },
    { h3: "How do I use ElevenLabs for free?" },
    { p: "Create a free account and you get 10,000 credits a month, about 10 minutes of speech, plus sound effects, Voice Design, music and transcription. You can use any Voice Library voice. Free audio is for personal use only, voice cloning is not included, and dubs are watermarked, so upgrade to Starter for commercial projects." },
    { h3: "Is ElevenLabs easy to use for beginners?" },
    { p: "Yes. Text to Speech works like a text box: paste, pick a voice, click Generate. Beginners should start with Eleven v4, a Voice Library voice and the default settings, then learn audio tags and Studio once the basics feel natural. Most people produce a usable voiceover in their first session." },
    { h3: "How long does it take to clone a voice on ElevenLabs?" },
    { p: "An Instant Voice Clone is ready within moments of uploading one to two minutes of audio. A Professional Voice Clone needs 30 minutes to three hours of audio and a verification step, then usually three to six hours of fine-tuning, occasionally up to 24 hours when the queue is busy." },
    { h3: "Can I use ElevenLabs for YouTube videos?" },
    { p: "Yes, on a paid plan. Starter and above include a commercial license, so you can monetize videos that use ElevenLabs voices. Many faceless channels use a Voice Library voice or their own clone. Our guide on [how to make faceless YouTube videos with AI](/blog/how-to-make-faceless-youtube-videos-with-ai) shows the full workflow." },
    { h3: "What are ElevenLabs audio tags?" },
    { p: "Audio tags are instructions in square brackets, such as [whispers], [laughs], [sighs] or [applause], that tell Eleven v3 and v4 how to deliver a line or which sound to add. Place a tag right before the words it affects, keep it short, and test it with your chosen voice." },
    { h3: "How many characters can ElevenLabs generate at once?" },
    { p: "In the web app, up to 10,000 characters per generation with Eleven v4 and 5,000 with other models. Through the API, Flash v2.5 accepts up to 40,000 characters. For audiobooks and other long content, Studio splits text into chapters and paragraphs automatically." },

    { h2: "Bottom line" },
    { p: "Learning how to use ElevenLabs takes an afternoon. Start with Text to Speech, Eleven v4 and a Voice Library voice; learn audio tags to direct the delivery; clone your voice once you know what you need; and move to Studio for anything long. Test small, keep your scripts clean, and you will spend credits on keepers rather than retakes." },

    { hr: true },
    { p: "Find more voice, music and transcription tools in the [AI audio tools category](/categories/audio), or compare voice platforms in our [best AI text-to-speech tools](/blog/best-ai-text-to-speech-tools) roundup. Built an audio tool we should feature? [Submit it for a listing](/submit)." },
  ],
};

export default post;
