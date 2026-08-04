import { describe, expect, it } from "vitest";
import { stakeholderRoleFromXpSlug } from "@/lib/persona-studio/utils/stakeholder-role";
import { localizePersona } from "@/lib/persona-studio/data/localized";
import { buildXpPersona, type XpAreaConfig, type XpPersonaSpec } from "@/lib/persona-studio/data/seed/xp-builders";

describe("stakeholderRoleFromXpSlug", () => {
  it("maps client / operator prefixes and defaults to consumer", () => {
    expect(stakeholderRoleFromXpSlug("client-work")).toBe("CLIENT");
    expect(stakeholderRoleFromXpSlug("operator-heal")).toBe("OPERATOR");
    expect(stakeholderRoleFromXpSlug("white-collar")).toBe("CONSUMER");
    expect(stakeholderRoleFromXpSlug("sport-fan")).toBe("CONSUMER");
  });
});

describe("XP persona stakeholderRole", () => {
  const area: XpAreaConfig = {
    projectId: "proj-test",
    family: "WORK",
    segment: { en: "Work", fr: "Work" },
    sourceId: "src-test",
    sourceName: { en: "Test", fr: "Test" },
    sourceExtract: "test",
  };

  function spec(slug: string): XpPersonaSpec {
    return {
      slug,
      name: "Test",
      archetype: { en: "A", fr: "A" },
      category: { en: "C", fr: "C" },
      oneLineEssence: { en: "Essence", fr: "Essence" },
      quote: { en: "Quote", fr: "Quote" },
      accentColor: "#111111",
      tags: [],
      workplace: [{ en: "Site", fr: "Site" }],
      goals: [{ en: "Goal", fr: "Goal" }],
      motivations: [{ en: "Motive", fr: "Motive" }],
      needs: [{ en: "Need", fr: "Need" }],
      pains: [{ en: "Pain", fr: "Pain" }],
      journey: [],
    };
  }

  it("stamps stakeholderRole onto built XP personas", () => {
    const client = localizePersona(buildXpPersona(area, spec("client-work")), "en");
    const operator = localizePersona(
      buildXpPersona(area, spec("operator-work")),
      "en",
    );
    const consumer = localizePersona(
      buildXpPersona(area, spec("white-collar")),
      "en",
    );
    expect(client.stakeholderRole).toBe("CLIENT");
    expect(operator.stakeholderRole).toBe("OPERATOR");
    expect(consumer.stakeholderRole).toBe("CONSUMER");
  });
});
