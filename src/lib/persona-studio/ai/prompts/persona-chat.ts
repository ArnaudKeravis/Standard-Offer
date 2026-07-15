import type { PersonaGroundingContext } from "@/lib/persona-studio/ai/grounding/persona-context";
import type { RetrievedStatement } from "@/lib/persona-studio/ai/retrieval/types";
import type { ChatTurn } from "@/lib/persona-studio/ai/schemas/chat-request";
import { INSUFFICIENT_EVIDENCE_SENTENCE } from "@/lib/persona-studio/utils/chat-i18n";

/**
 * Versioned system + user prompt for "Talk to a persona".
 *
 * Prompts live here — never inline in route handlers or UI. Bump
 * {@link PERSONA_CHAT_PROMPT_VERSION} whenever the wording changes so responses
 * remain auditable across prompt revisions.
 */
export const PERSONA_CHAT_PROMPT_VERSION = "persona-chat/2026-07-15";

/**
 * The persona-chat system prompt. It encodes the grounding contract from
 * AI_GROUNDING.md: evidence hierarchy, no invention, insufficient-evidence
 * behaviour, first-person-only in `personaResponse`, and the exact structured
 * output shape.
 */
export function buildPersonaChatSystemPrompt(
  context: PersonaGroundingContext,
): string {
  const { persona, lang } = context;
  const languageName = lang === "fr" ? "French" : "English";
  const insufficient = INSUFFICIENT_EVIDENCE_SENTENCE[lang];

  return [
    `You simulate a research-grounded persona named "${persona.name}" (${persona.archetype}).`,
    `You are NOT a generic chatbot and NOT a real person: you are a grounded simulation used by a design team in a workshop.`,
    ``,
    `# Absolute grounding rules`,
    `1. Answer ONLY from the PERSONA CONTEXT provided in the user message: the persona's structured statements, their linked source excerpts, the current scenario and the prior turns.`,
    `2. NEVER invent biography, statistics, brand preferences, medical info, income, satisfaction scores, past experiences, quotes, prices or operational facts that are not present in the context.`,
    `3. Evidence hierarchy — prefer in this order: direct EVIDENCE statements → composite research themes → explicitly-tagged ASSUMPTION/TO_VALIDATE statements → unknown.`,
    `4. If a statement you rely on is an ASSUMPTION or TO_VALIDATE, treat it as a clearly-labelled hypothesis, never as a fact.`,
    `5. Insufficient evidence: if the context does not support a confident answer, the "personaResponse" MUST begin with exactly this sentence: "${insufficient}" You may then add ONE clearly-labelled hypothesis and offer one concrete research question. Do NOT fill the gap with demographic stereotypes.`,
    `6. Never reveal real research-participant identities; refer only to the fictional persona and anonymous references.`,
    ``,
    `# Voice`,
    `- Write "personaResponse" in the FIRST PERSON as ${persona.name}, in ${languageName}, concise (2–5 sentences).`,
    `- The "basis" object is meta commentary (not in the persona's voice) and must be written in ${languageName}.`,
    ``,
    `# Structured output (required)`,
    `Return an object with:`,
    `- personaResponse: string — the in-persona answer.`,
    `- basis.personaStatementIds: string[] — ids of persona statements you used (from the context only).`,
    `- basis.sourceIds: string[] — ids of sources you relied on (from the context only).`,
    `- basis.evidenceExcerpts: { sourceId, excerpt }[] — short excerpts, each sourceId from the context only.`,
    `- basis.assumptionsUsed: string[] — any ASSUMPTION/TO_VALIDATE statements you leaned on, phrased as hypotheses.`,
    `- basis.missingInformation: string[] — what is missing to answer more confidently.`,
    `- basis.confidence: "HIGH" | "MEDIUM" | "LOW" — confidence in THIS answer given the evidence.`,
    `- suggestedResearchQuestion: string | null — one concrete question that would close the biggest gap, or null.`,
    ``,
    `Every id in basis MUST come from the provided context. Do not output ids that are not in the context.`,
  ].join("\n");
}

function formatStatements(context: PersonaGroundingContext): string {
  return context.statements
    .map((s) => {
      const src = s.sourceIds.length ? ` sources=[${s.sourceIds.join(", ")}]` : "";
      const excerpts = s.excerpts.length
        ? ` excerpts=${JSON.stringify(s.excerpts.map((e) => e.excerpt))}`
        : "";
      return `- [${s.id}] (${s.sectionTitle} · ${s.evidenceStatus} · confidence=${s.confidence})${src} ${s.content}${excerpts}`;
    })
    .join("\n");
}

function formatSources(context: PersonaGroundingContext): string {
  if (context.sources.length === 0) return "(none)";
  return context.sources
    .map((s) => `- [${s.id}] ${s.name} (${s.category}, ${s.confidentiality})`)
    .join("\n");
}

function formatHistory(history: ChatTurn[]): string {
  if (history.length === 0) return "(no prior turns)";
  return history
    .map((t) => `${t.role === "user" ? "USER" : "PERSONA"}: ${t.content}`)
    .join("\n");
}

/** Build the user message: the grounding context + scenario + question. */
export function buildPersonaChatUserPrompt(args: {
  context: PersonaGroundingContext;
  question: string;
  scenario?: string;
  history: ChatTurn[];
  /** Retriever hints — statements pre-ranked as most relevant to the question. */
  retrieved?: RetrievedStatement[];
}): string {
  const { context, question, scenario, history, retrieved } = args;
  const p = context.persona;

  const relevant =
    retrieved && retrieved.length
      ? retrieved.map((r) => `- [${r.statement.id}] ${r.statement.content}`).join("\n")
      : "(no specific matches — rely on the full context and the insufficient-evidence rule)";

  return [
    `# PERSONA CONTEXT`,
    `Persona: ${p.name} — ${p.archetype} (${p.category})`,
    `Essence: ${p.oneLineEssence}`,
    `Persona confidence: ${p.confidenceLevel} — ${p.confidenceExplanation}`,
    `Behavioural tags: ${p.behaviouralTags.join(", ") || "(none)"}`,
    ``,
    `## Sources (only these may be cited)`,
    formatSources(context),
    ``,
    `## Persona statements (only these ids may be cited)`,
    formatStatements(context),
    ``,
    `## Most relevant statements to the question (retriever)`,
    relevant,
    ``,
    `# SCENARIO`,
    scenario?.trim() ? scenario.trim() : "(no scenario provided)",
    ``,
    `# PRIOR TURNS`,
    formatHistory(history),
    ``,
    `# QUESTION`,
    question.trim(),
  ].join("\n");
}
