import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Not called anywhere yet — wired up in Phase 2 (Auth) and Phase 3 (Community Profile).
export const supabase = createClient(url, anonKey);
