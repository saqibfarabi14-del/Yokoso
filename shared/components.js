'use strict';

'use strict';

const { useCallback, memo } = React;

// ---- Reveal Primitive Component ----
const Reveal = ({ children, variant, delay=0, stagger=0.08, start="top 85%", once=true, as="div", className="" }) => {
    const ref = useRef(null);
    const isMobile = useMobile();

    useEffect(() => {
        const el = ref.current;
        if (!el || !HAS_GSAP) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduceMotion) {
            if (variant === 'rise' || variant === 'scale') {
                const targets = Array.from(el.children);
                gsap.set(targets, variant === 'rise' ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1 });
            } else if (variant === 'mask') {
                const inner = el.querySelector('.reveal-inner');
                if (inner) gsap.set(inner, { y: 0, opacity: 1 });
            } else if (variant === 'stamp') {
                gsap.set(el, { scale: 1, rotate: 0, opacity: 1 });
            } else if (variant === 'ink') {
                gsap.set(el, { clipPath: 'inset(0 0% 0 0)' });
            }
            return;
        }

        const ctx = gsap.context(() => {
            const m = isMobile ? { dist: 16, mult: 0.75, stag: 0.6 } : { dist: 24, mult: 1, stag: 1 };
            const dur = MOTION.dur.md * m.mult;

            if (variant === 'rise') {
                const targets = Array.from(el.children);
                if (targets.length > 0) {
                    gsap.fromTo(targets, { y: m.dist, opacity: 0 }, {
                        y: 0, opacity: 1, duration: dur, ease: MOTION.ease.out, stagger: stagger * m.stag, delay: delay,
                        scrollTrigger: { trigger: el, start: start, toggleActions: once ? 'play none none none' : 'play none none reverse' }
                    });
                }
            } else if (variant === 'mask') {
                const inner = el.querySelector('.reveal-inner');
                if (inner) {
                    gsap.fromTo(inner, { y: '110%', opacity: 0 }, {
                        y: '0%', opacity: 1, duration: MOTION.dur.lg * m.mult, ease: MOTION.ease.out, delay: delay,
                        scrollTrigger: { trigger: el, start: start, toggleActions: once ? 'play none none none' : 'play none none reverse' }
                    });
                }
            } else if (variant === 'stamp') {
                gsap.fromTo(el, { scale: 1.6, rotate: -12, opacity: 0 }, {
                    scale: 1, rotate: 0, opacity: 1, duration: MOTION.dur.md * m.mult, ease: MOTION.ease.stamp, delay: delay,
                    scrollTrigger: { trigger: el, start: start, toggleActions: once ? 'play none none none' : 'play none none reverse' }
                });
            } else if (variant === 'ink') {
                gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, {
                    clipPath: 'inset(0 0% 0 0)', duration: MOTION.dur.lg * m.mult, ease: MOTION.ease.ink, delay: delay,
                    scrollTrigger: { trigger: el, start: start, toggleActions: once ? 'play none none none' : 'play none none reverse' }
                });
            } else if (variant === 'scale') {
                const targets = Array.from(el.children);
                if (targets.length > 0) {
                    gsap.fromTo(targets, { scale: 1.08, opacity: 0 }, {
                        scale: 1, opacity: 1, duration: MOTION.dur.md * m.mult, ease: MOTION.ease.out, stagger: stagger * m.stag, delay: delay,
                        scrollTrigger: { trigger: el, start: start, toggleActions: once ? 'play none none none' : 'play none none reverse' }
                    });
                }
            }
        }, el);

        return () => ctx.revert();
    }, [variant, stagger, delay, start, once, isMobile, HAS_GSAP]);

    if (variant === 'mask') {
        return React.createElement(as, { ref: ref, className: `overflow-hidden ${className}` },
            React.createElement('div', { className: 'reveal-inner w-full h-full' }, children)
        );
    }
    if (variant === 'ink') {
        return React.createElement(as, { ref: ref, className: className }, children);
    }
    return React.createElement(as, { ref: ref, className: className }, children);
};

