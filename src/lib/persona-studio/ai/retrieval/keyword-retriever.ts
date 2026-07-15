import type { PersonaGroundingContext } from "@/lib/persona-studio/ai/grounding/persona-context";
import type {
  EvidenceRetriever,
  RetrieveOptions,
  RetrievedStatement,
} from "./types";

/**
 * Transparent keyword + metadata retriever (MVP).
 *
 * It is intentionally explainable: a facilitator can see why a statement was
 * used. It normalises accents/casing (so "attente" matches "l'attente"),
 * removes stopwords, and scores each statement by how many query terms it (or
 * its section title / label) contains, lightly boosting direct EVIDENCE and
 * higher-confidence statements. Nothing is ever pulled from outside the given
 * persona context.
 */

const STOPWORDS = new Set<string>([
  // English
  "the", "a", "an", "and", "or", "but", "of", "to", "in", "on", "for", "with",
  "is", "are", "was", "were", "be", "been", "do", "does", "did", "how", "what",
  "why", "when", "where", "who", "which", "you", "your", "i", "me", "my", "we",
  "it", "this", "that", "these", "those", "at", "by", "as", "about", "would",
  "can", "could", "will", "should", "have", "has", "had", "not", "so", "if",
  // French
  "le", "la", "les", "un", "une", "des", "du", "de", "et", "ou", "mais", "que",
  "qui", "quoi", "quel", "quelle", "quels", "quelles", "comment", "pourquoi",
  "quand", "ou", "est", "sont", "etre", "avez", "vous", "votre", "vos", "je",
  "mon", "ma", "mes", "nous", "notre", "nos", "ce", "cet", "cette", "ces",
  "pour", "avec", "dans", "sur", "au", "aux", "en", "ne", "pas", "se", "sa",
  "son", "ses", "il", "elle", "on", "y", "a", "plus", "tres", "bien", "fait",
]);

/** Lowercase, strip accents/diacritics, and remove punctuation. */
export function normalise(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Split text into meaningful, de-duplicated tokens. */
export function tokenize(input: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const token of normalise(input).split(" ")) {
    if (token.length < 3) continue;
    if (STOPWORDS.has(token)) continue;
    if (seen.has(token)) continue;
    seen.add(token);
    out.push(token);
  }
  return out;
}

const EVIDENCE_BOOST: Record<string, number> = {
  EVIDENCE: 1.5,
  ASSUMPTION: 1.0,
  TO_VALIDATE: 0.9,
};

const CONFIDENCE_BOOST: Record<string, number> = {
  HIGH: 1.3,
  MEDIUM: 1.0,
  LOW: 0.8,
};

export class KeywordEvidenceRetriever implements EvidenceRetriever {
  readonly id = "keyword-metadata-v1";

  retrieve(
    query: string,
    context: PersonaGroundingContext,
    options: RetrieveOptions = {},
  ): RetrievedStatement[] {
    const limit = options.limit ?? 6;
    const minScore = options.minScore ?? 0.0001;
    const terms = tokenize(query);
    if (terms.length === 0) return [];

    const ranked = context.statements
      .map((statement) => {
        // Field-weighted matching: a hit in the statement's own content counts
        // far more than a hit in its section title, so the most on-topic
        // evidence ranks above statements that merely share a section heading.
        const contentHay = normalise(
          [statement.content, statement.label ?? ""].join(" "),
        );
        const excerptHay = normalise(
          statement.excerpts.map((e) => e.excerpt).join(" "),
        );
        const metaHay = normalise(
          [statement.sectionTitle, statement.sectionKey.replace(/_/g, " ")].join(
            " ",
          ),
        );

        let matched = 0;
        let weight = 0;
        for (const term of terms) {
          if (contentHay.includes(term)) {
            weight += 1;
            matched += 1;
          } else if (excerptHay.includes(term)) {
            weight += 0.8;
            matched += 1;
          } else if (metaHay.includes(term)) {
            weight += 0.3;
            matched += 1;
          }
        }
        if (matched === 0) return { statement, score: 0 };
        const score =
          (weight / terms.length) *
          (EVIDENCE_BOOST[statement.evidenceStatus] ?? 1) *
          (CONFIDENCE_BOOST[statement.confidence] ?? 1);
        return { statement, score };
      })
      .filter((r) => r.score >= minScore)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        // Deterministic tie-break: EVIDENCE first, then id.
        const rank = (s: string) =>
          s === "EVIDENCE" ? 0 : s === "ASSUMPTION" ? 1 : 2;
        const byStatus =
          rank(a.statement.evidenceStatus) - rank(b.statement.evidenceStatus);
        if (byStatus !== 0) return byStatus;
        return a.statement.id.localeCompare(b.statement.id);
      });

    return ranked.slice(0, limit);
  }
}

/** Default retriever instance (swap for pgvector in Phase 5). */
export const defaultRetriever: EvidenceRetriever = new KeywordEvidenceRetriever();
