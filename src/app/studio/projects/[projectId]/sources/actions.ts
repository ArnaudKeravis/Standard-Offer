"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getWritableRepository } from "@/lib/persona-studio/repository";
import { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import {
  ConfidentialityLabel,
  SourceCategory,
} from "@/lib/persona-studio/ai/schemas/common";
import { newId } from "@/lib/persona-studio/utils/persona-factory";

/**
 * Source-management write actions. Sources carry a confidentiality label and an
 * optional anonymous participant reference only — never a real participant name
 * (see SECURITY.md).
 */

const AddSourceInput = z.object({
  name: z.string().min(1),
  type: z.string().min(1).default("text"),
  category: SourceCategory,
  confidentiality: ConfidentialityLabel,
  participantRef: z.string().optional(),
  extractedText: z.string().default(""),
});

export async function addSourceAction(
  projectId: string,
  raw: z.input<typeof AddSourceInput>,
): Promise<{ sourceId: string }> {
  const input = AddSourceInput.parse(raw);
  const repo = getWritableRepository();
  const source = SourceDocument.parse({
    id: newId("src"),
    projectId,
    name: input.name,
    type: input.type,
    category: input.category,
    confidentiality: input.confidentiality,
    participantRef: input.participantRef || undefined,
    extractedText: input.extractedText,
    processingStatus: "READY",
    createdAt: new Date().toISOString(),
  });
  const created = await repo.createSource(source);
  revalidatePath(`/studio/projects/${projectId}`);
  revalidatePath(`/studio/projects/${projectId}/sources`);
  return { sourceId: created.id };
}

export async function deleteSourceAction(
  projectId: string,
  sourceId: string,
): Promise<void> {
  const repo = getWritableRepository();
  await repo.deleteSource(sourceId);
  revalidatePath(`/studio/projects/${projectId}`);
  revalidatePath(`/studio/projects/${projectId}/sources`);
}
