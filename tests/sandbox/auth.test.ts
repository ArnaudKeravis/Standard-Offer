import { afterEach, describe, expect, it } from "vitest";
import {
  isSandboxDevOpen,
  isSandboxPublicPath,
  safeSandboxNext,
  shouldRunIntl,
  verifySandboxSecret,
} from "@/lib/sandbox/auth";

const ORIGINAL = process.env.SANDBOX_ACCESS_SECRET;
const ORIGINAL_ENV = process.env.NODE_ENV;

afterEach(() => {
  if (ORIGINAL === undefined) {
    delete process.env.SANDBOX_ACCESS_SECRET;
  } else {
    process.env.SANDBOX_ACCESS_SECRET = ORIGINAL;
  }
  process.env.NODE_ENV = ORIGINAL_ENV;
});

describe("verifySandboxSecret", () => {
  it("rejects unknown candidates when the env secret is missing", async () => {
    delete process.env.SANDBOX_ACCESS_SECRET;
    expect(await verifySandboxSecret("anything")).toBe(false);
    expect(await verifySandboxSecret("wrong")).toBe(false);
  });

  it("accepts only the configured secret", async () => {
    process.env.SANDBOX_ACCESS_SECRET = "unit-test-secret";
    expect(await verifySandboxSecret("unit-test-secret")).toBe(true);
    expect(await verifySandboxSecret("wrong")).toBe(false);
  });
});

describe("sandbox gate helpers", () => {
  it("stays open in development when no secret is set", () => {
    delete process.env.SANDBOX_ACCESS_SECRET;
    process.env.NODE_ENV = "development";
    expect(isSandboxDevOpen()).toBe(true);
  });

  it("locks production when no secret is set", () => {
    delete process.env.SANDBOX_ACCESS_SECRET;
    process.env.NODE_ENV = "production";
    expect(isSandboxDevOpen()).toBe(false);
  });

  it("locks development once a secret is set", () => {
    process.env.SANDBOX_ACCESS_SECRET = "unit-test-secret";
    process.env.NODE_ENV = "development";
    expect(isSandboxDevOpen()).toBe(false);
  });

  it("lets the enter page through and blocks the rest", () => {
    expect(isSandboxPublicPath("/enter")).toBe(true);
    expect(isSandboxPublicPath("/enter/")).toBe(true);
    expect(isSandboxPublicPath("/robots.txt")).toBe(true);
    expect(isSandboxPublicPath("/")).toBe(false);
    expect(isSandboxPublicPath("/workshops/tech-ambition")).toBe(false);
    expect(isSandboxPublicPath("/newsletters/fy26-leadership-brief.html")).toBe(
      false,
    );
  });

  it("keeps next-intl off the sandbox surfaces", () => {
    expect(shouldRunIntl("/")).toBe(false);
    expect(shouldRunIntl("/enter")).toBe(false);
    expect(shouldRunIntl("/workshops/tech-ambition")).toBe(false);
    expect(shouldRunIntl("/studio")).toBe(false);
    expect(shouldRunIntl("/en/deck")).toBe(true);
  });

  it("rejects open redirects", () => {
    expect(safeSandboxNext(undefined)).toBe("/");
    expect(safeSandboxNext("https://evil.example")).toBe("/");
    expect(safeSandboxNext("//evil.example")).toBe("/");
    expect(safeSandboxNext("/enter")).toBe("/");
    expect(safeSandboxNext("/workshops/tech-ambition")).toBe(
      "/workshops/tech-ambition",
    );
  });
});
