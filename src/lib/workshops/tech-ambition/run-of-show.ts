import { minutesToMs } from "@/lib/workshops/tech-ambition/clock";
import type {
  ClinicRound,
  HourbackStep,
  WorkshopBlock,
  WorkshopScreen,
} from "@/lib/workshops/tech-ambition/types";

export const WORKSHOP = {
  title: "CoDesign & AI Workshop",
  subtitle: "Three and a half hours to turn AI topics into decisions",
  hosts: ["Arnaud Keravis", "Henri Abt"],
  when: "22 September 2026",
  where: "Chantilly",
  window: "13:00-16:30",
  audience: "Craft & Scale AI Use Cases",
} as const;

export const PROUD_SPEAKER_MS = minutesToMs(2);
export const CLINIC_ROUND_MS = minutesToMs(15);
export const CLINIC_REPORT_MS = minutesToMs(3);
export const HOURBACK_STEP_MS = {
  1: minutesToMs(15),
  2: minutesToMs(5),
  3: minutesToMs(20),
} as const satisfies Record<HourbackStep, number>;

export const BLOCKS: WorkshopBlock[] = [
  { id: "open", label: "Open", short: "Open", start: "13:00", durationMin: null, accent: "#1968FF" },
  { id: "fy26", label: "CoDesign FY26", short: "FY26", start: "13:00", durationMin: 20, accent: "#1968FF" },
  { id: "ai", label: "AI 101", short: "AI", start: "13:20", durationMin: 15, accent: "#915FC8" },
  { id: "proud", label: "Proud of", short: "Proud", start: "13:35", durationMin: 30, accent: "#34A866" },
  { id: "strategy", label: "Strategy", short: "Strategy", start: "14:05", durationMin: 30, accent: "#EF661A" },
  { id: "break", label: "Break", short: "Break", start: "14:35", durationMin: 10, accent: "#5A6280" },
  { id: "clinics", label: "AI Clinics", short: "Clinics", start: "14:45", durationMin: 35, accent: "#915FC8" },
  { id: "roadmap", label: "AI agents strategy sharing", short: "Share", start: "15:20", durationMin: 20, accent: "#199CDA" },
  { id: "hourback", label: "Hands-on", short: "Build", start: "15:40", durationMin: 40, accent: "#228085" },
  { id: "close", label: "What walks out", short: "Close", start: "16:20", durationMin: 10, accent: "#B28B4E" },
];

export const SCREENS: WorkshopScreen[] = [
  { id: "cover", blockId: "open", kind: "cover", label: "Cover", tone: "dark" },
  { id: "agenda", blockId: "open", kind: "agenda", label: "Agenda", tone: "light" },
  { id: "fy26-open", blockId: "fy26", kind: "intercalaire", label: "FY26", tone: "dark" },
  { id: "fy26-brief", blockId: "fy26", kind: "fy26-brief", label: "Leadership brief", tone: "light", timed: true, durationSec: 20 * 60 },
  { id: "ai-open", blockId: "ai", kind: "intercalaire", label: "AI 101", tone: "dark" },
  { id: "ai-wall", blockId: "ai", kind: "ai-wall", label: "Hit a wall?", tone: "light", timed: true },
  { id: "ai-layers", blockId: "ai", kind: "ai-layers", label: "Model product harness", tone: "light", timed: true },
  { id: "ai-buying", blockId: "ai", kind: "ai-buying", label: "Buying AI", tone: "light", timed: true },
  { id: "proud-open", blockId: "proud", kind: "intercalaire", label: "Proud of", tone: "dark" },
  { id: "proud-brief", blockId: "proud", kind: "proud-brief", label: "The brief", tone: "light", timed: true },
  { id: "proud-ritual", blockId: "proud", kind: "proud-ritual", label: "2 minutes", tone: "dark", timed: true },
  { id: "strategy-open", blockId: "strategy", kind: "intercalaire", label: "Strategy", tone: "dark" },
  { id: "strategy-brief", blockId: "strategy", kind: "strategy-brief", label: "Vision", tone: "light", timed: true },
  { id: "strategy-priorities", blockId: "strategy", kind: "strategy-accel", label: "Three priorities", tone: "light", timed: true },
  { id: "strategy-everyday", blockId: "strategy", kind: "strategy-accel", label: "Everyday AI", tone: "light", timed: true },
  { id: "strategy-providers", blockId: "strategy", kind: "strategy-accel", label: "Two providers", tone: "light", timed: true },
  { id: "strategy-platforms", blockId: "strategy", kind: "strategy-accel", label: "Business platforms", tone: "light", timed: true },
  { id: "strategy-delivery", blockId: "strategy", kind: "strategy-accel", label: "Delivery models", tone: "light", timed: true },
  { id: "strategy-agentic", blockId: "strategy", kind: "strategy-accel", label: "Agentic platform", tone: "light", timed: true },
  { id: "strategy-factories", blockId: "strategy", kind: "strategy-accel", label: "AI-native delivery", tone: "light", timed: true },
  { id: "break", blockId: "break", kind: "break", label: "Break", tone: "dark", timed: true },
  { id: "clinics-open", blockId: "clinics", kind: "intercalaire", label: "Clinics", tone: "dark" },
  { id: "clinics-scores", blockId: "clinics", kind: "clinics-scores", label: "Scores", tone: "light", timed: true },
  { id: "clinics-tables", blockId: "clinics", kind: "clinics-tables", label: "Six tables", tone: "light", timed: true },
  { id: "clinics-ritual", blockId: "clinics", kind: "clinics-ritual", label: "Rounds", tone: "dark", timed: true },
  { id: "roadmap-open", blockId: "roadmap", kind: "intercalaire", label: "Strategy sharing", tone: "dark" },
  { id: "roadmap-roster", blockId: "roadmap", kind: "roadmap-roster", label: "Leaders", tone: "light", timed: true },
  { id: "roadmap-sales", blockId: "roadmap", kind: "roadmap-track", label: "Sales", tone: "light", timed: true },
  { id: "roadmap-supply", blockId: "roadmap", kind: "roadmap-track", label: "Supply", tone: "light", timed: true },
  { id: "roadmap-ops", blockId: "roadmap", kind: "roadmap-track", label: "Ops", tone: "light", timed: true },
  { id: "roadmap-labor", blockId: "roadmap", kind: "roadmap-track", label: "Labor", tone: "light", timed: true },
  { id: "roadmap-fm", blockId: "roadmap", kind: "roadmap-track", label: "FM", tone: "light", timed: true },
  { id: "roadmap-gbs-scope", blockId: "roadmap", kind: "gbs-deck", label: "GBS scope", tone: "light", timed: true },
  { id: "roadmap-gbs-status", blockId: "roadmap", kind: "gbs-deck", label: "GBS status", tone: "light", timed: true },
  { id: "roadmap-gbs-sut", blockId: "roadmap", kind: "gbs-deck", label: "GBS SUT", tone: "light", timed: true },
  { id: "roadmap-gbs-workflow", blockId: "roadmap", kind: "gbs-deck", label: "GBS workflow", tone: "light", timed: true },
  { id: "roadmap-gbs-pipeline", blockId: "roadmap", kind: "gbs-deck", label: "GBS pipeline", tone: "light", timed: true },
  { id: "hourback-open", blockId: "hourback", kind: "intercalaire", label: "Hands-on", tone: "dark" },
  { id: "hourback-overview", blockId: "hourback", kind: "hourback-overview", label: "Three steps", tone: "light", timed: true },
  { id: "hourback-ritual", blockId: "hourback", kind: "hourback-ritual", label: "Build", tone: "dark", timed: true },
  { id: "close-open", blockId: "close", kind: "intercalaire", label: "Close", tone: "dark" },
  { id: "close-walkout", blockId: "close", kind: "close-walkout", label: "Walk out", tone: "light", timed: true },
  { id: "thanks", blockId: "close", kind: "thanks", label: "Thank you", tone: "dark" },
];

