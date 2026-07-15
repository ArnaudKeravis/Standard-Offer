import type { Persona } from "@/lib/persona-studio/ai/schemas/persona";
import type { SourceDocument } from "@/lib/persona-studio/ai/schemas/evidence";
import { SEED_TIMESTAMP, section } from "../builders";
import {
  collectStatements,
  computeEvidenceCoverage,
} from "@/lib/persona-studio/utils/confidence";

/**
 * Tour de France hospitality personas.
 *
 * The supplied persona brief is treated as the initial source of truth, so
 * described traits are tagged EVIDENCE against that document. Genuine unknowns
 * (party size, dietary needs, ROI definition…) are tagged TO_VALIDATE so the
 * evidence-coverage figure stays honest and Discovery has clear targets. No
 * facts beyond the supplied data are invented.
 */

export const TDF_PROJECT_ID = "proj-tdf-hospitality";

const BRIEF: SourceDocument = {
  id: "src-tdf-brief",
  projectId: TDF_PROJECT_ID,
  name: "Tour de France Hospitality — Persona Profiles (May 2026)",
  type: "pdf",
  date: SEED_TIMESTAMP,
  author: "CoDesign Services",
  category: "EXISTING_PERSONA",
  extractedText:
    "Structured persona profiles for four Tour de France hospitality guest archetypes: International VIP business client, Family guest, Sports enthusiast guest and Sponsor / Tour partner.",
  processingStatus: "READY",
  confidentiality: "CLIENT_CONFIDENTIAL",
  createdAt: SEED_TIMESTAMP,
};

export const TDF_SOURCES: SourceDocument[] = [BRIEF];
const S = [BRIEF.id];

