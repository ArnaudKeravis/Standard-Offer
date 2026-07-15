import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { PersonaSection } from "@/lib/persona-studio/ai/schemas/section";
import type { PersonaStatement } from "@/lib/persona-studio/ai/schemas/statement";
import type {
  AuditFinding,
  PersonaAuditResult,
} from "@/lib/persona-studio/ai/schemas/chat";

/**
 * Deterministic persona review / anti-stereotype audit.
 *
 * This is a transparent, rule-based check — not an AI call — so a facilitator
 * can always explain why something was flagged. It powers both the wizard's
 * "review & validate" step and the editor's review panel, and it is the
 * implementation the mocked {@link PersonaAiService.auditPersona} delegates to.
 *
 * It flags: unsupported "evidence" (tagged EVIDENCE but no source), statements
 * left as assumptions, empty sections (missing evidence), demographic-only
 * traits (potential stereotypes), duplicate statements and weak/contradictory
 * quotes. Every finding is actionable.
 */

/** Categories used to group findings in the UI. Encoded in the reason text. */
export type ReviewCategory =
  | "UNSUPPORTED_EVIDENCE"
  | "ASSUMPTION"
  | "MISSING_EVIDENCE"
  | "POTENTIAL_STEREOTYPE"
  | "DUPLICATE"
  | "WEAK_QUOTE";

export interface ReviewFinding extends AuditFinding {
  category: ReviewCategory;
}

export interface PersonaReview extends PersonaAuditResult {
  findings: ReviewFinding[];
}

const DEMOGRAPHIC_WORDS = [
  "age",
  "gender",
  "male",
  "female",
  "young",
  "old",
  "married",
  "single",
  "income",
  "salary",
  "wealthy",
  "rich",
  "poor",
  "âge",
  "jeune",
  "vieux",
  "revenu",
  "riche",
  "marié",
  "célibataire",
];

function allSections(persona: Persona): PersonaSection[] {
  return [...persona.commonSections, ...persona.domainSections];
}

function allStatements(persona: Persona): PersonaStatement[] {
  return allSections(persona).flatMap((s) => s.statements);
}

