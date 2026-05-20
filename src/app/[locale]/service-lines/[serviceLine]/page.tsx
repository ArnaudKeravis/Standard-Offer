import { OutlinedHeadline } from "@/components/brand/outlined-headline";

export default async function ServiceLinePage({
  params,
}: {
  params: Promise<{ serviceLine: string }>;
}) {
  const { serviceLine } = await params;
  return (
    <div className="bg-[var(--spark-paper)] text-[var(--spark-ink)]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        <OutlinedHeadline solid="Service line" outline={serviceLine} />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:color-mix(in_oklab,var(--spark-ink),transparent_35%)]">
          Service-line landing pages land in Phase 5.
        </p>
      </div>
    </div>
  );
}

