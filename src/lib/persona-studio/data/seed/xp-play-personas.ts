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
 * XP Catalogue — PLAY area personas.
 * Content faithfully sourced from https://xpcatalogue.vercel.app/play/{slug}.
 * French strings are translations of the English catalogue copy.
 */

export const XP_PLAY_PROJECT_ID = "proj-xp-play";

const AREA: XpAreaConfig = {
  projectId: XP_PLAY_PROJECT_ID,
  family: "PLAY",
  segment: { en: "Sports & Events — Play", fr: "Sports & Événements — Play" },
  sourceId: "src-xp-play",
  sourceName: { en: "XP Catalogue — PLAY personas", fr: "Catalogue XP — Personas PLAY" },
  sourceExtract:
    "Sodexo XP Catalogue PLAY personas scraped from https://xpcatalogue.vercel.app/play/{slug}. Who am I sections (workplace, goals, motivations, needs, pain points) and journey moments.",
};

export const XP_PLAY_SOURCE_SOURCES: SourceDocumentSource[] = [buildXpSource(AREA)];

const SPECS: XpPersonaSpec[] = [
  {
    slug: 'client-play',
    name: 'Daniela Ruiz',
    archetype: { en: 'Venue Partnership Director', fr: 'Directeur des partenariats de site' },
    category: { en: 'Venue Partnership Director', fr: 'Directeur des partenariats de site' },
    oneLineEssence: { en: 'A Venue Partnership Director whose catalogue profile centres on: hit revenue and guest satisfaction targets.', fr: 'Directeur des partenariats de site — profil catalogue centré sur : atteindre les objectifs de revenus et de satisfaction des clients.' },
    quote: { en: 'I need hospitality and retail ops that scale on event day — peak crowds, peak pressure, and zero margin for error.', fr: 'J\'ai besoin d\'opérations d\'accueil et de vente au détail qui s\'adaptent au jour de l\'événement : une affluence maximale, une pression maximale et une marge d\'erreur nulle.' },
    accentColor: '#6d28d9',
    tags: [
      { en: 'venue', fr: 'lieu' },
      { en: 'event-day', fr: 'jour J' },
      { en: 'retail', fr: 'retail' },
      { en: 'scale', fr: 'échelle' },
    ],
    workplace: [
      { en: 'Stadium & arena portfolio', fr: 'Portefeuille de stades et d\'arènes' },
      { en: 'Event days: ~60%', fr: 'Jours d\'événement : ~60 %' },
      { en: 'Planning & partner mgmt: ~25%', fr: 'Planification et gestion des partenaires : ~25 %' },
      { en: 'Travel: ~15%', fr: 'Déplacements : ~15%' },
    ],
    goals: [
      { en: 'Hit revenue and guest satisfaction targets', fr: 'Atteindre les objectifs de revenus et de satisfaction des clients' },
      { en: 'Reduce operational risk', fr: 'Réduire le risque opérationnel' },
      { en: 'Standardize partner experiences across venues', fr: 'Standardisez les expériences des partenaires sur tous les sites' },
    ],
    motivations: [
      { en: 'Throughput during peak hours', fr: 'Débit aux heures de pointe' },
      { en: 'Brand-safe experiences', fr: 'Expériences sécurisées pour la marque' },
      { en: 'Data on guest behavior', fr: 'Données sur le comportement des clients' },
    ],
    needs: [
      { en: 'Integrated POS and digital ordering', fr: 'Point de vente intégré et commande numérique' },
      { en: 'Forecasting and staffing tools', fr: 'Outils de prévision et de dotation en personnel' },
      { en: 'Fast incident response', fr: 'Réponse rapide aux incidents' },
    ],
    pains: [
      { en: 'Queues and stock-outs', fr: 'Files d\'attente et ruptures de stock' },
      { en: 'Fragmented vendor landscape', fr: 'Paysage de fournisseurs fragmenté' },
      { en: 'Limited visibility into live KPIs', fr: 'Visibilité limitée sur les KPI en direct' },
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
    slug: 'operator-play',
    name: 'Leila Khalil',
    archetype: { en: 'Event Operations Manager', fr: 'Responsable des opérations événementielles' },
    category: { en: 'Event Operations Manager', fr: 'Responsable des opérations événementielles' },
    oneLineEssence: { en: 'A Event Operations Manager whose catalogue profile centres on: safe, fast service at peak.', fr: 'Responsable des opérations événementielles — profil catalogue centré sur : service sûr et rapide en période de pointe.' },
    quote: { en: 'Give me one command view of concessions, kitchens, and queues — and tools my crew can use with gloves on.', fr: 'Donnez-moi une vue d\'ensemble des concessions, des cuisines et des files d\'attente, ainsi que des outils que mon équipe peut utiliser avec des gants.' },
    accentColor: '#7c3aed',
    tags: [
      { en: 'concessions', fr: 'concessions' },
      { en: 'peak-service', fr: 'service de pointe' },
      { en: 'crew', fr: 'équipe' },
      { en: 'realtime', fr: 'temps réel' },
    ],
    workplace: [
      { en: 'Live events', fr: 'Événements en direct' },
      { en: 'On stand: ~50%', fr: 'Sur stand : ~50%' },
      { en: 'Prep & logistics: ~35%', fr: 'Préparation & logistique : ~35%' },
      { en: 'Reporting: ~15%', fr: 'Rapport : ~15 %' },
    ],
    goals: [
      { en: 'Safe, fast service at peak', fr: 'Service sûr et rapide en période de pointe' },
      { en: 'Zero critical incidents', fr: 'Zéro incident critique' },
      { en: 'Predictable margins', fr: 'Marges prévisibles' },
    ],
    motivations: [
      { en: 'Realtime ops visibility', fr: 'Visibilité des opérations en temps réel' },
      { en: 'Simple training', fr: 'Formation simple' },
      { en: 'Clear roles', fr: 'Des rôles clairs' },
    ],
    needs: [
      { en: 'Mobile-first ops', fr: 'Opérations axées sur le mobile' },
      { en: 'Queue management', fr: 'Gestion des files d\'attente' },
      { en: 'Connected inventory', fr: 'Inventaire connecté' },
    ],
    pains: [
      { en: 'Tool sprawl', fr: 'L’étalement des outils' },
      { en: 'Last-minute menu changes', fr: 'Changements de menu de dernière minute' },
      { en: 'Staff churn', fr: 'Taux de désabonnement du personnel' },
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
    slug: 'sport-fan',
    name: 'Lena Weber',
    archetype: { en: 'Season Ticket Holder', fr: 'Détenteur d\'un abonnement' },
    category: { en: 'Season Ticket Holder', fr: 'Détenteur d\'un abonnement' },
    oneLineEssence: { en: 'A Season Ticket Holder whose catalogue profile centres on: enjoy the event with friends.', fr: 'Détenteur d\'un abonnement — profil catalogue centré sur : profitez de l\'événement entre amis.' },
    quote: { en: 'I came for the match — I don’t want to miss half-time stuck in a queue for food or drinks.', fr: 'Je suis venu pour le match – je ne veux pas rater la mi-temps coincé dans une file d’attente pour manger ou boire.' },
    accentColor: '#5b21b6',
    tags: [
      { en: 'match-day', fr: 'jour de match' },
      { en: 'queues', fr: 'files' },
      { en: 'pre-order', fr: 'précommande' },
      { en: 'friends', fr: 'amis' },
    ],
    workplace: [
      { en: 'Match-going fan', fr: 'Fan de match' },
      { en: 'In stadium: ~70%', fr: 'Dans le stade : ~70%' },
      { en: 'Travel & pre: ~20%', fr: 'Voyage & pré : ~20%' },
      { en: 'Post: ~10%', fr: 'Poste : ~10 %' },
    ],
    goals: [
      { en: 'Enjoy the event with friends', fr: 'Profitez de l\'événement entre amis' },
      { en: 'Minimize waiting', fr: 'Minimisez l’attente' },
      { en: 'Get reliable food and drinks', fr: 'Obtenez de la nourriture et des boissons fiables' },
    ],
    motivations: [
      { en: 'Speed and clarity', fr: 'Rapidité et clarté' },
      { en: 'Fair prices', fr: 'Des prix équitables' },
      { en: 'Good atmosphere', fr: 'Bonne ambiance' },
    ],
    needs: [
      { en: 'Express pick-up', fr: 'Enlèvement express' },
      { en: 'Pre-order', fr: 'Précommande' },
      { en: 'Clear signage', fr: 'Signalisation claire' },
    ],
    pains: [
      { en: 'Long lines', fr: 'Longues files d\'attente' },
      { en: 'Stock-outs', fr: 'Ruptures de stock' },
      { en: 'Complicated apps', fr: 'Applications compliquées' },
    ],
    journey: [
      {
        title: { en: 'Commute', fr: 'Navette' },
        content: { en: 'Before the event, I want to arrive without stress caused by traffic, parking uncertainty or navigating a crowded venue. I need clear guidance, easy access to parking and seamless digital touchpoints so I can focus on enjoying the match from the moment I leave home.', fr: 'Avant l’événement, je veux arriver sans stress causé par la circulation, l’incertitude du stationnement ou la navigation dans un lieu bondé. J\'ai besoin de conseils clairs, d\'un accès facile au parking et de points de contact numériques fluides pour pouvoir me concentrer sur le match dès que je quitte la maison.' },
      },
      {
        title: { en: 'Welcome Area', fr: 'Espace d\'accueil' },
        content: { en: 'When I reach the stadium, I want to get in quickly, understand where I need to go, and immediately feel the excitement building. I need efficient digital reception, visible signage, sustainability cues and charging options so the entrance feels smooth, modern and fan‑friendly.', fr: 'Quand j’arrive au stade, j’ai envie d’entrer rapidement, de comprendre où je dois aller et de ressentir immédiatement l’excitation monter. J’ai besoin d’une réception numérique efficace, d’une signalisation visible, d’indicateurs de durabilité et d’options de recharge pour que l’entrée soit fluide, moderne et conviviale.' },
      },
      {
        title: { en: 'Waiting for the Game', fr: 'En attendant le jeu' },
        content: { en: 'While waiting for kick‑off, I want to explore, grab a drink, check stats and share the hype with friends—without queues or friction. I need convenient automated food & beverage options, fast service and digital experiences that keep me entertained until the action begins.', fr: 'En attendant le coup d’envoi, je veux explorer, prendre un verre, vérifier les statistiques et partager le battage médiatique avec mes amis, sans files d’attente ni frictions. J\'ai besoin d\'options automatisées pratiques de restauration et de boissons, d\'un service rapide et d\'expériences numériques qui me divertissent jusqu\'au début de l\'action.' },
      },
      {
        title: { en: 'Social Time / Match Time', fr: 'Temps social / Temps de match' },
        content: { en: 'During the match, I want to stay focused on the action without missing key moments for snacks or drinks. I need fast delivery options, frictionless checkout, and access to fan merchandise or refreshments through smart micro‑markets—everything enhancing the game, not interrupting it.', fr: 'Pendant le match, je veux rester concentré sur l’action sans rater les moments clés pour les collations ou les boissons. J’ai besoin d’options de livraison rapides, de paiements fluides et d’un accès aux produits dérivés ou aux rafraîchissements des fans via des micromarchés intelligents – tout cela améliore le jeu, sans l’interrompre.' },
      },
      {
        title: { en: 'Halftime Activities', fr: 'Activités à la mi-temps' },
        content: { en: 'At halftime, I want to refresh myself and explore entertainment options without rushing. I need fast-access vending, robotic support, circular economy touchpoints, and smart drink experiences so I can enjoy the break and return to my seat on time.', fr: 'À la mi-temps, j’ai envie de me rafraîchir et d’explorer les possibilités de divertissement sans me presser. J\'ai besoin de distributeurs automatiques à accès rapide, d\'un support robotique, de points de contact d\'économie circulaire et d\'expériences de boissons intelligentes pour pouvoir profiter de la pause et regagner ma place à l\'heure.' },
      },
      {
        title: { en: 'After Event', fr: 'Après l\'événement' },
        content: { en: 'When the match ends, I want to leave the stadium safely, efficiently and with a good final impression. I need simple feedback tools, visible sustainable waste handling and clear digital guidance that help manage crowds and support an environmentally responsible exit.', fr: 'Une fois le match terminé, je veux quitter le stade en toute sécurité, efficacement et avec une bonne impression finale. J’ai besoin d’outils de feedback simples, d’une gestion durable et visible des déchets et de conseils numériques clairs qui aident à gérer les foules et soutiennent une sortie respectueuse de l’environnement.' },
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
    slug: 'vip-guest',
    name: 'Zoe Cooper',
    archetype: { en: 'Executive & Premium Event Guest', fr: 'Invité exécutif et premium pour un événement' },
    category: { en: 'Executive & Premium Event Guest', fr: 'Invité exécutif et premium pour un événement' },
    oneLineEssence: { en: 'A Executive & Premium Event Guest whose catalogue profile centres on: experience exclusive, seamless service from arrival to departure.', fr: 'Invité exécutif et premium pour un événement — profil catalogue centré sur : bénéficiez d\'un service exclusif et fluide de l\'arrivée au départ.' },
    quote: { en: 'When I arrive at an exclusive event, I expect more than just checking in. I want to feel welcomed by name, feel recognised, and guided without needing to ask. It\'s the first impression of care and exclusivity that sets the tone for the entire experience.', fr: 'Lorsque j\'arrive à un événement exclusif, j\'attends plus qu\'un simple enregistrement. Je veux me sentir accueilli par mon nom, me sentir reconnu et guidé sans avoir besoin de le demander. C\'est la première impression de soin et d\'exclusivité qui donne le ton à toute l\'expérience.' },
    accentColor: '#8b5cf6',
    tags: [
      { en: 'premium', fr: 'premium' },
      { en: 'recognition', fr: 'reconnaissance' },
      { en: 'seamless', fr: 'sans friction' },
      { en: 'exclusive', fr: 'exclusif' },
    ],
    workplace: [
      { en: 'Event Attendance Context:', fr: 'Contexte de participation à un événement :' },
      { en: 'VIP invitations (galas, exclusive launches, premieres): ~50%', fr: 'Invitations VIP (galas, lancements exclusifs, avant-premières) : ~50%' },
      { en: 'High-profile conferences & summits: ~30%', fr: 'Conférences et sommets de haut niveau : ~30 %' },
      { en: 'Premium sports/entertainment events: ~15%', fr: 'Événements sportifs/divertissements premium : ~15 %' },
      { en: 'Private networking events: ~5%', fr: 'Événements de réseautage privés : ~5 %' },
    ],
    goals: [
      { en: 'Experience exclusive, seamless service from arrival to departure', fr: 'Bénéficiez d\'un service exclusif et fluide de l\'arrivée au départ' },
      { en: 'Feel recognised and valued as a premium guest', fr: 'Sentez-vous reconnu et valorisé en tant qu\'invité premium' },
      { en: 'Network meaningfully in refined, private settings', fr: 'Réseautez de manière significative dans des environnements raffinés et privés' },
      { en: 'Enjoy the event without logistical stress or friction', fr: 'Profitez de l’événement sans stress ni friction logistique' },
      { en: 'Leave having memorable moments worth sharing', fr: 'Partez en vivant des moments mémorables à partager' },
    ],
    motivations: [
      { en: 'Personalized, discreet service that anticipates needs', fr: 'Un service personnalisé et discret qui anticipe les besoins' },
      { en: 'Exclusive access to private areas, fast-track entry, premium seating', fr: 'Accès exclusif aux espaces privés, entrée accélérée, sièges premium' },
      { en: 'Effortless logistics with real-time updates and concierge support', fr: 'Logistique sans effort avec mises à jour en temps réel et assistance par concierge' },
      { en: 'Refined atmosphere with curated experiences and amenities', fr: 'Ambiance raffinée avec des expériences et des commodités organisées' },
      { en: 'Meaningful connections facilitated by digital networking tools', fr: 'Des connexions significatives facilitées par les outils de réseautage numérique' },
      { en: 'Post-event recap with professional photos and highlights', fr: 'Récapitulatif post-événement avec photos professionnelles et faits saillants' },
    ],
    needs: [
      { en: 'Pre-arrival concierge app with parking, entry gate, and itinerary details', fr: 'Application de conciergerie avant l\'arrivée avec parking, porte d\'entrée et détails de l\'itinéraire' },
      { en: 'License plate or digital recognition for seamless private entry', fr: 'Plaque d\'immatriculation ou reconnaissance numérique pour une entrée privée transparente' },
      { en: 'Personalized welcome with name recognition and escort service', fr: 'Accueil personnalisé avec reconnaissance de nom et service d\'accompagnement' },
      { en: 'Exclusive lounge access with ambient control and premium F&B', fr: 'Accès exclusif au salon avec contrôle d\'ambiance et restauration haut de gamme' },
      { en: 'Networking radar showing nearby VIP guests with shared interests', fr: 'Radar de réseautage montrant les invités VIP à proximité partageant des intérêts communs' },
      { en: 'Post-event VIP recap with photos, video highlights, and contact exchange', fr: 'Récapitulatif VIP post-événement avec photos, extraits vidéo et échange de contacts' },
    ],
    pains: [
      { en: 'Cold, generic welcome despite VIP status or invitation', fr: 'Accueil froid et générique malgré le statut VIP ou l\'invitation' },
      { en: 'Unclear entry processes or waiting in mixed queues', fr: 'Processus d\'entrée peu clairs ou attente dans des files d\'attente mixtes' },
      { en: 'Overcrowded VIP areas with limited privacy or comfort', fr: 'Zones VIP surpeuplées avec intimité ou confort limités' },
      { en: 'Lack of personalisation in service or communication', fr: 'Manque de personnalisation dans le service ou la communication' },
      { en: 'Difficult navigation in large venues without discrete guidance', fr: 'Navigation difficile dans les grandes salles sans guidage discret' },
      { en: 'No consolidated memory of connections made or moments shared', fr: 'Pas de mémoire consolidée des connexions établies ou des moments partagés' },
    ],
    journey: [
      {
        title: { en: 'Prep & Commute', fr: 'Préparation et déplacements' },
        content: { en: 'As a VIP guest, I want my arrival to feel effortless and elevated — from premium parking access to curated guidance that shortens the distance between me and the event. Optimized routing, concierge‑level support and clear digital cues help transform the commute into the first touchpoint of a seamless luxury experience.', fr: 'En tant qu\'invité VIP, je souhaite que mon arrivée soit sans effort et surélevée – d\'un accès au parking premium à des conseils organisés qui raccourcissent la distance entre moi et l\'événement. Un itinéraire optimisé, une assistance de niveau concierge et des signaux numériques clairs contribuent à transformer le trajet domicile-travail en le premier point de contact d\'une expérience de luxe fluide.' },
      },
      {
        title: { en: 'Arrival & Access', fr: 'Arrivée et accès' },
        content: { en: 'Upon reaching the stadium, I expect an exclusive arrival flow with prioritized access, effortless check‑in and immediate orientation. Digital reception, elegant signage and attentive services ensure that I transition from outside to inside without waiting, friction, or uncertainty — strengthening the feeling of being genuinely valued.', fr: 'En arrivant au stade, je m’attends à un flux d’arrivée exclusif avec un accès prioritaire, un enregistrement sans effort et une orientation immédiate. L\'accueil numérique, la signalétique élégante et les services attentifs garantissent que je passe de l\'extérieur à l\'intérieur sans attente, friction ou incertitude, renforçant ainsi le sentiment d\'être véritablement valorisé.' },
      },
      {
        title: { en: 'Private Lounge Entry', fr: 'Entrée au salon privé' },
        content: { en: 'When entering the private lounge, I want all cues — visuals, ambiance, personalized attention — to reinforce exclusivity and comfort. Hydration stations, curated food moments and intuitive displays help me settle in, explore amenities and enjoy a relaxing pre‑event atmosphere without ever feeling lost or unattended.', fr: 'En entrant dans le salon privé, je veux que tous les signaux – visuels, ambiance, attention personnalisée – renforcent l’exclusivité et le confort. Des stations d\'hydratation, des moments gastronomiques sélectionnés et des affichages intuitifs m\'aident à m\'installer, à explorer les commodités et à profiter d\'une atmosphère relaxante avant l\'événement sans jamais me sentir perdu ou sans surveillance.' },
      },
      {
        title: { en: 'Networking & Event Time', fr: 'Réseautage et temps d\'événement' },
        content: { en: 'During breaks, I want to meet, talk, enjoy curated refreshments and circulate freely without queuing or searching. Smart vending, catering services and instant digital touchpoints create a refined, fluid experience that supports both informal networking and high‑quality relaxation — all while maintaining the VIP standard.', fr: 'Pendant les pauses, j’ai envie de me rencontrer, de discuter, de profiter de rafraîchissements sélectionnés et de circuler librement sans faire la queue ni chercher. Les distributeurs automatiques intelligents, les services de restauration et les points de contact numériques instantanés créent une expérience raffinée et fluide qui favorise à la fois le réseautage informel et la détente de haute qualité, tout en maintenant le standard VIP.' },
      },
      {
        title: { en: 'Eat & Drink', fr: 'Manger et boire' },
        content: { en: 'Between plays or during quieter match moments, I want exceptional food options delivered fast and elegantly — whether personally selected or brought by autonomous services. Intelligent robotics, smart vending and refined alternatives make every meal feel elevated, frictionless and tailored to the VIP atmosphere.', fr: 'Entre les matchs ou pendant les moments de match plus calmes, je souhaite que des plats exceptionnels soient livrés rapidement et avec élégance, qu\'ils soient sélectionnés personnellement ou apportés par des services autonomes. La robotique intelligente, la distribution intelligente et les alternatives raffinées donnent à chaque repas une sensation élevée, sans friction et adaptée à l\'atmosphère VIP.' },
      },
      {
        title: { en: 'After Event', fr: 'Après l\'événement' },
        content: { en: 'As the night ends, I want help navigating exits, retrieving services and giving quick feedback while avoiding the crowds. Circular systems, concierge support and digital guidance ensure that even the last moments feel curated and calm — reinforcing the value of the VIP journey from start to finish.', fr: 'À la fin de la nuit, j\'ai besoin d\'aide pour naviguer vers les sorties, récupérer les services et donner des commentaires rapides tout en évitant les foules. Les systèmes circulaires, le service de conciergerie et les conseils numériques garantissent que même les derniers instants semblent soignés et calmes, renforçant ainsi la valeur du voyage VIP du début à la fin.' },
      },
    ],
  },
  {
    slug: 'participant',
    name: 'Arthur Foster',
    archetype: { en: 'Trade Show & Event Attendee', fr: 'Participant à des salons professionnels et à des événements' },
    category: { en: 'Trade Show & Event Attendee', fr: 'Participant à des salons professionnels et à des événements' },
    oneLineEssence: { en: 'A Trade Show & Event Attendee whose catalogue profile centres on: maximize value from the event (connections, content, experiences).', fr: 'Participant à des salons professionnels et à des événements — profil catalogue centré sur : maximiser la valeur de l\'événement (connexions, contenu, expériences).' },
    quote: { en: 'I want to feel the energy and excitement from the moment I arrive, not the stress of figuring out where to go. I need tools that help me navigate, connect, and make the most of my visit—without everything feeling scattered afterward.', fr: 'Je veux ressentir l’énergie et l’excitation dès mon arrivée, pas le stress de savoir où aller. J\'ai besoin d\'outils qui m\'aident à naviguer, à me connecter et à tirer le meilleur parti de ma visite, sans que tout ne semble dispersé par la suite.' },
    accentColor: '#4c1d95',
    tags: [
      { en: 'trade-show', fr: 'salon' },
      { en: 'networking', fr: 'réseau' },
      { en: 'wayfinding', fr: 'orientation' },
      { en: 'efficiency', fr: 'efficacité' },
    ],
    workplace: [
      { en: 'Event Attendance Context:', fr: 'Contexte de participation à un événement :' },
      { en: 'Professional events (trade shows, conferences): ~50%', fr: 'Événements professionnels (salons, conférences) : ~50%' },
      { en: 'Entertainment events (concerts, festivals): ~30%', fr: 'Événements de divertissement (concerts, festivals) : ~30%' },
      { en: 'Networking events: ~15%', fr: 'Événements de réseautage : ~15 %' },
      { en: 'Hybrid events: ~5%', fr: 'Événements hybrides : ~5 %' },
    ],
    goals: [
      { en: 'Maximize value from the event (connections, content, experiences)', fr: 'Maximiser la valeur de l\'événement (connexions, contenu, expériences)' },
      { en: 'Navigate efficiently without wasting time or missing key moments', fr: 'Naviguez efficacement sans perdre de temps ni manquer des moments clés' },
      { en: 'Feel immersed and energized by the atmosphere', fr: 'Sentez-vous immergé et dynamisé par l\'atmosphère' },
      { en: 'Network meaningfully and make lasting connections', fr: 'Réseautez de manière significative et établissez des liens durables' },
      { en: 'Leave with enriched insights and memorable engagements', fr: 'Repartez avec des informations enrichies et des engagements mémorables' },
    ],
    motivations: [
      { en: 'Seamless logistics from arrival to departure', fr: 'Une logistique fluide de l’arrivée au départ' },
      { en: 'Clear wayfinding and real-time event information', fr: 'Orientation claire et informations sur les événements en temps réel' },
      { en: 'Immersive welcome experience that sets the tone', fr: 'Une expérience d’accueil immersive qui donne le ton' },
      { en: 'Networking opportunities with digital tools to connect', fr: 'Opportunités de réseautage avec des outils numériques pour se connecter' },
      { en: 'Personalized agenda based on interests and goals', fr: 'Agenda personnalisé basé sur les intérêts et les objectifs' },
      { en: 'Post-event recap to relive and share the experience', fr: 'Récapitulatif post-événement pour revivre et partager l\'expérience' },
    ],
    needs: [
      { en: 'Smart routing app with multimodal journey planner', fr: 'Application de routage intelligente avec planificateur de trajet multimodal' },
      { en: 'Dynamic wayfinding with "you are here" and trending booth lists', fr: 'Orientation dynamique avec « vous êtes ici » et listes de stands tendances' },
      { en: 'Personalized agenda with notifications and session ratings', fr: 'Agenda personnalisé avec notifications et évaluations de session' },
      { en: 'Networking radar showing nearby connections or interests', fr: 'Radar de réseau affichant les connexions ou les intérêts à proximité' },
      { en: 'Pre-order food/drinks or express pickup options', fr: 'Précommandez de la nourriture/des boissons ou des options de retrait express' },
      { en: 'Post-event recap email with booths visited, sessions attended, and contacts made', fr: 'E-mail récapitulatif post-événement avec les stands visités, les sessions suivies et les contacts établis' },
    ],
    pains: [
      { en: 'Confusing entry flow and unclear signage at large venues', fr: 'Flux d\'entrée confus et signalisation peu claire dans les grandes salles' },
      { en: 'Orientation fatigue in huge spaces with flat, unclear maps', fr: 'Fatigue d\'orientation dans des espaces immenses avec des cartes plates et peu claires' },
      { en: 'FOMO (fear of missing out) on relevant sessions or booths', fr: 'FOMO (peur de rater quelque chose) sur les sessions ou stands pertinents' },
      { en: 'Long queues for food/drinks that disrupt the flow', fr: 'Longues files d\'attente pour la nourriture/les boissons qui perturbent le flux' },
      { en: 'No digital networking tools to connect in physical spaces', fr: 'Aucun outil de réseautage numérique pour se connecter dans les espaces physiques' },
      { en: 'Scattered information after the event (no consolidated recap)', fr: 'Informations éparses après l’événement (pas de récapitulation consolidée)' },
    ],
    journey: [
      {
        title: { en: 'Commute', fr: 'Navette' },
        content: { en: 'Before arriving at the venue, I want a commute that feels simple and enjoyable, with clear directions, real‑time updates and smooth parking or drop-off options. This helps me enter the mindset of discovery and excitement instead of worrying about logistics or delays.', fr: 'Avant d\'arriver sur place, je souhaite un trajet simple et agréable, avec des instructions claires, des mises à jour en temps réel et des options de stationnement ou de dépose fluides. Cela m\'aide à entrer dans un état d\'esprit de découverte et d\'enthousiasme au lieu de me soucier de la logistique ou des retards.' },
      },
      {
        title: { en: 'Arrival & Access', fr: 'Arrivée et accès' },
        content: { en: 'As soon as I reach the venue, I expect a fast, well-orchestrated welcome—clear signage, quick digital check-in, and accessible assistance when needed. This first touchpoint shapes my perception of the event, helping me feel expected, supported and ready to explore confidently.', fr: 'Dès mon arrivée sur les lieux, je m\'attends à un accueil rapide et bien orchestré : une signalisation claire, un enregistrement numérique rapide et une assistance accessible en cas de besoin. Ce premier point de contact façonne ma perception de l\'événement, m\'aidant à me sentir attendu, soutenu et prêt à explorer en toute confiance.' },
      },
      {
        title: { en: 'Navigating the Show', fr: 'Naviguer dans le spectacle' },
        content: { en: 'Once inside, I want to move effortlessly between spaces—finding my favorite sessions, discovering new attractions, and orienting myself without friction. Real-time wayfinding, occupancy insights and digital cues transform the venue into a landscape I can explore at my own pace, without missing key moments.', fr: 'Une fois à l\'intérieur, je veux me déplacer sans effort entre les espaces : trouver mes séances préférées, découvrir de nouvelles attractions et m\'orienter sans friction. L\'orientation en temps réel, les informations sur l\'occupation et les signaux numériques transforment le lieu en un paysage que je peux explorer à mon rythme, sans manquer de moments clés.' },
      },
      {
        title: { en: 'Attending a Talk or Demo', fr: 'Assister à une conférence ou à une démonstration' },
        content: { en: 'During a keynote or demo, I want high‑quality displays, smooth tech, and ways to react instantly—whether sharing feedback, accessing extra content, or bookmarking what interests me. This makes every talk more interactive, memorable and aligned with my personal journey through the event.', fr: 'Lors d\'un discours ou d\'une démonstration, je veux des écrans de haute qualité, une technologie fluide et des moyens de réagir instantanément, qu\'il s\'agisse de partager des commentaires, d\'accéder à du contenu supplémentaire ou de mettre en favoris ce qui m\'intéresse. Cela rend chaque conférence plus interactive, mémorable et alignée sur mon parcours personnel à travers l\'événement.' },
      },
      {
        title: { en: 'Networking & Breaktime', fr: 'Réseautage et pause' },
        content: { en: 'Between sessions, I want places to meet people, recharge mentally and grab something quick but healthy. Whether I need hydration, a light snack or a full break, smart vending, innovative F&B and mobile-friendly services keep me energized and open to spontaneous conversations that enrich the event.', fr: 'Entre les séances, je veux des endroits pour rencontrer des gens, me ressourcer mentalement et prendre quelque chose de rapide mais sain. Que j\'aie besoin de m\'hydrater, d\'une collation légère ou d\'une pause complète, des distributeurs automatiques intelligents, des services F&B innovants et des services adaptés aux appareils mobiles me maintiennent énergique et ouvert aux conversations spontanées qui enrichissent l\'événement.' },
      },
      {
        title: { en: 'After Event', fr: 'Après l\'événement' },
        content: { en: 'When everything wraps up, I need help leaving efficiently, along with ways to share impressions while they’re still fresh. Guidance, sustainability cues and post‑event digital touchpoints help transition smoothly from the immersive energy of the show back to everyday life—while keeping the positive emotions alive.', fr: 'Lorsque tout est terminé, j’ai besoin d’aide pour partir efficacement, ainsi que de moyens de partager mes impressions tant qu’elles sont encore fraîches. Des conseils, des indices de durabilité et des points de contact numériques post-événement facilitent la transition en douceur de l\'énergie immersive du spectacle à la vie quotidienne, tout en préservant les émotions positives.' },
      },
    ],
  },
  {
    slug: 'tourist',
    name: 'Thomas Anderson',
    archetype: { en: 'Business Traveller & VIP Guest', fr: 'Voyageur d\'affaires et invité VIP' },
    category: { en: 'Business Traveller & VIP Guest', fr: 'Voyageur d\'affaires et invité VIP' },
    oneLineEssence: { en: 'A Business Traveller & VIP Guest whose catalogue profile centres on: experience effortless, seamless logistics from start to finish.', fr: 'Voyageur d\'affaires et invité VIP — profil catalogue centré sur : faites l’expérience d’une logistique transparente et sans effort du début à la fin.' },
    quote: { en: 'I want everything to flow—car ready, real-time alerts, no last-minute surprises. My mind is already on the meeting after I land. I just want to be guided, discreetly and precisely, so I can focus on what comes next.', fr: 'Je veux que tout se passe bien : une voiture prête, des alertes en temps réel, pas de surprises de dernière minute. Mon esprit est déjà tourné vers la réunion après mon atterrissage. Je veux juste être guidé, discrètement et précisément, pour pouvoir me concentrer sur la suite.' },
    accentColor: '#a78bfa',
    tags: [
      { en: 'business-travel', fr: 'voyage d\'affaires' },
      { en: 'VIP', fr: 'VIP' },
      { en: 'flow', fr: 'fluidité' },
      { en: 'airport', fr: 'aéroport' },
    ],
    workplace: [
      { en: 'Travel Context:', fr: 'Contexte du voyage :' },
      { en: 'Business trips (frequent flyer): ~60%', fr: 'Déplacements professionnels (frequent flyer) : ~60%' },
      { en: 'Leisure travel (premium): ~30%', fr: 'Voyages de loisirs (premium) : ~30%' },
      { en: 'VIP lounge usage: ~80%', fr: 'Utilisation du salon VIP : ~80 %' },
      { en: 'Private transfer services: ~10%', fr: 'Services de transfert privé : ~10%' },
    ],
    goals: [
      { en: 'Experience effortless, seamless logistics from start to finish', fr: 'Faites l’expérience d’une logistique transparente et sans effort du début à la fin' },
      { en: 'Maintain productivity or relaxation during travel', fr: 'Maintenir la productivité ou la détente pendant le voyage' },
      { en: 'Feel valued and recognized as a premium guest', fr: 'Sentez-vous valorisé et reconnu en tant qu\'invité premium' },
      { en: 'Minimize stress and friction at every touchpoint', fr: 'Minimisez le stress et la friction à chaque point de contact' },
      { en: 'Transition smoothly between travel modes and environments', fr: 'Transition fluide entre les modes de déplacement et les environnements' },
    ],
    motivations: [
      { en: 'Personalised, discreet service that anticipates needs', fr: 'Un service personnalisé, discret et anticipant les besoins' },
      { en: 'Exclusive access to premium lounges and fast-track services', fr: 'Accès exclusif aux salons premium et aux services accélérés' },
      { en: 'Peace of mind with real-time updates and proactive support', fr: 'Tranquillité d\'esprit grâce à des mises à jour en temps réel et une assistance proactive' },
      { en: 'Efficient, frictionless processes (no queues, no hassle)', fr: 'Processus efficaces et fluides (pas de files d\'attente, pas de tracas)' },
      { en: 'Tailored experiences that respect preferences and status', fr: 'Des expériences sur mesure qui respectent les préférences et le statut' },
      { en: 'Seamless digital integration across all touchpoints', fr: 'Intégration numérique transparente sur tous les points de contact' },
    ],
    needs: [
      { en: 'VIP concierge app with real-time flight sync and traffic updates', fr: 'Application de conciergerie VIP avec synchronisation des vols en temps réel et mises à jour du trafic' },
      { en: 'License plate recognition for seamless private entry', fr: 'Reconnaissance de plaque d\'immatriculation pour une entrée privée transparente' },
      { en: 'Personalized greeting with digital ID check-in', fr: 'Accueil personnalisé avec enregistrement d\'identité numérique' },
      { en: 'Lounge app interface for ordering, ambiance control, and focus zones', fr: 'Interface de l\'application Lounge pour la commande, le contrôle de l\'ambiance et les zones de mise au point' },
      { en: 'Flight-linked calendar that auto-adjusts to delays or changes', fr: 'Calendrier lié aux vols qui s\'ajuste automatiquement aux retards ou aux changements' },
      { en: 'Mindful transition content (breathing exercises, ambient visuals, curated music)', fr: 'Contenu de transition consciente (exercices de respiration, visuels d\'ambiance, musique organisée)' },
    ],
    pains: [
      { en: 'Unpredictable delays or last-minute gate changes', fr: 'Retards imprévisibles ou changements de porte de dernière minute' },
      { en: 'Cold, procedural entry that feels like a checkpoint, not a welcome', fr: 'Entrée froide et procédurale qui ressemble à un point de contrôle, pas à un accueil' },
      { en: 'Overcrowded lounges during peak times with poor Wi-Fi', fr: 'Salons surpeuplés aux heures de pointe avec une connexion Wi-Fi médiocre' },
      { en: 'Lack of personalization despite frequent flyer status', fr: 'Manque de personnalisation malgré le statut de voyageur fréquent' },
      { en: 'Disjointed experience between booking, check-in, lounge, and boarding', fr: 'Expérience décousue entre la réservation, l\'enregistrement, le salon et l\'embarquement' },
      { en: 'Stressful security lines even with fast-track access', fr: 'Lignes de sécurité stressantes même avec un accès rapide' },
    ],
    journey: [
      {
        title: { en: 'Prep & Commute', fr: 'Préparation et déplacements' },
        content: { en: 'Before reaching the airport, I expect a seamless and dignified start to my trip. Clear navigation, premium parking options, and concierge‑assisted mobility help me avoid common travel stressors. Every touchpoint—from routing to digital guidance—should feel intentional, calming, and worthy of a VIP traveler.', fr: 'Avant d’arriver à l’aéroport, je m’attends à un début de voyage fluide et digne. Une navigation claire, des options de stationnement haut de gamme et une mobilité assistée par un concierge m\'aident à éviter les facteurs de stress courants en voyage. Chaque point de contact, de l\'itinéraire au guidage numérique, doit être intentionnel, apaisant et digne d\'un voyageur VIP.' },
      },
      {
        title: { en: 'Arrival & Access', fr: 'Arrivée et accès' },
        content: { en: 'Upon arrival, I want an exclusive welcome: swift security pathways, effortless digital check‑in, and clear directions to lounges or dedicated zones. High‑quality displays, sustainability cues and concierge presence create a refined, reassuring environment that makes the transition from outside to airside fluid and premium.', fr: 'À mon arrivée, je souhaite un accueil exclusif : des passages de sécurité rapides, un enregistrement numérique sans effort et des instructions claires vers les salons ou les zones dédiées. Des affichages de haute qualité, des indices de durabilité et la présence d’un concierge créent un environnement raffiné et rassurant qui rend la transition de l’extérieur vers le côté piste fluide et premium.' },
      },
      {
        title: { en: 'Eat & Drink', fr: 'Manger et boire' },
        content: { en: 'Before boarding, I want to enjoy elevated food options, whether curated beverages, healthy alternatives or quick signature dishes. Innovative vending, robots and intelligent tray scanning make high‑quality refreshments instantly accessible without sacrificing elegance or efficiency.', fr: 'Avant d\'embarquer, je souhaite profiter d\'options alimentaires élevées, qu\'il s\'agisse de boissons sélectionnées, d\'alternatives saines ou de plats signature rapides. Des distributeurs automatiques innovants, des robots et une numérisation intelligente des plateaux rendent des rafraîchissements de haute qualité instantanément accessibles sans sacrifier l\'élégance ou l\'efficacité.' },
      },
      {
        title: { en: 'Social time/Work', fr: 'Temps social/travail' },
        content: { en: 'While waiting, I want access to quiet work areas, premium air quality, responsive services, and effortless room booking when necessary. Digital systems providing real‑time insights, hydration options and service requests ensure that every minute feels comfortable, productive and tailored to my needs.', fr: 'En attendant, je souhaite accéder à des zones de travail calmes, à une qualité d\'air premium, à des services réactifs et à une réservation de chambre sans effort lorsque cela est nécessaire. Les systèmes numériques fournissant des informations en temps réel, des options d\'hydratation et des demandes de service garantissent que chaque minute soit confortable, productive et adaptée à mes besoins.' },
      },
      {
        title: { en: 'Fast Access to Gate', fr: 'Accès rapide à la porte' },
        content: { en: 'When it’s time to board, I want clear, real‑time guidance showing the fastest route, gate information updates and battery support along the way. A seamless passage to the aircraft maintains the sense of privilege and calm that defines the VIP experience.', fr: 'Lorsqu’il est temps d’embarquer, je veux un guidage clair et en temps réel indiquant l’itinéraire le plus rapide, des mises à jour des informations sur les portes et l’autonomie de la batterie tout au long du trajet. Un passage fluide vers l\'avion maintient le sentiment de privilège et de calme qui définit l\'expérience VIP.' },
      },
    ],
  }
];

/** Bilingual authoring sources. */
export const XP_PLAY_PERSONA_SOURCES: PersonaSource[] = SPECS.map((spec) =>
  buildXpPersona(AREA, spec),
);

export const XP_PLAY_PERSONAS = XP_PLAY_PERSONA_SOURCES.map((p) =>
  localizePersona(p, "en"),
);
export const XP_PLAY_SOURCES = XP_PLAY_SOURCE_SOURCES.map((s) =>
  localizeSource(s, "en"),
);
