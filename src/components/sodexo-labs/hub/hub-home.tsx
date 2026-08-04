import Image from "next/image";
import Link from "next/link";

type HubArtefact = {
  id: string;
  label: string;
  description: string;
  href: string;
  cta: string;
  image?: { src: string; alt: string };
  tone: "navy" | "teal" | "blue" | "ink";
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
      src: "/labs/credentials/lilly-1.jpg",
      alt: "Sodexo Labs co-creation space",
    },
    tone: "navy",
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
    tone: "teal",
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
    tone: "blue",
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
    tone: "ink",
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
    tone: "navy",
  },
  {
    id: "spark-os",
    label: "Spark OS wireframe",
    description: "Operator platform wireframe for Spark OS journeys.",
    href: "/en/demos/spark-os-wireframe",
    cta: "Open wireframe",
    tone: "blue",
  },
  {
    id: "spark-xp",
    label: "Spark XP wireframe",
    description: "Experience-layer wireframe for front-stage journeys.",
    href: "/en/demos/spark-xp-wireframe",
    cta: "Open wireframe",
    tone: "teal",
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
    tone: "navy",
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
    tone: "ink",
    external: true,
  },
];

const TONE_GRADIENT: Record<HubArtefact["tone"], string> = {
  navy: "linear-gradient(145deg, #16267A 0%, #1E2F9A 45%, #1968FF 100%)",
  teal: "linear-gradient(145deg, #0E7A74 0%, #2BB8B0 100%)",
  blue: "linear-gradient(145deg, #1968FF 0%, #4C8CFF 100%)",
  ink: "linear-gradient(145deg, #0B1020 0%, #1E2F9A 100%)",
};

function ArtefactCard({ artefact }: { artefact: HubArtefact }) {
  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--labs-navy)]">
        {artefact.image ? (
          <Image
            src={artefact.image.src}
            alt={artefact.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: TONE_GRADIENT[artefact.tone] }}
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[rgba(11,16,32,0.55)] via-transparent to-transparent"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <h2 className="labs-display text-[1.45rem] leading-tight text-[var(--labs-ink)] sm:text-[1.6rem]">
          {artefact.label}
        </h2>
        <p className="flex-1 text-[0.95rem] leading-relaxed text-[var(--labs-muted)]">
          {artefact.description}
        </p>
        <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[var(--labs-blue)] uppercase">
          {artefact.cta}
          <span aria-hidden>{artefact.external ? "↗" : "→"}</span>
        </span>
      </div>
    </>
  );

  const className =
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--labs-navy)_12%,transparent)] bg-white shadow-[0_12px_40px_rgba(30,47,154,0.06)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(30,47,154,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--labs-blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--labs-paper)]";

  if (artefact.external) {
    return (
      <a
        href={artefact.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${artefact.label} — ${artefact.cta} (opens in a new tab)`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={artefact.href}
      className={className}
      aria-label={`${artefact.label} — ${artefact.cta}`}
    >
      {content}
    </Link>
  );
}

export function HubHome() {
  return (
    <main className="labs-body relative min-h-screen px-[5vw] py-[8vh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 12% 0%, color-mix(in srgb, var(--labs-blue) 16%, transparent), transparent 55%), radial-gradient(ellipse 55% 40% at 92% 100%, color-mix(in srgb, var(--labs-teal) 14%, transparent), transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <header className="mb-12 max-w-2xl sm:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-[var(--labs-blue)] uppercase">
            Sodexo · Digital, AI & Innovation
          </p>
          <h1 className="labs-display mb-4 text-[clamp(2.75rem,6.5vw,4.75rem)] leading-[1.02] text-[var(--labs-ink)]">
            CoDesign <em className="font-normal italic text-[var(--labs-navy)]">sandbox</em>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[var(--labs-muted)]">
            Live artefacts for pitches, workshops and Labs sessions — open a card
            to present, explore or build.
          </p>
        </header>

        <nav aria-label="Sandbox artefacts">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {ARTEFACTS.map((artefact) => (
              <li key={artefact.id}>
                <ArtefactCard artefact={artefact} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
