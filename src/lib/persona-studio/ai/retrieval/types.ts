import type {
  GroundingStatement,
  PersonaGroundingContext,
} from "@/lib/persona-studio/ai/grounding/persona-context";

/**
 * Retrieval is deliberately behind an interface. The MVP ships a transparent
 * keyword/metadata retriever scoped to a single persona's own evidence; Phase 5
 * swaps in a pgvector-backed retriever returning the same shape, with no change
 * to the providers or service that consume it.
 */

export interface RetrievedStatement {
  statement: GroundingStatement;
  /** Non-negative relevance score; higher is more relevant. */
  score: number;
}

export interface RetrieveOptions {
  /** Max statements to return. */
  limit?: number;
  /** Minimum score to keep a statement. */
  minScore?: number;
}

export interface EvidenceRetriever {
  readonly id: string;
  /**
   * Rank the persona's statements by relevance to `query`, scoped strictly to
   * the given grounding context (never across personas or projects).
   */
  retrieve(
    query: string,
    context: PersonaGroundingContext,
    options?: RetrieveOptions,
  ): RetrievedStatement[];
}
