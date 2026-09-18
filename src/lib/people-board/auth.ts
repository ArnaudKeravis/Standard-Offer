import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const PEOPLE_ACCESS_COOKIE = "people-board-access";
const TOKEN_PAYLOAD = "people-board-v1";

/** SHA-256 of the shared door code. Used only when env is unset so Vercel can ship without a dashboard secret. */
const FALLBACK_DIGEST =
  "9dfe64846ff2da4d4c6c99e7dc6239f25ae6a8b83618219ba7b2ed20fdd7292e";

export function peopleGateSecret(): string | null {
  const secret = process.env.PEOPLE_BOARD_ACCESS_SECRET?.trim();
  return secret ? secret : null;
}

export function isPeopleGateConfigured(): boolean {
  return true;
}

function tokenKey(): string {
  return peopleGateSecret() ?? FALLBACK_DIGEST;
}

export function expectedPeopleToken(): string {
  return createHmac("sha256", tokenKey()).update(TOKEN_PAYLOAD).digest("hex");
}

function equal(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifyPeopleSecret(candidate: string): boolean {
  const secret = peopleGateSecret();
  if (secret) {
    return equal(candidate, secret);
  }
  const digest = createHash("sha256").update(candidate).digest("hex");
  return equal(digest, FALLBACK_DIGEST);
}
