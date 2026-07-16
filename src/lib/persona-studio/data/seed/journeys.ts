import { SEED_TIMESTAMP } from "../builders";
import {
  localizeJourney,
  type JourneySource,
  type JourneyStepSource,
  type LocalizedText,
} from "../localized";
import { langFromLanguage } from "@/lib/persona-studio/utils/i18n";
import { XP_WORK_PROJECT_ID } from "./xp-work-personas";
import { XP_HEAL_PROJECT_ID } from "./xp-heal-personas";
import { XP_LEARN_PROJECT_ID } from "./xp-learn-personas";
import { XP_PLAY_PROJECT_ID } from "./xp-play-personas";

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

export const XP_WORK_JOURNEY_SOURCE: JourneySource = {
  id: "journey-xp-workday",
  projectId: XP_WORK_PROJECT_ID,
  name: { en: "A workday", fr: "Une journée de travail" },
  createdAt: SEED_TIMESTAMP,
  steps: steps([
    { slug: "Commute", title: { en: "Commute", fr: "Trajet" } },
    { slug: "Welcome Area", title: { en: "Welcome Area", fr: "Zone d'accueil" } },
    { slug: "Workplace", title: { en: "Workplace", fr: "Lieu de travail" } },
    {
      slug: "Food & Beverage Area",
      title: { en: "Food & Beverage Area", fr: "Espace restauration" },
    },
    {
      slug: "Wellbeing & Breaktime",
      title: { en: "Wellbeing & Breaktime", fr: "Bien-être & pauses" },
    },
  ]),
};

export const CORPORATE_JOURNEY_SOURCE: JourneySource = {
  id: "journey-corporate-workday",
  projectId: XP_WORK_PROJECT_ID,
  name: { en: "A day at work (Personix)", fr: "Une journée au travail (Personix)" },
  createdAt: SEED_TIMESTAMP,
  steps: steps([
    {
      slug: "Preparing for the workday",
      title: { en: "Preparing for the workday", fr: "Préparer sa journée de travail" },
    },
    { slug: "Arrival", title: { en: "Arrival", fr: "Arrivée" } },
    { slug: "Morning work", title: { en: "Morning work", fr: "Travail du matin" } },
    { slug: "Break", title: { en: "Break", fr: "Pause" } },
    { slug: "Lunch", title: { en: "Lunch", fr: "Déjeuner" } },
    {
      slug: "Afternoon work",
      title: { en: "Afternoon work", fr: "Travail de l'après-midi" },
    },
    { slug: "Collaboration", title: { en: "Collaboration", fr: "Collaboration" } },
    { slug: "Departure", title: { en: "Departure", fr: "Départ" } },
  ]),
};

export const XP_HEAL_JOURNEY_SOURCE: JourneySource = {
  id: "journey-xp-heal-care-day",
  projectId: XP_HEAL_PROJECT_ID,
  name: { en: "A care-site day", fr: "Une journée en site de soin" },
  createdAt: SEED_TIMESTAMP,
  steps: steps([
    { slug: "Arrival", title: { en: "Arrival", fr: "Arrivée" } },
    {
      slug: "Welcome & Admission",
      title: { en: "Welcome & Admission", fr: "Accueil & admission" },
    },
    {
      slug: "Care & Treatment",
      title: { en: "Care & Treatment", fr: "Soins & traitement" },
    },
    {
      slug: "Food & Nutrition",
      title: { en: "Food & Nutrition", fr: "Alimentation & nutrition" },
    },
    {
      slug: "Discharge or Stay",
      title: { en: "Discharge or Stay", fr: "Sortie ou séjour" },
    },
  ]),
};

export const XP_LEARN_JOURNEY_SOURCE: JourneySource = {
  id: "journey-xp-learn-campus-day",
  projectId: XP_LEARN_PROJECT_ID,
  name: { en: "A campus / school day", fr: "Une journée campus / école" },
  createdAt: SEED_TIMESTAMP,
  steps: steps([
    { slug: "Arrival", title: { en: "Arrival", fr: "Arrivée" } },
    { slug: "Welcome", title: { en: "Welcome", fr: "Accueil" } },
    {
      slug: "Learning spaces",
      title: { en: "Learning spaces", fr: "Espaces d'apprentissage" },
    },
    { slug: "Food & Beverage", title: { en: "Food & Beverage", fr: "Restauration" } },
    {
      slug: "Social & Wellbeing",
      title: { en: "Social & Wellbeing", fr: "Social & bien-être" },
    },
  ]),
};

export const XP_PLAY_JOURNEY_SOURCE: JourneySource = {
  id: "journey-xp-play-event-day",
  projectId: XP_PLAY_PROJECT_ID,
  name: { en: "An event day", fr: "Une journée d'événement" },
  createdAt: SEED_TIMESTAMP,
  steps: steps([
    { slug: "Pre-event", title: { en: "Pre-event", fr: "Avant l'événement" } },
    {
      slug: "Arrival & Entry",
      title: { en: "Arrival & Entry", fr: "Arrivée & entrée" },
    },
    {
      slug: "Hospitality & Concessions",
      title: { en: "Hospitality & Concessions", fr: "Hospitalité & concessions" },
    },
    { slug: "Event moment", title: { en: "Event moment", fr: "Moment de l'événement" } },
    { slug: "Departure", title: { en: "Departure", fr: "Départ" } },
  ]),
};

export const TDF_JOURNEY_SOURCE: JourneySource = {
  id: "journey-tdf-stage-day",
  projectId: XP_PLAY_PROJECT_ID,
  name: { fr: "Journée d'étape du Tour de France", en: "Tour de France stage day" },
  createdAt: SEED_TIMESTAMP,
  steps: steps([
    { slug: "Invitation", title: { fr: "Invitation", en: "Invitation" } },
    { slug: "Préparation", title: { fr: "Préparation", en: "Preparation" } },
    { slug: "Arrivée", title: { fr: "Arrivée", en: "Arrival" } },
    { slug: "Accréditation", title: { fr: "Accréditation", en: "Accreditation" } },
    {
      slug: "Accueil hospitalité",
      title: { fr: "Accueil hospitalité", en: "Hospitality welcome" },
    },
    { slug: "Avant-course", title: { fr: "Avant-course", en: "Pre-race" } },
    { slug: "Restauration", title: { fr: "Restauration", en: "Catering" } },
    {
      slug: "Vision de la course",
      title: { fr: "Vision de la course", en: "Watching the race" },
    },
    {
      slug: "Attente entre les moments",
      title: { fr: "Attente entre les moments", en: "Waiting between moments" },
    },
    { slug: "Départ", title: { fr: "Départ", en: "Departure" } },
    { slug: "Suivi", title: { fr: "Suivi", en: "Follow-up" } },
  ]),
};

/** Bilingual authoring sources (fed to the repository, resolved per request). */
export const SEED_JOURNEY_SOURCES: JourneySource[] = [
  XP_WORK_JOURNEY_SOURCE,
  CORPORATE_JOURNEY_SOURCE,
  XP_HEAL_JOURNEY_SOURCE,
  XP_LEARN_JOURNEY_SOURCE,
  XP_PLAY_JOURNEY_SOURCE,
  TDF_JOURNEY_SOURCE,
];

/** Resolved to each project's default language for direct consumers. */
export const SEED_JOURNEYS = SEED_JOURNEY_SOURCES.map((j) =>
  localizeJourney(j, langFromLanguage("English")),
);
