import type { LabsArea, LabsAudience, LabsLang } from "../schemas";
import { pickLocale, type Localized } from "./pick";

export type GateUi = {
  audienceEyebrow: string;
  audienceTitle: string;
  audienceLead: string;
  audienceChoices: Record<
    LabsAudience,
    { label: string; description: string }
  >;
  territoryEyebrow: string;
  territoryTitle: string;
  territoryLead: string;
  territoryChoices: Record<LabsArea, { label: string; description: string }>;
  audienceLabel: Record<LabsAudience, string>;
  areaLabel: Record<LabsArea, string>;
  langLabel: Record<LabsLang, string>;
};

const UI: Localized<GateUi> = {
  en: {
    audienceEyebrow: "Sodexo Labs",
    audienceTitle: "Who is in the room?",
    audienceLead:
      "Choose the audience for this session. You can change it later from the deck.",
    audienceChoices: {
      internal: {
        label: "Internal",
        description: "Team & commercial engine — growth framing for Sodexo.",
      },
      external: {
        label: "External",
        description: "Client co-creation — value without internal jargon.",
      },
    },
    territoryEyebrow: "Territory",
    territoryTitle: "Which world are we entering?",
    territoryLead:
      "Territory shapes the persona, proof stories, and credential defaults.",
    territoryChoices: {
      work: { label: "Work", description: "Workplace & corporate life" },
      heal: { label: "Heal", description: "Healthcare & patient journeys" },
      play: { label: "Play", description: "Sports, hospitality & events" },
      learn: { label: "Learn", description: "Campuses & student life" },
    },
    audienceLabel: { internal: "Internal", external: "External" },
    areaLabel: { work: "Work", heal: "Heal", play: "Play", learn: "Learn" },
    langLabel: { en: "EN", fr: "FR" },
  },
  fr: {
    audienceEyebrow: "Sodexo Labs",
    audienceTitle: "Qui est dans la salle ?",
    audienceLead:
      "Choisissez l'audience de cette session. Vous pourrez la changer ensuite depuis le deck.",
    audienceChoices: {
      internal: {
        label: "Interne",
        description: "Équipe & moteur commercial — framing Growth Engine Sodexo.",
      },
      external: {
        label: "Externe",
        description: "Co-création client — de la valeur sans jargon interne.",
      },
    },
    territoryEyebrow: "Territoire",
    territoryTitle: "Dans quel monde entrons-nous ?",
    territoryLead:
      "Le territoire façonne le persona, les preuves et les filtres credentials par défaut.",
    territoryChoices: {
      work: { label: "Work", description: "Workplace & vie corporate" },
      heal: { label: "Heal", description: "Santé & parcours patients" },
      play: { label: "Play", description: "Sport, hospitalité & events" },
      learn: { label: "Learn", description: "Campus & vie étudiante" },
    },
    audienceLabel: { internal: "Interne", external: "Externe" },
    areaLabel: { work: "Work", heal: "Heal", play: "Play", learn: "Learn" },
    langLabel: { en: "EN", fr: "FR" },
  },
};

export function getLabsGateUi(lang: LabsLang): GateUi {
  return pickLocale(UI, lang);
}
