import { SEED_TIMESTAMP } from "../builders";
import {
  localizeJourney,
  type JourneySource,
  type JourneyStepSource,
  type LocalizedText,
} from "../localized";
import { langFromLanguage } from "@/lib/persona-studio/utils/i18n";
import { TDF_PROJECT_ID } from "./tdf-personas";
import { CORPORATE_PROJECT_ID } from "./corporate-personas";

/**
 * Journey step ids/keys are derived from the ORIGINAL-language slug so they stay
 * stable regardless of the display language; only `title` is localised.
 */
function steps(items: { slug: string; title: LocalizedText }[]): JourneyStepSource[] {
  return items.map(({ slug, title }, order) => ({
    id: `${order}-${slug.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    key: slug.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
    title,
    order,
  }));
}

export const TDF_JOURNEY_SOURCE: JourneySource = {
  id: "journey-tdf-stage-day",
  projectId: TDF_PROJECT_ID,
  name: { fr: "Journée d'étape du Tour de France", en: "Tour de France stage day" },
  createdAt: SEED_TIMESTAMP,
  steps: steps([
    { slug: "Invitation", title: { fr: "Invitation", en: "Invitation" } },
    { slug: "Préparation", title: { fr: "Préparation", en: "Preparation" } },
    { slug: "Arrivée", title: { fr: "Arrivée", en: "Arrival" } },
    { slug: "Accréditation", title: { fr: "Accréditation", en: "Accreditation" } },
    { slug: "Accueil hospitalité", title: { fr: "Accueil hospitalité", en: "Hospitality welcome" } },
    { slug: "Avant-course", title: { fr: "Avant-course", en: "Pre-race" } },
    { slug: "Restauration", title: { fr: "Restauration", en: "Catering" } },
    { slug: "Vision de la course", title: { fr: "Vision de la course", en: "Watching the race" } },
    { slug: "Attente entre les moments", title: { fr: "Attente entre les moments", en: "Waiting between moments" } },
    { slug: "Départ", title: { fr: "Départ", en: "Departure" } },
    { slug: "Suivi", title: { fr: "Suivi", en: "Follow-up" } },
  ]),
};

export const CORPORATE_JOURNEY_SOURCE: JourneySource = {
  id: "journey-corporate-workday",
  projectId: CORPORATE_PROJECT_ID,
  name: { en: "A day at work", fr: "Une journée au travail" },
  createdAt: SEED_TIMESTAMP,
  steps: steps([
    { slug: "Preparing for the workday", title: { en: "Preparing for the workday", fr: "Préparer sa journée de travail" } },
    { slug: "Arrival", title: { en: "Arrival", fr: "Arrivée" } },
    { slug: "Morning work", title: { en: "Morning work", fr: "Travail du matin" } },
    { slug: "Break", title: { en: "Break", fr: "Pause" } },
    { slug: "Lunch", title: { en: "Lunch", fr: "Déjeuner" } },
    { slug: "Afternoon work", title: { en: "Afternoon work", fr: "Travail de l'après-midi" } },
    { slug: "Collaboration", title: { en: "Collaboration", fr: "Collaboration" } },
    { slug: "Departure", title: { en: "Departure", fr: "Départ" } },
  ]),
};

/** Bilingual authoring sources (fed to the repository, resolved per request). */
export const SEED_JOURNEY_SOURCES: JourneySource[] = [
  TDF_JOURNEY_SOURCE,
  CORPORATE_JOURNEY_SOURCE,
];

/** Resolved to each project's default language for direct consumers. */
export const SEED_JOURNEYS = [
  localizeJourney(TDF_JOURNEY_SOURCE, langFromLanguage("Français")),
  localizeJourney(CORPORATE_JOURNEY_SOURCE, langFromLanguage("English")),
];
