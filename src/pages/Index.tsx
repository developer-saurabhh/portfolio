import ParticleBackground from '@/components/ParticleBackground';
import CustomCursor from '@/components/CustomCursor';
import PageLoader from '@/components/PageLoader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import TechStackSection from '@/components/TechStackSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import ParallaxSection from '@/components/ParallaxSection';
import SmoothScroll from '@/components/SmoothScroll';
import { Helmet } from 'react-helmet-async';
import { useSoundEffects } from '@/hooks/use-sound-effects';

const Index = () => {
  useSoundEffects();

  return (
    <>
      <Helmet>
        <title>Saurabh Sharma | Frontend Developer Portfolio</title>
        <meta name="description" content="Saurabh Sharma — Frontend Developer specializing in React, Next.js, and scalable web applications. View projects, blog, and get in touch." />
        <link rel="canonical" href="https://saurabhsharma.dev" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Saurabh Sharma",
          "url": "https://saurabhsharma.dev",
          "jobTitle": "Frontend Developer",
          "knowsAbout": ["React", "Next.js", "JavaScript", "Tailwind CSS", "Node.js"],
          "sameAs": [
            "https://github.com/saurabh-sharmaa",
            "https://www.linkedin.com/in/saurabh-sharmaa8"
          ]
        })}</script>
      </Helmet>
      <SmoothScroll>
        <PageLoader />
        <CustomCursor />
        <ParticleBackground />
        <Navbar />
        <main>
          <HeroSection />
          <ParallaxSection speed={0.15} fadeIn>
            <AboutSection />
          </ParallaxSection>
          <ParallaxSection speed={0.12} fadeIn>
            <ExperienceSection />
          </ParallaxSection>
          <ParallaxSection speed={0.1} fadeIn>
            <ProjectsSection />
          </ParallaxSection>
          <ParallaxSection speed={0.2} fadeIn>
            <TechStackSection />
          </ParallaxSection>
          <ParallaxSection speed={0.15} fadeIn>
            <BlogSection />
          </ParallaxSection>
          <ParallaxSection speed={0.1} fadeIn>
            <ContactSection />
          </ParallaxSection>
        </main>
      </SmoothScroll>
    </>
  );
};

export default Index;
