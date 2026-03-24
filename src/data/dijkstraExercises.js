// ─── Exercices Dijkstra (codes à trou) ───

const fr = [
  {
    id: "init",
    title: "Initialisation",
    description:
      "Complétez la fonction d'initialisation. Toutes les distances partent à l'infini, sauf la source qui vaut 0.",
    code:
`function dijkstra(graph, start) {
  const dist    = {};
  const visited = {};

  // Initialise toutes les distances à l'infini
  for (const node of Object.keys(graph)) {
    dist[node] = ___;
  }

  // La distance de la source est ___
  dist[___] = 0;

  // Ajoute la source dans la file de priorité avec un coût de ___
  const heap = new MinHeap();
  heap.push([___, start]);

  return { dist, visited, heap };
}`,
    blanks: ["Infinity", "0", "start", "0", "0"],
  },
  {
    id: "relax",
    title: "Relaxation d'une arête",
    description:
      "La relaxation teste si passer par u améliore le chemin vers v. Complétez la condition et la mise à jour.",
    code:
`function relax(u, v, weight, dist, heap) {
  // Coût total pour atteindre v en passant par u
  const newDist = dist[___] + ___;

  // Si ce chemin est meilleur que le connu
  if (newDist < dist[___]) {
    dist[v] = ___;
    heap.push([newDist, ___]);
    return true;   // Raccourci trouvé !
  }
  return false;
}`,
    blanks: ["u", "weight", "v", "newDist", "v"],
  },
  {
    id: "loop",
    title: "Boucle principale",
    description:
      "Complétez la boucle qui extrait le sommet le plus proche et relaxe ses voisins.",
    code:
`while (!heap.isEmpty()) {
  const [cost, u] = heap.pop();

  // Ignore les sommets déjà définitivement traités
  if (visited[___]) continue;
  visited[u] = ___;

  // Relaxe chaque voisin non visité
  for (const [v, weight] of graph[u]) {
    if (!visited[___]) {
      relax(u, v, weight, dist, heap);
    }
  }
}

return ___;   // Tableau des distances minimales`,
    blanks: ["u", "true", "v", "dist"],
  },

  // ── TP 4 ──────────────────────────────────────────
  {
    id: "heap-push",
    title: "TP — MinHeap : insertion (bubble-up)",
    description:
      "Insérez un élément dans le tas min et remontez-le (bubble-up) jusqu'à restaurer la propriété de tas : chaque parent est plus petit que ses enfants.",
    code:
`push(item) {
  this.data.___(item);               // Ajoute à la fin du tableau
  let i = this.data.length - ___;   // Index du nouvel élément

  // Bubble-up : remonte tant que plus petit que son parent
  while (i > ___) {
    const parent = (i - 1) >> ___;  // Indice du parent (division entière par 2)
    if (this.data[i][0] < this.data[___][0]) {
      [this.data[i], this.data[parent]] = [this.data[___], this.data[i]];
      i = ___;
    } else {
      break;
    }
  }
}`,
    blanks: ["push", "1", "0", "1", "parent", "parent", "parent"],
    guide: [
      "Ajoute l'élément à la fin du tableau interne avec push(). Son index est length - 1.",
      "Le parent d'un nœud à l'indice i est toujours à (i - 1) >> 1 (division entière par 2).",
      "Compare les priorités (index [0] du couple [coût, nœud]) : si l'enfant est plus petit que son parent, échange-les.",
      "Répète avec i = parent. Arrête quand i = 0 (racine) ou quand le parent est déjà plus petit.",
    ],
    explanation:
      "Le bubble-up garantit la propriété du tas min en O(log n). Dans un tas complet, la profondeur maximale est log₂(n), donc au plus log₂(n) échanges suffisent. C'est ce qui donne à Dijkstra sa complexité O((V+E) log V).",
  },

  // ── TP 5 ──────────────────────────────────────────
  {
    id: "heap-pop",
    title: "TP — MinHeap : extraction du minimum (sink-down)",
    description:
      "Extrayez la racine (minimum), placez le dernier élément à sa place, puis faites-le descendre (sink-down) en échangeant avec le plus petit enfant.",
    code:
`pop() {
  if (this.data.length === 1) return this.data.___(  );

  const min = this.data[___];         // Sauvegarde le minimum (racine)
  this.data[0] = this.data.___(  );   // Déplace le dernier élément à la racine

  let i = ___;
  while (true) {
    const l = 2 * i + 1, r = 2 * i + ___;
    let s = i;  // Index du plus petit parmi i, l, r

    if (l < this.data.length && this.data[l][0] < this.data[___][0]) s = l;
    if (r < this.data.length && this.data[r][0] < this.data[___][0]) s = r;

    if (s === ___) break;  // Propriété de tas respectée
    [this.data[i], this.data[s]] = [this.data[___], this.data[i]];
    i = ___;
  }
  return ___;
}`,
    blanks: ["pop", "0", "pop", "0", "2", "s", "s", "i", "s", "s", "min"],
    guide: [
      "Cas spécial : si la taille est 1, pop() extrait directement l'unique élément.",
      "Sauvegarde la racine data[0] (le minimum), puis déplace le dernier élément à la racine avec pop().",
      "L'enfant gauche de i est 2*i + 1, l'enfant droit est 2*i + 2.",
      "Parmi i, l et r, trouve l'indice s du plus petit : commence à s = i, mets à jour si l ou r est plus petit.",
      "Si s === i, le tas est déjà valide : break. Sinon, échange data[i] et data[s], puis continue avec i = s.",
    ],
    explanation:
      "Le sink-down restaure la propriété en O(log n). En extrayant toujours le minimum, le MinHeap permet à Dijkstra de traiter les sommets par ordre croissant de distance — condition nécessaire à la preuve de correction de l'algorithme.",
  },

  // ── TP 6 ──────────────────────────────────────────
  {
    id: "path",
    title: "TP — Reconstruction du chemin le plus court",
    description:
      "Avec une table des prédécesseurs `prev` (remplie pendant Dijkstra), remontez de la destination à la source pour reconstruire le chemin optimal.",
    code:
`function reconstructPath(prev, start, end) {
  const path = [];
  let current = ___;

  // Remonte de end → start via les prédécesseurs
  while (current !== ___) {
    path.___(current);    // Insère en tête (on construit à l'envers)
    current = prev[___];  // Passe au prédécesseur
  }

  path.unshift(___);  // Ajoute le nœud source en tête
  return ___;         // Chemin complet de start à end
}`,
    blanks: ["end", "start", "unshift", "current", "start", "path"],
    guide: [
      "Commence à current = end (la destination finale).",
      "La boucle remonte vers la source : s'arrête quand current === start.",
      "Utilise unshift (pas push) pour insérer en tête du tableau — on construit le chemin à l'envers.",
      "prev[current] donne le nœud par lequel on est arrivé à current pendant Dijkstra.",
      "Après la boucle, ajoute start en tête avec path.unshift(start) : la boucle s'arrête avant de l'insérer.",
    ],
    explanation:
      "La table prev est remplie lors de la relaxation : chaque fois qu'on améliore dist[v], on enregistre prev[v] = u. Reconstruire le chemin en remontant cette table coûte O(V) dans le pire cas. Sans cette table, Dijkstra ne connaît que les distances, pas les chemins.",
  },
];

