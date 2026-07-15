import { NextResponse } from "next/server";
import { z } from "zod";
import { PersonaChatRequest } from "@/lib/persona-studio/ai/schemas/chat-request";
import {
  PersonaNotFoundError,
  runPersonaChat,
} from "@/lib/persona-studio/ai/services/persona-chat-service";

/**
 * POST /api/ai/chat — "Talk to a persona".
 *
 * Server-only boundary. The client posts a question (+ optional scenario and
 * prior turns); grounding is assembled here from the repository, so the browser
 * can never inject fabricated evidence, and no API key is ever exposed. Returns
 * a Zod-validated {@link PersonaChatResponse} plus which provider answered.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = PersonaChatRequest.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", issues: z.treeifyError(parsed.error) },
      { status: 400 },
    );
  }

  try {
    const result = await runPersonaChat(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof PersonaNotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    console.error("[persona-chat] generation failed", error);
    return NextResponse.json(
      { error: "Failed to generate a grounded answer." },
      { status: 502 },
    );
  }
}
