import { SEED_TIMESTAMP, section } from "../builders";
import {
  localizePersona,
  localizeSource,
  sourceEvidenceCoverage,
  type LocalizedText,
  type PersonaSectionSource,
  type PersonaSource,
  type SourceDocumentSource,
} from "../localized";

/**
 * Corporate workplace archetypes (the Personix standard profiles), bilingual.
 *
 * Authored in English first (source of truth) and mirrored faithfully in
 * French. Described behaviour, eating moments and expectations come from the
 * Personix framework document and are tagged EVIDENCE against it. Local GOALS
 * and FRUSTRATIONS are intentionally left as TO_VALIDATE — they must be
 * co-defined with client HR & operations before the persona guides design.
 * Confidence is LOW for exactly this reason, a deliberate demonstration that
 * confidence ≠ evidence coverage.
 */

export const CORPORATE_PROJECT_ID = "proj-corporate-workplace";
const ACCENT = "#1e3a8a";

const FRAMEWORK_SOURCE: SourceDocumentSource = {
  id: "src-personix-framework",
  projectId: CORPORATE_PROJECT_ID,
  name: {
    en: "Personix — Standard Persona Profiles",
    fr: "Personix — Profils de personas standard",
  },
  type: "pdf",
  date: SEED_TIMESTAMP,
  author: "Sodexo × Ipsos",
  category: "EXISTING_PERSONA",
  extractedText:
    "Personix proprietary segmentation. 11 Eating Moments identified from a survey of 7,100+ eating moments among 3,800+ individuals across France, UK and USA. Standard workplace archetypes: Leader, Conductor, Enabler, Expert, Junior, Day Operator, Night Operator, Specialist.",
  processingStatus: "READY",
  confidentiality: "INTERNAL",
  createdAt: SEED_TIMESTAMP,
};

export const CORPORATE_SOURCE_SOURCES: SourceDocumentSource[] = [FRAMEWORK_SOURCE];
const S = [FRAMEWORK_SOURCE.id];

type MomentSource = { title: LocalizedText; content: LocalizedText };

/** Recurring Personix eating moments, translated once and reused. */
const MOMENTS = {
  nomadicDiscovery: {
    title: { en: "Nomadic Discovery", fr: "Découverte nomade" },
    content: {
      en: "A mostly solo, on-the-go meal, often picked up on the high street as a way to discover something new, with high expectations for quality and sustainability.",
      fr: "Un repas essentiellement solo, pris sur le pouce, souvent acheté en ville pour découvrir quelque chose de nouveau, avec des attentes élevées en matière de qualité et de durabilité.",
    },
  },
  myHealthyMeal: {
    title: { en: "My Healthy Meal", fr: "Mon repas sain" },
    content: {
      en: "A healthy, tailor-made meal designed to suit specific eating habits, made with fresh, natural and sustainable ingredients and meant to be savored in the workplace restaurant or outside.",
      fr: "Un repas sain et sur mesure, conçu pour s'adapter à des habitudes alimentaires spécifiques, préparé avec des ingrédients frais, naturels et durables, à savourer au restaurant d'entreprise ou à l'extérieur.",
    },
  },
  myHealthyMealJunior: {
    title: { en: "My Healthy Meal", fr: "Mon repas sain" },
    content: {
      en: "A healthy, tailor-made meal suited to specific eating habits, made with fresh, natural and sustainable ingredients, encouraging discovery while being savored in or outside the workplace.",
      fr: "Un repas sain et sur mesure, adapté à des habitudes alimentaires spécifiques, préparé avec des ingrédients frais, naturels et durables, qui encourage la découverte tout en se savourant sur le lieu de travail ou à l'extérieur.",
    },
  },
  specialGathering: {
    title: { en: "Special Gathering", fr: "Rassemblement spécial" },
    content: {
      en: "A shared moment of celebration where co-workers come together in a meeting room or casual space, around freshly prepared catering.",
      fr: "Un moment de célébration partagé où les collègues se réunissent dans une salle de réunion ou un espace informel, autour d'un traiteur préparé sur le moment.",
    },
  },
  routineMorningBoost: {
    title: { en: "Routine Morning Boost", fr: "Coup de fouet matinal" },
    content: {
      en: "A quick, convenient, healthy, and inexpensive ritual solo meal usually consumed at a desk or workstation to efficiently get the energy boost needed to start the workday.",
      fr: "Un repas solo rituel, rapide, pratique, sain et peu coûteux, généralement pris au bureau ou au poste de travail pour trouver efficacement l'énergie nécessaire pour démarrer la journée.",
    },
  },
  spontaneousSocialBreak: {
    title: { en: "Spontaneous Social Break", fr: "Pause conviviale spontanée" },
    content: {
      en: "A short but relaxed group eating moment, sharing a generous but healthy meal or snack in a break room or casual space while connecting informally with colleagues.",
      fr: "Un moment de repas en groupe court mais détendu, où l'on partage un repas ou un en-cas généreux mais sain dans une salle de pause ou un espace informel, tout en échangeant de façon informelle avec ses collègues.",
    },
  },
  informalLunchTogether: {
    title: { en: "Informal Lunch Together", fr: "Déjeuner informel ensemble" },
    content: {
      en: "A ritual of togetherness where colleagues gather and relax over a freshly prepared lunch, chosen from the wide, good value offer of the workplace restaurant.",
      fr: "Un rituel de convivialité où les collègues se réunissent et se détendent autour d'un déjeuner préparé sur le moment, choisi dans l'offre large et à bon rapport qualité-prix du restaurant d'entreprise.",
    },
  },
  refuelingBudgetMeal: {
    title: { en: "Refueling Budget Meal", fr: "Repas économique pour recharger" },
    content: {
      en: "A satisfying, budget-friendly solo meal with generous portions to disconnect and recharge after intense work hours, mostly consumed in a quiet break room atmosphere.",
      fr: "Un repas solo satisfaisant et économique, aux portions généreuses, pour déconnecter et se ressourcer après des heures de travail intenses, généralement pris dans l'atmosphère calme d'une salle de pause.",
    },
  },
  indulgentSnack: {
    title: { en: "Indulgent Snack", fr: "En-cas plaisir" },
    content: {
      en: "A quick and convenient, tasty solo snacking moment at a desk or workstation that serves as an afternoon break for comfort and reward to unwind and recharge.",
      fr: "Un moment de grignotage solo rapide, pratique et savoureux, au bureau ou au poste de travail, qui fait office de pause de l'après-midi, pour le réconfort et la récompense, afin de se détendre et de se ressourcer.",
    },
  },
  meTimeLunch: {
    title: { en: "Me-Time Lunch", fr: "Déjeuner pour soi" },
    content: {
      en: "A solo lunch, mainly enjoyed in a break room, to relax and savor a quiet moment with good and generous food.",
      fr: "Un déjeuner solo, principalement pris dans une salle de pause, pour se détendre et savourer un moment de calme avec une nourriture bonne et généreuse.",
    },
  },
  greenSpace: {
    title: { en: "Green Space", fr: "Espace vert" },
    content: {
      en: "An outdoor meal (in a park…) where food choices are guided by sustainability, local and seasonal cues, and specific dietary needs.",
      fr: "Un repas en plein air (dans un parc…) où les choix alimentaires sont guidés par la durabilité, les repères locaux et de saison, et des besoins alimentaires spécifiques.",
    },
  },
  energizingSnack: {
    title: { en: "Energizing Snack", fr: "En-cas énergisant" },
    content: {
      en: "A quick, solo snack at a desk or workstation that provides comfort and reward while giving a boost to stay sharp and focused.",
      fr: "Un en-cas solo rapide, au bureau ou au poste de travail, qui apporte réconfort et récompense tout en donnant un coup de fouet pour rester vif et concentré.",
    },
  },
} satisfies Record<string, MomentSource>;

