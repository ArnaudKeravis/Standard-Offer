import type { StudioLang } from "@/lib/persona-studio/utils/i18n";

/**
 * Localised copy for the Phase 4 workshop features (Compare, Presentation,
 * Idea Challenge, Workshop Board).
 *
 * Kept in its own module — deliberately NOT merged into the shared `i18n.ts`
 * dictionary — so this feature set stays additive and never collides with the
 * concurrent multilingual work on `i18n.ts`. Every string here is UI chrome or
 * derivation scaffolding; persona *content* always comes from the (source
 * language) seed data, resolved by the repository.
 */

const WORKSHOP_UI = {
  en: {
    // Entry points / hub
    workshopTools: "Workshop tools",
    workshopToolsIntro:
      "Facilitator surfaces built from the same evidence — compare, present, pressure-test ideas and run a board.",
    compare: "Compare",
    compareDesc: "Set personas side by side",
    present: "Present",
    presentDesc: "Full-screen workshop view",
    challenge: "Challenge an idea",
    challengeDesc: "Pressure-test against personas",
    workshopBoard: "Workshop board",
    workshopBoardDesc: "Notes, votes & synthesis",

    // Simulation framing (shared)
    simulationNotTruth: "Simulation, not truth",
    derivedNote:
      "Everything below is derived only from the personas’ own evidenced statements — never invented. Treat divergences as prompts to explore, not findings.",

    // Compare
    compareTitle: "Compare personas",
    compareIntro:
      "Select 2–5 personas to compare side by side. The comparison is derived from their structured statements.",
    selectPersonas: "Select personas",
    selectedCount: "selected",
    compareMin: "Select at least two personas to compare.",
    compareMax: "You can compare up to five personas at once.",
    clearSelection: "Clear",
    compareCta: "Compare",
    dimensionGoals: "Goals & motivations",
    dimensionNeeds: "Needs & expectations",
    dimensionFrustrations: "Frustrations",
    dimensionBehaviours: "Behaviours & context",
    dimensionFood: "Food & hospitality",
    dimensionMoments: "Key moments",
    dimensionConfidence: "Confidence & coverage",
    similarities: "Similarities",
    universalNeeds: "Universal needs",
    universalNeedsDesc:
      "Need themes every selected persona shows evidence for — the safest design bets.",
    differentiators: "Differentiators",
    differentiatorsDesc:
      "Themes evidenced for some personas but not others — personalise or segment here.",
    designTensions: "Design tensions to explore",
    designTensionsDesc:
      "Where personas pull in different directions. Labelled prompts, not conclusions.",
    conflictingNeeds: "Conflicting needs",
    opportunityAreas: "Opportunity areas",
    opportunityAreasDesc:
      "Need themes several personas share — a single improvement serves more than one at once.",
    sharedTags: "Shared behavioural traits",
    coveredBy: "Evidenced for",
    absentFor: "No evidence for",
    prioritisedBy: "Strongly evidenced for",
    noSharedTags: "No behavioural tags are shared across the selection.",
    noUniversalNeeds:
      "No need theme is evidenced across every selected persona yet.",
    noDifferentiators:
      "The selected personas cover the same need themes — differentiation is elsewhere.",
    noTensions:
      "No sharp coverage divergences detected across the selected personas.",
    noOpportunities:
      "No frustrations are shared across the selection to consolidate yet.",
    noStatements: "No evidenced statements for this theme.",
    backToProject: "Back to project",
    presentSelection: "Present selection",
    challengeSelection: "Challenge with selection",

    // Presentation
    presentTitle: "Presentation mode",
    exitPresent: "Exit",
    prevPersona: "Previous persona",
    nextPersona: "Next persona",
    facilitatorNotes: "Facilitator notes",
    showNotes: "Show notes",
    hideNotes: "Hide notes",
    notesHidden: "Notes are hidden from participants",
    askThisPersona: "Ask this persona",
    openCompare: "Compare all",
    personaOf: "of",
    whatToProbe: "What to probe",
    keyboardHint: "Use ← → to move between personas, Esc to exit.",
    noNotes: "No open questions recorded for this persona.",

    // Idea Challenge
    challengeTitle: "Challenge an idea",
    challengeIntro:
      "Describe an idea, then pressure-test it against the selected personas. Each reaction is a grounded simulation with its evidence basis — not a verdict.",
    ideaTitle: "Idea title",
    ideaTitlePlaceholder: "e.g. A roaming premium grab-and-go cart",
    ideaDescription: "Description",
    ideaDescriptionPlaceholder: "What is the idea, concretely?",
    journeyMoment: "Journey moment",
    journeyMomentPlaceholder: "When in the day does this happen?",
    intendedBenefit: "Intended benefit",
    intendedBenefitPlaceholder: "What problem is it meant to solve?",
    operationalConstraints: "Operational constraints",
    operationalConstraintsPlaceholder: "Budget, staffing, logistics, timing…",
    evaluateAgainst: "Evaluate against",
    runChallenge: "Challenge idea",
    challenging: "Evaluating against personas…",
    challengeError:
      "Something went wrong evaluating this idea. Please try again.",
    needIdeaTitle: "Add an idea title to continue.",
    needPersonas: "Select at least one persona to evaluate against.",
    perPersonaReactions: "Per-persona reactions",
    initialReaction: "Initial reaction",
    perceivedBenefit: "Perceived benefit",
    mainConcern: "Main concern",
    adoptionTrigger: "Adoption trigger",
    rejectionTrigger: "Rejection trigger",
    missingInformation: "Missing information",
    improvementRecommendation: "One improvement",
    evidenceBasis: "Evidence basis",
    crossPersonaSynthesis: "Cross-persona synthesis",
    universalStrengths: "Universal strengths",
    personaSpecificBenefits: "Persona-specific benefits",
    risks: "Risks",
    questionsToTest: "Questions to test with users",
    suggestedPrototype: "Suggested next prototype",
    reset: "New idea",
    none: "None",

    // Workshop board
    workshopTitle: "Workshop board",
    workshopIntro:
      "A lightweight board for the room: capture ideas, notes, assumptions and questions, assign them to personas, vote, then synthesise.",
    boardPersonas: "Personas in the room",
    addNote: "Add",
    notePlaceholder: "Type a note, assumption, question or opportunity…",
    noteKind: "Type",
    kindNote: "Note",
    kindAssumption: "Assumption",
    kindQuestion: "Question",
    kindOpportunity: "Opportunity",
    assignTo: "Assign to",
    unassigned: "Unassigned",
    votes: "votes",
    vote: "Vote",
    removeNote: "Remove",
    emptyBoard: "No notes yet. Add the first one above.",
    generateSynthesis: "Generate synthesis",
    synthesis: "Workshop synthesis",
    topVoted: "Top voted",
    openAssumptions: "Assumptions to validate",
    openQuestions: "Questions to answer",
    opportunities: "Opportunities",
    byPersona: "Notes by persona",
    clearBoard: "Clear board",
    clearBoardConfirm: "Clear the whole board? This cannot be undone.",
    synthesisEmpty:
      "Add a few notes and vote on them, then generate a synthesis.",
    noteCount: "notes",
  },
  fr: {
    // Entry points / hub
    workshopTools: "Outils d’atelier",
    workshopToolsIntro:
      "Des surfaces de facilitation construites à partir des mêmes preuves — comparer, présenter, éprouver des idées et animer un board.",
    compare: "Comparer",
    compareDesc: "Personas côte à côte",
    present: "Présenter",
    presentDesc: "Vue atelier plein écran",
    challenge: "Challenger une idée",
    challengeDesc: "Éprouver face aux personas",
    workshopBoard: "Board d’atelier",
    workshopBoardDesc: "Notes, votes & synthèse",

    // Simulation framing (shared)
    simulationNotTruth: "Une simulation, pas une vérité",
    derivedNote:
      "Tout ce qui suit est dérivé uniquement des affirmations étayées des personas — jamais inventé. Traitez les divergences comme des pistes à explorer, non comme des conclusions.",

    // Compare
    compareTitle: "Comparer les personas",
    compareIntro:
      "Sélectionnez 2 à 5 personas à comparer côte à côte. La comparaison est dérivée de leurs affirmations structurées.",
    selectPersonas: "Sélectionner les personas",
    selectedCount: "sélectionné(s)",
    compareMin: "Sélectionnez au moins deux personas à comparer.",
    compareMax: "Vous pouvez comparer jusqu’à cinq personas à la fois.",
    clearSelection: "Effacer",
    compareCta: "Comparer",
    dimensionGoals: "Objectifs & motivations",
    dimensionNeeds: "Besoins & attentes",
    dimensionFrustrations: "Frustrations",
    dimensionBehaviours: "Comportements & contexte",
    dimensionFood: "Restauration & hospitalité",
    dimensionMoments: "Moments clés",
    dimensionConfidence: "Confiance & couverture",
    similarities: "Similitudes",
    universalNeeds: "Besoins universels",
    universalNeedsDesc:
      "Les thèmes de besoin étayés pour chaque persona sélectionné — les paris de conception les plus sûrs.",
    differentiators: "Facteurs de différenciation",
    differentiatorsDesc:
      "Thèmes étayés pour certains personas et pas d’autres — personnalisez ou segmentez ici.",
    designTensions: "Tensions de conception à explorer",
    designTensionsDesc:
      "Là où les personas tirent dans des directions différentes. Des pistes signalées, pas des conclusions.",
    conflictingNeeds: "Besoins en tension",
    opportunityAreas: "Zones d’opportunité",
    opportunityAreasDesc:
      "Des thèmes de besoin partagés par plusieurs personas — une seule amélioration en sert plus d’un.",
    sharedTags: "Traits comportementaux partagés",
    coveredBy: "Étayé pour",
    absentFor: "Aucune preuve pour",
    prioritisedBy: "Fortement étayé pour",
    noSharedTags:
      "Aucun tag comportemental n’est partagé au sein de la sélection.",
    noUniversalNeeds:
      "Aucun thème de besoin n’est encore étayé pour tous les personas sélectionnés.",
    noDifferentiators:
      "Les personas sélectionnés couvrent les mêmes thèmes de besoin — la différenciation est ailleurs.",
    noTensions:
      "Aucune divergence de couverture marquée détectée entre les personas sélectionnés.",
    noOpportunities:
      "Aucune frustration partagée à consolider dans la sélection pour l’instant.",
    noStatements: "Aucune affirmation étayée pour ce thème.",
    backToProject: "Retour au projet",
    presentSelection: "Présenter la sélection",
    challengeSelection: "Challenger avec la sélection",

    // Presentation
    presentTitle: "Mode présentation",
    exitPresent: "Quitter",
    prevPersona: "Persona précédent",
    nextPersona: "Persona suivant",
    facilitatorNotes: "Notes du facilitateur",
    showNotes: "Afficher les notes",
    hideNotes: "Masquer les notes",
    notesHidden: "Les notes sont masquées pour les participants",
    askThisPersona: "Parler à ce persona",
    openCompare: "Tout comparer",
    personaOf: "sur",
    whatToProbe: "À approfondir",
    keyboardHint:
      "Utilisez ← → pour naviguer entre les personas, Échap pour quitter.",
    noNotes: "Aucune question ouverte enregistrée pour ce persona.",

    // Idea Challenge
    challengeTitle: "Challenger une idée",
    challengeIntro:
      "Décrivez une idée, puis éprouvez-la face aux personas sélectionnés. Chaque réaction est une simulation fondée sur les preuves, avec sa base de recherche — et non un verdict.",
    ideaTitle: "Titre de l’idée",
    ideaTitlePlaceholder: "ex. Un chariot premium itinérant à emporter",
    ideaDescription: "Description",
    ideaDescriptionPlaceholder: "En quoi consiste l’idée, concrètement ?",
    journeyMoment: "Moment du parcours",
    journeyMomentPlaceholder: "À quel moment de la journée cela se produit-il ?",
    intendedBenefit: "Bénéfice visé",
    intendedBenefitPlaceholder: "Quel problème est-il censé résoudre ?",
    operationalConstraints: "Contraintes opérationnelles",
    operationalConstraintsPlaceholder: "Budget, personnel, logistique, timing…",
    evaluateAgainst: "Évaluer face à",
    runChallenge: "Challenger l’idée",
    challenging: "Évaluation face aux personas…",
    challengeError:
      "Une erreur est survenue lors de l’évaluation de cette idée. Veuillez réessayer.",
    needIdeaTitle: "Ajoutez un titre d’idée pour continuer.",
    needPersonas: "Sélectionnez au moins un persona pour l’évaluation.",
    perPersonaReactions: "Réactions par persona",
    initialReaction: "Réaction initiale",
    perceivedBenefit: "Bénéfice perçu",
    mainConcern: "Préoccupation principale",
    adoptionTrigger: "Déclencheur d’adoption",
    rejectionTrigger: "Déclencheur de rejet",
    missingInformation: "Informations manquantes",
    improvementRecommendation: "Une amélioration",
    evidenceBasis: "Base de recherche",
    crossPersonaSynthesis: "Synthèse inter-personas",
    universalStrengths: "Forces universelles",
    personaSpecificBenefits: "Bénéfices spécifiques par persona",
    risks: "Risques",
    questionsToTest: "Questions à tester avec les utilisateurs",
    suggestedPrototype: "Prochain prototype suggéré",
    reset: "Nouvelle idée",
    none: "Aucune",

    // Workshop board
    workshopTitle: "Board d’atelier",
    workshopIntro:
      "Un board léger pour la salle : capturez idées, notes, hypothèses et questions, attribuez-les à des personas, votez, puis synthétisez.",
    boardPersonas: "Personas dans la salle",
    addNote: "Ajouter",
    notePlaceholder: "Saisissez une note, hypothèse, question ou opportunité…",
    noteKind: "Type",
    kindNote: "Note",
    kindAssumption: "Hypothèse",
    kindQuestion: "Question",
    kindOpportunity: "Opportunité",
    assignTo: "Attribuer à",
    unassigned: "Non attribué",
    votes: "votes",
    vote: "Voter",
    removeNote: "Retirer",
    emptyBoard: "Aucune note pour l’instant. Ajoutez la première ci-dessus.",
    generateSynthesis: "Générer la synthèse",
    synthesis: "Synthèse de l’atelier",
    topVoted: "Les plus votées",
    openAssumptions: "Hypothèses à valider",
    openQuestions: "Questions à répondre",
    opportunities: "Opportunités",
    byPersona: "Notes par persona",
    clearBoard: "Vider le board",
    clearBoardConfirm: "Vider tout le board ? Action irréversible.",
    synthesisEmpty:
      "Ajoutez quelques notes et votez, puis générez une synthèse.",
    noteCount: "notes",
  },
} satisfies Record<StudioLang, Record<string, string>>;

export type WorkshopUIKey = keyof (typeof WORKSHOP_UI)["en"];

export function tWorkshop(lang: StudioLang, key: WorkshopUIKey): string {
  return WORKSHOP_UI[lang][key];
}
