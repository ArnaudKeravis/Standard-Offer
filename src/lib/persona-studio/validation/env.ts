import { z } from "zod";

/**
 * Environment variable validation for Persona Studio.
 *
 * Everything is optional in Phase 1 (the product runs fully on seed data with
 * mock auth). As later phases add Supabase and OpenAI, these become required in
 * the relevant server code paths — but secrets are only ever read server-side
 * and never exposed to the browser.
 */
const envSchema = z.object({
  // Server-only secrets (never prefixed with NEXT_PUBLIC_).
  OPENAI_API_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  /** When set, create/edit/sources require facilitator unlock. */
  PERSONA_STUDIO_ACCESS_SECRET: z.string().min(1).optional(),

  // Public, browser-safe values.
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
});

export type PersonaStudioEnv = z.infer<typeof envSchema>;

let parsed: PersonaStudioEnv | null = null;

export function getEnv(): PersonaStudioEnv {
  if (!parsed) {
    parsed = envSchema.parse({
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      PERSONA_STUDIO_ACCESS_SECRET: process.env.PERSONA_STUDIO_ACCESS_SECRET,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });
  }
  return parsed;
}
