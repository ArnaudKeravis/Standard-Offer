import { redirect } from "next/navigation";

/** Legacy URL — Standard Offer lives at `/[locale]`. */
export default async function DeckRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}`);
}
