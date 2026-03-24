import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import Footer from "../components/layout/Footer";
import { useLang } from "../i18n/LangContext";

gsap.registerPlugin(SplitText);

/* ── Bilingual content ─────────────────────────────── */
const CONTENT = {
  fr: {
    badge:        "Guide de référence",
    title:        "Comprendre la complexité algorithmique",
    subtitle:     "Comment lire, analyser et comparer la performance des algorithmes",
    intro: {
      heading: "C'est quoi Big O ?",
      p1: "La notation Big O décrit comment le temps d'exécution (ou la mémoire) d'un algorithme évolue en fonction de la taille n des données. Elle exprime le comportement dans le pire des cas, en ignorant les facteurs constants.",
      p2: "En pratique, on simplifie : on ignore les constantes — O(2n) devient O(n) — et on conserve uniquement le terme qui croît le plus vite — O(n² + n) devient O(n²).",
      p3: "L'objectif est de choisir l'algorithme le plus adapté à la taille de vos données, avant même d'écrire une ligne de code.",
    },
    chartTitle:   "Courbes de croissance comparées (n = 1 à 8)",
    classesTitle: "Les 6 classes de complexité",
    rulesTitle:   "Comment analyser la complexité d'un algorithme",
    rules: [
      {
        title: "Une boucle simple → O(n)",
        code:  `for (let i = 0; i < n; i++) {\n  // opération O(1)\n}\n// → O(n)`,
        note:  "La boucle itère n fois, chaque itération est en temps constant.",
      },
      {
        title: "Boucles imbriquées → O(n²)",
        code:  `for (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) {\n    // opération O(1)\n  }\n}\n// → O(n²)`,
        note:  "n × n = n² opérations. Chaque niveau d'imbrication ajoute un exposant.",
      },
      {
        title: "Ignorer les constantes",
        code:  `// O(5n)        → O(n)\n// O(42)         → O(1)\n// O(3n² + 2n)   → O(n²)`,
        note:  "Les constantes deviennent négligeables pour de grands n.",
      },
      {
        title: "Garder le terme dominant",
        code:  `// O(n² + n)     → O(n²)\n// O(n + log n)   → O(n)\n// O(n log n + n)  → O(n log n)`,
        note:  "La croissance globale est dictée par le terme qui croît le plus vite.",
      },
      {
        title: "Diviser par 2 à chaque étape → O(log n)",
        code:  `let lo = 0, hi = n;\nwhile (lo < hi) {\n  const mid = (lo + hi) >> 1; // divise par 2\n  if (target < arr[mid]) hi = mid;\n  else lo = mid + 1;\n}\n// → O(log n)`,
        note:  "Si l'espace du problème est divisé à chaque étape, la complexité est logarithmique.",
      },
      {
        title: "Sections séquentielles → on additionne",
        code:  `for (let i = 0; i < n; i++) { ... } // O(n)\nfor (let i = 0; i < n; i++) { ... } // O(n)\n// total : O(n) + O(n) = O(2n) → O(n)`,
        note:  "On additionne les complexités puis on simplifie.",
      },
    ],
    tableTitle:   "Référence des algorithmes courants",
    tableHeaders: ["Algorithme", "Temporel (moy.)", "Temporel (pire)", "Spatial"],
    tableNote:    "* V = sommets, E = arêtes dans un graphe",
  },
  en: {
    badge:        "Reference guide",
    title:        "Understanding Algorithm Complexity",
    subtitle:     "How to read, analyze and compare algorithm performance",
    intro: {
      heading: "What is Big O?",
      p1: "Big O notation describes how the execution time (or memory) of an algorithm grows as a function of its input size n. It expresses worst-case behavior, ignoring constant factors.",
      p2: "In practice, we simplify: ignore constants — O(2n) becomes O(n) — and keep only the fastest-growing term — O(n² + n) becomes O(n²).",
      p3: "The goal is to choose the most suitable algorithm for your data size, before writing a single line of code.",
    },
    chartTitle:   "Comparative growth curves (n = 1 to 8)",
    classesTitle: "The 6 complexity classes",
    rulesTitle:   "How to analyze algorithm complexity",
    rules: [
      {
        title: "A simple loop → O(n)",
        code:  `for (let i = 0; i < n; i++) {\n  // O(1) operation\n}\n// → O(n)`,
        note:  "The loop iterates n times, each iteration is constant time.",
      },
      {
        title: "Nested loops → O(n²)",
        code:  `for (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) {\n    // O(1) operation\n  }\n}\n// → O(n²)`,
        note:  "n × n = n² operations. Each nesting level adds an exponent.",
      },
      {
        title: "Ignore constants",
        code:  `// O(5n)        → O(n)\n// O(42)         → O(1)\n// O(3n² + 2n)   → O(n²)`,
        note:  "Constants become negligible for large n.",
      },
      {
        title: "Keep the dominant term",
        code:  `// O(n² + n)     → O(n²)\n// O(n + log n)   → O(n)\n// O(n log n + n)  → O(n log n)`,
        note:  "Overall growth is dictated by the fastest-growing term.",
      },
      {
        title: "Halving at each step → O(log n)",
        code:  `let lo = 0, hi = n;\nwhile (lo < hi) {\n  const mid = (lo + hi) >> 1; // halves by 2\n  if (target < arr[mid]) hi = mid;\n  else lo = mid + 1;\n}\n// → O(log n)`,
        note:  "If the problem space is divided at each step, complexity is logarithmic.",
      },
      {
        title: "Sequential sections → add them",
        code:  `for (let i = 0; i < n; i++) { ... } // O(n)\nfor (let i = 0; i < n; i++) { ... } // O(n)\n// total: O(n) + O(n) = O(2n) → O(n)`,
        note:  "Add complexities together, then simplify.",
      },
    ],
    tableTitle:   "Common algorithm reference",
    tableHeaders: ["Algorithm", "Time (avg)", "Time (worst)", "Space"],
    tableNote:    "* V = vertices, E = edges in a graph",
  },
};

