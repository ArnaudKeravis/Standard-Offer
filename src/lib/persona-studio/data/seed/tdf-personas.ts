import { SEED_TIMESTAMP, section } from "../builders";
import {
  localizePersona,
  localizeSource,
  sourceEvidenceCoverage,
  type PersonaSource,
  type SourceDocumentSource,
} from "../localized";

/**
 * Personas Hospitalité Tour de France (bilingual FR/EN content).
 *
 * Authored in French first (source of truth) and mirrored faithfully in
 * English: only the human-readable text differs between languages — ids,
 * evidence status, confidence, sourceIds, ordering and numbers are identical.
 *
 * The provided persona brief acts as the initial source of truth: described
 * traits are tagged EVIDENCE against it. Genuine unknowns (group size, food
 * needs, ROI definition…) are tagged TO_VALIDATE so evidence coverage stays
 * honest. No facts beyond the provided data are invented.
 */

/** Tour de France hospitality personas live inside the PLAY area project. */
export { XP_PLAY_PROJECT_ID as TDF_PROJECT_ID } from "./xp-play-personas";
import { XP_PLAY_PROJECT_ID } from "./xp-play-personas";

const BRIEF_SOURCE: SourceDocumentSource = {
  id: "src-tdf-brief",
  projectId: XP_PLAY_PROJECT_ID,
  name: {
    fr: "Hospitalité Tour de France — Profils de personas (mai 2026)",
    en: "Tour de France Hospitality — Persona profiles (May 2026)",
  },
  type: "pdf",
  date: SEED_TIMESTAMP,
  author: "CoDesign Services",
  category: "EXISTING_PERSONA",
  extractedText:
    "Profils de personas structurés pour quatre archétypes d'invités de l'hospitalité du Tour de France : client VIP business international, invité famille, invité sportif et sponsor / partenaire du Tour.",
  processingStatus: "READY",
  confidentiality: "CLIENT_CONFIDENTIAL",
  createdAt: SEED_TIMESTAMP,
};

export const TDF_SOURCE_SOURCES: SourceDocumentSource[] = [BRIEF_SOURCE];
const S = [BRIEF_SOURCE.id];

/** Finalise a persona: compute evidence coverage from its statements. */
function finalise(persona: Omit<PersonaSource, "evidenceCoverage">): PersonaSource {
  return {
    ...persona,
    evidenceCoverage: sourceEvidenceCoverage([
      ...persona.commonSections,
      ...persona.domainSections,
    ]),
  };
}

