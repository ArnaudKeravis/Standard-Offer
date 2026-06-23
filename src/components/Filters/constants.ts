import type { FilterId } from "@/lib/thales/types";
import {
  Coffee,
  Cookie,
  Clock,
  Leaf,
  Salad,
  Timer,
  Truck,
  UtensilsCrossed,
  Zap,
} from "lucide-react";

export const FILTERS: { id: FilterId; label: string; icon: typeof Leaf }[] = [
  { id: "healthy", label: "Healthy", icon: Leaf },
  { id: "rapide", label: "Rapide", icon: Zap },
  { id: "sans-attente", label: "Sans attente", icon: Timer },
  { id: "vegetarien", label: "Végétarien", icon: Salad },
  { id: "coffee", label: "Coffee", icon: Coffee },
  { id: "dessert", label: "Dessert", icon: Cookie },
  { id: "street-food", label: "Street Food", icon: Truck },
  { id: "food-court", label: "Food Court", icon: UtensilsCrossed },
  { id: "ouvert", label: "Ouvert maintenant", icon: Clock },
];

export const BUILDINGS = [
  { id: "helios-1", label: "Hélios I", x: 42, y: 18, w: 22, h: 28 },
  { id: "helios-2", label: "Hélios II", x: 58, y: 18, w: 24, h: 32 },
  { id: "marcel", label: "Marcel Dassault", x: 8, y: 42, w: 22, h: 32 },
  { id: "avs", label: "AVS", x: 68, y: 58, w: 20, h: 22 },
  { id: "village", label: "Place de village", x: 20, y: 30, w: 18, h: 20 },
];
