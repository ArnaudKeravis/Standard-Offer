import type { User } from "@/lib/persona-studio/ai/schemas/project";
import { getRepository } from "@/lib/persona-studio/repository";

/**
 * Mock authentication for Phase 1.
 *
 * Real auth (Supabase + RLS) arrives in a later phase. This module gives the
 * rest of the app a stable `getSessionUser()` contract so nothing has to change
 * when real auth lands. It always resolves to the seeded facilitator.
 */
export async function getSessionUser(): Promise<User> {
  return getRepository().getCurrentUser();
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
