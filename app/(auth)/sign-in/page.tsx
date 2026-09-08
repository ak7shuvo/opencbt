"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignIn() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setSubmitting(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="py-16">
      <h1 className="font-display text-3xl text-forest">Sign in</h1>
      <form onSubmit={handleSubmit} className="mt-8 max-w-sm space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm text-ink/70">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-forest/20 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm text-ink/70">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="mt-4 text-sm text-ink/60">
        No account?{" "}
        <a href="/sign-up" className="text-forest underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