/* ── Big O classes ─────────────────────────────────── */
const O_CLASSES = [
  {
    notation: "O(1)",
    name:     { fr: "Constant",       en: "Constant"     },
    color:    "#4ade80",
    quality:  { fr: "Excellent",      en: "Excellent"    },
    badge:    "bg-c-green-dim text-c-green",
    desc:     { fr: "Le temps ne change pas quelle que soit la taille des données.", en: "Time doesn't change regardless of input size." },
    ex:       { fr: ["Accès tableau arr[i]", "HashMap get / set", "Calcul arithmétique"], en: ["Array access arr[i]", "HashMap get / set", "Arithmetic calculation"] },
  },
  {
    notation: "O(log n)",
    name:     { fr: "Logarithmique",  en: "Logarithmic"  },
    color:    "#22d3ee",
    quality:  { fr: "Très bien",      en: "Very good"    },
    badge:    "bg-c-cyan-dim text-c-cyan",
    desc:     { fr: "L'espace est divisé (souvent par 2) à chaque étape. Très efficace.", en: "Search space is divided (often by 2) at each step. Very efficient." },
    ex:       { fr: ["Recherche binaire", "ABR équilibré", "Exponentiation rapide"], en: ["Binary search", "Balanced BST", "Fast exponentiation"] },
  },
  {
    notation: "O(n)",
    name:     { fr: "Linéaire",       en: "Linear"       },
    color:    "#6c8cff",
    quality:  { fr: "Bien",           en: "Good"         },
    badge:    "bg-accent-dim text-accent-hi",
    desc:     { fr: "Temps proportionnel à n : une simple boucle sur les données.", en: "Time proportional to n: a single loop over the data." },
    ex:       { fr: ["Recherche linéaire", "Somme d'un tableau", "Copie de liste"], en: ["Linear search", "Array sum", "List copy"] },
  },
  {
    notation: "O(n log n)",
    name:     { fr: "Quasi-linéaire", en: "Quasilinear"  },
    color:    "#fb923c",
    quality:  { fr: "Acceptable",     en: "Acceptable"   },
    badge:    "bg-c-orange-dim text-c-orange",
    desc:     { fr: "Optimal pour les tris par comparaison. Légèrement supérieur à O(n).", en: "Optimal for comparison-based sorting. Slightly above O(n)." },
    ex:       { fr: ["Quicksort (moy.)", "Mergesort", "Heapsort"], en: ["Quicksort (avg)", "Mergesort", "Heapsort"] },
  },
  {
    notation: "O(n²)",
    name:     { fr: "Quadratique",    en: "Quadratic"    },
    color:    "#f87171",
    quality:  { fr: "Mauvais",        en: "Bad"          },
    badge:    "bg-c-red-dim text-c-red",
    desc:     { fr: "Deux boucles imbriquées. Acceptable pour de petits n, catastrophique pour de grands.", en: "Two nested loops. OK for small n, catastrophic for large n." },
    ex:       { fr: ["Tri à bulles", "Tri par insertion", "Recherche de paires naïve"], en: ["Bubble sort", "Insertion sort", "Naive pair search"] },
  },
  {
    notation: "O(2ⁿ)",
    name:     { fr: "Exponentiel",    en: "Exponential"  },
    color:    "#a78bfa",
    quality:  { fr: "Terrible",       en: "Terrible"     },
    badge:    "bg-c-purple/10 text-c-purple",
    desc:     { fr: "Le temps double à chaque élément ajouté. Inutilisable pour de grands n.", en: "Time doubles with each added element. Unusable for large n." },
    ex:       { fr: ["Fibonacci naïf", "Génération de sous-ensembles", "Backtracking naïf"], en: ["Naive Fibonacci", "Subset generation", "Naive backtracking"] },
  },
];

