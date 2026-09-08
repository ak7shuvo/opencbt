import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Cheap liveness + dependency check for uptime monitoring (Task 4, Phase 11).
// Verifies the app is running AND can reach Supabase — not just that Next.js booted.
export async function GET() {
  const checks: Record<string, "ok" | "error"> = { app: "ok" };

  try {
    const supabase = createClient();
    const { error } = await supabase.from("destinations").select("id").limit(1);
    checks.database = error ? "error" : "ok";
  } catch {
    checks.database = "error";
  }

  checks.assistant = process.env.ANTHROPIC_API_KEY ? "ok" : "error";

  const healthy = Object.values(checks).every((v) => v === "ok");
  return NextResponse.json(
    { status: healthy ? "healthy" : "degraded", checks, time: new Date().toISOString() },
    { status: healthy ? 200 : 503 }
  );
}
