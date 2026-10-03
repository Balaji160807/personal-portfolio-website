import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { MapPin, ArrowDown, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Mouse coordinates for subtle parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Subtle interactive hover parallax for the borderless portrait
  const portraitX = useTransform(smoothMouseX, [-600, 600], [-16, 16]);
  const portraitY = useTransform(smoothMouseY, [-600, 600], [-10, 10]);

  // Scroll parallax: portrait glides subtly as user scrolls down
  const { scrollY } = useScroll();
  const portraitScrollY = useTransform(scrollY, [0, 800], [0, 120]);

  // Floating technical pills parallax
  const pill1X = useTransform(smoothMouseX, [-500, 500], [-18, 18]);
  const pill1Y = useTransform(smoothMouseY, [-500, 500], [-14, 14]);

  const pill2X = useTransform(smoothMouseX, [-500, 500], [20, -20]);
  const pill2Y = useTransform(smoothMouseY, [-500, 500], [15, -15]);

  const pill3X = useTransform(smoothMouseX, [-500, 500], [-14, 14]);
  const pill3Y = useTransform(smoothMouseY, [-500, 500], [18, -18]);

  const pill4X = useTransform(smoothMouseX, [-500, 500], [16, -16]);
  const pill4Y = useTransform(smoothMouseY, [-500, 500], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 md:pt-28 pb-6 px-4 md:px-8 lg:px-12 overflow-hidden bg-white selection:bg-[#FF2E93] selection:text-white"
    >
      {/* Top Status & Meta Row */}
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-30">
        {/* Availability status pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-black/10 shadow-sm text-xs font-mono"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2E93] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2E93]" />
          </span>
          <span className="font-semibold tracking-wider text-[#0E0E10]">
            {PERSONAL_INFO.status}
          </span>
        </motion.div>

        {/* Location pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center gap-1.5 text-xs font-mono text-gray-600 bg-white/90 px-3.5 py-1.5 rounded-full border border-black/8 shadow-sm"
        >
          <MapPin className="w-3.5 h-3.5 text-[#FF2E93]" />
          <span>{PERSONAL_INFO.location}</span>
        </motion.div>
      </div>

      {/* Floating Technical Pills - positioned in negative space */}
      {/* Pill 1: AWS */}
      <motion.div
        style={{ x: pill1X, y: pill1Y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="hidden lg:flex absolute top-28 left-[48%] xl:left-[52%] items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#FF9900]/30 shadow-sm text-[11px] font-mono font-bold tracking-wider text-[#232F3E] select-none z-30"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" />
        AWS CLOUD
      </motion.div>

      {/* Pill 2: KUBERNETES */}
      <motion.div
        style={{ x: pill2X, y: pill2Y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="hidden md:flex absolute top-[38%] left-4 lg:left-8 items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0E0E10] text-white border border-white/10 shadow-md text-[11px] font-mono font-bold tracking-wider select-none z-30"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#326CE5]" />
        KUBERNETES
      </motion.div>

      {/* Pill 3: DOCKER CI/CD */}
      <motion.div
        style={{ x: pill3X, y: pill3Y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="hidden sm:flex absolute bottom-20 left-1/3 items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-black/10 shadow-sm text-[11px] font-mono tracking-wider text-gray-800 select-none z-30"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#2496ED]" />
        DOCKER CI/CD
      </motion.div>

      {/* Pill 4: LINUX SRE */}
      <motion.div
        style={{ x: pill4X, y: pill4Y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.75 }}
        className="hidden xl:flex absolute bottom-28 left-[50%] 2xl:left-[54%] items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#FF2E93]/30 shadow-sm text-[11px] font-mono font-bold tracking-wider text-[#0E0E10] select-none z-30"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E93]" />
        LINUX SRE
      </motion.div>

      {/* Main Hero First Page Body */}
      <div className="relative max-w-7xl w-full mx-auto my-auto flex-1 flex flex-col justify-center py-2 md:py-4">
        {/* Editorial Typography & Narrative Layered with Portrait */}
        <div className="relative z-20 flex flex-col max-w-2xl lg:max-w-3xl xl:max-w-4xl select-none">
          {/* Row 1: CLOUD */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] xl:text-[12rem] tracking-tighter uppercase text-[#0E0E10] leading-[0.84]"
            >
              CLOUD
            </motion.h1>
          </div>

          {/* Row 2: ENGINEER */}
          <div className="overflow-hidden flex items-baseline gap-2 md:gap-4 flex-wrap">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] xl:text-[12rem] tracking-tighter uppercase text-[#0E0E10] leading-[0.84]"
            >
              ENGINEER
            </motion.span>
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-[#FF2E93] font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
            >
              .
            </motion.span>
          </div>

          {/* Row 3: & BACKEND BUILDER */}
          <div className="overflow-hidden pt-1 md:pt-3">
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="font-display font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-gray-500 uppercase flex items-center gap-3"
            >
              <span>& BACKEND</span>
              <span className="text-[#FF2E93] bg-[#FF2E93]/10 px-2.5 py-0.5 rounded-lg border border-[#FF2E93]/20">
                BUILDER
              </span>
            </motion.p>
          </div>

          {/* Supporting Bio Dossier Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 md:mt-8 pt-4 max-w-xl space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#FF2E93] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BALAJI R — ENGINEERING DOSSIER</span>
            </div>

            <p className="text-base sm:text-lg md:text-xl font-normal text-[#18181B] leading-relaxed">
              Aspiring AWS Cloud Engineer specializing in{' '}
              <strong className="font-semibold text-black underline decoration-[#FF2E93] decoration-2 underline-offset-4">
                cloud operations
              </strong>
              ,{' '}
              <strong className="font-semibold text-black underline decoration-[#FF2E93] decoration-2 underline-offset-4">
                DevOps automation
              </strong>
              , and reliable backend platforms.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-5 py-3 rounded-full bg-[#0E0E10] text-white hover:bg-[#FF2E93] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>EXPLORE PLATFORMS</span>
                <span className="text-[#FF2E93] group-hover:text-white">↓</span>
              </a>
              <a
                href="#contact"
                className="px-5 py-3 rounded-full bg-white text-[#0E0E10] border border-black/15 hover:border-[#FF2E93] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                GET IN TOUCH
              </a>
            </div>
          </motion.div>
        </div>

        {/* High-Resolution Borderless Portrait: Lifted to match Heading level, filling first page */}
        <motion.div
          style={{
            x: portraitX,
            y: portraitY,
            translateY: portraitScrollY,
          }}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="pointer-events-none select-none z-10 flex justify-end items-start absolute right-0 sm:right-2 md:right-4 lg:right-6 xl:right-12 2xl:right-20 top-0 md:top-[-6px] lg:top-[-14px]"
        >
          {/* High-Res Picture (Retina 1140x2072) with Zero Borders, directly attaching to white background */}
          <picture className="w-auto flex items-start justify-end">
            <source srcSet="/images/balaji-hero.webp" type="image/webp" />
            <img
              src="/images/balaji-hero.png"
              alt="Balaji R — Aspiring AWS Cloud Engineer and DevOps Specialist"
              width={1140}
              height={2072}
              loading="eager"
              decoding="async"
              className="w-auto h-[64vh] sm:h-[72vh] md:h-[80vh] lg:h-[88vh] xl:h-[92vh] max-h-[860px] object-contain object-top"
            />
          </picture>
        </motion.div>
      </div>

      {/* Bottom Technical Marquee / Quick Stack */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="max-w-7xl w-full mx-auto pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-gray-500 relative z-30"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-black/8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-gray-800">CORE STACK:</span>
          <span className="text-gray-500">AWS • EC2 • S3 • IAM • VPC • K8s • Docker • Linux</span>
        </div>

        <a
          href="#statement"
          aria-label="Scroll to introduction"
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-black/8 shadow-sm text-gray-700 hover:text-[#FF2E93] hover:border-[#FF2E93]/40 transition-all"
        >
          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};
