'use strict';

const { useState, useEffect, useRef } = React;

// ---- Mobile/Performance Hooks ----
const useIsTouch = () => {
    const [isTouch, setIsTouch] = useState(false);
    useEffect(() => setIsTouch(window.matchMedia('(pointer: coarse)').matches), []);
    return isTouch;
};

const useMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return isMobile;
};

const useLazyLoad = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if (!ref.current || isVisible) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { rootMargin: '200px' });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [isVisible]);
    return { ref, isVisible };
};

// ---- useScrollSkew Hook ----
const useScrollSkew = () => {
    useEffect(() => {
        if (!HAS_GSAP) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;

        const proxy = { skew: 0 };
        const clamp = gsap.utils.clamp(-6, 6);
        const els = document.querySelectorAll('.skew-target');
        if (!els.length) return;

        const st = ScrollTrigger.create({
            onUpdate: (self) => {
                const skew = clamp(self.getVelocity() / -400);
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew;
                    gsap.to(proxy, {
                        skew: 0, duration: 0.8, ease: 'power3', overwrite: true,
                        onUpdate: () => {
                            els.forEach(el => gsap.set(el, { skewY: proxy.skew }));
                        }
                    });
                }
            }
        });

        return () => { if (st) st.kill(); };
    }, []);
};
