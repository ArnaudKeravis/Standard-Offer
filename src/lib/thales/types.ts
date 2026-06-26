export type Affluence = "fluide" | "modere" | "sature";

export interface Horaire {
  jour: string;
  ouverture: string;
  fermeture: string;
}

export interface Stand {
  id: string;
  nom: string;
  categorie: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
}

export interface FloorPlan {
  viewBox: string;
  stands: Stand[];
}

export interface Restaurant {
  id: string;
  nom: string;
  positionX: number;
  positionY: number;
  type: string;
  batiment: string;
  description: string;
  photo: string;
  horaires: Horaire[];
  affluence: Affluence;
  tags: string[];
  offres: string[];
  services: string[];
  localisation: string;
  floorPlan?: FloorPlan;
}

export interface OffreType {
  id: string;
  label: string;
  icon: string;
}

export interface LiveRestaurantData {
  id: string;
  affluence: Affluence;
  ouvert: boolean;
}
