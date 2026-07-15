import { getEnv } from "@/lib/persona-studio/validation/env";
import { MockPersonaChatProvider } from "./mock-provider";
import { OpenAIPersonaChatProvider } from "./openai-provider";
import type { PersonaChatProvider } from "./types";

/**
 * Provider selection.
 *
 * When OPENAI_API_KEY is configured (server-side, via validation/env.ts) the
 * OpenAI provider is used; otherwise the deterministic, grounded mock keeps the
 * feature fully working in dev/demo without any secret. Callers depend only on
 * the {@link PersonaChatProvider} interface.
 */
export function getPersonaChatProvider(): PersonaChatProvider {
  const { OPENAI_API_KEY } = getEnv();
  if (OPENAI_API_KEY) {
    return new OpenAIPersonaChatProvider(OPENAI_API_KEY);
  }
  return new MockPersonaChatProvider();
}

export type { PersonaChatProvider, PersonaChatInput } from "./types";
export { MockPersonaChatProvider } from "./mock-provider";
export { OpenAIPersonaChatProvider } from "./openai-provider";
