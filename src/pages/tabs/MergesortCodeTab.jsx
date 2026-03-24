import { useState } from "react";
import { MERGESORT_CODE } from "../../data/mergesortCode";
import { formatContent } from "../../utils/formatContent";

const STRUCTURE_EXPLANATION =
  `**merge()** — Cœur de Mergesort. Fusionne deux sous-tableaux déjà triés [left..mid] et [mid+1..right] en un seul sous-tableau trié. Copie d'abord les deux moitiés dans des tableaux auxiliaires, puis compare élément par élément en réécrivant dans arr. La condition ≤ (et non <) garantit la stabilité.\n\n**mergesort()** — Fonction récursive. Si left ≥ right (0 ou 1 élément), c'est la base de récursion → déjà trié. Sinon, calcule mid = ⌊(left + right) / 2⌋, récurse sur chaque moitié, puis appelle merge() pour les combiner.\n\n**Résultat** — Après l'appel initial mergesort(arr), le tableau est trié en place. Les tableaux auxiliaires alloués dans merge() sont libérés après chaque appel.`;

const DEFAULT_TEST_CODE = `// Exemple d'utilisation
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log("Avant :", arr.join(", "));

mergesort(arr);
console.log("Après :", arr.join(", "));

// Vérification
const sorted = [...arr].every((v, i, a) => i === 0 || a[i - 1] <= v);
console.log("Trié correctement :", sorted);`;

// ── Suppression légère des annotations TypeScript ───────────────────────────
function stripTypeScript(code) {
  return code
    .replace(/:\s*number(\[\])?/g, "")
    .replace(/:\s*void/g, "")
    .replace(/:\s*string/g, "")
    .replace(/\bas\s+\w+/g, "")
    .trim();
}

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

export default function MergesortCodeTab() {
  const [code, setCode]         = useState(MERGESORT_CODE);
  const [testCode, setTestCode] = useState(DEFAULT_TEST_CODE);
  const [output, setOutput]     = useState(null);
  const [running, setRunning]   = useState(false);

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      setOutput(runCode(code, testCode));
      setRunning(false);
    }, 30);
  }

  function handleReset() {
    setCode(MERGESORT_CODE);
    setOutput(null);
  }

  return (
    <>
      {/* ── Éditeur principal ─────────────────────────────── */}
      <div className="panel mb-6">
        <div className="panel-header">
          <span>⌨️ Implémentation TypeScript — merge + mergesort</span>
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
            className="w-full min-h-[320px] py-[18px] pr-[18px] pl-14 bg-code text-pri font-mono text-[13px] leading-[1.7] border-0 resize-y outline-none tab-2 transition-[background-color,color] duration-[350ms]"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
          <div className="absolute left-0 top-0 w-11 py-[18px] pr-2 text-right text-mut font-mono text-[13px] leading-[1.7] pointer-events-none select-none bg-code border-r border-line">
            {code.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
        </div>
      </div>

      {/* ── Code de test ──────────────────────────────────── */}
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

      {/* ── Console ───────────────────────────────────────── */}
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

      {/* ── Structure du code ─────────────────────────────── */}
      <div className="panel mb-6">
        <div className="panel-header">💡 Structure du code</div>
        <div className="section-content">
          {formatContent(STRUCTURE_EXPLANATION)}
        </div>
      </div>
    </>
  );
}
