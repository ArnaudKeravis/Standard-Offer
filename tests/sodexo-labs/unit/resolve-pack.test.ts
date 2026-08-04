import { describe, expect, it } from "vitest";
import { resolveLabsPack } from "@/lib/sodexo-labs/resolve-pack";
import { LabsPack } from "@/lib/sodexo-labs/schemas";

describe("resolveLabsPack", () => {
  it("returns a valid pack for external × work", () => {
    const pack = resolveLabsPack({ audience: "external", area: "work" });
    expect(LabsPack.parse(pack).persona.area).toBe("work");
    expect(pack.copy.methodNote).toBeUndefined();
  });

  it("adds internal extras on offers and method note", () => {
    const pack = resolveLabsPack({ audience: "internal", area: "heal" });
    expect(pack.offers.every((o) => o.internalExtra)).toBe(true);
    expect(pack.copy.methodNote).toBeTruthy();
    expect(pack.persona.area).toBe("heal");
  });

  it("changes persona when area changes", () => {
    const work = resolveLabsPack({ audience: "external", area: "work" });
    const play = resolveLabsPack({ audience: "external", area: "play" });
    expect(work.persona.sourceRef).not.toBe(play.persona.sourceRef);
  });
});
