"use client";

import { motion } from "framer-motion";
import type { Restaurant } from "@/lib/thales/types";
import { AFFLUENCE_CONFIG, OFFRE_LABELS } from "@/lib/thales/utils";

interface RestaurantCardProps {
  restaurant: Restaurant;
  isOpen: boolean;
  compact?: boolean;
  onClick: () => void;
}

export function RestaurantCard({
  restaurant,
  isOpen,
  compact,
  onClick,
}: RestaurantCardProps) {
  const affluence = AFFLUENCE_CONFIG[restaurant.affluence];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group w-full text-left rounded-2xl backdrop-blur-xl
        bg-white/10 ring-1 ring-white/15
        hover:bg-white/15 hover:ring-white/25
        transition-shadow duration-300 touch-manipulation
        ${compact ? "p-3" : "p-4"}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold text-white truncate ${compact ? "text-sm" : "text-base"}`}>
              {restaurant.nom}
            </h3>
            {isOpen ? (
              <span className="shrink-0 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                Ouvert
              </span>
            ) : (
              <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/50">
                Fermé
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-white/50 truncate">
            {OFFRE_LABELS[restaurant.type] ?? restaurant.type} · {restaurant.batiment}
          </p>
        </div>

        {isOpen && (
          <div className="shrink-0 flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 ring-1 ring-white/15">
            <span className="text-xs" aria-hidden>
              {affluence.emoji}
            </span>
            <span className="text-xs font-semibold text-white/90">{affluence.label}</span>
          </div>
        )}
      </div>

      {!compact && isOpen && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] text-white/40 mb-1">
            <span>Affluence</span>
            <span>{affluence.label}</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${affluence.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${affluence.value}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      )}
    </motion.button>
  );
}
