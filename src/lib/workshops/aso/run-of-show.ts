import { stagePoints } from "@/lib/workshops/aso/profile";
import type {
  DayId,
  PhaseId,
  WorkshopScreen,
  WorkshopSequence,
} from "@/lib/workshops/aso/types";

export const WORKSHOP = {
  title: "Réenchanter l'hospitalité",
  subtitle: "Une étape et demie pour concevoir l'expérience VIP du Tour",
  client: "ASO × Sodexo Live!",
  where: "Sodexo Labs",
  when: "13–14 octobre 2026",
  j1: "09:00–17:30 · L'Itinérance",
  j2: "09:00–13:15 · Grand Départ & Grande Arrivée",
  audience: "12 à 16 personnes",
} as const;

export const PHASES: Record<
  PhaseId,
  { label: string; short: string; color: string; ink: string }
> = {
  discover: { label: "Discover", short: "DIS", color: "#6E6E6E", ink: "#ffffff" },
  define: { label: "Define", short: "DEF", color: "#E2231A", ink: "#ffffff" },
  develop: { label: "Develop", short: "DEV", color: "#00A651", ink: "#ffffff" },
  decide: { label: "Decide", short: "DEC", color: "#FFE500", ink: "#0E0E0E" },
  pause: { label: "Ravito", short: "PAUSE", color: "#B8B2A6", ink: "#0E0E0E" },
};

