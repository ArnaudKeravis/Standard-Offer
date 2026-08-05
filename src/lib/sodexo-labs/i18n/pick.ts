import type { LabsLang } from "../schemas";

export type Localized<T> = Record<LabsLang, T>;

export function pickLocale<T>(table: Localized<T>, lang: LabsLang): T {
  return table[lang] ?? table.en;
}