function normalise(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Run the full review. Pure and deterministic. */
export function reviewPersona(persona: Persona): PersonaReview {
  const findings: ReviewFinding[] = [];
  let counter = 0;
  const nextId = () => `finding-${persona.id}-${counter++}`;

  const statements = allStatements(persona);

  // 1. Unsupported evidence: tagged EVIDENCE but cites no source.
  for (const s of statements) {
    if (s.evidenceStatus === "EVIDENCE" && s.sourceIds.length === 0) {
      findings.push({
        id: nextId(),
        category: "UNSUPPORTED_EVIDENCE",
        result: "FAIL",
        severity: "HIGH",
        problematicStatement: s.content,
        reason:
          "Marked as EVIDENCE but has no linked source. Evidence must be traceable to a source.",
        suggestedCorrection:
          "Link a supporting source, or re-tag as ASSUMPTION or TO_VALIDATE.",
        evidenceRequired: "A source document excerpt that backs this statement.",
      });
    }
  }

  // 2. Assumptions surfaced (informational — they are allowed, but visible).
  for (const s of statements) {
    if (s.evidenceStatus === "ASSUMPTION") {
      findings.push({
        id: nextId(),
        category: "ASSUMPTION",
        result: "WARN",
        severity: "LOW",
        problematicStatement: s.content,
        reason:
          "This is an assumption, not a research finding. It must never be presented as evidence.",
        suggestedCorrection:
          "Validate with research to promote to EVIDENCE, or keep clearly labelled as an assumption.",
        evidenceRequired: "Research that confirms or refutes the assumption.",
      });
    }
  }

  // 3. Missing evidence: visible sections with no statements.
  for (const section of allSections(persona)) {
    if (section.visible && section.statements.length === 0) {
      findings.push({
        id: nextId(),
        category: "MISSING_EVIDENCE",
        result: "WARN",
        severity: "MEDIUM",
        problematicStatement: `Section "${section.title}" is empty.`,
        reason: "A visible section has no statements, leaving a gap in the persona.",
        suggestedCorrection:
          "Add at least one statement, hide the section, or remove it.",
        evidenceRequired: "Research covering this aspect of the persona.",
      });
    }
  }

  // 4. Potential stereotype: demographic traits without a behavioural rationale.
  const demo = persona.demographicContext;
  const hasDemographics = Boolean(
    demo.ageRange || demo.incomeLevel || demo.authorityLevel,
  );
  if (hasDemographics && !demo.relevanceNote) {
    findings.push({
      id: nextId(),
      category: "POTENTIAL_STEREOTYPE",
      result: "WARN",
      severity: "MEDIUM",
      problematicStatement: "Demographic traits recorded without a relevance note.",
      reason:
        "Personas are behaviour-first. Demographics without an explanation of why they matter behaviourally risk becoming stereotypes.",
      suggestedCorrection:
        "Add a relevance note explaining how these traits shape behaviour, or remove them.",
      evidenceRequired: "Evidence that the demographic trait drives behaviour.",
    });
  }
  for (const tag of persona.behaviouralTags) {
    if (DEMOGRAPHIC_WORDS.some((w) => normalise(tag).includes(w))) {
      findings.push({
        id: nextId(),
        category: "POTENTIAL_STEREOTYPE",
        result: "WARN",
        severity: "LOW",
        problematicStatement: `Behavioural tag "${tag}" looks demographic.`,
        reason:
          "Behavioural tags should describe behaviour, needs or tensions — not age, gender, income or marital status.",
        suggestedCorrection: "Replace with a behaviour-based tag.",
        evidenceRequired: "—",
      });
    }
  }

  // 5. Duplicates: statements whose normalised content matches another.
  const seen = new Map<string, string>();
  for (const s of statements) {
    const key = normalise(s.content);
    if (key.length === 0) continue;
    if (seen.has(key)) {
      findings.push({
        id: nextId(),
        category: "DUPLICATE",
        result: "WARN",
        severity: "LOW",
        problematicStatement: s.content,
        reason: "This statement duplicates another statement in the persona.",
        suggestedCorrection: "Merge or remove the duplicate.",
        evidenceRequired: "—",
      });
    } else {
      seen.set(key, s.id);
    }
  }

  // 6. Weak or contradictory quote.
  if (persona.quote.trim().length > 0 && persona.quoteType === "NONE") {
    findings.push({
      id: nextId(),
      category: "WEAK_QUOTE",
      result: "WARN",
      severity: "MEDIUM",
      problematicStatement: persona.quote,
      reason:
        'A quote is shown but its type is "NONE", which is contradictory.',
      suggestedCorrection:
        "Set the correct quote type (verbatim, composite or drafted hypothesis).",
      evidenceRequired: "The interview or source the quote comes from.",
    });
  }
  if (persona.quoteType === "DRAFTED_HYPOTHESIS" && persona.quote.trim().length > 0) {
    findings.push({
      id: nextId(),
      category: "WEAK_QUOTE",
      result: "WARN",
      severity: "LOW",
      problematicStatement: persona.quote,
      reason:
        "This quote is a drafted hypothesis, not a real participant quote. It must stay labelled as such.",
      suggestedCorrection:
        "Validate against a real quote to upgrade it, or keep it clearly labelled.",
      evidenceRequired: "A verbatim or composite quote from research.",
    });
  }

  const overall: PersonaAuditResult["overall"] = findings.some(
    (f) => f.result === "FAIL",
  )
    ? "FAIL"
    : findings.some((f) => f.result === "WARN")
      ? "WARN"
      : "PASS";

  return { personaId: persona.id, findings, overall };
}

/** Count findings by category, for review summaries. */
export function summariseReview(
  review: PersonaReview,
): Record<ReviewCategory, number> {
  const base: Record<ReviewCategory, number> = {
    UNSUPPORTED_EVIDENCE: 0,
    ASSUMPTION: 0,
    MISSING_EVIDENCE: 0,
    POTENTIAL_STEREOTYPE: 0,
    DUPLICATE: 0,
    WEAK_QUOTE: 0,
  };
  for (const f of review.findings) base[f.category] += 1;
  return base;
}