export const INTERCALAIRES: Record<
  string,
  { number: string; title: string; detail: string; portrait?: { src: string; alt: string } }
> = {
  fy26: {
    number: "01",
    title: "CoDesign FY26",
    detail: "The FY26 leadership brief. Proof, scale, and three questions",
  },
  ai: {
    number: "02",
    title: "What you need to know about AI",
    detail: "Henri. The vocabulary for the business conversation",
    portrait: {
      src: "/workshops/tech-ambition/maxime.png",
      alt: "Maxime",
    },
  },
  proud: {
    number: "03",
    title: "Proud of",
    detail: "Everyone. One agent or use case you built this year",
  },
  strategy: {
    number: "04",
    title: "AI Strategy & Agentic Platform",
    detail: "Henri & Kevin. Vision, trends and maturity",
  },
  clinics: {
    number: "05",
    title: "AI Clinics",
    detail: "Six dimensions. Round one defines, round two solves",
  },
  roadmap: {
    number: "06",
    title: "AI agents strategy sharing",
    detail: "Six leaders. What is live, what is next, what is blocked. Three minutes each.",
  },
  hourback: {
    number: "07",
    title: "Hands-on",
    detail: "Forty minutes. Chief of staff, then one real thing that runs",
  },
  close: {
    number: "08",
    title: "What walks out",
    detail: "Owners, dates, and the hours we got back",
  },
};

export const AGENDA = [
  { time: "13:00", mins: "20'", title: "CoDesign FY26", who: "Leadership brief. Proof, scale, and what I need from you" },
  { time: "13:20", mins: "15'", title: "What you need to know about AI", who: "Henri. The vocabulary for the business conversation" },
  { time: "13:35", mins: "30'", title: "Proud of", who: "Everyone. One agent or use case you built this year" },
  { time: "14:05", mins: "30'", title: "AI Strategy & Agentic Platform", who: "Henri & Kevin. Vision, trends, maturity" },
  { time: "14:35", mins: "10'", title: "Break", who: "" },
  { time: "14:45", mins: "35'", title: "AI Clinics", who: "Six dimensions. Define, then solve" },
  { time: "15:20", mins: "20'", title: "AI agents strategy sharing", who: "Sales, Supply, Ops, Labor, FM, GBS. Six leaders, three minutes each" },
  { time: "15:40", mins: "40'", title: "Hands-on", who: "Chief of staff, then one real thing that runs" },
  { time: "16:20", mins: "10'", title: "What walks out", who: "Owners, dates, and the hours we got back" },
] as const;

export const FY26_HERO = {
  value: "€1.1B",
  label: "FY26 active impact",
  detail: "Annualised contract value progressed via CoDesign",
} as const;

export const FY26_KPIS = [
  { value: "80+", label: "CoDesign pipeline", detail: "Leads, opportunities and projects across FY26" },
  { value: "102", label: "Lab bookings", detail: "Workshops, events and visits since opening" },
  { value: "+53", label: "Net Promoter Score", detail: "Based on 43 client and internal surveys" },
] as const;

export const FY26_OUTPUTS = [
  { value: "30", label: "projects delivered" },
  { value: "8", label: "strategic wins" },
  { value: "13", label: "countries" },
  { value: "25", label: "workshops run" },
  { value: "1000+", label: "ideas generated" },
  { value: "20", label: "prototypes built" },
] as const;

export const FY26_QUESTIONS = [
  {
    title: "How do you see the method?",
    body: "Does it fit how you already work with clients? What would you drop tomorrow?",
  },
  {
    title: "What would it take to scale it?",
    body: "Capability, process, or support from the CoE. Name the binding one.",
  },
  {
    title: "Where would you use it first?",
    body: "Which account, which problem, what success looks like at six months.",
  },
] as const;

export const AI_WALL = [
  { when: "July", text: "AI agents from OpenAI hacked Hugging Face to hide that they cheated on a problem" },
  { when: "August", text: "ChatGPT passed 1b weekly users and went hard for advertising" },
  { when: "Sep 3", text: "Nvidia bought Hugging Face for $13bn" },
  { when: "Sep 8", text: "OpenAI probably settled one of the Millennium math problems" },
  { when: "Sep 9", text: "Anthropic Safety Lead said his p(doom) exceeds 10%" },
  { when: "Sep 14", text: "Google announced narrow recursive improvement" },
] as const;

