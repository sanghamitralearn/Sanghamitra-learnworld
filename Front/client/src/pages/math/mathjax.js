// Lazily loads MathJax from the CDN once, then exposes a helper to
// typeset LaTeX (\( ... \)) inside a given DOM node.

let mathJaxPromise = null;

function loadMathJax() {
  if (window.MathJax) return Promise.resolve();
  if (mathJaxPromise) return mathJaxPromise;

  mathJaxPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
  return mathJaxPromise;
}

export async function typesetMath(node) {
  await loadMathJax();
  if (window.MathJax && window.MathJax.typesetPromise) {
    try {
      await window.MathJax.typesetPromise(node ? [node] : undefined);
    } catch (e) {
      // ignore typeset errors (e.g. node removed before typeset finished)
    }
  }
}
