import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Community } from "@/lib/types";
import { FALLBACK_COMMUNITIES } from "@/lib/fallback-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase
    .from("communities")
    .select("name, location, culture")
    .eq("id", params.id)
    .single();

  if (!data) return { title: "Community — OpenCBT" };

  return {
    title: `${data.name} — OpenCBT`,
    description: data.culture ?? `${data.name}, ${data.location} — a host community on OpenCBT.`,
  };
}

export default async function CommunityDetail({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    const fallback = FALLBACK_COMMUNITIES.find((c) => c.id === params.id);
    if (!fallback) notFound();
    return <CommunityView community={fallback} />;
  }

  return <CommunityView community={data as Community} />;
}

function CommunityView({ community }: { community: Community }) {
  return (
    <div className="py-16">
      <h1 className="font-display text-3xl text-forest">{community.name}</h1>
      <p className="mt-1 text-sm text-ink/60">{community.location}</p>

      {community.history && (
        <section className="mt-8">
          <h2 className="font-display text-lg text-forest">History</h2>
          <p className="mt-2 max-w-lg text-sm text-ink/80">{community.history}</p>
        </section>
      )}

      {community.culture && (
        <section className="mt-8">
          <h2 className="font-display text-lg text-forest">Culture</h2>
          <p className="mt-2 max-w-lg text-sm text-ink/80">{community.culture}</p>
        </section>
      )}

      <section className="mt-8 space-x-6">
        <a
          href={`/experiences?community_id=${community.id}`}
          className="text-sm text-forest underline"
        >
          View experiences from this community →
        </a>
        <a
          href={`/homestays?community_id=${community.id}`}
          className="text-sm text-forest underline"
        >
          View homestays from this community →
        </a>
        <a
          href={`/heritage?community_id=${community.id}`}
          className="text-sm text-forest underline"
        >
          View heritage archive from this community →
        </a>
      </section>
    </div>
  );
}
