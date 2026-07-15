import type { PersonaRepository } from "./types";
import { SeedRepository } from "./seed-repository";

/**
 * Returns the active repository implementation.
 *
 * Phase 1 always returns the seed repository. When Supabase env vars are
 * present (later phases) this factory will return the Supabase-backed
 * implementation instead — callers never change.
 */
let cached: PersonaRepository | null = null;

export function getRepository(): PersonaRepository {
  if (!cached) {
    cached = new SeedRepository();
  }
  return cached;
}

export type { PersonaRepository } from "./types";
