import { redirect } from "next/navigation";

/** Legacy path — hub now lives at `/`. */
export default function HubRedirectPage() {
  redirect("/");
}
