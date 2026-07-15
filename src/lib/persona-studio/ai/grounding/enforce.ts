import { PersonaChatResponse } from "@/lib/persona-studio/ai/schemas/chat";
import {
  groundedIdSets,
  type PersonaGroundingContext,
} from "./persona-context";

/**
 * Grounding-enforcement net (provider-agnostic, dependency-free so it is unit
 * testable).
 *
 * It removes any ids not present in the grounding context, and drops excerpts
 * whose source is not part of the persona. This makes the "cite only your own
 * evidence" guarantee true regardless of which provider produced the answer —
 * a misbehaving model can never cause the UI to show a citation to evidence the
 * persona does not own.
 */
export function enforceGrounding(
  response: PersonaChatResponse,
  context: PersonaGroundingContext,
): PersonaChatResponse {
  const { statementIds, sourceIds } = groundedIdSets(context);

  const cleaned = {
    ...response,
    basis: {
      ...response.basis,
      personaStatementIds: response.basis.personaStatementIds.filter((id) =>
        statementIds.has(id),
      ),
      sourceIds: response.basis.sourceIds.filter((id) => sourceIds.has(id)),
      evidenceExcerpts: response.basis.evidenceExcerpts.filter((e) =>
        sourceIds.has(e.sourceId),
      ),
    },
  };

  // Re-validate so callers always receive a schema-valid object.
  return PersonaChatResponse.parse(cleaned);
}