const en = [
  {
    id: "init",
    title: "Initialization",
    description:
      "Complete the initialization function. All distances start at infinity, except the source which is 0.",
    code:
`function dijkstra(graph, start) {
  const dist    = {};
  const visited = {};

  // Initialize all distances to infinity
  for (const node of Object.keys(graph)) {
    dist[node] = ___;
  }

  // The source distance is ___
  dist[___] = 0;

  // Push the source into the priority queue with cost ___
  const heap = new MinHeap();
  heap.push([___, start]);

  return { dist, visited, heap };
}`,
    blanks: ["Infinity", "0", "start", "0", "0"],
  },
  {
    id: "relax",
    title: "Edge relaxation",
    description:
      "Relaxation checks if going through u improves the path to v. Complete the condition and the update.",
    code:
`function relax(u, v, weight, dist, heap) {
  // Total cost to reach v by going through u
  const newDist = dist[___] + ___;

  // If this path is better than the known one
  if (newDist < dist[___]) {
    dist[v] = ___;
    heap.push([newDist, ___]);
    return true;   // Shortcut found!
  }
  return false;
}`,
    blanks: ["u", "weight", "v", "newDist", "v"],
  },
  {
    id: "loop",
    title: "Main loop",
    description:
      "Complete the loop that extracts the closest vertex and relaxes its neighbors.",
    code:
`while (!heap.isEmpty()) {
  const [cost, u] = heap.pop();

  // Skip vertices already permanently processed
  if (visited[___]) continue;
  visited[u] = ___;

  // Relax each unvisited neighbor
  for (const [v, weight] of graph[u]) {
    if (!visited[___]) {
      relax(u, v, weight, dist, heap);
    }
  }
}

return ___;   // Minimum distances table`,
    blanks: ["u", "true", "v", "dist"],
  },

  // ── TP 4 ──────────────────────────────────────────
  {
    id: "heap-push",
    title: "TP — MinHeap: insertion (bubble-up)",
    description:
      "Insert an element into the min-heap and bubble it up until the heap property is restored: every parent is smaller than its children.",
    code:
`push(item) {
  this.data.___(item);               // Append to end of array
  let i = this.data.length - ___;   // Index of new element

  // Bubble-up: rise while smaller than parent
  while (i > ___) {
    const parent = (i - 1) >> ___;  // Parent index (integer divide by 2)
    if (this.data[i][0] < this.data[___][0]) {
      [this.data[i], this.data[parent]] = [this.data[___], this.data[i]];
      i = ___;
    } else {
      break;
    }
  }
}`,
    blanks: ["push", "1", "0", "1", "parent", "parent", "parent"],
  },

  // ── TP 5 ──────────────────────────────────────────
  {
    id: "heap-pop",
    title: "TP — MinHeap: extract minimum (sink-down)",
    description:
      "Extract the root (minimum), move the last element to its place, then sink it down by swapping with the smallest child until the heap property holds.",
    code:
`pop() {
  if (this.data.length === 1) return this.data.___(  );

  const min = this.data[___];         // Save the minimum (root)
  this.data[0] = this.data.___(  );   // Move last element to root

  let i = ___;
  while (true) {
    const l = 2 * i + 1, r = 2 * i + ___;
    let s = i;  // Index of smallest among i, l, r

    if (l < this.data.length && this.data[l][0] < this.data[___][0]) s = l;
    if (r < this.data.length && this.data[r][0] < this.data[___][0]) s = r;

    if (s === ___) break;  // Heap property holds
    [this.data[i], this.data[s]] = [this.data[___], this.data[i]];
    i = ___;
  }
  return ___;
}`,
    blanks: ["pop", "0", "pop", "0", "2", "s", "s", "i", "s", "s", "min"],
  },

  // ── TP 6 ──────────────────────────────────────────
  {
    id: "path",
    title: "TP — Shortest path reconstruction",
    description:
      "Using a predecessor table `prev` (filled during Dijkstra), walk back from destination to source to reconstruct the optimal path.",
    code:
`function reconstructPath(prev, start, end) {
  const path = [];
  let current = ___;

  // Walk back from end → start via predecessors
  while (current !== ___) {
    path.___(current);    // Insert at front (building in reverse)
    current = prev[___];  // Move to predecessor
  }

  path.unshift(___);  // Add source node at front
  return ___;         // Full path from start to end
}`,
    blanks: ["end", "start", "unshift", "current", "start", "path"],
  },
];