const david = finalise({
  id: "persona-david-richardson",
  projectId: XP_PLAY_PROJECT_ID,
  name: "David Richardson",
  archetype: { fr: "Le Client VIP International", en: "The International VIP Client" },
  category: {
    fr: "Client VIP business international",
    en: "International business VIP client",
  },
  family: "PLAY",
  segment: { fr: "Sports & Loisirs — Play", en: "Sports & Leisure — Play" },
  oneLineEssence: {
    fr: "Un dirigeant international au temps compté qui utilise le Tour comme une scène premium et authentique pour recevoir ses clients stratégiques.",
    en: "A time-pressed international executive who uses the Tour as a premium, authentic stage to host his strategic clients.",
  },
  portraitUrl: "/persona-studio/tdf/david-richardson.png",
  accentColor: "#ffb81c",
  quote: {
    fr: "Le Tour de France est l'un des rares événements capables de réunir clients, partenaires et dirigeants dans un cadre prestigieux et authentique.",
    en: "The Tour de France is one of the few events able to bring together clients, partners and executives in a prestigious and authentic setting.",
  },
  quoteType: "COMPOSITE",
  confidenceLevel: "MEDIUM",
  confidenceExplanation: {
    fr: "Construit à partir d'un brief de personas d'hospitalité structuré, et non d'entretiens de terrain. Les traits sont cohérents et sourcés, mais les comportements et préférences individuels des invités restent à valider.",
    en: "Built from a structured hospitality persona brief, not field interviews. The traits are coherent and sourced, but individual guests' behaviours and preferences remain to be validated.",
  },
  demographicContext: {
    ageRange: "54",
    location: { fr: "Londres, Royaume-Uni", en: "London, United Kingdom" },
    relevanceNote: {
      fr: "Un niveau de décision de PDG façonne l'attente d'un service premium, fluide et discret — noté parce qu'il oriente le comportement, pas comme un stéréotype.",
      en: "A CEO-level decision-making standard shapes the expectation of premium, seamless and discreet service — noted because it drives behaviour, not as a stereotype.",
    },
  },
  behaviouralTags: [
    { fr: "hôte", en: "host" },
    { fr: "temps compté", en: "time-pressed" },
    { fr: "recherche le prestige", en: "prestige-seeking" },
    { fr: "bâtisseur de relations", en: "relationship-builder" },
  ],
  sourceIds: S,
  status: "PUBLISHED",
  version: 1,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
  commonSections: [
    section("persona-david-richardson", {
      key: "essence",
      title: { fr: "Essence", en: "Essence" },
      type: "text",
      order: 0,
      items: [
        {
          content: {
            fr: "PDG d'un groupe technologique international, il assiste à 2 à 4 étapes par an, 1 à 2 jours chacune et parfois des étapes consécutives, en tant qu'invité d'un partenaire majeur du Tour.",
            en: "CEO of an international technology group, he attends 2 to 4 stages a year, 1 to 2 days each and sometimes consecutive stages, as the guest of a major Tour partner.",
          },
          sourceIds: S,
          confidence: "HIGH",
        },
      ],
    }),
    section("persona-david-richardson", {
      key: "context",
      title: { fr: "Contexte", en: "Context" },
      type: "bullets",
      order: 1,
      items: [
        { content: { fr: "PDG d'un groupe technologique international.", en: "CEO of an international technology group." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Basé à Londres, Royaume-Uni.", en: "Based in London, United Kingdom." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Participe à 2 à 4 étapes par an, 1 à 2 jours par étape, parfois consécutives.", en: "Attends 2 to 4 stages a year, 1 to 2 days per stage, sometimes consecutive." }, sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-david-richardson", {
      key: "motivations",
      title: { fr: "Motivations", en: "Motivations" },
      type: "bullets",
      order: 6,
      items: [
        { content: { fr: "Prestige international.", en: "International prestige." }, sourceIds: S },
        { content: { fr: "Développement commercial.", en: "Business development." }, sourceIds: S },
        { content: { fr: "Expérience exclusive.", en: "Exclusive experience." }, sourceIds: S },
        { content: { fr: "Émotions partagées avec ses invités.", en: "Emotions shared with his guests." }, sourceIds: S },
        { content: { fr: "Découverte des territoires français.", en: "Discovering French regions." }, sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "frustrations",
      title: { fr: "Frustrations", en: "Frustrations" },
      type: "bullets",
      order: 7,
      items: [
        { content: { fr: "Manque de personnalisation.", en: "Lack of personalisation." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Logistique ou transport complexes.", en: "Complex logistics or transport." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Temps d'attente.", en: "Waiting time." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Programme insuffisamment adapté d'une étape à l'autre.", en: "Programme insufficiently adapted from one stage to the next." }, sourceIds: S },
        { content: { fr: "Difficulté à comprendre la valeur des options premium.", en: "Difficulty understanding the value of premium options." }, sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "questions_to_validate",
      title: { fr: "Questions à valider", en: "Questions to validate" },
      type: "bullets",
      order: 12,
      items: [
        { content: { fr: "Taille et niveau de séniorité typiques du groupe d'invités par étape.", en: "Typical size and seniority level of the guest group per stage." }, status: "TO_VALIDATE", confidence: "LOW" },
        { content: { fr: "Préférences précises en matière de mets et de vins.", en: "Precise food and wine preferences." }, status: "TO_VALIDATE", confidence: "LOW" },
        { content: { fr: "Comment il définit une invitation réussie (ROI).", en: "How he defines a successful invitation (ROI)." }, status: "TO_VALIDATE", confidence: "LOW" },
      ],
    }),
  ],
  domainSections: [
    section("persona-david-richardson", {
      key: "reasons_for_attending",
      title: { fr: "Raisons de sa venue", en: "Reasons for attending" },
      type: "bullets",
      order: 20,
      items: [
        { content: { fr: "Invité par un partenaire majeur du Tour.", en: "Invited by a major Tour partner." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Reçoit des clients stratégiques.", en: "Hosts strategic clients." }, sourceIds: S },
        { content: { fr: "Développe son réseau international.", en: "Builds his international network." }, sourceIds: S },
        { content: { fr: "Renforce des partenariats existants.", en: "Strengthens existing partnerships." }, sourceIds: S },
        { content: { fr: "Vit une représentation premium du savoir-faire français.", en: "Experiences a premium showcase of French savoir-faire." }, sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "key_expectations",
      title: { fr: "Attentes clés", en: "Key expectations" },
      type: "needs",
      order: 21,
      items: [
        { content: { fr: "Accès privilégié et espaces VIP.", en: "Privileged access and VIP areas." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Expérience fluide et sans friction.", en: "A smooth, frictionless experience." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Hospitalité premium.", en: "Premium hospitality." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Networking de haut niveau.", en: "High-level networking." }, sourceIds: S },
        { content: { fr: "Service multilingue.", en: "Multilingual service." }, sourceIds: S },
        { content: { fr: "Logistique simplifiée.", en: "Simplified logistics." }, sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "food_hospitality",
      title: { fr: "Attentes restauration & hospitalité", en: "Food & hospitality expectations" },
      type: "bullets",
      order: 22,
      items: [
        { content: { fr: "Menus traditionnels expliqués.", en: "Traditional menus, explained." }, sourceIds: S },
        { content: { fr: "Sélection de vins régionaux.", en: "A selection of regional wines." }, sourceIds: S },
        { content: { fr: "Expériences culinaires exclusives.", en: "Exclusive culinary experiences." }, sourceIds: S },
        { content: { fr: "Service rapide et discret.", en: "Fast, discreet service." }, sourceIds: S },
        { content: { fr: "Signature gastronomique liée au territoire.", en: "A gastronomic signature rooted in the region." }, sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "ideal_experience",
      title: { fr: "Expérience idéale", en: "Ideal experience" },
      type: "text",
      order: 24,
      items: [
        {
          content: {
            fr: "Faire découvrir l'excellence française à ses clients tout en partageant l'émotion du Tour dans un cadre privilégié.",
            en: "Introducing his clients to French excellence while sharing the emotion of the Tour in a privileged setting.",
          },
          sourceIds: S,
        },
      ],
    }),
  ],
});

const sophie = finalise({
  id: "persona-sophie-lambert",
  projectId: XP_PLAY_PROJECT_ID,
  name: "Sophie Lambert",
  archetype: { fr: "L'Invitée Famille", en: "The Family Guest" },
  category: { fr: "Invitée famille", en: "Family guest" },
  family: "PLAY",
  segment: { fr: "Sports & Loisirs — Play", en: "Sports & Leisure — Play" },
  oneLineEssence: {
    fr: "Une cadre supérieure qui transforme une rare invitation partenaire en une journée exceptionnelle et sans complication avec son conjoint et ses enfants.",
    en: "A senior executive who turns a rare partner invitation into an exceptional, hassle-free day with her spouse and children.",
  },
  portraitUrl: "/persona-studio/tdf/sophie-lambert.png",
  accentColor: "#ec4899",
  quote: {
    fr: "Nous vivons un moment exceptionnel en famille, bien au-delà d'une simple compétition sportive.",
    en: "We share an exceptional family moment, far beyond a simple sporting competition.",
  },
  quoteType: "COMPOSITE",
  confidenceLevel: "MEDIUM",
  confidenceExplanation: {
    fr: "Construit à partir du brief de personas d'hospitalité. Les traits liés au contexte familial sont sourcés, mais les besoins spécifiques des enfants accompagnants sont des hypothèses à valider.",
    en: "Built from the hospitality persona brief. The traits tied to the family context are sourced, but the specific needs of the accompanying children are assumptions to be validated.",
  },
  demographicContext: {
    ageRange: "42",
    location: "Lyon, France",
    relevanceNote: {
      fr: "Elle vient avec son conjoint et ses enfants — c'est le groupe familial, et non l'âge, qui façonne ses besoins (confort, activités enfants, visibilité sur la course).",
      en: "She comes with her spouse and children — it is the family group, not her age, that shapes her needs (comfort, children's activities, visibility of the race).",
    },
  },
  behaviouralTags: [
    { fr: "famille d'abord", en: "family-first" },
    { fr: "créatrice de souvenirs", en: "memory-maker" },
    { fr: "recherche le confort", en: "comfort-seeking" },
    { fr: "occasionnelle", en: "occasional" },
  ],
  sourceIds: S,
  status: "PUBLISHED",
  version: 1,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
  commonSections: [
    section("persona-sophie-lambert", {
      key: "essence",
      title: { fr: "Essence", en: "Essence" },
      type: "text",
      order: 0,
      items: [
        {
          content: {
            fr: "Cadre supérieure, elle assiste à une étape environ tous les 2 à 3 ans, sur une journée complète, avec son conjoint et ses enfants, en tant qu'invitée d'un partenaire du Tour.",
            en: "A senior executive, she attends a stage roughly every 2 to 3 years, for a full day, with her spouse and children, as the guest of a Tour partner.",
          },
          sourceIds: S,
          confidence: "HIGH",
        },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "context",
      title: { fr: "Contexte", en: "Context" },
      type: "bullets",
      order: 1,
      items: [
        { content: { fr: "Cadre supérieure, présente avec son conjoint et ses enfants.", en: "Senior executive, attending with her spouse and children." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Basée à Lyon, France.", en: "Based in Lyon, France." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Participe à une étape tous les 2 à 3 ans, sur une journée complète.", en: "Attends a stage every 2 to 3 years, for a full day." }, sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "motivations",
      title: { fr: "Motivations", en: "Motivations" },
      type: "bullets",
      order: 6,
      items: [
        { content: { fr: "Temps de qualité en famille.", en: "Quality family time." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Ambiance du Tour.", en: "The atmosphere of the Tour." }, sourceIds: S },
        { content: { fr: "Moments mémorables.", en: "Memorable moments." }, sourceIds: S },
        { content: { fr: "Événement exceptionnel.", en: "An exceptional event." }, sourceIds: S },
        { content: { fr: "Découverte des régions françaises.", en: "Discovering French regions." }, sourceIds: S },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "frustrations",
      title: { fr: "Frustrations", en: "Frustrations" },
      type: "bullets",
      order: 7,
      items: [
        { content: { fr: "Attente excessive.", en: "Excessive waiting." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Parcours complexe.", en: "A complicated journey." }, sourceIds: S },
        { content: { fr: "Manque d'activités pour les enfants.", en: "Lack of activities for children." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Restauration peu adaptée aux familles.", en: "Catering poorly suited to families." }, sourceIds: S },
        { content: { fr: "Difficulté à voir les coureurs.", en: "Difficulty seeing the riders." }, sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "questions_to_validate",
      title: { fr: "Questions à valider", en: "Questions to validate" },
      type: "bullets",
      order: 12,
      items: [
        { content: { fr: "Âge des enfants et activités qui les captivent réellement.", en: "The children's ages and the activities that genuinely captivate them." }, status: "TO_VALIDATE", confidence: "LOW" },
        { content: { fr: "Tolérance aux files d'attente et à la chaleur avec de jeunes enfants.", en: "Tolerance for queues and heat with young children." }, status: "TO_VALIDATE", confidence: "LOW" },
      ],
    }),
  ],
  domainSections: [
    section("persona-sophie-lambert", {
      key: "reasons_for_attending",
      title: { fr: "Raisons de sa venue", en: "Reasons for attending" },
      type: "bullets",
      order: 20,
      items: [
        { content: { fr: "Invitée par un partenaire du Tour.", en: "Invited by a Tour partner." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Recherche une expérience mémorable à partager.", en: "Seeks a memorable experience to share." }, sourceIds: S },
        { content: { fr: "Événement accessible à toute la famille.", en: "An event the whole family can enjoy." }, sourceIds: S },
        { content: { fr: "Souvenirs uniques.", en: "Unique memories." }, sourceIds: S },
        { content: { fr: "Immersion dans l'ambiance du Tour.", en: "Immersion in the atmosphere of the Tour." }, sourceIds: S },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "key_expectations",
      title: { fr: "Attentes clés", en: "Key expectations" },
      type: "needs",
      order: 21,
      items: [
        { content: { fr: "Simplicité et confort.", en: "Simplicity and comfort." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Activités adaptées aux enfants.", en: "Child-friendly activities." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Expérience immersive.", en: "An immersive experience." }, sourceIds: S },
        { content: { fr: "Animations interactives.", en: "Interactive entertainment." }, sourceIds: S },
        { content: { fr: "Souvenirs à rapporter.", en: "Keepsakes to take home." }, sourceIds: S },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "food_hospitality",
      title: { fr: "Attentes restauration & hospitalité", en: "Food & hospitality expectations" },
      type: "bullets",
      order: 22,
      items: [
        { content: { fr: "Buffet varié.", en: "A varied buffet." }, sourceIds: S },
        { content: { fr: "Choix pour les enfants.", en: "Options for children." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Produits régionaux.", en: "Regional produce." }, sourceIds: S },
        { content: { fr: "Goûters et animations culinaires.", en: "Snacks and culinary activities." }, sourceIds: S },
        { content: { fr: "Service rapide.", en: "Fast service." }, sourceIds: S },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "ideal_experience",
      title: { fr: "Expérience idéale", en: "Ideal experience" },
      type: "text",
      order: 24,
      items: [
        {
          content: {
            fr: "Les enfants découvrent le Tour de France pendant que la famille crée des souvenirs qu'elle partagera pendant des années.",
            en: "The children discover the Tour de France while the family creates memories they will share for years.",
          },
          sourceIds: S,
        },
      ],
    }),
  ],
});

const thomas = finalise({
  id: "persona-thomas-garcia",
  projectId: XP_PLAY_PROJECT_ID,
  name: "Thomas Garcia",
  archetype: { fr: "L'Invité Sportif", en: "The Sports Fan Guest" },
  category: { fr: "Invité sportif", en: "Sports fan guest" },
  family: "PLAY",
  segment: { fr: "Sports & Loisirs — Play", en: "Sports & Leisure — Play" },
  oneLineEssence: {
    fr: "Un passionné de cyclisme qui accepte l'invitation pour être au plus près de la course — l'hospitalité est un bonus, le sport est l'essentiel.",
    en: "A cycling enthusiast who accepts the invitation to be as close as possible to the race — hospitality is a bonus, the sport is the point.",
  },
  portraitUrl: "/persona-studio/tdf/thomas-garcia.png",
  accentColor: "#ef4444",
  quote: {
    fr: "Honnêtement, je suis surtout là pour les voir passer. Tout le reste est un bonus.",
    en: "Honestly, I'm mainly here to watch them go by. Everything else is a bonus.",
  },
  quoteType: "COMPOSITE",
  confidenceLevel: "MEDIUM",
  confidenceExplanation: {
    fr: "Construit à partir du brief de personas d'hospitalité. Ses priorités sportives sont clairement établies ; sa connaissance du cyclisme et le niveau d'analyse attendu restent des hypothèses à valider.",
    en: "Built from the hospitality persona brief. His sporting priorities are clearly established; his knowledge of cycling and the level of analysis he expects remain assumptions to be validated.",
  },
  demographicContext: {
    ageRange: "45",
    location: "Toulouse, France",
    relevanceNote: {
      fr: "Cadre commercial invité par un partenaire — c'est le comportement de fan invité qui compte, pas l'intitulé du poste.",
      en: "A sales executive invited by a partner — it is the invited-fan behaviour that matters, not the job title.",
    },
  },
  behaviouralTags: [
    { fr: "fan avant tout", en: "fan-first" },
    { fr: "recherche la proximité", en: "proximity-seeking" },
    { fr: "anti-corporate", en: "anti-corporate" },
    { fr: "centré sport", en: "sport-focused" },
  ],
  sourceIds: S,
  status: "PUBLISHED",
  version: 1,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
  commonSections: [
    section("persona-thomas-garcia", {
      key: "essence",
      title: { fr: "Essence", en: "Essence" },
      type: "text",
      order: 0,
      items: [
        {
          content: {
            fr: "Cadre commercial et passionné de cyclisme, invité par un partenaire du Tour pour une journée complète 1 à 2 fois par an, il vient avant tout pour la course elle-même.",
            en: "A sales executive and cycling enthusiast, invited by a Tour partner for a full day 1 to 2 times a year, he comes above all for the race itself.",
          },
          sourceIds: S,
          confidence: "HIGH",
        },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "context",
      title: { fr: "Contexte", en: "Context" },
      type: "bullets",
      order: 1,
      items: [
        { content: { fr: "Cadre commercial invité par un partenaire du Tour.", en: "Sales executive invited by a Tour partner." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Basé à Toulouse, France.", en: "Based in Toulouse, France." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Participe à 1 à 2 étapes par an, sur une journée complète.", en: "Attends 1 to 2 stages a year, for a full day." }, sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "motivations",
      title: { fr: "Motivations", en: "Motivations" },
      type: "bullets",
      order: 6,
      items: [
        { content: { fr: "Voir les coureurs de près.", en: "Seeing the riders up close." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Comprendre la stratégie de course.", en: "Understanding race strategy." }, sourceIds: S },
        { content: { fr: "Vivre l'ambiance du peloton.", en: "Experiencing the atmosphere of the peloton." }, sourceIds: S },
        { content: { fr: "Découvrir les coulisses.", en: "Discovering behind the scenes." }, sourceIds: S },
        { content: { fr: "Partager sa passion du cyclisme.", en: "Sharing his passion for cycling." }, sourceIds: S },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "frustrations",
      title: { fr: "Frustrations", en: "Frustrations" },
      type: "bullets",
      order: 7,
      items: [
        { content: { fr: "Longues périodes d'attente.", en: "Long waiting periods." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Explications de course insuffisantes.", en: "Insufficient race commentary." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Animations déconnectées du sport.", en: "Entertainment disconnected from the sport." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Expérience parfois trop corporate.", en: "An experience that is sometimes too corporate." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Difficulté à suivre l'action entre deux passages.", en: "Difficulty following the action between the riders' passes." }, sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "questions_to_validate",
      title: { fr: "Questions à valider", en: "Questions to validate" },
      type: "bullets",
      order: 12,
      items: [
        { content: { fr: "Sa connaissance du cyclisme et le niveau d'analyse qu'il souhaite.", en: "His knowledge of cycling and the level of analysis he wants." }, status: "TO_VALIDATE", confidence: "LOW" },
        { content: { fr: "S'il quitterait l'espace hospitalité pour rejoindre le bord de route.", en: "Whether he would leave the hospitality area to join the roadside." }, status: "TO_VALIDATE", confidence: "LOW" },
      ],
    }),
  ],
  domainSections: [
    section("persona-thomas-garcia", {
      key: "reasons_for_attending",
      title: { fr: "Raisons de sa venue", en: "Reasons for attending" },
      type: "bullets",
      order: 20,
      items: [
        { content: { fr: "Invité par un partenaire du Tour.", en: "Invited by a Tour partner." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Proximité avec la course.", en: "Closeness to the race." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Immersion dans le cyclisme.", en: "Immersion in cycling." }, sourceIds: S },
        { content: { fr: "Ambiance unique du Tour.", en: "The unique atmosphere of the Tour." }, sourceIds: S },
        { content: { fr: "Accès aux équipes et aux coulisses.", en: "Access to the teams and behind the scenes." }, sourceIds: S },
        { content: { fr: "Moments sportifs authentiques.", en: "Authentic sporting moments." }, sourceIds: S },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "key_expectations",
      title: { fr: "Attentes clés", en: "Key expectations" },
      type: "needs",
      order: 21,
      items: [
        { content: { fr: "Proximité avec les coureurs.", en: "Closeness to the riders." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Accès aux paddocks et aux équipes.", en: "Access to the paddocks and teams." }, sourceIds: S },
        { content: { fr: "Informations et analyses de course.", en: "Race information and analysis." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Commentaire sportif.", en: "Sports commentary." }, sourceIds: S },
        { content: { fr: "Ressentir l'intensité de la compétition.", en: "Feeling the intensity of the competition." }, sourceIds: S },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "food_hospitality",
      title: { fr: "Attentes restauration & hospitalité", en: "Food & hospitality expectations" },
      type: "bullets",
      order: 22,
      items: [
        { content: { fr: "Grab-and-go premium.", en: "Premium grab-and-go." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Produits régionaux.", en: "Regional produce." }, sourceIds: S },
        { content: { fr: "Service rapide.", en: "Fast service." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Boissons fraîches faciles d'accès.", en: "Cold drinks within easy reach." }, sourceIds: S },
        { content: { fr: "Déjeuner compatible avec le suivi de la course.", en: "Lunch that fits around following the race." }, sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "ideal_experience",
      title: { fr: "Expérience idéale", en: "Ideal experience" },
      type: "text",
      order: 24,
      items: [
        {
          content: {
            fr: "Profiter pleinement de la journée sans perdre le fil de la course et vivre le Tour au plus près de l'action sportive.",
            en: "Making the most of the day without losing track of the race, and experiencing the Tour as close as possible to the sporting action.",
          },
          sourceIds: S,
        },
      ],
    }),
  ],
});

const claire = finalise({
  id: "persona-claire-dubois",
  projectId: XP_PLAY_PROJECT_ID,
  name: "Claire Dubois",
  archetype: { fr: "La Partenaire / Sponsor", en: "The Partner / Sponsor" },
  category: { fr: "Sponsor / Partenaire du Tour", en: "Tour sponsor / partner" },
  family: "PLAY",
  segment: { fr: "Sports & Loisirs — Play", en: "Sports & Leisure — Play" },
  oneLineEssence: {
    fr: "Une directrice partenariats qui pilote un programme d'hospitalité sur toute la saison et doit rentabiliser chaque invitation.",
    en: "A partnerships director who runs a season-long hospitality programme and must make every invitation pay off.",
  },
  portraitUrl: "/persona-studio/tdf/claire-dubois.png",
  accentColor: "#22c55e",
  quote: {
    fr: "Chaque invitation doit créer de la valeur pour nos clients et renforcer notre partenariat avec le Tour.",
    en: "Every invitation must create value for our clients and strengthen our partnership with the Tour.",
  },
  quoteType: "COMPOSITE",
  confidenceLevel: "MEDIUM",
  confidenceExplanation: {
    fr: "Construit à partir du brief de personas d'hospitalité. Ses objectifs opérationnels sont bien décrits ; les indicateurs qu'elle utilise pour prouver le ROI sont un inconnu clé à valider.",
    en: "Built from the hospitality persona brief. Her operational objectives are well described; the metrics she uses to prove ROI are a key unknown to validate.",
  },
  demographicContext: {
    ageRange: "48",
    location: { fr: "Lausanne, Suisse", en: "Lausanne, Switzerland" },
    relevanceNote: {
      fr: "Directrice partenariats & événementiel d'une grande marque partenaire — c'est le rôle d'opératrice sur toute la saison qui oriente ses besoins.",
      en: "Partnerships & events director at a major partner brand — it is the season-long operator role that drives her needs.",
    },
  },
  behaviouralTags: [
    { fr: "opératrice", en: "operator" },
    { fr: "orientée ROI", en: "ROI-driven" },
    { fr: "recherche la différenciation", en: "differentiation-seeking" },
    { fr: "endurance", en: "endurance" },
  ],
  sourceIds: S,
  status: "PUBLISHED",
  version: 1,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
  commonSections: [
    section("persona-claire-dubois", {
      key: "essence",
      title: { fr: "Essence", en: "Essence" },
      type: "text",
      order: 0,
      items: [
        {
          content: {
            fr: "Directrice partenariats et événementiel d'une grande marque partenaire, présente sur 15 à 21 étapes tout au long du Tour, elle pilote le programme d'hospitalité de la marque.",
            en: "Partnerships and events director at a major partner brand, present at 15 to 21 stages throughout the Tour, she runs the brand's hospitality programme.",
          },
          sourceIds: S,
          confidence: "HIGH",
        },
      ],
    }),
    section("persona-claire-dubois", {
      key: "context",
      title: { fr: "Contexte", en: "Context" },
      type: "bullets",
      order: 1,
      items: [
        { content: { fr: "Directrice partenariats et événementiel d'une grande marque partenaire.", en: "Partnerships and events director at a major partner brand." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Basée à Lausanne, Suisse.", en: "Based in Lausanne, Switzerland." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Présente sur 15 à 21 étapes, tout au long du Tour.", en: "Present at 15 to 21 stages, throughout the Tour." }, sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "motivations",
      title: { fr: "Motivations", en: "Motivations" },
      type: "bullets",
      order: 6,
      items: [
        { content: { fr: "Fidélisation des clients.", en: "Client loyalty." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Développement commercial.", en: "Business development." }, sourceIds: S },
        { content: { fr: "Valorisation de la marque.", en: "Brand enhancement." }, sourceIds: S },
        { content: { fr: "Création de moments exclusifs.", en: "Creating exclusive moments." }, sourceIds: S },
        { content: { fr: "Retour sur investissement mesurable.", en: "Measurable return on investment." }, sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "frustrations",
      title: { fr: "Frustrations", en: "Frustrations" },
      type: "bullets",
      order: 7,
      items: [
        { content: { fr: "Lassitude après plusieurs étapes.", en: "Weariness after several stages." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Expérience répétitive.", en: "A repetitive experience." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Difficulté à renouveler les surprises.", en: "Difficulty coming up with fresh surprises." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Manque de personnalisation.", en: "Lack of personalisation." }, sourceIds: S },
        { content: { fr: "Coût perçu supérieur à la valeur visible.", en: "Perceived cost higher than the visible value." }, sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "questions_to_validate",
      title: { fr: "Questions à valider", en: "Questions to validate" },
      type: "bullets",
      order: 12,
      items: [
        { content: { fr: "Les indicateurs précis qu'elle utilise pour prouver le ROI à sa direction.", en: "The precise metrics she uses to prove ROI to her management." }, status: "TO_VALIDATE", confidence: "LOW" },
        { content: { fr: "Sa marge de décision pour personnaliser étape par étape.", en: "Her decision-making latitude to personalise stage by stage." }, status: "TO_VALIDATE", confidence: "LOW" },
      ],
    }),
  ],
  domainSections: [
    section("persona-claire-dubois", {
      key: "reasons_for_attending",
      title: { fr: "Raisons de sa venue", en: "Reasons for attending" },
      type: "bullets",
      order: 20,
      items: [
        { content: { fr: "Pilote le programme d'hospitalité de la marque.", en: "Runs the brand's hospitality programme." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Satisfait les invités.", en: "Keeps guests satisfied." }, sourceIds: S },
        { content: { fr: "Génère du business.", en: "Generates business." }, sourceIds: S },
        { content: { fr: "Valorise la marque.", en: "Enhances the brand." }, sourceIds: S },
        { content: { fr: "Démontre le retour sur investissement.", en: "Demonstrates return on investment." }, sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "key_expectations",
      title: { fr: "Attentes clés", en: "Key expectations" },
      type: "needs",
      order: 21,
      items: [
        { content: { fr: "Satisfaction maximale des invités.", en: "Maximum guest satisfaction." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Différenciation entre les étapes.", en: "Differentiation between stages." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Personnalisation.", en: "Personalisation." }, sourceIds: S },
        { content: { fr: "Simplicité opérationnelle.", en: "Operational simplicity." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Accompagnement dédié.", en: "Dedicated support." }, sourceIds: S },
      ],
    }),
    section("persona-claire-dubois", {
      key: "food_hospitality",
      title: { fr: "Attentes restauration & hospitalité", en: "Food & hospitality expectations" },
      type: "bullets",
      order: 22,
      items: [
        { content: { fr: "Menus différents selon les territoires.", en: "Menus that vary by region." }, sourceIds: S, confidence: "HIGH" },
        { content: { fr: "Expériences exclusives.", en: "Exclusive experiences." }, sourceIds: S },
        { content: { fr: "Rencontres avec producteurs ou chefs.", en: "Meetings with producers or chefs." }, sourceIds: S },
        { content: { fr: "Animations premium.", en: "Premium entertainment." }, sourceIds: S },
        { content: { fr: "Moments favorisant les échanges business.", en: "Moments that encourage business conversations." }, sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "ideal_experience",
      title: { fr: "Expérience idéale", en: "Ideal experience" },
      type: "text",
      order: 24,
      items: [
        {
          content: {
            fr: "Chaque étape offre une expérience différente et mémorable qui justifie pleinement l'investissement dans le Tour.",
            en: "Each stage offers a different, memorable experience that fully justifies the investment in the Tour.",
          },
          sourceIds: S,
        },
      ],
    }),
  ],
});

/** Bilingual authoring sources (fed to the repository, resolved per request). */
export const TDF_PERSONA_SOURCES: PersonaSource[] = [david, sophie, thomas, claire];

/** Resolved to the project's default language (French) for direct consumers. */
export const TDF_PERSONAS = TDF_PERSONA_SOURCES.map((p) => localizePersona(p, "fr"));
export const TDF_SOURCES = TDF_SOURCE_SOURCES.map((s) => localizeSource(s, "fr"));
