"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Library" },
  { href: "/finder", label: "Build Finder" },
  { href: "/calculator", label: "Stat Calculator" },
  { href: "/tier-list", label: "Tier List" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-obsidian-600 bg-obsidian/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-2xl text-ember animate-emberPulse" aria-hidden>
            ✦
          </span>
          <span className="font-display text-lg font-700 leading-none">
            <span className="gold-text">BUILD FORGE</span>
          </span>
        </Link>

        <ul className="flex items-center gap-1 text-sm sm:gap-2">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-md px-2.5 py-1.5 transition-colors sm:px-3 ${
                    active
                      ? "bg-ember/15 text-ember-light"
                      : "text-stone-400 hover:text-ember-light"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
