import { cookies } from "next/headers";
import { langFromLanguage, type StudioLang } from "./i18n";

/** Cookie that persists the user's explicit FR/EN choice across requests. */
export const STUDIO_LANG_COOKIE = "studio-lang";

function isStudioLang(value: string | undefined): value is StudioLang {
  return value === "en" || value === "fr";
}

/**
 * The user's explicit language choice, if any.
 *
 * Returns `undefined` when the user has never toggled — callers then fall back
 * to the project's own default language, so each project reads in its authored
 * language until the user opts into a global override.
 *
 * Server Components / Server Actions only (reads `cookies()` from
 * `next/headers`).
 */
export async function getLangPreference(): Promise<StudioLang | undefined> {
  const store = await cookies();
  const value = store.get(STUDIO_LANG_COOKIE)?.value;
  return isStudioLang(value) ? value : undefined;
}

/**
 * Resolve the effective display language: the user's explicit choice if set,
 * otherwise the supplied project language (or English when neither is known).
 */
export async function resolveLang(
  projectLanguage?: string,
): Promise<StudioLang> {
  const preference = await getLangPreference();
  return preference ?? langFromLanguage(projectLanguage);
}
