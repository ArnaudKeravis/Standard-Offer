# Persona Studio — AI Grounding

AI in Persona Studio is a **research-grounded simulation**, never a source of
truth. This document defines the guarantees. (Phase 1 ships no live AI; these
contracts are already encoded in the schemas so later phases can only comply.)

## Hard guarantees

1. **Structured output only.** Every AI workflow returns Zod-validated
   structured data — never Markdown to be parsed. See
   `src/lib/persona-studio/ai/schemas/chat.ts`.
2. **Server-side only.** OpenAI (Responses API) is called from server code; the
   API key is read via `validation/env.ts` and never exposed to the browser.
3. **Traceable answers.** Every chat response carries a `basis` object listing
   the persona statement IDs, source IDs, evidence excerpts, assumptions used,
   missing information and a confidence level.
4. **Insufficient-evidence behaviour.** When the persona lacks data, the
   assistant must say so verbatim — "I do not have enough evidence in this
   persona to answer that confidently." — and may offer a clearly labelled
   hypothesis plus one research question. It must never fill the gap with
   demographic stereotypes.
5. **No invention.** The persona must not invent biography, statistics, brand
   preferences, medical info, income, satisfaction scores, past experiences,
   quotes or operational facts unless present in the source material.

## Chat context assembly (Phase 3)

`selected persona structured data → linked evidence excerpts → current journey
stage → current scenario → previous turns`.

Evidence hierarchy: **direct evidence → composite research theme → explicit
persona assumption → unknown.**

## Services (Phase 3/5, behind interfaces)

`analyseResearchSources`, `generateBehaviouralClusters`,
`generatePersonaFromCluster`, `auditPersona`, `comparePersonas`,
`simulatePersonaResponse`, `evaluateIdeaAgainstPersonas`,
`generateWorkshopSynthesis`.

## Prompts

System prompts live in versioned files under
`src/lib/persona-studio/ai/prompts/` — never inline in route handlers or UI
components. The persona chat and auditor prompts are specified verbatim in the
product brief and will be committed there in Phase 3.

## Retrieval

MVP: keyword + metadata filtering scoped to the project. Production: document
chunks + embeddings in Postgres/pgvector, returning source IDs with each
response. The retriever is an interface so it is replaceable.
