import type { LabsArea } from "./schemas";

export function accentForLabsArea(area: LabsArea): string {
  switch (area) {
    case "work":
      return "#1E2F9A";
    case "heal":
      return "#0E7A74";
    case "learn":
      return "#4338CA";
    case "play":
      return "#6D28D9";
  }
}

export function labsCssVars(area: LabsArea): Record<string, string> {
  return {
    "--labs-navy": "#1E2F9A",
    "--labs-blue": "#1968FF",
    "--labs-paper": "#EEF3F8",
    "--labs-teal": "#2BB8B0",
    "--labs-ink": "#0B1020",
    "--labs-muted": "#5B6478",
    "--labs-accent": accentForLabsArea(area),
  };
}
