import { z } from "zod";
import { Id } from "./common";

/**
 * Server boundary for "Challenge an idea". The client posts the idea + persona
 * ids; grounding is assembled server-side from the repository so the browser
 * can never inject fabricated evidence.
 */
export const IdeaChallengeRequest = z.object({
  projectId: Id,
  personaIds: z.array(Id).min(1).max(8),
  ideaTitle: z.string().min(1).max(200),
  ideaDescription: z.string().max(4000).default(""),
  journeyMoment: z.string().max(500).optional(),
  intendedBenefit: z.string().max(1000).optional(),
  operationalConstraints: z.string().max(1000).optional(),
  /** Display language from the FR/EN toggle. */
  lang: z.enum(["en", "fr"]).optional(),
});
export type IdeaChallengeRequest = z.infer<typeof IdeaChallengeRequest>;
