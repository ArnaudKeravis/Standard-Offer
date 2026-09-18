import { describe, expect, it } from "vitest";
import { parsePeopleQuery, peopleQueryString } from "@/lib/people-board/query";

describe("people query", () => {
  it("parses lane, seat, view, filters and what-if", () => {
    expect(
      parsePeopleQuery({
        lane: "pd-b2b",
        seat: "laura-geley",
        view: "table",
        filters: "pr2,external",
        whatif: "validate-b2b-lead",
      }),
    ).toEqual({
      lane: "pd-b2b",
      seat: "laura-geley",
      view: "table",
      filters: new Set(["pr2", "external"]),
      scenarios: new Set(["validate-b2b-lead"]),
    });
    expect(parsePeopleQuery({ lane: "nope", view: "weird" })).toEqual({
      lane: null,
      seat: null,
      view: "gantt",
      filters: new Set(),
      scenarios: new Set(),
    });
  });

  it("serializes a shareable query string", () => {
    const href = peopleQueryString({
      lane: "pd-b2b",
      seat: "laura-geley",
      view: "gantt",
      filters: new Set(["pr2"]),
      scenarios: new Set(["validate-dsm"]),
    });
    expect(href).toBe(
      "/people?lane=pd-b2b&seat=laura-geley&filters=pr2&whatif=validate-dsm",
    );
  });
});
