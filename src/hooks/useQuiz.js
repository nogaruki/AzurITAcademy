import { useState } from "react";

/**
 * Gère l'état du quiz : réponses, score, reset.
 * Accepte un tableau de questions pour être indépendant de la langue.
 */
export function useQuiz(questions) {
  const [quizAnswers, setQuizAnswers] = useState({});

  function answer(questionIdx, optionIdx) {
    if (quizAnswers[questionIdx] !== undefined) return; // already answered
    setQuizAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }));
  }

  function reset() {
    setQuizAnswers({});
  }

  const score = Object.keys(quizAnswers).filter(
    (k) => quizAnswers[k] === questions[k].answer
  ).length;

  const isComplete = Object.keys(quizAnswers).length === questions.length;

  return { quizAnswers, answer, reset, score, isComplete };
}