export const AI_LAYERS = {
  model: {
    n: "01",
    title: "Model",
    role: "The intelligence",
    body: "Generates, predicts and reasons",
    kinds: ["LLM", "SLM", "Multimodal"],
    examples: "GPT-5.2 · Gemini 3.1",
    accent: "#2BB8B3",
  },
  product: {
    n: "02",
    title: "Product",
    role: "The user experience",
    body: "Turns models into a usable service",
    examples: "ChatGPT · Copilot",
    channels: "Web · mobile · desktop",
    accent: "#2B5CFF",
  },
  harness: {
    n: "03",
    title: "Harness",
    role: "The capabilities",
    body: "Connects context, tools and actions",
    nodes: ["Skills", "MCP", "APIs", "Systems"],
    includes: "Memory · routing · permissions · controls",
    access: "Skills · MCP servers · APIs · enterprise systems",
    accent: "#E0B34A",
  },
} as const;

export const AI_BUYING = [
  {
    title: "Commercial model",
    kicker: "3 layers",
    body: "Seat licences, prepaid credits and pay-as-you-go tokens coexist, often with different scopes, rates and expiry rules.",
  },
  {
    title: "Reconciliation gap",
    kicker: "Usage ≠ bill",
    body: "Vendors separate usage and cost reports. Clients get over-invoiced without vendor intent.",
  },
  {
    title: "Unit price",
    kicker: "Price down",
    body: "Caching, batch and cheaper models reduce cost per token, only for eligible workloads and token classes.",
  },
  {
    title: "Usage boom",
    kicker: "Volume up",
    body: "Acceleration in usage outruns the drop in unit price. The bill still grows.",
  },
] as const;

export const PROUD_SAY = [
  "Your name, your area, one thing you shipped.",
  "What it changed for the person using it.",
  "One number if you have one. If not, say so.",
] as const;

export const PROUD_DONT = [
  "No slide, no screen share, no roadmap.",
  "No list of everything your team did.",
  "Do not run over. The next person loses their turn.",
] as const;

export const STRATEGY_COVERS = [
  "Where the agentic platform stands today and what it unlocks in FY27.",
  "The trends that matter for us, and the ones that do not.",
  "What a good agentic use case looks like, and what a bad one looks like.",
  "The FY26 maturity assessment, run interactively with the room.",
] as const;

export const STRATEGY_SETUP = [
  "A shared vocabulary before we split into tables.",
  "The maturity picture that defines the six clinic tables.",
  "A clear line on what the platform will and will not do for a region.",
  "Enough confidence for everyone to contribute in the next block.",
] as const;