export const SEQUENCES: WorkshopSequence[] = [
  {
    id: "accueil",
    day: "j1",
    start: "08:45",
    durationMin: 15,
    phase: "pause",
    title: "Accueil",
    role: "Mise en condition",
    body: [
      "Café, viennoiserie, badge nominatif au format accréditation Tour.",
      "On reçoit comme on voudrait recevoir un invité à l'arrivée d'étape : une personne qui attend, qui connaît le nom, qui oriente.",
    ],
    rules: [
      "Badges prêts avant 08:45.",
      "Une personne à la porte, pas un tapis de signatures.",
    ],
    output: "La salle est en condition avant 09:00.",
    intensity: 18,
    col: "flat",
  },
  {
    id: "immersion",
    day: "j1",
    start: "09:00",
    durationMin: 15,
    phase: "discover",
    title: "Immersion d'ouverture",
    role: "Créer l'expérience commune de référence",
    body: [
      "Le pic et sa faille, vécus dans le même corps — une référence sensorielle pour toute la journée.",
    ],
    rules: [
      "On vit le moment avant d'en parler.",
      "À l'heure dite, on coupe. Les retardataires n'ont plus le pic.",
    ],
    output: "Le pic ET le pain point partagés.",
    script: "Séquence encore à affiner. Garder le silence après la coupe.",
    intensity: 48,
    col: "4",
  },
  {
    id: "restitution",
    day: "j1",
    start: "09:15",
    durationMin: 60,
    phase: "discover",
    title: "Restitution Discovery",
    role: "Poser les faits — et le regard neuf",
    body: [
      "Les trois sujets : Grand Départ, Itinérance, Grande Arrivée. Aujourd'hui on ne travaille que l'Itinérance.",
      "Debout autour du mur de preuves. Des pauses régulières pour les questions — pas un monologue.",
    ],
    rules: [
      "Les faits d'abord : ce que nous avons vu.",
      "Puis l'étonnement : ce que je n'attendais pas, ce que ça dit.",
      "On marque des temps de pause. On ne garde rien pour la fin.",
    ],
    output: "Une base de faits partagée, et le cadrage du sujet du jour.",
    intensity: 62,
    col: "3",
  },
  {
    id: "pause-am",
    day: "j1",
    start: "10:15",
    durationMin: 15,
    phase: "pause",
    title: "Pause",
    role: "Le mur de preuves reste affiché",
    body: ["On laisse la matière infuser. Le mur reste allumé."],
    rules: ["Pas de rangement. Les preuves restent visibles."],
    intensity: 22,
    col: "ravito",
  },
  {
    id: "ambition",
    day: "j1",
    start: "10:30",
    durationMin: 15,
    phase: "define",
    title: "Cadrage d'ambition",
    role: "Poser la barre ensemble",
    body: [
      "Pour vous, une expérience d'hospitalité pour une clientèle VIP, c'est quoi ?",
    ],
    rules: [
      "Un mot, un post-it. Écrit pour se lire à deux mètres.",
      "On les garde. On refait l'exercice à 17:20.",
    ],
    output: "Un mur de mots-clés. Point de départ de la journée.",
    intensity: 52,
    col: "3",
  },
  {
    id: "personae",
    day: "j1",
    start: "10:45",
    durationMin: 15,
    phase: "discover",
    title: "Personae en mouvement",
    role: "Se mettre en empathie avant de concevoir",
    body: [
      "Présentation courte. Puis chaque personne reçoit une fichette — à garder toute la journée.",
    ],
    rules: [
      "On ne conçoit pas pour « le VIP ».",
      "On conçoit pour David, Sophie, Claire, ou le client TO.",
    ],
    output: "Chaque participant a un invité précis en tête.",
    intensity: 42,
    col: "4",
  },
  {
    id: "themes",
    day: "j1",
    start: "11:00",
    durationMin: 120,
    phase: "define",
    title: "Travail sur l'Itinérance",
    role: "Format bloc par thématique — le cœur",
    body: [
      "Pas une journey linéaire. Six blocs. Les éléments marquants sont déjà posés.",
      "Tout ce dont un groupe a besoin est au mur : parcours, verbatims, insights, personas.",
    ],
    rules: [
      "Les thématiques et les + / − sont pré-remplis. On ne les rediscute pas.",
      "On écrit des How Might We, pas des solutions.",
      "Si le texte contient app, écran, QR : « attention, solution déguisée ».",
      "Le bench arrive après le HMW, jamais avant.",
    ],
    stop: "Ne pas sauter au concept. Le HMW d'abord.",
    output: "HMW et premières idées sous chaque bloc, avant le déjeuner.",
    intensity: 96,
    col: "hc",
  },
  {
    id: "ravito",
    day: "j1",
    start: "13:00",
    durationMin: 75,
    phase: "pause",
    title: "Déjeuner-prototype",
    role: "Éprouver l'ultra-RSE en vrai",
    body: [
      "Le déjeuner est un prototype. Zéro jetable, mobilité, contenant candidat, format panier testable pour Paris.",
    ],
    rules: [
      "On ne parle pas de la contrainte. On la vit.",
      "Un designer note ce qui se renverse, se pose mal, empêche de se serrer la main, finit à la poubelle.",
    ],
    output: "La contrainte « 1 200 personnes, pas d'arrière de service » cesse d'être théorique.",
    intensity: 28,
    col: "ravito",
  },
  {
    id: "revue",
    day: "j1",
    start: "14:15",
    durationMin: 60,
    phase: "define",
    title: "Revue des idées",
    role: "Reprise sur les blocs thématiques",
    body: [
      "Relire à tête reposée. Compléter, écarter, ajouter. Puis prioriser quand tous les blocs sont complets.",
    ],
    rules: [
      "Les idea cards restent disponibles pour un groupe qui tourne en rond.",
      "On priorise à la fin, pas thème par thème.",
    ],
    output: "Une short-list d'idées par thématique.",
    intensity: 72,
    col: "2",
  },
  {
    id: "pause-pm",
    day: "j1",
    start: "15:15",
    durationMin: 15,
    phase: "pause",
    title: "Pause",
    role: "Les blocs restent affichés",
    body: ["On ne range rien. La matière reste au mur."],
    rules: ["Les fiches commencées restent ouvertes."],
    intensity: 24,
    col: "ravito",
  },
  {
    id: "ideasheet",
    day: "j1",
    start: "15:30",
    durationMin: 60,
    phase: "develop",
    title: "Développer l'idea sheet",
    role: "De l'expérience à la proposition de valeur",
    body: [
      "Le terrain a été formel : zéro innovation sensorielle. Au moins trois registres renseignés, et une promesse.",
    ],
    rules: [
      "Nom, description, pour qui — d'abord.",
      "Puis au moins trois registres : vue, son, odeur, goût, toucher, émotionnel, imaginaire, waouh, fonctionnel.",
      "Une phrase de promesse : « Grâce à ___, je peux ___, ce que je ne pouvais pas faire avant. »",
    ],
    stop: "Pas de fiche au vote sans trois registres et une promesse.",
    output: "Une fiche par idée, matérialisée Garage ou IA, affichée pour les pitchs.",
    intensity: 88,
    col: "1",
  },
  {
    id: "pitch",
    day: "j1",
    start: "16:30",
    durationMin: 30,
    phase: "develop",
    title: "Le pitch",
    role: "Montrer, pas expliquer",
    body: [
      "Cinq minutes par groupe. On ne présente pas un concept, on joue un moment.",
    ],
    rules: [
      "90 secondes de la vie du persona. Puis 3 minutes pour la promesse et le modèle.",
      "Aucun slide.",
      "Deux questions seulement : qu'est-ce que ça change pour lui ? Qu'est-ce qui vous ferait dire non ?",
    ],
    output: "Le collectif a vu toutes les idées — condition d'un vote informé.",
    intensity: 78,
    col: "2",
  },
  {
    id: "vote",
    day: "j1",
    start: "17:00",
    durationMin: 20,
    phase: "decide",
    title: "Priorisation & engagement",
    role: "Une décision, pas une humeur",
    body: [
      "Trois gommettes, trois couleurs, une par critère. Puis un porteur, une prochaine étape, une date.",
    ],
    rules: [
      "Rouge — désirabilité invité : mon persona le raconterait-il en rentrant ?",
      "Jaune — différenciation Tour : si c'est reproductible ailleurs, ce n'est pas une signature.",
      "Vert — faisabilité en itinérance : tient-il 21 fois, monté et démonté chaque jour ?",
    ],
    stop: "Sans porteur, prochaine étape et date, le concept n'est pas retenu.",
    output: "Les concepts engagés, lisibles à l'œil sur la matrice.",
    intensity: 92,
    col: "sprint",
  },
  {
    id: "close-j1",
    day: "j1",
    start: "17:20",
    durationMin: 10,
    phase: "decide",
    title: "Ouverture vers J2",
    role: "Préparer Grand Départ et Grande Arrivée",
    body: [
      "Quels éléments d'aujourd'hui se transposent demain ? On reprend aussi les mots du matin.",
    ],
    rules: [
      "Tour de table court.",
      "On compare les post-its de 10:30 et ceux de maintenant.",
    ],
    output: "Les premières transpositions — matière d'entrée pour le Jour 2.",
    intensity: 36,
    col: "flat",
  },
  {
    id: "j2-accueil",
    day: "j2",
    start: "09:00",
    durationMin: 15,
    phase: "pause",
    title: "Accueil J2",
    role: "Reprendre la course",
    body: [
      "Rappel des engagements de J1. Deux groupes : Grand Départ, Grande Arrivée.",
    ],
    rules: ["On ne refait pas la restitution. On part des transpositions."],
    output: "Deux groupes ancrés, matière J1 visible.",
    intensity: 20,
    col: "flat",
  },
  {
    id: "j2-appropriation",
    day: "j2",
    start: "09:15",
    durationMin: 30,
    phase: "define",
    title: "Appropriation GD / GA",
    role: "Deux groupes, trois blocs chacun",
    body: [
      "G1 Grand Départ : accueil & entrée · ancrage local · temps mort.",
      "G2 Grande Arrivée : renouvellement annuel · attente sans repas · souvenir & signature.",
    ],
    rules: [
      "Même format bloc que J1.",
      "Les + / − sont déjà posés. On ne relit pas tout le terrain.",
    ],
    output: "Chaque groupe possède ses trois blocs.",
    intensity: 58,
    col: "3",
  },
  {
    id: "j2-hmw",
    day: "j2",
    start: "09:45",
    durationMin: 60,
    phase: "define",
    title: "HMW → inspiration → idées",
    role: "La même cascade, condensée",
    body: ["How Might We, puis bench révélé, puis idées. Plus vite qu'hier."],
    rules: [
      "HMW avant le bench.",
      "Une idée au moins par bloc, écrite pour se pitcher.",
    ],
    stop: "Ne pas copier une idée de J1 sans la retravailler pour le moment.",
    output: "HMW et idées sur les six blocs J2.",
    intensity: 80,
    col: "1",
  },
  {
    id: "j2-pause",
    day: "j2",
    start: "10:45",
    durationMin: 10,
    phase: "pause",
    title: "Pause",
    role: "Les blocs restent affichés",
    body: ["Dix minutes. On ne range pas."],
    rules: ["Les fiches commencées restent ouvertes."],
    intensity: 22,
    col: "ravito",
  },
  {
    id: "j2-fiches",
    day: "j2",
    start: "10:55",
    durationMin: 50,
    phase: "develop",
    title: "Fiches concept",
    role: "Course et Arrivée au même standard que l'Itinérance",
    body: [
      "Même fiche. Trois registres minimum. Promesse. Preuve. RSE. Apports Sodexo.",
    ],
    rules: [
      "Le standard de J1 tient : pas de fiche maigre au mur.",
      "Garage ou visuel. On doit pouvoir jouer le moment.",
    ],
    output: "Fiches accrochées, prêtes pour le vote.",
    intensity: 86,
    col: "hc",
  },
  {
    id: "j2-vote",
    day: "j2",
    start: "11:55",
    durationMin: 25,
    phase: "decide",
    title: "Priorisation & engagement",
    role: "On vote sur tous les concepts — Départ compris",
    body: [
      "Même trois critères. Les concepts de J1 reviennent dans le vote si on les porte encore.",
    ],
    rules: [
      "Une voix par critère, par personne.",
      "Porteur, prochaine étape, date — ou ce n'est pas retenu.",
    ],
    output: "Le portefeuille des deux jours, avec propriétaires.",
    intensity: 90,
    col: "sprint",
  },
  {
    id: "j2-pitch",
    day: "j2",
    start: "12:20",
    durationMin: 35,
    phase: "develop",
    title: "Le pitch",
    role: "On joue ce qu'on porte",
    body: ["Les concepts retenus se jouent. Le reste reste au mur."],
    rules: [
      "On joue le moment, on n'explique pas la slide.",
      "Le porteur est sur scène.",
    ],
    output: "Les concepts retenus ont été vus par tout le monde.",
    intensity: 74,
    col: "2",
  },
  {
    id: "j2-close",
    day: "j2",
    start: "12:55",
    durationMin: 20,
    phase: "decide",
    title: "Clôture",
    role: "Mesurer le chemin, figer la suite",
    body: [
      "On reprend les post-its du J1. Puis qui écrit quoi, quand part la restitution.",
    ],
    rules: [
      "Photos des murs avant de partir.",
      "La restitution part sous dix jours, ou elle ne part jamais.",
    ],
    output: "Engagements datés. Matière prête pour J+10.",
    intensity: 40,
    col: "flat",
  },
];

