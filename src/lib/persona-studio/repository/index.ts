import type { PersonaRepository, WritablePersonaRepository } from "./types";
import { MemoryRepository } from "./memory-repository";

/**
 * Returns the active repository implementation.
 *
 * Phase 2 uses an in-memory, writable repository seeded from the seed dataset
 * (deep-cloned, so the seed is never mutated). When Supabase env vars are
 * present (Phase 5) this factory returns the Supabase-backed implementation
 * instead — callers never change.
 *
 * The instance is cached on `globalThis` so that state survives module
 * re-evaluation during Next.js dev HMR (otherwise every edit would reset it).
 */
const GLOBAL_KEY = "__personaStudioRepository__" as const;

type GlobalWithRepo = typeof globalThis & {
  [GLOBAL_KEY]?: WritablePersonaRepository;
};

function instance(): WritablePersonaRepository {
  const g = globalThis as GlobalWithRepo;
  if (!g[GLOBAL_KEY]) {
    g[GLOBAL_KEY] = new MemoryRepository();
  }
  return g[GLOBAL_KEY];
}

/** Read-only view of the repository (server components, most call sites). */
export function getRepository(): PersonaRepository {
  return instance();
}

/** Write-capable view of the repository (server actions only). */
export function getWritableRepository(): WritablePersonaRepository {
  return instance();
}

export type { PersonaRepository, WritablePersonaRepository } from "./types";
