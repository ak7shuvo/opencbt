import Link from "next/link";
import { HeritageContent } from "@/lib/types";

const typeLabels: Record<string, string> = {
  story: "Folk story",
  music: "Music",
  food: "Food",
  craft: "Craft",
  festival: "Festival",
};

export default function HeritageCard({ entry }: { entry: HeritageContent }) {
  return (
    <Link
      href={`/heritage/${entry.id}`}
      className="block border-b border-forest/10 py-6 first:pt-0"
    >
      <span className="text-xs uppercase tracking-wide text-turmeric">
        {typeLabels[entry.type] ?? entry.type}
      </span>
      <h3 className="mt-1 font-display text-lg text-forest">{entry.title}</h3>
      {entry.description && (
        <p className="mt-2 max-w-md text-sm text-ink/70">{entry.description}</p>
      )}
    </Link>
  );
}
