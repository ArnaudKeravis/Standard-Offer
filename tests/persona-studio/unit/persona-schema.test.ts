import { describe, expect, it } from "vitest";
import { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import { PersonaStatement } from "@/lib/persona-studio/ai/schemas/statement";
import { PersonaSection } from "@/lib/persona-studio/ai/schemas/section";

const validStatement = {
  id: "s1",
  content: "Prefers fast, discreet service.",
  evidenceStatus: "EVIDENCE",
  confidence: "HIGH",
  sourceIds: ["src-1"],
};

const validSection = {
  id: "sec1",
  key: "needs",
  title: "Needs",
  type: "needs",
  order: 0,
  visible: true,
  statements: [validStatement],
};

const validPersona = {
  id: "p1",
  projectId: "proj1",
  name: "Test Persona",
  archetype: "The Tester",
  category: "QA",
  family: "CORPORATE",
  oneLineEssence: "A persona used in tests.",
  accentColor: "#1e3a8a",
  quote: "I validate everything.",
  quoteType: "COMPOSITE",
  confidenceLevel: "MEDIUM",
  confidenceExplanation: "Explained for the test.",
  evidenceCoverage: 0.5,
  commonSections: [validSection],
  domainSections: [],
  behaviouralTags: ["thorough"],
  sourceIds: ["src-1"],
  status: "DRAFT",
  version: 1,
  createdAt: "2026-05-01T09:00:00.000Z",
  updatedAt: "2026-05-01T09:00:00.000Z",
};

describe("Persona schema", () => {
  it("accepts a well-formed persona", () => {
    const parsed = Persona.parse(validPersona);
    expect(parsed.name).toBe("Test Persona");
    expect(parsed.commonSections[0].statements[0].evidenceStatus).toBe(
      "EVIDENCE",
    );
  });

  it("applies defaults for optional collections and flags", () => {
    const parsed = PersonaStatement.parse({
      id: "s2",
      content: "Minimal statement.",
      evidenceStatus: "ASSUMPTION",
      confidence: "LOW",
    });
    expect(parsed.sourceIds).toEqual([]);
    expect(parsed.editable).toBe(true);
  });

  it("rejects an invalid accent colour", () => {
    expect(() =>
      Persona.parse({ ...validPersona, accentColor: "blue" }),
    ).toThrow();
  });

  it("rejects an evidence coverage outside 0–1", () => {
    expect(() =>
      Persona.parse({ ...validPersona, evidenceCoverage: 1.4 }),
    ).toThrow();
  });

  it("rejects a section key that is not snake_case", () => {
    expect(() =>
      PersonaSection.parse({ ...validSection, key: "Needs List" }),
    ).toThrow();
  });
});
