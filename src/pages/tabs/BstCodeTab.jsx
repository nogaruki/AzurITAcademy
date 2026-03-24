import { useState } from "react";
import { BST_CODE } from "../../data/bstCode";
import { formatContent } from "../../utils/formatContent";

const STRUCTURE_EXPLANATION =
  `**TreeNode** — Nœud de l'arbre avec une valeur et deux références (gauche, droite), initialisées à null.\n\n**insert()** — Descend récursivement : gauche si val < nœud, droite si val > nœud, jusqu'à un emplacement vide où il crée un nouveau nœud. Les doublons sont ignorés.\n\n**search()** — Même logique de descente. Retourne true si la valeur est trouvée, false si on atteint null.\n\n**delete()** — Trois cas : (1) feuille → null, (2) un seul enfant → retourner l'enfant, (3) deux enfants → remplacer par le successeur infixe (_min du sous-arbre droit) puis supprimer le successeur.\n\n**inorder()** — Parcours gauche → racine → droite. Produit les valeurs dans l'ordre croissant grâce à la propriété ABR.`;

const DEFAULT_TEST_CODE = `// Construction et opérations
const bst = new BST();
[50, 30, 70, 20, 40, 60, 80].forEach(v => bst.insert(v));

console.log("Parcours infixe :", bst.inorder().join(", "));
console.log("Recherche 40 :", bst.search(40));
console.log("Recherche 55 :", bst.search(55));

bst.insert(35);
console.log("Après insertion 35 :", bst.inorder().join(", "));

bst.delete(30);
console.log("Après suppression 30 :", bst.inorder().join(", "));`;

function stripTypeScript(code) {
  return code
    .replace(/:\s*number(\[\])?/g, "")
    .replace(/:\s*void/g, "")
    .replace(/:\s*boolean/g, "")
    .replace(/:\s*string/g, "")
    .replace(/:\s*TreeNode(\s*\|\s*null)?/g, "")
    .replace(/\bprivate\s+/g, "")
    .replace(/\bpublic\s+/g, "")
    .trim();
}

function formatValue(v) {
  if (v === null || v === undefined) return String(v);
  if (typeof v === "object") { try { return JSON.stringify(v); } catch { return String(v); } }
  return String(v);
}

function runCode(mainCode, testCode) {
  const jsCode = stripTypeScript(mainCode);
  const full = jsCode + "\n" + testCode;
  const logs = [];
  const mockConsole = {
    log:   (...a) => logs.push({ type: "log",   text: a.map(formatValue).join(" ") }),
    error: (...a) => logs.push({ type: "error", text: a.map(formatValue).join(" ") }),
    warn:  (...a) => logs.push({ type: "warn",  text: a.map(formatValue).join(" ") }),
    info:  (...a) => logs.push({ type: "log",   text: a.map(formatValue).join(" ") }),
  };
  try {
    // eslint-disable-next-line no-new-func
    new Function("console", full)(mockConsole);
  } catch (e) {
    logs.push({ type: "error", text: e.message });
  }
  return logs;
}

export default function BstCodeTab() {
  const [code, setCode]         = useState(BST_CODE);
  const [testCode, setTestCode] = useState(DEFAULT_TEST_CODE);
  const [output, setOutput]     = useState(null);
  const [running, setRunning]   = useState(false);

  function handleRun() {
    setRunning(true);
    setTimeout(() => { setOutput(runCode(code, testCode)); setRunning(false); }, 30);
  }

  return (
    <>
      <div className="panel mb-6">
        <div className="panel-header">
          <span>⌨️ Implémentation TypeScript — TreeNode + BST</span>
          <div className="flex gap-2">
            <button className="ctrl-btn !w-auto px-3 text-[12px] disabled:opacity-50" onClick={handleRun} disabled={running}>
              {running ? "⏳ Exécution…" : "▶ Exécuter"}
            </button>
            <button className="ctrl-btn !w-auto px-3 text-[12px]" onClick={() => { setCode(BST_CODE); setOutput(null); }}>
              Reset
            </button>
          </div>
        </div>
        <div className="relative">
          <textarea
            className="w-full min-h-[480px] py-[18px] pr-[18px] pl-14 bg-code text-pri font-mono text-[13px] leading-[1.7] border-0 resize-y outline-none tab-2 transition-[background-color,color] duration-[350ms]"
            value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false}
          />
          <div className="absolute left-0 top-0 w-11 py-[18px] pr-2 text-right text-mut font-mono text-[13px] leading-[1.7] pointer-events-none select-none bg-code border-r border-line">
            {code.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
        </div>
      </div>

      <div className="panel mb-6">
        <div className="panel-header">
          <span>🧪 Code de test</span>
          <button className="ctrl-btn !w-auto px-3 text-[12px]" onClick={() => setTestCode(DEFAULT_TEST_CODE)}>Reset</button>
        </div>
        <div className="relative">
          <textarea
            className="w-full min-h-[140px] py-[18px] pr-[18px] pl-14 bg-code text-pri font-mono text-[13px] leading-[1.7] border-0 resize-y outline-none tab-2 transition-[background-color,color] duration-[350ms]"
            value={testCode} onChange={(e) => setTestCode(e.target.value)} spellCheck={false}
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
          <div className="min-h-[60px] p-4 bg-code font-mono text-[13px] leading-[1.8]">
            {output.length === 0 ? <span className="text-mut italic">Aucune sortie</span> : output.map((line, i) => (
              <div key={i} className={line.type === "error" ? "text-red-400" : line.type === "warn" ? "text-yellow-400" : "text-pri"}>
                <span className="select-none mr-2 text-mut">{line.type === "error" ? "✗" : "›"}</span>
                {line.text}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="panel mb-6">
        <div className="panel-header">💡 Structure du code</div>
        <div className="section-content">{formatContent(STRUCTURE_EXPLANATION)}</div>
      </div>
    </>
  );
}
