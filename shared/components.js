'use strict';

/* hooks.js already declares useState / useEffect / useRef at top level.
   Redeclaring them here is a parse-time SyntaxError that blanks the page. */
const { useCallback, memo } = React;

const prefersReduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   Reveal — the site's single motion idea.
   Each direct child is wrapped in a mask and rides up into place.
   ============================================================ */
const Reveal = ({ children, as = 'div', delay = 0, stagger = 0.06, className = '', start = 'top 85%' }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || !HAS_GSAP) return;

        const inners = el.querySelectorAll('.reveal-line > *');
        if (!inners.length) return;

        if (prefersReduced()) {
            gsap.set(inners, { y: '0%' });
            return;
        }

        const ctx = gsap.context(() => {
            gsap.fromTo(inners,
                { yPercent: 110 },
                {
                    yPercent: 0,
                    duration: 0.9,
                    ease: 'power4.out',
                    stagger: stagger,
                    delay: delay,
                    scrollTrigger: { trigger: el, start: start, once: true }
                }
            );
        }, el);

        return () => ctx.revert();
    }, [delay, stagger, start]);

    const kids = React.Children.toArray(children).map((child, i) =>
        React.createElement('span', { className: 'reveal-line', key: i },
            React.createElement('span', null, child)
        )
    );

    return React.createElement(as, { ref: ref, className: className }, kids);
};

/* ============================================================
   SplitLine — hero-scale text, animated per character.
   ============================================================ */
const SplitLine = ({ text, className = '', delay = 0.25 }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || !HAS_GSAP) return;
        if (prefersReduced()) { gsap.set(el, { opacity: 1 }); return; }

        let split;
        const ctx = gsap.context(() => {
            try {
                split = SplitText.create(el, { type: 'chars', mask: 'chars' });
                gsap.fromTo(split.chars,
                    { yPercent: 115, opacity: 0 },
                    { yPercent: 0, opacity: 1, duration: 1.4, ease: 'power4.out', stagger: 0.045, delay: delay }
                );
            } catch (e) {
                gsap.fromTo(el, { y: 28, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', delay: delay });
            }
        }, el);

        return () => { ctx.revert(); if (split) split.revert(); };
    }, [delay]);

    return <h1 ref={ref} className={className}>{text}</h1>;
};

/* ============================================================
   Marks
   ============================================================ */
const Seal = ({ children, size = 's', light = false, className = '' }) => (
    <span className={`seal seal-${size}${light ? ' seal-light' : ''} ${className}`}>{children}</span>
);

const SpiceMark = ({ level }) => {
    if (!level || level < 1) return null;
    const n = Math.min(level, 3);
    return (
        <span className="inline-flex items-center gap-[3px]" role="img" aria-label={`Heat ${n} of 3`}>
            {Array.from({ length: n }).map((_, i) => (
                <svg key={i} width="7" height="10" viewBox="0 0 7 10" aria-hidden="true" focusable="false">
                    <path d="M3.5 0.4 C3.5 0.4 0.4 4.6 0.4 6.6 a3.1 3.1 0 0 0 6.2 0 C6.6 4.6 3.5 0.4 3.5 0.4 Z" fill="#D6402F" />
                </svg>
            ))}
        </span>
    );
};

const SigMark = () => (
    <span className="inline-flex items-center" role="img" aria-label="Chef's signature">
        <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true" focusable="false">
            <path d="M4 0 L8 4 L4 8 L0 4 Z" fill="#D6402F" />
        </svg>
    </span>
);

/* ============================================================
   MobileNav
   ============================================================ */
const MobileNav = ({ open, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-500 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            style={{ background: 'var(--ink)' }}
            role="dialog" aria-modal="true" aria-label="Menu"
        >
            <div className="u-page flex items-center justify-between" style={{ paddingBlock: 'var(--s4)' }}>
                <span className="t-label c-32">Yōkoso</span>
                <button onClick={onClose} className="tap t-label c-60" aria-label="Close menu">Close</button>
            </div>
            <nav className="u-page flex flex-col" style={{ gap: 'var(--s4)', marginTop: 'var(--s8)' }}>
                <a href="menu.html" className="t-xl c-bone">Menu</a>
                <a href="index.html#reserve" onClick={onClose} className="t-xl c-bone">Reserve</a>
                <div className="rule" style={{ marginBlock: 'var(--s4)' }} />
                <a href={`tel:+${RESERVATION_PHONE}`} className="t-sm c-60">01841965676</a>
                <p className="t-sm c-32">Al Madani Tower (2nd Floor), Mirboxtula, Sylhet</p>
            </nav>
        </div>,
        document.body
    );
};