/* ── Reference table rows ──────────────────────────── */
const TABLE_ROWS = [
  { algo: { fr: "Recherche linéaire",   en: "Linear search"     }, avg: "O(n)",            worst: "O(n)",            space: "O(1)"     },
  { algo: { fr: "Recherche binaire",    en: "Binary search"     }, avg: "O(log n)",        worst: "O(log n)",        space: "O(1)"     },
  { algo: { fr: "Quicksort",            en: "Quicksort"         }, avg: "O(n log n)",      worst: "O(n²)",           space: "O(log n)" },
  { algo: { fr: "Mergesort",            en: "Mergesort"         }, avg: "O(n log n)",      worst: "O(n log n)",      space: "O(n)"     },
  { algo: { fr: "Tri par insertion",    en: "Insertion sort"    }, avg: "O(n²)",           worst: "O(n²)",           space: "O(1)"     },
  { algo: { fr: "Tri à bulles",         en: "Bubble sort"       }, avg: "O(n²)",           worst: "O(n²)",           space: "O(1)"     },
  { algo: { fr: "ABR — recherche",      en: "BST — search"      }, avg: "O(log n)",        worst: "O(n)",            space: "O(1)"     },
  { algo: { fr: "Hash map — recherche", en: "Hash map — search" }, avg: "O(1)",            worst: "O(n)",            space: "O(n)"     },
  { algo: { fr: "Dijkstra *",           en: "Dijkstra *"        }, avg: "O((V+E) log V)",  worst: "O((V+E) log V)",  space: "O(V)"     },
];

function complexityColor(text) {
  if (text === "O(1)")             return "#4ade80";
  if (text === "O(n)")             return "#6c8cff";
  if (text.includes("n²"))         return "#f87171";
  if (text.includes("n log") || text.includes("log V")) return "#fb923c";
  if (text.includes("log"))        return "#22d3ee";
  return "var(--text-secondary)";
}

