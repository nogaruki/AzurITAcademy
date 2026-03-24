import { useLang } from "../../i18n/LangContext";

export default function QuizQuestion({ question, questionIdx, selectedAnswer, onAnswer }) {
  const { q, opts, answer, explain } = question;
  const { t } = useLang();
  const answered = selectedAnswer !== undefined;

  return (
    <div className="mb-6 p-5 rounded-xl bg-surface border border-line">
      <div className="font-mono text-[12px] text-accent mb-[6px]">{t("quiz.question")} {questionIdx + 1}</div>
      <div className="text-[15px] font-semibold mb-[14px] leading-[1.5]">{q}</div>
      <div className="flex flex-col gap-2">
        {opts.map((opt, oi) => {
          let cls = "quiz-opt";
          if (answered) {
            if (oi === answer)              cls += " opt-correct";
            else if (oi === selectedAnswer) cls += " opt-wrong";
          }
          return (
            <button key={oi} className={cls} onClick={() => onAnswer(oi)}>
              {String.fromCharCode(65 + oi)}.&nbsp;{opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-[10px] px-[14px] py-[10px] rounded-lg bg-deep border border-line text-[13px] text-sec leading-[1.5]">
          {selectedAnswer === answer ? "✅ " : "❌ "}
          {explain}
        </div>
      )}
    </div>
  );
}
