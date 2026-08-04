import { describe, expect, it } from "vitest";
import { LabsCredential } from "@/lib/sodexo-labs/schemas";

describe("LabsCredential", () => {
  it("accepts a minimal credential", () => {
    const parsed = LabsCredential.parse({
      id: "lilly",
      client: "Eli Lilly",
      title: "The Cell",
      areas: ["work"],
      sectors: ["workplace"],
      regions: ["GSA"],
      audienceHint: "both",
      challenge: "…",
      approach: "…",
      outcome: "…",
      images: [],
    });
    expect(parsed.id).toBe("lilly");
  });
});
