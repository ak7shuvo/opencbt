import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const communityId = req.nextUrl.searchParams.get("community_id");
  const type = req.nextUrl.searchParams.get("type");

  let query = supabase.from("heritage_content").select("*").order("created_at", { ascending: false });
  if (communityId) query = query.eq("community_id", communityId);
  if (type) query = query.eq("type", type);

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
  const validTypes = ["story", "music", "food", "craft", "festival"];
  if (!body.community_id || !body.title || !validTypes.includes(body.type)) {
    return NextResponse.json(
      {
        error: `community_id, title, and a valid type (${validTypes.join("/")}) are required`,
        code: 400,
      },
      { status: 400 }
    );
  }

  // RLS also enforces auth.uid() = communities.created_by for this community_id.
  const { data, error } = await supabase
    .from("heritage_content")
    .insert({
      community_id: body.community_id,
      type: body.type,
      title: body.title,
      description: body.description ?? null,
      media_url: body.media_url ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message, code: 500 }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
