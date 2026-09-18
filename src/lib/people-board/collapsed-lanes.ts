import { LANE_ORDER } from "./lanes";
import type { LaneId } from "./schemas";

export const COLLAPSED_LANES_KEY = "people-board-collapsed-lanes";

export function toggleCollapsedLane(
  current: ReadonlySet<LaneId>,
  lane: LaneId,
): Set<LaneId> {
  const next = new Set(current);
  if (next.has(lane)) {
    next.delete(lane);
  } else {
    next.add(lane);
  }
  return next;
}

export function serializeCollapsedLanes(lanes: Iterable<LaneId>): string {
  return JSON.stringify([...lanes]);
}

export function parseCollapsedLanes(raw: string | null): Set<LaneId> {
  if (!raw) return new Set();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(
      parsed.filter((id): id is LaneId =>
        LANE_ORDER.includes(id as LaneId),
      ),
    );
  } catch {
    return new Set();
  }
}
