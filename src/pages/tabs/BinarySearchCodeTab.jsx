import { useState } from "react";
import { BINARY_SEARCH_CODE } from "../../data/binarySearchCode";
import { formatContent }      from "../../utils/formatContent";

const STRUCTURE_EXPLANATION =
  `**binarySearch(arr, target)** — Fonction principale. Maintient deux bornes lo et hi qui délimitent la plage active. À chaque itération, calcule mid = ⌊(lo + hi) / 2⌋ et compare arr[mid] avec target. Si égal → retourne mid. Si arr[mid] < target → chercher à droite (lo = mid + 1). Sinon → chercher à gauche (hi = mid - 1). Quand lo > hi, la plage est vide : retourne -1.\n\n**Invariant** — Si target existe dans arr, il se trouve toujours dans arr[lo..hi]. Cet invariant est maintenu à chaque itération grâce aux mises à jour de lo et hi.\n\n**Éviter le dépassement** — On utilise Math.floor((lo + hi) / 2). En C/Java, lo + hi peut dépasser INT_MAX si les indices sont grands ; la formule sûre est alors lo + Math.floor((hi - lo) / 2).`;

const DEFAULT_TEST_CODE = `// Exemple d'utilisation
const arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]; // trié !

console.log("Chercher 23 :", binarySearch(arr, 23));  // → 5
console.log("Chercher 2  :", binarySearch(arr, 2));   // → 0
console.log("Chercher 91 :", binarySearch(arr, 91));  // → 9
console.log("Chercher 50 :", binarySearch(arr, 50));  // → -1 (absent)

// Vérification : nombre de comparaisons
// log₂(10) ≈ 3.3 → au plus 4 comparaisons pour 10 éléments`;

function stripTypeScript(code) {
  return code
    .replace(/:\s*number(\[\])?/g, "")
    .replace(/:\s*void/g,          "")
    .replace(/:\s*string/g,        "")
    .replace(/\bas\s+\w+/g,        "")
    .trim();
}

function formatValue(v) {
  if (v === null)      return "null";
  if (v === undefined) return "undefined";
  if (typeof v === "object") { try { return JSON.stringify(v); } catch { return String(v); } }
  return String(v);
}

function runCode(mainCode, testCode) {
  const jsCode = stripTypeScript(mainCode);
  const full   = jsCode + "\n" + testCode;
  const logs   = [];

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

export default function BinarySearchCodeTab() {
  const [code,     setCode]     = useState(BINARY_SEARCH_CODE);
  const [testCode, setTestCode] = useState(DEFAULT_TEST_CODE);
  const [output,   setOutput]   = useState(null);
  const [running,  setRunning]  = useState(false);

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      setOutput(runCode(code, testCode));
      setRunning(false);
    }, 30);
  }

  function handleReset() {
    setCode(BINARY_SEARCH_CODE);
    setOutput(null);
  }

  return (
    <>
      {/* ── Éditeur principal ── */}
      <div className="panel mb-6">
        <div className="panel-header">
          <span>⌨️ Implémentation TypeScript — binarySearch</span>
          <div className="flex gap-2">
            <button
              className="ctrl-btn !w-auto px-3 text-[12px] disabled:opacity-50"
              onClick={handleRun}
              disabled={running}
            >
              {running ? "⏳ Exécution…" : "▶ Exécuter"}
            </button>
            <button className="ctrl-btn !w-auto px-3 text-[12px]" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
        <div className="relative">
          <textarea
            className="w-full min-h-[260px] py-[18px] pr-[18px] pl-14 bg-code text-pri font-mono text-[13px] leading-[1.7] border-0 resize-y outline-none tab-2 transition-[background-color,color] duration-[350ms]"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
          <div className="absolute left-0 top-0 w-11 py-[18px] pr-2 text-right text-mut font-mono text-[13px] leading-[1.7] pointer-events-none select-none bg-code border-r border-line">
            {code.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
        </div>
      </div>

      {/* ── Code de test ── */}
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
            className="w-full min-h-[120px] py-[18px] pr-[18px] pl-14 bg-code text-pri font-mono text-[13px] leading-[1.7] border-0 resize-y outline-none tab-2 transition-[background-color,color] duration-[350ms]"
            value={testCode}
            onChange={(e) => setTestCode(e.target.value)}
            spellCheck={false}
          />
          <div className="absolute left-0 top-0 w-11 py-[18px] pr-2 text-right text-mut font-mono text-[13px] leading-[1.7] pointer-events-none select-none bg-code border-r border-line">
            {testCode.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
        </div>
      </div>

      {/* ── Console ── */}
      {output !== null && (
        <div className="panel mb-6">
          <div className="panel-header">
            <span>💻 Console</span>
            <button className="ctrl-btn !w-auto px-3 text-[12px]" onClick={() => setOutput(null)}>
              Effacer
            </button>
          </div>
          <div className="min-h-[60px] p-4 bg-code font-mono text-[13px] leading-[1.8]">
            {output.length === 0 ? (
              <span className="text-mut italic">Aucune sortie</span>
            ) : (
              output.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === "error" ? "text-red-400" :
                    line.type === "warn"  ? "text-yellow-400" : "text-pri"
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

      {/* ── Structure du code ── */}
      <div className="panel mb-6">
        <div className="panel-header">💡 Structure du code</div>
        <div className="section-content">
          {formatContent(STRUCTURE_EXPLANATION)}
        </div>
      </div>
    </>
  );
}
