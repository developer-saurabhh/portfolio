import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    date: '2024',
    title: 'Started Web Development',
    description: 'Began learning HTML, CSS, and JavaScript. Built my first static websites and discovered the joy of creating for the web.',
    type: 'learning' as const,
  },
  {
    date: '2024',
    title: 'Learned React & Tailwind',
    description: 'Deep-dived into React ecosystem, component architecture, and utility-first CSS with Tailwind. Built multiple practice projects.',
    type: 'skill' as const,
  },
  {
    date: '2025',
    title: 'First Freelance Projects',
    description: 'Started freelancing — delivered responsive landing pages and dashboard interfaces for real clients with production-quality code.',
    type: 'work' as const,
  },
  {
    date: '2025',
    title: 'Pursuing BCA',
    description: 'Enrolled in BCA program while continuing to build production apps. Balancing academics with real-world development experience.',
    type: 'education' as const,
  },
  {
    date: '2026',
    title: 'Expanding to Full-Stack',
    description: 'Learning Node.js, MongoDB, and Next.js to build complete SaaS platforms. Focused on scalable architecture and API design.',
    type: 'growth' as const,
  },
];

const typeColors: Record<string, string> = {
  learning: 'from-blue-500 to-cyan-400',
  skill: 'from-primary to-secondary',
  work: 'from-emerald-500 to-green-400',
  education: 'from-amber-500 to-yellow-400',
  growth: 'from-purple-500 to-pink-400',
};

const typeIcons: Record<string, string> = {
  learning: '📚',
  skill: '⚡',
  work: '💼',
  education: '🎓',
  growth: '🚀',
};

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
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

      // Timeline line draws down
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        );
      }

      // Cards stagger in
      if (cardsRef.current) {
        const items = cardsRef.current.querySelectorAll('.timeline-item');
        items.forEach((item, i) => {
          const isLeft = i % 2 === 0;
          gsap.fromTo(item,
            { opacity: 0, x: isLeft ? -80 : 80, scale: 0.9 },
            {
              opacity: 1, x: 0, scale: 1,
              duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' },
            }
          );
        });

        // Dots pop in
        const dots = cardsRef.current.querySelectorAll('.timeline-dot');
        dots.forEach((dot) => {
          gsap.fromTo(dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.5, ease: 'back.out(2)',
              scrollTrigger: { trigger: dot, start: 'top 85%', toggleActions: 'play none none none' },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-32 px-6" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="text-center mb-20">
          <p className="heading-reveal text-sm tracking-[0.3em] uppercase text-primary mb-4" style={{ opacity: 0 }}>
            Journey
          </p>
          <h2 className="heading-reveal text-4xl sm:text-5xl font-bold" style={{ opacity: 0 }}>
            My <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div ref={cardsRef} className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[2px] md:w-px origin-top"
            style={{
              transform: 'scaleY(0)',
              background: 'linear-gradient(to bottom, hsl(var(--primary) / 0.6), hsl(var(--secondary) / 0.6), hsl(var(--primary) / 0.6))',
              boxShadow: '0 0 8px hsl(var(--primary) / 0.3)',
            }}
          />

          {milestones.map((milestone, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={milestone.title}
                className={`timeline-item relative flex items-start mb-12 md:mb-16 last:mb-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
                style={{ opacity: 0 }}
              >
                {/* Card */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-4 md:text-right' : 'md:pl-4'}`}>
                  <div className="glass gradient-border rounded-xl p-5 md:p-6 group hover:scale-[1.02] transition-transform duration-300">
                    <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                      <span className="text-xl md:text-2xl">{typeIcons[milestone.type]}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${typeColors[milestone.type]} text-white`}>
                        {milestone.date}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Dot — larger on mobile with glow */}
                <div
                  className={`timeline-dot absolute left-[11px] md:left-1/2 top-6 w-4 h-4 md:w-3 md:h-3 rounded-full bg-gradient-to-r ${typeColors[milestone.type]} -translate-x-1/2 ring-[3px] ring-background scale-0`}
                  style={{ boxShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}
                />

                {/* Connector line from dot to card on mobile */}
                <div className={`absolute left-[26px] top-[30px] w-6 h-[2px] md:hidden bg-gradient-to-r ${typeColors[milestone.type]} opacity-40`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
