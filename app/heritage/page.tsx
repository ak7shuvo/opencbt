import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { HeritageContent } from "@/lib/types";
import { FALLBACK_HERITAGE } from "@/lib/fallback-data";
import HeritageCard from "@/components/heritage-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Heritage Archive — OpenCBT",
  description:
    "Folk stories, music, food, craft, and festival knowledge documented directly with Sylhet's pilot communities — an open, growing intangible heritage archive.",
};

const types = ["story", "music", "food", "craft", "festival"];

export default async function Heritage({
  searchParams,
}: {
  searchParams: { community_id?: string; type?: string };
}) {
  const supabase = createClient();
  let query = supabase
    .from("heritage_content")
    .select("*")
    .order("created_at", { ascending: false });

  if (searchParams.community_id) query = query.eq("community_id", searchParams.community_id);
  if (searchParams.type) query = query.eq("type", searchParams.type);

  const { data, error } = await query;
  let entries = (data as HeritageContent[] | null)?.length ? (data as HeritageContent[]) : null;
  if (!entries) {
    entries = FALLBACK_HERITAGE.filter(
      (e) =>
        (!searchParams.community_id || e.community_id === searchParams.community_id) &&
        (!searchParams.type || e.type === searchParams.type)
    );
  }
  void error;

  return (
    <div className="py-16">
      <h1 className="font-display text-3xl text-forest">Heritage Archive</h1>
      <p className="mt-2 max-w-md text-sm text-ink/70">
        Folk stories, music, food, craft, and festival knowledge from the
        pilot communities.
      </p>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <a
          href="/heritage"
          className={!searchParams.type ? "text-forest underline" : "text-ink/60"}
        >
          All
        </a>
        {types.map((t) => (
          <a
            key={t}
            href={`/heritage?type=${t}`}
            className={searchParams.type === t ? "text-forest underline" : "text-ink/60"}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </a>
        ))}
      </div>

      {entries.length === 0 && (
        <p className="mt-6 text-sm text-ink/60">
          {searchParams.type
            ? `No ${searchParams.type} entries yet — try another category.`
            : "No entries yet for this filter — try another category."}
        </p>
      )}

      <div className="mt-8">
        {entries.map((e) => (
          <HeritageCard key={e.id} entry={e} />
        ))}
      </div>
    </div>
  );
}
