import type { Post } from "../types";

const post: Post = {
  slug: "how-to-build-an-ai-agent-with-n8n",
  title: "How to Build an AI Agent with n8n (2026): A Step-by-Step Inbox Triage Example",
  excerpt:
    "A practical n8n AI agent tutorial: set up n8n Cloud or Docker, add the Chat Trigger and AI Agent node, connect OpenAI, Claude or Gemini, give it memory and Gmail and Google Sheets tools, then test, publish and connect it to MCP.",
  seoTitle: "How to Build an AI Agent with n8n (2026 Step-by-Step)",
  seoDescription:
    "Build an n8n AI agent step by step: Chat Trigger, AI Agent node, OpenAI, Claude or Gemini, memory, Gmail and Sheets tools, MCP, testing, publishing and fixes.",
  metaKeywords:
    "n8n ai agent, how to build an ai agent with n8n, n8n ai agent tutorial, n8n ai agent node, n8n chat trigger, n8n mcp, n8n gmail ai agent, n8n self hosted docker, n8n openai, n8n claude, n8n memory, ai agent workflow",
  categories: ["guides"],
  body: [
    { p: "**To build an AI agent with n8n:** create a workflow, add a Chat Trigger, add the AI Agent node, connect a chat model (OpenAI, Anthropic Claude or Google Gemini) with your API key, attach Simple Memory and one or more tools such as Gmail or Google Sheets, write a system message, test it in the built-in chat, then publish the workflow. A first working n8n AI agent takes about 30 minutes, and you do not need to write code." },
    { p: "This guide builds a real example: an **inbox triage agent** that reads your unread Gmail, sorts each email by priority, applies labels, logs important messages to a Google Sheet and drafts replies for you to review. Steps and UI labels follow the official [n8n documentation](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/) as of October 2026 (n8n 2.x). Labels occasionally change between releases, so if a button looks different, check the linked doc page." },

    { logos: ["n8n"] },

    { h2: "Quick overview: what you will build" },
    { ul: [
      "**Trigger:** a Chat Trigger, so you can talk to the agent in n8n's chat panel (and later a public chat page).",
      "**Brain:** the AI Agent node with a chat model such as an OpenAI GPT model, Claude or Gemini.",
      "**Memory:** Simple Memory, so the agent remembers the conversation.",
      "**Tools:** Gmail (read, label, draft), Google Sheets (log rows) and HTTP Request (call any API).",
      "**Optional:** MCP, to share tools with Claude, Cursor and other clients.",
    ] },

    { h2: "What is an n8n AI agent?" },
    { p: "In n8n, an AI agent is a workflow built around the **AI Agent** node. Unlike a fixed workflow that always runs the same steps, the agent receives a goal, decides which connected tools to call, reads the results and repeats until it has an answer." },
    { p: "The AI Agent node is a **cluster node**: a root node with sub-node slots underneath it for a Chat Model (required), Memory (optional), Tools (optional, but you want at least one) and an Output Parser (optional, for structured output). Since n8n 1.82 every AI Agent node runs as a **Tools Agent**, so there is no agent type to choose anymore. If you are deciding between platforms first, our comparison of [n8n vs Zapier vs Make](/blog/n8n-vs-zapier-vs-make) explains why n8n's per-run pricing suits agents that call many tools." },

    { h2: "What you need before you start" },
    { table: {
      head: ["Requirement", "Options", "Cost (as of October 2026)"],
      rows: [
        ["An n8n instance", "n8n Cloud, or self-hosted Community edition with Docker", "Cloud from €20/mo billed annually (2,500 executions); self-hosted is free software plus server cost"],
        ["A chat model", "OpenAI, Anthropic, Google Gemini, Mistral, Groq, Ollama (local), OpenRouter and others", "Pay per token to the provider; Ollama is free on your own hardware"],
        ["A Google account", "Gmail and Google Sheets for this example", "Free"],
        ["About 30 to 60 minutes", "Longer if you self-host and set up Google OAuth yourself", "Free"],
      ],
    } },
    { p: "Cloud prices come from the [n8n pricing page](https://n8n.io/pricing/). n8n Cloud plans can also run AI models without your own API key through a prepaid credit balance managed by n8n; check the pricing page for current eligibility." },

    { h2: "Step 1: Choose n8n Cloud or self-host with Docker" },
    { h3: "Option A: n8n Cloud (fastest)" },
    { ol: [
      "Go to [n8n](/tools/n8n) and start a cloud trial.",
      "Pick a workspace name. Your instance gets its own URL for webhooks and public chat links. Cloud also gives you one-click Google sign-in for credentials.",
      "Open the editor and click **Create workflow**.",
    ] },
    { h3: "Option B: self-host with Docker (free, full control)" },
    { p: "If you have Docker installed, the [n8n Docker guide](https://docs.n8n.io/hosting/installation/docker/) runs n8n with two commands. Replace the timezone with yours, for example America/New_York:" },
    { ol: [
      "Create a volume so your data survives restarts: `docker volume create n8n_data`.",
      "Start n8n: `docker run -it --rm --name n8n -p 5678:5678 -e GENERIC_TIMEZONE=\"America/New_York\" -e TZ=\"America/New_York\" -e N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true -v n8n_data:/home/node/.n8n n8nio/n8n`.",
      "Open http://localhost:5678 in your browser and create the owner account.",
    ] },
    { p: "For anything beyond testing, n8n recommends Docker Compose, a PostgreSQL database instead of the default SQLite, and a public HTTPS domain so webhooks, OAuth callbacks and public chat links work. Use the stable image tag in production." },
    { h2: "Step 2: Add a Chat Trigger" },
    { ol: [
      "In a new workflow, click **Add first step** and search for **Chat Trigger** (listed as \"When chat message received\").",
      "Leave **Make Chat Publicly Available** off for now. You will test inside the editor first.",
      "Close the node. An **Open chat** button appears at the bottom of the canvas.",
    ] },
    { p: "The Chat Trigger passes each message to the next node as a field called `chatInput`, together with a `sessionId` that memory uses to keep conversations apart." },

    { h2: "Step 3: Add the AI Agent node" },
    { ol: [
      "Click the **+** after the Chat Trigger and add **AI Agent**.",
      "Set **Prompt** to **Connected Chat Trigger Node** (shown as \"Take from previous node automatically\" in some versions). It reads `chatInput`.",
      "Leave **Require Specific Output Format** off for a chat agent. Turn it on later if another system needs strict JSON.",
      "Under **Options**, keep **Max Iterations** at the default of 10. It caps how many tool calls the agent can make per message and protects you from runaway loops.",
    ] },
    { shot: "n8n", caption: "n8n's canvas: the AI Agent node sits in the middle with Chat Model, Memory and Tool slots below it." },

    { h2: "Step 4: Connect a chat model (OpenAI, Claude or Gemini)" },
    { p: "Click the **Chat Model +** connector under the agent and choose a provider. Each needs a credential." },
    { h3: "OpenAI" },
    { ol: [
      "Add **OpenAI Chat Model**.",
      "Under Credential, choose **Create new credential** and paste an API key from the OpenAI platform dashboard. Your API account needs billing enabled; a ChatGPT subscription does not include API usage.",
      "Pick a model from the **Model** list. A fast, low-cost model is plenty for triage; use a larger reasoning model for complex research agents.",
    ] },
    { h3: "Anthropic Claude" },
    { ol: [
      "Add **Anthropic Chat Model**.",
      "Create a credential with an API key from the Anthropic Console (the same applies: API billing is separate from a Claude.ai subscription).",
      "Select a Claude model. Our [Claude vs ChatGPT comparison](/blog/claude-vs-chatgpt) covers how the two model families differ.",
    ] },
    { h3: "Google Gemini" },
    { ol: [
      "Add **Google Gemini Chat Model**.",
      "Create a credential with an API key from Google AI Studio.",
      "Choose a Gemini model.",
    ] },
    { p: "Optional: turn on **Enable Fallback Model** in the agent and connect a second model from a different provider, so the agent keeps working if the first one errors or rate-limits. You can also use **Ollama Chat Model** to run open models locally on a self-hosted instance with no per-token cost." },

    { h2: "Step 5: Give the agent memory" },
    { ol: [
      "Click the **Memory +** connector and add **Simple Memory**.",
      "Keep the default session key, which uses the Chat Trigger's `sessionId`, so each chat window gets its own history.",
      "Set **Context Window Length** to 10. That keeps the last 10 exchanges, enough for follow-up questions without bloating every prompt.",
    ] },
    { p: "Simple Memory is fine for testing and small deployments, but it lives in workflow data and does not work in queue mode with multiple workers. For production, use **Postgres Chat Memory** or **Redis Chat Memory** so conversations persist reliably." },

    { h2: "Step 6: Add tools (Gmail, Google Sheets, HTTP Request)" },
    { p: "Tools are what make an agent useful. Click the **Tool +** connector for each one. Nearly any n8n integration can be a tool; the agent picks tools by their names and descriptions." },
    { h3: "Gmail tool: read unread emails" },
    { ol: [
      "Add **Gmail Tool** and connect a Gmail credential (on Cloud, click **Sign in with Google**; self-hosted users create an OAuth client in Google Cloud and paste the redirect URL n8n shows).",
      "Set **Resource** to Message and **Operation** to **Get Many**.",
      "Leave **Return All** off, set **Limit** to 20, and add the search filter `is:unread newer_than:1d`.",
      "Rename the tool to something descriptive, such as \"get_unread_emails\", and write a description: \"Fetches today's unread emails with sender, subject and snippet.\"",
    ] },
    { h3: "Gmail tool: apply labels and create drafts" },
    { ol: [
      "Add a second **Gmail Tool** with Operation **Add Label**. For Message ID and Label, click the star icon at the end of each field so the model fills them in. n8n inserts a `$fromAI()` expression automatically.",
      "Add a third **Gmail Tool** with Resource **Draft** and Operation **Create**. Let the model define the Subject and Message fields; set the Thread ID with `$fromAI('threadId')` so the draft lands in the right conversation.",
    ] },
    { p: "Use **drafts, not sends**, for your first agent. A model that misreads an email can do real damage with a Send operation. If you do add sending later, put it behind a human review step (Step 9)." },
    { h3: "Google Sheets tool: log important emails" },
    { ol: [
      "Create a sheet with the columns Date, From, Subject, Priority and Summary.",
      "Add **Google Sheets Tool** with Operation **Append Row**, pick the document and sheet, and map each column to a `$fromAI()` value, for example `$fromAI('priority', 'high, medium or low', 'string')`.",
      "Name it \"log_email\" with the description \"Adds one row per important email to the triage log.\"",
    ] },
    { h3: "HTTP Request tool: call any API" },
    { p: "Add **HTTP Request Tool** when no native node exists, for example to look up a sender in your CRM or post a summary to an internal webhook. Paste a cURL command from the API's docs with **Import cURL**, then let the model define only the parameters it needs." },

    { h2: "Step 7: Write the system message" },
    { p: "Open the AI Agent node, go to **Options**, then **System Message**. This is the most important setting. A clear system message is the difference between a reliable agent and a random one. Here is a working example for the triage agent:" },
    { quote: "You are an inbox triage assistant for Alex, founder of a small software company. When asked to triage, call get_unread_emails. For each email, decide priority: high (customers, investors, anything with a deadline in 48 hours), medium (partners, internal), low (newsletters, promotions). Apply the label Priority/High, Priority/Medium or Priority/Low with add_label. Log every high-priority email with log_email. For high-priority emails that need an answer, create a short, friendly draft reply with create_draft. Never send emails. Never delete anything. If you are unsure about priority, choose medium and say why. Finish with a bullet summary of what you did." },
    { p: "Name every tool in the prompt, state what the agent must never do, and create the three Gmail labels before testing, or the label step will fail." },

    { h2: "Step 8: Test the agent in chat" },
    { ol: [
      "Click **Open chat** at the bottom of the canvas.",
      "Type: \"Triage my inbox from today.\"",
      "Watch each node light up as the agent calls tools. Click the AI Agent node afterwards and open the logs to see every tool call, its inputs and its outputs.",
      "Ask a follow-up to test memory: \"Which of those were from customers?\"",
      "Check Gmail for labels and drafts, and the Google Sheet for new rows.",
    ] },
    { p: "Also test edge cases, such as an empty inbox or a newsletter disguised as urgent, and refine the system message after each wrong call." },

    { h2: "Step 9: Add human review and guardrails" },
    { p: "The Tools Agent supports **human review**, which pauses the workflow and asks a person to approve a specific tool call before it runs. Gate any tool that sends messages, edits records or spends money. Other guardrails worth adding:" },
    { ul: [
      "Use the narrowest Google permissions you can, and a separate test Gmail account while building.",
      "Treat email content as untrusted: tell the agent in the system message to ignore instructions found inside emails.",
      "Set up an error workflow with the **Error Trigger** node so you are alerted when a run fails.",
    ] },

    { h2: "Step 10: Publish and deploy the agent" },
    { p: "When the agent behaves well, deploy it in one of three ways:" },
    { ol: [
      "**Public chat page:** in the Chat Trigger, turn on **Make Chat Publicly Available**, choose **Hosted Chat**, set an **Initial Message** and choose **Authentication** (None, Basic Auth or n8n User Auth). Publish the workflow and share the chat URL.",
      "**Embedded chat:** choose **Embedded Chat** mode and add n8n's chat widget to your website. Set **Allowed Origin (CORS)** to your domain instead of the default `*`.",
      "**Fully automatic:** replace the Chat Trigger with a **Schedule Trigger** (for example every weekday at 8:00) and set the agent's prompt to **Define below** with the text \"Triage my inbox from today.\" The agent then runs without anyone opening a chat.",
    ] },
    { p: "A weekday schedule uses about 22 executions a month, a tiny share of the Starter quota." },

    { h2: "Step 11 (optional): Connect MCP" },
    { p: "n8n supports the Model Context Protocol in both directions." },
    { ul: [
      "**MCP Client Tool:** attach it to the agent as a tool, paste an MCP server's endpoint, add authentication (Bearer, header or OAuth2) and choose **Tools to Include** (All, Selected or All Except). Your agent can then use every tool that server offers.",
      "**MCP Server Trigger:** start a separate workflow with this trigger and attach tools or **Custom n8n Workflow Tool** nodes. Publishing gives you a production URL that MCP clients such as [Claude](/tools/claude) or [Cursor](/tools/cursor) can call over SSE or streamable HTTP. Claude Desktop connects through a bridge such as `mcp-remote`, as the [MCP Server Trigger docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.mcptrigger/) explain.",
    ] },

    { h2: "Common errors and how to fix them" },
    { p: "These come from n8n's [AI Agent common issues page](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/common-issues/) and frequent community questions." },
    { table: {
      head: ["Error or symptom", "Cause", "Fix"],
      rows: [
        ["\"A Chat Model sub-node must be connected\"", "No model attached to the agent", "Click **Chat Model +** and add a model with a valid credential"],
        ["\"No prompt specified\"", "Prompt expects a Chat Trigger that is not there (for example after switching to a Schedule Trigger)", "Set the prompt to **Define below** and type the instruction"],
        ["\"Invalid value for 'content': expected a string, got null\"", "The prompt expression resolves to an empty value", "Check the expression in the prompt field, or remove null `chatInput` values"],
        ["\"Error in sub-node Simple Memory\"", "An old memory node version, often from a copied template", "Delete the Simple Memory node and add it again"],
        ["Agent never calls a tool", "Vague tool names or descriptions", "Rename tools clearly, describe when to use them, and name them in the system message"],
        ["Google credential fails on self-hosted n8n", "OAuth redirect URL mismatch", "Copy the exact redirect URL from n8n into your Google Cloud OAuth client"],
      ],
    } },

    { h2: "Tips for better n8n agents" },
    { ul: [
      "**Start with one tool,** confirm it works, then add the next.",
      "**Keep tool output small.** Return snippets and IDs, not full email bodies.",
      "**Use a structured output parser** when another system consumes the result, for example a JSON summary for Slack.",
    ] },
    { p: "Want to see what else agents can do outside n8n? Our list of the [best AI agents](/blog/best-ai-agents) covers ready-made agents for research, browsing and coding, and our guide to the [best AI productivity tools](/blog/best-ai-productivity-tools) covers apps worth connecting." },

    { h2: "FAQ" },
    { h3: "Is n8n free for building AI agents?" },
    { p: "The self-hosted Community edition is free and includes the AI Agent node, memory, tools and MCP nodes, with unlimited executions. You still pay your model provider for tokens unless you run a local model with Ollama. n8n Cloud starts at €20 per month billed annually for 2,500 executions." },
    { h3: "Do I need to know how to code to build an AI agent in n8n?" },
    { p: "No. Everything in this guide uses visual nodes, dropdowns and plain-English prompts. Basic familiarity with expressions such as `$fromAI()` helps, and n8n fills those in when you click the star icon. Code nodes in JavaScript or Python are available if you later need custom logic." },
    { h3: "Which AI model is best for n8n agents?" },
    { p: "Any current model from OpenAI, Anthropic or Google handles tool calling well. Fast, low-cost models suit simple triage and routing. Larger reasoning models are better for research agents with many tools and long instructions. Add a fallback model from a second provider for reliability." },
    { h3: "Can n8n AI agents remember past conversations?" },
    { p: "Yes, through a memory sub-node. Simple Memory keeps a window of recent messages per session and is ideal for testing. For production or long-term history, use Postgres Chat Memory or Redis Chat Memory, and turn on Load Previous Session in the Chat Trigger to show earlier messages." },
    { h3: "Does n8n support MCP?" },
    { p: "Yes. The MCP Client Tool lets n8n agents use tools from external MCP servers, and the MCP Server Trigger turns an n8n workflow into an MCP server that Claude, Cursor and other clients can call over SSE or streamable HTTP. Both are included in all plans, including self-hosted." },
    { h3: "How many executions does an n8n AI agent use?" },
    { p: "One per workflow run. If a chat message triggers the agent and it calls six tools before answering, that is still one execution on n8n Cloud. Each chat message is a separate run, so a 10-message conversation uses about 10 executions." },

    { h2: "Bottom line" },
    { p: "n8n is one of the most practical ways to build an AI agent in 2026: a visual canvas, any major model, real tools across 500+ integrations, MCP in both directions, and the option to self-host for free. Start with the triage agent above, keep it on drafts and human review until you trust it, then put it on a schedule." },

    { hr: true },
    { p: "Explore more agent builders and automation platforms in the [AI agents category](/categories/agents) and the [AI productivity category](/categories/productivity). Building an AI agent tool we have missed? [Submit it for a listing](/submit)." },
  ],
};

export default post;
