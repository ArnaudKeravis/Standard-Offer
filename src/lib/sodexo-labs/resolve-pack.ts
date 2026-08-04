import { LABS_CASES } from "./data/cases";
import { getLabsCopy } from "./data/copy";
import { LABS_FORMATS } from "./data/formats";
import { LABS_OFFERS } from "./data/offers";
import { LABS_ZONES } from "./data/zones";
import { mapPersonaToLabsSpot } from "./map-persona";
import { LabsPack, type LabsSessionConfig } from "./schemas";

export function resolveLabsPack(session: LabsSessionConfig) {
  const { audience, area } = session;

  const offers =
    audience === "internal"
      ? LABS_OFFERS
      : LABS_OFFERS.map((offer) => {
          const externalOffer = { ...offer };
          delete externalOffer.internalExtra;
          return externalOffer;
        });

  const cases = LABS_CASES.filter((c) => c.area === area).slice(0, 2);

  const pack = {
    session,
    offers,
    persona: mapPersonaToLabsSpot(area),
    cases,
    zones: LABS_ZONES,
    formats: LABS_FORMATS,
    copy: getLabsCopy(audience),
  };

  return LabsPack.parse(pack);
}
