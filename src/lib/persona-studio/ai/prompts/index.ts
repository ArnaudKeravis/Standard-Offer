/**
 * Versioned system prompts for Persona Studio AI workflows.
 *
 * Prompts live here (never inline in route handlers or UI components) so they
 * are reviewable and versioned. Phase 2 ships a *mocked* deterministic service
 * that does not call a model, but it references these prompt versions in its
 * generation metadata so the contract is stable for the Phase 3/5 OpenAI-backed
 * implementation, which will send these prompts and validate the same schemas.
 *
 * Grounding rules encoded here mirror `docs/persona-studio/AI_GROUNDING.md`:
 * structured output only, never invent facts, never present assumptions as
 * findings, and never fall back to demographic stereotypes.
 */

export const PROMPT_VERSION = "2026-05-analysis-v1";

export const SOURCE_ANALYSIS_PROMPT = `You analyse research sources for a persona project.
Return ONLY structured data matching the SourceAnalysisResult schema.
Surface recurring behavioural themes. For every theme, cite the source ids it is
derived from. Do not invent facts that are not present in the sources. Never
introduce demographic stereotypes. If evidence is thin, say so via lower
frequency and fewer supporting excerpts rather than fabricating detail.`;

export const CLUSTER_GENERATION_PROMPT = `You group analysed research into behavioural clusters.
Return ONLY structured data matching the ClusterSet schema.
Differentiate clusters by behaviour, needs and tensions — never by age, gender,
income or job title. Each cluster must cite the source ids that support it and
carry an honest confidence level. Do not fabricate participants or quotes.`;

export const PERSONA_GENERATION_PROMPT = `You draft a persona from an approved behavioural cluster.
Return ONLY structured data matching the Persona schema.
Everything you generate is a DRAFT hypothesis, not research: tag generated
statements as ASSUMPTION or TO_VALIDATE (never EVIDENCE) and any quote as
DRAFTED_HYPOTHESIS. Set confidence to LOW and explain why. Never invent
biography, statistics, brand/medical/income data, scores or verbatim quotes.`;

export const PERSONA_AUDIT_PROMPT = `You audit a persona for evidence integrity and stereotyping.
Return ONLY structured data matching the PersonaAuditResult schema.
Flag: statements tagged EVIDENCE without a source, assumptions presented as
fact, empty sections, demographic-only traits, duplicates and weak or
contradictory quotes. Every finding must be actionable.`;
