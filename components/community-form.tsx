"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommunityForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    location: "",
    history: "",
    culture: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const res = await fetch("/api/communities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSubmitting(false);

    if (!res.ok) {
      const body = await res.json();
      setErrorMsg(body.error ?? "Something went wrong.");
      return;
    }

    const created = await res.json();
    router.push(`/communities/${created.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-md space-y-5">
      <div>
        <label htmlFor="community-name" className="block text-sm text-ink/70">Community name</label>
        <input
          id="community-name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1 w-full border border-forest/20 bg-transparent px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="community-location" className="block text-sm text-ink/70">Location</label>
        <input
          id="community-location"
          required
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          placeholder="e.g. Jaflong Khasia Punji"
          className="mt-1 w-full border border-forest/20 bg-transparent px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="community-history" className="block text-sm text-ink/70">History</label>
        <textarea
          id="community-history"
          value={form.history}
          onChange={(e) => setForm({ ...form, history: e.target.value })}
          rows={3}
          placeholder="How did this community come to live and work here? A few sentences is enough to start."
          className="mt-1 w-full border border-forest/20 bg-transparent px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="community-culture" className="block text-sm text-ink/70">Culture</label>
        <textarea
          id="community-culture"
          value={form.culture}
          onChange={(e) => setForm({ ...form, culture: e.target.value })}
          rows={3}
          placeholder="Traditions, food, crafts, or festivals a visitor might want to know about."
          className="mt-1 w-full border border-forest/20 bg-transparent px-3 py-2 text-sm"
        />
      </div>

      {errorMsg && (
        <p role="alert" className="text-sm text-red-700">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-sm bg-forest px-5 py-3 text-sm text-sand disabled:opacity-60"
      >
        {submitting ? "Saving..." : "Create profile"}
      </button>
    </form>
  );
}
