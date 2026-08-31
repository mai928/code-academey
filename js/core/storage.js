// storage.js
// A single, safe gateway to localStorage. Every module that needs to
// persist data goes through here instead of calling localStorage directly,
// so JSON parsing errors and missing keys are handled in exactly one place.

/**
 * Read and JSON-parse a value from localStorage.
 * @param {string} key
 * @param {*} fallback - returned if the key is missing or corrupted
 */
export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    // Corrupted JSON should never crash the app — fall back silently
    // and let the caller re-initialize sane defaults.
    console.warn(`storage.getItem: could not parse "${key}"`, err);
    return fallback;
  }
}

/**
 * JSON-stringify and store a value in localStorage.
 * @param {string} key
 * @param {*} value
 */
export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`storage.setItem: could not save "${key}"`, err);
    return false;
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`storage.removeItem: could not remove "${key}"`, err);
  }
}

export function clearItem(key) {
  removeItem(key);
}

/** Check whether localStorage is actually available (private browsing, etc.) */
export function isStorageAvailable() {
  try {
    const testKey = '__cap_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}
