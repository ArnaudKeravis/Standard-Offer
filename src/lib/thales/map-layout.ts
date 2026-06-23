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

/** Positions calibrated on campus-aerial.png (16:9) — matches Sodexo mapping PDF */
export const MAP_CALLOUTS: MapCalloutLayout[] = [
  {
    id: "self-helios-2",
    pinX: 49,
    pinY: 19,
    cardX: 1.5,
    cardY: 11,
    theme: "purple",
    keywords: ["INTERNATIONAL", "GOURMANDISE", "FOOD COURT"],
    cardWidth: 16,
  },
  {
    id: "self-marcel-dassault",
    pinX: 29,
    pinY: 47,
    cardX: 1,
    cardY: 33,
    theme: "purple",
    keywords: ["CULINARITÉ", "BISTROT", "ACCESSIBILITÉ"],
    cardWidth: 16,
  },
  {
    id: "rest-alt-marcel-dassault",
    pinX: 13,
    pinY: 79,
    cardX: 1,
    cardY: 61,
    theme: "teal",
    keywords: ["TRADITION", "CONVIVIALITÉ", "STREET FOOD"],
    cardWidth: 17,
  },
  {
    id: "avs",
    pinX: 36,
    pinY: 50,
    cardX: 18,
    cardY: 40,
    theme: "purple",
    keywords: ["BRASSERIE", "SPÉCIALITÉS", "PREMIUM"],
    cardWidth: 13,
  },
  {
    id: "bomie",
    pinX: 86,
    pinY: 13,
    cardX: 71,
    cardY: 6,
    theme: "white",
    keywords: ["BOULANGERIE", "PLAISIR", "CRÉATIVITÉ"],
    cardWidth: 15,
  },
  {
    id: "solarium",
    pinX: 56,
    pinY: 39,
    cardX: 74,
    cardY: 27,
    theme: "purple",
    keywords: ["EFFICACITÉ", "FLUIDITÉ", "CONVIVIALITÉ"],
    cardWidth: 15,
  },
  {
    id: "foodtruck",
    pinX: 69,
    pinY: 55,
    cardX: 74,
    cardY: 43,
    theme: "cyan",
    keywords: ["SAISONNALITÉ", "ÉPHÉMÈRE", "PARTAGE"],
    cardWidth: 14,
  },
  {
    id: "lenvol",
    pinX: 57,
    pinY: 78,
    cardX: 70,
    cardY: 61,
    theme: "teal",
    keywords: ["PLACE DE VILLAGE", "TOUTE LA JOURNÉE", "MODERNITÉ"],
    cardWidth: 16,
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