/* ============================================================
   SiteHeader
   ============================================================ */
const SiteHeader = () => {
    const [scrolled, setScrolled] = useState(false);
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className="vt-header fixed top-0 left-0 right-0 z-40"
            style={{
                background: scrolled ? 'rgba(10,14,12,0.86)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid var(--hairline)' : '1px solid transparent',
                transition: 'background .5s var(--ease), border-color .5s var(--ease)'
            }}
        >
            <div className="u-page flex items-center justify-between" style={{ paddingBlock: 'var(--s3)' }}>
                <a href="index.html" className="flex items-center tap" style={{ gap: 'var(--s2)' }} aria-label="Yōkoso — home">
                    <img
                        src="https://raw.githubusercontent.com/saqibfarabi14-del/Yokoso/main/assets/yokoso-mark-180.png"
                        alt="" width="34" height="34" style={{ width: 34, height: 34 }} />
                    <span className="t-label c-bone hidden sm:inline">Yōkoso</span>
                </a>

                <nav className="hidden md:flex items-center" style={{ gap: 'var(--s5)' }}>
                    <a href="menu.html" className="t-label c-60 link-u">Menu</a>
                    <a href="index.html#reserve" className="t-label c-60 link-u">Reserve</a>
                </nav>

                <button
                    onClick={() => setNavOpen(true)}
                    className="md:hidden tap flex flex-col items-end justify-center"
                    style={{ gap: 5 }}
                    aria-label="Open menu" aria-expanded={navOpen}
                >
                    <span style={{ display: 'block', width: 22, height: 1, background: 'var(--bone)' }} />
                    <span style={{ display: 'block', width: 14, height: 1, background: 'var(--bone)' }} />
                </button>
            </div>

            <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
        </header>
    );
};

/* ============================================================
   DishRow
   ============================================================ */
const DishRow = memo(({ dish, onClick }) => {
    const price = dish.hasHalfFull
        ? `${dish.priceHalf} / ${dish.priceFull}`
        : dish.price;

    return (
        <button
            onClick={() => onClick && onClick(dish)}
            className="w-full text-left flex items-baseline"
            style={{ paddingBlock: 'var(--s2)', borderBottom: '1px solid var(--hairline)' }}
        >
            <span className="t-m c-bone" style={{ flexShrink: 1, minWidth: 0 }}>
                {dish.name}
                {dish.signature && <span style={{ marginLeft: 8, display: 'inline-flex', verticalAlign: 'middle' }}><SigMark /></span>}
                {dish.spice > 0 && <span style={{ marginLeft: 8, display: 'inline-flex', verticalAlign: 'middle' }}><SpiceMark level={dish.spice} /></span>}
            </span>
            <span className="leader" aria-hidden="true" />
            <span className="t-sm c-60" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>{price} BDT</span>
        </button>
    );
});

/* ============================================================
   DishSheet
   ============================================================ */
