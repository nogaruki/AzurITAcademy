export const BFS_CODE = `// BFS — Parcours en Largeur (Breadth-First Search)
// Complexité : O(V + E) temps, O(V) espace

function bfs(graph: number[][], start: number): number[] {
  const visited = new Set<number>([start]);
  const queue: number[] = [start];
  const order: number[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!; // dépiler en tête (FIFO)
    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor); // enfiler à la fin
      }
    }
  }

  return order; // ordre de visite BFS
}

// Exemple :
// Graphe : A-B, A-C, B-D, C-D
// bfs(graph, 0) → [A, B, C, D]  (niveau par niveau)`;

export const DFS_CODE = `// DFS — Parcours en Profondeur (Depth-First Search)
// Complexité : O(V + E) temps, O(V) espace

function dfs(graph: number[][], start: number): number[] {
  const visited = new Set<number>();
  const order: number[] = [];

  function explore(node: number): void {
    visited.add(node);
    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        explore(neighbor); // récursion — approfondissement
      }
    }
    // retour arrière implicite ici
  }

  explore(start);
  return order; // ordre de visite DFS
}

// Exemple :
// Graphe : A-B, A-C, B-D, C-D
// dfs(graph, 0) → [A, B, D, C]  (en profondeur d'abord)

// Version itérative (pile explicite) :
function dfsIterative(graph: number[][], start: number): number[] {
  const visited = new Set<number>();
  const stack: number[] = [start];
  const order: number[] = [];

  while (stack.length > 0) {
    const node = stack.pop()!; // dépiler en tête (LIFO)
    if (visited.has(node)) continue;

    visited.add(node);
    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return order;
}`;
