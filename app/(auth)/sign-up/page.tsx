"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const roles = [
  { value: "tourist", label: "Tourist" },
  { value: "community", label: "Community host" },
  { value: "guide", label: "Local guide" },
] as const;

export default function SignUp() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<(typeof roles)[number]["value"]>("tourist");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    });

    setSubmitting(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // The `users` row is created automatically by a DB trigger
    // (0003_user_signup_trigger.sql) using the metadata passed above.
    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setCheckEmail(true);
  }

  if (checkEmail) {
    return (
      <div className="py-16">
        <h1 className="font-display text-3xl text-forest">Check your email</h1>
        <p className="mt-3 max-w-sm text-sm text-ink/70">
          We&apos;ve sent a confirmation link to {email}. Sign in once you&apos;ve
          confirmed.
        </p>
      </div>
    );
  }

  return (
    <div className="py-16">
      <h1 className="font-display text-3xl text-forest">Sign up</h1>
      <form onSubmit={handleSubmit} className="mt-8 max-w-sm space-y-5">
        <div>
          <label htmlFor="fullName" className="block text-sm text-ink/70">Full name</label>
          <input
            id="fullName"
            autoComplete="name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full border border-forest/20 bg-transparent px-3 py-2 text-sm"
          />
        </div>
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
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-forest/20 bg-transparent px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-ink/50">At least 6 characters.</p>
        </div>
        <div>
          <label htmlFor="role" className="block text-sm text-ink/70">I am a</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as typeof role)}
            className="mt-1 w-full border border-forest/20 bg-transparent px-3 py-2 text-sm"
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
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
          {submitting ? "Creating account..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}