// ── TP 1 ──────────────────────────────────────────
const tp1_fr = {
  id: "tp-path",
  type: "tp",
  title: "TP — Dijkstra avec reconstruction du chemin",
  subject:
`La version standard de Dijkstra retourne uniquement les distances minimales.
Modifiez-la pour enregistrer aussi les prédécesseurs (table \`prev\`) et implémentez la reconstruction du chemin exact de \`start\` à \`end\`.

Règle : à chaque relaxation réussie (newDist < dist[v]), enregistrez prev[v] = u.
Puis remontez de \`end\` vers \`start\` via prev pour reconstruire le chemin.`,
  baseCode:
`function dijkstraWithPath(graph, start, end) {
  const dist    = {};
  const visited = {};
  const prev    = {};  // table des prédécesseurs

  for (const node of Object.keys(graph)) {
    dist[node] = Infinity;
    prev[node] = null;
  }
  dist[start] = 0;

  const heap = new MinHeap();
  heap.push([0, start]);

  while (!heap.isEmpty()) {
    const [cost, u] = heap.pop();
    if (visited[u]) continue;
    visited[u] = true;

    for (const [v, weight] of graph[u]) {
      if (!visited[v]) {
        const newDist = dist[u] + weight;
        if (newDist < dist[v]) {
          dist[v] = newDist;
          // TODO : enregistrer prev[v] = u
          heap.push([newDist, v]);
        }
      }
    }
  }

  // TODO : reconstruire le chemin de start à end
  // Indice : partir de end, remonter via prev jusqu'à null
  //          insérer chaque nœud en tête du tableau (unshift)
  return { dist, path: [] };
}`,
  correction:
`function dijkstraWithPath(graph, start, end) {
  const dist    = {};
  const visited = {};
  const prev    = {};

  for (const node of Object.keys(graph)) {
    dist[node] = Infinity;
    prev[node] = null;
  }
  dist[start] = 0;

  const heap = new MinHeap();
  heap.push([0, start]);

  while (!heap.isEmpty()) {
    const [cost, u] = heap.pop();
    if (visited[u]) continue;
    visited[u] = true;

    for (const [v, weight] of graph[u]) {
      if (!visited[v]) {
        const newDist = dist[u] + weight;
        if (newDist < dist[v]) {
          dist[v] = newDist;
          prev[v] = u;           // ← enregistre le prédécesseur
          heap.push([newDist, v]);
        }
      }
    }
  }

  // Reconstruction : remonter de end → start via prev
  const path = [];
  let current = end;
  while (current !== null) {
    path.unshift(current);
    current = prev[current];
  }
  if (path[0] !== start) return { dist, path: [] }; // inaccessible

  return { dist, path };
}`,
  explanation:
    "prev[v] = u signifie « pour atteindre v au moindre coût, on vient de u ». La reconstruction remonte cette chaîne en O(V) : on part de end, on insère en tête (unshift) jusqu'à atteindre start → le tableau va de start à end. Sans cette table, Dijkstra ne connaît que les distances, pas les chemins.",
};

