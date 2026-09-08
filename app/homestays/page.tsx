import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Homestay } from "@/lib/types";
import { FALLBACK_HOMESTAYS } from "@/lib/fallback-data";
import HomestayCard from "@/components/homestay-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Homestays — OpenCBT",
  description:
    "Family-run rooms across the Sylhet pilot region — stay with a Khasia Punji, tea garden, or riverside host family and put your visit directly into the local economy.",
};

export default async function Homestays({
  searchParams,
}: {
  searchParams: { community_id?: string };
}) {
  const supabase = createClient();
  let query = supabase
    .from("homestays")
    .select("*")
    .order("created_at", { ascending: false });

  if (searchParams.community_id) {
    query = query.eq("community_id", searchParams.community_id);
  }

  const { data, error } = await query;
  let homestays = (data as Homestay[] | null)?.length ? (data as Homestay[]) : null;
  if (!homestays) {
    homestays = searchParams.community_id
      ? FALLBACK_HOMESTAYS.filter((h) => h.community_id === searchParams.community_id)
      : FALLBACK_HOMESTAYS;
  }
  void error;

  return (
    <div className="py-16">
      <h1 className="font-display text-3xl text-forest">Homestays</h1>
      <p className="mt-2 max-w-md text-sm text-ink/70">
        Family-run rooms across the pilot region — meals and hospitality
        included, income going straight to the host family.
      </p>

      <div className="mt-8">
        {homestays.map((h) => (
          <HomestayCard key={h.id} homestay={h} />
        ))}
      </div>
    </div>
  );
}
