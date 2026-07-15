import { z } from "zod";
import {
  AccentColor,
  ConfidenceLevel,
  Id,
  IsoDateTime,
  LifecycleStatus,
  PersonaFamily,
  QuoteType,
} from "./common";
import { PersonaSection, PersonaSectionTemplate } from "./section";

/**
 * Demographic context is deliberately narrow and optional. Personas are
 * behaviour-first: demographics are recorded only where they materially shape
 * behaviour, never as the primary differentiator. The anti-stereotype auditor
 * (later phase) reads this to flag demographics-only personas.
 */
export const DemographicContext = z.object({
  ageRange: z.string().optional(),
  location: z.string().optional(),
  tenure: z.string().optional(),
  authorityLevel: z.string().optional(),
  incomeLevel: z.string().optional(),
  /** Free-form note explaining why these traits matter behaviourally. */
  relevanceNote: z.string().optional(),
});
export type DemographicContext = z.infer<typeof DemographicContext>;

/**
 * The stable persona core. Everything flexible lives in `commonSections` and
 * `domainSections`; the top-level fields are the invariants the whole product
 * relies on (identity, quote integrity, confidence, evidence coverage, theme).
 */
export const Persona = z.object({
  id: Id,
  projectId: Id,
  name: z.string().min(1),
  archetype: z.string().min(1),
  category: z.string().min(1),
  family: PersonaFamily,
  segment: z.string().optional(),
  oneLineEssence: z.string().min(1),
  portraitUrl: z.string().optional(),
  accentColor: AccentColor,

  quote: z.string().default(""),
  quoteType: QuoteType,

  confidenceLevel: ConfidenceLevel,
  /** Confidence must be explained, not only badged. */
  confidenceExplanation: z.string().min(1),
  /** 0–1 share of statements backed by direct evidence. */
  evidenceCoverage: z.number().min(0).max(1),

  demographicContext: DemographicContext.default({}),

  commonSections: z.array(PersonaSection).default([]),
  domainSections: z.array(PersonaSection).default([]),

  /** Short behavioural keywords — not demographics. */
  behaviouralTags: z.array(z.string()).default([]),

  sourceIds: z.array(Id).default([]),
  status: LifecycleStatus.default("DRAFT"),
  version: z.number().int().positive().default(1),
  createdAt: IsoDateTime,
  updatedAt: IsoDateTime,
});
export type Persona = z.infer<typeof Persona>;

/** A point-in-time snapshot of a persona, enabling version history / rollback. */
export const PersonaVersion = z.object({
  id: Id,
  personaId: Id,
  version: z.number().int().positive(),
  snapshot: Persona,
  createdAt: IsoDateTime,
  createdBy: Id.optional(),
  note: z.string().optional(),
});
export type PersonaVersion = z.infer<typeof PersonaVersion>;

/**
 * A persona template binds a family to a set of section definitions (and
 * optional seeded archetypes). This is how Corporate vs Sports Hospitality
 * differ structurally without duplicating the product.
 */
export const PersonaTemplate = z.object({
  id: Id,
  name: z.string().min(1),
  family: PersonaFamily,
  description: z.string().optional(),
  accentColor: AccentColor,
  sections: z.array(PersonaSectionTemplate),
  createdAt: IsoDateTime,
  updatedAt: IsoDateTime,
});
export type PersonaTemplate = z.infer<typeof PersonaTemplate>;
