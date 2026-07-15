"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getWritableRepository } from "@/lib/persona-studio/repository";
import { getSessionUser } from "@/lib/persona-studio/auth/mock-auth";
import { Persona, PersonaTemplate } from "@/lib/persona-studio/ai/schemas/persona";
import { PersonaSectionTemplate } from "@/lib/persona-studio/ai/schemas/section";
import { PersonaFamily } from "@/lib/persona-studio/ai/schemas/common";
import { AccentColor } from "@/lib/persona-studio/ai/schemas/common";
import { newId } from "@/lib/persona-studio/utils/persona-factory";

/**
 * Write actions for the persona editor, version history and template saving.
 * All mutations go through the writable repository (server-side only) and are
 * Zod-validated at the boundary; the editor never touches the repository.
 */

function revalidatePersona(projectId: string, personaId: string) {
  revalidatePath(`/studio/projects/${projectId}`);
  revalidatePath(`/studio/projects/${projectId}/personas`);
  revalidatePath(`/studio/projects/${projectId}/personas/${personaId}`);
  revalidatePath(`/studio/projects/${projectId}/personas/${personaId}/edit`);
  revalidatePath(`/studio/projects/${projectId}/personas/${personaId}/history`);
}

export async function createPersonaAction(
  projectId: string,
  personaRaw: z.input<typeof Persona>,
): Promise<{ personaId: string }> {
  const repo = getWritableRepository();
  const now = new Date().toISOString();
  const persona = Persona.parse({
    ...personaRaw,
    projectId,
    version: 1,
    createdAt: now,
    updatedAt: now,
  });
  const created = await repo.createPersona(persona);
  revalidatePersona(projectId, created.id);
  return { personaId: created.id };
}

export async function updatePersonaAction(
  projectId: string,
  personaId: string,
  personaRaw: z.input<typeof Persona>,
  note?: string,
): Promise<{ version: number }> {
  const repo = getWritableRepository();
  const user = await getSessionUser();
  const next = Persona.parse(personaRaw);
  const saved = await repo.updatePersona(personaId, next, {
    note,
    createdBy: user.id,
  });
  revalidatePersona(projectId, personaId);
  return { version: saved.version };
}

export async function deletePersonaAction(
  projectId: string,
  personaId: string,
): Promise<void> {
  const repo = getWritableRepository();
  await repo.deletePersona(personaId);
  revalidatePersona(projectId, personaId);
}

export async function restoreVersionAction(
  projectId: string,
  personaId: string,
  version: number,
): Promise<{ version: number }> {
  const repo = getWritableRepository();
  const user = await getSessionUser();
  const saved = await repo.restorePersonaVersion(personaId, version, {
    createdBy: user.id,
  });
  revalidatePersona(projectId, personaId);
  return { version: saved.version };
}

const SaveTemplateInput = z.object({
  name: z.string().min(1),
  family: PersonaFamily,
  accentColor: AccentColor,
  description: z.string().optional(),
  sections: z.array(PersonaSectionTemplate),
});

export async function saveTemplateAction(
  raw: z.input<typeof SaveTemplateInput>,
): Promise<{ templateId: string }> {
  const input = SaveTemplateInput.parse(raw);
  const repo = getWritableRepository();
  const now = new Date().toISOString();
  const template = PersonaTemplate.parse({
    id: newId("tpl"),
    name: input.name,
    family: input.family,
    description: input.description,
    accentColor: input.accentColor,
    sections: input.sections,
    createdAt: now,
    updatedAt: now,
  });
  await repo.createTemplate(template);
  revalidatePath("/studio/templates");
  return { templateId: template.id };
}
