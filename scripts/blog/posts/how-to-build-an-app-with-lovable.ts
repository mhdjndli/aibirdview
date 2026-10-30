import type { Post } from "../types";

const post: Post = {
  slug: "how-to-build-an-app-with-lovable",
  title: "How to Build an App with Lovable (2026): Step-by-Step Guide",
  excerpt:
    "A start-to-finish tutorial for building a real web app with Lovable: plan it, write the first prompt, add logins and a database with Lovable Cloud, build features one at a time, test, publish to a custom domain and connect GitHub, with example prompts and credit-saving tips.",
  seoTitle: "How to Build an App with Lovable (2026): Step-by-Step",
  seoDescription:
    "Learn how to build an app with Lovable step by step: example prompts, Plan mode, logins and data with Lovable Cloud, testing, publishing and credit-saving tips.",
  metaKeywords:
    "how to build an app with lovable, lovable tutorial, how to use lovable, lovable app builder tutorial, lovable for beginners, lovable prompts, lovable cloud tutorial, lovable custom domain, lovable plan mode, build an app with ai, lovable step by step, vibe coding tutorial",
  categories: ["guides"],
  body: [
    { p: "**Quick answer: how to build an app with Lovable.** Sign up at lovable.dev, write down what your app does and who uses it, then use Plan mode to agree on a plan before anything is built. Send one clear first prompt describing the pages, users and data, let Lovable Cloud add the database and logins, then add features one prompt at a time, checking the preview after each. When it works, click **Publish** to get a live lovable.app address, and connect a custom domain on a paid plan." },
    { p: "[Lovable](/tools/lovable) is an AI app builder that writes full-stack web apps from chat, with a built-in backend for data, user accounts and file storage. This tutorial walks through a real example, a class booking app for a small fitness studio, from blank page to published app. It follows Lovable's official documentation as of October 2026 and adds the habits that save the most credits. Lovable ships changes weekly, so if a button looks different on your screen, check the [Lovable docs](https://docs.lovable.dev/introduction/getting-started)." },

    { logos: ["lovable"] },

    { h2: "Building an app with Lovable in 60 seconds" },
    { ul: [
      "**Cost:** the free plan gives 5 build credits a day (up to 30 a month); Pro starts at $25/mo for 100 monthly credits plus daily credits.",
      "**Typical credit cost:** small edits cost under 1 credit; adding authentication is about 1.2; a landing page with images about 2.",
      "**Three modes:** Chat mode to discuss, Plan mode to approve a plan (1 credit per message), Build mode to make changes.",
      "**Backend:** Lovable Cloud adds a database, logins, storage and server functions automatically when your app needs them.",
      "**Undo button:** every change is saved as a version you can restore from history.",
      "**Best habit:** one change per prompt, then test it in the preview.",
    ] },

    { h2: "What you need before you start" },
    { table: {
      head: ["Requirement", "Details"],
      rows: [
        ["**Account**", "A free Lovable account (email, Google, GitHub or Apple sign-in)"],
        ["**Plan**", "Free works for a small app over a few days. Pro ($25/mo) adds custom domains, code editing and more credits"],
        ["**A one-page spec**", "Who uses the app, what they do, which pages exist, what data you store"],
        ["**Optional**", "A screenshot of a design you like, a domain name, a GitHub account, a Stripe account for payments"],
        ["**Time**", "An hour or two for a first working version of a simple app"],
      ],
    } },

    { h2: "Step 1: Define your app before you prompt" },
    { p: "The single biggest cause of wasted credits is starting with a vague idea. Spend ten minutes writing a short spec. Lovable's own prompting guide recommends defining the product, its audience, its purpose and the one key action a user takes." },
    { p: "For our example, the spec looks like this:" },
    { ul: [
      "**Product:** a class booking app for a small fitness studio called Northside Yoga.",
      "**Users:** members, who book classes, and admins, who manage the schedule.",
      "**Key action:** a member books a spot in a class.",
      "**Pages:** landing page, sign up and log in, weekly schedule, my bookings, admin dashboard.",
      "**Data:** classes (title, instructor, start time, duration, capacity) and bookings (member, class, status).",
      "**Rules:** a class cannot be booked past capacity; members can cancel up to 2 hours before start.",
    ] },
    { p: "Keep version one small. Payments, reminders and waitlists can come later." },

    { h2: "Step 2: Create your project" },
    { ol: [
      "Go to lovable.dev and sign up. The free plan opens a personal workspace and a dashboard ready to build.",
      "Find the prompt box labeled **Ask Lovable to create…** with **Build** selected in the mode picker. Switch it to **Plan** for now.",
      "If you have a design you like, attach a screenshot as a visual reference. You can also remix a template or start from an existing URL.",
    ] },

    { h2: "Step 3: Plan with Plan mode first" },
    { p: "Plan mode investigates and writes a plan you can edit and approve before any code is written. It costs 1 credit per message, far less than rebuilding a wrong first version. Paste your spec and ask for questions:" },
    { quote: "I want to build a class booking app for a small yoga studio called Northside Yoga. Members sign up, see this week's class schedule, book or cancel a spot, and see their upcoming bookings. Admins create classes with a title, instructor, start time, duration and capacity, and see who booked each one. Classes cannot be overbooked, and members can cancel up to 2 hours before start. Ask me clarifying questions before you write the plan." },
    { p: "Lovable will ask about things you had not considered, such as whether members can book recurring classes or what happens when a class is full. Answer them, read the plan, edit anything wrong, then approve it. If you only want to think out loud without a plan, use **Chat mode**, which never touches code." },

    { h2: "Step 4: Build the first version" },
    { p: "Approve the plan, or switch to **Build** mode and send a first prompt like this one. Notice the specific UI terms, real copy and style words, which Lovable's guide recommends over vague requests:" },
    { quote: "Build version one from the plan. Style: calm and organic, soft greens and warm neutrals, rounded cards, plenty of white space. Landing page headline: \"Find your next class at Northside Yoga.\" The schedule page shows the week as cards grouped by day, each with title, instructor, time and a badge for spots left. Include sign up and log in. Use real sample classes, not placeholder text." },
    { p: "The editor splits in two: the project chat on the left and a live preview on the right. Because this app needs accounts and stored data, Lovable switches on **Lovable Cloud** (it is enabled by default, and the **Enable Cloud** permission is set to Always allow unless you change it). Let it finish, then click through the preview before asking for anything else." },

    { h2: "Step 5: Save your project instructions" },
    { p: "Instructions (formerly called Knowledge) are persistent rules Lovable reads on every message, so you stop repeating yourself. Open **Project settings → Instructions** and add short bullets, up to 10,000 characters:" },
    { ul: [
      "`App: class booking for Northside Yoga. Roles: member, admin.`",
      "`Style: calm and organic, soft greens, rounded cards. Keep existing styling unless asked.`",
      "`Rules: never allow bookings past capacity. Cancellation cutoff is 2 hours before start.`",
      "`Never change the admin dashboard when editing member pages.`",
    ] },
    { p: "Teams can also set workspace instructions for shared rules, and Lovable reads `AGENTS.md` or `CLAUDE.md` files in a connected repo." },

    { h2: "Step 6: Set up logins and the database with Lovable Cloud" },
    { p: "Open the **Cloud** area from the More menu to see what Lovable created. According to the [Lovable Cloud docs](https://docs.lovable.dev/features/cloud), you will find **Database** (tables and records), **Users** (sign-ups and sign-in methods), **Storage**, **Edge functions**, **Jobs**, **Secrets**, **Logs** and **Usage**." },
    { ol: [
      "Check **Database** for a classes table and a bookings table with the fields from your spec. If something is missing, ask: `Add a capacity column to classes and show spots left on each card.`",
      "Open **Users** to choose sign-in methods. Email is the default; ask Lovable to add Google sign-in if you want it.",
      "Create roles with a prompt: `Add an admin role. Only admins can see the admin dashboard and create or edit classes. Make my account an admin.`",
      "Ask for data rules in plain language: `Members can only see and cancel their own bookings.`",
    ] },
    { p: "Two decisions to make now. The Cloud region (Americas, Europe or Asia Pacific) cannot be changed after the backend is enabled. And if you want direct control of your database, Lovable can create a Supabase project for you or connect your own; moving off Cloud later is a manual migration." },

    { h2: "Step 7: Add features one prompt at a time" },
    { p: "Each prompt layers on top of existing code, so small, bounded requests work best. State what to build, where, and what must stay untouched:" },
    { ol: [
      "`On the schedule page, add a Book button to each class card. If the class is full, show a disabled Full badge instead. Change only the schedule page.`",
      "`Create a My bookings page listing upcoming bookings with a Cancel button. Hide Cancel within 2 hours of start time.`",
      "`On the admin dashboard, add a form to create a class and a table of classes with booked count and a list of members for each.`",
      "`Add a status filter (upcoming, past, cancelled) to the bookings table. Keep the current styling.`",
    ] },
    { p: "For bigger, unfamiliar features, go back to Plan mode first. For large jobs you want finished without interruptions, the `/goal` command keeps Lovable working for up to 10 hours, but it costs noticeably more. Check-ins pause any single message that crosses 20 credits by default, so nothing runs away silently." },

    { h2: "Step 8: Polish the design with visual edits" },
    { p: "Do not spend prompts on tiny tweaks. Use the preview toolbar to select an element and describe the change, or choose **Edit text inline** and type directly on the page. Then switch the device toggle to **Mobile view**, because most of your members will book from a phone. A prompt such as `On mobile, stack the class cards in one column and make the Book button full width` fixes most layout issues." },

    { h2: "Step 9: Add payments and integrations" },
    { p: "When the core flow works, connect outside services. Ask Lovable to add Stripe checkout for class packs, and it will guide you through adding your keys. Store any API key in **Secrets**, never in a prompt or in the code. Lovable's connectors cover services such as Klaviyo and Loops for email, WhatsApp Business, Zendesk and n8n. For email reminders, a prompt like `Send members a reminder email 24 hours before each booked class` uses a scheduled job." },

    { h2: "Step 10: Test like a real user" },
    { ol: [
      "**Click everything** in the preview: sign up as a new member, book, cancel, then log in as an admin.",
      "**Try to break the rules:** book a full class, cancel 30 minutes before start, open the admin URL as a member.",
      "**Let Lovable test too.** It can sign in to test pages behind your login, and it writes and runs tests when you change rules such as prices or permissions.",
      "**Run a security scan** from the project's Security view. Quick and deep scans flag issues like loose data access, though Lovable notes they are not a full audit.",
    ] },

    { h2: "Step 11: Use versions and Drafts as your safety net" },
    { p: "Every change is saved as a version you can restore from history. Bookmark milestones that work, such as \"booking flow done\". Before a risky redesign, create a **Draft**, a separate copy of the project where you can experiment and compare plan revisions without touching the main version. One limit: you cannot enable Cloud from inside a draft, so set up the backend in the main version first." },

    { h2: "Step 12: Publish and connect a custom domain" },
    { ol: [
      "Click **Publish** in the top right. Edit the suggested lovable.app address if you like, then deploy.",
      "Your live site is a snapshot. After later edits, click **Publish → Publish changes** to update it.",
      "On a paid plan, open **Project → Settings → Domains** and choose **Connect domain** for a domain you own, or **Buy new domain** to purchase one through Lovable.",
      "For a domain from another registrar, add an A record pointing to `185.158.133.1` and a TXT record on `_lovable` with the `lovable_verify=` value Lovable shows. Remove any AAAA records first.",
      "Wait for the status to show **Live**. Most domains connect within a few hours, though DNS can take up to 72.",
    ] },
    { p: "The full steps, including the Cloudflare CNAME option, are in Lovable's [custom domain guide](https://docs.lovable.dev/features/custom-domain)." },

    { h2: "Step 13: Connect GitHub and plan what comes next" },
    { p: "Connect Git sync to GitHub, GitLab or Bitbucket from your project settings. It is available on every plan, and every change in Lovable is committed to your repo, so you always own the code. When the app grows beyond what chat can comfortably manage, a developer can open the same repo in an AI editor." },
    { shot: "cursor", caption: "Once your Lovable app is synced to GitHub, a developer can keep building in an editor like Cursor." },
    { p: "Many teams keep prompting in Lovable for UI changes while a developer uses [Cursor](/tools/cursor) or [Claude Code](/tools/claude-code) for complex logic. Coordinate so you are not editing the same files from both sides at once. Our guide on [how to use Claude Code](/blog/how-to-use-claude-code) covers that next step." },

    { h2: "Common mistakes and how to avoid them" },
    { ul: [
      "**Prompting the whole app at once.** Huge prompts produce half-finished features. Build by component.",
      "**Asking for the same fix five times.** Each retry costs credits and can make things worse. Restore the last working version and describe the problem differently.",
      "**Vague language.** \"Make it better\" wastes a prompt. Name the element, the change and the boundary.",
      "**Placeholder text.** Real copy reveals layout problems early.",
      "**Skipping security.** Ask \"who can read this data?\" for every table before launch.",
      "**Ignoring the region setting.** Pick the Cloud region closest to your users before enabling the backend.",
    ] },

    { h2: "Troubleshooting" },
    { table: {
      head: ["Problem", "What to do"],
      rows: [
        ["Preview shows an error after a change", "Ask Lovable to fix that specific error once. If it fails again, restore the previous version"],
        ["A feature broke something unrelated", "Restore from history, then re-prompt with \"change only X, keep Y untouched\""],
        ["Credits running out fast", "Use Chat or Plan mode to think, visual edits for small tweaks, and lower your check-in level"],
        ["Members see other members' data", "Prompt: \"Members can only read their own bookings\" and run a deep security scan"],
        ["Free build credits stopped", "Free credits cap at 30 a month and resume on the 1st (UTC). Upgrade or wait"],
        ["Custom domain not live", "Check the A and TXT records, remove AAAA records, and allow up to 72 hours"],
      ],
    } },

    { h2: "FAQ" },
    { h3: "Can you build a real app with Lovable?" },
    { p: "Yes. Lovable builds full-stack web apps with a real database, user accounts, file storage and server functions through Lovable Cloud, and publishes them to a live URL. Founders use it for MVPs, booking systems, internal tools and small SaaS products. For anything handling payments or personal data, have a developer review security before launch." },
    { h3: "How long does it take to build an app with Lovable?" },
    { p: "A simple app like the booking example can reach a working first version in an hour or two of focused prompting. Polishing, testing edge cases and adding payments usually takes a few more sessions. On the free plan, the 5-credits-a-day limit spreads the work over several days." },
    { h3: "Is Lovable free to build an app?" },
    { p: "You can build and publish a small app on the free plan, which gives 5 build credits a day up to 30 a month, plus small monthly Cloud and AI grants. Custom domains, editing code directly and removing the Lovable badge require Pro, which starts at $25 a month." },
    { h3: "Can Lovable build mobile apps?" },
    { p: "Lovable builds responsive web apps that work well on phones and can be installed as a progressive web app. It does not create native apps for the App Store or Google Play. If you need a store listing, look at [Replit](/tools/replit) or [Bolt.new](/tools/bolt-new), which build Expo apps, or wrap your Lovable code with a tool such as Capacitor." },
    { h3: "Do I need to know how to code to use Lovable?" },
    { p: "No. You describe what you want in plain English, and Lovable writes the code, sets up the backend and hosts the app. Understanding basic concepts such as pages, user roles and database tables helps you write better prompts, and having someone technical review the finished app is wise before real users arrive." },
    { h3: "How do I write good prompts for Lovable?" },
    { p: "Be specific and bounded. Say what to build, where it goes and what must stay untouched. Use concrete UI terms such as cards, badges, modals and form fields, include real copy, add style words like \"calm and organic\", and make one meaningful change per prompt. Save rules you repeat in Project settings → Instructions." },

    { h2: "Final verdict" },
    { p: "Building an app with Lovable is mostly about discipline, not code. Write a short spec, plan before you build, let Lovable Cloud handle logins and data, and add features one bounded prompt at a time while testing in the preview. Do that, and a non-developer can publish a genuinely useful app in an afternoon. For a deeper look at strengths, limits and pricing, read our [Lovable review](/blog/lovable-review), compare builders in [Lovable vs Bolt vs v0](/blog/lovable-vs-bolt-vs-v0), or see our list of the [best vibe coding tools](/blog/best-vibe-coding-tools)." },

    { hr: true },
    { p: "Find more AI app builders and coding agents in the [AI coding category](/categories/code), and design tools for your app's look in the [AI design category](/categories/design). Building a tool for vibe coders? [Submit it for a listing](/submit)." },
  ],
};

export default post;
