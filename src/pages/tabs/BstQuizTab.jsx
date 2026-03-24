import { useState } from "react";
import { BST_QUIZ_QUESTIONS } from "../../data/bstQuestions";
import QuizQuestion from "../../components/quiz/QuizQuestion";
import QuizScore   from "../../components/quiz/QuizScore";
import { useLang } from "../../i18n/LangContext";

export default function BstQuizTab() {
  const [quizAnswers, setQuizAnswers] = useState({});
  const { t, lang } = useLang();
  const questions = BST_QUIZ_QUESTIONS[lang];

  function answer(qi, optIdx) {
    if (quizAnswers[qi] !== undefined) return;
    setQuizAnswers((prev) => ({ ...prev, [qi]: optIdx }));
  }

  function reset() { setQuizAnswers({}); }

  const score = Object.keys(quizAnswers).filter(
    (k) => quizAnswers[k] === questions[k].answer
  ).length;
  const isComplete = Object.keys(quizAnswers).length === questions.length;

  return (
    <div className="bg-card border border-line rounded-[14px] px-7 py-7 mb-10">
      <h3 className="text-[18px] font-bold mb-6">{t("quiz.title.bst")}</h3>
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
