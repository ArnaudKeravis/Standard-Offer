"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useThalesStore } from "@/lib/thales/store";
import type { Restaurant } from "@/lib/thales/types";
import {
  AFFLUENCE_CONFIG,
  getWaitColor,
  getWaitLabel,
  OFFRE_LABELS,
  WAIT_COLORS,
} from "@/lib/thales/utils";

interface RestaurantDetailProps {
  restaurant: Restaurant;
  isOpen: boolean;
}

export function RestaurantDetail({ restaurant, isOpen }: RestaurantDetailProps) {
  const selectRestaurant = useThalesStore((s) => s.selectRestaurant);
  const setShowFloorPlan = useThalesStore((s) => s.setShowFloorPlan);

  const waitColor = getWaitColor(restaurant.attenteTempsReel);
  const waitStyle = WAIT_COLORS[waitColor];
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
        <div className="relative h-48 shrink-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#0f2847] to-[#0a1628]"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(30,58,138,0.9), rgba(10,22,40,0.95))`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,184,28,0.15),transparent_60%)]" />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <span className="text-xs font-medium uppercase tracking-widest text-amber-400/80">
              {OFFRE_LABELS[restaurant.type]}
            </span>
            <h2 className="mt-1 text-2xl font-bold text-white tracking-tight">
              {restaurant.nom}
            </h2>
            <p className="mt-1 text-sm text-white/60 line-clamp-2">{restaurant.concept}</p>
          </div>
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
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-xl p-4 ${waitStyle.bg} ring-1 ${waitStyle.ring}`}>
              <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                <Clock className="size-3.5" />
                Temps d&apos;attente
              </div>
              <p className={`text-2xl font-bold tabular-nums ${waitStyle.text}`}>
                {getWaitLabel(restaurant.attenteTempsReel)}
              </p>
            </div>
            <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-white/60 text-xs mb-2">
                <Users className="size-3.5" />
                Affluence · {affluence.label}
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
          </div>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
              Offre du jour
            </h3>
            <div className="flex items-start gap-3 rounded-xl bg-amber-500/10 p-4 ring-1 ring-amber-400/20">
              <Sparkles className="size-5 shrink-0 text-amber-400 mt-0.5" />
              <p className="text-sm text-white/90 leading-relaxed">{restaurant.offreDuJour}</p>
            </div>
          </section>

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

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
              Horaires
            </h3>
            <div className="space-y-1.5">
              {restaurant.horaires.map((h, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-white/50">{h.jour}</span>
                  <span className="text-white/90 tabular-nums">
                    {h.ouverture} – {h.fermeture}
                  </span>
                </div>
              ))}
              <p className={`text-xs mt-2 ${isOpen ? "text-emerald-400" : "text-white/40"}`}>
                {isOpen ? "● Ouvert maintenant" : "○ Actuellement fermé"}
              </p>
            </div>
          </section>

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

          <section className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-white/50">
              <Users className="size-4" />
              Capacité
            </div>
            <span className="text-white/90 font-medium">{restaurant.capacite} places</span>
          </section>

          <section className="flex items-start gap-2 text-sm">
            <MapPin className="size-4 shrink-0 text-white/40 mt-0.5" />
            <span className="text-white/70">{restaurant.localisation}</span>
          </section>
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