function screensForDay(day: DayId): WorkshopScreen[] {
  const prefix = day;
  const dayLabel = day === "j1" ? "J1 · Itinérance" : "J2 · GD / GA";
  const sequences = SEQUENCES.filter((sequence) => sequence.day === day);

  const screens: WorkshopScreen[] = [
    {
      id: `${prefix}-cover`,
      day,
      kind: "cover",
      label: "Couverture",
      tone: "dark",
    },
    {
      id: `${prefix}-profile`,
      day,
      kind: "profile",
      label: "Profil d'étape",
      tone: "dark",
    },
  ];

  const seenPhases = new Set<PhaseId>();

  for (const sequence of sequences) {
    if (sequence.phase !== "pause" && !seenPhases.has(sequence.phase)) {
      screens.push({
        id: `${prefix}-phase-${sequence.phase}`,
        day,
        kind: "intercalaire",
        label: PHASES[sequence.phase].label,
        tone: "dark",
        sequenceId: sequence.id,
      });
      seenPhases.add(sequence.phase);
    }

    screens.push({
      id: `${prefix}-seq-${sequence.id}`,
      day,
      sequenceId: sequence.id,
      kind: "sequence",
      label: sequence.title,
      tone: sequence.phase === "pause" ? "dark" : "light",
      timed: true,
      durationSec: sequence.durationMin * 60,
    });

    if (sequence.id === "restitution") {
      screens.push({
        id: `${prefix}-proof`,
        day,
        sequenceId: sequence.id,
        kind: "proof",
        label: "Mur de preuves",
        tone: "light",
        timed: true,
        durationSec: sequence.durationMin * 60,
      });
    }

    if (sequence.id === "themes" || sequence.id === "j2-appropriation") {
      screens.push({
        id: `${prefix}-themes`,
        day,
        sequenceId: sequence.id,
        kind: "themes",
        label: day === "j1" ? "Six blocs" : "Deux groupes",
        tone: "light",
        timed: true,
        durationSec: sequence.durationMin * 60,
      });
    }

    if (sequence.id === "ideasheet") {
      screens.push({
        id: `${prefix}-senses`,
        day,
        sequenceId: sequence.id,
        kind: "senses",
        label: "Neuf registres",
        tone: "light",
        timed: true,
        durationSec: sequence.durationMin * 60,
      });
    }

    if (sequence.id === "vote" || sequence.id === "j2-vote") {
      screens.push({
        id: `${prefix}-vote`,
        day,
        sequenceId: sequence.id,
        kind: "vote",
        label: "Trois critères",
        tone: "light",
        timed: true,
        durationSec: sequence.durationMin * 60,
      });
    }
  }

  screens.push({
    id: `${prefix}-thanks`,
    day,
    kind: "thanks",
    label: dayLabel,
    tone: "dark",
  });

  return screens;
}

