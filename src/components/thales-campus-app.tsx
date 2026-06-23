"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { CampusMap } from "@/components/Map";
import { Filters } from "@/components/Filters";
import { KioskMode } from "@/components/KioskMode";
import { RestaurantCard } from "@/components/RestaurantCard";
import { RestaurantDetail } from "@/components/RestaurantDetail";
import { FloorPlanViewer } from "@/components/FloorPlanViewer";
import { useLiveData } from "@/hooks/use-live-data";
import { useThalesStore } from "@/lib/thales/store";
import { isRestaurantOpen, matchesFilter } from "@/lib/thales/utils";

export function ThalesCampusApp({ backHref }: { backHref?: string }) {
  useLiveData();

  const restaurants = useThalesStore((s) => s.restaurants);
  const selectedId = useThalesStore((s) => s.selectedId);
  const selectRestaurant = useThalesStore((s) => s.selectRestaurant);
  const activeFilters = useThalesStore((s) => s.activeFilters);
  const showFloorPlan = useThalesStore((s) => s.showFloorPlan);
  const kioskMode = useThalesStore((s) => s.kioskMode);

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return restaurants;
    return restaurants.filter((r) => {
      const open = isRestaurantOpen(r.horaires);
      return activeFilters.every((f) => matchesFilter(r, f, open));
    });
  }, [restaurants, activeFilters]);

  const selected = restaurants.find((r) => r.id === selectedId);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#060d18] text-white select-none">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(30,58,138,0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(255,184,28,0.08),transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between p-6 md:p-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-400/70">
            Campus Thales
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            Restauration
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Trouvez l&apos;espace idéal · {timeStr}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {backHref && (
            <Link
              href={backHref}
              className="flex items-center gap-2 rounded-full bg-white/8 px-3 py-2 text-xs font-medium text-white/70 ring-1 ring-white/10 hover:bg-white/12 hover:text-white transition-colors touch-manipulation"
            >
              <ArrowLeft className="size-3.5" />
              Standard Offer
            </Link>
          )}
          <KioskMode restaurants={restaurants} />
          <div className="hidden md:flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/50">Données live</span>
          </div>
        </div>
      </header>

      {/* Filters */}
      {!kioskMode && (
        <div className="absolute left-0 right-0 top-28 z-20 px-6 md:px-8">
          <Filters />
        </div>
      )}

      {/* Map */}
      <div className="absolute inset-0 pt-36 pb-4">
        <CampusMap restaurants={restaurants} />
      </div>

      {/* Restaurant list sidebar */}
      {!selectedId && !kioskMode && (
        <aside className="absolute bottom-6 left-6 z-20 w-80 max-h-[50vh] overflow-hidden rounded-2xl
          bg-[#0a1628]/70 backdrop-blur-2xl ring-1 ring-white/10 shadow-2xl">
          <div className="border-b border-white/10 px-4 py-3">
            <h2 className="text-sm font-semibold text-white/90">
              {filtered.length} espace{filtered.length > 1 ? "s" : ""}
            </h2>
          </div>
          <div className="overflow-y-auto max-h-[calc(50vh-48px)] p-3 space-y-2">
            {filtered.map((r) => (
              <RestaurantCard
                key={r.id}
                restaurant={r}
                isOpen={isRestaurantOpen(r.horaires)}
                compact
                onClick={() => selectRestaurant(r.id)}
              />
            ))}
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-white/40">
                Aucun espace ne correspond aux filtres
              </p>
            )}
          </div>
        </aside>
      )}

      {/* Detail panel */}
      <AnimatePresence>
        {selected && !showFloorPlan && (
          <RestaurantDetail
            restaurant={selected}
            isOpen={isRestaurantOpen(selected.horaires)}
          />
        )}
      </AnimatePresence>

      {/* Floor plan */}
      <AnimatePresence>
        {selected && showFloorPlan && selected.floorPlan && (
          <FloorPlanViewer restaurant={selected} />
        )}
      </AnimatePresence>

      {/* Sodexo branding */}
      <footer className="absolute bottom-4 right-6 z-20 flex items-center gap-2 text-xs text-white/25">
        <span className="font-semibold text-white/40">Sodexo</span>
        <span>·</span>
        <span>CoDesign Services</span>
      </footer>
    </div>
  );
}
