import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const communityId = req.nextUrl.searchParams.get("community_id");

  let query = supabase.from("homestays").select("*").order("created_at", { ascending: false });
  if (communityId) {
    query = query.eq("community_id", communityId);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message, code: 500 }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in required", code: 401 }, { status: 401 });
  }

  const body = await req.json();
  if (!body.community_id || !body.family_name) {
    return NextResponse.json(
      { error: "community_id and family_name are required", code: 400 },
      { status: 400 }
    );
  }

  // RLS also enforces auth.uid() = communities.created_by for this community_id.
  const { data, error } = await supabase
    .from("homestays")
    .insert({
      community_id: body.community_id,
      family_name: body.family_name,
      rooms: body.rooms ?? null,
      availability: body.availability ?? null,
      price: body.price ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message, code: 500 }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
