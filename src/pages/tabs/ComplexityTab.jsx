import ComplexityChart from "../../components/complexity/ComplexityChart";
import { formatContent } from "../../utils/formatContent";

const COMPLEXITY_TEXT =
  `**Complexité temporelle : O((V + E) × log V)**\nAvec un min-heap, chaque opération push/pop coûte O(log V). On fait au plus V extractions et E relaxations → O((V+E) log V).\n\n**Complexité spatiale : O(V + E)**\nLe tableau dist (V), le tableau visited (V), la file de priorité (au plus V éléments), et la liste d'adjacence (E arêtes).\n\n**Sans file de priorité : O(V²)**\nSi on parcourt tout le tableau dist pour trouver le min à chaque étape, on fait V recherches de taille V → O(V²). Acceptable pour les petits graphes, mais trop lent pour les grands.`;

const USAGE_TEXT =
  `**Dijkstra (heap)** — Le choix par défaut pour les graphes pondérés sans poids négatifs. GPS, routage réseau, jeux vidéo.\n\n**Dijkstra (naïf)** — Acceptable si V est petit (< 1000) et que tu ne veux pas coder un heap.\n\n**Bellman-Ford** — Quand le graphe a des poids négatifs (Dijkstra ne fonctionne pas dans ce cas). Détecte aussi les cycles négatifs.\n\n**Floyd-Warshall** — Quand tu veux toutes les distances entre toutes les paires de sommets (all-pairs shortest path). Complexité élevée mais simple à coder.`;

export default function ComplexityTab() {
  return (
    <>
      <div className="panel mb-6">
        <div className="panel-header">📈 Complexité de Dijkstra</div>
        <div className="section-content">
          {formatContent(COMPLEXITY_TEXT)}
        </div>
      </div>

      <ComplexityChart />

      <div className="panel">
        <div className="panel-header">🔍 Quand utiliser quoi ?</div>
        <div className="section-content">
          {formatContent(USAGE_TEXT)}
        </div>
      </div>
    </>
  );
}
