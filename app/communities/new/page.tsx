import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CommunityForm from "@/components/community-form";

export default async function NewCommunity() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="py-16">
        <h1 className="font-display text-3xl text-forest">Add your community</h1>
        <p className="mt-3 max-w-sm text-sm text-ink/70">
          Sign in first — community profiles are tied to your account now
          that auth is wired up.
        </p>
        <Link href="/sign-in" className="mt-4 inline-block text-sm text-forest underline">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16">
      <h1 className="font-display text-3xl text-forest">Add your community</h1>
      <p className="mt-2 max-w-md text-sm text-ink/70">
        This creates a public profile owned by your account.
      </p>
      <CommunityForm />
    </div>
  );
}
