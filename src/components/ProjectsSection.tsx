import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Business Landing Page',
    description: 'A high-conversion, responsive landing page with smooth animations and structured layout systems designed for maximum impact.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    live: '#',
    github: '#',
  },
  {
    title: 'SaaS Dashboard Interface',
    description: 'A scalable dashboard UI featuring analytics layouts, reusable components, and structured design patterns for data-driven applications.',
    tech: ['React', 'Chart.js', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    live: '#',
    github: '#',
  },
  {
    title: 'API-Integrated Web App',
    description: 'A dynamic web application integrating third-party APIs with proper loading states, error handling, and optimized rendering.',
    tech: ['React', 'REST APIs', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    live: '#',
    github: '#',
  },
];

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FeaturedCard({ project }: { project: typeof projects[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TiltCard className="project-card col-span-full" >
      <div
        className="group glass rounded-2xl overflow-hidden gradient-border"
        style={{ opacity: 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative overflow-hidden aspect-video md:aspect-auto md:min-h-[400px]">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
              animate={{
                scale: isHovered ? 1.05 : 1,
                filter: isHovered ? 'blur(0px)' : 'blur(2px)',
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
          </div>

          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Featured Project</span>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
            <TextReveal as="p" className="text-muted-foreground leading-relaxed mb-6" stagger={0.02}>
              {project.description}
            </TextReveal>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map(t => (
                <span key={t} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <motion.a
                href={project.live}
                className="glass rounded-full px-6 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={16} /> Live Demo
              </motion.a>
              <motion.a
                href={project.github}
                className="glass rounded-full px-6 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={16} /> Source
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TiltCard className="project-card">
      <div
        className="group glass rounded-xl overflow-hidden gradient-border h-full"
        style={{ opacity: 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden aspect-video">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
            animate={{
              scale: isHovered ? 1.1 : 1,
              filter: isHovered ? 'blur(0px)' : 'blur(1px)',
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <motion.a
              href={project.live}
              className="glass rounded-full p-3 text-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={20} />
            </motion.a>
            <motion.a
              href={project.github}
              className="glass rounded-full p-3 text-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} />
            </motion.a>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const elements = headingRef.current.querySelectorAll('.heading-reveal');
        gsap.fromTo(elements,
          { y: 50, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          {
            y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)',
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card');
        cards.forEach((card, i) => {
          const inner = card.querySelector('.glass');
          if (!inner) return;
          gsap.fromTo(inner,
            {
              opacity: 0,
              y: 80,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              delay: i * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        cards.forEach((card) => {
          const img = card.querySelector('img');
          if (img) {
            gsap.fromTo(img,
              { yPercent: -10 },
              {
                yPercent: 10,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="py-32 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <p className="heading-reveal text-sm tracking-[0.3em] uppercase text-primary mb-4" style={{ opacity: 0 }}>
            Selected Work
          </p>
          <h2 className="heading-reveal text-4xl sm:text-5xl font-bold" style={{ opacity: 0 }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
          <FeaturedCard project={featured} />
          {rest.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
