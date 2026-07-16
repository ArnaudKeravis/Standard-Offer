"use server";

import { cookies } from "next/headers";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";
import { STUDIO_LANG_COOKIE } from "@/lib/persona-studio/utils/lang-cookie";

/**
 * Persist the user's explicit FR/EN choice.
 *
 * The client toggle calls this, then triggers `router.refresh()` so every
 * Server Component re-renders with the new language. The cookie is read back in
 * Server Components via {@link getLangPreference}.
 */
export async function setStudioLanguage(lang: StudioLang): Promise<void> {
  if (lang !== "en" && lang !== "fr") return;
  const store = await cookies();
  store.set(STUDIO_LANG_COOKIE, lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
