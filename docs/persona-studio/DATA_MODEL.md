# Persona Studio — Data Model

All entities are defined as **Zod schemas** in
`src/lib/persona-studio/ai/schemas/` and re-exported as inferred types in
`src/types/persona-studio/`. Do not store flexible content as an unvalidated
text blob, and never weaken these schemas to make something pass.

## Grounding primitives (`common.ts`)

- `EvidenceStatus` = `EVIDENCE | ASSUMPTION | TO_VALIDATE`
- `ConfidenceLevel` = `HIGH | MEDIUM | LOW`
- `QuoteType` = `VERBATIM | COMPOSITE | DRAFTED_HYPOTHESIS | NONE`
- `PersonaFamily` = `CORPORATE | SPORTS_HOSPITALITY`
- `ResearchMode` = `RESEARCH_GROUNDED | PROTO_PERSONA`
- `SourceCategory`, `ConfidentialityLabel`, `SectionType`, `LifecycleStatus`

## Core content unit — `PersonaStatement`

```ts
{ id, label?, content, evidenceStatus, confidence, sourceIds[], sourceExcerpts?, editable }
```

Every meaningful persona claim is a statement, so it always carries its evidence
status, confidence and provenance.

## `PersonaSection`

```ts
{ id, key, title, type, statements[], order, visible, description? }
```

`type` drives rendering (`bullets | text | quote | metrics | moments | needs |
journey | custom`). Templates (`PersonaSectionTemplate`) describe sections
without content.

## `Persona`

Stable core (`id`, `name`, `archetype`, `category`, `family`, `oneLineEssence`,
`accentColor`, `quote` + `quoteType`, `confidenceLevel` +
`confidenceExplanation`, `evidenceCoverage`, `demographicContext`,
`behaviouralTags`, `sourceIds`, `status`, `version`, timestamps) plus flexible
`commonSections[]` and `domainSections[]`. `PersonaVersion` stores snapshots for
history/rollback.

## Other entities

`Project`, `User`, `PersonaTemplate`, `SourceDocument`, `EvidenceItem`
(pgvector-ready `embedding?`), `Journey` + `JourneyStep`,
`PersonaJourneyResponse`, `Conversation` + `Message`, `Workshop` + `WorkshopIdea`
+ `IdeaEvaluation` + `StickyNote`.

## AI output schemas (`chat.ts`)

- `PersonaChatResponse` — the mandated `{ personaResponse, basis{…},
  suggestedResearchQuestion }` structure for "Talk to a persona".
- `PersonaAuditResult` / `AuditFinding` — anti-stereotype audit output.

## Derived values (`utils/confidence.ts`)

- `computeEvidenceCoverage` = share of statements tagged `EVIDENCE` (0 when
  none).
- `suggestConfidence` = HIGH ≥ 0.6, MEDIUM ≥ 0.3, else LOW.
- Confidence is intentionally decoupled from coverage: a persona can be fully
  sourced yet LOW confidence for local applicability (see the Corporate seeds).
