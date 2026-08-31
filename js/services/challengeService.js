// challengeService.js
// Owns all practice/challenge business logic: which challenges exist per
// level, whether a level is locked, and what happens when a challenge is
// completed. The UI layer only calls these functions — it never mutates
// practice state directly, which is what keeps "complete a challenge twice"
// and "unlock the next level" bugs from creeping in.

import { CHALLENGES } from '../core/data.js';
import { getPracticeState, savePracticeState } from '../core/state.js';

const LEVELS = [1, 2, 3];

export function getChallengesForLevel(level) {
  return CHALLENGES.filter((c) => c.level === level);
}

export function isLevelUnlocked(level) {
  const { unlockedLevels } = getPracticeState();
  return unlockedLevels.includes(level);
}

export function isChallengeCompleted(challengeId) {
  const { completedChallenges } = getPracticeState();
  return completedChallenges.includes(challengeId);
}

/** Percentage of a given level's challenges that are completed. */
export function getLevelCompletionPercent(level) {
  const levelChallenges = getChallengesForLevel(level);
  const { completedChallenges } = getPracticeState();
  if (levelChallenges.length === 0) return 0;
  const done = levelChallenges.filter((c) => completedChallenges.includes(c.id)).length;
  return Math.round((done / levelChallenges.length) * 100);
}

/**
 * Submit an answer for a challenge. Returns { correct, alreadyCompleted, unlockedNextLevel }.
 * Prevents double-counting: a challenge already marked complete cannot add
 * duplicate points or trigger a duplicate unlock check.
 */
export function submitChallengeAnswer(challengeId, selectedOption) {
  const challenge = CHALLENGES.find((c) => c.id === challengeId);
  if (!challenge) {
    return { correct: false, alreadyCompleted: false, unlockedNextLevel: false, error: 'Challenge not found' };
  }

  const correct = selectedOption === challenge.answer;
  const state = getPracticeState();
  const alreadyCompleted = state.completedChallenges.includes(challengeId);

  if (!correct) {
    return { correct: false, alreadyCompleted, unlockedNextLevel: false };
  }

  let unlockedNextLevel = false;

  if (!alreadyCompleted) {
    state.completedChallenges = [...state.completedChallenges, challengeId];
    state.scores = { ...state.scores, [challengeId]: challenge.points };
    unlockedNextLevel = maybeUnlockNextLevel(state, challenge.level);
    savePracticeState(state);
  }

  return { correct: true, alreadyCompleted, unlockedNextLevel };
}

/** If every challenge in `level` is now complete, unlock the next level. */
function maybeUnlockNextLevel(state, level) {
  const levelChallenges = getChallengesForLevel(level);
  const allDone = levelChallenges.every((c) => state.completedChallenges.includes(c.id));
  const nextLevel = level + 1;

  if (allDone && LEVELS.includes(nextLevel) && !state.unlockedLevels.includes(nextLevel)) {
    state.unlockedLevels = [...state.unlockedLevels, nextLevel];
    return true;
  }
  return false;
}

export function getTotalScore() {
  const { scores } = getPracticeState();
  return Object.values(scores).reduce((sum, v) => sum + v, 0);
}

export function getLevels() {
  return LEVELS;
}
