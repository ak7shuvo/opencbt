import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard — OpenCBT",
};

export default async function Dashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user!.id)
    .single();

  return (
    <div>
      <h1 className="font-display text-3xl text-forest">
        Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}
      </h1>
      <p className="mt-2 text-sm text-ink/60">
        {profile?.role
          ? `Signed in as a ${profile.role}.`
          : "Your role hasn't synced yet — try refreshing in a moment."}
      </p>

      {profile?.role === "community" && (
        <div className="mt-8">
          <Link
            href="/communities/new"
            className="rounded-sm bg-forest px-5 py-3 text-sm text-sand"
          >
            Add your community profile
          </Link>
        </div>
      )}

      {!profile && (
        <p className="mt-6 max-w-md text-sm text-ink/60">
          We don&apos;t have a profile for you yet — if your project requires
          email confirmation, this fills in automatically once you&apos;ve
          confirmed your address and signed in.
        </p>
      )}
    </div>
  );
}
