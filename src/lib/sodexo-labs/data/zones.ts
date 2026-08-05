import type { LabsLang, LabsZone } from "../schemas";
import { pickLocale, type Localized } from "../i18n/pick";

const ZONES: Localized<LabsZone[]> = {
  en: [
    {
      id: "theatre",
      name: "Theatre",
      verbs: ["Present", "Inspire", "Showcase"],
      accent: "#1E2F9A",
    },
    {
      id: "immersion",
      name: "Immersion",
      verbs: ["Feel", "Walk", "Experience"],
      accent: "#2BB8B0",
    },
    {
      id: "hub",
      name: "Hub",
      verbs: ["Connect", "Co-create", "Align"],
      accent: "#6D28D9",
    },
    {
      id: "garage",
      name: "Garage",
      verbs: ["Prototype", "Test", "Build"],
      accent: "#F97316",
    },
  ],
  fr: [
    {
      id: "theatre",
      name: "Theatre",
      verbs: ["Présenter", "Inspirer", "Montrer"],
      accent: "#1E2F9A",
    },
    {
      id: "immersion",
      name: "Immersion",
      verbs: ["Ressentir", "Parcourir", "Expérimenter"],
      accent: "#2BB8B0",
    },
    {
      id: "hub",
      name: "Hub",
      verbs: ["Connecter", "Co-créer", "Aligner"],
      accent: "#6D28D9",
    },
    {
      id: "garage",
      name: "Garage",
      verbs: ["Prototype", "Tester", "Construire"],
      accent: "#F97316",
    },
  ],
};

export function getLabsZones(lang: LabsLang): LabsZone[] {
  return pickLocale(ZONES, lang);
}
