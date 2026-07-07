import type { Metadata, Viewport } from "next";
import { LenotreAccessApp } from "@/components/lenotre-access-app";

export const metadata: Metadata = {
  title: "Accès — École Lenôtre · Arts Culinaires",
  description:
    "Plan d'accès interactif de l'École des Arts Culinaires Lenôtre à Rungis. Itinéraires en transports en commun, en voiture, horaires et infos pratiques.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function LenotreDemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <LenotreAccessApp backHref={`/${locale}`} />;
}
