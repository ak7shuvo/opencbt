"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SignOutButton from "./sign-out-button";

const links = [
  { href: "/destinations", label: "Destinations" },
  { href: "/experiences", label: "Experiences" },
  { href: "/communities", label: "Communities" },
  { href: "/homestays", label: "Homestays" },
  { href: "/heritage", label: "Heritage" },
  { href: "/impact", label: "Impact" },
  { href: "/search", label: "Search" },
];

type NavProps = {
  user?: {
    id: string;
  } | null;
};

export default function Nav({ user }: NavProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-forest/10 bg-sand/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-[72px] items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/20 text-xs font-medium text-forest transition-all duration-300 group-hover:rotate-6 group-hover:border-forest/40">
              OC
            </span>

            <span>
              <span className="block font-display text-xl leading-none text-forest">
                OpenCBT
              </span>
              <span className="mt-1 hidden text-[8px] uppercase tracking-[0.22em] text-ink/40 sm:block">
                Community · Culture · Nature
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active =
                pathname === link.href ||
                pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative px-3 py-2 text-[12px] transition-all duration-300 ${
                    active
                      ? "text-forest"
                      : "text-ink/55 hover:-translate-y-0.5 hover:text-forest"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-forest transition-all duration-300 ${
                      active ? "w-5" : "w-0 group-hover:w-5"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Account */}
          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-sm border border-forest/15 px-4 py-2 text-[12px] text-ink/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-forest/30 hover:bg-forest/5 hover:text-forest"
                >
                  Dashboard
                </Link>

                <SignOutButton />
              </>
            ) : (
              <Link
                href="/sign-in"
                className="group relative overflow-hidden rounded-sm bg-forest px-5 py-2.5 text-[12px] font-medium text-sand transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="relative z-10">Sign in</span>
                <span
                  className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-full"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="group flex h-10 w-10 items-center justify-center rounded-sm border border-forest/15 transition-all duration-300 hover:border-forest/35 hover:bg-forest/5 lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-forest transition-all duration-300 ${
                  menuOpen ? "top-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-px w-5 bg-forest transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-px w-5 bg-forest transition-all duration-300 ${
                  menuOpen ? "top-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`overflow-hidden transition-all duration-500 lg:hidden ${
            menuOpen ? "max-h-[620px] pb-5 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="border-t border-forest/10 pt-3">
            {links.map((link, index) => {
              const active =
                pathname === link.href ||
                pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between border-b border-forest/5 px-1 py-3.5 text-sm transition-all duration-300 ${
                    active
                      ? "translate-x-1 text-forest"
                      : "text-ink/60 hover:translate-x-1 hover:text-forest"
                  }`}
                  style={{ transitionDelay: `${index * 20}ms` }}
                >
                  <span>{link.label}</span>
                  <span className="text-forest/30">↗</span>
                </Link>
              );
            })}

            <div className="mt-4 flex gap-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 rounded-sm border border-forest/15 px-4 py-3 text-center text-sm text-forest transition-colors hover:bg-forest/5"
                  >
                    Dashboard
                  </Link>

                  <div className="flex-1">
                    <SignOutButton />
                  </div>
                </>
              ) : (
                <Link
                  href="/sign-in"
                  onClick={() => setMenuOpen(false)}
                  className="w-full rounded-sm bg-forest px-4 py-3 text-center text-sm text-sand"
                >
                  Sign in
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
