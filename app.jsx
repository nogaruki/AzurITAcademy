import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* ═══════════════════════════════════════════════════════
   AzurIT Academy — Plateforme interactive d'apprentissage
   des algorithmes. Dijkstra, pas-à-pas, animé.
   ═══════════════════════════════════════════════════════ */

// ─── Données du cours Dijkstra parsées depuis le .md ───
const COURSE_SECTIONS = [
  {
    id: "intro",
    title: "C'est quoi un graphe ?",
    icon: "◈",
    content: `Imagine une carte simplifiée. Tu as des **villes** (des **sommets**) et des **routes** entre elles (des **arêtes**). Les chiffres sur les routes s'appellent des **poids** — une distance en km, un temps, un prix…\n\nCe graphe est **orienté** (flèches à sens unique) et **pondéré** (chaque route a un coût).`,
  },
  {
    id: "shortest",
    title: "Le chemin le plus court",
    icon: "◇",
    content: `Le **chemin le plus court** n'est pas forcément celui avec le moins d'étapes. C'est celui dont **la somme des poids est la plus petite**.\n\n**Analogie GPS :** L'autoroute qui fait un détour est parfois plus rapide que la route directe !`,
  },
  {
    id: "purpose",
    title: "À quoi sert Dijkstra ?",
    icon: "◉",
    content: `Dijkstra répond à : « Depuis un point de départ, quel est le coût minimum pour atteindre chacun des autres points ? »\n\n**Usages :** GPS & navigation, routage réseau, pathfinding dans les jeux vidéo (ou A*), logistique & tournées.`,
  },
  {
    id: "algorithm",
    title: "Comment fonctionne Dijkstra ?",
    icon: "▣",
    content: `**L'idée en une phrase :** À chaque étape, on choisit le sommet non visité avec la plus petite distance connue, puis on regarde si en passant par lui, on peut améliorer les distances de ses voisins.\n\nC'est comme un explorateur prudent : il va toujours vers l'endroit **le plus proche qu'il n'a pas encore visité**.`,
  },
  {
    id: "structures",
    title: "Structures de données",
    icon: "⬡",
    content: `**Tableau dist :** meilleure distance connue vers chaque sommet.\n**Tableau visited :** booléens pour savoir quels sommets sont traités.\n**File de priorité (min-heap) :** liste d'attente où le sommet le plus proche sort en premier — en O(log n) au lieu de O(n).`,
  },
  {
    id: "relaxation",
    title: "La relaxation des arêtes",
    icon: "⟐",
    content: `C'est le cœur de Dijkstra. Pour chaque voisin v du sommet u :\n\n**nouveau_coût = distance_jusqu'à_u + poids(u→v)**\n\nSi nouveau_coût < dist[v], c'est un raccourci !\n\n**Analogie :** Un ami te dit « En passant par Dijon, Paris→Lyon prend 4h au lieu de 5h ». Tu mets à jour ton estimation.`,
  },
  {
    id: "complexity",
    title: "Complexité & récapitulatif",
    icon: "⬢",
    content: `**Complexité temporelle :** O((V + E) × log V) avec file de priorité.\n**Complexité spatiale :** O(V + E).\n\n**5 points clés :** Init dist à ∞ (sauf source = 0) → Push source → Boucle : pop le min, relaxe ses voisins → File vide = terminé → La file de priorité rend tout ça efficace.`,
  },
];

