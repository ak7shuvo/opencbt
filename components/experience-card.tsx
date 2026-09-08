import Link from "next/link";
import { Experience } from "@/lib/types";

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link
      href={`/experiences/${experience.id}`}
      className="block border-b border-forest/10 py-6 first:pt-0"
    >
      <h3 className="font-display text-lg text-forest">{experience.title}</h3>
      <p className="text-sm text-ink/60">
        {experience.duration ?? "Duration not listed yet"}
        {experience.price != null ? ` · ৳${experience.price}` : ""}
      </p>
      {experience.description && (
        <p className="mt-2 max-w-md text-sm text-ink/70">{experience.description}</p>
      )}
    </Link>
  );
}
