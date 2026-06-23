"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { Restaurant } from "@/lib/thales/types";
import type { MapCalloutLayout } from "@/lib/thales/map-layout";
import { THEME_STYLES } from "@/lib/thales/map-layout";
import { getWaitColor, getWaitLabel, WAIT_COLORS } from "@/lib/thales/utils";

interface MapCalloutProps {
  restaurant: Restaurant;
  layout: MapCalloutLayout;
  selected: boolean;
  visible: boolean;
  isOpen: boolean;
  onClick: () => void;
}

export function MapCallout({
  restaurant,
  layout,
  selected,
  visible,
  isOpen,
  onClick,
}: MapCalloutProps) {
  const theme = THEME_STYLES[layout.theme];
  const waitColor = getWaitColor(restaurant.attenteTempsReel);
  const waitStyle = WAIT_COLORS[waitColor];
  const isWhite = layout.theme === "white";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: visible ? 1 : 0.25,
        y: 0,
        scale: selected ? 1.04 : 1,
      }}
      whileHover={{ scale: selected ? 1.04 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", damping: 22, stiffness: 280 }}
      className={`
        absolute z-10 text-left touch-manipulation
        ${selected ? "z-20 ring-2 ring-amber-400/60 shadow-2xl shadow-black/30" : "shadow-lg shadow-black/20"}
        rounded-sm overflow-hidden border ${theme.border}
        ${!visible ? "pointer-events-none" : ""}
      `}
      style={{
        left: `${layout.cardX}%`,
        top: `${layout.cardY}%`,
        width: `${layout.cardWidth ?? 15}%`,
        minWidth: "140px",
        maxWidth: "220px",
      }}
      aria-label={`${restaurant.nom} — ${getWaitLabel(restaurant.attenteTempsReel)} d'attente`}
    >
      <div
        className={`px-2.5 py-1.5 ${theme.header} ${isWhite ? "text-[#1a7a6e]" : "text-white"}`}
      >
        <p
          className={`text-[10px] font-bold uppercase leading-tight tracking-wide ${isWhite ? "text-[#333]" : ""}`}
        >
          {restaurant.nom}
        </p>
      </div>

      <div className="bg-white/95 px-2.5 py-2 backdrop-blur-sm">
        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
          {layout.keywords.map((kw) => (
            <span
              key={kw}
              className="text-[8px] font-semibold uppercase tracking-wider text-[#444] leading-tight"
            >
              {kw}
            </span>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between gap-2 border-t border-gray-100 pt-2">
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 ${waitStyle.bg}`}
          >
            <Clock className={`size-2.5 ${waitStyle.text}`} />
            <span className={`text-[9px] font-bold tabular-nums ${waitStyle.text}`}>
              {getWaitLabel(restaurant.attenteTempsReel)}
            </span>
          </div>
          {isOpen ? (
            <span className="size-1.5 rounded-full bg-emerald-500" title="Ouvert" />
          ) : (
            <span className="text-[8px] font-medium text-gray-400">Fermé</span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
