// ─── Questions du quiz Dijkstra ───

const fr = [
  {
    q: "Quelle est la complexité temporelle de Dijkstra avec une file de priorité (min-heap) ?",
    opts: ["O(V²)", "O((V+E) × log V)", "O(V × E)", "O(E log E)"],
    answer: 1,
    explain:
      "Avec un min-heap, chaque opération push/pop coûte O(log V). On fait au plus E relaxations et V extractions.",
  },
  {
    q: "Que signifie « relaxer » une arête u→v ?",
    opts: [
      "Supprimer l'arête du graphe",
      "Vérifier si passer par u raccourcit le chemin vers v",
      "Marquer v comme visité",
      "Ajouter une nouvelle arête au graphe",
    ],
    answer: 1,
    explain:
      "La relaxation teste si dist[u] + poids(u→v) < dist[v]. Si oui, on a trouvé un meilleur chemin.",
  },
  {
    q: "Pourquoi Dijkstra ne fonctionne-t-il pas avec des poids négatifs ?",
    opts: [
      "Il utilise trop de mémoire",
      "Un sommet déjà visité pourrait être amélioré, violant l'hypothèse de l'algo",
      "Les poids négatifs n'existent pas en pratique",
      "La file de priorité ne supporte pas les négatifs",
    ],
    answer: 1,
    explain:
      "Dijkstra suppose qu'une fois un sommet visité, sa distance est définitive. Les poids négatifs invalident cette garantie.",
  },
  {
    q: "Dans notre exemple (graphe 0→1→2), quel est le chemin le plus court de 0 à 2 ?",
    opts: [
      "0 → 2 (coût 10)",
      "0 → 1 → 2 (coût 8)",
      "0 → 1 (coût 5)",
      "Aucun chemin n'existe",
    ],
    answer: 1,
    explain: "Le chemin 0→1→2 coûte 5+3=8, moins que la route directe 0→2 à 10.",
  },
  {
    q: "Quel rôle joue la file de priorité dans Dijkstra ?",
    opts: [
      "Elle stocke les arêtes triées par poids",
      "Elle permet d'extraire le sommet non visité le plus proche en O(log V)",
      "Elle empêche de revisiter un sommet",
      "Elle trie le résultat final",
    ],
    answer: 1,
    explain:
      "Le min-heap permet de toujours récupérer le sommet avec la plus petite distance estimée, ce qui est au cœur de l'algorithme glouton de Dijkstra.",
  },
];

const en = [
  {
    q: "What is the time complexity of Dijkstra with a priority queue (min-heap)?",
    opts: ["O(V²)", "O((V+E) × log V)", "O(V × E)", "O(E log E)"],
    answer: 1,
    explain:
      "With a min-heap, each push/pop operation costs O(log V). We do at most E relaxations and V extractions.",
  },
  {
    q: "What does it mean to 'relax' an edge u→v?",
    opts: [
      "Remove the edge from the graph",
      "Check if going through u shortens the path to v",
      "Mark v as visited",
      "Add a new edge to the graph",
    ],
    answer: 1,
    explain:
      "Relaxation tests if dist[u] + weight(u→v) < dist[v]. If so, we found a better path.",
  },
  {
    q: "Why doesn't Dijkstra work with negative weights?",
    opts: [
      "It uses too much memory",
      "An already-visited vertex could be improved, violating the algorithm's assumption",
      "Negative weights don't exist in practice",
      "The priority queue doesn't support negatives",
    ],
    answer: 1,
    explain:
      "Dijkstra assumes that once a vertex is visited, its distance is final. Negative weights invalidate this guarantee.",
  },
  {
    q: "In our example (graph 0→1→2), what is the shortest path from 0 to 2?",
    opts: [
      "0 → 2 (cost 10)",
      "0 → 1 → 2 (cost 8)",
      "0 → 1 (cost 5)",
      "No path exists",
    ],
    answer: 1,
    explain: "The path 0→1→2 costs 5+3=8, less than the direct route 0→2 at 10.",
  },
  {
    q: "What role does the priority queue play in Dijkstra?",
    opts: [
      "It stores edges sorted by weight",
      "It allows extracting the nearest unvisited vertex in O(log V)",
      "It prevents revisiting a vertex",
      "It stores the shortest path",
    ],
    answer: 1,
    explain:
      "The priority queue (min-heap) always gives the unvisited vertex with the smallest current distance in O(log V), which is key to Dijkstra's efficiency.",
  },
];

export const QUIZ_QUESTIONS = { fr, en };
