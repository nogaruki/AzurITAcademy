// ─── Graphe par défaut pour la démo (3 nœuds) ───
export const DEFAULT_GRAPH = {
  nodes: [
    { id: 0, x: 100, y: 200, label: "0" },
    { id: 1, x: 350, y: 100, label: "1" },
    { id: 2, x: 600, y: 200, label: "2" },
  ],
  edges: [
    { from: 0, to: 1, weight: 5 },
    { from: 0, to: 2, weight: 10 },
    { from: 1, to: 2, weight: 3 },
  ],
};

// ─── Graphe complexe pour l'interactivité (6 nœuds) ───
export const COMPLEX_GRAPH = {
  nodes: [
    { id: 0, x: 80,  y: 200, label: "0" },
    { id: 1, x: 250, y: 80,  label: "1" },
    { id: 2, x: 250, y: 320, label: "2" },
    { id: 3, x: 450, y: 80,  label: "3" },
    { id: 4, x: 450, y: 320, label: "4" },
    { id: 5, x: 620, y: 200, label: "5" },
  ],
  edges: [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 2 },
    { from: 1, to: 3, weight: 5 },
    { from: 2, to: 1, weight: 1 },
    { from: 2, to: 4, weight: 8 },
    { from: 3, to: 5, weight: 6 },
    { from: 4, to: 3, weight: 2 },
    { from: 4, to: 5, weight: 3 },
  ],
};
