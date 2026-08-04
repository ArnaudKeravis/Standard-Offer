import { describe, expect, it } from "vitest";
import { filterLabsCredentials } from "@/lib/sodexo-labs/filter-credentials";
import { LABS_CREDENTIALS } from "@/lib/sodexo-labs/data/credentials";

describe("filterLabsCredentials", () => {
  it("filters by area", () => {
    const out = filterLabsCredentials(LABS_CREDENTIALS, { area: "play" });
    expect(out.length).toBeGreaterThan(0);
    expect(out.every((c) => c.areas.includes("play"))).toBe(true);
  });

  it("searches client names", () => {
    const out = filterLabsCredentials(LABS_CREDENTIALS, { query: "lilly" });
    expect(out.some((c) => c.id === "lilly")).toBe(true);
  });
});
