import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
  isAccent?: boolean;
}

const AnimatedWord: React.FC<WordProps> = ({ children, progress, range, isAccent }) => {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const color = useTransform(
    progress,
    range,
    isAccent ? ['#A1A1AA', '#FF2E93'] : ['#A1A1AA', '#0E0E10']
  );

  return (
    <span className="relative inline-block mr-[0.3em] last:mr-0">
      <motion.span
        style={{ opacity, color }}
        className={`transition-colors duration-200 ${
          isAccent ? 'font-bold tracking-tight' : 'font-medium'
        }`}
      >
        {children}
      </motion.span>
    </span>
  );
};

export const IntroStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const statementWords = [
    { text: "I", accent: false },
    { text: "build", accent: false },
    { text: "secure,", accent: true },
    { text: "scalable", accent: true },
    { text: "and", accent: false },
    { text: "reliable", accent: true },
    { text: "cloud", accent: true },
    { text: "infrastructure", accent: true },
    { text: "while", accent: false },
    { text: "exploring", accent: false },
    { text: "automation,", accent: true },
    { text: "Kubernetes,", accent: true },
    { text: "DevOps", accent: true },
    { text: "and", accent: false },
    { text: "backend", accent: true },
    { text: "engineering.", accent: true },
  ];

  return (
    <section
      id="statement"
      ref={containerRef}
      className="py-24 md:py-36 px-4 md:px-8 lg:px-12 bg-[#FAF9F6] border-y border-black/8 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Subheading */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-[#FF2E93]" />
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#FF2E93] uppercase">
            EDITORIAL STATEMENT
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight text-[#0E0E10] mb-8 md:mb-12 leading-tight">
          FROM INFRASTRUCTURE <br className="hidden sm:inline" />
          TO AUTOMATION.
        </h2>

        {/* Animated Paragraph with Scroll-Triggered Word Transitions */}
        <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-[1.3] md:leading-[1.25] tracking-tight">
          {statementWords.map((item, index) => {
            const step = 1 / statementWords.length;
            const start = index * step;
            const end = start + step;
            return (
              <AnimatedWord
                key={index}
                progress={scrollYProgress}
                range={[start, end]}
                isAccent={item.accent}
              >
                {item.text}
              </AnimatedWord>
            );
          })}
        </div>

        {/* Additional engineering ethos statement */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0E0E10]" />
            <span className="uppercase font-semibold tracking-wider text-gray-700">
              PHILOSOPHY:
            </span>
            <span>SYSTEM RELIABILITY • ZERO CONFIG DRIFT • IMMUTABLE WORKLOADS</span>
          </div>
          <div className="text-[#FF2E93] font-semibold">
            SCROLL TO INSPECT DOSSIER ↓
          </div>
        </div>
      </div>
    </section>
  );
};
