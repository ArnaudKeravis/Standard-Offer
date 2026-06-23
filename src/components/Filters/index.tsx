"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { FILTERS } from "./constants";
import { useThalesStore } from "@/lib/thales/store";

export function Filters() {
  const activeFilters = useThalesStore((s) => s.activeFilters);
  const toggleFilter = useThalesStore((s) => s.toggleFilter);
  const clearFilters = useThalesStore((s) => s.clearFilters);

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {FILTERS.map((filter) => {
        const active = activeFilters.includes(filter.id);
        const Icon = filter.icon;
        return (
          <motion.button
            key={filter.id}
            type="button"
            onClick={() => toggleFilter(filter.id)}
            whileTap={{ scale: 0.95 }}
            className={`
              flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium
              backdrop-blur-xl transition-all duration-300 touch-manipulation
              ${active
                ? "bg-white/20 text-white ring-1 ring-white/40 shadow-lg shadow-white/5"
                : "bg-white/8 text-white/70 ring-1 ring-white/10 hover:bg-white/12 hover:text-white/90"
              }
            `}
          >
            <Icon className="size-4" />
            {filter.label}
          </motion.button>
        );
      })}
      {activeFilters.length > 0 && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={clearFilters}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-2.5 text-sm text-white/60 ring-1 ring-white/10 hover:text-white/90 touch-manipulation"
        >
          <X className="size-3.5" />
          Effacer
        </motion.button>
      )}
    </div>
  );
}
