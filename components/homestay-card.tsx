import Link from "next/link";
import { Homestay } from "@/lib/types";

export default function HomestayCard({ homestay }: { homestay: Homestay }) {
  return (
    <Link
      href={`/homestays/${homestay.id}`}
      className="block border-b border-forest/10 py-6 first:pt-0"
    >
      <h3 className="font-display text-lg text-forest">{homestay.family_name}</h3>
      <p className="text-sm text-ink/60">
        {homestay.rooms != null
          ? `${homestay.rooms} room${homestay.rooms === 1 ? "" : "s"}`
          : "Room count not listed yet"}
        {homestay.price != null ? ` · ৳${homestay.price}/night` : ""}
      </p>
    </Link>
  );
}
