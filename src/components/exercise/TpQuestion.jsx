import { useState } from "react";
import { useLang } from "../../i18n/LangContext";

/**
 * TpQuestion — Affiche un TP (Travaux Pratiques) avec :
 *   - subject      : énoncé du problème
 *   - baseCode     : code de départ (squelette)
 *   - correction   : solution complète (révélable)
 *   - explanation  : (optionnel) explication de la correction
 */
export default function TpQuestion({ exercise, index }) {
  const { t } = useLang();
  const { title, subject, baseCode, correction, explanation } = exercise;
  const [showCorrection, setShowCorrection] = useState(false);

  return (
    <div className="panel mb-5">
      {/* ── En-tête ── */}
      <div className="panel-header">
        <span>
          <span className="text-mut mr-2 font-mono text-[11px]">TP {index + 1}</span>
          {title}
        </span>
        <span
          className="text-[10px] font-mono px-2 py-[2px] rounded-[6px] border font-semibold"
          style={{
            color: "var(--c-purple, #a78bfa)",
            borderColor: "var(--c-purple, #a78bfa)",
            background: "color-mix(in srgb, var(--c-purple, #a78bfa) 12%, transparent)",
          }}
        >
          TP
        </span>
      </div>

      <div className="panel-body">
        {/* ── Sujet ── */}
        <p className="text-sec text-[13px] leading-[1.6] mb-4 whitespace-pre-line">
          {subject}
        </p>

        {/* ── Code de base ── */}
        <div className="rounded-[10px] border border-line overflow-hidden mb-4">
          <div
            className="px-4 py-[8px] border-b border-line text-mut text-[11px] font-mono font-semibold uppercase tracking-wider"
            style={{ background: "var(--bg-card)" }}
          >
            {t("tp.label.base")}
          </div>
          <pre
            className="p-4 text-[12px] font-mono leading-[1.7] m-0 overflow-x-auto"
            style={{ background: "var(--bg-deep)", color: "var(--text-pri)" }}
          >
            {baseCode}
          </pre>
        </div>

        {/* ── Panneau Correction ── */}
        {showCorrection && (
          <div className="rounded-[10px] border border-c-green/40 mb-4 overflow-hidden">
            <div
              className="px-4 py-[10px] border-b border-c-green/30 flex items-center gap-2"
              style={{ background: "var(--green-glow)" }}
            >
              <span className="text-c-green text-[13px] font-semibold">
                ✅ {t("exercise.correction.heading")}
              </span>
            </div>
            <div className="p-4" style={{ background: "var(--bg-card)" }}>
              <pre
                className="font-mono text-[11.5px] rounded-[8px] p-3 overflow-x-auto leading-[1.65] mb-0"
                style={{ background: "var(--bg-code)", color: "#a0b8d8" }}
              >
                {correction}
              </pre>
              {explanation && (
                <p className="text-sec text-[13px] leading-[1.65] mt-3 pt-3 border-t border-line">
                  {explanation}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── Action ── */}
        <div className="flex gap-2">
          <button
            className={`ctrl-btn !w-auto px-3 text-[12px] transition-colors duration-150 ${
              showCorrection
                ? "text-c-green border-c-green bg-c-green-dim"
                : "text-sec"
            }`}
            onClick={() => setShowCorrection((v) => !v)}
          >
            {showCorrection ? t("tp.btn.hide") : t("exercise.btn.correction")}
          </button>
        </div>
      </div>
    </div>
  );
}
