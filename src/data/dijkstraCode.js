// ─── Code source TypeScript complet (affiché dans l'onglet Code) ───
export const DIJKSTRA_CODE = `class MinHeap {
  private heap: Array<{node: number, dist: number}> = [];

  size() { return this.heap.length; }

  push(x: {node: number, dist: number}) {
    this.heap.push(x);
    this.heapifyUp();
  }

  pop(): {node: number, dist: number} | undefined {
    if (this.heap.length === 0) return undefined;
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown();
    }
    return top;
  }

  private heapifyUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent].dist <= this.heap[idx].dist) break;
      [this.heap[parent], this.heap[idx]] =
        [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  private heapifyDown() {
    let idx = 0;
    const n = this.heap.length;
    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      if (left < n && this.heap[left].dist < this.heap[smallest].dist)
        smallest = left;
      if (right < n && this.heap[right].dist < this.heap[smallest].dist)
        smallest = right;
      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] =
        [this.heap[smallest], this.heap[idx]];
      idx = smallest;
    }
  }
}

function dijkstra(
  V: number,
  graph: Map<number, {to: number, weight: number}[]>
): number[] {
  const dist = Array(V).fill(Infinity);
  dist[0] = 0;
  const visited = Array(V).fill(false);
  const heap = new MinHeap();
  heap.push({node: 0, dist: 0});

  while (heap.size() > 0) {
    const curr = heap.pop()!;
    const u = curr.node;
    if (visited[u]) continue;
    visited[u] = true;

    const neighbors = graph.get(u) || [];
    for (const {to: v, weight: w} of neighbors) {
      if (!visited[v] && curr.dist + w < dist[v]) {
        dist[v] = curr.dist + w;
        heap.push({node: v, dist: dist[v]});
      }
    }
  }
  return dist;
}`;
