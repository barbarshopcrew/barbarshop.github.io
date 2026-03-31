/* ============================================================
   BARBARSHOP v2 — style.css
   Ultra Clean · White Luxury · Typography-First
   ============================================================ */

/* ---------- TOKENS ---------- */
:root {
  --gold:         #D4AF37;
  --gold-muted:   rgba(212,175,55,0.15);
  --gold-border:  rgba(212,175,55,0.28);
  --gold-glow:    rgba(212,175,55,0.35);

  --ink:          #111111;
  --ink-light:    #444444;
  --ink-faint:    #888888;
  --mist:         #F7F7F5;
  --white:        #FFFFFF;
  --divider:      rgba(0,0,0,0.08);

  --ff-display:   'Playfair Display', Georgia, serif;
  --ff-body:      'Poppins', sans-serif;

  --ease:         cubic-bezier(0.4, 0, 0.2, 1);
  --dur:          0.35s;

  --max-w:        1060px;
  --section-px:   clamp(24px, 6vw, 80px);
  --section-py:   clamp(80px, 10vw, 140px);
}

/* ---------- RESET ---------- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--ff-body);
  font-weight: 300;
  color: var(--ink);
  background: var(--white);
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
a { text-decoration: none; color: inherit; }
ul { list-style: none; }
::selection { background: var(--gold-muted); }
:focus-visible { outline: 1.5px solid var(--gold); outline-offset: 3px; }

/* ============================================================
   CURSOR GLOW
   ============================================================ */
#cursorGlow {
  position: fixed;
  pointer-events: none;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: opacity 0.4s ease, width 0.3s ease, height 0.3s ease;
  z-index: 0;
  opacity: 0;
  mix-blend-mode: multiply;
}
#cursorGlow.active { opacity: 1; }
#cursorGlow.hover  { width: 460px; height: 460px; }

/* ============================================================
   LOADER
   ============================================================ */
#loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.7s var(--ease), visibility 0.7s var(--ease);
}
#loader.gone { opacity: 0; visibility: hidden; pointer-events: none; }

.loader-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  user-select: none;
}

.loader-eyebrow {
  font-family: var(--ff-body);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 14px;
  animation: fadeUp 0.7s var(--ease) both;
}

.loader-logo {
  font-family: var(--ff-display);
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  font-weight: 700;
  font-style: italic;
  color: var(--ink);
  letter-spacing: 0.03em;
  line-height: 1;
  animation: fadeUp 0.7s 0.12s var(--ease) both;
  text-shadow: 0 0 60px rgba(212,175,55,0.20);
}

.loader-line-wrap {
  width: clamp(120px, 22vw, 200px);
  height: 1px;
  background: rgba(212,175,55,0.15);
  margin: 28px auto 22px;
  position: relative;
  overflow: hidden;
  animation: fadeUp 0.5s 0.25s var(--ease) both;
}
.loader-line {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 0%;
  background: linear-gradient(90deg, transparent, var(--gold), var(--gold));
  transition: none;
  box-shadow: 0 0 10px rgba(212,175,55,0.6);
}

.loader-hint {
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-faint);
  animation: loaderHintPulse 2.2s 1s ease-in-out infinite;
}
@keyframes loaderHintPulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
}

/* ============================================================
   NAVBAR
   ============================================================ */
.navbar {
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: 500;
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--divider);
  transition: box-shadow var(--dur) var(--ease);
}
.navbar.elevated { box-shadow: 0 4px 32px rgba(0,0,0,0.07); }

.nav-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 var(--section-px);
  height: 66px;
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-brand {
  font-family: var(--ff-display);
  font-style: italic;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: 0.03em;
  transition: color var(--dur);
  flex-shrink: 0;
}
.nav-brand:hover { color: var(--gold); }

.nav-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* Status pill */
.live-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.status-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--ink-faint);
  transition: background 0.5s;
  flex-shrink: 0;
}
.status-dot.open  { background: #3dcc7a; box-shadow: 0 0 0 3px rgba(61,204,122,0.18); }
.status-dot.closed { background: #e05555; }
.status-text      { color: var(--ink-light); }

.live-clock {
  font-family: var(--ff-display);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: 0.08em;
  opacity: 0.7;
}

/* Mobile toggle */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 6px;
  padding: 4px;
  flex-shrink: 0;
}
.nav-toggle span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--ink);
  border-radius: 2px;
  transform-origin: center;
  transition: transform var(--dur) var(--ease), opacity var(--dur);
}
.nav-toggle.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
.nav-toggle.open span:nth-child(2) { transform: translateY(-7.5px) rotate(-45deg); }

