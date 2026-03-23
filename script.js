/* =============================================
   BARBARSHOP — script.js
   Animations, Interactions & Behaviors
   ============================================= */

/* ===========================
   1. NAVBAR — Scroll & Mobile
   =========================== */
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Sticky shadow on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// Mobile hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');
    const navLink       = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.style.color = '');
        navLink.style.color = 'var(--gold)';
      }
    }
  });
};

window.addEventListener('scroll', highlightNav, { passive: true });


/* ===========================
   2. SCROLL REVEAL ANIMATION
   =========================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger children if inside a grid
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Number(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  }
);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach((el, i) => {
  // Add stagger delay based on position
  const parent = el.closest('.price-grid, .contact-grid');
  if (parent) {
    const siblings = [...parent.querySelectorAll('.reveal')];
    const index    = siblings.indexOf(el);
    el.dataset.delay = index * 90;
  }
  revealObserver.observe(el);
});


/* ===========================
   3. SMOOTH SCROLL
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const navHeight = navbar.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
  });
});


/* ===========================
   4. PRICE CARD HOVER EFFECTS
   =========================== */
document.querySelectorAll('.price-card, .contact-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) *  4;

    card.style.transform =
      `translateY(-6px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
    setTimeout(() => {
      card.style.transition = '';
    }, 400);
  });
});


/* ===========================
   5. HERO TITLE — LETTER ENTRANCE
   =========================== */
window.addEventListener('DOMContentLoaded', () => {
  const titleThin = document.querySelector('.title-thin');
  const titleGold = document.querySelector('.title-gold');

  if (titleThin && titleGold) {
    // Wrap characters in spans
    const wrapChars = (element) => {
      const text = element.textContent;
      element.innerHTML = text.split('').map((char, i) =>
        `<span style="
          display: inline-block;
          opacity: 0;
          transform: translateY(24px);
          animation: charEntrance 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 0.06 + 0.2}s forwards;
        ">${char}</span>`
      ).join('');
    };

    wrapChars(titleThin);
    wrapChars(titleGold);

    // Inject keyframe
    if (!document.getElementById('charEntrance')) {
      const style = document.createElement('style');
      style.id = 'charEntrance';
      style.textContent = `
        @keyframes charEntrance {
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }
  }
});


/* ===========================
   6. BARBER POLE — SPEED ON HOVER
   =========================== */
const poleStripes = document.querySelector('.pole-stripes');
const poleWrapper = document.querySelector('.pole-wrapper');

if (poleWrapper && poleStripes) {
  poleWrapper.addEventListener('mouseenter', () => {
    poleStripes.style.animationDuration = '0.8s';
  });
  poleWrapper.addEventListener('mouseleave', () => {
    poleStripes.style.animationDuration = '2.2s';
  });
}


/* ===========================
   7. BUTTON RIPPLE EFFECT
   =========================== */
document.querySelectorAll('.btn-primary, .contact-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect   = this.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: 0; height: 0;
      border-radius: 50%;
      background: rgba(255,255,255,0.4);
      transform: translate(-50%, -50%);
      left: ${x}px; top: ${y}px;
      animation: rippleEffect 0.55s ease-out forwards;
      pointer-events: none;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple keyframe
(function () {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleEffect {
      to { width: 200px; height: 200px; opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();


/* ===========================
   8. FOOTER YEAR AUTO UPDATE
   =========================== */
const footerCopy = document.querySelector('.footer-copy');
if (footerCopy) {
  const currentYear = new Date().getFullYear();
  footerCopy.innerHTML = footerCopy.innerHTML.replace('2026', currentYear);
}


/* ===========================
   9. PAGE LOAD FADE IN
   =========================== */
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
