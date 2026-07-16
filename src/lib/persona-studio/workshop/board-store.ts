"use client";

import {
  WorkshopBoardSnapshot,
  type StickyNote,
} from "@/lib/persona-studio/ai/schemas/workshop";

/**
 * Client-side workshop board persistence (localStorage).
 *
 * Mirrors the Phase 3 conversation store: facilitator-friendly, no server
 * round-trip, survives reloads for the session machine. No realtime multiplayer.
 * Shape is the Zod {@link WorkshopBoardSnapshot} schema.
 */

export type BoardState = WorkshopBoardSnapshot;

const KEY_PREFIX = "persona-studio:workshop-board:v1:";

function keyFor(projectId: string): string {
  return `${KEY_PREFIX}${projectId}`;
}

function isAvailable(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

export function emptyBoard(projectId: string, personaIds: string[] = []): BoardState {
  return {
    projectId,
    personaIds,
    notes: [],
    updatedAt: new Date().toISOString(),
  };
}

export function loadBoard(
  projectId: string,
  defaultPersonaIds: string[] = [],
): BoardState {
  const empty = emptyBoard(projectId, defaultPersonaIds);
  if (!isAvailable()) return empty;
  try {
    const raw = window.localStorage.getItem(keyFor(projectId));
    if (!raw) return empty;
    const parsed = WorkshopBoardSnapshot.safeParse(JSON.parse(raw));
    if (!parsed.success || parsed.data.projectId !== projectId) return empty;
    return parsed.data;
  } catch {
    return empty;
  }
}

export function saveBoard(state: BoardState): void {
  if (!isAvailable()) return;
  try {
    const next = {
      ...state,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(keyFor(state.projectId), JSON.stringify(next));
  } catch {
    // Best-effort.
  }
}

export function clearBoard(projectId: string): void {
  if (!isAvailable()) return;
  try {
    window.localStorage.removeItem(keyFor(projectId));
  } catch {
    // Ignore.
  }
}

export function newNoteId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Deterministic synthesis from the current notes — no AI, no fabrication. */
export function synthesiseBoard(state: BoardState): {
  topVoted: BoardState["notes"];
  assumptions: BoardState["notes"];
  toValidate: BoardState["notes"];
  evidence: BoardState["notes"];
  questions: BoardState["notes"];
  opportunities: BoardState["notes"];
  byPersona: Record<string, BoardState["notes"]>;
} {
  const sorted = [...state.notes].sort((a, b) => b.votes - a.votes);
  const byPersona: Record<string, BoardState["notes"]> = {};
  for (const note of state.notes) {
    const key = note.personaId ?? "__unassigned__";
    (byPersona[key] ??= []).push(note);
  }
  return {
    topVoted: sorted.filter((n) => n.votes > 0).slice(0, 8),
    assumptions: state.notes.filter((n) => n.kind === "ASSUMPTION"),
    toValidate: state.notes.filter((n) => n.kind === "TO_VALIDATE"),
    evidence: state.notes.filter((n) => n.kind === "EVIDENCE"),
    questions: state.notes.filter((n) => n.kind === "QUESTION"),
    opportunities: state.notes.filter((n) => n.kind === "OPPORTUNITY"),
    byPersona,
  };
}

/** Map sticky calibration kinds onto persona statement evidence status. */
export function stickyKindToEvidenceStatus(
  kind: StickyNote["kind"],
): "ASSUMPTION" | "TO_VALIDATE" | "EVIDENCE" | null {
  if (kind === "ASSUMPTION") return "ASSUMPTION";
  if (kind === "TO_VALIDATE") return "TO_VALIDATE";
  if (kind === "EVIDENCE") return "EVIDENCE";
  return null;
}
