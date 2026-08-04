"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { OutlinedHeadline } from "@/components/brand/outlined-headline";
import { cn } from "@/lib/utils";

type HubArtefact = {
  id: string;
  label: string;
  description: string;
  href: string;
  cta: string;
  image?: { src: string; alt: string };
  accent: string;
  external?: boolean;
};

const ARTEFACTS: HubArtefact[] = [
  {
    id: "labs",
    label: "Sodexo Labs",
    description:
      "Presentation-mode Labs deck — audience & territory gates, animated 16:9 story, credentials room.",
    href: "/labs",
    cta: "Open Labs",
    image: {
      src: "/labs/presentation/cover.jpg",
      alt: "Sodexo Labs co-creation space",
    },
    accent: "bg-[var(--spark-iq)]",
  },
  {
    id: "studio",
    label: "Persona Studio",
    description:
      "Evidence-based personas across Work, Heal, Play and Learn — ready for workshops.",
    href: "/studio",
    cta: "Open Studio",
    image: {
      src: "/persona-studio/areas/areas-isometric.png",
      alt: "Persona Studio XP areas map",
    },
    accent: "bg-[var(--spark-os)]",
  },
  {
    id: "xp-catalogue",
    label: "XP Catalogue",
    description:
      "Digital & AI Innovation Experience Catalogue — areas, solutions, Spark offer and big bets.",
    href: "https://xpcatalogue.vercel.app/",
    cta: "Open catalogue",
    image: {
      src: "/persona-studio/areas/work-area-info-iso.png",
      alt: "XP Catalogue — Work area experience",
    },
    accent: "bg-[var(--spark-xp)]",
    external: true,
  },
  {
    id: "spark",
    label: "Spark Standard Offer",
    description:
      "Internal TDDI selling deck — three Spark layers, outcomes, portfolio and proof.",
    href: "/en",
    cta: "Open deck",
    image: {
      src: "/labs/credentials/microsoft-1.jpg",
      alt: "Spark Standard Offer presentation",
    },
    accent: "bg-[var(--spark-amber)]",
  },
  {
    id: "thales",
    label: "Interactive Map · Thales",
    description:
      "Campus experience demo — spaces, services and culinary journeys on a live map.",
    href: "/en/demos/thales",
    cta: "Open demo",
    image: {
      src: "/labs/credentials/thales-1.jpg",
      alt: "Thales campus experience",
    },
    accent: "bg-[var(--spark-iq)]",
  },
  {
    id: "lenotre",
    label: "Accès École Lenôtre",
    description: "School access and hospitality experience prototype.",
    href: "/en/demos/lenotre",
    cta: "Open demo",
    image: {
      src: "/lenotre/access-map.png",
      alt: "École Lenôtre access map",
    },
    accent: "bg-[var(--spark-xp)]",
  },
  {
    id: "spark-os",
    label: "Spark OS wireframe",
    description: "Operator platform wireframe for Spark OS journeys.",
    href: "/en/demos/spark-os-wireframe",
    cta: "Open wireframe",
    accent: "bg-[var(--spark-os)]",
  },
  {
    id: "spark-xp",
    label: "Spark XP wireframe",
    description: "Experience-layer wireframe for front-stage journeys.",
    href: "/en/demos/spark-xp-wireframe",
    cta: "Open wireframe",
    accent: "bg-[var(--spark-xp)]",
  },
  {
    id: "codesign-os",
    label: "CoDesign OS",
    description:
      "Design-led AI operating system — agents, prompts, credentials and solutioning.",
    href: "https://sodexo-codesign-os.vercel.app/",
    cta: "Enter the OS",
    image: {
      src: "/labs/credentials/astrazeneca-1.jpg",
      alt: "CoDesign OS credentials and method",
    },
    accent: "bg-[var(--spark-iq)]",
    external: true,
  },
  {
    id: "credentials",
    label: "CoDesign credentials",
    description:
      "Live credentials library — filter by sector and region, download branded slides.",
    href: "https://sodexo-codesign-os.vercel.app/credentials",
    cta: "Browse credentials",
    image: {
      src: "/labs/credentials/newcastle-united-1.jpg",
      alt: "CoDesign credentials library",
    },
    accent: "bg-[var(--spark-amber)]",
    external: true,
  },
];

