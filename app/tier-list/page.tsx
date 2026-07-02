"use client";

import { useState } from "react";
import Link from "next/link";
import { builds, type Build, type Tier } from "@/lib/builds";

type Mode = "pve" | "pvp";

const JUSTIFICATION: Record<string, { pve: string; pvp: string }> = {
  "quality-warden": {
    pve: "Forgiving, flexible melee that handles every fight; not the absolute top DPS.",
    pvp: "Solid fundamentals but out-classed by faster/status duelists.",
  },
  "colossus-breaker": {
    pve: "Massive stance damage and hyperarmor trivialize many bosses.",
    pvp: "Hits like a truck but slow and readable in duels.",
  },
  "blade-of-the-tarnished": {
    pve: "Fast, high uptime, innate bleed; strong all-rounder.",
    pvp: "Excellent pressure and mobility in the current meta.",
  },
  "hemorrhage-reaper": {
    pve: "Percentage-based bleed melts the tankiest bosses — top of the food chain.",
    pvp: "Seppuku + Corpse Piler bursts are brutal, if telegraphed.",
  },
  "carian-glintblade-savant": {
    pve: "Comet Azur one-shots and safe range; can struggle vs fast adds.",
    pvp: "Strong zoning but vulnerable once a duelist closes in.",
  },
  "flame-of-the-fell-god": {
    pve: "Blasphemous Blade lifesteal + incants = the most consistent clear in the game.",
    pvp: "Taker's Flames pressure and self-heal are oppressive.",
  },
  "sacred-order-crusader": {
    pve: "Buffs make every swing hit like a special; very consistent.",
    pvp: "Buff-and-beat trades favorably and has ranged holy poke.",
  },
  "winter-lord-frostbearer": {
    pve: "Frostbite's negation debuff speeds every kill; flexible hybrid.",
    pvp: "Frost control + Dark Moon burst is a strong duel package.",
  },
  "moonveil-spellblade": {
    pve: "Accessible and effective, though not top-end DPS.",
    pvp: "Transient Moonlight spacing is a premier duel tool.",
  },
  "unbowed-bastion": {
    pve: "Nearly unstaggerable, but lower DPS ceiling than meta picks.",
    pvp: "Out-trades greedy players; loses to spacing and status.",
  },
  "twilight-duelist": {
    pve: "Built for 1v1s, not optimized for boss DPS.",
    pvp: "Purpose-built meta spread — top of the dueling pile.",
  },
  "venomous-jester": {
    pve: "Status DoT cheeses tanky enemies but is slow and gimmicky.",
    pvp: "Turtle + multi-status frustrates opponents to death.",
  },
};

const TIERS: Tier[] = ["S", "A", "B"];
const TIER_STYLE: Record<Tier, string> = {
  S: "from-ember-deep/30 to-ember/5 border-ember text-ember-light",
  A: "from-frost/20 to-frost/5 border-frost/50 text-frost",
  B: "from-stone-600/20 to-stone-700/5 border-stone-500 text-stone-300",
};

export default function TierListPage() {
  const [mode, setMode] = useState<Mode>("pve");

  const grouped: Record<Tier, Build[]> = { S: [], A: [], B: [] };
  builds.forEach((b) => grouped[b.tier[mode]].push(b));
  TIERS.forEach((t) =>
    grouped[t].sort((a, b) => (mode === "pve" ? b.pveRating - a.pveRating : b.pvpRating - a.pvpRating))
  );

  return (
    <div className="animate-fadeUp">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-1 font-display text-3xl font-700 text-stone-100">Build Tier List</h1>
          <p className="text-stone-400">
            Ranked for {mode === "pve" ? "PvE" : "PvP"} on Calibration 1.16.
          </p>
        </div>
        <div className="inline-flex rounded-md border border-obsidian-600 bg-obsidian-800 p-1">
          {(["pve", "pvp"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded px-4 py-1.5 text-sm font-medium uppercase transition-colors ${
                mode === m ? "bg-ember/20 text-ember-light" : "text-stone-400 hover:text-ember-light"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {TIERS.map((tier) => (
          <div
            key={tier}
            className={`flex flex-col gap-4 rounded-lg border bg-gradient-to-r p-4 sm:flex-row ${TIER_STYLE[tier]}`}
          >
            <div className="flex shrink-0 items-center justify-center sm:w-20">
              <span className="font-display text-5xl font-700">{tier}</span>
            </div>
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              {grouped[tier].length === 0 ? (
                <p className="text-sm text-stone-500">No builds in this tier.</p>
              ) : (
                grouped[tier].map((b) => (
                  <Link
                    key={b.slug}
                    href={`/builds/${b.slug}`}
                    className="rounded-md border border-obsidian-600 bg-obsidian-800/70 p-3 transition-colors hover:border-ember-deep"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-stone-100">{b.name}</p>
                      <span className="font-mono text-xs text-ember-light">
                        {mode === "pve" ? b.pveRating : b.pvpRating}/10
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-stone-400">{JUSTIFICATION[b.slug]?.[mode]}</p>
                  </Link>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
