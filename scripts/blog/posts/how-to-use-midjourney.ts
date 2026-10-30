import type { Post } from "../types";

const post: Post = {
  slug: "how-to-use-midjourney",
  title: "How to Use Midjourney (2026): A Beginner's Guide to V8.2, Prompts and Parameters",
  excerpt:
    "A step-by-step beginner's guide to Midjourney in 2026: signing up on the web app, choosing a plan, writing your first prompt, the parameters that matter, style references, personalization, draft mode, the V8.2 editor, upscaling and turning images into video.",
  seoTitle: "How to Use Midjourney in 2026: Step-by-Step Beginner Guide",
  seoDescription:
    "Learn how to use Midjourney in 2026: sign up, pick a plan, write prompts, master --ar, --stylize, --sref and --p, edit with V8.2 and make video. With examples.",
  metaKeywords:
    "how to use midjourney, midjourney tutorial, midjourney for beginners, midjourney prompts, midjourney parameters, midjourney v8, midjourney web app, midjourney sref, midjourney personalization, midjourney draft mode, midjourney video, midjourney editor",
  categories: ["guides"],
  body: [
    { p: "**Quick answer:** to use Midjourney, go to midjourney.com, sign in with a Google or Discord account, subscribe to a plan (from $10/mo, there is no free tier), then type a description of the image you want into the prompt bar at the top of the Create page and press Enter. Midjourney returns a grid of images. From there you vary, upscale, edit or animate the ones you like, and add parameters such as --ar 16:9 to control the result." },
    { p: "This guide walks through how to use Midjourney step by step in 2026, from your first prompt to the V8.2 editor, style references, personalization, draft mode and video. Midjourney changed a lot this year: V8 arrived in March, V8.1 became the default in June, and V8.2 has been the default since July 24, 2026. The steps below follow Midjourney's official documentation and release notes as of October 2026. If a button label differs, look for the same word nearby." },
    { logos: ["midjourney"] },

    { h2: "How to use Midjourney in 60 seconds: the quick steps" },
    { ol: [
      "**Sign up** at midjourney.com with Google or Discord.",
      "**Subscribe:** Basic at $10/mo is enough to learn. Standard at $30/mo adds unlimited Relax mode.",
      "**Open Create** and type a prompt describing subject, setting, style and light.",
      "**Add parameters** at the end, for example --ar 3:2 --stylize 150.",
      "**Pick a favorite** from the results, then Vary, Upscale or Edit it.",
      "**Lock in a look** with style references (--sref) or your personalization profile (--p).",
      "**Download** the final image, or click Animate to turn it into a short video.",
    ] },

    { h2: "What changed in Midjourney in 2026" },
    { p: "If you learned from an older tutorial, a few things are different. **V8.2 is the default model**: faster, better at long prompts and short quoted text, with native 2K output in HD mode, and your V7 profiles and style codes still work. **The web app is now the main interface**, with Discord optional. **A new edit model** edits images from plain instructions with up to four reference images, replacing omni-reference. **Draft mode** makes 24 quick images at half the cost, and **video** animates any image." },

    { h2: "Step 1: Create your Midjourney account" },
    { ol: [
      "Go to [midjourney.com](https://www.midjourney.com) and click **Sign Up**.",
      "Choose to continue with a **Google** or **Discord** account. You do not need Discord to use Midjourney anymore, but linking it lets you use the Discord bot too.",
      "Accept the terms and finish any verification steps the site asks for.",
      "You land on **Explore**, a feed of community images whose prompts you can copy.",
    ] },

    { h2: "Step 2: Choose a Midjourney plan" },
    { p: "Midjourney has no free plan or free trial in 2026, so you need a subscription before you can generate. Plans differ mainly in how much Fast GPU time you get, whether you get unlimited Relax mode, and whether you can keep images private. See the official [plan comparison](https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans) for current details." },
    { table: {
      head: ["Plan", "Monthly", "Billed yearly", "Fast GPU time", "Relax mode", "Stealth (private)"],
      rows: [
        ["Basic", "$10", "$8/mo", "About 3.3 hours", "No", "No"],
        ["Standard", "$30", "$24/mo", "15 hours", "Unlimited images", "No"],
        ["Pro", "$60", "$48/mo", "30 hours", "Unlimited images, SD video", "Yes"],
        ["Mega", "$120", "$96/mo", "60 hours", "Unlimited images, SD video", "Yes"],
      ],
    } },
    { p: "Prices as of October 2026. **Fast mode** uses your monthly GPU hours and returns images in seconds. **Relax mode** queues your jobs and does not use hours, which is why Standard is the sweet spot for most people who generate often. Unused Fast hours do not roll over, and HD jobs cost more GPU time than standard ones." },
    { p: "**Tip:** learn on monthly Basic, then upgrade to Standard rather than buying extra Fast time." },

    { h2: "Step 3: Find your way around the web app" },
    { p: "**Explore** is the community feed, great for ideas and copying prompts. **Create** is where you type prompts and see results; the settings panel beside the prompt bar sets aspect ratio, stylization, speed and version so you do not have to memorize parameters. **Edit** is the editor. **Organize** holds your archive and folders, which can now be shared. **Personalize** and **Styles** are where you build profiles and moodboards and browse style codes." },

    { h2: "Step 4: Write your first prompt" },
    { ol: [
      "Click into the prompt bar at the top of the **Create** page that says something like \"What will you imagine?\"",
      "Type a plain description of the image. Start with the subject, then add the setting, style, lighting and mood.",
      "Optionally open the settings panel and pick an aspect ratio, or type it at the end of your prompt.",
      "Press **Enter**. Midjourney generates a set of images in a few seconds in Fast mode.",
      "Hover over an image and click it to open it larger and see your options.",
    ] },
    { p: "Try this as your first prompt:" },
    { quote: "a cozy bookshop on a rainy evening, warm light spilling onto a wet cobblestone street, a cat sleeping in the window, watercolor illustration --ar 3:2" },
    { p: "V8 rewards specific, descriptive sentences. Skip magic words like \"8k, masterpiece\" and write like you are briefing a photographer." },

    { h2: "Step 5: Vary, upscale, rerun and download" },
    { p: "When you open an image, you get several actions. Labels shift between updates, but the main ones are:" },
    { ul: [
      "**Vary (Subtle or Strong):** new versions of that image. Subtle keeps the composition, Strong explores further.",
      "**Upscale or Run as HD:** enlarges the image, or rerenders a standard job at native 2K.",
      "**Rerun, Use prompt, Use image, Use style:** run again, or reuse the prompt, image or style in your next prompt.",
      "**Edit, Animate, Download:** open the editor (Step 9), make a video (Step 10), or save the full-resolution file.",
    ] },
    { p: "If you need print-size files, see our list of the [best AI image upscalers](/blog/best-ai-image-upscalers) for tools that go beyond Midjourney's built-in upscale." },

    { h2: "Step 6: Learn the Midjourney parameters that matter" },
    { p: "Parameters go at the **end** of your prompt, each starting with two hyphens. You can also set most of them with the settings panel, which adds them for you. These are the ones beginners actually need:" },
    { table: {
      head: ["Parameter", "What it does", "Example"],
      rows: [
        ["--ar", "Aspect ratio. Default is 1:1.", "--ar 16:9 for YouTube, --ar 9:16 for Stories, --ar 4:5 for Instagram"],
        ["--stylize or --s", "How strongly Midjourney applies its own aesthetic, from 0 to 1000. Default 100.", "--s 50 for literal results, --s 500 for artistic"],
        ["--chaos or --c", "How different the images in one job are from each other, 0 to 100.", "--c 30 to explore ideas"],
        ["--raw", "Reduces Midjourney's default beautification for a plainer, more photographic look.", "--raw"],
        ["--no", "Tells the model what to leave out.", "--no text, people"],
        ["--v and --niji", "Chooses the model version. V8.2 is the default; Niji 7 is the anime model.", "--v 8.2 or --niji 7"],
        ["--hd", "Renders natively at 2K on V8 models. Costs more GPU time.", "--hd"],
        ["--draft", "Draft mode: 24 quick low-resolution images.", "--draft"],
        ["--sref", "Style reference: a style code or image URL whose look you want.", "--sref 1234567890 or --sref random"],
        ["--sw", "Style reference strength, 0 to 1000. Default 100.", "--sw 300"],
        ["--p", "Applies your personalization profile or moodboard.", "--p or --p yourprofilecode"],
        ["--seed", "Reuses a starting noise value so you can compare small prompt changes.", "--seed 42"],
      ],
    } },
    { p: "**What about --cref and --oref?** Character reference (--cref) was a V6 feature, and omni-reference (--oref) replaced it in V7. On V8.2, Midjourney's new edit model takes over that job: you attach up to four images to the prompt and describe what to do with them. If you follow an older tutorial that uses --cref, use image references in the V8.2 prompt bar instead." },

    { h2: "Step 7: Get a consistent look with style references and personalization" },
    { h3: "Style references (--sref)" },
    { p: "A style reference copies the look of an image (colors, textures, lighting, medium) without copying its content. Drag an image onto the prompt bar and choose to use it as a style reference, or paste a style code after --sref. Add --sref random to discover new styles, and in draft mode it gives you 24 images in 24 different styles." },
    { h3: "Personalization (--p) and moodboards" },
    { p: "Personalization teaches Midjourney your taste. On the Personalize page, you rate pairs of images by picking the one you prefer. Once you have rated enough, Midjourney unlocks a profile, and the more you rate the more stable it gets. Turn it on with the personalization toggle or add --p. A moodboard works similarly but uses images you upload. V8.2 improved personalization, so retry older profiles." },
    { p: "Combine them: a strong pattern is a short, specific prompt + your --p profile + one --sref code, with --stylize between 100 and 400." },

    { h2: "Step 8: Explore fast with draft mode" },
    { p: "[Draft mode](https://updates.midjourney.com/draft-mode-for-v8-1-and-new-feature-previews/) is the best way to save GPU hours. Click the lightning icon in the prompt bar or add --draft. Each draft job on V8.1 or V8.2 creates 24 lower-resolution images and uses half the GPU time of a standard job. When you see one you like, click **Vary** (or **Enhance** where shown) to render it at full quality." },
    { h2: "Step 9: Edit images with the V8.2 editor" },
    { p: "The [V8.2 edit model](https://updates.midjourney.com/edit-model-for-v8/) lets you change an image with words instead of re-rolling the whole thing. Drag an image into the prompt bar, click **Edit** on any image, or open the **Edit** tab and upload one." },
    { ol: [
      "Open an image in the editor.",
      "Type an instruction, for example \"make it nighttime with neon reflections on the street\" or \"replace the cat with a sleeping golden retriever\".",
      "To change only one area, paint over it (inpainting). Only the selected pixels change, so repeated edits do not lose quality.",
      "To extend the scene, enlarge the canvas (outpainting) and describe what should fill the new space.",
      "Attach up to four reference images when you want to bring in a specific product, outfit or character.",
    ] },
    { p: "Edits keep the base image's aspect ratio, so a stray --ar in the prompt will not stretch your result." },

    { h2: "Step 10: Turn images into video" },
    { p: "Open any image and click **Animate**. Choose **Auto** to let Midjourney decide the motion, or **Manual** to write a motion prompt such as \"slow dolly forward, rain falling\". Low motion suits subtle scenes; high motion suits action but is less stable." },
    { ul: [
      "Each clip is five seconds. Use **Extend** to add more, up to about 21 seconds in total.",
      "Use **Loop** to make the last frame match the first, which is ideal for backgrounds.",
      "You can set a start frame and an end frame for more control.",
      "Video uses much more GPU time than images. HD video needs Standard or above in Fast mode, and Relax video is on Pro and Mega.",
    ] },
    { p: "For longer clips with sound, compare dedicated tools in our guide to the [best AI video generators](/blog/best-ai-video-generators)." },

    { h2: "A simple Midjourney prompt formula, with examples" },
    { p: "Use this structure: **subject + action or detail + setting + style or medium + lighting and mood + composition + parameters.** Not every prompt needs every part, but going in this order keeps prompts clear." },
    { ul: [
      "**Product photo:** \"a matte black ceramic coffee mug on a walnut desk beside a notebook, soft morning window light, shallow depth of field, clean commercial product photography --ar 4:5 --raw --s 75\"",
      "**Portrait:** \"portrait of an elderly fisherman with a weathered face and a knitted cap, harbor at dawn behind him, overcast light, 85mm photo, muted colors --ar 2:3\"",
      "**Illustration:** \"a fox reading a map in an autumn forest, children's book illustration, gouache texture, warm palette --ar 3:2 --s 400\"",
      "**Concept art:** \"a floating market city above the clouds, hot air balloons tied to wooden piers, golden hour, epic wide shot, matte painting --ar 21:9 --c 25\"",
      "**Short text:** \"a vintage enamel sign that says \\\"OPEN LATE\\\" on a brick wall, neon glow, night street --ar 16:9\"",
    ] },
    { p: "Put any words you want rendered in quotation marks and keep them short. For text-heavy designs like posters and logos, a tool like Ideogram is more reliable; see our [Midjourney vs Ideogram vs FLUX comparison](/blog/midjourney-vs-ideogram-vs-flux)." },

    { h2: "Common Midjourney mistakes beginners make" },
    { ul: [
      "**Prompting with keyword soup.** V8 understands full sentences. \"Trending on ArtStation, 8k, ultra detailed\" adds little.",
      "**Cranking --stylize too high.** High values make images beautiful but less faithful. Lower it if Midjourney ignores parts of your prompt.",
      "**Changing five things at once.** Change one thing at a time and use --seed to compare.",
      "**Burning Fast hours on exploration.** Use draft mode and SD resolution first, and save HD for finals.",
      "**Forgetting images are public.** On Basic and Standard, your images appear in the gallery. Use Stealth Mode on Pro or Mega for client work.",
      "**Regenerating instead of editing.** If one area is wrong, fix it in the editor rather than rerolling the whole image.",
    ] },

    { h2: "Troubleshooting" },
    { ul: [
      "**Midjourney ignores part of the prompt:** move the important element to the start, lower --stylize, or add --raw.",
      "**Faces or hands look off:** use Vary Subtle, or paint over the area in the editor and regenerate it.",
      "**Your image looks too generic:** add a style reference, raise --stylize, or turn on personalization.",
      "**A parameter does nothing:** check that it is supported on your model version; some older parameters only work on V7 or V6.",
      "**Your prompt gets rejected:** moderation blocks some words. Rephrase it.",
    ] },

    { h2: "Commercial use and privacy" },
    { p: "Paid subscribers can use their Midjourney images commercially. If your company earns more than $1 million a year in gross revenue, you need the Pro or Mega plan. Images are public in the gallery unless you use Stealth Mode, available on Pro and Mega. In the US, purely AI-generated images generally cannot be registered for copyright, so if you need protected brand assets, involve a designer and read our guide to the [best AI logo generators](/blog/best-ai-logo-generators)." },

    { h2: "FAQ" },
    { h3: "Is Midjourney free to use?" },
    { p: "No. Midjourney has no free plan or free trial in 2026. The cheapest option is the Basic plan at $10 a month, or $8 a month billed yearly, which includes about 3.3 hours of Fast GPU time. If you want free options first, our guide to the [best free AI image generators](/blog/best-free-ai-image-generators) covers alternatives with real free tiers." },
    { h3: "Do I need Discord to use Midjourney?" },
    { p: "No. You can sign up and generate entirely on the midjourney.com web app using a Google account. Discord is optional. If you link a Discord account, you can also use the /imagine command in Midjourney's server or in your own server, but new features usually appear on the website first, so most beginners should start there." },
    { h3: "How do I use Midjourney on the website?" },
    { p: "Sign in at midjourney.com, subscribe to a plan, and open the Create page. Type your description into the prompt bar at the top and press Enter. Your images appear in the feed below. Click an image to vary, upscale, edit, animate or download it, and use the settings panel to change aspect ratio, stylization and speed." },
    { h3: "What is the best Midjourney version to use?" },
    { p: "Use the default, V8.2, for almost everything. It has the best aesthetics, prompt understanding and personalization, and it renders native 2K images in HD mode. Use Niji 7 with --niji 7 for anime and illustration styles. Older versions such as V7 are still available if an old prompt or workflow depends on them." },
    { h3: "How do I keep a character consistent in Midjourney?" },
    { p: "On V8.2, attach one or more images of your character to the prompt and describe the new scene, or open the image in the editor and give instructions. The edit model accepts up to four reference images. Keep the description of the character identical across prompts, and use the same style reference and personalization profile so the look stays stable." },
    { h3: "What does --stylize do in Midjourney?" },
    { p: "--stylize, or --s, controls how strongly Midjourney applies its own artistic taste. The range is 0 to 1000 and the default is 100. Low values follow your prompt more literally and look plainer. High values look more artistic and polished but may drift from what you asked for. Most people work between 50 and 400." },
    { h3: "Can I use Midjourney images commercially?" },
    { p: "Yes, on any paid plan, with one condition: companies with more than $1 million in gross annual revenue must subscribe to Pro or Mega. Your images are public unless you use Stealth Mode on Pro or Mega. Check Midjourney's current terms of service before using images in products, ads or client work." },

    { h2: "Bottom line" },
    { p: "Learning how to use Midjourney takes an afternoon. Sign up on the web app, start on Basic or Standard, write descriptive prompts, and learn five parameters first: --ar, --stylize, --chaos, --sref and --p. Use draft mode to explore cheaply, the V8.2 editor to fix details instead of rerolling, and Animate when you want motion. If you are still deciding whether Midjourney is the right tool, compare it with alternatives in our [Freepik AI vs Midjourney vs Leonardo AI](/blog/freepik-ai-vs-midjourney-vs-leonardo-ai) breakdown." },

    { hr: true },
    { p: "Find more image generators, editors and upscalers in our [AI image tools category](/categories/image). If you build an AI tool we have missed, you can [submit it for a listing](/submit)." },
  ],
};

export default post;
