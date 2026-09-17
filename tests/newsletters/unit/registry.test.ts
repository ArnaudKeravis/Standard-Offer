import { describe, expect, it } from "vitest";
import { NEWSLETTER_ISSUES } from "@/lib/newsletters/registry";

describe("NEWSLETTER_ISSUES", () => {
  it("includes the leadership brief and FY26 retrospective", () => {
    expect(NEWSLETTER_ISSUES.length).toBeGreaterThanOrEqual(2);
    expect(NEWSLETTER_ISSUES.map((i) => i.id)).toEqual(
      expect.arrayContaining([
        "fy26-leadership-brief",
        "fy26-yearly-retrospective",
      ]),
    );
    expect(
      NEWSLETTER_ISSUES.find((i) => i.id === "fy26-leadership-brief")?.href,
    ).toBe("/newsletters/fy26-leadership-brief.html");
  });

  it("has unique ids and hrefs", () => {
    const ids = NEWSLETTER_ISSUES.map((i) => i.id);
    const hrefs = NEWSLETTER_ISSUES.map((i) => i.href);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
