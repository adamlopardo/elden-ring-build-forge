# ⚔️ Elden Ring Build Forge

An OP build generator for *Elden Ring*. It designs end-to-end character builds — exact stat allocation, starting class, weapons/spells/talismans with **in-game locations**, leveling order with milestone snapshots, and an **AI route planner** that tells you precisely how to acquire each build from a fresh character.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**. The AI chat runs through a **server-side Anthropic proxy** so your API key never touches the client. Ready to push to GitHub and deploy to Vercel.

> **Patch targeted:** Calibration **1.16** (the *Shadow of the Erdtree* era). Build data reflects the current DLC meta — bleed/stance/ranged dominance, the 1.16 poise-damage rebalance across weapon classes, and the DLC weapon nerfs (Rolling Sparks, perfume bottles). Scadutree Blessing priority is noted per build.

---

## Features

| Feature | What it does |
| --- | --- |
| **Build Library** | 12 fully-detailed builds across the full archetype spectrum. Card grid with a sticky playstyle/difficulty filter and search. |
| **Build Detail Pages** | Stat allocation table, leveling order + milestones + softcap notes, weapon/Ash/spell/talisman locations, armor reasoning, physick setup, playstyle, PvE/PvP ratings, and DLC/Scadutree notes. |
| **Ask the Forge (AI Route Planner)** | Per-build chat panel that sends the **full build object** to Claude and returns an ordered acquisition route (areas → bosses → pickups → rune farms). Markdown rendering, loading + error states. |
| **Build Finder** | Pick playstyle, difficulty, focus (PvE/PvP/Both), and current Rune Level → ranked best-fit build with match-reasoning. |
| **Stat Calculator** | Choose an archetype + target level → recommended spread with live softcap warnings and AR-relevant scaling reminders. |
| **Tier List** | S/A/B rankings with a PvE/PvP toggle and one-line justifications. |

---

## Local setup

```bash
# 1. Install dependencies
npm install

# 2. Create your env file from the template
cp .env.example .env.local
#    then edit .env.local and paste your key:
#    ANTHROPIC_API_KEY=sk-ant-...

# 3. Run the dev server
npm run dev
```

Open <http://localhost:3000>.

Get an API key at <https://console.anthropic.com/>. The key is read **only** on the server in [`app/api/chat/route.ts`](app/api/chat/route.ts) — it is never bundled into client code.

> The whole app works without a key **except** the "Ask the Forge" chat, which needs `ANTHROPIC_API_KEY`. Without it, the chat returns a clear error telling you to set the variable.

### Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

---

## Deploy to Vercel

1. Push this repo to GitHub (see the Deploy Checklist below).
2. Go to <https://vercel.com/new> and **Import** the repository.
3. Framework preset auto-detects **Next.js** — keep the defaults.
4. Before (or right after) the first deploy, add the environment variable:
   - **Settings → Environment Variables**
   - Key: `ANTHROPIC_API_KEY` · Value: your `sk-ant-...` key · Environments: Production + Preview + Development
   - (Optional) `ANTHROPIC_MODEL` to override the default `claude-sonnet-4-6`.
5. **Deploy** (or **Redeploy** if you added the variable after the first build so it picks up the new env).

The AI chat works as soon as `ANTHROPIC_API_KEY` is set on the server.

### One-click deploy

You can also use the Vercel "Deploy" button flow: import the GitHub repo, set `ANTHROPIC_API_KEY` when prompted, and ship.

---

## Project structure

```
elden-ring-generator/
├── app/
│   ├── api/chat/route.ts        # Anthropic proxy (server-only, reads ANTHROPIC_API_KEY)
│   ├── builds/[slug]/page.tsx   # build detail + Ask the Forge chat
│   ├── calculator/page.tsx      # stat calculator
│   ├── finder/page.tsx          # build finder
│   ├── tier-list/page.tsx       # tier list
│   ├── globals.css              # dark-fantasy theme
│   ├── layout.tsx               # root layout + fonts + nav/footer
│   └── page.tsx                 # home / build library
├── components/
│   ├── BuildCard.tsx
│   ├── BuildLibrary.tsx         # sticky filter + grid
│   ├── ChatPanel.tsx            # AI route planner UI
│   ├── Markdown.tsx
│   ├── NavBar.tsx
│   ├── StatTable.tsx
│   └── ui.tsx                   # shared badges/colors/rating bars
├── lib/
│   ├── builds.ts                # typed data — all 12 builds
│   └── softcaps.ts              # calculator softcap logic + archetype templates
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

## Notes on assets & accuracy

- **No copyrighted assets.** No FromSoftware art, logos, screenshots, or verbatim in-game text. The aesthetic ("Erdtree at dusk") is original. Game mechanics, stat values, and item **locations** are factual and fair to document.
- Stat spreads and softcaps are widely-documented community values for Patch 1.16; treat the calculator output as guidance and always meet your chosen weapon's stat requirements.
- This is a fan-made theorycrafting tool, not affiliated with or endorsed by FromSoftware or Bandai Namco.

---

## Deploy checklist

```bash
# From the project root:
git init
git add -A
git commit -m "Elden Ring Build Forge — initial commit"

# Create the GitHub repo (using the GitHub CLI):
gh repo create elden-ring-build-forge --public --source=. --remote=origin --push
# …or create it on github.com, then:
#   git remote add origin https://github.com/<you>/elden-ring-build-forge.git
#   git branch -M main
#   git push -u origin main
```

Then:

1. <https://vercel.com/new> → **Import** `elden-ring-build-forge`.
2. **Environment Variables** → add `ANTHROPIC_API_KEY = sk-ant-...` (and optionally `ANTHROPIC_MODEL`).
3. **Deploy**. If you added the env var after the first build, hit **Redeploy**.
4. Visit the deployment, open any build, and ask the Forge: *"How do I get to this build from the start?"*

Done. ⚔️
