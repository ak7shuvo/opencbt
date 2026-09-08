"use client";

import { useState } from "react";

type Props = { targetType: "experience" | "homestay"; targetId: string };

export default function BookingForm({ targetType, targetId }: Props) {
  const [date, setDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const key = targetType === "experience" ? "experience_id" : "homestay_id";
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: targetId, date }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const body = await res.json();
      setErrorMsg(
        res.status === 401 ? "Sign in to request a booking." : body.error ?? "Something went wrong."
      );
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <p role="status" className="mt-4 text-sm text-river">
        Booking request sent — the host will confirm or decline it soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex items-end gap-3">
      <div>
        <label htmlFor={`booking-date-${targetId}`} className="block text-sm text-ink/70">
          Date
        </label>
        <input
          id={`booking-date-${targetId}`}
          type="date"
          required
          min={new Date().toISOString().slice(0, 10)}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 border border-forest/20 bg-transparent px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="rounded-sm bg-forest px-5 py-2 text-sm text-sand disabled:opacity-60"
      >
        {submitting ? "Requesting..." : "Request booking"}
      </button>
      {errorMsg && (
        <p role="alert" className="text-sm text-red-700">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
