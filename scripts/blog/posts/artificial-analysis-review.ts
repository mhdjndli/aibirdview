import type { Post } from "../types";

const post: Post = {
  slug: "artificial-analysis-review",
  title: "Artificial Analysis Review (2026): How to Read Its AI Benchmarks, Plus Alternatives",
  excerpt:
    "Artificial Analysis publishes independent benchmarks of AI models and the API providers that host them. Here is what the site measures, how to read its intelligence, speed and price numbers, how far to trust them, and which alternatives answer different questions.",
  seoTitle: "Artificial Analysis Review (2026): Benchmarks + Alternatives",
  seoDescription:
    "Artificial Analysis review: what the site measures, how to read its intelligence, speed and price benchmarks, how far to trust them, and the best alternatives.",
  metaKeywords:
    "artificial analysis, artificial analysis ai, artificial analysis review, artificial analysis alternatives, artificial analysis intelligence index, ai model benchmarks, llm api provider comparison, llm leaderboard",
  categories: ["reviews", "deep-dives"],
  body: [
    { logos: ["artificial-analysis", "arena-ai", "openrouter", "langfuse", "braintrust"] },

    { p: "[Artificial Analysis](/tools/artificial-analysis) is an independent benchmarking site that compares AI models and the API providers that host them on intelligence, speed and price. It also covers image, video, speech and music models. It suits developers, product teams and researchers who need to choose a model or a provider, and it is a strong place to build a shortlist. It is not a final answer, because no general benchmark runs on your prompts or your data." },
    { p: "This review explains how to read its main numbers, how much weight they deserve, and which alternatives answer different questions. It quotes no leaderboard positions or scores, because they change too often." },

    { h2: "Artificial Analysis at a glance" },
    { ul: [
      "**What it is:** a benchmarking company and public website covering AI models, API providers, coding agents and media models.",
      "**Headline metric:** the Artificial Analysis Intelligence Index, a weighted composite of nine evaluations in version 5.0.1.",
      "**Performance data:** output speed, latency, price, cost per task, time per task and endpoint error rate.",
      "**Who runs it:** co-founders Micah Hill-Smith (CEO) and George Cameron (CPO), with headquarters in San Francisco.",
      "**Best for:** shortlisting models and comparing who hosts a given model.",
      "**Not for:** proving that a model will work on your specific task.",
      "**Cost:** the public benchmarks are free to read. The API has a free tier with limits, and enterprise products are sold separately.",
    ] },

    { h2: "What Artificial Analysis actually does" },
    { p: "Choosing a model means trading quality against speed and cost, and vendor launch posts rarely help. Artificial Analysis runs its own measurements, so you can compare models from different labs on the same terms. According to its founders, the project began in 2023, when Hill-Smith was building a legal AI research assistant and could not find independent evaluations of the available models." },

    { h3: "Language models" },
    { p: "The models leaderboard lists each model with its Intelligence Index score, cost per task, time per task, latency and context window. The same base model often appears several times, once for each reasoning effort setting." },

    { h3: "API providers" },
    { p: "The providers leaderboard is arguably the most useful page on the site. Each row is one provider's endpoint for one model, with price, speed, latency and error rate, so you can see how the same model differs from host to host." },

    { h3: "Coding agents" },
    { p: "The Coding Agent Index scores agents on end-to-end software engineering tasks, using the equal-weight average of three benchmarks. Each entry is an agent variant rather than a bare model, and the index also reports reliability, cost and execution time." },

    { h3: "Domain indexes" },
    { p: "Capability Indexes focus on professional fields: Finance and Accounting, Strategy and Ops, Legal, Healthcare and Medical, Engineering, and Economics. If you build for one of these areas, start here rather than with the general index." },

    { h3: "Image, video, speech and music" },
    { p: "Media models are ranked differently. On the image leaderboard, private evaluators see two outputs from the same prompt without model names and pick the one they prefer. Those votes are fitted with a Bradley-Terry model and reported on an Elo scale. Price and generation time are shown alongside." },

    { h2: "How to read the intelligence numbers" },
    { p: "The Intelligence Index is a weighted average across four categories, each worth 25%: Knowledge Work, Coding, Science and General. In version 5.0.1 it combines nine evaluations, and version 5 was announced in October 2026. The company says about 60% of the index now uses private test sets or held-out answers, which is meant to limit contamination." },
    { p: "Four rules make the number more useful:" },
    { ol: [
      "**Check the version.** The index changes as evaluations saturate or get replaced, and scores from different versions are not directly comparable.",
      "**Compare like with like.** A model at maximum reasoning effort and the same model at a low setting are separate entries with separate scores and costs.",
      "**Look under the composite.** One number can hide what drives it. Open the individual evaluations that match your work.",
      "**Know what it leaves out.** The index is primarily text-based and in English. Visual reasoning, speech and multilingual performance are measured separately.",
    ] },
    { p: "Treat small gaps with caution too. Several evaluations rely on LLM judges or pairwise ratings, so a one or two point difference is a weak reason to switch models." },

    { h2: "How to read the speed numbers" },
    { p: "Performance benchmarks run every 6 hours on workloads of about 1,000, 10,000 and 100,000 input tokens, plus multi-turn agentic tasks, all under concurrent load. Headline figures average recent results over the past 5 days. Each number answers a different question:" },
    { ul: [
      "**Output speed** is output tokens per second, including reasoning tokens, over the full request. It includes the wait for the first token and matters most for long responses.",
      "**Time to first token** measures the wait for any token, including a reasoning token.",
      "**Time to first answer token** includes reasoning time, so it compares reasoning and non-reasoning models fairly. For a chat interface, this is closer to what a user feels.",
      "**End-to-end response time** is the time until the final token, which usually matters more for batch and agent jobs.",
      "**Error rate** shows the share of requests that fail on the endpoint's side. Those failures count as a speed of 0, so unreliable endpoints also lose on speed.",
    ] },
    { p: "Two details are easy to miss. Tests run from a single Google Cloud region, us-central1, so latency figures may favor or penalize a provider based on where its servers sit. The definitions also change: the current performance methodology replaced an older headline figure based on the 10,000 token workload, so older comparisons may not match today's charts." },

    { h2: "How to read the price numbers" },
    { p: "Token prices are misleading on their own. The blended price assumes a 7:2:1 ratio of cache hit, input and output tokens. That may look nothing like your workload, so if you have few cache hits or long outputs, apply your own token mix to the raw prices." },
    { p: "Cost per task is usually the better number. It estimates what it costs to complete one Intelligence Index task, using the tokens a model actually consumed. As the founders point out, a pricier model can cost less overall if it finishes in fewer turns. Time per task works the same way for duration." },
    { p: "These are the benchmark's tasks, not yours, so use cost per task to rank options rather than to forecast your bill." },

    { quote: "Read Artificial Analysis as a filter, not a verdict. It tells you which few options deserve a test on your own work." },

    { h2: "How far can you trust Artificial Analysis?" },

    { h3: "What supports the data" },
    { ul: [
      "**It runs the evaluations itself.** Evaluations use its own harnesses and prompts rather than lab-reported scores.",
      "**It checks for special treatment.** Tests combine anonymous accounts, accounts with credits and API keys provided for benchmarking. A separate anonymous account validates results where the primary one is not anonymous.",
      "**It has written rules.** Integrity terms ban providers from detecting its traffic or routing it to special resources, and it can delist those that do not comply.",
      "**It documents changes.** The methodology pages include version histories, and a public changelog records updates by date.",
    ] },

    { h3: "Where to stay skeptical" },
    { ul: [
      "**Independence is partly self-reported.** The company sells enterprise reports and private benchmarking, including to companies across the AI stack. Hill-Smith says \"no one pays to be on the website\", but outsiders cannot audit that separation.",
      "**Benchmarks get targeted.** The founders themselves acknowledge that labs optimize for what is measured.",
      "**Your use case is not in the test.** The company says its index may not apply directly to every use case.",
      "**Provider quality can vary.** The same model can behave differently across hosts because of quantization, sampling defaults or token limits. The Endpoint Accuracy Index measures this, but only for a select set of open weights models.",
    ] },
    { p: "Overall, it is a credible first reference and a poor substitute for your own evaluation." },

    { h2: "Artificial Analysis pros and cons" },
    { h3: "What works" },
    { ul: [
      "**One view of quality, speed and cost.** All three sit side by side, so you can see the trade-offs at a glance.",
      "**Provider-level comparison.** It shows who serves a model, not only which model leads.",
      "**Broad coverage.** Language, media and coding agent benchmarks live on one site.",
    ] },
    { h3: "What to watch out for" },
    { ul: [
      "**Fast-moving definitions.** Index and methodology updates can make older numbers misleading.",
      "**One test region.** Latency figures may not match your users' locations.",
      "**Limited data on the free API.** Provider-level data sits in the Commercial tier.",
    ] },

    { h2: "Artificial Analysis pricing" },
    { p: "Our listing shows Artificial Analysis as free, and that matches the public benchmarks, which the founders say carry no commercial model. Paid products sit around them. Check the [official site](https://artificialanalysis.ai/) for current terms." },
    { ul: [
      "**API Free tier:** 100 requests per 24-hour window, covering the language models list with headline indices, median performance and input and output prices, plus free media endpoints.",
      "**API Pro tier:** 500 requests per window, with model-level endpoints, full pricing and percentiles. The documentation we read did not list a price.",
      "**API Commercial tier:** custom limits, with provider-level data, performance over time and custom data. You contact the team for terms.",
      "**Attribution:** required on all API tiers when you display or share the data.",
      "**Enterprise work:** the founders describe a benchmarking and insights subscription plus private benchmarking. Pricing is not public.",
      "**Optima:** a custom benchmark platform announced in August 2026. The announcement says it is available but does not state pricing.",
    ] },

    { h2: "The best Artificial Analysis alternatives" },
    { p: "No single site replaces it, because the alternatives measure different things." },
    { table: {
      head: ["Your question", "Good option", "What it measures"],
      rows: [
        ["Which model do people prefer?", "[Arena AI](/tools/arena-ai)", "Votes from real users"],
        ["Which models do developers actually use?", "[OpenRouter](/tools/openrouter)", "Tokens processed through its API"],
        ["Which model handles hard research tasks?", "Epoch AI Benchmarking Hub", "Results from difficult benchmarks"],
        ["Which model works on my prompts?", "[Langfuse](/tools/langfuse), [Braintrust](/tools/braintrust)", "Your own evaluations"],
        ["Which answer do I like for this one prompt?", "[ChatHub](/tools/chathub)", "Your own side-by-side reading"],
      ],
    } },

    { h3: "1. Arena AI: human preference" },
    { p: "[Arena AI](/tools/arena-ai), formerly LMArena, lets people compare model outputs side by side, vote blind, and follow public leaderboards across chat, code, image, video and agents. Preference is useful, but it is not accuracy. A 2025 paper, The Leaderboard Illusion, also alleged that private pre-release testing and uneven data access skewed its earlier leaderboard, so use it as one signal." },

    { h3: "2. OpenRouter: real usage" },
    { p: "[OpenRouter](/tools/openrouter) offers one API across many models and publishes rankings by tokens processed through its service. Its own page says a high token count reflects usage, not quality, so read it as a popularity signal." },

    { h3: "3. Epoch AI: research-grade benchmarks" },
    { p: "Epoch AI's Benchmarking Hub is a database of results on challenging tasks, combining benchmarks it runs itself with data from external sources. It focuses on model capability rather than on choosing a provider. Its own data can be downloaded under a Creative Commons license." },

    { h3: "4. Langfuse, Braintrust and Arize AI: your own evals" },
    { p: "Once you have a shortlist, the most reliable data comes from your own workload. [Langfuse](/tools/langfuse) offers open-source LLM observability, evaluation and prompt management. [Braintrust](/tools/braintrust) focuses on evaluation and observability for AI agents, with tracing and evals. [Arize AI](/tools/arize-ai) covers agent observability and evaluation through its AX platform and open-source Phoenix. Artificial Analysis says Optima can import agent traces from all three, so you can combine these approaches." },

    { h3: "5. ChatHub: a quick side-by-side check" },
    { p: "[ChatHub](/tools/chathub) sends one prompt to several models and shows up to six answers side by side. It proves nothing statistically, but it can reveal obvious misses early." },

    { h2: "A practical workflow for choosing a model" },
    { ol: [
      "**Write down your constraint.** Decide whether quality, latency or cost matters most.",
      "**Shortlist on Artificial Analysis.** Start with the evaluation category or Capability Index that matches your work, then pick three or four models.",
      "**Check the provider rows.** Compare price, speed and error rate for each hosted option, not only the model's headline numbers.",
      "**Cross-check other signals.** Look at [Arena AI](/tools/arena-ai) for preference and [OpenRouter](/tools/openrouter) for adoption.",
      "**Recalculate cost.** Apply your real input, output and cache mix instead of the default blend.",
      "**Test on your own data.** Run a small set of real examples through a tool like [Langfuse](/tools/langfuse) or [Braintrust](/tools/braintrust), and score them against what you consider a good answer.",
    ] },

    { h2: "FAQ" },
    { h3: "What is Artificial Analysis?" },
    { p: "It is a company and website that benchmarks AI models and the providers that serve them, comparing quality, speed and price." },
    { h3: "Is Artificial Analysis free?" },
    { p: "The public benchmarks are free to read, and the API has a free tier of 100 requests per 24-hour window. Broader API access and enterprise services are paid. Check the official site for current terms." },
    { h3: "Is Artificial Analysis reliable?" },
    { p: "It is a credible starting point. It runs its own tests, publishes its methodology and sets integrity rules for providers. Its independence is largely self-described, though, so confirm with your own tests." },
    { h3: "What is the Artificial Analysis Intelligence Index?" },
    { p: "It is a weighted composite of evaluations that gives language models one comparable score. Version 5.0.1 combines nine evaluations across Knowledge Work, Coding, Science and General, with each category worth 25%." },
    { h3: "How often is Artificial Analysis updated?" },
    { p: "Performance benchmarks run every 6 hours, and the public changelog lists updates by date." },
    { h3: "What is the difference between Artificial Analysis and Arena?" },
    { p: "Artificial Analysis mostly runs graded tests and measures speed and price directly. [Arena AI](/tools/arena-ai) ranks models from human votes. They can disagree without either being wrong." },
    { h3: "What are the best Artificial Analysis alternatives?" },
    { p: "[Arena AI](/tools/arena-ai) for human preference, [OpenRouter](/tools/openrouter) for real usage, Epoch AI for research benchmarks, and [Langfuse](/tools/langfuse) or [Braintrust](/tools/braintrust) for testing on your own data." },

    { hr: true },
    { p: "Comparing assistants rather than APIs? See [Claude vs ChatGPT](/blog/claude-vs-chatgpt) and our guide to the [best ChatGPT alternatives](/blog/best-chatgpt-alternatives). If you are building with these models, the [best AI coding tools](/blog/best-ai-coding-tools) is a good next step. You can also browse the [AI research tools category](/categories/research), or [submit a tool](/submit) we have missed." },
  ],
};

export default post;
