import { z } from "zod";
import {
  ConfidenceLevel,
  EvidenceStatus,
  Id,
} from "./common";

/**
 * A short excerpt lifted from a source document, used to justify a statement or
 * an AI answer. The excerpt text is stored so the UI can show *why* a statement
 * exists without re-fetching the whole document.
 */
export const SourceExcerpt = z.object({
  sourceId: Id,
  excerpt: z.string().min(1),
  /** Optional location hint within the source (page, line, timestamp). */
  locator: z.string().optional(),
});
export type SourceExcerpt = z.infer<typeof SourceExcerpt>;

/**
 * The atomic unit of persona content. Every meaningful persona claim is a
 * PersonaStatement — never a raw string — so it can carry its evidence status,
 * confidence and provenance. This is the backbone of evidence transparency.
 */
export const PersonaStatement = z.object({
  id: Id,
  /** Optional label, e.g. a metric name or a moment title. */
  label: z.string().optional(),
  content: z.string().min(1),
  evidenceStatus: EvidenceStatus,
  confidence: ConfidenceLevel,
  /** IDs of the sources that support this statement (may be empty). */
  sourceIds: z.array(Id).default([]),
  /** Optional verbatim excerpts backing the statement. */
  sourceExcerpts: z.array(SourceExcerpt).optional(),
  /** Whether a user may edit this statement in the UI. Defaults to true. */
  editable: z.boolean().default(true),
});
export type PersonaStatement = z.infer<typeof PersonaStatement>;
