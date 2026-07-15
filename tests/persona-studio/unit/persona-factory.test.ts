import { describe, expect, it } from "vitest";
import { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import { CORPORATE_TEMPLATE } from "@/lib/persona-studio/data/templates";
import {
  blankSection,
  blankStatement,
  scaffoldPersona,
  slugifyKey,
} from "@/lib/persona-studio/utils/persona-factory";

describe("persona factory", () => {
  it("slugifies arbitrary titles to snake_case keys", () => {
    expect(slugifyKey("Key Eating Moments")).toBe("key_eating_moments");
    expect(slugifyKey("Frustrations & tensions")).toBe("frustrations_tensions");
    expect(slugifyKey("Été à Paris")).toBe("ete_a_paris");
    expect(slugifyKey("   ")).toBe("section");
  });

  it("creates a blank statement that is honestly unevidenced", () => {
    const s = blankStatement("sec-x");
    expect(s.content).toBe("");
    expect(s.evidenceStatus).toBe("TO_VALIDATE");
    expect(s.confidence).toBe("LOW");
    expect(s.sourceIds).toEqual([]);
    expect(s.editable).toBe(true);
  });

  it("scaffolds a schema-valid persona from a template", () => {
    const persona = scaffoldPersona({
      projectId: "proj-1",
      template: CORPORATE_TEMPLATE,
      family: "CORPORATE",
      name: "Test",
      archetype: "The Tester",
      category: "QA",
    });
    expect(() => Persona.parse(persona)).not.toThrow();
    expect(persona.evidenceCoverage).toBe(0);
    expect(persona.confidenceLevel).toBe("LOW");
    expect(persona.status).toBe("DRAFT");
    expect(persona.version).toBe(1);
  });

  it("splits template sections into common and domain scopes", () => {
    const persona = scaffoldPersona({
      projectId: "proj-1",
      template: CORPORATE_TEMPLATE,
      family: "CORPORATE",
      name: "Test",
      archetype: "The Tester",
      category: "QA",
    });
    const commonKeys = CORPORATE_TEMPLATE.sections
      .filter((s) => s.scope === "COMMON")
      .map((s) => s.key)
      .sort();
    const domainKeys = CORPORATE_TEMPLATE.sections
      .filter((s) => s.scope === "DOMAIN")
      .map((s) => s.key)
      .sort();
    expect(persona.commonSections.map((s) => s.key).sort()).toEqual(commonKeys);
    expect(persona.domainSections.map((s) => s.key).sort()).toEqual(domainKeys);
    // Every scaffolded section starts empty.
    for (const s of [...persona.commonSections, ...persona.domainSections]) {
      expect(s.statements).toEqual([]);
    }
  });

  it("produces valid custom blank sections", () => {
    const s = blankSection(3, { title: "My custom block" });
    expect(s.key).toBe(slugifyKey("My custom block_3"));
    expect(s.order).toBe(3);
    expect(s.visible).toBe(true);
    expect(s.type).toBe("bullets");
  });
});
