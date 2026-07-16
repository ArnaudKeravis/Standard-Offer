import { describe, expect, it } from "vitest";
import { SEED_DATA } from "@/lib/persona-studio/data/seed";
import {
  localizeJourney,
  localizePersona,
  localizeProject,
  localizeSource,
  resolveText,
  type LocalizedText,
} from "@/lib/persona-studio/data/localized";
import type { StudioLang } from "@/lib/persona-studio/utils/i18n";

const LANGS: StudioLang[] = ["en", "fr"];

describe("resolveText", () => {
  it("returns a plain string unchanged for either language", () => {
    expect(resolveText("Hello", "en")).toBe("Hello");
    expect(resolveText("Bonjour", "fr")).toBe("Bonjour");
  });

  it("picks the matching language from a bilingual value", () => {
    const value: LocalizedText = { en: "Waiting time", fr: "Temps d'attente" };
    expect(resolveText(value, "en")).toBe("Waiting time");
    expect(resolveText(value, "fr")).toBe("Temps d'attente");
  });
});

/** Every user-visible string on a resolved object must be non-empty. */
function assertNonEmpty(label: string, value: string | undefined) {
  if (value === undefined) return;
  expect(value.trim().length, `${label} is empty`).toBeGreaterThan(0);
}

describe("Bilingual seed resolution", () => {
  it("resolves every persona fully in both languages with no empty strings", () => {
    for (const lang of LANGS) {
      for (const source of SEED_DATA.personas) {
        const p = localizePersona(source, lang);
        assertNonEmpty(`${p.id}.name`, p.name);
        assertNonEmpty(`${p.id}.archetype`, p.archetype);
        assertNonEmpty(`${p.id}.category`, p.category);
        assertNonEmpty(`${p.id}.oneLineEssence`, p.oneLineEssence);
        assertNonEmpty(`${p.id}.quote`, p.quote);
        assertNonEmpty(`${p.id}.confidenceExplanation`, p.confidenceExplanation);
        assertNonEmpty(`${p.id}.segment`, p.segment);
        for (const tag of p.behaviouralTags) assertNonEmpty(`${p.id}.tag`, tag);
        assertNonEmpty(
          `${p.id}.relevanceNote`,
          p.demographicContext.relevanceNote,
        );
        assertNonEmpty(`${p.id}.location`, p.demographicContext.location);
        for (const section of [...p.commonSections, ...p.domainSections]) {
          assertNonEmpty(`${p.id}.${section.key}.title`, section.title);
          for (const st of section.statements) {
            assertNonEmpty(`${p.id}.${section.key}.statement`, st.content);
          }
        }
      }
    }
  });

  it("resolves projects, sources and journeys fully in both languages", () => {
    for (const lang of LANGS) {
      for (const source of SEED_DATA.projects) {
        const p = localizeProject(source, lang);
        assertNonEmpty(`${p.id}.name`, p.name);
        assertNonEmpty(`${p.id}.description`, p.description);
        assertNonEmpty(`${p.id}.segment`, p.segment);
        for (const a of p.audience) assertNonEmpty(`${p.id}.audience`, a);
        assertNonEmpty(`${p.id}.workshopObjective`, p.workshopObjective);
      }
      for (const source of SEED_DATA.sources) {
        assertNonEmpty(`${source.id}.name`, localizeSource(source, lang).name);
      }
      for (const source of SEED_DATA.journeys) {
        const j = localizeJourney(source, lang);
        assertNonEmpty(`${j.id}.name`, j.name);
        for (const step of j.steps) assertNonEmpty(`${j.id}.step`, step.title);
      }
    }
  });

  it("actually differs between languages for bilingual persona content", () => {
    // At least one persona quote must be genuinely translated (not identical).
    const differs = SEED_DATA.personas.some(
      (p) =>
        localizePersona(p, "en").quote !== localizePersona(p, "fr").quote,
    );
    expect(differs).toBe(true);
  });
});
