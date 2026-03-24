import { useState } from "react";
import { DIJKSTRA_CODE } from "../../data/dijkstraCode";
import { formatContent } from "../../utils/formatContent";

const STRUCTURE_EXPLANATION =
  `**MinHeap** — File de priorité (min-heap) implémentée avec un tableau. Le plus petit élément est toujours à l'index 0. Les opérations push/pop fonctionnent en O(log n) grâce aux méthodes heapifyUp et heapifyDown.\n\n**dijkstra()** — Prend le nombre de sommets V et un graphe (Map d'adjacence). Initialise dist[] à ∞ (sauf source = 0), puis boucle : pop le min du heap, visite ses voisins, relaxe les arêtes si on trouve un raccourci.\n\n**Résultat** — Le tableau dist[] contient la distance minimale depuis le sommet 0 vers chaque autre sommet. Les sommets inaccessibles restent à Infinity.`;

const DEFAULT_TEST_CODE = `// Graphe :  0 --5-- 1 --3-- 3
//            \\             /
//             --2-- 2 --4--
const graph = new Map([
  [0, [{to: 1, weight: 5}, {to: 2, weight: 2}]],
  [1, [{to: 3, weight: 3}]],
  [2, [{to: 3, weight: 4}]],
  [3, []],
]);

const distances = dijkstra(4, graph);
console.log("Distances depuis le sommet 0 :");
distances.forEach((d, i) => {
  console.log("  → Sommet " + i + " : " + (d === Infinity ? "∞" : d));
});`;

// ── TypeScript → JavaScript (suppression des annotations de types) ──────────

const TS_PRIMITIVES = new Set([
  "number", "string", "boolean", "void", "null", "undefined",
  "never", "any", "unknown", "object", "bigint", "symbol",
]);

function isTypeStart(code, pos) {
  if (pos >= code.length) return false;
  const c = code[pos];
  if (c === "{" || c === "[") return true;           // inline type
  if (c >= "A" && c <= "Z") return true;             // classe / interface
  const word = code.slice(pos).match(/^[a-z]+/)?.[0] ?? "";
  return TS_PRIMITIVES.has(word);
}

// Avance après la fin d'une annotation de type (gère les <>, {}, [], ())
function skipType(code, pos) {
  const n = code.length;
  // Si l'annotation commence par { c'est un type objet inline, pas un bloc de code
  let hasContent = code[pos] !== "{";
  let depth = 0;
  let i = pos;

  while (i < n) {
    const c = code[i];

    if (c === "<" || c === "(" || c === "[") {
      depth++;
      i++;
      continue;
    }

    if (c === "{") {
      // { à depth 0 APRÈS du contenu = début de bloc de code → stop
      if (hasContent && depth === 0) break;
      depth++;
      i++;
      continue;
    }

    if (c === ">" || c === ")" || c === "]" || c === "}") {
      if (depth === 0) break;
      depth--;
      if (depth === 0) hasContent = true;
      i++;
      continue;
    }

    if (depth === 0) {
      if (c === "," || c === ";" || c === "=") break;
      if (c === "\n") {
        // Si la prochaine ligne commence par ), , ou { → fin du type
        let j = i + 1;
        while (j < n && (code[j] === " " || code[j] === "\t")) j++;
        if (j < n && (code[j] === ")" || code[j] === "," || code[j] === "}" || code[j] === "{")) break;
      }
      hasContent = true;
    }

    i++;
  }

  return i;
}

function stripTypeScript(tsCode) {
  let result = "";
  let i = 0;
  const n = tsCode.length;
  let inString = false;
  let stringChar = "";

  while (i < n) {
    const c = tsCode[i];

    // Chaînes de caractères
    if (!inString && (c === '"' || c === "'" || c === "`")) {
      inString = true;
      stringChar = c;
      result += c;
      i++;
      continue;
    }
    if (inString) {
      if (c === "\\") {
        result += c + (tsCode[i + 1] ?? "");
        i += 2;
        continue;
      }
      if (c === stringChar) inString = false;
      result += c;
      i++;
      continue;
    }

    // Commentaires ligne
    if (c === "/" && tsCode[i + 1] === "/") {
      while (i < n && tsCode[i] !== "\n") { result += tsCode[i]; i++; }
      continue;
    }

    // Annotation de type après ':'
    if (c === ":") {
      const lastChar = result.trimEnd().slice(-1);
      // Un ':' d'annotation suit toujours un identifiant, ] ou )
      if (/[a-zA-Z0-9_$\]\)]/.test(lastChar)) {
        let j = i + 1;
        while (j < n && (tsCode[j] === " " || tsCode[j] === "\t")) j++;
        if (j < n && isTypeStart(tsCode, j)) {
          i = skipType(tsCode, j); // saute ':' + le type entier
          continue;
        }
      }
    }

    result += c;
    i++;
  }

  // Modificateurs d'accès
  result = result.replace(/\b(private|public|protected|readonly)\s+/g, "");
  // Assertions non-nullables  (heap.pop()!)
  result = result.replace(/!(?=[;,)\]\s\n])/g, "");
  // Nettoyage des virgules orphelines en cas de param unique typé
  result = result.replace(/\(\s*,\s*/g, "(");
  result = result.replace(/,\s*,/g, ",");
  result = result.replace(/,\s*\)/g, ")");

  return result;
}

