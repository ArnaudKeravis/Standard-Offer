import { describe, expect, it } from "vitest";
import {
  parseCollapsedLanes,
  serializeCollapsedLanes,
  toggleCollapsedLane,
} from "@/lib/people-board/collapsed-lanes";

describe("collapsed lanes", () => {
  it("starts empty and toggles a lane on then off", () => {
    const once = toggleCollapsedLane(new Set(), "pd-b2c");
    expect([...once]).toEqual(["pd-b2c"]);
    expect([...toggleCollapsedLane(once, "pd-b2c")]).toEqual([]);
  });

  it("round-trips through session JSON and drops unknown ids", () => {
    const raw = serializeCollapsedLanes(["pd-b2b", "codesign"]);
    expect(parseCollapsedLanes(raw)).toEqual(new Set(["pd-b2b", "codesign"]));
    expect(parseCollapsedLanes('["pd-b2b","not-a-lane"]')).toEqual(
      new Set(["pd-b2b"]),
    );
    expect(parseCollapsedLanes(null)).toEqual(new Set());
    expect(parseCollapsedLanes("nope")).toEqual(new Set());
  });
});
