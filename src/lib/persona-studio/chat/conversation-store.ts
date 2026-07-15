"use client";

import type { PersonaChatResponse } from "@/lib/persona-studio/ai/schemas/chat";

/**
 * Phase 3 conversation persistence — my own, self-contained client store.
 *
 * Deliberately independent of any Phase 2 persistence: it keeps each persona's
 * chat in the browser's localStorage, keyed by persona id, so a facilitator can
 * leave and return to a conversation during a session. It is intentionally
 * simple (no external state library) and degrades gracefully when storage is
 * unavailable (SSR, private mode).
 */

export interface StoredUserMessage {
  id: string;
  role: "user";
  content: string;
  createdAt: string;
}

export interface StoredPersonaMessage {
  id: string;
  role: "persona";
  content: string;
  response: PersonaChatResponse;
  isMock: boolean;
  createdAt: string;
}

export type StoredMessage = StoredUserMessage | StoredPersonaMessage;

export interface StoredConversation {
  personaId: string;
  projectId: string;
  scenario: string;
  messages: StoredMessage[];
  updatedAt: string;
}

const KEY_PREFIX = "persona-studio:chat:v1:";

function keyFor(personaId: string): string {
  return `${KEY_PREFIX}${personaId}`;
}

function isAvailable(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

export function loadConversation(
  projectId: string,
  personaId: string,
): StoredConversation {
  const empty: StoredConversation = {
    personaId,
    projectId,
    scenario: "",
    messages: [],
    updatedAt: new Date().toISOString(),
  };
  if (!isAvailable()) return empty;
  try {
    const raw = window.localStorage.getItem(keyFor(personaId));
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as StoredConversation;
    if (parsed.projectId !== projectId) return empty;
    return { ...empty, ...parsed, messages: parsed.messages ?? [] };
  } catch {
    return empty;
  }
}

export function saveConversation(conversation: StoredConversation): void {
  if (!isAvailable()) return;
  try {
    window.localStorage.setItem(
      keyFor(conversation.personaId),
      JSON.stringify({ ...conversation, updatedAt: new Date().toISOString() }),
    );
  } catch {
    // Ignore quota / availability errors — persistence is best-effort.
  }
}

export function clearConversation(personaId: string): void {
  if (!isAvailable()) return;
  try {
    window.localStorage.removeItem(keyFor(personaId));
  } catch {
    // Ignore.
  }
}

/** Small id helper that works without external deps. */
export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
