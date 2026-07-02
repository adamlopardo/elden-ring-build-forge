import Link from "next/link";
import BuildLibrary from "@/components/BuildLibrary";
import { builds } from "@/lib/builds";

export default function HomePage() {
  return (
    <div>
      <section className="relative mb-10 overflow-hidden rounded-xl border border-obsidian-600 bg-gradient-to-b from-obsidian-800 to-obsidian px-6 py-12 text-center sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-erdtree-dusk" />
        <div className="relative">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-ember-deep">
            Calibration 1.16 · Shadow of the Erdtree
          </p>
          <h1 className="mb-4 font-display text-4xl font-700 leading-none sm:text-6xl">
            <span className="gold-text">Elden Ring Build Forge</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-stone-300 sm:text-lg">
            OP builds, engineered end-to-end. Exact stat allocation, weapon and talisman locations,
            leveling order, and an AI route planner that tells you precisely how to get there from a
            fresh character.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="#library" className="btn-ember">
              Browse {builds.length} Builds
            </Link>
            <Link
              href="/finder"
              className="rounded-md border border-obsidian-600 px-4 py-2 text-stone-300 transition-colors hover:border-ember-deep hover:text-ember-light"
            >
              Find My Build →
            </Link>
          </div>
        </div>
      </section>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            href: "/finder",
            title: "Build Finder",
            body: "Answer four questions and get your best-fit build with match reasoning.",
          },
          {
            href: "/calculator",
            title: "Stat Calculator",
            body: "Set a target level and archetype; see softcap warnings live.",
          },
          {
            href: "/tier-list",
            title: "Tier List",
            body: "S/A/B rankings for PvE and PvP with one-line justifications.",
          },
        ].map((c) => (
          <Link key={c.href} href={c.href} className="forge-card group p-5">
            <h3 className="mb-1 font-display text-lg text-ember-light">{c.title}</h3>
            <p className="text-sm text-stone-400">{c.body}</p>
            <span className="mt-3 inline-block text-xs text-ember-deep group-hover:translate-x-0.5">
              Open →
            </span>
          </Link>
        ))}
      </div>

      <div id="library" className="ember-divider mb-8" />
      <h2 className="mb-6 font-display text-2xl font-600 text-stone-100">The Build Library</h2>
      <BuildLibrary />
    </div>
  );
}
