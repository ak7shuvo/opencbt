import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ImpactMetric } from "@/lib/types";
import { FALLBACK_IMPACT } from "@/lib/fallback-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sustainability Tracker — OpenCBT",
  description:
    "Self-reported income, employment, and participation data from Sylhet's pilot communities — tracking whether tourism income is actually reaching the people who host it.",
};

export default async function Impact() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("impact_metrics")
    .select("*")
    .order("year", { ascending: false });

  const metrics = (data as ImpactMetric[] | null)?.length
    ? (data as ImpactMetric[])
    : FALLBACK_IMPACT;
  void error;

  const totals = metrics.reduce(
    (acc, m) => ({
      income: acc.income + (m.income ?? 0),
      employment: acc.employment + (m.employment ?? 0),
      women: acc.women + (m.women_participation ?? 0),
      youth: acc.youth + (m.youth_participation ?? 0),
    }),
    { income: 0, employment: 0, women: 0, youth: 0 }
  );

  return (
    <div className="py-16">
      <h1 className="font-display text-3xl text-forest">Sustainability Tracker</h1>
      <p className="mt-2 max-w-md text-sm text-ink/70">
        Self-reported income, employment, and participation figures across
        pilot communities — one of the ways OpenCBT tries to keep community
        based tourism honest about who actually benefits.
      </p>

      {metrics.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="border border-forest/10 p-4">
            <p className="text-xs text-ink/60">Total Income (৳)</p>
            <p className="font-display text-xl text-forest">{totals.income.toLocaleString("en-US")}</p>
          </div>
          <div className="border border-forest/10 p-4">
            <p className="text-xs text-ink/60">People Employed</p>
            <p className="font-display text-xl text-forest">{totals.employment.toLocaleString("en-US")}</p>
          </div>
          <div className="border border-forest/10 p-4">
            <p className="text-xs text-ink/60">Women Participating</p>
            <p className="font-display text-xl text-forest">{totals.women.toLocaleString("en-US")}</p>
          </div>
          <div className="border border-forest/10 p-4">
            <p className="text-xs text-ink/60">Youth Participating</p>
            <p className="font-display text-xl text-forest">{totals.youth.toLocaleString("en-US")}</p>
          </div>
        </div>
      )}

      <div className="mt-10">
        {metrics.map((m) => (
          <div key={m.id} className="border-b border-forest/10 py-4 first:pt-0">
            <p className="font-display text-lg text-forest">{m.year}</p>
            <p className="text-sm text-ink/70">
              Income: {m.income != null ? `৳${m.income.toLocaleString("en-US")}` : "—"} ·
              Employment: {m.employment ?? "—"} ·
              Women: {m.women_participation ?? "—"} · Youth: {m.youth_participation ?? "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
