import type { LabsKpi, LabsLang } from "../schemas";
import { pickLocale, type Localized } from "../i18n/pick";

const KPIS: Localized<LabsKpi[]> = {
  en: [
    { value: "25", label: "Large clients supported / year" },
    { value: "3 yrs", label: "Deployed globally" },
    { value: "€1B", label: "Revenue perimeter influenced annually" },
    { value: "+3%", label: "Renewal uplift on supported contracts" },
  ],
  fr: [
    { value: "25", label: "Grands clients accompagnés / an" },
    { value: "3 ans", label: "Déployé à l'échelle mondiale" },
    { value: "€1B", label: "Périmètre de revenu influencé chaque année" },
    { value: "+3%", label: "Uplift de renouvellement sur les contrats accompagnés" },
  ],
};

export function getLabsKpis(lang: LabsLang): LabsKpi[] {
  return pickLocale(KPIS, lang);
}
