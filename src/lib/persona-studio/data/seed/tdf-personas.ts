import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import { SEED_TIMESTAMP, section } from "../builders";
import {
  collectStatements,
  computeEvidenceCoverage,
} from "@/lib/persona-studio/utils/confidence";

/**
 * Personas Hospitalité Tour de France (contenu en français).
 *
 * Le brief de personas fourni fait office de source de vérité initiale : les
 * traits décrits sont donc tagués EVIDENCE contre ce document. Les véritables
 * inconnues (taille du groupe, besoins alimentaires, définition du ROI…) sont
 * taguées TO_VALIDATE pour que la couverture des preuves reste honnête et que
 * la Discovery ait des cibles claires. Aucun fait au-delà des données fournies
 * n'est inventé.
 */

export const TDF_PROJECT_ID = "proj-tdf-hospitality";

const BRIEF: SourceDocument = {
  id: "src-tdf-brief",
  projectId: TDF_PROJECT_ID,
  name: "Hospitalité Tour de France — Profils de personas (mai 2026)",
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

export const TDF_SOURCES: SourceDocument[] = [BRIEF];
const S = [BRIEF.id];

/** Finalise un persona : calcule la couverture des preuves à partir des affirmations. */
function finalise(persona: Omit<Persona, "evidenceCoverage">): Persona {
  const statements = collectStatements([
    ...persona.commonSections,
    ...persona.domainSections,
  ]);
  return { ...persona, evidenceCoverage: computeEvidenceCoverage(statements) };
}

const david = finalise({
  id: "persona-david-richardson",
  projectId: TDF_PROJECT_ID,
  name: "David Richardson",
  archetype: "Le Client VIP International",
  category: "Client VIP business international",
  family: "SPORTS_HOSPITALITY",
  segment: "Sports & Loisirs",
  oneLineEssence:
    "Un dirigeant international au temps compté qui utilise le Tour comme une scène premium et authentique pour recevoir ses clients stratégiques.",
  portraitUrl: "/persona-studio/tdf/david-richardson.png",
  accentColor: "#ffb81c",
  quote:
    "Le Tour de France est l'un des rares événements capables de réunir clients, partenaires et dirigeants dans un cadre prestigieux et authentique.",
  quoteType: "COMPOSITE",
  confidenceLevel: "MEDIUM",
  confidenceExplanation:
    "Construit à partir d'un brief de personas d'hospitalité structuré, et non d'entretiens de terrain. Les traits sont cohérents et sourcés, mais les comportements et préférences individuels des invités restent à valider.",
  demographicContext: {
    ageRange: "54",
    location: "Londres, Royaume-Uni",
    relevanceNote:
      "Un niveau de décision de PDG façonne l'attente d'un service premium, fluide et discret — noté parce qu'il oriente le comportement, pas comme un stéréotype.",
  },
  behaviouralTags: ["hôte", "temps compté", "recherche le prestige", "bâtisseur de relations"],
  sourceIds: S,
  status: "PUBLISHED",
  version: 1,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
  commonSections: [
    section("persona-david-richardson", {
      key: "essence",
      title: "Essence",
      type: "text",
      order: 0,
      items: [
        {
          content:
            "PDG d'un groupe technologique international, il assiste à 2 à 4 étapes par an, 1 à 2 jours chacune et parfois des étapes consécutives, en tant qu'invité d'un partenaire majeur du Tour.",
          sourceIds: S,
          confidence: "HIGH",
        },
      ],
    }),
    section("persona-david-richardson", {
      key: "context",
      title: "Contexte",
      type: "bullets",
      order: 1,
      items: [
        { content: "PDG d'un groupe technologique international.", sourceIds: S, confidence: "HIGH" },
        { content: "Basé à Londres, Royaume-Uni.", sourceIds: S, confidence: "HIGH" },
        { content: "Participe à 2 à 4 étapes par an, 1 à 2 jours par étape, parfois consécutives.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-david-richardson", {
      key: "motivations",
      title: "Motivations",
      type: "bullets",
      order: 6,
      items: [
        { content: "Prestige international.", sourceIds: S },
        { content: "Développement commercial.", sourceIds: S },
        { content: "Expérience exclusive.", sourceIds: S },
        { content: "Émotions partagées avec ses invités.", sourceIds: S },
        { content: "Découverte des territoires français.", sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "frustrations",
      title: "Frustrations",
      type: "bullets",
      order: 7,
      items: [
        { content: "Manque de personnalisation.", sourceIds: S, confidence: "HIGH" },
        { content: "Logistique ou transport complexes.", sourceIds: S, confidence: "HIGH" },
        { content: "Temps d'attente.", sourceIds: S, confidence: "HIGH" },
        { content: "Programme insuffisamment adapté d'une étape à l'autre.", sourceIds: S },
        { content: "Difficulté à comprendre la valeur des options premium.", sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "questions_to_validate",
      title: "Questions à valider",
      type: "bullets",
      order: 12,
      items: [
        { content: "Taille et niveau de séniorité typiques du groupe d'invités par étape.", status: "TO_VALIDATE", confidence: "LOW" },
        { content: "Préférences précises en matière de mets et de vins.", status: "TO_VALIDATE", confidence: "LOW" },
        { content: "Comment il définit une invitation réussie (ROI).", status: "TO_VALIDATE", confidence: "LOW" },
      ],
    }),
  ],
  domainSections: [
    section("persona-david-richardson", {
      key: "reasons_for_attending",
      title: "Raisons de sa venue",
      type: "bullets",
      order: 20,
      items: [
        { content: "Invité par un partenaire majeur du Tour.", sourceIds: S, confidence: "HIGH" },
        { content: "Reçoit des clients stratégiques.", sourceIds: S },
        { content: "Développe son réseau international.", sourceIds: S },
        { content: "Renforce des partenariats existants.", sourceIds: S },
        { content: "Vit une représentation premium du savoir-faire français.", sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "key_expectations",
      title: "Attentes clés",
      type: "needs",
      order: 21,
      items: [
        { content: "Accès privilégié et espaces VIP.", sourceIds: S, confidence: "HIGH" },
        { content: "Expérience fluide et sans friction.", sourceIds: S, confidence: "HIGH" },
        { content: "Hospitalité premium.", sourceIds: S, confidence: "HIGH" },
        { content: "Networking de haut niveau.", sourceIds: S },
        { content: "Service multilingue.", sourceIds: S },
        { content: "Logistique simplifiée.", sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "food_hospitality",
      title: "Attentes restauration & hospitalité",
      type: "bullets",
      order: 22,
      items: [
        { content: "Menus traditionnels expliqués.", sourceIds: S },
        { content: "Sélection de vins régionaux.", sourceIds: S },
        { content: "Expériences culinaires exclusives.", sourceIds: S },
        { content: "Service rapide et discret.", sourceIds: S },
        { content: "Signature gastronomique liée au territoire.", sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "ideal_experience",
      title: "Expérience idéale",
      type: "text",
      order: 24,
      items: [
        {
          content:
            "Faire découvrir l'excellence française à ses clients tout en partageant l'émotion du Tour dans un cadre privilégié.",
          sourceIds: S,
        },
      ],
    }),
  ],
});

const sophie = finalise({
  id: "persona-sophie-lambert",
  projectId: TDF_PROJECT_ID,
  name: "Sophie Lambert",
  archetype: "L'Invitée Famille",
  category: "Invitée famille",
  family: "SPORTS_HOSPITALITY",
  segment: "Sports & Loisirs",
  oneLineEssence:
    "Une cadre supérieure qui transforme une rare invitation partenaire en une journée exceptionnelle et sans complication avec son conjoint et ses enfants.",
  portraitUrl: "/persona-studio/tdf/sophie-lambert.png",
  accentColor: "#ec4899",
  quote:
    "Nous vivons un moment exceptionnel en famille, bien au-delà d'une simple compétition sportive.",
  quoteType: "COMPOSITE",
  confidenceLevel: "MEDIUM",
  confidenceExplanation:
    "Construit à partir du brief de personas d'hospitalité. Les traits liés au contexte familial sont sourcés, mais les besoins spécifiques des enfants accompagnants sont des hypothèses à valider.",
  demographicContext: {
    ageRange: "42",
    location: "Lyon, France",
    relevanceNote:
      "Elle vient avec son conjoint et ses enfants — c'est le groupe familial, et non l'âge, qui façonne ses besoins (confort, activités enfants, visibilité sur la course).",
  },
  behaviouralTags: ["famille d'abord", "créatrice de souvenirs", "recherche le confort", "occasionnelle"],
  sourceIds: S,
  status: "PUBLISHED",
  version: 1,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
  commonSections: [
    section("persona-sophie-lambert", {
      key: "essence",
      title: "Essence",
      type: "text",
      order: 0,
      items: [
        {
          content:
            "Cadre supérieure, elle assiste à une étape environ tous les 2 à 3 ans, sur une journée complète, avec son conjoint et ses enfants, en tant qu'invitée d'un partenaire du Tour.",
          sourceIds: S,
          confidence: "HIGH",
        },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "context",
      title: "Contexte",
      type: "bullets",
      order: 1,
      items: [
        { content: "Cadre supérieure, présente avec son conjoint et ses enfants.", sourceIds: S, confidence: "HIGH" },
        { content: "Basée à Lyon, France.", sourceIds: S, confidence: "HIGH" },
        { content: "Participe à une étape tous les 2 à 3 ans, sur une journée complète.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "motivations",
      title: "Motivations",
      type: "bullets",
      order: 6,
      items: [
        { content: "Temps de qualité en famille.", sourceIds: S, confidence: "HIGH" },
        { content: "Ambiance du Tour.", sourceIds: S },
        { content: "Moments mémorables.", sourceIds: S },
        { content: "Événement exceptionnel.", sourceIds: S },
        { content: "Découverte des régions françaises.", sourceIds: S },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "frustrations",
      title: "Frustrations",
      type: "bullets",
      order: 7,
      items: [
        { content: "Attente excessive.", sourceIds: S, confidence: "HIGH" },
        { content: "Parcours complexe.", sourceIds: S },
        { content: "Manque d'activités pour les enfants.", sourceIds: S, confidence: "HIGH" },
        { content: "Restauration peu adaptée aux familles.", sourceIds: S },
        { content: "Difficulté à voir les coureurs.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "questions_to_validate",
      title: "Questions à valider",
      type: "bullets",
      order: 12,
      items: [
        { content: "Âge des enfants et activités qui les captivent réellement.", status: "TO_VALIDATE", confidence: "LOW" },
        { content: "Tolérance aux files d'attente et à la chaleur avec de jeunes enfants.", status: "TO_VALIDATE", confidence: "LOW" },
      ],
    }),
  ],
  domainSections: [
    section("persona-sophie-lambert", {
      key: "reasons_for_attending",
      title: "Raisons de sa venue",
      type: "bullets",
      order: 20,
      items: [
        { content: "Invitée par un partenaire du Tour.", sourceIds: S, confidence: "HIGH" },
        { content: "Recherche une expérience mémorable à partager.", sourceIds: S },
        { content: "Événement accessible à toute la famille.", sourceIds: S },
        { content: "Souvenirs uniques.", sourceIds: S },
        { content: "Immersion dans l'ambiance du Tour.", sourceIds: S },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "key_expectations",
      title: "Attentes clés",
      type: "needs",
      order: 21,
      items: [
        { content: "Simplicité et confort.", sourceIds: S, confidence: "HIGH" },
        { content: "Activités adaptées aux enfants.", sourceIds: S, confidence: "HIGH" },
        { content: "Expérience immersive.", sourceIds: S },
        { content: "Animations interactives.", sourceIds: S },
        { content: "Souvenirs à rapporter.", sourceIds: S },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "food_hospitality",
      title: "Attentes restauration & hospitalité",
      type: "bullets",
      order: 22,
      items: [
        { content: "Buffet varié.", sourceIds: S },
        { content: "Choix pour les enfants.", sourceIds: S, confidence: "HIGH" },
        { content: "Produits régionaux.", sourceIds: S },
        { content: "Goûters et animations culinaires.", sourceIds: S },
        { content: "Service rapide.", sourceIds: S },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "ideal_experience",
      title: "Expérience idéale",
      type: "text",
      order: 24,
      items: [
        {
          content:
            "Les enfants découvrent le Tour de France pendant que la famille crée des souvenirs qu'elle partagera pendant des années.",
          sourceIds: S,
        },
      ],
    }),
  ],
});

const thomas = finalise({
  id: "persona-thomas-garcia",
  projectId: TDF_PROJECT_ID,
  name: "Thomas Garcia",
  archetype: "L'Invité Sportif",
  category: "Invité sportif",
  family: "SPORTS_HOSPITALITY",
  segment: "Sports & Loisirs",
  oneLineEssence:
    "Un passionné de cyclisme qui accepte l'invitation pour être au plus près de la course — l'hospitalité est un bonus, le sport est l'essentiel.",
  portraitUrl: "/persona-studio/tdf/thomas-garcia.png",
  accentColor: "#ef4444",
  quote:
    "Honnêtement, je suis surtout là pour les voir passer. Tout le reste est un bonus.",
  quoteType: "COMPOSITE",
  confidenceLevel: "MEDIUM",
  confidenceExplanation:
    "Construit à partir du brief de personas d'hospitalité. Ses priorités sportives sont clairement établies ; sa connaissance du cyclisme et le niveau d'analyse attendu restent des hypothèses à valider.",
  demographicContext: {
    ageRange: "45",
    location: "Toulouse, France",
    relevanceNote:
      "Cadre commercial invité par un partenaire — c'est le comportement de fan invité qui compte, pas l'intitulé du poste.",
  },
  behaviouralTags: ["fan avant tout", "recherche la proximité", "anti-corporate", "centré sport"],
  sourceIds: S,
  status: "PUBLISHED",
  version: 1,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
  commonSections: [
    section("persona-thomas-garcia", {
      key: "essence",
      title: "Essence",
      type: "text",
      order: 0,
      items: [
        {
          content:
            "Cadre commercial et passionné de cyclisme, invité par un partenaire du Tour pour une journée complète 1 à 2 fois par an, il vient avant tout pour la course elle-même.",
          sourceIds: S,
          confidence: "HIGH",
        },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "context",
      title: "Contexte",
      type: "bullets",
      order: 1,
      items: [
        { content: "Cadre commercial invité par un partenaire du Tour.", sourceIds: S, confidence: "HIGH" },
        { content: "Basé à Toulouse, France.", sourceIds: S, confidence: "HIGH" },
        { content: "Participe à 1 à 2 étapes par an, sur une journée complète.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "motivations",
      title: "Motivations",
      type: "bullets",
      order: 6,
      items: [
        { content: "Voir les coureurs de près.", sourceIds: S, confidence: "HIGH" },
        { content: "Comprendre la stratégie de course.", sourceIds: S },
        { content: "Vivre l'ambiance du peloton.", sourceIds: S },
        { content: "Découvrir les coulisses.", sourceIds: S },
        { content: "Partager sa passion du cyclisme.", sourceIds: S },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "frustrations",
      title: "Frustrations",
      type: "bullets",
      order: 7,
      items: [
        { content: "Longues périodes d'attente.", sourceIds: S, confidence: "HIGH" },
        { content: "Explications de course insuffisantes.", sourceIds: S, confidence: "HIGH" },
        { content: "Animations déconnectées du sport.", sourceIds: S, confidence: "HIGH" },
        { content: "Expérience parfois trop corporate.", sourceIds: S, confidence: "HIGH" },
        { content: "Difficulté à suivre l'action entre deux passages.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "questions_to_validate",
      title: "Questions à valider",
      type: "bullets",
      order: 12,
      items: [
        { content: "Sa connaissance du cyclisme et le niveau d'analyse qu'il souhaite.", status: "TO_VALIDATE", confidence: "LOW" },
        { content: "S'il quitterait l'espace hospitalité pour rejoindre le bord de route.", status: "TO_VALIDATE", confidence: "LOW" },
      ],
    }),
  ],
  domainSections: [
    section("persona-thomas-garcia", {
      key: "reasons_for_attending",
      title: "Raisons de sa venue",
      type: "bullets",
      order: 20,
      items: [
        { content: "Invité par un partenaire du Tour.", sourceIds: S, confidence: "HIGH" },
        { content: "Proximité avec la course.", sourceIds: S, confidence: "HIGH" },
        { content: "Immersion dans le cyclisme.", sourceIds: S },
        { content: "Ambiance unique du Tour.", sourceIds: S },
        { content: "Accès aux équipes et aux coulisses.", sourceIds: S },
        { content: "Moments sportifs authentiques.", sourceIds: S },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "key_expectations",
      title: "Attentes clés",
      type: "needs",
      order: 21,
      items: [
        { content: "Proximité avec les coureurs.", sourceIds: S, confidence: "HIGH" },
        { content: "Accès aux paddocks et aux équipes.", sourceIds: S },
        { content: "Informations et analyses de course.", sourceIds: S, confidence: "HIGH" },
        { content: "Commentaire sportif.", sourceIds: S },
        { content: "Ressentir l'intensité de la compétition.", sourceIds: S },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "food_hospitality",
      title: "Attentes restauration & hospitalité",
      type: "bullets",
      order: 22,
      items: [
        { content: "Grab-and-go premium.", sourceIds: S, confidence: "HIGH" },
        { content: "Produits régionaux.", sourceIds: S },
        { content: "Service rapide.", sourceIds: S, confidence: "HIGH" },
        { content: "Boissons fraîches faciles d'accès.", sourceIds: S },
        { content: "Déjeuner compatible avec le suivi de la course.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "ideal_experience",
      title: "Expérience idéale",
      type: "text",
      order: 24,
      items: [
        {
          content:
            "Profiter pleinement de la journée sans perdre le fil de la course et vivre le Tour au plus près de l'action sportive.",
          sourceIds: S,
        },
      ],
    }),
  ],
});

const claire = finalise({
  id: "persona-claire-dubois",
  projectId: TDF_PROJECT_ID,
  name: "Claire Dubois",
  archetype: "La Partenaire / Sponsor",
  category: "Sponsor / Partenaire du Tour",
  family: "SPORTS_HOSPITALITY",
  segment: "Sports & Loisirs",
  oneLineEssence:
    "Une directrice partenariats qui pilote un programme d'hospitalité sur toute la saison et doit rentabiliser chaque invitation.",
  portraitUrl: "/persona-studio/tdf/claire-dubois.png",
  accentColor: "#22c55e",
  quote:
    "Chaque invitation doit créer de la valeur pour nos clients et renforcer notre partenariat avec le Tour.",
  quoteType: "COMPOSITE",
  confidenceLevel: "MEDIUM",
  confidenceExplanation:
    "Construit à partir du brief de personas d'hospitalité. Ses objectifs opérationnels sont bien décrits ; les indicateurs qu'elle utilise pour prouver le ROI sont un inconnu clé à valider.",
  demographicContext: {
    ageRange: "48",
    location: "Lausanne, Suisse",
    relevanceNote:
      "Directrice partenariats & événementiel d'une grande marque partenaire — c'est le rôle d'opératrice sur toute la saison qui oriente ses besoins.",
  },
  behaviouralTags: ["opératrice", "orientée ROI", "recherche la différenciation", "endurance"],
  sourceIds: S,
  status: "PUBLISHED",
  version: 1,
  createdAt: SEED_TIMESTAMP,
  updatedAt: SEED_TIMESTAMP,
  commonSections: [
    section("persona-claire-dubois", {
      key: "essence",
      title: "Essence",
      type: "text",
      order: 0,
      items: [
        {
          content:
            "Directrice partenariats et événementiel d'une grande marque partenaire, présente sur 15 à 21 étapes tout au long du Tour, elle pilote le programme d'hospitalité de la marque.",
          sourceIds: S,
          confidence: "HIGH",
        },
      ],
    }),
    section("persona-claire-dubois", {
      key: "context",
      title: "Contexte",
      type: "bullets",
      order: 1,
      items: [
        { content: "Directrice partenariats et événementiel d'une grande marque partenaire.", sourceIds: S, confidence: "HIGH" },
        { content: "Basée à Lausanne, Suisse.", sourceIds: S, confidence: "HIGH" },
        { content: "Présente sur 15 à 21 étapes, tout au long du Tour.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "motivations",
      title: "Motivations",
      type: "bullets",
      order: 6,
      items: [
        { content: "Fidélisation des clients.", sourceIds: S, confidence: "HIGH" },
        { content: "Développement commercial.", sourceIds: S },
        { content: "Valorisation de la marque.", sourceIds: S },
        { content: "Création de moments exclusifs.", sourceIds: S },
        { content: "Retour sur investissement mesurable.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "frustrations",
      title: "Frustrations",
      type: "bullets",
      order: 7,
      items: [
        { content: "Lassitude après plusieurs étapes.", sourceIds: S, confidence: "HIGH" },
        { content: "Expérience répétitive.", sourceIds: S, confidence: "HIGH" },
        { content: "Difficulté à renouveler les surprises.", sourceIds: S, confidence: "HIGH" },
        { content: "Manque de personnalisation.", sourceIds: S },
        { content: "Coût perçu supérieur à la valeur visible.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "questions_to_validate",
      title: "Questions à valider",
      type: "bullets",
      order: 12,
      items: [
        { content: "Les indicateurs précis qu'elle utilise pour prouver le ROI à sa direction.", status: "TO_VALIDATE", confidence: "LOW" },
        { content: "Sa marge de décision pour personnaliser étape par étape.", status: "TO_VALIDATE", confidence: "LOW" },
      ],
    }),
  ],
  domainSections: [
    section("persona-claire-dubois", {
      key: "reasons_for_attending",
      title: "Raisons de sa venue",
      type: "bullets",
      order: 20,
      items: [
        { content: "Pilote le programme d'hospitalité de la marque.", sourceIds: S, confidence: "HIGH" },
        { content: "Satisfait les invités.", sourceIds: S },
        { content: "Génère du business.", sourceIds: S },
        { content: "Valorise la marque.", sourceIds: S },
        { content: "Démontre le retour sur investissement.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "key_expectations",
      title: "Attentes clés",
      type: "needs",
      order: 21,
      items: [
        { content: "Satisfaction maximale des invités.", sourceIds: S, confidence: "HIGH" },
        { content: "Différenciation entre les étapes.", sourceIds: S, confidence: "HIGH" },
        { content: "Personnalisation.", sourceIds: S },
        { content: "Simplicité opérationnelle.", sourceIds: S, confidence: "HIGH" },
        { content: "Accompagnement dédié.", sourceIds: S },
      ],
    }),
    section("persona-claire-dubois", {
      key: "food_hospitality",
      title: "Attentes restauration & hospitalité",
      type: "bullets",
      order: 22,
      items: [
        { content: "Menus différents selon les territoires.", sourceIds: S, confidence: "HIGH" },
        { content: "Expériences exclusives.", sourceIds: S },
        { content: "Rencontres avec producteurs ou chefs.", sourceIds: S },
        { content: "Animations premium.", sourceIds: S },
        { content: "Moments favorisant les échanges business.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "ideal_experience",
      title: "Expérience idéale",
      type: "text",
      order: 24,
      items: [
        {
          content:
            "Chaque étape offre une expérience différente et mémorable qui justifie pleinement l'investissement dans le Tour.",
          sourceIds: S,
        },
      ],
    }),
  ],
});

export const TDF_PERSONAS: Persona[] = [david, sophie, thomas, claire];
