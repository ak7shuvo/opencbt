import Link from "next/link";
import { Community } from "@/lib/types";

export default function CommunityCard({ community }: { community: Community }) {
  return (
    <Link
      href={`/communities/${community.id}`}
      className="block border-b border-forest/10 py-6 first:pt-0"
    >
      <h3 className="font-display text-lg text-forest">{community.name}</h3>
      <p className="text-sm text-ink/60">{community.location}</p>
      {community.culture && (
        <p className="mt-2 max-w-md text-sm text-ink/70">{community.culture}</p>
      )}
      {community.verified && (
        <span className="mt-2 inline-block text-xs text-river">Verified</span>
      )}
    </Link>
  );
}