export const FY27_ACCEL = {
  priorities: {
    title: "AI Acceleration focuses on three priorities, each with a dedicated delivery model",
    what: [
      {
        n: "1",
        title: "Everyday AI",
        body: "Equip every employee with approved AI generic tools, and coach them",
        tools: "Copilot, ChatGPT, Claude? …",
        outcome: "Adoption / self efficiency",
        share: "~20%",
        accent: "#2B5CFF",
      },
      {
        n: "2",
        title: "AI in business platforms (buy) / Integrated into Spark",
        body: "Embed agents in Spark solutions and core business platforms",
        tools: "SAP, Salesforce, Kronos, Spark OS, Spark XP, Spark IQ…",
        outcome: "Business efficiency",
        share: "~20%",
        accent: "#2BB8B3",
      },
      {
        n: "3",
        title: "AI as a differentiator (build) / Integrated into Spark",
        body: "Build Sodexo IP assets by using AI to accelerate and improve the delivery of AI products",
        tools: "Client360, Menu & Recipe AI, AI for TOM, Labor AI…",
        outcome: "Business efficiency / growth",
        share: "~60%",
        accent: "#E24B4B",
      },
    ],
    how: [
      {
        title: "Central platform and adoption engine",
        points: [
          "AI Acceleration selects platforms, sets guardrails and measures usage",
          "AI Champions + Digital Workplace team scale adoption",
        ],
        account: "Accountable  AI Acceleration",
        accent: "#2B5CFF",
      },
      {
        title: "CoE enablement for Business and Spark XP platforms",
        points: [
          "AI Acceleration provides agent fabric, golden paths and expert support",
          "Spark teams own product roadmap, build, deployment and run",
        ],
        account: "Accountable  Business and Spark platform CoEs",
        accent: "#2BB8B3",
      },
      {
        title: "Prove, codify, then transfer to factories",
        points: [
          "Today: AI Acceleration and factories co-deliver lighthouse products",
          "By FY27 year-end: 100% of delivery in factories; AI Acceleration measures TTM and maintains reusable assets",
        ],
        account: "Delivery ownership  AI CoE + factories → 100% factories",
        accent: "#E24B4B",
      },
    ],
    footer:
      "AI CoE provides a common model, the agentic platform and expert AI support while pillar 1 and 2 CoEs own delivery",
  },
  everyday: {
    title: "We aim at a broad access to AI tools, but more importantly at sustained adoption",
    kicker: "HR leadership is sponsoring",
    columns: [
      {
        n: "1.1",
        title: "Deploy Everyday AI",
        body: "Put approved AI tools in every employee's flow of work",
        rows: [
          { label: "Default access", value: "Copilot Chat for all employees" },
          { label: "Advanced access", value: "Copilot Premium or ChatGPT Enterprise" },
          { label: "One enablement model", value: "Onboarding, support, analytics and governance" },
        ],
        metrics: ["30k+ WAU", "≥70% PMF"],
      },
      {
        n: "1.2",
        title: "Activate AI Champions",
        body: "Turn central capability into local, peer-led adoption",
        rows: [
          { label: "Who", value: "Operational influencers close to daily work" },
          { label: "What they do", value: "Train peers · surface use cases · reuse practices" },
        ],
        rollout: "Current rollout — 7 Sep 2026",
        stats: [
          { value: "5/7", label: "regions" },
          { value: "~160", label: "identified" },
          { value: "3", label: "kick-offs" },
        ],
        foot: "100 active champions · 10+ use cases",
      },
      {
        n: "1.3",
        title: "Relaunch AI learning path",
        body: "Provide maturity and role-based AI learning specific to Sodexo",
        rows: [
          { label: "Now", value: "Available on Access" },
          { label: "Next", value: "Increase visibility across channels and onboarding" },
          { label: "v2", value: "Custom Sodexo content, examples and role pathways" },
        ],
      },
    ],
    also: [
      "Replace acculturation and GBL / GLT individual coaching",
      "Hackathons",
      "Gamification (e.g., Mendo)",
      "Governance of specific AI solutions (e.g., Synthesia)",
    ],
  },
  providers: {
    title: "1.1 A balanced two-provider model giving every employee the right AI for the job",
    rows: [
      {
        n: "01",
        kicker: "Default access",
        title: "Copilot Chat is the baseline for everyone",
        body: "Daily productivity, search and standard work in the Microsoft flow",
        facts: [
          { value: "30k+", label: "target weekly active users" },
          { value: "Included", label: "in existing M365" },
          { value: "Agents", label: "paid on consumption" },
        ],
      },
      {
        n: "02",
        kicker: "Advanced users",
        title: "Allocate paid access by persona and use case",
        split: [
          {
            name: "Copilot Premium",
            body: "M365 integration + Copilot Studio agents",
            note: "Either / or. Avoid duplicate paid access.",
          },
          {
            name: "ChatGPT Enterprise",
            body: "Advanced workflows, coding and transformation",
            note: "~50 / 50. Target balance of the paid envelope.",
          },
        ],
      },
      {
        n: "03",
        kicker: "Guardrails",
        title: "Annual capacity: €1.5–1.8m with capped downside",
      },
    ],
  },
  platforms: {
    title: "2) We need to reinforce our focus on direct execution of agentic solutions within Business and Spark XP platforms",
    lede: "This will require a greater collaboration between AI CoE and Business & Spark XP platform teams (Domain leads and CoEs) while keeping a transversal view on all built agents through Sodexo Control Plane",
    okrs: ["FY27 OKRs", "Active agents", "Adoption by platform", "Value realised", "Control-plane coverage"],
    pillars: [
      {
        n: "2.1",
        title: "Clear guardrails",
        body: "Define autonomy levels, permitted actions and human oversight before an agent reaches production.",
        account: "AI CoE",
        accent: "#2B5CFF",
      },
      {
        n: "2.2",
        title: "Partner learning",
        body: "Continue structured collaboration with key AI and SaaS providers. Test new capabilities and feed lessons into reusable golden paths.",
        account: "Domain leads",
        accent: "#2BB8B3",
      },
      {
        n: "2.3",
        title: "Embedded ownership",
        body: "Place AI builders in platform teams to manage the use-case development and adoption. The AI CoE supplies the right talent and training.",
        account: "Business / Spark platform CoEs",
        accent: "#34A866",
      },
      {
        n: "2.4",
        title: "Control plane",
        body: "Use the agentic control plane to inventory and monitor agents across all business platforms.",
        account: "AI CoE and Business / Spark platform teams",
        accent: "#E24B4B",
      },
    ],
    next: [
      "List all agents built in these platforms while inputting the right information with our Sodexo control plane",
      "Publish autonomy and approval guardrails",
      "Nominate a dedicated transversal AI lead for Business platform to drive Domain leads and CoEs ownership",
    ],
  },
  delivery: {
    title: "3) Three AI delivery models to support execution of high value use cases",
    models: [
      {
        n: "3.1",
        title: "AI developed by business with support of expert teams",
        body: "Development of agentic capabilities by the business, supported by AI champions and global experts to bring value fast and efficiently",
        accent: "#2B5CFF",
        exampleTitle: "AI for Supply",
        example: "New use cases identified for TOM to reduce the weight of several processes on the critical path (mapping, hypercare, …) and secure the scale",
      },
      {
        n: "3.2",
        title: "AI as part of the product delivered to the end user",
        body: "Embedded genAI or agentic solutions within wider product to enrich the value proposition and in particular support deployment",
        accent: "#E24B4B",
        exampleTitle: "AI for Food",
        exampleKicker: "Menu & Recipe AI",
        example: "Embedding of recipe qualification to ease the deployment workload on the business. Automatic qualification of recipes to enrich menus.",
      },
      {
        n: "3.3",
        title: "AI to enhance development and product practices",
        body: "Support in development practices or product management models to enhance delivery teams and multiply their capacity to execute",
        accent: "#F0A030",
        exampleTitle: "AI for Commercial",
        exampleKicker: "Client360",
        example: "Full leverage of the new practices to be able to deploy a new product in months within several regions",
      },
    ],
  },
  agentic: {
    title: "Sodexo agentic platform provides shared control and capabilities across all platforms that support agent building",
    control: {
      title: "P0  Control plane",
      lede: "One transversal governance layer across all (business) platforms",
      items: [
        { title: "Inventory & identity", body: "Know every agent, owner, version and environment" },
        { title: "Policy & permissions", body: "Enforce access, approvals and human-in-the-loop rules" },
        { title: "Observability & AI FinOps", body: "Monitor quality, cost, latency, risk and performance" },
        { title: "Audit & response", body: "Trace actions, pause, revoke or investigate an agent" },
      ],
    },
    mid: "AI agents (models + context + capabilities) are designed, built and run in each platform",
    platforms: ["Copilot", "ChatGPT", "Databricks", "SAP", "Salesforce"],
    platformPoints: [
      "Assist users",
      "Orchestrate workflows",
      "Invoke models & tools",
      "Grounded in business context",
      "Connect to systems of record",
    ],
    fabric: {
      title: "P1  Agent fabric",
      lede: "A shared capability that gives agents trusted data access and permissioned actions",
      items: [
        {
          title: "Data-centric access",
          body: "Ground agents in governed data products, semantic definitions and source entitlements, across Sodexo",
        },
        {
          title: "Capabilities & actions",
          body: "Expose reusable skills, APIs and MCP tools with scoped read/write permissions — e.g., update Excel, create a case or trigger a workflow.",
        },
      ],
    },
  },
  factories: {
    title: "AI Acceleration also incubates a much faster AI-native delivery model, to be progressively rolled-out in the factories",
    steps: [
      { n: "01", title: "Listen", body: "Record and transcribe users and business owners" },
      { n: "02", title: "Frame", body: "Extract needs and refine the intent" },
      { n: "03", title: "Define", body: "Draft stories and the definition of done" },
      { n: "04", title: "Design", body: "Agents turn intent into flows and interfaces" },
      { n: "05", title: "Build", body: "Generate code and iterate on the ask" },
      { n: "06", title: "Test", body: "Test features, data and interfaces" },
      { n: "07", title: "Release + learn", body: "Go live, capture feedback and improve" },
    ],
    bar: "Agents capture context, sharpen the ask, build, test and learn while teams keep ownership",
    proofs: [
      "Client360: From prototype to being live for all NorAm scope in 10 weeks, with a two-person development squad",
      "Client360 Companion: Answers technical and business questions based on what the code says, not PowerPoints",
    ],
  },
} as const;

