import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  'React.js', 'Next.js', 'JavaScript (ES6+)', 'Tailwind CSS',
  'React Hooks', 'Context API', 'REST APIs', 'Git & GitHub',
  'Vercel', 'Figma', 'Postman', 'Responsive Design'
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal divider line draws in
      gsap.fromTo(dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Overline slides in
      gsap.fromTo(overlineRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Heading: split characters reveal
      if (headingRef.current) {
        const text = headingRef.current.innerHTML;
        // Wrap each word for stagger
        const words = headingRef.current.querySelectorAll('.word-reveal');
        gsap.fromTo(words,
          { y: 80, opacity: 0, rotateX: -40 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Body paragraphs slide up
      if (bodyRef.current) {
        const paragraphs = bodyRef.current.querySelectorAll('p');
        gsap.fromTo(paragraphs,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bodyRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Skills: staggered scale-in with rotation
      if (skillsRef.current) {
        const chips = skillsRef.current.querySelectorAll('.skill-chip');
        gsap.fromTo(chips,
          { scale: 0, opacity: 0, rotation: -10 },
          {
            scale: 1, opacity: 1, rotation: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Stats: counter animation
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(statItems,
          { y: 50, opacity: 0, scale: 0.8 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-32 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Decorative divider */}
        <div
          ref={dividerRef}
          className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-20 origin-left"
          style={{ transformOrigin: 'left center' }}
        />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p
              ref={overlineRef}
              className="text-sm tracking-[0.3em] uppercase text-primary mb-4"
              style={{ opacity: 0 }}
            >
              About Me
            </p>
            <h2
              ref={headingRef}
              className="text-4xl sm:text-5xl font-bold mb-8 leading-tight"
              style={{ perspective: '600px' }}
            >
              <span className="word-reveal inline-block" style={{ opacity: 0 }}>Clarity </span>
              <span className="word-reveal inline-block" style={{ opacity: 0 }}>in </span>
              <span className="word-reveal inline-block" style={{ opacity: 0 }}>structure,</span>
              <br />
              <span className="word-reveal inline-block gradient-text" style={{ opacity: 0 }}>performance </span>
              <span className="word-reveal inline-block gradient-text" style={{ opacity: 0 }}>in </span>
              <span className="word-reveal inline-block gradient-text" style={{ opacity: 0 }}>execution.</span>
            </h2>
            <div
              ref={bodyRef}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p style={{ opacity: 0 }}>
                I'm Saurabh, a frontend-focused developer specializing in building
                modern, responsive, and performance-optimized web applications using
                React and Next.js.
              </p>
              <p style={{ opacity: 0 }}>
                My approach emphasizes clean UI systems, scalable component architecture,
                and business-focused problem solving. I'm currently expanding into
                full-stack development with Node.js and MongoDB to build complete,
                production-ready SaaS platforms.
              </p>
            </div>
          </div>

          {/* Right - Skills */}
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">Core Expertise</p>
            <div ref={skillsRef} className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-chip glass gradient-border px-4 py-2 rounded-lg text-sm font-medium text-foreground cursor-default hover:scale-105 hover:-translate-y-0.5 transition-transform"
                  style={{ opacity: 0 }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6 mt-12">
              {[
                { value: 'BCA', label: 'Pursuing' },
                { value: '4+', label: 'Months Freelance' },
                { value: '∞', label: 'Curiosity' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="stat-item text-center"
                  style={{ opacity: 0 }}
                >
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1 tracking-wider uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
