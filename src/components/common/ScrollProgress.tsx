'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin reading-progress bar pinned to the top edge. Sits above the
 * scanlines layer. Pure scroll-linked motion — feels precise, "pro".
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left"
      aria-hidden
    >
      <div
        className="h-full w-full"
        style={{
          background:
            'linear-gradient(90deg, oklch(0.78 0.13 205), oklch(0.62 0.19 285) 60%, oklch(0.74 0.14 165))',
          boxShadow: '0 0 12px oklch(0.78 0.13 205 / 0.6)',
        }}
      />
    </motion.div>
  );
}