export const MATURITY = [
  { id: "strategy", label: "Strategy & Leadership", score: "3.50", fy25: "2.44", table: 6 },
  { id: "delivery", label: "Use Case Delivery & Impact", score: "3.00", fy25: "2.63", table: 1 },
  { id: "talent", label: "Talent & Organization", score: "2.63", fy25: "1.98", table: 2 },
  { id: "culture", label: "Culture & Adoption", score: "2.51", fy25: "1.73", table: 3 },
  { id: "gov", label: "Governance & Risk Mgmt", score: "2.35", fy25: "1.96", table: 4 },
  { id: "responsible", label: "Responsible & Sustainable AI", score: "2.33", fy25: "1.60", table: 5 },
  { id: "data", label: "Data & Infrastructure", score: "2.37", fy25: "2.02", table: null },
] as const;

export const CLINIC_TABLES = [
  {
    n: 1,
    title: "Use Case Delivery & Impact",
    score: "3.00",
    host: "Anshul Bhardwaj",
    question: "Why do use cases stall between PoC and scale?",
    round1: "Tarun · Kevin · Sophie",
    round2: "Gabriel · Mark · Kevin",
  },
  {
    n: 2,
    title: "Talent & Organization",
    score: "2.63",
    host: "Luis Marques",
    question: "Who is missing, and at what seniority?",
    round1: "Ashwin · Alexandre · Samuel",
    round2: "Tarun · Jamie · Charlotte",
  },
  {
    n: 3,
    title: "Culture & Adoption",
    score: "2.51",
    host: "Alexandra Montgomery",
    question: "Why do people not use what we already shipped?",
    round1: "Yida · Mark · Julien",
    round2: "Ashwin · Eric · Malika",
  },
  {
    n: 4,
    title: "Governance & Risk Management",
    score: "2.35",
    host: "Vincent Pelletier",
    question: "What decision are we waiting on, and from whom?",
    round1: "Gabriel · Jamie · Eric",
    round2: "Yida · Kevin · Samuel",
  },
  {
    n: 5,
    title: "Responsible & Sustainable AI",
    score: "2.33",
    host: "Henri Abt",
    question: "What would we not defend publicly?",
    round1: "Thomas · Malika",
    round2: "Alexandre · Julien",
  },
  {
    n: 6,
    title: "Strategy & Leadership",
    score: "3.50",
    host: "Maxime Marembaud",
    question: "Does the strategy survive contact with a region?",
    round1: "Kevin · Charlotte",
    round2: "Sophie · Thomas",
  },
] as const;

export const CLINIC_ROUND_COPY: Record<
  ClinicRound,
  { title: string; clock: string; rule: string }
> = {
  1: {
    title: "Round 1 · Define",
    clock: "15 minutes",
    rule: "Three to five problems, written sharp. Symptoms, not solutions.",
  },
  2: {
    title: "Round 2 · Solve",
    clock: "15 minutes",
    rule: "Read what round one wrote. Per problem: one action, one owner, one date.",
  },
  report: {
    title: "Hosts report",
    clock: "3 minutes",
    rule: "The host is the only person who writes. Three minutes, then we move.",
  },
};

export const HOURBACK_STEPS = [
  {
    step: 1 as HourbackStep,
    title: "Build your chief of staff",
    mins: "15'",
    who: "Arnaud",
    body: "Everyone creates or upgrades a real one. It knows your OKRs, your team, your stakeholders, your rhythm.",
    example: "Drafts your Monday note from last week’s decisions, your 1:1s and the OKRs you actually care about.",
  },
  {
    step: 2 as HourbackStep,
    title: "Skills & projects",
    mins: "5'",
    who: "Henri",
    body: "The difference between a prompt, a skill and a project, and when each one is the right container.",
    example: "A skill that turns a clinic note into owner, action and date. A project that holds the FY27 brief so you stop re-pasting it.",
  },
  {
    step: 3 as HourbackStep,
    title: "Pick your pain point",
    mins: "20'",
    who: "Everyone",
    body: "One real pain point or one live project. Build the agent, skill or project context that takes it off your plate.",
    example: "The weekly ops pack. The inbox you answer three times. The follow-up still sitting in your notes.",
  },
] as const;

export const HOURBACK_CONTAINERS = [
  { title: "Prompt", body: "One-off. You re-explain every time." },
  { title: "Skill", body: "A repeatable task, done the same way, every time." },
  { title: "Project", body: "A durable context. You stop re-explaining." },
] as const;

