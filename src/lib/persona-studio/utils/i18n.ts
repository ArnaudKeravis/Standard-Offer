import type { ConfidenceLevel, EvidenceStatus, PersonaFamily, QuoteType } from "@/lib/persona-studio/ai/schemas/common";
import type {
  ConfidentialityLabel,
  LifecycleStatus,
  ResearchMode,
  SectionType,
  SourceCategory,
} from "@/lib/persona-studio/ai/schemas/common";
import type { Project, ProjectVisibility } from "@/lib/persona-studio/ai/schemas/project";

/**
 * Lightweight, per-project localisation for Persona Studio surfaces.
 *
 * Persona *content* is stored in its source language (see the seed data). This
 * dictionary translates the surrounding UI labels so a French project (e.g.
 * Tour de France) reads entirely in French while English projects stay English.
 * A full i18n framework can replace this later; the call sites already pass a
 * `StudioLang`.
 */
export type StudioLang = "en" | "fr";

/** Derive the display language from a project's `language` field. */
export function langFromLanguage(language: string | undefined): StudioLang {
  return language?.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export function langFromProject(project: Pick<Project, "language">): StudioLang {
  return langFromLanguage(project.language);
}

const CONFIDENCE: Record<StudioLang, Record<ConfidenceLevel, string>> = {
  en: { HIGH: "High confidence", MEDIUM: "Medium confidence", LOW: "Low confidence" },
  fr: { HIGH: "Confiance élevée", MEDIUM: "Confiance moyenne", LOW: "Confiance faible" },
};

const EVIDENCE: Record<StudioLang, Record<EvidenceStatus, string>> = {
  en: { EVIDENCE: "Evidence", ASSUMPTION: "Assumption", TO_VALIDATE: "To validate" },
  fr: { EVIDENCE: "Preuve", ASSUMPTION: "Hypothèse", TO_VALIDATE: "À valider" },
};

const QUOTE: Record<StudioLang, Record<QuoteType, string>> = {
  en: {
    VERBATIM: "Verbatim quote",
    COMPOSITE: "Composite quote",
    DRAFTED_HYPOTHESIS: "Drafted hypothesis — to validate",
    NONE: "No quote available",
  },
  fr: {
    VERBATIM: "Citation verbatim",
    COMPOSITE: "Citation composite",
    DRAFTED_HYPOTHESIS: "Hypothèse rédigée — à valider",
    NONE: "Aucune citation disponible",
  },
};

const FAMILY: Record<StudioLang, Record<PersonaFamily, string>> = {
  en: {
    CORPORATE: "Corporate workplace",
    SPORTS_HOSPITALITY: "Sports hospitality",
    WORK: "Work",
    HEAL: "Heal",
    LEARN: "Learn",
    PLAY: "Play",
  },
  fr: {
    CORPORATE: "Environnement de travail",
    SPORTS_HOSPITALITY: "Hospitalité sportive",
    WORK: "Work",
    HEAL: "Heal",
    LEARN: "Learn",
    PLAY: "Play",
  },
};

const STATUS: Record<StudioLang, Record<LifecycleStatus, string>> = {
  en: { DRAFT: "Draft", IN_REVIEW: "In review", PUBLISHED: "Published", ARCHIVED: "Archived" },
  fr: { DRAFT: "Brouillon", IN_REVIEW: "En revue", PUBLISHED: "Publié", ARCHIVED: "Archivé" },
};

const RESEARCH_MODE: Record<StudioLang, Record<ResearchMode, string>> = {
  en: { RESEARCH_GROUNDED: "Research-grounded", PROTO_PERSONA: "Proto-persona" },
  fr: { RESEARCH_GROUNDED: "Fondé sur la recherche", PROTO_PERSONA: "Proto-persona" },
};

const SOURCE_CATEGORY: Record<StudioLang, Record<SourceCategory, string>> = {
  en: {
    INTERVIEW: "Interview",
    OBSERVATION: "Observation",
    SURVEY: "Survey",
    EXISTING_PERSONA: "Existing persona",
    BRIEF: "Brief",
    DESK_RESEARCH: "Desk research",
    OTHER: "Other",
  },
  fr: {
    INTERVIEW: "Entretien",
    OBSERVATION: "Observation",
    SURVEY: "Enquête",
    EXISTING_PERSONA: "Persona existant",
    BRIEF: "Brief",
    DESK_RESEARCH: "Recherche documentaire",
    OTHER: "Autre",
  },
};

const CONFIDENTIALITY: Record<StudioLang, Record<ConfidentialityLabel, string>> = {
  en: {
    PUBLIC: "Public",
    INTERNAL: "Internal",
    CLIENT_CONFIDENTIAL: "Client confidential",
    RESTRICTED: "Restricted",
  },
  fr: {
    PUBLIC: "Public",
    INTERNAL: "Interne",
    CLIENT_CONFIDENTIAL: "Confidentiel client",
    RESTRICTED: "Restreint",
  },
};

const SECTION_TYPE: Record<StudioLang, Record<SectionType, string>> = {
  en: {
    bullets: "Bulleted list",
    text: "Text",
    quote: "Quote",
    metrics: "Metrics",
    moments: "Moments",
    needs: "Needs",
    journey: "Journey",
    custom: "Custom",
  },
  fr: {
    bullets: "Liste à puces",
    text: "Texte",
    quote: "Citation",
    metrics: "Indicateurs",
    moments: "Moments",
    needs: "Besoins",
    journey: "Parcours",
    custom: "Personnalisé",
  },
};

const VISIBILITY: Record<StudioLang, Record<ProjectVisibility, string>> = {
  en: {
    PRIVATE: "Private — only me",
    TEAM: "Team — CoDesign facilitators",
    CLIENT_SHARED: "Shared with client",
  },
  fr: {
    PRIVATE: "Privé — moi uniquement",
    TEAM: "Équipe — facilitateurs CoDesign",
    CLIENT_SHARED: "Partagé avec le client",
  },
};

const UI: Record<StudioLang, Record<string, string>> = {
  en: {
    heroTitle: "Create, understand and design with the people you serve.",
    heroSubtitle:
      "Evidence-based personas for CoDesign workshops. Every statement is traceable, every confidence score is explained.",
    areasTitle: "Areas where we operate",
    areasSubtitle:
      "WORK, HEAL, LEARN or PLAY — open a territory to browse its personas in one Studio sheet format.",
    areasCrumb: "Areas",
    projectLibrary: "Project library",
    workshopLibrary: "More workshop sets",
    workshopLibraryIntro:
      "Personix archetypes and Tour de France hospitality — same sheet format, specialised for workshops.",
    templatesTitle: "Persona templates",
    templatesIntro:
      "Templates define the sections a persona family carries. They are how one product serves two families — and you can save your own from the editor.",
    topNeeds: "Top needs",
    topFrustrations: "Top frustrations",
    openProject: "Open project",
    openGallery: "Open gallery",
    personaGallery: "Persona gallery",
    personas: "personas",
    sources: "Sources",
    journeys: "Journeys",
    client: "Client",
    segment: "Segment",
    region: "Region",
    language: "Language",
    researchMode: "Research mode",
    age: "Age",
    steps: "steps",
    noSources: "No sources yet.",
    noJourneys: "No journeys yet.",
    nothingRecorded: "Nothing recorded yet.",
    evidenceCoverage: "Evidence coverage",
    // Visualizations (empathy map, needs map, journey lens)
    persona: "Persona",
    empathyMap: "Empathy map",
    empathyMotivations: "What drives me",
    empathyFrustrations: "What frustrates me",
    empathyNeeds: "What I need",
    empathyContext: "My context",
    empathyMapNote: "Built from this persona’s own evidenced sections.",
    needsMap: "Needs coverage map",
    needsMapCaption:
      "Evidence coverage of recognised need themes — not satisfaction. Strength reflects the confidence of the underlying statements.",
    foodHospitality: "Food & hospitality",
    strengthStrong: "Strong",
    strengthModerate: "Moderate",
    strengthEmerging: "Emerging",
    strengthUnknown: "Unknown",
    statementsCount: "statements",
    journeyLens: "Journey lens",
    journeyEyebrow: "Journey",
    whatIDo: "What I do",
    whoIAm: "Who I am",
    journeyIntro:
      "A day in their shoes — {n} moments that shape the experience.",
    onThisPage: "On this page",
    unlockTitle: "Facilitator unlock",
    unlockIntro:
      "Enter the access code to create, edit and manage sources. Browsing stays open for the room.",
    unlockDisabled:
      "Write access is open on this environment — no unlock code is configured.",
    unlockAlready: "Facilitator mode is already unlocked on this device.",
    accessCode: "Access code",
    unlock: "Unlock",
    unlocking: "Unlocking…",
    lockFacilitator: "Lock",
    unlockFacilitator: "Unlock edits",
    viewerMode: "View only",
    auditTitle: "Evidence review",
    auditPass: "Pass",
    auditWarn: "Needs attention",
    auditFail: "Blocked",
    differentiationTitle: "Differentiation vs peers",
    differentiationIntro:
      "Share of need themes and behavioural tags unique to this persona in the project.",
    uniqueThemes: "Unique themes",
    sharedThemes: "Shared themes",
    noPeers: "No peers in this project yet.",
    uploadFile: "Upload file",
    uploadHint: "TXT, MD, CSV or PDF (max 8 MB). Text is extracted and chunked for grounding.",
    uploading: "Uploading…",
    chunksReady: "Source ingested and chunked for retrieval.",
    journeySlotGoal: "Goal",
    journeySlotEmotion: "Emotion / stance",
    journeySlotPain: "Pain",
    journeySlotOpportunity: "Opportunity",
    journeyLivingNote:
      "Linked from this persona’s own statements — never invented for the journey.",
    journeyInsufficient: "Not enough linked evidence for this slot.",
    simulationNote:
      "“Talk to this persona” is a research-grounded simulation built from the evidence above — not a real customer or employee. It arrives in a later phase.",
    // Actions
    newProject: "New project",
    templates: "Templates",
    addPersona: "Add persona",
    editPersona: "Edit",
    manageSources: "Manage sources",
    history: "History",
    save: "Save",
    saving: "Saving…",
    saved: "Saved",
    cancel: "Cancel",
    back: "Back",
    next: "Next",
    previous: "Previous",
    publish: "Publish",
    remove: "Remove",
    add: "Add",
    restore: "Restore",
    view: "View",
    create: "Create",
    // Wizard
    createProject: "Create a persona project",
    step: "Step",
    of: "of",
    stepContext: "Project context",
    stepSources: "Add sources",
    stepAnalyse: "Analyse patterns",
    stepGenerate: "Generate personas",
    stepReview: "Review & validate",
    stepPublish: "Publish",
    projectName: "Project name",
    workshopObjective: "Workshop objective",
    audience: "Audience",
    description: "Description",
    desiredPersonaCount: "Target number of personas",
    template: "Template",
    addSource: "Add a source",
    sourceName: "Source name",
    sourceType: "Type",
    sourceCategory: "Category",
    confidentiality: "Confidentiality",
    participantRef: "Participant reference",
    pasteText: "Pasted text / notes",
    noSourcesYet: "No sources added yet. Add at least one to analyse.",
    runAnalysis: "Analyse sources",
    reAnalyse: "Re-run analysis",
    analysing: "Analysing…",
    insights: "Behavioural themes",
    noInsightsYet: "Run the analysis to surface behavioural themes.",
    behaviouralClusters: "Behavioural clusters",
    approve: "Approve",
    approved: "Approved",
    approveClustersHint:
      "Approve the clusters that should become personas, then generate.",
    generatePersonas: "Generate personas from approved clusters",
    generating: "Generating…",
    generatedPersonas: "Generated personas (drafts)",
    reviewIntro:
      "Review each draft for unsupported claims, assumptions, gaps, stereotypes, duplicates and weak quotes before publishing.",
    noFindings: "No issues found. This persona passes the review.",
    overall: "Overall",
    publishSettings: "Publish settings",
    accentColour: "Accent colour",
    visibleSections: "Visible sections",
    sharing: "Sharing",
    shareNote: "Note for shared viewers (optional)",
    finishPublish: "Publish project",
    projectCreated: "Project created",
    // Review categories
    catUnsupported: "Unsupported evidence",
    catAssumption: "Assumptions",
    catMissing: "Missing evidence",
    catStereotype: "Potential stereotypes",
    catDuplicate: "Duplicates",
    catWeakQuote: "Weak quotes",
    // Editor
    editorNewPersona: "New persona",
    identity: "Identity",
    name: "Name",
    archetype: "Archetype",
    category: "Category",
    oneLineEssence: "One-line essence",
    quote: "Quote",
    quoteType: "Quote type",
    confidence: "Confidence",
    confidenceExplanation: "Confidence explanation",
    demographics: "Demographic context",
    ageRange: "Age range",
    location: "Location",
    tenure: "Tenure",
    authorityLevel: "Authority level",
    incomeLevel: "Income level",
    relevanceNote: "Why these traits matter (behavioural relevance)",
    behaviouralTags: "Behavioural tags",
    addTag: "Add tag",
    sections: "Sections",
    addSection: "Add section",
    addCustomSection: "Add custom section",
    addStatement: "Add statement",
    sectionTitle: "Section title",
    sectionType: "Section type",
    visible: "Visible",
    hidden: "Hidden",
    moveUp: "Move up",
    moveDown: "Move down",
    removeSection: "Remove section",
    removeStatement: "Remove statement",
    statementContent: "Statement",
    evidenceStatusLabel: "Evidence status",
    linkedSources: "Linked sources",
    saveAsTemplate: "Save as template",
    templateSaved: "Template saved",
    unsavedChanges: "You have unsaved changes",
    reviewPanel: "Review",
    runReview: "Run review",
    // History
    versionHistory: "Version history",
    version: "Version",
    currentVersion: "Current",
    noVersions: "No earlier versions yet. Versions are created each time you save.",
    savedAt: "Saved",
    changeNote: "Note",
    restoreConfirm: "Restore this version? The current state is saved to history first.",
    // AI / drafts
    mockAiBadge: "Mock AI — deterministic draft",
    draftNotice:
      "This content was machine-drafted as a starting point. Nothing here is research: validate every statement against real sources.",
  },
  fr: {
    heroTitle: "Créer, comprendre et concevoir avec les personnes que vous servez.",
    heroSubtitle:
      "Des personas fondés sur des preuves pour les ateliers CoDesign. Chaque affirmation est traçable, chaque score de confiance est expliqué.",
    areasTitle: "Territoires où nous opérons",
    areasCrumb: "Territoires",
    areasSubtitle:
      "WORK, HEAL, LEARN ou PLAY — ouvrez un territoire pour parcourir ses personas, au même format de fiche Studio.",
    projectLibrary: "Bibliothèque de projets",
    workshopLibrary: "Autres jeux atelier",
    workshopLibraryIntro:
      "Archétypes Personix et hospitalité Tour de France — même format de fiche, spécialisés pour l'atelier.",
    templatesTitle: "Modèles de personas",
    templatesIntro:
      "Les modèles définissent les sections qu'une famille de personas comporte. C'est ainsi qu'un même produit sert deux familles — et vous pouvez enregistrer les vôtres depuis l'éditeur.",
    topNeeds: "Besoins clés",
    topFrustrations: "Frustrations clés",
    openProject: "Ouvrir le projet",
    openGallery: "Ouvrir la galerie",
    personaGallery: "Galerie de personas",
    personas: "personas",
    sources: "Sources",
    journeys: "Parcours",
    client: "Client",
    segment: "Segment",
    region: "Région",
    language: "Langue",
    researchMode: "Mode de recherche",
    age: "Âge",
    steps: "étapes",
    noSources: "Aucune source pour l'instant.",
    noJourneys: "Aucun parcours pour l'instant.",
    nothingRecorded: "Rien de renseigné pour l'instant.",
    evidenceCoverage: "Couverture des preuves",
    // Visualisations (carte d'empathie, carte des besoins, parcours)
    persona: "Persona",
    empathyMap: "Carte d'empathie",
    empathyMotivations: "Ce qui me motive",
    empathyFrustrations: "Ce qui me frustre",
    empathyNeeds: "Ce dont j'ai besoin",
    empathyContext: "Mon contexte",
    empathyMapNote: "Construite à partir des sections étayées de ce persona.",
    needsMap: "Carte de couverture des besoins",
    needsMapCaption:
      "Couverture des preuves par thème de besoin reconnu — et non satisfaction. La force reflète la confiance des affirmations sous-jacentes.",
    foodHospitality: "Restauration & hospitalité",
    strengthStrong: "Forte",
    strengthModerate: "Modérée",
    strengthEmerging: "Émergente",
    strengthUnknown: "Inconnue",
    statementsCount: "affirmations",
    journeyLens: "Parcours",
    journeyEyebrow: "Parcours",
    whatIDo: "Ce que je fais",
    whoIAm: "Qui je suis",
    journeyIntro:
      "Une journée dans leurs chaussures — {n} moments qui façonnent l'expérience.",
    onThisPage: "Sur cette page",
    unlockTitle: "Déverrouillage facilitateur",
    unlockIntro:
      "Saisissez le code d'accès pour créer, modifier et gérer les sources. La consultation reste ouverte pour la salle.",
    unlockDisabled:
      "L'édition est ouverte sur cet environnement — aucun code n'est configuré.",
    unlockAlready: "Le mode facilitateur est déjà déverrouillé sur cet appareil.",
    accessCode: "Code d'accès",
    unlock: "Déverrouiller",
    unlocking: "Déverrouillage…",
    lockFacilitator: "Verrouiller",
    unlockFacilitator: "Déverrouiller l'édition",
    viewerMode: "Lecture seule",
    auditTitle: "Revue des preuves",
    auditPass: "Validé",
    auditWarn: "À surveiller",
    auditFail: "Bloqué",
    differentiationTitle: "Différenciation vs pairs",
    differentiationIntro:
      "Part des thèmes de besoin et tags comportementaux uniques à ce persona dans le projet.",
    uniqueThemes: "Thèmes uniques",
    sharedThemes: "Thèmes partagés",
    noPeers: "Aucun pair dans ce projet pour l'instant.",
    uploadFile: "Importer un fichier",
    uploadHint:
      "TXT, MD, CSV ou PDF (max 8 Mo). Le texte est extrait et découpé pour le grounding.",
    uploading: "Import…",
    chunksReady: "Source ingérée et découpée pour la recherche.",
    journeySlotGoal: "Objectif",
    journeySlotEmotion: "Émotion / posture",
    journeySlotPain: "Friction",
    journeySlotOpportunity: "Opportunité",
    journeyLivingNote:
      "Relié aux affirmations de ce persona — jamais inventé pour le parcours.",
    journeyInsufficient: "Pas assez de preuves liées pour ce slot.",
    simulationNote:
      "« Parler à ce persona » est une simulation fondée sur la recherche, construite à partir des preuves ci-dessus — et non un vrai client ou collaborateur. Cette fonctionnalité arrivera dans une phase ultérieure.",
    // Actions
    newProject: "Nouveau projet",
    templates: "Modèles",
    addPersona: "Ajouter un persona",
    editPersona: "Modifier",
    manageSources: "Gérer les sources",
    history: "Historique",
    save: "Enregistrer",
    saving: "Enregistrement…",
    saved: "Enregistré",
    cancel: "Annuler",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
    publish: "Publier",
    remove: "Retirer",
    add: "Ajouter",
    restore: "Restaurer",
    view: "Voir",
    create: "Créer",
    // Wizard
    createProject: "Créer un projet de personas",
    step: "Étape",
    of: "sur",
    stepContext: "Contexte du projet",
    stepSources: "Ajouter des sources",
    stepAnalyse: "Analyser les tendances",
    stepGenerate: "Générer les personas",
    stepReview: "Revue et validation",
    stepPublish: "Publication",
    projectName: "Nom du projet",
    workshopObjective: "Objectif de l'atelier",
    audience: "Audience",
    description: "Description",
    desiredPersonaCount: "Nombre de personas visé",
    template: "Modèle",
    addSource: "Ajouter une source",
    sourceName: "Nom de la source",
    sourceType: "Type",
    sourceCategory: "Catégorie",
    confidentiality: "Confidentialité",
    participantRef: "Référence participant",
    pasteText: "Texte / notes collés",
    noSourcesYet: "Aucune source ajoutée. Ajoutez-en au moins une pour analyser.",
    runAnalysis: "Analyser les sources",
    reAnalyse: "Relancer l'analyse",
    analysing: "Analyse…",
    insights: "Tendances comportementales",
    noInsightsYet: "Lancez l'analyse pour faire émerger les tendances comportementales.",
    behaviouralClusters: "Groupes comportementaux",
    approve: "Approuver",
    approved: "Approuvé",
    approveClustersHint:
      "Approuvez les groupes qui doivent devenir des personas, puis générez.",
    generatePersonas: "Générer les personas à partir des groupes approuvés",
    generating: "Génération…",
    generatedPersonas: "Personas générés (brouillons)",
    reviewIntro:
      "Vérifiez chaque brouillon (affirmations non étayées, hypothèses, lacunes, stéréotypes, doublons, citations faibles) avant publication.",
    noFindings: "Aucun problème détecté. Ce persona passe la revue.",
    overall: "Global",
    publishSettings: "Paramètres de publication",
    accentColour: "Couleur d'accent",
    visibleSections: "Sections visibles",
    sharing: "Partage",
    shareNote: "Note pour les lecteurs (optionnel)",
    finishPublish: "Publier le projet",
    projectCreated: "Projet créé",
    // Review categories
    catUnsupported: "Preuves non étayées",
    catAssumption: "Hypothèses",
    catMissing: "Preuves manquantes",
    catStereotype: "Stéréotypes potentiels",
    catDuplicate: "Doublons",
    catWeakQuote: "Citations faibles",
    // Editor
    editorNewPersona: "Nouveau persona",
    identity: "Identité",
    name: "Nom",
    archetype: "Archétype",
    category: "Catégorie",
    oneLineEssence: "Essence en une phrase",
    quote: "Citation",
    quoteType: "Type de citation",
    confidence: "Confiance",
    confidenceExplanation: "Explication de la confiance",
    demographics: "Contexte démographique",
    ageRange: "Tranche d'âge",
    location: "Localisation",
    tenure: "Ancienneté",
    authorityLevel: "Niveau de responsabilité",
    incomeLevel: "Niveau de revenu",
    relevanceNote: "Pourquoi ces traits comptent (pertinence comportementale)",
    behaviouralTags: "Tags comportementaux",
    addTag: "Ajouter un tag",
    sections: "Sections",
    addSection: "Ajouter une section",
    addCustomSection: "Ajouter une section personnalisée",
    addStatement: "Ajouter une affirmation",
    sectionTitle: "Titre de la section",
    sectionType: "Type de section",
    visible: "Visible",
    hidden: "Masquée",
    moveUp: "Monter",
    moveDown: "Descendre",
    removeSection: "Supprimer la section",
    removeStatement: "Supprimer l'affirmation",
    statementContent: "Affirmation",
    evidenceStatusLabel: "Statut de preuve",
    linkedSources: "Sources liées",
    saveAsTemplate: "Enregistrer comme modèle",
    templateSaved: "Modèle enregistré",
    unsavedChanges: "Vous avez des modifications non enregistrées",
    reviewPanel: "Revue",
    runReview: "Lancer la revue",
    // History
    versionHistory: "Historique des versions",
    version: "Version",
    currentVersion: "Actuelle",
    noVersions: "Aucune version antérieure. Une version est créée à chaque enregistrement.",
    savedAt: "Enregistré",
    changeNote: "Note",
    restoreConfirm: "Restaurer cette version ? L'état actuel est d'abord sauvegardé dans l'historique.",
    // AI / drafts
    mockAiBadge: "IA simulée — brouillon déterministe",
    draftNotice:
      "Ce contenu a été généré automatiquement comme point de départ. Rien ici n'est de la recherche : validez chaque affirmation avec de vraies sources.",
  },
};

export function tConfidence(lang: StudioLang, level: ConfidenceLevel) {
  return CONFIDENCE[lang][level];
}
export function tEvidence(lang: StudioLang, status: EvidenceStatus) {
  return EVIDENCE[lang][status];
}
export function tQuoteType(lang: StudioLang, type: QuoteType) {
  return QUOTE[lang][type];
}
export function tFamily(lang: StudioLang, family: PersonaFamily) {
  return FAMILY[lang][family];
}
export function tStatus(lang: StudioLang, status: LifecycleStatus) {
  return STATUS[lang][status];
}
export function tResearchMode(lang: StudioLang, mode: ResearchMode) {
  return RESEARCH_MODE[lang][mode];
}
export function tSourceCategory(lang: StudioLang, category: SourceCategory) {
  return SOURCE_CATEGORY[lang][category];
}
export function tConfidentiality(lang: StudioLang, label: ConfidentialityLabel) {
  return CONFIDENTIALITY[lang][label];
}
export function tSectionType(lang: StudioLang, type: SectionType) {
  return SECTION_TYPE[lang][type];
}
export function tVisibility(lang: StudioLang, visibility: ProjectVisibility) {
  return VISIBILITY[lang][visibility];
}
/** Keys available in the per-project UI dictionary. */
export type UIKey = keyof (typeof UI)["en"];

export function tUI(lang: StudioLang, key: UIKey) {
  return UI[lang][key];
}

/** "3 evidence · 1 assumptions · 2 to validate (6 statements)" in the given language. */
export function tBreakdown(
  lang: StudioLang,
  b: { evidence: number; assumption: number; toValidate: number; total: number },
) {
  if (lang === "fr") {
    return `${b.evidence} preuves · ${b.assumption} hypothèses · ${b.toValidate} à valider (${b.total} affirmations)`;
  }
  return `${b.evidence} evidence · ${b.assumption} assumptions · ${b.toValidate} to validate (${b.total} statements)`;
}
