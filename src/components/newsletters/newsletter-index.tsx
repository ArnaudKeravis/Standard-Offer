import Image from "next/image";
import Link from "next/link";
import { NEWSLETTER_ISSUES } from "@/lib/newsletters/registry";

export function NewsletterIndex() {
  return (
    <main className="relative min-h-screen">
      <section className="border-b border-[var(--spark-line)] bg-[var(--spark-ink-deep)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
          <Link
            href="/"
            className="mb-8 inline-flex text-xs font-semibold tracking-[0.18em] text-[color:color-mix(in_oklab,white,transparent_35%)] transition-colors hover:text-white"
          >
            ← Hub
          </Link>
          <p className="text-xs font-semibold tracking-[0.2em] text-[color:color-mix(in_oklab,white,transparent_35%)]">
            CoDesign · Labs
          </p>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl tracking-[-0.03em] md:text-5xl">
            Newsletters
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[color:color-mix(in_oklab,white,transparent_28%)] md:text-lg">
            Year-in-review and Labs issues for CoDesign — start with the FY26
            retrospective.
          </p>
        </div>
      </section>

      <section className="bg-[var(--spark-paper)]">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-12 md:py-16">
          {NEWSLETTER_ISSUES.length === 0 ? (
            <p className="text-base text-[color:color-mix(in_oklab,var(--spark-ink),transparent_32%)]">
              No issues yet.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
              {NEWSLETTER_ISSUES.map((issue) => (
                <li key={issue.id}>
                  <a
                    href={issue.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--spark-line)] bg-white shadow-[0_18px_40px_rgba(14,26,74,0.06)] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--spark-amber)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--spark-paper)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--spark-ink-deep)]">
                      {issue.coverImage ? (
                        <Image
                          src={issue.coverImage.src}
                          alt={issue.coverImage.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div
                          aria-hidden
                          className="absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--spark-iq), transparent 20%), transparent 70%), var(--spark-ink-deep)",
                          }}
                        />
                      )}
                      <div
                        aria-hidden
                        className="absolute left-0 top-0 h-1 w-full bg-[var(--spark-iq)]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <p className="text-[10px] font-semibold tracking-[0.16em] text-[color:color-mix(in_oklab,var(--spark-ink),transparent_45%)] uppercase">
                        {issue.period}
                      </p>
                      <h2 className="mt-2 font-[var(--font-display)] text-xl tracking-[-0.03em] text-[var(--spark-ink)]">
                        {issue.title}
                      </h2>
                      {issue.subtitle ? (
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
                          {issue.subtitle}
                        </p>
                      ) : null}
                      <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[var(--spark-ink)]">
                        Open
                        <span aria-hidden className="text-[var(--spark-amber)]">
                          →
                        </span>
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
