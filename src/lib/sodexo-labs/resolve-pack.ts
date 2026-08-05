import { getLabsCases } from "./data/cases";
import { getLabsChrome } from "./data/chrome";
import { getLabsCopy } from "./data/copy";
import { getLabsEngagements } from "./data/engagements";
import { getLabsGrowth } from "./data/growth";
import { getLabsKpis } from "./data/kpis";
import { getLabsLifecycle } from "./data/lifecycle";
import { getLabsMethodPhases } from "./data/method";
import { getLabsOffers } from "./data/offers";
import { getLabsZones } from "./data/zones";
import { mapPersonaToLabsSpot } from "./map-persona";
import { LabsPack, type LabsSessionConfig } from "./schemas";

export function resolveLabsPack(session: LabsSessionConfig) {
  const { lang, audience, area } = session;

  const offers =
    audience === "internal"
      ? getLabsOffers(lang)
      : getLabsOffers(lang).map((offer) => {
          const externalOffer = { ...offer };
          delete externalOffer.internalExtra;
          return externalOffer;
        });

  const cases = getLabsCases(lang)
    .filter((c) => c.area === area)
    .slice(0, 2);

  const engagements =
    audience === "external"
      ? getLabsEngagements(lang).map(
          ({ investment: _investment, ...rest }) => rest,
        )
      : getLabsEngagements(lang);

  const pack = {
    session,
    offers,
    persona: mapPersonaToLabsSpot(area, lang),
    cases,
    zones: getLabsZones(lang),
    engagements,
    lifecycle: getLabsLifecycle(lang),
    methodPhases: getLabsMethodPhases(lang),
    chrome: getLabsChrome(lang),
    ...(audience === "internal"
      ? { kpis: getLabsKpis(lang), growth: getLabsGrowth(lang) }
      : {}),
    copy: getLabsCopy(audience, lang),
  };

  return LabsPack.parse(pack);
}
