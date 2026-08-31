// compiler.js
// Web (HTML/CSS/JS) editor with a live iframe preview, plus links out to
// external playgrounds for languages that cannot run in the browser.
// The iframe is rebuilt via srcdoc on every change, which keeps user code
// isolated from the parent document rather than injecting it directly.

import { EXTERNAL_COMPILERS } from '../core/constants.js';

const DEFAULT_HTML = `<h1>Hello, CodeAcademy!</h1>\n<p>Edit the HTML, CSS, and JS panels to see live changes.</p>`;
const DEFAULT_CSS = `body {\n  font-family: sans-serif;\n  padding: 1.5rem;\n  color: #222;\n}\nh1 {\n  color: #6c5ce7;\n}`;
const DEFAULT_JS = `console.log("Preview ready.");`;

function buildPreviewDoc(html, css, js) {
  // Wrapping user JS in try/catch keeps one broken script from silently
  // breaking the whole preview without feedback.
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>${css}</style></head>
<body>${html}
<script>
  try {
    ${js}
  } catch (err) {
    document.body.insertAdjacentHTML('beforeend', '<pre style="color:#c0392b;background:#fdecea;padding:8px;border-radius:6px;">' + err.message + '</pre>');
  }
</script>
</body>
</html>`;
}

function initWebEditor() {
  const htmlInput = document.getElementById('editorHtml');
  const cssInput = document.getElementById('editorCss');
  const jsInput = document.getElementById('editorJs');
  const preview = document.getElementById('editorPreview');
  if (!htmlInput || !cssInput || !jsInput || !preview) return;

  htmlInput.value = DEFAULT_HTML;
  cssInput.value = DEFAULT_CSS;
  jsInput.value = DEFAULT_JS;

  const update = () => {
    preview.srcdoc = buildPreviewDoc(htmlInput.value, cssInput.value, jsInput.value);
  };

  [htmlInput, cssInput, jsInput].forEach((el) => el.addEventListener('input', update));
  update();
}

function initExternalLinks() {
  document.querySelectorAll('[data-external-compiler]').forEach((btn) => {
    const lang = btn.getAttribute('data-external-compiler');
    const url = EXTERNAL_COMPILERS[lang];
    if (url) {
      btn.href = url;
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
    } else {
      btn.setAttribute('disabled', 'true');
      btn.classList.add('disabled');
    }
  });
}

export function initCompilerPage() {
  initWebEditor();
  initExternalLinks();
}
