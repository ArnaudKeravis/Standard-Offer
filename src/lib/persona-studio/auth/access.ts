import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { User } from "@/lib/persona-studio/ai/schemas/project";
import { getRepository } from "@/lib/persona-studio/repository";

/**
 * Soft admin / facilitator gate for client demos.
 *
 * When `PERSONA_STUDIO_ACCESS_SECRET` is unset, Studio stays fully open
 * (FACILITATOR) — local/dev default. When set, browsing stays public as VIEWER
 * and create/edit/sources require an unlocked write cookie.
 */

export const WRITE_ACCESS_COOKIE = "studio-write-access";
const TOKEN_PAYLOAD = "persona-studio-write-v1";

export function isWriteGateEnabled(): boolean {
  return Boolean(process.env.PERSONA_STUDIO_ACCESS_SECRET?.trim());
}

export function expectedWriteToken(): string | null {
  const secret = process.env.PERSONA_STUDIO_ACCESS_SECRET?.trim();
  if (!secret) return null;
  return createHmac("sha256", secret).update(TOKEN_PAYLOAD).digest("hex");
}

export function verifyAccessSecret(candidate: string): boolean {
  const secret = process.env.PERSONA_STUDIO_ACCESS_SECRET?.trim();
  if (!secret) return true;
  const a = Buffer.from(candidate);
  const b = Buffer.from(secret);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function hasWriteAccess(): Promise<boolean> {
  if (!isWriteGateEnabled()) return true;
  const expected = expectedWriteToken();
  if (!expected) return true;
  const jar = await cookies();
  const token = jar.get(WRITE_ACCESS_COOKIE)?.value;
  if (!token) return false;
  try {
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function canWriteStudio(): Promise<boolean> {
  return hasWriteAccess();
}

export class WriteAccessDeniedError extends Error {
  constructor(message = "Facilitator unlock required to change Studio data.") {
    super(message);
    this.name = "WriteAccessDeniedError";
  }
}

export async function requireWriteAccess(): Promise<void> {
  if (!(await hasWriteAccess())) {
    throw new WriteAccessDeniedError();
  }
}

/**
 * Session user for attribution. Role reflects gate state so UI can hide write
 * controls without a separate prop everywhere.
 */
export async function getSessionUser(): Promise<User> {
  const base = await getRepository().getCurrentUser();
  const canWrite = await hasWriteAccess();
  return {
    ...base,
    role: canWrite ? "FACILITATOR" : "VIEWER",
  };
}
