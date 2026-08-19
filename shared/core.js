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
        duration: 2.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -11 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.1,
    });
    if (HAS_GSAP) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }
}


// ---- CONVERSION PATHS ----
const RESERVATION_PHONE = '8801841965676';
const RESERVATION_MESSAGE = "Hi Yokoso, I'd like to reserve a table for ";
const WHATSAPP_RESERVE_URL = `https://wa.me/${RESERVATION_PHONE}?text=${encodeURIComponent(RESERVATION_MESSAGE)}`;
const CONTACT_EMAIL = '';
const DELIVERY_URL = '';
const HERO_VIDEO_SRC = 'assets/yokoso-hero-ink-loop.mp4';
