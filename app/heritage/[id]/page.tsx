import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { HeritageContent } from "@/lib/types";
import { FALLBACK_HERITAGE } from "@/lib/fallback-data";

export const dynamic = "force-dynamic";

const typeLabels: Record<string, string> = {
  story: "Folk story",
  music: "Music",
  food: "Food",
  craft: "Craft",
  festival: "Festival",
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase
    .from("heritage_content")
    .select("title, description, type")
    .eq("id", params.id)
    .single();

  return {
    title: data ? `${data.title} — OpenCBT` : "Heritage — OpenCBT",
    description: data?.description ?? undefined,
  };
}

export default async function HeritageDetail({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("heritage_content")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    const fallback = FALLBACK_HERITAGE.find((e) => e.id === params.id);
    if (!fallback) notFound();
    return <HeritageView entry={fallback} />;
  }

  return <HeritageView entry={data as HeritageContent} />;
}

function HeritageView({ entry }: { entry: HeritageContent }) {
  return (
    <div className="py-16">
      <span className="text-xs uppercase tracking-wide text-turmeric">
        {typeLabels[entry.type] ?? entry.type}
      </span>
      <h1 className="mt-1 font-display text-3xl text-forest">{entry.title}</h1>

      {entry.description && (
        <p className="mt-6 max-w-lg text-sm text-ink/80">{entry.description}</p>
      )}

      {entry.media_url && (
        <p className="mt-6 text-sm">
          <a href={entry.media_url} className="text-forest underline" target="_blank" rel="noreferrer">
            View media
          </a>
        </p>
      )}
    </div>
  );
}
