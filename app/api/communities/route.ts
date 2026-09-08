import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .order("created_at", { ascending: false });

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

  if (!body.name || !body.location) {
    return NextResponse.json(
      { error: "name and location are required", code: 400 },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("communities")
    .insert({
      name: body.name,
      location: body.location,
      history: body.history ?? null,
      culture: body.culture ?? null,
      contact_info: body.contact_info ?? null,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message, code: 500 }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
