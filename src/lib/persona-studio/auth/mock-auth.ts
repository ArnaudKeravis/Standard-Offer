/**
 * Session helpers for Persona Studio.
 *
 * Soft write-gate lives in `./access`. Real Supabase Auth + RLS arrives later;
 * this module keeps a stable `getSessionUser()` contract for the app.
 */

export {
  getSessionUser,
  canWriteStudio,
  hasWriteAccess,
  requireWriteAccess,
  isWriteGateEnabled,
  WriteAccessDeniedError,
} from "./access";

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
