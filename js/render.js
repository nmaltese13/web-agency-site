/* ==========================================================================
   render.js — renders repeated content from data/site-content.js.

   Contract: each page puts an empty container with a data-render="<key>"
   attribute where content should go. This file fills it. Adding a project or
   service means editing data/site-content.js only.

   Loaded AFTER data/site-content.js (which defines the global SITE) and
   after main.js. Fires a `content:rendered` event when done so main.js can
   attach scroll-reveal observers to the new nodes.
   ========================================================================== */

(function () {
  'use strict';

  if (typeof SITE === 'undefined') {
    console.error('[render] data/site-content.js did not load. Check the script order.');
    return;
  }

  /* --- helpers ---------------------------------------------------------- */

  // Escape anything interpolated into innerHTML. The content file is authored
  // locally so this is belt-and-braces, but an apostrophe in a project name
  // shouldn't be able to break the markup either.
  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function slot(key) { return document.querySelector('[data-render="' + key + '"]'); }
  function slots(key) { return document.querySelectorAll('[data-render="' + key + '"]'); }

  function fill(key, html) {
    var el = slot(key);
    if (el) el.innerHTML = html;
    return el;
  }

  // Split a \n\n-delimited string into <p> tags.
  function paras(text) {
    return String(text).split('\n\n')
      .map(function (p) { return '<p>' + esc(p.trim()) + '</p>'; })
      .join('');
  }

  /* ----------------------------------------------------------------------
     GENERATED PROJECT COVERS
     There is no photography on this site by design. Each project gets an
     abstract technical drawing built from its `pattern` and `accent` fields.
     ---------------------------------------------------------------------- */

  var PATTERNS = {
    grid: function () {
      var lines = '';
      for (var x = 40; x < 320; x += 40) {
        lines += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="200" />';
      }
      for (var y = 40; y < 200; y += 40) {
        lines += '<line x1="0" y1="' + y + '" x2="320" y2="' + y + '" />';
      }
      return '<g stroke="currentColor" stroke-width="1" opacity="0.28">' + lines + '</g>' +
             '<rect x="80"  y="40"  width="40" height="40" fill="currentColor" opacity="0.16"/>' +
             '<rect x="120" y="80"  width="80" height="40" fill="currentColor" opacity="0.28"/>' +
             '<rect x="160" y="120" width="40" height="40" fill="currentColor" opacity="0.16"/>' +
             '<path d="M120 80 h80 v40 h-80 Z" fill="none" stroke="currentColor" stroke-width="2"/>';
    },

    flow: function () {
      var node = function (cx, cy, filled) {
        return '<circle cx="' + cx + '" cy="' + cy + '" r="13" fill="' +
               (filled ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"' +
               (filled ? '' : ' opacity="0.55"') + '/>';
      };
      // fill="none" is required on every <g> here: an SVG <path> fills with
      // black by default, which turns these L-shaped connectors into solid
      // triangles.
      return '<g fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4" stroke-dasharray="4 4">' +
               '<path d="M63 100 H117" /><path d="M143 100 H197" /><path d="M223 100 H257" />' +
             '</g>' +
             node(50, 100, true) + node(130, 100, false) +
             node(210, 100, false) + node(270, 100, true) +
             '<g fill="none" stroke="currentColor" stroke-width="1" opacity="0.22">' +
               '<path d="M130 87 V40 H240" /><path d="M130 113 V160 H240" />' +
             '</g>' +
             '<rect x="240" y="30" width="34" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>' +
             '<rect x="240" y="150" width="34" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>';
    },

    stack: function () {
      var out = '';
      for (var i = 0; i < 4; i++) {
        var y = 132 - i * 26;
        var x = 70 + i * 14;
        out += '<path d="M' + x + ' ' + y + ' l80 -26 l80 26 l-80 26 Z" ' +
               'fill="currentColor" fill-opacity="' + (0.08 + i * 0.07).toFixed(2) + '" ' +
               'stroke="currentColor" stroke-width="1.5" stroke-opacity="0.5"/>';
      }
      return out;
    },

    arc: function () {
      var out = '<g fill="none" stroke="currentColor" stroke-width="1.5">';
      for (var i = 1; i <= 5; i++) {
        var r = i * 34;
        out += '<path d="M20 ' + (180 - r) + ' A ' + r + ' ' + r + ' 0 0 1 ' + (20 + r) +
               ' 180" opacity="' + (0.6 - i * 0.08).toFixed(2) + '"/>';
      }
      out += '</g>';
      out += '<line x1="20" y1="180" x2="300" y2="180" stroke="currentColor" stroke-width="2"/>';
      out += '<circle cx="20" cy="180" r="4" fill="currentColor"/>';
      return out;
    },

    bars: function () {
      var heights = [38, 62, 54, 88, 76, 116];
      var out = '';
      heights.forEach(function (h, i) {
        var x = 44 + i * 40;
        out += '<rect x="' + x + '" y="' + (166 - h) + '" width="22" height="' + h +
               '" fill="currentColor" fill-opacity="' + (0.2 + i * 0.12).toFixed(2) + '"/>';
      });
      out += '<line x1="24" y1="166" x2="300" y2="166" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>';
      out += '<line x1="24" y1="62" x2="300" y2="62" stroke="currentColor" stroke-width="1" ' +
             'stroke-dasharray="5 5" opacity="0.45"/>';
      return out;
    },

    pulse: function () {
      return '<path d="M14 120 H80 l14 -46 l20 84 l18 -108 l20 128 l16 -58 H306" ' +
             'fill="none" stroke="currentColor" stroke-width="2.5" ' +
             'stroke-linejoin="round" stroke-linecap="round"/>' +
             '<g stroke="currentColor" stroke-width="1" opacity="0.2">' +
               '<line x1="0" y1="60" x2="320" y2="60"/>' +
               '<line x1="0" y1="120" x2="320" y2="120"/>' +
               '<line x1="0" y1="160" x2="320" y2="160"/>' +
             '</g>' +
             '<circle cx="152" cy="50" r="5" fill="currentColor"/>';
    }
  };

  function cover(project) {
    var draw = PATTERNS[project.pattern] || PATTERNS.grid;
    var color = 'var(--c-' + (project.accent || 'orange') + ', var(--accent))';
    return '<svg viewBox="0 0 320 200" role="img" aria-hidden="true" focusable="false" ' +
           'preserveAspectRatio="xMidYMid slice" style="color:' + color + '">' +
           draw() + '</svg>';
  }

  /* ----------------------------------------------------------------------
     IDENTITY — business name, contact links, service area
     ---------------------------------------------------------------------- */

  var biz = SITE.business;

  slots('biz-name').forEach(function (el) { el.textContent = biz.name; });
  slots('biz-mark').forEach(function (el) { el.textContent = biz.nameShort; });

  slots('biz-email').forEach(function (el) {
    el.textContent = biz.email;
    if (el.tagName === 'A') el.setAttribute('href', 'mailto:' + biz.email);
  });

  slots('biz-phone').forEach(function (el) {
    if (!biz.phone) { el.closest('li, p') ? el.closest('li, p').remove() : el.remove(); return; }
    el.textContent = biz.phone;
    if (el.tagName === 'A') el.setAttribute('href', 'tel:' + biz.phone.replace(/[^\d+]/g, ''));
  });

  slots('service-area').forEach(function (el) {
    el.textContent = 'Serving ' + biz.serviceArea.join(' · ');
  });

  /* ----------------------------------------------------------------------
     HERO (home)
     ---------------------------------------------------------------------- */

  (function () {
    var h = slot('hero-title');
    if (h && SITE.hero.headline) {
      // Accent the last three words of the headline.
      var words = SITE.hero.headline.split(' ');
      var tail = words.splice(-3).join(' ');
      h.innerHTML = esc(words.join(' ')) + ' <em>' + esc(tail) + '</em>';
    }

    var s = slot('hero-sub');
    if (s) s.textContent = SITE.hero.sub;

    fill('hero-stats', (SITE.hero.stats || []).map(function (st) {
      return '<div class="stat">' +
               '<div class="stat__value">' + esc(st.value) + '</div>' +
               '<div class="stat__label">' + esc(st.label) + '</div>' +
             '</div>';
    }).join(''));
  })();

  /* ----------------------------------------------------------------------
     SERVICES — summary cards (home)
     ---------------------------------------------------------------------- */

  fill('services-cards', SITE.services.map(function (s, i) {
    return '<article class="card card--hover service-card reveal" style="--i:' + i + '">' +
             '<div class="card__num">' + esc(s.num) + '</div>' +
             '<h3 class="card__title">' + esc(s.title) + '</h3>' +
             '<p class="card__body">' + esc(s.teaser) + '</p>' +
             '<div class="service-card__price">From <strong>' + esc(s.priceFrom) + '</strong></div>' +
             '<div class="card__foot">' +
               '<a class="arrow-link" href="services.html#' + esc(s.id) + '">' +
                 'What’s included<span class="visually-hidden"> in ' + esc(s.title) + '</span>' +
               '</a>' +
             '</div>' +
           '</article>';
  }).join(''));

  /* ----------------------------------------------------------------------
     SERVICES — full detail (services page)
     ---------------------------------------------------------------------- */

  fill('services-detail', SITE.services.map(function (s) {
    return '<section class="svc reveal" id="' + esc(s.id) + '">' +
             '<div class="svc__main">' +
               '<span class="svc__num">' + esc(s.num) + ' / Service</span>' +
               '<h2 class="svc__title">' + esc(s.title) + '</h2>' +
               '<div class="svc__body">' + paras(s.body) + '</div>' +
             '</div>' +
             '<aside class="svc__aside">' +
               '<div class="svc__price">' +
                 '<span class="svc__price-label">Starting at</span>' +
                 '<div class="svc__price-value">' + esc(s.priceFrom) + '</div>' +
                 '<p class="svc__price-note">' + esc(s.priceNote) + '</p>' +
               '</div>' +
               '<div class="includes-head">What’s included</div>' +
               '<ul class="includes">' +
                 s.includes.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join('') +
               '</ul>' +
               '<div class="svc__meta">' +
                 '<span>Timeline: ' + esc(s.timeline) + '</span>' +
               '</div>' +
               '<div class="card__foot">' +
                 '<a class="btn btn--primary btn--block" href="book.html">Book a call</a>' +
               '</div>' +
             '</aside>' +
           '</section>';
  }).join(''));

  /* ----------------------------------------------------------------------
     PROCESS (home)
     ---------------------------------------------------------------------- */

  fill('process', SITE.process.map(function (p) {
    return '<div class="process__step">' +
             '<span class="process__num">' + esc(p.num) + '</span>' +
             '<h3 class="process__title">' + esc(p.title) + '</h3>' +
             '<p class="process__body">' + esc(p.body) + '</p>' +
           '</div>';
  }).join(''));

  /* ----------------------------------------------------------------------
     COMMITMENTS (home) — the honest stand-in for testimonials
     ---------------------------------------------------------------------- */

  fill('commitments', SITE.commitments.map(function (c, i) {
    return '<div class="commit reveal" style="--i:' + i + '">' +
             '<span class="commit__mark" aria-hidden="true">' +
               String(i + 1).padStart(2, '0') +
             '</span>' +
             '<h3 class="commit__title">' + esc(c.title) + '</h3>' +
             '<p class="commit__body">' + esc(c.body) + '</p>' +
           '</div>';
  }).join(''));

  /* ----------------------------------------------------------------------
     PROJECTS
     ---------------------------------------------------------------------- */

  function projectCard(p, i) {
    var titleHtml = p.url
      ? '<a href="' + esc(p.url) + '" rel="noopener">' + esc(p.title) + '</a>'
      : esc(p.title);

    return '<article class="project reveal" data-category="' + esc(p.category) + '" style="--i:' + (i % 3) + '">' +
             '<div class="project__cover">' +
               '<span class="project__cat">' + esc(p.category) + '</span>' +
               cover(p) +
             '</div>' +
             '<div class="project__body">' +
               '<div class="project__head">' +
                 '<h3 class="project__title">' + titleHtml + '</h3>' +
                 '<span class="project__year">' + esc(p.year) + '</span>' +
               '</div>' +
               '<p class="project__summary">' + esc(p.summary) + '</p>' +
               (p.result ? '<p class="project__result">' + esc(p.result) + '</p>' : '') +
               (p.tags && p.tags.length
                 ? '<div class="tags">' + p.tags.map(function (t) {
                     return '<span class="tag">' + esc(t) + '</span>';
                   }).join('') + '</div>'
                 : '') +
             '</div>' +
           '</article>';
  }

  // Home strip — first three only.
  fill('projects-strip', SITE.projects.slice(0, 3).map(projectCard).join(''));

  // Work page — all, with filters.
  var workGrid = fill('projects-grid', SITE.projects.map(projectCard).join(''));

  if (workGrid) {
    var filterBar = slot('project-filters');
    if (filterBar) {
      var cats = ['All'];
      SITE.projects.forEach(function (p) {
        if (cats.indexOf(p.category) === -1) cats.push(p.category);
      });

      filterBar.innerHTML = cats.map(function (c, i) {
        return '<button type="button" class="filter" data-filter="' + esc(c) + '" ' +
               'aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' + esc(c) + '</button>';
      }).join('');

      var empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.hidden = true;
      empty.textContent = 'No projects in that category yet.';
      workGrid.after(empty);

      var live = document.getElementById('filter-status');

      filterBar.addEventListener('click', function (e) {
        var btn = e.target.closest('.filter');
        if (!btn) return;

        var want = btn.getAttribute('data-filter');

        filterBar.querySelectorAll('.filter').forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === btn));
        });

        var shown = 0;
        workGrid.querySelectorAll('.project').forEach(function (card) {
          var match = want === 'All' || card.getAttribute('data-category') === want;
          card.hidden = !match;
          if (match) shown++;
        });

        empty.hidden = shown > 0;
        if (live) {
          live.textContent = shown + (shown === 1 ? ' project' : ' projects') +
                             ' shown' + (want === 'All' ? '' : ' in ' + want);
        }
      });
    }
  }

  /* ----------------------------------------------------------------------
     FAQ (services)
     ---------------------------------------------------------------------- */

  fill('faq', SITE.faq.map(function (f) {
    return '<details>' +
             '<summary>' + esc(f.q) + '</summary>' +
             '<div class="faq__answer"><p>' + esc(f.a) + '</p></div>' +
           '</details>';
  }).join(''));

  /* ----------------------------------------------------------------------
     ABOUT — intentionally not rendered here. The About page prose and facts
     are static markup in about.html so the page reads with JS disabled.
     ---------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------
     BOOK
     ---------------------------------------------------------------------- */

  (function () {
    var h = slot('book-heading');
    if (h) h.textContent = SITE.book.heading;
    var s = slot('book-sub');
    if (s) s.textContent = SITE.book.sub;

    fill('book-expect', SITE.book.expect.map(function (item) {
      return '<li>' + esc(item) + '</li>';
    }).join(''));
  })();

  /* ----------------------------------------------------------------------
     GLOBAL CTA
     ---------------------------------------------------------------------- */

  slots('cta-heading').forEach(function (el) { el.textContent = SITE.cta.heading; });
  slots('cta-body').forEach(function (el) { el.textContent = SITE.cta.body; });
  slots('cta-button').forEach(function (el) { el.textContent = SITE.cta.button; });

  /* ----------------------------------------------------------------------
     Let main.js observe the nodes we just created.
     ---------------------------------------------------------------------- */

  document.dispatchEvent(new CustomEvent('content:rendered'));
})();