const DishSheet = ({ dish, isOpen, onClose }) => {
    const isTouch = useIsTouch();
    const sheetRef = useRef(null);
    const startY = useRef(0);
    const curY = useRef(0);
    const dragging = useRef(false);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    const onTouchStart = (e) => {
        if (!isTouch || !sheetRef.current) return;
        startY.current = e.touches[0].clientY;
        dragging.current = true;
        sheetRef.current.style.transition = 'none';
    };
    const onTouchMove = (e) => {
        if (!dragging.current || !sheetRef.current) return;
        const dy = e.touches[0].clientY - startY.current;
        if (dy > 0) { curY.current = dy; sheetRef.current.style.transform = `translateY(${dy}px)`; }
    };
    const onTouchEnd = () => {
        if (!dragging.current || !sheetRef.current) return;
        dragging.current = false;
        sheetRef.current.style.transition = 'transform .4s var(--ease)';
        if (curY.current > 100) onClose();
        else sheetRef.current.style.transform = 'translateY(0px)';
        curY.current = 0;
    };
    const reset = () => { if (sheetRef.current) sheetRef.current.style.transform = 'translateY(0px)'; };

    if (!dish) return null;

    const price = dish.hasHalfFull ? `${dish.priceHalf} / ${dish.priceFull}` : dish.price;

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-opacity duration-400 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onTouchStart={isTouch ? onTouchStart : undefined}
            onTouchMove={isTouch ? onTouchMove : undefined}
            onTouchEnd={isTouch ? onTouchEnd : undefined}
        >
            <div className="absolute inset-0" style={{ background: 'rgba(10,14,12,0.82)', backdropFilter: 'blur(6px)' }} onClick={onClose} />

            <div
                ref={sheetRef}
                onTransitionEnd={reset}
                className={`relative w-full sm:max-w-[520px] transform transition-all ${isOpen ? 'translate-y-0 sm:scale-100 opacity-100' : 'translate-y-full sm:translate-y-0 sm:scale-[0.97] opacity-0'}`}
                style={{
                    background: 'var(--ink-2)',
                    maxHeight: '88vh',
                    display: 'flex',
                    flexDirection: 'column',
                    transitionDuration: '420ms',
                    transitionTimingFunction: 'cubic-bezier(0.16,1,0.30,1)',
                    boxShadow: '0 40px 90px -20px rgba(0,0,0,0.7)'
                }}
            >
                <div style={{ height: 3, background: 'var(--vermilion)', flexShrink: 0 }} />

                <div style={{ padding: 'var(--s5)', overflowY: 'auto' }}>
                    <div className="flex items-start justify-between" style={{ gap: 'var(--s3)' }}>
                        <div>
                            <p className="t-label c-32" style={{ marginBottom: 'var(--s1)' }}>Yōkoso</p>
                            <h3 className="t-l c-bone">{dish.name}</h3>
                        </div>
                        <button onClick={onClose} className="tap t-label c-60" aria-label="Close">Close</button>
                    </div>

                    {(dish.signature || dish.spice > 0) && (
                        <div className="flex items-center" style={{ gap: 'var(--s2)', marginTop: 'var(--s2)' }}>
                            {dish.signature && <SigMark />}
                            <SpiceMark level={dish.spice} />
                        </div>
                    )}

                    <p className="t-body c-60" style={{ marginTop: 'var(--s3)' }}>{dish.desc}</p>

                    <div className="flex items-center justify-between" style={{ marginTop: 'var(--s5)', paddingTop: 'var(--s3)', borderTop: '1px solid var(--hairline)' }}>
                        <span className="t-label c-32">Price</span>
                        <span className="t-m c-bone">{price} BDT</span>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

/* ============================================================
   Reserve — three-step flow
   ============================================================ */
const Reserve = () => {
    const [step, setStep] = useState(0);
    const [party, setParty] = useState(null);
    const [day, setDay] = useState(null);
    const [time, setTime] = useState(null);

    const DAYS = (() => {
        const out = [];
        const n = new Date();
        for (let i = 0; i < 14; i++) out.push(new Date(n.getFullYear(), n.getMonth(), n.getDate() + i));
        return out;
    })();

    /* Friday (day 5) opens 14:00; all other days 12:30. Last seating 22:00. */
    const timesFor = (d) => {
        if (!d) return [];
        const fri = d.getDay() === 5;
        const out = [];
        let h = fri ? 14 : 12, m = fri ? 0 : 30;
        while (h < 22 || (h === 22 && m === 0)) {
            out.push(String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0'));
            m += 30; if (m >= 60) { m = 0; h += 1; }
        }
        return out;
    };

    const fmt = (d) => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

    const href = () => {
        const msg =
            "Hi Yokoso, I'd like to reserve a table.\n\n" +
            'Party: ' + party + ' ' + (party === 1 ? 'guest' : 'guests') + '\n' +
            'Date: ' + (day ? fmt(day) : '') + '\n' +
            'Time: ' + (time || '') + '\n\n' +
            'Please confirm availability. Thank you.';
        return 'https://wa.me/' + RESERVATION_PHONE + '?text=' + encodeURIComponent(msg);
    };

    const Pill = ({ active, onClick, children }) => (
        <button onClick={onClick} className={`btn btn-sm ${active ? 'btn-solid' : ''}`}>{children}</button>
    );

    const labels = ['Party size', 'Date', 'Time'];

    return (
        <div style={{ border: '1px solid var(--hairline)', padding: 'clamp(24px, 5vw, 64px)' }}>
            <p className="t-label c-32" style={{ marginBottom: 'var(--s4)' }}>
                {step < 3 ? `Step ${step + 1} of 3 — ${labels[step]}` : 'Confirm'}
            </p>

            {step === 0 && (
                <div className="flex flex-wrap justify-center" style={{ gap: 'var(--s1)' }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <Pill key={n} active={party === n} onClick={() => { setParty(n); setStep(1); }}>
                            {n === 8 ? '8+' : n}
                        </Pill>
                    ))}
                </div>
            )}

            {step === 1 && (
                <div className="flex flex-wrap justify-center hide-sb" style={{ gap: 'var(--s1)', maxHeight: 180, overflowY: 'auto' }}>
                    {DAYS.map((d, i) => (
                        <Pill key={i} active={day && day.getTime() === d.getTime()} onClick={() => { setDay(d); setTime(null); setStep(2); }}>
                            {i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : fmt(d)}
                        </Pill>
                    ))}
                </div>
            )}

            {step === 2 && (
                <div className="flex flex-wrap justify-center hide-sb" style={{ gap: 'var(--s1)', maxHeight: 180, overflowY: 'auto' }}>
                    {timesFor(day).map(t => (
                        <Pill key={t} active={time === t} onClick={() => { setTime(t); setStep(3); }}>{t}</Pill>
                    ))}
                </div>
            )}

            {step === 3 && (
                <div className="text-center">
                    <p className="t-m c-bone" style={{ marginBottom: 'var(--s4)' }}>
                        {party} {party === 1 ? 'guest' : 'guests'} — {day ? fmt(day) : ''} — {time}
                    </p>
                    <a href={href()} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                        Confirm on WhatsApp
                    </a>
                </div>
            )}

            {step > 0 && (
                <div className="text-center" style={{ marginTop: 'var(--s4)' }}>
                    <button onClick={() => setStep(s => Math.max(0, s - 1))} className="t-label c-32 tap">← Back</button>
                </div>
            )}
        </div>
    );
};

