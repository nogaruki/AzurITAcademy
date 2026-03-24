import { useQuiz }        from "../../hooks/useQuiz";
import { QUIZ_QUESTIONS } from "../../data/quizQuestions";
import QuizQuestion       from "../../components/quiz/QuizQuestion";
import QuizScore          from "../../components/quiz/QuizScore";
import { useLang }        from "../../i18n/LangContext";

export default function QuizTab() {
  const { t, lang } = useLang();
  const questions = QUIZ_QUESTIONS[lang];
  const { quizAnswers, answer, reset, score, isComplete } = useQuiz(questions);

  return (
    <div className="bg-card border border-line rounded-[14px] px-7 py-7 mb-10">
      <h3 className="text-[18px] font-bold mb-6">{t("quiz.title.dijkstra")}</h3>
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
