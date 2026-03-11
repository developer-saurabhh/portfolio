import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = navItems.map(item => item.href.replace('#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))',
        }}
      />

      <motion.nav
        className="fixed top-[2px] left-0 right-0 z-50 px-6 py-4 transition-colors duration-300"
        style={{ backgroundColor: `hsl(var(--background) / ${bgOpacity})` } as any}
      >
        <motion.div
          className="max-w-6xl mx-auto flex items-center justify-between"
          style={{ backdropFilter: useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(12px)']) as any }}
        >
          <motion.a
            href="#home"
            className="text-xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            SS
          </motion.a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative text-sm px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full bg-primary"
                      layoutId="nav-indicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button className="text-foreground" onClick={() => setOpen(!open)}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {navItems.map(item => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.label}
                href={item.href}
                className={`text-2xl font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
        </motion.div>
      )}
    </>
  );
}
