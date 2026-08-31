// constants.js
// Central place for storage keys and app-wide configuration.
// Keeping these in one file avoids typos from scattering raw string keys
// across every page that touches localStorage.

export const STORAGE_KEYS = {
  THEME: 'cap_theme',
  USER: 'cap_user',
  PROGRESS: 'cap_progress',
  PRACTICE: 'cap_practice',
  QUIZ_RESULTS: 'cap_quiz_results',
  FAVORITES: 'cap_favorites',
  CERTIFICATES: 'cap_certificates',
};

// Replace these before deploying. They intentionally point nowhere so the
// app never pretends a real payment/contact flow exists.
export const PAYMENT_URL = 'YOUR_PAYMENT_URL';
export const WHATSAPP_NUMBER = 'YOUR_WHATSAPP_NUMBER';

// External playgrounds used for languages that can't run in-browser.
export const EXTERNAL_COMPILERS = {
  python: 'https://onecompiler.com/python',
  c: 'https://onecompiler.com/c',
  java: 'https://onecompiler.com/java',
  sql: 'https://onecompiler.com/sql',
};

export const DIFFICULTY = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
};

export const PASS_THRESHOLD = 0.7; // 70% correct required to pass a quiz