// ─── Graphe par défaut pour la démo ───
const DEFAULT_GRAPH = {
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

// ─── Graphe plus complexe pour l'interactivité ───
const COMPLEX_GRAPH = {
  nodes: [
    { id: 0, x: 80, y: 200, label: "0" },
    { id: 1, x: 250, y: 80, label: "1" },
    { id: 2, x: 250, y: 320, label: "2" },
    { id: 3, x: 450, y: 80, label: "3" },
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

// ─── Dijkstra avec trace d'exécution pas-à-pas ───
function dijkstraTrace(graph) {
  const { nodes, edges } = graph;
  const V = nodes.length;
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

    const neighbors = adj.get(u) || [];
    for (const { to: v, weight: w } of neighbors) {
      const newDist = dist[u] + w;
      if (!visited[v] && newDist < dist[v]) {
        dist[v] = newDist;
        heap.push({ node: v, dist: newDist });
        steps.push({
          type: "relax",
          desc: `Relaxation ${u}→${v} : ${dist[u]}+${w}=${newDist} < ${dist[v] === newDist ? "ancien" : dist[v]} → MAJ dist[${v}] = ${newDist}`,
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

// ─── Quiz data ───
const QUIZ_QUESTIONS = [
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

// ─── Code source complet pour l'éditeur ───
const DIJKSTRA_CODE = `class MinHeap {
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

// ─── Styles CSS ───
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&family=Fraunces:ital,wght@0,400;0,700;1,400&display=swap');

:root {
  --bg-deep: #0a0b0f;
  --bg-card: #12141c;
  --bg-card-hover: #181b27;
  --bg-surface: #1a1d2b;
  --border: #2a2e3f;
  --border-active: #4a5080;
  --text-primary: #e8eaf0;
  --text-secondary: #8890a8;
  --text-muted: #555a72;
  --accent: #6c8cff;
  --accent-glow: #6c8cff40;
  --accent-bright: #8aa4ff;
  --green: #4ade80;
  --green-glow: #4ade8030;
  --orange: #fb923c;
  --orange-glow: #fb923c30;
  --red: #f87171;
  --red-glow: #f8717130;
  --cyan: #22d3ee;
  --cyan-glow: #22d3ee20;
  --purple: #a78bfa;
}

* { margin:0; padding:0; box-sizing:border-box; }

body {
  background: var(--bg-deep);
  color: var(--text-primary);
  font-family: 'Outfit', sans-serif;
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-deep); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

.app { min-height: 100vh; }

/* ─ NAV ─ */
.topnav {
  position: sticky; top:0; z-index: 100;
  background: #0a0b0fdd;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.topnav-logo {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.5px;
  color: var(--accent);
  display:flex; align-items:center; gap:8px;
  cursor: pointer;
}
.topnav-logo span {
  background: linear-gradient(135deg, var(--accent), var(--cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.topnav-tabs {
  display: flex; gap: 4px;
}
.topnav-tab {
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all .2s;
}
.topnav-tab:hover { color: var(--text-primary); background: var(--bg-card); }
.topnav-tab.active {
  color: var(--accent);
  background: var(--accent-glow);
  border-color: var(--accent);
}

/* ─ HERO / HOME ─ */
.home { padding: 60px 24px 80px; max-width: 1100px; margin: auto; }
.hero {
  text-align: center;
  margin-bottom: 64px;
  position: relative;
}
.hero-badge {
  display: inline-flex;
  align-items:center; gap:6px;
  padding: 6px 14px;
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 24px;
  background: var(--bg-card);
}
.hero-badge::before {
  content: '';
  width:6px; height:6px;
  background: var(--green);
  border-radius:50%;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100% { opacity:1; }
  50% { opacity: .3; }
}
.hero h1 {
  font-family: 'Fraunces', serif;
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 700;
  line-height: 1.05;
  margin-bottom: 20px;
  letter-spacing: -2px;
}
.hero h1 em {
  font-style: italic;
  background: linear-gradient(135deg, var(--accent), var(--cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero p {
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 540px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ─ COURSE CARDS ─ */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}
.course-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px;
  cursor: pointer;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  position: relative;
  overflow: hidden;
}
.course-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--cyan));
  opacity: 0;
  transition: opacity .3s;
}
.course-card:hover {
  border-color: var(--border-active);
  background: var(--bg-card-hover);
  transform: translateY(-2px);
}
.course-card:hover::before { opacity: 1; }
.course-card-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 4px 10px;
  border-radius: 6px;
  margin-bottom: 14px;
}
.tag-graph { background: var(--accent-glow); color: var(--accent-bright); }
.tag-sort { background: var(--green-glow); color: var(--green); }
.tag-search { background: var(--orange-glow); color: var(--orange); }
.tag-struct { background: var(--red-glow); color: var(--red); }
.course-card h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: -0.3px;
}
.course-card p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 16px;
}
.course-card-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--text-muted);
}
.course-card-meta span { display:flex; align-items:center; gap:4px; }
.card-locked {
  opacity: 0.45;
  pointer-events: none;
}
.card-locked::after {
  content: 'Bientôt';
  position: absolute;
  top: 14px; right: 14px;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-muted);
}

/* ─ COURSE PAGE ─ */
.course-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
.course-header {
  margin-bottom: 32px;
}
.course-header h1 {
  font-family: 'Fraunces', serif;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 8px;
}
.course-header p {
  color: var(--text-secondary);
  font-size: 15px;
}

/* TABS for course sections */
.section-tabs {
  display:flex;
  gap:6px;
  flex-wrap:wrap;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}
.section-tab {
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 10px;
  cursor:pointer;
  transition: all .2s;
  font-family: 'Outfit', sans-serif;
}
.section-tab:hover { color: var(--text-secondary); border-color: var(--border-active); }
.section-tab.active {
  color: var(--accent-bright);
  background: var(--accent-glow);
  border-color: var(--accent);
}

/* PANELS */
.panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}
@media (max-width: 860px) {
  .panels { grid-template-columns: 1fr; }
}
.panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
}
.panel-header {
  display: flex;
  align-items:center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--text-secondary);
}
.panel-body { padding: 20px; }

/* GRAPH SVG */
.graph-svg { width: 100%; height: 340px; }

/* CONTROLS */
.controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.ctrl-btn {
  display: flex;
  align-items:center; justify-content:center;
  width: 38px; height: 38px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg-surface);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 16px;
  transition: all .15s;
  font-family: inherit;
}
.ctrl-btn:hover { border-color: var(--accent); color: var(--accent); }
.ctrl-btn:disabled { opacity: .3; cursor: not-allowed; }
.ctrl-btn.active { background: var(--accent-glow); border-color: var(--accent); color: var(--accent); }
.speed-select {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-surface);
  color: var(--text-primary);
  font-size: 13px;
  font-family: 'Outfit', sans-serif;
  cursor: pointer;
}
.step-info {
  flex: 1;
  text-align: right;
  font-size: 12px;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
}

/* DIST TABLE */
.dist-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
}
.dist-table th, .dist-table td {
  padding: 8px 12px;
  text-align: center;
  border-bottom: 1px solid var(--border);
}
.dist-table th {
  font-weight: 600;
  color: var(--text-muted);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.dist-cell {
  transition: all .3s;
  border-radius: 6px;
}
.dist-cell.updated {
  background: var(--accent-glow);
  color: var(--accent-bright);
  font-weight: 700;
}
.dist-cell.visited-cell {
  color: var(--green);
}

/* STEP LOG */
.step-log {
  max-height: 260px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.step-log-item {
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.4;
  border: 1px solid transparent;
  transition: all .2s;
}
.step-log-item.active {
  background: var(--accent-glow);
  border-color: var(--accent);
  color: var(--text-primary);
}
.step-log-item:not(.active) {
  color: var(--text-muted);
}
.step-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 6px;
  letter-spacing: .5px;
}
.badge-init { background: var(--border); color: var(--text-secondary); }
.badge-visit { background: var(--green-glow); color: var(--green); }
.badge-relax { background: var(--accent-glow); color: var(--accent-bright); }
.badge-skip { background: var(--orange-glow); color: var(--orange); }
.badge-done { background: var(--cyan-glow); color: var(--cyan); }

/* EXPLANATION */
.explanation {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-secondary);
}
.explanation strong {
  color: var(--text-primary);
  font-weight: 600;
}

/* CODE EDITOR */
.code-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 40px;
}
.code-body {
  position: relative;
}
.code-area {
  width: 100%;
  min-height: 420px;
  padding: 18px;
  background: #0d0e14;
  color: var(--text-primary);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.7;
  border: none;
  resize: vertical;
  outline: none;
  tab-size: 2;
}
.code-line-nums {
  position: absolute;
  left: 0; top: 0;
  width: 44px;
  padding: 18px 0;
  text-align: right;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.7;
  pointer-events: none;
  user-select: none;
  background: #0d0e14;
  border-right: 1px solid var(--border);
  padding-right: 8px;
}

/* INTERACTIVE INPUT */
.input-section {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 40px;
}
.input-section h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  display:flex; align-items:center; gap:8px;
}
.input-row {
  display:flex; gap:12px; align-items:flex-end; flex-wrap:wrap; margin-bottom: 16px;
}
.input-group { display:flex; flex-direction:column; gap:4px; }
.input-group label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: .5px;
}
.input-field {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-surface);
  color: var(--text-primary);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  width: 120px;
  outline: none;
  transition: border-color .2s;
}
.input-field:focus { border-color: var(--accent); }
.input-field.wide { width: 200px; }
.add-btn {
  padding: 8px 18px;
  border-radius: 8px;
  border: 1px solid var(--accent);
  background: var(--accent-glow);
  color: var(--accent-bright);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all .15s;
  font-family: 'Outfit', sans-serif;
}
.add-btn:hover { background: var(--accent); color: #fff; }
.edge-list {
  display:flex; flex-wrap:wrap; gap:8px;
}
.edge-chip {
  display: flex;
  align-items:center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-secondary);
}
.edge-chip button {
  background: none; border: none;
  color: var(--red);
  cursor: pointer;
  font-size: 14px;
}

/* QUIZ */
.quiz-section {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 28px;
  margin-bottom: 40px;
}
.quiz-section h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 24px;
}
.quiz-q {
  margin-bottom: 24px;
  padding: 20px;
  border-radius: 12px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
}
.quiz-q-text {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 14px;
  line-height: 1.5;
}
.quiz-q-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--accent);
  margin-bottom: 6px;
}
.quiz-opts { display: flex; flex-direction: column; gap: 8px; }
.quiz-opt {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all .15s;
  font-size: 14px;
  text-align: left;
  font-family: 'Outfit', sans-serif;
}
.quiz-opt:hover:not(.opt-correct):not(.opt-wrong) {
  border-color: var(--accent);
  color: var(--text-primary);
}
.opt-correct {
  border-color: var(--green) !important;
  background: var(--green-glow) !important;
  color: var(--green) !important;
}
.opt-wrong {
  border-color: var(--red) !important;
  background: var(--red-glow) !important;
  color: var(--red) !important;
}
.quiz-explain {
  margin-top: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--bg-deep);
  border: 1px solid var(--border);
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}
.quiz-score {
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
}
.quiz-score-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 48px;
  font-weight: 700;
  color: var(--accent-bright);
}

/* COMPLEXITY CHART */
.complexity-chart {
  margin-bottom: 40px;
}
.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  height: 200px;
  padding: 20px 0;
}
.chart-bar-wrapper {
  flex:1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  height: 100%;
  justify-content: flex-end;
}
.chart-bar {
  width: 100%;
  border-radius: 8px 8px 0 0;
  transition: height .6s cubic-bezier(.4,0,.2,1);
  min-height: 4px;
  position: relative;
}
.chart-bar-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
}
.chart-bar-value {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
}

/* SECTION CONTENT */
.section-content {
  padding: 20px;
  line-height: 1.8;
  font-size: 15px;
  color: var(--text-secondary);
}
.section-content strong { color: var(--text-primary); font-weight: 600; }

/* FOOTER */
.footer {
  text-align:center;
  padding: 40px 24px;
  font-size: 13px;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
  margin-top: 60px;
}

/* ─── ANIMATIONS ─── */
@keyframes fadeInUp {
  from { opacity:0; transform:translateY(16px); }
  to { opacity:1; transform:translateY(0); }
}
@keyframes scaleIn {
  from { opacity:0; transform:scale(0.95); }
  to { opacity:1; transform:scale(1); }
}
.anim-up { animation: fadeInUp .5s cubic-bezier(.4,0,.2,1) forwards; }
.anim-scale { animation: scaleIn .4s cubic-bezier(.4,0,.2,1) forwards; }

/* GRAPH NODE ANIMATIONS */
@keyframes nodeGlow {
  0%,100% { filter: drop-shadow(0 0 6px var(--accent-glow)); }
  50% { filter: drop-shadow(0 0 16px var(--accent-glow)); }
}
.node-glow { animation: nodeGlow 1.5s ease-in-out infinite; }
`;

// ═══════════════════════════════
// COMPONENTS
// ═══════════════════════════════

function formatContent(text) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((seg, j) => {
      if (seg.startsWith("**") && seg.endsWith("**"))
        return (<strong key={j}>{seg.slice(2, -2)}</strong>);
      return seg;
    });
    return (
      <span key={i}>
        {parts}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    );
  });
}

// ─── Graph Visualization SVG ───
function GraphViz({ graph, step }) {
  const { nodes, edges } = graph;

  function getEdgeColor(e) {
    if (!step) return "var(--border)";
    if (step.highlightEdge && step.highlightEdge.from === e.from && step.highlightEdge.to === e.to) {
      return step.type === "relax" ? "var(--green)" : "var(--orange)";
    }
    return "var(--border-active)";
  }

  function getNodeColor(n) {
    if (!step) return "var(--bg-surface)";
    if (step.current === n.id) return "var(--accent)";
    if (step.relaxing === n.id) return "var(--green)";
    if (step.visited[n.id]) return "var(--bg-card-hover)";
    return "var(--bg-surface)";
  }

  function getNodeStroke(n) {
    if (!step) return "var(--border)";
    if (step.current === n.id) return "var(--accent)";
    if (step.relaxing === n.id) return "var(--green)";
    if (step.visited[n.id]) return "var(--green)";
    return "var(--border)";
  }

  function getDistLabel(n) {
    if (!step) return "∞";
    const d = step.dist[n.id];
    return d === Infinity ? "∞" : d;
  }

  // Arrow marker
  const arrowId = "arrowhead-" + (step ? step.type : "default");

  return (
    <svg viewBox="0 0 700 400" className="graph-svg">
      <defs>
        <marker id={arrowId} markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-muted)" />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background grid */}
      <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="0.3" opacity="0.3" />
      </pattern>
      <rect width="700" height="400" fill="url(#gridPattern)" />

      {/* Edges */}
      {edges.map((e, i) => {
        const from = nodes.find((n) => n.id === e.from);
        const to = nodes.find((n) => n.id === e.to);
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len;
        const uy = dy / len;
        const r = 30;
        const x1 = from.x + ux * r;
        const y1 = from.y + uy * r;
        const x2 = to.x - ux * (r + 8);
        const y2 = to.y - uy * (r + 8);
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2;
        const isHighlighted =
          step && step.highlightEdge && step.highlightEdge.from === e.from && step.highlightEdge.to === e.to;

        return (
          <g key={i}>
            <line
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={getEdgeColor(e)}
              strokeWidth={isHighlighted ? 3 : 1.5}
              markerEnd={`url(#${arrowId})`}
              style={{ transition: "all .3s" }}
              filter={isHighlighted ? "url(#glow)" : undefined}
            />
            <rect
              x={mx - 14} y={my - 12}
              width="28" height="22"
              rx="6"
              fill="var(--bg-deep)"
              stroke={isHighlighted ? getEdgeColor(e) : "var(--border)"}
              style={{ transition: "all .3s" }}
            />
            <text
              x={mx} y={my + 2}
              textAnchor="middle" dominantBaseline="middle"
              fill={isHighlighted ? getEdgeColor(e) : "var(--text-secondary)"}
              fontSize="12"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
            >
              {e.weight}
            </text>
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((n) => {
        const isCurrent = step && step.current === n.id;
        return (
          <g key={n.id} style={{ transition: "all .3s" }} className={isCurrent ? "node-glow" : ""}>
            <circle
              cx={n.x} cy={n.y} r="30"
              fill={getNodeColor(n)}
              stroke={getNodeStroke(n)}
              strokeWidth={isCurrent ? 3 : 1.5}
              style={{ transition: "all .3s" }}
            />
            <text
              x={n.x} y={n.y - 2}
              textAnchor="middle" dominantBaseline="middle"
              fill={isCurrent ? "#fff" : "var(--text-primary)"}
              fontSize="16" fontWeight="700"
              fontFamily="JetBrains Mono, monospace"
            >
              {n.label}
            </text>
            {/* Dist label below node */}
            <text
              x={n.x} y={n.y + 50}
              textAnchor="middle"
              fill={step && step.visited[n.id] ? "var(--green)" : "var(--text-muted)"}
              fontSize="12"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
            >
              d={getDistLabel(n)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Main App ───
export default function AzurITAcademy() {
  const [page, setPage] = useState("home");
  const [activeSection, setActiveSection] = useState("algorithm");
  const [activeTab, setActiveTab] = useState("viz");

  // Animation state
  const [currentGraph, setCurrentGraph] = useState(DEFAULT_GRAPH);
  const [steps, setSteps] = useState(() => dijkstraTrace(DEFAULT_GRAPH));
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const intervalRef = useRef(null);

  // Custom graph input
  const [customNodes, setCustomNodes] = useState("0,1,2,3");
  const [customEdges, setCustomEdges] = useState([
    { from: 0, to: 1, weight: 5 },
    { from: 0, to: 2, weight: 10 },
    { from: 1, to: 2, weight: 3 },
  ]);
  const [edgeFrom, setEdgeFrom] = useState("");
  const [edgeTo, setEdgeTo] = useState("");
  const [edgeWeight, setEdgeWeight] = useState("");

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Code editor
  const [code, setCode] = useState(DIJKSTRA_CODE);

  // Complexity chart visibility
  const [showChart, setShowChart] = useState(false);

  // Recompute steps when graph changes
  useEffect(() => {
    const s = dijkstraTrace(currentGraph);
    setSteps(s);
    setStepIdx(0);
    setIsPlaying(false);
  }, [currentGraph]);

  // Autoplay
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, steps.length]);

  function handlePlay() {
    if (stepIdx >= steps.length - 1) setStepIdx(0);
    setIsPlaying(true);
  }

  function handleAddEdge() {
    const f = parseInt(edgeFrom);
    const t = parseInt(edgeTo);
    const w = parseInt(edgeWeight);
    if (isNaN(f) || isNaN(t) || isNaN(w) || w <= 0) return;
    setCustomEdges((prev) => [...prev, { from: f, to: t, weight: w }]);
    setEdgeFrom("");
    setEdgeTo("");
    setEdgeWeight("");
  }

  function handleRunCustom() {
    const nodeIds = customNodes
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));
    const V = nodeIds.length;
    const positions = nodeIds.map((id, i) => {
      const angle = (i / V) * Math.PI * 2 - Math.PI / 2;
      return {
        id,
        x: 350 + Math.cos(angle) * 200,
        y: 200 + Math.sin(angle) * 140,
        label: String(id),
      };
    });
    const validEdges = customEdges.filter(
      (e) => nodeIds.includes(e.from) && nodeIds.includes(e.to)
    );
    setCurrentGraph({ nodes: positions, edges: validEdges });
  }

  function handleQuizAnswer(qIdx, optIdx) {
    if (quizAnswers[qIdx] !== undefined) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  }

  function handleUsePreset(preset) {
    if (preset === "simple") {
      setCurrentGraph(DEFAULT_GRAPH);
      setCustomNodes("0,1,2");
      setCustomEdges([
        { from: 0, to: 1, weight: 5 },
        { from: 0, to: 2, weight: 10 },
        { from: 1, to: 2, weight: 3 },
      ]);
    } else {
      setCurrentGraph(COMPLEX_GRAPH);
      setCustomNodes("0,1,2,3,4,5");
      setCustomEdges(COMPLEX_GRAPH.edges);
    }
  }

  const currentStep = steps[stepIdx] || null;
  const quizScore = Object.keys(quizAnswers).filter(
    (k) => quizAnswers[k] === QUIZ_QUESTIONS[k].answer
  ).length;

  // ─── RENDER ───
  return (
    <div className="app">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="topnav">
        <div className="topnav-logo" onClick={() => setPage("home")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span>AzurIT Academy</span>
        </div>
        {page === "course" && (
          <div className="topnav-tabs">
            {[
              ["viz", "Visualisation"],
              ["code", "Code"],
              ["interactive", "Interactif"],
              ["quiz", "Quiz"],
              ["complexity", "Complexité"],
            ].map(([id, label]) => (
              <button
                key={id}
                className={`topnav-tab ${activeTab === id ? "active" : ""}`}
                onClick={() => setActiveTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ═══ HOME PAGE ═══ */}
      {page === "home" && (
        <div className="home">
          <div className="hero anim-up">
            <div className="hero-badge">1 cours disponible</div>
            <h1>
              Apprends les algos,
              <br />
              <em>visuellement.</em>
            </h1>
            <p>
              Des visualisations interactives pas-à-pas, du code annoté et des quiz pour maîtriser les algorithmes
              fondamentaux.
            </p>
          </div>

          <div className="courses-grid">
            {/* Dijkstra — active */}
            <div
              className="course-card anim-scale"
              style={{ animationDelay: ".1s" }}
              onClick={() => setPage("course")}
            >
              <div className="course-card-tag tag-graph">Graphe</div>
              <h3>Algorithme de Dijkstra</h3>
              <p>
                Trouve le chemin le plus court dans un graphe pondéré. Animation pas-à-pas, code TypeScript complet et
                quiz.
              </p>
              <div className="course-card-meta">
                <span>⏱ ~30 min</span>
                <span>📊 O((V+E) log V)</span>
                <span>🏷 7 sections</span>
              </div>
            </div>

            {/* Locked cards */}
            {[
              { tag: "tag-sort", cat: "Tri", title: "Tri rapide (Quicksort)", desc: "Diviser pour régner : l'algorithme de tri le plus utilisé en pratique." },
              { tag: "tag-sort", cat: "Tri", title: "Tri fusion (Mergesort)", desc: "Un tri stable en O(n log n) garanti, idéal pour les grandes collections." },
              { tag: "tag-search", cat: "Recherche", title: "Recherche binaire", desc: "Trouver un élément dans un tableau trié en O(log n)." },
              { tag: "tag-graph", cat: "Graphe", title: "BFS & DFS", desc: "Parcours en largeur et en profondeur : les bases du parcours de graphe." },
              { tag: "tag-struct", cat: "Structure", title: "Arbre binaire de recherche", desc: "Insertion, suppression et recherche en O(log n) dans un ABR." },
            ].map((c, i) => (
              <div
                key={i}
                className="course-card card-locked anim-scale"
                style={{ animationDelay: `${0.15 + i * 0.05}s` }}
              >
                <div className={`course-card-tag ${c.tag}`}>{c.cat}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="course-card-meta">
                  <span>⏱ ~25 min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ COURSE PAGE ═══ */}
      {page === "course" && (
        <div className="course-page">
          <div className="course-header anim-up">
            <h1>L'algorithme de Dijkstra</h1>
            <p>De zéro jusqu'à la solution — pour débutant absolu</p>
          </div>

          {/* Section tabs (course content) */}
          <div className="section-tabs">
            {COURSE_SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`section-tab ${activeSection === s.id ? "active" : ""}`}
                onClick={() => setActiveSection(s.id)}
              >
                {s.icon} {s.title}
              </button>
            ))}
          </div>

          {/* Section content */}
          <div className="panel anim-up" style={{ marginBottom: 24 }}>
            <div className="panel-header">
              {COURSE_SECTIONS.find((s) => s.id === activeSection)?.icon}{" "}
              {COURSE_SECTIONS.find((s) => s.id === activeSection)?.title}
            </div>
            <div className="section-content">
              {formatContent(COURSE_SECTIONS.find((s) => s.id === activeSection)?.content || "")}
            </div>
          </div>

          {/* ─── TAB: Visualisation ─── */}
          {activeTab === "viz" && (
            <div className="anim-up">
              <div className="panels">
                {/* Graph panel */}
                <div className="panel">
                  <div className="panel-header">
                    <span>🔵 Graphe</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className="ctrl-btn"
                        style={{ width: "auto", padding: "0 10px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
                        onClick={() => handleUsePreset("simple")}
                      >
                        3 nœuds
                      </button>
                      <button
                        className="ctrl-btn"
                        style={{ width: "auto", padding: "0 10px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
                        onClick={() => handleUsePreset("complex")}
                      >
                        6 nœuds
                      </button>
                    </div>
                  </div>
                  <div className="panel-body" style={{ padding: 0 }}>
                    <GraphViz graph={currentGraph} step={currentStep} />
                  </div>
                </div>

                {/* Steps log panel */}
                <div className="panel">
                  <div className="panel-header">📋 Journal d'exécution</div>
                  <div className="panel-body">
                    <div className="step-log">
                      {steps.map((s, i) => {
                        const badgeClass =
                          s.type === "init" ? "badge-init" :
                          s.type === "visit" ? "badge-visit" :
                          s.type === "relax" ? "badge-relax" :
                          s.type === "skip" ? "badge-skip" :
                          s.type === "done" ? "badge-done" : "badge-init";
                        return (
                          <div
                            key={i}
                            className={`step-log-item ${i === stepIdx ? "active" : ""}`}
                            onClick={() => { setStepIdx(i); setIsPlaying(false); }}
                            style={{ cursor: "pointer" }}
                          >
                            <span className={`step-badge ${badgeClass}`}>{s.type}</span>
                            {s.desc}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div style={{ marginBottom: 24 }}>
                <div className="controls">
                  <button className="ctrl-btn" onClick={() => { setStepIdx(0); setIsPlaying(false); }} title="Début">
                    ⏮
                  </button>
                  <button className="ctrl-btn" onClick={() => { setStepIdx(Math.max(0, stepIdx - 1)); setIsPlaying(false); }} disabled={stepIdx === 0} title="Précédent">
                    ◀
                  </button>
                  {isPlaying ? (
                    <button className="ctrl-btn active" onClick={() => setIsPlaying(false)} title="Pause">
                      ⏸
                    </button>
                  ) : (
                    <button className="ctrl-btn" onClick={handlePlay} title="Lecture">
                      ▶
                    </button>
                  )}
                  <button className="ctrl-btn" onClick={() => { setStepIdx(Math.min(steps.length - 1, stepIdx + 1)); setIsPlaying(false); }} disabled={stepIdx >= steps.length - 1} title="Suivant">
                    ▶
                  </button>
                  <button className="ctrl-btn" onClick={() => { setStepIdx(steps.length - 1); setIsPlaying(false); }} title="Fin">
                    ⏭
                  </button>
                  <select className="speed-select" value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
                    <option value={2000}>0.5×</option>
                    <option value={1000}>1×</option>
                    <option value={500}>2×</option>
                    <option value={250}>4×</option>
                  </select>
                  <div className="step-info">
                    Étape {stepIdx + 1} / {steps.length}
                  </div>
                </div>
              </div>

              {/* Distance table */}
              <div className="panel" style={{ marginBottom: 24 }}>
                <div className="panel-header">📊 Tableau des distances</div>
                <div className="panel-body">
                  {currentStep && (
                    <table className="dist-table">
                      <thead>
                        <tr>
                          <th>Sommet</th>
                          {currentGraph.nodes.map((n) => (
                            <th key={n.id}>{n.label}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ color: "var(--text-muted)" }}>dist</td>
                          {currentGraph.nodes.map((n) => (
                            <td
                              key={n.id}
                              className={`dist-cell ${
                                currentStep.relaxing === n.id ? "updated" :
                                currentStep.visited[n.id] ? "visited-cell" : ""
                              }`}
                            >
                              {currentStep.dist[n.id] === Infinity ? "∞" : currentStep.dist[n.id]}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td style={{ color: "var(--text-muted)" }}>visité</td>
                          {currentGraph.nodes.map((n) => (
                            <td key={n.id} style={{ color: currentStep.visited[n.id] ? "var(--green)" : "var(--text-muted)" }}>
                              {currentStep.visited[n.id] ? "✓" : "—"}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB: Code ─── */}
          {activeTab === "code" && (
            <div className="anim-up">
              <div className="code-panel">
                <div className="panel-header">
                  <span>⌨️ Implémentation TypeScript — MinHeap + Dijkstra</span>
                  <button
                    className="ctrl-btn"
                    style={{ width: "auto", padding: "0 12px", fontSize: 12 }}
                    onClick={() => setCode(DIJKSTRA_CODE)}
                  >
                    Reset
                  </button>
                </div>
                <div className="code-body">
                  <textarea
                    className="code-area"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck={false}
                    style={{ paddingLeft: 56 }}
                  />
                  <div className="code-line-nums">
                    {code.split("\n").map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="panel" style={{ marginBottom: 24 }}>
                <div className="panel-header">💡 Structure du code</div>
                <div className="section-content">
                  {formatContent(
                    `**MinHeap** — File de priorité (min-heap) implémentée avec un tableau. Le plus petit élément est toujours à l'index 0. Les opérations push/pop fonctionnent en O(log n) grâce aux méthodes heapifyUp et heapifyDown.\n\n**dijkstra()** — Prend le nombre de sommets V et un graphe (Map d'adjacence). Initialise dist[] à ∞ (sauf source = 0), puis boucle : pop le min du heap, visite ses voisins, relaxe les arêtes si on trouve un raccourci.\n\n**Résultat** — Le tableau dist[] contient la distance minimale depuis le sommet 0 vers chaque autre sommet. Les sommets inaccessibles restent à Infinity.`
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB: Interactif ─── */}
          {activeTab === "interactive" && (
            <div className="anim-up">
              <div className="input-section">
                <h3>🎮 Construis ton graphe</h3>
                <div className="input-row">
                  <div className="input-group">
                    <label>Sommets (IDs séparés par virgule)</label>
                    <input
                      className="input-field wide"
                      value={customNodes}
                      onChange={(e) => setCustomNodes(e.target.value)}
                      placeholder="0,1,2,3"
                    />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>De</label>
                    <input
                      className="input-field"
                      value={edgeFrom}
                      onChange={(e) => setEdgeFrom(e.target.value)}
                      placeholder="0"
                      style={{ width: 60 }}
                    />
                  </div>
                  <div className="input-group">
                    <label>Vers</label>
                    <input
                      className="input-field"
                      value={edgeTo}
                      onChange={(e) => setEdgeTo(e.target.value)}
                      placeholder="1"
                      style={{ width: 60 }}
                    />
                  </div>
                  <div className="input-group">
                    <label>Poids</label>
                    <input
                      className="input-field"
                      value={edgeWeight}
                      onChange={(e) => setEdgeWeight(e.target.value)}
                      placeholder="5"
                      style={{ width: 60 }}
                    />
                  </div>
                  <button className="add-btn" onClick={handleAddEdge}>
                    + Ajouter arête
                  </button>
                </div>

                <div className="edge-list" style={{ marginBottom: 16 }}>
                  {customEdges.map((e, i) => (
                    <div className="edge-chip" key={i}>
                      {e.from} → {e.to} ({e.weight})
                      <button onClick={() => setCustomEdges((prev) => prev.filter((_, j) => j !== i))}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button className="add-btn" onClick={handleRunCustom}>
                    ▶ Lancer Dijkstra
                  </button>
                  <button
                    className="add-btn"
                    style={{ background: "transparent", borderColor: "var(--border)", color: "var(--text-secondary)" }}
                    onClick={() => {
                      setCustomEdges([]);
                    }}
                  >
                    Vider les arêtes
                  </button>
                </div>
              </div>

              {/* Show graph + steps after running */}
              <div className="panels">
                <div className="panel">
                  <div className="panel-header">🔵 Graphe personnalisé</div>
                  <div className="panel-body" style={{ padding: 0 }}>
                    <GraphViz graph={currentGraph} step={currentStep} />
                  </div>
                </div>
                <div className="panel">
                  <div className="panel-header">📊 Résultat</div>
                  <div className="panel-body">
                    {currentStep && (
                      <table className="dist-table">
                        <thead>
                          <tr>
                            <th>Sommet</th>
                            {currentGraph.nodes.map((n) => (
                              <th key={n.id}>{n.label}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ color: "var(--text-muted)" }}>dist finale</td>
                            {currentGraph.nodes.map((n) => (
                              <td key={n.id} style={{ color: "var(--green)", fontWeight: 700 }}>
                                {steps[steps.length - 1]?.dist[n.id] === Infinity
                                  ? "∞"
                                  : steps[steps.length - 1]?.dist[n.id]}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    )}
                    <div style={{ marginTop: 16, fontSize: 13, color: "var(--text-muted)" }}>
                      Utilise l'onglet <strong style={{ color: "var(--text-secondary)" }}>Visualisation</strong> pour rejouer l'animation pas-à-pas sur ce graphe.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB: Quiz ─── */}
          {activeTab === "quiz" && (
            <div className="anim-up">
              <div className="quiz-section">
                <h3>🧠 Quiz — Valide tes connaissances</h3>
                {QUIZ_QUESTIONS.map((q, qi) => (
                  <div className="quiz-q" key={qi}>
                    <div className="quiz-q-num">Question {qi + 1}/{QUIZ_QUESTIONS.length}</div>
                    <div className="quiz-q-text">{q.q}</div>
                    <div className="quiz-opts">
                      {q.opts.map((opt, oi) => {
                        let cls = "quiz-opt";
                        if (quizAnswers[qi] !== undefined) {
                          if (oi === q.answer) cls += " opt-correct";
                          else if (oi === quizAnswers[qi]) cls += " opt-wrong";
                        }
                        return (
                          <button key={oi} className={cls} onClick={() => handleQuizAnswer(qi, oi)}>
                            {String.fromCharCode(65 + oi)}.{" "}{opt}
                          </button>
                        );
                      })}
                    </div>
                    {quizAnswers[qi] !== undefined && (
                      <div className="quiz-explain">
                        {quizAnswers[qi] === q.answer ? "✅ " : "❌ "}
                        {q.explain}
                      </div>
                    )}
                  </div>
                ))}

                {Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length && (
                  <div className="quiz-score">
                    <div style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 4 }}>Score</div>
                    <div className="quiz-score-num">
                      {quizScore}/{QUIZ_QUESTIONS.length}
                    </div>
                    <div style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 8 }}>
                      {quizScore === QUIZ_QUESTIONS.length
                        ? "🎉 Parfait ! Tu maîtrises Dijkstra !"
                        : quizScore >= 3
                        ? "👏 Bien joué ! Revois les sections pour les erreurs."
                        : "💪 Continue à apprendre, relis le cours et réessaie !"}
                    </div>
                    <button
                      className="add-btn"
                      style={{ marginTop: 12 }}
                      onClick={() => { setQuizAnswers({}); }}
                    >
                      Recommencer le quiz
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── TAB: Complexité ─── */}
          {activeTab === "complexity" && (
            <div className="anim-up">
              <div className="panel" style={{ marginBottom: 24 }}>
                <div className="panel-header">📈 Complexité de Dijkstra</div>
                <div className="section-content">
                  {formatContent(
                    `**Complexité temporelle : O((V + E) × log V)**\nAvec un min-heap, chaque opération push/pop coûte O(log V). On fait au plus V extractions et E relaxations → O((V+E) log V).\n\n**Complexité spatiale : O(V + E)**\nLe tableau dist (V), le tableau visited (V), la file de priorité (au plus V éléments), et la liste d'adjacence (E arêtes).\n\n**Sans file de priorité : O(V²)**\nSi on parcourt tout le tableau dist pour trouver le min à chaque étape, on fait V recherches de taille V → O(V²). Acceptable pour les petits graphes, mais trop lent pour les grands.`
                  )}
                </div>
              </div>

              <div className="panel complexity-chart">
                <div className="panel-header">📊 Comparaison des complexités (pour V = 1000, E = 5000)</div>
                <div className="panel-body">
                  <div className="chart-bars">
                    {[
                      { label: "Dijkstra\n(heap)", value: 20, bigO: "O((V+E) log V)", color: "var(--accent)" },
                      { label: "Dijkstra\n(naïf)", value: 50, bigO: "O(V²)", color: "var(--orange)" },
                      { label: "Bellman-\nFord", value: 70, bigO: "O(V × E)", color: "var(--red)" },
                      { label: "Floyd-\nWarshall", value: 100, bigO: "O(V³)", color: "var(--purple)" },
                    ].map((item, i) => (
                      <div className="chart-bar-wrapper" key={i}>
                        <div className="chart-bar-value">{item.bigO}</div>
                        <div
                          className="chart-bar"
                          style={{
                            height: `${item.value}%`,
                            background: `linear-gradient(180deg, ${item.color}90, ${item.color}30)`,
                            border: `1px solid ${item.color}`,
                          }}
                        />
                        <div className="chart-bar-label">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-header">🔍 Quand utiliser quoi ?</div>
                <div className="section-content">
                  {formatContent(
                    `**Dijkstra (heap)** — Le choix par défaut pour les graphes pondérés sans poids négatifs. GPS, routage réseau, jeux vidéo.\n\n**Dijkstra (naïf)** — Acceptable si V est petit (< 1000) et que tu ne veux pas coder un heap.\n\n**Bellman-Ford** — Quand le graphe a des poids négatifs (Dijkstra ne fonctionne pas dans ce cas). Détecte aussi les cycles négatifs.\n\n**Floyd-Warshall** — Quand tu veux toutes les distances entre toutes les paires de sommets (all-pairs shortest path). Complexité élevée mais simple à coder.`
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="footer">
            AzurIT Academy — Contenu parsé depuis cours-dijkstra.md • Construit avec React & amour pour les algorithmes
          </div>
        </div>
      )}
    </div>
  );
}
