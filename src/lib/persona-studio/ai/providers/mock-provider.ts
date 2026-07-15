import type { ConfidenceLevel } from "@/lib/persona-studio/ai/schemas/common";
import type { PersonaChatResponse } from "@/lib/persona-studio/ai/schemas/chat";
import type { GroundingStatement } from "@/lib/persona-studio/ai/grounding/persona-context";
import type { RetrievedStatement } from "@/lib/persona-studio/ai/retrieval/types";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import {
  INSUFFICIENT_EVIDENCE_SENTENCE,
  groundedLeadIn,
  hypothesisLabel,
} from "@/lib/persona-studio/utils/chat-i18n";
import type { PersonaChatInput, PersonaChatProvider } from "./types";

/**
 * Deterministic, fully-grounded mock provider.
 *
 * It never calls a network and never invents facts: it answers strictly by
 * retrieving the persona's OWN statements and stitching a first-person reply
 * from them. When nothing relevant is found it takes the insufficient-evidence
 * path (verbatim sentence + one clearly-labelled hypothesis + one research
 * question). This keeps the feature demoable without any API key while honouring
 * every grounding guarantee.
 */
export class MockPersonaChatProvider implements PersonaChatProvider {
  readonly id = "mock-grounded-v1";
  readonly isMock = true;

  async generate(input: PersonaChatInput): Promise<PersonaChatResponse> {
    const { context, question, retriever } = input;
    const lang = context.lang;

    const retrieved = retriever.retrieve(question, context, { limit: 6 });
    const evidence = retrieved.filter(
      (r) => r.statement.evidenceStatus === "EVIDENCE",
    );
    const soft = retrieved.filter(
      (r) => r.statement.evidenceStatus !== "EVIDENCE",
    );

    // Nothing at all matched → insufficient evidence.
    if (retrieved.length === 0) {
      return this.insufficient(context, lang);
    }

    // Only assumptions / to-validate matched → labelled hypothesis, low confidence.
    if (evidence.length === 0) {
      return this.hypothesisOnly(context, lang, soft);
    }

    return this.grounded(context, lang, evidence, soft);
  }

  private grounded(
    context: PersonaChatInput["context"],
    lang: StudioLang,
    evidence: RetrievedStatement[],
    soft: RetrievedStatement[],
  ): PersonaChatResponse {
    const used = evidence.slice(0, 3).map((r) => r.statement);
    const points = used
      .map((s) => trimTrailingPunct(lowerFirst(s.content)))
      .filter(Boolean);
    const lead = groundedLeadIn(lang);
    const personaResponse = `${lead} : ${joinPoints(points, lang)}.`;

    const sourceIds = uniq(used.flatMap((s) => s.sourceIds));
    const evidenceExcerpts = buildExcerpts(used);

    // Assumptions that also surfaced become clearly-labelled hypotheses.
    const assumptionsUsed = soft
      .slice(0, 2)
      .map((r) => r.statement.content);

    const missingInformation = collectToValidate(context.statements)
      .slice(0, 2)
      .map((s) => s.content);

    const confidence = deriveConfidence(used);

    return {
      personaResponse,
      basis: {
        personaStatementIds: used.map((s) => s.id),
        sourceIds,
        evidenceExcerpts,
        assumptionsUsed,
        missingInformation,
        confidence,
      },
      suggestedResearchQuestion:
        confidence === "HIGH"
          ? null
          : firstResearchQuestion(context, lang, missingInformation),
    };
  }

