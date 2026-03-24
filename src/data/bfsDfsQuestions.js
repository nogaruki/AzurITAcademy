// ─── Questions du quiz BFS & DFS ───

const fr = [
  {
    q: "Quelle structure de données utilise BFS pour gérer les nœuds à explorer ?",
    opts: ["Pile (stack)", "File (queue)", "Tableau trié", "Arbre binaire"],
    answer: 1,
    explain: "BFS utilise une file FIFO : on ajoute les voisins à la fin et on traite les nœuds dans l'ordre de leur découverte (niveau par niveau).",
  },
  {
    q: "Quelle structure de données utilise DFS pour gérer la récursion ou les nœuds à explorer ?",
    opts: ["File (queue)", "Tableau associatif", "Pile (stack)", "Min-heap"],
    answer: 2,
    explain: "DFS utilise une pile (implicitement via la récursion, ou explicitement dans la version itérative) : on explore le dernier nœud ajouté en premier (LIFO).",
  },
  {
    q: "BFS garantit de trouver le chemin le plus court dans quel type de graphe ?",
    opts: [
      "Graphe pondéré avec poids positifs",
      "Graphe orienté acyclique (DAG)",
      "Graphe non pondéré (ou à poids uniformes)",
      "Tout type de graphe",
    ],
    answer: 2,
    explain: "BFS explore les nœuds niveau par niveau : le premier chemin trouvé vers un nœud est le plus court en nombre d'arêtes. Pour les graphes pondérés, utilisez Dijkstra.",
  },
  {
    q: "Quelle est la complexité temporelle de BFS et DFS sur un graphe à V sommets et E arêtes ?",
    opts: ["O(V²)", "O(V log V)", "O(V + E)", "O(E log V)"],
    answer: 2,
    explain: "Les deux algorithmes visitent chaque sommet et chaque arête exactement une fois : O(V + E). BFS et DFS ont la même complexité asymptotique.",
  },
  {
    q: "Dans quel cas DFS est-il particulièrement utile ?",
    opts: [
      "Trouver le chemin le plus court",
      "Détecter des cycles et parcourir des labyrinthes",
      "Calculer des distances minimales",
      "Trier les nœuds par degré",
    ],
    answer: 1,
    explain: "DFS excelle pour la détection de cycles, le tri topologique, la résolution de labyrinthes et l'exploration exhaustive — là où la profondeur prime sur la proximité.",
  },
];

const en = [
  {
    q: "What data structure does BFS use to manage nodes to explore?",
    opts: ["Stack", "Queue", "Sorted array", "Binary tree"],
    answer: 1,
    explain: "BFS uses a FIFO queue: neighbors are added to the back and nodes are processed in the order they were discovered (level by level).",
  },
  {
    q: "What data structure does DFS use to manage recursion or nodes to explore?",
    opts: ["Queue", "Hash map", "Stack", "Min-heap"],
    answer: 2,
    explain: "DFS uses a stack (implicitly via recursion, or explicitly in the iterative version): the last node added is explored first (LIFO).",
  },
  {
    q: "BFS guarantees finding the shortest path in what type of graph?",
    opts: [
      "Weighted graph with positive weights",
      "Directed acyclic graph (DAG)",
      "Unweighted graph (or uniform weights)",
      "Any type of graph",
    ],
    answer: 2,
    explain: "BFS explores nodes level by level: the first path found to a node is the shortest in terms of edge count. For weighted graphs, use Dijkstra.",
  },
  {
    q: "What is the time complexity of BFS and DFS on a graph with V vertices and E edges?",
    opts: ["O(V²)", "O(V log V)", "O(V + E)", "O(E log V)"],
    answer: 2,
    explain: "Both algorithms visit each vertex and each edge exactly once: O(V + E). BFS and DFS have the same asymptotic complexity.",
  },
  {
    q: "In which case is DFS particularly useful?",
    opts: [
      "Finding the shortest path",
      "Detecting cycles and exploring mazes",
      "Computing minimum distances",
      "Sorting nodes by degree",
    ],
    answer: 1,
    explain: "DFS excels at cycle detection, topological sorting, maze solving and exhaustive exploration — wherever depth takes priority over proximity.",
  },
];

export const BFS_DFS_QUIZ_QUESTIONS = { fr, en };
