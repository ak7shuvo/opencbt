import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in required", code: 401 }, { status: 401 });
  }

  // RLS returns bookings the user made, plus bookings against things they host.
  const { data, error } = await supabase
    .from("bookings")
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
  const hasExperience = !!body.experience_id;
  const hasHomestay = !!body.homestay_id;

  if (hasExperience === hasHomestay) {
    return NextResponse.json(
      { error: "Provide exactly one of experience_id or homestay_id", code: 400 },
      { status: 400 }
    );
  }
  if (!body.date) {
    return NextResponse.json({ error: "date is required", code: 400 }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: user.id,
      experience_id: body.experience_id ?? null,
      homestay_id: body.homestay_id ?? null,
      date: body.date,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message, code: 500 }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
