import { getEnv } from "@/lib/persona-studio/validation/env";
import {
  IdeaChallengeResponse,
  type PersonaIdeaReaction,
} from "@/lib/persona-studio/ai/schemas/challenge";
import type { PersonaGroundingContext } from "@/lib/persona-studio/ai/grounding/persona-context";
import type { EvidenceRetriever } from "@/lib/persona-studio/ai/retrieval/types";
import type { ConfidenceLevel } from "@/lib/persona-studio/ai/schemas/common";
import {
  IDEA_CHALLENGER_PROMPT_VERSION,
  buildIdeaChallengerSystemPrompt,
  buildIdeaChallengerUserPrompt,
  type IdeaChallengePromptIdea,
} from "@/lib/persona-studio/ai/prompts/idea-challenger";
import { INSUFFICIENT_EVIDENCE_SENTENCE } from "@/lib/persona-studio/utils/chat-i18n";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";

export interface IdeaChallengeInput {
  idea: IdeaChallengePromptIdea;
  contexts: PersonaGroundingContext[];
  retriever: EvidenceRetriever;
  lang: StudioLang;
}

export interface IdeaChallengeProvider {
  readonly id: string;
  readonly isMock: boolean;
  generate(input: IdeaChallengeInput): Promise<IdeaChallengeResponse>;
}

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-4o-2024-08-06";

const RESPONSE_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    reactions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          personaId: { type: "string" },
          initialReaction: { type: "string" },
          perceivedBenefit: { type: "string" },
          mainConcern: { type: "string" },
          adoptionTrigger: { type: "string" },
          rejectionTrigger: { type: "string" },
          missingInformation: { type: "array", items: { type: "string" } },
          improvementRecommendation: { type: "string" },
          basis: {
            type: "object",
            additionalProperties: false,
            properties: {
              personaStatementIds: { type: "array", items: { type: "string" } },
              sourceIds: { type: "array", items: { type: "string" } },
              evidenceExcerpts: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    sourceId: { type: "string" },
                    excerpt: { type: "string" },
                  },
                  required: ["sourceId", "excerpt"],
                },
              },
              assumptionsUsed: { type: "array", items: { type: "string" } },
              confidence: { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] },
            },
            required: [
              "personaStatementIds",
              "sourceIds",
              "evidenceExcerpts",
              "assumptionsUsed",
              "confidence",
            ],
          },
        },
        required: [
          "personaId",
          "initialReaction",
          "perceivedBenefit",
          "mainConcern",
          "adoptionTrigger",
          "rejectionTrigger",
          "missingInformation",
          "improvementRecommendation",
          "basis",
        ],
      },
    },
    synthesis: {
      type: "object",
      additionalProperties: false,
      properties: {
        universalStrengths: { type: "array", items: { type: "string" } },
        personaSpecificBenefits: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              personaId: { type: "string" },
              benefit: { type: "string" },
            },
            required: ["personaId", "benefit"],
          },
        },
        risks: { type: "array", items: { type: "string" } },
        questionsToTest: { type: "array", items: { type: "string" } },
        suggestedPrototype: { type: "string" },
      },
      required: [
        "universalStrengths",
        "personaSpecificBenefits",
        "risks",
        "questionsToTest",
        "suggestedPrototype",
      ],
    },
  },
  required: ["reactions", "synthesis"],
} as const;

/**
 * Deterministic mock: retrieves each persona's own statements against the idea
 * text and stitches qualitative reactions — never invents facts or scores.
 */
export class MockIdeaChallengeProvider implements IdeaChallengeProvider {
  readonly id = "mock-idea-challenge-v1";
  readonly isMock = true;

  async generate(input: IdeaChallengeInput): Promise<IdeaChallengeResponse> {
    const query = [
      input.idea.title,
      input.idea.description,
      input.idea.intendedBenefit ?? "",
      input.idea.journeyMoment ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    const reactions: PersonaIdeaReaction[] = input.contexts.map((ctx) =>
      reactForPersona(ctx, query, input.retriever, input.lang, input.idea),
    );

    return IdeaChallengeResponse.parse({
      reactions,
      synthesis: buildMockSynthesis(reactions, input.contexts, input.lang),
    });
  }
}

export class OpenAIIdeaChallengeProvider implements IdeaChallengeProvider {
  readonly id = `openai-responses:${IDEA_CHALLENGER_PROMPT_VERSION}`;
  readonly isMock = false;

