(() => {
  'use strict';
  const root = document.documentElement;
  const loader = document.querySelector('.brand-loader');
  if (!loader || !root.classList.contains('logo-loading')) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const started = performance.now();
  let finished = false;
  const locked = [];
  function finish() {
    if (finished) return;
    finished = true;
    root.classList.remove('logo-loading');
    locked.forEach(el => { el.inert = false; });
    window.setTimeout(() => loader.remove(), reduced ? 0 : 600);
  }
  function ready() {
    if (finished) return;
    for (const el of document.querySelectorAll('body > header, body > main, body > footer, body > nav, body > a.skip')) {
      if (!el.inert) { el.inert = true; locked.push(el); }
    }
    const logo = loader.querySelector('img');
    const decoded = logo.decode ? logo.decode().catch(() => {}) : Promise.resolve();
    decoded.then(() => window.setTimeout(finish, Math.max(0, (reduced ? 200 : 1100) - (performance.now() - started))));
  }
  // Independent of the background video, maps, fonts and the main app script.
  window.setTimeout(finish, 2600);
  window.addEventListener('pageshow', event => { if (event.persisted) finish(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, {once:true});
  else ready();
})();
