import type { LabsEngagement, LabsLang } from "../schemas";
import { pickLocale, type Localized } from "../i18n/pick";

const ENGAGEMENTS: Localized<LabsEngagement[]> = {
  en: [
    {
      id: "one-shot",
      name: "One-Shot Workshop",
      duration: "1 week",
      framing: "Time-to-value",
      summary:
        "Facilitated workshop + synthesis, proto-persona & proto-journey — a fast shared start.",
      investment: "No recharge",
    },
    {
      id: "light",
      name: "Light Engagement",
      duration: "2 weeks",
      framing: "Time-to-value",
      summary:
        "Light research, service playbook, experience roadmap & concept sheets.",
      investment: "Availability-based",
    },
    {
      id: "medium",
      name: "Medium Engagement",
      duration: "4–8 weeks",
      framing: "Experience quality",
      summary:
        "Personas, journeys, concept sheets, opportunity maps & recommendations.",
      investment: "€5–10K account investment",
    },
    {
      id: "premium",
      name: "Premium Engagement",
      duration: "8–12 weeks",
      framing: "Retention & upsell",
      summary:
        "Full report, impact map, D&AI experience roadmap & value proposition.",
      investment: "€15–20K account investment",
    },
  ],
  fr: [
    {
      id: "one-shot",
      name: "One-Shot Workshop",
      duration: "1 semaine",
      framing: "Time-to-value",
      summary:
        "Atelier facilité + synthèse, proto-persona & proto-parcours — un démarrage partagé rapide.",
      investment: "Sans recharge",
    },
    {
      id: "light",
      name: "Light Engagement",
      duration: "2 semaines",
      framing: "Time-to-value",
      summary:
        "Recherche légère, playbook de service, roadmap d'expérience & concept sheets.",
      investment: "Selon disponibilité",
    },
    {
      id: "medium",
      name: "Medium Engagement",
      duration: "4–8 semaines",
      framing: "Qualité d'expérience",
      summary:
        "Personas, parcours, concept sheets, cartes d'opportunités & recommandations.",
      investment: "Investissement compte €5–10K",
    },
    {
      id: "premium",
      name: "Premium Engagement",
      duration: "8–12 semaines",
      framing: "Rétention & upsell",
      summary:
        "Rapport complet, impact map, roadmap d'expérience D&AI & proposition de valeur.",
      investment: "Investissement compte €15–20K",
    },
  ],
};

export function getLabsEngagements(lang: LabsLang): LabsEngagement[] {
  return pickLocale(ENGAGEMENTS, lang);
}
