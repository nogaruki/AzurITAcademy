import { useLayoutEffect, useRef } from "react";
import { gsap }          from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ALGORITHMS = [
  { label: "Dijkstra\n(heap)",  value: 20,  bigO: "O((V+E) log V)", color: "var(--accent)"  },
  { label: "Dijkstra\n(naïf)", value: 50,  bigO: "O(V²)",          color: "var(--orange)"  },
  { label: "Bellman-\nFord",   value: 70,  bigO: "O(V × E)",       color: "var(--red)"     },
  { label: "Floyd-\nWarshall", value: 100, bigO: "O(V³)",          color: "var(--purple)"  },
];

export default function ComplexityChart() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const bars   = scope.current.querySelectorAll(".chart-bar");
      const labels = scope.current.querySelectorAll(".chart-bar-value, .chart-bar-label");

      gsap.from(bars, {
        scaleY:          0,
        transformOrigin: "bottom center",
        duration:        0.85,
        stagger:         0.1,
        ease:            "power3.out",
        clearProps:      "scaleY,transformOrigin",
        scrollTrigger: {
          trigger:       scope.current,
          start:         "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(labels, {
        opacity:    0,
        y:          10,
        duration:   0.4,
        stagger:    0.07,
        ease:       "power2.out",
        delay:      0.3,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger:       scope.current,
          start:         "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <div className="panel mb-10" ref={scope}>
      <div className="panel-header">
        📊 Comparaison des complexités (pour V = 1000, E = 5000)
      </div>
      <div className="panel-body">
        <div className="flex items-end gap-4 h-[200px] py-5">
          {ALGORITHMS.map((item, i) => (
            <div className="chart-bar-wrapper flex-1 flex flex-col items-center gap-2 h-full justify-end" key={i}>
              <div className="chart-bar-value text-[11px] font-bold text-pri text-center font-mono">{item.bigO}</div>
              <div
                className="chart-bar w-full rounded-t-lg min-h-[4px] transition-[height] duration-[600ms]"
                style={{
                  height:     `${item.value}%`,
                  background: `linear-gradient(180deg, ${item.color}90, ${item.color}30)`,
                  border:     `1px solid ${item.color}`,
                }}
              />
              <div className="chart-bar-label text-[11px] font-semibold text-mut text-center font-mono whitespace-pre-line">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
