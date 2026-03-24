import { useCustomGraph } from "../../hooks/useCustomGraph";

const labelClass = "text-[11px] font-semibold text-mut uppercase tracking-[0.5px]";

export default function GraphBuilder({ onGraphChange }) {
  const {
    customNodes, setCustomNodes,
    customEdges,
    edgeFrom,    setEdgeFrom,
    edgeTo,      setEdgeTo,
    edgeWeight,  setEdgeWeight,
    addEdge,
    removeEdge,
    clearEdges,
    runCustom,
  } = useCustomGraph(onGraphChange);

  return (
    <div className="bg-card border border-line rounded-[14px] p-6 mb-10">
      <h3 className="text-[16px] font-bold mb-4 flex items-center gap-2">🎮 Construis ton graphe</h3>

      {/* Nodes */}
      <div className="flex gap-3 items-end flex-wrap mb-4">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Sommets (IDs séparés par virgule)</label>
          <input
            className="input-field wide"
            value={customNodes}
            onChange={(e) => setCustomNodes(e.target.value)}
            placeholder="0,1,2,3"
          />
        </div>
      </div>

      {/* Add edge */}
      <div className="flex gap-3 items-end flex-wrap mb-4">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>De</label>
          <input
            className="input-field !w-[60px]"
            value={edgeFrom}
            onChange={(e) => setEdgeFrom(e.target.value)}
            placeholder="0"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Vers</label>
          <input
            className="input-field !w-[60px]"
            value={edgeTo}
            onChange={(e) => setEdgeTo(e.target.value)}
            placeholder="1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Poids</label>
          <input
            className="input-field !w-[60px]"
            value={edgeWeight}
            onChange={(e) => setEdgeWeight(e.target.value)}
            placeholder="5"
          />
        </div>
        <button className="add-btn" onClick={addEdge}>
          + Ajouter arête
        </button>
      </div>

      {/* Edge list */}
      <div className="flex flex-wrap gap-2 mb-4">
        {customEdges.map((e, i) => (
          <div
            key={i}
            className="flex items-center gap-[6px] px-3 py-[6px] rounded-lg bg-surface border border-line font-mono text-[12px] text-sec"
          >
            {e.from} → {e.to} ({e.weight})
            <button
              className="bg-transparent border-0 text-c-red cursor-pointer text-[14px] leading-none"
              onClick={() => removeEdge(i)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="add-btn" onClick={runCustom}>
          ▶ Lancer Dijkstra
        </button>
        <button
          className="px-[18px] py-2 rounded-lg border border-line bg-transparent text-sec text-[13px] font-semibold cursor-pointer transition-all duration-150 font-sans hover:bg-card"
          onClick={clearEdges}
        >
          Vider les arêtes
        </button>
      </div>
    </div>
  );
}
