import { describe, expect, it } from "vitest";
import { resolveLabsPack } from "@/lib/sodexo-labs/resolve-pack";
import { LabsPack } from "@/lib/sodexo-labs/schemas";

describe("resolveLabsPack", () => {
  it("returns a valid pack for en × external × work", () => {
    const pack = resolveLabsPack({
      lang: "en",
      audience: "external",
      area: "work",
    });
    expect(LabsPack.parse(pack).persona.area).toBe("work");
    expect(pack.copy.methodNote).toBeUndefined();
    expect(pack.kpis).toBeUndefined();
    expect(pack.growth).toBeUndefined();
    expect(pack.engagements).toHaveLength(4);
    expect(pack.engagements.every((e) => e.investment === undefined)).toBe(
      true,
    );
    expect(pack.lifecycle).toHaveLength(4);
    expect(pack.session.lang).toBe("en");
  });

  it("localizes chrome and copy for fr × internal", () => {
    const pack = resolveLabsPack({
      lang: "fr",
      audience: "internal",
      area: "heal",
    });
    expect(pack.offers.every((o) => o.internalExtra)).toBe(true);
    expect(pack.copy.methodNote).toBeTruthy();
    expect(pack.persona.area).toBe("heal");
    expect(pack.kpis).toHaveLength(4);
    expect(pack.growth?.impacts).toHaveLength(4);
    expect(pack.engagements.some((e) => e.investment)).toBe(true);
    expect(pack.chrome.offersHeadline).toContain("valeur");
    expect(pack.copy.welcomeHeadline).toContain("Bienvenue");
  });

  it("changes persona when area changes", () => {
    const work = resolveLabsPack({
      lang: "en",
      audience: "external",
      area: "work",
    });
    const play = resolveLabsPack({
      lang: "en",
      audience: "external",
      area: "play",
    });
    expect(work.persona.sourceRef).not.toBe(play.persona.sourceRef);
  });
});
