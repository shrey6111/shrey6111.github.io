gsap.registerPlugin(ScrollTrigger);

/* ==============================
   INITIAL STATES (before any animation)
   GSAP owns all hidden/transform states
============================== */
gsap.set('#navbar',          { autoAlpha: 0, y: -20 });
gsap.set('.hero-eyebrow',    { autoAlpha: 0, y: 22 });
gsap.set('.name-text',       { y: '108%' });
gsap.set('.hero-tagline',    { autoAlpha: 0, y: 18 });
gsap.set('.hero-meta',       { autoAlpha: 0 });

// Scroll-animated elements start invisible
gsap.set('.statement-copy',  { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' });
gsap.set('.project-row',     { autoAlpha: 0, y: 40 });
gsap.set('.about-lead',      { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' });
gsap.set('.about-body',      { autoAlpha: 0, y: 20 });
gsap.set('.about-links',     { autoAlpha: 0 });
gsap.set('.about-right',     { autoAlpha: 0 });
gsap.set('.contact-title',   { autoAlpha: 0, scale: 0.88 });
gsap.set('.contact-sub',     { autoAlpha: 0, y: 20 });
gsap.set('.cta-btn',         { autoAlpha: 0, y: 20 });
gsap.set('#sc0',             { autoAlpha: 1, y: 0 });
gsap.set(['#sc1', '#sc2'],   { autoAlpha: 0, y: 36 });
gsap.set('.showcase-device', { scale: 0.28, autoAlpha: 0.4 });
gsap.set('#about .section-label', { autoAlpha: 0, y: 16 });
gsap.set('#work .section-label',  { autoAlpha: 0, y: 16 });

/* ==============================
   CUSTOM CURSOR
============================== */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

document.addEventListener('mousemove', (e) => {
  gsap.to(cursorDot,  { x: e.clientX, y: e.clientY, duration: 0 });
  gsap.to(cursorRing, { x: e.clientX, y: e.clientY, duration: 0.22, ease: 'power2.out' });
});

document.querySelectorAll('a, button, .project-row').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursorRing, { scale: 1.6, borderColor: 'rgba(255,43,43,0.7)', duration: 0.28 });
    gsap.to(cursorDot,  { scale: 0, duration: 0.18 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursorRing, { scale: 1, borderColor: 'rgba(255,255,255,0.25)', duration: 0.28 });
    gsap.to(cursorDot,  { scale: 1, duration: 0.18 });
  });
});

/* ==============================
   LOADER → HERO ENTRANCE
============================== */
const intro = gsap.timeline({
  onComplete: initScrollAnimations
});

