import Link from "next/link";

type HubArtefact = {
  label: string;
  href: string;
  external?: boolean;
};

const ARTEFACTS: HubArtefact[] = [
  { label: "Sodexo Labs", href: "/labs" },
  { label: "Persona Studio", href: "/studio" },
  { label: "Spark Standard Offer", href: "/en" },
  { label: "Demo Thales", href: "/en/demos/thales" },
  { label: "Demo Lenôtre", href: "/en/demos/lenotre" },
  { label: "Spark OS wireframe", href: "/en/demos/spark-os-wireframe" },
  { label: "Spark XP wireframe", href: "/en/demos/spark-xp-wireframe" },
  {
    label: "CoDesign OS",
    href: "https://sodexo-codesign-os.vercel.app/",
    external: true,
  },
  {
    label: "CoDesign credentials",
    href: "https://sodexo-codesign-os.vercel.app/credentials",
    external: true,
  },
];

const linkClassName =
  "labs-display group inline-flex items-baseline gap-3 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.15] text-[var(--labs-navy)] transition-colors hover:text-[var(--labs-blue)] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--labs-blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--labs-paper)]";

export function HubHome() {
  return (
    <main className="labs-body relative flex min-h-screen flex-col justify-center px-[6vw] py-[10vh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 15% 8%, color-mix(in srgb, var(--labs-teal) 14%, transparent), transparent 52%), radial-gradient(ellipse 65% 45% at 88% 92%, color-mix(in srgb, var(--labs-navy) 12%, transparent), transparent 48%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <p className="mb-4 text-sm font-medium tracking-[0.18em] text-[var(--labs-muted)] uppercase">
          Sodexo CoDesign
        </p>
        <h1 className="labs-display mb-4 text-[clamp(2.75rem,7vw,5rem)] leading-[1.02] text-[var(--labs-ink)]">
          CoDesign sandbox
        </h1>
        <p className="mb-14 max-w-lg text-lg text-[var(--labs-muted)]">
          Workshop artefacts and live previews for the CoDesign team.
        </p>

        <nav aria-label="Sandbox artefacts">
          <ul className="flex flex-col gap-5 sm:gap-6">
            {ARTEFACTS.map((artefact) => (
              <li key={artefact.href}>
                {artefact.external ? (
                  <a
                    href={artefact.href}
                    className={linkClassName}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{artefact.label}</span>
                    <span
                      aria-hidden
                      className="labs-body text-base font-medium tracking-normal text-[var(--labs-muted)] transition-colors group-hover:text-[var(--labs-blue)]"
                    >
                      ↗
                    </span>
                  </a>
                ) : (
                  <Link href={artefact.href} className={linkClassName}>
                    {artefact.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
