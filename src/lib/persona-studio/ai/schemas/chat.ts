import { z } from "zod";
import { ConfidenceLevel, Id } from "./common";

/**
 * The mandated structured output for "Talk to a persona". The model must return
 * exactly this shape — never free Markdown. The `basis` object is what makes the
 * simulation auditable: every answer exposes the statements, sources and
 * assumptions it relied on, plus what was missing.
 */
export const ChatEvidenceExcerpt = z.object({
  sourceId: Id,
  excerpt: z.string(),
});
export type ChatEvidenceExcerpt = z.infer<typeof ChatEvidenceExcerpt>;

export const PersonaChatResponse = z.object({
  personaResponse: z.string(),
  basis: z.object({
    personaStatementIds: z.array(z.string()).default([]),
    sourceIds: z.array(z.string()).default([]),
    evidenceExcerpts: z.array(ChatEvidenceExcerpt).default([]),
    assumptionsUsed: z.array(z.string()).default([]),
    missingInformation: z.array(z.string()).default([]),
    confidence: ConfidenceLevel,
  }),
  suggestedResearchQuestion: z.string().nullable(),
});
export type PersonaChatResponse = z.infer<typeof PersonaChatResponse>;

/**
 * Output of the anti-stereotype auditor. One finding per detected issue, each
 * actionable: what is wrong, why, how to fix, and what evidence would validate.
 */
export const AuditSeverity = z.enum(["INFO", "LOW", "MEDIUM", "HIGH"]);
export type AuditSeverity = z.infer<typeof AuditSeverity>;

export const AuditFinding = z.object({
  id: Id,
  result: z.enum(["PASS", "WARN", "FAIL"]),
  severity: AuditSeverity,
  problematicStatement: z.string(),
  reason: z.string(),
  suggestedCorrection: z.string(),
  evidenceRequired: z.string(),
});
export type AuditFinding = z.infer<typeof AuditFinding>;

export const PersonaAuditResult = z.object({
  personaId: Id,
  findings: z.array(AuditFinding).default([]),
  overall: z.enum(["PASS", "WARN", "FAIL"]),
});
export type PersonaAuditResult = z.infer<typeof PersonaAuditResult>;