.nav-menu {
  display: flex;
  gap: 36px;
  align-items: center;
  flex-shrink: 0;
}
.nav-link {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-light);
  position: relative;
  padding-bottom: 3px;
  transition: color var(--dur);
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 0; height: 1px;
  background: var(--gold);
  transition: width var(--dur) var(--ease);
}
.nav-link:hover        { color: var(--ink); }
.nav-link:hover::after { width: 100%; }
.nav-link.active       { color: var(--ink); }
.nav-link.active::after { width: 100%; }

/* ============================================================
   HERO
   ============================================================ */
.hero {
  min-height: 100svh;
  padding: 120px var(--section-px) 80px;
  background: var(--white);
  position: relative;
  display: flex;
  align-items: center;
}

/* Subtle vertical hairlines for texture */
.hero-texture {
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: flex;
  justify-content: space-evenly;
}
.hero-texture span {
  width: 1px;
  background: linear-gradient(to bottom, transparent 10%, rgba(212,175,55,0.06) 40%, rgba(212,175,55,0.06) 60%, transparent 90%);
}

.hero-layout {
  max-width: var(--max-w);
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
}

/* --- Hero Copy --- */
.hero-copy { flex: 1; }

.hero-kicker {
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 22px;
}

.hero-headline {
  font-family: var(--ff-display);
  font-size: clamp(3rem, 5.5vw, 5.2rem);
  line-height: 1.10;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 28px;
}
.hero-headline em       { font-style: italic; }
.headline-thin          { font-weight: 400; color: var(--ink-light); }
.headline-gold          { color: var(--gold); }

.hero-desc {
  font-size: 1rem;
  font-weight: 300;
  color: var(--ink-light);
  max-width: 460px;
  margin-bottom: 40px;
  line-height: 1.85;
}

/* Quote */
.hero-quote {
  position: relative;
  margin: 0 0 44px 0;
  padding: 20px 0;
  max-width: 500px;
}
.hero-quote p {
  font-family: var(--ff-display);
  font-style: italic;
  font-size: clamp(0.95rem, 1.6vw, 1.10rem);
  color: var(--ink-light);
  line-height: 1.75;
  font-weight: 400;
}
.quote-line-top,
.quote-line-bottom {
  width: 0;               /* animated via JS */
  height: 1px;
  background: linear-gradient(to right, var(--gold), transparent);
  transition: width 1s var(--ease);
}
.quote-line-top   { margin-bottom: 16px; }
.quote-line-bottom { margin-top: 16px; }
.hero-quote.visible .quote-line-top,
.hero-quote.visible .quote-line-bottom { width: 100%; }

/* Ghost button */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--ff-body);
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink);
  border: 1px solid rgba(0,0,0,0.18);
  padding: 13px 28px;
  border-radius: 2px;
  transition:
    border-color var(--dur) var(--ease),
    box-shadow  var(--dur) var(--ease),
    color       var(--dur) var(--ease),
    transform   var(--dur) var(--ease);
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.btn-ghost::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gold-muted);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur) var(--ease);
  z-index: -1;
}
.btn-ghost:hover {
  border-color: var(--gold);
  color: var(--ink);
  box-shadow: 0 0 22px var(--gold-glow);
  transform: translateY(-2px);
}
.btn-ghost:hover::before { transform: scaleX(1); }
.btn-arrow {
  transition: transform var(--dur) var(--ease);
  font-style: normal;
}
.btn-ghost:hover .btn-arrow { transform: translateX(5px); }

.hero-actions { margin-top: 44px; }

/* Scroll indicator */
.hero-scroll {
  position: absolute;
  bottom: 38px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: var(--ink-faint);
  font-size: 0.60rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}
.scroll-track {
  width: 1px;
  height: 50px;
  background: rgba(0,0,0,0.10);
  position: relative;
  overflow: hidden;
}
.scroll-thumb {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 40%;
  background: var(--gold);
  animation: scrollDown 2s var(--ease) infinite;
}
@keyframes scrollDown {
  0%   { top: -40%; }
  100% { top: 140%; }
}

/* ============================================================
   BARBER POLE
   ============================================================ */
.pole-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 78px;
}

.pole-aura {
  position: absolute;
  inset: -40px;
  background: radial-gradient(ellipse 55% 70% at 50% 50%, rgba(212,175,55,0.13), transparent 70%);
  animation: auraBreath 4s ease-in-out infinite alternate;
  pointer-events: none;
}
@keyframes auraBreath {
  from { opacity: 0.5; transform: scale(0.95); }
  to   { opacity: 1;   transform: scale(1.05); }
}

.pole-top-cap,
.pole-bottom-cap {
  width: 72px;
  height: 16px;
  background: linear-gradient(160deg, #e8e8e8, #c8c8c8);
  border-radius: 4px;
  position: relative;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12), 0 0 0 1px var(--gold-border);
}
.pole-top-cap    { border-radius: 6px 6px 3px 3px; }
.pole-bottom-cap { border-radius: 3px 3px 6px 6px; }

