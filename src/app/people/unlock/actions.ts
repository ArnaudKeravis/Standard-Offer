"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  PEOPLE_ACCESS_COOKIE,
  expectedPeopleToken,
  verifyPeopleSecret,
} from "@/lib/people-board/auth";

function safeNext(next: string | undefined): string {
  if (!next || !next.startsWith("/people")) return "/people";
  if (next.startsWith("/people/unlock")) return "/people";
  return next;
}

export async function unlockPeopleAction(
  formData: FormData,
): Promise<{ error?: string } | void> {
  const secret = String(formData.get("secret") ?? "");
  const next = safeNext(String(formData.get("next") ?? "/people"));

  if (!verifyPeopleSecret(secret)) {
    return { error: "Incorrect access code." };
  }

  const token = expectedPeopleToken();

  const jar = await cookies();
  jar.set(PEOPLE_ACCESS_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  redirect(next);
}
