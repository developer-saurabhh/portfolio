import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin } from 'lucide-react';

function MagneticButton({ children, href, variant = 'primary', download }: { children: React.ReactNode; href: string; variant?: 'primary' | 'outline'; download?: boolean }) {
  return (
    <motion.a
      href={href}
      download={download || undefined}
      target={download ? '_blank' : undefined}
      className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium text-base transition-colors ${
        variant === 'primary'
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'glass gradient-border text-foreground hover:bg-muted/60'
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      {children}
    </motion.a>
  );
}

export default function HeroSection() {
  const name = "Saurabh";
  const letters = name.split('');

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Overline */}
        <motion.p
          className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Frontend Developer · Building Scalable Web Applications
        </motion.p>

        {/* Name */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 leading-none">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className={letter === ' ' ? '' : 'gradient-text inline-block'}
              initial={{ opacity: 0, y: 60, rotateX: -80 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4 + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          I build modern, responsive, and performance-optimized web
          applications with clean UI systems and scalable architecture.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <MagneticButton href="#projects">View My Work</MagneticButton>
          <MagneticButton href="#contact" variant="outline">Get In Touch</MagneticButton>
          <MagneticButton href="/Saurabh_Resume.pdf" variant="outline" download>
            <ArrowDown size={16} /> Resume
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex gap-6 justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          {[
            { icon: Github, href: 'https://github.com/saurabh-sharmaa' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/saurabh-sharmaa8' },
          ].map(({ icon: Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <ArrowDown className="text-muted-foreground" size={20} />
      </motion.div>
    </section>
  );
}
