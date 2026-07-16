"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  WRITE_ACCESS_COOKIE,
  expectedWriteToken,
  isWriteGateEnabled,
  verifyAccessSecret,
} from "@/lib/persona-studio/auth/access";

function safeNext(next: string | undefined): string {
  if (!next || !next.startsWith("/studio")) return "/studio";
  return next;
}

export async function unlockStudioAction(
  formData: FormData,
): Promise<{ error?: string } | void> {
  const secret = String(formData.get("secret") ?? "");
  const next = safeNext(String(formData.get("next") ?? "/studio"));

  if (!isWriteGateEnabled()) {
    redirect(next);
  }

  if (!verifyAccessSecret(secret)) {
    return { error: "Incorrect access code." };
  }

  const token = expectedWriteToken();
  if (!token) {
    redirect(next);
  }

  const jar = await cookies();
  jar.set(WRITE_ACCESS_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h workshop day
  });

  redirect(next);
}

export async function lockStudioAction(formData: FormData): Promise<void> {
  const next = safeNext(String(formData.get("next") ?? "/studio"));
  const jar = await cookies();
  jar.delete(WRITE_ACCESS_COOKIE);
  redirect(next);
}