const tp2_fr = {
  id: "tp-budget",
  type: "tp",
  title: "TP — Nœuds accessibles dans un budget K",
  subject:
`Implémentez \`nodesWithinBudget(graph, start, K)\` qui retourne tous les nœuds accessibles depuis \`start\` avec un coût total ≤ K.

Approche : utilisez Dijkstra pour calculer toutes les distances, puis filtrez les nœuds dont la distance est ≤ K (en excluant la source elle-même).`,
  baseCode:
`function nodesWithinBudget(graph, start, K) {
  // Étape 1 : calculer toutes les distances depuis start
  // (supposez que dijkstra(graph, start) retourne un objet dist{})
  const dist = dijkstra(graph, start);

  // Étape 2 : filtrer les nœuds avec dist[node] > 0 et dist[node] <= K
  // TODO : retourner un tableau des nœuds dans le budget
  //        (exclure la source : dist[source] = 0)
}

// Exemple :
// nodesWithinBudget(graph, "A", 5)
// → ["B", "C"]  si dist[B]=3 et dist[C]=5 et dist[D]=8`,
  correction:
`function nodesWithinBudget(graph, start, K) {
  const dist = dijkstra(graph, start);

  return Object.entries(dist)
    .filter(([node, d]) => d > 0 && d <= K)
    .map(([node]) => node);
}

// Variante avec boucle explicite (même résultat) :
function nodesWithinBudgetVerbose(graph, start, K) {
  const dist   = dijkstra(graph, start);
  const result = [];
  for (const [node, d] of Object.entries(dist)) {
    if (d > 0 && d <= K) result.push(node);
  }
  return result;
}`,
  explanation:
    "Object.entries(dist) retourne les paires [node, distance]. Le filtre d > 0 exclut la source (distance 0), et d <= K retient les nœuds dans le budget. Cette approche réutilise Dijkstra comme boîte noire puis post-traite le résultat en O(V) — pattern très courant dans les systèmes de navigation (ex : « restaurants à moins de 10 min »).",
};

