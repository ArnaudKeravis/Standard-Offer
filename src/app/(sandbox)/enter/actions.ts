"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SANDBOX_ACCESS_COOKIE,
  expectedSandboxToken,
  safeSandboxNext,
  verifySandboxSecret,
} from "@/lib/sandbox/auth";

export async function unlockSandboxAction(
  formData: FormData,
): Promise<{ error?: string } | void> {
  const secret = String(formData.get("secret") ?? "");
  const next = safeSandboxNext(String(formData.get("next") ?? "/"));

  if (!(await verifySandboxSecret(secret))) {
    return { error: "Incorrect access code." };
  }

  const token = await expectedSandboxToken();
  const jar = await cookies();
  jar.set(SANDBOX_ACCESS_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  redirect(next);
}
