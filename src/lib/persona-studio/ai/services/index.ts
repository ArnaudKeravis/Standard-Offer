import type { PersonaAiService } from "./types";
import { MockPersonaAiService } from "./mock-service";

/**
 * Returns the active AI service implementation.
 *
 * Phase 2 always returns the deterministic mock. When `OPENAI_API_KEY` is
 * present (Phase 3/5) this factory will return the OpenAI-backed implementation
 * instead — callers (server actions only) never change.
 */
let cached: PersonaAiService | null = null;

export function getAiService(): PersonaAiService {
  if (!cached) {
    cached = new MockPersonaAiService();
  }
  return cached;
}

export type {
  PersonaAiService,
  AnalyseSourcesInput,
  GenerateClustersInput,
  GeneratePersonaInput,
} from "./types";
