import type { LabsAudience, LabsLang } from "../schemas";
import { pickLocale, type Localized } from "../i18n/pick";

type LabsCopy = {
  coverSubtitle: string;
  welcomeHeadline: string;
  welcomeBody: string;
  methodNote?: string;
  closeHeadline: string;
  closeCta: string;
};

const EXTERNAL: Localized<LabsCopy> = {
  en: {
    coverSubtitle: "Co-create the experiences your people deserve",
    welcomeHeadline: "Welcome to Sodexo Labs",
    welcomeBody:
      "A living space where we explore the future of workplace, care, campus and hospitality experiences — together with you.",
    closeHeadline: "Let's co-create your next experience",
    closeCta: "Book a Labs session with our team",
  },
  fr: {
    coverSubtitle: "Co-créez les expériences que vos communautés méritent",
    welcomeHeadline: "Bienvenue à Sodexo Labs",
    welcomeBody:
      "Un espace vivant où nous explorons l'avenir des expériences workplace, care, campus et hospitalité — avec vous.",
    closeHeadline: "Co-créons votre prochaine expérience",
    closeCta: "Réservez une session Labs avec notre équipe",
  },
};

const INTERNAL: Localized<LabsCopy> = {
  en: {
    coverSubtitle: "The Growth Engine in action",
    welcomeHeadline: "Welcome to Sodexo Labs",
    welcomeBody:
      "Our commercial co-creation engine — a space to win bids, accelerate renewals and make innovation tangible for clients.",
    methodNote:
      "Every Labs session connects to the CoDesign four-offer model and Growth Engine KPIs. Use it in pre-bid, renewal and account expansion cycles.",
    closeHeadline: "Mobilise Labs in your next bid or renewal",
    closeCta: "Talk to the CoDesign team about your account",
  },
  fr: {
    coverSubtitle: "Le Growth Engine en action",
    welcomeHeadline: "Bienvenue à Sodexo Labs",
    welcomeBody:
      "Notre moteur commercial de co-création — un espace pour gagner des appels d'offres, accélérer les renouvellements et rendre l'innovation tangible pour les clients.",
    methodNote:
      "Chaque session Labs se relie au modèle à quatre offres CoDesign et aux KPIs du Growth Engine. À mobiliser en pré-bid, renouvellement et expansion de compte.",
    closeHeadline: "Mobilisez Labs sur votre prochain bid ou renouvellement",
    closeCta: "Parlez à l'équipe CoDesign de votre compte",
  },
};

export function getLabsCopy(
  audience: LabsAudience,
  lang: LabsLang,
): LabsCopy {
  return pickLocale(audience === "internal" ? INTERNAL : EXTERNAL, lang);
}