intro
  .to('.loader-letter', {
    autoAlpha: 1,
    scale: 1,
    duration: 0.65,
    ease: 'power3.out'
  })
  .to('.loader-letter', {
    scale: 1.15,
    duration: 0.28,
    ease: 'power2.in'
  }, '+=0.35')
  .to('#loader', {
    autoAlpha: 0,
    duration: 0.5,
    ease: 'power2.inOut',
    pointerEvents: 'none'
  })
  .to('#navbar', {
    autoAlpha: 1,
    y: 0,
    duration: 0.55,
    ease: 'power3.out'
  }, '-=0.1')
  .to('.hero-eyebrow', {
    autoAlpha: 1,
    y: 0,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.3')
  .to('.name-text', {
    y: '0%',
    duration: 1.05,
    ease: 'power4.out'
  }, '-=0.38')
  .to('.hero-tagline', {
    autoAlpha: 1,
    y: 0,
    duration: 0.55,
    ease: 'power2.out'
  }, '-=0.55')
  .to('.hero-meta', {
    autoAlpha: 1,
    duration: 0.6
  }, '-=0.4');

/* Hero parallax out as user scrolls away */
gsap.to('.hero-inner', {
  y: '-12%',
  autoAlpha: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

gsap.to('.hero-glow', {
  y: '-20%',
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

/* ==============================
   SCROLL ANIMATIONS
============================== */
function initScrollAnimations() {

  /* Nav blur on scroll */
  ScrollTrigger.create({
    start: 'top -64',
    onUpdate: () => {
      const scrolled = window.scrollY > 64;
      document.getElementById('navbar').classList.toggle('scrolled', scrolled);
    }
  });

  /* Section labels */
  gsap.to('#work .section-label', {
    autoAlpha: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: { trigger: '#work .section-label', start: 'top 88%' }
  });

  gsap.to('#about .section-label', {
    autoAlpha: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: { trigger: '#about .section-label', start: 'top 88%' }
  });

  /* Statement: clip-path wipe — the "reflection reveal" */
  gsap.to('.statement-copy', {
    autoAlpha: 1,
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.4,
    ease: 'power3.inOut',
    scrollTrigger: { trigger: '#statement', start: 'top 75%' }
  });

  gsap.to('.highlight', {
    color: '#ffffff',
    duration: 0.7,
    stagger: 0.25,
    scrollTrigger: { trigger: '#statement', start: 'top 65%' }
  });

  /* Project rows: stagger slide-up */
  gsap.to('.project-row', {
    autoAlpha: 1,
    y: 0,
    duration: 0.85,
    stagger: 0.13,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.project-list', start: 'top 82%' }
  });

  /* ============================
     SHOWCASE — Apple zoom + pin
  ============================ */
  const showTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.showcase-stage',
      pin: true,
      start: 'top top',
      end: '+=220%',
      scrub: 1.5,
      anticipatePin: 1
    }
  });

  showTl
    /* Device zooms in (the hero zoom-in effect) */
    .to('.showcase-device', {
      scale: 1,
      autoAlpha: 1,
      duration: 1,
      ease: 'power2.inOut'
    })
    /* Caption 0 exits */
    .to('#sc0', { autoAlpha: 0, y: -36, duration: 0.3 }, 0.55)
    /* Caption 1 enters */
    .to('#sc1', { autoAlpha: 1, y: 0,   duration: 0.3 }, 0.72)
    /* Caption 1 exits */
    .to('#sc1', { autoAlpha: 0, y: -36, duration: 0.3 }, 1.38)
    /* Caption 2 enters */
    .to('#sc2', { autoAlpha: 1, y: 0,   duration: 0.3 }, 1.55)
    /* Device glows red on final reveal */
    .to('.device-frame', {
      boxShadow: '0 0 0 1px rgba(255,43,43,0.3), 0 60px 120px rgba(0,0,0,0.95)',
      duration: 0.4
    }, 1.55);

  /* About: lead clip-path reveal */
  gsap.to('.about-lead', {
    autoAlpha: 1,
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.3,
    ease: 'power3.inOut',
    scrollTrigger: { trigger: '.about-lead', start: 'top 78%' }
  });

  gsap.to('.about-body', {
    autoAlpha: 1,
    y: 0,
    duration: 0.75,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: { trigger: '#about .about-left', start: 'top 76%' }
  });

  gsap.to('.about-links', {
    autoAlpha: 1,
    duration: 0.6,
    scrollTrigger: { trigger: '.about-links', start: 'top 88%' }
  });

  gsap.to('.about-right', {
    autoAlpha: 1,
    duration: 0.8,
    scrollTrigger: { trigger: '.about-right', start: 'top 80%' }
  });

  /* Contact: scale + fade reveal */
  gsap.to('.contact-title', {
    autoAlpha: 1,
    scale: 1,
    duration: 1.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '#contact', start: 'top 80%' }
  });

  gsap.to('.contact-sub', {
    autoAlpha: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: { trigger: '#contact', start: 'top 70%' }
  });

  gsap.to('.cta-btn', {
    autoAlpha: 1,
    y: 0,
    duration: 0.7,
    delay: 0.15,
    ease: 'power2.out',
    scrollTrigger: { trigger: '#contact', start: 'top 70%' }
  });
}
