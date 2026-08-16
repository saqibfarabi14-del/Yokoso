'use strict';

// ---- GLOBAL CONSTANTS ----
const HAS_GSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof SplitText !== 'undefined';
const HAS_LENIS = typeof Lenis !== 'undefined';

const MOTION = {
    dur: { xs: 0.15, sm: 0.3, md: 0.6, lg: 0.9, xl: 1.4 },
    ease: {
        out: 'power4.out',
        inOut: 'power2.inOut',
        stamp: 'back.out(1.7)',
        ink: 'power2.out'
    }
};

// ---- FALLBACK SCROLL HELPER ----
const scrollToEl = (el, offset = 0) => {
    if (!el) return;
    if (HAS_LENIS && lenis) {
        lenis.scrollTo(el, { offset: offset, duration: 1.2 });
    } else {
        const top = el.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
};

// ---- NO-MOTION FALLBACK & STUBS ----
if (!HAS_GSAP) {
    document.documentElement.classList.add('no-motion');
    window.gsap = {
        registerPlugin: () => {},
        set: () => {},
        fromTo: () => {},
        to: () => {},
        ticker: { add: () => {}, lagSmoothing: () => {} }
    };
    window.ScrollTrigger = {
        create: () => {},
        getAll: () => [],
        refresh: () => {},
        kill: () => {}
    };
} else {
    gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
}

// ---- LENIS ----
let lenis = null;
if (HAS_LENIS) {
    lenis = new Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
    });
    if (HAS_GSAP) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }
}

// ---- CURSOR (conditional) ----
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
const dot = document.createElement('div');
dot.id = 'cursorDot';
dot.className = 'cursor-dot';
dot.setAttribute('aria-hidden', 'true');
const ring = document.createElement('div');
ring.id = 'cursorRing';
ring.className = 'cursor-ring';
ring.setAttribute('aria-hidden', 'true');
document.body.appendChild(dot);
document.body.appendChild(ring);

if (!isTouchDevice && dot && ring && HAS_GSAP) {
    document.body.classList.add('cursor-active');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX, y = e.clientY;
        dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
        ring.style.transform = `translate(${x - 20}px, ${y - 20}px)`;
    });
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .dish-card-trigger, .seal-mark, .magnetic-btn')) {
            ring.classList.add('hover');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, .dish-card-trigger, .seal-mark, .magnetic-btn')) {
            ring.classList.remove('hover');
        }
    });
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
}

// ---- CONVERSION PATHS ----
const RESERVATION_PHONE = '8801841965676';
const RESERVATION_MESSAGE = "Hi Yokoso, I'd like to reserve a table for ";
const WHATSAPP_RESERVE_URL = `https://wa.me/${RESERVATION_PHONE}?text=${encodeURIComponent(RESERVATION_MESSAGE)}`;
const CONTACT_EMAIL = '';
const DELIVERY_URL = '';
const HERO_VIDEO_SRC = 'https://raw.githubusercontent.com/saqibfarabi14-del/Yokoso/main/assets/yokoso-hero-ink-loop.mp4';
