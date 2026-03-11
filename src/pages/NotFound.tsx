import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const NotFound = () => {
  const location = useLocation();
  const numbersRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (!glitchRef.current) return;

    const ctx = gsap.context(() => {
      // Glitch effect loop
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      tl.to(glitchRef.current, {
        skewX: 20,
        duration: 0.05,
        ease: 'power4.inOut',
      })
        .to(glitchRef.current, { skewX: 0, duration: 0.05 })
        .to(glitchRef.current, { opacity: 0.8, x: -5, duration: 0.05 })
        .to(glitchRef.current, { opacity: 1, x: 5, duration: 0.05 })
        .to(glitchRef.current, { x: 0, duration: 0.05 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center px-6">
      {/* Large background 404 */}
      <div
        ref={numbersRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[30vw] font-bold text-foreground/[0.03] leading-none">
          404
        </span>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="relative z-10 text-center max-w-lg">
        {/* Glitchy 404 */}
        <motion.h1
          ref={glitchRef}
          className="text-8xl sm:text-9xl font-bold gradient-text mb-4"
          initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          404
        </motion.h1>

        <motion.div
          className="w-20 h-[2px] mx-auto mb-8 rounded-full"
          style={{ background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.p
          className="text-sm tracking-[0.3em] uppercase text-primary mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Page Not Found
        </motion.p>

        <motion.p
          className="text-muted-foreground leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          The page you're looking for has been moved, deleted, or never existed.
          Let's get you back on track.
        </motion.p>

        <motion.a
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05, y: -3, boxShadow: '0 20px 40px -10px hsl(217 100% 60% / 0.4)' }}
          whileTap={{ scale: 0.98 }}
        >
          ← Back to Portfolio
        </motion.a>

        <motion.p
          className="text-xs text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Attempted path: <code className="text-primary/60 bg-muted px-2 py-0.5 rounded text-xs">{location.pathname}</code>
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
