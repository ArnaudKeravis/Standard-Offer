import type { LaneId, PeopleSignal, PersonSeat, SignalKind } from "./schemas";
import { peopleSignals } from "./signals";

export type RecVerb =
  | "Validate"
  | "Fund"
  | "Arbitrate"
  | "Hire"
  | "Cover"
  | "Cut";

export type Recommendation = {
  id: string;
  verb: RecVerb;
  action: string;
  why: string;
  kind: SignalKind;
  lane: LaneId;
  personIds: string[];
  active: boolean;
};

const COPY: Record<string, { verb: RecVerb; action: string; why: string }> = {
  "design-system": {
    verb: "Validate",
    action: "Validate the internal DSM",
    why: "Cover breaks in December if the seat stays Pr2.",
  },
  "pd-b2b": {
    verb: "Fund",
    action: "Fund Lead PD B2B",
    why: "Laura ends November. The internal seat has no budget.",
  },
  "thomas-exit": {
    verb: "Cover",
    action: "Cover Management in P12",
    why: "Thomas ends July. Nobody sits behind Nicolas.",
  },
  "data-vacancy": {
    verb: "Hire",
    action: "Fill the Data AI seat",
    why: "Vacancy from October, next to Javier.",
  },
  "india-b2c-soeze": {
    verb: "Arbitrate",
    action: "Arbitrate leftover India B2C",
    why: "Nikhil and Neha are already in. Lead is Pr1.",
  },
  "b2o-overlap": {
    verb: "Cut",
    action: "Cut B2O double cover",
    why: "Pedro and the Lead both run from December.",
  },
};

const KIND_RANK: Record<SignalKind, number> = {
  "coverage-risk": 0,
  arbitrate: 1,
};

export function recommendationFor(signal: PeopleSignal): Recommendation {
  const copy = COPY[signal.id];
  if (!copy) {
    throw new Error(`Unknown recommendation: ${signal.id}`);
  }
  return {
    id: signal.id,
    verb: copy.verb,
    action: copy.action,
    why: copy.why,
    kind: signal.kind,
    lane: signal.lane,
    personIds: signal.personIds,
    active: signal.active,
  };
}

export function recommendations(seats: PersonSeat[]): Recommendation[] {
  return peopleSignals(seats)
    .map(recommendationFor)
    .sort((a, b) => {
      if (a.active !== b.active) return a.active ? -1 : 1;
      return KIND_RANK[a.kind] - KIND_RANK[b.kind];
    });
}