const tp3_fr = {
  id: "tp-grid",
  type: "tp",
  title: "TP — Plus court chemin dans une grille 2D",
  subject:
`Les grilles 2D sont des graphes implicites. Chaque case (r, c) est connectée à ses 4 voisins (haut, bas, gauche, droite) avec un poids de 1. Les cases où grid[r][c] === 1 sont des obstacles.

Implémentez \`shortestPathGrid(grid)\` qui retourne la longueur du plus court chemin de (0,0) à (rows-1, cols-1), ou -1 si aucun chemin n'existe.`,
  baseCode:
`function shortestPathGrid(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  if (grid[0][0] === 1 || grid[rows-1][cols-1] === 1) return -1;

  // dist[r][c] = nombre minimal de cases pour atteindre (r,c)
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  dist[0][0] = 0;

  const heap = new MinHeap();
  heap.push([0, 0, 0]);  // [coût, row, col]

  const DIRS = [[-1,0],[1,0],[0,-1],[0,1]];

  while (!heap.isEmpty()) {
    const [cost, r, c] = heap.pop();

    // TODO : si on atteint la destination → retourner cost + 1
    //        (on compte la case d'arrivée)

    if (cost > dist[r][c]) continue;  // entrée obsolète

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      // TODO : vérifier les bornes, éviter les obstacles,
      //        et relaxer si newCost < dist[nr][nc]
    }
  }

  return -1;
}`,
  correction:
`function shortestPathGrid(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  if (grid[0][0] === 1 || grid[rows-1][cols-1] === 1) return -1;

  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  dist[0][0] = 0;

  const heap = new MinHeap();
  heap.push([0, 0, 0]);

  const DIRS = [[-1,0],[1,0],[0,-1],[0,1]];

  while (!heap.isEmpty()) {
    const [cost, r, c] = heap.pop();

    if (r === rows - 1 && c === cols - 1) return cost + 1;
    if (cost > dist[r][c]) continue;

    for (const [dr, dc] of DIRS) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (grid[nr][nc] === 1) continue;
      const newCost = dist[r][c] + 1;
      if (newCost < dist[nr][nc]) {
        dist[nr][nc] = newCost;
        heap.push([newCost, nr, nc]);
      }
    }
  }

  return -1;
}`,
  explanation:
    "Une grille est un graphe implicite : pas besoin de le construire explicitement, les cases sont les sommets et les 4 directions les arêtes. Ici tous les poids valent 1, donc BFS donnerait le même résultat. Mais Dijkstra se généralise à des grilles à coûts variables (terrain, altitude…) — c'est exactement ce que font les jeux comme Civilization pour le pathfinding.",
};

// ── TPs EN ────────────────────────────────────────
const tp1_en = {
  id: "tp-path",
  type: "tp",
  title: "TP — Dijkstra with path reconstruction",
  subject:
`The standard Dijkstra returns only minimum distances.
Modify it to also record predecessors (table \`prev\`) and implement path reconstruction from \`start\` to \`end\`.

Rule: on each successful relaxation (newDist < dist[v]), store prev[v] = u.
Then walk back from \`end\` to \`start\` via prev to rebuild the path.`,
  baseCode:
`function dijkstraWithPath(graph, start, end) {
  const dist    = {};
  const visited = {};
  const prev    = {};  // predecessor table

  for (const node of Object.keys(graph)) {
    dist[node] = Infinity;
    prev[node] = null;
  }
  dist[start] = 0;

  const heap = new MinHeap();
  heap.push([0, start]);

  while (!heap.isEmpty()) {
    const [cost, u] = heap.pop();
    if (visited[u]) continue;
    visited[u] = true;

    for (const [v, weight] of graph[u]) {
      if (!visited[v]) {
        const newDist = dist[u] + weight;
        if (newDist < dist[v]) {
          dist[v] = newDist;
          // TODO: store prev[v] = u
          heap.push([newDist, v]);
        }
      }
    }
  }

  // TODO: reconstruct path from start to end
  // Hint: start from end, walk back via prev until null
  //       insert each node at the front (unshift)
  return { dist, path: [] };
}`,
  correction:
`function dijkstraWithPath(graph, start, end) {
  const dist    = {};
  const visited = {};
  const prev    = {};

  for (const node of Object.keys(graph)) {
    dist[node] = Infinity;
    prev[node] = null;
  }
  dist[start] = 0;

  const heap = new MinHeap();
  heap.push([0, start]);

  while (!heap.isEmpty()) {
    const [cost, u] = heap.pop();
    if (visited[u]) continue;
    visited[u] = true;

    for (const [v, weight] of graph[u]) {
      if (!visited[v]) {
        const newDist = dist[u] + weight;
        if (newDist < dist[v]) {
          dist[v] = newDist;
          prev[v] = u;           // ← store predecessor
          heap.push([newDist, v]);
        }
      }
    }
  }

  // Reconstruction: walk back from end → start via prev
  const path = [];
  let current = end;
  while (current !== null) {
    path.unshift(current);
    current = prev[current];
  }
  if (path[0] !== start) return { dist, path: [] }; // unreachable

  return { dist, path };
}`,
  explanation:
    "prev[v] = u means 'to reach v at minimum cost, we come from u'. Reconstruction walks this chain in O(V): starting from end, insert each node at the front (unshift) until reaching start → the array goes from start to end. Without this table, Dijkstra only knows distances, not the actual paths.",
};

