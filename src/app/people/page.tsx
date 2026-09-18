import { redirect } from "next/navigation";
import { PeopleBoard } from "@/components/people-board/people-board";
import { hasPeopleAccess } from "@/lib/people-board/access";
import { parsePeopleQuery, peopleQueryString } from "@/lib/people-board/query";
import { PEOPLE_SEATS } from "@/lib/people-board/seed";

export default async function PeoplePage({
  searchParams,
}: {
  searchParams: Promise<{
    lane?: string;
    seat?: string;
    view?: string;
    filters?: string;
    whatif?: string;
  }>;
}) {
  const params = await searchParams;
  const initialQuery = parsePeopleQuery(params);
  const next = peopleQueryString(initialQuery);

  if (!(await hasPeopleAccess())) {
    redirect(`/people/unlock?next=${encodeURIComponent(next)}`);
  }

  return <PeopleBoard seats={PEOPLE_SEATS} initialQuery={initialQuery} />;
}
