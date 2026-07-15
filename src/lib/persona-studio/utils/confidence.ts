import type { ConfidenceLevel } from "@/lib/persona-studio/ai/schemas/common";
import type { PersonaSection } from "@/lib/persona-studio/ai/schemas/section";
import type { PersonaStatement } from "@/lib/persona-studio/ai/schemas/statement";

/**
 * Deterministic confidence + evidence-coverage helpers.
 *
 * These are intentionally simple and transparent: a facilitator must be able to
 * explain any number the product shows. Coverage is the share of statements
 * backed by direct EVIDENCE; the suggested confidence maps coverage onto the
 * HIGH / MEDIUM / LOW bands. The stored `confidenceLevel` may still be set by a
 * researcher, but this gives a defensible default and powers the auditor.
 */

/** Flatten all statements across a persona's common and domain sections. */
export function collectStatements(
  sections: PersonaSection[],
): PersonaStatement[] {
  return sections.flatMap((section) => section.statements);
}

/**
 * Evidence coverage: fraction of statements whose status is EVIDENCE.
 * Returns 0 when there are no statements (nothing is evidenced yet).
 */
export function computeEvidenceCoverage(
  statements: PersonaStatement[],
): number {
  if (statements.length === 0) return 0;
  const evidenced = statements.filter(
    (s) => s.evidenceStatus === "EVIDENCE",
  ).length;
  return round2(evidenced / statements.length);
}

/**
 * Suggested confidence band from coverage.
 * - HIGH:   ≥ 0.6 of statements are direct evidence
 * - MEDIUM: ≥ 0.3
 * - LOW:    below 0.3 (or nothing evidenced)
 */
export function suggestConfidence(coverage: number): ConfidenceLevel {
  if (coverage >= 0.6) return "HIGH";
  if (coverage >= 0.3) return "MEDIUM";
  return "LOW";
}

/** Count statements by evidence status — used by the review/audit surfaces. */
export function evidenceBreakdown(statements: PersonaStatement[]): {
  evidence: number;
  assumption: number;
  toValidate: number;
  total: number;
} {
  return {
    evidence: statements.filter((s) => s.evidenceStatus === "EVIDENCE").length,
    assumption: statements.filter((s) => s.evidenceStatus === "ASSUMPTION")
      .length,
    toValidate: statements.filter((s) => s.evidenceStatus === "TO_VALIDATE")
      .length,
    total: statements.length,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
