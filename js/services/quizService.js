// quizService.js
// Owns quiz state and scoring. The UI hands this service an answer and
// gets back a validation result; it never calculates correctness itself.

import { QUIZ_QUESTIONS } from '../core/data.js';
import { PASS_THRESHOLD } from '../core/constants.js';
import { getUser, updateUser } from '../core/state.js';

/**
 * Build a fresh quiz session. Optionally filter by category
 * (e.g. "python") — if omitted, uses the full question bank.
 */
export function createQuizSession(category = null) {
  const pool = category ? QUIZ_QUESTIONS.filter((q) => q.category === category) : QUIZ_QUESTIONS;
  return {
    category: category || 'general',
    questions: pool,
    currentIndex: 0,
    answers: {}, // questionId -> selected option
  };
}

export function getCurrentQuestion(session) {
  return session.questions[session.currentIndex] || null;
}

export function answerQuestion(session, questionId, selectedOption) {
  const question = session.questions.find((q) => q.id === questionId);
  if (!question) return session;
  const isCorrect = selectedOption === question.correctAnswer;
  session.answers[questionId] = { selectedOption, isCorrect };
  return session;
}

export function goToNext(session) {
  if (session.currentIndex < session.questions.length - 1) {
    session.currentIndex += 1;
  }
  return session;
}

export function goToPrevious(session) {
  if (session.currentIndex > 0) {
    session.currentIndex -= 1;
  }
  return session;
}

export function isLastQuestion(session) {
  return session.currentIndex === session.questions.length - 1;
}

/** Score the finished session and persist the result to the user record. */
export function finishQuiz(session) {
  const total = session.questions.length;
  const correct = Object.values(session.answers).filter((a) => a.isCorrect).length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passed = percentage / 100 >= PASS_THRESHOLD;

  const result = {
    id: `quiz-${Date.now()}`,
    category: session.category,
    correct,
    total,
    percentage,
    passed,
    date: new Date().toISOString(),
  };

  const user = getUser();
  updateUser({ quizResults: [...user.quizResults, result] });

  return result;
}
