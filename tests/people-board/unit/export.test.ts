import { describe, expect, it } from "vitest";
import { seatsToCsv } from "@/lib/people-board/export";
import { PEOPLE_SEATS } from "@/lib/people-board/seed";

describe("seatsToCsv", () => {
  it("writes a header and one row per seat with escaped commas", () => {
    const csv = seatsToCsv(PEOPLE_SEATS);
    const lines = csv.trim().split("\n");
    expect(lines[0]).toBe(
      "lane,name,role,supplier,status,start,end,dailyRate,cost,opex,capex,funding,inBudget",
    );
    expect(lines).toHaveLength(PEOPLE_SEATS.length + 1);
    expect(csv).toContain("Neha");
    expect(csv).toContain("Thoughtworks");
    const quentin = lines.find((line) => line.includes("Quentin Geiger"));
    expect(quentin).toContain("Product designer B2C / Platform & FM / WRX");
  });
});
