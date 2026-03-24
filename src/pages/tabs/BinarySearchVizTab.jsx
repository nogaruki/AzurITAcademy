import { useState } from "react";
import BinarySearchArrayViz from "../../components/array/BinarySearchArrayViz";
import Controls             from "../../components/visualization/Controls";
import StepLog              from "../../components/visualization/StepLog";
import { useLang }          from "../../i18n/LangContext";

const STEP_COLOR = {
  init:      "var(--text-muted)",
  compare:   "var(--accent)",
  done:      "var(--green)",
  not_found: "var(--orange)",
};

export default function BinarySearchVizTab({
  currentArray,
  target,
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
  onTargetChange,
}) {
  const { t } = useLang();
  const step = currentStep;

  // ── Éditeur tableau personnalisé ──
  const [arrayInput,  setArrayInput]  = useState("");
  const [targetInput, setTargetInput] = useState("");
  const [arrayError,  setArrayError]  = useState(false);
  const [targetError, setTargetError] = useState(false);

  function parseSortedArray(raw) {
    const nums = raw.split(/[\s,]+/).filter(Boolean).map(Number);
    if (
      nums.length < 2 ||
      nums.length > 14 ||
      nums.some((n) => !Number.isInteger(n) || n < 1 || n > 999)
    ) return null;
    // Trier silencieusement
    return [...nums].sort((a, b) => a - b);
  }

  function applyCustom() {
    const arr = parseSortedArray(arrayInput);
    if (!arr) { setArrayError(true); return; }
    setArrayError(false);
    setArrayInput("");
    onCustomArray(arr);
  }

  function applyTarget() {
    const n = Number(targetInput);
    if (!Number.isInteger(n) || n < 1 || n > 999) { setTargetError(true); return; }
    setTargetError(false);
    setTargetInput("");
    onTargetChange(n);
  }

  function handleArrayKey(e)  { if (e.key === "Enter") applyCustom(); }
  function handleTargetKey(e) { if (e.key === "Enter") applyTarget(); }

  return (
    <>
      {/* ── Ligne 1 : Tableau + Journal ── */}
      <div className="grid grid-cols-1 bp860:grid-cols-[2fr_1fr] gap-5 mb-5">
        {/* Visualisation */}
        <div className="panel">
          <div className="panel-header">
            <span>{t("bs.panel.array")}</span>
            <div className="flex gap-[6px]">
              <button
                className="ctrl-btn !w-auto px-[10px] text-[11px] font-mono"
                onClick={() => onPreset("default")}
              >
                {t("bs.preset.default")}
              </button>
              <button
                className="ctrl-btn !w-auto px-[10px] text-[11px] font-mono"
                onClick={() => onPreset("small")}
              >
                {t("bs.preset.small")}
              </button>
              <button
                className="ctrl-btn !w-auto px-[10px] text-[11px] font-mono"
                onClick={() => onPreset("notfound")}
              >
                {t("bs.preset.notfound")}
              </button>
            </div>
          </div>

          {/* Éditeur tableau + cible */}
          <div
            className="px-4 py-3 border-b border-line flex flex-col gap-2"
            style={{ background: "var(--bg-card)" }}
          >
            {/* Tableau personnalisé */}
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={arrayInput}
                onChange={(e) => { setArrayInput(e.target.value); setArrayError(false); }}
                onKeyDown={handleArrayKey}
                placeholder={t("bs.array.placeholder")}
                spellCheck={false}
                className={`
                  flex-1 min-w-[180px] font-mono text-[12px] px-3 py-[6px]
                  rounded-[6px] border outline-none transition-all duration-150
                  bg-surface text-pri
                  ${arrayError
                    ? "border-c-red focus:border-c-red"
                    : "border-line focus:border-accent focus:ring-1 focus:ring-accent/30"
                  }
                `}
              />
              <button className="add-btn !px-3 !py-[6px] !text-[12px] !h-auto" onClick={applyCustom}>
                {t("bs.array.apply")}
              </button>
              {arrayError && (
                <span className="w-full text-[11px] font-mono text-c-red leading-[1.4]">
                  ⚠ {t("bs.array.error")}
                </span>
              )}
            </div>

            {/* Cible */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] text-sec font-mono flex-shrink-0">{t("bs.target.label")} :</span>
              <input
                type="number"
                value={targetInput}
                onChange={(e) => { setTargetInput(e.target.value); setTargetError(false); }}
                onKeyDown={handleTargetKey}
                placeholder={t("bs.target.placeholder")}
                className={`
                  w-[120px] font-mono text-[12px] px-3 py-[6px]
                  rounded-[6px] border outline-none transition-all duration-150
                  bg-surface text-pri
                  ${targetError
                    ? "border-c-red focus:border-c-red"
                    : "border-line focus:border-accent focus:ring-1 focus:ring-accent/30"
                  }
                `}
              />
              <button className="add-btn !px-3 !py-[6px] !text-[12px] !h-auto" onClick={applyTarget}>
                {t("bs.target.apply")}
              </button>
              <span
                className="font-mono text-[12px] px-3 py-[4px] rounded-[6px] border border-line"
                style={{ background: "var(--accent-dim)", color: "var(--accent-bright)" }}
              >
                {t("bs.target.current")} : <strong>{step?.target ?? currentStep?.target ?? "—"}</strong>
              </span>
              {targetError && (
                <span className="w-full text-[11px] font-mono text-c-red leading-[1.4]">
                  ⚠ {t("bs.target.error")}
                </span>
              )}
            </div>

            {/* Tableau actuel */}
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
            <BinarySearchArrayViz array={step?.array ?? currentArray} step={step} />
          </div>
        </div>

        {/* Journal d'exécution */}
        <div className="panel">
          <div className="panel-header">{t("bs.panel.log")}</div>
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
          <div className="panel-header">{t("bs.panel.state")}</div>
          <div className="panel-body">
            {step ? (
              <div className="font-mono text-[13px] flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block text-[10px] font-bold uppercase py-[2px] px-[8px] rounded-[4px]"
                    style={{
                      color:      STEP_COLOR[step.type] ?? "var(--text-muted)",
                      background: "var(--bg-surface)",
                      border:     `1px solid ${STEP_COLOR[step.type] ?? "var(--border)"}`,
                    }}
                  >
                    {step.type}
                  </span>
                  <span className="text-sec text-[12px] font-sans leading-[1.4]">{step.desc}</span>
                </div>

                <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-[12px]">
                  <div>
                    <span className="text-mut">{t("bs.state.range")} : </span>
                    <span className="text-pri">
                      {step.type !== "init" && step.type !== "not_found" && step.type !== "done"
                        ? `[${step.left}…${step.right}]`
                        : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-mut">{t("bs.state.mid")} : </span>
                    <span style={{ color: step.mid !== null ? "var(--accent)" : "var(--text-muted)" }}>
                      {step.mid !== null ? `arr[${step.mid}] = ${step.array[step.mid]}` : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-mut">{t("bs.state.target")} : </span>
                    <span style={{ color: "var(--accent-bright)" }}>{step.target}</span>
                  </div>
                  <div>
                    <span className="text-mut">{t("bs.state.result")} : </span>
                    <span style={{
                      color: step.type === "done"
                        ? "var(--green)"
                        : step.type === "not_found"
                          ? "var(--orange)"
                          : "var(--text-muted)",
                      fontWeight: step.type === "done" || step.type === "not_found" ? "700" : "400",
                    }}>
                      {step.type === "done"
                        ? `✓ trouvé idx ${step.mid}`
                        : step.type === "not_found"
                          ? "✗ absent"
                          : "—"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <span className="text-mut text-[13px]">{t("bs.state.noStep")}</span>
            )}
          </div>
        </div>

        {/* Légende */}
        <div className="panel">
          <div className="panel-header">{t("bs.panel.legend")}</div>
          <div className="panel-body">
            <div className="flex flex-col gap-2 text-[13px]">
              {[
                ["var(--green)",      t("bs.legend.found")],
                ["var(--accent)",     t("bs.legend.mid")],
                ["var(--bg-deep)",    t("bs.legend.inactive")],
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
