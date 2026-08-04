"use server";

import { resolveLabsPack } from "@/lib/sodexo-labs/resolve-pack";
import type { LabsSessionConfig } from "@/lib/sodexo-labs/schemas";

export async function getLabsPackAction(session: LabsSessionConfig) {
  return resolveLabsPack(session);
}
