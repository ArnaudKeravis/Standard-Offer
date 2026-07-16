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
 * XP Catalogue — WORK area personas.
 * Content faithfully sourced from https://xpcatalogue.vercel.app/work/{slug}.
 * French strings are translations of the English catalogue copy.
 */

export const XP_WORK_PROJECT_ID = "proj-xp-work";

const AREA: XpAreaConfig = {
  projectId: XP_WORK_PROJECT_ID,
  family: "WORK",
  segment: { en: "Corporate Services — Work", fr: "Services aux entreprises — Work" },
  sourceId: "src-xp-work",
  sourceName: { en: "XP Catalogue — WORK personas", fr: "Catalogue XP — Personas WORK" },
  sourceExtract:
    "Sodexo XP Catalogue WORK personas scraped from https://xpcatalogue.vercel.app/work/{slug}. Who am I sections (workplace, goals, motivations, needs, pain points) and journey moments.",
};

export const XP_WORK_SOURCE_SOURCES: SourceDocumentSource[] = [buildXpSource(AREA)];

const SPECS: XpPersonaSpec[] = [
  {
    slug: 'client-work',
    name: 'Sarah Meyer',
    archetype: { en: 'Portfolio Manager', fr: 'Gestionnaire de portefeuille' },
    category: { en: 'Portfolio Manager', fr: 'Gestionnaire de portefeuille' },
    oneLineEssence: { en: 'A Portfolio Manager whose catalogue profile centres on: boost operational performance across all sites (cost, quality, safety).', fr: 'Gestionnaire de portefeuille — profil catalogue centré sur : boostez la performance opérationnelle sur tous les sites (coût, qualité, sécurité).' },
    quote: { en: 'I\'m looking for a reliable partner like Sodexo — someone who can keep up with our pace, deliver operational excellence without requiring my oversight, and help us save time by reducing friction.', fr: 'Je recherche un partenaire fiable comme Sodexo, quelqu\'un qui peut suivre notre rythme, assurer l\'excellence opérationnelle sans nécessiter ma supervision et nous aider à gagner du temps en réduisant les frictions.' },
    accentColor: '#1e3a8a',
    tags: [
      { en: 'portfolio', fr: 'portefeuille' },
      { en: 'performance', fr: 'performance' },
      { en: 'outsourcing', fr: 'externalisation' },
      { en: 'partner', fr: 'partenaire' },
    ],
    workplace: [
      { en: 'Industrial sites', fr: 'Sites industriels' },
      { en: 'On site production & Nomadic: ~50%', fr: 'Production sur site & Nomade : ~50%' },
      { en: 'Desk-based (on-site): ~40%', fr: 'Sur place (sur site) : ~ 40 %' },
      { en: 'Remote work: ~10%', fr: 'Travail à distance : ~10 %' },
    ],
    goals: [
      { en: 'Boost operational performance across all sites (cost, quality, safety)', fr: 'Boostez la performance opérationnelle sur tous les sites (coût, qualité, sécurité)' },
      { en: 'Outsource non-core services to focus on strategic activities', fr: 'Externaliser les services non essentiels pour se concentrer sur les activités stratégiques' },
      { en: 'Ensure business continuity, especially in crisis situations', fr: 'Assurer la continuité des activités, notamment en situation de crise' },
      { en: 'Enhance employee work environment to retain key talents', fr: 'Améliorer l’environnement de travail des employés pour retenir les talents clés' },
      { en: 'Meet corporate sustainability and compliance targets', fr: 'Atteindre les objectifs de l’entreprise en matière de durabilité et de conformité' },
    ],
    motivations: [
      { en: 'Streamline site operations through integrated service solutions', fr: 'Rationalisez les opérations du site grâce à des solutions de services intégrées' },
      { en: 'Improve company image internally and externally', fr: 'Améliorer l’image de l’entreprise en interne et en externe' },
      { en: 'Optimize operational costs while maintaining service quality', fr: 'Optimiser les coûts opérationnels tout en maintenant la qualité de service' },
      { en: 'Gain access to clear and actionable KPIs', fr: 'Accédez à des KPI clairs et exploitables' },
      { en: 'Delegate complexity to trusted third-party providers', fr: 'Déléguez la complexité à des fournisseurs tiers de confiance' },
    ],
    needs: [
      { en: 'Integrated and customizable facility management offers (catering, cleaning, security, maintenance)', fr: 'Offres de Facilities Management intégrées et personnalisables (restauration, nettoyage, sécurité, maintenance)' },
      { en: 'Transparent performance tracking with KPIs and service-level agreements', fr: 'Suivi transparent des performances avec des KPI et des accords de niveau de service' },
      { en: 'Operational flexibility during peak periods or unexpected events', fr: 'Flexibilité opérationnelle lors des périodes de pointe ou d’événements inattendus' },
      { en: 'Tangible impact on sustainability and employee well-being', fr: 'Un impact tangible sur le développement durable et le bien-être des collaborateurs' },
      { en: 'Support for internal change management and employee buy-in', fr: 'Accompagnement de la gestion du changement interne et adhésion des collaborateurs' },
    ],
    pains: [
      { en: 'Concern over big providers lacking flexibility', fr: 'Inquiétudes concernant le manque de flexibilité des grands fournisseurs' },
      { en: 'Previous bad experiences with rigid or slow vendors', fr: 'Mauvaises expériences antérieures avec des fournisseurs rigides ou lents' },
      { en: 'Fear of losing control over outsourced teams', fr: 'Peur de perdre le contrôle des équipes externalisées' },
      { en: 'Bureaucratic or complex contractual processes', fr: 'Processus contractuels bureaucratiques ou complexes' },
      { en: 'Change resistance (especially on production floors)', fr: 'Résistance au changement (en particulier dans les ateliers de production)' },
    ],
    journey: [
      {
        title: { en: 'Welcome & Admission', fr: 'Accueil et entrée' },
        content: { en: 'My day begins as I arrive at the campus, and I\'m immediately reassured knowing that parking will be available, security runs efficiently, and that first essential coffee corner is ready to fuel my morning. Thanks to Sodexo\'s smart services, I can start my day without any stress or unexpected hurdles.', fr: 'Ma journée commence dès mon arrivée sur le campus, et je suis immédiatement rassurée de savoir qu\'un parking sera disponible, que la sécurité fonctionne efficacement et que ce premier coin café indispensable est prêt à alimenter ma matinée. Grâce aux services intelligents de Sodexo, je peux commencer ma journée sans stress ni obstacle inattendu.' },
      },
      {
        title: { en: 'Kick off & Early Check', fr: 'Coup d\'envoi et vérification anticipée' },
        content: { en: 'I kick off my morning with a brief but focused meeting with the Sodexo Site Manager. Together, we review the daily KPIs for both facilities and food services, using real-time dashboards from Wando that instantly highlight any priorities or service alerts that need my attention.', fr: 'Je commence ma matinée par une réunion brève mais ciblée avec le responsable du site Sodexo. Ensemble, nous examinons les KPI quotidiens des installations et des services de restauration, à l\'aide des tableaux de bord en temps réel de Wando qui mettent instantanément en évidence toutes les priorités ou alertes de service nécessitant mon attention.' },
      },
      {
        title: { en: 'Internal Meetings & Alignment', fr: 'Réunions internes et alignement' },
        content: { en: 'Mid-morning brings my check-in with Procurement, where I confirm contract performance, review costs, and assess our sustainability metrics. Sodexo\'s reporting tools make this process effortless, allowing me to track compliance and value with complete confidence.', fr: 'En milieu de matinée, je m\'enregistre avec les achats, où je confirme l\'exécution du contrat, examine les coûts et évalue nos indicateurs de durabilité. Les outils de reporting de Sodexo facilitent ce processus, me permettant de suivre la conformité et la valeur en toute confiance.' },
      },
      {
        title: { en: 'Service Review & Site Rounds', fr: 'Examen du service et tournées de sites' },
        content: { en: 'Throughout the day, I stay connected with our people by reviewing our latest employee feedback and satisfaction scores. This helps me ensure that both workplace and dining services continue to evolve and align with what our employees actually need and want.', fr: 'Tout au long de la journée, je reste en contact avec nos collaborateurs en examinant nos derniers commentaires et scores de satisfaction. Cela m\'aide à garantir que les services sur le lieu de travail et les restaurants continuent d\'évoluer et de s\'aligner sur ce dont nos employés ont réellement besoin et veulent.' },
      },
      {
        title: { en: 'Lunch & Stakeholder Engagement', fr: 'Déjeuner et engagement des parties prenantes' },
        content: { en: 'In the afternoon, I dive into occupancy and usage data from Wando. This real-time information allows me to make informed adjustments to workspace layouts, cleaning schedules, and food offerings, ensuring we\'re always matching actual demand rather than assumptions.', fr: 'Dans l’après-midi, je plonge dans les données d’occupation et d’utilisation de Wando. Ces informations en temps réel me permettent d\'apporter des ajustements éclairés à l\'aménagement des espaces de travail, aux horaires de nettoyage et aux offres de restauration, garantissant ainsi que nous répondons toujours à la demande réelle plutôt qu\'aux hypothèses.' },
      },
      {
        title: { en: 'Improvement Sessions & Forward Planning', fr: 'Séances d\'amélioration et planification prospective' },
        content: { en: 'I dedicate time each day to step back from daily operations and focus on improvement and future planning. By analyzing employee insights and team feedback, I can identify trends, highlight areas for growth, and shape strategies that strengthen both workplace and dining services.', fr: 'Je consacre du temps chaque jour à prendre du recul par rapport aux opérations quotidiennes et à me concentrer sur l\'amélioration et la planification future. En analysant les idées des employés et les commentaires de l\'équipe, je peux identifier les tendances, mettre en évidence les domaines de croissance et élaborer des stratégies qui renforcent à la fois les services sur le lieu de travail et les restaurants.' },
      },
    ],
  },
  {
    slug: 'operator-work',
    name: 'Marina Bardi',
    archetype: { en: 'Site Manager (Food & FM)', fr: 'Chef de Site (Alimentaire & FM)' },
    category: { en: 'Site Manager (Food & FM)', fr: 'Chef de Site (Alimentaire & FM)' },
    oneLineEssence: { en: 'A Site Manager (Food & FM) whose catalogue profile centres on: ensure service quality & compliance across sites.', fr: 'Chef de Site (Alimentaire & FM) — profil catalogue centré sur : assurer la qualité et la conformité du service sur tous les sites.' },
    quote: { en: 'My job is to make sure the client is happy and the teams are aligned every day. When there\'s a problem, I need quick info and quick solutions. So, I don\'t have time for 3 tools that don\'t talk to each other.', fr: 'Mon travail consiste à m\'assurer que le client soit satisfait et que les équipes soient alignées au quotidien. Lorsqu\'il y a un problème, j\'ai besoin d\'informations et de solutions rapides. Du coup, je n\'ai pas le temps pour 3 outils qui ne se parlent pas.' },
    accentColor: '#1d4ed8',
    tags: [
      { en: 'site-ops', fr: 'ops site' },
      { en: 'team-lead', fr: 'chef d\'équipe' },
      { en: 'service-quality', fr: 'qualité de service' },
      { en: 'firefighting', fr: 'pompiérisme' },
    ],
    workplace: [
      { en: 'Multiple client sites (Catering, IFM services)', fr: 'Sites clients multiples (Restauration, services IFM)' },
      { en: 'On site production & Nomadic: ~60%', fr: 'Production sur site & Nomade : ~60%' },
      { en: 'Desk-based (on-site): ~25%', fr: 'Sur place (sur site) : ~25 %' },
      { en: 'ABW / collaborative: ~15%', fr: 'ABW / collaboratif : ~15 %' },
    ],
    goals: [
      { en: 'Ensure service quality & compliance across sites', fr: 'Assurer la qualité et la conformité du service sur tous les sites' },
      { en: 'Orchestrate teams, schedules, and incident resolution', fr: 'Orchestrer les équipes, les plannings et la résolution des incidents' },
      { en: 'Maintain client relationships and respond quickly to their needs', fr: 'Entretenir les relations avec les clients et répondre rapidement à leurs besoins' },
      { en: 'Deliver KPIs and financial performance (budget, margins, productivity)', fr: 'Délivrer les KPI et la performance financière (budget, marges, productivité)' },
      { en: 'Implement Sodexo standards, safety and sustainability guidelines', fr: 'Mettre en œuvre les normes, les directives de sécurité et de développement durable de Sodexo' },
    ],
    motivations: [
      { en: 'Deliver seamless, high-quality service to the client', fr: 'Fournir un service fluide et de haute qualité au client' },
      { en: 'Lead and motivate teams effectively', fr: 'Diriger et motiver efficacement les équipes' },
      { en: 'Hit financial targets without compromising on safety or quality', fr: 'Atteignez vos objectifs financiers sans compromettre la sécurité ou la qualité' },
      { en: 'Simplify operations through digital tools and clear processes', fr: 'Simplifiez les opérations grâce à des outils numériques et des processus clairs' },
      { en: 'Be seen as a trusted advisor by the client and Sodexo headquarters', fr: 'Être perçu comme un conseiller de confiance par le client et le siège de Sodexo' },
    ],
    needs: [
      { en: 'Real-time performance indicators access through one single point of contact', fr: 'Accès aux indicateurs de performance en temps réel via un seul point de contact' },
      { en: 'Autonomy to adapt group processes to site specificities', fr: 'Autonomie pour adapter les processus de groupe aux spécificités du site' },
      { en: 'Better talent support: hiring, training, retaining talents', fr: 'Meilleur accompagnement des talents : recrutement, formation, fidélisation des talents' },
      { en: 'Fast, clear internal communication (HR, procurement, finance etc.)', fr: 'Communication interne rapide et claire (RH, achats, finance etc.)' },
      { en: 'Recognition from clients and Sodexo hierarchy when goals are met', fr: 'Reconnaissance des clients et de la hiérarchie de Sodexo lorsque les objectifs sont atteints' },
    ],
    pains: [
      { en: 'Constant juggling between operational fire-fighting and strategic planning', fr: 'Jongler constamment entre la lutte opérationnelle contre les incendies et la planification stratégique' },
      { en: 'Too many tools or reporting systems that don’t sync', fr: 'Trop d\'outils ou de systèmes de reporting qui ne se synchronisent pas' },
      { en: 'Difficulty recruiting or retaining skilled frontline staff', fr: 'Difficulté à recruter ou à retenir du personnel de première ligne qualifié' },
      { en: 'Manage cost pressure', fr: 'Gérer la pression sur les coûts' },
      { en: 'Feeling caught between top-down directives and local constraints', fr: 'Se sentir coincé entre les directives imposées d’en haut et les contraintes locales' },
    ],
    journey: [
      {
        title: { en: 'Kick-off & Early Check', fr: 'Coup d\'envoi et vérification anticipée' },
        content: { en: 'I start the morning with a quick team briefing. This kick-off is key to align everyone on the day’s priorities and responsibilities. After that, I carry out my early checks to make sure everything is running smoothly, safe, and ready for operations.', fr: 'Je commence la matinée par un rapide briefing de l’équipe. Ce coup d’envoi est essentiel pour aligner tout le monde sur les priorités et responsabilités de la journée. Après cela, j\'effectue mes premières vérifications pour m\'assurer que tout fonctionne correctement, en toute sécurité et prêt à fonctionner.' },
      },
      {
        title: { en: 'Kitchen / Back Kitchen: FM Checking Round', fr: 'Cuisine / Arrière Cuisine : Ronde de Vérification FM' },
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
  },
  {
    slug: 'white-collar',
    name: 'David Miller',
    archetype: { en: 'Admin Function', fr: 'Fonction d\'administration' },
    category: { en: 'Admin Function', fr: 'Fonction d\'administration' },
    oneLineEssence: { en: 'A Admin Function whose catalogue profile centres on: eat healthy and fast during busy workdays.', fr: 'Fonction d\'administration — profil catalogue centré sur : mangez sainement et rapidement pendant les journées de travail chargées.' },
    quote: { en: 'I need quick, healthy, and affordable food at work, with little extras that make my day easier, otherwise I’ll just go elsewhere.', fr: 'J’ai besoin de nourriture rapide, saine et abordable au travail, avec des petits plus qui me facilitent la journée, sinon j’irai ailleurs.' },
    accentColor: '#2563eb',
    tags: [
      { en: 'hybrid', fr: 'hybride' },
      { en: 'productivity', fr: 'productivité' },
      { en: 'healthy-eating', fr: 'alimentation saine' },
      { en: 'digital-services', fr: 'services numériques' },
    ],
    workplace: [
      { en: 'International large R&D center', fr: 'Grand centre R&D international' },
      { en: 'Lab-based & Nomadic: ~50%', fr: 'En laboratoire et nomade : ~50 %' },
      { en: 'Desk-based (on-site): ~25%', fr: 'Sur place (sur site) : ~25 %' },
      { en: 'ABW (Activity Based Working)/ collaborative: ~15%', fr: 'ABW (Activity Based Working)/collaboratif : ~15%' },
      { en: 'Remote work: ~10%', fr: 'Travail à distance : ~10 %' },
    ],
    goals: [
      { en: 'Eat healthy and fast during busy workdays', fr: 'Mangez sainement et rapidement pendant les journées de travail chargées' },
      { en: 'Stay productive and focused throughout the day', fr: 'Restez productif et concentré tout au long de la journée' },
      { en: 'Maintain work-life balance despite high pressure', fr: 'Maintenir l’équilibre travail-vie personnelle malgré la pression élevée' },
      { en: 'Feel supported physically and mentally at work', fr: 'Se sentir soutenu physiquement et mentalement au travail' },
    ],
    motivations: [
      { en: 'Access to healthy, varied, and affordable meals on-site', fr: 'Accès à des repas sains, variés et abordables sur place' },
      { en: 'Use of digital tools to pre-order food or reserve spaces', fr: 'Utilisation d’outils numériques pour précommander de la nourriture ou réserver des espaces' },
      { en: 'Take advantage of employee perks (fitness, concierge, events)', fr: 'Profitez des avantages des employés (fitness, conciergerie, événements)' },
      { en: 'Reduce stress with simple, seamless services', fr: 'Réduisez le stress avec des services simples et transparents' },
      { en: 'Feel valued', fr: 'Se sentir valorisé' },
    ],
    needs: [
      { en: 'Mobile app with menus, allergens, pre-order & payment', fr: 'Application mobile avec menus, allergènes, précommande et paiement' },
      { en: 'Fresh, tasty, and sustainable meal options adapted to dietary needs', fr: 'Des options de repas frais, savoureux et durables adaptés aux besoins alimentaires' },
      { en: 'Smooth service experience (clean spaces, fast checkout, clear signage)', fr: 'Expérience de service fluide (espaces propres, paiement rapide, signalisation claire)' },
      { en: 'Access to well-being services (yoga classes, mental health support, etc.)', fr: 'Accès à des services de bien-être (cours de yoga, soutien en santé mentale, etc.)' },
      { en: 'Strong alignment with sustainability and social values', fr: 'Fort alignement avec la durabilité et les valeurs sociales' },
    ],
    pains: [
      { en: 'Long lines at the cafeteria or poor meal options', fr: 'Longues files d\'attente à la cafétéria ou options de repas médiocres' },
      { en: 'Lack of vegetarian/vegan/gluten-free choices', fr: 'Manque de choix végétariens/végétaliens/sans gluten' },
      { en: 'Rigid opening hours or lack of flexibility for hybrid workers', fr: 'Horaires d\'ouverture rigides ou manque de flexibilité pour les travailleurs hybrides' },
      { en: 'Apps or systems that are buggy or complicated', fr: 'Applications ou systèmes bogués ou compliqués' },
      { en: 'Perceived low quality or unattractiveness of food offerings', fr: 'Perception de la mauvaise qualité ou du manque d\'attrait des offres alimentaires' },
    ],
    journey: [
      {
        title: { en: 'Commute', fr: 'Navette' },
        content: { en: 'I want to plan my commute with confidence, knowing that parking, routes and last‑mile guidance are all taken care of. I need real‑time information and digital services that get me to the office on time, without traffic surprises or searching endlessly for a spot.', fr: 'Je veux planifier mes déplacements en toute confiance, sachant que le stationnement, les itinéraires et le guidage sur le dernier kilomètre sont tous pris en charge. J\'ai besoin d\'informations en temps réel et de services numériques qui me permettent d\'arriver au bureau à l\'heure, sans surprises de circulation ni recherche interminable d\'une place.' },
      },
      {
        title: { en: 'Welcome Area', fr: 'Espace d\'accueil' },
        content: { en: 'When I arrive on site, I want to pass security, find my way and welcome my guests without queues, confusion or awkward waiting. I need smart reception, clear signage and concierge‑like support so that every visit feels simple, professional and even a bit memorable and sustainable.', fr: 'Lorsque j\'arrive sur place, je souhaite passer le contrôle de sécurité, trouver mon chemin et accueillir mes invités sans files d\'attente, sans confusion ni attente gênante. J\'ai besoin d\'un accueil intelligent, d\'une signalisation claire et d\'un soutien de type concierge pour que chaque visite soit simple, professionnelle et même un peu mémorable et durable.' },
      },
      {
        title: { en: 'Workplace', fr: 'Lieu de travail' },
        content: { en: 'As my day fills up with meetings and focus time, I need to quickly see where my team is, find an available desk or room, and adapt to changing schedules. I want intuitive tools that show occupancy in real time, simplify bookings and keep my work environment comfortable and well‑serviced in the background.', fr: 'Alors que ma journée se remplit de réunions et de temps de concentration, je dois rapidement voir où se trouve mon équipe, trouver un bureau ou une salle disponible et m\'adapter aux changements d\'horaires. Je veux des outils intuitifs qui affichent l\'occupation en temps réel, simplifient les réservations et maintiennent mon environnement de travail confortable et bien entretenu en arrière-plan.' },
      },
      {
        title: { en: 'Food & Beverage Area', fr: 'Espace restauration et boissons' },
        content: { en: 'At lunchtime, I head to the cafeteria looking for my go-to healthy options without endless queues. I need to fuel up efficiently before afternoon calls, so I want a streamlined payment process that remembers my food preferences automatically without repeatedly inputting details.', fr: 'À l’heure du déjeuner, je me dirige vers la cafétéria à la recherche de mes options santé préférées, sans files d’attente interminables. J\'ai besoin de faire le plein efficacement avant les appels de l\'après-midi, je souhaite donc un processus de paiement simplifié qui mémorise automatiquement mes préférences alimentaires sans saisir de détails à plusieurs reprises.' },
      },
      {
        title: { en: 'Wellbeing & Breaktime', fr: 'Bien-être & Pause' },
        content: { en: 'Between intense work blocks, I want easy ways to pause, move, breathe and look after my physical and mental health. I need simple access to healthy breaks, wellbeing activities and nudges that help me disconnect for a moment and come back focused and energized.', fr: 'Entre les blocs de travail intenses, je recherche des moyens faciles de faire une pause, de bouger, de respirer et de prendre soin de ma santé physique et mentale. J\'ai besoin d\'un accès simple à des pauses saines, à des activités de bien-être et à des coups de pouce qui m\'aident à me déconnecter un instant et à revenir concentré et plein d\'énergie.' },
      },
    ],
  },
  {
    slug: 'blue-collar',
    name: 'Michael Silva',
    archetype: { en: 'Production Line Worker', fr: 'Ouvrier de chaîne de production' },
    category: { en: 'Production Line Worker', fr: 'Ouvrier de chaîne de production' },
    oneLineEssence: { en: 'A Production Line Worker whose catalogue profile centres on: work safely and efficiently during physical shifts.', fr: 'Ouvrier de chaîne de production — profil catalogue centré sur : travailler de manière sécuritaire et efficace pendant les quarts de travail physiques.' },
    quote: { en: 'I need fast, simple food that gives me energy for my shift, without wasting my short breaks standing in line or figuring out complicated systems.', fr: 'J\'ai besoin d\'une nourriture simple et rapide qui me donne de l\'énergie pour mon travail, sans perdre mes courtes pauses à faire la queue ou à comprendre des systèmes compliqués.' },
    accentColor: '#1e40af',
    tags: [
      { en: 'shift-work', fr: 'travail en équipes' },
      { en: 'time-pressed', fr: 'temps compté' },
      { en: 'energy', fr: 'énergie' },
      { en: 'hands-on', fr: 'terrain' },
    ],
    workplace: [
      { en: 'International Large R&D Center', fr: 'Grand centre international de R&D' },
      { en: 'Lab-based & Manufacturing: ~60%', fr: 'En laboratoire et fabrication : ~60 %' },
      { en: 'Desk-based (on-site): ~5%', fr: 'Sur place (sur site) : ~5 %' },
      { en: 'Field work/Maintenance: ~25%', fr: 'Travaux de terrain/Maintenance : ~25 %' },
      { en: 'Remote work: ~10%', fr: 'Travail à distance : ~10 %' },
    ],
    goals: [
      { en: 'Work safely and efficiently during physical shifts', fr: 'Travailler de manière sécuritaire et efficace pendant les quarts de travail physiques' },
      { en: 'Maintain energy and focus throughout long workdays', fr: 'Maintenir son énergie et sa concentration tout au long des longues journées de travail' },
      { en: 'Access quick services without losing break time', fr: 'Accédez à des services rapides sans perdre de temps de pause' },
      { en: 'Feel recognized and valued for hands-on work', fr: 'Se sentir reconnu et valorisé pour un travail pratique' },
    ],
    motivations: [
      { en: 'Access to quick, energizing meals adapted to shift work', fr: 'Accès à des repas rapides et énergisants adaptés au travail posté' },
      { en: 'Simple, frictionless payment systems', fr: 'Des systèmes de paiement simples et fluides' },
      { en: 'Access to services that respect his time and constraints', fr: 'Accès à des services respectueux de son temps et de ses contraintes' },
      { en: 'Reduce time waste during short breaks', fr: 'Réduisez la perte de temps lors des courtes pauses' },
      { en: 'Access to well-being services despite demanding schedule', fr: 'Accès aux services de bien-être malgré un emploi du temps chargé' },
    ],
    needs: [
      { en: 'Express service options (grab & go, pre-order)', fr: 'Options de service express (à emporter, précommande)' },
      { en: 'Energizing, affordable meal options available at all hours', fr: 'Des options de repas énergisantes et abordables disponibles à toute heure' },
      { en: 'One-tap payment systems', fr: 'Systèmes de paiement en un seul clic' },
      { en: 'Spaces to rest and recover during breaks', fr: 'Des espaces pour se reposer et récupérer pendant les pauses' },
      { en: 'Access to wellness services adapted to shift work', fr: 'Accès à des services de bien-être adaptés au travail posté' },
      { en: 'Clear, simple signage and processes', fr: 'Signalisation et processus clairs et simples' },
    ],
    pains: [
      { en: 'Long queues eating into already short breaks', fr: 'De longues files d\'attente rongent des pauses déjà courtes' },
      { en: 'Limited food options for late shifts or dietary needs', fr: 'Options alimentaires limitées pour les quarts de travail tardifs ou les besoins alimentaires' },
      { en: 'Complex payment or ordering systems', fr: 'Systèmes de paiement ou de commande complexes' },
      { en: 'Not enough satisfying meals that provide lasting energy', fr: 'Pas assez de repas satisfaisants qui fournissent une énergie durable' },
      { en: 'Rigid timing that doesn\'t match shift schedules', fr: 'Calendrier rigide qui ne correspond pas aux horaires des équipes' },
      { en: 'Physical fatigue and lack of recovery spaces', fr: 'Fatigue physique et manque d’espaces de récupération' },
      { en: 'Limited access to wellness programs', fr: 'Accès limité aux programmes de bien-être' },
    ],
    journey: [
      {
        title: { en: 'Commute', fr: 'Navette' },
        content: { en: 'At the start of my shift, I need to access the site quickly without searching for parking or the correct entrance. Clear directions and real‑time updates help me get to my workstation safely and on time.', fr: 'Au début de mon quart de travail, je dois accéder rapidement au site sans chercher de parking ni la bonne entrée. Des instructions claires et des mises à jour en temps réel m\'aident à arriver à mon poste de travail en toute sécurité et à temps.' },
      },
      {
        title: { en: 'Welcome Area', fr: 'Espace d\'accueil' },
        content: { en: 'When I arrive, I must clear security checks, pick up any required gear, and find my team without confusion. I rely on simple digital check‑in, clear signage, and useful on‑site updates to start my shift efficiently.', fr: 'À mon arrivée, je dois passer les contrôles de sécurité, récupérer tout le matériel requis et retrouver mon équipe sans confusion. Je compte sur un enregistrement numérique simple, une signalisation claire et des mises à jour utiles sur site pour démarrer mon travail efficacement.' },
      },
      {
        title: { en: 'Workplace', fr: 'Lieu de travail' },
        content: { en: 'On the floor or on site, I need to know which zones are open, where to access tools, and how to report issues instantly. I want solutions that support safety, task coordination, and equipment management—without paperwork slowing me down.', fr: 'Sur place ou sur site, j\'ai besoin de savoir quelles zones sont ouvertes, où accéder aux outils et comment signaler instantanément les problèmes. Je veux des solutions qui prennent en charge la sécurité, la coordination des tâches et la gestion des équipements, sans que la paperasse ne me ralentisse.' },
      },
      {
        title: { en: 'Food & Beverage Area', fr: 'Espace restauration et boissons' },
        content: { en: 'With short or irregular break times, I need fast access to hot meals or grab‑and‑go options, without standing in line. Automated checkout and 24/7 vending options help me eat properly and get back to work without delay.', fr: 'Avec des temps de pause courts ou irréguliers, j\'ai besoin d\'accéder rapidement à des repas chauds ou à des plats à emporter, sans faire la queue. Le paiement automatisé et les options de vente 24h/24 et 7j/7 m\'aident à manger correctement et à retourner au travail sans délai.' },
      },
      {
        title: { en: 'Wellbeing & breaktime', fr: 'Bien-être & pause' },
        content: { en: 'After hours of manual work, I need hydration, a moment to rest, and ways to release physical tension. Simple access to physical health support, micro‑break spaces, and mental wellbeing tools helps me recharge for the rest of my shift.', fr: 'Après des heures de travail manuel, j\'ai besoin d\'hydratation, d\'un moment de repos et de moyens de relâcher les tensions physiques. Un accès simple à un soutien en matière de santé physique, à des espaces de micro-pause et à des outils de bien-être mental m\'aide à me ressourcer pour le reste de mon travail.' },
      },
    ],
  },
  {
    slug: 'grey-collar',
    name: 'Lily Parker',
    archetype: { en: 'Lab Researcher', fr: 'Chercheur en laboratoire' },
    category: { en: 'Lab Researcher', fr: 'Chercheur en laboratoire' },
    oneLineEssence: { en: 'A Lab Researcher whose catalogue profile centres on: conduct high level research while managing time and scientific rigor.', fr: 'Chercheur en laboratoire — profil catalogue centré sur : mener des recherches de haut niveau tout en gérant le temps et la rigueur scientifique.' },
    quote: { en: 'My breaks depend on when tests finish running, not fixed lunch hours. I need food available when I actually have 10 minutes free.', fr: 'Mes pauses dépendent de la fin des tests et non des heures de déjeuner fixes. J\'ai besoin de nourriture disponible alors que j\'ai 10 minutes de libre.' },
    accentColor: '#3b82f6',
    tags: [
      { en: 'lab', fr: 'labo' },
      { en: 'irregular-breaks', fr: 'pauses irrégulières' },
      { en: 'focus', fr: 'concentration' },
      { en: 'precision', fr: 'précision' },
    ],
    workplace: [
      { en: 'International large R&D center', fr: 'Grand centre R&D international' },
      { en: 'Lab-based & Nomadic: ~70%', fr: 'En laboratoire et nomade : ~70 %' },
      { en: 'Desk-based (on-site): ~15%', fr: 'Sur place (sur site) : ~15 %' },
      { en: 'ABW (Activity Based Working)/ collaborative: ~10%', fr: 'ABW (Activity Based Working)/collaboratif : ~10%' },
      { en: 'Remote work: ~5%', fr: 'Travail à distance : ~5 %' },
    ],
    goals: [
      { en: 'Conduct high level research while managing time and scientific rigor', fr: 'Mener des recherches de haut niveau tout en gérant le temps et la rigueur scientifique' },
      { en: 'Stay focused and precise throughout demanding experiments', fr: 'Restez concentré et précis tout au long des expériences exigeantes' },
      { en: 'Collaborate effectively and share results with colleagues', fr: 'Collaborer efficacement et partager les résultats avec vos collègues' },
      { en: 'Maintain physical and mental well-being despite intense work rhythms', fr: 'Maintenir le bien-être physique et mental malgré des rythmes de travail intenses' },
    ],
    motivations: [
      { en: 'Access to healthy, balanced and energizing meals to sustain focus', fr: 'Accès à des repas sains, équilibrés et énergisants pour maintenir la concentration' },
      { en: 'Practical digital services (food pre-ordering, room/equipment booking) to save time', fr: 'Des services digitaux pratiques (précommande de repas, réservation de salle/matériel) pour gagner du temps' },
      { en: 'Well-being perks (relaxation spaces, health programs, fitness, etc.)', fr: 'Des atouts bien-être (espaces de détente, programmes santé, fitness, etc.)' },
      { en: 'Reduce stress through simple, reliable services', fr: 'Réduisez le stress grâce à des services simples et fiables' },
      { en: 'Feel recognized for their role and contribution to impactful research', fr: 'Se sentent reconnus pour leur rôle et leur contribution à une recherche percutante' },
    ],
    needs: [
      { en: 'User-friendly mobile app (menus, allergens, pre-order, pick-up and payment)', fr: 'Application mobile conviviale (menus, allergènes, précommande, retrait et paiement)' },
      { en: 'Practical meal options: healthy snacks, portable meal boxes, adapted to irregular schedule', fr: 'Des options de repas pratiques : collations saines, boîtes repas portables, adaptées aux horaires irréguliers' },
      { en: 'Smooth service experience: time-saving, clean spaces, fast checkout', fr: 'Expérience de service fluide : gain de temps, espaces propres, paiement rapide' },
      { en: 'Access to well-being services tailored to long lab days (stretching, ergonomics, mental health support)', fr: 'Accès à des services de bien-être adaptés aux longues journées de laboratoire (étirements, ergonomie, soutien en santé mentale)' },
      { en: 'Strong alignment with sustainability, innovation and social values', fr: 'Fort alignement avec la durabilité, l’innovation et les valeurs sociales' },
    ],
    pains: [
      { en: 'Meals not adapted to irregular lab schedules (long experiments, shifted breaks)', fr: 'Repas non adaptés aux horaires irréguliers du laboratoire (expériences longues, pauses décalées)' },
      { en: 'Lack of quick and nutritious options between experiments', fr: 'Manque d\'options rapides et nutritives entre les expériences' },
      { en: 'Crowded cafeteria at peak hours, loss of critical time', fr: 'Cafétéria bondée aux heures de pointe, perte de temps critique' },
      { en: 'Limited flexibility for ordering or picking up meals outside fixed hours', fr: 'Flexibilité limitée pour commander ou récupérer des repas en dehors des horaires fixes' },
      { en: 'Digital tools that feel buggy, complicated or not suited to scientific work habits', fr: 'Des outils numériques qui paraissent buggés, compliqués ou inadaptés aux habitudes de travail scientifique' },
      { en: 'Food perceived as repetitive, unattractive or low quality', fr: 'Aliments perçus comme répétitifs, peu attrayants ou de mauvaise qualité' },
    ],
    journey: [
      {
        title: { en: 'Commute', fr: 'Navette' },
        content: { en: 'Before my shift or research cycle begins, I need a smooth trip to the site with clear guidance on parking and building access. Reliable navigation helps me arrive on time so I can focus on technical tasks—not logistics.', fr: 'Avant le début de mon quart de travail ou de mon cycle de recherche, j\'ai besoin d\'un déplacement fluide sur le site avec des conseils clairs sur le stationnement et l\'accès au bâtiment. Une navigation fiable m\'aide à arriver à l\'heure afin que je puisse me concentrer sur les tâches techniques et non sur la logistique.' },
      },
      {
        title: { en: 'Welcome Area', fr: 'Espace d\'accueil' },
        content: { en: 'When I arrive, I need fast badge access, information on lab availability, and immediate visibility on any safety or equipment notices. Digital reception and clear displays help me get to the right zone without delays.', fr: 'À mon arrivée, j\'ai besoin d\'un accès rapide aux badges, d\'informations sur la disponibilité des laboratoires et d\'une visibilité immédiate sur les avis de sécurité ou d\'équipement. La réception numérique et les affichages clairs m\'aident à atteindre la bonne zone sans délai.' },
      },
      {
        title: { en: 'Workplace', fr: 'Lieu de travail' },
        content: { en: 'During experiments or technical operations, I rely on equipment, rooms, and safety systems functioning as expected. Automated monitoring, alerts, and streamlined work orders let me concentrate on my tasks without manually checking every device.', fr: 'Lors d\'expérimentations ou d\'opérations techniques, je m\'appuie sur des équipements, des locaux et des systèmes de sécurité fonctionnant comme prévu. La surveillance automatisée, les alertes et les bons de travail rationalisés me permettent de me concentrer sur mes tâches sans vérifier manuellement chaque appareil.' },
      },
      {
        title: { en: 'Food & Beverage Area', fr: 'Espace restauration et boissons' },
        content: { en: 'After long hours of lab work or production monitoring, I need short, restorative breaks and easy access to hydration or mental wellbeing resources. Staying connected to colleagues—across shifts or sites—helps maintain a healthy rhythm.', fr: 'Après de longues heures de travail en laboratoire ou de suivi de production, j\'ai besoin de pauses courtes et réparatrices et d\'un accès facile à des ressources d\'hydratation ou de bien-être mental. Rester en contact avec ses collègues, quel que soit le poste ou le site, permet de maintenir un rythme sain.' },
      },
      {
        title: { en: 'Wellbeing & Breaktime', fr: 'Bien-être & Pause' },
        content: { en: 'My break times aren’t always regular, so I need food options I can access quickly—whether a full meal or a smart‑vending solution. Automated checkout and personalized options help me refuel efficiently before heading back to the lab or floor.', fr: 'Mes temps de pause ne sont pas toujours réguliers, j’ai donc besoin d’options alimentaires auxquelles je peux accéder rapidement, qu’il s’agisse d’un repas complet ou d’une solution de vente intelligente. Le paiement automatisé et les options personnalisées m\'aident à faire le plein efficacement avant de retourner au laboratoire ou à l\'étage.' },
      },
    ],
  },
  {
    slug: 'military',
    name: 'Rachel Adams',
    archetype: { en: 'Army Officer', fr: 'Officier de l\'armée' },
    category: { en: 'Army Officer', fr: 'Officier de l\'armée' },
    oneLineEssence: { en: 'A Army Officer whose catalogue profile centres on: maintain strong leadership and career stability.', fr: 'Officier de l\'armée — profil catalogue centré sur : maintenir un leadership fort et une stabilité de carrière.' },
    quote: { en: 'As a senior officer, I expect the dining experience to reflect the professionalism and standards we uphold in our duties. Moreover, creating an environment that fosters meaningful social interactions is crucial to encourage networking and to strengthen our leadership community.', fr: 'En tant qu\'officier supérieur, je m\'attends à ce que l\'expérience culinaire reflète le professionnalisme et les normes que nous respectons dans l\'exercice de nos fonctions. De plus, il est essentiel de créer un environnement propice à des interactions sociales significatives pour encourager le réseautage et renforcer notre communauté de leadership.' },
    accentColor: '#172554',
    tags: [
      { en: 'leadership', fr: 'leadership' },
      { en: 'standards', fr: 'standards' },
      { en: 'mess', fr: 'mess' },
      { en: 'community', fr: 'communauté' },
    ],
    workplace: [
      { en: 'Military Work Context:', fr: 'Contexte de travail militaire :' },
      { en: 'Strategic planning & operations: ~40%', fr: 'Planification stratégique et opérations : ~40 %' },
      { en: 'Administrative & policy tasks: ~25%', fr: 'Tâches administratives et politiques : ~25 %' },
      { en: 'Meetings & professional development: ~20%', fr: 'Réunions & développement professionnel : ~20%' },
      { en: 'Mess & social time: ~15%', fr: 'Désordre et temps social : ~15 %' },
    ],
    goals: [
      { en: 'Maintain strong leadership and career stability', fr: 'Maintenir un leadership fort et une stabilité de carrière' },
      { en: 'Uphold professionalism and standards in all duties', fr: 'Respecter le professionnalisme et les normes dans toutes les tâches' },
      { en: 'Balance technical responsibilities with mentoring', fr: 'Équilibrer les responsabilités techniques avec le mentorat' },
      { en: 'Foster meaningful social interactions and team bonding', fr: 'Favoriser des interactions sociales significatives et des liens d’équipe' },
      { en: 'Serve with duty and honour to the country', fr: 'Servir avec devoir et honneur le pays' },
    ],
    motivations: [
      { en: 'Professional dining experience that reflects military standards', fr: 'Expérience culinaire professionnelle qui reflète les normes militaires' },
      { en: 'Social spaces that encourage networking and leadership community', fr: 'Des espaces sociaux qui encouragent le réseautage et le leadership communautaire' },
      { en: 'Efficient, cashless systems for quick service', fr: 'Des systèmes efficaces et sans numéraire pour un service rapide' },
      { en: 'Quality food options that respect dietary needs and preferences', fr: 'Des options alimentaires de qualité qui respectent les besoins et les préférences alimentaires' },
      { en: 'Better expense tracking through online billing access', fr: 'Meilleur suivi des dépenses grâce à l\'accès à la facturation en ligne' },
      { en: 'Cleanliness and protocol in all facilities', fr: 'Propreté et protocole dans toutes les installations' },
    ],
    needs: [
      { en: 'Cashless payment systems and digital billing access', fr: 'Systèmes de paiement sans numéraire et accès à la facturation numérique' },
      { en: 'Pre-ordering meals via app for faster service', fr: 'Pré-commande de repas via l\'application pour un service plus rapide' },
      { en: 'Table service for formal dining with networking opportunities', fr: 'Service de table pour un dîner formel avec opportunités de réseautage' },
      { en: 'Better meal variety with healthy, customizable options', fr: 'Meilleure variété de repas avec des options saines et personnalisables' },
      { en: 'Social spaces (Common Room, lounges) for team building', fr: 'Espaces sociaux (Salle commune, salons) pour team building' },
      { en: 'Loyalty card systems to save money and track spending', fr: 'Systèmes de cartes de fidélité pour économiser de l\'argent et suivre les dépenses' },
    ],
    pains: [
      { en: 'Long wait times at mess despite food quality', fr: 'Longs délais d\'attente au mess malgré la qualité de la nourriture' },
      { en: 'Limited meal variety or bland, repetitive options', fr: 'Variété de repas limitée ou options fades et répétitives' },
      { en: 'No convenience store access on base for quick needs', fr: 'Aucun accès au dépanneur sur la base pour des besoins rapides' },
      { en: 'Lack of social spaces for junior ranks to bond', fr: 'Manque d\'espaces sociaux permettant aux grades subalternes de créer des liens' },
      { en: 'Poor accommodation maintenance and cleanliness issues', fr: 'Mauvais entretien et problèmes de propreté des logements' },
      { en: 'Difficult expense tracking without online billing', fr: 'Suivi des dépenses difficile sans facturation en ligne' },
    ],
    journey: [
      {
        title: { en: 'Morning Routine', fr: 'Routine du matin' },
        content: { en: 'I arrive on base early, in uniform, ready for the day\'s operations. The morning briefing sets the tone—mission updates, personnel assignments, readiness checks. I need clear directives and situational awareness to lead my team effectively throughout the day.', fr: 'J\'arrive tôt sur la base, en uniforme, prêt pour les opérations de la journée. Le briefing du matin donne le ton : mises à jour de la mission, affectations du personnel, contrôles de préparation. J\'ai besoin de directives claires et d\'une connaissance de la situation pour diriger mon équipe efficacement tout au long de la journée.' },
      },
      {
        title: { en: 'Work/Activities', fr: 'Travail/Activités' },
        content: { en: 'My day involves strategic planning sessions, overseeing logistics, and leading training exercises. I balance administrative duties with hands-on leadership, ensuring my team is prepared and mission-ready. I need efficiency and precision in every task to maintain operational excellence.', fr: 'Ma journée comprend des séances de planification stratégique, la supervision de la logistique et la direction d\'exercices de formation. J\'équilibre les tâches administratives avec un leadership pratique, en m\'assurant que mon équipe est préparée et prête à accomplir sa mission. J\'ai besoin d\'efficacité et de précision dans chaque tâche pour maintenir l\'excellence opérationnelle.' },
      },
      {
        title: { en: 'Lunch Break', fr: 'Pause déjeuner' },
        content: { en: 'Lunchtime at the mess hall is both nourishment and networking. I eat with fellow officers, discussing strategy and building camaraderie. I need quality food that fuels performance and a space that fosters meaningful professional interactions and team cohesion.', fr: 'L’heure du déjeuner au réfectoire est à la fois un moment de restauration et de réseautage. Je mange avec mes collègues officiers, discutant de stratégie et construisant une camaraderie. J\'ai besoin d\'une alimentation de qualité qui alimente la performance et d\'un espace qui favorise les interactions professionnelles significatives et la cohésion d\'équipe.' },
      },
      {
        title: { en: 'Afterwork', fr: 'Après le travail' },
        content: { en: 'After operations, I conduct debriefing sessions to review performance and lessons learned. Then I hit the gym for physical training—maintaining fitness is non-negotiable. I need structured routines that support both mental sharpness and physical readiness.', fr: 'Après les opérations, j\'organise des séances de débriefing pour passer en revue les performances et les enseignements tirés. Ensuite, je vais au gymnase pour m’entraîner physiquement – ​​le maintien de la forme physique n’est pas négociable. J\'ai besoin de routines structurées qui soutiennent à la fois l\'acuité mentale et la préparation physique.' },
      },
      {
        title: { en: 'Dinner with Regiment', fr: 'Dîner avec le régiment' },
        content: { en: 'Back in my quarters, I review tomorrow\'s schedule, respond to emails, and decompress. The transition from duty to personal time is essential. I need moments of calm to maintain work-life balance despite the demanding nature of military service.', fr: 'De retour dans mes quartiers, je révise le programme de demain, réponds aux e-mails et décompresse. La transition du temps de travail au temps personnel est essentielle. J\'ai besoin de moments de calme pour maintenir un équilibre entre travail et vie personnelle malgré le caractère exigeant du service militaire.' },
      },
      {
        title: { en: 'Evening Routine', fr: 'Routine du soir' },
        content: { en: 'Back in my quarters, I review tomorrow\'s schedule, respond to emails, and decompress. The transition from duty to personal time is essential. I need moments of calm to maintain work-life balance despite the demanding nature of military service.', fr: 'De retour dans mes quartiers, je révise le programme de demain, réponds aux e-mails et décompresse. La transition du temps de travail au temps personnel est essentielle. J\'ai besoin de moments de calme pour maintenir un équilibre entre travail et vie personnelle malgré le caractère exigeant du service militaire.' },
      },
    ],
  },
  {
    slug: 'exemple-minor',
    name: 'Alex Rivera',
    archetype: { en: 'Demo profile (IFM / E&R pilot)', fr: 'Profil démo (pilote IFM / E&R)' },
    category: { en: 'Demo profile (IFM / E&R pilot)', fr: 'Profil démo (pilote IFM / E&R)' },
    oneLineEssence: { en: 'A Demo profile (IFM / E&R pilot) whose catalogue profile centres on: see IFM value levers (safety, reliability, decarbonisation) reflected in everyday services.', fr: 'Profil démo (pilote IFM / E&R) — profil catalogue centré sur : voir les leviers de valeur IFM (sécurité, fiabilité, décarbonation) reflétés dans les services au quotidien.' },
    quote: { en: 'Same journey structure as White Collar for now — a sandbox to rehearse Energy & Resources storytelling before BoK personas land.', fr: 'Même structure de voyage que White Collar pour le moment – ​​un bac à sable pour répéter la narration sur l’énergie et les ressources avant l’arrivée des personnages de BoK.' },
    accentColor: '#64748b',
    tags: [
      { en: 'pilot', fr: 'pilote' },
      { en: 'IFM', fr: 'IFM' },
      { en: 'sandbox', fr: 'bac à sable' },
      { en: 'to-validate', fr: 'à valider' },
    ],
    workplace: [
      { en: 'Pilot site — Energy & Resources segment framing', fr: 'Site pilote — Cadrage du segment Énergie & Ressources' },
      { en: 'Desk-based (on-site): ~60%', fr: 'Sur place (sur site) : ~60 %' },
      { en: 'Field / plant rounds: ~30%', fr: 'Tournées champs/usines : ~30%' },
      { en: 'Remote: ~10%', fr: 'À distance : ~10 %' },
    ],
    goals: [
      { en: 'See IFM value levers (safety, reliability, decarbonisation) reflected in everyday services', fr: 'Voir les leviers de valeur IFM (sécurité, fiabilité, décarbonation) reflétés dans les services au quotidien' },
      { en: 'Compare client vs operator lenses on the same moments', fr: 'Comparez les objectifs du client et de l\'opérateur aux mêmes moments' },
    ],
    motivations: [
      { en: 'Clear narrative for leadership reviews', fr: 'Un récit clair pour les évaluations de leadership' },
      { en: 'Evidence-backed module and solution mapping', fr: 'Cartographie des modules et des solutions fondées sur des données probantes' },
    ],
    needs: [
      { en: 'Persona-specific user-needs categories under each moment', fr: 'Catégories de besoins des utilisateurs spécifiques à chaque instant' },
      { en: 'Tagged solutions aligned to IFM module families', fr: 'Solutions étiquetées alignées sur les familles de modules IFM' },
    ],
    pains: [
      { en: 'Content still being migrated from segmentation BoK and IFM value-case PDFs', fr: 'Le contenu est toujours en cours de migration depuis les PDF de segmentation BoK et IFM.' },
    ],
    journey: [
      {
        title: { en: 'Commute', fr: 'Navette' },
        content: { en: 'I want to plan my commute with confidence, knowing that parking, routes and last‑mile guidance are all taken care of. I need real‑time information and digital services that get me to the office on time, without traffic surprises or searching endlessly for a spot.', fr: 'Je veux planifier mes déplacements en toute confiance, sachant que le stationnement, les itinéraires et le guidage sur le dernier kilomètre sont tous pris en charge. J\'ai besoin d\'informations en temps réel et de services numériques qui me permettent d\'arriver au bureau à l\'heure, sans surprises de circulation ni recherche interminable d\'une place.' },
      },
      {
        title: { en: 'Welcome Area', fr: 'Espace d\'accueil' },
        content: { en: 'When I arrive on site, I want to pass security, find my way and welcome my guests without queues, confusion or awkward waiting. I need smart reception, clear signage and concierge‑like support so that every visit feels simple, professional and even a bit memorable and sustainable.', fr: 'Lorsque j\'arrive sur place, je souhaite passer le contrôle de sécurité, trouver mon chemin et accueillir mes invités sans files d\'attente, sans confusion ni attente gênante. J\'ai besoin d\'un accueil intelligent, d\'une signalisation claire et d\'un soutien de type concierge pour que chaque visite soit simple, professionnelle et même un peu mémorable et durable.' },
      },
      {
        title: { en: 'Workplace', fr: 'Lieu de travail' },
        content: { en: 'As my day fills up with meetings and focus time, I need to quickly see where my team is, find an available desk or room, and adapt to changing schedules. I want intuitive tools that show occupancy in real time, simplify bookings and keep my work environment comfortable and well‑serviced in the background.', fr: 'Alors que ma journée se remplit de réunions et de temps de concentration, je dois rapidement voir où se trouve mon équipe, trouver un bureau ou une salle disponible et m\'adapter aux changements d\'horaires. Je veux des outils intuitifs qui affichent l\'occupation en temps réel, simplifient les réservations et maintiennent mon environnement de travail confortable et bien entretenu en arrière-plan.' },
      },
      {
        title: { en: 'Food & Beverage Area', fr: 'Espace restauration et boissons' },
        content: { en: 'At lunchtime, I head to the cafeteria looking for my go-to healthy options without endless queues. I need to fuel up efficiently before afternoon calls, so I want a streamlined payment process that remembers my food preferences automatically without repeatedly inputting details.', fr: 'À l’heure du déjeuner, je me dirige vers la cafétéria à la recherche de mes options santé préférées, sans files d’attente interminables. J\'ai besoin de faire le plein efficacement avant les appels de l\'après-midi, je souhaite donc un processus de paiement simplifié qui mémorise automatiquement mes préférences alimentaires sans saisir de détails à plusieurs reprises.' },
      },
      {
        title: { en: 'Wellbeing & Breaktime', fr: 'Bien-être & Pause' },
        content: { en: 'Between intense work blocks, I want easy ways to pause, move, breathe and look after my physical and mental health. I need simple access to healthy breaks, wellbeing activities and nudges that help me disconnect for a moment and come back focused and energized.', fr: 'Entre les blocs de travail intenses, je recherche des moyens faciles de faire une pause, de bouger, de respirer et de prendre soin de ma santé physique et mentale. J\'ai besoin d\'un accès simple à des pauses saines, à des activités de bien-être et à des coups de pouce qui m\'aident à me déconnecter un instant et à revenir concentré et plein d\'énergie.' },
      },
    ],
    thin: true,
    confidenceLevel: "LOW",
    confidenceExplanation: {
      en: 'XP Catalogue profile with thin or pilot content. Preserved faithfully and tagged TO_VALIDATE until fuller research lands.',
      fr: 'Profil XP Catalogue au contenu mince ou pilote. Repris fidèlement et marqué À VALIDER jusqu\'à une recherche plus complète.',
    },
  }
];

/** Bilingual authoring sources. */
export const XP_WORK_PERSONA_SOURCES: PersonaSource[] = SPECS.map((spec) =>
  buildXpPersona(AREA, spec),
);

export const XP_WORK_PERSONAS = XP_WORK_PERSONA_SOURCES.map((p) =>
  localizePersona(p, "en"),
);
export const XP_WORK_SOURCES = XP_WORK_SOURCE_SOURCES.map((s) =>
  localizeSource(s, "en"),
);
