import { useState } from "react";
import GraphVizBfsDfs from "../../components/graph/GraphVizBfsDfs";
import Controls       from "../../components/visualization/Controls";
import StepLog        from "../../components/visualization/StepLog";
import { useLang }    from "../../i18n/LangContext";

export default function BfsDfsVizTab({
  algo, onAlgoChange,
  currentGraph,
  currentStep, steps, stepIdx,
  isPlaying, speed,
  onPlay, onPause, onPrev, onNext, onFirst, onLast,
  onSpeedChange, onStepClick, onPreset,
}) {
  const { t, lang } = useLang();
  const visited  = currentStep?.visited  ?? [];
  const frontier = currentStep?.frontier ?? [];

  return (
    <>
      {/* ── Sélecteur d'algorithme ── */}
      <div className="flex gap-3 mb-5">
        <button
          className={`ctrl-btn !w-auto px-4 py-2 text-[13px] font-semibold transition-all ${algo === "bfs" ? "!bg-accent !text-white border-accent" : ""}`}
          onClick={() => onAlgoChange("bfs")}
        >
          BFS — Largeur
        </button>
        <button
          className={`ctrl-btn !w-auto px-4 py-2 text-[13px] font-semibold transition-all ${algo === "dfs" ? "!bg-accent !text-white border-accent" : ""}`}
          onClick={() => onAlgoChange("dfs")}
        >
          DFS — Profondeur
        </button>
      </div>

      {/* ── Ligne 1 : Graphe + Journal ── */}
      <div className="grid grid-cols-1 bp860:grid-cols-2 gap-5 mb-6">
        {/* Graphe */}
        <div className="panel">
          <div className="panel-header">
            <span>🔵 {t("bfsdfs.panel.graph")}</span>
            <div className="flex gap-[6px]">
              <button
                className="ctrl-btn !w-auto px-[10px] text-[11px] font-mono"
                onClick={() => onPreset("simple")}
              >
                {t("bfsdfs.preset.simple")}
              </button>
              <button
                className="ctrl-btn !w-auto px-[10px] text-[11px] font-mono"
                onClick={() => onPreset("complex")}
              >
                {t("bfsdfs.preset.complex")}
              </button>
            </div>
          </div>
          <div className="p-0">
            <GraphVizBfsDfs graph={currentGraph} step={currentStep} />
          </div>
        </div>

        {/* Journal */}
        <div className="panel">
          <div className="panel-header">{t("bfsdfs.panel.log")}</div>
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

      {/* ── Ligne 2 : État courant + Légende ── */}
      <div className="grid grid-cols-1 bp860:grid-cols-2 gap-5 mb-6">
        {/* État */}
        <div className="panel">
          <div className="panel-header">{t("bfsdfs.panel.state")}</div>
          <div className="panel-body">
            {currentStep ? (
              <div className="font-mono text-[13px] flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-mut">{algo === "bfs" ? t("bfsdfs.state.queue") : t("bfsdfs.state.stack")}</span>
                  <span className="text-pri font-semibold">
                    [{frontier.map((id) => currentGraph.nodes.find((n) => n.id === id)?.label ?? id).join(", ") || "—"}]
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mut">{t("bfsdfs.state.visited")}</span>
                  <span className="text-pri font-semibold">
                    [{visited.map((id) => currentGraph.nodes.find((n) => n.id === id)?.label ?? id).join(", ") || "—"}]
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mut">{t("bfsdfs.state.current")}</span>
                  <span className="text-pri font-semibold">
                    {currentStep.current !== null
                      ? currentGraph.nodes.find((n) => n.id === currentStep.current)?.label ?? currentStep.current
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mut">{t("bfsdfs.state.step")}</span>
                  <span className="text-pri font-semibold">{stepIdx + 1} / {steps.length}</span>
                </div>
              </div>
            ) : (
              <span className="text-mut text-[13px]">{t("bfsdfs.state.noStep")}</span>
            )}
          </div>
        </div>

        {/* Légende */}
        <div className="panel">
          <div className="panel-header">{t("bfsdfs.panel.legend")}</div>
          <div className="panel-body flex flex-col gap-2 text-[13px]">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: "var(--accent)", background: "var(--accent)" }} />
              <span>{t("bfsdfs.legend.current")}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: "var(--accent)", background: "var(--bg-card-hover)" }} />
              <span>{algo === "bfs" ? t("bfsdfs.legend.frontier.bfs") : t("bfsdfs.legend.frontier.dfs")}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: "var(--green)", background: "var(--bg-card-hover)" }} />
              <span>{t("bfsdfs.legend.visited")}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }} />
              <span>{t("bfsdfs.legend.unvisited")}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
