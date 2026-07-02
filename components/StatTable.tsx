import { STAT_LABELS, type StatSpread } from "@/lib/builds";

const PRIMARY_THRESHOLD = 40;

export default function StatTable({
  stats,
  targetLevel,
}: {
  stats: StatSpread;
  targetLevel?: number;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-obsidian-600">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-obsidian-700 text-left text-stone-400">
            <th className="px-4 py-2.5 font-medium">Attribute</th>
            <th className="px-4 py-2.5 text-right font-medium">Final Value</th>
            <th className="hidden px-4 py-2.5 font-medium sm:table-cell">Allocation</th>
          </tr>
        </thead>
        <tbody>
          {STAT_LABELS.map(({ key, label, short }, i) => {
            const value = stats[key];
            const primary = value >= PRIMARY_THRESHOLD;
            return (
              <tr
                key={key}
                className={`border-t border-obsidian-600 ${
                  i % 2 === 0 ? "bg-obsidian-800/40" : "bg-transparent"
                }`}
              >
                <td className="px-4 py-2.5">
                  <span className="text-stone-200">{label}</span>
                  <span className="ml-2 text-xs text-stone-500">{short}</span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <span
                    className={`font-mono text-base font-semibold ${
                      primary ? "text-ember-light" : "text-stone-300"
                    }`}
                  >
                    {value}
                  </span>
                </td>
                <td className="hidden px-4 py-2.5 sm:table-cell">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-obsidian-700">
                    <div
                      className={`h-full rounded-full ${
                        primary
                          ? "bg-gradient-to-r from-ember-deep to-ember-light"
                          : "bg-stone-600"
                      }`}
                      style={{ width: `${Math.min(100, (value / 80) * 100)}%` }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        {targetLevel && (
          <tfoot>
            <tr className="border-t border-ember-deep/40 bg-obsidian-700/60">
              <td className="px-4 py-2.5 font-display text-ember-light">Target Rune Level</td>
              <td className="px-4 py-2.5 text-right font-mono font-semibold text-ember-light">
                {targetLevel}
              </td>
              <td className="hidden sm:table-cell" />
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
