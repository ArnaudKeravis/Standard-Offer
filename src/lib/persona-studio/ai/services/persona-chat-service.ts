import { getRepository } from "@/lib/persona-studio/repository";
import type { PersonaChatResponse } from "@/lib/persona-studio/ai/schemas/chat";
import type { ChatTurn } from "@/lib/persona-studio/ai/schemas/chat-request";
import { buildPersonaGroundingContext } from "@/lib/persona-studio/ai/grounding/persona-context";
import { enforceGrounding } from "@/lib/persona-studio/ai/grounding/enforce";
import { defaultRetriever } from "@/lib/persona-studio/ai/retrieval/keyword-retriever";
import { getPersonaChatProvider } from "@/lib/persona-studio/ai/providers";

/**
 * Server-side orchestration for "Talk to a persona". Imported only by the route
 * handler (server), never by a client component.
 *
 * Responsibilities:
 * 1. Load the persona + its sources through the repository (never the client).
 * 2. Build the grounding context (persona's own evidence only).
 * 3. Ask the active provider (OpenAI or mock) for a structured answer.
 * 4. Enforce grounding as a hard safety net (see `enforceGrounding`).
 */

export interface RunPersonaChatArgs {
  projectId: string;
  personaId: string;
  question: string;
  scenario?: string;
  history?: ChatTurn[];
}

export interface RunPersonaChatResult {
  response: PersonaChatResponse;
  provider: string;
  isMock: boolean;
}

export class PersonaNotFoundError extends Error {}

export async function runPersonaChat(
  args: RunPersonaChatArgs,
): Promise<RunPersonaChatResult> {
  const repo = getRepository();
  const [project, persona] = await Promise.all([
    repo.getProject(args.projectId),
    repo.getPersona(args.personaId),
  ]);

  if (!project || !persona || persona.projectId !== project.id) {
    throw new PersonaNotFoundError("Persona not found for this project.");
  }

  const projectSources = await repo.listSources(project.id);
  const context = buildPersonaGroundingContext(
    persona,
    projectSources,
    project.language,
  );

  const provider = getPersonaChatProvider();
  const raw = await provider.generate({
    context,
    question: args.question,
    scenario: args.scenario,
    history: args.history ?? [],
    retriever: defaultRetriever,
  });

  const response = enforceGrounding(raw, context);

  return { response, provider: provider.id, isMock: provider.isMock };
}
