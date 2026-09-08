import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Homestay } from "@/lib/types";
import { FALLBACK_HOMESTAYS } from "@/lib/fallback-data";
import BookingForm from "@/components/booking-form";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase
    .from("homestays")
    .select("family_name")
    .eq("id", params.id)
    .single();

  return {
    title: data ? `${data.family_name} — OpenCBT` : "Homestay — OpenCBT",
    description: data
      ? `Book a stay with ${data.family_name}, a family-run homestay in the OpenCBT Sylhet pilot.`
      : undefined,
  };
}

export default async function HomestayDetail({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("homestays")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    const fallback = FALLBACK_HOMESTAYS.find((h) => h.id === params.id);
    if (!fallback) notFound();
    return <HomestayView homestay={fallback} />;
  }

  return <HomestayView homestay={data as Homestay} />;
}

function HomestayView({ homestay }: { homestay: Homestay }) {
  return (
    <div className="py-16">
      <h1 className="font-display text-3xl text-forest">{homestay.family_name}</h1>
      <p className="mt-1 text-sm text-ink/60">
        {homestay.rooms != null
          ? `${homestay.rooms} room${homestay.rooms === 1 ? "" : "s"} available`
          : "Room count not listed yet"}
        {homestay.price != null ? ` · ৳${homestay.price}/night` : ""}
      </p>

      <BookingForm targetType="homestay" targetId={homestay.id} />
    </div>
  );
}
