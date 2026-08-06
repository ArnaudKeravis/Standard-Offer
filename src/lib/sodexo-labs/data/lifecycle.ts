import type { LabsLang, LabsLifecycleStage } from "../schemas";
import { pickLocale, type Localized } from "../i18n/pick";

const LIFECYCLE: Localized<LabsLifecycleStage[]> = {
  en: [
    {
      id: "bid",
      year: "Year -1 · New bid",
      claim: "We understand your needs precisely",
      phase: "Prospection",
      items: [
        "User & stakeholder research",
        "Journey mapping (as-is / to-be)",
        "Experience & service concepts",
        "Innovation vision for the bid",
      ],
      accent: "#2BB8B0",
      accentSoft: "#E6FAF7",
    },
    {
      id: "mobilisation",
      year: "Year 1 · Mobilisation",
      claim: "We do the basics brilliantly",
      phase: "Contract mobilisation",
      items: [
        "Discovery & prioritisation",
        "Service & experience blueprints",
        "Digital & data readiness",
        "MVP for priority innovations",
      ],
      accent: "#1968FF",
      accentSoft: "#EBF1FE",
    },
    {
      id: "execution",
      year: "Year 2+ · Execution",
      claim: "We are innovative and we deliver",
      phase: "Management & innovation",
      items: [
        "Yearly innovation review / QBR",
        "Co-design of new services",
        "Sodexo Labs journeys",
        "Learning expeditions",
      ],
      accent: "#1E2F9A",
      accentSoft: "#E8ECF8",
    },
    {
      id: "retention",
      year: "Year 3, 4, 5+ · Retention",
      claim: "We are your strategic partner",
      phase: "Contract retention",
      items: [
        "Long-term experience roadmap",
        "Advanced user & operator research",
        "Innovation Days & executive storytelling",
        "Rebid preparation, early",
      ],
      accent: "#0B1020",
      accentSoft: "#E8ECF0",
    },
  ],
  fr: [
    {
      id: "bid",
      year: "Année -1 · Nouvel appel d'offres",
      claim: "Nous comprenons précisément vos besoins",
      phase: "Prospection",
      items: [
        "Recherche utilisateurs & parties prenantes",
        "Cartographie des parcours (as-is / to-be)",
        "Concepts d'expérience & de service",
        "Vision d'innovation pour le bid",
      ],
      accent: "#2BB8B0",
      accentSoft: "#E6FAF7",
    },
    {
      id: "mobilisation",
      year: "Année 1 · Mobilisation",
      claim: "Nous excellons sur les fondamentaux",
      phase: "Mobilisation du contrat",
      items: [
        "Discovery & priorisation",
        "Blueprints de service & d'expérience",
        "Préparation digitale & data",
        "MVP sur les innovations prioritaires",
      ],
      accent: "#1968FF",
      accentSoft: "#EBF1FE",
    },
    {
      id: "execution",
      year: "Année 2+ · Exécution",
      claim: "Nous innovons et nous délivrons",
      phase: "Management & innovation",
      items: [
        "Revue d'innovation annuelle / QBR",
        "Co-design de nouveaux services",
        "Parcours Sodexo Labs",
        "Learning expeditions",
      ],
      accent: "#1E2F9A",
      accentSoft: "#E8ECF8",
    },
    {
      id: "retention",
      year: "Années 3, 4, 5+ · Rétention",
      claim: "Nous sommes votre partenaire stratégique",
      phase: "Rétention du contrat",
      items: [
        "Roadmap d'expérience long terme",
        "Recherche avancée utilisateurs & opérateurs",
        "Innovation Days & storytelling exécutif",
        "Préparation anticipée du rebid",
      ],
      accent: "#0B1020",
      accentSoft: "#E8ECF0",
    },
  ],
};

export function getLabsLifecycle(lang: LabsLang): LabsLifecycleStage[] {
  return pickLocale(LIFECYCLE, lang);
}
