import { z } from "zod";
import { Id } from "./common";

/**
 * Phase 3 — "Talk to a persona" request contract.
 *
 * This is the server boundary for the persona chat feature: the client posts a
 * question (plus optional scenario and prior turns) and the server grounds the
 * answer in the selected persona only. It is intentionally small — the heavy
 * grounding context is assembled server-side from the repository, never trusted
 * from the client, so a browser can never smuggle in fabricated "evidence".
 */

/** A single prior turn, used to give the model conversational continuity. */
export const ChatTurn = z.object({
  role: z.enum(["user", "persona"]),
  content: z.string().min(1),
});
export type ChatTurn = z.infer<typeof ChatTurn>;

export const PersonaChatRequest = z.object({
  projectId: Id,
  personaId: Id,
  /** The workshop scenario/frame the user is exploring (optional). */
  scenario: z.string().max(2000).optional(),
  /** The user's current question to the persona. */
  question: z.string().min(1).max(2000),
  /** Previous turns (most recent last). Trimmed server-side. */
  history: z.array(ChatTurn).max(50).default([]),
  /**
   * Display language chosen in the studio (FR/EN toggle). When set, the persona
   * content is grounded and answered in this language; otherwise it falls back
   * to the project's own default language.
   */
  lang: z.enum(["en", "fr"]).optional(),
});
export type PersonaChatRequest = z.infer<typeof PersonaChatRequest>;