const SpiceIcons = ({ level }) => {
    if (!level || level<1) return null;
    const chars = '🌶️'.repeat(Math.min(level,3));
    return <span className="spice-icon" aria-label={`Spice level ${level}`}>{chars}</span>;
};
const SignatureStar = ({ active }) => active ? <span className="star-signature" aria-label="Chef's signature">★</span> : null;

const DishCard = memo(({ dish, onClick = null, compact = false }) => {
    return (
        <button onClick={() => { if (onClick) onClick(dish); }} className={`dish-card-trigger w-full text-left border-b border-forest/5 last:border-0 ${compact ? 'py-2 sm:py-2.5' : 'py-2.5 sm:py-3'} tap-target flex flex-col gap-0.5 active:bg-forest/5 transition-colors`}>
            <div className="flex items-baseline justify-between w-full min-w-0">
                <h4 className={compact ? "serif-dish text-sm sm:text-base text-forest font-medium leading-[1.2] truncate min-w-0 flex-shrink" : "serif-dish text-[1.05rem] sm:text-xl md:text-2xl text-forest font-medium leading-[1.1] truncate min-w-0 flex-shrink"}>
                    {dish.name}
                    {dish.signature && <span className="star-signature ml-1.5 text-xs align-top">★</span>}
                </h4>
                <div className="flex-1 border-b border-dotted border-forest/20 mx-2 h-[1px] min-w-[6px]"></div>
                <span
                    className={compact ? "dish-price sans-body text-[10px] uppercase tracking-widest font-semibold text-forest/80 whitespace-nowrap flex-shrink-0" : "dish-price sans-body text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold text-forest/80 whitespace-nowrap flex-shrink-0"}
                    data-price={dish.hasHalfFull ? '' : dish.price}
                >
                    {dish.hasHalfFull ? `${dish.priceHalf} / ${dish.priceFull}` : dish.price} BDT
                </span>
            </div>
            {!compact && (
                <div className="flex flex-wrap gap-x-2 gap-y-0.5 items-center">
                    {dish.signature && <SignatureStar active={true} />}
                    <SpiceIcons level={dish.spice} />
                </div>
            )}
            {compact && dish.spice > 0 && (
                <SpiceIcons level={dish.spice} />
            )}
            {!compact && <p className="sans-body text-xs text-forest-light/70 mt-0.5 line-clamp-2">{dish.desc}</p>}
        </button>
    );
});

const DishDetail = ({ dish, isOpen, onClose }) => {
    const isTouch = useIsTouch();
    const sheetRef = useRef(null);
    const dragStartY = useRef(0);
    const currentY = useRef(0);
    const isDragging = useRef(false);

    const handleTouchStart = (e) => {
        if (!isTouch || !sheetRef.current) return;
        dragStartY.current = e.touches[0].clientY;
        isDragging.current = true;
        sheetRef.current.style.transition = 'none';
    };
    const handleTouchMove = (e) => {
        if (!isDragging.current || !sheetRef.current) return;
        const deltaY = e.touches[0].clientY - dragStartY.current;
        if (deltaY > 0) {
            currentY.current = deltaY;
            sheetRef.current.style.transform = `translateY(${deltaY}px)`;
        }
    };
    const handleTouchEnd = () => {
        if (!isDragging.current || !sheetRef.current) return;
        isDragging.current = false;
        sheetRef.current.style.transition = 'transform 0.3s cubic-bezier(0.23,1,0.32,1)';
        if (currentY.current > 100) onClose();
        else sheetRef.current.style.transform = 'translateY(0px)';
        currentY.current = 0;
    };
    const resetSheet = () => { if (sheetRef.current) sheetRef.current.style.transform = 'translateY(0px)'; };

    if (!dish) return null;
    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onTouchStart={isTouch ? handleTouchStart : undefined}
            onTouchMove={isTouch ? handleTouchMove : undefined}
            onTouchEnd={isTouch ? handleTouchEnd : undefined}
        >
            <div className="absolute inset-0 bg-forest/40 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />
            <div ref={sheetRef} className={`relative w-full sm:max-w-2xl sm:w-full bg-bone rounded-t-2xl sm:rounded-2xl shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full sm:translate-y-8 sm:scale-95'}`} style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }} onTransitionEnd={resetSheet}>
                {isTouch && (<div className="drag-handle w-10 h-1 bg-forest/20 rounded-full mx-auto mt-2 mb-1 flex-shrink-0"></div>)}
                <div className="p-5 sm:p-8 overflow-y-auto flex-1">
                    <div className="flex justify-between items-start gap-4">
                        <h3 className="script-head text-4xl sm:text-5xl text-forest">{dish.name}</h3>
                        <button onClick={onClose} className="tap-target w-10 h-10 rounded-full bg-forest/10 hover:bg-forest/20 active:bg-forest/30 transition-colors flex items-center justify-center text-forest/80 text-lg" aria-label="Close">✕</button>
                    </div>
                    <div className="flex gap-3 mt-2">{dish.signature && <SignatureStar active={true} />}<SpiceIcons level={dish.spice} /></div>
                    <p className="sans-body text-base sm:text-lg text-forest-light/80 mt-4 leading-relaxed">{dish.desc}</p>
                    <div className="mt-6 pt-4 border-t border-forest/10 flex justify-between items-center">
                        <span className="sans-body text-sm uppercase tracking-widest text-forest-light/60">Price</span>
                        <span className="serif-head text-2xl text-forest">{dish.hasHalfFull ? `${dish.priceHalf} / ${dish.priceFull}` : dish.price} BDT</span>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

