import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    title: 'Why I Chose React Over Other Frameworks',
    excerpt: 'A deep dive into my decision-making process and what makes React the right tool for building scalable frontend applications.',
    date: '2026-02-15',
    readTime: '5 min read',
    tags: ['React', 'Frontend', 'Architecture'],
    content: `
## Why React?

When I started my journey into frontend development, the framework landscape was overwhelming. Angular, Vue, Svelte — each had compelling arguments. Here's why I landed on React.

### Component-Based Thinking

React's component model clicked with how I naturally think about UI. Breaking interfaces into **reusable, composable pieces** made my code cleaner and more maintainable from day one.

\`\`\`jsx
// Clean, predictable, composable
function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
\`\`\`

### The Ecosystem

The React ecosystem is unmatched — Next.js for SSR, React Native for mobile, and thousands of battle-tested libraries. This wasn't just choosing a library; it was choosing an **entire platform**.

### Key Takeaway

The best framework is the one that lets you **ship quality products consistently**. For me, that's React.
    `,
  },
  {
    title: 'Building Scalable Component Architecture',
    excerpt: 'How I structure React components for maximum reusability, maintainability, and performance in production applications.',
    date: '2026-01-28',
    readTime: '7 min read',
    tags: ['React', 'Design Patterns', 'Clean Code'],
    content: `
## Scalable Component Architecture

After building multiple production applications, I've developed a component architecture pattern that scales beautifully.

### The Three-Layer Pattern

I organize components into three distinct layers:

1. **UI Components** — Pure presentational, zero business logic
2. **Feature Components** — Business logic + UI composition
3. **Page Components** — Route-level orchestration

### Folder Structure

\`\`\`
src/
├── components/ui/      # Buttons, inputs, cards
├── components/features/ # Auth forms, dashboards
├── pages/              # Route components
└── hooks/              # Shared logic
\`\`\`

### Why This Works

Each layer has a **single responsibility**. UI components are infinitely reusable. Feature components encapsulate business logic. Pages simply compose features together.

This separation means I can refactor business logic without touching UI, and redesign interfaces without breaking functionality.
    `,
  },
  {
    title: 'Performance Optimization Tips for React Apps',
    excerpt: 'Practical techniques I use daily to keep React applications fast, responsive, and efficient at scale.',
    date: '2026-01-10',
    readTime: '6 min read',
    tags: ['Performance', 'React', 'Optimization'],
    content: `
## React Performance That Matters

Performance optimization isn't about premature micro-optimizations — it's about **understanding where bottlenecks actually occur** and fixing them systematically.

### 1. Lazy Loading Routes

\`\`\`jsx
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
\`\`\`

This single change can reduce initial bundle size by **40-60%** in large applications.

### 2. Memoization Done Right

Don't wrap everything in \`useMemo\`. Profile first, then optimize:

- **Do memo:** Expensive calculations, large list filtering
- **Don't memo:** Simple values, rarely-changing props

### 3. Image Optimization

Use modern formats (WebP/AVIF), lazy loading, and proper sizing. Images are often the **biggest performance bottleneck** on the web.

### The Golden Rule

**Measure before optimizing.** React DevTools Profiler and Lighthouse are your best friends. Data-driven optimization beats guesswork every time.
    `,
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function BlogModal({
  post,
  onClose,
}: {
  post: (typeof posts)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="relative w-full max-w-3xl glass rounded-2xl gradient-border z-10"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary rounded-t-2xl" />
        <div className="p-6 sm:p-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight pr-8">
            {post.title}
          </h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {tag}
              </span>
            ))}
          </div>
          <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted/40 prose-pre:border prose-pre:border-border/50 prose-pre:rounded-xl prose-a:text-primary prose-li:text-muted-foreground prose-ol:text-muted-foreground prose-ul:text-muted-foreground">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activePost, setActivePost] = useState<(typeof posts)[0] | null>(null);

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

      // Blog cards staggered entrance with alternating slide direction
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.blog-card');
        cards.forEach((card, i) => {
          const direction = i % 2 === 0 ? -80 : 80;
          gsap.fromTo(card,
            { opacity: 0, x: direction, rotateY: i % 2 === 0 ? 10 : -10 },
            {
              opacity: 1, x: 0, rotateY: 0,
              duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="blog" className="py-32 px-6" ref={sectionRef}>
        <div className="max-w-6xl mx-auto">
          <div ref={headingRef} className="text-center mb-16">
            <p className="heading-reveal text-sm tracking-[0.3em] uppercase text-primary mb-4" style={{ opacity: 0 }}>
              Insights
            </p>
            <h2 className="heading-reveal text-4xl sm:text-5xl font-bold mb-6" style={{ opacity: 0 }}>
              Latest <span className="gradient-text">Articles</span>
            </h2>
            <p className="heading-reveal text-muted-foreground max-w-xl mx-auto" style={{ opacity: 0 }}>
              Thoughts on frontend development, architecture patterns, and building
              better web experiences.
            </p>
          </div>

          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
            {posts.map((post) => (
              <article
                key={post.title}
                className="blog-card group glass rounded-xl overflow-hidden gradient-border cursor-pointer hover:-translate-y-2 transition-transform duration-300"
                style={{ opacity: 0 }}
                onClick={() => setActivePost(post)}
              >
                <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary" />
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={12} />
                      {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activePost && (
          <BlogModal post={activePost} onClose={() => setActivePost(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
