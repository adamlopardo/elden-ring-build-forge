import type { Difficulty, Playstyle, Tier } from "@/lib/builds";

export function tierColor(tier: Tier): string {
  switch (tier) {
    case "S":
      return "border-ember text-ember-light bg-ember/15";
    case "A":
      return "border-frost/60 text-frost bg-frost/10";
    default:
      return "border-stone-500 text-stone-300 bg-stone-500/10";
  }
}

export function playstyleColor(p: Playstyle): string {
  switch (p) {
    case "Melee":
      return "border-blood/60 text-red-300 bg-blood/15";
    case "Caster":
      return "border-arcane/60 text-arcane bg-arcane/15";
    case "Hybrid":
      return "border-ember-deep text-ember-light bg-ember/10";
    case "Status":
      return "border-emerald-600/60 text-emerald-300 bg-emerald-900/20";
  }
}

export function difficultyColor(d: Difficulty): string {
  switch (d) {
    case "Beginner":
      return "border-emerald-600/60 text-emerald-300 bg-emerald-900/20";
    case "Intermediate":
      return "border-ember-deep text-ember-light bg-ember/10";
    case "Advanced":
      return "border-blood/60 text-red-300 bg-blood/15";
  }
}

export function RatingBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-10 shrink-0 text-xs text-stone-400">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-obsidian-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-ember-deep to-ember-light"
          style={{ width: `${value * 10}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right text-xs font-semibold text-ember-light">
        {value}/10
      </span>
    </div>
  );
}
