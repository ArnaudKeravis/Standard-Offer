import { describe, expect, it } from "vitest";
import {
  EvidenceStatus,
  QuoteType,
  ConfidenceLevel,
} from "@/lib/persona-studio/ai/schemas/common";
import { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";

describe("Evidence + quote vocabulary", () => {
  it("only allows the three evidence statuses", () => {
    expect(EvidenceStatus.parse("EVIDENCE")).toBe("EVIDENCE");
    expect(EvidenceStatus.parse("ASSUMPTION")).toBe("ASSUMPTION");
    expect(EvidenceStatus.parse("TO_VALIDATE")).toBe("TO_VALIDATE");
    expect(() => EvidenceStatus.parse("FACT")).toThrow();
  });

  it("only allows the four quote types", () => {
    for (const t of ["VERBATIM", "COMPOSITE", "DRAFTED_HYPOTHESIS", "NONE"]) {
      expect(QuoteType.parse(t)).toBe(t);
    }
    expect(() => QuoteType.parse("REAL")).toThrow();
  });

  it("only allows three confidence levels", () => {
    expect(() => ConfidenceLevel.parse("VERY_HIGH")).toThrow();
  });

  it("defaults a source document's processing status and confidentiality", () => {
    const doc = SourceDocument.parse({
      id: "src-x",
      projectId: "proj-x",
      name: "Interview 07",
      type: "txt",
      category: "INTERVIEW",
      createdAt: "2026-05-01T09:00:00.000Z",
    });
    expect(doc.processingStatus).toBe("PENDING");
    expect(doc.confidentiality).toBe("INTERNAL");
    expect(doc.extractedText).toBe("");
  });
});
