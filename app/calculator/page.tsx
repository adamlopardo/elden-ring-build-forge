"use client";

import { useMemo, useState } from "react";
import { STAT_LABELS, type StatSpread } from "@/lib/builds";
import { ARCHETYPE_TEMPLATES, evaluateSoftcaps, totalSpent } from "@/lib/softcaps";

const BASE: StatSpread = {
  vigor: 10,
  mind: 10,
  endurance: 10,
  strength: 10,
  dexterity: 10,
  intelligence: 10,
  faith: 10,
  arcane: 10,
};

// Distribute the level budget across an archetype's weighted stats.
// A fresh RL1 character has ~80 total stat points, so points available to
// spend by a target Rune Level is approximately (targetLevel - 1).
function buildSpread(archetype: string, targetLevel: number): StatSpread {
  const template = ARCHETYPE_TEMPLATES[archetype];
  const spread: StatSpread = { ...BASE };
  if (!template) return spread;

  const pointsToSpend = Math.max(0, targetLevel - 1);

  const weights = template.weights;
  const weightSum = Object.values(weights).reduce((a, b) => a + (b ?? 0), 0) || 1;

  (Object.keys(weights) as (keyof StatSpread)[]).forEach((k) => {
    const share = (weights[k] ?? 0) / weightSum;
    spread[k] = Math.min(99, Math.round(BASE[k] + share * pointsToSpend));
  });

  return spread;
}

export default function CalculatorPage() {
  const [archetype, setArchetype] = useState<string>("quality");
  const [targetLevel, setTargetLevel] = useState<number>(150);

  const spread = useMemo(() => buildSpread(archetype, targetLevel), [archetype, targetLevel]);
  const notes = useMemo(() => evaluateSoftcaps(spread), [spread]);
  const template = ARCHETYPE_TEMPLATES[archetype];
  const computedTotal = totalSpent(spread);

  return (
    <div className="animate-fadeUp">
      <h1 className="mb-2 font-display text-3xl font-700 text-stone-100">Stat Calculator</h1>
      <p className="mb-8 text-stone-400">
        Pick an archetype and a target Rune Level. The Forge suggests a spread and flags every
        softcap live. Values are guidance, not gospel — tune to your weapon’s requirements.
      </p>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Controls */}
        <div className="forge-card space-y-6 p-6 lg:col-span-2">
          <div>
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-stone-400">
              Archetype
            </label>
            <select
              value={archetype}
              onChange={(e) => setArchetype(e.target.value)}
              className="w-full rounded-md border border-obsidian-600 bg-obsidian-800 px-3 py-2 text-stone-100 focus:border-ember-deep focus:outline-none"
            >
              {Object.entries(ARCHETYPE_TEMPLATES).map(([key, t]) => (
                <option key={key} value={key}>
                  {t.label}
                </option>
              ))}
            </select>
            {template && <p className="mt-2 text-sm text-stone-400">{template.description}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-stone-400">
              Target Rune Level: <span className="text-ember-light">{targetLevel}</span>
            </label>
            <input
              type="range"
              min={20}
              max={200}
              value={targetLevel}
              onChange={(e) => setTargetLevel(Number(e.target.value))}
              className="w-full accent-ember"
            />
            <div className="mt-1 flex justify-between text-xs text-stone-500">
              <span>20</span>
              <span>Meta 125 / 150</span>
              <span>200</span>
            </div>
          </div>

          <div className="rounded-md border border-obsidian-600 bg-obsidian-700/40 p-3 text-sm text-stone-400">
            Approx. total stat points allocated:{" "}
            <span className="font-mono text-ember-light">{computedTotal}</span>
          </div>
        </div>

        {/* Spread + warnings */}
        <div className="space-y-6 lg:col-span-3">
          <div className="forge-card p-5">
            <h2 className="mb-4 font-display text-xl text-ember-light">Recommended Spread</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STAT_LABELS.map(({ key, label, short }) => (
                <div
                  key={key}
                  className="rounded-md border border-obsidian-600 bg-obsidian-800/60 p-3 text-center"
                >
                  <p className="text-xs uppercase text-stone-500">{short}</p>
                  <p className="font-mono text-2xl font-semibold text-ember-light">{spread[key]}</p>
                  <p className="text-[10px] text-stone-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="forge-card p-5">
            <h2 className="mb-3 font-display text-xl text-ember-light">Softcap Warnings</h2>
            {notes.length === 0 ? (
              <p className="text-sm text-stone-400">No notable softcaps at this spread.</p>
            ) : (
              <ul className="space-y-2">
                {notes.map((n, i) => (
                  <li
                    key={i}
                    className={`rounded-md border px-3 py-2 text-sm ${
                      n.severity === "warn"
                        ? "border-blood/50 bg-blood/10 text-red-300"
                        : n.severity === "good"
                        ? "border-ember-deep/50 bg-ember/10 text-ember-light"
                        : "border-obsidian-600 bg-obsidian-700/40 text-stone-300"
                    }`}
                  >
                    {n.message}
                  </li>
                ))}
              </ul>
            )}
            <div className="ember-divider my-4" />
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-stone-400">
              AR-Relevant Scaling Reminders
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-stone-400">
              <li>Two-handing multiplies Strength by 1.5 (54 STR → 81 effective).</li>
              <li>Heavy/Keen/Magic/Flame/Sacred/Cold/Blood infusions shift a weapon’s scaling letters — match the infusion to your primary stat.</li>
              <li>Status (bleed/frost/poison/rot) is flat buildup — faster weapons proc it more than raw AR implies.</li>
              <li>Always keep equip load under 70% for the medium roll unless you’re a dedicated poise tank.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
