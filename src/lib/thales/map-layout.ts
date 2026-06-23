export type CalloutTheme = "purple" | "teal" | "cyan" | "white";

export interface MapCalloutLayout {
  id: string;
  /** Pin position on the aerial map (%) */
  pinX: number;
  pinY: number;
  /** Card top-left position (%) */
  cardX: number;
  cardY: number;
  theme: CalloutTheme;
  keywords: string[];
  /** Card width as % of map container */
  cardWidth?: number;
}

/** Positions calibrated on campus-aerial.png — clean aerial render (1024×604) */
export const MAP_CALLOUTS: MapCalloutLayout[] = [
  {
    id: "self-helios-2",
    pinX: 50,
    pinY: 28,
    cardX: 2,
    cardY: 6,
    theme: "purple",
    keywords: ["INTERNATIONAL", "GOURMANDISE", "FOOD COURT"],
    cardWidth: 15,
  },
  {
    id: "self-marcel-dassault",
    pinX: 36,
    pinY: 52,
    cardX: 2,
    cardY: 28,
    theme: "purple",
    keywords: ["CULINARITÉ", "BISTROT", "ACCESSIBILITÉ"],
    cardWidth: 15,
  },
  {
    id: "avs",
    pinX: 40,
    pinY: 58,
    cardX: 2,
    cardY: 44,
    theme: "purple",
    keywords: ["BRASSERIE", "SPÉCIALITÉS", "PREMIUM"],
    cardWidth: 13,
  },
  {
    id: "rest-alt-marcel-dassault",
    pinX: 22,
    pinY: 86,
    cardX: 2,
    cardY: 62,
    theme: "teal",
    keywords: ["TRADITION", "CONVIVIALITÉ", "STREET FOOD"],
    cardWidth: 16,
  },
  {
    id: "bomie",
    pinX: 62,
    pinY: 22,
    cardX: 70,
    cardY: 4,
    theme: "white",
    keywords: ["BOULANGERIE", "PLAISIR", "CRÉATIVITÉ"],
    cardWidth: 14,
  },
  {
    id: "solarium",
    pinX: 64,
    pinY: 44,
    cardX: 72,
    cardY: 22,
    theme: "purple",
    keywords: ["EFFICACITÉ", "FLUIDITÉ", "CONVIVIALITÉ"],
    cardWidth: 14,
  },
  {
    id: "foodtruck",
    pinX: 72,
    pinY: 58,
    cardX: 72,
    cardY: 38,
    theme: "cyan",
    keywords: ["SAISONNALITÉ", "ÉPHÉMÈRE", "PARTAGE"],
    cardWidth: 13,
  },
  {
    id: "lenvol",
    pinX: 58,
    pinY: 74,
    cardX: 68,
    cardY: 56,
    theme: "teal",
    keywords: ["PLACE DE VILLAGE", "TOUTE LA JOURNÉE", "MODERNITÉ"],
    cardWidth: 15,
  },
];

export const THEME_STYLES: Record<
  CalloutTheme,
  { header: string; border: string; line: string; dot: string }
> = {
  purple: {
    header: "bg-[#5b4f9b]",
    border: "border-[#5b4f9b]/40",
    line: "#5b4f9b",
    dot: "#5b4f9b",
  },
  teal: {
    header: "bg-[#1a7a6e]",
    border: "border-[#1a7a6e]/40",
    line: "#1a7a6e",
    dot: "#1a7a6e",
  },
  cyan: {
    header: "bg-[#2aa8c8]",
    border: "border-[#2aa8c8]/40",
    line: "#2aa8c8",
    dot: "#2aa8c8",
  },
  white: {
    header: "bg-white",
    border: "border-[#1a7a6e]/60",
    line: "#1a7a6e",
    dot: "#1a7a6e",
  },
};