const EASE = [0.25, 1, 0.5, 1] as const;

function ArtefactCard({
  artefact,
  index,
}: {
  artefact: HubArtefact;
  index: number;
}) {
  const reduce = useReducedMotion();
  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--spark-ink-deep)]">
        {artefact.image ? (
          <Image
            src={artefact.image.src}
            alt={artefact.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--spark-iq), transparent 20%), transparent 70%), radial-gradient(circle at 80% 70%, color-mix(in oklab, var(--spark-amber), transparent 35%), transparent 72%), var(--spark-ink-deep)",
            }}
          />
        )}
        <div
          aria-hidden
          className={cn("absolute left-0 top-0 h-1 w-full", artefact.accent)}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[rgba(5,11,46,0.55)] to-transparent"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h2 className="font-[var(--font-display)] text-xl tracking-[-0.03em] text-[var(--spark-ink)]">
          {artefact.label}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
          {artefact.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[var(--spark-ink)] transition-transform duration-300 group-hover:translate-x-0.5">
          {artefact.cta}
          <span aria-hidden className="text-[var(--spark-amber)]">
            {artefact.external ? "↗" : "→"}
          </span>
        </span>
      </div>
    </>
  );

  const className = cn(
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--spark-line)] bg-white",
    "shadow-[0_18px_40px_rgba(14,26,74,0.06)] transition-transform duration-300 hover:-translate-y-1",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--spark-paper)]",
  );

  const motionProps = {
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0 : 0.5,
      delay: reduce ? 0 : 0.05 * index,
      ease: EASE,
    },
  };

  if (artefact.external) {
    return (
      <motion.a
        href={artefact.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${artefact.label} — ${artefact.cta} (opens in a new tab)`}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div {...motionProps}>
      <Link
        href={artefact.href}
        className={className}
        aria-label={`${artefact.label} — ${artefact.cta}`}
      >
        {content}
      </Link>
    </motion.div>
  );
}

export function HubHome() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <section className="relative overflow-hidden bg-[var(--spark-ink-deep)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-1/4 top-1/4 h-[min(80vw,420px)] w-[min(80vw,420px)] rounded-full bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--spark-iq),transparent_20%),transparent_70%)] opacity-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-1/3 bottom-0 h-[min(70vw,360px)] w-[min(70vw,360px)] rounded-full bg-[radial-gradient(circle_at_70%_70%,color-mix(in_oklab,var(--spark-amber),transparent_25%),transparent_72%)] opacity-35"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(90deg,white_1px,transparent_1px),linear-gradient(white_1px,transparent_1px)] [background-size:64px_64px]"
        />

        <div className="relative mx-auto flex min-h-[min(52vh,520px)] max-w-6xl flex-col justify-center px-6 py-20 md:px-12 md:py-24">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[color:color-mix(in_oklab,white,transparent_35%)]">
            Sodexo · Digital, AI & Innovation · CoDesign
          </p>
          <OutlinedHeadline
            tone="dark"
            solid="CoDesign"
            outline="sandbox"
            className="max-w-3xl"
          />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[color:color-mix(in_oklab,white,transparent_28%)] md:text-xl">
            Live artefacts for pitches, workshops and Labs sessions — open a
            card to present, explore or build.
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--spark-line)] bg-[var(--spark-paper)]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)]">
              Artefacts
            </p>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--spark-ink)] md:text-4xl">
              Choose where to go next
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)] md:text-lg">
              Same ecosystem as the Spark deck — Labs, Studio, demos and
              CoDesign OS in one place.
            </p>
          </div>

          <nav aria-label="Sandbox artefacts">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {ARTEFACTS.map((artefact, index) => (
                <li key={artefact.id}>
                  <ArtefactCard artefact={artefact} index={index} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
}