/* ── SVG growth chart ──────────────────────────────── */
function ComplexityChart() {
  const W = 480, H = 230;
  const pad = { t: 16, r: 16, b: 44, l: 42 };
  const cW = W - pad.l - pad.r;
  const cH = H - pad.t - pad.b;
  const maxN = 8;
  const maxY = 64; // = n² at n=8, so O(n²) fills the chart exactly

  const ns = Array.from({ length: maxN }, (_, i) => i + 1);

  const curves = [
    { label: "O(1)",       color: "#4ade80", fn: () => 1                       },
    { label: "O(log n)",   color: "#22d3ee", fn: n => Math.log2(n)             },
    { label: "O(n)",       color: "#6c8cff", fn: n => n                        },
    { label: "O(n log n)", color: "#fb923c", fn: n => n * Math.log2(n)         },
    { label: "O(n²)",      color: "#f87171", fn: n => n * n                    },
    { label: "O(2ⁿ)",      color: "#a78bfa", fn: n => Math.pow(2, n)           },
  ];

  const toX = n => pad.l + ((n - 1) / (maxN - 1)) * cW;
  const toY = v => pad.t + cH - (Math.min(v, maxY) / maxY) * cH;

  const yTicks = [0, 16, 32, 48, 64];

  return (
    <div className="flex flex-col bp860:flex-row items-start gap-6">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[480px]" style={{ overflow: "visible" }}>
        {/* Horizontal grid lines */}
        {yTicks.map(v => (
          <g key={v}>
            <line
              x1={pad.l} y1={toY(v)} x2={pad.l + cW} y2={toY(v)}
              stroke="var(--border)" strokeWidth="1" strokeDasharray="4,3"
            />
            <text x={pad.l - 8} y={toY(v) + 4} textAnchor="end" fontSize="9" fill="var(--text-muted)">
              {v}
            </text>
          </g>
        ))}

        {/* X axis tick labels */}
        {ns.map(n => (
          <text key={n} x={toX(n)} y={pad.t + cH + 18} textAnchor="middle" fontSize="9" fill="var(--text-muted)">
            {n}
          </text>
        ))}

        {/* Axis labels */}
        <text x={pad.l + cW / 2} y={H - 2} textAnchor="middle" fontSize="9" fill="var(--text-muted)">n</text>
        <text x={8} y={pad.t + cH / 2} textAnchor="middle" fontSize="9" fill="var(--text-muted)"
          transform={`rotate(-90, 8, ${pad.t + cH / 2})`}>ops</text>

        {/* Axes */}
        <line x1={pad.l} y1={pad.t - 4} x2={pad.l} y2={pad.t + cH}
          stroke="var(--border-active)" strokeWidth="1.5" />
        <line x1={pad.l} y1={pad.t + cH} x2={pad.l + cW + 4} y2={pad.t + cH}
          stroke="var(--border-active)" strokeWidth="1.5" />

        {/* Curves */}
        {curves.map(c => {
          const pts = ns.map(n => `${toX(n)},${toY(c.fn(n))}`).join(" ");
          return (
            <polyline
              key={c.label} points={pts}
              fill="none" stroke={c.color} strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round"
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-col gap-[10px] min-w-[120px] pt-1">
        {curves.map(c => (
          <div key={c.label} className="flex items-center gap-2">
            <div className="w-7 h-[2px] rounded flex-shrink-0" style={{ background: c.color }} />
            <span className="font-mono text-[12px] text-sec">{c.label}</span>
          </div>
        ))}
        <p className="text-mut text-[11px] mt-2 leading-[1.5] max-w-[160px]">
          O(2ⁿ) sort du graphe dès n≈7
        </p>
      </div>
    </div>
  );
}

/* ── Page component ────────────────────────────────── */
export default function ComplexityGuidePage() {
  const { lang } = useLang();
  const c = CONTENT[lang];
  const splitRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const split = new SplitText(".cg-title", { type: "words" });
      splitRef.current = split;

      tl.from(split.words, {
        opacity: 0, y: 20, rotationX: -40,
        transformOrigin: "50% 50% -20px",
        stagger: 0.055, duration: 0.5,
        ease: "back.out(1.3)", clearProps: "transform,opacity",
      });
      tl.from(".cg-sub", {
        opacity: 0, y: 14, duration: 0.38, clearProps: "transform,opacity",
      }, "-=0.25");
      tl.from(".cg-fade", {
        opacity: 0, y: 22, stagger: 0.06, duration: 0.45, clearProps: "transform,opacity",
      }, "-=0.15");
    });

    return () => {
      if (splitRef.current) splitRef.current.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto p-6 pb-0">

      {/* ── Header ── */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-line text-[11px] font-medium text-mut mb-5 bg-card">
          <span className="w-[5px] h-[5px] bg-c-cyan rounded-full animate-pulse-slow" />
          {c.badge}
        </div>
        <h1 className="cg-title font-serif text-[clamp(26px,4vw,46px)] font-bold tracking-[-1px] mb-3 will-change-[transform,opacity]">
          {c.title}
        </h1>
        <p className="cg-sub text-sec text-[15px] will-change-[transform,opacity]">
          {c.subtitle}
        </p>
      </div>

      {/* ── Section 1: What is Big O ── */}
      <section className="cg-fade panel mb-6 will-change-[transform,opacity]">
        <div className="panel-header">
          <span className="font-semibold text-[15px]">📐 {c.intro.heading}</span>
        </div>
        <div className="panel-body flex flex-col gap-3">
          <p className="text-sec text-[14px] leading-[1.7]">{c.intro.p1}</p>
          <p className="text-sec text-[14px] leading-[1.7]">{c.intro.p2}</p>
          <p className="text-[14px] leading-[1.7] font-medium text-pri border-l-2 border-accent pl-3">
            {c.intro.p3}
          </p>
        </div>
      </section>

      {/* ── Section 2: Growth chart ── */}
      <section className="cg-fade panel mb-6 will-change-[transform,opacity]">
        <div className="panel-header">
          <span className="font-semibold text-[15px]">📈 {c.chartTitle}</span>
        </div>
        <div className="panel-body">
          <ComplexityChart />
        </div>
      </section>

      {/* ── Section 3: The 6 classes ── */}
      <section className="cg-fade mb-6 will-change-[transform,opacity]">
        <h2 className="text-[18px] font-bold mb-4 tracking-[-0.3px]">{c.classesTitle}</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          {O_CLASSES.map(cls => (
            <div
              key={cls.notation}
              className="bg-card border border-line rounded-[14px] p-5 hover:border-line-on transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-[22px] font-bold leading-none" style={{ color: cls.color }}>
                  {cls.notation}
                </span>
                <span className={`text-[10px] font-semibold uppercase tracking-[0.8px] px-2 py-[3px] rounded-[5px] ${cls.badge}`}>
                  {cls.quality[lang]}
                </span>
              </div>
              <p className="text-[13px] font-semibold mb-1">{cls.name[lang]}</p>
              <p className="text-sec text-[13px] leading-[1.6] mb-3">{cls.desc[lang]}</p>
              <div className="flex flex-col gap-[5px]">
                {cls.ex[lang].map((e, i) => (
                  <span key={i} className="text-[12px] text-mut flex items-center gap-[6px]">
                    <span className="text-[7px] flex-shrink-0" style={{ color: cls.color }}>◆</span>
                    {e}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4: Analysis rules ── */}
      <section className="cg-fade mb-6 will-change-[transform,opacity]">
        <h2 className="text-[18px] font-bold mb-4 tracking-[-0.3px]">{c.rulesTitle}</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4">
          {c.rules.map((rule, i) => (
            <div key={i} className="bg-card border border-line rounded-[14px] p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-accent-dim text-accent-hi flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="font-semibold text-[14px]">{rule.title}</span>
              </div>
              <pre
                className="font-mono text-[11.5px] rounded-[8px] p-3 mb-3 overflow-x-auto leading-[1.65]"
                style={{ background: "var(--bg-code)", color: "#a0b8d8" }}
              >
                {rule.code}
              </pre>
              <p className="text-sec text-[12.5px] leading-[1.55]">{rule.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: Reference table ── */}
      <section className="cg-fade panel mb-10 will-change-[transform,opacity]">
        <div className="panel-header">
          <span className="font-semibold text-[15px]">📊 {c.tableTitle}</span>
        </div>
        <div className="panel-body overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-line">
                {c.tableHeaders.map(h => (
                  <th key={h} className="text-left py-2 px-3 text-mut font-semibold uppercase text-[10px] tracking-[0.7px] whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, i) => (
                <tr key={i} className="border-b border-line/40 hover:bg-card-hov transition-colors duration-150">
                  <td className="py-2.5 px-3 font-medium whitespace-nowrap">{row.algo[lang]}</td>
                  <td className="py-2.5 px-3 font-mono whitespace-nowrap" style={{ color: complexityColor(row.avg) }}>
                    {row.avg}
                  </td>
                  <td className="py-2.5 px-3 font-mono whitespace-nowrap" style={{ color: complexityColor(row.worst) }}>
                    {row.worst}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-sec whitespace-nowrap">{row.space}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-mut text-[11px] mt-3">{c.tableNote}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
