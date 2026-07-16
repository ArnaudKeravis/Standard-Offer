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
 * XP Catalogue — HEAL area personas.
 * Content faithfully sourced from https://xpcatalogue.vercel.app/heal/{slug}.
 * French strings are translations of the English catalogue copy.
 */

export const XP_HEAL_PROJECT_ID = "proj-xp-heal";

const AREA: XpAreaConfig = {
  projectId: XP_HEAL_PROJECT_ID,
  family: "HEAL",
  segment: { en: "Healthcare — Heal", fr: "Santé — Heal" },
  sourceId: "src-xp-heal",
  sourceName: { en: "XP Catalogue — HEAL personas", fr: "Catalogue XP — Personas HEAL" },
  sourceExtract:
    "Sodexo XP Catalogue HEAL personas scraped from https://xpcatalogue.vercel.app/heal/{slug}. Who am I sections (workplace, goals, motivations, needs, pain points) and journey moments.",
};

export const XP_HEAL_SOURCE_SOURCES: SourceDocumentSource[] = [buildXpSource(AREA)];

const SPECS: XpPersonaSpec[] = [
  {
    slug: 'client-heal',
    name: 'Michael Anderson',
    archetype: { en: 'Healthcare Portfolio Manager', fr: 'Gestionnaire de portefeuille de soins de santé' },
    category: { en: 'Healthcare Portfolio Manager', fr: 'Gestionnaire de portefeuille de soins de santé' },
    oneLineEssence: { en: 'A Healthcare Portfolio Manager whose catalogue profile centres on: enhance patient experience through quality food and hospitality services.', fr: 'Gestionnaire de portefeuille de soins de santé — profil catalogue centré sur : améliorer l’expérience des patients grâce à des services alimentaires et d’accueil de qualité.' },
    quote: { en: 'I\'m looking for a reliable partner like Sodexo who can keep up with our pace, deliver operational excellence in patient care environments without requiring my oversight, and help us save time while ensuring compliance with healthcare standards.', fr: 'Je recherche un partenaire fiable comme Sodexo, capable de suivre notre rythme, d\'assurer l\'excellence opérationnelle dans les environnements de soins aux patients sans nécessiter ma supervision et de nous aider à gagner du temps tout en garantissant le respect des normes de santé.' },
    accentColor: '#0f766e',
    tags: [
      { en: 'healthcare', fr: 'santé' },
      { en: 'patient-experience', fr: 'expérience patient' },
      { en: 'compliance', fr: 'conformité' },
      { en: 'partner', fr: 'partenaire' },
    ],
    workplace: [
      { en: 'Healthcare Facilities', fr: 'Établissements de santé' },
      { en: 'Hospital & Clinical sites: ~60%', fr: 'Sites hospitaliers et cliniques : ~60 %' },
      { en: 'Outpatient & Ambulatory centers: ~30%', fr: 'Centres ambulatoires et ambulatoires : ~30 %' },
      { en: 'Remote oversight: ~10%', fr: 'Surveillance à distance : ~10 %' },
    ],
    goals: [
      { en: 'Enhance patient experience through quality food and hospitality services', fr: 'Améliorer l’expérience des patients grâce à des services alimentaires et d’accueil de qualité' },
      { en: 'Outsource non-clinical services to focus on care delivery', fr: 'Externaliser les services non cliniques pour se concentrer sur la prestation des soins' },
      { en: 'Ensure healthcare compliance and safety, especially in clinical environments', fr: 'Assurer la conformité et la sécurité des soins de santé, notamment en milieu clinique' },
      { en: 'Improve staff satisfaction to retain medical talent', fr: 'Améliorer la satisfaction du personnel pour retenir les talents médicaux' },
      { en: 'Meet healthcare accreditation standards and regulatory compliance', fr: 'Respecter les normes d\'accréditation des soins de santé et la conformité réglementaire' },
    ],
    motivations: [
      { en: 'Streamline facility operations through integrated service solutions', fr: 'Rationalisez les opérations des installations grâce à des solutions de services intégrées' },
      { en: 'Improve hospital reputation internally and with patients', fr: 'Améliorer la réputation de l’hôpital en interne et auprès des patients' },
      { en: 'Optimize operational costs while maintaining clinical quality', fr: 'Optimiser les coûts opérationnels tout en maintenant la qualité clinique' },
      { en: 'Gain access to clear and actionable healthcare KPIs', fr: 'Accédez à des KPI de santé clairs et exploitables' },
      { en: 'Delegate complexity to trusted healthcare service providers', fr: 'Déléguez la complexité à des prestataires de services de santé de confiance' },
    ],
    needs: [
      { en: 'Integrated and customizable facility management (catering, cleaning, patient support, maintenance)', fr: 'Gestion des installations intégrée et personnalisable (restauration, nettoyage, accompagnement des patients, maintenance)' },
      { en: 'Transparent performance tracking with healthcare-specific KPIs and SLAs', fr: 'Suivi transparent des performances avec des KPI et des SLA spécifiques aux soins de santé' },
      { en: 'Operational flexibility during peak periods, emergencies, or patient surges', fr: 'Flexibilité opérationnelle pendant les périodes de pointe, les urgences ou les pics de patients' },
      { en: 'Tangible impact on patient satisfaction and clinical staff well-being', fr: 'Impact tangible sur la satisfaction des patients et le bien-être du personnel clinique' },
      { en: 'Support for healthcare compliance and accreditation processes', fr: 'Prise en charge des processus de conformité et d’accréditation des soins de santé' },
    ],
    pains: [
      { en: 'Concern over big providers lacking healthcare specialization', fr: 'Inquiétudes concernant le manque de spécialisation des grands prestataires de soins de santé' },
      { en: 'Previous bad experiences with rigid or inexperienced vendors', fr: 'Mauvaises expériences antérieures avec des fournisseurs rigides ou inexpérimentés' },
      { en: 'Fear of losing control over patient-facing services', fr: 'Peur de perdre le contrôle des services destinés aux patients' },
      { en: 'Complex healthcare regulations and compliance requirements', fr: 'Réglementations complexes en matière de soins de santé et exigences de conformité' },
      { en: 'Change resistance (especially from medical staff)', fr: 'Résistance au changement (surtout de la part du personnel médical)' },
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
    slug: 'operator-heal',
    name: 'Priya Nair',
    archetype: { en: 'Clinical Site Operations Lead', fr: 'Responsable des opérations du site clinique' },
    category: { en: 'Clinical Site Operations Lead', fr: 'Responsable des opérations du site clinique' },
    oneLineEssence: { en: 'A Clinical Site Operations Lead whose catalogue profile centres on: deliver safe, compliant meal and FM services across wards.', fr: 'Responsable des opérations du site clinique — profil catalogue centré sur : fournir des services de repas et de FM sûrs et conformes dans tous les services.' },
    quote: { en: 'I need one place to see patient meal service, FM tickets, and staffing — and I need alerts before small issues become incidents.', fr: 'J\'ai besoin d\'un seul endroit pour voir le service de repas des patients, les tickets FM et le personnel – et j\'ai besoin d\'alertes avant que les petits problèmes ne se transforment en incidents.' },
    accentColor: '#0d9488',
    tags: [
      { en: 'clinical-ops', fr: 'ops cliniques' },
      { en: 'meal-service', fr: 'restauration' },
      { en: 'escalation', fr: 'escalade' },
      { en: 'dashboards', fr: 'tableaux de bord' },
    ],
    workplace: [
      { en: 'Acute & extended care sites', fr: 'Sites de soins actifs et prolongés' },
      { en: 'On-floor clinical support: ~55%', fr: 'Soutien clinique sur place : ~55 %' },
      { en: 'Coordination & admin: ~30%', fr: 'Coordination & administration : ~30%' },
      { en: 'Remote oversight: ~15%', fr: 'Surveillance à distance : ~15 %' },
    ],
    goals: [
      { en: 'Deliver safe, compliant meal and FM services across wards', fr: 'Fournir des services de repas et de FM sûrs et conformes dans tous les services' },
      { en: 'Coordinate cross-functional teams with clear KPIs', fr: 'Coordonner les équipes interfonctionnelles avec des KPI clairs' },
      { en: 'Reduce incident response time and audit findings', fr: 'Réduisez le temps de réponse aux incidents et les résultats des audits' },
      { en: 'Improve staff satisfaction on shift rotations', fr: 'Améliorer la satisfaction du personnel lors des rotations de quarts de travail' },
    ],
    motivations: [
      { en: 'Tools that simplify rounds and handovers', fr: 'Des outils qui simplifient les tournées et les transferts' },
      { en: 'Clear escalation paths when something breaks', fr: 'Effacer les chemins d\'escalade en cas de panne' },
      { en: 'Recognition that operations enable better care', fr: 'Reconnaissance que les opérations permettent de meilleurs soins' },
    ],
    needs: [
      { en: 'Unified dashboards and mobile access', fr: 'Tableaux de bord unifiés et accès mobile' },
      { en: 'Predictable SLAs and vendor coordination', fr: 'SLA prévisibles et coordination des fournisseurs' },
      { en: 'Training paths for temporary staff', fr: 'Parcours de formation pour intérimaires' },
    ],
    pains: [
      { en: 'Fragmented tools across catering, FM, and nursing', fr: 'Des outils fragmentés dans la restauration, la FM et les soins infirmiers' },
      { en: 'Paper or duplicate data entry', fr: 'Saisie de données sur papier ou en double' },
      { en: 'Understaffing on peak meal times', fr: 'Manque de personnel aux heures de pointe pour les repas' },
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
    slug: 'doctor',
    name: 'Dr. Thomas Leroy',
    archetype: { en: 'Hospital Physician', fr: 'Médecin hospitalier' },
    category: { en: 'Hospital Physician', fr: 'Médecin hospitalier' },
    oneLineEssence: { en: 'A Hospital Physician whose catalogue profile centres on: deliver accurate diagnosis and effective treatment plans.', fr: 'Médecin hospitalier — profil catalogue centré sur : fournir un diagnostic précis et des plans de traitement efficaces.' },
    quote: { en: 'Every patient deserves my full attention, but the system keeps pulling me away with paperwork and scattered information. I need tools that help me focus on medicine, not administration.', fr: 'Chaque patient mérite toute mon attention, mais le système continue de m\'éloigner de la paperasse et des informations éparses. J\'ai besoin d\'outils qui m\'aident à me concentrer sur la médecine et non sur l\'administration.' },
    accentColor: '#115e59',
    tags: [
      { en: 'physician', fr: 'médecin' },
      { en: 'time-pressure', fr: 'pression temporelle' },
      { en: 'patient-care', fr: 'soins' },
      { en: 'admin-load', fr: 'charge admin' },
    ],
    workplace: [
      { en: 'Hospital Work Context:', fr: 'Contexte de travail hospitalier :' },
      { en: 'Patient consultations and rounds: ~50%', fr: 'Consultations et tournées de patients : ~50%' },
      { en: 'Administrative tasks (charting, prescriptions): ~25%', fr: 'Tâches administratives (cartographie, prescriptions) : ~25%' },
      { en: 'Collaborative work (team meetings, case reviews): ~15%', fr: 'Travail collaboratif (réunions d\'équipe, revues de cas) : ~15%' },
      { en: 'Breaks and personal time: ~10%', fr: 'Pauses et temps personnel : ~10%' },
    ],
    goals: [
      { en: 'Deliver accurate diagnosis and effective treatment plans', fr: 'Fournir un diagnostic précis et des plans de traitement efficaces' },
      { en: 'Spend quality time with each patient without rushing', fr: 'Passez du temps de qualité avec chaque patient sans vous précipiter' },
      { en: 'Stay updated on medical advances and best practices', fr: 'Restez informé des avancées médicales et des meilleures pratiques' },
      { en: 'Maintain work-life balance despite unpredictable schedules', fr: 'Maintenir l’équilibre travail-vie personnelle malgré des horaires imprévisibles' },
      { en: 'Collaborate efficiently with nurses and care teams', fr: 'Collaborer efficacement avec les infirmières et les équipes soignantes' },
    ],
    motivations: [
      { en: 'Patient outcomes and quality of care', fr: 'Résultats pour les patients et qualité des soins' },
      { en: 'Efficient workflows that maximize patient interaction time', fr: 'Des flux de travail efficaces qui maximisent le temps d’interaction avec le patient' },
      { en: 'Clear communication with care teams and patients', fr: 'Communication claire avec les équipes soignantes et les patients' },
      { en: 'Access to real-time patient data and medical records', fr: 'Accès aux données des patients et aux dossiers médicaux en temps réel' },
      { en: 'Professional development and learning opportunities', fr: 'Possibilités de développement professionnel et d’apprentissage' },
      { en: 'Supportive hospital systems that reduce administrative burden', fr: 'Des systèmes hospitaliers favorables qui réduisent le fardeau administratif' },
    ],
    needs: [
      { en: 'Integrated digital platforms with complete patient records', fr: 'Plateformes numériques intégrées avec dossiers patients complets' },
      { en: 'Voice-assisted charting to reduce documentation time', fr: 'Cartographie à assistance vocale pour réduire le temps de documentation' },
      { en: 'Real-time notifications for test results and patient updates', fr: 'Notifications en temps réel pour les résultats des tests et les mises à jour des patients' },
      { en: 'Mobile apps for quick access to medical databases', fr: 'Applications mobiles pour un accès rapide aux bases de données médicales' },
      { en: 'Pre-ordered healthy meals or quiet dining spaces', fr: 'Repas sains précommandés ou espaces de restauration tranquilles' },
      { en: 'Wellness support including mental health resources', fr: 'Soutien au bien-être, y compris des ressources en santé mentale' },
    ],
    pains: [
      { en: 'Time pressure leading to rushed consultations', fr: 'La pression du temps conduit à des consultations précipitées' },
      { en: 'Heavy administrative load (paperwork, prescriptions, reporting)', fr: 'Lourde charge administrative (paperasse, ordonnances, reporting)' },
      { en: 'Fragmented information across multiple systems', fr: 'Informations fragmentées sur plusieurs systèmes' },
      { en: 'Delayed updates on patient status or test results', fr: 'Mises à jour retardées sur l\'état du patient ou les résultats des tests' },
      { en: 'Difficulty coordinating with nurses and specialists', fr: 'Difficulté à se coordonner avec les infirmières et les spécialistes' },
      { en: 'Burnout risk from long shifts and emotional demands', fr: 'Risque d\'épuisement professionnel dû à de longs quarts de travail et à des exigences émotionnelles' },
    ],
    journey: [
      {
        title: { en: 'Commute', fr: 'Navette' },
        content: { en: 'I want to arrive calmly and on time, without worrying about parking constraints or navigating a complex hospital campus. I need guided directions from home to my spot and a smooth digital entry so I can focus on my first patients rather than logistics.', fr: 'Je veux arriver sereinement et à l’heure, sans me soucier des contraintes de stationnement ni de la navigation dans un campus hospitalier complexe. J\'ai besoin d\'un itinéraire guidé depuis chez moi jusqu\'à chez moi et d\'une entrée numérique fluide pour pouvoir me concentrer sur mes premiers patients plutôt que sur la logistique.' },
      },
      {
        title: { en: 'Patient Consultations', fr: 'Consultations de patients' },
        content: { en: 'During my shift, I need efficient workflows that reduce friction: finding rooms, retrieving real‑time data, and triggering service tasks quickly. Reliable systems must help me focus on patient care rather than operational hurdles.', fr: 'Pendant mon travail, j\'ai besoin de flux de travail efficaces qui réduisent les frictions : trouver des salles, récupérer des données en temps réel et déclencher rapidement des tâches de service. Des systèmes fiables doivent m\'aider à me concentrer sur les soins aux patients plutôt que sur les obstacles opérationnels.' },
      },
      {
        title: { en: 'Team Meetings', fr: 'Réunions d\'équipe' },
        content: { en: 'When collaborating with colleagues, I want to find an available room quickly and start on time without technical friction. I need easy room booking, clear displays and fast service support so we can concentrate on patients, outcomes and care coordination.', fr: 'Lorsque je collabore avec des collègues, je souhaite trouver rapidement une salle disponible et commencer à l\'heure sans friction technique. J\'ai besoin d\'une réservation de chambre facile, d\'affichages clairs et d\'un service d\'assistance rapide afin que nous puissions nous concentrer sur les patients, les résultats et la coordination des soins.' },
      },
      {
        title: { en: 'Food & Beverage Area', fr: 'Espace restauration et boissons' },
        content: { en: 'Between consultations and rounds, I want to grab something to eat without waiting in long queues or compromising on nutrition. I need smart, automated food services that are fast, safe and varied, so I can refuel and get back to my patients on time.', fr: 'Entre les consultations et les tournées, je veux manger quelque chose sans faire la queue ni faire de compromis sur la nutrition. J\'ai besoin de services de restauration intelligents et automatisés, rapides, sûrs et variés, pour pouvoir faire le plein et revenir voir mes patients à temps.' },
      },
      {
        title: { en: 'Breaktime', fr: 'Pause' },
        content: { en: 'On busy days, I want my breaks to really help me reset—physically and mentally. I need easy access to healthy snacks, hydration, movement and mental health support so that even a few minutes away from the ward help me recover and sustain high‑quality care.', fr: 'Lors des journées chargées, je veux que mes pauses m\'aident vraiment à me réinitialiser, physiquement et mentalement. J’ai besoin d’un accès facile à des collations saines, à de l’hydratation, à des mouvements et à un soutien en matière de santé mentale afin que même quelques minutes loin du service m’aident à récupérer et à maintenir des soins de haute qualité.' },
      },
      {
        title: { en: 'Afternoon Rounds', fr: 'Tournées de l\'après-midi' },
        content: { en: 'During rounds, I want information, spaces and equipment to be ready when I arrive in each room. I need real‑time operational data, reliable food safety and quality tracking, and flexible room management so I can move efficiently from patient to patient without delays.', fr: 'Lors des tournées, je souhaite que les informations, les espaces et le matériel soient prêts à mon arrivée dans chaque salle. J\'ai besoin de données opérationnelles en temps réel, d\'un suivi fiable de la sécurité et de la qualité des aliments, ainsi que d\'une gestion flexible des chambres afin de pouvoir passer efficacement d\'un patient à l\'autre sans délai.' },
      },
      {
        title: { en: 'End of Shift', fr: 'Fin de quart de travail' },
        content: { en: 'At the end of my shift, I want a simple way to share feedback and know that my experience contributes to better care and operations. I need tools that capture my insights, track sustainability impacts and support my mental decompression as I transition out of clinical mode.', fr: 'À la fin de mon quart de travail, je veux un moyen simple de partager des commentaires et de savoir que mon expérience contribue à de meilleurs soins et opérations. J\'ai besoin d\'outils qui capturent mes connaissances, suivent les impacts sur la durabilité et soutiennent ma décompression mentale lorsque je quitte le mode clinique.' },
      },
    ],
  },
  {
    slug: 'nurse',
    name: 'Laura Wilson',
    archetype: { en: 'Registered Nurse', fr: 'Infirmière autorisée' },
    category: { en: 'Registered Nurse', fr: 'Infirmière autorisée' },
    oneLineEssence: { en: 'A Registered Nurse whose catalogue profile centres on: provide quality patient care without feeling rushed.', fr: 'Infirmière autorisée — profil catalogue centré sur : prodiguer des soins de qualité aux patients sans se sentir bousculé.' },
    quote: { en: 'I want to give my best to each patient, but I\'m constantly rushing between rooms and drowning in paperwork. I need tools that help me stay present, not systems that pull me away from what matters most: caring for people.', fr: 'Je veux donner le meilleur de moi-même à chaque patient, mais je me précipite constamment entre les chambres et je me noie sous la paperasse. J\'ai besoin d\'outils qui m\'aident à rester présent, et non de systèmes qui m\'éloignent de ce qui compte le plus : prendre soin des autres.' },
    accentColor: '#14b8a6',
    tags: [
      { en: 'bedside', fr: 'au lit' },
      { en: 'empathy', fr: 'empathie' },
      { en: 'coordination', fr: 'coordination' },
      { en: 'charting', fr: 'dossier' },
    ],
    workplace: [
      { en: 'Hospital Work Context:', fr: 'Contexte de travail hospitalier :' },
      { en: 'Patient care (bedside): ~60%', fr: 'Soins aux patients (au chevet) : ~60 %' },
      { en: 'Administrative tasks (charting, coordination): ~25%', fr: 'Tâches administratives (cartographie, coordination) : ~25%' },
      { en: 'Collaborative work (rounds, team meetings): ~10%', fr: 'Travail collaboratif (tournées, réunions d\'équipe) : ~10%' },
      { en: 'Breaks and personal time: ~5%', fr: 'Pauses et temps personnel : ~5%' },
    ],
    goals: [
      { en: 'Provide quality patient care without feeling rushed', fr: 'Prodiguer des soins de qualité aux patients sans se sentir bousculé' },
      { en: 'Stay present and empathetic with each patient', fr: 'Restez présent et empathique avec chaque patient' },
      { en: 'Maintain work-life balance despite demanding shifts', fr: 'Maintenir l’équilibre travail-vie personnelle malgré des quarts de travail exigeants' },
      { en: 'Work efficiently with streamlined tools and processes', fr: 'Travaillez efficacement avec des outils et des processus rationalisés' },
      { en: 'Feel supported by the team and hospital systems', fr: 'Sentez-vous soutenu par l’équipe et les systèmes hospitaliers' },
    ],
    motivations: [
      { en: 'Patient-centered care that makes a real difference', fr: 'Des soins centrés sur le patient qui font une réelle différence' },
      { en: 'Smooth coordination with doctors and teams', fr: 'Coordination fluide avec les médecins et les équipes' },
      { en: 'Time-saving digital tools to reduce admin. burden', fr: 'Des outils numériques permettant de gagner du temps pour réduire les tâches administratives. fardeau' },
      { en: 'Healthy meals available during short breaks', fr: 'Repas sains disponibles pendant les courtes pauses' },
      { en: 'Recognition and support from colleagues', fr: 'Reconnaissance et soutien des collègues' },
      { en: 'Access to mental health resources and wellness programs', fr: 'Accès à des ressources en santé mentale et à des programmes de bien-être' },
    ],
    needs: [
      { en: 'Digital dashboards with real-time patient alerts', fr: 'Tableaux de bord numériques avec alertes patients en temps réel' },
      { en: 'Voice-to-text tools to reduce charting time', fr: 'Outils de synthèse vocale pour réduire le temps de création de graphiques' },
      { en: 'Pre-order meal services or quick grab-and-go options', fr: 'Services de repas en précommande ou options rapides à emporter' },
      { en: 'Integrated chat tools for seamless team coordination', fr: 'Outils de chat intégrés pour une coordination transparente des équipes' },
      { en: 'Quiet relaxation spaces for mental health breaks', fr: 'Des espaces de détente tranquilles pour des pauses santé mentale' },
      { en: 'Peer support access or debrief helpline', fr: 'Accès au soutien par les pairs ou ligne d’assistance pour le débriefing' },
    ],
    pains: [
      { en: 'Constant rushing between patients with no time to connect', fr: 'Se précipiter constamment entre les patients sans avoir le temps de se connecter' },
      { en: 'Overwhelming charting and documentation tasks', fr: 'Tâches accablantes de création de graphiques et de documentation' },
      { en: 'Lack of real-time updates on patient status or schedule', fr: 'Manque de mises à jour en temps réel sur l\'état ou le calendrier des patients' },
      { en: 'Unpredictable breaks or skipping meals entirely', fr: 'Pauses imprévisibles ou sauter complètement des repas' },
      { en: 'Communication gaps between doctors and care teams', fr: 'Lacunes de communication entre les médecins et les équipes soignantes' },
      { en: 'Difficulty disconnecting after emotionally draining shifts', fr: 'Difficulté à se déconnecter après des quarts de travail épuisants sur le plan émotionnel' },
    ],
    journey: [
      {
        title: { en: 'Commute', fr: 'Navette' },
        content: { en: 'Before a long shift, I want to arrive without stress from traffic, parking or hospital navigation. I need clear wayfinding, easy access to parking and a quick digital check‑in so I can start focused on my patients, not on the commute.', fr: 'Avant un long service, je veux arriver sans stress dû au trafic, au stationnement ou à la navigation à l\'hôpital. J\'ai besoin d\'une orientation claire, d\'un accès facile au stationnement et d\'un enregistrement numérique rapide pour pouvoir me concentrer sur mes patients, et non sur les déplacements domicile-travail.' },
      },
      {
        title: { en: 'Welcome', fr: 'Accueillir' },
        content: { en: 'When I arrive on site, I want to understand instantly what’s happening on the ward today. I need clear digital reception, up‑to‑date information displays, training and work order tools so that I’m aligned on priorities from the very first minutes.', fr: 'Quand j’arrive sur place, je veux comprendre instantanément ce qui se passe aujourd’hui dans le service. J’ai besoin d’un accueil numérique clair, d’affichages d’informations à jour, d’outils de formation et de bons de travail pour être aligné sur les priorités dès les premières minutes.' },
      },
      {
        title: { en: 'Nursing Care', fr: 'Soins infirmiers' },
        content: { en: 'Throughout my shift, I move between patient rooms—administering medications, monitoring vitals, providing comfort, and coordinating with doctors. I need smart room booking, real‑time operational insights, quality and food safety tools, and easy service requests so we can provide safe, consistent care as a team.', fr: 'Tout au long de mon quart de travail, je me déplace entre les chambres des patients : administrant des médicaments, surveillant les signes vitaux, apportant du confort et me coordonnant avec les médecins. J\'ai besoin d\'une réservation intelligente de salles, d\'informations opérationnelles en temps réel, d\'outils de qualité et de sécurité alimentaire et de demandes de service simples afin que nous puissions fournir des soins sûrs et cohérents en équipe.' },
      },
      {
        title: { en: 'Food & Beverage Area', fr: 'Espace restauration et boissons' },
        content: { en: 'Breaks are short and unpredictable—I grab a quick meal when patient care allows. I need fast, nourishing options that give me energy to sustain focus and compassion through long, demanding shifts. A moment to recharge makes all the difference.', fr: 'Les pauses sont courtes et imprévisibles : je prends un repas rapide lorsque les soins du patient le permettent. J\'ai besoin d\'options rapides et nourrissantes qui me donnent l\'énergie nécessaire pour maintenir ma concentration et ma compassion pendant des quarts de travail longs et exigeants. Un moment pour se ressourcer fait toute la différence.' },
      },
      {
        title: { en: 'Breaktime', fr: 'Pause' },
        content: { en: 'On intense days, I want short breaks that really help me breathe and reset. I need quiet spaces, support for mental and physical health, healthy snacks and hydration options so that even a few minutes away from the ward make a positive difference.', fr: 'Lors des journées intenses, je veux de courtes pauses qui m\'aident vraiment à respirer et à me réinitialiser. J\'ai besoin d\'espaces calmes, de soutien pour ma santé mentale et physique, de collations saines et d\'options d\'hydratation pour que même quelques minutes loin du service fassent une différence positive.' },
      },
      {
        title: { en: 'Freetime & Work/Life Balance', fr: 'Temps libre et équilibre travail/vie personnelle' },
        content: { en: 'Outside of shifts, I want tools that support my overall wellbeing and help me feel valued. I need easy ways to access wellbeing services, stay active, share feedback and adopt sustainable habits so that my work and personal life feel more balanced.', fr: 'En dehors des quarts de travail, je veux des outils qui soutiennent mon bien-être général et m\'aident à me sentir valorisé. J\'ai besoin de moyens simples pour accéder aux services de bien-être, rester actif, partager des commentaires et adopter des habitudes durables afin que mon travail et ma vie personnelle soient plus équilibrés.' },
      },
    ],
  },
  {
    slug: 'patient',
    name: 'Sophie Martin',
    archetype: { en: 'Outpatient & Inpatient', fr: 'Patients ambulatoires et hospitaliers' },
    category: { en: 'Outpatient & Inpatient', fr: 'Patients ambulatoires et hospitaliers' },
    oneLineEssence: { en: 'A Outpatient & Inpatient whose catalogue profile centres on: navigate the hospital smoothly and without stress.', fr: 'Patients ambulatoires et hospitaliers — profil catalogue centré sur : naviguez à l’hôpital en douceur et sans stress.' },
    quote: { en: 'I just want to feel welcomed and guided, not stressed and lost. I need clear information at every step so I can focus on getting better, not on figuring out where to go or what’s happening next.', fr: 'Je veux juste me sentir accueilli et guidé, pas stressé et perdu. J’ai besoin d’informations claires à chaque étape afin de pouvoir me concentrer sur mon amélioration, et non sur le fait de savoir où aller ou ce qui se passera ensuite.' },
    accentColor: '#0f766e',
    tags: [
      { en: 'wayfinding', fr: 'orientation' },
      { en: 'anxiety', fr: 'anxiété' },
      { en: 'information', fr: 'information' },
      { en: 'comfort', fr: 'confort' },
    ],
    workplace: [
      { en: 'Hospital Stay Context:', fr: 'Contexte du séjour à l\'hôpital :' },
      { en: 'Outpatient consultations: ~40%', fr: 'Consultations ambulatoires : ~40%' },
      { en: 'Short-term hospitalization (1-3 days): ~30%', fr: 'Hospitalisation de courte durée (1-3 jours) : ~30 %' },
      { en: 'Long-term hospitalization (>3 days): ~20%', fr: 'Hospitalisation de longue durée (>3 jours) : ~20 %' },
      { en: 'Emergency visits: ~10%', fr: 'Visites d\'urgence : ~10 %' },
    ],
    goals: [
      { en: 'Navigate the hospital smoothly and without stress', fr: 'Naviguez à l’hôpital en douceur et sans stress' },
      { en: 'Understand clearly what’s happening at each stage', fr: 'Comprendre clairement ce qui se passe à chaque étape' },
      { en: 'Feel welcomed, reassured and guided throughout the journey', fr: 'Sentez-vous accueilli, rassuré et guidé tout au long du voyage' },
      { en: 'Minimize waiting time and confusion', fr: 'Minimisez le temps d’attente et la confusion' },
      { en: 'Stay informed and connected with care team and loved ones', fr: 'Restez informé et connecté avec l’équipe soignante et vos proches' },
    ],
    motivations: [
      { en: 'Access to clear information and real-time updates', fr: 'Accès à des informations claires et à des mises à jour en temps réel' },
      { en: 'Personalized care that respects individual needs and preferences', fr: 'Des soins personnalisés qui respectent les besoins et les préférences de chacun' },
      { en: 'Comfortable, calming environments to reduce anxiety', fr: 'Des environnements confortables et apaisants pour réduire l’anxiété' },
      { en: 'Digital tools that simplify communication and navigation', fr: 'Des outils numériques qui simplifient la communication et la navigation' },
      { en: 'Feeling valued as a person, not just a number', fr: 'Se sentir valorisé en tant que personne, pas seulement en tant que numéro' },
      { en: 'Seamless transitions between different stages of care', fr: 'Transitions fluides entre les différentes étapes de soins' },
    ],
    needs: [
      { en: 'Smart wayfinding systems with mobile app support', fr: 'Systèmes d\'orientation intelligents avec prise en charge d\'applications mobiles' },
      { en: 'Real-time appointment tracking and wait time estimates', fr: 'Suivi des rendez-vous en temps réel et estimations des temps d\'attente' },
      { en: 'Digital check-in with human assistance available', fr: 'Enregistrement numérique avec assistance humaine disponible' },
      { en: 'Comfortable waiting spaces with calming ambiance', fr: 'Des espaces d\'attente confortables avec une ambiance apaisante' },
      { en: 'Post-consultation summaries (digital or voice-recorded)', fr: 'Résumés post-consultation (numériques ou enregistrés vocaux)' },
      { en: 'Personalized meal options adapted to dietary needs', fr: 'Options de repas personnalisées adaptées aux besoins alimentaires' },
      { en: 'Patient portal for documents, test results, and follow-up support', fr: 'Portail patient pour les documents, les résultats des tests et l\'assistance de suivi' },
    ],
    pains: [
      { en: 'Confusing signage and complex navigation in large hospital buildings', fr: 'Signalisation déroutante et navigation complexe dans les grands bâtiments hospitaliers' },
      { en: 'Long waiting times without knowing what’s next or how long it will take', fr: 'De longs délais d’attente sans savoir quelle sera la suite ni combien de temps cela prendra' },
      { en: 'Feeling lost and like a number in the system', fr: 'Se sentir perdu et comme un numéro dans le système' },
      { en: 'Rushed consultations with lack of clear communication', fr: 'Consultations précipitées avec manque de communication claire' },
      { en: 'Poor quality hospital food that doesn’t respect dietary needs', fr: 'Nourriture hospitalière de mauvaise qualité qui ne respecte pas les besoins alimentaires' },
      { en: 'Forgetting important information after consultations', fr: 'Oublier des informations importantes après les consultations' },
    ],
    journey: [
      {
        title: { en: 'Commute', fr: 'Navette' },
        content: { en: 'On the way to the hospital, I want to know exactly where to go and where to park so I don’t arrive anxious or late. I need clear directions, accessible parking and digital reception that reassures me I’m in the right place.', fr: 'Sur le chemin de l’hôpital, je veux savoir exactement où aller et où me garer pour ne pas arriver anxieux ou en retard. J’ai besoin d’itinéraires clairs, d’un parking accessible et d’un accueil numérique qui me rassure : je suis au bon endroit.' },
      },
      {
        title: { en: 'Welcome and Admission', fr: 'Accueil et entrée' },
        content: { en: 'When I enter the hospital, I want to feel welcomed and informed rather than overwhelmed. I need intuitive digital admission, clear signage and displays, smooth access control and support services so that my first impression is one of safety and care.', fr: 'Lorsque j’entre à l’hôpital, je veux me sentir accueilli et informé plutôt que dépassé. J\'ai besoin d\'une admission numérique intuitive, d\'une signalisation et d\'affichages clairs, d\'un contrôle d\'accès fluide et de services d\'assistance pour que ma première impression soit celle de la sécurité et des soins.' },
      },
      {
        title: { en: 'Care and Daily Routine', fr: 'Soins et routine quotidienne' },
        content: { en: 'Throughout my stay, I want to understand what’s happening around me and feel that my environment is safe and well managed. I need connected equipment, clean and comfortable spaces, monitored air quality and food safety, along with smooth coordination between staff and services.', fr: 'Tout au long de mon séjour, je souhaite comprendre ce qui se passe autour de moi et sentir que mon environnement est sécuritaire et bien géré. J’ai besoin d’équipements connectés, d’espaces propres et confortables, d’une qualité de l’air et d’une sécurité alimentaire contrôlées, ainsi que d’une coordination fluide entre le personnel et les services.' },
      },
      {
        title: { en: 'Snack', fr: 'Collation' },
        content: { en: 'Between main meals, I want to access small snacks or drinks that fit my treatment and preferences. I need easy‑to‑use machines and options that feel healthy and safe, without having to walk far or wait in line.', fr: 'Entre les repas principaux, je souhaite accéder à de petites collations ou à des boissons adaptées à mon traitement et à mes préférences. J\'ai besoin de machines et d\'options faciles à utiliser, saines et sûres, sans avoir à marcher longtemps ou à faire la queue.' },
      },
      {
        title: { en: 'Lunch Break', fr: 'Pause déjeuner' },
        content: { en: 'At lunchtime, I want my meal to arrive on time, match my dietary constraints and be easy to consume in my room or a dedicated space. I need reliable food delivery, automated checks, feedback options and responsible waste handling so I feel respected as both a patient and a person.', fr: 'Le midi, je souhaite que mon repas arrive à l\'heure, corresponde à mes contraintes alimentaires et soit facile à consommer dans ma chambre ou dans un espace dédié. J\'ai besoin d\'une livraison de nourriture fiable, de contrôles automatisés, d\'options de retour d\'information et d\'une gestion responsable des déchets pour me sentir respecté à la fois en tant que patient et en tant que personne.' },
      },
      {
        title: { en: 'Leaving the Hospital', fr: 'Quitter l\'hôpital' },
        content: { en: 'When I leave the hospital, I want the process to be simple, with space to share my experience and understand the impact of my stay. I need easy feedback tools, clear digital guidance and visible sustainable practices so that my discharge feels structured, respectful and future‑oriented.', fr: 'Lorsque je quitte l’hôpital, je veux que le processus soit simple, avec un espace pour partager mon expérience et comprendre l’impact de mon séjour. J’ai besoin d’outils de feedback simples, de conseils numériques clairs et de pratiques durables visibles pour que ma décharge soit structurée, respectueuse et tournée vers l’avenir.' },
      },
      {
        title: { en: 'Rest & Personal Balance', fr: 'Repos et équilibre personnel' },
        content: { en: 'During quiet moments between care activities, I want to rest peacefully, clear my mind and regain a sense of balance. I need a comfortable, healthy environment with good air quality, hydration options, light movement opportunities and emotional support—so that every pause contributes to my healing, not just my waiting time.', fr: 'Lors des moments calmes entre les activités de soins, je souhaite me reposer paisiblement, me vider l\'esprit et retrouver un sentiment d\'équilibre. J\'ai besoin d\'un environnement confortable et sain avec une bonne qualité de l\'air, des options d\'hydratation, des possibilités de mouvements légers et un soutien émotionnel, afin que chaque pause contribue à ma guérison, et pas seulement à mon temps d\'attente.' },
      },
    ],
  },
  {
    slug: 'senior',
    name: 'Lia Thompson',
    archetype: { en: 'Long-term Resident', fr: 'Résident de longue durée' },
    category: { en: 'Long-term Resident', fr: 'Résident de longue durée' },
    oneLineEssence: { en: 'A Long-term Resident whose catalogue profile centres on: stay as independent and engaged as possible in daily life.', fr: 'Résident de longue durée — profil catalogue centré sur : restez aussi indépendant et engagé que possible dans la vie quotidienne.' },
    quote: { en: 'I still have my rhythm, my habits, my needs. I want activities that energize me and a place where I feel comfortable to welcome my family—like it’s truly my home.', fr: 'J\'ai toujours mon rythme, mes habitudes, mes besoins. Je veux des activités qui me dynamisent et un endroit où je me sens à l’aise pour accueillir ma famille, comme si c’était vraiment ma maison.' },
    accentColor: '#134e4a',
    tags: [
      { en: 'independence', fr: 'indépendance' },
      { en: 'routine', fr: 'rythme' },
      { en: 'nutrition', fr: 'nutrition' },
      { en: 'social', fr: 'social' },
    ],
    workplace: [
      { en: 'Residence Stay Context:', fr: 'Contexte du séjour en résidence :' },
      { en: 'Long-term residence (retirement home): ~70%', fr: 'Résidence longue durée (maison de retraite) : ~70%' },
      { en: 'Assisted living facility: ~20%', fr: 'Résidence services : ~20%' },
      { en: 'Memory care unit: ~10%', fr: 'Unité de soins de la mémoire : ~10 %' },
    ],
    goals: [
      { en: 'Stay as independent and engaged as possible in daily life', fr: 'Restez aussi indépendant et engagé que possible dans la vie quotidienne' },
      { en: 'Maintain nutrition, hydration, and well-being', fr: 'Maintenir la nutrition, l’hydratation et le bien-être' },
      { en: 'Enjoy dignified dining and meaningful social connection', fr: 'Profitez d\'un repas digne et d\'un lien social significatif' },
      { en: 'Feel heard when preferences or routines change', fr: 'Sentez-vous entendu lorsque les préférences ou les routines changent' },
      { en: 'Keep strong ties with family through welcoming visits', fr: 'Entretenir des liens forts avec la famille grâce à des visites de bienvenue' },
    ],
    motivations: [
      { en: 'Personalized care that respects routines and preferences', fr: 'Des soins personnalisés qui respectent les routines et les préférences' },
      { en: 'Social connection with family, friends, and other residents', fr: 'Lien social avec la famille, les amis et les autres résidents' },
      { en: 'Meaningful activities that bring joy and purpose', fr: 'Des activités significatives qui apportent de la joie et un but' },
      { en: 'Comfortable, home-like spaces to receive visitors', fr: 'Des espaces confortables et chaleureux pour recevoir les visiteurs' },
      { en: 'Flexible services as needs and energy levels change', fr: 'Des services flexibles en fonction de l\'évolution des besoins et des niveaux d\'énergie' },
      { en: 'Feeling heard and respected in daily decisions', fr: 'Se sentir entendu et respecté dans les décisions quotidiennes' },
    ],
    needs: [
      { en: 'Flexible meal options and clear dietary communication', fr: 'Options de repas flexibles et communication diététique claire' },
      { en: 'Comfortable visiting areas and simple visitor scheduling', fr: 'Zones de visite confortables et planification simple des visiteurs' },
      { en: 'Diverse activities (clubs, workshops, intergenerational events)', fr: 'Activités diverses (clubs, ateliers, événements intergénérationnels)' },
      { en: 'On-site wellness and concierge-style support', fr: 'Bien-être sur place et assistance de type concierge' },
      { en: 'Digital or printed calendars with reminders', fr: 'Calendriers numériques ou imprimés avec rappels' },
      { en: 'Warm, dignified spaces that feel like home', fr: 'Des espaces chaleureux et dignes qui donnent l\'impression d\'être chez soi' },
    ],
    pains: [
      { en: 'Feeling invisible or treated as “just another resident”', fr: 'Se sentir invisible ou traité comme « juste un autre résident »' },
      { en: 'Rigid meal times or menus that ignore preferences', fr: 'Horaires de repas rigides ou menus qui ignorent les préférences' },
      { en: 'Uninspiring activities or lack of variety', fr: 'Activités peu inspirantes ou manque de variété' },
      { en: 'Loss of independence or hesitation to ask for help', fr: 'Perte d’autonomie ou hésitation à demander de l’aide' },
      { en: 'Confusing communication about daily schedules', fr: 'Communication confuse sur les horaires quotidiens' },
      { en: 'Limited choice in food, room setup, or routines', fr: 'Choix limité en matière de nourriture, de configuration de la pièce ou de routines' },
    ],
    journey: [
      {
        title: { en: 'Welcome Residents', fr: 'Bienvenue aux résidents' },
        content: { en: 'When I arrive as a resident, I want to feel expected, guided and safe—not lost in a complex building. I need accessible digital reception, clear displays, simple wayfinding and assisted communication so I can find my room and understand what will happen next.', fr: 'Lorsque j\'arrive en tant que résident, je veux me sentir attendu, guidé et en sécurité, et non perdu dans un bâtiment complexe. J\'ai besoin d\'un accueil numérique accessible, d\'affichages clairs, d\'une orientation simple et d\'une communication assistée pour pouvoir trouver ma chambre et comprendre ce qui va se passer ensuite.' },
      },
      {
        title: { en: 'Breakfast', fr: 'Petit-déjeuner' },
        content: { en: 'In the morning, I want a breakfast that fits my tastes and dietary needs, without worrying about safety or long waits. I need varied, personalized options, hydration solutions and smart, assisted serving so eating remains a pleasant and reassuring moment.', fr: 'Le matin, je souhaite un petit-déjeuner adapté à mes goûts et à mes besoins alimentaires, sans me soucier de la sécurité ni des longues attentes. J\'ai besoin d\'options variées et personnalisées, de solutions d\'hydratation et de service intelligent et assisté pour que manger reste un moment agréable et rassurant.' },
      },
      {
        title: { en: 'Activities', fr: 'Activités' },
        content: { en: 'During the day, I want activities that keep me active, stimulated and socially connected. I have options—art therapy, gentle exercise or quiet reading. I need clear information on what’s happening, gentle support for physical and mental health, and programs that make me feel useful and included in a sustainable community.', fr: 'Pendant la journée, je veux des activités qui me maintiennent actif, stimulé et socialement connecté. J\'ai des options : l\'art-thérapie, des exercices doux ou une lecture tranquille. J’ai besoin d’informations claires sur ce qui se passe, d’un soutien doux pour la santé physique et mentale et de programmes qui me permettent de me sentir utile et inclus dans une communauté durable.' },
      },
      {
        title: { en: 'Lunch Break', fr: 'Pause déjeuner' },
        content: { en: 'At lunchtime, I want to enjoy my meal without rushing, confusion or fear of mistakes in my diet. I need safe food preparation, assistance where needed, flexible serving options and responsible waste handling so mealtimes stay a highlight of my day.', fr: 'A l’heure du déjeuner, je veux savourer mon repas sans précipitation, sans confusion et sans crainte d’erreurs dans mon alimentation. J\'ai besoin d\'une préparation alimentaire sûre, d\'une assistance si nécessaire, d\'options de service flexibles et d\'une gestion responsable des déchets afin que les repas restent un moment fort de ma journée.' },
      },
      {
        title: { en: 'Breaktime', fr: 'Pause' },
        content: { en: 'Between activities, I want calm spaces to rest, have a drink or a snack, and feel the air is fresh and healthy. I need simple access to hydration, light exercise, mental health support and sustainable amenities to feel cared for in every detail.', fr: 'Entre les activités, je veux des espaces calmes pour me reposer, prendre un verre ou une collation et sentir l\'air frais et sain. J\'ai besoin d\'un accès simple à l\'hydratation, à des exercices légers, à un soutien en matière de santé mentale et à des équipements durables pour me sentir pris en charge dans les moindres détails.' },
      },
      {
        title: { en: 'Dinner', fr: 'Dîner' },
        content: { en: 'Dinner is lighter and more relaxed. I unwind with fellow residents, reflecting on the day. I need this routine to feel comforting and familiar, a gentle transition toward evening that respects my independence and provides warmth as the day closes.', fr: 'Le dîner est plus léger et plus détendu. Je me détends avec les autres résidents en réfléchissant à la journée. J\'ai besoin que cette routine soit réconfortante et familière, une transition douce vers le soir qui respecte mon indépendance et me réchauffe à la fin de la journée.' },
      },
    ],
  }
];

/** Bilingual authoring sources. */
export const XP_HEAL_PERSONA_SOURCES: PersonaSource[] = SPECS.map((spec) =>
  buildXpPersona(AREA, spec),
);

export const XP_HEAL_PERSONAS = XP_HEAL_PERSONA_SOURCES.map((p) =>
  localizePersona(p, "en"),
);
export const XP_HEAL_SOURCES = XP_HEAL_SOURCE_SOURCES.map((s) =>
  localizeSource(s, "en"),
);
