import TreeViz  from "../../components/bst/TreeViz";
import Controls  from "../../components/visualization/Controls";
import StepLog   from "../../components/visualization/StepLog";
import { useLang } from "../../i18n/LangContext";

const STEP_COLOR = {
  init:       "var(--text-muted)",
  visit:      "var(--accent)",
  found:      "var(--green)",
  "not-found":"var(--orange)",
  insert:     "var(--cyan)",
  duplicate:  "var(--orange)",
  successor:  "var(--purple)",
  delete:     "var(--red)",
  done:       "var(--green)",
};

export default function BstVizTab({
  currentStep,
  steps,
  stepIdx,
  isPlaying,
  speed,
  operation, setOperation,
  inputVal, setInputVal,
  error,
  onPlay, onPause, onPrev, onNext, onFirst, onLast, onSpeedChange, onStepClick,
  onRun, onReset,
}) {
  const { t } = useLang();
  const step = currentStep;

  const OP_LABELS = {
    search: { icon: "🔍", label: t("bst.op.search") },
    insert: { icon: "➕", label: t("bst.op.insert") },
    delete: { icon: "🗑", label: t("bst.op.delete") },
  };

  function handleKey(e) {
    if (e.key === "Enter") onRun();
  }

  return (
    <>
      {/* ── Panneau d'opération ── */}
      <div className="panel mb-5">
        <div className="panel-header">{t("bst.panel.operation")}</div>
        <div className="panel-body flex flex-wrap items-center gap-3">
          {/* Sélection opération */}
          <div className="flex gap-2">
            {Object.entries(OP_LABELS).map(([op, { icon, label }]) => (
              <button
                key={op}
                onClick={() => setOperation(op)}
                className={`px-4 py-[7px] rounded-[10px] text-[13px] font-semibold border transition-all duration-150 cursor-pointer font-sans ${
                  operation === op
                    ? "bg-accent-dim border-accent text-accent-hi"
                    : "border-line text-mut hover:border-line-on hover:text-sec"
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          {/* Saisie valeur */}
          <input
            type="number"
            min="1" max="999"
            placeholder={t("bst.input.placeholder")}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKey}
            className="input-field !w-[110px]"
          />

          <button className="add-btn" onClick={onRun}>
            {t("bst.btn.run")}
          </button>

          <button
            className="ctrl-btn !w-auto px-3 text-[12px]"
            onClick={onReset}
            title={t("bst.btn.reset.title")}
          >
            {t("bst.btn.reset")}
          </button>

          {error && (
            <span className="text-c-red text-[12px] font-mono">{error}</span>
          )}
        </div>
      </div>

      {/* ── Ligne 1 : Arbre + Journal ── */}
      <div className="grid grid-cols-1 bp860:grid-cols-[2fr_1fr] gap-5 mb-5">
        {/* Arbre */}
        <div className="panel">
          <div className="panel-header">{t("bst.panel.tree")}</div>
          <div className="p-2 overflow-x-auto">
            <TreeViz tree={step?.tree ?? null} step={step} />
          </div>
        </div>

        {/* Journal */}
        <div className="panel">
          <div className="panel-header">{t("bst.panel.log")}</div>
          <div className="panel-body">
            <StepLog steps={steps} stepIdx={stepIdx} onStepClick={onStepClick} />
          </div>
        </div>
      </div>

      {/* ── Contrôles ── */}
      <div className="panel mb-5">
        <div className="panel-body">
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
      </div>

      {/* ── Ligne 2 : État courant + Légende ── */}
      <div className="grid grid-cols-1 bp860:grid-cols-2 gap-5 mb-6">
        {/* État */}
        <div className="panel">
          <div className="panel-header">{t("bst.panel.state")}</div>
          <div className="panel-body">
            {step ? (
              <div className="flex flex-col gap-2 text-[13px] font-mono">
                <div className="flex items-start gap-2">
                  <span
                    className="inline-block text-[10px] font-bold uppercase py-[2px] px-[8px] rounded-[4px] flex-shrink-0 mt-[2px]"
                    style={{
                      color: STEP_COLOR[step.type] ?? "var(--text-muted)",
                      background: "var(--bg-surface)",
                      border: `1px solid ${STEP_COLOR[step.type] ?? "var(--border)"}`,
                    }}
                  >
                    {step.type}
                  </span>
                  <span className="text-sec text-[12px] font-sans leading-[1.5]">{step.desc}</span>
                </div>
                <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-[12px]">
                  <div>
                    <span className="text-mut">{t("bst.state.currentNode")} : </span>
                    <span style={{ color: step.currentNode !== null ? "var(--accent)" : "var(--text-muted)" }}>
                      {step.currentNode ?? "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-mut">{t("bst.state.path")} : </span>
                    <span className="text-sec">{step.path?.length ? step.path.join(" → ") : "—"}</span>
                  </div>
                  {step.foundNode !== null && (
                    <div>
                      <span className="text-mut">{t("bst.state.found")} : </span>
                      <span className="text-c-green font-bold">{step.foundNode}</span>
                    </div>
                  )}
                  {step.successorNode !== null && (
                    <div>
                      <span className="text-mut">{t("bst.state.successor")} : </span>
                      <span style={{ color: "var(--purple)" }} className="font-bold">{step.successorNode}</span>
                    </div>
                  )}
                  {step.newNode !== null && (
                    <div>
                      <span className="text-mut">{t("bst.state.inserted")} : </span>
                      <span style={{ color: "var(--cyan)" }} className="font-bold">{step.newNode}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <span className="text-mut text-[13px]">{t("bst.state.empty")}</span>
            )}
          </div>
        </div>

        {/* Légende */}
        <div className="panel">
          <div className="panel-header">{t("bst.panel.legend")}</div>
          <div className="panel-body flex flex-col gap-2 text-[13px]">
            {[
              ["var(--accent)",  t("bst.legend.examining")],
              ["var(--green)",   t("bst.legend.found")],
              ["var(--cyan)",    t("bst.legend.inserted")],
              ["var(--orange)",  t("bst.legend.toDelete")],
              ["var(--purple)",  t("bst.legend.successor")],
              ["var(--bg-card-hover)", t("bst.legend.path")],
            ].map(([color, label]) => (
              <div key={label} className="flex items-center gap-[10px]">
                <span
                  className="w-[14px] h-[14px] rounded-full flex-shrink-0"
                  style={{ background: color, border: `1px solid ${color}` }}
                />
                <span className="text-sec">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
