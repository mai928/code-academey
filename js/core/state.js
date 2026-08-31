// state.js
// Owns the shape of the "user" record and the default state used whenever
// localStorage is empty or corrupted. Services read/write through here
// rather than touching storage.js keys directly for user data.

import { getItem, setItem } from './storage.js';
import { STORAGE_KEYS } from './constants.js';

const DEFAULT_USER = {
  name: '',
  theme: 'light',
  favorites: [],
  quizResults: [],
  certificates: [],
};

const DEFAULT_PRACTICE = {
  completedChallenges: [],
  unlockedLevels: [1],
  scores: {},
};

/** Return the current user object, seeding defaults if none exists. */
export function getUser() {
  const user = getItem(STORAGE_KEYS.USER, null);
  if (!user || typeof user !== 'object') {
    setItem(STORAGE_KEYS.USER, DEFAULT_USER);
    return { ...DEFAULT_USER };
  }
  // Merge with defaults so older/partial saved shapes don't break new code.
  return { ...DEFAULT_USER, ...user };
}

export function saveUser(user) {
  setItem(STORAGE_KEYS.USER, user);
}

export function updateUser(patch) {
  const user = getUser();
  const updated = { ...user, ...patch };
  saveUser(updated);
  return updated;
}

/** Return the practice/challenge progress record, seeding defaults if needed. */
export function getPracticeState() {
  const state = getItem(STORAGE_KEYS.PRACTICE, null);
  if (!state || typeof state !== 'object') {
    setItem(STORAGE_KEYS.PRACTICE, DEFAULT_PRACTICE);
    return { ...DEFAULT_PRACTICE, unlockedLevels: [1] };
  }
  return {
    completedChallenges: Array.isArray(state.completedChallenges) ? state.completedChallenges : [],
    unlockedLevels: Array.isArray(state.unlockedLevels) && state.unlockedLevels.length ? state.unlockedLevels : [1],
    scores: state.scores && typeof state.scores === 'object' ? state.scores : {},
  };
}

export function savePracticeState(state) {
  setItem(STORAGE_KEYS.PRACTICE, state);
}

export function getTheme() {
  return getItem(STORAGE_KEYS.THEME, 'light');
}

export function saveTheme(theme) {
  setItem(STORAGE_KEYS.THEME, theme);
}
