import { create } from "zustand";
import type { Restaurant, Stand } from "@/lib/thales/types";

interface ThalesState {
  restaurants: Restaurant[];
  selectedId: string | null;
  selectedStand: Stand | null;
  activeFilters: string[];
  kioskMode: boolean;
  showFloorPlan: boolean;
  mapZoom: { x: number; y: number; scale: number };
  setRestaurants: (restaurants: Restaurant[]) => void;
  selectRestaurant: (id: string | null) => void;
  selectStand: (stand: Stand | null) => void;
  toggleFilter: (filter: string) => void;
  clearFilters: () => void;
  setKioskMode: (enabled: boolean) => void;
  setShowFloorPlan: (show: boolean) => void;
  setMapZoom: (zoom: { x: number; y: number; scale: number }) => void;
  updateLiveData: (id: string, data: Partial<Pick<Restaurant, "attenteTempsReel" | "affluence">>) => void;
}

export const useThalesStore = create<ThalesState>((set) => ({
  restaurants: [],
  selectedId: null,
  selectedStand: null,
  activeFilters: [],
  kioskMode: false,
  showFloorPlan: false,
  mapZoom: { x: 50, y: 50, scale: 1 },

  setRestaurants: (restaurants) => set({ restaurants }),

  selectRestaurant: (id) =>
    set((state) => ({
      selectedId: id,
      selectedStand: null,
      showFloorPlan: false,
      mapZoom: id
        ? {
            x: state.restaurants.find((r) => r.id === id)?.positionX ?? 50,
            y: state.restaurants.find((r) => r.id === id)?.positionY ?? 50,
            scale: 1.8,
          }
        : { x: 50, y: 50, scale: 1 },
    })),

  selectStand: (stand) => set({ selectedStand: stand }),

  toggleFilter: (filter) =>
    set((state) => ({
      activeFilters: state.activeFilters.includes(filter)
        ? state.activeFilters.filter((f) => f !== filter)
        : [...state.activeFilters, filter],
    })),

  clearFilters: () => set({ activeFilters: [] }),

  setKioskMode: (enabled) =>
    set({
      kioskMode: enabled,
      selectedId: enabled ? null : null,
      showFloorPlan: false,
    }),

  setShowFloorPlan: (show) => set({ showFloorPlan: show, selectedStand: null }),

  setMapZoom: (zoom) => set({ mapZoom: zoom }),

  updateLiveData: (id, data) =>
    set((state) => ({
      restaurants: state.restaurants.map((r) =>
        r.id === id ? { ...r, ...data } : r
      ),
    })),
}));
