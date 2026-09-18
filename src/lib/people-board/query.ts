import { parseSeatFilters, serializeSeatFilters, type SeatFilter } from "./filters";
import { LaneId, type LaneId as LaneIdType } from "./schemas";
import { parseScenarios, serializeScenarios, type ScenarioId } from "./scenarios";

export type BoardView = "gantt" | "table";

export type PeopleQuery = {
  lane: LaneIdType | null;
  seat: string | null;
  view: BoardView;
  filters: Set<SeatFilter>;
  scenarios: Set<ScenarioId>;
};

export function parsePeopleQuery(input: {
  lane?: string;
  seat?: string;
  view?: string;
  filters?: string;
  whatif?: string;
}): PeopleQuery {
  const laneParse = input.lane ? LaneId.safeParse(input.lane) : null;
  return {
    lane: laneParse?.success ? laneParse.data : null,
    seat: input.seat && input.seat.length > 0 ? input.seat : null,
    view: input.view === "table" ? "table" : "gantt",
    filters: parseSeatFilters(input.filters ?? null),
    scenarios: parseScenarios(input.whatif ?? null),
  };
}

export function peopleQueryString(state: {
  lane: LaneIdType | null;
  seat: string | null;
  view: BoardView;
  filters: ReadonlySet<SeatFilter>;
  scenarios: ReadonlySet<ScenarioId>;
}): string {
  const params = new URLSearchParams();
  if (state.lane) params.set("lane", state.lane);
  if (state.seat) params.set("seat", state.seat);
  if (state.view === "table") params.set("view", "table");
  const filters = serializeSeatFilters(state.filters);
  if (filters) params.set("filters", filters);
  const whatif = serializeScenarios(state.scenarios);
  if (whatif) params.set("whatif", whatif);
  const qs = params.toString();
  return qs ? `/people?${qs}` : "/people";
}
