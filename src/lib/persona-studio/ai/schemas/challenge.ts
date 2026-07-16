import { z } from "zod";
import { ConfidenceLevel, Id } from "./common";
import { ChatEvidenceExcerpt } from "./chat";

/**
 * Structured output for Idea Challenge. No numeric scores — only qualitative,
 * evidence-grounded reactions plus a cross-persona synthesis.
 */
export const PersonaIdeaReaction = z.object({
  personaId: Id,
  initialReaction: z.string(),
  perceivedBenefit: z.string(),
  mainConcern: z.string(),
  adoptionTrigger: z.string(),
  rejectionTrigger: z.string(),
  missingInformation: z.array(z.string()).default([]),
  improvementRecommendation: z.string(),
  basis: z.object({
    personaStatementIds: z.array(z.string()).default([]),
    sourceIds: z.array(z.string()).default([]),
    evidenceExcerpts: z.array(ChatEvidenceExcerpt).default([]),
    assumptionsUsed: z.array(z.string()).default([]),
    confidence: ConfidenceLevel,
  }),
});
export type PersonaIdeaReaction = z.infer<typeof PersonaIdeaReaction>;

export const IdeaChallengeSynthesis = z.object({
  universalStrengths: z.array(z.string()).default([]),
  personaSpecificBenefits: z
    .array(
      z.object({
        personaId: Id,
        benefit: z.string(),
      }),
    )
    .default([]),
  risks: z.array(z.string()).default([]),
  questionsToTest: z.array(z.string()).max(3).default([]),
  suggestedPrototype: z.string(),
});
export type IdeaChallengeSynthesis = z.infer<typeof IdeaChallengeSynthesis>;

export const IdeaChallengeResponse = z.object({
  reactions: z.array(PersonaIdeaReaction).min(1),
  synthesis: IdeaChallengeSynthesis,
});
export type IdeaChallengeResponse = z.infer<typeof IdeaChallengeResponse>;
