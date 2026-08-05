import { LABS_CASES } from "./data/cases";
import { getLabsCopy } from "./data/copy";
import { LABS_ENGAGEMENTS } from "./data/engagements";
import { LABS_GROWTH } from "./data/growth";
import { LABS_KPIS } from "./data/kpis";
import { LABS_LIFECYCLE } from "./data/lifecycle";
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

  // Client-facing: keep engagement models, hide investment / pricing lines.
  const engagements =
    audience === "external"
      ? LABS_ENGAGEMENTS.map(({ investment: _investment, ...rest }) => rest)
      : LABS_ENGAGEMENTS;

  const pack = {
    session,
    offers,
    persona: mapPersonaToLabsSpot(area),
    cases,
    zones: LABS_ZONES,
    engagements,
    lifecycle: LABS_LIFECYCLE,
    ...(audience === "internal"
      ? { kpis: LABS_KPIS, growth: LABS_GROWTH }
      : {}),
    copy: getLabsCopy(audience),
  };

  return LabsPack.parse(pack);
}
