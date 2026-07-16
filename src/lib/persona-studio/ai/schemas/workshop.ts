import { z } from "zod";
import { ConfidenceLevel, Id, IsoDateTime } from "./common";

/**
 * Journeys describe an experience as an ordered set of steps. Both the Tour de
 * France and the Corporate journeys are just data — the Journey Lens renders
 * any journey against any persona.
 */
export const JourneyStep = z.object({
  id: Id,
  key: z.string().min(1),
  title: z.string().min(1),
  order: z.number().int().nonnegative(),
});
export type JourneyStep = z.infer<typeof JourneyStep>;

export const Journey = z.object({
  id: Id,
  projectId: Id,
  name: z.string().min(1),
  steps: z.array(JourneyStep),
  createdAt: IsoDateTime,
});
export type Journey = z.infer<typeof Journey>;

/** How a specific persona experiences a specific journey step. */
export const PersonaJourneyResponse = z.object({
  id: Id,
  personaId: Id,
  journeyId: Id,
  stepId: Id,
  goal: z.string().optional(),
  behaviour: z.string().optional(),
  emotion: z.string().optional(),
  painPoint: z.string().optional(),
  need: z.string().optional(),
  opportunity: z.string().optional(),
  evidenceSourceIds: z.array(Id).default([]),
});
export type PersonaJourneyResponse = z.infer<typeof PersonaJourneyResponse>;

/** Chat entities (used from Phase 3, defined now for a stable data model). */
export const Message = z.object({
  id: Id,
  conversationId: Id,
  role: z.enum(["user", "persona", "system"]),
  content: z.string(),
  /** Structured basis payload for persona answers (see chat schema). */
  basis: z.unknown().optional(),
  createdAt: IsoDateTime,
});
export type Message = z.infer<typeof Message>;

export const Conversation = z.object({
  id: Id,
  personaId: Id,
  projectId: Id,
  title: z.string().default("Untitled conversation"),
  scenario: z.string().optional(),
  journeyStepId: Id.optional(),
  createdAt: IsoDateTime,
  updatedAt: IsoDateTime,
});
export type Conversation = z.infer<typeof Conversation>;

/** Workshop board entities. */
export const WorkshopIdea = z.object({
  id: Id,
  workshopId: Id,
  title: z.string().min(1),
  description: z.string().default(""),
  journeyMoment: z.string().optional(),
  intendedBenefit: z.string().optional(),
  operationalConstraints: z.string().optional(),
  conceptImageUrl: z.string().optional(),
  createdAt: IsoDateTime,
});
export type WorkshopIdea = z.infer<typeof WorkshopIdea>;

export const IdeaEvaluation = z.object({
  id: Id,
  ideaId: Id,
  personaId: Id,
  initialReaction: z.string(),
  perceivedBenefit: z.string(),
  mainConcern: z.string(),
  adoptionTrigger: z.string(),
  rejectionTrigger: z.string(),
  missingInformation: z.array(z.string()).default([]),
  evidenceSourceIds: z.array(Id).default([]),
  confidence: ConfidenceLevel,
  improvementRecommendation: z.string(),
});
export type IdeaEvaluation = z.infer<typeof IdeaEvaluation>;

export const StickyNote = z.object({
  id: Id,
  workshopId: Id,
  text: z.string().min(1),
  personaId: Id.optional(),
  votes: z.number().int().nonnegative().default(0),
  kind: z.enum(["NOTE", "ASSUMPTION", "QUESTION", "OPPORTUNITY"]).default("NOTE"),
  createdAt: IsoDateTime,
});
export type StickyNote = z.infer<typeof StickyNote>;

export const Workshop = z.object({
  id: Id,
  projectId: Id,
  name: z.string().min(1),
  personaIds: z.array(Id).default([]),
  notes: z.array(StickyNote).default([]),
  ideas: z.array(WorkshopIdea).default([]),
  createdAt: IsoDateTime,
  updatedAt: IsoDateTime,
});
export type Workshop = z.infer<typeof Workshop>;

/**
 * Client-persisted workshop board snapshot (localStorage in Phase 4).
 * Additive — same note shape as {@link StickyNote}; not a realtime store.
 */
export const WorkshopBoardSnapshot = z.object({
  projectId: Id,
  personaIds: z.array(Id).default([]),
  notes: z.array(StickyNote).default([]),
  updatedAt: IsoDateTime,
});
export type WorkshopBoardSnapshot = z.infer<typeof WorkshopBoardSnapshot>;