  constructor(
    private readonly apiKey: string,
    private readonly model: string = process.env.PERSONA_STUDIO_OPENAI_MODEL ??
      DEFAULT_MODEL,
  ) {}

  async generate(input: IdeaChallengeInput): Promise<IdeaChallengeResponse> {
    const query = [
      input.idea.title,
      input.idea.description,
      input.idea.intendedBenefit ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    const retrievedByPersona: Record<
      string,
      ReturnType<EvidenceRetriever["retrieve"]>
    > = {};
    for (const ctx of input.contexts) {
      retrievedByPersona[ctx.persona.id] = input.retriever.retrieve(
        query,
        ctx,
        { limit: 6 },
      );
    }

    const system = buildIdeaChallengerSystemPrompt(input.lang);
    const user = buildIdeaChallengerUserPrompt({
      idea: input.idea,
      contexts: input.contexts,
      retrievedByPersona,
    });

    const res = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        input: [
          { role: "system", content: [{ type: "input_text", text: system }] },
          { role: "user", content: [{ type: "input_text", text: user }] },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "idea_challenge_response",
            strict: true,
            schema: RESPONSE_JSON_SCHEMA,
          },
        },
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(
        `OpenAI request failed (${res.status}): ${detail.slice(0, 500)}`,
      );
    }

    const data: unknown = await res.json();
    const raw = extractOutputText(data);
    if (!raw) {
      throw new Error("OpenAI response contained no output text.");
    }
    return IdeaChallengeResponse.parse(JSON.parse(raw));
  }
}

export function getIdeaChallengeProvider(): IdeaChallengeProvider {
  const { OPENAI_API_KEY } = getEnv();
  if (OPENAI_API_KEY) {
    return new OpenAIIdeaChallengeProvider(OPENAI_API_KEY);
  }
  return new MockIdeaChallengeProvider();
}

function reactForPersona(
  ctx: PersonaGroundingContext,
  query: string,
  retriever: EvidenceRetriever,
  lang: StudioLang,
  idea: IdeaChallengePromptIdea,
): PersonaIdeaReaction {
  const retrieved = retriever.retrieve(query, ctx, { limit: 6 });
  const evidence = retrieved.filter(
    (r) => r.statement.evidenceStatus === "EVIDENCE",
  );
  const soft = retrieved.filter(
    (r) => r.statement.evidenceStatus !== "EVIDENCE",
  );

  if (retrieved.length === 0) {
    const missing = ctx.statements
      .filter((s) => s.evidenceStatus === "TO_VALIDATE")
      .slice(0, 2)
      .map((s) => s.content);
    const generic =
      lang === "fr"
        ? "Les données de ce persona ne couvrent pas assez cette idée."
        : "This persona's research data does not cover this idea enough.";
    return {
      personaId: ctx.persona.id,
      initialReaction: INSUFFICIENT_EVIDENCE_SENTENCE[lang],
      perceivedBenefit:
        lang === "fr"
          ? "Avantage perçu indéterminé faute de preuves."
          : "Perceived benefit unclear — insufficient evidence.",
      mainConcern:
        lang === "fr"
          ? "Manque de preuves pour juger l'idée."
          : "Not enough evidence to judge the idea.",
      adoptionTrigger:
        lang === "fr"
          ? "À valider par la recherche."
          : "To be validated by research.",
      rejectionTrigger:
        lang === "fr"
          ? "À valider par la recherche."
          : "To be validated by research.",
      missingInformation: missing.length ? missing : [generic],
      improvementRecommendation:
        lang === "fr"
          ? `Tester « ${idea.title} » avec ${ctx.persona.name} en situation réelle.`
          : `Field-test “${idea.title}” with ${ctx.persona.name} in a real situation.`,
      basis: {
        personaStatementIds: [],
        sourceIds: [],
        evidenceExcerpts: [],
        assumptionsUsed: [],
        confidence: "LOW",
      },
    };
  }

  const used = (evidence.length > 0 ? evidence : soft).slice(0, 3).map(
    (r) => r.statement,
  );
  const primary = used[0];
  const concern =
    used.find((s) =>
      /frustr|pain|attente|wait|stress|manque|lack/i.test(
        `${s.sectionKey} ${s.content}`,
      ),
    ) ?? used[used.length - 1];

  const lead =
    lang === "fr"
      ? `Face à « ${idea.title} », mon premier réflexe serait lié à ce que je sais déjà :`
      : `Faced with “${idea.title}”, my first reaction ties to what I already know:`;

  const confidence = deriveConfidence(used, evidence.length > 0);

  return {
    personaId: ctx.persona.id,
    initialReaction:
      evidence.length === 0
        ? `${INSUFFICIENT_EVIDENCE_SENTENCE[lang]} ${lead} ${primary.content}`
        : `${lead} ${primary.content}`,
    perceivedBenefit:
      lang === "fr"
        ? `Cela pourrait servir mon besoin autour de : ${primary.content}`
        : `This could serve my need around: ${primary.content}`,
    mainConcern:
      lang === "fr"
        ? `Ce qui me préoccuperait : ${concern.content}`
        : `What would concern me: ${concern.content}`,
    adoptionTrigger:
      lang === "fr"
        ? `J'adopterais si cela répond clairement à : ${primary.content}`
        : `I would adopt it if it clearly addresses: ${primary.content}`,
    rejectionTrigger:
      lang === "fr"
        ? `Je rejetterais si cela aggrave : ${concern.content}`
        : `I would reject it if it worsens: ${concern.content}`,
    missingInformation: soft.slice(0, 2).map((r) => r.statement.content),
    improvementRecommendation:
      lang === "fr"
        ? `Améliorer l'idée pour mieux traiter : ${concern.content}`
        : `Improve the idea to better address: ${concern.content}`,
    basis: {
      personaStatementIds: used.map((s) => s.id),
      sourceIds: uniq(used.flatMap((s) => s.sourceIds)),
      evidenceExcerpts: used.flatMap((s) =>
        s.excerpts.length > 0
          ? s.excerpts.map((e) => ({
              sourceId: e.sourceId,
              excerpt: e.excerpt,
            }))
          : s.sourceIds[0]
            ? [{ sourceId: s.sourceIds[0], excerpt: s.content }]
            : [],
      ),
      assumptionsUsed: soft.slice(0, 2).map((r) => r.statement.content),
      confidence,
    },
  };
}

