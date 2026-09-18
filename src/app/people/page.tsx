import { redirect } from "next/navigation";
import { PeopleBoard } from "@/components/people-board/people-board";
import { hasPeopleAccess } from "@/lib/people-board/access";
import { PEOPLE_SEATS } from "@/lib/people-board/seed";
import { PEOPLE_SIGNALS } from "@/lib/people-board/signals";

export default async function PeoplePage() {
  if (!(await hasPeopleAccess())) {
    redirect("/people/unlock?next=%2Fpeople");
  }

  return <PeopleBoard seats={PEOPLE_SEATS} signals={PEOPLE_SIGNALS} />;
}
