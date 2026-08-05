import { describe, expect, it } from "vitest";
import { parseLabsSession } from "@/lib/sodexo-labs/parse-session";

describe("parseLabsSession", () => {
  it("returns nulls when params missing", () => {
    expect(parseLabsSession({})).toEqual({
      lang: null,
      audience: null,
      area: null,
    });
  });

  it("parses valid lang, audience and area", () => {
    expect(
      parseLabsSession({ lang: "fr", audience: "internal", area: "work" }),
    ).toEqual({
      lang: "fr",
      audience: "internal",
      area: "work",
    });
  });

  it("defaults lang to en when audience+area present without lang", () => {
    expect(parseLabsSession({ audience: "external", area: "heal" })).toEqual({
      lang: "en",
      audience: "external",
      area: "heal",
    });
  });

  it("ignores invalid values", () => {
    expect(parseLabsSession({ lang: "de", audience: "foo", area: "WORK" })).toEqual({
      lang: null,
      audience: null,
      area: null,
    });
  });
});
