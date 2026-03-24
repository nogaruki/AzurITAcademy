import GraphBuilder   from "../../components/interactive/GraphBuilder";
import GraphViz        from "../../components/graph/GraphViz";
import DistanceTable   from "../../components/visualization/DistanceTable";

export default function InteractiveTab({
  currentGraph,
  currentStep,
  steps,
  onGraphChange,
}) {
  const finalStep = steps[steps.length - 1] ?? null;

  return (
    <>
      <GraphBuilder onGraphChange={onGraphChange} />

      <div className="grid grid-cols-1 bp860:grid-cols-2 gap-5">
        {/* Custom graph viz */}
        <div className="panel">
          <div className="panel-header">🔵 Graphe personnalisé</div>
          <div className="p-0">
            <GraphViz graph={currentGraph} step={currentStep} />
          </div>
        </div>

        {/* Distances finales */}
        <div className="panel">
          <div className="panel-header">📊 Résultat final</div>
          <div className="panel-body">
            <DistanceTable nodes={currentGraph.nodes} step={finalStep} />
            <div className="mt-4 text-[13px] text-mut">
              Utilise l'onglet{" "}
              <strong className="text-sec">Visualisation</strong>{" "}
              pour rejouer l'animation pas-à-pas sur ce graphe.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