// ---- Location (shared footer, used by both index.html and menu.html) ----
const Location = () => {
    return (
        <footer id="location" className="py-16 sm:py-24 px-4 sm:px-8 bg-bone-dark/40 border-t border-forest/5">
            <div className="max-w-3xl mx-auto text-center">
                <Reveal variant="stamp" as="div" className="inline-block mx-auto mb-4">
                    <span className="seal-mark seal-mark-sm">〒</span>
                </Reveal>
                <Reveal variant="rise" stagger={0.12} as="div">
                    <h2 className="script-head text-4xl sm:text-6xl text-forest">Find Us</h2>
                    <p className="serif-head text-lg sm:text-xl text-forest-light/80 mt-1">Al Madani Tower (2nd Floor), Mirboxtula, Sylhet.</p>
                    <p className="sans-body text-xs sm:text-sm text-forest-light/70 mt-3">
                        <a href={`tel:+${RESERVATION_PHONE}`} className="underline-draw">01841965676</a>
                        {CONTACT_EMAIL && <> · <a href={`mailto:${CONTACT_EMAIL}`} className="underline-draw">{CONTACT_EMAIL}</a></>}
                    </p>
                    <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mt-6 sm:mt-8">
                        <a href="https://www.facebook.com/share/192xaTJHwX/" target="_blank" rel="noopener noreferrer" className="underline-draw text-xs sm:text-sm text-forest-light/80 transition-colors tap-target">Facebook</a>
                        <a href="https://www.instagram.com/yokosobd?igsh=MTQ4bHp4Mm1sbjNwYg==" target="_blank" rel="noopener noreferrer" className="underline-draw text-xs sm:text-sm text-forest-light/80 transition-colors tap-target">Instagram</a>
                        {DELIVERY_URL && <a href={DELIVERY_URL} target="_blank" rel="noopener noreferrer" className="underline-draw text-xs sm:text-sm text-forest-light/80 transition-colors tap-target">Delivery</a>}
                    </div>
                    <p className="text-[10px] sm:text-xs text-forest-light/50 mt-8 sm:mt-10">© {new Date().getFullYear()} Yokoso · Sylhet</p>
                </Reveal>
            </div>
        </footer>
    );
};