type ArchetypeSpec = {
  id: string;
  name: LocalizedText;
  archetype: LocalizedText;
  category: LocalizedText;
  ageRange: string;
  essence: LocalizedText;
  quote: LocalizedText;
  tags: LocalizedText[];
  dailyJob: LocalizedText[];
  lifestyle: LocalizedText;
  eatingMoments: MomentSource[];
  foodExpectations: LocalizedText[];
  workplaceExpectations: LocalizedText[];
};

const ARCHETYPES: ArchetypeSpec[] = [
  {
    id: "persona-corp-leader",
    name: { en: "The Leader", fr: "Le Leader" },
    archetype: { en: "The Leader", fr: "Le Leader" },
    category: {
      en: "Strategic Leader / Executive Decision-Maker",
      fr: "Dirigeant stratégique / Décideur exécutif",
    },
    ageRange: "45–54",
    essence: {
      en: "A decision-maker operating across teams and locations, intolerant of friction, who expects services to keep pace with an executive agenda.",
      fr: "Un décideur qui opère à travers les équipes et les sites, intolérant aux frictions, qui attend des services qu'ils suivent le rythme d'un agenda de dirigeant.",
    },
    quote: {
      en: "My day is a constant stream of decisions. When something slows me down or makes me think twice, it's already failing.",
      fr: "Ma journée est un flot constant de décisions. Quand quelque chose me ralentit ou me fait hésiter, c'est déjà un échec.",
    },
    tags: [
      { en: "decision-maker", fr: "décideur" },
      { en: "friction-averse", fr: "réfractaire aux frictions" },
      { en: "premium-seeking", fr: "recherche le premium" },
      { en: "sustainability-minded", fr: "sensible à la durabilité" },
    ],
    dailyJob: [
      { en: "Fragmented agenda, rapid topic shifts.", fr: "Agenda fragmenté, changements de sujet rapides." },
      { en: "Operates across teams, locations and priorities.", fr: "Opère à travers les équipes, les sites et les priorités." },
      { en: "Often meets with internal and external stakeholders.", fr: "Rencontre souvent des parties prenantes internes et externes." },
      { en: "Low tolerance for operational issues or inefficiencies.", fr: "Faible tolérance aux problèmes opérationnels ou aux inefficacités." },
      { en: "Relies on assistants, teams and systems to execute seamlessly.", fr: "S'appuie sur des assistants, des équipes et des systèmes pour une exécution sans accroc." },
    ],
    lifestyle: {
      en: "For The Leader, success means results. Work comes first, but impact goes beyond the company, with daily choices guided by sustainability and a strong focus on physical and mental health.",
      fr: "Pour le Leader, réussir, c'est obtenir des résultats. Le travail passe avant tout, mais l'impact dépasse l'entreprise, avec des choix quotidiens guidés par la durabilité et une forte attention à la santé physique et mentale.",
    },
    eatingMoments: [MOMENTS.nomadicDiscovery, MOMENTS.myHealthyMeal, MOMENTS.specialGathering],
    foodExpectations: [
      { en: "High-quality ingredients.", fr: "Des ingrédients de haute qualité." },
      { en: "Refined, chef-crafted food.", fr: "Une cuisine raffinée, élaborée par un chef." },
      { en: "Willing to pay a premium for quality.", fr: "Prêt à payer un supplément pour la qualité." },
      { en: "Quick, flexible eating formats.", fr: "Des formats de repas rapides et flexibles." },
      { en: "Discreet service, minimal wait.", fr: "Un service discret, avec un minimum d'attente." },
      { en: "Health and diet-aligned options.", fr: "Des options alignées sur la santé et le régime alimentaire." },
    ],
    workplaceExpectations: [
      { en: "Designed to match an executive pace.", fr: "Conçu pour s'adapter au rythme d'un dirigeant." },
      { en: "Interactions optimise time and attention.", fr: "Des interactions qui optimisent le temps et l'attention." },
      { en: "Confidentiality and discretion.", fr: "Confidentialité et discrétion." },
      { en: "Expects premium, frictionless services.", fr: "Attend des services premium et sans friction." },
    ],
  },
  {
    id: "persona-corp-conductor",
    name: { en: "The Conductor", fr: "Le Chef d'orchestre" },
    archetype: { en: "The Conductor", fr: "Le Chef d'orchestre" },
    category: {
      en: "People Manager / Performance Enabler",
      fr: "Manager d'équipe / Catalyseur de performance",
    },
    ageRange: "45–54",
    essence: {
      en: "A people manager balancing delivery and team needs, who values tools and spaces that keep the team flowing.",
      fr: "Un manager d'équipe qui équilibre les livrables et les besoins de son équipe, et qui valorise les outils et les espaces qui maintiennent la fluidité de l'équipe.",
    },
    quote: {
      en: "I'm constantly balancing delivery and people. When my team flows, everything else follows.",
      fr: "J'équilibre en permanence les livrables et les personnes. Quand mon équipe est fluide, tout le reste suit.",
    },
    tags: [
      { en: "coordinator", fr: "coordinateur" },
      { en: "people-focused", fr: "centré sur l'humain" },
      { en: "recognition-seeking", fr: "recherche la reconnaissance" },
      { en: "context-switcher", fr: "multitâche" },
    ],
    dailyJob: [
      { en: "Frequent meetings, check-ins, and one-to-ones.", fr: "Réunions, points d'étape et entretiens individuels fréquents." },
      { en: "Prioritisation between delivery and people needs.", fr: "Arbitrage entre les livrables et les besoins humains." },
      { en: "Coordination across teams and stakeholders.", fr: "Coordination entre les équipes et les parties prenantes." },
      { en: "Administrative tasks tied to daily management.", fr: "Tâches administratives liées à la gestion quotidienne." },
      { en: "Frequent context-switching.", fr: "Changements de contexte fréquents." },
    ],
    lifestyle: {
      en: "The Conductor thrives in dynamic, varied, people-focused environments. Deeply connected to the organisation, they prioritise work and seek recognition beyond it. They navigate daily pressure while finding moments outside of work to recharge and treat themselves.",
      fr: "Le Chef d'orchestre s'épanouit dans des environnements dynamiques, variés et centrés sur l'humain. Profondément attaché à l'organisation, il fait passer le travail en priorité et recherche une reconnaissance au-delà de celui-ci. Il compose avec la pression quotidienne tout en trouvant, en dehors du travail, des moments pour se ressourcer et se faire plaisir.",
    },
    eatingMoments: [MOMENTS.routineMorningBoost, MOMENTS.spontaneousSocialBreak, MOMENTS.informalLunchTogether],
    foodExpectations: [
      { en: "Balanced, energising meals.", fr: "Des repas équilibrés et énergisants." },
      { en: "Consistent quality and taste.", fr: "Une qualité et un goût constants." },
      { en: "Quick, convenient formats for meeting-heavy days.", fr: "Des formats rapides et pratiques pour les journées chargées en réunions." },
      { en: "Easy-to-share formats for team moments.", fr: "Des formats faciles à partager pour les moments d'équipe." },
    ],
    workplaceExpectations: [
      { en: "Tools that simplify planning, coordination, and decision-making.", fr: "Des outils qui simplifient la planification, la coordination et la prise de décision." },
      { en: "Visibility on team workload, priorities, and delivery progress.", fr: "De la visibilité sur la charge de l'équipe, les priorités et l'avancement des livrables." },
      { en: "Spaces that allow formal and informal exchanges.", fr: "Des espaces qui permettent des échanges formels et informels." },
      { en: "Environment that supports team engagement.", fr: "Un environnement qui favorise l'engagement de l'équipe." },
      { en: "Recognition as both a leader and an enabler.", fr: "Une reconnaissance à la fois comme leader et comme facilitateur." },
    ],
  },
  {
    id: "persona-corp-enabler",
    name: { en: "The Enabler", fr: "Le Facilitateur" },
    archetype: { en: "The Enabler", fr: "Le Facilitateur" },
    category: {
      en: "Support, Coordination & Enabler roles",
      fr: "Rôles de support, de coordination et de facilitation",
    },
    ageRange: "35–44",
    essence: {
      en: "The person others call when something breaks — high responsibility, low authority, dependent on reliable systems.",
      fr: "La personne que l'on appelle quand quelque chose casse — forte responsabilité, faible autorité, dépendante de systèmes fiables.",
    },
    quote: {
      en: "I'm the one people call when something breaks. I just need clear systems so I can fix it fast.",
      fr: "Je suis celui qu'on appelle quand quelque chose casse. J'ai juste besoin de systèmes clairs pour pouvoir réparer vite.",
    },
    tags: [
      { en: "fixer", fr: "réparateur" },
      { en: "task-switcher", fr: "multitâche" },
      { en: "social", fr: "sociable" },
      { en: "system-dependent", fr: "dépendant des systèmes" },
    ],
    dailyJob: [
      { en: "High task-switching throughout the day.", fr: "De nombreux changements de tâches tout au long de la journée." },
      { en: "Coordination across multiple teams or stakeholders.", fr: "Coordination entre plusieurs équipes ou parties prenantes." },
      { en: "Relies heavily on digital systems.", fr: "S'appuie fortement sur les systèmes numériques." },
      { en: "Frequent interruptions and urgent requests.", fr: "Interruptions fréquentes et demandes urgentes." },
      { en: "High responsibility, low authority.", fr: "Forte responsabilité, faible autorité." },
    ],
    lifestyle: {
      en: "The Enabler likes keeping things running smoothly, thriving in fast-paced, highly social environments – at work and in life. While money matters more than work itself, the pressure of making things work can sometimes turn into stress.",
      fr: "Le Facilitateur aime que tout fonctionne sans accroc et s'épanouit dans des environnements rapides et très sociaux — au travail comme dans la vie. Si l'argent compte plus que le travail lui-même, la pression de faire en sorte que tout fonctionne peut parfois se transformer en stress.",
    },
    eatingMoments: [MOMENTS.spontaneousSocialBreak, MOMENTS.specialGathering, MOMENTS.refuelingBudgetMeal],
    foodExpectations: [
      { en: "Quick, practical meal solutions.", fr: "Des solutions de repas rapides et pratiques." },
      { en: "Flexible formats that fit irregular eating times.", fr: "Des formats flexibles adaptés à des horaires de repas irréguliers." },
      { en: "Affordable options.", fr: "Des options abordables." },
      { en: "Simple, familiar choices.", fr: "Des choix simples et familiers." },
      { en: "Filling and generous portions.", fr: "Des portions rassasiantes et généreuses." },
    ],
    workplaceExpectations: [
      { en: "Reliable systems and tools.", fr: "Des systèmes et des outils fiables." },
      { en: "Clear, centralised information.", fr: "Une information claire et centralisée." },
      { en: "Responsive collaboration and functional support.", fr: "Une collaboration réactive et un support fonctionnel." },
      { en: "Recognition for keeping operations running smoothly.", fr: "De la reconnaissance pour maintenir le bon fonctionnement des opérations." },
    ],
  },
  {
    id: "persona-corp-expert",
    name: { en: "The Expert", fr: "L'Expert" },
    archetype: { en: "The Expert", fr: "L'Expert" },
    category: {
      en: "Focus optimizer / Cognitive specialist",
      fr: "Optimiseur de concentration / Spécialiste cognitif",
    },
    ageRange: "35–44",
    essence: {
      en: "A deep-focus problem solver who needs quiet, reliable tools and autonomy to do work that matters.",
      fr: "Un résolveur de problèmes en concentration profonde, qui a besoin de calme, d'outils fiables et d'autonomie pour réaliser un travail qui compte.",
    },
    quote: {
      en: "When I have the space to focus and the right tools around me, I can solve problems that really matter.",
      fr: "Quand j'ai l'espace pour me concentrer et les bons outils autour de moi, je peux résoudre des problèmes qui comptent vraiment.",
    },
    tags: [
      { en: "deep-focus", fr: "concentration profonde" },
      { en: "autonomous", fr: "autonome" },
      { en: "precision", fr: "précision" },
      { en: "low-interruption", fr: "peu d'interruptions" },
    ],
    dailyJob: [
      { en: "Brings expertise to solve complex problems.", fr: "Apporte son expertise pour résoudre des problèmes complexes." },
      { en: "Long periods of concentration.", fr: "De longues périodes de concentration." },
      { en: "Relies on data, digital tools and documentation.", fr: "S'appuie sur les données, les outils numériques et la documentation." },
      { en: "Works primarily independently, sometimes collaborates with others.", fr: "Travaille principalement de façon autonome, collabore parfois avec d'autres." },
    ],
    lifestyle: {
      en: "Each day is centred on deep focus for The Expert, where work comes first and precision matters. With the same discipline, The Expert invests equally in maintaining physical and mental health.",
      fr: "Chaque journée de l'Expert est centrée sur une concentration profonde, où le travail passe avant tout et où la précision compte. Avec la même discipline, l'Expert investit tout autant dans le maintien de sa santé physique et mentale.",
    },
    eatingMoments: [MOMENTS.routineMorningBoost, MOMENTS.indulgentSnack, MOMENTS.meTimeLunch],
    foodExpectations: [
      { en: "Healthy and balanced meals for sustained focus.", fr: "Des repas sains et équilibrés pour une concentration durable." },
      { en: "Quick, convenient, and easily accessible options.", fr: "Des options rapides, pratiques et facilement accessibles." },
      { en: "Customisable choices to fit needs.", fr: "Des choix personnalisables adaptés à ses besoins." },
      { en: "Flexibility to eat alone or with colleagues.", fr: "La liberté de manger seul ou avec des collègues." },
    ],
    workplaceExpectations: [
      { en: "Quiet, low-distraction, high-efficiency environment.", fr: "Un environnement calme, peu propice aux distractions et propice à l'efficacité." },
      { en: "Reliable and seamless digital tools.", fr: "Des outils numériques fiables et fluides." },
      { en: "Smooth shifts between solo and team work.", fr: "Des transitions fluides entre travail solo et travail d'équipe." },
      { en: "Autonomy and control over tasks.", fr: "De l'autonomie et de la maîtrise sur ses tâches." },
      { en: "Minimal unnecessary interactions.", fr: "Un minimum d'interactions superflues." },
    ],
  },
  {
    id: "persona-corp-junior",
    name: { en: "The Junior", fr: "Le Junior" },
    archetype: { en: "The Junior", fr: "Le Junior" },
    category: {
      en: "New joiner / Transitional persona",
      fr: "Nouvel arrivant / Persona de transition",
    },
    ageRange: "18–34",
    essence: {
      en: "A new joiner learning the rules, tools and culture, who wants clear guidance and a sense of belonging.",
      fr: "Un nouvel arrivant qui apprend les règles, les outils et la culture, et qui souhaite des repères clairs et un sentiment d'appartenance.",
    },
    quote: {
      en: "Every day I'm learning the rules, the tools, and the culture. I just want to know I'm on the right track.",
      fr: "Chaque jour, j'apprends les règles, les outils et la culture. Je veux juste savoir que je suis sur la bonne voie.",
    },
    tags: [
      { en: "learner", fr: "apprenant" },
      { en: "social", fr: "sociable" },
      { en: "trend-driven", fr: "attiré par les tendances" },
      { en: "seeking-belonging", fr: "en quête d'appartenance" },
    ],
    dailyJob: [
      { en: "High learning curve and information intake.", fr: "Forte courbe d'apprentissage et grande quantité d'informations à absorber." },
      { en: "Relies on others for guidance.", fr: "Compte sur les autres pour être guidé." },
      { en: "Navigates unfamiliar systems.", fr: "Navigue dans des systèmes qui ne lui sont pas familiers." },
      { en: "Learns through trial-and-error.", fr: "Apprend par essais et erreurs." },
      { en: "Need to prove capabilities.", fr: "Besoin de faire ses preuves." },
    ],
    lifestyle: {
      en: "Highly social, each day is about connection and discovery for The Junior – at work and beyond. Work matters, but income matters more than recognition. Curious and trend-driven, they seek new experiences while balancing indulgence with well-being.",
      fr: "Très sociable, le Junior vit chaque journée sous le signe de la connexion et de la découverte — au travail et au-delà. Le travail compte, mais le revenu compte plus que la reconnaissance. Curieux et attiré par les tendances, il recherche de nouvelles expériences tout en équilibrant plaisir et bien-être.",
    },
    eatingMoments: [MOMENTS.greenSpace, MOMENTS.myHealthyMealJunior, MOMENTS.spontaneousSocialBreak],
    foodExpectations: [
      { en: "Trendy options to discover new flavours.", fr: "Des options tendance pour découvrir de nouvelles saveurs." },
      { en: "Flexible and customisable meals.", fr: "Des repas flexibles et personnalisables." },
      { en: "Affordable, good value for money.", fr: "Abordables, avec un bon rapport qualité-prix." },
      { en: "Wide choice of filling options.", fr: "Un large choix d'options rassasiantes." },
    ],
    workplaceExpectations: [
      { en: "Supports routine building.", fr: "Aide à construire une routine." },
      { en: "Clear guidance and onboarding.", fr: "Un accompagnement et une intégration clairs." },
      { en: "Easy access to responsive support.", fr: "Un accès facile à un support réactif." },
      { en: "Sense of inclusion and belonging.", fr: "Un sentiment d'inclusion et d'appartenance." },
      { en: "Frequent constructive feedback.", fr: "Des retours constructifs fréquents." },
      { en: "Simple, intuitive systems and spaces.", fr: "Des systèmes et des espaces simples et intuitifs." },
    ],
  },
  {
    id: "persona-corp-day-operator",
    name: { en: "The Day Operator", fr: "L'Opérateur de jour" },
    archetype: { en: "The Day Operator", fr: "L'Opérateur de jour" },
    category: {
      en: "Operational / Frontline day-shift worker",
      fr: "Opérationnel / Travailleur posté de jour en première ligne",
    },
    ageRange: "18–44",
    essence: {
      en: "A frontline day-shift worker on a minute-planned rhythm who needs services ready exactly when the short break allows.",
      fr: "Un travailleur posté de jour en première ligne, sur un rythme planifié à la minute, qui a besoin de services prêts précisément au moment où sa courte pause le permet.",
    },
    quote: {
      en: "My day is planned down to the minute. If things aren't ready when I am, everything gets harder.",
      fr: "Ma journée est planifiée à la minute. Si les choses ne sont pas prêtes quand je le suis, tout devient plus difficile.",
    },
    tags: [
      { en: "routine-driven", fr: "routinier" },
      { en: "time-boxed", fr: "au temps compté" },
      { en: "value-seeking", fr: "recherche le bon rapport qualité-prix" },
      { en: "fairness-minded", fr: "attaché à l'équité" },
    ],
    dailyJob: [
      { en: "Fixed daytime working hours.", fr: "Des horaires de travail de jour fixes." },
      { en: "Short, fixed breaks.", fr: "Des pauses courtes et fixes." },
      { en: "Structured, process-driven work paced by operations or customer flow.", fr: "Un travail structuré, rythmé par les processus, les opérations ou le flux de clients." },
      { en: "Physically and/or procedurally demanding tasks.", fr: "Des tâches physiquement et/ou procéduralement exigeantes." },
      { en: "Regular interaction with supervisors and coworkers.", fr: "Des interactions régulières avec les superviseurs et les collègues." },
    ],
    lifestyle: {
      en: "Each day follows a steady rhythm for The Day Operator, where routine brings both comfort and fatigue. Focused on getting the job done, they value fair treatment and rewards. Sociable by nature, they enjoy shared moments, balancing tiredness with small indulgences to recharge.",
      fr: "Chaque journée de l'Opérateur de jour suit un rythme régulier, où la routine apporte à la fois du confort et de la fatigue. Concentré sur l'accomplissement de sa tâche, il attache de l'importance à un traitement équitable et aux récompenses. Sociable par nature, il apprécie les moments partagés, équilibrant la fatigue par de petits plaisirs pour se ressourcer.",
    },
    eatingMoments: [MOMENTS.refuelingBudgetMeal, MOMENTS.routineMorningBoost, MOMENTS.spontaneousSocialBreak],
    foodExpectations: [
      { en: "Affordable, value-for-money meals.", fr: "Des repas abordables et au bon rapport qualité-prix." },
      { en: "Filling, comforting portions.", fr: "Des portions rassasiantes et réconfortantes." },
      { en: "Fast service, minimal waiting.", fr: "Un service rapide, avec un minimum d'attente." },
      { en: "Familiar, consistent quality options.", fr: "Des options familières et de qualité constante." },
      { en: "Balanced meals to support energy.", fr: "Des repas équilibrés pour soutenir l'énergie." },
    ],
    workplaceExpectations: [
      { en: "Seamless access to essential services during breaks.", fr: "Un accès sans friction aux services essentiels pendant les pauses." },
      { en: "Clear information and instructions.", fr: "Une information et des instructions claires." },
      { en: "Predictable routines and schedules.", fr: "Des routines et des horaires prévisibles." },
      { en: "Fair treatment across teams.", fr: "Un traitement équitable entre les équipes." },
    ],
  },
  {
    id: "persona-corp-night-operator",
    name: { en: "The Night Operator", fr: "L'Opérateur de nuit" },
    archetype: { en: "The Night Operator", fr: "L'Opérateur de nuit" },
    category: {
      en: "Operational / Frontline night-shift worker",
      fr: "Opérationnel / Travailleur posté de nuit en première ligne",
    },
    ageRange: "18–54",
    essence: {
      en: "A night-shift worker keeping things moving with limited support, who most of all needs to feel supported and safe.",
      fr: "Un travailleur posté de nuit qui fait tourner l'activité avec un soutien limité, et qui a avant tout besoin de se sentir soutenu et en sécurité.",
    },
    quote: {
      en: "While the rest of the world sleeps, we keep things moving. The least I need is to feel supported.",
      fr: "Pendant que le reste du monde dort, nous faisons tourner l'activité. Le minimum dont j'ai besoin, c'est de me sentir soutenu.",
    },
    tags: [
      { en: "night-shift", fr: "travail de nuit" },
      { en: "self-reliant", fr: "autonome" },
      { en: "fatigue-aware", fr: "attentif à la fatigue" },
      { en: "recognition-seeking", fr: "recherche la reconnaissance" },
    ],
    dailyJob: [
      { en: "Fixed night or rotating shifts.", fr: "Des postes de nuit fixes ou en rotation." },
      { en: "Works independently with limited support.", fr: "Travaille de façon autonome avec un soutien limité." },
      { en: "Relies on standard procedures.", fr: "S'appuie sur des procédures standard." },
      { en: "Repetitive tasks requiring sustained attention.", fr: "Des tâches répétitives exigeant une attention soutenue." },
      { en: "Exposure to fatigue and alertness challenges.", fr: "Une exposition à la fatigue et à des enjeux de vigilance." },
    ],
    lifestyle: {
      en: "Each night follows a steady, repetitive rhythm for The Night Operator. Focused yet often tired, routine can bring moments of boredom. Life outside stays quieter and low-key, centred on self-care – recharging through small indulgences and a conscious focus on physical and mental wellbeing.",
      fr: "Chaque nuit de l'Opérateur de nuit suit un rythme régulier et répétitif. Concentré mais souvent fatigué, il connaît, avec la routine, des moments d'ennui. En dehors, sa vie reste plus calme et discrète, centrée sur le soin de soi — se ressourcer par de petits plaisirs et une attention consciente au bien-être physique et mental.",
    },
    eatingMoments: [MOMENTS.refuelingBudgetMeal, MOMENTS.energizingSnack],
    foodExpectations: [
      { en: "Warm, comforting, familiar meals.", fr: "Des repas chauds, réconfortants et familiers." },
      { en: "Quick, convenient options.", fr: "Des options rapides et pratiques." },
      { en: "Affordable choices.", fr: "Des choix abordables." },
      { en: "Balanced meals to sustain energy without heaviness.", fr: "Des repas équilibrés pour soutenir l'énergie sans être lourds." },
      { en: "Routine-friendly eating.", fr: "Une alimentation compatible avec sa routine." },
    ],
    workplaceExpectations: [
      { en: "Availability aligned with the night schedule.", fr: "Une disponibilité alignée sur les horaires de nuit." },
      { en: "Clear, stable routines.", fr: "Des routines claires et stables." },
      { en: "Access to support and essential services outside normal hours.", fr: "Un accès au support et aux services essentiels en dehors des heures normales." },
      { en: "Safe, calm and comfortable work environment.", fr: "Un environnement de travail sûr, calme et confortable." },
      { en: "Recognition despite off-hours work.", fr: "De la reconnaissance malgré le travail en horaires décalés." },
      { en: "Smooth coordination with peers.", fr: "Une coordination fluide avec ses pairs." },
    ],
  },
  {
    id: "persona-corp-specialist",
    name: { en: "The Specialist", fr: "Le Spécialiste" },
    archetype: { en: "The Specialist", fr: "Le Spécialiste" },
    category: {
      en: "Grey-collar knowledge worker",
      fr: "Travailleur du savoir « col gris »",
    },
    ageRange: "18–34",
    essence: {
      en: "A technical specialist whose focused, compliance-bound work should be respected — not interrupted — by surrounding services.",
      fr: "Un spécialiste technique dont le travail, concentré et soumis à la conformité, doit être respecté — et non interrompu — par les services environnants.",
    },
    quote: {
      en: "My work requires focus and precision. The services around me should respect that, not get in the way.",
      fr: "Mon travail exige concentration et précision. Les services autour de moi devraient respecter cela, pas me gêner.",
    },
    tags: [
      { en: "technical", fr: "technique" },
      { en: "compliance-bound", fr: "soumis à la conformité" },
      { en: "focus-protective", fr: "protège sa concentration" },
      { en: "expertise-proud", fr: "fier de son expertise" },
    ],
    dailyJob: [
      { en: "Long stretches of concentrated, technical work with limited break time.", fr: "De longues plages de travail technique et concentré, avec peu de temps de pause." },
      { en: "Strict procedures, safety rules, or compliance constraints.", fr: "Des procédures strictes, des règles de sécurité ou des contraintes de conformité." },
      { en: "Alternates between hands-on tasks, documentation, and analysis.", fr: "Alterne entre tâches pratiques, documentation et analyse." },
      { en: "Works independently or in small expert teams.", fr: "Travaille de façon autonome ou en petites équipes d'experts." },
      { en: "Tasks critical to operational continuity.", fr: "Des tâches essentielles à la continuité opérationnelle." },
    ],
    lifestyle: {
      en: "Each day brings new challenges for The Specialist, keeping them focused and engaged. Proud of their expertise and strongly connected to their organisation, work is a clear priority and valued beyond the workplace. With the same focus, they maintain both physical and mental wellbeing.",
      fr: "Chaque journée apporte de nouveaux défis au Spécialiste, ce qui le maintient concentré et engagé. Fier de son expertise et fortement attaché à son organisation, le travail est une priorité claire, valorisée au-delà du lieu de travail. Avec la même concentration, il entretient son bien-être physique et mental.",
    },
    eatingMoments: [MOMENTS.myHealthyMeal, MOMENTS.routineMorningBoost, MOMENTS.spontaneousSocialBreak],
    foodExpectations: [
      { en: "Healthy, nutritious meals that sustain energy and focus.", fr: "Des repas sains et nutritifs qui soutiennent l'énergie et la concentration." },
      { en: "Quick, convenient or portable formats.", fr: "Des formats rapides, pratiques ou transportables." },
      { en: "Simple options with minimal waiting.", fr: "Des options simples avec un minimum d'attente." },
      { en: "Clear ingredients and nutritional information with the ability to customise.", fr: "Des informations claires sur les ingrédients et la nutrition, avec la possibilité de personnaliser." },
      { en: "Availability beyond standard lunch hours.", fr: "Une disponibilité au-delà des heures de déjeuner standard." },
    ],
    workplaceExpectations: [
      { en: "Minimal disruption during focused work.", fr: "Un minimum de perturbations pendant le travail concentré." },
      { en: "Reliable, adapted tools and systems.", fr: "Des outils et des systèmes fiables et adaptés." },
      { en: "Services fitting constrained schedules.", fr: "Des services adaptés à des horaires contraints." },
      { en: "Simple, predictable services that reduce mental load.", fr: "Des services simples et prévisibles qui réduisent la charge mentale." },
      { en: "Recognition as a skilled contributor, not \u201cjust support\u201d.", fr: "Une reconnaissance en tant que contributeur qualifié, et non « simple support »." },
    ],
  },
];

