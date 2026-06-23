export type Affluence = "faible" | "moderee" | "forte";

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
  concept: string;
  description: string;
  photo: string;
  horaires: Horaire[];
  capacite: number;
  attenteTempsReel: number;
  affluence: Affluence;
  tags: string[];
  offres: string[];
  offreDuJour: string;
  services: string[];
  localisation: string;
  floorPlan?: FloorPlan;
}

export interface OffreType {
  id: string;
  label: string;
  icon: string;
}

export type FilterId =
  | "healthy"
  | "rapide"
  | "sans-attente"
  | "vegetarien"
  | "coffee"
  | "dessert"
  | "street-food"
  | "food-court"
  | "ouvert";

export interface LiveRestaurantData {
  id: string;
  attenteTempsReel: number;
  affluence: Affluence;
  ouvert: boolean;
}
