import { useLang } from "../../i18n/LangContext";

export default function QuizScore({ score, total, onReset }) {
  const { t } = useLang();

  const message =
    score === total
      ? t("quiz.score.perfect")
      : score >= Math.ceil(total * 0.6)
      ? t("quiz.score.good")
      : t("quiz.score.keep");

  return (
    <div className="text-center py-5 rounded-xl bg-surface border border-line">
      <div className="text-[14px] text-mut mb-1">{t("quiz.score.label")}</div>
      <div className="font-mono text-[48px] font-bold text-accent-hi">{score}/{total}</div>
      <div className="text-[14px] text-sec mt-2">{message}</div>
      <button className="add-btn mt-3" onClick={onReset}>
        {t("quiz.btn.restart")}
      </button>
    </div>
  );
}