const tp2_en = {
  id: "tp-budget",
  type: "tp",
  title: "TP — Nodes reachable within budget K",
  subject:
`Implement \`nodesWithinBudget(graph, start, K)\` that returns all nodes reachable from \`start\` with a total cost ≤ K.

Approach: use Dijkstra to compute all distances, then filter nodes whose distance is ≤ K (excluding the source node itself).`,
  baseCode:
`function nodesWithinBudget(graph, start, K) {
  // Step 1: compute all distances from start
  // (assume dijkstra(graph, start) returns a dist{} object)
  const dist = dijkstra(graph, start);

  // Step 2: filter nodes with dist[node] > 0 and dist[node] <= K
  // TODO: return an array of nodes within the budget
  //       (exclude the source: dist[source] = 0)
}

// Example:
// nodesWithinBudget(graph, "A", 5)
// → ["B", "C"]  if dist[B]=3, dist[C]=5, dist[D]=8`,
  correction:
`function nodesWithinBudget(graph, start, K) {
  const dist = dijkstra(graph, start);

  return Object.entries(dist)
    .filter(([node, d]) => d > 0 && d <= K)
    .map(([node]) => node);
}

// Verbose variant (same result):
function nodesWithinBudgetVerbose(graph, start, K) {
  const dist   = dijkstra(graph, start);
  const result = [];
  for (const [node, d] of Object.entries(dist)) {
    if (d > 0 && d <= K) result.push(node);
  }
  return result;
}`,
  explanation:
    "Object.entries(dist) returns [node, distance] pairs. The filter d > 0 excludes the source (distance 0), and d <= K keeps only nodes within budget. This reuses Dijkstra as a black box then post-processes in O(V) — a very common pattern in navigation systems (e.g. 'restaurants within 10 minutes').",
};

const tp3_en = {
  id: "tp-grid",
  type: "tp",
  title: "TP — Shortest path in a 2D grid",
  subject:
`2D grids are implicit graphs. Each cell (r, c) is connected to its 4 neighbors (up, down, left, right) with weight 1. Cells where grid[r][c] === 1 are obstacles.

Implement \`shortestPathGrid(grid)\` that returns the length of the shortest path from (0,0) to (rows-1, cols-1), or -1 if no path exists.`,
  baseCode:
`function shortestPathGrid(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  if (grid[0][0] === 1 || grid[rows-1][cols-1] === 1) return -1;

  // dist[r][c] = minimum cells to reach (r,c)
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  dist[0][0] = 0;

  const heap = new MinHeap();
  heap.push([0, 0, 0]);  // [cost, row, col]

  const DIRS = [[-1,0],[1,0],[0,-1],[0,1]];

  while (!heap.isEmpty()) {
    const [cost, r, c] = heap.pop();

    // TODO: if we reach the destination → return cost + 1
    //       (count the arrival cell)

    if (cost > dist[r][c]) continue;  // stale entry

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      // TODO: check bounds, skip obstacles,
      //       relax if newCost < dist[nr][nc]
    }
  }

  return -1;
}`,
  correction:
`function shortestPathGrid(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  if (grid[0][0] === 1 || grid[rows-1][cols-1] === 1) return -1;

  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  dist[0][0] = 0;

  const heap = new MinHeap();
  heap.push([0, 0, 0]);

  const DIRS = [[-1,0],[1,0],[0,-1],[0,1]];

  while (!heap.isEmpty()) {
    const [cost, r, c] = heap.pop();

    if (r === rows - 1 && c === cols - 1) return cost + 1;
    if (cost > dist[r][c]) continue;

    for (const [dr, dc] of DIRS) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (grid[nr][nc] === 1) continue;
      const newCost = dist[r][c] + 1;
      if (newCost < dist[nr][nc]) {
        dist[nr][nc] = newCost;
        heap.push([newCost, nr, nc]);
      }
    }
  }

  return -1;
}`,
  explanation:
    "A grid is an implicit graph: cells are vertices, the 4 directions are edges. Since all weights are 1, BFS would give the same result. But Dijkstra generalizes to variable-cost grids (terrain, altitude…) — exactly what games like Civilization use for pathfinding.",
};

fr.push(tp1_fr, tp2_fr, tp3_fr);
en.push(tp1_en, tp2_en, tp3_en);

export const DIJKSTRA_EXERCISES = { fr, en };
