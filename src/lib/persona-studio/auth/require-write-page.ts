import { redirect } from "next/navigation";
import {
  canWriteStudio,
  isWriteGateEnabled,
} from "@/lib/persona-studio/auth/access";

/**
 * Redirect write surfaces to unlock when the gate is on and the cookie is missing.
 * When the gate is off, always allow.
 */
export async function redirectUnlessCanWrite(nextPath: string): Promise<void> {
  if (!isWriteGateEnabled()) return;
  if (await canWriteStudio()) return;
  redirect(`/studio/unlock?next=${encodeURIComponent(nextPath)}`);
}
