import { describe, expect, it } from "vitest";
import {
  IdeaChallengeResponse,
  PersonaIdeaReaction,
} from "@/lib/persona-studio/ai/schemas/challenge";
import { IdeaChallengeRequest } from "@/lib/persona-studio/ai/schemas/challenge-request";
import { MockIdeaChallengeProvider } from "@/lib/persona-studio/ai/providers/idea-challenge-provider";
import { buildPersonaGroundingContext } from "@/lib/persona-studio/ai/grounding/persona-context";
import { defaultRetriever } from "@/lib/persona-studio/ai/retrieval/keyword-retriever";
import { TDF_PERSONAS } from "@/lib/persona-studio/data/seed";
import { TDF_SOURCES } from "@/lib/persona-studio/data/seed/tdf-personas";
import { INSUFFICIENT_EVIDENCE_SENTENCE } from "@/lib/persona-studio/utils/chat-i18n";
import { runIdeaChallenge } from "@/lib/persona-studio/ai/services/idea-challenge-service";

const thomas = TDF_PERSONAS.find((p) => p.id === "persona-thomas-garcia")!;
const claire = TDF_PERSONAS.find((p) => p.id === "persona-claire-dubois")!;

describe("Idea challenge schemas", () => {
  it("accepts a grounded per-persona reaction with evidence basis", () => {
    const parsed = PersonaIdeaReaction.parse({
      personaId: "persona-thomas-garcia",
      initialReaction: "I'd welcome shorter waits between passages.",
      perceivedBenefit: "Less dead time in my day.",
      mainConcern: "Queues already frustrate me.",
      adoptionTrigger: "If it clearly cuts waiting.",
      rejectionTrigger: "If it adds another queue.",
      missingInformation: [],
      improvementRecommendation: "Make the handoff visible.",
      basis: {
        personaStatementIds: ["persona-thomas-garcia-frustrations-s1"],
        sourceIds: ["src-tdf-brief"],
        evidenceExcerpts: [
          { sourceId: "src-tdf-brief", excerpt: "Long waiting periods." },
        ],
        assumptionsUsed: [],
        confidence: "MEDIUM",
      },
    });
    expect(parsed.basis.confidence).toBe("MEDIUM");
  });

  it("supports the insufficient-evidence reaction shape", () => {
    const parsed = IdeaChallengeResponse.parse({
      reactions: [
        {
          personaId: "persona-thomas-garcia",
          initialReaction: INSUFFICIENT_EVIDENCE_SENTENCE.en,
          perceivedBenefit: "Unclear.",
          mainConcern: "Not enough evidence.",
          adoptionTrigger: "To validate.",
          rejectionTrigger: "To validate.",
          missingInformation: ["Dietary preferences unknown."],
          improvementRecommendation: "Field-test with guests.",
          basis: {
            personaStatementIds: [],
            sourceIds: [],
            evidenceExcerpts: [],
            assumptionsUsed: [],
            confidence: "LOW",
          },
        },
      ],
      synthesis: {
        universalStrengths: [],
        personaSpecificBenefits: [],
        risks: ["Thin evidence across the selection."],
        questionsToTest: ["What dietary needs apply?"],
        suggestedPrototype: "Observe a lightweight pilot.",
      },
    });
    expect(parsed.reactions[0].basis.confidence).toBe("LOW");
    expect(parsed.reactions[0].initialReaction).toBe(
      INSUFFICIENT_EVIDENCE_SENTENCE.en,
    );
  });

  it("rejects a reaction missing the basis object", () => {
    expect(() =>
      PersonaIdeaReaction.parse({
        personaId: "p1",
        initialReaction: "ok",
        perceivedBenefit: "ok",
        mainConcern: "ok",
        adoptionTrigger: "ok",
        rejectionTrigger: "ok",
        missingInformation: [],
        improvementRecommendation: "ok",
      }),
    ).toThrow();
  });

  it("validates the request contract", () => {
    const parsed = IdeaChallengeRequest.parse({
      projectId: "proj-xp-play",
      personaIds: ["persona-thomas-garcia"],
      ideaTitle: "Roaming grab-and-go cart",
      ideaDescription: "Premium snacks between passages.",
      lang: "fr",
    });
    expect(parsed.personaIds).toHaveLength(1);
  });
});

describe("Mock idea challenge provider", () => {
  const provider = new MockIdeaChallengeProvider();

  it("returns schema-valid reactions citing only each persona's own evidence", async () => {
    const contexts = [thomas, claire].map((p) =>
      buildPersonaGroundingContext(p, TDF_SOURCES, "fr"),
    );
    const res = await provider.generate({
      idea: {
        title: "Chariot premium itinérant",
        description: "Snacks et boissons entre les passages, moins d'attente.",
        intendedBenefit: "Réduire l'attente et la frustration.",
      },
      contexts,
      retriever: defaultRetriever,
      lang: "fr",
    });

    expect(() => IdeaChallengeResponse.parse(res)).not.toThrow();
    expect(res.reactions).toHaveLength(2);

    for (const reaction of res.reactions) {
      const ctx = contexts.find((c) => c.persona.id === reaction.personaId)!;
      const validStatements = new Set(ctx.statements.map((s) => s.id));
      const validSources = new Set(ctx.sources.map((s) => s.id));
      for (const id of reaction.basis.personaStatementIds) {
        expect(validStatements.has(id)).toBe(true);
      }
      for (const id of reaction.basis.sourceIds) {
        expect(validSources.has(id)).toBe(true);
      }
      // No numeric scores in qualitative fields.
      expect(reaction.initialReaction).not.toMatch(/\b\d{1,3}\s*%|\bscore\b/i);
    }
  });

  it("takes the insufficient-evidence path when nothing matches", async () => {
    const ctx = buildPersonaGroundingContext(thomas, TDF_SOURCES, "en");
    const res = await provider.generate({
      idea: {
        title: "Quantum teleportation lounge",
        description: "xyzzy plugh unrelated jargon foobarbaz",
      },
      contexts: [ctx],
      retriever: defaultRetriever,
      lang: "en",
    });
    expect(res.reactions[0].basis.confidence).toBe("LOW");
    expect(res.reactions[0].initialReaction).toContain(
      INSUFFICIENT_EVIDENCE_SENTENCE.en,
    );
  });
});

describe("runIdeaChallenge service", () => {
  it("orchestrates a mock challenge for Tour de France personas", async () => {
    const result = await runIdeaChallenge({
      projectId: "proj-xp-play",
      personaIds: ["persona-thomas-garcia", "persona-claire-dubois"],
      ideaTitle: "Roaming cart",
      ideaDescription: "Grab-and-go between passages to cut waiting.",
      lang: "en",
    });
    expect(result.isMock).toBe(true);
    expect(result.response.reactions.length).toBe(2);
    expect(result.response.synthesis.suggestedPrototype.length).toBeGreaterThan(
      0,
    );
  });
});
