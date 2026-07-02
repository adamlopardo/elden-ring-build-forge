import Link from "next/link";
import { notFound } from "next/navigation";
import { builds, getBuild, type AcquisitionItem } from "@/lib/builds";
import StatTable from "@/components/StatTable";
import ChatPanel from "@/components/ChatPanel";
import { difficultyColor, playstyleColor, RatingBar, tierColor } from "@/components/ui";

export function generateStaticParams() {
  return builds.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const build = getBuild(params.slug);
  if (!build) return { title: "Build not found · Build Forge" };
  return {
    title: `${build.name} · Elden Ring Build Forge`,
    description: build.fantasy,
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="forge-card p-5">
      <h2 className="mb-4 font-display text-xl font-600 text-ember-light">{title}</h2>
      {children}
    </section>
  );
}

function ItemList({ items }: { items: AcquisitionItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-stone-500">Not applicable for this build.</p>;
  }
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="border-l-2 border-ember-deep/50 pl-3">
          <p className="font-medium text-stone-100">{it.name}</p>
          <p className="text-sm text-stone-400">
            <span className="text-ember-deep">Location:</span> {it.location}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function BuildDetailPage({ params }: { params: { slug: string } }) {
  const build = getBuild(params.slug);
  if (!build) notFound();

  return (
    <div className="animate-fadeUp">
      <Link href="/" className="mb-4 inline-block text-sm text-stone-400 hover:text-ember-light">
        ← Back to library
      </Link>

      {/* Header */}
      <header className="mb-8 rounded-xl border border-obsidian-600 bg-gradient-to-b from-obsidian-800 to-obsidian p-6">
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <span className={`pill ${playstyleColor(build.playstyle)}`}>{build.playstyle}</span>
          <span className={`pill ${difficultyColor(build.difficulty)}`}>{build.difficulty}</span>
          <span className={`pill ${tierColor(build.tier.pve)}`}>PvE {build.tier.pve}</span>
          <span className={`pill ${tierColor(build.tier.pvp)}`}>PvP {build.tier.pvp}</span>
        </div>
        <h1 className="font-display text-3xl font-700 text-stone-100 sm:text-4xl">{build.name}</h1>
        <p className="mt-1 text-ember-deep">{build.archetype}</p>
        <p className="mt-4 max-w-3xl leading-relaxed text-stone-300">{build.fantasy}</p>

        <div className="mt-6 grid max-w-md gap-2">
          <RatingBar label="PvE" value={build.pveRating} />
          <RatingBar label="PvP" value={build.pvpRating} />
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: stats + leveling */}
        <div className="space-y-6 lg:col-span-2">
          <Section title="Starting Class">
            <p className="mb-1 text-lg font-medium text-ember-light">{build.startingClass}</p>
            <p className="text-sm leading-relaxed text-stone-300">{build.startingClassWhy}</p>
          </Section>

          <Section title="Stat Allocation">
            <StatTable stats={build.stats} targetLevel={build.targetLevel} />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-stone-400">
                  Leveling Order
                </h3>
                <ol className="space-y-1.5 text-sm text-stone-300">
                  {build.levelingOrder.map((step, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-mono text-ember-deep">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-stone-400">
                  Milestone Snapshots
                </h3>
                <ul className="space-y-1.5 text-sm text-stone-300">
                  {build.milestones.map((m) => (
                    <li key={m.level}>
                      <span className="font-mono text-ember-light">{m.level}</span> — {m.focus}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 rounded-md border border-obsidian-600 bg-obsidian-700/40 p-3">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-stone-400">
                Softcap Notes
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-stone-300">
                {build.softcapNotes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          </Section>

          <div className="grid gap-6 sm:grid-cols-2">
            <Section title="Primary Weapon(s)">
              <ItemList items={build.weapons} />
            </Section>
            <Section title="Ashes of War / Skills">
              <ItemList items={build.ashesOfWar} />
            </Section>
            <Section title="Spells / Incantations">
              <ItemList items={build.spells} />
            </Section>
            <Section title="Talismans (4 slots)">
              <ItemList items={build.talismans} />
            </Section>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Section title="Armor">
              <p className="mb-2 font-medium text-stone-100">{build.armor.recommendation}</p>
              <p className="text-sm leading-relaxed text-stone-300">{build.armor.reasoning}</p>
            </Section>
            <Section title="Consumables & Physick">
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-ember-deep">Wondrous Physick</dt>
                  <dd className="text-stone-300">{build.consumables.physick}</dd>
                </div>
                <div>
                  <dt className="text-ember-deep">Crimson Flasks</dt>
                  <dd className="text-stone-300">{build.consumables.crimson}</dd>
                </div>
                <div>
                  <dt className="text-ember-deep">Cerulean Flasks</dt>
                  <dd className="text-stone-300">{build.consumables.cerulean}</dd>
                </div>
                <div>
                  <dt className="text-ember-deep">Notes</dt>
                  <dd className="text-stone-300">{build.consumables.notes}</dd>
                </div>
              </dl>
            </Section>
          </div>

          <Section title="Playstyle">
            <p className="leading-relaxed text-stone-300">{build.playstyleNotes}</p>
          </Section>

          <Section title="Shadow of the Erdtree (DLC) Notes">
            <p className="mb-3 leading-relaxed text-stone-300">{build.dlcNotes}</p>
            <div className="rounded-md border border-ember-deep/40 bg-ember/5 p-3">
              <h3 className="mb-1 text-sm font-semibold text-ember-light">
                Scadutree Blessing Priority
              </h3>
              <p className="text-sm text-stone-300">{build.scadutreePriority}</p>
            </div>
          </Section>
        </div>

        {/* Right column: sticky chat */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20">
            <ChatPanel build={build} />
          </div>
        </div>
      </div>
    </div>
  );
}
