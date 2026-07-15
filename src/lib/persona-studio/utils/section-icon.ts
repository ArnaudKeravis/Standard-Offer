import {
  Activity,
  BadgeCheck,
  Briefcase,
  Building2,
  Clock,
  Compass,
  Fingerprint,
  Flame,
  Frown,
  HeartHandshake,
  HelpCircle,
  Lightbulb,
  NotebookPen,
  Split,
  Star,
  Sun,
  Target,
  Ticket,
  Trophy,
  Utensils,
  UtensilsCrossed,
  Wine,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps a persona section `key` to a pictogram. Data-driven so both families
 * (Corporate + Tour de France) get meaningful icons from one source. Unknown
 * keys fall back to a neutral note icon.
 */
const SECTION_ICONS: Record<string, LucideIcon> = {
  essence: Fingerprint,
  context: Compass,
  goals: Target,
  needs: HeartHandshake,
  pains: Frown,
  behaviours: Activity,
  motivations: Flame,
  frustrations: Frown,
  tensions: Split,
  expectations: Star,
  moments: Clock,
  design_implications: Lightbulb,
  questions_to_validate: HelpCircle,
  lifestyle: Sun,
  daily_job: Briefcase,
  workplace_expectations: Building2,
  food_expectations: UtensilsCrossed,
  key_eating_moments: Utensils,
  must_have: BadgeCheck,
  reasons_for_attending: Ticket,
  key_expectations: Star,
  food_hospitality: UtensilsCrossed,
  fb_expectations: Wine,
  ideal_experience: Trophy,
};

export function sectionIcon(key: string): LucideIcon {
  return SECTION_ICONS[key] ?? NotebookPen;
}
