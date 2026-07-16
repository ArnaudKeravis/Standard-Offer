import { NextResponse } from "next/server";
import { z } from "zod";
import { IdeaChallengeRequest } from "@/lib/persona-studio/ai/schemas/challenge-request";
import {
  ChallengeNotFoundError,
  runIdeaChallenge,
} from "@/lib/persona-studio/ai/services/idea-challenge-service";

/**
 * POST /api/ai/challenge — pressure-test an idea against selected personas.
 * Server-only boundary; structured Zod output; mock fallback when no API key.
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

  const parsed = IdeaChallengeRequest.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", issues: z.treeifyError(parsed.error) },
      { status: 400 },
    );
  }

  try {
    const result = await runIdeaChallenge(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ChallengeNotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    console.error("[idea-challenge] generation failed", error);
    return NextResponse.json(
      { error: "Failed to evaluate the idea against personas." },
      { status: 502 },
    );
  }
}