function buildCorporatePersona(spec: ArchetypeSpec): PersonaSource {
  const commonSections: PersonaSectionSource[] = [
    section(spec.id, {
      key: "essence",
      title: { en: "Essence", fr: "Essence" },
      type: "text",
      order: 0,
      items: [{ content: spec.essence, sourceIds: S, confidence: "MEDIUM" }],
    }),
    section(spec.id, {
      key: "lifestyle",
      title: { en: "Lifestyle", fr: "Mode de vie" },
      type: "text",
      order: 1,
      items: [{ content: spec.lifestyle, sourceIds: S, confidence: "MEDIUM" }],
    }),
    section(spec.id, {
      key: "goals",
      title: {
        en: "Goals (local & client personalisation)",
        fr: "Objectifs (personnalisation locale & client)",
      },
      type: "bullets",
      order: 2,
      items: [
        {
          content: {
            en: "Local goals must be co-defined with client HR & operations during Discovery.",
            fr: "Les objectifs locaux doivent être co-définis avec les RH et les opérations du client pendant la Discovery.",
          },
          status: "TO_VALIDATE",
          confidence: "LOW",
        },
      ],
    }),
    section(spec.id, {
      key: "frustrations",
      title: {
        en: "Frustrations (local & client personalisation)",
        fr: "Frustrations (personnalisation locale & client)",
      },
      type: "bullets",
      order: 7,
      items: [
        {
          content: {
            en: "Local frustrations must be captured from real site data before use.",
            fr: "Les frustrations locales doivent être recueillies à partir de données réelles du site avant utilisation.",
          },
          status: "TO_VALIDATE",
          confidence: "LOW",
        },
      ],
    }),
  ];

  const domainSections: PersonaSectionSource[] = [
    section(spec.id, {
      key: "daily_job",
      title: { en: "Daily job characteristics", fr: "Caractéristiques du travail quotidien" },
      type: "bullets",
      order: 21,
      items: spec.dailyJob.map((content) => ({ content, sourceIds: S })),
    }),
    section(spec.id, {
      key: "workplace_expectations",
      title: { en: "Workplace expectations", fr: "Attentes vis-à-vis du lieu de travail" },
      type: "bullets",
      order: 22,
      items: spec.workplaceExpectations.map((content) => ({ content, sourceIds: S })),
    }),
    section(spec.id, {
      key: "food_expectations",
      title: { en: "Food expectations", fr: "Attentes alimentaires" },
      type: "bullets",
      order: 23,
      items: spec.foodExpectations.map((content) => ({ content, sourceIds: S })),
    }),
    section(spec.id, {
      key: "key_eating_moments",
      title: { en: "Key eating moments", fr: "Moments de repas clés" },
      type: "moments",
      order: 24,
      items: spec.eatingMoments.map((m) => ({
        label: m.title,
        content: m.content,
        sourceIds: S,
      })),
    }),
  ];

  return {
    id: spec.id,
    projectId: CORPORATE_PROJECT_ID,
    name: spec.name,
    archetype: spec.archetype,
    category: spec.category,
    family: "CORPORATE",
    segment: { en: "Corporate Services", fr: "Services aux entreprises" },
    oneLineEssence: spec.essence,
    portraitUrl: `/persona-studio/corporate/${spec.id.replace("persona-corp-", "")}.png`,
    accentColor: ACCENT,
    quote: spec.quote,
    quoteType: "COMPOSITE",
    confidenceLevel: "LOW",
    confidenceExplanation: {
      en: "Standard Personix archetype. Behaviour and eating moments are evidenced by the framework, but local goals and frustrations are unvalidated, so this profile is a hypothesis until confirmed with client HR & operations.",
      fr: "Archétype Personix standard. Le comportement et les moments de repas sont étayés par le référentiel, mais les objectifs et frustrations locaux ne sont pas validés : ce profil reste une hypothèse tant qu'il n'est pas confirmé avec les RH et les opérations du client.",
    },
    evidenceCoverage: sourceEvidenceCoverage([...commonSections, ...domainSections]),
    demographicContext: {
      ageRange: spec.ageRange,
      relevanceNote: {
        en: "Age band is a Personix descriptor, not the differentiator — the persona is defined by work rhythm and behaviour.",
        fr: "La tranche d'âge est un descripteur Personix, pas le facteur différenciant — le persona est défini par son rythme de travail et son comportement.",
      },
    },
    behaviouralTags: spec.tags,
    sourceIds: S,
    status: "IN_REVIEW",
    version: 1,
    createdAt: SEED_TIMESTAMP,
    updatedAt: SEED_TIMESTAMP,
    commonSections,
    domainSections,
  };
}

/** Bilingual authoring sources (fed to the repository, resolved per request). */
export const CORPORATE_PERSONA_SOURCES: PersonaSource[] =
  ARCHETYPES.map(buildCorporatePersona);

/** Resolved to the project's default language (English) for direct consumers. */
export const CORPORATE_PERSONAS = CORPORATE_PERSONA_SOURCES.map((p) =>
  localizePersona(p, "en"),
);
export const CORPORATE_SOURCES = CORPORATE_SOURCE_SOURCES.map((s) =>
  localizeSource(s, "en"),
);
