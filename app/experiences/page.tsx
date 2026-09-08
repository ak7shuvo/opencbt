import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Experience } from "@/lib/types";
import { FALLBACK_EXPERIENCES } from "@/lib/fallback-data";
import ExperienceCard from "@/components/experience-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experiences — OpenCBT",
  description:
    "Tea garden walks, Khasia cultural visits, traditional cooking, and river-side nature trails — book experiences led directly by Sylhet's host communities.",
};

export default async function Experiences({
  searchParams,
}: {
  searchParams: { community_id?: string };
}) {
  const supabase = createClient();
  let query = supabase
    .from("experiences")
    .select("*")
    .order("created_at", { ascending: false });

  if (searchParams.community_id) {
    query = query.eq("community_id", searchParams.community_id);
  }

  const { data, error } = await query;
  let experiences = (data as Experience[] | null)?.length ? (data as Experience[]) : null;
  if (!experiences) {
    experiences = searchParams.community_id
      ? FALLBACK_EXPERIENCES.filter((e) => e.community_id === searchParams.community_id)
      : FALLBACK_EXPERIENCES;
  }
  void error;

  return (
    <div className="py-16">
      <h1 className="font-display text-3xl text-forest">Experiences</h1>
      <p className="mt-2 max-w-md text-sm text-ink/70">
        Tea garden walks, Khasia cultural visits, traditional cooking, and
        river-side nature trails.
      </p>

      <div className="mt-8">
        {experiences.map((e) => (
          <ExperienceCard key={e.id} experience={e} />
        ))}
      </div>
    </div>
  );
}
