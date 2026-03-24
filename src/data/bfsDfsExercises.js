// ─── Exercices codes à trou BFS & DFS ───

const fr = [
  {
    id: "bfs-core",
    title: "BFS — Parcours en largeur",
    description: "Complétez l'implémentation de BFS. La file gère l'ordre de visite.",
    code: `function bfs(graph: number[][], start: number): number[] {
  const visited = new Set<number>();
  const ___ = [start];   // file FIFO
  const order: number[] = [];

  visited.add(start);

  while (___.length > 0) {
    const node = ___.___();  // dépiler en tête

    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.___(neighbor);
        ___.push(neighbor);
      }
    }
  }

  return order;
}`,
    blanks: ["queue", "queue", "shift", "add", "queue"],
    hints: [
      "Utilisez une file FIFO",
      "Référencez la même variable",
      "shift() retire le premier élément",
      "Set.add() pour marquer visité",
      "Référencez la même variable",
    ],
    guide: `1. Déclarez une file (array) initialisée avec le nœud de départ.
2. Tant que la file n'est pas vide : retirez le premier élément (shift).
3. Pour chaque voisin non visité : marquez-le visité et ajoutez-le à la file.`,
    correction: `function bfs(graph: number[][], start: number): number[] {
  const visited = new Set<number>();
  const queue = [start];
  const order: number[] = [];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return order;
}`,
  },
  {
    id: "dfs-recursive",
    title: "DFS — Parcours en profondeur (récursif)",
    description: "Complétez l'implémentation récursive de DFS.",
    code: `function dfs(graph: number[][], start: number): number[] {
  const visited = new _____<number>();
  const order: number[] = [];

  function explore(node: number): void {
    visited.add(node);
    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited._____(neighbor)) {
        _____(neighbor);
      }
    }
  }

  _____(start);
  return order;
}`,
    blanks: ["Set", "has", "explore", "explore"],
    hints: [
      "Structure de données pour l'ensemble de nœuds visités",
      "Méthode pour tester l'appartenance à un Set",
      "Appel récursif de la fonction interne",
      "Premier appel pour lancer la récursion",
    ],
    guide: `1. Utilisez un Set pour mémoriser les nœuds visités.
2. La fonction interne explore() se rappelle récursivement pour chaque voisin non visité.
3. Lancez la récursion avec le nœud de départ.`,
    correction: `function dfs(graph: number[][], start: number): number[] {
  const visited = new Set<number>();
  const order: number[] = [];

  function explore(node: number): void {
    visited.add(node);
    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        explore(neighbor);
      }
    }
  }

  explore(start);
  return order;
}`,
  },
];

const en = [
  {
    id: "bfs-core",
    title: "BFS — Breadth-First Search",
    description: "Complete the BFS implementation. The queue manages the visit order.",
    code: `function bfs(graph: number[][], start: number): number[] {
  const visited = new Set<number>();
  const ___ = [start];   // FIFO queue
  const order: number[] = [];

  visited.add(start);

  while (___.length > 0) {
    const node = ___.___();  // dequeue from front

    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.___(neighbor);
        ___.push(neighbor);
      }
    }
  }

  return order;
}`,
    blanks: ["queue", "queue", "shift", "add", "queue"],
    hints: [
      "Use a FIFO queue",
      "Reference the same variable",
      "shift() removes the first element",
      "Set.add() to mark as visited",
      "Reference the same variable",
    ],
    guide: `1. Declare a queue (array) initialized with the start node.
2. While the queue is not empty: remove the first element (shift).
3. For each unvisited neighbor: mark it visited and add it to the queue.`,
    correction: `function bfs(graph: number[][], start: number): number[] {
  const visited = new Set<number>();
  const queue = [start];
  const order: number[] = [];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return order;
}`,
  },
  {
    id: "dfs-recursive",
    title: "DFS — Depth-First Search (recursive)",
    description: "Complete the recursive DFS implementation.",
    code: `function dfs(graph: number[][], start: number): number[] {
  const visited = new _____<number>();
  const order: number[] = [];

  function explore(node: number): void {
    visited.add(node);
    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited._____(neighbor)) {
        _____(neighbor);
      }
    }
  }

  _____(start);
  return order;
}`,
    blanks: ["Set", "has", "explore", "explore"],
    hints: [
      "Data structure for the set of visited nodes",
      "Method to test membership in a Set",
      "Recursive call to the inner function",
      "First call to start the recursion",
    ],
    guide: `1. Use a Set to track visited nodes.
2. The inner explore() function calls itself recursively for each unvisited neighbor.
3. Start the recursion with the starting node.`,
    correction: `function dfs(graph: number[][], start: number): number[] {
  const visited = new Set<number>();
  const order: number[] = [];

  function explore(node: number): void {
    visited.add(node);
    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        explore(neighbor);
      }
    }
  }

  explore(start);
  return order;
}`,
  },
];

export const BFS_DFS_EXERCISES = { fr, en };
