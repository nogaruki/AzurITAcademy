import { formatContent } from "../../utils/formatContent";

const COMPLEXITY_TEXT =
  `**Complexité temporelle**\n\n**Cas moyen : O(log n)** — Dans un arbre équilibré de n nœuds, la hauteur est log₂(n). Chaque opération (recherche, insertion, suppression) descend au plus jusqu'à une feuille.\n\n**Pire cas : O(n)** — Si les valeurs sont insérées dans l'ordre trié (ex. 10, 20, 30, 40…), l'arbre dégénère en liste chaînée de hauteur n. Toutes les opérations deviennent O(n).\n\n**Complexité spatiale : O(n)** — Un nœud par valeur stockée, plus O(log n) à O(n) pour la pile de récursion lors des opérations.\n\n**Solution au pire cas :** Les arbres **auto-équilibrés** (AVL, Rouge-Noir) maintiennent la hauteur en O(log n) par des rotations lors de l'insertion et la suppression.`;

const COMPARISON_TEXT =
  `**ABR (non équilibré)** — Simple à implémenter. O(log n) en moyenne mais O(n) au pire. Adapté aux données aléatoires ou peu nombreuses.\n\n**AVL** — ABR auto-équilibré garantissant une hauteur ≤ 1.44 log₂(n). O(log n) garanti. Rotations lors de l'insertion/suppression. Plus rigide que Rouge-Noir.\n\n**Arbre Rouge-Noir** — ABR auto-équilibré avec hauteur ≤ 2 log₂(n+1). O(log n) garanti. Utilisé dans la plupart des bibliothèques standards (std::map en C++, TreeMap en Java).\n\n**Tableau de hachage** — O(1) en moyenne pour la recherche/insertion. Mais pas de tri, pas de recherche par plage, et collisions possibles. Complémentaire à l'ABR selon le besoin.`;

const ROWS = [
  ["ABR moyen",   "O(log n)", "O(log n)", "O(log n)", "O(n)"],
  ["ABR pire cas","O(n)",     "O(n)",     "O(n)",     "O(n)"],
  ["AVL",         "O(log n)", "O(log n)", "O(log n)", "O(n)"],
  ["Rouge-Noir",  "O(log n)", "O(log n)", "O(log n)", "O(n)"],
  ["Hash table",  "O(1)",     "O(1)",     "O(1)",     "O(n)"],
];

export default function BstComplexityTab() {
  return (
    <>
      <div className="panel mb-6">
        <div className="panel-header">📈 Complexité de l'ABR</div>
        <div className="section-content">{formatContent(COMPLEXITY_TEXT)}</div>
      </div>

      <div className="panel mb-6">
        <div className="panel-header">📊 Tableau comparatif</div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] font-mono">
            <thead>
              <tr className="border-b border-line text-sec text-[11px] uppercase tracking-[0.5px]">
                <th className="px-4 py-3 text-left font-semibold">Structure</th>
                <th className="px-4 py-3 text-center font-semibold">Recherche</th>
                <th className="px-4 py-3 text-center font-semibold">Insertion</th>
                <th className="px-4 py-3 text-center font-semibold">Suppression</th>
                <th className="px-4 py-3 text-center font-semibold">Espace</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([name, search, insert, del, space], i) => (
                <tr
                  key={i}
                  className={`border-b border-line transition-colors ${
                    name.startsWith("ABR") ? "bg-c-red-dim" : "hover:bg-card-hov"
                  }`}
                >
                  <td className={`px-4 py-3 font-semibold ${name.startsWith("ABR") ? "text-c-red" : "text-pri"}`}>{name}</td>
                  {[search, insert, del, space].map((v, j) => (
                    <td key={j} className={`px-4 py-3 text-center ${v === "O(n)" ? "text-c-orange" : v === "O(1)" ? "text-c-green" : "text-sec"}`}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">🔍 Quelle structure choisir ?</div>
        <div className="section-content">{formatContent(COMPARISON_TEXT)}</div>
      </div>
    </>
  );
}
