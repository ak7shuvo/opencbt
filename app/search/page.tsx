import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { SearchResult } from "@/app/api/search/route";

export const metadata: Metadata = {
  title: "Search — OpenCBT",
  description: "Search destinations, experiences, homestays, heritage entries, and communities across OpenCBT.",
};

const typeLabel: Record<SearchResult["type"], string> = {
  destination: "Destination",
  experience: "Experience",
  homestay: "Homestay",
  heritage: "Heritage",
  community: "Community",
};

async function search(q: string): Promise<SearchResult[]> {
  const supabase = createClient();
  const like = `%${q}%`;

  const [destinations, experiences, homestays, heritage, communities] = await Promise.all([
    supabase.from("destinations").select("id, name, region, slug").ilike("name", like).limit(5),
    supabase.from("experiences").select("id, title, description").ilike("title", like).limit(5),
    supabase.from("homestays").select("id, family_name").ilike("family_name", like).limit(5),
    supabase.from("heritage_content").select("id, title, type").ilike("title", like).limit(5),
    supabase.from("communities").select("id, name, location").ilike("name", like).limit(5),
  ]);

  return [
    ...(destinations.data ?? []).map((d) => ({
      type: "destination" as const,
      id: d.id,
      title: d.name,
      subtitle: d.region,
      href: `/destinations/${d.slug}`,
    })),
    ...(experiences.data ?? []).map((e) => ({
      type: "experience" as const,
      id: e.id,
      title: e.title,
      subtitle: e.description,
      href: `/experiences/${e.id}`,
    })),
    ...(homestays.data ?? []).map((h) => ({
      type: "homestay" as const,
      id: h.id,
      title: h.family_name,
      subtitle: null,
      href: `/homestays/${h.id}`,
    })),
    ...(heritage.data ?? []).map((h) => ({
      type: "heritage" as const,
      id: h.id,
      title: h.title,
      subtitle: h.type,
      href: `/heritage/${h.id}`,
    })),
    ...(communities.data ?? []).map((c) => ({
      type: "community" as const,
      id: c.id,
      title: c.name,
      subtitle: c.location,
      href: `/communities/${c.id}`,
    })),
  ];
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q?.trim() ?? "";
  const results = q ? await search(q) : [];

  return (
    <div className="py-12">
      <h1 className="font-display text-2xl text-forest">Search OpenCBT</h1>
      <form className="mt-6" action="/search">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search destinations, experiences, homestays..."
          className="w-full max-w-md border border-forest/20 bg-transparent px-3 py-2 text-sm"
        />
      </form>

      {q && (
        <p className="mt-6 text-sm text-ink/60">
          {results.length > 0
            ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”`
            : `No results for “${q}” — try a destination, community, or homestay name.`}
        </p>
      )}

      <div className="mt-4">
        {results.map((r) => (
          <Link
            key={`${r.type}-${r.id}`}
            href={r.href}
            className="block border-b border-forest/10 py-4 first:pt-0"
          >
            <span className="text-xs uppercase tracking-wide text-turmeric">
              {typeLabel[r.type]}
            </span>
            <h3 className="font-display text-lg text-forest">{r.title}</h3>
            {r.subtitle && <p className="text-sm text-ink/60">{r.subtitle}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
