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
  hosts: ["Arnaud Keravis", "Henri Abt", "Kevin Albrand"],
  when: "22 September 2026",
  where: "Chantilly",
  window: "13:00-16:30",
  audience: "Craft & Scale AI Use Cases",
} as const;

export const PROUD_SPEAKER_MS = minutesToMs(2);
export const CLINIC_ROUND_MS = minutesToMs(15);
export const CLINIC_REPORT_MS = minutesToMs(3);
export const HOURBACK_STEP_MS = {
  1: minutesToMs(20),
  2: minutesToMs(10),
  3: minutesToMs(30),
} as const satisfies Record<HourbackStep, number>;

export const BLOCKS: WorkshopBlock[] = [
  { id: "open", label: "Open", start: "13:00", durationMin: null, accent: "#1968FF" },
  { id: "fy26", label: "CoDesign FY26", start: "13:00", durationMin: 20, accent: "#1968FF" },
  { id: "ai", label: "AI 101", start: "13:20", durationMin: 15, accent: "#915FC8" },
  { id: "proud", label: "Proud of", start: "13:35", durationMin: 30, accent: "#34A866" },
  { id: "strategy", label: "Strategy", start: "14:05", durationMin: 30, accent: "#EF661A" },
  { id: "break", label: "Break", start: "14:35", durationMin: 10, accent: "#5A6280" },
  { id: "clinics", label: "AI Clinics", start: "14:45", durationMin: 35, accent: "#915FC8" },
  { id: "hourback", label: "One Hour Back", start: "15:20", durationMin: 60, accent: "#34A866" },
  { id: "close", label: "What walks out", start: "16:20", durationMin: 10, accent: "#DA558C" },
];

export const SCREENS: WorkshopScreen[] = [
  { id: "cover", blockId: "open", kind: "cover", label: "Cover", tone: "dark" },
  { id: "agenda", blockId: "open", kind: "agenda", label: "Agenda", tone: "light" },
  { id: "fy26-open", blockId: "fy26", kind: "intercalaire", label: "FY26", tone: "dark" },
  { id: "fy26-results", blockId: "fy26", kind: "fy26-results", label: "Results", tone: "light", timed: true },
  { id: "fy26-questions", blockId: "fy26", kind: "fy26-questions", label: "Three questions", tone: "light", timed: true },
  { id: "ai-open", blockId: "ai", kind: "intercalaire", label: "AI 101", tone: "dark" },
  { id: "ai-wall", blockId: "ai", kind: "ai-wall", label: "Hit a wall?", tone: "dark", timed: true },
  { id: "ai-layers", blockId: "ai", kind: "ai-layers", label: "Model product harness", tone: "light", timed: true },
  { id: "ai-buying", blockId: "ai", kind: "ai-buying", label: "Buying AI", tone: "light", timed: true },
  { id: "proud-open", blockId: "proud", kind: "intercalaire", label: "Proud of", tone: "dark" },
  { id: "proud-brief", blockId: "proud", kind: "proud-brief", label: "The brief", tone: "light", timed: true },
  { id: "proud-ritual", blockId: "proud", kind: "proud-ritual", label: "2 minutes", tone: "dark", timed: true },
  { id: "strategy-open", blockId: "strategy", kind: "intercalaire", label: "Strategy", tone: "dark" },
  { id: "strategy-brief", blockId: "strategy", kind: "strategy-brief", label: "Vision", tone: "light", timed: true },
  { id: "break", blockId: "break", kind: "break", label: "Break", tone: "dark", timed: true },
  { id: "clinics-open", blockId: "clinics", kind: "intercalaire", label: "Clinics", tone: "dark" },
  { id: "clinics-scores", blockId: "clinics", kind: "clinics-scores", label: "Scores", tone: "light", timed: true },
  { id: "clinics-tables", blockId: "clinics", kind: "clinics-tables", label: "Six tables", tone: "light", timed: true },
  { id: "clinics-ritual", blockId: "clinics", kind: "clinics-ritual", label: "Rounds", tone: "dark", timed: true },
  { id: "hourback-open", blockId: "hourback", kind: "intercalaire", label: "One Hour Back", tone: "dark" },
  { id: "hourback-overview", blockId: "hourback", kind: "hourback-overview", label: "Three steps", tone: "light", timed: true },
  { id: "hourback-ritual", blockId: "hourback", kind: "hourback-ritual", label: "Build", tone: "dark", timed: true },
  { id: "close-open", blockId: "close", kind: "intercalaire", label: "Close", tone: "dark" },
  { id: "close-walkout", blockId: "close", kind: "close-walkout", label: "Walk out", tone: "light", timed: true },
  { id: "thanks", blockId: "close", kind: "thanks", label: "Thank you", tone: "dark" },
];

