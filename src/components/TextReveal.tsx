import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  as?: 'p' | 'h2' | 'h3' | 'span';
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
}

export default function TextReveal({
  children,
  as: Tag = 'p',
  className = '',
  stagger = 0.03,
  duration = 0.8,
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll('.tr-word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          y: 40,
          opacity: 0,
          clipPath: 'inset(100% 0 0 0)',
        },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0% 0 0 0)',
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [children, stagger, duration, delay]);

  const words = children.split(' ');

  return (
    <Tag ref={containerRef as any} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="tr-word inline-block mr-[0.3em]"
          style={{ opacity: 0 }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
