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
  {
    id: "thomas-exit",
    kind: "coverage-risk",
    lane: "management",
    personIds: ["thomas-didier"],
  },
  {
    id: "data-vacancy",
    kind: "coverage-risk",
    lane: "pd-data",
    personIds: ["vacancy-ai-products"],
  },
  {
    id: "b2o-overlap",
    kind: "arbitrate",
    lane: "pd-b2o",
    personIds: ["pedro-ciat", "lead-pd-b2o"],
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

  if (def.id === "thomas-exit") {
    const thomas = byId(seats, "thomas-didier");
    const active = Boolean(thomas && thomas.endPeriod < 12);
    return {
      id: def.id,
      kind: def.kind,
      lane: def.lane,
      personIds: def.personIds,
      active,
      headline: "Thomas Didier ends P11-Jul. No successor in Management.",
      detail:
        "The apprentice seat closes in July. P12-Aug has no Management cover behind Nicolas.",
    };
  }

  if (def.id === "data-vacancy") {
    const vacancy = byId(seats, "vacancy-ai-products");
    const active = Boolean(vacancy && vacancy.displayName.toLowerCase().includes("vacancy"));
    return {
      id: def.id,
      kind: def.kind,
      lane: def.lane,
      personIds: def.personIds,
      active,
      headline: "Data AI products seat is still a vacancy from P2-Oct.",
      detail:
        "Javier is on Data / Power BI. The New Products / AI seat is an open external from October.",
    };
  }

  if (def.id === "b2o-overlap") {
    const pedro = byId(seats, "pedro-ciat");
    const lead = byId(seats, "lead-pd-b2o");
    const overlap =
      Boolean(pedro && lead) &&
      pedro!.startPeriod <= lead!.endPeriod &&
      lead!.startPeriod <= pedro!.endPeriod;
    return {
      id: def.id,
      kind: def.kind,
      lane: def.lane,
      personIds: def.personIds,
      active: overlap,
      headline: "B2O Lead and Pedro both run from P4. Double cover to arbitrate.",
      detail:
        "The internal Lead PD B2O starts P4-Dec while Pedro stays through P11-Jul. That overlap is paid twice.",
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

export function peopleSignals(seats: PersonSeat[]): PeopleSignal[] {
  return SIGNAL_DEFS.map((def) => signalFor(def.id, seats));
}

export const PEOPLE_SIGNALS: PeopleSignal[] = peopleSignals(PEOPLE_SEATS);
