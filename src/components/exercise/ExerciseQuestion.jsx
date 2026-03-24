import { useState, useRef } from "react";
import { useLang } from "../../i18n/LangContext";

/**
 * ExerciseQuestion — Affiche un exercice "code à trou".
 * Le code template utilise ___ comme marqueur de blanc.
 * `blanks`      : tableau des réponses attendues dans l'ordre.
 * `guide`       : (optionnel) tableau d'étapes pour guider la résolution.
 * `explanation` : (optionnel) explication narrative de la correction.
 *
 * Boutons disponibles :
 *  ✅ Vérifier     — corrige chaque trou (vert/rouge)
 *  ↺ Réinitialiser
 *  💡 Guide        — indices étape par étape (si fourni)
 *  ⚠️ Mes erreurs  — liste les trous incorrects avec la réponse attendue + indice
 *  👁 Trou par trou — affiche la réponse correcte en badge inline sous chaque trou
 *  ✅ Correction   — affiche le code complet reconstitué + explication
 *  Voir les réponses — remplit tous les trous avec les bonnes réponses
 */
export default function ExerciseQuestion({ exercise, index }) {
  const { t } = useLang();
  const { title, description, code, blanks, guide, explanation } = exercise;

  const parts = code.split("___");

  const [answers, setAnswers]       = useState(() => Array(blanks.length).fill(""));
  const [checked, setChecked]       = useState(false);
  const [revealed, setRevealed]     = useState(false);
  const [showGuide, setShowGuide]   = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [showPeek, setShowPeek]     = useState(false);

  const inputRefs = useRef([]);

  const correct  = answers.map((a, i) => a.trim() === blanks[i]);
  const score    = correct.filter(Boolean).length;
  const allOk    = score === blanks.length;
  const hasError = checked && !allOk;

  const wrongIndices = blanks
    .map((_, i) => i)
    .filter((i) => checked && !correct[i]);

  const fullSolution = parts.reduce(
    (acc, part, i) => acc + part + (i < blanks.length ? blanks[i] : ""),
    ""
  );

  function handleChange(i, value) {
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
    if (checked) {
      setChecked(false);
      setShowErrors(false);
    }
  }

  function handleKeyDown(e, i) {
    if (e.key === "Enter") {
      e.preventDefault();
      const next = inputRefs.current[i + 1];
      if (next) next.focus();
      else setChecked(true);
    }
  }

  function check() {
    setChecked(true);
    setShowErrors(false);
  }

  function reset() {
    setAnswers(Array(blanks.length).fill(""));
    setChecked(false);
    setRevealed(false);
    setShowErrors(false);
    setShowPeek(false);
    inputRefs.current[0]?.focus();
  }

  function reveal() {
    setAnswers([...blanks]);
    setChecked(true);
    setRevealed(true);
    setShowErrors(false);
  }

  return (
    <div className="panel mb-5">
      {/* ── En-tête ── */}
      <div className="panel-header">
        <span>
          <span className="text-mut mr-2 font-mono text-[11px]">#{index + 1}</span>
          {title}
        </span>
        {checked && (
          <span
            className={`text-[11px] font-mono px-2 py-[2px] rounded-[6px] border ${
              allOk
                ? "text-c-green bg-c-green-dim border-c-green"
                : "text-c-orange bg-c-orange-dim border-c-orange"
            }`}
          >
            {score}/{blanks.length}
          </span>
        )}
      </div>

      <div className="panel-body">
        {/* ── Description ── */}
        <p className="text-sec text-[13px] leading-[1.6] mb-4">{description}</p>

        {/* ── Zone code avec blancs ── */}
        <div
          className="rounded-[10px] border border-line overflow-x-auto mb-4"
          style={{ background: "var(--bg-deep)" }}
        >
          <pre className="p-4 text-[13px] font-mono leading-[1.8] m-0 whitespace-pre-wrap">
            {parts.map((part, i) => (
              <span key={i}>
                <span className="text-pri">{part}</span>
                {i < blanks.length && (
                  <span className="inline-flex flex-col items-start">
                    <input
                      ref={(el) => (inputRefs.current[i] = el)}
                      type="text"
                      value={answers[i]}
                      onChange={(e) => handleChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      spellCheck={false}
                      autoComplete="off"
                      style={{
                        width: `${Math.max(4, blanks[i].length + 1)}ch`,
                        minWidth: "4ch",
                      }}
                      className={`
                        inline-block font-mono text-[13px] leading-[1] px-[6px] py-[2px]
                        rounded-[4px] border outline-none transition-all duration-150
                        bg-surface text-pri
                        ${checked
                          ? correct[i]
                            ? "border-c-green text-c-green bg-c-green-dim"
                            : "border-c-red text-c-red bg-c-red-dim"
                          : "border-accent focus:border-accent focus:ring-1 focus:ring-accent/30"
                        }
                      `}
                    />
                    {/* ── Badge trou par trou ── */}
                    {showPeek && (
                      <span
                        className="inline-block mt-[2px] px-[5px] py-[1px] rounded-[4px] font-mono text-[10px] leading-[1.4] border"
                        style={{
                          color: "var(--c-green)",
                          borderColor: "var(--c-green)",
                          background: "var(--green-glow)",
                        }}
                      >
                        → {blanks[i]}
                      </span>
                    )}
                  </span>
                )}
              </span>
            ))}
          </pre>
        </div>

        {/* ── Feedback vérification ── */}
        {checked && (
          <div
            className={`text-[13px] px-4 py-2 rounded-[8px] border mb-4 font-mono ${
              allOk
                ? "text-c-green bg-c-green-dim border-c-green"
                : "text-c-orange bg-c-orange-dim border-c-orange"
            }`}
          >
            {allOk
              ? t("exercise.feedback.perfect")
              : revealed
                ? t("exercise.feedback.revealed")
                : `${score}/${blanks.length} — ${t("exercise.feedback.partial")}`}
          </div>
        )}

        {/* ── Panneau Mes erreurs ── */}
        {showErrors && hasError && (
          <div className="rounded-[10px] border border-c-red/40 mb-4 overflow-hidden">
            <div
              className="px-4 py-[10px] border-b border-c-red/30 flex items-center gap-2"
              style={{ background: "color-mix(in srgb, var(--c-red, #f87171) 10%, transparent)" }}
            >
              <span className="text-c-red text-[13px] font-semibold">
                ⚠️ {t("exercise.errors.heading")}
              </span>
            </div>
            <div className="p-4 flex flex-col gap-3" style={{ background: "var(--bg-card)" }}>
              {wrongIndices.map((i) => (
                <div key={i} className="flex flex-col gap-[6px]">
                  <div className="flex items-start gap-3 flex-wrap">
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-[2px] rounded-[4px] border flex-shrink-0"
                      style={{
                        color: "var(--c-red, #f87171)",
                        borderColor: "var(--c-red, #f87171)",
                        background: "color-mix(in srgb, var(--c-red, #f87171) 10%, transparent)",
                      }}
                    >
                      {t("exercise.errors.blank")} #{i + 1}
                    </span>
                    <span className="text-[12px] text-sec font-mono">
                      <span className="text-mut">{t("exercise.errors.given")} : </span>
                      <span
                        className="px-[5px] py-[1px] rounded-[4px] border"
                        style={{
                          color: "var(--c-red, #f87171)",
                          borderColor: "var(--c-red, #f87171)",
                          background: "color-mix(in srgb, var(--c-red, #f87171) 10%, transparent)",
                        }}
                      >
                        {answers[i] || "—"}
                      </span>
                      <span className="text-mut mx-2">→</span>
                      <span className="text-mut">{t("exercise.errors.expected")} : </span>
                      <span
                        className="px-[5px] py-[1px] rounded-[4px] border"
                        style={{
                          color: "var(--c-green)",
                          borderColor: "var(--c-green)",
                          background: "var(--green-glow)",
                        }}
                      >
                        {blanks[i]}
                      </span>
                    </span>
                  </div>
                  {guide && guide[i] && (
                    <p className="text-[12px] text-sec leading-[1.55] pl-2 border-l-2 border-accent/40 ml-1">
                      <span className="text-mut text-[11px] font-mono">{t("exercise.errors.hint")} : </span>
                      {guide[i]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Panneau Guide ── */}
        {showGuide && guide && guide.length > 0 && (
          <div className="rounded-[10px] border border-accent/40 mb-4 overflow-hidden">
            <div
              className="px-4 py-[10px] border-b border-accent/30 flex items-center gap-2"
              style={{ background: "var(--accent-glow)" }}
            >
              <span className="text-accent text-[13px] font-semibold">
                💡 {t("exercise.guide.heading")}
              </span>
            </div>
            <div className="p-4" style={{ background: "var(--bg-card)" }}>
              <ol className="flex flex-col gap-[10px]">
                {guide.map((hint, i) => (
                  <li key={i} className="flex gap-3 text-[13px] text-sec leading-[1.55]">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-[1px]"
                      style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
                    >
                      {i + 1}
                    </span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* ── Actions ── */}
        <div className="flex gap-2 flex-wrap">
          {/* Vérifier */}
          <button className="add-btn" onClick={check}>
            {t("exercise.btn.check")}
          </button>

          {/* Réinitialiser */}
          <button
            className="ctrl-btn !w-auto px-3 text-[12px]"
            onClick={reset}
            title={t("exercise.btn.reset")}
          >
            ↺
          </button>

          {/* ⚠️ Mes erreurs — visible après une vérification incorrecte */}
          {hasError && (
            <button
              className={`ctrl-btn !w-auto px-3 text-[12px] transition-colors duration-150 ${
                showErrors
                  ? "border-c-red bg-c-red-dim"
                  : "text-sec"
              }`}
              style={showErrors ? { color: "var(--c-red, #f87171)" } : {}}
              onClick={() => setShowErrors((v) => !v)}
            >
              {t("exercise.btn.errors")}
            </button>
          )}

          {/* 👁 Trou par trou */}
          <button
            className={`ctrl-btn !w-auto px-3 text-[12px] transition-colors duration-150 ${
              showPeek ? "text-c-green border-c-green bg-c-green-dim" : "text-sec"
            }`}
            onClick={() => setShowPeek((v) => !v)}
          >
            {showPeek ? t("exercise.btn.hidepeek") : t("exercise.btn.peekblanks")}
          </button>

          {/* 💡 Guide */}
          {guide && guide.length > 0 && (
            <button
              className={`ctrl-btn !w-auto px-3 text-[12px] transition-colors duration-150 ${
                showGuide ? "text-accent border-accent bg-accent-dim" : "text-sec"
              }`}
              onClick={() => setShowGuide((v) => !v)}
            >
              {t("exercise.btn.guide")}
            </button>
          )}

          {/* Voir les réponses — remplit tous les trous */}
          {checked && !allOk && !revealed && (
            <button
              className="ctrl-btn !w-auto px-3 text-[12px] text-mut"
              onClick={reveal}
            >
              {t("exercise.btn.reveal")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