/** Finalise a persona: compute evidence coverage from its statements. */
function finalise(
  persona: Omit<Persona, "evidenceCoverage">,
): Persona {
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
  archetype: "The International VIP",
  category: "International VIP business client",
  family: "SPORTS_HOSPITALITY",
  segment: "Sports & Leisure",
  oneLineEssence:
    "A time-poor global executive who uses the Tour as a premium, authentic stage to host strategic clients.",
  portraitUrl: "/persona-studio/tdf/david-richardson.png",
  accentColor: "#ffb81c",
  quote:
    "The Tour de France is one of the rare events capable of bringing together clients, partners and executives in a prestigious and authentic setting.",
  quoteType: "COMPOSITE",
  confidenceLevel: "MEDIUM",
  confidenceExplanation:
    "Built from a structured hospitality persona brief, not primary interviews. Traits are consistent and sourced, but individual guest behaviours and preferences remain unvalidated.",
  demographicContext: {
    ageRange: "54",
    location: "London, United Kingdom",
    relevanceNote:
      "CEO-level authority shapes expectations of frictionless, discreet premium service — recorded because it drives behaviour, not as a stereotype.",
  },
  behaviouralTags: ["host", "time-poor", "prestige-seeking", "relationship-builder"],
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
            "CEO of an international technology group who attends 2–4 stages a year, 1–2 days each and sometimes consecutive stages, as the guest of a major Tour partner.",
          sourceIds: S,
          confidence: "HIGH",
        },
      ],
    }),
    section("persona-david-richardson", {
      key: "context",
      title: "Context",
      type: "bullets",
      order: 1,
      items: [
        { content: "CEO of an international technology group.", sourceIds: S, confidence: "HIGH" },
        { content: "Based in London, United Kingdom.", sourceIds: S, confidence: "HIGH" },
        { content: "Attends 2–4 stages per year, 1–2 days per stage, sometimes consecutive.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-david-richardson", {
      key: "motivations",
      title: "Motivations",
      type: "bullets",
      order: 6,
      items: [
        { content: "International prestige.", sourceIds: S },
        { content: "Business development.", sourceIds: S },
        { content: "Exclusive experience.", sourceIds: S },
        { content: "Shared emotions with guests.", sourceIds: S },
        { content: "Discovery of French territories.", sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "frustrations",
      title: "Frustrations",
      type: "bullets",
      order: 7,
      items: [
        { content: "Lack of personalisation.", sourceIds: S, confidence: "HIGH" },
        { content: "Complex logistics or transport.", sourceIds: S, confidence: "HIGH" },
        { content: "Waiting times.", sourceIds: S, confidence: "HIGH" },
        { content: "Programme insufficiently adapted across stages.", sourceIds: S },
        { content: "Difficulty understanding the value of premium options.", sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "questions_to_validate",
      title: "Questions to validate",
      type: "bullets",
      order: 12,
      items: [
        { content: "Typical guest party size and seniority per stage.", status: "TO_VALIDATE", confidence: "LOW" },
        { content: "Specific dietary and wine preferences.", status: "TO_VALIDATE", confidence: "LOW" },
        { content: "How he defines a successful invitation (ROI).", status: "TO_VALIDATE", confidence: "LOW" },
      ],
    }),
  ],
  domainSections: [
    section("persona-david-richardson", {
      key: "reasons_for_attending",
      title: "Reasons for attending",
      type: "bullets",
      order: 20,
      items: [
        { content: "Invited by a major Tour partner.", sourceIds: S, confidence: "HIGH" },
        { content: "Receives strategic clients.", sourceIds: S },
        { content: "Develops international network.", sourceIds: S },
        { content: "Strengthens existing partnerships.", sourceIds: S },
        { content: "Experiences a premium representation of French know-how.", sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "key_expectations",
      title: "Key expectations",
      type: "needs",
      order: 21,
      items: [
        { content: "Privileged access and VIP spaces.", sourceIds: S, confidence: "HIGH" },
        { content: "Frictionless experience.", sourceIds: S, confidence: "HIGH" },
        { content: "Premium hospitality.", sourceIds: S, confidence: "HIGH" },
        { content: "High-level networking.", sourceIds: S },
        { content: "Multilingual service.", sourceIds: S },
        { content: "Simplified logistics.", sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "food_hospitality",
      title: "Food & hospitality expectations",
      type: "bullets",
      order: 22,
      items: [
        { content: "Traditional menus that are explained.", sourceIds: S },
        { content: "Selection of regional wines.", sourceIds: S },
        { content: "Exclusive culinary experiences.", sourceIds: S },
        { content: "Fast and discreet service.", sourceIds: S },
        { content: "Gastronomic signature linked to the territory.", sourceIds: S },
      ],
    }),
    section("persona-david-richardson", {
      key: "ideal_experience",
      title: "Ideal experience",
      type: "text",
      order: 24,
      items: [
        {
          content:
            "Introduce clients to French excellence while sharing the emotion of the Tour in a privileged environment.",
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
  archetype: "The Family Guest",
  category: "Family guest",
  family: "SPORTS_HOSPITALITY",
  segment: "Sports & Leisure",
  oneLineEssence:
    "A senior manager turning a rare partner invitation into an exceptional, easy day out with her partner and children.",
  portraitUrl: "/persona-studio/tdf/sophie-lambert.png",
  accentColor: "#ec4899",
  quote:
    "We are experiencing an exceptional family moment, far beyond a simple sporting competition.",
  quoteType: "COMPOSITE",
  confidenceLevel: "MEDIUM",
  confidenceExplanation:
    "Built from the hospitality persona brief. Family-context traits are sourced but the specific needs of accompanying children are assumptions to validate.",
  demographicContext: {
    ageRange: "42",
    location: "Lyon, France",
    relevanceNote:
      "Attends with partner and children — the family group, not the age, is what shapes her needs (comfort, child activities, sightlines).",
  },
  behaviouralTags: ["family-first", "memory-maker", "comfort-seeking", "occasional"],
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
            "Senior manager attending with her partner and children for a full day, roughly once every 2–3 years, as the guest of a Tour partner.",
          sourceIds: S,
          confidence: "HIGH",
        },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "context",
      title: "Context",
      type: "bullets",
      order: 1,
      items: [
        { content: "Senior manager attending with partner and children.", sourceIds: S, confidence: "HIGH" },
        { content: "Based in Lyon, France.", sourceIds: S, confidence: "HIGH" },
        { content: "Attends one stage every 2–3 years, for a full day.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "motivations",
      title: "Motivations",
      type: "bullets",
      order: 6,
      items: [
        { content: "Quality family time.", sourceIds: S, confidence: "HIGH" },
        { content: "Tour atmosphere.", sourceIds: S },
        { content: "Memorable moments.", sourceIds: S },
        { content: "Exceptional event.", sourceIds: S },
        { content: "Discovery of French regions.", sourceIds: S },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "frustrations",
      title: "Frustrations",
      type: "bullets",
      order: 7,
      items: [
        { content: "Excessive waiting.", sourceIds: S, confidence: "HIGH" },
        { content: "Complex journey.", sourceIds: S },
        { content: "Lack of child activities.", sourceIds: S, confidence: "HIGH" },
        { content: "Catering poorly adapted to families.", sourceIds: S },
        { content: "Difficulty seeing the riders.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "questions_to_validate",
      title: "Questions to validate",
      type: "bullets",
      order: 12,
      items: [
        { content: "Ages of the children and which activities actually engage them.", status: "TO_VALIDATE", confidence: "LOW" },
        { content: "Tolerance for queues and heat with young children.", status: "TO_VALIDATE", confidence: "LOW" },
      ],
    }),
  ],
  domainSections: [
    section("persona-sophie-lambert", {
      key: "reasons_for_attending",
      title: "Reasons for attending",
      type: "bullets",
      order: 20,
      items: [
        { content: "Invited by a Tour partner.", sourceIds: S, confidence: "HIGH" },
        { content: "Seeks a memorable shared experience.", sourceIds: S },
        { content: "Accessible event for the whole family.", sourceIds: S },
        { content: "Unique memories.", sourceIds: S },
        { content: "Immersion in the Tour atmosphere.", sourceIds: S },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "key_expectations",
      title: "Key expectations",
      type: "needs",
      order: 21,
      items: [
        { content: "Simplicity and comfort.", sourceIds: S, confidence: "HIGH" },
        { content: "Child-friendly activities.", sourceIds: S, confidence: "HIGH" },
        { content: "Immersive experience.", sourceIds: S },
        { content: "Interactive entertainment.", sourceIds: S },
        { content: "Souvenirs to take home.", sourceIds: S },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "food_hospitality",
      title: "Food & hospitality expectations",
      type: "bullets",
      order: 22,
      items: [
        { content: "Varied buffet.", sourceIds: S },
        { content: "Children's choices.", sourceIds: S, confidence: "HIGH" },
        { content: "Regional products.", sourceIds: S },
        { content: "Snacks and culinary activities.", sourceIds: S },
        { content: "Fast service.", sourceIds: S },
      ],
    }),
    section("persona-sophie-lambert", {
      key: "ideal_experience",
      title: "Ideal experience",
      type: "text",
      order: 24,
      items: [
        {
          content:
            "Children discover the Tour de France while the family creates memories they will share for years.",
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
  archetype: "The Sports Enthusiast",
  category: "Sports enthusiast guest",
  family: "SPORTS_HOSPITALITY",
  segment: "Sports & Leisure",
  oneLineEssence:
    "A cycling fan who accepts the invitation to be close to the race — the hospitality is a bonus, the sport is the point.",
  portraitUrl: "/persona-studio/tdf/thomas-garcia.png",
  accentColor: "#ef4444",
  quote:
    "Honestly, I am mainly here to see them pass. Everything else is a bonus.",
  quoteType: "COMPOSITE",
  confidenceLevel: "MEDIUM",
  confidenceExplanation:
    "Built from the hospitality persona brief. His sporting priorities are clearly stated; depth of cycling knowledge and desired level of analysis are assumptions to validate.",
  demographicContext: {
    ageRange: "45",
    location: "Toulouse, France",
    relevanceNote:
      "Sales executive invited by a partner — the invited-fan behaviour matters, not the job title.",
  },
  behaviouralTags: ["fan-first", "proximity-seeking", "anti-corporate", "sport-focused"],
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
            "Sales executive and cycling fan, invited by a Tour partner for a full day 1–2 times a year, who comes above all for the race itself.",
          sourceIds: S,
          confidence: "HIGH",
        },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "context",
      title: "Context",
      type: "bullets",
      order: 1,
      items: [
        { content: "Sales executive invited by a Tour partner.", sourceIds: S, confidence: "HIGH" },
        { content: "Based in Toulouse, France.", sourceIds: S, confidence: "HIGH" },
        { content: "Attends 1–2 stages per year, for a full day.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "motivations",
      title: "Motivations",
      type: "bullets",
      order: 6,
      items: [
        { content: "Seeing riders close up.", sourceIds: S, confidence: "HIGH" },
        { content: "Understanding race strategy.", sourceIds: S },
        { content: "Experiencing the peloton atmosphere.", sourceIds: S },
        { content: "Discovering behind-the-scenes activity.", sourceIds: S },
        { content: "Sharing passion for cycling.", sourceIds: S },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "frustrations",
      title: "Frustrations",
      type: "bullets",
      order: 7,
      items: [
        { content: "Long waiting periods.", sourceIds: S, confidence: "HIGH" },
        { content: "Insufficient race explanation.", sourceIds: S, confidence: "HIGH" },
        { content: "Entertainment disconnected from sport.", sourceIds: S, confidence: "HIGH" },
        { content: "Experience sometimes too corporate.", sourceIds: S, confidence: "HIGH" },
        { content: "Difficulty following the action between passages.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "questions_to_validate",
      title: "Questions to validate",
      type: "bullets",
      order: 12,
      items: [
        { content: "His depth of cycling knowledge and desired level of analysis.", status: "TO_VALIDATE", confidence: "LOW" },
        { content: "Whether he would leave hospitality to reach the roadside.", status: "TO_VALIDATE", confidence: "LOW" },
      ],
    }),
  ],
  domainSections: [
    section("persona-thomas-garcia", {
      key: "reasons_for_attending",
      title: "Reasons for attending",
      type: "bullets",
      order: 20,
      items: [
        { content: "Invited by a Tour partner.", sourceIds: S, confidence: "HIGH" },
        { content: "Proximity to the race.", sourceIds: S, confidence: "HIGH" },
        { content: "Immersion in cycling.", sourceIds: S },
        { content: "Unique Tour atmosphere.", sourceIds: S },
        { content: "Access to teams and behind-the-scenes moments.", sourceIds: S },
        { content: "Authentic sports moments.", sourceIds: S },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "key_expectations",
      title: "Key expectations",
      type: "needs",
      order: 21,
      items: [
        { content: "Proximity to riders.", sourceIds: S, confidence: "HIGH" },
        { content: "Access to paddocks and teams.", sourceIds: S },
        { content: "Race information and analysis.", sourceIds: S, confidence: "HIGH" },
        { content: "Sports commentary.", sourceIds: S },
        { content: "Feeling the intensity of the competition.", sourceIds: S },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "food_hospitality",
      title: "Food & hospitality expectations",
      type: "bullets",
      order: 22,
      items: [
        { content: "Premium grab-and-go.", sourceIds: S, confidence: "HIGH" },
        { content: "Regional products.", sourceIds: S },
        { content: "Fast service.", sourceIds: S, confidence: "HIGH" },
        { content: "Cold drinks that are easy to access.", sourceIds: S },
        { content: "Lunch compatible with following the race.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-thomas-garcia", {
      key: "ideal_experience",
      title: "Ideal experience",
      type: "text",
      order: 24,
      items: [
        {
          content:
            "Enjoy the full day without losing track of the race and experience the Tour as close to the sporting action as possible.",
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
  archetype: "The Sponsor",
  category: "Sponsor / Tour partner",
  family: "SPORTS_HOSPITALITY",
  segment: "Sports & Leisure",
  oneLineEssence:
    "A partnerships director running a season-long hospitality programme who must make every invitation pay back.",
  portraitUrl: "/persona-studio/tdf/claire-dubois.png",
  accentColor: "#22c55e",
  quote:
    "Every invitation must create value for our clients and strengthen our partnership with the Tour.",
  quoteType: "COMPOSITE",
  confidenceLevel: "MEDIUM",
  confidenceExplanation:
    "Built from the hospitality persona brief. Her operational goals are well described; the metrics she uses to prove ROI are a key unknown to validate.",
  demographicContext: {
    ageRange: "48",
    location: "Lausanne, Switzerland",
    relevanceNote:
      "Partnerships & events director for a major partner brand — the season-long operator role drives her needs.",
  },
  behaviouralTags: ["operator", "roi-driven", "differentiation-seeking", "endurance"],
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
            "Partnerships and events director for a major partner brand, present across 15–21 stages throughout the Tour, running the brand's hospitality programme.",
          sourceIds: S,
          confidence: "HIGH",
        },
      ],
    }),
    section("persona-claire-dubois", {
      key: "context",
      title: "Context",
      type: "bullets",
      order: 1,
      items: [
        { content: "Partnerships and events director for a major partner brand.", sourceIds: S, confidence: "HIGH" },
        { content: "Based in Lausanne, Switzerland.", sourceIds: S, confidence: "HIGH" },
        { content: "Present across 15–21 stages, throughout the Tour.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "motivations",
      title: "Motivations",
      type: "bullets",
      order: 6,
      items: [
        { content: "Client loyalty.", sourceIds: S, confidence: "HIGH" },
        { content: "Business development.", sourceIds: S },
        { content: "Brand enhancement.", sourceIds: S },
        { content: "Creation of exclusive moments.", sourceIds: S },
        { content: "Measurable return on investment.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "frustrations",
      title: "Frustrations",
      type: "bullets",
      order: 7,
      items: [
        { content: "Fatigue after several stages.", sourceIds: S, confidence: "HIGH" },
        { content: "Repetitive experience.", sourceIds: S, confidence: "HIGH" },
        { content: "Difficulty renewing surprises.", sourceIds: S, confidence: "HIGH" },
        { content: "Lack of personalisation.", sourceIds: S },
        { content: "Perceived cost higher than visible value.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "questions_to_validate",
      title: "Questions to validate",
      type: "bullets",
      order: 12,
      items: [
        { content: "The exact metrics she uses to prove ROI to her leadership.", status: "TO_VALIDATE", confidence: "LOW" },
        { content: "Her decision latitude to customise stage-by-stage.", status: "TO_VALIDATE", confidence: "LOW" },
      ],
    }),
  ],
  domainSections: [
    section("persona-claire-dubois", {
      key: "reasons_for_attending",
      title: "Reasons for attending",
      type: "bullets",
      order: 20,
      items: [
        { content: "Manages the brand's hospitality programme.", sourceIds: S, confidence: "HIGH" },
        { content: "Satisfies invited guests.", sourceIds: S },
        { content: "Generates business.", sourceIds: S },
        { content: "Enhances the brand.", sourceIds: S },
        { content: "Demonstrates return on investment.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "key_expectations",
      title: "Key expectations",
      type: "needs",
      order: 21,
      items: [
        { content: "Maximum guest satisfaction.", sourceIds: S, confidence: "HIGH" },
        { content: "Differentiation between stages.", sourceIds: S, confidence: "HIGH" },
        { content: "Personalisation.", sourceIds: S },
        { content: "Operational simplicity.", sourceIds: S, confidence: "HIGH" },
        { content: "Dedicated support.", sourceIds: S },
      ],
    }),
    section("persona-claire-dubois", {
      key: "food_hospitality",
      title: "Food & hospitality expectations",
      type: "bullets",
      order: 22,
      items: [
        { content: "Different menus by territory.", sourceIds: S, confidence: "HIGH" },
        { content: "Exclusive experiences.", sourceIds: S },
        { content: "Meetings with producers or chefs.", sourceIds: S },
        { content: "Premium entertainment.", sourceIds: S },
        { content: "Moments supporting business conversations.", sourceIds: S, confidence: "HIGH" },
      ],
    }),
    section("persona-claire-dubois", {
      key: "ideal_experience",
      title: "Ideal experience",
      type: "text",
      order: 24,
      items: [
        {
          content:
            "Every stage creates a different and memorable experience that justifies the investment in the Tour.",
          sourceIds: S,
        },
      ],
    }),
  ],
});

export const TDF_PERSONAS: Persona[] = [david, sophie, thomas, claire];
