/**
 * Visualisation SVG du tableau pour Quicksort.
 * Chaque élément est représenté par une barre colorée.
 *
 * Légende des couleurs :
 *  - Vert  (--green)  : élément à sa position finale triée
 *  - Bleu  (--accent) : pivot courant
 *  - Orange(--orange) : élément comparé (j)
 *  - Cyan  (--cyan)   : frontière i (boundary)
 *  - Normal           : dans le sous-tableau courant
 *  - Atténué          : hors du sous-tableau courant
 */
export default function ArrayViz({ array, step }) {
  const n = array.length;
  if (n === 0) return null;

  const W = 700;
  const H = 320;
  const padL = 20;
  const padR = 20;
  const padTop = 30;
  const padBot = 50; // espace pour valeurs + indices

  const usableW = W - padL - padR;
  const usableH = H - padTop - padBot;
  const maxBarH = usableH - 10;

  const groupW = usableW / n;
  const barW   = Math.max(groupW * 0.68, 8);
  const maxVal = Math.max(...array, 1);

  function barHeight(v) {
    return Math.max((v / maxVal) * maxBarH, 6);
  }

  function barX(idx) {
    return padL + idx * groupW + (groupW - barW) / 2;
  }

  function barY(v) {
    return padTop + (maxBarH - barHeight(v));
  }

  function getBarColor(idx) {
    if (!step) return "var(--bg-surface)";

    const { sortedIndices = [], pivotIdx, j, i, left, right } = step;

    if (sortedIndices.includes(idx))      return "var(--green)";
    if (idx === pivotIdx)                 return "var(--accent)";
    if (idx === j)                        return "var(--orange)";
    if (idx === i + 1 && i !== null && step.type === "compare") return "var(--cyan)";

    // Hors du sous-tableau courant
    if (idx < left || idx > right)       return "var(--bg-deep)";

    return "var(--bg-surface)";
  }

  function getBarStroke(idx) {
    if (!step) return "var(--border)";

    const { sortedIndices = [], pivotIdx, j, i } = step;

    if (sortedIndices.includes(idx)) return "var(--green)";
    if (idx === pivotIdx)            return "var(--accent)";
    if (idx === j)                   return "var(--orange)";
    if (idx === i + 1 && i !== null && step.type === "compare") return "var(--cyan)";

    return "var(--border)";
  }

  function getBarOpacity(idx) {
    if (!step) return 1;
    const { left, right, sortedIndices = [] } = step;
    if (sortedIndices.includes(idx)) return 1;
    if (idx < left || idx > right) return 0.25;
    return 1;
  }

  function getLabelColor(idx) {
    if (!step) return "var(--text-secondary)";
    const { sortedIndices = [], pivotIdx, j } = step;
    if (sortedIndices.includes(idx)) return "var(--green)";
    if (idx === pivotIdx)            return "var(--accent-bright)";
    if (idx === j)                   return "var(--orange)";
    return "var(--text-secondary)";
  }

  // Indicateurs de pointeurs (étiquettes sous les barres)
  function getPointerLabel(idx) {
    if (!step) return "";
    const { pivotIdx, j, i, left, right } = step;
    const labels = [];
    if (idx === pivotIdx && step.type !== "partition" && step.type !== "done" && step.type !== "sorted") labels.push("pivot");
    if (idx === j)      labels.push("j");
    if (idx === i && i !== null) labels.push("i");
    if (idx === left && step.type !== "done")  labels.push("low");
    if (idx === right && step.type !== "done") labels.push("high");
    return labels.join("/");
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[320px]">
      <defs>
        <filter id="barGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Fond grille légère */}
      <pattern id="gridQs" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="0.3" opacity="0.3" />
      </pattern>
      <rect width={W} height={H} fill="url(#gridQs)" />

      {/* Ligne de base */}
      <line
        x1={padL} y1={padTop + maxBarH}
        x2={W - padR} y2={padTop + maxBarH}
        stroke="var(--border-active)" strokeWidth="1"
      />

      {/* Barres */}
      {array.map((v, idx) => {
        const bx = barX(idx);
        const bh = barHeight(v);
        const by = barY(v);
        const color  = getBarColor(idx);
        const stroke = getBarStroke(idx);
        const opacity = getBarOpacity(idx);
        const isSpecial = step && (
          idx === step.pivotIdx ||
          idx === step.j ||
          (step.sortedIndices || []).includes(idx)
        );

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
              filter={isSpecial ? "url(#barGlow)" : undefined}
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
            {getPointerLabel(idx) && (
              <text
                x={bx + barW / 2}
                y={padTop + maxBarH + 32}
                textAnchor="middle"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
                fill={
                  idx === step?.pivotIdx ? "var(--accent)" :
                  idx === step?.j        ? "var(--orange)" :
                  "var(--cyan)"
                }
              >
                {getPointerLabel(idx)}
              </text>
            )}
          </g>
        );
      })}

      {/* Délimiteurs left / right du sous-tableau courant */}
      {step && step.type !== "done" && step.type !== "init" && (
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
