import {
  buildXpPersona,
  buildXpSource,
  type XpAreaConfig,
  type XpPersonaSpec,
} from "./xp-builders";
import {
  localizePersona,
  localizeSource,
  type PersonaSource,
  type SourceDocumentSource,
} from "../localized";

/**
 * XP Catalogue — LEARN area personas.
 * Content faithfully sourced from https://xpcatalogue.vercel.app/learn/{slug}.
 * French strings are translations of the English catalogue copy.
 */

export const XP_LEARN_PROJECT_ID = "proj-xp-learn";

const AREA: XpAreaConfig = {
  projectId: XP_LEARN_PROJECT_ID,
  family: "LEARN",
  segment: { en: "Education — Learn", fr: "Éducation — Learn" },
  sourceId: "src-xp-learn",
  sourceName: { en: "XP Catalogue — LEARN personas", fr: "Catalogue XP — Personas LEARN" },
  sourceExtract:
    "Sodexo XP Catalogue LEARN personas scraped from https://xpcatalogue.vercel.app/learn/{slug}. Who am I sections (workplace, goals, motivations, needs, pain points) and journey moments.",
};

export const XP_LEARN_SOURCE_SOURCES: SourceDocumentSource[] = [buildXpSource(AREA)];

const SPECS: XpPersonaSpec[] = [
  {
    slug: 'client-learn',
    name: 'Nina Petrov',
    archetype: { en: 'Education Estates Lead', fr: 'Responsable des successions éducatives' },
    category: { en: 'Education Estates Lead', fr: 'Responsable des successions éducatives' },
    oneLineEssence: { en: 'A Education Estates Lead whose catalogue profile centres on: safe, welcoming campuses.', fr: 'Responsable des successions éducatives — profil catalogue centré sur : des campus sûrs et accueillants.' },
    quote: { en: 'I need vendors who understand campus rhythms — exam periods, holiday breaks, and safety on site with young people.', fr: 'J\'ai besoin de prestataires qui comprennent les rythmes du campus : périodes d\'examens, vacances et sécurité sur place avec les jeunes.' },
    accentColor: '#4338ca',
    tags: [
      { en: 'campus', fr: 'campus' },
      { en: 'estates', fr: 'patrimoine' },
      { en: 'safety', fr: 'sécurité' },
      { en: 'vendors', fr: 'prestataires' },
    ],
    workplace: [
      { en: 'Multi-site campus', fr: 'Campus multi-sites' },
      { en: 'Teaching days: ~55%', fr: 'Jours d\'enseignement : ~55%' },
      { en: 'Projects & planning: ~30%', fr: 'Projets et planification : ~30 %' },
      { en: 'Remote: ~15%', fr: 'À distance : ~15 %' },
    ],
    goals: [
      { en: 'Safe, welcoming campuses', fr: 'Des campus sûrs et accueillants' },
      { en: 'Predictable service quality', fr: 'Qualité de service prévisible' },
      { en: 'Simplify vendor management', fr: 'Simplifiez la gestion des fournisseurs' },
    ],
    motivations: [
      { en: 'Student outcomes', fr: 'Résultats des étudiants' },
      { en: 'Compliance', fr: 'Conformité' },
      { en: 'Operational visibility', fr: 'Visibilité opérationnelle' },
    ],
    needs: [
      { en: 'Integrated FM & food', fr: 'FM et alimentation intégrés' },
      { en: 'Dashboards', fr: 'Tableaux de bord' },
      { en: 'Sustainability metrics', fr: 'Indicateurs de durabilité' },
    ],
    pains: [
      { en: 'Siloed contracts', fr: 'Contrats cloisonnés' },
      { en: 'Peak-day congestion', fr: 'Congestion aux heures de pointe' },
      { en: 'Limited reporting', fr: 'Rapports limités' },
    ],
    journey: [
      {
        title: { en: 'Welcome & Admission', fr: 'Accueil et entrée' },
        content: { en: 'My day begins as I arrive at the campus, and I\'m immediately reassured knowing that parking will be available, security runs efficiently, and that first essential coffee corner is ready to fuel my morning. Thanks to Sodexo\'s smart services, I can start my day without any stress or unexpected hurdles.', fr: 'Ma journée commence dès mon arrivée sur le campus, et je suis immédiatement rassurée de savoir qu\'un parking sera disponible, que la sécurité fonctionne efficacement et que ce premier coin café indispensable est prêt à alimenter ma matinée. Grâce aux services intelligents de Sodexo, je peux commencer ma journée sans stress ni obstacle inattendu.' },
      },
      {
        title: { en: 'Kick-off and Early Check', fr: 'Coup d\'envoi et vérification anticipée' },
        content: { en: 'I kick off my morning with a brief but focused meeting with the Sodexo Site Manager. Together, we review the daily KPIs for both facilities and food services, using real-time dashboards from Wando that instantly highlight any priorities or service alerts that need my attention.', fr: 'Je commence ma matinée par une réunion brève mais ciblée avec le responsable du site Sodexo. Ensemble, nous examinons les KPI quotidiens des installations et des services de restauration, à l\'aide des tableaux de bord en temps réel de Wando qui mettent instantanément en évidence toutes les priorités ou alertes de service nécessitant mon attention.' },
      },
      {
        title: { en: 'Internal Meetings and Alignment', fr: 'Réunions internes et alignement' },
        content: { en: 'Mid-morning brings my check-in with Procurement, where I confirm contract performance, review costs, and assess our sustainability metrics. Sodexo\'s reporting tools make this process effortless, allowing me to track compliance and value with complete confidence.', fr: 'En milieu de matinée, je m\'enregistre avec les achats, où je confirme l\'exécution du contrat, examine les coûts et évalue nos indicateurs de durabilité. Les outils de reporting de Sodexo facilitent ce processus, me permettant de suivre la conformité et la valeur en toute confiance.' },
      },
      {
        title: { en: 'Service Review and Site Rounds', fr: 'Examen du service et tournées de sites' },
        content: { en: 'Throughout the day, I stay connected with our people by reviewing our latest employee feedback and satisfaction scores. This helps me ensure that both workplace and dining services continue to evolve and align with what our employees actually need and want.', fr: 'Tout au long de la journée, je reste en contact avec nos collaborateurs en examinant nos derniers commentaires et scores de satisfaction. Cela m\'aide à garantir que les services sur le lieu de travail et les restaurants continuent d\'évoluer et de s\'aligner sur ce dont nos employés ont réellement besoin et veulent.' },
      },
      {
        title: { en: 'Lunch Stakeholders Engagement', fr: 'Déjeuner de mobilisation des parties prenantes' },
        content: { en: 'In the afternoon, I dive into occupancy and usage data from Wando. This real-time information allows me to make informed adjustments to workspace layouts, cleaning schedules, and food offerings, ensuring we\'re always matching actual demand rather than assumptions.', fr: 'Dans l’après-midi, je plonge dans les données d’occupation et d’utilisation de Wando. Ces informations en temps réel me permettent d\'apporter des ajustements éclairés à l\'aménagement des espaces de travail, aux horaires de nettoyage et aux offres de restauration, garantissant ainsi que nous répondons toujours à la demande réelle plutôt qu\'aux hypothèses.' },
      },
      {
        title: { en: 'Improvement Session & Forward Planning', fr: 'Séance d\'amélioration et planification prospective' },
        content: { en: 'I dedicate time each day to step back from daily operations and focus on improvement and future planning. By analyzing employee insights and team feedback, I can identify trends, highlight areas for growth, and shape strategies that strengthen both workplace and dining services.', fr: 'Je consacre du temps chaque jour à prendre du recul par rapport aux opérations quotidiennes et à me concentrer sur l\'amélioration et la planification future. En analysant les idées des employés et les commentaires de l\'équipe, je peux identifier les tendances, mettre en évidence les domaines de croissance et élaborer des stratégies qui renforcent à la fois les services sur le lieu de travail et les restaurants.' },
      },
    ],
    thin: true,
    confidenceLevel: "LOW",
    confidenceExplanation: {
      en: 'XP Catalogue profile with thin or pilot content. Preserved faithfully and tagged TO_VALIDATE until fuller research lands.',
      fr: 'Profil XP Catalogue au contenu mince ou pilote. Repris fidèlement et marqué À VALIDER jusqu\'à une recherche plus complète.',
    },
  },
  {
    slug: 'operator-learn',
    name: 'Helena Martins',
    archetype: { en: 'Campus Services Manager', fr: 'Responsable des services du campus' },
    category: { en: 'Campus Services Manager', fr: 'Responsable des services du campus' },
    oneLineEssence: { en: 'A Campus Services Manager whose catalogue profile centres on: reliable service delivery.', fr: 'Responsable des services du campus — profil catalogue centré sur : prestation de services fiable.' },
    quote: { en: 'One day it’s exam week, the next it’s summer — I need scheduling and staffing tools that flex with the calendar.', fr: 'Un jour, c\'est la semaine des examens, le lendemain, c\'est l\'été. J\'ai besoin d\'outils de planification et de gestion du personnel qui s\'adaptent au calendrier.' },
    accentColor: '#4f46e5',
    tags: [
      { en: 'scheduling', fr: 'planning' },
      { en: 'flexible-demand', fr: 'demande variable' },
      { en: 'staffing', fr: 'effectifs' },
      { en: 'training', fr: 'formation' },
    ],
    workplace: [
      { en: 'On-site campus', fr: 'Campus sur place' },
      { en: 'Operations: ~50%', fr: 'Opérations : ~50%' },
      { en: 'Coordination: ~35%', fr: 'Coordination : ~35%' },
      { en: 'Admin: ~15%', fr: 'Administrateur : ~15 %' },
    ],
    goals: [
      { en: 'Reliable service delivery', fr: 'Prestation de services fiable' },
      { en: 'Happy students and staff', fr: 'Des étudiants et du personnel heureux' },
      { en: 'Hit financial targets', fr: 'Atteindre les objectifs financiers' },
    ],
    motivations: [
      { en: 'Clear processes', fr: 'Des processus clairs' },
      { en: 'Good training', fr: 'Bonne formation' },
      { en: 'Tools that work', fr: 'Des outils qui fonctionnent' },
    ],
    needs: [
      { en: 'Workforce planning', fr: 'Planification des effectifs' },
      { en: 'Mobile-friendly workflows', fr: 'Flux de travail adaptés aux mobiles' },
      { en: 'Incident tracking', fr: 'Suivi des incidents' },
    ],
    pains: [
      { en: 'Volatile demand', fr: 'Demande volatile' },
      { en: 'Staff churn', fr: 'Taux de désabonnement du personnel' },
      { en: 'Multiple tools', fr: 'Plusieurs outils' },
    ],
    journey: [
      {
        title: { en: 'Kick-off & Early Check', fr: 'Coup d\'envoi et vérification anticipée' },
        content: { en: 'I start the morning with a quick team briefing. This kick-off is key to align everyone on the day’s priorities and responsibilities. After that, I carry out my early checks to make sure everything is running smoothly, safe, and ready for operations.', fr: 'Je commence la matinée par un rapide briefing de l’équipe. Ce coup d’envoi est essentiel pour aligner tout le monde sur les priorités et responsabilités de la journée. Après cela, j\'effectue mes premières vérifications pour m\'assurer que tout fonctionne correctement, en toute sécurité et prêt à fonctionner.' },
      },
      {
        title: { en: 'Kitchen/Back Kitchen: FM Checking Round', fr: 'Cuisine/Arrière-Cuisine : Ronde de vérification FM' },
        content: { en: 'I then head to the kitchen and back areas for an inspection. I check cleanliness, equipment, and compliance with hygiene and safety standards. I also take the opportunity to talk with my teams, listen to their feedback, and solve any issues they raise.', fr: 'Je me dirige ensuite vers la cuisine et les arrière-plans pour une inspection. Je vérifie la propreté, le matériel et le respect des normes d\'hygiène et de sécurité. J\'en profite également pour échanger avec mes équipes, écouter leurs retours et résoudre les problèmes qu\'elles soulèvent.' },
      },
      {
        title: { en: 'Office Time', fr: 'Heure de bureau' },
        content: { en: 'In my office, I focus on more strategic tasks: reviewing performance indicators, preparing reports, answering emails, and staying connected with clients. I also analyze data and look for ways to improve efficiency and the quality of service.', fr: 'Dans mon bureau, je me concentre sur des tâches plus stratégiques : examiner les indicateurs de performance, préparer des rapports, répondre aux courriels et rester en contact avec les clients. J\'analyse également les données et recherche des moyens d\'améliorer l\'efficacité et la qualité du service.' },
      },
      {
        title: { en: 'Food & Beverage Area', fr: 'Espace restauration et boissons' },
        content: { en: 'Lunch is one of the most important moments of the day. I’m present in the dining area to ensure everything goes as planned: the food is high quality, service is smooth, and guests are satisfied. It’s also when I can directly observe my teams in action and spot opportunities for improvement.', fr: 'Le déjeuner est l\'un des moments les plus importants de la journée. Je suis présente en salle pour m\'assurer que tout se passe comme prévu : la nourriture est de grande qualité, le service est fluide et les clients sont satisfaits. C’est aussi le moment où je peux observer directement mes équipes en action et repérer les opportunités d’amélioration.' },
      },
      {
        title: { en: 'Order, Planning & Maintenance Management', fr: 'Gestion des commandes, de la planification et de la maintenance' },
        content: { en: 'Part of my role is to keep everything coordinated. I manage orders, oversee planning, and make sure maintenance activities are scheduled and followed through. I anticipate future needs and work with suppliers and partners to avoid disruptions.', fr: 'Une partie de mon rôle consiste à assurer la coordination de tout. Je gère les commandes, supervise la planification et m\'assure que les activités de maintenance sont planifiées et suivies. J\'anticipe les besoins futurs et travaille avec les fournisseurs et partenaires pour éviter les perturbations.' },
      },
    ],
    thin: true,
    confidenceLevel: "LOW",
    confidenceExplanation: {
      en: 'XP Catalogue profile with thin or pilot content. Preserved faithfully and tagged TO_VALIDATE until fuller research lands.',
      fr: 'Profil XP Catalogue au contenu mince ou pilote. Repris fidèlement et marqué À VALIDER jusqu\'à une recherche plus complète.',
    },
  },
  {
    slug: 'student',
    name: 'Maya Singh',
    archetype: { en: 'University Student', fr: 'Étudiant universitaire' },
    category: { en: 'University Student', fr: 'Étudiant universitaire' },
    oneLineEssence: { en: 'A University Student whose catalogue profile centres on: stay focused and productive across the academic week.', fr: 'Étudiant universitaire — profil catalogue centré sur : restez concentré et productif tout au long de la semaine académique.' },
    quote: { en: 'Every day is different. Some mornings I\'ve had three hours of sleep, other days I\'m rushing from student housing to make it to class on time. I just wish the start of my day felt a bit more manageable and less chaotic.', fr: 'Chaque jour est différent. Certains matins, j\'ai dormi trois heures, d\'autres jours, je me précipite hors du logement étudiant pour arriver à l\'heure en classe. J\'aimerais juste que le début de ma journée soit un peu plus gérable et moins chaotique.' },
    accentColor: '#6366f1',
    tags: [
      { en: 'campus-life', fr: 'vie de campus' },
      { en: 'flexibility', fr: 'flexibilité' },
      { en: 'grab-and-go', fr: 'grab & go' },
      { en: 'wellbeing', fr: 'bien-être' },
    ],
    workplace: [
      { en: 'Campus Life Context:', fr: 'Contexte de la vie sur le campus :' },
      { en: 'In-class learning: ~40%', fr: 'Apprentissage en classe : ~40 %' },
      { en: 'Independent study & group work: ~35%', fr: 'Étude indépendante et travail de groupe : ~35 %' },
      { en: 'Social & campus activities: ~15%', fr: 'Activités sociales et sur le campus : ~15 %' },
      { en: 'Commute & breaks: ~10%', fr: 'Trajets et pauses : ~10 %' },
    ],
    goals: [
      { en: 'Stay focused and productive across the academic week', fr: 'Restez concentré et productif tout au long de la semaine académique' },
      { en: 'Balance academics, social life, and well-being', fr: 'Équilibrer les études, la vie sociale et le bien-être' },
      { en: 'Navigate campus efficiently without wasting time', fr: 'Naviguez efficacement sur le campus sans perdre de temps' },
      { en: 'Access healthy, affordable food that fits schedule', fr: 'Accédez à des aliments sains et abordables qui correspondent à votre emploi du temps' },
      { en: 'Feel supported in managing stress and finances', fr: 'Se sentir soutenu dans la gestion du stress et des finances' },
    ],
    motivations: [
      { en: 'Manageable daily routine with less chaos', fr: 'Une routine quotidienne gérable avec moins de chaos' },
      { en: 'Flexible food options available throughout the day', fr: 'Options de restauration flexibles disponibles tout au long de la journée' },
      { en: 'Study spaces adapted to different work modes', fr: 'Des espaces d\'étude adaptés aux différents modes de travail' },
      { en: 'Campus app with real-time class, transport, and meal info', fr: 'Application sur le campus avec informations en temps réel sur les cours, les transports et les repas' },
      { en: 'Social connection through clubs, events, and peer support', fr: 'Lien social via des clubs, des événements et le soutien par les pairs' },
      { en: 'Well-being resources easily accessible on campus', fr: 'Des ressources bien-être facilement accessibles sur le campus' },
    ],
    needs: [
      { en: 'Campus app with class reminders, transport info, and breakfast deals', fr: 'Application Campus avec rappels de cours, informations sur les transports et offres de petit-déjeuner' },
      { en: '"Grab & Go" breakfast stations near campus entrances', fr: 'Stations de petit-déjeuner « Grab & Go » à proximité des entrées du campus' },
      { en: 'Bookable workspaces via app or student portal', fr: 'Espaces de travail réservables via une application ou un portail étudiant' },
      { en: 'Smart vending & hot lockers for off-peak meal access', fr: 'Distributeurs automatiques intelligents et casiers chauds pour un accès aux repas hors pointe' },
      { en: 'Student-curated menus with allergen filters and nutrition info', fr: 'Menus sélectionnés par les étudiants avec filtres allergènes et informations nutritionnelles' },
      { en: 'Nap pods or relaxation lounges with music and soft seating', fr: 'Pods de sieste ou salons de relaxation avec musique et sièges moelleux' },
    ],
    pains: [
      { en: 'Mental load around planning classes, rooms, and meals', fr: 'Charge mentale liée à la planification des cours, des chambres et des repas' },
      { en: 'Limited visibility on early morning food options', fr: 'Visibilité limitée sur les options de restauration tôt le matin' },
      { en: 'Difficulty finding workspaces on demand during peak hours', fr: 'Difficulté à trouver des espaces de travail à la demande aux heures de pointe' },
      { en: 'Confusing navigation on large, maze-like campus', fr: 'Navigation déroutante sur un grand campus semblable à un labyrinthe' },
      { en: 'Long wait times at peak lunch hours', fr: 'Longs temps d\'attente aux heures de pointe pour le déjeuner' },
      { en: 'Lack of feedback loop from students to dining services', fr: 'Manque de boucle de rétroaction des étudiants vers les services de restauration' },
    ],
    journey: [
      {
        title: { en: 'Commute', fr: 'Navette' },
        content: { en: 'Before reaching campus, I want clear guidance, easy mobility options and the ability to charge my devices on the go. A fluid commute helps me arrive ready, calm and mentally aligned with my study goals.', fr: 'Avant d\'arriver sur le campus, je veux des conseils clairs, des options de mobilité simples et la possibilité de recharger mes appareils en déplacement. Un trajet fluide m\'aide à arriver prêt, calme et mentalement aligné sur mes objectifs d\'études.' },
      },
      {
        title: { en: 'Welcome Area', fr: 'Espace d\'accueil' },
        content: { en: 'When I arrive, I expect quick orientation, digital check‑ins, sustainability cues and an environment that feels inclusive and dynamic. Displays, guidance systems and concierge-like support help me transition smoothly into the rhythm of the day.', fr: 'À mon arrivée, je m’attends à une orientation rapide, à des enregistrements numériques, à des indices de durabilité et à un environnement inclusif et dynamique. Les écrans, les systèmes de guidage et l\'assistance de type concierge m\'aident à m\'adapter en douceur au rythme de la journée.' },
      },
      {
        title: { en: 'Studies', fr: 'Études' },
        content: { en: 'Throughout my study sessions, I want access to clean, well‑air‑circulated spaces, real-time room availability, and digital tools that help me focus. Service requests, IoT data and space analytics ensure that the environment supports productivity rather than creating friction.', fr: 'Tout au long de mes séances d’étude, je souhaite accéder à des espaces propres et bien aérés, à la disponibilité des salles en temps réel et à des outils numériques qui m’aident à me concentrer. Les demandes de service, les données IoT et les analyses spatiales garantissent que l\'environnement soutient la productivité plutôt que de créer des frictions.' },
      },
      {
        title: { en: 'Food & Beverage Area', fr: 'Espace restauration et boissons' },
        content: { en: 'At lunchtime, I head to the cafeteria looking for my go-to healthy options without endless queues. I need to fuel up efficiently before afternoon calls, so I want a streamlined payment process that remembers my food preferences automatically without repeatedly inputting details.', fr: 'À l’heure du déjeuner, je me dirige vers la cafétéria à la recherche de mes options santé préférées, sans files d’attente interminables. J\'ai besoin de faire le plein efficacement avant les appels de l\'après-midi, je souhaite donc un processus de paiement simplifié qui mémorise automatiquement mes préférences alimentaires sans saisir de détails à plusieurs reprises.' },
      },
      {
        title: { en: 'Freetime & Studies/Life Balance', fr: 'Temps libre et études/équilibre de vie' },
        content: { en: 'During downtime, I want places to relax, hydrate, move or take a moment to decompress. Wellbeing cues and circular initiatives help create a healthy balance, ensuring I return to my studies refreshed, not drained.', fr: 'Pendant les temps d\'arrêt, je veux des endroits pour me détendre, m\'hydrater, bouger ou prendre un moment pour décompresser. Les signaux de bien-être et les initiatives circulaires contribuent à créer un équilibre sain, garantissant que je retourne à mes études rafraîchi et non épuisé.' },
      },
    ],
  },
  {
    slug: 'schoolchild',
    name: 'Lucas Patel',
    archetype: { en: 'Middle School Student (11–14 years)', fr: 'Étudiant au collège (11-14 ans)' },
    category: { en: 'Middle School Student (11–14 years)', fr: 'Étudiant au collège (11-14 ans)' },
    oneLineEssence: { en: 'A Middle School Student (11–14 years) whose catalogue profile centres on: start the day feeling prepared and calm.', fr: 'Étudiant au collège (11-14 ans) — profil catalogue centré sur : commencez la journée en vous sentant préparé et calme.' },
    quote: { en: 'Every morning, just before leaving home, I check the weather, whether I have PE, and if my best friend is taking the same bus. I always worry a little—Did I forget my history notebook? Will I be on time? It\'s not just about getting there; it\'s about starting the day feeling prepared and calm.', fr: 'Chaque matin, juste avant de quitter la maison, je vérifie la météo, si je suis atteint d\'EP et si mon meilleur ami prend le même bus. Je m\'inquiète toujours un peu : ai-je oublié mon cahier d\'histoire ? Serai-je à l\'heure ? Il ne s’agit pas seulement d’y parvenir ; il s\'agit de commencer la journée en se sentant préparé et calme.' },
    accentColor: '#3730a3',
    tags: [
      { en: 'morning-routine', fr: 'routine du matin' },
      { en: 'focus', fr: 'concentration' },
      { en: 'recognition', fr: 'reconnaissance' },
      { en: 'school-meals', fr: 'cantine' },
    ],
    workplace: [
      { en: 'School Day Context:', fr: 'Contexte de la journée scolaire :' },
      { en: 'In-class learning: ~50%', fr: 'Apprentissage en classe : ~50 %' },
      { en: 'Breaks & social time: ~20%', fr: 'Pauses et temps sociaux : ~20%' },
      { en: 'Lunch & recess: ~15%', fr: 'Déjeuner et récréation : ~15%' },
      { en: 'Commute & transitions: ~15%', fr: 'Déplacements et transitions : ~15 %' },
    ],
    goals: [
      { en: 'Start the day feeling prepared and calm', fr: 'Commencez la journée en vous sentant préparé et calme' },
      { en: 'Stay focused and engaged in class', fr: 'Restez concentré et engagé en classe' },
      { en: 'Feel included and supported socially', fr: 'Se sentir inclus et soutenu socialement' },
      { en: 'Manage homework and activities without overwhelm', fr: 'Gérer les devoirs et les activités sans se sentir submergé' },
      { en: 'Get home feeling accomplished, not just exhausted', fr: 'Rentrez chez vous en vous sentant accompli, pas seulement épuisé' },
    ],
    motivations: [
      { en: 'Smooth morning routine without stress or forgetting things', fr: 'Routine matinale douce sans stress ni oubli' },
      { en: 'Recognition and encouragement when trying hard', fr: 'Reconnaissance et encouragement lorsque vous faites de gros efforts' },
      { en: 'Social connection with friends during breaks', fr: 'Lien social avec les amis pendant les pauses' },
      { en: 'Clear reminders for classes, homework, and activities', fr: 'Des rappels clairs pour les cours, les devoirs et les activités' },
      { en: 'Fun, engaging school environment that feels welcoming', fr: 'Un environnement scolaire amusant, engageant et accueillant' },
      { en: 'Tools that help stay organized and focused', fr: 'Des outils qui aident à rester organisé et concentré' },
    ],
    needs: [
      { en: 'Morning prep app showing schedule, weather, and reminders', fr: 'Application de préparation du matin affichant le calendrier, la météo et les rappels' },
      { en: 'Badge scan entry with "well done, you\'re on time" message', fr: 'Entrée par scan du badge avec message "Bravo, vous êtes à l\'heure"' },
      { en: 'Classroom help signal (digital or physical) to request support', fr: 'Signal d\'aide en classe (numérique ou physique) pour demander de l\'aide' },
      { en: 'Socialisation areas with games, discussion zones, and quiet spaces', fr: 'Des espaces de socialisation avec des jeux, des zones de discussion et des espaces calmes' },
      { en: 'End-of-day summary with homework reminders and club notifications', fr: 'Récapitulatif de fin de journée avec rappels de devoirs et notifications du club' },
      { en: 'Digital homework notebook shared with parents and classmates', fr: 'Cahier de devoirs numérique partagé avec les parents et les camarades de classe' },
    ],
    pains: [
      { en: 'Morning stress about forgetting items or being late', fr: 'Stress matinal dû à l\'oubli d\'objets ou au fait d\'être en retard' },
      { en: 'Tuning out in class when topics are confusing or long', fr: 'Se déconnecter en classe lorsque les sujets sont confus ou longs' },
      { en: 'Feeling left out socially when friends are busy', fr: 'Se sentir exclu socialement lorsque les amis sont occupés' },
      { en: 'Forgetting homework or what was covered in class', fr: 'Oublier les devoirs ou ce qui a été abordé en cours' },
      { en: 'Rushing at end of day and leaving things behind', fr: 'Se précipiter à la fin de la journée et laisser les choses derrière soi' },
      { en: 'Homework confusion at home with no one to ask', fr: 'Confusion dans les devoirs à la maison sans personne à qui demander' },
    ],
    journey: [
      {
        title: { en: 'Commute', fr: 'Navette' },
        content: { en: 'On my way to school, I need clear direction and simple digital cues that help me arrive safely and confidently. When the route feels predictable and engaging, it reduces stress and makes the start of the day calmer for everyone.', fr: 'Sur le chemin de l\'école, j\'ai besoin d\'une direction claire et de repères numériques simples qui m\'aident à arriver en toute sécurité et en toute confiance. Lorsque l’itinéraire semble prévisible et engageant, cela réduit le stress et rend le début de la journée plus calme pour tout le monde.' },
      },
      {
        title: { en: 'Welcome at School', fr: 'Bienvenue à l\'école' },
        content: { en: 'When I step into school, I want to feel welcomed, guided and supported. Clear signage, friendly digital reception and sustainable cues help me settle into the environment, feel safe, and know exactly where to go without confusion.', fr: 'Lorsque j’entre à l’école, je veux me sentir accueillie, guidée et soutenue. Une signalisation claire, un accueil numérique convivial et des signaux durables m\'aident à m\'installer dans l\'environnement, à me sentir en sécurité et à savoir exactement où aller sans confusion.' },
      },
      {
        title: { en: 'In Class', fr: 'En classe' },
        content: { en: 'In class, I need clean air, clear information displays, and tools that help my teacher keep everything running smoothly. Smart digital systems support a calm, focused atmosphere where I can concentrate, ask questions and enjoy learning without distractions.', fr: 'En classe, j’ai besoin d’air pur, d’affichages d’informations clairs et d’outils qui aident mon professeur à ce que tout se passe bien. Les systèmes numériques intelligents créent une atmosphère calme et concentrée dans laquelle je peux me concentrer, poser des questions et profiter d\'apprendre sans distractions.' },
      },
      {
        title: { en: 'Food & Beverage Area', fr: 'Espace restauration et boissons' },
        content: { en: 'At lunchtime, I want to eat quickly so I have more time to play or hang out with friends. I struggle with long queues and confusing meal options, so I need simple food that’s quick to access, tasty and in line with what kids enjoy — but always safe and responsibly managed.', fr: 'Le midi, j’ai envie de manger vite pour avoir plus de temps pour jouer ou sortir avec des amis. Je suis aux prises avec de longues files d\'attente et des options de repas confuses. J\'ai donc besoin d\'aliments simples, rapides d\'accès, savoureux et conformes à ce que les enfants apprécient, mais toujours sûrs et gérés de manière responsable.' },
      },
      {
        title: { en: 'Freetime', fr: 'Temps libre' },
        content: { en: 'During recess or after class, I want space to move, play, snack and hydrate. Gentle sustainable nudges and healthy choices help me stay active and refreshed, so I can return to learning with energy and enthusiasm.', fr: 'Pendant la récréation ou après les cours, je veux de l’espace pour bouger, jouer, grignoter et m’hydrater. Des coups de pouce doux et durables et des choix sains m\'aident à rester actif et rafraîchi, afin que je puisse retourner à l\'apprentissage avec énergie et enthousiasme.' },
      },
    ],
  },
  {
    slug: 'parent',
    name: 'Jamal Thompson',
    archetype: { en: 'Working Parent of School-Age Children', fr: 'Parent qui travaille avec des enfants d\'âge scolaire' },
    category: { en: 'Working Parent of School-Age Children', fr: 'Parent qui travaille avec des enfants d\'âge scolaire' },
    oneLineEssence: { en: 'A Working Parent of School-Age Children whose catalogue profile centres on: ensure children are safe, healthy, and thriving at school.', fr: 'Parent qui travaille avec des enfants d\'âge scolaire — profil catalogue centré sur : veiller à ce que les enfants soient en sécurité, en bonne santé et s’épanouissent à l’école.' },
    quote: { en: 'As a working parent, I need to know my kids are eating well at school without having to call or email constantly. I want an app that shows me what\'s on the menu, lets me manage their dietary needs, and gives me peace of mind that they\'re healthy and happy.', fr: 'En tant que parent qui travaille, j\'ai besoin de savoir que mes enfants mangent bien à l\'école sans avoir à les appeler ou à leur envoyer des courriels en permanence. Je veux une application qui me montre ce qu\'il y a au menu, me permet de gérer leurs besoins alimentaires et me donne la certitude qu\'ils sont en bonne santé et heureux.' },
    accentColor: '#312e81',
    tags: [
      { en: 'transparency', fr: 'transparence' },
      { en: 'allergens', fr: 'allergènes' },
      { en: 'working-parent', fr: 'parent actif' },
      { en: 'trust', fr: 'confiance' },
    ],
    workplace: [
      { en: 'Parenting Context:', fr: 'Contexte parental :' },
      { en: 'Managing children\'s school life: ~40%', fr: 'Gérer la vie scolaire des enfants : ~40%' },
      { en: 'Coordinating schedules & activities: ~25%', fr: 'Coordination des horaires et des activités : ~25 %' },
      { en: 'School communication & involvement: ~20%', fr: 'Communication et implication de l\'école : ~20 %' },
      { en: 'Work-life balance juggling: ~15%', fr: 'Jongler entre travail et vie privée : ~ 15 %' },
    ],
    goals: [
      { en: 'Ensure children are safe, healthy, and thriving at school', fr: 'Veiller à ce que les enfants soient en sécurité, en bonne santé et s’épanouissent à l’école' },
      { en: 'Stay informed and connected with school activities', fr: 'Restez informé et connecté aux activités scolaires' },
      { en: 'Provide nutritious meals and support learning at home', fr: 'Fournir des repas nutritifs et soutenir l’apprentissage à la maison' },
      { en: 'Manage family schedules efficiently despite busy work life', fr: 'Gérer efficacement les horaires familiaux malgré une vie professionnelle chargée' },
      { en: 'Feel confident and reassured about school environment', fr: 'Sentez-vous confiant et rassuré sur l’environnement scolaire' },
    ],
    motivations: [
      { en: 'Transparent school communication about meals, activities, and child well-being', fr: 'Communication scolaire transparente sur les repas, les activités et le bien-être des enfants' },
      { en: 'Healthy, quality food options at school with dietary accommodations', fr: 'Options alimentaires saines et de qualité à l\'école avec adaptations diététiques' },
      { en: 'Easy digital access to school menus, calendars, and notifications', fr: 'Accès numérique facile aux menus, calendriers et notifications de l\'école' },
      { en: 'Involvement opportunities that fit busy schedules', fr: 'Des opportunités de participation adaptées aux horaires chargés' },
      { en: 'Peace of mind knowing children are well cared for', fr: 'Tranquillité d\'esprit en sachant que les enfants sont bien pris en charge' },
      { en: 'Value for money with school meal programs', fr: 'Optimisation des ressources avec les programmes de restauration scolaire' },
    ],
    needs: [
      { en: 'Parent app with real-time meal menus, nutrition info, and allergen tracking', fr: 'Application pour parents avec menus de repas en temps réel, informations nutritionnelles et suivi des allergènes' },
      { en: 'Digital payment systems with flexible meal plans', fr: 'Systèmes de paiement numérique avec plans de repas flexibles' },
      { en: 'Photo updates of what children actually ate', fr: 'Mises à jour de photos de ce que les enfants ont réellement mangé' },
      { en: 'Direct messaging with school food services for dietary needs', fr: 'Messagerie directe avec les services de restauration scolaire pour les besoins alimentaires' },
      { en: 'Calendar integration for school events, activities, and menu planning', fr: 'Intégration du calendrier pour les événements scolaires, les activités et la planification des menus' },
      { en: 'Feedback mechanism to rate meals and suggest improvements', fr: 'Mécanisme de rétroaction pour évaluer les repas et suggérer des améliorations' },
    ],
    pains: [
      { en: 'Lack of transparency about what children eat at school', fr: 'Manque de transparence sur ce que mangent les enfants à l\'école' },
      { en: 'Poor quality or unhealthy school meals', fr: 'Repas scolaires de mauvaise qualité ou malsains' },
      { en: 'Difficulty tracking dietary restrictions or allergies', fr: 'Difficulté à suivre les restrictions alimentaires ou les allergies' },
      { en: 'Overwhelming communication from multiple school channels', fr: 'Communication écrasante provenant de plusieurs canaux scolaires' },
      { en: 'Limited flexibility in meal plans or payment options', fr: 'Flexibilité limitée dans les plans de repas ou les options de paiement' },
      { en: 'No visibility into child\'s eating habits or food waste', fr: 'Aucune visibilité sur les habitudes alimentaires de l\'enfant ou sur le gaspillage alimentaire' },
    ],
    journey: [
      {
        title: { en: 'Prep & Commute', fr: 'Préparation et déplacements' },
        content: { en: 'Before bringing my child to school, I want clear routes, predictable timing and quick access to essential digital information. When mobility, parking and wayfinding feel reliable, the morning routine becomes lighter — reducing stress for me and setting a calm tone for my child.', fr: 'Avant d’amener mon enfant à l’école, je souhaite des itinéraires clairs, des horaires prévisibles et un accès rapide aux informations numériques essentielles. Lorsque la mobilité, le stationnement et l\'orientation semblent fiables, la routine matinale devient plus légère, ce qui réduit le stress pour moi et donne un ton calme à mon enfant.' },
      },
      {
        title: { en: 'During School Day', fr: 'Pendant la journée scolaire' },
        content: { en: 'Throughout the day, I want to know that my child is safe and everything is running smoothly. Real‑time updates, simple communication channels and quick service escalation options help me stay informed without being intrusive, creating a quiet sense of trust in the school’s operations.', fr: 'Tout au long de la journée, je veux m\'assurer que mon enfant est en sécurité et que tout se passe bien. Des mises à jour en temps réel, des canaux de communication simples et des options d\'escalade de service rapides m\'aident à rester informé sans être intrusif, créant ainsi un sentiment de confiance dans les opérations de l\'école.' },
      },
      {
        title: { en: 'Meal Visibility', fr: 'Visibilité des repas' },
        content: { en: 'I want clear, easy‑to‑access visibility on menus, nutritional details, allergens and sustainability practices. This helps me feel reassured about my child’s wellbeing and eating habits, while supporting the school’s commitment to healthy and responsible food services.', fr: 'Je veux une visibilité claire et facile d’accès sur les menus, les détails nutritionnels, les allergènes et les pratiques de développement durable. Cela me rassure sur le bien-être et les habitudes alimentaires de mon enfant, tout en soutenant l’engagement de l’école en faveur d’une restauration saine et responsable.' },
      },
      {
        title: { en: 'Pick-up Time', fr: 'Heure de prise en charge' },
        content: { en: 'When I arrive to pick up my child, I need clear directions, simple check‑out processes and a smooth flow through the school campus. Digital reception, signage and access control systems help ensure safety, reduce waiting, and make this moment feel calm and positive.', fr: 'Lorsque j\'arrive chercher mon enfant, j\'ai besoin d\'instructions claires, de processus de paiement simples et d\'une circulation fluide sur le campus scolaire. Les systèmes numériques d\'accueil, de signalisation et de contrôle d\'accès contribuent à assurer la sécurité, à réduire l\'attente et à rendre ce moment calme et positif.' },
      },
      {
        title: { en: 'Evening Routine', fr: 'Routine du soir' },
        content: { en: 'In the evening, I want tools and gentle nudges that help me understand my child’s day, manage small needs and maintain a healthy family rhythm. Simple digital touchpoints for hydration, wellbeing and feedback support a smooth close to the day.', fr: 'Le soir, je veux des outils et des coups de pouce doux qui m’aident à comprendre la journée de mon enfant, à gérer les petits besoins et à maintenir un rythme familial sain. Des points de contact numériques simples pour l’hydratation, le bien-être et les commentaires permettent de clôturer la journée en douceur.' },
      },
      {
        title: { en: 'Weekly Preparation', fr: 'Préparation hebdomadaire' },
        content: { en: 'Each week, I need an organized view of menus, schedules and key school information. Digital planning tools make it easy to anticipate, adjust and stay aligned with the school’s rhythm, reducing mental load and helping the entire family stay coordinated.', fr: 'Chaque semaine, j\'ai besoin d\'une vue organisée des menus, des horaires et des informations clés de l\'école. Les outils de planification numérique permettent d’anticiper, d’ajuster et de rester facilement alignés sur le rythme de l’école, réduisant ainsi la charge mentale et aidant toute la famille à rester coordonnée.' },
      },
    ],
  },
  {
    slug: 'teacher',
    name: 'Priya Adams',
    archetype: { en: 'Middle School Teacher', fr: 'Professeur de collège' },
    category: { en: 'Middle School Teacher', fr: 'Professeur de collège' },
    oneLineEssence: { en: 'A Middle School Teacher whose catalogue profile centres on: engage and inspire students effectively.', fr: 'Professeur de collège — profil catalogue centré sur : engager et inspirer efficacement les étudiants.' },
    quote: { en: 'I can tell when my students haven\'t eaten—they\'re distracted, tired, and can\'t focus. I wish I had better visibility into their meal habits so I could intervene early and connect them with support. Healthy, well-fed students are ready to learn.', fr: 'Je peux savoir quand mes élèves n\'ont pas mangé : ils sont distraits, fatigués et n\'arrivent pas à se concentrer. J\'aurais aimé avoir une meilleure visibilité sur leurs habitudes alimentaires afin de pouvoir intervenir tôt et les mettre en contact avec du soutien. Des élèves en bonne santé et bien nourris sont prêts à apprendre.' },
    accentColor: '#818cf8',
    tags: [
      { en: 'classroom', fr: 'classe' },
      { en: 'nutrition-visibility', fr: 'visibilité nutrition' },
      { en: 'engagement', fr: 'engagement' },
      { en: 'inclusion', fr: 'inclusion' },
    ],
    workplace: [
      { en: 'Teaching Context:', fr: 'Contexte pédagogique :' },
      { en: 'Classroom teaching: ~50%', fr: 'Enseignement en classe : ~50%' },
      { en: 'Lesson planning & grading: ~25%', fr: 'Planification et notation des cours : ~25 %' },
      { en: 'Student support & meetings: ~15%', fr: 'Soutien aux étudiants et réunions : ~15%' },
      { en: 'Administrative tasks: ~10%', fr: 'Tâches administratives : ~10%' },
    ],
    goals: [
      { en: 'Engage and inspire students effectively', fr: 'Engager et inspirer efficacement les étudiants' },
      { en: 'Create a safe, inclusive classroom environment', fr: 'Créer un environnement de classe sûr et inclusif' },
      { en: 'Support student well-being academically and emotionally', fr: 'Soutenir le bien-être des étudiants sur le plan académique et émotionnel' },
      { en: 'Manage workload efficiently without burnout', fr: 'Gérer efficacement la charge de travail sans épuisement professionnel' },
      { en: 'Collaborate with parents and school staff effectively', fr: 'Collaborer efficacement avec les parents et le personnel de l’école' },
    ],
    motivations: [
      { en: 'Healthy, alert students ready to learn', fr: 'Des élèves en bonne santé et alertes, prêts à apprendre' },
      { en: 'Transparency about what students eat and nutritional quality', fr: 'Transparence sur ce que mangent les étudiants et qualité nutritionnelle' },
      { en: 'Tools to identify students who may be struggling (hunger, stress)', fr: 'Des outils pour identifier les élèves qui pourraient être en difficulté (faim, stress)' },
      { en: 'Support from school services for student well-being', fr: 'Soutien des services scolaires pour le bien-être des élèves' },
      { en: 'Recognition of teaching efforts and student progress', fr: 'Reconnaissance des efforts pédagogiques et des progrès des élèves' },
      { en: 'Work-life balance with manageable administrative load', fr: 'Équilibre travail-vie personnelle avec une charge administrative gérable' },
    ],
    needs: [
      { en: 'Teacher dashboard showing student meal participation and patterns', fr: 'Tableau de bord de l\'enseignant montrant la participation et les modèles des élèves aux repas' },
      { en: 'Alert system for students consistently skipping meals', fr: 'Système d\'alerte pour les étudiants qui sautent systématiquement des repas' },
      { en: 'Direct communication channel with food services for student concerns', fr: 'Canal de communication direct avec les services de restauration pour les préoccupations des étudiants' },
      { en: 'Integrated digital tools for attendance, grades, and student well-being', fr: 'Outils numériques intégrés pour l\'assiduité, les notes et le bien-être des étudiants' },
      { en: 'Professional development on nutrition and student wellness', fr: 'Développement professionnel sur la nutrition et le bien-être des étudiants' },
      { en: 'Recognition and support from administration when addressing student needs', fr: 'Reconnaissance et soutien de l\'administration pour répondre aux besoins des étudiants' },
    ],
    pains: [
      { en: 'Students arriving hungry or unfocused due to poor nutrition', fr: 'Les étudiants arrivent affamés ou mal concentrés en raison d’une mauvaise alimentation' },
      { en: 'Lack of visibility into which students skip meals', fr: 'Manque de visibilité sur les étudiants qui sautent des repas' },
      { en: 'Limited communication with food services about student needs', fr: 'Communication limitée avec les services de restauration concernant les besoins des étudiants' },
      { en: 'Too many administrative systems that don\'t integrate', fr: 'Trop de systèmes administratifs qui ne s\'intègrent pas' },
      { en: 'Difficulty identifying students with food insecurity', fr: 'Difficulté à identifier les étudiants en insécurité alimentaire' },
      { en: 'Feeling overwhelmed balancing teaching and student support', fr: 'Se sentir dépassé par l\'équilibre entre l\'enseignement et le soutien aux étudiants' },
    ],
    journey: [
      {
        title: { en: 'Commute', fr: 'Navette' },
        content: { en: 'Before entering school, I need a journey that feels reliable — intuitive parking, clear wayfinding and simple digital guidance. A smooth commute allows me to mentally shift into educator mode and arrive grounded, organized, and ready to support my students.', fr: 'Avant d\'entrer à l\'école, j\'ai besoin d\'un voyage qui semble fiable : un stationnement intuitif, une orientation claire et un guidage numérique simple. Un trajet fluide me permet de passer mentalement en mode éducateur et d\'arriver ancré, organisé et prêt à soutenir mes élèves.' },
      },
      {
        title: { en: 'Arrival to the School / Campus', fr: 'Arrivée à l\'École/Campus' },
        content: { en: 'When I arrive, I want quick access to essential information, smooth navigation through the campus, and tools that help me prepare my classroom. I want my students to feel welcomed and ready to learn, so I use integrated digital tools to quickly assess who might need extra attention or resources before class begins.', fr: 'À mon arrivée, je souhaite un accès rapide aux informations essentielles, une navigation fluide sur le campus et des outils qui m\'aident à préparer ma classe. Je veux que mes élèves se sentent accueillis et prêts à apprendre, c\'est pourquoi j\'utilise des outils numériques intégrés pour évaluer rapidement qui pourrait avoir besoin d\'une attention ou de ressources supplémentaires avant le début du cours.' },
      },
      {
        title: { en: 'Teaching', fr: 'Enseignement' },
        content: { en: 'During lessons, I need dependable digital tools, good air quality, clear displays, and immediate support when something goes wrong. Automation, booking systems and IoT insights help maintain a calm, productive environment where students can concentrate and creativity can flourish.', fr: 'Pendant les cours, j\'ai besoin d\'outils numériques fiables, d\'une bonne qualité de l\'air, d\'affichages clairs et d\'une assistance immédiate en cas de problème. L\'automatisation, les systèmes de réservation et les informations sur l\'IoT contribuent à maintenir un environnement calme et productif dans lequel les étudiants peuvent se concentrer et où la créativité peut s\'épanouir.' },
      },
      {
        title: { en: 'Food & Beverage Area', fr: 'Espace restauration et boissons' },
        content: { en: 'During lunch, I grab a quick meal while potentially supervising students or attending meetings. I need efficient access to quality food without long waits, and I value time to collaborate with colleagues about student wellness and share observations from my dashboard about at-risk students.', fr: 'Pendant le déjeuner, je prends un repas rapide tout en supervisant potentiellement des étudiants ou en assistant à des réunions. J\'ai besoin d\'un accès efficace à des aliments de qualité sans longues attentes, et j\'apprécie le temps passé à collaborer avec mes collègues sur le bien-être des étudiants et à partager les observations de mon tableau de bord sur les étudiants à risque.' },
      },
      {
        title: { en: 'Freetime & Work/Life Balance', fr: 'Temps libre et équilibre travail/vie personnelle' },
        content: { en: 'After an intense stretch of teaching, I need short breaks that truly restore me: hydration, movement, mental decompression or simply a quiet moment. Wellbeing solutions help me sustain energy and patience throughout the day, supporting both my performance and my long-term resilience.', fr: 'Après un enseignement intense, j\'ai besoin de courtes pauses qui me ressourcent véritablement : hydratation, mouvement, décompression mentale ou simplement un moment de calme. Les solutions de bien-être m\'aident à maintenir mon énergie et ma patience tout au long de la journée, soutenant à la fois mes performances et ma résilience à long terme.' },
      },
    ],
  }
];

/** Bilingual authoring sources. */
export const XP_LEARN_PERSONA_SOURCES: PersonaSource[] = SPECS.map((spec) =>
  buildXpPersona(AREA, spec),
);

export const XP_LEARN_PERSONAS = XP_LEARN_PERSONA_SOURCES.map((p) =>
  localizePersona(p, "en"),
);
export const XP_LEARN_SOURCES = XP_LEARN_SOURCE_SOURCES.map((s) =>
  localizeSource(s, "en"),
);
