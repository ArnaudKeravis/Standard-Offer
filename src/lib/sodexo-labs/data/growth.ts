import type { LabsGrowth, LabsLang } from "../schemas";
import { pickLocale, type Localized } from "../i18n/pick";

const GROWTH: Localized<LabsGrowth> = {
  en: {
    headline: "More than a methodology — a growth & retention engine.",
    body: "CoDesign is embedded in major commercial cycles, converting innovation into measurable growth and protecting a €1B portfolio across renewals and new bids. 75% renewals, 25% new bids — with a +3% renewal uplift, +1.5% cross-sell and 10% margin.",
    impacts: [
      {
        title: "Co-create before contract",
        outcome:
          "Higher win rate — de-risk bids by grounding proposals in real user and operator needs.",
      },
      {
        title: "Accelerate alignment",
        outcome:
          "Shorter sales cycles — shared reading of the challenge and a common roadmap.",
      },
      {
        title: "Innovate beyond signature",
        outcome:
          "Retention & cross-sell — keep co-designing across the whole contract life.",
      },
      {
        title: "Make innovation tangible",
        outcome:
          "Premium positioning — elevate Sodexo from operator to transformation partner.",
      },
    ],
  },
  fr: {
    headline: "Plus qu'une méthodologie — un moteur de croissance & de rétention.",
    body: "CoDesign est ancré dans les grands cycles commerciaux : il convertit l'innovation en croissance mesurable et protège un portefeuille de €1B sur renouvellements et nouveaux bids. 75 % renouvellements, 25 % nouveaux bids — avec +3 % d'uplift renouvellement, +1,5 % de cross-sell et 10 % de marge.",
    impacts: [
      {
        title: "Co-créer avant le contrat",
        outcome:
          "Meilleur win rate — sécuriser les bids en ancrant les propositions dans les besoins réels des utilisateurs et opérateurs.",
      },
      {
        title: "Accélérer l'alignement",
        outcome:
          "Cycles de vente plus courts — une lecture partagée du challenge et une roadmap commune.",
      },
      {
        title: "Innover au-delà de la signature",
        outcome:
          "Rétention & cross-sell — continuer à co-designer sur toute la vie du contrat.",
      },
      {
        title: "Rendre l'innovation tangible",
        outcome:
          "Positionnement premium — faire passer Sodexo d'opérateur à partenaire de transformation.",
      },
    ],
  },
};

export function getLabsGrowth(lang: LabsLang): LabsGrowth {
  return pickLocale(GROWTH, lang);
}
