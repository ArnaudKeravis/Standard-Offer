import type {
  IdeaChallengeResponse,
  PersonaIdeaReaction,
} from "@/lib/persona-studio/ai/schemas/challenge";

/**
 * Derive cross-persona conflicts from Idea Challenge reactions.
 * Never invents — only surfaces where personas pull in different directions.
 */

export interface ChallengeConflict {
  theme: "concern" | "rejection" | "adoption";
  /** Short label for the divergence. */
  label: string;
  /** Persona id → their statement on this theme. */
  byPersona: { personaId: string; text: string }[];
}

function normaliseKey(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .slice(0, 80);
}

function divergentField(
  reactions: PersonaIdeaReaction[],
  field: "mainConcern" | "rejectionTrigger" | "adoptionTrigger",
  theme: ChallengeConflict["theme"],
  label: string,
): ChallengeConflict | null {
  const entries = reactions
    .map((r) => ({ personaId: r.personaId, text: r[field].trim() }))
    .filter((e) => e.text.length > 0);
  if (entries.length < 2) return null;

  const keys = new Set(entries.map((e) => normaliseKey(e.text)));
  // If every persona says essentially the same thing, not a conflict.
  if (keys.size < 2) return null;

  return { theme, label, byPersona: entries };
}

export function deriveChallengeConflicts(
  response: IdeaChallengeResponse,
): ChallengeConflict[] {
  const out: ChallengeConflict[] = [];
  const concern = divergentField(
    response.reactions,
    "mainConcern",
    "concern",
    "Divergent concerns",
  );
  if (concern) out.push(concern);
  const rejection = divergentField(
    response.reactions,
    "rejectionTrigger",
    "rejection",
    "Divergent rejection triggers",
  );
  if (rejection) out.push(rejection);
  const adoption = divergentField(
    response.reactions,
    "adoptionTrigger",
    "adoption",
    "Divergent adoption triggers",
  );
  if (adoption) out.push(adoption);
  return out;
}

/** Cap field questions for the Challenge Pack finale. */
export function fieldQuestionsPack(
  response: IdeaChallengeResponse,
  limit = 3,
): string[] {
  return response.synthesis.questionsToTest
    .map((q) => q.trim())
    .filter(Boolean)
    .slice(0, limit);
}
