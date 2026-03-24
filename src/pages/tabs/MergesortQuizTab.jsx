import { useState } from "react";
import { MERGESORT_QUIZ_QUESTIONS } from "../../data/mergesortQuestions";
import QuizQuestion from "../../components/quiz/QuizQuestion";
import QuizScore   from "../../components/quiz/QuizScore";
import { useLang } from "../../i18n/LangContext";

export default function MergesortQuizTab() {
  const [quizAnswers, setQuizAnswers] = useState({});
  const { t, lang } = useLang();
  const questions = MERGESORT_QUIZ_QUESTIONS[lang];

  function answer(questionIdx, optionIdx) {
    if (quizAnswers[questionIdx] !== undefined) return;
    setQuizAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }));
  }

  function reset() {
    setQuizAnswers({});
  }

  const score = Object.keys(quizAnswers).filter(
    (k) => quizAnswers[k] === questions[k].answer
  ).length;

  const isComplete = Object.keys(quizAnswers).length === questions.length;

  return (
    <div className="bg-card border border-line rounded-[14px] px-7 py-7 mb-10">
      <h3 className="text-[18px] font-bold mb-6">{t("quiz.title.mergesort")}</h3>
      {questions.map((q, qi) => (
        <QuizQuestion
          key={qi}
          question={q}
          questionIdx={qi}
          selectedAnswer={quizAnswers[qi]}
          onAnswer={(optIdx) => answer(qi, optIdx)}
        />
      ))}
      {isComplete && <QuizScore score={score} total={questions.length} onReset={reset} />}
    </div>
  );
}
