// ===========================================================================
// Stat softcap logic for the interactive Stat Calculator.
// Values reflect Elden Ring's well-documented breakpoints (Calibration 1.16).
// ===========================================================================

import type { StatSpread } from "./builds";

export type Severity = "info" | "warn" | "good";

export interface SoftcapNote {
  stat: keyof StatSpread;
  severity: Severity;
  message: string;
}

export const ARCHETYPE_TEMPLATES: Record<
  string,
  { label: string; weights: Partial<Record<keyof StatSpread, number>>; description: string }
> = {
  strength: {
    label: "Pure Strength",
    description: "Colossal smashers. Pump STR (mind the 2H multiplier), END for poise gear.",
    weights: { vigor: 3, endurance: 2.2, strength: 3.4, mind: 0.6, dexterity: 0.3 },
  },
  dexterity: {
    label: "Pure Dexterity",
    description: "Fast katanas/curved swords. DEX-focused with safety Vigor.",
    weights: { vigor: 3, endurance: 1.6, dexterity: 3.4, mind: 1 },
  },
  quality: {
    label: "Quality (Str/Dex)",
    description: "Balanced melee. Even STR/DEX to unlock the full arsenal.",
    weights: { vigor: 3, endurance: 1.8, strength: 2.2, dexterity: 2.2, mind: 0.8 },
  },
  sorcery: {
    label: "Pure Sorcery (Int)",
    description: "Glass cannon. INT carries; MND fuels the FP bar.",
    weights: { vigor: 2.6, endurance: 0.8, intelligence: 3.6, mind: 2 },
  },
  faith: {
    label: "Faith Caster",
    description: "Incantations + Blasphemous Blade. FTH drives everything.",
    weights: { vigor: 2.8, endurance: 1, faith: 3.6, mind: 2 },
  },
  bleed: {
    label: "Bleed / Arcane",
    description: "Hemorrhage stacking. ARC boosts buildup and Arcane AR.",
    weights: { vigor: 3, endurance: 1.4, arcane: 3.2, dexterity: 1.4 },
  },
  spellblade: {
    label: "Spellblade (Int/Dex)",
    description: "Moonveil-style. INT primary, DEX for requirements + cast speed.",
    weights: { vigor: 2.8, endurance: 1.2, intelligence: 3, dexterity: 1.4, mind: 1.6 },
  },
  hybrid_faith_dex: {
    label: "Faith/Dex Hybrid",
    description: "Buff-and-beat. Even FTH/DEX for Sacred scaling.",
    weights: { vigor: 2.8, endurance: 1.4, faith: 2.2, dexterity: 2.2, mind: 1.4 },
  },
};

// Softcap breakpoints for live warnings.
export function evaluateSoftcaps(stats: StatSpread): SoftcapNote[] {
  const notes: SoftcapNote[] = [];

  // Vigor
  if (stats.vigor < 40) {
    notes.push({
      stat: "vigor",
      severity: "warn",
      message: `Vigor ${stats.vigor} is below the 40 breakpoint — you are fragile. 40 is the first major HP softcap.`,
    });
  } else if (stats.vigor >= 40 && stats.vigor < 60) {
    notes.push({
      stat: "vigor",
      severity: "info",
      message: `Vigor ${stats.vigor}: solid. The next (and last big) HP jump is at 60.`,
    });
  } else {
    notes.push({
      stat: "vigor",
      severity: "good",
      message: `Vigor ${stats.vigor}: at/over the 60 hard softcap — HP gains per point drop sharply beyond here.`,
    });
  }

  // Mind
  if (stats.mind >= 50) {
    notes.push({ stat: "mind", severity: "good", message: `Mind ${stats.mind}: past the ~50 FP softcap.` });
  } else if (stats.mind >= 30) {
    notes.push({ stat: "mind", severity: "info", message: `Mind ${stats.mind}: good FP pool for most casters.` });
  }

  // Endurance
  if (stats.endurance >= 50) {
    notes.push({
      stat: "endurance",
      severity: "good",
      message: `Endurance ${stats.endurance}: past the ~50 equip-load softcap.`,
    });
  } else if (stats.endurance < 15) {
    notes.push({
      stat: "endurance",
      severity: "warn",
      message: `Endurance ${stats.endurance}: very low stamina/equip load — you may be stuck in the fat roll.`,
    });
  }

  // Strength (note 2H multiplier)
  if (stats.strength >= 80) {
    notes.push({
      stat: "strength",
      severity: "good",
      message: `Strength ${stats.strength}: at the 80 hard cap. Two-handing multiplies STR by 1.5 — you only need 54 to reach 81 effective when 2H.`,
    });
  } else if (stats.strength >= 54) {
    notes.push({
      stat: "strength",
      severity: "info",
      message: `Strength ${stats.strength}: two-handed this equals ${Math.floor(stats.strength * 1.5)} effective (54 → 81, the 2H softcap).`,
    });
  } else if (stats.strength >= 20) {
    notes.push({
      stat: "strength",
      severity: "info",
      message: `Strength ${stats.strength}: first softcap is 55. Two-handed = ${Math.floor(stats.strength * 1.5)} effective.`,
    });
  }

  // Dexterity
  if (stats.dexterity >= 80) {
    notes.push({ stat: "dexterity", severity: "good", message: `Dexterity ${stats.dexterity}: at the 80 hard cap.` });
  } else if (stats.dexterity >= 55) {
    notes.push({
      stat: "dexterity",
      severity: "info",
      message: `Dexterity ${stats.dexterity}: past the 55 softcap; gains slow toward 80. (20 DEX removes fall damage & speeds casts.)`,
    });
  }

  // Intelligence
  if (stats.intelligence >= 80) {
    notes.push({ stat: "intelligence", severity: "good", message: `Intelligence ${stats.intelligence}: at the 80 hard cap — max sorcery scaling.` });
  } else if (stats.intelligence >= 60) {
    notes.push({
      stat: "intelligence",
      severity: "info",
      message: `Intelligence ${stats.intelligence}: past the 60 softcap; push to 80 only at high RL.`,
    });
  }

  // Faith
  if (stats.faith >= 80) {
    notes.push({ stat: "faith", severity: "good", message: `Faith ${stats.faith}: at the 80 hard cap — max incantation scaling.` });
  } else if (stats.faith >= 60) {
    notes.push({
      stat: "faith",
      severity: "info",
      message: `Faith ${stats.faith}: past the ~55-60 softcap; gains slow toward 80.`,
    });
  }

  // Arcane
  if (stats.arcane >= 45) {
    notes.push({
      stat: "arcane",
      severity: "info",
      message: `Arcane ${stats.arcane}: past the ~45 status-buildup softcap; extra points still add Arcane weapon AR.`,
    });
  }

  return notes;
}

export function totalSpent(stats: StatSpread): number {
  // Sum of points above the engine's minimum base (each stat starts at varying
  // class minimums; we approximate "invested level cost" as the raw sum).
  return Object.values(stats).reduce((a, b) => a + b, 0);
}
