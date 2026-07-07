"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  Mail,
  Globe,
  Navigation,
  Clock,
  MapPin,
  Train,
  TramFront,
  Bus,
  Footprints,
  Car,
  SquareParking,
  Zap,
  Accessibility,
  ChevronRight,
  LocateFixed,
  ExternalLink,
} from "lucide-react";
import {
  SCHOOL,
  LINES,
  JOURNEYS,
  CAR,
  ACCESSIBILITY,
  buildMapEmbedSrc,
  buildDirectionsUrl,
  type Journey,
  type TransitLine,
} from "@/lib/lenotre/access-data";
import { cn } from "@/lib/utils";

type Tab = "transit" | "car" | "info";
type MapMode = "live" | "plan";

/** Lenôtre brand tokens (2019 identity — black on white, golden yellow). */
const GOLD = "#B28F3C";

const CATEGORY_LABEL: Record<Journey["category"], string> = {
  gare: "Gares parisiennes",
  aeroport: "Aéroports",
  hub: "Pôles & hubs",
};

const CATEGORY_ORDER: Journey["category"][] = ["gare", "aeroport", "hub"];

function NetworkIcon({ network, className }: { network: TransitLine["network"]; className?: string }) {
  if (network === "Tram") return <TramFront className={className} aria-hidden />;
  if (network === "Bus") return <Bus className={className} aria-hidden />;
  return <Train className={className} aria-hidden />;
}

function LineBadge({ line, size = "md" }: { line: TransitLine; size?: "sm" | "md" }) {
  const isPill = line.network === "Bus" || line.code.length > 2;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-extrabold leading-none shadow-sm ring-1 ring-black/5",
        size === "sm" ? "text-[10px]" : "text-xs",
        isPill ? "rounded-md px-1.5" : "rounded-full",
        !isPill && (size === "sm" ? "size-5" : "size-6"),
        isPill && (size === "sm" ? "h-5 min-w-5" : "h-6 min-w-6"),
      )}
      style={{ backgroundColor: line.color, color: line.textColor }}
    >
      {line.code}
    </span>
  );
}

/** Compute whether the school is currently open (Europe/Paris, Mon–Fri 7h30–18h00). */
function useOpenState() {
  return useMemo(() => {
    const now = new Date();
    const paris = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Paris" }));
    const day = paris.getDay();
    const minutes = paris.getHours() * 60 + paris.getMinutes();
    const open =
      (SCHOOL.hours.days as readonly number[]).includes(day) &&
      minutes >= SCHOOL.hours.openMinutes &&
      minutes < SCHOOL.hours.closeMinutes;
    return { open };
  }, []);
}