  private hypothesisOnly(
    context: PersonaChatInput["context"],
    lang: StudioLang,
    soft: RetrievedStatement[],
  ): PersonaChatResponse {
    const top = soft.slice(0, 2).map((r) => r.statement);
    const label = hypothesisLabel(lang);
    const points = top.map((s) => trimTrailingPunct(lowerFirst(s.content)));
    const body =
      lang === "fr"
        ? `Ce point n'est pas encore confirmé par la recherche. ${label} : ${joinPoints(points, lang)}.`
        : `This isn't confirmed by research yet. ${label}: ${joinPoints(points, lang)}.`;

    return {
      personaResponse: `${INSUFFICIENT_EVIDENCE_SENTENCE[lang]} ${body}`,
      basis: {
        // No EVIDENCE was used, so no source/statement ids are cited as fact.
        personaStatementIds: [],
        sourceIds: [],
        evidenceExcerpts: [],
        assumptionsUsed: top.map((s) => s.content),
        missingInformation: top.map((s) => s.content),
        confidence: "LOW",
      },
      suggestedResearchQuestion: firstResearchQuestion(
        context,
        lang,
        top.map((s) => s.content),
      ),
    };
  }

  private insufficient(
    context: PersonaChatInput["context"],
    lang: StudioLang,
  ): PersonaChatResponse {
    const missing = collectToValidate(context.statements)
      .slice(0, 2)
      .map((s) => s.content);
    const generic =
      lang === "fr"
        ? "Cet aspect n'est pas couvert par les données de recherche de ce persona."
        : "This aspect is not covered by this persona's research data.";
    return {
      personaResponse: INSUFFICIENT_EVIDENCE_SENTENCE[lang],
      basis: {
        personaStatementIds: [],
        sourceIds: [],
        evidenceExcerpts: [],
        assumptionsUsed: [],
        missingInformation: missing.length ? missing : [generic],
        confidence: "LOW",
      },
      suggestedResearchQuestion: firstResearchQuestion(context, lang, missing),
    };
  }
}

function buildExcerpts(
  statements: GroundingStatement[],
): PersonaChatResponse["basis"]["evidenceExcerpts"] {
  const out: PersonaChatResponse["basis"]["evidenceExcerpts"] = [];
  for (const s of statements) {
    if (s.excerpts.length > 0) {
      for (const e of s.excerpts) {
        out.push({ sourceId: e.sourceId, excerpt: e.excerpt });
      }
    } else if (s.sourceIds.length > 0) {
      // Fall back to the statement's own content as the excerpt, tied to a real
      // source id from the persona's evidence (never a fabricated document).
      out.push({ sourceId: s.sourceIds[0], excerpt: s.content });
    }
  }
  return out;
}

function collectToValidate(
  statements: GroundingStatement[],
): GroundingStatement[] {
  return statements.filter((s) => s.evidenceStatus === "TO_VALIDATE");
}

function deriveConfidence(statements: GroundingStatement[]): ConfidenceLevel {
  if (statements.length === 0) return "LOW";
  const rank: Record<ConfidenceLevel, number> = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  const avg =
    statements.reduce((sum, s) => sum + rank[s.confidence], 0) /
    statements.length;
  if (avg >= 2.5) return "HIGH";
  if (avg >= 1.5) return "MEDIUM";
  return "LOW";
}

function firstResearchQuestion(
  context: PersonaChatInput["context"],
  lang: StudioLang,
  missing: string[],
): string {
  if (missing.length > 0) {
    return lang === "fr"
      ? `Pourriez-vous valider par la recherche : ${trimTrailingPunct(lowerFirst(missing[0]))} ?`
      : `Could research validate: ${trimTrailingPunct(lowerFirst(missing[0]))}?`;
  }
  return lang === "fr"
    ? `Quelle recherche terrain permettrait de mieux comprendre ${context.persona.name} sur ce point ?`
    : `What field research would clarify ${context.persona.name} on this point?`;
}

function joinPoints(points: string[], lang: StudioLang): string {
  if (points.length <= 1) return points[0] ?? "";
  const last = points[points.length - 1];
  const head = points.slice(0, -1).join(", ");
  return lang === "fr" ? `${head} et ${last}` : `${head} and ${last}`;
}

function lowerFirst(s: string): string {
  return s.length ? s[0].toLowerCase() + s.slice(1) : s;
}

function trimTrailingPunct(s: string): string {
  return s.replace(/[.·]+\s*$/u, "").trim();
}

function uniq(items: string[]): string[] {
  return [...new Set(items)];
}
