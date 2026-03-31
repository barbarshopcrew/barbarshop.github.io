/* ============================================================
   BARBARSHOP v2 — script.js
   Premium Interactions · Clean · Fast
   ============================================================ */

'use strict';

/* ==========================================
   HELPERS
   ========================================== */
const qs  = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ==========================================
   1. CURSOR GLOW
   ========================================== */
(function initCursorGlow() {
  const glow = qs('#cursorGlow');
  if (!glow || window.matchMedia('(pointer: coarse)').matches) return;
  // Don't show on touch/mobile devices

  let rafId;
  let cx = 0, cy = 0;
  let tx = 0, ty = 0;
  const LERP = 0.12;

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    glow.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    glow.classList.remove('active');
  });

  // Hover on interactive elements → bigger glow
  const hoverEls = 'a, button, .btn-ghost, .price-row, .contact-row';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverEls)) glow.classList.add('hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverEls)) glow.classList.remove('hover');
  });

  function animate() {
    cx += (tx - cx) * LERP;
    cy += (ty - cy) * LERP;
    glow.style.left = `${cx}px`;
    glow.style.top  = `${cy}px`;
    rafId = requestAnimationFrame(animate);
  }
  animate();
})();

/* ==========================================
   2. LOADING SCREEN
   ========================================== */
(function initLoader() {
  const loader    = qs('#loader');
  const line      = qs('#loaderLine');
  const hint      = qs('#loaderHint');
  if (!loader || !line) return;

  let dismissed   = false;
  let lineStarted = false;

  // Animate the progress line
  function startLine() {
    if (lineStarted) return;
    lineStarted = true;
    let w = 0;
    const target = 100;
    const DURATION = 1600; // ms
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      w = eased * target;
      line.style.width = `${w}%`;
      line.style.transition = 'none';

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Line complete: show hint blinking
        hint.style.opacity = '1';
      }
    }
    requestAnimationFrame(step);
  }

  // Dismiss function
  function dismiss() {
    if (dismissed) return;
    dismissed = true;

    // Force line to 100%
    line.style.transition = 'width 0.25s ease';
    line.style.width = '100%';

    setTimeout(() => {
      loader.classList.add('gone');
      // After fade, trigger hero reveals
      setTimeout(triggerHeroReveals, 400);
    }, 260);
  }

  // Start line after a short paint delay
  setTimeout(startLine, 300);

  // User can click anytime to dismiss
  loader.addEventListener('click', dismiss);
  loader.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') dismiss();
  });
  loader.setAttribute('tabindex', '0');

  // Auto-dismiss after 2.4s even without click
  setTimeout(dismiss, 2400);
})();

/* ==========================================
   3. HERO REVEALS (called after loader gone)
   ========================================== */
function triggerHeroReveals() {
  qsa('.hero .reveal').forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, i * 130);
  });
}

/* ==========================================
   4. SCROLL REVEAL (IntersectionObserver)
   ========================================== */
(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.10, rootMargin: '0px 0px -48px 0px' }
  );

  // Observe everything except hero (handled by triggerHeroReveals)
  qsa('.reveal').forEach(el => {
    if (!el.closest('.hero')) observer.observe(el);
  });
})();

/* ==========================================
   5. LUXURY DIVIDER ANIMATION
   ========================================== */
(function initDividers() {
  const dividers = qsa('[data-divider]');
  if (!dividers.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  dividers.forEach(d => obs.observe(d));
})();

/* ==========================================
   6. NAVBAR — scroll elevation
   ========================================== */
(function initNavbar() {
  const nav = qs('.navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('elevated', window.scrollY > 24);
  }, { passive: true });
})();

/* ==========================================
   7. MOBILE MENU
   ========================================== */
(function initMobileMenu() {
  const toggle = qs('#navToggle');
  const menu   = qs('#navMenu');
  if (!toggle || !menu) return;

  function close() {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close on link click
  qsa('.nav-link', menu).forEach(l => l.addEventListener('click', close));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) close();
  });
})();

/* ==========================================
   8. SMOOTH SCROLL (with navbar offset)
   ========================================== */
(function initSmoothScroll() {
  const OFFSET = 70;

  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = qs(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ==========================================
   9. ACTIVE NAV LINK
   ========================================== */
(function initActiveNav() {
  const sections = qsa('section[id]');
  const links    = qsa('.nav-link');
  const OFFSET   = 100;

  function update() {
    const y = window.scrollY;
    let current = '';

    sections.forEach(sec => {
      if (y >= sec.offsetTop - OFFSET) current = sec.id;
    });

    links.forEach(l => {
      const active = l.getAttribute('href') === `#${current}`;
      l.classList.toggle('active', active);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ==========================================
   10. REAL-TIME CLOCK
   ========================================== */
(function initClock() {
  const clockEl  = qs('#liveClock');
  const dotEl    = qs('#statusDot');
  const textEl   = qs('#statusText');
  if (!clockEl) return;

  const OPEN_H  = 9;
  const CLOSE_H = 21;

  function tick() {
    const now  = new Date();
    const h    = now.getHours();
    const m    = now.getMinutes().toString().padStart(2, '0');
    const hStr = h.toString().padStart(2, '0');

    clockEl.textContent = `${hStr}:${m}`;

    const isOpen = h >= OPEN_H && h < CLOSE_H;
    if (dotEl)  { dotEl.classList.toggle('open', isOpen); dotEl.classList.toggle('closed', !isOpen); }
    if (textEl) { textEl.textContent = isOpen ? 'Open Now' : 'Closed'; }
  }

  tick();
  setInterval(tick, 1000); // update every second for accurate HH:MM
})();

/* ==========================================
   11. QUOTE LINE ANIMATION (hero blockquote)
      handled via CSS — .hero-quote.visible
      but we also ensure it's triggered
   ========================================== */
(function initQuoteLines() {
  const quote = qs('.hero-quote');
  if (!quote) return;
  // Quote lines animate via CSS when .visible is added (handled by triggerHeroReveals)
})();

/* ==========================================
   12. PRICE ROW — subtle entrance stagger
      (handled via CSS nth-child delay)
   ========================================== */

/* ==========================================
   EOF
   ========================================== */
