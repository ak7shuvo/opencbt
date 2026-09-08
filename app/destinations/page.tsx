import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Destination } from "@/lib/types";
import { FALLBACK_DESTINATIONS } from "@/lib/fallback-data";
import DestinationCard from "@/components/destination-card";
import DestinationsMapLoader from "@/components/map-loader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Destinations — OpenCBT",
  description:
    "Jaflong's river landscape, Khasia Punji, the Sylhet tea garden belt, and more — pilot destinations for community based tourism in Sylhet, Bangladesh.",
};

export default async function Destinations() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .order("name", { ascending: true });

  const destinations = (data as Destination[] | null)?.length
    ? (data as Destination[])
    : FALLBACK_DESTINATIONS;
  void error;

  return (
    <div className="py-16">
      <h1 className="font-display text-3xl text-forest">Destinations</h1>
      <p className="mt-2 max-w-md text-sm text-ink/70">
        The Sylhet pilot area: Jaflong, Khasia Punji, Rena, the tea garden
        belt, and nearby river and forest sites.
      </p>

      {destinations.length > 0 && (
        <div className="mt-8">
          <DestinationsMapLoader
            points={destinations
              .filter((d) => d.lat != null && d.lng != null)
              .map((d) => ({
                id: d.id,
                name: d.name,
                slug: d.slug,
                lat: d.lat as number,
                lng: d.lng as number,
                region: d.region,
              }))}
          />
        </div>
      )}

      <div className="mt-8">
        {destinations.map((d) => (
          <DestinationCard key={d.id} destination={d} />
        ))}
      </div>
    </div>
  );
}
