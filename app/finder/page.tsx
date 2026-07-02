"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { builds, type Build, type Difficulty, type Playstyle } from "@/lib/builds";
import { difficultyColor, playstyleColor, tierColor } from "@/components/ui";

type Focus = "PvE" | "PvP" | "Both";

interface Answers {
  playstyle: Playstyle;
  difficulty: Difficulty;
  focus: Focus;
  runeLevel: number;
}

interface Scored {
  build: Build;
  score: number;
  reasons: string[];
}

function rank(answers: Answers): Scored[] {
  return builds
    .map((build) => {
      let score = 0;
      const reasons: string[] = [];

      if (build.playstyle === answers.playstyle) {
        score += 40;
        reasons.push(`Matches your ${answers.playstyle} playstyle.`);
      } else if (
        (answers.playstyle === "Hybrid" && build.playstyle !== "Melee") ||
        (build.playstyle === "Hybrid" && answers.playstyle !== "Melee")
      ) {
        score += 18;
        reasons.push(`Flexible ${build.playstyle} kit overlaps with ${answers.playstyle}.`);
      }

      if (build.difficulty === answers.difficulty) {
        score += 25;
        reasons.push(`Tuned for ${answers.difficulty} players.`);
      } else {
        const order: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];
        const diff = Math.abs(order.indexOf(build.difficulty) - order.indexOf(answers.difficulty));
        if (diff === 1) {
          score += 10;
          reasons.push(`Close to your ${answers.difficulty} comfort level.`);
        }
      }

      const pve = build.pveRating;
      const pvp = build.pvpRating;
      if (answers.focus === "PvE") {
        score += pve * 2.5;
        reasons.push(`PvE rating ${pve}/10.`);
      } else if (answers.focus === "PvP") {
        score += pvp * 2.5;
        reasons.push(`PvP rating ${pvp}/10.`);
      } else {
        score += (pve + pvp) * 1.25;
        reasons.push(`Balanced ${pve}/10 PvE & ${pvp}/10 PvP.`);
      }

      const lvlGap = Math.abs(build.targetLevel - answers.runeLevel);
      if (lvlGap <= 15) {
        score += 12;
        reasons.push(`Target RL ${build.targetLevel} is right around your level.`);
      } else if (answers.runeLevel < build.targetLevel) {
        score += 4;
        reasons.push(`A goal to grow into (target RL ${build.targetLevel}).`);
      }

      return { build, score, reasons };
    })
    .sort((a, b) => b.score - a.score);
}

const STEP_OPTIONS = {
  playstyle: ["Melee", "Caster", "Hybrid", "Status"] as Playstyle[],
  difficulty: ["Beginner", "Intermediate", "Advanced"] as Difficulty[],
  focus: ["PvE", "PvP", "Both"] as Focus[],
};

export default function FinderPage() {
  const [answers, setAnswers] = useState<Answers>({
    playstyle: "Melee",
    difficulty: "Intermediate",
    focus: "Both",
    runeLevel: 100,
  });
  const [submitted, setSubmitted] = useState(false);

  const ranked = useMemo(() => rank(answers), [answers]);
  const best = ranked[0];
  const runnersUp = ranked.slice(1, 4);
  const maxScore = ranked.length ? ranked[0].score : 1;

  return (
    <div className="animate-fadeUp">
      <h1 className="mb-2 font-display text-3xl font-700 text-stone-100">Build Finder</h1>
      <p className="mb-8 text-stone-400">
        Answer four questions. The Forge filters and ranks the library to surface your best fit.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="forge-card space-y-6 p-6">
          <Choice
            label="Playstyle"
            options={STEP_OPTIONS.playstyle}
            value={answers.playstyle}
            onChange={(v) => setAnswers((a) => ({ ...a, playstyle: v }))}
          />
          <Choice
            label="Difficulty"
            options={STEP_OPTIONS.difficulty}
            value={answers.difficulty}
            onChange={(v) => setAnswers((a) => ({ ...a, difficulty: v }))}
          />
          <Choice
            label="Focus"
            options={STEP_OPTIONS.focus}
            value={answers.focus}
            onChange={(v) => setAnswers((a) => ({ ...a, focus: v }))}
          />

          <div>
            <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-stone-400">
              Current Rune Level: <span className="text-ember-light">{answers.runeLevel}</span>
            </label>
            <input
              type="range"
              min={1}
              max={200}
              value={answers.runeLevel}
              onChange={(e) => setAnswers((a) => ({ ...a, runeLevel: Number(e.target.value) }))}
              className="w-full accent-ember"
            />
            <div className="mt-1 flex justify-between text-xs text-stone-500">
              <span>1</span>
              <span>Meta 125</span>
              <span>200</span>
            </div>
          </div>

          <button onClick={() => setSubmitted(true)} className="btn-ember w-full">
            Forge My Recommendation
          </button>
        </div>

        <div>
          {!submitted ? (
            <div className="flex h-full min-h-[16rem] items-center justify-center rounded-lg border border-dashed border-obsidian-600 p-8 text-center text-stone-500">
              Set your preferences and hit “Forge My Recommendation”.
            </div>
          ) : best ? (
            <div className="space-y-4">
              <div className="forge-card border-ember-deep p-6 shadow-ember">
                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-ember-deep">
                  Best Match · {Math.round((best.score / maxScore) * 100)}% confidence
                </p>
                <h2 className="font-display text-2xl font-700 text-ember-light">
                  {best.build.name}
                </h2>
                <p className="mb-3 text-sm text-stone-400">{best.build.archetype}</p>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  <span className={`pill ${playstyleColor(best.build.playstyle)}`}>
                    {best.build.playstyle}
                  </span>
                  <span className={`pill ${difficultyColor(best.build.difficulty)}`}>
                    {best.build.difficulty}
                  </span>
                  <span className={`pill ${tierColor(best.build.tier.pve)}`}>
                    PvE {best.build.tier.pve}
                  </span>
                </div>
                <ul className="mb-4 space-y-1 text-sm text-stone-300">
                  {best.reasons.map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-ember">✦</span> {r}
                    </li>
                  ))}
                </ul>
                <Link href={`/builds/${best.build.slug}`} className="btn-ember inline-block">
                  Open this build →
                </Link>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-stone-400">
                  Other strong fits
                </h3>
                <div className="space-y-2">
                  {runnersUp.map((r) => (
                    <Link
                      key={r.build.slug}
                      href={`/builds/${r.build.slug}`}
                      className="forge-card flex items-center justify-between p-3"
                    >
                      <div>
                        <p className="font-medium text-stone-100">{r.build.name}</p>
                        <p className="text-xs text-stone-500">{r.build.archetype}</p>
                      </div>
                      <span className="text-xs text-ember-deep">
                        {Math.round((r.score / maxScore) * 100)}%
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-stone-400">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              value === o
                ? "border-ember-deep bg-ember/15 text-ember-light"
                : "border-obsidian-600 bg-obsidian-700/50 text-stone-300 hover:border-ember-deep/60"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
