import type { Post } from "../types";

const post: Post = {
  slug: "what-beats-rock-game",
  title: "What Beats Rock? How the AI Game Works (2026)",
  excerpt:
    "What Beats Rock is a free browser word game where an AI judges whether your answer beats the last one. Here is how to play, how the judge and scoring work, what ends a run, and how to think about longer streaks.",
  seoTitle: "What Beats Rock? How the AI Game Works + Streak Tips (2026)",
  seoDescription:
    "What Beats Rock is a free browser game where an AI judges each answer. Learn how to play, how scoring and streaks work, and how to last longer.",
  metaKeywords:
    "what beats rock, what beat rock, what beats rock game, whats beats rock, what beats rock ai, what beats rock rules, what beats rock leaderboard, what beats rock high score, how to play what beats rock",
  categories: ["guides"],
  body: [
    { p: "[What Beats Rock](/tools/what-beats-rock) is a free browser word game that turns rock paper scissors into an endless chain. You answer the question \"what beats rock?\", an AI judges your answer, and if you win, your answer becomes the next thing to beat. Your score goes up by one each time, and the run ends the first time the judge rules against you." },
    { p: "If you searched for what beat rock or whats beats rock, this is the game you are after. The site does not publish a rulebook, so this guide is built from its [official site](https://www.whatbeatsrock.com/), its legal pages, what the makers have said in public and how the game has been documented by others." },

    { logos: ["what-beats-rock", "infinite-craft", "ai-dungeon", "riddle-me-this"] },

    { h2: "What Beats Rock at a glance" },
    { ul: [
      "**What it is:** an open-ended version of rock paper scissors, judged by a large language model.",
      "**Made by:** the site credits khoi and kyle. Its legal pages name Based Apps and Games, LLC as the operator.",
      "**Launched:** announced on July 8, 2024.",
      "**Price:** free in the browser. The site lists no paid plans and is set up to show Google ads.",
      "**Account:** optional to play. You need to sign in with Google or Discord to save a score.",
      "**Leaderboards:** weekly hi scores plus an all-time list.",
      "**Age:** the terms require users to be at least 13.",
    ] },

    { h2: "How to play What Beats Rock" },
    { ol: [
      "**Open the game.** There is nothing to install. The page shows the question, a text box and a GO button.",
      "**Type your answer.** The box starts filled in with paper, but you can replace it with almost any word or phrase.",
      "**Read the ruling.** The judge decides whether your answer wins and gives a short written reason. It also picks an emoji for your answer.",
      "**Keep going.** If you win, the question changes to what beats your answer. An \"Already guessed\" list tracks your run.",
      "**Lose once and the run is over.** The losing screen offers a chance to save your score or play again.",
    ] },
    { p: "The challenge is that every answer you give becomes your next problem." },

    { h2: "How the AI judges your answers" },
    { p: "The makers said in their Hacker News launch post that an LLM decides each outcome. They also wrote that GPT-4o, an OpenAI model used in [ChatGPT](/tools/chatgpt), had the best reasoning of the options they compared, and that Llama 3 was weaker at matching concepts to emojis. That was July 2024. The official site does not say which model runs the judge today, so treat the model as unknown." },
    { p: "There is no published scoring rubric. What the public evidence shows is that the judge reasons about how two things would actually interact, not just which sounds bigger. Know Your Meme records two useful rulings: \"A Really Big Sponge\" lost to \"The Ocean\", and \"Resetting the simulation\" lost to \"The destruction of time and space\" because nothing was left to reset. It also shows the judge accepting cultural logic, as when \"Cancel Culture\" beat \"O.J. Simpson\"." },
    { p: "The game also shares results across players. The leaderboard's Cause of Death column shows the matchups that ended other runs. One early write-up compared the game to [Infinite Craft](/tools/infinite-craft)." },

    { h2: "How scoring and streaks work" },
    { p: "The score is your streak. Each accepted answer adds one point, and the game page shows no countdown timer." },
    { p: "The run ends the first time the judge rules against you. Third-party guides disagree on what happens if you repeat an answer from the same run: some say it ends the run, and the makers do not publish a rule. Treat repeats as something to avoid." },

    { h3: "Saving your score and the leaderboard" },
    { p: "The save button appears on the loss screen, next to play again. Play again reloads the page, so save first if you want the score. Saving requires signing in with Google or Discord, which the site says also lets you keep trophies across devices and decorate your rock." },
    { p: "The main leaderboard shows weekly hi scores with a countdown to the next reset. A link leads to all-time scores. Each row shows rank, player, score and a Cause of Death column, which records the matchup that ended the run." },

    { h2: "General strategy for longer streaks" },
    { p: "Nobody outside the makers can see the judge's instructions, so there is no proven formula. These points follow from how the game plays. They improve your thinking, but they do not guarantee a ruling." },
    { ol: [
      "**Beat only the current item.** Each turn is a matchup against the item on screen. You do not need to top everything before it, so a small, specific counter can work as well as a huge one.",
      "**Have a reason ready.** The judge has to explain its ruling. Before you submit, finish the sentence \"this wins because...\" and check that the mechanism holds up. The sponge and ocean ruling shows that size alone can fail.",
      "**Think one move ahead.** Your answer becomes your next target. Before you play something absolute, ask what could beat it. If you cannot name anything, you may be setting up your own loss.",
      "**Take your time.** The game page shows no timer, so use as long as you need on each turn.",
      "**Check the Already guessed list.** Sources disagree on what a repeat does, so avoid them. The list is on screen during play.",
      "**Learn from the Cause of Death column.** It shows which matchups ended other runs, which is a cheap way to see what the judge has rejected.",
    ] },

    { h2: "Limitations to know about" },
    { ul: [
      "**Rulings are judgment calls.** Players have disputed verdicts since launch, and no official rulebook exists to settle an argument.",
      "**There is no published appeal process.** The loss screen lets you record that you disagree, but the site does not describe any way to get a run back.",
      "**It needs a connection.** Answers are judged online, so the game does not work offline.",
      "**Ads are part of the site.** It is set up to show Google ads.",
      "**Your answers are not private.** The game compares answers across players and shows losing matchups on the leaderboard, so do not type anything personal. The privacy policy does not mention AI or say how typed answers are handled. It does say the site collects IP addresses to prevent abuse and cheating.",
      "**Custom games are player-made.** The home page has a community section where signed-in players can create their own versions. One third-party review describes this content as unfiltered, so preview any game before showing it to a class.",
      "**Automation is banned.** The terms prohibit bots and scripts.",
    ] },

    { h2: "Games similar to What Beats Rock" },
    { p: "Few games copy this format exactly, but several share its appeal." },
    { ul: [
      "**[Infinite Craft](/tools/infinite-craft)** is the closest match. It is a free browser game where you combine elements to craft new items, and AI generates the results.",
      "**[Riddle Me This](/tools/riddle-me-this)** is a prompt-matching puzzle game built on real-time AI image generation.",
      "**[AI Dungeon](/tools/ai-dungeon)** offers infinite interactive stories where you are the hero.",
      "**[Hidden Door](/tools/hidden-door)** is an AI story game platform for playing and building interactive fiction worlds.",
      "**[Friends & Fables](/tools/friends-and-fables)** is an AI game master for D&D style campaigns.",
      "**[GOODY-2](/tools/goody-2)** is a satirical chatbot that politely refuses to answer anything, for a shorter laugh.",
      "**[AI Town](/tools/ai-town)** is an open-source starter kit for a virtual town where AI characters live and chat, which suits developers more than casual players.",
      "**[Rosebud AI](/tools/rosebud-ai)** lets you make and share browser games by describing them to an AI, if you would rather build your own.",
    ] },

    { h2: "FAQ" },
    { h3: "What beats rock in the game?" },
    { p: "Paper is the classic answer, and it is the word already filled in when you open the page. Beyond that, anything can work if the AI judge accepts it. There is no fixed answer list." },
    { h3: "Is What Beats Rock free?" },
    { p: "Yes. The browser game costs nothing to play, and neither the site nor its terms describe any paid features. The site is set up to show Google ads." },
    { h3: "Do I need an account to play?" },
    { p: "No. You can play right away without one. You need to sign in with Google or Discord to save a score, and the page for creating a custom game also asks you to sign in." },
    { h3: "What happens if I repeat an answer?" },
    { p: "Sources disagree. Some guides say a repeat ends your run, and the makers do not publish a rule. The safest choice is to avoid repeats and use the Already guessed list on screen." },
    { h3: "Can I appeal a ruling?" },
    { p: "The site does not describe an appeal process. You can record that you disagree on the loss screen, but do not expect it to bring your run back." },
    { h3: "What AI does What Beats Rock use?" },
    { p: "The site does not say. At launch in 2024, the makers praised GPT-4o for its reasoning, but that may have changed. Check the official site or the game's community Discord for current details." },
    { h3: "When does the leaderboard reset?" },
    { p: "Weekly. The leaderboard page shows a live countdown to the next reset, and all-time scores stay on a separate list." },
    { h3: "What is the highest score in What Beats Rock?" },
    { p: "Check the leaderboard for the current number. We do not quote one here because the weekly board resets and third-party record claims are hard to verify." },
    { h3: "Is there a What Beats Rock app?" },
    { p: "An app called What Beats Rock is on Apple's App Store from a seller named Semih Cihan, with Premium in-app purchases and a Lagot Games copyright line. Its listing does not mention whatbeatsrock.com, the site's creators or the site's operator, and we could not confirm any link between them. We also found no Google Play listing we could verify. The browser game works without any download." },

    { hr: true },
    { p: "Want more AI that costs nothing to try? See our guide to the [best free AI tools](/blog/best-free-ai-tools). If you enjoy interactive fiction, read about the [best AI story generators](/blog/best-ai-story-generators). You can also browse every game and hobby tool in the [AI lifestyle category](/categories/lifestyle), or [submit a tool](/submit) we have missed." },
  ],
};

export default post;
