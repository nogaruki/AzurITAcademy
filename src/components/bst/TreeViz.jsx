/**
 * Visualisation SVG d'un Arbre Binaire de Recherche.
 *
 * Légende des couleurs :
 *  - Bleu   (--accent)  : nœud courant (en cours d'examen)
 *  - Vert   (--green)   : nœud trouvé / inséré avec succès
 *  - Cyan   (--cyan)    : nouveau nœud inséré
 *  - Violet (--purple)  : successeur infixe (pour la suppression)
 *  - Orange (--orange)  : nœud à supprimer (foundNode lors d'un delete)
 *  - Grisé  (bg-card-hover) : nœuds du chemin déjà visités
 *  - Normal (bg-surface)   : autres nœuds
 */

const R = 22; // rayon des nœuds
const LEVEL_H = 68;
const PAD_TOP = 44;
const PAD_X = 18;
const SVG_W = 700;

/** Calcule les positions (x, y) de tous les nœuds via le rang infixe. */
function computePositions(root) {
  if (!root) return { positions: {}, maxDepth: 0, nodeCount: 0 };

  let rank = 0;
  const rankMap = {};
  const depthMap = {};

  function inorder(node, depth) {
    if (!node) return;
    inorder(node.left, depth + 1);
    rankMap[node.val] = rank++;
    depthMap[node.val] = depth;
    inorder(node.right, depth + 1);
  }
  inorder(root, 0);

  const n = rank;
  const usableW = SVG_W - PAD_X * 2;
  const spacing = usableW / (n + 1);

  const positions = {};
  for (const [val, r] of Object.entries(rankMap)) {
    positions[val] = {
      x: PAD_X + (r + 1) * spacing,
      y: PAD_TOP + depthMap[val] * LEVEL_H,
    };
  }

  const maxDepth = Math.max(...Object.values(depthMap), 0);
  return { positions, maxDepth, nodeCount: n };
}

/** Collecte toutes les arêtes {from, to} de l'arbre. */
function collectEdges(node, edges = []) {
  if (!node) return edges;
  if (node.left)  { edges.push({ from: node.val, to: node.left.val  }); collectEdges(node.left,  edges); }
  if (node.right) { edges.push({ from: node.val, to: node.right.val }); collectEdges(node.right, edges); }
  return edges;
}

/** Collecte toutes les valeurs de l'arbre. */
function collectVals(node, vals = []) {
  if (!node) return vals;
  vals.push(node.val);
  collectVals(node.left, vals);
  collectVals(node.right, vals);
  return vals;
}

export default function TreeViz({ tree, step }) {
  if (!tree) {
    return (
      <div className="flex items-center justify-center h-[300px] text-mut text-[14px] font-mono">
        Arbre vide — insérez une valeur
      </div>
    );
  }

  const { positions, maxDepth } = computePositions(tree);
  const edges = collectEdges(tree);
  const vals  = collectVals(tree);
  const svgH  = Math.max(PAD_TOP + maxDepth * LEVEL_H + R * 2 + 30, 240);

  const { currentNode, path = [], foundNode, successorNode, newNode } = step || {};

  function getNodeFill(val) {
    if (val === newNode && step?.type === "insert")    return "var(--cyan)";
    if (val === successorNode)                         return "var(--purple)";
    if (val === foundNode && step?.operation === "delete") return "var(--orange)";
    if (val === foundNode)                             return "var(--green)";
    if (val === currentNode)                           return "var(--accent)";
    if (path.includes(val))                            return "var(--bg-card-hover)";
    return "var(--bg-surface)";
  }

  function getNodeStroke(val) {
    if (val === newNode && step?.type === "insert")    return "var(--cyan)";
    if (val === successorNode)                         return "var(--purple)";
    if (val === foundNode && step?.operation === "delete") return "var(--orange)";
    if (val === foundNode)                             return "var(--green)";
    if (val === currentNode)                           return "var(--accent)";
    if (path.includes(val))                            return "var(--border-active)";
    return "var(--border)";
  }

  function getTextFill(val) {
    const special = [newNode, successorNode, foundNode, currentNode];
    if (special.includes(val)) return "#fff";
    return "var(--text-primary)";
  }

  function getEdgeStroke(from, to) {
    if (path.includes(from) && path.includes(to)) return "var(--border-active)";
    return "var(--border)";
  }

  return (
    <svg viewBox={`0 0 ${SVG_W} ${svgH}`} className="w-full" style={{ height: svgH }}>
      <defs>
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <pattern id="gridBst" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="0.3" opacity="0.25" />
        </pattern>
      </defs>

      <rect width={SVG_W} height={svgH} fill="url(#gridBst)" />

      {/* Arêtes */}
      {edges.map(({ from, to }) => {
        const fp = positions[from];
        const tp = positions[to];
        if (!fp || !tp) return null;

        // Vecteur normalisé pour raccourcir la ligne jusqu'au bord du nœud
        const dx = tp.x - fp.x;
        const dy = tp.y - fp.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len;
        const uy = dy / len;

        return (
          <line
            key={`${from}-${to}`}
            x1={fp.x + ux * R} y1={fp.y + uy * R}
            x2={tp.x - ux * R} y2={tp.y - uy * R}
            stroke={getEdgeStroke(from, to)}
            strokeWidth="1.5"
            style={{ transition: "stroke .3s" }}
          />
        );
      })}

      {/* Nœuds */}
      {vals.map((val) => {
        const pos = positions[val];
        if (!pos) return null;
        const isSpecial = [currentNode, foundNode, successorNode, newNode].includes(val);

        return (
          <g key={val} style={{ transition: "all .3s" }}>
            <circle
              cx={pos.x} cy={pos.y} r={R}
              fill={getNodeFill(val)}
              stroke={getNodeStroke(val)}
              strokeWidth={isSpecial ? 2.5 : 1.5}
              filter={isSpecial ? "url(#nodeGlow)" : undefined}
              style={{ transition: "all .3s" }}
            />
            <text
              x={pos.x} y={pos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={val >= 100 ? "11" : "13"}
              fontWeight="700"
              fontFamily="JetBrains Mono, monospace"
              fill={getTextFill(val)}
              style={{ transition: "fill .3s", userSelect: "none" }}
            >
              {val}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
