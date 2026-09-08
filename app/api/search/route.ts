import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export type SearchResult = {
  type: "destination" | "experience" | "homestay" | "heritage" | "community";
  id: string;
  title: string;
  subtitle: string | null;
  href: string;
};

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q) {
    return NextResponse.json({ error: "q is required", code: 400 }, { status: 400 });
  }

  const supabase = createClient();
  const like = `%${q}%`;

  const [destinations, experiences, homestays, heritage, communities] = await Promise.all([
    supabase.from("destinations").select("id, name, region, slug").ilike("name", like).limit(5),
    supabase.from("experiences").select("id, title, description").ilike("title", like).limit(5),
    supabase.from("homestays").select("id, family_name").ilike("family_name", like).limit(5),
    supabase.from("heritage_content").select("id, title, type").ilike("title", like).limit(5),
    supabase.from("communities").select("id, name, location").ilike("name", like).limit(5),
  ]);

  const results: SearchResult[] = [
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

  return NextResponse.json(results);
}