export function LenotreAccessApp({ backHref }: { backHref?: string }) {
  const [tab, setTab] = useState<Tab>("transit");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapMode, setMapMode] = useState<MapMode>("live");
  const { open } = useOpenState();

  const selected = JOURNEYS.find((j) => j.id === selectedId) ?? null;

  const mapSrc = useMemo(() => {
    if (tab === "transit" && selected) return buildMapEmbedSrc(selected.originQuery);
    return buildMapEmbedSrc();
  }, [tab, selected]);

  const grouped = useMemo(
    () =>
      CATEGORY_ORDER.map((cat) => ({
        cat,
        items: JOURNEYS.filter((j) => j.category === cat),
      })).filter((g) => g.items.length > 0),
    [],
  );

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#FBFAF5] text-[#1A1A18] md:flex-row-reverse">
      {/* ─── Map surface ─────────────────────────────────────────────── */}
      <div className="relative min-h-0 flex-1 bg-[#F5F2E9]">
        {/* Interactive Google map stays mounted to preserve directions state */}
        <iframe
          key={mapSrc}
          title="Plan d'accès interactif École Lenôtre"
          src={mapSrc}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <AnimatePresence>
          {mapMode === "plan" && (
            <motion.div
              key="plan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex flex-col overflow-auto bg-[#FBFAF5] p-4 md:p-8"
            >
              <div className="relative mx-auto flex w-full max-w-3xl flex-1 items-center justify-center">
                <Image
                  src="/lenotre/access-map.png"
                  alt="Plan d'accès officiel de l'École des Arts Culinaires Lenôtre — réseau de transport francilien"
                  width={1356}
                  height={1402}
                  priority
                  className="h-auto w-full object-contain"
                />
              </div>
              <p className="mt-3 shrink-0 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-[#1A1A18]/40">
                Plan d&apos;accès officiel Lenôtre
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map mode toggle */}
        <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 md:left-6 md:translate-x-0">
          <div className="flex items-center gap-0.5 rounded-full border border-[#1A1A18]/10 bg-white/90 p-0.5 shadow-sm backdrop-blur-md">
            {(
              [
                { id: "live" as const, label: "Interactif" },
                { id: "plan" as const, label: "Plan Lenôtre" },
              ]
            ).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMapMode(m.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors",
                  mapMode === m.id
                    ? "bg-[#1A1A18] text-white"
                    : "text-[#1A1A18]/55 hover:text-[#1A1A18]",
                )}
                aria-pressed={mapMode === m.id}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Destination chip */}
        {mapMode === "live" && (
          <div className="pointer-events-none absolute right-4 top-4 z-10 hidden md:block">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[#1A1A18]/10 bg-white/90 px-3 py-1.5 text-[11px] font-medium text-[#1A1A18] shadow-sm backdrop-blur-md">
              <MapPin className="size-3.5" style={{ color: GOLD }} aria-hidden />
              <span className="truncate">
                {selected ? `Trajet · ${selected.origin}` : "9 rue de Villeneuve, Rungis"}
              </span>
            </div>
          </div>
        )}

        {mapMode === "live" && selected && (
          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 md:left-6 md:translate-x-0">
            <a
              href={buildDirectionsUrl(selected.originQuery, "transit")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#1A1A18] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-black/20 transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Navigation className="size-4" style={{ color: GOLD }} aria-hidden />
              Itinéraire en direct
              <ExternalLink className="size-3.5 opacity-60" aria-hidden />
            </a>
          </div>
        )}
      </div>

      {/* ─── Journey planner panel ───────────────────────────────────── */}
      <aside className="relative z-20 flex max-h-[62dvh] w-full shrink-0 flex-col border-t border-[#1A1A18]/10 bg-white md:max-h-none md:h-full md:w-[400px] md:border-l md:border-t-0">
        {/* Header */}
        <header className="shrink-0 border-b border-[#1A1A18]/8 px-5 pb-4 pt-4">
          <div className="mb-3 flex items-center justify-between">
            {backHref ? (
              <Link
                href={backHref}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#1A1A18]/10 bg-[#FBFAF5] px-3 py-1.5 text-[11px] font-medium text-[#1A1A18]/70 transition-colors hover:border-[#1A1A18]/25 hover:text-[#1A1A18]"
              >
                <ArrowLeft className="size-3" aria-hidden />
                Standard Offer
              </Link>
            ) : (
              <span />
            )}
            <span
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ring-1",
                open
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                  : "bg-[#1A1A18]/5 text-[#1A1A18]/45 ring-[#1A1A18]/10",
              )}
            >
              {open ? "Ouvert" : "Fermé"}
            </span>
          </div>

          {/* Official Lenôtre logo */}
          <div className="flex flex-col items-center py-1 text-center">
            <Image
              src="/lenotre/logo.png"
              alt="École des Arts Culinaires Lenôtre Paris"
              width={470}
              height={584}
              priority
              className="h-24 w-auto object-contain"
            />
          </div>

          <p className="mt-2 flex items-center justify-center gap-1.5 text-[12px] text-[#1A1A18]/55">
            <MapPin className="size-3.5 shrink-0" style={{ color: GOLD }} aria-hidden />
            {SCHOOL.addressLines.join(", ")}
          </p>

          {/* Quick actions */}
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[
              { icon: Navigation, label: "Itinéraire", href: buildDirectionsUrl(undefined, "transit") },
              { icon: Phone, label: "Appeler", href: SCHOOL.phoneHref },
              { icon: Mail, label: "Email", href: `mailto:${SCHOOL.email}` },
              { icon: Globe, label: "Site", href: SCHOOL.websiteHref },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex flex-col items-center gap-1 rounded-xl border border-[#1A1A18]/8 bg-[#FBFAF5] py-2.5 text-[10px] font-medium text-[#1A1A18]/70 transition-colors hover:border-[#B28F3C]/40 hover:bg-[#F4EEDD] hover:text-[#1A1A18]"
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </a>
            ))}
          </div>
        </header>

        {/* Tabs */}
        <nav className="flex shrink-0 gap-1 border-b border-[#1A1A18]/8 px-3 pt-2" aria-label="Modes d'accès">
          {(
            [
              { id: "transit" as const, label: "Transports", icon: Train },
              { id: "car" as const, label: "En voiture", icon: Car },
              { id: "info" as const, label: "Infos", icon: Clock },
            ]
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "relative flex flex-1 items-center justify-center gap-1.5 rounded-t-lg px-2 py-2.5 text-xs font-semibold transition-colors",
                tab === id ? "text-[#1A1A18]" : "text-[#1A1A18]/40 hover:text-[#1A1A18]/70",
              )}
              aria-current={tab === id ? "true" : undefined}
            >
              <Icon className="size-3.5" aria-hidden />
              {label}
              {tab === id && (
                <motion.span
                  layoutId="lenotre-tab-underline"
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full"
                  style={{ backgroundColor: GOLD }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3">
          <AnimatePresence mode="wait">
            {tab === "transit" && (
              <motion.div
                key="transit"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <a
                  href={buildDirectionsUrl(undefined, "transit")}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-3 flex items-center gap-2.5 rounded-xl border border-dashed border-[#B28F3C]/50 bg-[#F4EEDD]/60 px-3 py-2.5 text-xs font-medium text-[#7a6222] transition-colors hover:bg-[#F4EEDD]"
                >
                  <LocateFixed className="size-4 shrink-0" aria-hidden />
                  Partir de ma position actuelle
                  <ChevronRight className="ml-auto size-4 opacity-60" aria-hidden />
                </a>

                {grouped.map((group) => (
                  <div key={group.cat} className="mb-4">
                    <p className="mb-1.5 px-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A1A18]/35">
                      {CATEGORY_LABEL[group.cat]}
                    </p>
                    <div className="space-y-1.5">
                      {group.items.map((j) => (
                        <JourneyCard
                          key={j.id}
                          journey={j}
                          expanded={selectedId === j.id}
                          onToggle={() =>
                            setSelectedId((cur) => (cur === j.id ? null : j.id))
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {tab === "car" && (
              <motion.div
                key="car"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="space-y-3"
              >
                <a
                  href={buildDirectionsUrl(undefined, "driving")}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-[#1A1A18] px-4 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.01] active:scale-95"
                >
                  <Navigation className="size-4" style={{ color: GOLD }} aria-hidden />
                  Lancer l&apos;itinéraire voiture
                  <ExternalLink className="ml-auto size-4 opacity-60" aria-hidden />
                </a>

                <InfoBlock icon={Car} title="Grands axes">
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {CAR.routes.map((r) => (
                      <span
                        key={r}
                        className="rounded-md bg-[#1A1A18]/5 px-2 py-1 text-[11px] font-bold text-[#1A1A18]/75 ring-1 ring-[#1A1A18]/10"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                  <p className="text-[12px] leading-relaxed text-[#1A1A18]/60">{CAR.guidance}</p>
                </InfoBlock>

                <InfoBlock icon={SquareParking} title="Stationnement">
                  <p className="text-[12px] leading-relaxed text-[#1A1A18]/60">{CAR.parking}</p>
                </InfoBlock>

                <InfoBlock icon={Zap} title="Recharge électrique">
                  <p className="text-[12px] leading-relaxed text-[#1A1A18]/60">{CAR.charging}</p>
                </InfoBlock>
              </motion.div>
            )}

            {tab === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="space-y-3"
              >
                <InfoBlock icon={Clock} title="Horaires">
                  <p className="text-[13px] font-semibold text-[#1A1A18]/85">{SCHOOL.hoursLabel}</p>
                  <p className="mt-1 text-[12px] text-[#1A1A18]/50">{SCHOOL.district}</p>
                </InfoBlock>

                <InfoBlock icon={MapPin} title="Adresse">
                  <p className="text-[13px] text-[#1A1A18]/80">{SCHOOL.addressLines.join(" · ")}</p>
                </InfoBlock>

                <InfoBlock icon={Accessibility} title="Accessibilité & handicap">
                  <p className="text-[12px] leading-relaxed text-[#1A1A18]/60">{ACCESSIBILITY}</p>
                </InfoBlock>

                <div className="grid grid-cols-1 gap-2">
                  <ContactRow icon={Phone} label={SCHOOL.phone} href={SCHOOL.phoneHref} />
                  <ContactRow icon={Mail} label={SCHOOL.email} href={`mailto:${SCHOOL.email}`} />
                  <ContactRow icon={Globe} label={SCHOOL.website} href={SCHOOL.websiteHref} external />
                </div>

                <p className="pt-1 text-center font-serif text-[12px] italic tracking-wide" style={{ color: GOLD }}>
                  {SCHOOL.hashtag}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </div>
  );
}

function JourneyCard({
  journey,
  expanded,
  onToggle,
}: {
  journey: Journey;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border transition-colors",
        expanded
          ? "border-[#B28F3C]/45 bg-[#F4EEDD]/45"
          : "border-[#1A1A18]/10 bg-white hover:border-[#1A1A18]/20 hover:bg-[#FBFAF5]",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
        aria-expanded={expanded}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-[#1A1A18]/90">{journey.origin}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1">
            {journey.legs.map((leg, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="size-3 text-[#1A1A18]/25" aria-hidden />}
                <LineBadge line={LINES[leg.lineId]} size="sm" />
              </span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <span className="text-[12px] font-bold" style={{ color: GOLD }}>
            {journey.duration}
          </span>
          <ChevronRight
            className={cn(
              "size-4 text-[#1A1A18]/30 transition-transform",
              expanded && "rotate-90",
            )}
            style={expanded ? { color: GOLD } : undefined}
            aria-hidden
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#1A1A18]/10 px-3 pb-3 pt-3">
              <ol className="relative ml-1 space-y-0">
                <RouteNode label={journey.origin} sub="Départ" head />
                {journey.legs.map((leg, i) => {
                  const line = LINES[leg.lineId];
                  return (
                    <li key={i} className="relative flex gap-3 pb-3 pl-0">
                      <span className="relative flex w-6 justify-center">
                        <span
                          className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 rounded-full"
                          style={{ backgroundColor: line.color }}
                        />
                      </span>
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center gap-2">
                          <LineBadge line={line} size="sm" />
                          <span className="flex items-center gap-1 text-[11px] font-medium text-[#1A1A18]/60">
                            <NetworkIcon network={line.network} className="size-3" />
                            {line.network} {line.code}
                          </span>
                          {leg.note && (
                            <span className="ml-auto text-[11px] text-[#1A1A18]/40">{leg.note}</span>
                          )}
                        </div>
                        <p className="mt-1 text-[12px] text-[#1A1A18]/70">
                          Descendre à <span className="font-semibold text-[#1A1A18]/90">{leg.to}</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
                <li className="relative flex gap-3 pl-0">
                  <span className="relative flex w-6 justify-center">
                    <span className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-[#F4EEDD] ring-2 ring-[#B28F3C]/50">
                      <Footprints className="size-3" style={{ color: GOLD }} aria-hidden />
                    </span>
                  </span>
                  <div className="flex-1 pt-1">
                    <p className="text-[12px] text-[#1A1A18]/70">
                      Marche jusqu&apos;à <span className="font-semibold text-[#1A1A18]/90">l&apos;École Lenôtre</span>
                    </p>
                    <p className="text-[11px] text-[#1A1A18]/40">
                      Arrêt {journey.arrivalStop} · Parc d&apos;Affaires ICADE
                    </p>
                  </div>
                </li>
              </ol>

              <a
                href={buildDirectionsUrl(journey.originQuery, "transit")}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#1A1A18] py-2 text-[12px] font-bold text-white transition-colors hover:bg-[#333]"
              >
                <Navigation className="size-3.5" style={{ color: GOLD }} aria-hidden />
                Ouvrir dans Google Maps
                <ExternalLink className="size-3 opacity-60" aria-hidden />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RouteNode({ label, sub, head }: { label: string; sub: string; head?: boolean }) {
  return (
    <li className="relative flex gap-3 pb-3 pl-0">
      <span className="relative flex w-6 justify-center">
        <span
          className={cn("mt-0.5 size-3 rounded-full ring-2")}
          style={
            head
              ? { backgroundColor: GOLD, boxShadow: `0 0 0 3px ${GOLD}22` }
              : { backgroundColor: "rgba(26,26,24,0.4)" }
          }
        />
      </span>
      <div className="flex-1">
        <p className="text-[12px] font-semibold text-[#1A1A18]/90">{label}</p>
        <p className="text-[11px] text-[#1A1A18]/40">{sub}</p>
      </div>
    </li>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#1A1A18]/8 bg-white p-3.5">
      <div className="mb-2 flex items-center gap-2">
        <span
          className="flex size-7 items-center justify-center rounded-lg bg-[#F4EEDD]"
          style={{ color: GOLD }}
        >
          <Icon className="size-4" />
        </span>
        <h3 className="text-[13px] font-bold text-[#1A1A18]/90">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
  external,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel="noreferrer"
      className="flex items-center gap-3 rounded-xl border border-[#1A1A18]/8 bg-white px-3.5 py-2.5 text-[13px] text-[#1A1A18]/75 transition-colors hover:border-[#B28F3C]/40 hover:bg-[#FBFAF5] hover:text-[#1A1A18]"
    >
      <Icon className="size-4 shrink-0" style={{ color: GOLD }} aria-hidden />
      <span className="truncate">{label}</span>
      <ChevronRight className="ml-auto size-4 shrink-0 opacity-40" aria-hidden />
    </a>
  );
}
