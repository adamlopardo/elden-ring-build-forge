"use client";

import { useMemo, useState } from "react";
import { builds, type Difficulty, type Playstyle } from "@/lib/builds";
import BuildCard from "./BuildCard";

const PLAYSTYLES: (Playstyle | "All")[] = ["All", "Melee", "Caster", "Hybrid", "Status"];
const DIFFICULTIES: (Difficulty | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];

export default function BuildLibrary() {
  const [playstyle, setPlaystyle] = useState<Playstyle | "All">("All");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return builds.filter((b) => {
      if (playstyle !== "All" && b.playstyle !== playstyle) return false;
      if (difficulty !== "All" && b.difficulty !== difficulty) return false;
      if (q && !(`${b.name} ${b.archetype} ${b.fantasy}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [playstyle, difficulty, query]);

  return (
    <div>
      <div className="sticky top-[57px] z-30 -mx-4 mb-6 border-b border-obsidian-600 bg-obsidian/85 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs uppercase tracking-wide text-stone-500">Style</span>
            {PLAYSTYLES.map((p) => (
              <button
                key={p}
                onClick={() => setPlaystyle(p)}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  playstyle === p
                    ? "bg-ember/20 text-ember-light ring-1 ring-ember-deep"
                    : "bg-obsidian-700 text-stone-400 hover:text-ember-light"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs uppercase tracking-wide text-stone-500">Level</span>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  difficulty === d
                    ? "bg-ember/20 text-ember-light ring-1 ring-ember-deep"
                    : "bg-obsidian-700 text-stone-400 hover:text-ember-light"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search builds…"
            className="w-full rounded-md border border-obsidian-600 bg-obsidian-800 px-3 py-1.5 text-sm text-stone-100 placeholder:text-stone-500 focus:border-ember-deep focus:outline-none lg:w-48"
          />
        </div>
      </div>

      <p className="mb-4 text-sm text-stone-500">
        Showing <span className="text-ember-light">{filtered.length}</span> of {builds.length}{" "}
        builds.
      </p>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-stone-500">
          No builds match those filters. Loosen them to see more.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <BuildCard key={b.slug} build={b} />
          ))}
        </div>
      )}
    </div>
  );
}