export const SCREENS: WorkshopScreen[] = [
  ...screensForDay("j1"),
  ...screensForDay("j2"),
];

export const LEARNINGS = [
  {
    n: "01",
    title: "Le vrai « waouh », c'est l'accès à la course — pas la prestation",
    proof: "« Le klaxon de course, le contre-sens, les feux rouges franchis » cités avant le repas",
    terrains: 3,
  },
  {
    n: "02",
    title: "Le temps mort est le problème central, partout",
    proof: "« Il y a un temps mort où la seule chose à faire, c'est manger, boire »",
    terrains: 3,
  },
  {
    n: "03",
    title: "Le premier contact rate le moment de vérité",
    proof: "1 agent / 1 scan à Barcelone · « le récit d'une ville verrouillée » à Paris",
    terrains: 3,
  },
  {
    n: "04",
    title: "La fin n'est pas conçue : elle subit le démontage",
    proof: "Débarrassage au moment de l'arrivée du VIP · « fin brutale » · aucun after",
    terrains: 3,
  },
  {
    n: "05",
    title: "La hiérarchie des offres ne se voit pas",
    proof: "« Les dînettes, tu as les mêmes ici que là-bas » · 3 définitions contradictoires",
    terrains: 3,
  },
  {
    n: "06",
    title: "Le food est fort en volume, muet en récit",
    proof: "Chef invisible · composition connue au retrait · aucune allergie prise en compte",
    terrains: 3,
  },
  {
    n: "07",
    title: "La RSE est subie alors qu'elle est déjà mémorable",
    proof: "« C'est super dur » — mais les couverts logotés repartent comme souvenir",
    terrains: 3,
  },
] as const;