export const ROADMAP_TRACKS = [
  {
    id: "sales",
    title: "Sales AI Agents",
    host: "Alexandra Montgomery",
    stage: "Live, POC and planned",
    lede: "A portfolio across bid, enablement and Salesforce. Not one agent.",
    filled: true as const,
  },
  {
    id: "supply",
    title: "Supply AI Agents",
    host: "Kevin Albrand",
    stage: "Discovery · scale inside two months",
    lede: "Protect Boost NorAm savings. Take human-intensive supply work off the plate.",
    filled: true as const,
  },
  {
    id: "ops",
    title: "AI Agents for Ops",
    host: "Luis Marques",
    stage: "Luis walks this",
    lede: "What is live, what is next, what is blocked. Three minutes.",
    filled: false as const,
  },
  {
    id: "labor",
    title: "Labor AI Agents",
    host: "Kevin Albrand",
    stage: "Kevin walks this",
    lede: "What is live, what is next, what is blocked. Three minutes.",
    filled: false as const,
  },
  {
    id: "fm",
    title: "AI for FM / Command Center",
    host: "Samuel",
    stage: "Samuel walks this",
    lede: "What is live, what is next, what is blocked. Three minutes.",
    filled: false as const,
  },
  {
    id: "gbs",
    title: "AI for GBS & Tech",
    host: "Anshul Bhardwaj",
    stage: "POC, discovery, and a funding hold",
    lede: "APMEA GBS. Talk to data is in POC. NorAm SUT is ready and waiting on funding. FP&A is in discovery.",
    filled: true as const,
  },
] as const;

export const SUPPLY_ROADMAP = {
  what: "Supply AI agents are essential to scale Boost NorAm and protect $10M+ in annual savings. They raise productivity on human-intensive work — PI / MI / SI mapping, General Manager exposure requests.",
  stage: "Discovery, with a need to scale within two months",
  values: [
    { value: ">$10M", label: "annual savings at risk" },
    { value: "1,000", label: "sites targeted by FY-end for Boost" },
    { value: "50%", label: "time-saving ambition" },
  ],
  next: [
    "Identify the relevant processes",
    "Onboard tech-savvy business people",
    "Launch simple agents on easy processes",
    "Prove value, then scale at pace",
  ],
  blocked: [
    "L1 support network — agentic-aware people who can support newly identified business builders",
    "L2 expert network — proven specialists who can share strong use cases and good practice",
    "Delivery capacity — external AI builders close to SMEs in Bogota to add bandwidth and sustain pace",
  ],
} as const;

export const SALES_ROADMAP = {
  live: [
    { name: "ChatGPT NorAm Sales Enablement", value: "80% user confidence · 60% weekly usage" },
    { name: "SoPro proposal drafting", value: "15% less GP drafting time" },
    { name: "BRIT Healthcare POC", value: "Planning from 4–8 hours to ~30 min / account" },
  ],
  building: [
    { name: "Athena · Schools / Universities bids", value: "Claimed $5–10M incremental · 30–50% analyst time" },
    { name: "Campus Benchmarking", value: "POC / building" },
    { name: "SORA · India RFPs", value: "10–30% efficiency · ~300 RFPs / year" },
  ],
  planned: [
    { name: "Agentforce BRIT", value: "4–8 hours to under 1 hour per account" },
    { name: "Agentforce Opportunity Scoring", value: "Higher-fidelity signals. Design session with Salesforce." },
  ],
  closed: "GSA no-code agent was closed after ideation.",
} as const;

