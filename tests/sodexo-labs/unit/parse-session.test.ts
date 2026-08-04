import { describe, expect, it } from "vitest";
import { parseLabsSession } from "@/lib/sodexo-labs/parse-session";

describe("parseLabsSession", () => {
  it("returns nulls when params missing", () => {
    expect(parseLabsSession({})).toEqual({ audience: null, area: null });
  });

  it("parses valid audience and area", () => {
    expect(parseLabsSession({ audience: "internal", area: "work" })).toEqual({
      audience: "internal",
      area: "work",
    });
  });

  it("ignores invalid values", () => {
    expect(parseLabsSession({ audience: "foo", area: "WORK" })).toEqual({
      audience: null,
      area: null,
    });
  });
});
