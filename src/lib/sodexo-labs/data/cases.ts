import type { LabsCaseSpot, LabsLang } from "../schemas";
import { pickLocale, type Localized } from "../i18n/pick";

const CASES: Localized<LabsCaseSpot[]> = {
  en: [
    {
      id: "thales-campus",
      area: "work",
      client: "Thales",
      challenge:
        "Transform a multi-site campus into a connected workplace experience — helping employees navigate spaces, compare food options and find the right place for each moment.",
      approach:
        "Site immersion, employee personas and journey mapping across the campus; co-design workshops with site teams; digital touchpoints prototyped for live navigation and occupancy.",
      outcome:
        "An interactive campus experience vision with prioritised quick wins and a scalable roadmap for food, hospitality and digital services.",
      imageSrc: "/labs/credentials/thales-1.jpg",
    },
    {
      id: "astrazeneca-campus",
      area: "work",
      client: "AstraZeneca",
      challenge:
        "Elevate the daily campus experience across spaces, services and touchpoints in a world-class research environment.",
      approach:
        "Immersive site research, persona mapping and collaborative workshops; employee journeys, food activation and digital enablement structured into a phased roadmap.",
      outcome:
        "Future-state experience principles with high-impact initiatives prioritised — strengthening engagement and innovation culture.",
      imageSrc: "/labs/credentials/astrazeneca-1.jpg",
    },
    {
      id: "clariane-dining",
      area: "heal",
      client: "Clariane",
      challenge:
        "Move beyond functional food delivery to create moments of pleasure, autonomy and social connection for residents across dining rooms and memory-care units.",
      approach:
        "Site immersions and stakeholder interviews; resident personas and daily rhythms; meal journey redesign with weekly co-creation workshops for menu planning.",
      outcome:
        "A human-centered dining framework increasing resident engagement and care satisfaction — scalable across dining rooms and care units.",
      imageSrc: "/labs/credentials/clariane-1.jpg",
    },
    {
      id: "cyber-campus",
      area: "learn",
      client: "Cyber Campus",
      challenge:
        "Design a campus experience that supports intense learning rhythms, collaboration and wellbeing for the next generation of cyber professionals.",
      approach:
        "Student and staff personas, campus journey mapping and service touchpoint analysis; co-creation workshops on food, spaces and digital services.",
      outcome:
        "Prioritised experience initiatives aligned to campus life — from grab-and-go moments to community spaces that foster peer learning.",
      imageSrc: "/labs/credentials/cyber-campus-1.jpg",
    },
    {
      id: "newcastle-united",
      area: "play",
      client: "Newcastle United",
      challenge:
        "Elevate the match-day and hospitality experience for fans, partners and VIP guests across a high-energy sports venue.",
      approach:
        "Fan and guest personas, journey mapping from arrival to departure; immersion in hospitality flows; co-design of service moments and premium touchpoints.",
      outcome:
        "A differentiated hospitality experience vision — strengthening fan engagement and partner value on match days and beyond.",
      imageSrc: "/labs/credentials/newcastle-united-1.jpg",
    },
  ],
  fr: [
    {
      id: "thales-campus",
      area: "work",
      client: "Thales",
      challenge:
        "Transformer un campus multi-sites en expérience workplace connectée — aider les collaborateurs à naviguer les espaces, comparer les offres food et trouver le bon lieu pour chaque moment.",
      approach:
        "Immersion site, personas collaborateurs et cartographie des parcours ; ateliers de co-design avec les équipes site ; touchpoints digitaux prototypés pour navigation et occupation en direct.",
      outcome:
        "Une vision d'expérience campus interactive avec quick wins priorisés et une roadmap scalable pour food, hospitalité et services digitaux.",
      imageSrc: "/labs/credentials/thales-1.jpg",
    },
    {
      id: "astrazeneca-campus",
      area: "work",
      client: "AstraZeneca",
      challenge:
        "Élever l'expérience campus quotidienne — espaces, services et touchpoints — dans un environnement de recherche de classe mondiale.",
      approach:
        "Recherche immersive, cartographie de personas et ateliers collaboratifs ; parcours collaborateurs, activation food et enablement digital structurés en roadmap phasée.",
      outcome:
        "Des principes d'expérience future-state et des initiatives à fort impact priorisées — pour renforcer engagement et culture d'innovation.",
      imageSrc: "/labs/credentials/astrazeneca-1.jpg",
    },
    {
      id: "clariane-dining",
      area: "heal",
      client: "Clariane",
      challenge:
        "Passer d'une livraison food fonctionnelle à des moments de plaisir, d'autonomie et de lien social pour les résidents, en salles à manger et unités mémoire.",
      approach:
        "Immersions site et entretiens parties prenantes ; personas résidents et rythmes du quotidien ; redesign du parcours repas avec ateliers hebdomadaires de co-création menu.",
      outcome:
        "Un cadre dining human-centered qui augmente l'engagement résidents et la satisfaction soins — scalable sur salles et unités.",
      imageSrc: "/labs/credentials/clariane-1.jpg",
    },
    {
      id: "cyber-campus",
      area: "learn",
      client: "Cyber Campus",
      challenge:
        "Designer une expérience campus qui soutient des rythmes d'apprentissage intenses, la collaboration et le wellbeing pour la prochaine génération de professionnels cyber.",
      approach:
        "Personas étudiants et staff, parcours campus et analyse des touchpoints ; ateliers de co-création sur food, espaces et services digitaux.",
      outcome:
        "Des initiatives d'expérience priorisées alignées sur la vie du campus — du grab-and-go aux espaces communautaires qui favorisent l'apprentissage entre pairs.",
      imageSrc: "/labs/credentials/cyber-campus-1.jpg",
    },
    {
      id: "newcastle-united",
      area: "play",
      client: "Newcastle United",
      challenge:
        "Élever l'expérience match-day et hospitalité pour fans, partenaires et invités VIP dans un lieu sportif à haute énergie.",
      approach:
        "Personas fans et invités, parcours de l'arrivée au départ ; immersion dans les flux hospitalité ; co-design des moments de service et touchpoints premium.",
      outcome:
        "Une vision d'hospitalité différenciante — pour renforcer l'engagement fans et la valeur partenaires les jours de match et au-delà.",
      imageSrc: "/labs/credentials/newcastle-united-1.jpg",
    },
  ],
};

export function getLabsCases(lang: LabsLang): LabsCaseSpot[] {
  return pickLocale(CASES, lang);
}