export const THEMES_J1 = [
  {
    id: "t1",
    title: "L'arrivée sur site & l'accueil",
    carries: "Le parking, la file, le scan, la première impression.",
    targets: "Business · famille · accrédité",
  },
  {
    id: "t2",
    title: "Le temps mort",
    carries: "1h30 à 3h d'attente avant le passage des coureurs.",
    targets: "Toutes cibles",
  },
  {
    id: "t3",
    title: "Le confort & le climat",
    carries: "Chaleur, ombre, assises, poussière — l'ancrage physique.",
    targets: "Toutes cibles · staff",
  },
  {
    id: "t4",
    title: "L'expérience bus & le food",
    carries: "Bus visitables, stands, dînettes. Le food est déjà le pic.",
    targets: "Business · tour-opérateur",
  },
  {
    id: "t5",
    title: "Le rapport à la course",
    carries: "Quelques secondes de passage après des heures d'attente.",
    targets: "Fan · néophyte",
  },
  {
    id: "t6",
    title: "La clôture & le retour",
    carries: "Le départ, le débarrassage, la sortie du site.",
    targets: "Toutes cibles",
  },
] as const;

export const THEMES_J2 = [
  { id: "g1a", group: "G1 · Grand Départ", title: "L'accueil & l'entrée" },
  { id: "g1b", group: "G1 · Grand Départ", title: "L'ancrage local sans le cliché" },
  { id: "g1c", group: "G1 · Grand Départ", title: "Le temps mort avant la course" },
  { id: "g2a", group: "G2 · Grande Arrivée", title: "Le renouvellement annuel" },
  { id: "g2b", group: "G2 · Grande Arrivée", title: "L'attente sans créneau repas" },
  { id: "g2c", group: "G2 · Grande Arrivée", title: "Le souvenir & la signature" },
] as const;

