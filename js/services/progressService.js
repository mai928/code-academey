// progressService.js
// Business logic for turning raw stored state (completed challenges, quiz
// results) into the percentages and summaries the UI displays. Nothing here
// touches the DOM.

import { getPracticeState, getUser } from '../core/state.js';
import { CHALLENGES, LEARNING_PATHS } from '../core/data.js';

/** Overall percentage of all practice challenges completed (0-100). */
export function getOverallChallengeProgress() {
  const { completedChallenges } = getPracticeState();
  if (CHALLENGES.length === 0) return 0;
  return Math.round((completedChallenges.length / CHALLENGES.length) * 100);
}

/** A rough per-path progress percentage, derived from quiz results for that category. */
export function getPathProgress(pathId) {
  const user = getUser();
  const results = user.quizResults.filter((r) => r.category === pathId);
  if (results.length === 0) return 0;
  const best = Math.max(...results.map((r) => r.percentage));
  return Math.round(best);
}

/** Whether the given path currently qualifies for certificate generation. */
export function isPathEligibleForCertificate(pathId) {
  const user = getUser();
  return user.quizResults.some((r) => r.category === pathId && r.passed);
}

/** Summary used on the curriculum page cards. */
export function getPathSummary(pathId) {
  const path = LEARNING_PATHS.find((p) => p.id === pathId);
  if (!path) return null;
  return {
    ...path,
    progress: getPathProgress(pathId),
    eligibleForCertificate: isPathEligibleForCertificate(pathId),
  };
}
