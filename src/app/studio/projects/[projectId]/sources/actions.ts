"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getWritableRepository } from "@/lib/persona-studio/repository";
import { requireWriteAccess } from "@/lib/persona-studio/auth/access";
import { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import {
  ConfidentialityLabel,
  SourceCategory,
} from "@/lib/persona-studio/ai/schemas/common";
import { newId } from "@/lib/persona-studio/utils/persona-factory";
import { extractTextFromUpload } from "@/lib/persona-studio/ai/ingestion/extract-text";

/**
 * Source-management write actions. Sources carry a confidentiality label and an
 * optional anonymous participant reference only — never a real participant name
 * (see SECURITY.md). Uploads are extracted → chunked into EvidenceItems by the
 * repository for keyword grounding.
 */

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB

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
  await requireWriteAccess();
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

export async function uploadSourceAction(
  projectId: string,
  formData: FormData,
): Promise<{ sourceId: string; warning?: string; chunkHint?: string }> {
  await requireWriteAccess();

  const file = formData.get("file");
  if (!(file instanceof File)) {
    throw new Error("No file uploaded.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("File too large (max 8 MB).");
  }

  const category = SourceCategory.parse(
    String(formData.get("category") || "INTERVIEW"),
  );
  const confidentiality = ConfidentialityLabel.parse(
    String(formData.get("confidentiality") || "INTERNAL"),
  );
  const participantRef =
    String(formData.get("participantRef") || "").trim() || undefined;
  const nameOverride = String(formData.get("name") || "").trim();

  const buffer = Buffer.from(await file.arrayBuffer());
  const extracted = await extractTextFromUpload({
    buffer,
    filename: file.name,
    mimeType: file.type,
  });

  if (!extracted.text.trim()) {
    throw new Error(
      extracted.warning ?? "Could not extract text from this file.",
    );
  }

  const repo = getWritableRepository();
  const source = SourceDocument.parse({
    id: newId("src"),
    projectId,
    name: nameOverride || file.name,
    type: extracted.type,
    category,
    confidentiality,
    participantRef,
    extractedText: extracted.text,
    processingStatus: "READY",
    createdAt: new Date().toISOString(),
  });
  const created = await repo.createSource(source);
  revalidatePath(`/studio/projects/${projectId}`);
  revalidatePath(`/studio/projects/${projectId}/sources`);
  return {
    sourceId: created.id,
    warning: extracted.warning,
  };
}

export async function deleteSourceAction(
  projectId: string,
  sourceId: string,
): Promise<void> {
  await requireWriteAccess();
  const repo = getWritableRepository();
  await repo.deleteSource(sourceId);
  revalidatePath(`/studio/projects/${projectId}`);
  revalidatePath(`/studio/projects/${projectId}/sources`);
}
