import { PersonaChatResponse } from "@/lib/persona-studio/ai/schemas/chat";
import {
  PERSONA_CHAT_PROMPT_VERSION,
  buildPersonaChatSystemPrompt,
  buildPersonaChatUserPrompt,
} from "@/lib/persona-studio/ai/prompts/persona-chat";
import type { PersonaChatInput, PersonaChatProvider } from "./types";

/**
 * OpenAI provider using the Responses API with strict JSON-schema structured
 * output. Used only when OPENAI_API_KEY is configured. Server-side only — the
 * key is read from the environment here and never reaches the browser. The raw
 * model output is always re-validated against the Zod schema before returning.
 */

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-4o-2024-08-06";

/**
 * JSON Schema mirroring {@link PersonaChatResponse}, in the strict form the
 * Responses API requires (all properties required, additionalProperties:false).
 */
const RESPONSE_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    personaResponse: { type: "string" },
    basis: {
      type: "object",
      additionalProperties: false,
      properties: {
        personaStatementIds: { type: "array", items: { type: "string" } },
        sourceIds: { type: "array", items: { type: "string" } },
        evidenceExcerpts: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              sourceId: { type: "string" },
              excerpt: { type: "string" },
            },
            required: ["sourceId", "excerpt"],
          },
        },
        assumptionsUsed: { type: "array", items: { type: "string" } },
        missingInformation: { type: "array", items: { type: "string" } },
        confidence: { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] },
      },
      required: [
        "personaStatementIds",
        "sourceIds",
        "evidenceExcerpts",
        "assumptionsUsed",
        "missingInformation",
        "confidence",
      ],
    },
    suggestedResearchQuestion: { type: ["string", "null"] },
  },
  required: ["personaResponse", "basis", "suggestedResearchQuestion"],
} as const;

export class OpenAIPersonaChatProvider implements PersonaChatProvider {
  readonly id = `openai-responses:${PERSONA_CHAT_PROMPT_VERSION}`;
  readonly isMock = false;

  constructor(
    private readonly apiKey: string,
    private readonly model: string = process.env.PERSONA_STUDIO_OPENAI_MODEL ??
      DEFAULT_MODEL,
  ) {}

  async generate(input: PersonaChatInput): Promise<PersonaChatResponse> {
    const { context, question, scenario, history, retriever } = input;
    const retrieved = retriever.retrieve(question, context, { limit: 6 });

    const system = buildPersonaChatSystemPrompt(context);
    const user = buildPersonaChatUserPrompt({
      context,
      question,
      scenario,
      history,
      retrieved,
    });

    const res = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        input: [
          { role: "system", content: [{ type: "input_text", text: system }] },
          { role: "user", content: [{ type: "input_text", text: user }] },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "persona_chat_response",
            strict: true,
            schema: RESPONSE_JSON_SCHEMA,
          },
        },
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(
        `OpenAI request failed (${res.status}): ${detail.slice(0, 500)}`,
      );
    }

    const data: unknown = await res.json();
    const raw = extractOutputText(data);
    if (!raw) {
      throw new Error("OpenAI response contained no output text.");
    }

    // Re-validate against the Zod schema — the structured-output contract is
    // enforced on our side, not trusted from the model.
    return PersonaChatResponse.parse(JSON.parse(raw));
  }
}

/** Extract the assistant text from a Responses API payload. */
function extractOutputText(data: unknown): string | null {
  if (typeof data !== "object" || data === null) return null;
  const obj = data as Record<string, unknown>;

  // Convenience field returned by some responses.
  if (typeof obj.output_text === "string" && obj.output_text.length > 0) {
    return obj.output_text;
  }

  const output = obj.output;
  if (!Array.isArray(output)) return null;
  for (const item of output) {
    if (typeof item !== "object" || item === null) continue;
    const content = (item as Record<string, unknown>).content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (typeof part !== "object" || part === null) continue;
      const p = part as Record<string, unknown>;
      if (
        (p.type === "output_text" || p.type === "text") &&
        typeof p.text === "string"
      ) {
        return p.text;
      }
    }
  }
  return null;
}
