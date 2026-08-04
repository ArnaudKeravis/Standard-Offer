import { LabsSession } from "@/components/sodexo-labs/labs-session";
import { parseLabsSession } from "@/lib/sodexo-labs/parse-session";
import { resolveLabsPack } from "@/lib/sodexo-labs/resolve-pack";

export default async function LabsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const parsed = parseLabsSession(params);
  const initialPack =
    parsed.audience && parsed.area
      ? resolveLabsPack({ audience: parsed.audience, area: parsed.area })
      : null;

  return (
    <LabsSession
      initialAudience={parsed.audience}
      initialArea={parsed.area}
      initialPack={initialPack}
    />
  );
}
