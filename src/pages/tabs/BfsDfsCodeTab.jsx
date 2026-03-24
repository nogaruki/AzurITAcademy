import { useState } from "react";
import { BFS_CODE, DFS_CODE } from "../../data/bfsDfsCode";
import { formatContent } from "../../utils/formatContent";
import { useLang } from "../../i18n/LangContext";

const BFS_EXPLANATION =
  `**bfs()** — Utilise une **file FIFO** initialisée avec le nœud source. Tant que la file n'est pas vide, on retire le premier élément, on le visite, puis on ajoute ses voisins non visités à la fin de la file. Cela garantit une exploration **niveau par niveau**.\n\n**Propriété clé :** Le premier chemin trouvé vers un nœud est toujours le plus court en nombre d'arêtes — BFS est optimal pour les graphes non pondérés.\n\n**Complexité :** O(V + E) temps, O(V) espace.`;

const DFS_EXPLANATION =
  `**explore()** — Fonction récursive interne. Marque le nœud courant comme visité, puis appelle explore() sur chaque voisin non encore visité. Le **retour arrière** est implicite : quand tous les voisins sont visités, la fonction retourne au niveau précédent.\n\n**Version itérative :** Utilise une pile explicite. Au lieu de la récursion, on empile les voisins et on dépile le dernier ajouté en premier (LIFO).\n\n**Complexité :** O(V + E) temps, O(V) espace (pile de récursion).`;

const DEFAULT_TEST_BFS = `// Graphe sous forme de liste d'adjacence
// A(0)-B(1), A(0)-C(2), B(1)-D(3), C(2)-D(3)
const graph = [[1,2],[0,3],[0,3],[1,2]];

const result = bfs(graph, 0);
console.log("Ordre BFS depuis A:", result.join(" → "));`;

const DEFAULT_TEST_DFS = `// Graphe sous forme de liste d'adjacence
// A(0)-B(1), A(0)-C(2), B(1)-D(3), C(2)-D(3)
const graph = [[1,2],[0,3],[0,3],[1,2]];

const result = dfs(graph, 0);
console.log("Ordre DFS depuis A:", result.join(" → "));`;

function stripTypeScript(code) {
  return code
    .replace(/:\s*number(\[\])?/g, "")
    .replace(/:\s*void/g, "")
    .replace(/:\s*string/g, "")
    .replace(/<number>/g, "")
    .replace(/\bas\s+\w+/g, "")
    .replace(/!/g, "")
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
  };
  try {
    // eslint-disable-next-line no-new-func
    new Function("console", full)(mockConsole);
  } catch (e) {
    logs.push({ type: "error", text: e.message });
  }
  return logs;
}

function CodePanel({ title, code, setCode, testCode, setTestCode, explanation, defaultTest, onReset }) {
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      setOutput(runCode(code, testCode));
      setRunning(false);
    }, 30);
  }

  return (
    <>
      <div className="panel mb-6">
        <div className="panel-header">
          <span>⌨️ {title}</span>
          <div className="flex gap-2">
            <button className="ctrl-btn !w-auto px-3 text-[12px] disabled:opacity-50" onClick={handleRun} disabled={running}>
              {running ? "⏳ Exécution…" : "▶ Exécuter"}
            </button>
            <button className="ctrl-btn !w-auto px-3 text-[12px]" onClick={onReset}>Reset</button>
          </div>
        </div>
        <div className="relative">
          <textarea
            className="w-full min-h-[280px] py-[18px] pr-[18px] pl-14 bg-code text-pri font-mono text-[13px] leading-[1.7] border-0 resize-y outline-none tab-2"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
          <div className="absolute left-0 top-0 w-11 py-[18px] pr-2 text-right text-mut font-mono text-[13px] leading-[1.7] pointer-events-none select-none bg-code border-r border-line">
            {code.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
        </div>
      </div>

      <div className="panel mb-6">
        <div className="panel-header">
          <span>🧪 Code de test</span>
          <button className="ctrl-btn !w-auto px-3 text-[12px]" onClick={() => setTestCode(defaultTest)}>Reset</button>
        </div>
        <div className="relative">
          <textarea
            className="w-full min-h-[100px] py-[18px] pr-[18px] pl-14 bg-code text-pri font-mono text-[13px] leading-[1.7] border-0 resize-y outline-none tab-2"
            value={testCode}
            onChange={(e) => setTestCode(e.target.value)}
            spellCheck={false}
          />
          <div className="absolute left-0 top-0 w-11 py-[18px] pr-2 text-right text-mut font-mono text-[13px] leading-[1.7] pointer-events-none select-none bg-code border-r border-line">
            {testCode.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
        </div>
      </div>

      {output !== null && (
        <div className="panel mb-6">
          <div className="panel-header">
            <span>💻 Console</span>
            <button className="ctrl-btn !w-auto px-3 text-[12px]" onClick={() => setOutput(null)}>Effacer</button>
          </div>
          <div className="min-h-[50px] p-4 bg-code font-mono text-[13px] leading-[1.8]">
            {output.length === 0 ? (
              <span className="text-mut italic">Aucune sortie</span>
            ) : (
              output.map((line, i) => (
                <div key={i} className={line.type === "error" ? "text-red-400" : line.type === "warn" ? "text-yellow-400" : "text-pri"}>
                  <span className="select-none mr-2 text-mut">{line.type === "error" ? "✗" : "›"}</span>
                  {line.text}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="panel mb-10">
        <div className="panel-header">💡 Structure du code</div>
        <div className="section-content">{formatContent(explanation)}</div>
      </div>
    </>
  );
}

export default function BfsDfsCodeTab() {
  const [activeCode, setActiveCode] = useState("bfs");
  const [bfsCode, setBfsCode] = useState(BFS_CODE);
  const [dfsCode, setDfsCode] = useState(DFS_CODE);
  const [bfsTest, setBfsTest] = useState(DEFAULT_TEST_BFS);
  const [dfsTest, setDfsTest] = useState(DEFAULT_TEST_DFS);

  return (
    <>
      <div className="flex gap-3 mb-6">
        <button
          className={`ctrl-btn !w-auto px-4 py-2 text-[13px] font-semibold ${activeCode === "bfs" ? "!bg-accent !text-white border-accent" : ""}`}
          onClick={() => setActiveCode("bfs")}
        >
          BFS
        </button>
        <button
          className={`ctrl-btn !w-auto px-4 py-2 text-[13px] font-semibold ${activeCode === "dfs" ? "!bg-accent !text-white border-accent" : ""}`}
          onClick={() => setActiveCode("dfs")}
        >
          DFS
        </button>
      </div>

      {activeCode === "bfs" && (
        <CodePanel
          title="BFS — Implémentation TypeScript"
          code={bfsCode}
          setCode={setBfsCode}
          testCode={bfsTest}
          setTestCode={setBfsTest}
          explanation={BFS_EXPLANATION}
          defaultTest={DEFAULT_TEST_BFS}
          onReset={() => { setBfsCode(BFS_CODE); }}
        />
      )}
      {activeCode === "dfs" && (
        <CodePanel
          title="DFS — Implémentation TypeScript"
          code={dfsCode}
          setCode={setDfsCode}
          testCode={dfsTest}
          setTestCode={setDfsTest}
          explanation={DFS_EXPLANATION}
          defaultTest={DEFAULT_TEST_DFS}
          onReset={() => { setDfsCode(DFS_CODE); }}
        />
      )}
    </>
  );
}
