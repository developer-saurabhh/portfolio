import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top divider draws in from center
      gsap.fromTo(dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      // Heading elements reveal
      if (headingRef.current) {
        const els = headingRef.current.querySelectorAll('.heading-reveal');
        gsap.fromTo(els,
          { y: 60, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          {
            y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)',
            duration: 1, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      }

      // CTA button scales in with bounce
      gsap.fromTo(ctaRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.8, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      );

      // Social icons stagger in
      if (socialsRef.current) {
        const icons = socialsRef.current.querySelectorAll('.social-icon');
        gsap.fromTo(icons,
          { y: 30, opacity: 0, scale: 0 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.5, stagger: 0.1, ease: 'back.out(2)',
            scrollTrigger: { trigger: socialsRef.current, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      }

      // Footer fade
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 95%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="py-32 px-6" ref={sectionRef}>
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative divider */}
        <div
          ref={dividerRef}
          className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-20"
          style={{ transformOrigin: 'center center', transform: 'scaleX(0)' }}
        />

        <div ref={headingRef}>
          <p className="heading-reveal text-sm tracking-[0.3em] uppercase text-primary mb-4" style={{ opacity: 0 }}>
            Contact
          </p>
          <h2 className="heading-reveal text-4xl sm:text-5xl font-bold mb-6" style={{ opacity: 0 }}>
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="heading-reveal text-muted-foreground mb-12 leading-relaxed" style={{ opacity: 0 }}>
            Open to freelance collaborations, frontend development projects, and
            product-based opportunities. Let's build something great together.
          </p>
        </div>

        <div ref={ctaRef} style={{ opacity: 0 }}>
          <motion.a
            href="mailto:saurabhsharmaa05@gmail.com"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-primary text-primary-foreground font-semibold text-lg"
            whileHover={{ scale: 1.05, y: -3, boxShadow: '0 20px 40px -10px hsl(217 100% 60% / 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={20} />
            Say Hello
          </motion.a>
        </div>

        {/* Social */}
        <div ref={socialsRef} className="flex gap-6 justify-center mt-16">
          {[
            { icon: Github, href: 'https://github.com/saurabh-sharmaa', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/saurabh-sharmaa8', label: 'LinkedIn' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="social-icon text-muted-foreground hover:text-primary transition-colors"
              style={{ opacity: 0 }}
              whileHover={{ scale: 1.2, y: -3 }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <div ref={footerRef} className="mt-24 pt-8 border-t border-border/50" style={{ opacity: 0 }}>
          <p className="text-xs text-muted-foreground">
            © 2026 Saurabh Sharma. Built with passion and clean code.
          </p>
        </div>
      </div>
    </section>
  );
}
