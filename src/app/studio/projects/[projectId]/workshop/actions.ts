"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getWritableRepository } from "@/lib/persona-studio/repository";
import { requireWriteAccess } from "@/lib/persona-studio/auth/access";
import { getSessionUser } from "@/lib/persona-studio/auth/mock-auth";
import { EvidenceStatus } from "@/lib/persona-studio/ai/schemas/common";

/**
 * Calibration sync: apply a board sticky's evidence kind onto a persona
 * statement. Never invents content — only updates evidenceStatus.
 */

const SyncInput = z.object({
  projectId: z.string().min(1),
  personaId: z.string().min(1),
  statementId: z.string().min(1),
  evidenceStatus: EvidenceStatus,
});

export async function syncStickyEvidenceAction(
  raw: z.input<typeof SyncInput>,
): Promise<{ ok: true; version: number } | { ok: false; error: string }> {
  try {
    await requireWriteAccess();
  } catch {
    return {
      ok: false,
      error: "Facilitator unlock required to sync calibration to the sheet.",
    };
  }

  const input = SyncInput.parse(raw);
  const repo = getWritableRepository();
  const persona = await repo.getPersona(input.personaId);
  if (!persona || persona.projectId !== input.projectId) {
    return { ok: false, error: "Persona not found." };
  }

  let found = false;
  const patchSection = <T extends { statements: { id: string; evidenceStatus: string }[] }>(
    sections: T[],
  ): T[] =>
    sections.map((section) => ({
      ...section,
      statements: section.statements.map((st) => {
        if (st.id !== input.statementId) return st;
        found = true;
        return { ...st, evidenceStatus: input.evidenceStatus };
      }),
    }));

  const next = {
    ...persona,
    commonSections: patchSection(persona.commonSections),
    domainSections: patchSection(persona.domainSections),
  };

  if (!found) {
    return { ok: false, error: "Statement not found on this persona." };
  }

  const user = await getSessionUser();
  const saved = await repo.updatePersona(input.personaId, next, {
    note: `Calibration board → ${input.evidenceStatus}`,
    createdBy: user.id,
  });

  revalidatePath(`/studio/projects/${input.projectId}`);
  revalidatePath(`/studio/projects/${input.projectId}/personas/${input.personaId}`);
  revalidatePath(
    `/studio/projects/${input.projectId}/personas/${input.personaId}/edit`,
  );

  return { ok: true, version: saved.version };
}
