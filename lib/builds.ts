// ===========================================================================
// ELDEN RING BUILD FORGE — Build data module
// Targeted patch: Calibration 1.16 (Shadow of the Erdtree era).
// All item locations are factual game data. No copyrighted text is reproduced.
// ===========================================================================

export type Playstyle = "Melee" | "Caster" | "Hybrid" | "Status";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Tier = "S" | "A" | "B";

export interface StatSpread {
  vigor: number;
  mind: number;
  endurance: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  faith: number;
  arcane: number;
}

export interface Milestone {
  level: string; // e.g. "RL50"
  focus: string;
}

export interface AcquisitionItem {
  name: string;
  location: string;
}

export interface Build {
  slug: string;
  name: string;
  archetype: string;
  playstyle: Playstyle;
  difficulty: Difficulty;
  fantasy: string;
  startingClass: string;
  startingClassWhy: string;
  targetLevel: number;
  stats: StatSpread;
  levelingOrder: string[];
  milestones: Milestone[];
  softcapNotes: string[];
  weapons: AcquisitionItem[];
  ashesOfWar: AcquisitionItem[];
  spells: AcquisitionItem[];
  talismans: AcquisitionItem[];
  armor: { recommendation: string; reasoning: string };
  consumables: {
    physick: string;
    crimson: string;
    cerulean: string;
    notes: string;
  };
  playstyleNotes: string;
  pveRating: number; // 1-10
  pvpRating: number; // 1-10
  dlcNotes: string;
  scadutreePriority: string;
  tier: { pve: Tier; pvp: Tier };
}

export const STAT_LABELS: { key: keyof StatSpread; label: string; short: string }[] = [
  { key: "vigor", label: "Vigor", short: "VIG" },
  { key: "mind", label: "Mind", short: "MND" },
  { key: "endurance", label: "Endurance", short: "END" },
  { key: "strength", label: "Strength", short: "STR" },
  { key: "dexterity", label: "Dexterity", short: "DEX" },
  { key: "intelligence", label: "Intelligence", short: "INT" },
  { key: "faith", label: "Faith", short: "FTH" },
  { key: "arcane", label: "Arcane", short: "ARC" },
];

