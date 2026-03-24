import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const R      = 22;
const ROW_H  = 78;
const SVG_W  = 480;

function nodePos(i) {
  const depth      = Math.floor(Math.log2(i + 1));
  const levelStart = (1 << depth) - 1;
  const posInLevel = i - levelStart;
  const levelCount = 1 << depth;
  const x = ((posInLevel + 0.5) / levelCount) * SVG_W;
  const y = depth * ROW_H + R + 16;
  return { x, y };
}

function nodeColors(item, index, step) {
  const isRoot     = index === 0;
  const isCurrent  = step && item.node === step.current && step.type !== "init";
  const isRelaxing = step && item.node === step.relaxing;

  if (isCurrent)  return { fill: "var(--accent)",      stroke: "var(--accent)",  text: "#fff",                  dist: "rgba(255,255,255,.75)" };
  if (isRelaxing) return { fill: "var(--green-glow)",  stroke: "var(--green)",   text: "var(--green)",          dist: "var(--green)"          };
  if (isRoot)     return { fill: "var(--accent-glow)", stroke: "var(--accent)",  text: "var(--accent-bright)",  dist: "var(--accent)"         };
  return           { fill: "var(--bg-card)",            stroke: "var(--border-active)", text: "var(--text-primary)", dist: "var(--text-muted)"   };
}

function HeapNode({ item, index, step }) {
  const gRef = useRef(null);
  const { x, y } = nodePos(index);
  const { fill, stroke, text: textColor, dist: distColor } = nodeColors(item, index, step);
  const isRoot    = index === 0;
  const isCurrent = step && item.node === step.current && step.type !== "init";

  useLayoutEffect(() => {
    if (!gRef.current) return;
    const el = gRef.current;
    const tween = gsap.from(el, {
      scale:      0,
      opacity:    0,
      duration:   0.4,
      ease:       "back.out(2)",
      svgOrigin:  `${x} ${y}`,
      clearProps: "all",
    });
    return () => {
      tween.kill();
      gsap.set(el, { clearProps: "all" });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <g ref={gRef}>
      {(isRoot || isCurrent) && (
        <circle cx={x} cy={y} r={R + 8} fill="var(--accent-glow)" opacity={0.55} />
      )}
      <circle
        cx={x} cy={y} r={R}
        fill={fill}
        stroke={stroke}
        strokeWidth={isRoot || isCurrent ? 2.5 : 1.5}
        style={{ transition: "fill .3s, stroke .3s" }}
      />
      <text
        x={x} y={y - 4}
        textAnchor="middle" dominantBaseline="middle"
        fill={textColor}
        fontSize="13" fontWeight="700"
        fontFamily="JetBrains Mono, monospace"
        style={{ transition: "fill .3s" }}
      >
        {item.node}
      </text>
      <text
        x={x} y={y + 10}
        textAnchor="middle" dominantBaseline="middle"
        fill={distColor}
        fontSize="10"
        fontFamily="JetBrains Mono, monospace"
        style={{ transition: "fill .3s" }}
      >
        {item.dist === Infinity ? "∞" : item.dist}
      </text>
    </g>
  );
}

export default function HeapViz({ heap = [], step }) {
  if (heap.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 px-5 text-mut text-[13px] font-mono">
        <span className="text-[28px] opacity-35">∅</span>
        <span>Tas vide</span>
      </div>
    );
  }

  const maxDepth  = Math.floor(Math.log2(heap.length));
  const svgH      = (maxDepth + 1) * ROW_H + R + 24;
  const positions = heap.map((_, i) => nodePos(i));

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${svgH}`}
      style={{ width: "100%", height: svgH + "px", display: "block" }}
      aria-label="Visualisation du MinHeap"
    >
      {positions.map(({ x, y }, i) => {
        if (i === 0) return null;
        const pidx  = Math.floor((i - 1) / 2);
        const p     = positions[pidx];
        const angle = Math.atan2(y - p.y, x - p.x);
        const offset = R + 2;
        return (
          <line
            key={`edge-${i}`}
            x1={p.x + Math.cos(angle) * offset}
            y1={p.y + Math.sin(angle) * offset}
            x2={x   - Math.cos(angle) * offset}
            y2={y   - Math.sin(angle) * offset}
            stroke="var(--border-active)"
            strokeWidth={1.5}
          />
        );
      })}

      {heap.map((item, i) => (
        <HeapNode
          key={`${item.node}-${item.dist}`}
          item={item}
          index={i}
          step={step}
        />
      ))}

      <text
        x={positions[0].x}
        y={positions[0].y - R - 7}
        textAnchor="middle"
        fill="var(--accent)"
        fontSize="8.5"
        fontWeight="700"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="1.5"
      >
        MIN
      </text>
    </svg>
  );
}
