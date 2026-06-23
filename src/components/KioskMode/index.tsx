"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Monitor, X } from "lucide-react";
import { useThalesStore } from "@/lib/thales/store";
import type { Restaurant } from "@/lib/thales/types";
import { getWaitColor, getWaitLabel, OFFRE_LABELS, WAIT_COLORS } from "@/lib/thales/utils";

const KIOSK_INTERVAL = 60_000;

interface KioskModeProps {
  restaurants: Restaurant[];
}

export function KioskMode({ restaurants }: KioskModeProps) {
  const kioskMode = useThalesStore((s) => s.kioskMode);
  const setKioskMode = useThalesStore((s) => s.setKioskMode);
  const selectRestaurant = useThalesStore((s) => s.selectRestaurant);
  const selectedId = useThalesStore((s) => s.selectedId);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!kioskMode || restaurants.length === 0) return;

    const cycle = () => {
      const idx = indexRef.current % restaurants.length;
      selectRestaurant(restaurants[idx].id);
      indexRef.current = idx + 1;
    };

    cycle();
    const interval = setInterval(cycle, KIOSK_INTERVAL);
    return () => clearInterval(interval);
  }, [kioskMode, restaurants, selectRestaurant]);

  const selected = restaurants.find((r) => r.id === selectedId);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setKioskMode(!kioskMode)}
        whileTap={{ scale: 0.95 }}
        className={`
          flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium
          backdrop-blur-xl transition-all touch-manipulation
          ${kioskMode
            ? "bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/40"
            : "bg-white/8 text-white/70 ring-1 ring-white/10 hover:bg-white/12"
          }
        `}
      >
        <Monitor className="size-4" />
        {kioskMode ? "Mode kiosque actif" : "Mode kiosque"}
      </motion.button>

      <AnimatePresence>
        {kioskMode && selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-24 left-1/2 z-30 -translate-x-1/2 w-full max-w-lg px-6"
          >
            <KioskHighlight restaurant={selected} onClose={() => setKioskMode(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function KioskHighlight({
  restaurant,
  onClose,
}: {
  restaurant: Restaurant;
  onClose: () => void;
}) {
  const waitColor = getWaitColor(restaurant.attenteTempsReel);
  const waitStyle = WAIT_COLORS[waitColor];

  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-2xl p-6 ring-1 ring-white/20 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-amber-400/80">
            À la une
          </p>
          <h3 className="mt-1 text-xl font-bold text-white">{restaurant.nom}</h3>
          <p className="mt-1 text-sm text-white/60">{restaurant.offreDuJour}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-full bg-white/10 p-2 text-white/60 hover:text-white touch-manipulation"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${waitStyle.bg} ring-1 ${waitStyle.ring}`}>
          <span className={`text-sm font-bold tabular-nums ${waitStyle.text}`}>
            {getWaitLabel(restaurant.attenteTempsReel)}
          </span>
        </div>
        <span className="text-xs text-white/50">{OFFRE_LABELS[restaurant.type]}</span>
      </div>
    </div>
  );
}
