import type { LabsLang, LabsMethodPhase } from "../schemas";
import { pickLocale, type Localized } from "../i18n/pick";

const PHASES: Localized<LabsMethodPhase[]> = {
  en: [
    {
      id: "discover",
      flag: "01 · Divergent",
      label: "Discover",
      body: "Understand market context, user experiences and data to create meaningful insights.",
      color: "#2BB8B0",
    },
    {
      id: "define",
      flag: "02 · Convergent",
      label: "Define",
      body: "Define the best experience possible, based on unique learnings from your objectives.",
      color: "#1968FF",
    },
    {
      id: "co-create",
      flag: "03 · Divergent",
      label: "Co-Create",
      body: "Co-create with your teams the best experiences and identify areas of opportunity to innovate.",
      color: "#1E2F9A",
    },
    {
      id: "test-deliver",
      flag: "04 · Convergent",
      label: "Test & Deliver",
      body: "Bring solutions to life with a test-and-learn approach, scaling for long-term value.",
      color: "#0B1020",
    },
  ],
  fr: [
    {
      id: "discover",
      flag: "01 · Divergent",
      label: "Discover",
      body: "Comprendre le contexte marché, les expériences utilisateurs et les données pour produire des insights utiles.",
      color: "#2BB8B0",
    },
    {
      id: "define",
      flag: "02 · Convergent",
      label: "Define",
      body: "Définir la meilleure expérience possible, à partir des apprentissages liés à vos objectifs.",
      color: "#1968FF",
    },
    {
      id: "co-create",
      flag: "03 · Divergent",
      label: "Co-Create",
      body: "Co-créer avec vos équipes les meilleures expériences et identifier les opportunités d'innovation.",
      color: "#1E2F9A",
    },
    {
      id: "test-deliver",
      flag: "04 · Convergent",
      label: "Test & Deliver",
      body: "Donner vie aux solutions avec une approche test-and-learn, pour scaler la valeur dans la durée.",
      color: "#0B1020",
    },
  ],
};

export function getLabsMethodPhases(lang: LabsLang): LabsMethodPhase[] {
  return pickLocale(PHASES, lang);
}
