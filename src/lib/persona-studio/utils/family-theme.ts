import type { PersonaFamily } from "@/lib/persona-studio/ai/schemas/common";
import {
  CORPORATE_TEMPLATE,
  TDF_TEMPLATE,
} from "@/lib/persona-studio/data/templates";

/** Default project accent by persona family (XP areas + workshop sets). */
export function accentForFamily(family: PersonaFamily): string {
  switch (family) {
    case "CORPORATE":
    case "WORK":
      return CORPORATE_TEMPLATE.accentColor;
    case "SPORTS_HOSPITALITY":
      return TDF_TEMPLATE.accentColor;
    case "HEAL":
      return "#0f766e";
    case "LEARN":
      return "#4338ca";
    case "PLAY":
      return "#6d28d9";
  }
}

/** CSS theme class token used by studio surfaces. */
export function themeForFamily(family: PersonaFamily): "corporate" | "tdf" | "heal" | "learn" | "play" {
  switch (family) {
    case "CORPORATE":
    case "WORK":
      return "corporate";
    case "SPORTS_HOSPITALITY":
      return "tdf";
    case "HEAL":
      return "heal";
    case "LEARN":
      return "learn";
    case "PLAY":
      return "play";
  }
}
