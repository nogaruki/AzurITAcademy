import { useLang } from "../../i18n/LangContext";
import ExerciseQuestion from "../../components/exercise/ExerciseQuestion";
import TpQuestion from "../../components/exercise/TpQuestion";

/**
 * Onglet Exercices — générique, reçoit les exercices déjà résolus pour la bonne langue.
 * Chaque page passe `exercises={ALGO_EXERCISES[lang]}`.
 * Les exercices avec `type: "tp"` sont rendus via TpQuestion (sujet + code de base + correction).
 * Les autres sont des codes à trou (ExerciseQuestion).
 */
export default function ExerciseTab({ exercises }) {
  const { t } = useLang();

  const blanks = exercises.filter((ex) => ex.type !== "tp");
  const tps    = exercises.filter((ex) => ex.type === "tp");

  return (
    <div className="mb-10">
      {/* ── Section Codes à trou ── */}
      <div className="panel mb-6">
        <div className="panel-header">✏️ {t("exercise.section.title")}</div>
        <div className="panel-body">
          <p className="text-sec text-[14px] leading-[1.6]">
            {t("exercise.section.desc")}
          </p>
          <div className="mt-3 flex gap-3 text-[12px] text-mut font-mono">
            <span>🟩 {t("exercise.legend.correct")}</span>
            <span>🟥 {t("exercise.legend.wrong")}</span>
            <span>⏎ {t("exercise.legend.enter")}</span>
          </div>
        </div>
      </div>

      {blanks.map((ex, i) => (
        <ExerciseQuestion key={ex.id} exercise={ex} index={i} />
      ))}

      {/* ── Section Travaux Pratiques ── */}
      {tps.length > 0 && (
        <>
          <div className="panel mb-6 mt-8">
            <div className="panel-header">🧪 {t("tp.section.title")}</div>
            <div className="panel-body">
              <p className="text-sec text-[14px] leading-[1.6]">
                {t("tp.section.desc")}
              </p>
            </div>
          </div>

          {tps.map((tp, i) => (
            <TpQuestion key={tp.id} exercise={tp} index={i} />
          ))}
        </>
      )}
    </div>
  );
}
