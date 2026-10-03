import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IntroStatement } from './components/IntroStatement';
import { About } from './components/About';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certification } from './components/Certification';
import { Achievements } from './components/Achievements';
import { EducationTimeline } from './components/EducationTimeline';
import { CloudThoughts } from './components/CloudThoughts';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  useEffect(() => {
    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-[#0E0E10] font-sans selection:bg-[#FF2E93] selection:text-white">
      {/* Desktop-only Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Floating Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Layout */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Editorial Scroll Statement */}
        <IntroStatement />

        {/* About Section */}
        <About />

        {/* Interactive CLI Terminal Component */}
        <InteractiveTerminal />

        {/* Skills Section */}
        <Skills />

        {/* Projects & Workloads Section */}
        <Projects />

        {/* AWS Certification In-Progress Block */}
        <Certification />

        {/* Achievements Section */}
        <Achievements />

        {/* Academic Education Timeline */}
        <EducationTimeline />

        {/* Cloud Thoughts Editorial Section */}
        <CloudThoughts />

        {/* Dramatic Dark Contact Section */}
        <Contact />
      </main>

      {/* Oversized Dark Editorial Footer */}
      <Footer />
    </div>
  );
}

export default App;
