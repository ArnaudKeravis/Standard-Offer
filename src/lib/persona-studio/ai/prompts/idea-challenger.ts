import type { PersonaGroundingContext } from "@/lib/persona-studio/ai/grounding/persona-context";
import type { RetrievedStatement } from "@/lib/persona-studio/ai/retrieval/types";
import { INSUFFICIENT_EVIDENCE_SENTENCE } from "@/lib/persona-studio/utils/chat-i18n";

/**
 * Versioned prompts for Idea Challenge. Bump the version whenever wording
 * changes so outputs remain auditable across revisions.
 */
export const IDEA_CHALLENGER_PROMPT_VERSION = "idea-challenger/2026-07-16";

export interface IdeaChallengePromptIdea {
  title: string;
  description: string;
  journeyMoment?: string;
  intendedBenefit?: string;
  operationalConstraints?: string;
}

export function buildIdeaChallengerSystemPrompt(lang: "en" | "fr"): string {
  const languageName = lang === "fr" ? "French" : "English";
  const insufficient = INSUFFICIENT_EVIDENCE_SENTENCE[lang];

  return [
    `You are a research-grounded idea challenger for a design workshop.`,
    `You simulate how EACH provided persona would react to an idea, using ONLY that persona's own evidence.`,
    `You are NOT scoring ideas and MUST NOT invent numeric scores, rankings, or satisfaction percentages.`,
    ``,
    `# Absolute grounding rules`,
    `1. For each persona, use ONLY that persona's context (statements + sources). Never mix evidence across personas.`,
    `2. NEVER invent biography, stats, brand preferences, medical info, income, past experiences, quotes or operational facts not in the context.`,
    `3. Evidence hierarchy: EVIDENCE → composite themes → ASSUMPTION/TO_VALIDATE (as labelled hypotheses) → unknown.`,
    `4. Insufficient evidence: if a persona's context cannot support a field, say so clearly. For initialReaction, begin with: "${insufficient}"`,
    `5. Never reveal real research-participant identities.`,
    ``,
    `# Output language`,
    `Write every string field in ${languageName}.`,
    ``,
    `# Structured output (required)`,
    `Return an object with:`,
    `- reactions[]: one object per persona, each with:`,
    `  personaId, initialReaction, perceivedBenefit, mainConcern,`,
    `  adoptionTrigger, rejectionTrigger, missingInformation[],`,
    `  improvementRecommendation,`,
    `  basis: { personaStatementIds[], sourceIds[], evidenceExcerpts[{sourceId,excerpt}], assumptionsUsed[], confidence }`,
    `- synthesis: { universalStrengths[], personaSpecificBenefits[{personaId,benefit}], risks[], questionsToTest[exactly 3 field questions], suggestedPrototype }`,
    `- questionsToTest MUST contain exactly 3 concrete research questions a facilitator can take to the field.`,
    ``,
    `Every id in basis MUST come from that persona's context. confidence is HIGH|MEDIUM|LOW for the reaction quality — never a score of the idea.`,
  ].join("\n");
}

export function buildIdeaChallengerUserPrompt(args: {
  idea: IdeaChallengePromptIdea;
  contexts: PersonaGroundingContext[];
  retrievedByPersona: Record<string, RetrievedStatement[]>;
}): string {
  const { idea, contexts, retrievedByPersona } = args;

  const ideaBlock = [
    `# Idea under challenge`,
    `Title: ${idea.title}`,
    `Description: ${idea.description || "(none)"}`,
    `Journey moment: ${idea.journeyMoment || "(unspecified)"}`,
    `Intended benefit: ${idea.intendedBenefit || "(unspecified)"}`,
    `Operational constraints: ${idea.operationalConstraints || "(none stated)"}`,
  ].join("\n");

  const personaBlocks = contexts
    .map((ctx) => {
      const retrieved = retrievedByPersona[ctx.persona.id] ?? [];
      const statements = ctx.statements
        .map(
          (s) =>
            `- [${s.id}] (${s.sectionTitle} · ${s.evidenceStatus} · ${s.confidence}) sources=[${s.sourceIds.join(", ")}] ${s.content}`,
        )
        .join("\n");
      const sources =
        ctx.sources.length === 0
          ? "(none)"
          : ctx.sources
              .map((s) => `- [${s.id}] ${s.name} (${s.category})`)
              .join("\n");
      const retrievedBlock =
        retrieved.length === 0
          ? "(no keyword match — treat carefully; may be insufficient evidence)"
          : retrieved
              .map(
                (r) =>
                  `- [${r.statement.id}] score=${r.score.toFixed(2)} ${r.statement.content}`,
              )
              .join("\n");

      return [
        `## Persona ${ctx.persona.id}`,
        `Name: ${ctx.persona.name} (${ctx.persona.archetype})`,
        `Essence: ${ctx.persona.oneLineEssence}`,
        `Tags: ${ctx.persona.behaviouralTags.join(", ") || "(none)"}`,
        ``,
        `### Statements`,
        statements || "(none)",
        ``,
        `### Sources`,
        sources,
        ``,
        `### Retrieved for this idea`,
        retrievedBlock,
      ].join("\n");
    })
    .join("\n\n");

  return [
    ideaBlock,
    ``,
    `# Personas to evaluate against`,
    personaBlocks,
    ``,
    `Produce one reaction per persona listed above, then a cross-persona synthesis. No numeric scores.`,
  ].join("\n");
}
