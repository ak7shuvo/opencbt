import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Destination } from "@/lib/types";
import { FALLBACK_DESTINATIONS } from "@/lib/fallback-data";
import DestinationsMapLoader from "@/components/map-loader";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase
    .from("destinations")
    .select("name, description, region")
    .eq("slug", params.slug)
    .single();

  if (!data) return { title: "Destination — OpenCBT" };

  return {
    title: `${data.name} — OpenCBT`,
    description: data.description ?? `${data.name} in ${data.region ?? "Sylhet"}, part of the OpenCBT pilot.`,
  };
}

export default async function DestinationDetail({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !data) {
    const fallback = FALLBACK_DESTINATIONS.find((d) => d.slug === params.slug);
    if (!fallback) notFound();
    return <DestinationView destination={fallback} />;
  }

  return <DestinationView destination={data as Destination} />;
}

function DestinationView({ destination }: { destination: Destination }) {
  return (
    <div className="py-16">
      <h1 className="font-display text-3xl text-forest">{destination.name}</h1>
      {destination.region && (
        <p className="mt-1 text-sm text-ink/60">{destination.region}</p>
      )}
      {destination.description && (
        <p className="mt-6 max-w-lg text-sm text-ink/80">{destination.description}</p>
      )}

      {destination.lat != null && destination.lng != null && (
        <div className="mt-8 max-w-lg">
          <DestinationsMapLoader
            points={[
              {
                id: destination.id,
                name: destination.name,
                slug: destination.slug,
                lat: destination.lat,
                lng: destination.lng,
                region: destination.region,
              },
            ]}
            center={[destination.lat, destination.lng]}
            zoom={13}
            linkToDetail={false}
            className="h-64 w-full"
          />
        </div>
      )}
    </div>
  );
}
