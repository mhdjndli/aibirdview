import type { Post } from "../types";

const post: Post = {
  slug: "exa-vs-tavily-vs-perplexity-api",
  title: "Exa vs Tavily vs Perplexity API (2026): Best Web Search API for AI Agents and RAG",
  excerpt:
    "Exa, Tavily and Perplexity all sell web search to AI apps, but they price and behave very differently. Here is how their search APIs compare on pricing, free tiers, result quality, depth, integrations and rate limits in 2026.",
  seoTitle: "Exa vs Tavily vs Perplexity API (2026): Pricing Compared",
  seoDescription:
    "Exa vs Tavily vs Perplexity Sonar API compared: per-request pricing, free credits, Websets, rate limits, MCP support, and which search API fits your AI agent.",
  metaKeywords:
    "exa vs tavily, exa vs perplexity api, tavily vs perplexity, exa pricing, exa websets pricing, exa api pricing search 2026, exa search api pricing 2026, exa ai search engine personal review, exa meaning, tavily pricing, perplexity sonar api pricing, web search api for ai agents, rag search api",
  categories: ["reviews", "deep-dives"],
  body: [
    { p: "**Short verdict:** pick [Exa](/tools/exa) if retrieval quality and control matter most: semantic search that understands what you mean, strong company and people search, page contents on demand, and Websets for building verified lists. Pick [Tavily](/tools/tavily) if you want the fastest path from zero to a working agent, with a free monthly allowance, simple credit pricing, and first-class LangChain support. Pick [Perplexity](/tools/perplexity) if you want a finished, cited answer rather than raw results, or the cheapest raw search per request through its Search API." },
    { p: "All three sit between your large language model and the open web. The differences are in how results are found, how much text comes back, how you are billed, and how much of the reasoning the provider does for you. This comparison is based on each vendor's official documentation, pricing pages and public developer feedback, not on our own benchmark runs." },
    { logos: ["exa", "tavily", "perplexity"] },

    { h2: "Quick verdict by use case" },
    { ul: [
      "**RAG over high-quality sources, research papers or niche sites:** Exa, for its embeddings-based search and fine-grained filters.",
      "**First agent prototype or a LangChain project:** Tavily, for the 1,000 free monthly credits and the deepest framework integrations.",
      "**A cited answer in one call, with no model of your own:** Perplexity's Agent API (the successor to Sonar Chat Completions).",
      "**Cheapest raw results at volume:** Perplexity Search API in Fast mode, at $1 per 1,000 requests.",
      "**Lead lists, company research and enrichment:** Exa, with Websets and company and people search.",
      "**Crawling or mapping a whole website:** Tavily, which has dedicated Crawl and Map endpoints.",
      "**Coding agents in Claude Code or Cursor:** a tie. All three offer MCP servers.",
    ] },

    { h2: "Pricing compared (as of October 2026)" },
    { p: "Prices below come from each vendor's official pricing page and documentation in October 2026. Confirm on the [Exa pricing page](https://exa.ai/pricing), [Tavily pricing page](https://tavily.com/pricing) and [Perplexity API pricing docs](https://docs.perplexity.ai/docs/getting-started/pricing) before you commit." },
    { table: {
      head: ["", "Exa", "Tavily", "Perplexity API"],
      rows: [
        ["**Billing model**", "Pay-as-you-go per request, no subscription", "Monthly credit plans or pay-as-you-go credits", "Prepaid credits, billed per request or per token"],
        ["**Free tier**", "$10 in credits every month (about 2,500 Lite searches), plus a one-time $10 onboarding bonus", "Researcher plan: 1,000 credits a month, no card required", "No standing free tier listed; you buy credits"],
        ["**Basic search**", "$7 per 1,000 (auto, fast); $4 per 1,000 (lite, instant); 10 results included", "1 credit (basic, fast, ultra-fast), about $5 to $8 per 1,000 depending on plan", "Search API $5 per 1,000; Fast Search $1 per 1,000"],
        ["**Deeper search**", "Deep Search $12 to $15 per 1,000", "Advanced search: 2 credits", "Agent API effort levels (fast to xhigh), billed by tokens plus tool calls"],
        ["**Page contents**", "Contents $1 per 1,000 pages per content type", "Extract: 1 credit per 5 URLs (basic)", "fetch_url tool $0.0005 per call (Agent API)"],
        ["**Answers / research**", "Answer $5 per 1,000; Agent from $0.012 to $1.00 per run", "Research: 4 to 250 credits per task", "Sonar model $0.25 input / $2.50 output per 1M tokens, plus $2.50 per 1,000 web searches"],
        ["**Paid plans**", "Enterprise only (custom volume pricing)", "Project $30 (4,000 credits), Bootstrap $100, Startup $220, Growth $500 (100,000 credits); PAYG $0.008 per credit", "Rate-limit tiers rise with cumulative spend ($50, $250, $500, $1,000, $5,000)"],
      ],
    } },
    { p: "In short: Perplexity Fast Search is the cheapest raw search, Exa and Tavily cost about the same for default search, and Exa and Tavily make full page text easier to get." },

    { h2: "What each tool actually is" },
    { h3: "Exa in one paragraph" },
    { shot: "exa", caption: "Exa's homepage. The company sells search, contents, answers, agents and Websets through one API key." },
    { p: "[Exa](/tools/exa), formerly called Metaphor, is a search engine built for machines rather than people. Instead of matching keywords, it uses embeddings to find pages whose meaning matches your query, which makes it good at prompts like \"startups building battery recycling in Europe\" or \"blog posts that explain RLHF from scratch.\" Beyond Search, the API offers Contents (clean page text, highlights and summaries), Answer, Deep Search, Monitors for recurring searches, an asynchronous Agent for research and list building, and Websets, a separate product for building verified, enriched datasets." },
    { h3: "Tavily in one paragraph" },
    { shot: "tavily", caption: "Tavily's homepage. Search, Extract, Crawl, Map and Research all draw from the same credit balance." },
    { p: "[Tavily](/tools/tavily) is a search API designed from day one for agents and retrieval-augmented generation. It returns cleaned, ranked snippets that are ready to drop into a prompt, with an optional short answer. Around Search it adds Extract for known URLs, Map and Crawl for walking a website, and a Research endpoint that produces a cited report. Tavily is LangChain's recommended search tool, and in 2026 it became part of Nebius while keeping its own brand and API." },
    { h3: "Perplexity API in one paragraph" },
    { shot: "perplexity", caption: "Perplexity's homepage. The same company sells the consumer answer engine and a developer API platform." },
    { p: "[Perplexity](/tools/perplexity) is best known for its consumer answer engine, and its developer platform exposes the same search stack. Most developers know it as the **Sonar API**, a chat completions endpoint that searches and answers in one call. In 2026 Perplexity moved that role to its **Agent API**: Sonar Chat Completions support ended on September 27, 2026, and synchronous Sonar requests are now reformulated as Agent API requests. The platform also includes a raw **Search API** that returns ranked results without an answer, plus embeddings and other APIs." },

    { h2: "Head-to-head: how they compare" },

    { h3: "Search quality and retrieval style" },
    { p: "Exa's embeddings-based approach is its defining strength. It tends to surface pages that match the intent of a long, descriptive query, even when they share few keywords with it, and you can filter by domain, date and categories such as companies, people and research papers. The tradeoff is that short, navigational or breaking-news queries can suit a conventional index better." },
    { p: "Tavily focuses on returning the right *chunks* rather than just the right pages. Advanced search pulls several relevant passages per source, which keeps your prompt short and on topic. Perplexity's Search API draws on the same index that powers its answer engine and is strong on fresh, general web content, with domain, language and date filters." },
    { p: "**Winner:** Exa for semantic and niche retrieval, Perplexity for fresh general-web coverage." },

    { h3: "Raw results vs finished answers" },
    { p: "This is the biggest design difference. Exa and Tavily are primarily retrieval layers: your own model writes the answer, which gives you full control over tone, citations and cost. Both offer answer endpoints too (Exa Answer and Tavily Research), but they are add-ons." },
    { p: "Perplexity is the opposite. Its core developer product has always been the cited answer, and the Agent API extends that with preset effort levels from fast to xhigh, a choice of models from several providers, built-in web search, URL fetching, a code sandbox and MCP tools. If you do not want to run your own model loop, this is the shortest path to a grounded answer." },
    { p: "**Winner:** Perplexity for answers out of the box, Exa and Tavily for retrieval you control." },

    { h3: "Pricing and free tiers" },
    { p: "For experimentation, Tavily's free Researcher plan is the most forgiving: 1,000 credits every month with no card, enough for 1,000 basic searches. Exa's free tier refreshes $10 of credit each month, which covers about 2,500 Lite searches or roughly 1,400 default searches. Perplexity does not list a standing free API tier, so you start by buying credits." },
    { p: "At scale, Perplexity Fast Search at $1 per 1,000 requests is hard to beat for raw results. Exa has no subscription, which suits spiky workloads. Tavily's plans lower the per-credit price as you commit to more volume, from $0.0075 on Project to $0.005 on Growth." },
    { p: "**Winner:** Tavily for free usage, Perplexity for cheap volume search, Exa for no-commitment billing." },

    { h3: "Depth: crawling, research and lists" },
    { p: "Tavily is the only one of the three with dedicated Map and Crawl endpoints, which make it easy to index a documentation site or competitor's blog for RAG. Its Research endpoint runs multi-step research and returns a cited report, billed at 4 to 110 credits on the mini model or 15 to 250 on pro." },
    { p: "Exa goes deep in a different direction. Deep Search reasons across sources and can return output that matches a schema you supply, the Agent handles long research and list-building runs at a fixed price per effort level, and Websets builds verified tables of companies, people or other entities with enrichment columns. Perplexity's high and xhigh effort levels cover deep research and open-ended agentic work inside its Agent API." },
    { p: "**Winner:** Tavily for crawling sites, Exa for structured lists and entity research." },

    { h3: "Integrations: SDKs, frameworks and MCP" },
    { p: "All three ship official Python and JavaScript or TypeScript SDKs and hosted MCP servers, so they plug into Claude Code, Cursor and other MCP clients. Tavily has the broadest catalog: LangChain, LlamaIndex, CrewAI, Haystack, Mastra, Dify, Make, n8n and dozens more. Exa covers LangChain, LlamaIndex, CrewAI, the Vercel AI SDK and OpenAI tool helpers. Perplexity documents LangChain, LiteLLM, Haystack, Mastra, n8n and the Vercel AI SDK, and its Agent API follows the Open Responses standard with OpenAI SDK compatibility." },
    { p: "**Winner:** Tavily, narrowly. All three are well supported." },

    { h3: "Rate limits and reliability" },
    { p: "Tavily's defaults are 100 requests per minute on development keys and 1,000 on production keys, with lower caps for Crawl and Research. Exa allows 10 queries per second on search by default, 5 for Deep Search and 100 for Contents, shared across your team. Perplexity ties Agent API limits to usage tiers, from 1 query per second for new accounts up to 33 at the top tiers, while its Search API allows 50 query units per second for every account." },
    { p: "**Winner:** Perplexity Search API for burst capacity on day one, Tavily for production request volume." },

    { h3: "Privacy and enterprise" },
    { p: "Exa offers Zero Data Retention, custom indexes, SLAs and up to 1,000 results per search on Enterprise. Tavily's Enterprise plan adds SLAs, custom rate limits and security reviews. Perplexity publishes a privacy and security page for API users. If retention terms matter, read each policy carefully." },
    { p: "**Winner:** Exa, for explicit Zero Data Retention." },

    { h2: "Feature comparison" },
    { table: {
      head: ["Feature", "Exa", "Tavily", "Perplexity API"],
      rows: [
        ["Search style", "Embeddings-based semantic search", "Agent-tuned search with ranked chunks", "Same index as Perplexity's answer engine"],
        ["Raw search endpoint", "Yes", "Yes", "Yes (Search API)"],
        ["Full page contents", "Yes (Contents)", "Yes (Extract)", "Via fetch_url in the Agent API"],
        ["Site crawl and map", "No dedicated endpoint", "Yes (Crawl, Map)", "No"],
        ["Cited answer endpoint", "Answer", "include_answer, Research", "Agent API (formerly Sonar)"],
        ["Deep research", "Deep Search, Agent", "Research", "high and xhigh effort levels"],
        ["Lists and enrichment", "Websets, company and people search", "No", "people_search tool"],
        ["Scheduled monitoring", "Monitors", "No", "No"],
        ["MCP server", "Yes", "Yes", "Yes"],
        ["LangChain / LlamaIndex", "Yes / Yes", "Yes / Yes", "Yes / not in official docs"],
        ["Free monthly allowance", "$10 credit", "1,000 credits", "None listed"],
      ],
    } },

    { h2: "Exa Websets pricing explained" },
    { p: "Websets is billed separately from the Exa API, in its own credits. Exa's documentation says the free Websets plan caps a webset at 25 verified results, and that the Websets API requires a paid Websets plan. Exa's Websets billing page has listed a Starter plan at $49 a month with 8,000 credits and a Pro plan at $449 a month with 100,000 credits, with each result that matches all of your criteria costing 10 credits and non-matching results costing nothing. Enrichments, contact data and imports also use credits. Check the [Websets billing page](https://websets.exa.ai/billing) for current plans, and note that Exa now points new list-building projects toward its pay-as-you-go Agent." },

    { h2: "Who should pick which" },
    { h3: "Choose Exa if..." },
    { ul: [
      "Your queries are long and descriptive, and keyword search keeps missing the right pages.",
      "You need company, people or research paper search, or verified lists through Websets.",
      "You prefer paying per request with no subscription.",
      "Zero Data Retention or a custom index is on your requirements list.",
    ] },
    { h3: "Choose Tavily if..." },
    { ul: [
      "You are prototyping an agent and want a real free tier.",
      "You build in LangChain, LlamaIndex, CrewAI or a no-code tool like n8n or Dify.",
      "You need to crawl or map whole websites for RAG.",
      "You want short, prompt-ready snippets instead of full pages.",
    ] },
    { h3: "Choose Perplexity if..." },
    { ul: [
      "You want a cited answer from one API call without managing your own model.",
      "You need the lowest cost per raw search at high volume (Fast Search).",
      "You want to mix models from several providers behind one key with built-in search.",
    ] },

    { h2: "Alternatives to Exa, Tavily and Perplexity" },
    { logos: ["firecrawl", "apify", "you-com"] },
    { ul: [
      "**[Firecrawl](/tools/firecrawl):** turns websites into clean Markdown with scrape, crawl and search endpoints. A strong pick when extraction matters more than ranking. Paid from $16/mo.",
      "**[Apify](/tools/apify):** a marketplace of ready-made scrapers and crawlers for specific sites, useful when you need structured data from one source. Paid from $39/mo.",
      "**[You.com](/tools/you-com):** an AI search company that also offers web search APIs for developers.",
    ] },
    { p: "To wire any of these into an agent, frameworks like [LangChain](/tools/langchain) and [LlamaIndex](/tools/llamaindex) provide ready-made tools. For research assistants aimed at people rather than code, see our list of the [best AI research tools](/blog/best-ai-research-tools)." },

    { h2: "FAQ" },
    { h3: "How much does the Exa API cost in 2026?" },
    { p: "Exa is pay-as-you-go. As of October 2026, default (auto or fast) search costs $7 per 1,000 requests, Lite and Instant search cost $4 per 1,000, Deep Search costs $12 to $15 per 1,000, Contents costs $1 per 1,000 pages, and Answer costs $5 per 1,000. Each search includes up to 10 results, with extra results at $1 per 1,000." },
    { h3: "Does Exa have a free tier?" },
    { p: "Yes. Every account gets $10 in credits each month, which resets on the first of the month and does not roll over, plus a one-time $10 bonus for completing onboarding. No payment method is needed to start." },
    { h3: "What does Exa mean?" },
    { p: "Exa is the metric prefix for 10 to the 18th power. The company, which renamed itself from Metaphor in 2024, has said the name contrasts with Google's googol (10 to the 100th) and reflects its goal of filtering the web's information down to useful knowledge." },
    { h3: "Is Exa a good search engine for personal use?" },
    { p: "Exa is built mainly as an API for developers and AI agents, though it offers a web demo and integrations like Slack. Public reviews praise its semantic results for research and discovery. For everyday personal searching with written answers, Perplexity's consumer app is the more natural fit." },
    { h3: "Is Tavily free?" },
    { p: "Tavily's Researcher plan is free with 1,000 API credits a month and no credit card. A basic search costs 1 credit and an advanced search costs 2, so the free plan covers 500 to 1,000 searches a month." },
    { h3: "Is the Perplexity Sonar API still available?" },
    { p: "Perplexity ended support for Sonar Chat Completions on September 27, 2026. Synchronous and streaming Sonar requests still work because they are being reformulated as Agent API requests, but asynchronous Sonar requests are no longer supported. Perplexity recommends the Agent API for new projects, where the Sonar model is billed at $0.25 per million input tokens and $2.50 per million output tokens plus tool fees." },
    { h3: "Which is best for RAG: Exa, Tavily or Perplexity?" },
    { p: "For RAG where you control the model, Exa and Tavily are the usual picks. Exa wins on semantic retrieval and content control, Tavily on ease of setup and prompt-ready snippets. Use Perplexity when you would rather receive a finished, cited answer." },

    { hr: true },
    { h2: "Final verdict" },
    { p: "There is no single best web search API, because the three make different bets. **Exa** bets on better retrieval, and it is the strongest choice when finding the right sources is the hard part of your product. **Tavily** bets on developer experience, and it is the quickest to get running with a generous free tier and integrations everywhere. **Perplexity** bets on answers, and it is the right call when you want a grounded response without building the loop yourself, or the cheapest raw search at volume. Many teams start with Tavily and add Exa when result quality becomes the bottleneck." },
    { p: "Browse every search, research and data tool we track in the [AI research tools category](/categories/research), or compare coding assistants that use these APIs in our guide to the [best AI coding tools](/blog/best-ai-coding-tools)." },
  ],
};

export default post;
