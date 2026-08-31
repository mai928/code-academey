// certificateService.js
// Decides whether a certificate can be generated and builds/stores the
// certificate record. Formatting (dates, printable markup) stays in the UI
// layer; this file only deals with data and eligibility rules.

import { getUser, updateUser } from '../core/state.js';

/** A user is eligible if they have at least one passed quiz result for the given category. */
export function isEligible(category) {
  const user = getUser();
  return user.quizResults.some((r) => r.category === category && r.passed);
}

/** Best (highest) passed score for a category, used on the certificate. */
export function getBestScore(category) {
  const user = getUser();
  const passed = user.quizResults.filter((r) => r.category === category && r.passed);
  if (passed.length === 0) return null;
  return Math.max(...passed.map((r) => r.percentage));
}

/**
 * Create and persist a certificate record.
 * @returns {object|null} the certificate, or null if not eligible / no name given
 */
export function generateCertificate(studentName, category, courseTitle) {
  if (!studentName || !studentName.trim()) return null;
  if (!isEligible(category)) return null;

  const score = getBestScore(category);
  const certificate = {
    id: `cert-${Date.now()}`,
    studentName: studentName.trim(),
    category,
    courseTitle,
    score,
    date: new Date().toISOString(),
  };

  const user = getUser();
  updateUser({ certificates: [...user.certificates, certificate], name: studentName.trim() });

  return certificate;
}

export function getCertificates() {
  return getUser().certificates;
}
