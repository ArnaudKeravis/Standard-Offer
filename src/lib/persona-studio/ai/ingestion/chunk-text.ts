import type { EvidenceItem } from "@/lib/persona-studio/ai/schemas/evidence";
import { newId } from "@/lib/persona-studio/utils/persona-factory";

/**
 * Split extracted source text into retrievable evidence chunks.
 *
 * Prefer paragraph boundaries; fall back to soft length windows so long
 * interview dumps still produce useful retrieval units without inventing
 * content.
 */

export interface ChunkOptions {
  /** Soft max characters per chunk. */
  maxChars?: number;
  /** Overlap between consecutive windows when forced to split. */
  overlap?: number;
}

export function chunkText(
  text: string,
  options: ChunkOptions = {},
): string[] {
  const maxChars = options.maxChars ?? 900;
  const overlap = options.overlap ?? 80;
  const normalised = text.replace(/\r\n/g, "\n").trim();
  if (!normalised) return [];

  const paragraphs = normalised
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let buffer = "";

  const flush = () => {
    const piece = buffer.trim();
    if (piece) chunks.push(piece);
    buffer = "";
  };

  for (const para of paragraphs) {
    if (para.length > maxChars) {
      flush();
      for (const window of splitLong(para, maxChars, overlap)) {
        chunks.push(window);
      }
      continue;
    }
    if (!buffer) {
      buffer = para;
      continue;
    }
    if (buffer.length + 1 + para.length <= maxChars) {
      buffer = `${buffer}\n\n${para}`;
    } else {
      flush();
      buffer = para;
    }
  }
  flush();
  return chunks;
}

function splitLong(text: string, maxChars: number, overlap: number): string[] {
  const out: string[] = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + maxChars, text.length);
    out.push(text.slice(start, end).trim());
    if (end >= text.length) break;
    start = Math.max(end - overlap, start + 1);
  }
  return out.filter(Boolean);
}

/** Build EvidenceItem rows for a source document. */
export function evidenceItemsFromText(args: {
  projectId: string;
  sourceId: string;
  text: string;
  createdAt?: string;
  options?: ChunkOptions;
}): EvidenceItem[] {
  const createdAt = args.createdAt ?? new Date().toISOString();
  return chunkText(args.text, args.options).map((content) => ({
    id: newId("ev"),
    projectId: args.projectId,
    sourceId: args.sourceId,
    content,
    tags: [],
    createdAt,
  }));
}
