import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth springs for high-end feel
  const cursorX = useSpring(0, { damping: 28, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check element under cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('a, button, input, textarea, [data-cursor="pointer"]');
      const projectCard = target.closest('[data-cursor="project"]');
      const interactiveChip = target.closest('[data-cursor="chip"]');

      if (projectCard) {
        setIsPointer(true);
        setCursorText('VIEW');
      } else if (interactiveChip) {
        setIsPointer(true);
        setCursorText('');
      } else if (clickable) {
        setIsPointer(true);
        setCursorText('');
      } else {
        setIsPointer(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="custom-cursor-element pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorText ? 64 : isPointer ? 44 : 28,
          height: cursorText ? 64 : isPointer ? 44 : 28,
          backgroundColor: cursorText
            ? 'rgba(255, 46, 147, 0.95)'
            : isPointer
            ? 'rgba(255, 46, 147, 0.2)'
            : 'rgba(14, 14, 16, 0.08)',
          borderColor: cursorText ? '#FF2E93' : isPointer ? '#FF2E93' : 'rgba(14, 14, 16, 0.3)',
          borderWidth: 1.5,
          scale: 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
        className="rounded-full flex items-center justify-center backdrop-blur-[1px] transition-colors"
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold tracking-wider text-white">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Tiny inner center dot */}
      {!cursorText && (
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isPointer ? 0 : 1,
            opacity: isPointer ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="w-1.5 h-1.5 bg-[#FF2E93] rounded-full"
        />
      )}
    </div>
  );
};
