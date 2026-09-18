import { afterEach, describe, expect, it } from "vitest";
import { verifyPeopleSecret } from "@/lib/people-board/auth";

const ORIGINAL = process.env.PEOPLE_BOARD_ACCESS_SECRET;

afterEach(() => {
  if (ORIGINAL === undefined) {
    delete process.env.PEOPLE_BOARD_ACCESS_SECRET;
  } else {
    process.env.PEOPLE_BOARD_ACCESS_SECRET = ORIGINAL;
  }
});

describe("verifyPeopleSecret", () => {
  it("rejects every candidate when the env secret is missing", () => {
    delete process.env.PEOPLE_BOARD_ACCESS_SECRET;
    expect(verifyPeopleSecret("anything")).toBe(false);
  });

  it("accepts only the configured secret", () => {
    process.env.PEOPLE_BOARD_ACCESS_SECRET = "unit-test-secret";
    expect(verifyPeopleSecret("unit-test-secret")).toBe(true);
    expect(verifyPeopleSecret("wrong")).toBe(false);
  });
});
