import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techs = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'JavaScript', icon: '🟨' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Git', icon: '🔀' },
  { name: 'Vercel', icon: '▲' },
  { name: 'REST APIs', icon: '🔗' },
  { name: 'Postman', icon: '📮' },
  { name: 'Figma', icon: '🎯' },
  { name: 'Framer Motion', icon: '✨' },
];

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading clip-path reveal
      if (headingRef.current) {
        const els = headingRef.current.querySelectorAll('.heading-reveal');
        gsap.fromTo(els,
          { y: 50, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          {
            y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)',
            duration: 1, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      }

      // Grid items: radial stagger from center
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('.tech-item');
        const center = Math.floor(items.length / 2);
        const sorted = Array.from(items).sort((a, b) => {
          const ai = Array.from(items).indexOf(a);
          const bi = Array.from(items).indexOf(b);
          return Math.abs(ai - center) - Math.abs(bi - center);
        });

        gsap.fromTo(sorted,
          { scale: 0, opacity: 0, rotation: -15, y: 30 },
          {
            scale: 1, opacity: 1, rotation: 0, y: 0,
            duration: 0.6, stagger: 0.05, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );

        // Subtle floating on scroll
        items.forEach((item, i) => {
          gsap.to(item, {
            y: i % 2 === 0 ? -8 : 8,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" className="py-32 px-6" ref={sectionRef}>
      <div className="max-w-4xl mx-auto text-center">
        <div ref={headingRef}>
          <p className="heading-reveal text-sm tracking-[0.3em] uppercase text-primary mb-4" style={{ opacity: 0 }}>
            Technologies
          </p>
          <h2 className="heading-reveal text-4xl sm:text-5xl font-bold mb-16" style={{ opacity: 0 }}>
            Tech <span className="gradient-text">Stack</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {techs.map((tech) => (
            <div
              key={tech.name}
              className="tech-item glass gradient-border rounded-xl p-4 flex flex-col items-center gap-2 group cursor-default hover:scale-110 hover:-translate-y-1 transition-transform"
              style={{ opacity: 0 }}
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
