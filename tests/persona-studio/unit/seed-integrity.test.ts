import { describe, expect, it } from "vitest";
import { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import { Project } from "@/lib/persona-studio/ai/schemas/project";
import { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import { Journey } from "@/lib/persona-studio/ai/schemas/workshop";
import { PersonaTemplate } from "@/lib/persona-studio/ai/schemas/persona";
import { SEED_DATA } from "@/lib/persona-studio/data/seed";
import { collectStatements } from "@/lib/persona-studio/utils/confidence";

describe("Seed data integrity", () => {
  it("seeds two projects (Corporate + Tour de France)", () => {
    expect(SEED_DATA.projects).toHaveLength(2);
    const families = SEED_DATA.projects.map((p) => p.family).sort();
    expect(families).toEqual(["CORPORATE", "SPORTS_HOSPITALITY"]);
  });

  it("every project validates against the schema", () => {
    for (const p of SEED_DATA.projects) expect(() => Project.parse(p)).not.toThrow();
  });

  it("every persona validates against the schema", () => {
    for (const p of SEED_DATA.personas) expect(() => Persona.parse(p)).not.toThrow();
  });

  it("every source, journey and template validates", () => {
    for (const s of SEED_DATA.sources) expect(() => SourceDocument.parse(s)).not.toThrow();
    for (const j of SEED_DATA.journeys) expect(() => Journey.parse(j)).not.toThrow();
    for (const t of SEED_DATA.templates) expect(() => PersonaTemplate.parse(t)).not.toThrow();
  });

  it("seeds the four Tour de France personas", () => {
    const tdf = SEED_DATA.personas.filter(
      (p) => p.family === "SPORTS_HOSPITALITY",
    );
    expect(tdf.map((p) => p.name).sort()).toEqual([
      "Claire Dubois",
      "David Richardson",
      "Sophie Lambert",
      "Thomas Garcia",
    ]);
  });

  it("seeds the eight Corporate archetypes", () => {
    const corp = SEED_DATA.personas.filter((p) => p.family === "CORPORATE");
    expect(corp).toHaveLength(8);
  });

  it("leaves Corporate local goals & frustrations as TO_VALIDATE", () => {
    const corp = SEED_DATA.personas.filter((p) => p.family === "CORPORATE");
    for (const persona of corp) {
      const goals = persona.commonSections.find((s) => s.key === "goals");
      const frustrations = persona.commonSections.find(
        (s) => s.key === "frustrations",
      );
      expect(goals?.statements.every((s) => s.evidenceStatus === "TO_VALIDATE")).toBe(true);
      expect(
        frustrations?.statements.every((s) => s.evidenceStatus === "TO_VALIDATE"),
      ).toBe(true);
    }
  });

  it("grounds Tour de France statements in the seeded brief", () => {
    const tdf = SEED_DATA.personas.filter(
      (p) => p.family === "SPORTS_HOSPITALITY",
    );
    for (const persona of tdf) {
      const evidenced = collectStatements([
        ...persona.commonSections,
        ...persona.domainSections,
      ]).filter((s) => s.evidenceStatus === "EVIDENCE");
      expect(evidenced.length).toBeGreaterThan(0);
      for (const s of evidenced) {
        expect(s.sourceIds).toContain("src-tdf-brief");
      }
    }
  });

  it("documents Thomas Garcia's waiting-time frustration (workshop journey)", () => {
    const thomas = SEED_DATA.personas.find((p) => p.id === "persona-thomas-garcia");
    const frustrations = thomas?.commonSections.find(
      (s) => s.key === "frustrations",
    );
    const hasWaiting = frustrations?.statements.some((s) =>
      /wait/i.test(s.content),
    );
    expect(hasWaiting).toBe(true);
  });
});
