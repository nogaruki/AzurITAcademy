import { useState } from "react";
import ArrayViz  from "../../components/array/ArrayViz";
import Controls  from "../../components/visualization/Controls";
import StepLog   from "../../components/visualization/StepLog";
import { useLang } from "../../i18n/LangContext";

const STEP_COLOR = {
  init:      "var(--text-muted)",
  pivot:     "var(--accent)",
  compare:   "var(--orange)",
  swap:      "var(--green)",
  noswap:    "var(--text-secondary)",
  partition: "var(--cyan)",
  sorted:    "var(--green)",
  done:      "var(--green)",
};

export default function QuicksortVizTab({
  currentArray,
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
  onCustomArray,
}) {
  const { t } = useLang();
  const step = currentStep;

  // ── Éditeur de tableau personnalisé ──
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);

  function parseArray(raw) {
    const nums = raw
      .split(/[\s,]+/)
      .filter(Boolean)
      .map(Number);
    if (
      nums.length < 2 ||
      nums.length > 12 ||
      nums.some((n) => !Number.isInteger(n) || n < 1 || n > 999)
    )
      return null;
    return nums;
  }

  function applyCustom() {
    const arr = parseArray(inputValue);
    if (!arr) { setInputError(true); return; }
    setInputError(false);
    setInputValue("");
    onCustomArray(arr);
  }

  function applyRandom() {
    const len = 5 + Math.floor(Math.random() * 5); // 5–9 éléments
    const arr = Array.from({ length: len }, () => 1 + Math.floor(Math.random() * 99));
    setInputValue("");
    setInputError(false);
    onCustomArray(arr);
  }

  function handleKey(e) {
    if (e.key === "Enter") applyCustom();
  }

  return (
    <>
      {/* ── Ligne 1 : Tableau + Journal ── */}
      <div className="grid grid-cols-1 bp860:grid-cols-[2fr_1fr] gap-5 mb-5">
        {/* Visualisation des barres */}
        <div className="panel">
          <div className="panel-header">
            <span>{t("qs.panel.array")}</span>
            <div className="flex gap-[6px]">
              <button
                className="ctrl-btn !w-auto px-[10px] text-[11px] font-mono"
                onClick={() => onPreset("default")}
              >
                {t("qs.preset.default")}
              </button>
              <button
                className="ctrl-btn !w-auto px-[10px] text-[11px] font-mono"
                onClick={() => onPreset("reversed")}
              >
                {t("qs.preset.reversed")}
              </button>
              <button
                className="ctrl-btn !w-auto px-[10px] text-[11px] font-mono"
                onClick={() => onPreset("small")}
              >
                {t("qs.preset.small")}
              </button>
            </div>
          </div>
          {/* ── Éditeur tableau personnalisé ── */}
          <div
            className="px-4 py-3 border-b border-line flex flex-wrap items-center gap-2"
            style={{ background: "var(--bg-card)" }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => { setInputValue(e.target.value); setInputError(false); }}
              onKeyDown={handleKey}
              placeholder={t("qs.custom.placeholder")}
              spellCheck={false}
              className={`
                flex-1 min-w-[180px] font-mono text-[12px] px-3 py-[6px]
                rounded-[6px] border outline-none transition-all duration-150
                bg-surface text-pri
                ${inputError
                  ? "border-c-red focus:border-c-red"
                  : "border-line focus:border-accent focus:ring-1 focus:ring-accent/30"
                }
              `}
            />
            <button
              className="add-btn !px-3 !py-[6px] !text-[12px] !h-auto"
              onClick={applyCustom}
            >
              {t("qs.custom.apply")}
            </button>
            <button
              className="ctrl-btn !w-auto px-3 text-[12px]"
              onClick={applyRandom}
            >
              🎲 {t("qs.custom.random")}
            </button>
            {inputError && (
              <span className="w-full text-[11px] font-mono text-c-red leading-[1.4]">
                ⚠ {t("qs.custom.error")}
              </span>
            )}
            <div className="flex gap-1 flex-wrap">
              {currentArray.map((v, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] px-[6px] py-[2px] rounded-[4px] border border-line text-sec"
                  style={{ background: "var(--bg-deep)" }}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
          <div className="p-0">
            <ArrayViz array={step?.array ?? currentArray} step={step} />
          </div>
        </div>

        {/* Journal d'exécution */}
        <div className="panel">
          <div className="panel-header">{t("qs.panel.log")}</div>
          <div className="panel-body">
            <StepLog steps={steps} stepIdx={stepIdx} onStepClick={onStepClick} />
          </div>
        </div>
      </div>

      {/* ── Contrôles ── */}
      <div className="mb-5">
        <div className="panel">
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
      </div>

      {/* ── Ligne 2 : État courant + Légende ── */}
      <div className="grid grid-cols-1 bp860:grid-cols-2 gap-5 mb-6">
        {/* État de l'étape */}
        <div className="panel">
          <div className="panel-header">{t("qs.panel.state")}</div>
          <div className="panel-body">
            {step ? (
              <div className="font-mono text-[13px] flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block text-[10px] font-bold uppercase py-[2px] px-[8px] rounded-[4px]"
                    style={{
                      color: STEP_COLOR[step.type] ?? "var(--text-muted)",
                      background: "var(--bg-surface)",
                      border: `1px solid ${STEP_COLOR[step.type] ?? "var(--border)"}`,
                    }}
                  >
                    {step.type}
                  </span>
                  <span className="text-sec text-[12px] font-sans leading-[1.4]">{step.desc}</span>
                </div>

                <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-[12px]">
                  <div>
                    <span className="text-mut">{t("qs.state.subarray")} : </span>
                    <span className="text-pri">[{step.left}…{step.right}]</span>
                  </div>
                  <div>
                    <span className="text-mut">{t("qs.state.pivotIdx")} : </span>
                    <span style={{ color: step.pivotIdx !== null ? "var(--accent)" : "var(--text-muted)" }}>
                      {step.pivotIdx !== null ? `arr[${step.pivotIdx}] = ${step.array[step.pivotIdx]}` : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-mut">{t("qs.state.boundary")} : </span>
                    <span className="text-pri">{step.i !== null ? step.i : "—"}</span>
                  </div>
                  <div>
                    <span className="text-mut">{t("qs.state.scan")} : </span>
                    <span style={{ color: step.j !== null ? "var(--orange)" : "var(--text-muted)" }}>
                      {step.j !== null ? `arr[${step.j}] = ${step.array[step.j]}` : "—"}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-mut">{t("qs.state.sorted")} : </span>
                    <span className="text-c-green">
                      {step.sortedIndices.length > 0
                        ? step.sortedIndices.sort((a, b) => a - b).join(", ")
                        : t("qs.state.none")}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <span className="text-mut text-[13px]">{t("qs.state.noStep")}</span>
            )}
          </div>
        </div>

        {/* Légende */}
        <div className="panel">
          <div className="panel-header">{t("qs.panel.legend")}</div>
          <div className="panel-body">
            <div className="flex flex-col gap-2 text-[13px]">
              {[
                ["var(--green)",      t("qs.legend.sorted")],
                ["var(--accent)",     t("qs.legend.pivot")],
                ["var(--orange)",     t("qs.legend.compared")],
                ["var(--cyan)",       t("qs.legend.boundary")],
                ["var(--text-muted)", t("qs.legend.inactive")],
              ].map(([color, label]) => (
                <div key={label} className="flex items-center gap-[10px]">
                  <span
                    className="w-[14px] h-[14px] rounded-[3px] flex-shrink-0"
                    style={{ background: color, border: `1px solid ${color}` }}
                  />
                  <span className="text-sec">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
