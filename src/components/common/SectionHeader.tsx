'use client';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  index: string;          // "01", "02"… technical section index
  eyebrow: string;        // module label, e.g. "DIAGNÓSTICO OPERATIVO"
  title: React.ReactNode;
  sub?: string;
  align?: 'left' | 'center';
  accent?: 'cyan' | 'violet' | 'gold';
}

const accentText: Record<string, string> = {
  cyan: 'text-[oklch(0.78_0.13_205)]',
  violet: 'text-[oklch(0.7_0.16_285)]',
  gold: 'text-[oklch(0.8_0.11_85)]',
};

export function SectionHeader({
  index,
  eyebrow,
  title,
  sub,
  align = 'left',
  accent = 'cyan',
}: SectionHeaderProps) {
  const centered = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`space-y-4 ${centered ? 'text-center mx-auto' : ''} max-w-3xl`}
    >
      <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        <span className={`eyebrow ${accentText[accent]}`}>{index}</span>
        <span className="h-px w-8 bg-[var(--line-strong)]" />
        <span className="eyebrow text-zinc-500">{eyebrow}</span>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.12] tracking-tight text-gradient-light"
      >
        {title}
      </motion.h2>
      {sub && (
        <p className={`text-[15px] text-zinc-400 leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {sub}
        </p>
      )}
    </motion.div>
  );
}
