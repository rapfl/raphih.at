'use strict';
// Preserve links shared before the portfolio moved to its own page.
const portfolioAnchors = new Set(['work', 'hochstapler', 'rosa', 'cordo', 'buntaz', 'bounce']);
function followPortfolioAnchor() {
  if (portfolioAnchors.has(location.hash.slice(1))) location.replace('/portfolio/' + location.hash);
}
followPortfolioAnchor();
window.addEventListener('hashchange', followPortfolioAnchor);
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('#motion-toggle');
let paused = preference.matches;
function reflectMotion() {
  document.body.classList.toggle('motion-paused', paused);
  document.documentElement.style.scrollBehavior = paused ? 'auto' : '';
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = paused ? 'Play motion' : 'Pause motion';
}
reflectMotion();
motionButton.addEventListener('click', () => { paused = !paused; reflectMotion(); });
preference.addEventListener('change', event => { paused = event.matches; reflectMotion(); });
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('visible'); observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  document.documentElement.classList.add('js-reveal');
}
