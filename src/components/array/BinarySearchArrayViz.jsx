/**
 * Visualisation SVG du tableau pour la Recherche Binaire.
 *
 * Légende des couleurs :
 *  - Vert    (--green)   : élément trouvé (sortedIndices)
 *  - Bleu    (--accent)  : indice milieu (pivotIdx = mid)
 *  - Normal  (--bg-surface) : dans la plage active [lo..hi]
 *  - Atténué (--bg-deep) : hors de la plage active
 *
 * Labels sous les barres : "lo", "hi", "mid"
 */
export default function BinarySearchArrayViz({ array, step }) {
  const n = array.length;
  if (n === 0) return null;

  const W      = 700;
  const H      = 300;
  const padL   = 20;
  const padR   = 20;
  const padTop = 30;
  const padBot = 52;

  const usableW = W - padL - padR;
  const usableH = H - padTop - padBot;
  const maxBarH = usableH - 10;

  const groupW = usableW / n;
  const barW   = Math.max(groupW * 0.68, 8);
  const maxVal = Math.max(...array, 1);

  function barHeight(v) { return Math.max((v / maxVal) * maxBarH, 6); }
  function barX(idx)    { return padL + idx * groupW + (groupW - barW) / 2; }
  function barY(v)      { return padTop + (maxBarH - barHeight(v)); }

  function getBarColor(idx) {
    if (!step) return "var(--bg-surface)";
    const { sortedIndices = [], pivotIdx, left, right, type } = step;

    if (sortedIndices.includes(idx)) return "var(--green)";
    if (idx === pivotIdx)            return "var(--accent)";

    // Pour not_found : tous les éléments sont légèrement estompés
    if (type === "not_found")        return "var(--bg-deep)";

    if (idx < left || idx > right)   return "var(--bg-deep)";
    return "var(--bg-surface)";
  }

  function getBarStroke(idx) {
    if (!step) return "var(--border)";
    const { sortedIndices = [], pivotIdx } = step;
    if (sortedIndices.includes(idx)) return "var(--green)";
    if (idx === pivotIdx)            return "var(--accent)";
    return "var(--border)";
  }

  function getBarOpacity(idx) {
    if (!step) return 1;
    const { left, right, sortedIndices = [], type } = step;
    if (sortedIndices.includes(idx)) return 1;
    if (type === "not_found") return 0.3;
    if (idx < left || idx > right)   return 0.2;
    return 1;
  }

  function getLabelColor(idx) {
    if (!step) return "var(--text-secondary)";
    const { sortedIndices = [], pivotIdx } = step;
    if (sortedIndices.includes(idx)) return "var(--green)";
    if (idx === pivotIdx)            return "var(--accent-bright)";
    return "var(--text-secondary)";
  }

  // Étiquettes pointeurs sous les barres
  function getPointerLabel(idx) {
    if (!step) return "";
    const { pivotIdx, left, right, type } = step;
    const labels = [];

    if (idx === pivotIdx && type !== "done" && type !== "not_found" && type !== "init") {
      labels.push("mid");
    }
    if (idx === left  && type !== "done" && type !== "not_found" && type !== "init") labels.push("lo");
    if (idx === right && type !== "done" && type !== "not_found" && type !== "init") {
      // évite doublon si lo === hi
      if (idx !== left) labels.push("hi");
      else labels.push("lo=hi");
    }
    return labels.join("/");
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[300px]">
      <defs>
        <filter id="bsBarGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Fond grille légère */}
      <pattern id="gridBs" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="0.3" opacity="0.3" />
      </pattern>
      <rect width={W} height={H} fill="url(#gridBs)" />

      {/* Ligne de base */}
      <line
        x1={padL} y1={padTop + maxBarH}
        x2={W - padR} y2={padTop + maxBarH}
        stroke="var(--border-active)" strokeWidth="1"
      />

      {/* Barres */}
      {array.map((v, idx) => {
        const bx      = barX(idx);
        const bh      = barHeight(v);
        const by      = barY(v);
        const color   = getBarColor(idx);
        const stroke  = getBarStroke(idx);
        const opacity = getBarOpacity(idx);
        const isSpecial = step && (
          idx === step.pivotIdx ||
          (step.sortedIndices || []).includes(idx)
        );
        const ptr = getPointerLabel(idx);

        return (
          <g key={idx} style={{ transition: "all .25s ease" }} opacity={opacity}>
            {/* Barre */}
            <rect
              x={bx} y={by}
              width={barW} height={bh}
              rx="4"
              fill={color}
              stroke={stroke}
              strokeWidth={isSpecial ? 2 : 1}
              filter={isSpecial ? "url(#bsBarGlow)" : undefined}
              style={{ transition: "all .25s ease" }}
            />

            {/* Valeur au-dessus */}
            <text
              x={bx + barW / 2}
              y={by - 6}
              textAnchor="middle"
              fontSize={n > 8 ? "10" : "12"}
              fontFamily="JetBrains Mono, monospace"
              fontWeight="700"
              fill={getLabelColor(idx)}
              style={{ transition: "fill .25s" }}
            >
              {v}
            </text>

            {/* Index en bas */}
            <text
              x={bx + barW / 2}
              y={padTop + maxBarH + 16}
              textAnchor="middle"
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
              fill="var(--text-muted)"
            >
              {idx}
            </text>

            {/* Étiquette pointeur */}
            {ptr && (
              <text
                x={bx + barW / 2}
                y={padTop + maxBarH + 32}
                textAnchor="middle"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
                fill={
                  (step?.sortedIndices || []).includes(idx) ? "var(--green)" :
                  idx === step?.pivotIdx                    ? "var(--accent)" :
                  "var(--cyan)"
                }
              >
                {ptr}
              </text>
            )}
          </g>
        );
      })}

      {/* Délimiteurs lo / hi de la plage courante */}
      {step && step.type === "compare" && (
        <>
          <line
            x1={padL + step.left * groupW}
            y1={padTop - 10}
            x2={padL + step.left * groupW}
            y2={padTop + maxBarH}
            stroke="var(--border-active)"
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity="0.6"
          />
          <line
            x1={padL + (step.right + 1) * groupW}
            y1={padTop - 10}
            x2={padL + (step.right + 1) * groupW}
            y2={padTop + maxBarH}
            stroke="var(--border-active)"
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity="0.6"
          />
        </>
      )}
    </svg>
  );
}
