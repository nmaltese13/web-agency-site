/* ==========================================================================
   main.js — site chrome: theme toggle, mobile nav, footer year, scroll reveal.

   Everything here is an enhancement. With JS disabled the site must still be
   fully readable and navigable — that's why the nav markup lives in the HTML
   and the reveal animation only ever *removes* a class.
   ========================================================================== */

(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     THEME
     The initial theme is applied by a tiny inline script in each page's
     <head> (before paint, to avoid a flash). This only wires the toggle.
     ---------------------------------------------------------------------- */

  var STORAGE_KEY = 'nwc-theme';
  var root = document.documentElement;

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function currentTheme() {
    return root.getAttribute('data-theme') || (systemPrefersDark() ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* private mode */ }

    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    });
  }

  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  });

  // Keep in sync with the OS while the user hasn't made an explicit choice.
  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* noop */ }
  if (!stored && window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () { root.removeAttribute('data-theme'); };
    if (mq.addEventListener) { mq.addEventListener('change', onChange); }
  }

  /* ----------------------------------------------------------------------
     MOBILE NAV
     ---------------------------------------------------------------------- */

  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  function setNav(open) {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', String(open));
    nav.setAttribute('data-open', String(open));
    document.body.classList.toggle('nav-open', open);
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      setNav(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close on Escape and return focus to the button.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        navToggle.focus();
      }
    });

    // Close after following an in-page link.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });

    // Reset state if the viewport grows past the mobile breakpoint.
    if (window.matchMedia) {
      var wide = window.matchMedia('(min-width: 781px)');
      var onWide = function (e) { if (e.matches) setNav(false); };
      if (wide.addEventListener) { wide.addEventListener('change', onWide); }
    }
  }

  /* ----------------------------------------------------------------------
     FOOTER YEAR
     ---------------------------------------------------------------------- */

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ----------------------------------------------------------------------
     SCROLL REVEAL
     Only runs when the user hasn't asked for reduced motion. The .reveal
     class has no visual effect under `prefers-reduced-motion: reduce`, so
     content is never hidden from users who don't get the animation.
     ---------------------------------------------------------------------- */

  var motionOK = !window.matchMedia ||
                 !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealAll() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  if (!motionOK || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    var observeReveals = function () {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
        io.observe(el);
      });
    };

    observeReveals();

    // render.js injects content after this file runs; pick up the new nodes.
    document.addEventListener('content:rendered', observeReveals);

    // Safety net: if anything goes wrong, never leave content invisible.
    window.setTimeout(revealAll, 3000);
  }
})();
