import { OutlinedHeadline } from "@/components/brand/outlined-headline";

export default function CoDesignPage() {
  return (
    <div className="bg-[var(--spark-paper)] text-[var(--spark-ink)]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        <OutlinedHeadline solid="CoDesign" outline="Methodology" />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
          CoDesign methodology page lands in Phase 7.
        </p>
      </div>
    </div>
  );
}

