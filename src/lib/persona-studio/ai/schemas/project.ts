import { z } from "zod";
import {
  Id,
  IsoDateTime,
  LifecycleStatus,
  PersonaFamily,
  ResearchMode,
} from "./common";

/**
 * Sharing posture for a published project. Optional so that seed data (created
 * before the publish step existed) stays valid; the publish wizard sets it.
 */
export const ProjectVisibility = z.enum(["PRIVATE", "TEAM", "CLIENT_SHARED"]);
export type ProjectVisibility = z.infer<typeof ProjectVisibility>;

/**
 * A project is the container for a body of research and the personas built from
 * it. It also carries the workshop-facing metadata (client, segment, region)
 * used by the library filters.
 */
export const Project = z.object({
  id: Id,
  name: z.string().min(1),
  client: z.string().min(1),
  family: PersonaFamily,
  segment: z.string().min(1),
  region: z.string().min(1),
  language: z.string().min(1),
  researchMode: ResearchMode,
  description: z.string().default(""),
  /** Primary objective for the workshop this project feeds. */
  workshopObjective: z.string().optional(),
  /** Audience the personas must cover. */
  audience: z.array(z.string()).default([]),
  desiredPersonaCount: z.number().int().positive().optional(),
  templateId: Id.optional(),
  ownerId: Id,
  status: LifecycleStatus.default("DRAFT"),
  /** Sharing settings, set at publish time (optional for legacy/seed data). */
  visibility: ProjectVisibility.optional(),
  shareNote: z.string().optional(),
  /** Denormalised counters for fast library rendering. */
  personaCount: z.number().int().nonnegative().default(0),
  sourceCount: z.number().int().nonnegative().default(0),
  workshopCount: z.number().int().nonnegative().default(0),
  createdAt: IsoDateTime,
  updatedAt: IsoDateTime,
});
export type Project = z.infer<typeof Project>;

/** Minimal user record (mock auth in the MVP). */
export const User = z.object({
  id: Id,
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["FACILITATOR", "RESEARCHER", "VIEWER", "ADMIN"]).default("FACILITATOR"),
});
export type User = z.infer<typeof User>;
