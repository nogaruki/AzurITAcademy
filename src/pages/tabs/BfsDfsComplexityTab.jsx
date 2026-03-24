import { formatContent } from "../../utils/formatContent";
import { useLang } from "../../i18n/LangContext";

const CONTENT_FR = `## Complexité de BFS et DFS

### Complexité temporelle : O(V + E)

Les deux algorithmes visitent chaque **sommet** (V) et chaque **arête** (E) exactement une fois.

- Pour BFS : on traite chaque nœud une seule fois (dequeue) et on examine chaque arête une fois lors de l'exploration des voisins.
- Pour DFS : chaque nœud est visité une seule fois, et chaque arête est examinée lors du parcours des voisins.

**Exemple :** un graphe avec 100 nœuds et 150 arêtes → au plus 250 opérations.

---

### Complexité spatiale : O(V)

**BFS :** la file peut contenir au maximum un niveau entier du graphe. Dans le pire cas (graphe étoile), cela représente O(V) nœuds.

**DFS :** la pile de récursion peut atteindre une profondeur de O(V) dans le pire cas (graphe linéaire : A → B → C → … → Z).

---

### Comparaison pratique

| | BFS | DFS |
|---|---|---|
| **Temps** | O(V + E) | O(V + E) |
| **Espace (pire cas)** | O(V) | O(V) |
| **Chemin le plus court** | ✅ Oui (non pondéré) | ❌ Non |
| **Détection de cycles** | ✅ Oui | ✅ Oui |
| **Graphe large** | ⚠️ File grande | ✅ OK |
| **Graphe profond** | ✅ OK | ⚠️ Stack overflow possible |

---

### Par rapport à Dijkstra

Dijkstra est une généralisation de BFS pour les graphes pondérés : O((V + E) log V). Sans poids, BFS est strictement plus efficace.`;

const CONTENT_EN = `## BFS and DFS Complexity

### Time Complexity: O(V + E)

Both algorithms visit each **vertex** (V) and each **edge** (E) exactly once.

- For BFS: each node is dequeued once, and each edge is examined once during neighbor exploration.
- For DFS: each node is visited once, and each edge is examined once when exploring neighbors.

**Example:** a graph with 100 nodes and 150 edges → at most 250 operations.

---

### Space Complexity: O(V)

**BFS:** the queue can contain at most an entire level of the graph. In the worst case (star graph), that's O(V) nodes.

**DFS:** the recursion stack can reach depth O(V) in the worst case (linear graph: A → B → C → … → Z).

---

### Practical Comparison

| | BFS | DFS |
|---|---|---|
| **Time** | O(V + E) | O(V + E) |
| **Space (worst case)** | O(V) | O(V) |
| **Shortest path** | ✅ Yes (unweighted) | ❌ No |
| **Cycle detection** | ✅ Yes | ✅ Yes |
| **Wide graph** | ⚠️ Large queue | ✅ OK |
| **Deep graph** | ✅ OK | ⚠️ Possible stack overflow |

---

### Compared to Dijkstra

Dijkstra is a generalization of BFS for weighted graphs: O((V + E) log V). Without weights, BFS is strictly more efficient.`;

export default function BfsDfsComplexityTab() {
  const { lang } = useLang();
  const content = lang === "fr" ? CONTENT_FR : CONTENT_EN;

  return (
    <div className="panel mb-10">
      <div className="panel-header">📊 {lang === "fr" ? "Analyse de complexité" : "Complexity Analysis"}</div>
      <div className="section-content">
        {formatContent(content)}
      </div>
    </div>
  );
}
