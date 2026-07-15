import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import type { PersonaSection } from "@/lib/persona-studio/ai/schemas/section";
import { SEED_TIMESTAMP, section } from "../builders";
import {
  collectStatements,
  computeEvidenceCoverage,
} from "@/lib/persona-studio/utils/confidence";

/**
 * Corporate workplace archetypes (the Personix standard profiles).
 *
 * These are seeded as reusable standard profiles. Described behaviour, eating
 * moments and expectations come from the Personix framework document and are
 * tagged EVIDENCE against it. Local GOALS and FRUSTRATIONS are intentionally
 * left as TO_VALIDATE — they must be co-defined with client HR & operations
 * before the persona guides design. Confidence is LOW for exactly this reason,
 * which is a deliberate demonstration that confidence ≠ evidence coverage.
 */

export const CORPORATE_PROJECT_ID = "proj-corporate-workplace";
const ACCENT = "#1e3a8a";

const FRAMEWORK: SourceDocument = {
  id: "src-personix-framework",
  projectId: CORPORATE_PROJECT_ID,
  name: "Personix — Standard Persona Profiles",
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

export const CORPORATE_SOURCES: SourceDocument[] = [FRAMEWORK];
const S = [FRAMEWORK.id];

type Moment = { title: string; content: string };

type ArchetypeSpec = {
  id: string;
  name: string;
  archetype: string;
  category: string;
  ageRange: string;
  essence: string;
  quote: string;
  tags: string[];
  dailyJob: string[];
  lifestyle: string;
  eatingMoments: Moment[];
  foodExpectations: string[];
  workplaceExpectations: string[];
};

const ARCHETYPES: ArchetypeSpec[] = [
  {
    id: "persona-corp-leader",
    name: "The Leader",
    archetype: "The Leader",
    category: "Strategic Leader / Executive Decision-Maker",
    ageRange: "45–54",
    essence:
      "A decision-maker operating across teams and locations, intolerant of friction, who expects services to keep pace with an executive agenda.",
    quote:
      "My day is a constant stream of decisions. When something slows me down or makes me think twice, it's already failing.",
    tags: ["decision-maker", "friction-averse", "premium-seeking", "sustainability-minded"],
    dailyJob: [
      "Fragmented agenda, rapid topic shifts.",
      "Operates across teams, locations and priorities.",
      "Often meets with internal and external stakeholders.",
      "Low tolerance for operational issues or inefficiencies.",
      "Relies on assistants, teams and systems to execute seamlessly.",
    ],
    lifestyle:
      "For The Leader, success means results. Work comes first, but impact goes beyond the company, with daily choices guided by sustainability and a strong focus on physical and mental health.",
    eatingMoments: [
      { title: "Nomadic Discovery", content: "A mostly solo, on-the-go meal, often picked up on the high street as a way to discover something new, with high expectations for quality and sustainability." },
      { title: "My Healthy Meal", content: "A healthy, tailor-made meal designed to suit specific eating habits, made with fresh, natural and sustainable ingredients and meant to be savored in the workplace restaurant or outside." },
      { title: "Special Gathering", content: "A shared moment of celebration where co-workers come together in a meeting room or casual space, around freshly prepared catering." },
    ],
    foodExpectations: [
      "High-quality ingredients.",
      "Refined, chef-crafted food.",
      "Willing to pay a premium for quality.",
      "Quick, flexible eating formats.",
      "Discreet service, minimal wait.",
      "Health and diet-aligned options.",
    ],
    workplaceExpectations: [
      "Designed to match an executive pace.",
      "Interactions optimise time and attention.",
      "Confidentiality and discretion.",
      "Expects premium, frictionless services.",
    ],
  },
  {
    id: "persona-corp-conductor",
    name: "The Conductor",
    archetype: "The Conductor",
    category: "People Manager / Performance Enabler",
    ageRange: "45–54",
    essence:
      "A people manager balancing delivery and team needs, who values tools and spaces that keep the team flowing.",
    quote:
      "I'm constantly balancing delivery and people. When my team flows, everything else follows.",
    tags: ["coordinator", "people-focused", "recognition-seeking", "context-switcher"],
    dailyJob: [
      "Frequent meetings, check-ins, and one-to-ones.",
      "Prioritisation between delivery and people needs.",
      "Coordination across teams and stakeholders.",
      "Administrative tasks tied to daily management.",
      "Frequent context-switching.",
    ],
    lifestyle:
      "The Conductor thrives in dynamic, varied, people-focused environments. Deeply connected to the organisation, they prioritise work and seek recognition beyond it. They navigate daily pressure while finding moments outside of work to recharge and treat themselves.",
    eatingMoments: [
      { title: "Routine Morning Boost", content: "A quick, convenient, healthy, and inexpensive ritual solo meal usually consumed at a desk or workstation to efficiently get the energy boost needed to start the workday." },
      { title: "Spontaneous Social Break", content: "A short but relaxed group eating moment, sharing a generous but healthy meal or snack in a break room or casual space while connecting informally with colleagues." },
      { title: "Informal Lunch Together", content: "A ritual of togetherness where colleagues gather and relax over a freshly prepared lunch, chosen from the wide, good value offer of the workplace restaurant." },
    ],
    foodExpectations: [
      "Balanced, energising meals.",
      "Consistent quality and taste.",
      "Quick, convenient formats for meeting-heavy days.",
      "Easy-to-share formats for team moments.",
    ],
    workplaceExpectations: [
      "Tools that simplify planning, coordination, and decision-making.",
      "Visibility on team workload, priorities, and delivery progress.",
      "Spaces that allow formal and informal exchanges.",
      "Environment that supports team engagement.",
      "Recognition as both a leader and an enabler.",
    ],
  },
  {
    id: "persona-corp-enabler",
    name: "The Enabler",
    archetype: "The Enabler",
    category: "Support, Coordination & Enabler roles",
    ageRange: "35–44",
    essence:
      "The person others call when something breaks — high responsibility, low authority, dependent on reliable systems.",
    quote:
      "I'm the one people call when something breaks. I just need clear systems so I can fix it fast.",
    tags: ["fixer", "task-switcher", "social", "system-dependent"],
    dailyJob: [
      "High task-switching throughout the day.",
      "Coordination across multiple teams or stakeholders.",
      "Relies heavily on digital systems.",
      "Frequent interruptions and urgent requests.",
      "High responsibility, low authority.",
    ],
    lifestyle:
      "The Enabler likes keeping things running smoothly, thriving in fast-paced, highly social environments – at work and in life. While money matters more than work itself, the pressure of making things work can sometimes turn into stress.",
    eatingMoments: [
      { title: "Spontaneous Social Break", content: "A short but relaxed group eating moment, sharing a generous but healthy meal or snack in a break room or casual space while connecting informally with colleagues." },
      { title: "Special Gathering", content: "A shared moment of celebration where co-workers come together in a meeting room or casual space, around freshly prepared catering." },
      { title: "Refueling Budget Meal", content: "A satisfying, budget-friendly solo meal with generous portions to disconnect and recharge after intense work hours, mostly consumed in a quiet break room atmosphere." },
    ],
    foodExpectations: [
      "Quick, practical meal solutions.",
      "Flexible formats that fit irregular eating times.",
      "Affordable options.",
      "Simple, familiar choices.",
      "Filling and generous portions.",
    ],
    workplaceExpectations: [
      "Reliable systems and tools.",
      "Clear, centralised information.",
      "Responsive collaboration and functional support.",
      "Recognition for keeping operations running smoothly.",
    ],
  },
  {
    id: "persona-corp-expert",
    name: "The Expert",
    archetype: "The Expert",
    category: "Focus optimizer / Cognitive specialist",
    ageRange: "35–44",
    essence:
      "A deep-focus problem solver who needs quiet, reliable tools and autonomy to do work that matters.",
    quote:
      "When I have the space to focus and the right tools around me, I can solve problems that really matter.",
    tags: ["deep-focus", "autonomous", "precision", "low-interruption"],
    dailyJob: [
      "Brings expertise to solve complex problems.",
      "Long periods of concentration.",
      "Relies on data, digital tools and documentation.",
      "Works primarily independently, sometimes collaborates with others.",
    ],
    lifestyle:
      "Each day is centred on deep focus for The Expert, where work comes first and precision matters. With the same discipline, The Expert invests equally in maintaining physical and mental health.",
    eatingMoments: [
      { title: "Routine Morning Boost", content: "A quick, convenient, healthy, and inexpensive ritual solo meal usually consumed at a desk or workstation to efficiently get the energy boost needed to start the workday." },
      { title: "Indulgent Snack", content: "A quick and convenient, tasty solo snacking moment at a desk or workstation that serves as an afternoon break for comfort and reward to unwind and recharge." },
      { title: "Me-Time Lunch", content: "A solo lunch, mainly enjoyed in a break room, to relax and savor a quiet moment with good and generous food." },
    ],
    foodExpectations: [
      "Healthy and balanced meals for sustained focus.",
      "Quick, convenient, and easily accessible options.",
      "Customisable choices to fit needs.",
      "Flexibility to eat alone or with colleagues.",
    ],
    workplaceExpectations: [
      "Quiet, low-distraction, high-efficiency environment.",
      "Reliable and seamless digital tools.",
      "Smooth shifts between solo and team work.",
      "Autonomy and control over tasks.",
      "Minimal unnecessary interactions.",
    ],
  },
  {
    id: "persona-corp-junior",
    name: "The Junior",
    archetype: "The Junior",
    category: "New joiner / Transitional persona",
    ageRange: "18–34",
    essence:
      "A new joiner learning the rules, tools and culture, who wants clear guidance and a sense of belonging.",
    quote:
      "Every day I'm learning the rules, the tools, and the culture. I just want to know I'm on the right track.",
    tags: ["learner", "social", "trend-driven", "seeking-belonging"],
    dailyJob: [
      "High learning curve and information intake.",
      "Relies on others for guidance.",
      "Navigates unfamiliar systems.",
      "Learns through trial-and-error.",
      "Need to prove capabilities.",
    ],
    lifestyle:
      "Highly social, each day is about connection and discovery for The Junior – at work and beyond. Work matters, but income matters more than recognition. Curious and trend-driven, they seek new experiences while balancing indulgence with well-being.",
    eatingMoments: [
      { title: "Green Space", content: "An outdoor meal (in a park…) where food choices are guided by sustainability, local and seasonal cues, and specific dietary needs." },
      { title: "My Healthy Meal", content: "A healthy, tailor-made meal suited to specific eating habits, made with fresh, natural and sustainable ingredients, encouraging discovery while being savored in or outside the workplace." },
      { title: "Spontaneous Social Break", content: "A short but relaxed group eating moment, sharing a generous but healthy meal or snack in a break room or casual space while connecting informally with colleagues." },
    ],
    foodExpectations: [
      "Trendy options to discover new flavours.",
      "Flexible and customisable meals.",
      "Affordable, good value for money.",
      "Wide choice of filling options.",
    ],
    workplaceExpectations: [
      "Supports routine building.",
      "Clear guidance and onboarding.",
      "Easy access to responsive support.",
      "Sense of inclusion and belonging.",
      "Frequent constructive feedback.",
      "Simple, intuitive systems and spaces.",
    ],
  },
  {
    id: "persona-corp-day-operator",
    name: "The Day Operator",
    archetype: "The Day Operator",
    category: "Operational / Frontline day-shift worker",
    ageRange: "18–44",
    essence:
      "A frontline day-shift worker on a minute-planned rhythm who needs services ready exactly when the short break allows.",
    quote:
      "My day is planned down to the minute. If things aren't ready when I am, everything gets harder.",
    tags: ["routine-driven", "time-boxed", "value-seeking", "fairness-minded"],
    dailyJob: [
      "Fixed daytime working hours.",
      "Short, fixed breaks.",
      "Structured, process-driven work paced by operations or customer flow.",
      "Physically and/or procedurally demanding tasks.",
      "Regular interaction with supervisors and coworkers.",
    ],
    lifestyle:
      "Each day follows a steady rhythm for The Day Operator, where routine brings both comfort and fatigue. Focused on getting the job done, they value fair treatment and rewards. Sociable by nature, they enjoy shared moments, balancing tiredness with small indulgences to recharge.",
    eatingMoments: [
      { title: "Refueling Budget Meal", content: "A satisfying, budget-friendly solo meal with generous portions to disconnect and recharge after intense work hours, mostly consumed in a quiet break room atmosphere." },
      { title: "Routine Morning Boost", content: "A quick, convenient, healthy, and inexpensive ritual solo meal usually consumed at a desk or workstation to efficiently get the energy boost needed to start the workday." },
      { title: "Spontaneous Social Break", content: "A short but relaxed group eating moment, sharing a generous but healthy meal or snack in a break room or casual space while connecting informally with colleagues." },
    ],
    foodExpectations: [
      "Affordable, value-for-money meals.",
      "Filling, comforting portions.",
      "Fast service, minimal waiting.",
      "Familiar, consistent quality options.",
      "Balanced meals to support energy.",
    ],
    workplaceExpectations: [
      "Seamless access to essential services during breaks.",
      "Clear information and instructions.",
      "Predictable routines and schedules.",
      "Fair treatment across teams.",
    ],
  },
  {
    id: "persona-corp-night-operator",
    name: "The Night Operator",
    archetype: "The Night Operator",
    category: "Operational / Frontline night-shift worker",
    ageRange: "18–54",
    essence:
      "A night-shift worker keeping things moving with limited support, who most of all needs to feel supported and safe.",
    quote:
      "While the rest of the world sleeps, we keep things moving. The least I need is to feel supported.",
    tags: ["night-shift", "self-reliant", "fatigue-aware", "recognition-seeking"],
    dailyJob: [
      "Fixed night or rotating shifts.",
      "Works independently with limited support.",
      "Relies on standard procedures.",
      "Repetitive tasks requiring sustained attention.",
      "Exposure to fatigue and alertness challenges.",
    ],
    lifestyle:
      "Each night follows a steady, repetitive rhythm for The Night Operator. Focused yet often tired, routine can bring moments of boredom. Life outside stays quieter and low-key, centred on self-care – recharging through small indulgences and a conscious focus on physical and mental wellbeing.",
    eatingMoments: [
      { title: "Refueling Budget Meal", content: "A satisfying, budget-friendly solo meal with generous portions to disconnect and recharge after intense work hours, mostly consumed in a quiet break room atmosphere." },
      { title: "Energizing Snack", content: "A quick, solo snack at a desk or workstation that provides comfort and reward while giving a boost to stay sharp and focused." },
    ],
    foodExpectations: [
      "Warm, comforting, familiar meals.",
      "Quick, convenient options.",
      "Affordable choices.",
      "Balanced meals to sustain energy without heaviness.",
      "Routine-friendly eating.",
    ],
    workplaceExpectations: [
      "Availability aligned with the night schedule.",
      "Clear, stable routines.",
      "Access to support and essential services outside normal hours.",
      "Safe, calm and comfortable work environment.",
      "Recognition despite off-hours work.",
      "Smooth coordination with peers.",
    ],
  },
  {
    id: "persona-corp-specialist",
    name: "The Specialist",
    archetype: "The Specialist",
    category: "Grey-collar knowledge worker",
    ageRange: "18–34",
    essence:
      "A technical specialist whose focused, compliance-bound work should be respected — not interrupted — by surrounding services.",
    quote:
      "My work requires focus and precision. The services around me should respect that, not get in the way.",
    tags: ["technical", "compliance-bound", "focus-protective", "expertise-proud"],
    dailyJob: [
      "Long stretches of concentrated, technical work with limited break time.",
      "Strict procedures, safety rules, or compliance constraints.",
      "Alternates between hands-on tasks, documentation, and analysis.",
      "Works independently or in small expert teams.",
      "Tasks critical to operational continuity.",
    ],
    lifestyle:
      "Each day brings new challenges for The Specialist, keeping them focused and engaged. Proud of their expertise and strongly connected to their organisation, work is a clear priority and valued beyond the workplace. With the same focus, they maintain both physical and mental wellbeing.",
    eatingMoments: [
      { title: "My Healthy Meal", content: "A healthy, tailor-made meal designed to suit specific eating habits, made with fresh, natural and sustainable ingredients and meant to be savored in the workplace restaurant or outside." },
      { title: "Routine Morning Boost", content: "A quick, convenient, healthy, and inexpensive ritual solo meal usually consumed at a desk or workstation to efficiently get the energy boost needed to start the workday." },
      { title: "Spontaneous Social Break", content: "A short but relaxed group eating moment, sharing a generous but healthy meal or snack in a break room or casual space while connecting informally with colleagues." },
    ],
    foodExpectations: [
      "Healthy, nutritious meals that sustain energy and focus.",
      "Quick, convenient or portable formats.",
      "Simple options with minimal waiting.",
      "Clear ingredients and nutritional information with the ability to customise.",
      "Availability beyond standard lunch hours.",
    ],
    workplaceExpectations: [
      "Minimal disruption during focused work.",
      "Reliable, adapted tools and systems.",
      "Services fitting constrained schedules.",
      "Simple, predictable services that reduce mental load.",
      "Recognition as a skilled contributor, not \u201cjust support\u201d.",
    ],
  },
];

function buildCorporatePersona(spec: ArchetypeSpec): Persona {
  const commonSections: PersonaSection[] = [
    section(spec.id, {
      key: "essence",
      title: "Essence",
      type: "text",
      order: 0,
      items: [{ content: spec.essence, sourceIds: S, confidence: "MEDIUM" }],
    }),
    section(spec.id, {
      key: "lifestyle",
      title: "Lifestyle",
      type: "text",
      order: 1,
      items: [{ content: spec.lifestyle, sourceIds: S, confidence: "MEDIUM" }],
    }),
    section(spec.id, {
      key: "goals",
      title: "Goals (local & client personalisation)",
      type: "bullets",
      order: 2,
      items: [
        {
          content:
            "Local goals must be co-defined with client HR & operations during Discovery.",
          status: "TO_VALIDATE",
          confidence: "LOW",
        },
      ],
    }),
    section(spec.id, {
      key: "frustrations",
      title: "Frustrations (local & client personalisation)",
      type: "bullets",
      order: 7,
      items: [
        {
          content:
            "Local frustrations must be captured from real site data before use.",
          status: "TO_VALIDATE",
          confidence: "LOW",
        },
      ],
    }),
  ];

  const domainSections: PersonaSection[] = [
    section(spec.id, {
      key: "daily_job",
      title: "Daily job characteristics",
      type: "bullets",
      order: 21,
      items: spec.dailyJob.map((content) => ({ content, sourceIds: S })),
    }),
    section(spec.id, {
      key: "workplace_expectations",
      title: "Workplace expectations",
      type: "bullets",
      order: 22,
      items: spec.workplaceExpectations.map((content) => ({ content, sourceIds: S })),
    }),
    section(spec.id, {
      key: "food_expectations",
      title: "Food expectations",
      type: "bullets",
      order: 23,
      items: spec.foodExpectations.map((content) => ({ content, sourceIds: S })),
    }),
    section(spec.id, {
      key: "key_eating_moments",
      title: "Key eating moments",
      type: "moments",
      order: 24,
      items: spec.eatingMoments.map((m) => ({
        label: m.title,
        content: m.content,
        sourceIds: S,
      })),
    }),
  ];

  const statements = collectStatements([...commonSections, ...domainSections]);

  return {
    id: spec.id,
    projectId: CORPORATE_PROJECT_ID,
    name: spec.name,
    archetype: spec.archetype,
    category: spec.category,
    family: "CORPORATE",
    segment: "Corporate Services",
    oneLineEssence: spec.essence,
    portraitUrl: undefined,
    accentColor: ACCENT,
    quote: spec.quote,
    quoteType: "COMPOSITE",
    confidenceLevel: "LOW",
    confidenceExplanation:
      "Standard Personix archetype. Behaviour and eating moments are evidenced by the framework, but local goals and frustrations are unvalidated, so this profile is a hypothesis until confirmed with client HR & operations.",
    evidenceCoverage: computeEvidenceCoverage(statements),
    demographicContext: {
      ageRange: spec.ageRange,
      relevanceNote:
        "Age band is a Personix descriptor, not the differentiator — the persona is defined by work rhythm and behaviour.",
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

export const CORPORATE_PERSONAS: Persona[] = ARCHETYPES.map(
  buildCorporatePersona,
);
