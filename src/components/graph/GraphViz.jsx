export default function GraphViz({ graph, step }) {
  const { nodes, edges } = graph;

  function getEdgeColor(e) {
    if (!step) return "var(--border)";
    if (
      step.highlightEdge &&
      step.highlightEdge.from === e.from &&
      step.highlightEdge.to === e.to
    ) {
      return step.type === "relax" ? "var(--green)" : "var(--orange)";
    }
    return "var(--border-active)";
  }

  function getNodeColor(n) {
    if (!step) return "var(--bg-surface)";
    if (step.current === n.id)   return "var(--accent)";
    if (step.relaxing === n.id)  return "var(--green)";
    if (step.visited[n.id])      return "var(--bg-card-hover)";
    return "var(--bg-surface)";
  }

  function getNodeStroke(n) {
    if (!step) return "var(--border)";
    if (step.current === n.id)   return "var(--accent)";
    if (step.relaxing === n.id)  return "var(--green)";
    if (step.visited[n.id])      return "var(--green)";
    return "var(--border)";
  }

  function getDistLabel(n) {
    if (!step) return "∞";
    const d = step.dist[n.id];
    return d === Infinity ? "∞" : d;
  }

  const arrowId = "arrowhead-" + (step ? step.type : "default");

  return (
    <svg viewBox="0 0 700 400" className="w-full h-[340px]">
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

      <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="0.3" opacity="0.3" />
      </pattern>
      <rect width="700" height="400" fill="url(#gridPattern)" />

      {edges.map((e, i) => {
        const from = nodes.find((n) => n.id === e.from);
        const to   = nodes.find((n) => n.id === e.to);
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
          step &&
          step.highlightEdge &&
          step.highlightEdge.from === e.from &&
          step.highlightEdge.to === e.to;
        const color = getEdgeColor(e);

        return (
          <g key={i}>
            <line
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={color}
              strokeWidth={isHighlighted ? 3 : 1.5}
              markerEnd={`url(#${arrowId})`}
              style={{ transition: "all .3s" }}
              filter={isHighlighted ? "url(#glow)" : undefined}
            />
            <rect
              x={mx - 14} y={my - 12}
              width="28" height="22" rx="6"
              fill="var(--bg-deep)"
              stroke={isHighlighted ? color : "var(--border)"}
              style={{ transition: "all .3s" }}
            />
            <text
              x={mx} y={my + 2}
              textAnchor="middle" dominantBaseline="middle"
              fill={isHighlighted ? color : "var(--text-secondary)"}
              fontSize="12"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
            >
              {e.weight}
            </text>
          </g>
        );
      })}

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
