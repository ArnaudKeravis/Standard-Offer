import { z } from "zod";
import {
  ConfidentialityLabel,
  Id,
  IsoDateTime,
  SourceCategory,
} from "./common";

/**
 * A source document attached to a project. For the MVP, extraction may be
 * mocked, but the storage contract is real: text extraction status, category,
 * confidentiality and an optional (anonymised) participant reference are all
 * first-class so later phases (upload → chunk → embed) slot in unchanged.
 */
export const ProcessingStatus = z.enum([
  "PENDING",
  "PROCESSING",
  "READY",
  "FAILED",
]);
export type ProcessingStatus = z.infer<typeof ProcessingStatus>;

export const SourceDocument = z.object({
  id: Id,
  projectId: Id,
  name: z.string().min(1),
  /** MIME-ish type or logical type: pdf, docx, txt, csv, image, markdown, text. */
  type: z.string().min(1),
  date: IsoDateTime.optional(),
  author: z.string().optional(),
  category: SourceCategory,
  extractedText: z.string().default(""),
  processingStatus: ProcessingStatus.default("PENDING"),
  /**
   * Anonymised participant reference (e.g. "P07"). Never a real name — real
   * participant identity is kept out of persona-facing storage by default.
   */
  participantRef: z.string().optional(),
  confidentiality: ConfidentialityLabel.default("INTERNAL"),
  createdAt: IsoDateTime,
});
export type SourceDocument = z.infer<typeof SourceDocument>;

/**
 * A retrievable evidence chunk derived from a source. The `embedding` field is
 * intentionally present but optional so the pgvector-backed retriever can
 * populate it later without a schema migration on the client side.
 */
export const EvidenceItem = z.object({
  id: Id,
  projectId: Id,
  sourceId: Id,
  content: z.string().min(1),
  /** Optional keywords/tags to power the MVP keyword retriever. */
  tags: z.array(z.string()).default([]),
  /** Optional vector embedding (populated by the production retriever). */
  embedding: z.array(z.number()).optional(),
  createdAt: IsoDateTime,
});
export type EvidenceItem = z.infer<typeof EvidenceItem>;
