import { describe, expect, it } from "vitest";
import {
  buildNeedsMatrix,
  empathyQuadrants,
  needStrength,
} from "@/lib/persona-studio/utils/persona-view";
import type { ConfidenceLevel } from "@/lib/persona-studio/ai/schemas/common";
import type { PersonaStatement } from "@/lib/persona-studio/ai/schemas/statement";
import { TDF_PERSONAS } from "@/lib/persona-studio/data/seed/tdf-personas";
import { CORPORATE_PERSONAS } from "@/lib/persona-studio/data/seed/corporate-personas";

function stmt(confidence: ConfidenceLevel, i: number): PersonaStatement {
  return {
    id: `s${i}`,
    content: `statement ${i}`,
    evidenceStatus: "EVIDENCE",
    confidence,
    sourceIds: [],
    editable: true,
  };
}

describe("needStrength (needs-map strength proxy)", () => {
  it("is unknown (NONE) with no statements", () => {
    expect(needStrength([])).toEqual({ level: "NONE", count: 0, score: 0 });
  });

  it("maps dominant HIGH confidence to STRONG", () => {
    const r = needStrength([stmt("HIGH", 1), stmt("HIGH", 2), stmt("MEDIUM", 3)]);
    expect(r.level).toBe("STRONG");
    expect(r.count).toBe(3);
  });

  it("maps mixed confidence to MODERATE", () => {
    const r = needStrength([stmt("MEDIUM", 1), stmt("MEDIUM", 2)]);
    expect(r.level).toBe("MODERATE");
  });

  it("maps low confidence to EMERGING", () => {
    const r = needStrength([stmt("LOW", 1), stmt("LOW", 2)]);
    expect(r.level).toBe("EMERGING");
  });

  it("respects the STRONG/MODERATE boundary at 2.5", () => {
    // avg 2.5 -> STRONG
    expect(needStrength([stmt("HIGH", 1), stmt("MEDIUM", 2)]).level).toBe("STRONG");
    // avg ~2.33 -> MODERATE
    expect(
      needStrength([stmt("HIGH", 1), stmt("MEDIUM", 2), stmt("MEDIUM", 3)]).level,
    ).toBe("MODERATE");
  });
});

describe("empathyQuadrants (built from persona's own sections)", () => {
  const david = TDF_PERSONAS.find((p) => p.id === "persona-david-richardson")!;

  it("always returns exactly four quadrants in reading order", () => {
    const q = empathyQuadrants(david);
    expect(q.map((x) => x.id)).toEqual([
      "motivations",
      "frustrations",
      "needs",
      "context",
    ]);
  });

  it("maps quadrants onto the persona's real section keys", () => {
    const q = empathyQuadrants(david);
    const byId = Object.fromEntries(q.map((x) => [x.id, x]));
    expect(byId.motivations.section?.key).toBe("motivations");
    expect(byId.frustrations.section?.key).toBe("frustrations");
    // needs resolves via the prioritised key list (key_expectations for TdF)
    expect(byId.needs.section?.key).toBe("key_expectations");
    expect(byId.context.section?.key).toBe("context");
    expect(byId.motivations.statements.length).toBeGreaterThan(0);
  });

  it("never fabricates statements for a missing quadrant", () => {
    // A persona with no matching section yields an empty (not invented) quadrant.
    const empty = empathyQuadrants({
      ...david,
      commonSections: [],
      domainSections: [],
    });
    expect(empty).toHaveLength(4);
    empty.forEach((q) => {
      expect(q.section).toBeUndefined();
      expect(q.statements).toEqual([]);
    });
  });
});

describe("buildNeedsMatrix (honest coverage matrix)", () => {
  it("builds one row per persona and only themes that exist", () => {
    const matrix = buildNeedsMatrix(TDF_PERSONAS);
    expect(matrix.rows).toHaveLength(TDF_PERSONAS.length);
    // TdF personas carry motivations, key_expectations, frustrations and food.
    expect(matrix.themes.map((t) => t.id)).toEqual([
      "motivations",
      "needs",
      "frustrations",
      "food",
    ]);
    for (const row of matrix.rows) {
      expect(row.cells).toHaveLength(matrix.themes.length);
    }
  });

  it("derives real (non-empty) strengths from seed statements", () => {
    const matrix = buildNeedsMatrix(TDF_PERSONAS);
    const david = matrix.rows.find(
      (r) => r.persona.id === "persona-david-richardson",
    )!;
    const motivations = david.cells.find((c) => c.themeId === "motivations")!;
    expect(motivations.strength.count).toBeGreaterThan(0);
    expect(motivations.strength.level).not.toBe("NONE");
  });

  it("works for the corporate family via alternate section keys", () => {
    const matrix = buildNeedsMatrix(CORPORATE_PERSONAS);
    // motivations resolves via `goals`, needs via `workplace_expectations`,
    // food via `food_expectations`; all corporate personas carry these.
    expect(matrix.themes.map((t) => t.id)).toContain("motivations");
    expect(matrix.themes.map((t) => t.id)).toContain("needs");
    expect(matrix.themes.map((t) => t.id)).toContain("food");
    expect(matrix.rows).toHaveLength(CORPORATE_PERSONAS.length);
  });
});
