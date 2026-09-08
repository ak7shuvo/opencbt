import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Experience } from "@/lib/types";
import { FALLBACK_EXPERIENCES } from "@/lib/fallback-data";
import BookingForm from "@/components/booking-form";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase
    .from("experiences")
    .select("title, description")
    .eq("id", params.id)
    .single();

  return {
    title: data ? `${data.title} — OpenCBT` : "Experience — OpenCBT",
    description: data?.description ?? undefined,
  };
}

export default async function ExperienceDetail({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    const fallback = FALLBACK_EXPERIENCES.find((e) => e.id === params.id);
    if (!fallback) notFound();
    return <ExperienceView experience={fallback} />;
  }

  return <ExperienceView experience={data as Experience} />;
}

function ExperienceView({ experience }: { experience: Experience }) {
  return (
    <div className="py-16">
      <h1 className="font-display text-3xl text-forest">{experience.title}</h1>
      <p className="mt-1 text-sm text-ink/60">
        {experience.duration ?? "Duration not listed yet"}
        {experience.price != null ? ` · ৳${experience.price}` : ""}
      </p>

      {experience.description && (
        <p className="mt-6 max-w-lg text-sm text-ink/80">{experience.description}</p>
      )}

      <BookingForm targetType="experience" targetId={experience.id} />
    </div>
  );
}
