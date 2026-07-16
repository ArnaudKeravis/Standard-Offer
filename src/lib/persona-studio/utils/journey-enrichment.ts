import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { PersonaStatement } from "@/lib/persona-studio/ai/schemas/statement";
import {
  tokenize,
  normalise,
} from "@/lib/persona-studio/ai/retrieval/keyword-retriever";
import { sectionByKey } from "@/lib/persona-studio/utils/persona-view";

/**
 * Living journey enrichment — derived ONLY from the persona's own statements.
 *
 * For each day-journey moment, pick the best-matching goal / emotion cue /
 * pain / opportunity from existing sections via keyword overlap. Missing slots
 * stay undefined (never invented).
 */

export interface LivingMomentSlot {
  statement: PersonaStatement;
  sectionKey: string;
}

export interface LivingMomentEnrichment {
  goal?: LivingMomentSlot;
  emotion?: LivingMomentSlot;
  pain?: LivingMomentSlot;
  opportunity?: LivingMomentSlot;
  /** All statement ids used as basis for transparency. */
  basisStatementIds: string[];
}

const GOAL_KEYS = ["goals", "motivations", "key_expectations", "needs"];
const PAIN_KEYS = ["frustrations", "pains"];
const OPPORTUNITY_KEYS = [
  "ideal_experience",
  "food_expectations",
  "workplace_expectations",
  "expectations",
  "needs",
];
/** Emotion cues often live in lifestyle / context / quote-adjacent narrative. */
const EMOTION_KEYS = ["lifestyle", "context", "daily_job", "behaviours", "motivations"];

function candidates(
  persona: Persona,
  keys: string[],
): { statement: PersonaStatement; sectionKey: string }[] {
  const out: { statement: PersonaStatement; sectionKey: string }[] = [];
  for (const key of keys) {
    const section = sectionByKey(persona, [key]);
    if (!section) continue;
    for (const statement of section.statements) {
      if (!statement.content.trim()) continue;
      out.push({ statement, sectionKey: section.key });
    }
  }
  return out;
}

function scoreAgainstMoment(
  momentText: string,
  candidate: string,
): number {
  const terms = tokenize(momentText);
  if (terms.length === 0) return 0;
  const hay = normalise(candidate);
  let hits = 0;
  for (const term of terms) {
    if (hay.includes(term)) hits += 1;
  }
  return hits / terms.length;
}

function bestMatch(
  momentText: string,
  pool: { statement: PersonaStatement; sectionKey: string }[],
  used: Set<string>,
  minScore = 0.12,
): LivingMomentSlot | undefined {
  let best: LivingMomentSlot | undefined;
  let bestScore = minScore;
  for (const item of pool) {
    if (used.has(item.statement.id)) continue;
    const score = scoreAgainstMoment(momentText, item.statement.content);
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  return best;
}

/**
 * Enrich one journey moment from the persona sheet. Pure and deterministic.
 */
export function enrichJourneyMoment(
  persona: Persona,
  moment: PersonaStatement,
): LivingMomentEnrichment {
  const momentText = [moment.label ?? "", moment.content].join(" ");
  const used = new Set<string>([moment.id]);

  const goal = bestMatch(momentText, candidates(persona, GOAL_KEYS), used);
  if (goal) used.add(goal.statement.id);

  const pain = bestMatch(momentText, candidates(persona, PAIN_KEYS), used);
  if (pain) used.add(pain.statement.id);

  const opportunity = bestMatch(
    momentText,
    candidates(persona, OPPORTUNITY_KEYS),
    used,
  );
  if (opportunity) used.add(opportunity.statement.id);

  const emotion = bestMatch(
    momentText,
    candidates(persona, EMOTION_KEYS),
    used,
    0.08,
  );
  if (emotion) used.add(emotion.statement.id);

  const basisStatementIds = [moment.id];
  for (const slot of [goal, emotion, pain, opportunity]) {
    if (slot) basisStatementIds.push(slot.statement.id);
  }

  return { goal, emotion, pain, opportunity, basisStatementIds };
}

/** Enrich every moment in a moments section. */
export function enrichJourneySection(
  persona: Persona,
  moments: PersonaStatement[],
): Map<string, LivingMomentEnrichment> {
  const map = new Map<string, LivingMomentEnrichment>();
  for (const moment of moments) {
    map.set(moment.id, enrichJourneyMoment(persona, moment));
  }
  return map;
}
