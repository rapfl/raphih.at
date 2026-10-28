'use strict';
// Keep deep links when switching between the equivalent language pages.
document.querySelectorAll('.language-switch a').forEach(link => {
  link.hash = location.hash;
});
window.addEventListener('hashchange', () => {
  document.querySelectorAll('.language-switch a').forEach(link => { link.hash = location.hash; });
});