export const GBS_DECK = {
  scope: {
    title: "Original Scope, for Reference",
    foot: "Digital & AI roadmap — update to SLT — May 2024",
    themes: [
      {
        name: "P2P",
        count: "6 UCs",
        accent: "#0F7B7B",
        items: [
          "Manual PO Creation",
          "Manual 3 Way Match",
          "Onboarding of vendors is a manual process",
          "Process Exceptions for invoice booking",
          "Supplier Payment Queries",
          "GR/IR Clearing for old unmatched items",
        ],
      },
      {
        name: "R2R",
        count: "8 UCs",
        accent: "#2B5CFF",
        items: [
          "Manual account reconciliation involving multiple data sources",
          "Multiple month end close activities",
          "Intercompany matching that needs multiple legal entities data",
          "Intelligent Journal Entry Preparation & Controls",
          "Variance Analysis for Management accounting",
          "Anomaly Detection & Continuous Audit",
          "Statutory & Regulatory Report",
          "Continuous Accounting & Real-Time Close",
        ],
      },
      {
        name: "O2C",
        count: "7 UCs",
        accent: "#34A866",
        items: [
          "Complex and multidimensional billing schedules",
          "Intelligent Cash Application & Remittance Matching",
          "Automated Debt Collection & Cash Recovery",
          "Contract-to-Invoice Reconciliation & Deduction",
          "Dispute Management & Resolution",
          "Revenue Forecasting & Leakage Detection",
          "Order Validation & Billing Setup",
        ],
      },
      {
        name: "MDM",
        count: "4 UCs",
        accent: "#EF661A",
        items: [
          "Vendor Master De-duplication",
          "Customer & Client Master Data Cleansing",
          "Data Quality Scoring & Continuous Governance",
          "MDM Change Request Automation & Audit Trail",
        ],
      },
      {
        name: "Reporting",
        count: "4 UCs",
        accent: "#2BB8B3",
        items: [
          "Manual data extraction and transformation and business insights",
          "Narrative & Variance Commentary",
          "Self-Serve Analytics Chatbot",
          "Ad-Hoc Report Generation & Data Democratisation",
        ],
      },
      {
        name: "HRSS",
        count: "4 UCs",
        accent: "#DA558C",
        items: [
          "Talent Acquisition & High-Volume Screening",
          "Attrition Prediction & Targeted Retention",
          "Payroll Anomaly Detection & Compliance Validation",
          "HR Self-Service (Multi-Language, 24/7)",
        ],
      },
    ],
  },
  status: {
    title: "APMEA GBS AI Initiative Status",
    rows: [
      {
        business: "GBS Finance – NORAM SUT TAX compliance",
        owners: "Ravi Sankar, Atul Gupta, Anand Gupta",
        date: "TBD",
        status: "On-hold for Funding Decision",
        tone: "risk",
        detail: [
          "SUT Compliance (NORAM): ~1,600 filings per month managed by a GBS team of ~14 members.",
          "4 use cases submitted with detailed cost-benefit analysis, representing 550+ hours of potential monthly savings, while improving end-to-end process visibility, establishing a structured approval mechanism and improving accuracy of the process.",
        ],
        next: [
          "Decision needed: Final approval is pending while there is acceptance on the business value",
          "Concerns regarding the funding mechanism will be addressed separately. Owner: Anshul",
        ],
        risk: "The Alteryx product implementation for one of the use case",
      },
      {
        business: "GBS Finance – FP&A + Forecasting",
        owners: "Ravi, Atul, Anand",
        date: "TBD",
        status: "Discovery",
        tone: "track",
        detail: [
          "Identified - 8+ different sources of data and 8 + areas of work identified including two main personas - Site Operations and Finance. Prioritized these use cases with operations and India FP&A team.",
          "GRN and Payroll – in discovery",
        ],
        next: [
          "Decision taken: Continue the discovery with the India FP&A team.",
          "Business Sponsorship: For insights focused on site management and operations, identify a sponsor. Owner: Anshul",
        ],
        risk: "",
      },
      {
        business: "GBS Reporting – Capability – Talk to data",
        owners: "Ravi, Atul, Anand",
        date: "TBD",
        status: "POC",
        tone: "track",
        detail: [
          "Talk to data",
          "Low code approach – copilot agent",
          "Code first approach",
        ],
        next: ["Demo"],
        risk: "",
      },
    ],
    related: [
      "Sales RFP Agent – Enablement is in progress for APMEA/India.",
      "GBS: SOP Chatbot – Aligns with “GBS Self-serve Chatbot” priority in AI for GBS. Once built, it can be extended to include other Knowledge bases beyond SOPs. Ravi is aligned with free 6 week MVP from Microsoft, long term scaling to be determined post evaluating DruidAI alternative.",
    ],
  },
  sut: {
    title: "NorAM SUT Tax use cases submitted for approval",
    rows: [
      {
        name: "Task Assignment & Tracking",
        solution:
          "Power Automate/Teams-based task creation, preparer assignment, due-date capture for state filings.",
        status: "Active estimation and POC",
        intangible:
          "1. End-to-End Visibility of filling progress and due dates. 2. Reduce missed tax deadlines. 3. Bring focus on tax preparation instead of administrative tracking, improving accuracy. 4. Can be easily extended for other tax compliance departments as well.",
        tangible: "Not quantified. Will save time for Heads of Tax, reviewers and other managers",
        days: "20",
        cost: "17,640.00 €",
      },
      {
        name: "Dashboard (status by state)",
        solution:
          "Simple 1-2 page Power BI view on top of task-tracker data — pending, by country, by resource.",
        status: "Active estimation and POC",
        intangible:
          "Leadership gains centralized visibility for review, sign-off and filing metrics. Better monitoring reduces missed deadlines. Save cost on penalties, interests and overpayments.",
        tangible:
          "Not quantified. But will save time for Heads of Tax, reviewers and other managers. Once team get access to past data they can extract information on penalties and interests.",
        days: "10",
        cost: "8,820.00 €",
      },
      {
        name: "PDF Extraction & Initial Excel Preparation",
        solution:
          "Automates SAP PDF output into Excel (currently manual copy/paste/calculate per legal entity); output feeds reconciliation & Vertex.",
        status: "Active estimation and POC",
        intangible:
          "1. Reduction in manual effort for updating the excel and reviewing data. 2. Improved accuracy due to removal of copy paste from PDF. 3. Can be extended to be used by any other team needed document intelligence. 4. Sets the foundation for document intelligence AI capabilities which is part of our proposed Agentic Platform.",
        tangible:
          "380 hours/month saved across extraction + reconciliation + compliance monitoring — vetted with Abhishek & Puneet on a 20% manual-effort-reduction assumption.",
        days: "30",
        cost: "26,460.00 €",
      },
      {
        name: "Reconciliation & Reviewer Exception Assistance",
        solution:
          "2-way match (Excel vs PDF), 3-way match (Excel vs Vertex extract), and reviewer exception-handling logic.",
        status: "Active estimation",
        intangible:
          "1. Reduces times reviewing and reconciling various documents. 2. Increase accuracy by automating data extraction and verification. 3. Can be extended to be used for any use case, where team has to compare and reconcile documents. 4. Sets the foundation for document intelligence AI capabilities.",
        tangible:
          "Saves approximately 168 hrs/month bundle on recon work. Vetted by Abhishek and Puneet",
        days: "24",
        cost: "21,420.00 €",
      },
    ],
  },
  workflow: {
    title: "Tax Compliance Workflow Management – End to End Workflow",
    lede: "Automate. Assign. Track. Approve. Comply.",
    steps: [
      "1. Task Creation",
      "2. Assignment",
      "3. Preparation",
      "4. Review & Approval",
      "5. Filing & Completion",
      "6. Monitoring & Escalation",
    ],
    system: [
      {
        title: "Auto-create tasks from tax calendar",
        items: ["Create records", "Capture deadlines", "Maintain audit history"],
      },
      {
        title: "Auto-assign preparers and reviewers",
        items: ["Rule-based", "Workload-based", "Skills-based"],
      },
      {
        title: "Status Tracking",
        items: ["In Progress", "Pending Review", "Pending Approval", "Completed"],
      },
      {
        title: "Deadline Monitoring & Escalation Engine",
        items: ["Monitor due dates", "Send reminders", "Escalate overdue", "Flag high-risk returns"],
      },
    ],
    preparer: [
      {
        title: "Prepare Return",
        items: ["Complete return", "Attach supporting documents", "Submit for review"],
      },
      {
        title: "File Return & Update Status",
        items: ["File with authority", "Update status", "Capture filing date", "Store return"],
      },
    ],
    reviewer: [
      {
        title: "Review Return",
        items: ["Validate & review", "Add comments", "Approve / Reject"],
      },
      {
        title: "Approval Decision",
        items: ["Approve", "Reject", "Add comments"],
      },
    ],
    manager: {
      title: "Escalation to Managers",
      items: ["Overdue items", "High-risk returns", "SLA breaches"],
    },
    outcome: "Return filed & completed",
    notify: [
      "Task Assigned (Preparer)",
      "Task Assigned (Reviewer)",
      "Due Date Reminder",
      "Overdue Reminder",
      "Escalation Notification",
      "Approval Requested",
      "Return Filed Confirmation",
    ],
  },
  pipeline: {
    title: "APMEA GBS AI use cases under consideration",
    rows: [
      {
        track: "AI Capabilities",
        use: "Talk to Data – conversational agent over Power BI",
        solution:
          "Unified conversational layer built over DB or Power BI dashboards (Brand Performance, FP&A, Soeze), replacing the single-product Copilot Studio prototype",
        area: "Finance and Operations",
        finance: "",
        ops: "",
      },
      {
        track: "AI Capabilities",
        use: "Document intelligence - Agent to pull data from structured and unstructured sources and organised into a customised output.",
        solution:
          "Unified agent that allows users to configure the agent to process the input they have into an output that they need.",
        area: "Finance and Operations",
        finance: "",
        ops: "",
      },
      {
        track: "SUT Compliance",
        use: "SUT Compliance – PDF extraction & reconciliation (NorAm)",
        solution:
          "Document Intelligence platform: automated PDF-to-Excel extraction plus deterministic reconciliation/balance validation, going further than Alteryx (which only handles extraction)",
        area: "Finance",
        finance: "Very High",
        ops: "NA",
      },
      {
        track: "Site Ops",
        use: "Site Manager Insights – Daily Food Cost (DFC) report & procurement chain",
        solution:
          "Automate the DFC report and/or build an approval-necessity audit layer across the Trade Agreement to PO to GRN chain",
        area: "Finance and Operations",
        finance: "NA",
        ops: "High",
      },
      {
        track: "FP&A (India)",
        use: "Annual budgeting",
        solution:
          "Systemic/ML-based application UI, replacing the manual back-and-forth with 100+ ops managers across ~1,200 locations",
        area: "Finance",
        finance: "Medium",
        ops: "High",
      },
      {
        track: "FP&A (India)",
        use: "Quarterly forecasting",
        solution: "Same systemic/ML-based approach as annual budgeting",
        area: "Finance Operations",
        finance: "High",
        ops: "High",
      },
      {
        track: "FP&A (India)",
        use: "Rate revision / inflation recovery tracking",
        solution:
          "Automated alerts/messages on rate changes (Leads to revenue loss hence high priority for FP&A India )",
        area: "Finance and Operations",
        finance: "High",
        ops: "High",
      },
      {
        track: "FP&A (India)",
        use: "Supply-chain/spend analytics",
        solution: "Supply analytics layer built off the existing GRN sheet",
        area: "Finance and Operations",
        finance: "High",
        ops: "High",
      },
      {
        track: "FP&A (India)",
        use: "Payroll – overtime pattern tracking",
        solution:
          "Automated alerts for overtime/rate mismatches + AI-powered reasoning collection from site managers, with system reconciliation + anomaly alerts",
        area: "Finance and Operations",
        finance: "High",
        ops: "Very High",
      },
      {
        track: "FP&A (India)",
        use: "Food cost / margin analysis",
        solution:
          "Alerts for cost-vs-target, wastage %, high-cost ingredient stats, seasonal price swings; an AI agent compiling it all into a leadership food report",
        area: "Operations",
        finance: "Medium",
        ops: "Medium",
      },
      {
        track: "FP&A (India)",
        use: "Anomaly detection at scale (24 months of data, ~1,500 sites)",
        solution: "Systemic anomaly-alerting layer replacing manual review",
        area: "Finance and Operations",
        finance: "Low",
        ops: "High",
      },
      {
        track: "FP&A (India)",
        use: "Monthly 40-50 page MIS deck is filled by hand",
        solution: "Each segment builds their own PowerPoint deck by hand from the GOP sheet.",
        area: "Finance",
        finance: "Low",
        ops: "NA",
      },
      {
        track: "R2R",
        use: "Intercompany – Reconciliation between D365 and S4Hana for intercompany transactions",
        solution:
          "D365 to S4Hana Intelligent mirroring needed so there is no manual reconciliation needed at the end of the month.",
        area: "Finance",
        finance: "Medium",
        ops: "NA",
      },
      {
        track: "GBS",
        use: "GBS – business case dashboard",
        solution:
          "Give Finance, PMO, Transition Leads, GBS Delivery and executive sponsors one trusted view to prioritize viable transitions, approve investment, track benefits against the business case, identify cost or capacity risks early, and hold owners accountable",
        area: "Finance",
        finance: "",
        ops: "",
      },
    ],
  },
} as const;