.pole-cylinder {
  width: 52px;
  height: 320px;
  border-radius: 26px;
  overflow: hidden;
  position: relative;
  box-shadow:
    inset -8px 0 16px rgba(0,0,0,0.14),
    inset 8px 0 16px rgba(255,255,255,0.55),
    0 0 0 1px var(--gold-border);
}

.pole-stripe-track {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    -45deg,
    #bb1f1f 0px, #bb1f1f 16px,
    #f5f5f5 16px, #f5f5f5 32px,
    #1b3580 32px, #1b3580 48px,
    #f5f5f5 48px, #f5f5f5 64px
  );
  background-size: 100% 64px;
  animation: stripeUp 1.3s linear infinite;
}
@keyframes stripeUp {
  from { background-position: 0 0; }
  to   { background-position: 0 -64px; }
}

.pole-sheen {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.08)    0%,
    rgba(255,255,255,0) 20%,
    rgba(255,255,255,0.50) 38%,
    rgba(255,255,255,0) 55%,
    rgba(0,0,0,0.12)   100%
  );
  pointer-events: none;
}

.pole-pedestal {
  width: 64px;
  height: 14px;
  background: linear-gradient(160deg, #e0e0e0, #bfbfbf);
  border-radius: 2px 2px 6px 6px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.14), 0 0 0 1px var(--gold-border);
  margin-top: -1px;
}

/* ============================================================
   LUXURY DIVIDER
   ============================================================ */
.lux-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--section-px);
  gap: 20px;
  overflow: hidden;
}
.lux-divider-line {
  flex: 1;
  max-width: 380px;
  height: 1px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 1s var(--ease);
}
.lux-divider-line:last-child { transform-origin: right center; }
.lux-divider.revealed .lux-divider-line { transform: scaleX(1); }
.lux-divider-mark {
  color: var(--gold);
  font-size: 0.7rem;
  opacity: 0.65;
  flex-shrink: 0;
}

/* ============================================================
   SECTION SHARED
   ============================================================ */
.section { padding: var(--section-py) var(--section-px); }
.section-wrap { max-width: var(--max-w); margin: 0 auto; }

.section-header { margin-bottom: 64px; }
.section-eyebrow {
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 14px;
}
.section-title {
  font-family: var(--ff-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--ink);
  line-height: 1.15;
  margin-bottom: 16px;
}
.section-title em { font-style: italic; }
.section-note {
  font-size: 0.92rem;
  color: var(--ink-faint);
  max-width: 420px;
  line-height: 1.8;
}

/* ============================================================
   PRICE LIST — Typography Only
   ============================================================ */
.price-list { border-top: 1px solid var(--divider); }

.price-row {
  display: flex;
  align-items: baseline;
  gap: 0;
  padding: 26px 0;
  border-bottom: 1px solid var(--divider);
  transition: background var(--dur);
  position: relative;
}
.price-row::after {
  content: '';
  position: absolute;
  bottom: -1px; left: 0;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width 0.5s var(--ease);
}
.price-row:hover::after { width: 100%; }

.price-service {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
  min-width: 200px;
}
.service-name {
  font-family: var(--ff-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 10px;
}
.service-note {
  font-size: 0.74rem;
  color: var(--ink-faint);
  font-style: italic;
  font-weight: 300;
}

/* Dot leader */
.price-dots {
  flex: 1;
  min-width: 40px;
  position: relative;
  align-self: flex-end;
  height: 1.1em;
  overflow: hidden;
  margin: 0 16px;
}
.price-dots::before {
  content: '··················································································';
  position: absolute;
  bottom: 3px;
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: rgba(0,0,0,0.12);
  white-space: nowrap;
}

.price-amount {
  font-family: var(--ff-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ink);
  text-align: right;
  flex-shrink: 0;
  white-space: nowrap;
}

/* Special row – Anak Yatim */
.price-row--special { background: transparent; }
.price-row--special .service-name { color: var(--gold); }
.price-row--special .price-dots::before { color: rgba(212,175,55,0.20); }
.price-amount--free {
  color: var(--gold);
  font-weight: 700;
  letter-spacing: 0.08em;
}

.special-label {
  display: inline-block;
  font-family: var(--ff-body);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--white);
  background: var(--gold);
  padding: 2px 9px;
  border-radius: 2px;
  vertical-align: middle;
  line-height: 1.6;
}

.price-footer-note {
  font-size: 0.74rem;
  color: var(--ink-faint);
  font-style: italic;
  padding-top: 28px;
  font-weight: 300;
}

/* ============================================================
   CONTACT — List Style
   ============================================================ */
.contact-list { display: flex; flex-direction: column; }

.contact-row {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 36px 0;
}

