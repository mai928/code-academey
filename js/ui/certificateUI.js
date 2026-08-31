// certificateUI.js
// Renders the printable certificate markup. Print-specific hiding of chrome
// (navbar, buttons) is handled purely via @media print rules in CSS.

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function formatDate(isoString) {
  const d = new Date(isoString);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function renderCertificate(container, certificate) {
  container.innerHTML = `
    <div class="cap-certificate" id="printableCertificate">
      <p class="cap-cert-brand">CodeAcademy Pro</p>
      <h2 class="cap-cert-title">Certificate of Completion</h2>
      <p class="cap-cert-line">This certifies that</p>
      <p class="cap-cert-name">${esc(certificate.studentName)}</p>
      <p class="cap-cert-line">has successfully completed</p>
      <p class="cap-cert-course">${esc(certificate.courseTitle)}</p>
      <div class="cap-cert-meta">
        <span>Score: ${certificate.score}%</span>
        <span>Date: ${formatDate(certificate.date)}</span>
      </div>
    </div>`;
}
