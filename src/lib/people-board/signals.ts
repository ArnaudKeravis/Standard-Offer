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
    personIds: ["guillaume-sauvanon", "ismael-casado", "vacancy-dsm"],
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
    personIds: ["nikhil-soeze", "vacancy-b2c-india", "lead-pd-b2c"],
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
    personIds: ["neha-b2c"],
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
    const vacancy = byId(seats, "vacancy-dsm");
    const active = Boolean(
      vacancy &&
        (vacancy.budgetGap || /vacancy/i.test(vacancy.displayName)),
    );
    return {
      id: def.id,
      kind: def.kind,
      lane: def.lane,
      personIds: def.personIds,
      active,
      headline: active
        ? "DSM is an external vacancy for the full year. Not hired yet."
        : "DSM external seat is filled for the year.",
      detail: active
        ? "Guillaume left in September. Ismael covers through P4-Dec. The DSM line is a full-year external vacancy, not an internal Pr2 hire."
        : "The DSM external seat is filled. Ismael remains the named cover through December.",
    };
  }

  if (def.id === "pd-b2b") {
    const lead = byId(seats, "lead-pd-b2b");
    const active = lead?.status === "pr2" || lead?.budgetGap === true;
    return {
      id: def.id,
      kind: def.kind,
      lane: def.lane,
      personIds: def.personIds,
      active,
      headline: active
        ? "B2B Lead replacement is a full-year line: no budget, not validated"
        : "B2B Lead replacement is validated and funded.",
      detail: active
        ? "Laura is interim through P3-Nov. Vacancy - Lead B2B runs P1–P12 as her replacement. Pr2, no budget."
        : "Laura is interim through P3-Nov. The Lead B2B replacement is validated to take over.",
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
    const neha = byId(seats, "neha-b2c");
    const active = Boolean(neha && /vacancy/i.test(neha.displayName));
    return {
      id: def.id,
      kind: def.kind,
      lane: def.lane,
      personIds: def.personIds,
      active,
      headline: active
        ? "Data AI products seat is still a vacancy."
        : "Neha is on Data / AI products.",
      detail: active
        ? "The New Products / AI seat is still open."
        : "Neha moved from B2C India onto Product designer New Products / AI products. Vacancy - Product Designer B2C India is her replacement.",
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
      "Nikhil is already in. Vacancy - Product Designer B2C India replaces Neha. The internal Lead is Pr1.",
  };
}

export function peopleSignals(seats: PersonSeat[]): PeopleSignal[] {
  return SIGNAL_DEFS.map((def) => signalFor(def.id, seats));
}

export const PEOPLE_SIGNALS: PeopleSignal[] = peopleSignals(PEOPLE_SEATS);
