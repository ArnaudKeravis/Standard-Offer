import { SEED_TIMESTAMP } from "../builders";
import type { LocalizedText, SourceDocumentSource } from "../localized";

/** Same project id as XP Work / Personix (defined here to avoid import cycles). */
const WORK_PROJECT_ID = "proj-xp-work";

export const EATING_MOMENTS_SOURCE_ID = "src-eating-moments-study";
export const PERSONIX_FRAMEWORK_SOURCE_ID = "src-personix-framework";

export const EATING_MOMENTS_SOURCE: SourceDocumentSource = {
  id: EATING_MOMENTS_SOURCE_ID,
  projectId: WORK_PROJECT_ID,
  name: {
    en: "Eating Moments study (Ipsos × Sodexo / Personix)",
    fr: "Étude Eating Moments (Ipsos × Sodexo / Personix)",
  },
  type: "report",
  date: SEED_TIMESTAMP,
  author: "Ipsos for Sodexo",
  category: "SURVEY",
  extractedText:
    "Personix Eating Moments study. 11 Eating Moments identified through segmentation techniques where consumer needs are central. Survey of 7,100+ detailed eating moments among 3,800+ individuals working in different environments in France, UK and USA. Dimensions: Who (attitudes), Why (needs), What, Where, With whom, When. Used as the evidence base for food expectations and key eating moments on Standard Persona Profiles.",
  processingStatus: "READY",
  confidentiality: "INTERNAL",
  createdAt: SEED_TIMESTAMP,
};

export const PERSONIX_FRAMEWORK_SOURCE: SourceDocumentSource = {
  id: PERSONIX_FRAMEWORK_SOURCE_ID,
  projectId: WORK_PROJECT_ID,
  name: {
    en: "Personix — Standard Persona Profiles",
    fr: "Personix — Profils de personas standard",
  },
  type: "pdf",
  date: SEED_TIMESTAMP,
  author: "Sodexo CoDesign × Ipsos",
  category: "EXISTING_PERSONA",
  extractedText:
    "Standard Persona Profiles (Personix). Workplace archetypes: Leader, Conductor, Enabler, Expert, Junior, Day Operator, Night Operator, Specialist. Behaviour, lifestyle, daily job characteristics, workplace expectations and food expectations from the Personix framework. Food moments grounded in the Eating Moments study (Ipsos). Goals and frustrations are localised from companion XP Catalogue personas and remain to validate per client site.",
  processingStatus: "READY",
  confidentiality: "INTERNAL",
  createdAt: SEED_TIMESTAMP,
};

export type MomentSource = { title: LocalizedText; content: LocalizedText };

/** Recurring Personix eating moments — evidence from the Eating Moments study. */
export const PERSONIX_MOMENTS = {
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