export const PERSONAS = [
  {
    id: "david",
    name: "David",
    line: "L'invité business · 2 à 4 étapes par an",
    pain: "Personnalisation, lisibilité des offres, temps d'attente.",
  },
  {
    id: "sophie",
    name: "Sophie",
    line: "La famille · une étape tous les 2–3 ans",
    pain: "Attente, activités enfants, voir les coureurs.",
  },
  {
    id: "claire",
    name: "Claire",
    line: "La partenaire · 15 à 21 étapes",
    pain: "Lassitude, répétition, renouveler la surprise.",
  },
  {
    id: "to",
    name: "Client TO",
    line: "Le payant via tour-opérateur · hypothèse",
    pain: "Segment le moins documenté du corpus.",
  },
] as const;

export const SENSES = [
  { id: "vue", label: "Vue", hint: "Scénographie, lumière, signalétique." },
  { id: "son", label: "Son", hint: "Ambiance, annonce, silence choisi." },
  { id: "odeur", label: "Odeur", hint: "Cuisine visible, terroir, diffusion." },
  { id: "gout", label: "Goût", hint: "Le pic déjà acquis — à prolonger." },
  { id: "toucher", label: "Toucher", hint: "Matières, contenant, ombre, assise." },
  { id: "emotionnel", label: "Émotionnel", hint: "Ce que ça fait dans le corps." },
  { id: "imaginaire", label: "Imaginaire", hint: "Ce que ça évoque du Tour." },
  { id: "waouh", label: "Waouh", hint: "Le moment qu'on raconte en rentrant." },
  { id: "fonctionnel", label: "Fonctionnel", hint: "Ce qui doit simplement marcher." },
] as const;

export const CRITERIA = [
  {
    id: "desirability",
    color: "#E2231A",
    label: "Désirabilité invité",
    q: "Mon persona le raconterait-il en rentrant ?",
  },
  {
    id: "differentiation",
    color: "#F2C200",
    label: "Différenciation Tour",
    q: "Est-ce reproductible ailleurs ? Si oui, ce n'est pas une signature.",
  },
  {
    id: "feasibility",
    color: "#00A651",
    label: "Faisabilité en itinérance",
    q: "Tient-il 21 fois de suite, monté et démonté chaque jour ?",
  },
] as const;

export function sequencesFor(day: DayId): WorkshopSequence[] {
  return SEQUENCES.filter((sequence) => sequence.day === day);
}

export function screensFor(day: DayId): WorkshopScreen[] {
  return SCREENS.filter((screen) => screen.day === day);
}

export function sequenceById(id: string): WorkshopSequence {
  const found = SEQUENCES.find((sequence) => sequence.id === id);
  if (!found) throw new Error(`Unknown sequence: ${id}`);
  return found;
}

export function screenById(id: string): WorkshopScreen {
  const found = SCREENS.find((screen) => screen.id === id);
  if (!found) throw new Error(`Unknown screen: ${id}`);
  return found;
}

export function profileFor(day: DayId) {
  return stagePoints(sequencesFor(day));
}

export function proofScreenId(day: DayId): string | null {
  const found = screensFor(day).find((screen) => screen.kind === "proof");
  return found?.id ?? null;
}