/* ============================================================
   Footer
   ============================================================ */
const Footer = () => (
    <footer style={{ borderTop: '1px solid var(--hairline)' }}>
        <div className="u-page flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left"
             style={{ paddingBlock: 'var(--s6)', gap: 'var(--s3)' }}>
            <div>
                <p className="t-sm c-60">Al Madani Tower (2nd Floor), Mirboxtula, Sylhet</p>
                <p className="t-sm c-32" style={{ marginTop: 4 }}>Open daily 12:30 – 23:00 · Friday from 14:00</p>
            </div>
            <div className="flex items-center justify-center" style={{ gap: 'var(--s4)' }}>
                <a href={`tel:+${RESERVATION_PHONE}`} className="t-label c-60 link-u">01841965676</a>
                <a href="https://www.facebook.com/share/192xaTJHwX/" target="_blank" rel="noopener noreferrer" className="t-label c-60 link-u">Facebook</a>
                <a href="https://www.instagram.com/yokosobd?igsh=MTQ4bHp4Mm1sbjNwYg==" target="_blank" rel="noopener noreferrer" className="t-label c-60 link-u">Instagram</a>
            </div>
        </div>
        <div className="u-page" style={{ paddingBottom: 'var(--s5)' }}>
            <p className="t-label c-32 text-center md:text-left">© {new Date().getFullYear()} Yōkoso · Sylhet</p>
        </div>
    </footer>
);
