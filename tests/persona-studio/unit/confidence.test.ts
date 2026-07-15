import { describe, expect, it } from "vitest";
import {
  computeEvidenceCoverage,
  evidenceBreakdown,
  suggestConfidence,
} from "@/lib/persona-studio/utils/confidence";
import type { PersonaStatement } from "@/lib/persona-studio/ai/schemas/statement";

function make(status: PersonaStatement["evidenceStatus"], i: number): PersonaStatement {
  return {
    id: `s${i}`,
    content: `statement ${i}`,
    evidenceStatus: status,
    confidence: "MEDIUM",
    sourceIds: [],
    editable: true,
  };
}

describe("confidence + coverage helpers", () => {
  it("returns 0 coverage for no statements", () => {
    expect(computeEvidenceCoverage([])).toBe(0);
  });

  it("computes the evidence share", () => {
    const statements = [
      make("EVIDENCE", 1),
      make("EVIDENCE", 2),
      make("ASSUMPTION", 3),
      make("TO_VALIDATE", 4),
    ];
    expect(computeEvidenceCoverage(statements)).toBe(0.5);
  });

  it("maps coverage onto confidence bands", () => {
    expect(suggestConfidence(0.7)).toBe("HIGH");
    expect(suggestConfidence(0.6)).toBe("HIGH");
    expect(suggestConfidence(0.45)).toBe("MEDIUM");
    expect(suggestConfidence(0.3)).toBe("MEDIUM");
    expect(suggestConfidence(0.1)).toBe("LOW");
    expect(suggestConfidence(0)).toBe("LOW");
  });

  it("breaks statements down by status", () => {
    const b = evidenceBreakdown([
      make("EVIDENCE", 1),
      make("ASSUMPTION", 2),
      make("ASSUMPTION", 3),
      make("TO_VALIDATE", 4),
    ]);
    expect(b).toEqual({ evidence: 1, assumption: 2, toValidate: 1, total: 4 });
  });
});
