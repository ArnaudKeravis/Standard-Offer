import type { StudioLang } from "@/lib/persona-studio/utils/i18n";

/**
 * Localised copy for the persona chat surface (Phase 3).
 *
 * Kept separate from the shared `i18n.ts` dictionary so this feature stays
 * additive and does not collide with concurrent work on the view layer. Every
 * string here is UI chrome or grounding scaffolding — persona *content* still
 * comes from the (source-language) seed data.
 */

/**
 * The insufficient-evidence sentence the assistant must use verbatim when the
 * persona lacks data (see AI_GROUNDING.md). Localised per project language.
 */
export const INSUFFICIENT_EVIDENCE_SENTENCE: Record<StudioLang, string> = {
  en: "I do not have enough evidence in this persona to answer that confidently.",
  fr: "Je n'ai pas assez d'éléments de recherche dans ce persona pour répondre à cela avec certitude.",
};

const CHAT_UI = {
  en: {
    researchGroundedSimulation: "Research-grounded simulation",
    simulationDisclaimer:
      "This is a grounded simulation built only from this persona's evidence — not a real customer or employee.",
    starterHeading: "Try asking",
    scenarioLabel: "Scenario (optional)",
    scenarioPlaceholder:
      "Frame the situation, e.g. a specific stage day, a new service idea…",
    inputPlaceholder: "Ask this persona a question…",
    send: "Send",
    thinking: "Thinking…",
    researchBasis: "Research basis",
    showBasis: "Show research basis",
    hideBasis: "Hide research basis",
    evidenceUsed: "Evidence used",
    personaTraits: "Persona traits / statement IDs",
    sourceReferences: "Source references",
    assumptionsUsed: "Assumptions used",
    missingInformation: "Missing information",
    answerConfidence: "Confidence in this answer",
    suggestedResearch: "Suggested research question",
    emptyState:
      "Ask a question to start a grounded conversation with this persona.",
    error: "Something went wrong generating a grounded answer. Please try again.",
    clear: "Clear conversation",
    you: "You",
    none: "None",
    poweredByMock:
      "Demo mode — deterministic mock provider (no OpenAI key configured).",
    poweredByOpenAI: "Powered by OpenAI (research-grounded).",
  },
  fr: {
    researchGroundedSimulation: "Simulation fondée sur la recherche",
    simulationDisclaimer:
      "Ceci est une simulation fondée uniquement sur les preuves de ce persona — et non un vrai client ou collaborateur.",
    starterHeading: "Essayez de demander",
    scenarioLabel: "Scénario (facultatif)",
    scenarioPlaceholder:
      "Précisez la situation, ex. une journée d'étape précise, une nouvelle idée de service…",
    inputPlaceholder: "Posez une question à ce persona…",
    send: "Envoyer",
    thinking: "Réflexion…",
    researchBasis: "Base de recherche",
    showBasis: "Afficher la base de recherche",
    hideBasis: "Masquer la base de recherche",
    evidenceUsed: "Preuves utilisées",
    personaTraits: "Traits du persona / ID d'affirmations",
    sourceReferences: "Sources référencées",
    assumptionsUsed: "Hypothèses utilisées",
    missingInformation: "Informations manquantes",
    answerConfidence: "Confiance dans cette réponse",
    suggestedResearch: "Question de recherche suggérée",
    emptyState:
      "Posez une question pour démarrer une conversation fondée sur la recherche.",
    error:
      "Une erreur est survenue lors de la génération d'une réponse fondée. Veuillez réessayer.",
    clear: "Effacer la conversation",
    you: "Vous",
    none: "Aucune",
    poweredByMock:
      "Mode démo — fournisseur fictif déterministe (aucune clé OpenAI configurée).",
    poweredByOpenAI: "Propulsé par OpenAI (fondé sur la recherche).",
  },
} satisfies Record<StudioLang, Record<string, string>>;

export type ChatUIKey = keyof (typeof CHAT_UI)["en"];

export function tChat(lang: StudioLang, key: ChatUIKey): string {
  return CHAT_UI[lang][key];
}

/**
 * Generic, evidence-answerable starter questions. They are broad enough that
 * every persona has grounding to answer, and localised to the project language.
 */
export function starterQuestions(lang: StudioLang): string[] {
  if (lang === "fr") {
    return [
      "Qu'est-ce qui rend une journée réussie pour vous ?",
      "Qu'est-ce qui vous frustre le plus dans ce type d'expérience ?",
      "Quelles sont vos attentes les plus importantes ?",
      "Qu'attendez-vous de la restauration et de l'accueil ?",
    ];
  }
  return [
    "What makes a great day for you?",
    "What frustrates you most about this kind of experience?",
    "What are your most important expectations?",
    "What do you expect from food and hospitality?",
  ];
}

/** First-person lead-in used by the deterministic mock to frame grounded points. */
export function groundedLeadIn(lang: StudioLang): string {
  return lang === "fr" ? "Si je parle en mon nom" : "Speaking for myself";
}

/** Label prefixing a clearly-flagged hypothesis (never presented as evidence). */
export function hypothesisLabel(lang: StudioLang): string {
  return lang === "fr" ? "Hypothèse (à valider)" : "Hypothesis (to validate)";
}
