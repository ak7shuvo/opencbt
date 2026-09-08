import Link from "next/link";
import { Destination } from "@/lib/types";

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="block border-b border-forest/10 py-6 first:pt-0"
    >
      <h3 className="font-display text-lg text-forest">{destination.name}</h3>
      {destination.region && (
        <p className="text-sm text-ink/60">{destination.region}</p>
      )}
      {destination.description && (
        <p className="mt-2 max-w-md text-sm text-ink/70">{destination.description}</p>
      )}
    </Link>
  );
}
