'use client';
import { motion } from 'framer-motion';

/**
 * Animated rhythm divider between sections. The line draws in on
 * scroll and a node pulses at center — keeps the long page feeling
 * ordered and "alive" without adding content.
 */
export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8" aria-hidden>
      <div className="relative flex items-center gap-4 py-2">
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex-1 h-px origin-left bg-gradient-to-r from-transparent via-[var(--line-mid)] to-[oklch(0.78_0.13_205/0.4)]"
        />
        <span className="relative flex items-center justify-center">
          <span className="status-dot bg-[oklch(0.78_0.13_205)]" />
        </span>
        {label && (
          <span className="text-[10px] mono uppercase tracking-[0.2em] text-zinc-700 shrink-0">
            {label}
          </span>
        )}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex-1 h-px origin-right bg-gradient-to-l from-transparent via-[var(--line-mid)] to-[oklch(0.78_0.13_205/0.4)]"
        />
      </div>
    </div>
  );
}
