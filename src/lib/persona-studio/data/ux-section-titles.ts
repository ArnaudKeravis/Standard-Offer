/**
 * Homogeneous UX section titles for Persona Studio sheets.
 * One voice across XP, Personix (Corporate) and TdF — keys stay stable.
 */
export const UX_SECTION_TITLES = {
  essence: { en: "Who I am", fr: "Qui je suis" },
  context: { en: "My context", fr: "Mon contexte" },
  lifestyle: { en: "How I live the day", fr: "Comment je vis ma journée" },
  goals: { en: "What I'm aiming for", fr: "Ce que je vise" },
  needs: { en: "What I need", fr: "Ce dont j'ai besoin" },
  motivations: { en: "What drives me", fr: "Ce qui me motive" },
  frustrations: { en: "What frustrates me", fr: "Ce qui me frustre" },
  questions_to_validate: {
    en: "Still to validate with people",
    fr: "Encore à valider avec les gens",
  },
  daily_job: {
    en: "How my work day runs",
    fr: "Comment se déroule ma journée de travail",
  },
  workplace_expectations: {
    en: "What I expect from the workplace",
    fr: "Ce que j'attends du lieu de travail",
  },
  food_expectations: {
    en: "What I expect from food",
    fr: "Ce que j'attends de la restauration",
  },
  key_eating_moments: {
    en: "Eating moments that shape my day",
    fr: "Les moments de repas qui rythment ma journée",
  },
  must_have: {
    en: "What I can't do without",
    fr: "Ce dont je ne peux me passer",
  },
  reasons_for_attending: {
    en: "Why I'm here",
    fr: "Pourquoi je suis là",
  },
  key_expectations: {
    en: "What I need from the experience",
    fr: "Ce dont j'ai besoin dans l'expérience",
  },
  food_hospitality: {
    en: "What I expect from food & hospitality",
    fr: "Ce que j'attends de la restauration & hospitalité",
  },
  fb_expectations: {
    en: "What I expect from F&B",
    fr: "Ce que j'attends du F&B",
  },
  ideal_experience: {
    en: "The experience I hope for",
    fr: "L'expérience que j'espère",
  },
  moments: {
    en: "Moments that shape my day",
    fr: "Les moments qui rythment ma journée",
  },
} as const;

export type UxSectionTitleKey = keyof typeof UX_SECTION_TITLES;