// ---- ChefSignatures ----
const ChefSignatures = ({ onDishClick }) => {
    const ref = useRef(null);
    const signatureDishes = Object.values(MENU).flat().filter(dish => dish.signature === true);

    if (signatureDishes.length === 0) return null;
    return (
        <section ref={ref} className="skew-target py-12 sm:py-24 px-2 sm:px-6 max-w-7xl mx-auto overflow-hidden">
            <div className="text-center mb-8 sm:mb-16">
                <Reveal variant="stamp" as="div" className="inline-block mx-auto mb-4">
                    <span className="seal-mark seal-mark-sm">星</span>
                </Reveal>
                <h2 className="script-head text-5xl sm:text-7xl md:text-8xl text-forest">Chef's Signatures</h2>
                <p className="sans-body text-sm text-forest-light/70 mt-4">The dishes that define us — marked with the vermilion seal</p>
            </div>
            <div className="relative">
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-bone to-transparent pointer-events-none z-10 hidden sm:block"></div>
                <Reveal variant="rise" stagger={0.08} as="div" className="snap-container hide-scrollbar flex overflow-x-auto gap-4 sm:gap-6 px-3 sm:px-8 pb-4 pt-2 touch-pan-x">
                    {signatureDishes.map((dish) => (
                        <div key={dish.id} className="snap-item signature-card min-w-[280px] sm:min-w-[340px] md:min-w-[380px] flex-shrink-0 border border-forest/10 bg-bone/30 p-5 sm:p-8 flex flex-col gap-3" onClick={() => onDishClick && onDishClick(dish)}>
                            <div className="flex justify-between items-start gap-2">
                                <h4 className="serif-dish text-xl sm:text-2xl text-forest font-medium leading-tight">{dish.name}</h4>
                                <div className="w-8 h-8 rounded-full bg-vermilion flex items-center justify-center text-bone text-xs font-bold shrink-0 shadow-sm">★</div>
                            </div>
                            <p className="sans-body text-sm sm:text-base text-forest-light/70 leading-relaxed flex-1 line-clamp-3">{dish.desc}</p>
                            <div className="flex justify-between items-center pt-4 border-t border-forest/10">
                                <div className="flex gap-2"><SpiceIcons level={dish.spice} /></div>
                                <span className="sans-body text-[10px] sm:text-xs uppercase tracking-widest font-medium text-forest/80 whitespace-nowrap">{dish.hasHalfFull ? `${dish.priceHalf} / ${dish.priceFull}` : dish.price} BDT</span>
                            </div>
                        </div>
                    ))}
                </Reveal>
                <p className="sans-body text-xs text-forest-light/50 text-right mt-3 pr-2 sm:hidden">Swipe →</p>
            </div>
        </section>
    );
};