export function roadmapTrackByScreenId(screenId: string) {
  const id = screenId.replace("roadmap-", "");
  return ROADMAP_TRACKS.find((track) => track.id === id) ?? ROADMAP_TRACKS[0];
}

export const WALKOUTS = [
  {
    n: "01",
    title: "What we heard",
    body: "The three CoDesign questions and the live wall, in one line each. Circulated within five working days.",
  },
  {
    n: "02",
    title: "What we decided",
    body: "Every clinic problem with an action, a named owner and a date. Nothing unowned leaves.",
  },
  {
    n: "03",
    title: "What we built",
    body: "A chief of staff each, and one agent, skill or project per person. Running, not planned.",
  },
] as const;

export function blockById(id: WorkshopBlock["id"]): WorkshopBlock {
  const found = BLOCKS.find((block) => block.id === id);
  if (!found) {
    throw new Error(`Unknown workshop block: ${id}`);
  }
  return found;
}

export function screenIndex(id: string): number {
  return SCREENS.findIndex((screen) => screen.id === id);
}

export function clinicDuration(round: ClinicRound): number {
  return round === "report" ? CLINIC_REPORT_MS : CLINIC_ROUND_MS;
}

export function hourbackDuration(step: HourbackStep): number {
  return HOURBACK_STEP_MS[step];
}
