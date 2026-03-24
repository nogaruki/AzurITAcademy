import { formatContent } from "../../utils/formatContent";

const COMPLEXITY_TEXT =
  `**Complexité temporelle**\n\n**Tous les cas : O(n log n)** — Mergesort divise toujours en deux moitiés égales (log₂ n niveaux de récursion) et chaque niveau effectue exactement O(n) comparaisons/copies lors des fusions.\n\n**Meilleur cas : O(n log n)** — Même sur un tableau déjà trié, toutes les fusions sont exécutées (mais elles se terminent très vite car les comparaisons donnent toujours "gauche ≤ droite").\n\n**Pire cas : O(n log n)** — Aucun cas dégénéré : la division est toujours parfaitement équilibrée.\n\n**Complexité spatiale : O(n)** — Les tableaux auxiliaires dans merge() totalisent O(n) mémoire. C'est le principal désavantage face à Quicksort.`;

const COMPARISON_TEXT =
  `**Mergesort** — Tri stable garanti en O(n log n). Idéal pour les listes chaînées, les données externes (disque) et quand la stabilité est requise. Nécessite O(n) mémoire supplémentaire.\n\n**Quicksort** — Plus rapide en pratique grâce à la localité de cache (tri en place). Pire cas O(n²) évitable avec un pivot aléatoire. Non stable.\n\n**Heapsort** — O(n log n) garanti, en place, mais non stable. Plus lent que Quicksort en pratique (mauvaise localité de cache).\n\n**Timsort** — Hybride Mergesort + insertion sort utilisé par Python et Java. O(n log n) garanti, stable, O(n) sur les données presque triées.`;

const ROWS = [
  ["Mergesort",  "O(n log n)", "O(n log n)", "O(n log n)", "O(n)",     "Oui"],
  ["Quicksort",  "O(n log n)", "O(n²)",      "O(n log n)", "O(log n)", "Non"],
  ["Heapsort",   "O(n log n)", "O(n log n)", "O(n log n)", "O(1)",     "Non"],
  ["Tri bulles", "O(n)",       "O(n²)",      "O(n²)",      "O(1)",     "Oui"],
  ["Timsort",    "O(n)",       "O(n log n)", "O(n log n)", "O(n)",     "Oui"],
];

export default function MergesortComplexityTab() {
  return (
    <>
      <div className="panel mb-6">
        <div className="panel-header">📈 Complexité de Mergesort</div>
        <div className="section-content">
          {formatContent(COMPLEXITY_TEXT)}
        </div>
      </div>

      {/* Tableau comparatif */}
      <div className="panel mb-6">
        <div className="panel-header">📊 Tableau comparatif des tris</div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] font-mono">
            <thead>
              <tr className="border-b border-line text-sec text-[11px] uppercase tracking-[0.5px]">
                <th className="px-4 py-3 text-left font-semibold">Algorithme</th>
                <th className="px-4 py-3 text-center font-semibold">Meilleur</th>
                <th className="px-4 py-3 text-center font-semibold">Pire</th>
                <th className="px-4 py-3 text-center font-semibold">Moyen</th>
                <th className="px-4 py-3 text-center font-semibold">Espace</th>
                <th className="px-4 py-3 text-center font-semibold">Stable</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([name, best, worst, avg, space, stable]) => (
                <tr
                  key={name}
                  className={`border-b border-line transition-colors ${
                    name === "Mergesort" ? "bg-accent-dim" : "hover:bg-card-hov"
                  }`}
                >
                  <td className={`px-4 py-3 font-semibold ${name === "Mergesort" ? "text-accent-hi" : "text-pri"}`}>
                    {name}
                  </td>
                  <td className="px-4 py-3 text-center text-c-green">{best}</td>
                  <td className={`px-4 py-3 text-center ${worst === "O(n²)" ? "text-c-red" : "text-c-green"}`}>
                    {worst}
                  </td>
                  <td className={`px-4 py-3 text-center ${avg === "O(n²)" ? "text-c-orange" : "text-sec"}`}>
                    {avg}
                  </td>
                  <td className="px-4 py-3 text-center text-sec">{space}</td>
                  <td className={`px-4 py-3 text-center font-semibold ${stable === "Oui" ? "text-c-green" : "text-mut"}`}>
                    {stable}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">🔍 Quand utiliser quoi ?</div>
        <div className="section-content">
          {formatContent(COMPARISON_TEXT)}
        </div>
      </div>
    </>
  );
}
