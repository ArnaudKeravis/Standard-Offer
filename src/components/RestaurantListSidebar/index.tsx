"use client";

import { motion } from "framer-motion";
import type { Restaurant } from "@/lib/thales/types";
import { RestaurantCard } from "@/components/RestaurantCard";
import { isRestaurantOpen } from "@/lib/thales/utils";

interface RestaurantListSidebarProps {
  restaurants: Restaurant[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function RestaurantListSidebar({
  restaurants,
  selectedId,
  onSelect,
  onHover,
}: RestaurantListSidebarProps) {
  return (
    <aside className="flex h-full w-80 max-w-[28vw] shrink-0 flex-col overflow-hidden rounded-2xl bg-[#0a1628]/80 ring-1 ring-white/12 shadow-2xl backdrop-blur-2xl">
      <div className="border-b border-white/10 px-4 py-3">
        <h2 className="text-sm font-semibold text-white/90">
          Tous les espaces
        </h2>
        <p className="mt-0.5 text-[11px] text-white/45">
          {restaurants.length} restaurant{restaurants.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {restaurants.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onMouseEnter={() => onHover(r.id)}
            onMouseLeave={() => onHover(null)}
          >
            <div
              className={
                selectedId === r.id
                  ? "rounded-2xl ring-2 ring-amber-400/50"
                  : undefined
              }
            >
              <RestaurantCard
                restaurant={r}
                isOpen={isRestaurantOpen(r.horaires)}
                compact
                onClick={() => onSelect(r.id)}
              />
            </div>
          </motion.div>
        ))}

        {restaurants.length === 0 && (
          <p className="py-10 text-center text-sm text-white/40">
            Aucun espace disponible
          </p>
        )}
      </div>
    </aside>
  );
}