export const INTERCALAIRES: Record<
  string,
  { number: string; title: string; detail: string }
> = {
  fy26: {
    number: "01",
    title: "CoDesign FY26",
    detail: "What the practice delivered, and what I need from you",
  },
  ai: {
    number: "02",
    title: "What you need to know about AI",
    detail: "Henri. The vocabulary for the business conversation",
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
  hourback: {
    number: "06",
    title: "One Hour Back",
    detail: "Build the agent that gives you your week back",
  },
  close: {
    number: "07",
    title: "What walks out",
    detail: "Owners, dates, and the hours we got back",
  },
};

export const AGENDA = [
  { time: "13:00", mins: "20'", title: "CoDesign FY26", who: "Results, outputs, and what I need from you" },
  { time: "13:20", mins: "15'", title: "What you need to know about AI", who: "Henri. The vocabulary for the business conversation" },
  { time: "13:35", mins: "30'", title: "Proud of", who: "Everyone. One agent or use case you built this year" },
  { time: "14:05", mins: "30'", title: "AI Strategy & Agentic Platform", who: "Henri & Kevin. Vision, trends, maturity" },
  { time: "14:35", mins: "10'", title: "Break", who: "" },
  { time: "14:45", mins: "35'", title: "AI Clinics", who: "Six dimensions. Define, then solve" },
  { time: "15:20", mins: "60'", title: "One Hour Back", who: "Chief of staff, skills & projects, your own agent" },
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

export const AI_LAYERS = [
  {
    n: "01",
    title: "Model",
    role: "The intelligence",
    body: "Generates, predicts and reasons. LLM, SLM, multimodal.",
    examples: "GPT-5.2 · Gemini 3.1",
  },
  {
    n: "02",
    title: "Product",
    role: "The user experience",
    body: "Turns models into a usable service. Logic, channels, the thing people open.",
    examples: "ChatGPT · Copilot",
  },
  {
    n: "03",
    title: "Harness",
    role: "The capabilities",
    body: "Connects context, tools and actions. Skills, MCP, APIs, memory, permissions.",
    examples: "Skills · MCP · APIs",
  },
] as const;

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
    round1: "Tarun · Kevin Albrand · Sophie",
    round2: "Gabriel · Mark · Kevin Algrain",
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
    round2: "Yida · Kevin Albrand · Samuel",
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
    round1: "Kevin Algrain · Charlotte",
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
    mins: "20'",
    who: "Arnaud",
    body: "Everyone creates or upgrades a real one. It knows your OKRs, your team, your stakeholders, your rhythm.",
  },
  {
    step: 2 as HourbackStep,
    title: "Skills & projects",
    mins: "10'",
    who: "Henri",
    body: "The difference between a prompt, a skill and a project, and when each one is the right container.",
  },
  {
    step: 3 as HourbackStep,
    title: "Pick your pain point",
    mins: "30'",
    who: "Everyone",
    body: "One real pain point or one live project. Build the agent, skill or project context that takes it off your plate.",
  },
] as const;

export const HOURBACK_CONTAINERS = [
  { title: "Prompt", body: "One-off. You re-explain every time." },
  { title: "Skill", body: "A repeatable task, done the same way, every time." },
  { title: "Project", body: "A durable context. You stop re-explaining." },
] as const;

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
