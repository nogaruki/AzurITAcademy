// ─── Graphes pour BFS & DFS (non orientés) ───

export const BFS_DFS_SIMPLE = {
  nodes: [
    { id: 0, x: 100, y: 200, label: "A" },
    { id: 1, x: 300, y: 80,  label: "B" },
    { id: 2, x: 300, y: 320, label: "C" },
    { id: 3, x: 500, y: 80,  label: "D" },
    { id: 4, x: 500, y: 320, label: "E" },
  ],
  edges: [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 },
  ],
};

export const BFS_DFS_COMPLEX = {
  nodes: [
    { id: 0, x: 80,  y: 200, label: "A" },
    { id: 1, x: 260, y: 80,  label: "B" },
    { id: 2, x: 260, y: 320, label: "C" },
    { id: 3, x: 440, y: 80,  label: "D" },
    { id: 4, x: 440, y: 200, label: "E" },
    { id: 5, x: 440, y: 320, label: "F" },
    { id: 6, x: 620, y: 200, label: "G" },
  ],
  edges: [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 6 },
    { from: 4, to: 6 },
    { from: 5, to: 6 },
  ],
};
