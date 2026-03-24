import GraphViz      from "../../components/graph/GraphViz";
import Controls      from "../../components/visualization/Controls";
import DistanceTable from "../../components/visualization/DistanceTable";
import StepLog       from "../../components/visualization/StepLog";
import HeapViz       from "../../components/visualization/HeapViz";
import { useLang } from "../../i18n/LangContext";

export default function VizTab({
  currentGraph,
  currentStep,
  steps,
  stepIdx,
  isPlaying,
  speed,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onFirst,
  onLast,
  onSpeedChange,
  onStepClick,
  onPreset,
}) {
  const { t } = useLang();
  const heap = currentStep?.heap ?? [];

  return (
    <>
      {/* ── Ligne 1 : Graphe + Journal ── */}
      <div className="grid grid-cols-1 bp860:grid-cols-2 gap-5 mb-10">
        {/* Graphe */}
        <div className="panel">
          <div className="panel-header">
            <span>{t("viz.panel.graph")}</span>
            <div className="flex gap-[6px]">
              <button
                className="ctrl-btn !w-auto px-[10px] text-[11px] font-mono"
                onClick={() => onPreset("simple")}
              >
                {t("viz.preset.simple")}
              </button>
              <button
                className="ctrl-btn !w-auto px-[10px] text-[11px] font-mono"
                onClick={() => onPreset("complex")}
              >
                {t("viz.preset.complex")}
              </button>
            </div>
          </div>
          <div className="p-0">
            <GraphViz graph={currentGraph} step={currentStep} />
          </div>
        </div>

        {/* Journal d'exécution */}
        <div className="panel">
          <div className="panel-header">{t("viz.panel.log")}</div>
          <div className="panel-body">
            <StepLog steps={steps} stepIdx={stepIdx} onStepClick={onStepClick} />
          </div>
        </div>
      </div>

      {/* ── Contrôles ── */}
      <div className="mb-6">
        <Controls
          stepIdx={stepIdx}
          stepsLength={steps.length}
          isPlaying={isPlaying}
          speed={speed}
          onPlay={onPlay}
          onPause={onPause}
          onPrev={onPrev}
          onNext={onNext}
          onFirst={onFirst}
          onLast={onLast}
          onSpeedChange={onSpeedChange}
        />
      </div>

      {/* ── Ligne 2 : Tableau des distances + MinHeap ── */}
      <div className="grid grid-cols-1 bp860:grid-cols-2 gap-5 mb-6">
        {/* Tableau des distances */}
        <div className="panel">
          <div className="panel-header">{t("viz.panel.distances")}</div>
          <div className="panel-body">
            <DistanceTable nodes={currentGraph.nodes} step={currentStep} />
          </div>
        </div>

        {/* MinHeap */}
        <div className="panel">
          <div className="panel-header">
            <span>{t("viz.panel.heap")}</span>
            <span className="text-[11px] font-medium text-mut font-mono bg-surface border border-line px-2 py-[2px] rounded-[6px]">
              {heap.length > 0
                ? `${heap.length} ${heap.length > 1 ? t("viz.heap.elements") : t("viz.heap.element")}`
                : t("viz.heap.empty")}
            </span>
          </div>
          <div className="px-2 py-3">
            <HeapViz heap={heap} step={currentStep} />
          </div>
        </div>
      </div>
    </>
  );
}
