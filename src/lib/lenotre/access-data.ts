/**
 * Access data for École Lenôtre — Arts Culinaires (Rungis).
 * Source of truth: "plan d'accès école.pdf" provided by the client.
 * Address: 9 rue de Villeneuve, 94150 Rungis — Parc d'Affaires ICADE.
 */

export const SCHOOL = {
  name: "École Lenôtre",
  subtitle: "École des Arts Culinaires",
  addressLines: ["9 rue de Villeneuve", "94150 Rungis"],
  district: "Parc d'Affaires ICADE · à 2 pas du MIN de Rungis",
  phone: "+33 (1) 86 93 04 00",
  phoneHref: "tel:+33186930400",
  email: "ecole.fr@lenotre.fr",
  website: "www.ecole-lenotre.com",
  websiteHref: "https://www.ecole-lenotre.com",
  hashtag: "#legoûtdelatransmission",
  /** Query used for Google Maps place + directions destination. */
  mapsQuery: "École Lenôtre, 9 rue de Villeneuve, 94150 Rungis",
  /** Opening hours — Monday to Friday. */
  hours: { openMinutes: 7 * 60 + 30, closeMinutes: 18 * 60, days: [1, 2, 3, 4, 5] },
  hoursLabel: "Lun – Ven · 7h30 – 18h00",
} as const;

export type Network = "RER" | "Métro" | "Tram" | "Bus";

export interface TransitLine {
  id: string;
  code: string;
  network: Network;
  color: string;
  textColor: string;
}

/** Official-ish Île-de-France Mobilités line colours. */
export const LINES: Record<string, TransitLine> = {
  rerC: { id: "rerC", code: "C", network: "RER", color: "#F3D311", textColor: "#1a1a1a" },
  rerB: { id: "rerB", code: "B", network: "RER", color: "#4B92DB", textColor: "#ffffff" },
  metro4: { id: "metro4", code: "4", network: "Métro", color: "#A0006E", textColor: "#ffffff" },
  metro14: { id: "metro14", code: "14", network: "Métro", color: "#62259D", textColor: "#ffffff" },
  tram7: { id: "tram7", code: "T7", network: "Tram", color: "#83786F", textColor: "#ffffff" },
  bus216: { id: "bus216", code: "216", network: "Bus", color: "#3D9B78", textColor: "#ffffff" },
  bus319: { id: "bus319", code: "319", network: "Bus", color: "#3D9B78", textColor: "#ffffff" },
  bus9110: { id: "bus9110", code: "91.10", network: "Bus", color: "#3D9B78", textColor: "#ffffff" },
};

export interface JourneyLeg {
  lineId: keyof typeof LINES;
  to: string;
  note?: string;
}

export interface Journey {
  id: string;
  origin: string;
  category: "gare" | "aeroport" | "hub";
  /** Google Maps origin query for live directions. */
  originQuery: string;
  legs: JourneyLeg[];
  /** Final stop from which you walk to the school. */
  arrivalStop: string;
  /** Approximate door-to-door estimate for the ETA badge. */
  duration: string;
}

