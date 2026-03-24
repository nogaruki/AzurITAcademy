/**
 * Exécute Dijkstra sur un graphe et retourne une trace complète
 * de chaque étape pour l'animation pas-à-pas.
 *
 * @param {{ nodes: {id: number}[], edges: {from: number, to: number, weight: number}[] }} graph
 * @returns {Array<{
 *   type: 'init'|'visit'|'relax'|'no-relax'|'skip'|'done',
 *   desc: string,
 *   dist: number[],
 *   visited: boolean[],
 *   heap: {node: number, dist: number}[],
 *   current: number|null,
 *   relaxing: number|null,
 *   highlightEdge: {from: number, to: number}|null
 * }>}
 */
export function dijkstraTrace(graph) {
  const { nodes, edges } = graph;
  const V = nodes.length;

  // Build adjacency list
  const adj = new Map();
  nodes.forEach((n) => adj.set(n.id, []));
  edges.forEach((e) => {
    const list = adj.get(e.from) || [];
    list.push({ to: e.to, weight: e.weight });
    adj.set(e.from, list);
  });

  const dist = new Array(V).fill(Infinity);
  dist[0] = 0;
  const visited = new Array(V).fill(false);
  const heap = [{ node: 0, dist: 0 }];
  const steps = [];

  // Step 0 — initialisation
  steps.push({
    type: "init",
    desc: "Initialisation : dist[0] = 0, tout le reste à ∞",
    dist: [...dist],
    visited: [...visited],
    heap: [...heap],
    current: null,
    relaxing: null,
    highlightEdge: null,
  });

  while (heap.length > 0) {
    heap.sort((a, b) => a.dist - b.dist);
    const curr = heap.shift();
    const u = curr.node;

    // Skip already-visited duplicates
    if (visited[u]) {
      steps.push({
        type: "skip",
        desc: `Sommet ${u} déjà visité → ignoré (doublon)`,
        dist: [...dist],
        visited: [...visited],
        heap: [...heap],
        current: u,
        relaxing: null,
        highlightEdge: null,
      });
      continue;
    }

    // Mark as visited
    visited[u] = true;
    steps.push({
      type: "visit",
      desc: `Pop sommet ${u} (distance = ${dist[u]}). Marqué comme visité.`,
      dist: [...dist],
      visited: [...visited],
      heap: [...heap],
      current: u,
      relaxing: null,
      highlightEdge: null,
    });

    // Explore neighbours
    const neighbors = adj.get(u) || [];
    for (const { to: v, weight: w } of neighbors) {
      const newDist = dist[u] + w;

      if (!visited[v] && newDist < dist[v]) {
        dist[v] = newDist;
        heap.push({ node: v, dist: newDist });
        steps.push({
          type: "relax",
          desc: `Relaxation ${u}→${v} : ${dist[u]}+${w}=${newDist} → MAJ dist[${v}] = ${newDist}`,
          dist: [...dist],
          visited: [...visited],
          heap: [...heap],
          current: u,
          relaxing: v,
          highlightEdge: { from: u, to: v },
        });
      } else if (!visited[v]) {
        steps.push({
          type: "no-relax",
          desc: `Arête ${u}→${v} : ${dist[u]}+${w}=${newDist} ≥ ${dist[v]} → pas de mise à jour`,
          dist: [...dist],
          visited: [...visited],
          heap: [...heap],
          current: u,
          relaxing: null,
          highlightEdge: { from: u, to: v },
        });
      }
    }
  }

  // Final step
  steps.push({
    type: "done",
    desc: `Terminé ! dist = [${dist.join(", ")}]`,
    dist: [...dist],
    visited: [...visited],
    heap: [],
    current: null,
    relaxing: null,
    highlightEdge: null,
  });

  return steps;
}
