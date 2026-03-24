/**
 * Visualisation de graphe pour BFS & DFS.
 * - Arêtes non orientées (pas de flèches)
 * - Nœuds colorés selon l'état : visité (vert), courant (accent), en file/pile (bleu), non visité (défaut)
 * - Numéro d'ordre de visite affiché sur les nœuds visités
 */
export default function GraphVizBfsDfs({ graph, step }) {
  const { nodes, edges } = graph;

  const visitedSet  = new Set(step?.visited  ?? []);
  const frontierSet = new Set(step?.frontier ?? []);

  function getEdgeColor(e) {
    if (!step?.highlightEdge) return "var(--border)";
    const hl = step.highlightEdge;
    if ((hl.from === e.from && hl.to === e.to) || (hl.from === e.to && hl.to === e.from)) {
      return step.type === "enqueue" || step.type === "visit" ? "var(--green)" : "var(--accent)";
    }
    return "var(--border-active)";
  }

  function isEdgeHighlighted(e) {
    if (!step?.highlightEdge) return false;
    const hl = step.highlightEdge;
    return (hl.from === e.from && hl.to === e.to) || (hl.from === e.to && hl.to === e.from);
  }

  function getNodeFill(n) {
    if (!step) return "var(--bg-surface)";
    if (step.current === n.id)   return "var(--accent)";
    if (frontierSet.has(n.id))   return "var(--bg-card-hover)";
    if (visitedSet.has(n.id))    return "var(--bg-card-hover)";
    return "var(--bg-surface)";
  }

  function getNodeStroke(n) {
    if (!step) return "var(--border)";
    if (step.current === n.id) return "var(--accent)";
    if (frontierSet.has(n.id)) return "var(--accent)";
    if (visitedSet.has(n.id))  return "var(--green)";
    return "var(--border)";
  }

  function getVisitIndex(n) {
    if (!step) return null;
    const idx = step.visited.indexOf(n.id);
    return idx >= 0 ? idx + 1 : null;
  }

  return (
    <svg viewBox="0 0 700 400" className="w-full h-[340px]">
      <pattern id="gridBfsDfs" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="0.3" opacity="0.3" />
      </pattern>
      <rect width="700" height="400" fill="url(#gridBfsDfs)" />

      {/* Arêtes */}
      {edges.map((e, i) => {
        const from = nodes.find((n) => n.id === e.from);
        const to   = nodes.find((n) => n.id === e.to);
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2;
        const highlighted = isEdgeHighlighted(e);
        const color = getEdgeColor(e);

        return (
          <g key={i}>
            <line
              x1={from.x} y1={from.y}
              x2={to.x}   y2={to.y}
              stroke={color}
              strokeWidth={highlighted ? 3 : 1.5}
              style={{ transition: "all .3s" }}
              filter={highlighted ? "url(#glowBfsDfs)" : undefined}
            />
          </g>
        );
      })}

      <defs>
        <filter id="glowBfsDfs">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Nœuds */}
      {nodes.map((n) => {
        const isCurrent  = step && step.current === n.id;
        const isInFront  = frontierSet.has(n.id) && !isCurrent;
        const isVisited  = visitedSet.has(n.id)  && !isCurrent && !isInFront;
        const visitNum   = getVisitIndex(n);

        return (
          <g key={n.id} style={{ transition: "all .3s" }}>
            <circle
              cx={n.x} cy={n.y} r="28"
              fill={getNodeFill(n)}
              stroke={getNodeStroke(n)}
              strokeWidth={isCurrent || isInFront ? 3 : isVisited ? 2 : 1.5}
              style={{ transition: "all .3s" }}
              filter={isCurrent ? "url(#glowBfsDfs)" : undefined}
            />
            {/* Label du nœud */}
            <text
              x={n.x} y={n.y}
              textAnchor="middle" dominantBaseline="middle"
              fill={isCurrent ? "#fff" : "var(--text-primary)"}
              fontSize="15" fontWeight="700"
              fontFamily="JetBrains Mono, monospace"
            >
              {n.label}
            </text>
            {/* Numéro de visite */}
            {visitNum !== null && (
              <text
                x={n.x + 22} y={n.y - 22}
                textAnchor="middle" dominantBaseline="middle"
                fill="var(--green)"
                fontSize="11" fontWeight="700"
                fontFamily="JetBrains Mono, monospace"
              >
                #{visitNum}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