.contact-icon-wrap {
  width: 44px;
  height: 44px;
  border: 1px solid var(--divider);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color var(--dur), box-shadow var(--dur);
}
.contact-row:hover .contact-icon-wrap {
  border-color: var(--gold);
  box-shadow: 0 0 18px var(--gold-glow);
}
.contact-icon-wrap svg {
  width: 18px;
  height: 18px;
  color: var(--ink-light);
  transition: color var(--dur);
}
.contact-row:hover .contact-icon-wrap svg { color: var(--gold); }

.contact-info { flex: 1; }
.contact-label {
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 4px;
}
.contact-value {
  font-family: var(--ff-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ink);
}

.contact-divider {
  height: 1px;
  background: var(--divider);
  margin: 0;
}

/* ============================================================
   FLOATING WHATSAPP BUTTON
   ============================================================ */
.wa-float {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 400;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--white);
  border: 1.5px solid var(--gold-border);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease), border-color var(--dur);
}
.wa-float:hover {
  transform: translateY(-4px) scale(1.08);
  box-shadow: 0 8px 32px var(--gold-glow);
  border-color: var(--gold);
}
.wa-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold);
}
.wa-icon svg { width: 22px; height: 22px; }

/* ============================================================
   FOOTER
   ============================================================ */
.footer { padding: 0 var(--section-px) 48px; }
.footer-line { height: 1px; background: var(--divider); margin-bottom: 40px; }
.footer-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}
.footer-brand {
  font-family: var(--ff-display);
  font-style: italic;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ink);
}
.footer-copy {
  font-size: 0.72rem;
  color: var(--ink-faint);
  letter-spacing: 0.06em;
}
.footer-socials {
  display: flex;
  align-items: center;
  gap: 12px;
}
.footer-link {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
  transition: color var(--dur);
}
.footer-link:hover { color: var(--gold); }
.footer-dot { color: var(--gold); opacity: 0.4; }

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s var(--ease), transform 0.65s var(--ease);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger within parent groups */
.hero-copy .reveal:nth-child(1) { transition-delay: 0.05s; }
.hero-copy .reveal:nth-child(2) { transition-delay: 0.14s; }
.hero-copy .reveal:nth-child(3) { transition-delay: 0.22s; }
.hero-copy .reveal:nth-child(4) { transition-delay: 0.30s; }
.hero-copy .reveal:nth-child(5) { transition-delay: 0.38s; }
.price-list .reveal:nth-child(1) { transition-delay: 0.00s; }
.price-list .reveal:nth-child(2) { transition-delay: 0.07s; }
.price-list .reveal:nth-child(3) { transition-delay: 0.14s; }
.price-list .reveal:nth-child(4) { transition-delay: 0.21s; }
.price-list .reveal:nth-child(5) { transition-delay: 0.28s; }
.price-list .reveal:nth-child(6) { transition-delay: 0.35s; }

/* ============================================================
   KEYFRAMES
   ============================================================ */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ============================================================
   RESPONSIVE — TABLET
   ============================================================ */
@media (max-width: 860px) {
  .hero-layout {
    flex-direction: column;
    align-items: flex-start;
    gap: 56px;
  }
  .pole-wrap { align-self: center; }
  .hero-copy { max-width: 100%; }

  .nav-center { display: none; }
}

/* ============================================================
   RESPONSIVE — MOBILE
   ============================================================ */
@media (max-width: 620px) {
  :root { --section-px: 22px; --section-py: 72px; }

  /* Navbar mobile */
  .nav-toggle { display: flex; }
  .nav-menu {
    display: none;
    position: fixed;
    inset-block-start: 66px;
    inset-inline: 0;
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(16px);
    flex-direction: column;
    padding: 32px var(--section-px) 40px;
    gap: 32px;
    border-bottom: 1px solid var(--divider);
    box-shadow: 0 8px 32px rgba(0,0,0,0.06);
  }
  .nav-menu.open  { display: flex; }
  .nav-link       { font-size: 0.82rem; }

  /* Hero */
  .hero-headline  { font-size: 2.7rem; }
  .hero-desc      { font-size: 0.92rem; }

  /* Pole */
  .pole-cylinder  { height: 200px; width: 44px; }
  .pole-top-cap,
  .pole-bottom-cap{ width: 60px; }
  .pole-pedestal  { width: 54px; }
  .pole-wrap      { width: 64px; }

  /* Price */
  .price-service  { min-width: 130px; }
  .price-dots::before { content: '·····················'; }
  .price-amount   { font-size: 0.9rem; }

  /* Contact row */
  .contact-row    { flex-wrap: wrap; gap: 16px; }
  .contact-row .btn-ghost { margin-left: 72px; }

  /* Footer */
  .footer-inner   { flex-direction: column; align-items: flex-start; gap: 10px; }

  /* Float WA */
  .wa-float { bottom: 22px; right: 22px; width: 46px; height: 46px; }
}
