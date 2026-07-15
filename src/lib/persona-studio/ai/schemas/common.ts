import { z } from "zod";

/**
 * Persona Studio — shared enums and primitives.
 *
 * These are the vocabulary of the product's grounding model. They are used by
 * every other schema, the seed data, the repository and (later) the AI
 * structured outputs. Keep them strict: weakening any of these enums silently
 * weakens the evidence-transparency guarantees of the whole product.
 */

/** How trustworthy a single statement is, and where it comes from. */
export const EvidenceStatus = z.enum(["EVIDENCE", "ASSUMPTION", "TO_VALIDATE"]);
export type EvidenceStatus = z.infer<typeof EvidenceStatus>;

/** Confidence level applied to statements, answers and whole personas. */
export const ConfidenceLevel = z.enum(["HIGH", "MEDIUM", "LOW"]);
export type ConfidenceLevel = z.infer<typeof ConfidenceLevel>;

/**
 * Quote integrity. A persona quote must always declare what kind of quote it
 * is so the UI never presents a drafted hypothesis as a verbatim interview.
 */
export const QuoteType = z.enum([
  "VERBATIM",
  "COMPOSITE",
  "DRAFTED_HYPOTHESIS",
  "NONE",
]);
export type QuoteType = z.infer<typeof QuoteType>;

/** Which persona family a project/persona belongs to. Drives theme + templates. */
export const PersonaFamily = z.enum(["CORPORATE", "SPORTS_HOSPITALITY"]);
export type PersonaFamily = z.infer<typeof PersonaFamily>;

/** Research posture for a project. */
export const ResearchMode = z.enum(["RESEARCH_GROUNDED", "PROTO_PERSONA"]);
export type ResearchMode = z.infer<typeof ResearchMode>;

/** Lifecycle status shared by projects and personas. */
export const LifecycleStatus = z.enum([
  "DRAFT",
  "IN_REVIEW",
  "PUBLISHED",
  "ARCHIVED",
]);
export type LifecycleStatus = z.infer<typeof LifecycleStatus>;

/** The rendering shape of a persona section. */
export const SectionType = z.enum([
  "bullets",
  "text",
  "quote",
  "metrics",
  "moments",
  "needs",
  "journey",
  "custom",
]);
export type SectionType = z.infer<typeof SectionType>;

/** Category of an uploaded/pasted source document. */
export const SourceCategory = z.enum([
  "INTERVIEW",
  "OBSERVATION",
  "SURVEY",
  "EXISTING_PERSONA",
  "BRIEF",
  "DESK_RESEARCH",
  "OTHER",
]);
export type SourceCategory = z.infer<typeof SourceCategory>;

/** Confidentiality label carried by a source. */
export const ConfidentialityLabel = z.enum([
  "PUBLIC",
  "INTERNAL",
  "CLIENT_CONFIDENTIAL",
  "RESTRICTED",
]);
export type ConfidentialityLabel = z.infer<typeof ConfidentialityLabel>;

/** A CSS colour token used as a persona / project accent. */
export const AccentColor = z
  .string()
  .regex(
    /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
    "Accent colour must be a hex value like #ffb81c",
  );

/** Human-readable, kebab/snake friendly key used to reference a section. */
export const SectionKey = z
  .string()
  .min(1)
  .regex(/^[a-z0-9_]+$/, "Section keys must be lowercase snake_case");

/** ISO date-time string. */
export const IsoDateTime = z.string().datetime({ offset: true });

/** Stable, non-empty identifier. */
export const Id = z.string().min(1);
