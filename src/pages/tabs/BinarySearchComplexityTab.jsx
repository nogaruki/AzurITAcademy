import { formatContent } from "../../utils/formatContent";

const COMPLEXITY_TEXT =
  `**Complexité temporelle**\n\n**Tous les cas : O(log n)** — À chaque itération, la plage active est divisée par 2. Après k étapes, n/2^k éléments restent. On s'arrête quand n/2^k ≤ 1, soit k = log₂(n).\n\n**Meilleur cas : O(1)** — La cible est directement à l'indice mid lors de la première itération (élément médian).\n\n**Pire cas : O(log n)** — La cible est absente ou se trouve à l'un des extrêmes. Le nombre d'itérations est ⌈log₂(n + 1)⌉.\n\n**Cas moyen : O(log n)** — En moyenne sur toutes les positions possibles, le coût tend vers O(log n).\n\n**Complexité spatiale : O(1)** en version itérative (seulement lo, hi, mid). O(log n) en version récursive (profondeur de la pile d'appels).`;

const COMPARISON_TEXT =
  `**Recherche binaire vs linéaire**\n\nLa recherche linéaire O(n) fonctionne sur tout tableau (trié ou non). La recherche binaire O(log n) exige le tri, mais est exponentiellement plus rapide sur de grandes données.\n\n**Tri + recherche binaire vs recherche linéaire :**\n- Si k recherches sur n éléments : tri O(n log n) + k × O(log n) vs k × O(n)\n- Rentable dès que k ≥ n / log n (souvent dès k = 2 ou 3 pour de grands n)\n\n**Java :** \`Arrays.binarySearch()\` — O(log n) garanti sur tout tableau primitif trié.\n\n**Python :** module \`bisect\` (bisect_left, bisect_right) — implémenté en C, ultra-rapide.\n\n**C++ :** \`std::lower_bound\` et \`std::upper_bound\` — O(log n) sur RandomAccessIterator.`;

const ROWS = [
  ["Recherche binaire",  "O(1)",     "O(log n)", "O(log n)", "O(1)",     "Trié requis"],
  ["Recherche linéaire", "O(1)",     "O(n)",     "O(n)",     "O(1)",     "Aucune"],
  ["Recherche BST",      "O(1)",     "O(n)",     "O(log n)", "O(n)",     "Arbre BST équilibré"],
  ["Table de hachage",   "O(1)",     "O(n)",     "O(1)",     "O(n)",     "Clés hachables"],
  ["Interpolation",      "O(1)",     "O(n)",     "O(log log n)", "O(1)", "Uniform. distribué"],
];

export default function BinarySearchComplexityTab() {
  return (
    <>
      <div className="panel mb-6">
        <div className="panel-header">📈 Complexité de la Recherche Binaire</div>
        <div className="section-content">
          {formatContent(COMPLEXITY_TEXT)}
        </div>
      </div>

      {/* Tableau comparatif */}
      <div className="panel mb-6">
        <div className="panel-header">📊 Comparaison des algorithmes de recherche</div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] font-mono">
            <thead>
              <tr className="border-b border-line text-sec text-[11px] uppercase tracking-[0.5px]">
                <th className="px-4 py-3 text-left font-semibold">Algorithme</th>
                <th className="px-4 py-3 text-center font-semibold">Meilleur</th>
                <th className="px-4 py-3 text-center font-semibold">Pire</th>
                <th className="px-4 py-3 text-center font-semibold">Moyen</th>
                <th className="px-4 py-3 text-center font-semibold">Espace</th>
                <th className="px-4 py-3 text-center font-semibold">Précondition</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([name, best, worst, avg, space, req]) => (
                <tr
                  key={name}
                  className={`border-b border-line transition-colors ${
                    name === "Recherche binaire" ? "bg-accent-dim" : "hover:bg-card-hov"
                  }`}
                >
                  <td className={`px-4 py-3 font-semibold ${name === "Recherche binaire" ? "text-accent-hi" : "text-pri"}`}>
                    {name}
                  </td>
                  <td className="px-4 py-3 text-center text-c-green">{best}</td>
                  <td className={`px-4 py-3 text-center ${worst === "O(n)" ? "text-c-red" : "text-c-green"}`}>
                    {worst}
                  </td>
                  <td className="px-4 py-3 text-center text-sec">{avg}</td>
                  <td className="px-4 py-3 text-center text-sec">{space}</td>
                  <td className="px-4 py-3 text-center text-mut text-[12px]">{req}</td>
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
