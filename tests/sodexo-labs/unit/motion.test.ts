import { describe, expect, it } from "vitest";
import {
  projectVelocity,
  rubberband,
} from "@/lib/sodexo-labs/motion";
import { resolveLabsPack } from "@/lib/sodexo-labs/resolve-pack";

describe("labs motion helpers", () => {
  it("projects resting distance from velocity", () => {
    const projected = projectVelocity(500);
    expect(projected).toBeGreaterThan(200);
  });

  it("rubberbands past a bound", () => {
    const soft = rubberband(200, 800);
    expect(soft).toBeLessThan(200);
    expect(soft).toBeGreaterThan(0);
  });
});

describe("labs chrome slideNav", () => {
  it("includes nav labels for every slide id", () => {
    const pack = resolveLabsPack({
      lang: "en",
      audience: "external",
      area: "work",
    });
    expect(pack.chrome.slideNav.cover).toBeTruthy();
    expect(pack.chrome.slideNav.close).toBeTruthy();
    expect(Object.keys(pack.chrome.slideNav)).toHaveLength(14);
  });
});
