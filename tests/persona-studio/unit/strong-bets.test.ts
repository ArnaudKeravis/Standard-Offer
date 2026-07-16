import { describe, expect, it } from "vitest";
import {
  deriveChallengeConflicts,
  fieldQuestionsPack,
} from "@/lib/persona-studio/utils/challenge-pack";
import { enrichJourneyMoment } from "@/lib/persona-studio/utils/journey-enrichment";
import type { IdeaChallengeResponse } from "@/lib/persona-studio/ai/schemas/challenge";
import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";

describe("challenge pack", () => {
  const response: IdeaChallengeResponse = {
    reactions: [
      {
        personaId: "a",
        initialReaction: "ok",
        perceivedBenefit: "speed",
        mainConcern: "queue length",
        adoptionTrigger: "clear signage",
        rejectionTrigger: "long wait",
        missingInformation: ["What is peak wait today?"],
        improvementRecommendation: "staff peak",
        basis: {
          personaStatementIds: [],
          sourceIds: [],
          evidenceExcerpts: [],
          assumptionsUsed: [],
          confidence: "MEDIUM",
        },
      },
      {
        personaId: "b",
        initialReaction: "wary",
        perceivedBenefit: "choice",
        mainConcern: "price transparency",
        adoptionTrigger: "loyalty perk",
        rejectionTrigger: "hidden fees",
        missingInformation: ["Who pays?"],
        improvementRecommendation: "show price",
        basis: {
          personaStatementIds: [],
          sourceIds: [],
          evidenceExcerpts: [],
          assumptionsUsed: [],
          confidence: "MEDIUM",
        },
      },
    ],
    synthesis: {
      universalStrengths: ["speed"],
      personaSpecificBenefits: [],
      risks: ["friction"],
      questionsToTest: ["Q1", "Q2", "Q3", "Q4"],
      suggestedPrototype: "pilot cart",
    },
  };

  it("derives conflicts when concerns diverge", () => {
    const conflicts = deriveChallengeConflicts(response);
    expect(conflicts.some((c) => c.theme === "concern")).toBe(true);
    expect(conflicts.find((c) => c.theme === "concern")?.byPersona).toHaveLength(
      2,
    );
  });

  it("caps field questions at 3", () => {
    expect(fieldQuestionsPack(response, 3)).toEqual(["Q1", "Q2", "Q3"]);
  });
});

describe("living journey enrichment", () => {
  const persona: Persona = {
    id: "p1",
    projectId: "proj",
    name: "Alex",
    archetype: "Worker",
    category: "c",
    family: "WORK",
    oneLineEssence: "Busy desk worker",
    accentColor: "#000",
    quote: "",
    quoteType: "NONE",
    confidenceLevel: "MEDIUM",
    confidenceExplanation: "x",
    evidenceCoverage: 0.5,
    demographicContext: {},
    behaviouralTags: ["focused"],
    commonSections: [
      {
        id: "s-goals",
        key: "goals",
        title: "Goals",
        type: "bullets",
        order: 1,
        visible: true,
        statements: [
          {
            id: "g1",
            content: "I want a quiet lunch to reset between meetings.",
            evidenceStatus: "EVIDENCE",
            confidence: "HIGH",
            sourceIds: ["src"],
            editable: true,
          },
        ],
      },
      {
        id: "s-frust",
        key: "frustrations",
        title: "Frustrations",
        type: "bullets",
        order: 2,
        visible: true,
        statements: [
          {
            id: "f1",
            content: "Long cafeteria queues waste my lunch break.",
            evidenceStatus: "EVIDENCE",
            confidence: "HIGH",
            sourceIds: ["src"],
            editable: true,
          },
        ],
      },
      {
        id: "s-moments",
        key: "moments",
        title: "Moments",
        type: "moments",
        order: 3,
        visible: true,
        statements: [
          {
            id: "m1",
            label: "Lunch",
            content:
              "At lunch I look for a fast option so I can return to meetings on time.",
            evidenceStatus: "EVIDENCE",
            confidence: "MEDIUM",
            sourceIds: ["src"],
            editable: true,
          },
        ],
      },
    ],
    domainSections: [],
    sourceIds: ["src"],
    status: "PUBLISHED",
    version: 1,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };

  it("links goal and pain from existing statements", () => {
    const moment = persona.commonSections[2].statements[0];
    const living = enrichJourneyMoment(persona, moment);
    expect(living.goal?.statement.id).toBe("g1");
    expect(living.pain?.statement.id).toBe("f1");
    expect(living.basisStatementIds).toContain("m1");
  });
});
