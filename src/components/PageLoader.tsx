import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false),
      });

      // Counter animation
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${Math.round(counter.val)}`;
          }
        },
      }, 0);

      // Logo entrance: scale up from nothing with rotation
      tl.fromTo(
        logoRef.current,
        { scale: 0, opacity: 0, rotationY: -180, filter: 'blur(20px)' },
        { scale: 1, opacity: 1, rotationY: 0, filter: 'blur(0px)', duration: 1, ease: 'back.out(1.7)' },
        0.2
      );

      // Staggered text lines reveal
      tl.fromTo(
        lineRefs.current,
        { y: 60, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
        0.6
      );

      // Tagline fade
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, letterSpacing: '0.8em' },
        { opacity: 1, letterSpacing: '0.3em', duration: 0.8, ease: 'power2.out' },
        1.0
      );

      // Exit: logo scales and fades, curtains split
      tl.to(logoRef.current, {
        scale: 1.5, opacity: 0, filter: 'blur(10px)', duration: 0.5, ease: 'power2.in',
      }, 2.0);

      tl.to(lineRefs.current, {
        y: -30, opacity: 0, stagger: 0.05, duration: 0.3, ease: 'power2.in',
      }, 2.0);

      tl.to(taglineRef.current, {
        opacity: 0, duration: 0.3, ease: 'power2.in',
      }, 2.0);

      tl.to(counterRef.current, {
        opacity: 0, duration: 0.3, ease: 'power2.in',
      }, 2.0);

      // Curtain split
      tl.to(topCurtainRef.current, {
        yPercent: -100, duration: 0.8, ease: 'power4.inOut',
      }, 2.2);

      tl.to(bottomCurtainRef.current, {
        yPercent: 100, duration: 0.8, ease: 'power4.inOut',
      }, 2.2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[100]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {/* Top curtain */}
          <div
            ref={topCurtainRef}
            className="absolute inset-x-0 top-0 h-1/2 bg-background"
            style={{ zIndex: 2 }}
          />
          {/* Bottom curtain */}
          <div
            ref={bottomCurtainRef}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
            style={{ zIndex: 2 }}
          />

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 3 }}>
            {/* Logo */}
            <div
              ref={logoRef}
              className="text-7xl sm:text-8xl font-bold gradient-text mb-8"
              style={{ perspective: '600px', opacity: 0 }}
            >
              SS
            </div>

            {/* Staggered reveal lines */}
            <div className="overflow-hidden">
              {['Frontend', 'Developer'].map((text, i) => (
                <div key={text} className="overflow-hidden">
                  <div
                    ref={(el) => { lineRefs.current[i] = el; }}
                    className="text-xl sm:text-2xl font-light text-foreground/80 text-center leading-relaxed"
                    style={{ opacity: 0 }}
                  >
                    {text}
                  </div>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="text-xs tracking-[0.3em] uppercase text-muted-foreground mt-8"
              style={{ opacity: 0 }}
            >
              Loading experience
            </p>

            {/* Counter */}
            <div className="absolute bottom-12 right-12 flex items-baseline gap-1">
              <span
                ref={counterRef}
                className="text-6xl sm:text-7xl font-bold text-foreground/10"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                0
              </span>
              <span className="text-lg text-foreground/10">%</span>
            </div>
          </div>

          {/* Decorative line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/20" style={{ zIndex: 1 }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
