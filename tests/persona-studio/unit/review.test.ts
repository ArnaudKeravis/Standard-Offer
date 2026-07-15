import { describe, expect, it } from "vitest";
import { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import { PersonaAuditResult } from "@/lib/persona-studio/ai/schemas/chat";
import {
  reviewPersona,
  summariseReview,
  type ReviewCategory,
} from "@/lib/persona-studio/utils/review";
import type { PersonaStatement } from "@/lib/persona-studio/ai/schemas/statement";

function statement(over: Partial<PersonaStatement>): PersonaStatement {
  return {
    id: Math.random().toString(36).slice(2),
    content: "content",
    evidenceStatus: "EVIDENCE",
    confidence: "MEDIUM",
    sourceIds: [],
    editable: true,
    ...over,
  };
}

function persona(over: Partial<Persona> = {}): Persona {
  return Persona.parse({
    id: "p1",
    projectId: "proj1",
    name: "Test",
    archetype: "The Tester",
    category: "QA",
    family: "CORPORATE",
    oneLineEssence: "Essence.",
    accentColor: "#1e3a8a",
    quote: "",
    quoteType: "NONE",
    confidenceLevel: "MEDIUM",
    confidenceExplanation: "Explained.",
    evidenceCoverage: 0,
    commonSections: [],
    domainSections: [],
    behaviouralTags: [],
    sourceIds: [],
    status: "DRAFT",
    version: 1,
    createdAt: "2026-05-01T09:00:00.000Z",
    updatedAt: "2026-05-01T09:00:00.000Z",
    ...over,
  });
}

function categories(p: Persona): ReviewCategory[] {
  return reviewPersona(p).findings.map((f) => f.category);
}

describe("reviewPersona", () => {
  it("returns a schema-valid PersonaAuditResult", () => {
    const result = reviewPersona(persona());
    expect(() => PersonaAuditResult.parse(result)).not.toThrow();
  });

  it("passes a clean, fully-sourced persona", () => {
    const p = persona({
      commonSections: [
        {
          id: "sec1",
          key: "needs",
          title: "Needs",
          type: "needs",
          order: 0,
          visible: true,
          statements: [
            statement({ id: "a", content: "Fast service", sourceIds: ["s1"] }),
          ],
        },
      ],
    });
    const review = reviewPersona(p);
    expect(review.overall).toBe("PASS");
    expect(review.findings).toHaveLength(0);
  });

  it("fails when a statement is EVIDENCE but has no source", () => {
    const p = persona({
      commonSections: [
        {
          id: "sec1",
          key: "needs",
          title: "Needs",
          type: "needs",
          order: 0,
          visible: true,
          statements: [statement({ content: "Unsupported claim", sourceIds: [] })],
        },
      ],
    });
    const review = reviewPersona(p);
    expect(review.overall).toBe("FAIL");
    expect(categories(p)).toContain("UNSUPPORTED_EVIDENCE");
  });

  it("flags assumptions, missing evidence, duplicates and stereotypes", () => {
    const p = persona({
      behaviouralTags: ["young"],
      demographicContext: { ageRange: "25-34" },
      commonSections: [
        {
          id: "sec1",
          key: "goals",
          title: "Goals",
          type: "bullets",
          order: 0,
          visible: true,
          statements: [
            statement({
              id: "a",
              content: "Wants recognition",
              evidenceStatus: "ASSUMPTION",
              sourceIds: [],
            }),
            statement({
              id: "b",
              content: "Wants recognition",
              evidenceStatus: "ASSUMPTION",
              sourceIds: [],
            }),
          ],
        },
        {
          id: "sec2",
          key: "pains",
          title: "Pains",
          type: "bullets",
          order: 1,
          visible: true,
          statements: [],
        },
      ],
    });
    const cats = categories(p);
    expect(cats).toContain("ASSUMPTION");
    expect(cats).toContain("MISSING_EVIDENCE");
    expect(cats).toContain("DUPLICATE");
    expect(cats).toContain("POTENTIAL_STEREOTYPE");
  });

  it("flags a contradictory NONE quote and a drafted hypothesis quote", () => {
    expect(categories(persona({ quote: "Something", quoteType: "NONE" }))).toContain(
      "WEAK_QUOTE",
    );
    expect(
      categories(persona({ quote: "Drafted", quoteType: "DRAFTED_HYPOTHESIS" })),
    ).toContain("WEAK_QUOTE");
  });

  it("does not flag demographics that carry a relevance note", () => {
    const p = persona({
      demographicContext: {
        ageRange: "40-50",
        relevanceNote: "Seniority shapes how they delegate food decisions.",
      },
    });
    expect(categories(p)).not.toContain("POTENTIAL_STEREOTYPE");
  });

  it("summarises findings by category", () => {
    const summary = summariseReview(reviewPersona(persona({ quote: "x", quoteType: "NONE" })));
    expect(summary.WEAK_QUOTE).toBe(1);
    expect(summary.DUPLICATE).toBe(0);
  });
});
