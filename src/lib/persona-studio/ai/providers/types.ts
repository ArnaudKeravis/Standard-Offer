import type { PersonaGroundingContext } from "@/lib/persona-studio/ai/grounding/persona-context";
import type { EvidenceRetriever } from "@/lib/persona-studio/ai/retrieval/types";
import type { ChatTurn } from "@/lib/persona-studio/ai/schemas/chat-request";
import type { PersonaChatResponse } from "@/lib/persona-studio/ai/schemas/chat";

/**
 * The AI provider abstraction for persona chat. Two implementations live behind
 * it: a deterministic, fully-grounded mock (default, no secrets) and an OpenAI
 * Responses-API provider (used when a key is configured). The service depends
 * only on this interface, so swapping providers never touches the UI or route.
 */
export interface PersonaChatInput {
  context: PersonaGroundingContext;
  question: string;
  scenario?: string;
  history: ChatTurn[];
  retriever: EvidenceRetriever;
}

export interface PersonaChatProvider {
  readonly id: string;
  /** True for the deterministic mock (surfaced to the UI as "demo mode"). */
  readonly isMock: boolean;
  generate(input: PersonaChatInput): Promise<PersonaChatResponse>;
}
