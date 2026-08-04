import { describe, expect, it } from "vitest";
import { NEWSLETTER_ISSUES } from "@/lib/newsletters/registry";

describe("NEWSLETTER_ISSUES", () => {
  it("includes FY26 as the first issue", () => {
    expect(NEWSLETTER_ISSUES.length).toBeGreaterThanOrEqual(1);
    expect(NEWSLETTER_ISSUES[0]).toMatchObject({
      id: "fy26-yearly-retrospective",
      href: "/newsletters/fy26-yearly-retrospective.html",
    });
  });

  it("has unique ids and hrefs", () => {
    const ids = NEWSLETTER_ISSUES.map((i) => i.id);
    const hrefs = NEWSLETTER_ISSUES.map((i) => i.href);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
