import { formatContent } from "../../utils/formatContent";

const COMPLEXITY_TEXT =
  `**Complexité temporelle**\n\n**Cas moyen : O(n log n)** — En moyenne, le pivot divise le tableau en deux moitiés équilibrées. On a log n niveaux de récursion × O(n) comparaisons par niveau.\n\n**Pire cas : O(n²)** — Si le pivot est toujours le plus petit ou le plus grand (tableau déjà trié + pivot = dernier élément), chaque partition ne réduit la taille que de 1 : n + (n-1) + … + 1 = O(n²).\n\n**Meilleur cas : O(n log n)** — Quand le pivot tombe toujours exactement au milieu.\n\n**Complexité spatiale : O(log n)** en moyenne (pile d'appels récursifs), O(n) dans le pire cas (pile déséquilibrée).`;

const COMPARISON_TEXT =
  `**Quicksort** — Le choix par défaut pour trier des tableaux en mémoire. Rapide en pratique grâce à la localité de cache (tri en place). Pire cas O(n²) évitable avec un pivot aléatoire.\n\n**Mergesort** — Garantit O(n log n) dans tous les cas. Stable (préserve l'ordre des égaux). Nécessite O(n) mémoire supplémentaire. Idéal pour les listes chaînées et les données en mémoire externe.\n\n**Heapsort** — O(n log n) garanti, en place, mais non stable. Plus lent que Quicksort en pratique (mauvaise localité de cache).\n\n**Timsort** — Hybride Mergesort + insertion sort utilisé par Python et Java. O(n log n) garanti, stable, O(n) sur les données presque triées.`;

const ROWS = [
  ["Quicksort",  "O(n log n)", "O(n²)",      "O(n log n)", "O(log n)", "Non"],
  ["Mergesort",  "O(n log n)", "O(n log n)", "O(n log n)", "O(n)",     "Oui"],
  ["Heapsort",   "O(n log n)", "O(n log n)", "O(n log n)", "O(1)",     "Non"],
  ["Tri bulles", "O(n)",       "O(n²)",      "O(n²)",      "O(1)",     "Oui"],
  ["Timsort",    "O(n)",       "O(n log n)", "O(n log n)", "O(n)",     "Oui"],
];

export default function QuicksortComplexityTab() {
  return (
    <>
      <div className="panel mb-6">
        <div className="panel-header">📈 Complexité de Quicksort</div>
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
              {ROWS.map(([name, best, worst, avg, space, stable], i) => (
                <tr
                  key={name}
                  className={`border-b border-line transition-colors ${
                    name === "Quicksort" ? "bg-accent-dim" : "hover:bg-card-hov"
                  }`}
                >
                  <td className={`px-4 py-3 font-semibold ${name === "Quicksort" ? "text-accent-hi" : "text-pri"}`}>
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
