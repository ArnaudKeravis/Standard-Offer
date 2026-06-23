import type { Metadata, Viewport } from "next";
import { ThalesCampusApp } from "@/components/thales-campus-app";

export const metadata: Metadata = {
  title: "Thales Campus — Restauration",
  description:
    "Carte interactive de l'offre restauration du campus Thales. Comparez les espaces, consultez les temps d'attente et explorez les plans détaillés.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function ThalesPage() {
  return <ThalesCampusApp />;
}
