import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Community } from "@/lib/types";
import { FALLBACK_COMMUNITIES } from "@/lib/fallback-data";
import CommunityCard from "@/components/community-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Communities — OpenCBT",
  description:
    "Meet the host communities of the Sylhet CBT pilot — Khasia Punji, tea garden villages, and river-side families sharing their history and culture directly with travelers.",
};

export default async function Communities() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .order("created_at", { ascending: false });

  const communities = (data as Community[] | null)?.length
    ? (data as Community[])
    : FALLBACK_COMMUNITIES;
  void error;

  return (
    <div className="py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-forest">Communities</h1>
        <Link
          href="/communities/new"
          className="rounded-sm bg-forest px-4 py-2 text-sm text-sand"
        >
          Add your community
        </Link>
      </div>

      <div className="mt-8">
        {communities.map((c) => (
          <CommunityCard key={c.id} community={c} />
        ))}
      </div>
    </div>
  );
}
