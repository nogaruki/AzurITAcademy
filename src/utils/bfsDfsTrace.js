/**
 * Génère la trace complète de BFS sur un graphe non orienté.
 * @param {{ nodes: {id: number}[], edges: {from: number, to: number}[] }} graph
 * @param {number} startNode
 * @returns {Array<{
 *   type: 'init'|'visit'|'enqueue'|'explore'|'skip'|'done',
 *   desc: string,
 *   visited: number[],
 *   frontier: number[],
 *   current: number|null,
 *   highlightEdge: {from: number, to: number}|null
 * }>}
 */
export function bfsTrace(graph, startNode = 0) {
  const { nodes, edges } = graph;

  // Liste d'adjacence non orientée
  const adj = new Map();
  nodes.forEach((n) => adj.set(n.id, []));
  edges.forEach((e) => {
    adj.get(e.from).push(e.to);
    if (!adj.get(e.to).includes(e.from)) adj.get(e.to).push(e.from);
  });

  const visited = new Set([startNode]);
  const queue = [startNode];
  const visitOrder = [];
  const steps = [];

  steps.push({
    type: "init",
    desc: `BFS depuis ${graph.nodes[startNode]?.label ?? startNode}. File = [${graph.nodes[startNode]?.label ?? startNode}]`,
    visited: [...visited],
    frontier: [...queue],
    current: null,
    highlightEdge: null,
  });

  while (queue.length > 0) {
    const u = queue.shift();
    visitOrder.push(u);
    const uLabel = graph.nodes.find((n) => n.id === u)?.label ?? u;

    steps.push({
      type: "visit",
      desc: `Dépiler ${uLabel}. Visite #${visitOrder.length}. File = [${queue.map((id) => graph.nodes.find((n) => n.id === id)?.label ?? id).join(", ") || "vide"}]`,
      visited: [...visited],
      frontier: [...queue],
      current: u,
      highlightEdge: null,
    });

    const neighbors = adj.get(u) || [];
    for (const v of neighbors) {
      const vLabel = graph.nodes.find((n) => n.id === v)?.label ?? v;

      steps.push({
        type: "explore",
        desc: `Explorer arête ${uLabel}—${vLabel}`,
        visited: [...visited],
        frontier: [...queue],
        current: u,
        highlightEdge: { from: u, to: v },
      });

      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
        steps.push({
          type: "enqueue",
          desc: `${vLabel} non visité → ajout à la file. File = [${queue.map((id) => graph.nodes.find((n) => n.id === id)?.label ?? id).join(", ")}]`,
          visited: [...visited],
          frontier: [...queue],
          current: u,
          highlightEdge: { from: u, to: v },
        });
      } else {
        steps.push({
          type: "skip",
          desc: `${vLabel} déjà visité → ignoré`,
          visited: [...visited],
          frontier: [...queue],
          current: u,
          highlightEdge: { from: u, to: v },
        });
      }
    }
  }

  steps.push({
    type: "done",
    desc: `BFS terminé. Ordre de visite : [${visitOrder.map((id) => graph.nodes.find((n) => n.id === id)?.label ?? id).join(" → ")}]`,
    visited: [...visited],
    frontier: [],
    current: null,
    highlightEdge: null,
  });

  return steps;
}

/**
 * Génère la trace complète de DFS (récursif simulé) sur un graphe non orienté.
 * @param {{ nodes: {id: number}[], edges: {from: number, to: number}[] }} graph
 * @param {number} startNode
 */
export function dfsTrace(graph, startNode = 0) {
  const { nodes, edges } = graph;

  const adj = new Map();
  nodes.forEach((n) => adj.set(n.id, []));
  edges.forEach((e) => {
    adj.get(e.from).push(e.to);
    if (!adj.get(e.to).includes(e.from)) adj.get(e.to).push(e.from);
  });

  const visited = new Set();
  const callStack = [];
  const visitOrder = [];
  const steps = [];

  steps.push({
    type: "init",
    desc: `DFS depuis ${nodes[startNode]?.label ?? startNode}. Pile = []`,
    visited: [...visited],
    frontier: [],
    current: null,
    highlightEdge: null,
  });

  function label(id) {
    return nodes.find((n) => n.id === id)?.label ?? id;
  }

  function dfs(u) {
    visited.add(u);
    visitOrder.push(u);
    callStack.push(u);

    steps.push({
      type: "visit",
      desc: `Visiter ${label(u)}. Visite #${visitOrder.length}. Pile = [${callStack.map(label).join(" → ")}]`,
      visited: [...visited],
      frontier: [...callStack],
      current: u,
      highlightEdge: null,
    });

    const neighbors = adj.get(u) || [];
    for (const v of neighbors) {
      steps.push({
        type: "explore",
        desc: `Explorer arête ${label(u)}—${label(v)}`,
        visited: [...visited],
        frontier: [...callStack],
        current: u,
        highlightEdge: { from: u, to: v },
      });

      if (!visited.has(v)) {
        dfs(v);
      } else {
        steps.push({
          type: "skip",
          desc: `${label(v)} déjà visité → ignoré`,
          visited: [...visited],
          frontier: [...callStack],
          current: u,
          highlightEdge: { from: u, to: v },
        });
      }
    }

    callStack.pop();
    steps.push({
      type: "backtrack",
      desc: `Retour arrière depuis ${label(u)}. Pile = [${callStack.length > 0 ? callStack.map(label).join(" → ") : "vide"}]`,
      visited: [...visited],
      frontier: [...callStack],
      current: callStack.length > 0 ? callStack[callStack.length - 1] : null,
      highlightEdge: null,
    });
  }

  dfs(startNode);

  steps.push({
    type: "done",
    desc: `DFS terminé. Ordre de visite : [${visitOrder.map(label).join(" → ")}]`,
    visited: [...visited],
    frontier: [],
    current: null,
    highlightEdge: null,
  });

  return steps;
}
