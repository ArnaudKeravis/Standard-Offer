import type { PeopleSignal, PersonSeat, SignalKind, LaneId } from "./schemas";
import { PEOPLE_SEATS } from "./seed";

type SignalDef = {
  id: string;
  kind: SignalKind;
  lane: LaneId;
  personIds: string[];
};

const SIGNAL_DEFS: SignalDef[] = [
  {
    id: "design-system",
    kind: "coverage-risk",
    lane: "design-system",
    personIds: ["guillaume-sauvanon", "ismael-casado", "dsm-internal-pt"],
  },
  {
    id: "pd-b2b",
    kind: "coverage-risk",
    lane: "pd-b2b",
    personIds: ["laura-geley", "lead-pd-b2b"],
  },
  {
    id: "india-b2c-soeze",
    kind: "arbitrate",
    lane: "pd-b2c",
    personIds: ["nikhil-soeze", "lead-pd-b2c"],
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
      lane: def.lane,
      personIds: def.personIds,
      active,
      headline: active
        ? "Design System uncovered from December if the internal seat stays Pr2"
        : "Design System internal seat is validated. December cover is planned.",
      detail: active
        ? "Guillaume left in September. Ismael covers until P4-Dec. Michael stays on the squad. The internal Design System Manager is not validated. If it stays Pr2, there is no Design System lead after December."
        : "Guillaume left in September. Ismael covers until P4-Dec. The internal Design System Manager is validated to take over.",
    };
  }

  if (def.id === "pd-b2b") {
    const internal = byId(seats, "lead-pd-b2b");
    const active = internal?.status === "pr2" || internal?.budgetGap === true;
    return {
      id: def.id,
      kind: def.kind,
      lane: def.lane,
      personIds: def.personIds,
      active,
      headline: active
        ? "B2B uncovered after November: no budget and Lead PD recruitment not validated"
        : "B2B internal Lead is validated and funded after Laura.",
      detail: active
        ? "Laura is interim Lead through P3-Nov. The internal Lead Product Design B2B is Pr2, with no budget. If it is not validated, there is no B2B lead after November."
        : "Laura is interim Lead through P3-Nov. The internal Lead Product Design B2B is validated to take over.",
    };
  }

  return {
    id: def.id,
    kind: def.kind,
    lane: def.lane,
    personIds: def.personIds,
    active: true,
    headline:
      "India B2C / SoEze: full-year budget to align, convert, or reallocate",
    detail:
      "Nikhil and Neha are already in. The internal Lead Product Design B2C is Pr1. Leftover India budget can move to another profile.",
  };
}

export const PEOPLE_SIGNALS: PeopleSignal[] = SIGNAL_DEFS.map((def) =>
  signalFor(def.id, PEOPLE_SEATS),
);
