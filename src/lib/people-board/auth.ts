import { createHmac, timingSafeEqual } from "node:crypto";

export const PEOPLE_ACCESS_COOKIE = "people-board-access";
const TOKEN_PAYLOAD = "people-board-v1";

export function peopleGateSecret(): string | null {
  const secret = process.env.PEOPLE_BOARD_ACCESS_SECRET?.trim();
  return secret ? secret : null;
}

export function isPeopleGateConfigured(): boolean {
  return Boolean(peopleGateSecret());
}

export function expectedPeopleToken(): string | null {
  const secret = peopleGateSecret();
  if (!secret) return null;
  return createHmac("sha256", secret).update(TOKEN_PAYLOAD).digest("hex");
}

export function verifyPeopleSecret(candidate: string): boolean {
  const secret = peopleGateSecret();
  if (!secret) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(secret);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