export const JOURNEYS: Journey[] = [
  {
    id: "paris-saint-michel",
    origin: "Paris — Saint-Michel",
    category: "hub",
    originQuery: "Saint-Michel Notre-Dame, Paris",
    legs: [{ lineId: "rerC", to: "Rungis-La Fraternelle", note: "35 min" }],
    arrivalStop: "Rungis-La Fraternelle",
    duration: "~40 min",
  },
  {
    id: "montparnasse",
    origin: "Gare Montparnasse",
    category: "gare",
    originQuery: "Gare Montparnasse, Paris",
    legs: [
      { lineId: "rerB", to: "Cité Universitaire" },
      { lineId: "bus216", to: "Robert Schuman" },
    ],
    arrivalStop: "Robert Schuman",
    duration: "~45 min",
  },
  {
    id: "gare-est",
    origin: "Gare de l'Est",
    category: "gare",
    originQuery: "Gare de l'Est, Paris",
    legs: [
      { lineId: "metro4", to: "Châtelet" },
      { lineId: "metro14", to: "Chevilly-Larue" },
      { lineId: "tram7", to: "La Fraternelle" },
    ],
    arrivalStop: "La Fraternelle",
    duration: "~50 min",
  },
  {
    id: "gare-nord",
    origin: "Gare du Nord",
    category: "gare",
    originQuery: "Gare du Nord, Paris",
    legs: [
      { lineId: "rerB", to: "Massy-Palaiseau", note: "30 min" },
      { lineId: "rerC", to: "Rungis-La Fraternelle", note: "7 min" },
    ],
    arrivalStop: "Rungis-La Fraternelle",
    duration: "~45 min",
  },
  {
    id: "gare-lyon",
    origin: "Gare de Lyon",
    category: "gare",
    originQuery: "Gare de Lyon, Paris",
    legs: [
      { lineId: "metro14", to: "Chevilly-Larue" },
      { lineId: "tram7", to: "La Fraternelle" },
    ],
    arrivalStop: "La Fraternelle",
    duration: "~40 min",
  },
  {
    id: "saint-lazare",
    origin: "Gare Saint-Lazare",
    category: "gare",
    originQuery: "Gare Saint-Lazare, Paris",
    legs: [
      { lineId: "metro14", to: "Thiais-Orly" },
      { lineId: "bus319", to: "Solets" },
    ],
    arrivalStop: "Solets",
    duration: "~45 min",
  },
  {
    id: "austerlitz",
    origin: "Gare d'Austerlitz",
    category: "gare",
    originQuery: "Gare d'Austerlitz, Paris",
    legs: [{ lineId: "rerC", to: "Rungis-La Fraternelle" }],
    arrivalStop: "Rungis-La Fraternelle",
    duration: "~30 min",
  },
  {
    id: "massy-tgv",
    origin: "Gare TGV Massy-Palaiseau",
    category: "gare",
    originQuery: "Gare de Massy-Palaiseau",
    legs: [{ lineId: "rerC", to: "Rungis-La Fraternelle", note: "10 min" }],
    arrivalStop: "Rungis-La Fraternelle",
    duration: "~15 min",
  },
  {
    id: "pont-de-rungis",
    origin: "Pont de Rungis",
    category: "hub",
    originQuery: "Pont de Rungis, Thiais",
    legs: [{ lineId: "rerC", to: "Rungis-La Fraternelle" }],
    arrivalStop: "Rungis-La Fraternelle",
    duration: "~10 min",
  },
  {
    id: "orly",
    origin: "Aéroport Paris-Orly",
    category: "aeroport",
    originQuery: "Aéroport de Paris-Orly",
    legs: [{ lineId: "tram7", to: "La Fraternelle", note: "7 min" }],
    arrivalStop: "La Fraternelle",
    duration: "~12 min",
  },
  {
    id: "cdg",
    origin: "Aéroport Charles de Gaulle",
    category: "aeroport",
    originQuery: "Aéroport Charles de Gaulle",
    legs: [
      { lineId: "rerB", to: "Massy-Verrières", note: "1h03" },
      { lineId: "rerC", to: "Rungis-La Fraternelle", note: "7 min" },
    ],
    arrivalStop: "Rungis-La Fraternelle",
    duration: "~1h15",
  },
  {
    id: "sqy",
    origin: "Saint-Quentin-en-Yvelines",
    category: "hub",
    originQuery: "Gare de Saint-Quentin-en-Yvelines",
    legs: [{ lineId: "bus9110", to: "La Fraternelle" }],
    arrivalStop: "La Fraternelle",
    duration: "~40 min",
  },
];

export interface CarInfo {
  routes: string[];
  guidance: string;
  parking: string;
  charging: string;
}

export const CAR: CarInfo = {
  routes: ["A86", "A6", "A10", "N7", "D7"],
  guidance: "Suivez « Rungis — Parc d'affaires » à l'approche de la destination.",
  parking: "Stationnement possible rue de Villeneuve ou à proximité (parkings gratuits).",
  charging: "Borne de rechargement électrique à 100 mètres.",
};

export const ACCESSIBILITY =
  "Les formations et stages sont accessibles aux personnes en situation de handicap ou rencontrant des problèmes de santé. Mentionnez-le lors de votre inscription : un référent handicap étudiera avec vous les aménagements nécessaires. Un accompagnement individualisé est proposé dès votre arrivée.";

/** Build the interactive Google Maps embed URL. */
export function buildMapEmbedSrc(originQuery?: string): string {
  const dest = encodeURIComponent(SCHOOL.mapsQuery);
  if (originQuery) {
    const saddr = encodeURIComponent(originQuery);
    return `https://maps.google.com/maps?saddr=${saddr}&daddr=${dest}&dirflg=r&hl=fr&z=13&output=embed`;
  }
  return `https://maps.google.com/maps?q=${dest}&hl=fr&z=15&output=embed`;
}

/** External Google Maps directions link (opens full app / new tab). */
export function buildDirectionsUrl(
  originQuery: string | undefined,
  mode: "transit" | "driving" | "walking",
): string {
  const params = new URLSearchParams({ api: "1", destination: SCHOOL.mapsQuery, travelmode: mode });
  if (originQuery) params.set("origin", originQuery);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