// ── Exécution sécurisée ─────────────────────────────────────────────────────

function formatValue(v) {
  if (v === null) return "null";
  if (v === undefined) return "undefined";
  if (typeof v === "object") {
    try { return JSON.stringify(v); } catch { return String(v); }
  }
  return String(v);
}

function runCode(mainCode, testCode) {
  const jsCode = stripTypeScript(mainCode);
  const full = jsCode + "\n" + testCode;
  const logs = [];

  const mockConsole = {
    log:   (...args) => logs.push({ type: "log",   text: args.map(formatValue).join(" ") }),
    error: (...args) => logs.push({ type: "error", text: args.map(formatValue).join(" ") }),
    warn:  (...args) => logs.push({ type: "warn",  text: args.map(formatValue).join(" ") }),
    info:  (...args) => logs.push({ type: "log",   text: args.map(formatValue).join(" ") }),
  };

  try {
    // eslint-disable-next-line no-new-func
    new Function("console", full)(mockConsole);
  } catch (e) {
    logs.push({ type: "error", text: e.message });
  }

  return logs;
}

// ── Composant ───────────────────────────────────────────────────────────────

export default function CodeEditor() {
  const [code, setCode] = useState(DIJKSTRA_CODE);
  const [testCode, setTestCode] = useState(DEFAULT_TEST_CODE);
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);

  function handleRun() {
    setRunning(true);
    // Petit délai pour que le state "running" s'affiche avant l'exécution
    setTimeout(() => {
      setOutput(runCode(code, testCode));
      setRunning(false);
    }, 30);
  }

  function handleReset() {
    setCode(DIJKSTRA_CODE);
    setOutput(null);
  }

  return (
    <>
      {/* ── Éditeur principal ─────────────────────────────────────────── */}
      <div className="panel mb-6">
        <div className="panel-header">
          <span>⌨️ Implémentation TypeScript — MinHeap + Dijkstra</span>
          <div className="flex gap-2">
            <button
              className="ctrl-btn !w-auto px-3 text-[12px] disabled:opacity-50"
              onClick={handleRun}
              disabled={running}
            >
              {running ? "⏳ Exécution…" : "▶ Exécuter"}
            </button>
            <button
              className="ctrl-btn !w-auto px-3 text-[12px]"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="relative">
          <textarea
            className="w-full min-h-[420px] py-[18px] pr-[18px] pl-14 bg-code text-pri font-mono text-[13px] leading-[1.7] border-0 resize-y outline-none tab-2 transition-[background-color,color] duration-[350ms]"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
          <div className="absolute left-0 top-0 w-11 py-[18px] pr-2 text-right text-mut font-mono text-[13px] leading-[1.7] pointer-events-none select-none bg-code border-r border-line">
            {code.split("\n").map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Code de test ──────────────────────────────────────────────── */}
      <div className="panel mb-6">
        <div className="panel-header">
          <span>🧪 Code de test</span>
          <button
            className="ctrl-btn !w-auto px-3 text-[12px]"
            onClick={() => setTestCode(DEFAULT_TEST_CODE)}
          >
            Reset
          </button>
        </div>
        <div className="relative">
          <textarea
            className="w-full min-h-[160px] py-[18px] pr-[18px] pl-14 bg-code text-pri font-mono text-[13px] leading-[1.7] border-0 resize-y outline-none tab-2 transition-[background-color,color] duration-[350ms]"
            value={testCode}
            onChange={(e) => setTestCode(e.target.value)}
            spellCheck={false}
          />
          <div className="absolute left-0 top-0 w-11 py-[18px] pr-2 text-right text-mut font-mono text-[13px] leading-[1.7] pointer-events-none select-none bg-code border-r border-line">
            {testCode.split("\n").map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Console ───────────────────────────────────────────────────── */}
      {output !== null && (
        <div className="panel mb-6">
          <div className="panel-header">
            <span>💻 Console</span>
            <button
              className="ctrl-btn !w-auto px-3 text-[12px]"
              onClick={() => setOutput(null)}
            >
              Effacer
            </button>
          </div>
          <div className="min-h-[80px] p-4 bg-code font-mono text-[13px] leading-[1.8]">
            {output.length === 0 ? (
              <span className="text-mut italic">Aucune sortie</span>
            ) : (
              output.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === "error"
                      ? "text-red-400"
                      : line.type === "warn"
                      ? "text-yellow-400"
                      : "text-pri"
                  }
                >
                  <span className="select-none mr-2 text-mut">
                    {line.type === "error" ? "✗" : line.type === "warn" ? "⚠" : "›"}
                  </span>
                  {line.text}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ── Structure du code ─────────────────────────────────────────── */}
      <div className="panel mb-6">
        <div className="panel-header">💡 Structure du code</div>
        <div className="section-content">
          {formatContent(STRUCTURE_EXPLANATION)}
        </div>
      </div>
    </>
  );
}
