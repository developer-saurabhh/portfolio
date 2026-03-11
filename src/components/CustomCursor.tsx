import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const v = Math.min(Math.sqrt(dx * dx + dy * dy), 80);
      setVelocity(v);
      lastPos.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const over = () => setHovering(true);
    const out = () => setHovering(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
        el.addEventListener('mouseenter', over);
        el.addEventListener('mouseleave', out);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      observer.disconnect();
    };
  }, []);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  const spotlightSize = hovering ? 200 : 120 + velocity * 0.8;
  const dotSize = clicking ? 4 : hovering ? 8 : 6;

  return (
    <>
      {/* Spotlight glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        animate={{
          x: pos.x - spotlightSize / 2,
          y: pos.y - spotlightSize / 2,
          width: spotlightSize,
          height: spotlightSize,
          opacity: visible ? (hovering ? 0.15 : 0.08) : 0,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.8 }}
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, hsl(var(--secondary) / 0.3) 40%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        animate={{
          x: pos.x - (hovering ? 28 : clicking ? 14 : 18),
          y: pos.y - (hovering ? 28 : clicking ? 14 : 18),
          width: hovering ? 56 : clicking ? 28 : 36,
          height: hovering ? 56 : clicking ? 28 : 36,
          opacity: visible ? 1 : 0,
          borderWidth: hovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22, mass: 0.5 }}
        style={{
          border: '1px solid',
          borderColor: hovering ? 'hsl(var(--primary) / 0.8)' : 'hsl(var(--primary) / 0.4)',
          boxShadow: hovering
            ? '0 0 20px hsl(var(--primary) / 0.3), inset 0 0 20px hsl(var(--primary) / 0.05)'
            : '0 0 10px hsl(var(--primary) / 0.15)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        animate={{
          x: pos.x - dotSize / 2,
          y: pos.y - dotSize / 2,
          width: dotSize,
          height: dotSize,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        style={{
          background: 'hsl(var(--primary))',
          boxShadow: '0 0 8px hsl(var(--primary) / 0.6)',
        }}
      />
    </>
  );
}
