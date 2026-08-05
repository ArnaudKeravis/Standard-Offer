import type { LabsLang, LabsOffer } from "../schemas";
import { pickLocale, type Localized } from "../i18n/pick";

const OFFERS: Localized<LabsOffer[]> = {
  en: [
    {
      id: "envision-strategize",
      title: "Envision & Strategize",
      summary:
        "Plan the next food and FM services, align leadership and set a strategic roadmap that exceeds expectations.",
      whenLabel: "Early in the relationship or before a major transformation",
      internalExtra:
        "Anchor the Growth Engine at bid stage — use Labs to co-create the vision clients will renew on.",
    },
    {
      id: "grow-account",
      title: "Grow the Account",
      summary:
        "Co-design across the client lifecycle to protect renewals, de-risk rebids and unlock cross-sell.",
      whenLabel: "Renewals, rebids and account expansion moments",
      internalExtra:
        "Shorten commercial cycles by bringing tangible co-creation into account reviews and renewal conversations.",
    },
    {
      id: "design-experiences",
      title: "Design Experiences",
      summary:
        "Define or upgrade the consumer and employee on-site experience to reflect client ambition.",
      whenLabel: "When the on-site experience must differentiate the offer",
      internalExtra:
        "Connect CoDesign deliverables to Growth Engine KPIs — experience proof that supports premium positioning.",
    },
    {
      id: "optimize-ops-carbon",
      title: "Optimize Ops & Carbon",
      summary:
        "Improve existing processes and solutions to be more efficient, impactful and sustainable.",
      whenLabel: "Operational excellence and sustainability programmes",
      internalExtra:
        "Use Labs Garage outputs to feed innovation roadmaps and measurable carbon reduction narratives.",
    },
  ],
  fr: [
    {
      id: "envision-strategize",
      title: "Envision & Strategize",
      summary:
        "Planifier les prochains services food & FM, aligner le leadership et définir une feuille de route stratégique qui dépasse les attentes.",
      whenLabel: "En début de relation ou avant une transformation majeure",
      internalExtra:
        "Ancrez le Growth Engine dès le bid — utilisez Labs pour co-créer la vision sur laquelle les clients renouvelleront.",
    },
    {
      id: "grow-account",
      title: "Grow the Account",
      summary:
        "Co-designer sur tout le cycle de vie client pour protéger les renouvellements, sécuriser les rebids et ouvrir le cross-sell.",
      whenLabel: "Renouvellements, rebids et moments d'expansion de compte",
      internalExtra:
        "Raccourcissez les cycles commerciaux en apportant une co-création tangible dans les reviews et conversations de renouvellement.",
    },
    {
      id: "design-experiences",
      title: "Design Experiences",
      summary:
        "Définir ou faire évoluer l'expérience on-site des consommateurs et des collaborateurs pour refléter l'ambition du client.",
      whenLabel: "Quand l'expérience on-site doit différencier l'offre",
      internalExtra:
        "Reliez les livrables CoDesign aux KPIs du Growth Engine — des preuves d'expérience qui soutiennent le positionnement premium.",
    },
    {
      id: "optimize-ops-carbon",
      title: "Optimize Ops & Carbon",
      summary:
        "Améliorer les process et solutions existants pour plus d'efficacité, d'impact et de sobriété.",
      whenLabel: "Excellence opérationnelle et programmes de durabilité",
      internalExtra:
        "Utilisez les sorties du Garage Labs pour nourrir les roadmaps d'innovation et les narratifs carbone mesurables.",
    },
  ],
};

export function getLabsOffers(lang: LabsLang): LabsOffer[] {
  return pickLocale(OFFERS, lang);
}