function buildMockSynthesis(
  reactions: PersonaIdeaReaction[],
  contexts: PersonaGroundingContext[],
  lang: StudioLang,
): IdeaChallengeResponse["synthesis"] {
  const byId = new Map(contexts.map((c) => [c.persona.id, c]));
  const grounded = reactions.filter((r) => r.basis.personaStatementIds.length > 0);
  const weak = reactions.filter((r) => r.basis.confidence === "LOW");

  return {
    universalStrengths: grounded.slice(0, 3).map((r) => {
      const name = byId.get(r.personaId)?.persona.name ?? r.personaId;
      return lang === "fr"
        ? `${name} : un bénéfice potentiel lié à des besoins étayés.`
        : `${name}: a potential benefit tied to evidenced needs.`;
    }),
    personaSpecificBenefits: grounded.map((r) => ({
      personaId: r.personaId,
      benefit: r.perceivedBenefit,
    })),
    risks: [
      ...reactions.map((r) => r.mainConcern),
      ...(weak.length
        ? [
            lang === "fr"
              ? "Plusieurs personas manquent de preuves pour juger l'idée — valider avant de décider."
              : "Several personas lack evidence to judge the idea — validate before deciding.",
          ]
        : []),
    ].slice(0, 5),
    questionsToTest: reactions
      .flatMap((r) => r.missingInformation)
      .filter(Boolean)
      .slice(0, 3),
    suggestedPrototype:
      lang === "fr"
        ? "Prototype léger à tester en situation (sans score) : observer adoption, friction et questions ouvertes."
        : "Lightweight in-situ prototype (no scores): observe adoption, friction and open questions.",
  };
}

function deriveConfidence(
  statements: { confidence: ConfidenceLevel }[],
  hasEvidence: boolean,
): ConfidenceLevel {
  if (!hasEvidence || statements.length === 0) return "LOW";
  const rank: Record<ConfidenceLevel, number> = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  const avg =
    statements.reduce((sum, s) => sum + rank[s.confidence], 0) /
    statements.length;
  if (avg >= 2.5) return "HIGH";
  if (avg >= 1.5) return "MEDIUM";
  return "LOW";
}

function uniq(items: string[]): string[] {
  return [...new Set(items)];
}

function extractOutputText(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const obj = data as {
    output_text?: string;
    output?: Array<{
      content?: Array<{ type?: string; text?: string }>;
    }>;
  };
  if (typeof obj.output_text === "string" && obj.output_text) {
    return obj.output_text;
  }
  for (const item of obj.output ?? []) {
    for (const part of item.content ?? []) {
      if (part.type === "output_text" && typeof part.text === "string") {
        return part.text;
      }
    }
  }
  return null;
}