export const builds: Build[] = [
  // 1 ---------------------------------------------------------------------
  {
    slug: "quality-warden",
    name: "Quality Warden",
    archetype: "Quality (Str/Dex Hybrid Melee)",
    playstyle: "Melee",
    difficulty: "Beginner",
    fantasy:
      "A disciplined hybrid warrior who lets a single great blade answer every problem. Balanced Strength and Dexterity unlock the entire weapon catalog so you are never the wrong build for the fight.",
    startingClass: "Vagabond",
    startingClassWhy:
      "Vagabond opens with high Vigor (15), respectable Str (14) and Dex (13), plus heavy armor and a shield — the most efficient launch point for a balanced melee character. Hero works too but wastes points in Strength you do not need at a 50/50 split; Warrior over-invests in Dex.",
    targetLevel: 150,
    stats: {
      vigor: 60,
      mind: 20,
      endurance: 30,
      strength: 40,
      dexterity: 40,
      intelligence: 9,
      faith: 9,
      arcane: 7,
    },
    levelingOrder: [
      "Vigor to 40 first — survival before damage, always.",
      "Endurance to ~25 so you can wear medium armor and swing without gassing out.",
      "Split Strength and Dexterity evenly toward 40/40.",
      "Top Vigor to 60 and Mind to 20 to finish the spread.",
    ],
    milestones: [
      { level: "RL50", focus: "VIG 35, END 20, STR 25, DEX 22 — survivable and swinging." },
      { level: "RL100", focus: "VIG 50, END 28, STR 35, DEX 35 — full damage online." },
      { level: "RL150", focus: "Final spread: VIG 60, STR 40, DEX 40, END 30, MND 20." },
    ],
    softcapNotes: [
      "Vigor: hard breakpoints at 40 and 60 — 60 is the last big HP jump.",
      "Strength/Dexterity damage soften at 55 and hard-cap at 80; 40 each is the efficient hybrid sweet spot.",
      "Endurance equip-load softcap ~50; stamina gains taper after 30.",
    ],
    weapons: [
      {
        name: "Bloodhound's Fang (Curved Greatsword)",
        location:
          "Reward for defeating the field boss Bloodhound Knight Darriwil at Forlorn Hound Evergaol, Limgrave (summon White Mask Varré for an easy kill).",
      },
      {
        name: "Backup: any Greatsword infused with Heavy or Keen to match your stronger stat",
        location:
          "Standard Greatsword drops from the Imp at the Stormhill caravan, or buy infusion stones from the Twin Maiden Husks at Roundtable Hold.",
      },
    ],
    ashesOfWar: [
      {
        name: "Bloodhound's Step (mobility/dodge skill)",
        location:
          "Drops from a Night's Cavalry on the bridge in Caelid (near Lenne's Rise) at night — slot it on a secondary weapon for clutch i-frame dodges.",
      },
      {
        name: "Lion's Claw (poise-breaking leap, native to Bloodhound's Fang)",
        location:
          "Native skill on Bloodhound's Fang; also found as an Ash of War in a chest on a wagon at Caelid's Forsaken Ruins.",
      },
    ],
    spells: [],
    talismans: [
      {
        name: "Erdtree's Favor (+HP, +stamina, +equip load)",
        location: "Fringefolk Hero's Cave, behind the Stonesword Key fog gate at the Stranded Graveyard (game start).",
      },
      {
        name: "Great-Jar's Arsenal (+19% equip load)",
        location: "Win the three NPC invasions at the Great Jar in northern Caelid.",
      },
      {
        name: "Dragoncrest Greatshield Talisman (-20% physical damage taken)",
        location: "Chest in a hidden cellar beneath the Elphael, Brace of the Haligtree (Malenia's region).",
      },
      {
        name: "Rotten Winged Sword Insignia (stacking attack on consecutive hits)",
        location: "Elphael, Brace of the Haligtree — on a corpse along the rooftop scaffolding.",
      },
    ],
    armor: {
      recommendation: "Carian Knight set or Bull-Goat's helm + medium chest, kept under 70% equip load.",
      reasoning:
        "Stay in the medium roll (≤70%) for the fast dodge. With Erdtree's Favor + Great-Jar's Arsenal you can run heavier chest pieces and still clear poise breakpoints (51 poise survives most single light hits).",
    },
    consumables: {
      physick: "Crimson Tear + Opaline Hardtear (flat damage reduction at the start of a fight).",
      crimson: "Lean Crimson-heavy (7+) — melee duels are about staying in the fight.",
      cerulean: "Minimal Cerulean (2-3); the only FP cost is your Ash of War.",
      notes: "Boiled Crab and Exalted Flesh before bosses for raw physical defense and damage.",
    },
    playstyleNotes:
      "Play the fundamentals: bait an attack, dodge through it, punish with a charged R2 or Lion's Claw to break stance, then critical. Bloodhound's Fang's innate blood loss rewards aggressive trades. Two-hand for the 1.5x Strength multiplier when you do not need a shield.",
    pveRating: 9,
    pvpRating: 7,
    dlcNotes:
      "Bloodhound's Fang remains excellent in the DLC. Consider the Milady (Light Greatsword) for faster combos — found early in Gravesite Plain. Light Greatswords received a poise-damage buff in 1.16.",
    scadutreePriority:
      "Rush Scadutree Fragments first — at +8 to +12 your physical builds keep pace with DLC scaling. Grab the Gravesite Plain and Castle Ensis fragments before fighting Rellana.",
    tier: { pve: "A", pvp: "B" },
  },

  // 2 ---------------------------------------------------------------------
  {
    slug: "colossus-breaker",
    name: "Colossus Breaker",
    archetype: "Pure Strength (Colossal Smasher)",
    playstyle: "Melee",
    difficulty: "Beginner",
    fantasy:
      "You do not dodge — you decide. Hyperarmor through enemy attacks and detonate poise bars with the heaviest weapons in the Lands Between.",
    startingClass: "Hero",
    startingClassWhy:
      "Hero starts with the highest Strength (16) and strong Vigor (14), so every early level goes straight into your damage and survival stats. Vagabond is a viable alternative but wastes early points in Dexterity that pure Strength ignores.",
    targetLevel: 150,
    stats: {
      vigor: 60,
      mind: 16,
      endurance: 40,
      strength: 66,
      dexterity: 12,
      intelligence: 9,
      faith: 9,
      arcane: 7,
    },
    levelingOrder: [
      "Vigor to 40 — colossal weapons are slow; you will get hit.",
      "Endurance to 30+ early so heavy armor + colossal weapon stays under 70%.",
      "Strength toward 54 (the two-handed 80 breakpoint), then push to 66 for the 99 effective cap when two-handing.",
      "Finish Vigor to 60 last.",
    ],
    milestones: [
      { level: "RL50", focus: "VIG 35, END 25, STR 35 — already hitting like a truck." },
      { level: "RL100", focus: "VIG 50, END 38, STR 54 (= 81 effective two-handed)." },
      { level: "RL150", focus: "VIG 60, END 40, STR 66 — past the 2H scaling cap for max AR." },
    ],
    softcapNotes: [
      "Strength softcaps at 55 then 80; two-handing multiplies STR by 1.5, so 54 STR = 81 effective. Investing to 66 reaches ~99 effective two-handed for the final drops.",
      "Endurance 40 is needed to carry heavy armor + a colossal weapon under medium load.",
      "Vigor 60 hard-cap matters most for a build that tanks hits.",
    ],
    weapons: [
      {
        name: "Giant-Crusher (Colossal Weapon, highest base AR)",
        location: "Chest on a caravan wagon guarded by giant dogs in the Outer Wall of Caelid (Aeonia/Sellia road).",
      },
      {
        name: "Greatsword (Colossal Sword — Guts' sword)",
        location: "Chest on a caravan in Dragonbarrow, Caelid, guarded by a Death Rite Bird at night.",
      },
    ],
    ashesOfWar: [
      {
        name: "Royal Knight's Resolve (next hit deals huge bonus damage)",
        location: "Reward for defeating the Erdtree Avatar at the foot of the southern minor Erdtree in Liurnia.",
      },
      {
        name: "Endure (hyperarmor + damage negation, perfect for trading)",
        location: "Found in a chest in the Auriza Hero's Cave, Capital Outskirts.",
      },
    ],
    spells: [],
    talismans: [
      {
        name: "Great-Jar's Arsenal (+19% equip load)",
        location: "Win the three duels at the Great Jar in northern Caelid.",
      },
      {
        name: "Claw Talisman (+15% jump attack damage)",
        location: "Stormveil Castle rooftops, on a corpse near the back exit.",
      },
      {
        name: "Axe Talisman (+10% charged attack damage)",
        location: "Chest in a Stormveil Castle room near the Liftside Chamber site of grace.",
      },
      {
        name: "Dragoncrest Greatshield Talisman (-20% physical damage)",
        location: "Hidden cellar in Elphael, Brace of the Haligtree.",
      },
    ],
    armor: {
      recommendation: "Bull-Goat's Set (highest poise in the game).",
      reasoning:
        "Bull-Goat reaches the 51 and 101 poise breakpoints so you tank through enemy combos and never get staggered mid-swing. Pair with Great-Jar's Arsenal to keep it under 70% equip load.",
    },
    consumables: {
      physick: "Crimson Tear + Opaline Hardtear (open fights with flat damage reduction while you close distance).",
      crimson: "Crimson-heavy (8+).",
      cerulean: "Minimal (2); only the Ash of War costs FP.",
      notes: "Exalted Flesh + Boiled Crab + a Bestial Vitality buff make charged R2s genuinely one-shot trash mobs.",
    },
    playstyleNotes:
      "Lead with jump attacks (Claw Talisman) to stagger, then charged R2s to crack poise for criticals. Use Endure to walk through a boss combo and answer with a guaranteed hit. Two-hand everything for the Strength multiplier.",
    pveRating: 9,
    pvpRating: 6,
    dlcNotes:
      "The DLC's Anvil Hammer and Smithscript Greathammer are strong Str picks. Great Hammers / Colossal weapons got a PvP poise-damage buff in 1.16, making trades even better.",
    scadutreePriority:
      "Scadutree Blessing is critical for slow builds — push to +10 before Messmer. Stat-wise no respec needed; the DLC is balanced around Scadutree level, not Rune Level.",
    tier: { pve: "A", pvp: "B" },
  },

  // 3 ---------------------------------------------------------------------
  {
    slug: "blade-of-the-tarnished",
    name: "Blade of the Tarnished",
    archetype: "Pure Dexterity (Katana / Fast Weapons)",
    playstyle: "Melee",
    difficulty: "Intermediate",
    fantasy:
      "Speed is your armor. Slip inside every swing and bury the enemy under a flurry of katana strikes faster than they can answer.",
    startingClass: "Samurai",
    startingClassWhy:
      "Samurai begins with a Uchigatana, a longbow, and 15 Dexterity — you are playing the build from minute one. Warrior is the alternative for dual-wielding but Samurai's starting kit and arrows are unmatched for a Dex opener.",
    targetLevel: 150,
    stats: {
      vigor: 60,
      mind: 20,
      endurance: 28,
      strength: 16,
      dexterity: 70,
      intelligence: 9,
      faith: 9,
      arcane: 9,
    },
    levelingOrder: [
      "Vigor to 40 — fast weapons still need you alive.",
      "Dexterity toward 50, then the 70 softcap path.",
      "Endurance to ~25 for light/medium armor and stamina for combos.",
      "Mind to 20 for Ash of War uptime; finish Vigor to 60.",
    ],
    milestones: [
      { level: "RL50", focus: "VIG 35, DEX 35, END 20 — bleeding things fast already." },
      { level: "RL100", focus: "VIG 50, DEX 55, END 25, MND 18." },
      { level: "RL150", focus: "VIG 60, DEX 70 (post-softcap for max AR), MND 20." },
    ],
    softcapNotes: [
      "Dexterity softcaps at 55 then 80; 70 is the efficient endpoint at RL150.",
      "Dexterity past 20 also removes fall damage and speeds spell/animation casting.",
      "Keep equip load under 70% — the medium roll is your defining tool.",
    ],
    weapons: [
      {
        name: "Uchigatana (Keen-infused for pure Dex scaling)",
        location: "Starting weapon for Samurai, or loot a second from Deathtouched Catacombs, Limgrave.",
      },
      {
        name: "Hand of Malenia (DLC-era top Dex katana)",
        location: "Wielded by Malenia, Blade of Miquella; trade her Remembrance to Enia at Roundtable Hold after the kill.",
      },
    ],
    ashesOfWar: [
      {
        name: "Unsheathe (fast iaido draw, huge stance damage)",
        location: "Native to several katanas; as an Ash of War, drops from a teardrop scarab in Limgrave's Mistwood near the minor Erdtree.",
      },
      {
        name: "Keen affinity stone (converts scaling to Dexterity)",
        location: "Whetstone knives/Ash stones from the Twin Maiden Husks; Keen Whetblade behavior via the Whetstone Knife found in the Gatefront Ruins chest.",
      },
    ],
    spells: [],
    talismans: [
      {
        name: "Rotten Winged Sword Insignia (stacking attack on consecutive hits)",
        location: "Elphael, Brace of the Haligtree rooftop.",
      },
      {
        name: "Millicent's Prosthesis (+Dex, stacking attack on hits)",
        location: "Reward for siding with Millicent at the end of her questline (Elphael).",
      },
      {
        name: "Lord of Blood's Exultation (+20% attack when blood loss procs nearby)",
        location: "Leyndell Catacombs (Subterranean Shunning-Grounds), behind a boss in the sewers.",
      },
      {
        name: "Erdtree's Favor (+HP/stamina/equip load)",
        location: "Fringefolk Hero's Cave at the Stranded Graveyard.",
      },
    ],
    armor: {
      recommendation: "White Reed / Land of Reeds set or any light-medium set kept under 70%.",
      reasoning:
        "Dex thrives on the medium roll. You do not need poise — you need to never get hit. Prioritize equip load over defense.",
    },
    consumables: {
      physick: "Thorny Cracked Tear + Crimson Tear (Thorny boosts consecutive-hit damage — perfect for flurries).",
      crimson: "Balanced 6-7 Crimson.",
      cerulean: "3-4 Cerulean for Ash of War spam.",
      notes: "Bloodboil Aromatic for an aggressive damage window when you need to burst.",
    },
    playstyleNotes:
      "Stay glued to the target. Light-attack chains with the occasional Unsheathe to crack stance, then critical. Roll-cancel R1s to fish for openings. The katana's innate blood loss does serious bonus damage on combo finishers.",
    pveRating: 8,
    pvpRating: 8,
    dlcNotes:
      "The DLC's Backhand Blades and Euporia (Twinblade) are elite Dex picks — Euporia tri-scales Str/Dex/Faith and unleashes a beam after 15 hits. Backhand Blade Bleed is a top-tier fast build.",
    scadutreePriority:
      "Scadutree +8 minimum before Messmer. Hand of Malenia and katanas scale well with Blessing levels.",
    tier: { pve: "A", pvp: "A" },
  },

  // 4 ---------------------------------------------------------------------
  {
    slug: "hemorrhage-reaper",
    name: "Hemorrhage Reaper",
    archetype: "Bleed / Arcane (Hemorrhage Stacker)",
    playstyle: "Status",
    difficulty: "Intermediate",
    fantasy:
      "Health bars are a suggestion. Stack blood loss until enemies erupt in a percentage-based hemorrhage burst that ignores their defenses.",
    startingClass: "Bandit",
    startingClassWhy:
      "Bandit starts with the highest Arcane (14) and lowest level (5), giving the cleanest foundation for an Arcane-scaling bleed build. Arcane raises both bleed buildup and the damage of Arcane-scaling weapons.",
    targetLevel: 150,
    stats: {
      vigor: 60,
      mind: 18,
      endurance: 25,
      strength: 18,
      dexterity: 30,
      intelligence: 9,
      faith: 9,
      arcane: 60,
    },
    levelingOrder: [
      "Vigor to 40.",
      "Arcane toward 45 (it boosts both bleed buildup and weapon AR for Blood/Occult infusions).",
      "Dexterity to ~18-30 to meet Rivers of Blood requirements and speed attacks.",
      "Finish Arcane to 60 and Vigor to 60.",
    ],
    milestones: [
      { level: "RL50", focus: "VIG 38, ARC 30, DEX 18 — bleed procs landing." },
      { level: "RL100", focus: "VIG 50, ARC 45, DEX 25, MND 16." },
      { level: "RL150", focus: "VIG 60, ARC 60, DEX 30 — full hemorrhage output." },
    ],
    softcapNotes: [
      "Arcane bleed-buildup scaling softcaps around 45; AR scaling for Arcane weapons softcaps at 55-80.",
      "Rivers of Blood requires 12 Str / 18 Dex / 20 Arcane minimum — meet those before infusing.",
      "Bleed is a flat-buildup proc: faster, lighter weapons proc it more often than raw AR suggests.",
    ],
    weapons: [
      {
        name: "Rivers of Blood (Katana, Corpse Piler skill)",
        location: "Drops from the invader Bloody Finger Okina at the Church of Repose, Mountaintops of the Giants.",
      },
      {
        name: "Eleonora's Poleblade (Twinblade, dual blood loss) — strong alternative",
        location: "Reward for completing Yura's questline and defeating Eleonora at the Second Church of Marika, Altus.",
      },
    ],
    ashesOfWar: [
      {
        name: "Seppuku (self-bleed buff + raw blood-buildup buff)",
        location: "Drops from a teardrop scarab in the Gelmir Hero's Cave, Mt. Gelmir — the single best Ash for bleed builds.",
      },
      {
        name: "Corpse Piler (native to Rivers of Blood)",
        location: "Innate to Rivers of Blood — spammable multi-hit blood-loss flurry.",
      },
    ],
    spells: [],
    talismans: [
      {
        name: "Lord of Blood's Exultation (+20% attack on nearby blood loss proc)",
        location: "Leyndell Catacombs (Subterranean Shunning-Grounds) boss reward.",
      },
      {
        name: "White Mask / Mohgwyn's Mask via the Lord of Blood line (+attack on blood loss)",
        location: "White Mask drops from a Mohg cultist invader in the Mohgwyn Palace consecrated snowfield.",
      },
      {
        name: "Rotten Winged Sword Insignia (stacking attack on consecutive hits)",
        location: "Elphael, Brace of the Haligtree rooftop.",
      },
      {
        name: "Millicent's Prosthesis (+Dex + stacking attack)",
        location: "Millicent questline reward at Elphael.",
      },
    ],
    armor: {
      recommendation: "White Mask + light set under 70% equip load.",
      reasoning:
        "The White Mask grants an attack buff whenever blood loss procs near you — and you proc it constantly. Keep load light for the medium roll; Seppuku already costs you health, so survivability comes from Vigor, not armor.",
    },
    consumables: {
      physick: "Thorny Cracked Tear + Crimson Tear (consecutive-hit damage feeds Corpse Piler flurries).",
      crimson: "7 Crimson (Seppuku self-damage means you need the heals).",
      cerulean: "3-4 Cerulean for Corpse Piler / Seppuku FP.",
      notes: "Bloodboil Aromatic stacks with everything for an explosive burst window.",
    },
    playstyleNotes:
      "Open with Seppuku for the bleed buff, then spam Corpse Piler. Stack blood loss until the proc deals a percentage of max HP — this melts even the tankiest bosses. The Mohgwyn Palace bird farm doubles as the best rune farm in the game.",
    pveRating: 10,
    pvpRating: 8,
    dlcNotes:
      "Bloodfiend's Arm and Scythe of Laceration are premier DLC bleed weapons. Backhand Blade + Bloodfiend's Arm is the current top bleed meta. Note: bleed status was tuned, but Arcane bleed remains S-tier.",
    scadutreePriority:
      "Scadutree +6 to +8 is enough; bleed scales off buildup, not raw Blessing AR, so you out-pace the DLC quickly.",
    tier: { pve: "S", pvp: "A" },
  },

  // 5 ---------------------------------------------------------------------
  {
    slug: "carian-glintblade-savant",
    name: "Carian Glintblade Savant",
    archetype: "Pure Sorcery (Intelligence Glass Cannon)",
    playstyle: "Caster",
    difficulty: "Intermediate",
    fantasy:
      "Erudition as artillery. Delete enemies from across the arena with glintstone barrages before they ever reach you.",
    startingClass: "Astrologer",
    startingClassWhy:
      "Astrologer starts with 16 Intelligence, a Glintstone Staff, and Glintstone Pebble — the optimal caster opener. Prisoner is an alternative for a hybrid spellblade, but for pure sorcery Astrologer wastes nothing.",
    targetLevel: 150,
    stats: {
      vigor: 60,
      mind: 35,
      endurance: 18,
      strength: 12,
      dexterity: 12,
      intelligence: 70,
      faith: 9,
      arcane: 7,
    },
    levelingOrder: [
      "Vigor to 40 (glass cannons die — buy yourself a mistake budget).",
      "Intelligence toward 60, then 80 for the absolute cap.",
      "Mind to 30-35 for FP to sustain casting.",
      "Endurance to ~18 for staff-carrying and a light dodge.",
    ],
    milestones: [
      { level: "RL50", focus: "VIG 35, INT 40, MND 22 — Rock Sling and Comet online." },
      { level: "RL100", focus: "VIG 50, INT 60, MND 30 — Comet Azur / Adula's Moonblade." },
      { level: "RL150", focus: "VIG 60, INT 70-80, MND 35." },
    ],
    softcapNotes: [
      "Intelligence sorcery scaling softcaps at 60, then 80 (hard cap). Push to 80 if you go RL150+.",
      "Mind softcap ~50 for FP, but 35 is plenty with a Cerulean-heavy physick.",
      "Use the Lusat's or Azur's staff for raw damage; Carian Regal Scepter for full-moon spells.",
    ],
    weapons: [
      {
        name: "Lusat's Glintstone Staff (highest sorcery scaling, +FP cost)",
        location: "Sellia Hideaway dungeon, Caelid — break the illusory wall behind the crystal-chunk room.",
      },
      {
        name: "Carian Regal Scepter (best for full-moon spells)",
        location: "Trade Rennala's Remembrance (Academy of Raya Lucaria boss) to Enia at Roundtable Hold.",
      },
    ],
    ashesOfWar: [],
    spells: [
      {
        name: "Rock Sling (gravity sorcery, ignores much of enemy resistance)",
        location: "Reward from the Street of Sages Ruins teardrop scarab in Caelid.",
      },
      {
        name: "Comet Azur (continuous beam — boss melter)",
        location: "Taught by Primeval Sorcerer Azur at the cliff in Mt. Gelmir.",
      },
      {
        name: "Adula's Moonblade + Loretta's Greatbow (mid-range pressure)",
        location:
          "Adula's Moonblade from the Cuckoo Knight Adula (Moonlight Altar / Ranni questline); Loretta's Greatbow from Royal Knight Loretta at Caria Manor, Liurnia.",
      },
      {
        name: "Terra Magica (boosts magic damage in an area — combo with Comet Azur)",
        location: "Academy of Raya Lucaria, dropped/looted near the Debate Parlor area.",
      },
    ],
    talismans: [
      {
        name: "Graven-School / Graven-Mass Talisman (+sorcery damage)",
        location: "Graven-Mass Talisman: chest in Sellia Crystal Tunnel, Caelid (DLC-region drops exist too).",
      },
      {
        name: "Magic Scorpion Charm (+magic damage, slight physical defense penalty)",
        location: "Reward from Seluvis / Preceptor Seluvis's questline in Liurnia.",
      },
      {
        name: "Radagon Icon (faster spell casting speed)",
        location: "Chest in a hidden room of the Debate Parlor, Academy of Raya Lucaria.",
      },
      {
        name: "Cerulean Amber Medallion (+max FP)",
        location: "Snow Valley Ruins / Mountaintops; +1 and +2 versions exist in later regions.",
      },
    ],
    armor: {
      recommendation: "Lusat's / Azur's Glintstone set or any light robe set.",
      reasoning:
        "Caster armor is cosmetic for damage — keep equip load low for a fast dodge. The pointed hats reduce FP costs by a hair on some sets. You will win or lose at range, not in melee.",
    },
    consumables: {
      physick: "Cerulean Hidden Tear (free FP for ~15s — combos with Comet Azur for an infinite beam) + Magic-Shrouding Cracked Tear.",
      crimson: "5 Crimson.",
      cerulean: "5+ Cerulean — you are FP-hungry.",
      notes: "The Cerulean Hidden Tear + Terra Magica + Comet Azur combo deletes most bosses in one beam.",
    },
    playstyleNotes:
      "Maintain distance. Open ranged fights with Rock Sling spam; for bosses, cast Terra Magica, pop the Cerulean Hidden Tear physick, and channel Comet Azur into them for the one-shot. Keep Adula's Moonblade for self-defense when enemies close in.",
    pveRating: 9,
    pvpRating: 7,
    dlcNotes:
      "The DLC adds powerful sorceries (e.g. Mass of Putrescence, Rings of Spectral Light). Carian Sorcery Sword and the new staffs expand the kit. Glass-cannon Int loves Scadutree damage scaling.",
    scadutreePriority:
      "Scadutree directly boosts spell damage — push +10 before Messmer/Romina. This is one of the builds that gains the most from Blessing levels.",
    tier: { pve: "A", pvp: "B" },
  },

  // 6 ---------------------------------------------------------------------
  {
    slug: "flame-of-the-fell-god",
    name: "Flame of the Fell God",
    archetype: "Faith Incantation (Dragon / Fire / Holy Caster)",
    playstyle: "Caster",
    difficulty: "Intermediate",
    fantasy:
      "Channel the wrath of gods and dragons. Rain holy fire, summon dragon breath, and heal yourself with every swing of a flaming blade.",
    startingClass: "Prophet",
    startingClassWhy:
      "Prophet opens with 16 Faith, a Finger Seal, and the Catch Flame + Heal incantations — a complete caster from level one. Confessor is an alternative hybrid but Prophet maximizes pure Faith.",
    targetLevel: 150,
    stats: {
      vigor: 60,
      mind: 35,
      endurance: 20,
      strength: 14,
      dexterity: 14,
      intelligence: 9,
      faith: 70,
      arcane: 7,
    },
    levelingOrder: [
      "Vigor to 40.",
      "Faith toward 60, then 80 for the cap.",
      "Mind to 30-35 for incantation FP.",
      "Endurance ~20 for the Blasphemous Blade and a light dodge.",
    ],
    milestones: [
      { level: "RL50", focus: "VIG 35, FTH 35, MND 20 — Catch Flame / Lightning Spear online." },
      { level: "RL100", focus: "VIG 50, FTH 55, MND 30 — Blasphemous Blade + big dragon incants." },
      { level: "RL150", focus: "VIG 60, FTH 70, MND 35." },
    ],
    softcapNotes: [
      "Faith incantation scaling softcaps at 55-60, hard cap 80.",
      "Blasphemous Blade requires 21 Faith and scales beautifully into the 60s+.",
      "Mind 35 keeps Taker's Flames and big dragon incants flowing.",
    ],
    weapons: [
      {
        name: "Blasphemous Blade (Faith Greatsword — Taker's Flames heals you on kill)",
        location: "Trade the Remembrance of the Blasphemous (Rykard, Mt. Gelmir) to Enia at Roundtable Hold.",
      },
      {
        name: "Godslayer's Greatsword / Finger Seal (your casting tool)",
        location: "Finger Seal from the Twin Maiden Husks at Roundtable Hold; Erdtree Seal (best Faith scaling) from the Fringefolk Hero's Cave.",
      },
    ],
    ashesOfWar: [
      {
        name: "Taker's Flames (native to Blasphemous Blade — ranged fire wave + lifesteal)",
        location: "Innate to Blasphemous Blade.",
      },
      {
        name: "Sacred Blade / Flame of the Redmanes (utility on a backup weapon)",
        location: "Flame of the Redmanes drops from a teardrop scarab in Fort Gael, Caelid.",
      },
    ],
    spells: [
      {
        name: "Lightning Spear / Ancient Dragons' Lightning Strike (ranged DPS)",
        location: "Lightning Spear from Fort Gael's rooftop (Caelid); Dragon-cult incants from the Cathedral of Dragon Communion (Caelid) for Dragon Hearts.",
      },
      {
        name: "Flame of the Fell God (giant fireball)",
        location: "Reward for defeating Adan, Thief of Fire at Malefactor's Evergaol, Liurnia.",
      },
      {
        name: "Black Flame / Black Flame's Protection (percentage-based fire + defense buff)",
        location: "Godskin Apostle drops and the Black Knife Catacombs / Godskin questline pickups.",
      },
      {
        name: "Golden Vow & Flame, Grant Me Strength (self-buffs — universal damage boost)",
        location: "Golden Vow (sorceress Corhyn/Goldmask area, or Corpse on Mt. Gelmir); Flame Grant Me Strength from the Fire Monk camp at the Fourth Church of Marika, Altus.",
      },
    ],
    talismans: [
      {
        name: "Flock's Canvas Talisman (+8% incantation damage)",
        location: "Cliffside in the Capital Outskirts / Leyndell approach.",
      },
      {
        name: "Faithful's Canvas Talisman (variant) or Two Fingers Heirloom (+5 Faith)",
        location: "Two Fingers Heirloom: Fringefolk Hero's Cave chest.",
      },
      {
        name: "Radagon Icon (faster cast speed) — helps incantation startup",
        location: "Hidden room of the Debate Parlor, Academy of Raya Lucaria.",
      },
      {
        name: "Great-Jar's Arsenal (equip load for the Blasphemous Blade + seal)",
        location: "Win the three Great Jar duels in northern Caelid.",
      },
    ],
    armor: {
      recommendation: "Light caster set; pick pieces that keep you under 70% with both a seal and the Blasphemous Blade equipped.",
      reasoning:
        "You alternate between casting and Blasphemous Blade melee, so you need a fast dodge. No poise needed — Taker's Flames keeps you healthy by lifesteal instead.",
    },
    consumables: {
      physick: "Flame-Shrouding Cracked Tear + Cerulean Hidden Tear (free FP burst for big incants).",
      crimson: "5 Crimson.",
      cerulean: "5 Cerulean.",
      notes: "Stack Golden Vow + Flame, Grant Me Strength before bosses for ~30% more damage and defense.",
    },
    playstyleNotes:
      "Buff with Golden Vow + Flame Grant Me Strength, then alternate Blasphemous Blade Taker's Flames (heals you and zones) with Lightning/Dragon incants at range. Black Flame chunks big health bars by percentage. This build is famously forgiving thanks to constant lifesteal.",
    pveRating: 10,
    pvpRating: 8,
    dlcNotes:
      "Blasphemous Blade is still S-tier in 1.16. The DLC adds Messmer's flame incants and the Fire Knight's Greatsword. Faith remains one of the strongest DLC archetypes.",
    scadutreePriority:
      "Scadutree boosts incantation damage — push +8 to +10. Blasphemous Blade lifesteal makes the DLC's harder fights very survivable.",
    tier: { pve: "S", pvp: "A" },
  },

  // 7 ---------------------------------------------------------------------
  {
    slug: "sacred-order-crusader",
    name: "Sacred Order Crusader",
    archetype: "Faith/Dex Buff-and-Beat (Sacred Weapon Hybrid)",
    playstyle: "Hybrid",
    difficulty: "Intermediate",
    fantasy:
      "Bathe your blade in holy light and let buffs do the math. A self-buffing duelist who hits like a caster but fights like a knight.",
    startingClass: "Confessor",
    startingClassWhy:
      "Confessor balances Faith (14), Dex (12), and Vigor (10) with the Assassin's Crimson Dagger and a seal — the ideal launchpad for a Faith/Dex hybrid. Prophet over-invests in Faith for a build that also wants Dex.",
    targetLevel: 150,
    stats: {
      vigor: 60,
      mind: 22,
      endurance: 25,
      strength: 16,
      dexterity: 45,
      intelligence: 9,
      faith: 45,
      arcane: 7,
    },
    levelingOrder: [
      "Vigor to 40.",
      "Split Dexterity and Faith evenly toward 45/45 (the hybrid sweet spot).",
      "Endurance to ~25 for medium armor.",
      "Mind to 22 for buff + incantation FP; finish Vigor to 60.",
    ],
    milestones: [
      { level: "RL50", focus: "VIG 35, DEX 25, FTH 25 — Sacred Blade + buffs online." },
      { level: "RL100", focus: "VIG 50, DEX 38, FTH 38, MND 20." },
      { level: "RL150", focus: "VIG 60, DEX 45, FTH 45, END 25." },
    ],
    softcapNotes: [
      "Sacred infusion splits scaling between Dex and Faith — 45/45 maximizes weapon AR.",
      "Faith 45 covers Golden Vow, Flame Grant Me Strength, and Bestial buffs.",
      "Dex 45 keeps fast weapons swinging and improves cast speed.",
    ],
    weapons: [
      {
        name: "Sacred Relic Sword (Wave of Gold AoE) or a Sacred-infused Nagakiba",
        location: "Sacred Relic Sword: trade the Elden Remembrance (final boss) to Enia. Early game, infuse a Nagakiba with the Sacred affinity.",
      },
      {
        name: "Golden Order Greatsword (holy beam Ash, Faith scaling)",
        location: "Reward for defeating Misbegotten Crusader + Crucible Knight duo at the Cave of the Forlorn, Consecrated Snowfield.",
      },
    ],
    ashesOfWar: [
      {
        name: "Sacred Blade (holy projectile + holy infusion)",
        location: "Reward for defeating the Deathbird north of the Warmaster's Shack, Stormhill.",
      },
      {
        name: "Golden Vow (Ash of War version — group attack/defense buff)",
        location: "Drops from a teardrop scarab on the bridge in Corpse-Stench Shack, Mt. Gelmir (Volcano Manor area).",
      },
    ],
    spells: [
      {
        name: "Golden Vow (self & ally attack/defense buff)",
        location: "Incantation taught by Corhyn/Goldmask, or via the Ash above.",
      },
      {
        name: "Flame, Grant Me Strength (+physical & fire attack)",
        location: "Fire Monk camp, Fourth Church of Marika, eastern Altus Plateau.",
      },
      {
        name: "Blessing's Boon / Erdtree Heal (sustain)",
        location: "Erdtree Heal from the Minor Erdtree Church, Mistwood; Blessing's Boon from various church incantation pickups.",
      },
    ],
    talismans: [
      {
        name: "Sacred Scorpion Charm (+holy damage, slight defense penalty)",
        location: "Reward for completing Gurranq / Beast Clergyman Deathroot offerings.",
      },
      {
        name: "Flock's Canvas Talisman (+8% incantation damage — boosts holy)",
        location: "Capital Outskirts cliffside corpse.",
      },
      {
        name: "Rotten Winged Sword Insignia (stacking attack on hits)",
        location: "Elphael, Brace of the Haligtree rooftop.",
      },
      {
        name: "Erdtree's Favor (+HP/stamina/equip load)",
        location: "Fringefolk Hero's Cave, Stranded Graveyard.",
      },
    ],
    armor: {
      recommendation: "Medium knightly set (Cleanrot / Carian Knight) under 70% equip load.",
      reasoning:
        "You trade in melee after buffing, so 30-51 poise helps you tank a hit mid-combo while staying in the medium roll.",
    },
    consumables: {
      physick: "Sacred-Shrouding Cracked Tear + Crimson Tear (boosts holy damage from your buffed swings).",
      crimson: "6 Crimson.",
      cerulean: "4 Cerulean for buffs + Sacred Blade.",
      notes: "Buff order before a fight: Golden Vow → Flame Grant Me Strength → Sacred Order weapon buff if used.",
    },
    playstyleNotes:
      "Pre-buff, then close in and trade with holy-infused melee, mixing in Sacred Blade projectiles for ranged poke. Wave of Gold (Sacred Relic Sword) clears mobs instantly. The buffs make your normal swings hit like a dedicated build's special attacks.",
    pveRating: 9,
    pvpRating: 8,
    dlcNotes:
      "The DLC's Euporia (Str/Dex/Faith tri-scaling Twinblade) is a perfect fit. Bayle's dragon incants and the new sacred Ashes expand options. Buff-and-beat is among the most consistent DLC clears.",
    scadutreePriority:
      "Scadutree +8 to +10. Both your weapon AR and incantation damage scale with Blessing, so this build feels strong throughout the DLC.",
    tier: { pve: "A", pvp: "A" },
  },

  // 8 ---------------------------------------------------------------------
  {
    slug: "winter-lord-frostbearer",
    name: "Winter Lord Frostbearer",
    archetype: "Frost / Cold Control",
    playstyle: "Hybrid",
    difficulty: "Intermediate",
    fantasy:
      "Freeze the battlefield. Frostbite saps enemy damage negation and stamina while the Dark Moon's chill empowers your blade and your sorceries.",
    startingClass: "Prisoner",
    startingClassWhy:
      "Prisoner balances Int (14), Dex (14), Mind, and Vigor — the ideal hybrid base for a frost build that wants both cold-infused melee and moon sorceries. Astrologer works for a more spell-heavy version.",
    targetLevel: 150,
    stats: {
      vigor: 60,
      mind: 28,
      endurance: 22,
      strength: 16,
      dexterity: 18,
      intelligence: 60,
      faith: 9,
      arcane: 7,
    },
    levelingOrder: [
      "Vigor to 40.",
      "Intelligence toward 50-60 (boosts cold AR, frost buildup proxy via sorcery, and Dark Moon scaling).",
      "Mind to 28 for sorcery + Ash of War FP.",
      "Dexterity to ~18 for weapon requirements and cast speed.",
    ],
    milestones: [
      { level: "RL50", focus: "VIG 35, INT 35, MND 20 — Cold infusion + Glintstone spells." },
      { level: "RL100", focus: "VIG 50, INT 55, MND 25 — Dark Moon Greatsword + Frostbite stacks." },
      { level: "RL150", focus: "VIG 60, INT 60, MND 28." },
    ],
    softcapNotes: [
      "Frostbite is a flat-buildup proc — once it triggers it lowers enemy damage negation by ~20% and chips HP.",
      "Cold infusion scales primarily with Int; Int sorcery softcap at 60.",
      "Dark Moon Greatsword's Moonlight buff adds frost + magic damage to attacks.",
    ],
    weapons: [
      {
        name: "Dark Moon Greatsword (frost + magic, buffs the blade with cold)",
        location: "End of Ranni's questline — given the Dark Moon Ring and cast it at the Cathedral of Manus Celes, Moonlight Altar.",
      },
      {
        name: "Cold-infused Hoarfrost-capable weapon (e.g. Cold Nagakiba or Estoc) for fast Frostbite procs",
        location: "Infuse with the Cold affinity using the Whetblade; apply Hoarfrost Stomp (below).",
      },
    ],
    ashesOfWar: [
      {
        name: "Hoarfrost Stomp (AoE frost wave — fast frostbite buildup)",
        location: "Drops from a teardrop scarab in the moat at Caria Manor, Liurnia (was nerfed but still strong).",
      },
      {
        name: "Chilling Mist (close-range frost cloud)",
        location: "Found in a chest in the Roundtable Hold via Stonesword Key fog, or as a field drop in Liurnia.",
      },
    ],
    spells: [
      {
        name: "Adula's Moonblade (ranged frost slash)",
        location: "Drops from Cuckoo Knight Adula at the Three Sisters / Moonlight Altar area, Liurnia.",
      },
      {
        name: "Glintstone Icecrag / Freezing Mist (frost sorceries)",
        location: "Icecrag from the Caria Manor area; Freezing Mist from a teardrop scarab near the Cathedral of Manus Celes.",
      },
      {
        name: "Rock Sling (reliable raw damage that pairs with frost)",
        location: "Street of Sages Ruins teardrop scarab, Caelid.",
      },
    ],
    talismans: [
      {
        name: "Graven-Mass Talisman (+sorcery damage)",
        location: "Chest in Sellia Crystal Tunnel, Caelid.",
      },
      {
        name: "Magic Scorpion Charm (+magic damage)",
        location: "Seluvis's questline reward, Liurnia.",
      },
      {
        name: "Shard of Alexander (+15% skill/Ash of War damage — boosts Hoarfrost & Moonlight)",
        location: "Reward for completing Iron Fist Alexander's questline.",
      },
      {
        name: "Cerulean Amber Medallion (+max FP)",
        location: "Snow Valley Ruins, Mountaintops of the Giants.",
      },
    ],
    armor: {
      recommendation: "Light-medium set under 70%; Snow Witch set thematically boosts cold sorcery slightly.",
      reasoning:
        "You weave between casting and cold melee — keep the medium roll. No poise required; frostbite control keeps enemies on the back foot.",
    },
    consumables: {
      physick: "Magic-Shrouding Cracked Tear + Cerulean Hidden Tear (FP for Dark Moon's expensive Ash).",
      crimson: "5 Crimson.",
      cerulean: "5 Cerulean.",
      notes: "Apply Dark Moon's Moonlight buff at the start of a boss fight for sustained frost + magic on every swing.",
    },
    playstyleNotes:
      "Open with Hoarfrost Stomp or Adula's Moonblade to stack frostbite — once it procs, the enemy takes ~20% more damage from everything. Then swap to Dark Moon Greatsword, buff with its Moonlight skill, and trade aggressively while the debuff is active. Re-apply frost as it wears off.",
    pveRating: 9,
    pvpRating: 8,
    dlcNotes:
      "Dark Moon Greatsword is still a top magic weapon post-DLC. The DLC adds new cold weapons and the powerful Frozen Lightning Spear. Frostbite's negation debuff is invaluable against tanky DLC bosses.",
    scadutreePriority:
      "Scadutree +8 to +10 boosts both Dark Moon AR and sorcery damage. Frostbite uptime makes the climb to higher Blessing levels easier.",
    tier: { pve: "A", pvp: "A" },
  },

  // 9 ---------------------------------------------------------------------
  {
    slug: "moonveil-spellblade",
    name: "Moonveil Spellblade",
    archetype: "Spellblade (Int + Melee)",
    playstyle: "Hybrid",
    difficulty: "Beginner",
    fantasy:
      "Draw the blade and the night follows. A katana that fires arcs of moonlight, blending crisp melee with ranged magic bursts.",
    startingClass: "Prisoner",
    startingClassWhy:
      "Prisoner starts with Int (14) and Dex (14) plus a Glintstone Staff and Estoc — exactly the stat shape a spellblade needs, so no points are wasted. Astrologer can work but leans too caster-heavy for melee.",
    targetLevel: 150,
    stats: {
      vigor: 60,
      mind: 25,
      endurance: 22,
      strength: 12,
      dexterity: 25,
      intelligence: 60,
      faith: 9,
      arcane: 7,
    },
    levelingOrder: [
      "Vigor to 40.",
      "Intelligence toward 60 (drives Moonveil AR and your sorceries).",
      "Dexterity to ~18-25 (Moonveil requirement + cast speed).",
      "Mind to 25 for Transient Moonlight FP; finish Vigor to 60.",
    ],
    milestones: [
      { level: "RL50", focus: "VIG 35, INT 35, DEX 18, MND 18 — Moonveil online." },
      { level: "RL100", focus: "VIG 50, INT 55, DEX 22, MND 22." },
      { level: "RL150", focus: "VIG 60, INT 60, DEX 25, MND 25." },
    ],
    softcapNotes: [
      "Moonveil scales mainly with Int (B/A range) — push Int to 60 for the softcap.",
      "Dex past Moonveil's 18 requirement mostly speeds cast/attack animations.",
      "Mind 25 sustains repeated Transient Moonlight casts.",
    ],
    weapons: [
      {
        name: "Moonveil (Katana — Transient Moonlight ranged beam)",
        location: "Drops from the Magma Wyrm in the Gael Tunnel between Limgrave and Caelid — accessible very early.",
      },
      {
        name: "Carian Glintblade Staff / Lusat's Staff for sorceries",
        location: "Carian Glintblade Staff from Royal Knight Loretta (Caria Manor); Lusat's from Sellia Hideaway, Caelid.",
      },
    ],
    ashesOfWar: [
      {
        name: "Transient Moonlight (native to Moonveil — vertical/horizontal magic slashes)",
        location: "Innate to Moonveil.",
      },
      {
        name: "Glintblade Phalanx / Carian sorceries as Ashes on a backup",
        location: "Carian spells learned from Preceptor Seluvis and the Royal House Scroll (Thops's Barrier).",
      },
    ],
    spells: [
      {
        name: "Glintstone Pebble / Great Glintstone Shard (ranged poke)",
        location: "Pebble is Astrologer/Prisoner starter or from Sorceress Sellen; Great Shard from Raya Lucaria pickups.",
      },
      {
        name: "Carian Slicer / Carian Piercer (fast melee-range sorceries)",
        location: "Royal House Scroll given to Sellen/Thops (found in the Academy of Raya Lucaria).",
      },
      {
        name: "Scholar's Armament (buffs a weapon with magic damage)",
        location: "Royal House Scroll spells from Sorceress Sellen / Thops.",
      },
    ],
    talismans: [
      {
        name: "Magic Scorpion Charm (+magic damage)",
        location: "Seluvis's questline reward, Liurnia.",
      },
      {
        name: "Graven-Mass Talisman (+sorcery damage)",
        location: "Sellia Crystal Tunnel chest, Caelid.",
      },
      {
        name: "Shard of Alexander (+15% skill damage — boosts Transient Moonlight)",
        location: "Iron Fist Alexander questline reward.",
      },
      {
        name: "Carian Filigreed Crest (-FP cost of skills — more Transient Moonlight)",
        location: "Buy from War Counselor Iji in Liurnia (Ranni's questline area).",
      },
    ],
    armor: {
      recommendation: "Light set under 70% for the fast roll.",
      reasoning:
        "You dart in and out of melee range; mobility beats poise. The build wins by spacing Transient Moonlight beams, not by tanking.",
    },
    consumables: {
      physick: "Magic-Shrouding Cracked Tear + Cerulean Hidden Tear (free FP to spam Transient Moonlight).",
      crimson: "5 Crimson.",
      cerulean: "5 Cerulean.",
      notes: "Scholar's Armament before a fight adds extra magic damage to your normal swings.",
    },
    playstyleNotes:
      "The Moonveil loop: poke with R1, then Transient Moonlight (light then heavy) for ranged magic burst that also staggers. Mix Carian Slicer for fast melee-range damage. Extremely beginner-friendly because Transient Moonlight both deals damage and creates safe space.",
    pveRating: 8,
    pvpRating: 9,
    dlcNotes:
      "Moonveil remains a strong, accessible spellblade. The DLC's Carian Sorcery Sword and Rellana's Twin Blades (dual moon/fire) are elite upgrades for this archetype.",
    scadutreePriority:
      "Scadutree +8. Transient Moonlight is an Ash of War and benefits from both Scadutree and Shard of Alexander.",
    tier: { pve: "A", pvp: "S" },
  },

  // 10 --------------------------------------------------------------------
  {
    slug: "unbowed-bastion",
    name: "Unbowed Bastion",
    archetype: "Poise-Tank / Hyperarmor Brawler",
    playstyle: "Melee",
    difficulty: "Advanced",
    fantasy:
      "An immovable wall of iron. You walk through enemy combos like rain and answer each one with a stance-shattering blow.",
    startingClass: "Vagabond",
    startingClassWhy:
      "Vagabond's high starting Vigor and balanced melee stats make it the cleanest base for a tank. Hero is fine too if you go pure Strength, but Vagabond's defensive starting kit suits the poise playstyle.",
    targetLevel: 150,
    stats: {
      vigor: 60,
      mind: 16,
      endurance: 45,
      strength: 54,
      dexterity: 20,
      intelligence: 9,
      faith: 14,
      arcane: 7,
    },
    levelingOrder: [
      "Vigor to 40 first.",
      "Endurance to 45+ — this is the build's identity (poise + equip load for heavy armor).",
      "Strength to 54 (the 80 two-handed breakpoint).",
      "Faith to 14 for Golden Vow / Flame Grant Me Strength self-buffs; finish Vigor to 60.",
    ],
    milestones: [
      { level: "RL50", focus: "VIG 35, END 35, STR 30 — Bull-Goat poise online." },
      { level: "RL100", focus: "VIG 50, END 45, STR 45, FTH 12." },
      { level: "RL150", focus: "VIG 60, END 45, STR 54, FTH 14." },
    ],
    softcapNotes: [
      "Poise breakpoints: 51 (survives most single hits), 101 (survives heavy combos) — Bull-Goat set reaches these.",
      "Endurance equip-load softcap ~50; you need ~45 to wear Bull-Goat + a heavy weapon under 70%.",
      "Strength 54 = 81 effective two-handed.",
    ],
    weapons: [
      {
        name: "Great Stars (Great Hammer — hyperarmor + innate HP recovery on hit)",
        location: "Dropped by a Night's Cavalry on the Forbidden Lands road to the Mountaintops of the Giants.",
      },
      {
        name: "Greatsword or Starscourge Greatswords (paired colossal hyperarmor)",
        location: "Starscourge Greatswords: trade Radahn's Remembrance to Enia. Greatsword: Dragonbarrow caravan chest.",
      },
    ],
    ashesOfWar: [
      {
        name: "Endure (hyperarmor + 35% damage negation — tank a full combo)",
        location: "Chest in the Auriza Hero's Cave, Capital Outskirts.",
      },
      {
        name: "Barricade Shield / Golden Vow (defensive buffs on a shield or weapon)",
        location: "Golden Vow Ash: Corpse-Stench Shack teardrop scarab, Mt. Gelmir.",
      },
    ],
    spells: [
      {
        name: "Golden Vow (incantation — +attack/+defense)",
        location: "Taught by Corhyn/Goldmask after their questline; requires a seal + 14 Faith.",
      },
      {
        name: "Flame, Grant Me Strength (+physical/fire attack)",
        location: "Fire Monk camp, Fourth Church of Marika, Altus Plateau.",
      },
    ],
    talismans: [
      {
        name: "Bull-Goat's Talisman (+33% poise)",
        location: "Reward from Great-Jar after the three duels (alongside the Arsenal) / Volcano Manor questline area.",
      },
      {
        name: "Great-Jar's Arsenal (+19% equip load)",
        location: "Win the three Great Jar duels, northern Caelid.",
      },
      {
        name: "Dragoncrest Greatshield Talisman (-20% physical damage)",
        location: "Hidden cellar, Elphael, Brace of the Haligtree.",
      },
      {
        name: "Erdtree's Favor (+HP/stamina/equip load)",
        location: "Fringefolk Hero's Cave, Stranded Graveyard.",
      },
    ],
    armor: {
      recommendation: "Full Bull-Goat's Set (highest poise) — Bull-Goat's Talisman + Great-Jar's Arsenal keep it under 70%.",
      reasoning:
        "The entire build is built around reaching 101 poise so you never get staggered mid-swing, letting you trade favorably against any combo. Equip-load talismans are mandatory to keep the medium roll.",
    },
    consumables: {
      physick: "Opaline Hardtear (flat damage reduction) + Crimson Tear.",
      crimson: "8 Crimson — you exist to absorb punishment.",
      cerulean: "2 Cerulean.",
      notes: "Pre-buff Golden Vow + Flame Grant Me Strength; the Great Stars heals you on every hit, snowballing sustain.",
    },
    playstyleNotes:
      "Activate Endure or simply rely on Bull-Goat poise, then walk into the enemy and out-trade them — your hyperarmor weapon keeps swinging while theirs gets interrupted. Charged R2s break stance for criticals. This is a patient, immovable playstyle that punishes greedy attacks.",
    pveRating: 8,
    pvpRating: 7,
    dlcNotes:
      "Great Hammers and Colossal weapons received PvP poise-damage buffs in 1.16, improving trades. The DLC's heavy weapons (Anvil Hammer) fit perfectly. Poise tanks scale smoothly with Scadutree.",
    scadutreePriority:
      "Scadutree +8 to +10 for damage; the tankiness is innate. Bull-Goat poise + Blessing makes you nearly unstaggerable in the DLC.",
    tier: { pve: "B", pvp: "B" },
  },

  // 11 --------------------------------------------------------------------
  {
    slug: "twilight-duelist",
    name: "Twilight Duelist",
    archetype: "PvP Duelist (Meta-Optimized)",
    playstyle: "Melee",
    difficulty: "Advanced",
    fantasy:
      "Forged for the dueling fingers. Every point is placed for the 1v1 meta — punishing whiffs, winning trades, and out-spacing in the arena.",
    startingClass: "Confessor",
    startingClassWhy:
      "Confessor's balanced spread (decent Vigor, Dex, Faith, and Mind) is the most efficient base for the standard meta level (RL125-150) where you want Vigor, a damage stat, and Faith for buffs like Golden Vow with minimal wasted points.",
    targetLevel: 150,
    stats: {
      vigor: 60,
      mind: 20,
      endurance: 25,
      strength: 14,
      dexterity: 55,
      intelligence: 9,
      faith: 25,
      arcane: 9,
    },
    levelingOrder: [
      "Vigor to 60 first — non-negotiable for PvP survival against burst.",
      "Dexterity toward 55 for your primary weapon's AR.",
      "Faith to 25 for Golden Vow / Bestial buffs and Faith-scaling weapon options.",
      "Endurance to 25 for the medium roll with a mid-weight set; Mind to 20.",
    ],
    milestones: [
      { level: "RL50", focus: "VIG 40, DEX 30, END 18 — survivable in early invasions." },
      { level: "RL100", focus: "VIG 55, DEX 45, FTH 20, END 22." },
      { level: "RL150", focus: "VIG 60, DEX 55, FTH 25, MND 20 (meta 'soft' RL150)." },
    ],
    softcapNotes: [
      "Vigor 60 is mandatory in PvP — burst combos at meta level routinely exceed 1000 damage.",
      "Dex 55 hits the first softcap; the medium roll (≤70% load) is the single most important PvP stat after Vigor.",
      "Faith 25 unlocks Golden Vow and many self-buffs without over-committing.",
    ],
    weapons: [
      {
        name: "Nagakiba or Great Épée (long reach for whiff-punishing) — Keen-infused",
        location: "Nagakiba: complete or kill Yura at the Seethewater River, or find it in Murkwater Cave. Great Épée: Weeping Peninsula chest.",
      },
      {
        name: "A status off-hand (Cold or Blood infusion) for mix-ups",
        location: "Infuse a fast secondary at any Site of Grace with the appropriate Whetblade affinity.",
      },
    ],
    ashesOfWar: [
      {
        name: "Bloodhound's Step (i-frame dodge skill — meta dueling staple)",
        location: "Drops from a Night's Cavalry at the Caelid bridge near Lenne's Rise (night only).",
      },
      {
        name: "Wild Strikes / Spinning Slash (poise-friendly pressure)",
        location: "Found across Limgrave/Liurnia teardrop scarabs and merchant stock.",
      },
    ],
    spells: [
      {
        name: "Golden Vow (self-buff — +attack/+defense)",
        location: "Corhyn/Goldmask questline incantation, or the Ash of War version at Mt. Gelmir.",
      },
      {
        name: "Bestial Vitality (slow heal — sustains poke wars)",
        location: "Bought from Gurranq, the Beast Clergyman, after a Deathroot offering.",
      },
    ],
    talismans: [
      {
        name: "Crimson Amber Medallion +2 (+max HP)",
        location: "+2 in the Mohgwyn Palace consecrated snowfield; lower tiers in Limgrave/Altus.",
      },
      {
        name: "Dragoncrest Greatshield Talisman (-20% physical damage)",
        location: "Hidden cellar, Elphael, Brace of the Haligtree.",
      },
      {
        name: "Bull-Goat's Talisman or a poise talisman (avoid getting stun-locked)",
        location: "Great-Jar reward / Volcano Manor area.",
      },
      {
        name: "Green Turtle Talisman (+stamina recovery speed — win stamina wars)",
        location: "Behind an illusory wall in the Stormveil Castle cellar (gaol).",
      },
    ],
    armor: {
      recommendation: "Mid-weight set tuned for 51 poise while staying under 70% equip load.",
      reasoning:
        "The PvP sweet spot is 51 poise (survives a single light hit without flinching) at the lightest possible weight for a fast medium roll. Mix heavy gauntlets/legs with a lighter chest to hit it.",
    },
    consumables: {
      physick: "Opaline Bubbletear (negate one big hit) + Crimson Tear, or Stamina-recovery + Crimson for poke duels.",
      crimson: "7 Crimson.",
      cerulean: "3 Cerulean.",
      notes: "Pre-fight buffs are duel-etiquette dependent; Golden Vow + Bestial Vitality are standard for no-rules clubs.",
    },
    playstyleNotes:
      "Duel fundamentals: control spacing with a long weapon, whiff-punish with a roll-into-R1, and use Bloodhound's Step to dodge through committal attacks. Never empty your stamina bar. Mix up Cold/Blood off-hand for status pressure. Patience and spacing win meta duels far more than raw damage.",
    pveRating: 6,
    pvpRating: 10,
    dlcNotes:
      "1.16 rebalanced poise damage across many weapon classes — dual-wield straight/thrusting/curved/katana attacks gained PvP poise damage, shifting the duel meta. Backhand Blades and Light Greatswords are strong DLC dueling picks.",
    scadutreePriority:
      "N/A for pure PvP (Scadutree only affects the DLC zones). If dueling in the DLC arenas, match your opponent's Blessing level.",
    tier: { pve: "B", pvp: "S" },
  },

  // 12 --------------------------------------------------------------------
  {
    slug: "venomous-jester",
    name: "Venomous Jester",
    archetype: "Meme-but-OP (Status-Stacking Cheese)",
    playstyle: "Status",
    difficulty: "Advanced",
    fantasy:
      "Why pick one status when you can inflict them all? Poison, rot, bleed, and frost cascade onto enemies until their own body kills them while you laugh from behind a wall.",
    startingClass: "Bandit",
    startingClassWhy:
      "Bandit's high Arcane (14) and low starting level let you maximize status buildup (Arcane boosts most status effects) while keeping the build lean. It is the cheapest entry into a multi-status stacker.",
    targetLevel: 150,
    stats: {
      vigor: 60,
      mind: 18,
      endurance: 25,
      strength: 18,
      dexterity: 20,
      intelligence: 9,
      faith: 9,
      arcane: 70,
    },
    levelingOrder: [
      "Vigor to 40.",
      "Arcane toward 60-70 (raises bleed, poison, and rot buildup and Arcane weapon AR).",
      "Endurance to ~25 to carry weapons + a greatshield.",
      "Dexterity/Strength only to weapon requirements; finish Vigor to 60.",
    ],
    milestones: [
      { level: "RL50", focus: "VIG 38, ARC 35, END 18 — first status procs landing." },
      { level: "RL100", focus: "VIG 50, ARC 55, END 22 — multi-status stacking online." },
      { level: "RL150", focus: "VIG 60, ARC 70, END 25 — maximum buildup." },
    ],
    softcapNotes: [
      "Arcane raises status buildup (bleed/poison/rot) — softcap ~45 for buildup, higher still adds Arcane weapon AR.",
      "Statuses are flat-buildup: dual-wielding two status weapons applies two pools at once for rapid procs.",
      "Scarlet Rot and Poison are damage-over-time that ignore poise/posture — perfect for cheese.",
    ],
    weapons: [
      {
        name: "Antspur Rapier (innate Scarlet Rot) — main hand",
        location: "Given by the NPC Latenna's questline area / found at the Shaded Castle, Altus Plateau (drops from a wandering noble).",
      },
      {
        name: "Fingerprint Stone Shield (the thrusting-shield cheese: 100% physical block + Thrusting Shield poke)",
        location: "Leyndell, Subterranean Shunning-Grounds — on a corpse guarded by enemies near the sewer depths.",
      },
      {
        name: "Off-hand: a Blood/Poison-infused fast weapon for a second status pool",
        location: "Infuse any fast weapon with Blood or Poison affinity via the Whetblade.",
      },
    ],
    ashesOfWar: [
      {
        name: "Thrusting Shield / Shield Bash (poke from behind a 100%-block shield)",
        location: "Thrusting Shield is native to the Fingerprint Stone Shield; slot Shield Bash from the Twin Maiden Husks stock.",
      },
      {
        name: "Poison Moth Flight / Seppuku (extra status application)",
        location: "Poison Moth Flight: teardrop scarab at the Mistwood, Limgrave. Seppuku: Gelmir Hero's Cave scarab.",
      },
    ],
    spells: [
      {
        name: "Poison Mist / Scarlet Aeonia (incantation, if you splash Faith later)",
        location: "Optional — Scarlet Aeonia from Malenia's Remembrance; Poison Mist from a church incantation pickup.",
      },
    ],
    talismans: [
      {
        name: "Kindred of Rot's Exultation (+20% attack when poison/rot procs nearby)",
        location: "Drops from a Putrid Avatar in the Swamp of Aeonia, Caelid.",
      },
      {
        name: "Lord of Blood's Exultation (+20% attack when blood loss procs nearby)",
        location: "Leyndell Catacombs (Subterranean Shunning-Grounds) boss reward.",
      },
      {
        name: "Mottled Necklace +1 (+immunity/robustness/focus + slight damage)",
        location: "Consecrated Snowfield ruins (+1 version); base version in the Subterranean Shunning-Grounds.",
      },
      {
        name: "Dragoncrest Greatshield Talisman (-20% physical — survive while statuses tick)",
        location: "Hidden cellar, Elphael, Brace of the Haligtree.",
      },
    ],
    armor: {
      recommendation: "Whatever keeps you under 70% with a greatshield and two weapons; prioritize immunity/robustness pieces.",
      reasoning:
        "You play defensively behind the 100%-block Fingerprint Shield, so equip load is about carrying the kit, not poise. Higher robustness/immunity helps in PvP status mirrors.",
    },
    consumables: {
      physick: "Thorny Cracked Tear + Crimson Tear, or Opaline Hardtear for turtle-cheese survivability.",
      crimson: "6 Crimson.",
      cerulean: "3 Cerulean.",
      notes: "Bloodboil Aromatic / Poison & Rot grease can be applied to weapons for even faster status stacking.",
    },
    playstyleNotes:
      "The cheese loop: raise the Fingerprint Stone Shield (blocks 100% physical), poke with Thrusting Shield or the Antspur Rapier from behind it, and let Scarlet Rot + your off-hand status tick the enemy to death. Both Exultation talismans fire whenever statuses proc, so your chip damage spikes hard. It looks silly; it kills everything.",
    pveRating: 7,
    pvpRating: 8,
    dlcNotes:
      "The DLC's Poisoned/Rotten Stake and Bloodfiend's Arm add new status tools. Perfume Bottles (a status meme favorite) were nerfed in 1.12.3/1.16 — note that if you plan around them. Status DoT remains excellent against tanky DLC bosses.",
    scadutreePriority:
      "Scadutree +6 is enough — status DoT scales off buildup, not Blessing AR, so you out-pace the DLC early.",
    tier: { pve: "B", pvp: "A" },
  },
];

export function getBuild(slug: string): Build | undefined {
  return builds.find((b) => b.slug === slug);
}
