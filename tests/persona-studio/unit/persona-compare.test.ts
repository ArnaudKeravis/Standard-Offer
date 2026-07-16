import { describe, expect, it } from "vitest";
import { TDF_PERSONAS } from "@/lib/persona-studio/data/seed";
import {
  buildCompareView,
  MAX_COMPARE,
  MIN_COMPARE,
  parseCompareIds,
} from "@/lib/persona-studio/utils/persona-compare";

describe("parseCompareIds", () => {
  it("parses comma-separated ids, de-duplicates and caps at MAX_COMPARE", () => {
    const ids = parseCompareIds("a,b,a,c,d,e,f,g");
    expect(ids).toEqual(["a", "b", "c", "d", "e"]);
    expect(ids).toHaveLength(MAX_COMPARE);
  });

  it("accepts repeated query params", () => {
    expect(parseCompareIds(["x", "y,z"])).toEqual(["x", "y", "z"]);
  });

  it("returns empty for missing input", () => {
    expect(parseCompareIds(undefined)).toEqual([]);
  });
});

describe("buildCompareView", () => {
  const personas = TDF_PERSONAS.slice(0, 3);

  it("requires at least MIN_COMPARE personas for a meaningful compare", () => {
    expect(personas.length).toBeGreaterThanOrEqual(MIN_COMPARE);
  });

  it("derives dimensions only from real statements", () => {
    const view = buildCompareView(personas);
    expect(view.personas).toHaveLength(3);
    expect(view.dimensions.length).toBeGreaterThan(0);
    for (const row of view.dimensions) {
      const total = row.cells.reduce((n, c) => n + c.statements.length, 0);
      expect(total).toBeGreaterThan(0);
      for (const cell of row.cells) {
        for (const s of cell.statements) {
          expect(s.id).toBeTruthy();
          expect(s.content.length).toBeGreaterThan(0);
          expect(["EVIDENCE", "ASSUMPTION", "TO_VALIDATE"]).toContain(
            s.evidenceStatus,
          );
        }
      }
    }
  });

  it("surfaces universal / differentiator / tension / opportunity themes without fabrication", () => {
    const view = buildCompareView(personas);
    const themeIds = new Set(view.needsMatrix.themes.map((t) => t.id));

    for (const u of view.universalNeeds) {
      expect(themeIds.has(u.themeId)).toBe(true);
    }
    for (const d of view.differentiators) {
      expect(d.coveredIds.length).toBeGreaterThan(0);
      expect(d.missingIds.length).toBeGreaterThan(0);
      expect(d.coveredIds.length + d.missingIds.length).toBe(personas.length);
    }
    for (const t of view.tensions) {
      expect(t.strongIds.length).toBeGreaterThan(0);
      expect(t.absentIds.length).toBeGreaterThan(0);
    }
    for (const o of view.opportunities) {
      expect(o.personaIds.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("only includes behavioural tags shared by two or more personas", () => {
    const view = buildCompareView(personas);
    for (const tag of view.sharedTags) {
      expect(tag.personaIds.length).toBeGreaterThanOrEqual(2);
    }
  });
});
