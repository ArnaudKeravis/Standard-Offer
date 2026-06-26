"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, MapPin, X } from "lucide-react";
import { useThalesStore } from "@/lib/thales/store";
import type { Restaurant } from "@/lib/thales/types";
import { AFFLUENCE_CONFIG, getRestaurantOpenState } from "@/lib/thales/utils";

interface RestaurantDetailProps {
  restaurant: Restaurant;
}

export function RestaurantDetail({ restaurant }: RestaurantDetailProps) {
  const selectRestaurant = useThalesStore((s) => s.selectRestaurant);
  const setShowFloorPlan = useThalesStore((s) => s.setShowFloorPlan);
  const openState = getRestaurantOpenState(restaurant);
  const affluence = AFFLUENCE_CONFIG[restaurant.affluence];

  return (
    <AnimatePresence>
      <motion.aside
        key={restaurant.id}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="absolute right-0 top-0 z-40 flex h-full w-[420px] max-w-[40vw] flex-col
          border-l border-white/10 bg-[#0a1628]/85 backdrop-blur-2xl shadow-2xl"
      >
        <div className="relative shrink-0 overflow-hidden border-b border-white/10 p-6">
          <h2 className="text-2xl font-bold text-white tracking-tight pr-10">
            {restaurant.nom}
          </h2>
          <button
            type="button"
            onClick={() => selectRestaurant(null)}
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full
              bg-white/10 text-white/80 backdrop-blur-md ring-1 ring-white/20
              hover:bg-white/20 transition-colors touch-manipulation"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
              Descriptif
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">{restaurant.description}</p>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
              Statut
            </h3>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
                openState.isOpen
                  ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/30"
                  : "bg-white/5 text-white/60 ring-1 ring-white/10"
              }`}
            >
              {openState.statusLabel}
            </span>
          </section>

          {openState.showAffluence && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                Affluence
              </h3>
              <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" aria-hidden>
                    {affluence.emoji}
                  </span>
                  <span className="text-sm font-semibold text-white/90">{affluence.label}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${affluence.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${affluence.value}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </section>
          )}

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
              Stands & offres
            </h3>
            <div className="flex flex-wrap gap-2">
              {restaurant.offres.map((offre) => (
                <span
                  key={offre}
                  className="rounded-full bg-white/8 px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/10"
                >
                  {offre}
                </span>
              ))}
            </div>
          </section>

          {openState.showHoraires && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                Horaires
              </h3>
              <div className="space-y-1.5">
                {restaurant.horaires.map((h, i) => (
                  <div key={i} className="flex justify-between gap-4 text-sm">
                    <span className="text-white/50">{h.jour}</span>
                    {h.ouverture && h.fermeture ? (
                      <span className="text-white/90 tabular-nums shrink-0">
                        {h.ouverture} – {h.fermeture}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          )}

          {openState.showServices && restaurant.services.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                Services
              </h3>
              <ul className="space-y-1">
                {restaurant.services.map((s) => (
                  <li key={s} className="text-sm text-white/70 flex items-center gap-2">
                    <span className="size-1 rounded-full bg-amber-400/60" />
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {restaurant.floorPlan && (
          <div className="shrink-0 border-t border-white/10 p-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFloorPlan(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl
                bg-gradient-to-r from-amber-500 to-amber-400 px-6 py-4
                text-sm font-semibold text-[#0a1628] shadow-lg shadow-amber-500/20
                touch-manipulation"
            >
              <MapPin className="size-4" />
              Explorer le restaurant
            </motion.button>
          </div>
        )}
      </motion.aside>
    </AnimatePresence>
  );
}

export function FloorPlanBackButton() {
  const setShowFloorPlan = useThalesStore((s) => s.setShowFloorPlan);
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={() => setShowFloorPlan(false)}
      className="absolute left-6 top-6 z-50 flex items-center gap-2 rounded-full
        bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-xl
        ring-1 ring-white/20 hover:bg-white/15 touch-manipulation"
    >
      <ArrowLeft className="size-4" />
      Retour à la fiche
    </motion.button>
  );
}