// ---- CinematicCollections ----
const CinematicCollections = () => {
    const ref = useRef(null);
    const collections = [...MENU.sushiCombos.map(item => ({ ...item, category: 'Sushi Set' })), ...MENU.bento.map(item => ({ ...item, category: 'Bento' }))];

    return (
        <section ref={ref} className="skew-target py-12 sm:py-24 px-3 sm:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
                <Reveal variant="stamp" as="div" className="inline-block mx-auto mb-4">
                    <span className="seal-mark seal-mark-sm">集</span>
                </Reveal>
                <h2 className="script-head text-5xl sm:text-7xl md:text-8xl text-forest">Curated Collections</h2>
                <p className="sans-body text-sm text-forest-light/70 mt-4">Our grandest sets — meticulously crafted</p>
                <div className="h-px bg-forest/5 max-w-xs mx-auto mt-6" />
            </div>
            <Reveal variant="scale" stagger={0.15} as="div" className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {collections.map((item) => {
                    const itemList = item.desc.split(',').map(s => s.trim().replace(/\.$/, ''));
                    return (
                        <div key={item.id} className="collection-card border border-forest/10 bg-bone/30 p-5 sm:p-8 flex flex-col gap-4">
                            <div className="flex justify-between items-start gap-2">
                                <div className="min-w-0">
                                    <span className="sans-body text-[10px] sm:text-xs uppercase tracking-widest text-forest-light/60 font-medium block">{item.category}</span>
                                    <h3 className="script-head text-3xl sm:text-4xl text-forest mt-0.5 leading-tight truncate">{item.name}</h3>
                                </div>
                                <span className="sans-body text-xs sm:text-sm uppercase tracking-widest font-semibold text-forest/80 whitespace-nowrap shrink-0">{item.price} BDT</span>
                            </div>
                            <div className="mt-1 mb-3 flex-grow">
                                <p className="sans-body text-xs sm:text-sm text-forest-light/70 mb-2 font-medium">Includes:</p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                                    {itemList.map((subItem, idx) => (
                                        <li key={idx} className="sans-body text-sm text-forest/90 flex items-start gap-2 truncate"><span className="text-vermilion text-[10px] mt-1 shrink-0">✦</span> <span className="truncate">{subItem}</span></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-auto pt-4 border-t border-forest/10 flex justify-end"><span className="seal-mark seal-mark-sm text-xs opacity-50">薦</span></div>
                        </div>
                    );
                })}
            </Reveal>
        </section>
    );
};

// ---- MenuCompass ----
const MenuCompass = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const isMobile = useMobile();

    useEffect(() => {
        if (!HAS_GSAP) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (isMobile) return;

        const ctx = gsap.context(() => {
            const panels = gsap.utils.toArray('.compass-panel', trackRef.current);
            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    snap: { snapTo: 1 / (panels.length - 1), duration: 0.4, ease: 'power1.inOut' },
                    end: () => '+=' + (sectionRef.current.offsetWidth * (panels.length - 1)),
                    invalidateOnRefresh: true
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, [isMobile]);

    const reduceMotion = !HAS_GSAP || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const PanelContent = ({ chapter, idx }) => (
        <div className={`compass-panel ${isMobile ? 'snap-item w-screen' : 'w-screen'} flex-shrink-0 h-screen flex items-center justify-center px-6 sm:px-12 ${idx % 2 === 1 ? 'bg-bone-dark/30' : ''}`}>
            <div className="text-center max-w-lg mx-auto">
                <div className="mb-6">
                    <span className="seal-mark seal-mark-lg">{chapter.seal}</span>
                </div>
                <div>
                    <p className="script-head text-3xl sm:text-4xl text-forest-light/60">{chapter.native}</p>
                    <h3 className="serif-head text-3xl sm:text-5xl text-forest mt-2">{chapter.name}</h3>
                    <p className="sans-body text-sm sm:text-base text-forest-light/70 mt-4 max-w-md mx-auto">{chapter.desc}</p>
                    <p className="sans-body text-xs uppercase tracking-widest text-forest-light/50 mt-3">{chapter.count} dishes</p>
                    <a
                        href={`menu.html#${chapter.anchorId}`}
                        className="magnetic-btn magnetic-btn-outline mt-6 text-sm"
                    >
                        View Chapter
                    </a>
                </div>
            </div>
        </div>
    );

    if (reduceMotion) {
        return (
            <section className="w-full">
                {COMPASS_CHAPTERS.map((chapter, idx) => (
                    <div key={chapter.name} className={`w-full py-16 px-6 flex items-center justify-center ${idx % 2 === 1 ? 'bg-bone-dark/30' : ''}`}>
                        <div className="text-center max-w-lg mx-auto">
                            <span className="seal-mark seal-mark-lg inline-block mb-4">{chapter.seal}</span>
                            <p className="script-head text-3xl text-forest-light/60">{chapter.native}</p>
                            <h3 className="serif-head text-3xl sm:text-4xl text-forest mt-2">{chapter.name}</h3>
                            <p className="sans-body text-sm text-forest-light/70 mt-3 max-w-md mx-auto">{chapter.desc}</p>
                            <p className="sans-body text-xs uppercase tracking-widest text-forest-light/50 mt-2">{chapter.count} dishes</p>
                            <a href={`menu.html#${chapter.anchorId}`} className="magnetic-btn magnetic-btn-outline mt-4 text-sm">View Chapter</a>
                        </div>
                    </div>
                ))}
            </section>
        );
    }

    if (isMobile) {
        return (
            <section className="w-full py-8 overflow-hidden">
                <div className="snap-container hide-scrollbar flex overflow-x-auto" style={{ touchAction: 'pan-x pan-y' }}>
                    {COMPASS_CHAPTERS.map((chapter, idx) => (
                        <PanelContent key={chapter.name} chapter={chapter} idx={idx} />
                    ))}
                </div>
                <div className="flex justify-center gap-2 mt-4" aria-hidden="true">
                    {COMPASS_CHAPTERS.map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-forest/20" />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
            <div ref={trackRef} className="flex h-full" style={{ width: `${COMPASS_CHAPTERS.length * 100}vw` }}>
                {COMPASS_CHAPTERS.map((chapter, idx) => (
                    <PanelContent key={chapter.name} chapter={chapter} idx={idx} />
                ))}
            </div>
        </section>
    );
};

// ---- SiteHeader + MobileDrawer ----
const SiteHeader = () => {
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    const navItems = [
        { label: 'Menu', href: 'menu.html' },
        { label: 'Our Story', id: 'about' },
        { label: 'Visit', id: 'location' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${scrolled ? 'bg-bone/95 backdrop-blur-md border-b border-forest/5 py-3' : 'bg-transparent py-5'}`}>
            <nav className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between">
                <a href="index.html" className="flex items-center gap-2 tap-target" aria-label="Yōkoso — home">
                    <img src="https://raw.githubusercontent.com/saqibfarabi14-del/Yokoso/main/assets/yokoso-mark-180.png" alt="" width="40" height="40" className="w-10 h-10" />
                    <span className="script-head text-xl text-forest hidden sm:inline">Yōkoso</span>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {navItems.map(item => (
                        item.href ? (
                            <a key={item.label} href={item.href} className="underline-draw sans-body text-sm text-forest/80">
                                {item.label}
                            </a>
                        ) : (
                            <button key={item.id} onClick={() => scrollToEl(document.getElementById(item.id), -80)} className="underline-draw sans-body text-sm text-forest/80">
                                {item.label}
                            </button>
                        )
                    ))}
                    <a href={WHATSAPP_RESERVE_URL} target="_blank" rel="noopener noreferrer" className="magnetic-btn text-sm">Reserve</a>
                </div>

                <button onClick={() => setDrawerOpen(true)} className="md:hidden tap-target w-10 h-10 flex flex-col items-center justify-center gap-1.5" aria-label="Open menu" aria-expanded={drawerOpen}>
                    <span className="block w-6 h-0.5 bg-forest" />
                    <span className="block w-6 h-0.5 bg-forest" />
                </button>
            </nav>

            <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} navItems={navItems} />
        </header>
    );
};

const MobileDrawer = ({ isOpen, onClose, navItems }) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    const handleLinkClick = (id) => {
        onClose();
        setTimeout(() => scrollToEl(document.getElementById(id), -80), 300);
    };

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            role="dialog" aria-modal="true" aria-label="Navigation menu"
        >
            <div className="absolute inset-0 bg-forest/40 backdrop-blur-sm" onClick={onClose} />
            <div className={`relative ml-auto w-4/5 max-w-xs h-full bg-bone shadow-2xl flex flex-col p-6 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button onClick={onClose} className="self-end tap-target w-10 h-10 flex items-center justify-center text-forest/80 text-lg" aria-label="Close menu">✕</button>
                <nav className="flex flex-col gap-6 mt-8">
                    {navItems.map(item => (
                        item.href ? (
                            <a key={item.label} href={item.href} className="script-head text-3xl text-forest text-left">
                                {item.label}
                            </a>
                        ) : (
                            <button key={item.id} onClick={() => handleLinkClick(item.id)} className="script-head text-3xl text-forest text-left">
                                {item.label}
                            </button>
                        )
                    ))}
                    <a href={WHATSAPP_RESERVE_URL} target="_blank" rel="noopener noreferrer" className="magnetic-btn text-center mt-4">Reserve a Table</a>
                </nav>
            </div>
        </div>,
        document.body
    );
};

// ---- LazyLoad Wrapper ----
const LazySection = ({ children, className }) => {
    const { ref, isVisible } = useLazyLoad();
    return <div ref={ref} className={className}>{isVisible ? children : <div className="h-screen w-full"></div>}</div>;
};
