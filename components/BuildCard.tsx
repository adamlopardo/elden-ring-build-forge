import Link from "next/link";
import type { Build } from "@/lib/builds";
import { difficultyColor, playstyleColor, tierColor } from "./ui";

export default function BuildCard({ build }: { build: Build }) {
  return (
    <Link href={`/builds/${build.slug}`} className="block animate-fadeUp">
      <article className="forge-card group flex h-full flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-600 leading-tight text-stone-100 group-hover:text-ember-light">
            {build.name}
          </h3>
          <span
            className={`pill shrink-0 ${tierColor(build.tier.pve)}`}
            title="PvE tier"
          >
            {build.tier.pve}
          </span>
        </div>

        <p className="mb-3 text-sm text-ember-deep">{build.archetype}</p>

        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-400">
          {build.fantasy}
        </p>

        <div className="mb-3 flex flex-wrap gap-1.5">
          <span className={`pill ${playstyleColor(build.playstyle)}`}>{build.playstyle}</span>
          <span className={`pill ${difficultyColor(build.difficulty)}`}>
            {build.difficulty}
          </span>
          <span className="pill border-stone-600 text-stone-300">RL {build.targetLevel}</span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-obsidian-600 pt-3 text-xs text-stone-400">
          <span>
            PvE <strong className="text-ember-light">{build.pveRating}</strong> · PvP{" "}
            <strong className="text-ember-light">{build.pvpRating}</strong>
          </span>
          <span className="text-ember-deep transition-transform group-hover:translate-x-0.5">
            View build →
          </span>
        </div>
      </article>
    </Link>
  );
}
