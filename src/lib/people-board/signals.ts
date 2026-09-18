import type { PeopleSignal, PersonSeat, SignalKind } from "./schemas";
import { PEOPLE_SEATS } from "./seed";

type SignalDef = {
  id: string;
  kind: SignalKind;
  personIds: string[];
};

const SIGNAL_DEFS: SignalDef[] = [
  {
    id: "design-system",
    kind: "coverage-risk",
    personIds: ["guillaume-sauvanon", "ismael-casado", "dsm-internal-pt"],
  },
  {
    id: "india-b2c-soeze",
    kind: "arbitrate",
    personIds: ["nikhil-soeze", "lead-pd-b2c-india"],
  },
];

function byId(seats: PersonSeat[], id: string): PersonSeat | undefined {
  return seats.find((seat) => seat.id === id);
}

export function signalFor(id: string, seats: PersonSeat[]): PeopleSignal {
  const def = SIGNAL_DEFS.find((row) => row.id === id);
  if (!def) {
    throw new Error(`Unknown people signal: ${id}`);
  }

  if (def.id === "design-system") {
    const internal = byId(seats, "dsm-internal-pt");
    const active = internal?.status === "pr2";
    return {
      id: def.id,
      kind: def.kind,
      personIds: def.personIds,
      active,
      headline: active
        ? "Design System uncovered from December if the internal seat stays Pr2"
        : "Design System internal seat is validated. December cover is planned.",
      detail: active
        ? "Guillaume left in September. Ismael covers until P4-Dec. The internal Design System Manager is not validated. If it stays Pr2, there is no resource after December."
        : "Guillaume left in September. Ismael covers until P4-Dec. The internal Design System Manager is validated to take over.",
    };
  }

  return {
    id: def.id,
    kind: def.kind,
    personIds: def.personIds,
    active: true,
    headline:
      "India B2C / SoEze: full-year budget to align, convert, or reallocate",
    detail:
      "Nikhil is full-time against a full-year SoEze budget. If the internal Lead Product Design B2C lands in India, leftover budget can move to another India profile. Treat both rows as one decision.",
  };
}

export const PEOPLE_SIGNALS: PeopleSignal[] = SIGNAL_DEFS.map((def) =>
  signalFor(def.id, PEOPLE_SEATS),
);
