import { describe, expect, it } from "vitest";
import {
  PersonaChatResponse,
  PersonaAuditResult,
} from "@/lib/persona-studio/ai/schemas/chat";

describe("Persona chat structured output", () => {
  it("accepts a grounded response with a full basis object", () => {
    const parsed = PersonaChatResponse.parse({
      personaResponse: "Long waits between passages are what frustrate me most.",
      basis: {
        personaStatementIds: ["persona-thomas-garcia-frustrations-s1"],
        sourceIds: ["src-tdf-brief"],
        evidenceExcerpts: [
          { sourceId: "src-tdf-brief", excerpt: "Long waiting periods." },
        ],
        assumptionsUsed: [],
        missingInformation: [],
        confidence: "HIGH",
      },
      suggestedResearchQuestion: null,
    });
    expect(parsed.basis.confidence).toBe("HIGH");
    expect(parsed.suggestedResearchQuestion).toBeNull();
  });

  it("supports the insufficient-evidence shape", () => {
    const parsed = PersonaChatResponse.parse({
      personaResponse:
        "I do not have enough evidence in this persona to answer that confidently.",
      basis: {
        personaStatementIds: [],
        sourceIds: [],
        evidenceExcerpts: [],
        assumptionsUsed: [],
        missingInformation: ["Dietary preferences are unknown."],
        confidence: "LOW",
      },
      suggestedResearchQuestion:
        "What are the guest's specific dietary requirements?",
    });
    expect(parsed.basis.missingInformation).toHaveLength(1);
    expect(parsed.suggestedResearchQuestion).toBeTypeOf("string");
  });

  it("rejects a response missing the basis object", () => {
    expect(() =>
      PersonaChatResponse.parse({
        personaResponse: "No basis here.",
        suggestedResearchQuestion: null,
      }),
    ).toThrow();
  });

  it("validates an anti-stereotype audit result", () => {
    const parsed = PersonaAuditResult.parse({
      personaId: "persona-corp-junior",
      overall: "WARN",
      findings: [
        {
          id: "f1",
          result: "WARN",
          severity: "MEDIUM",
          problematicStatement: "Young joiner, therefore digitally confident.",
          reason: "Infers a behaviour from age alone.",
          suggestedCorrection: "Describe observed onboarding behaviour instead.",
          evidenceRequired: "Onboarding interviews with new joiners.",
        },
      ],
    });
    expect(parsed.findings[0].severity).toBe("MEDIUM");
  });
});
