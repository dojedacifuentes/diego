'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { GlitchText } from '@/components/common/GlitchText';
import { Typewriter } from '@/components/common/Typewriter';
import { DiogenesLamp } from '@/components/common/DiogenesLamp';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="group/hero relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* Cursor-follow spotlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover/hero:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 32%) var(--my, 42%), oklch(0.78 0.13 205 / 0.1), transparent 70%)',
        }}
        aria-hidden
      />

      {/* Slow scan line traversing the hero (single, restrained) */}
      <div className="scan-line" aria-hidden />

      {/* Local spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 32% 42%, oklch(0.78 0.13 205 / 0.08) 0%, transparent 62%)',
        }}
        aria-hidden
      />

      <div className="max-w-5xl mx-auto px-5 lg:px-8 w-full relative">
        <div className="max-w-3xl space-y-8">

          {/* Boot sequence — types itself out */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-[12px] sm:text-[13px] mono text-zinc-500 leading-relaxed"
          >
            <Typewriter
              lines={[
                'diego@diogenes-lab:~$ whoami',
                'jurista · filósofo · constructor de herramientas',
              ]}
              speed={26}
              lineDelay={300}
            />
          </motion.div>

          {/* Name — glitch identity */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="eyebrow text-[oklch(0.78_0.13_205)] mb-3">
              <GlitchText text="DIEGO OJEDA" live />
            </div>
            <h1 className="serif text-[2.6rem] sm:text-6xl lg:text-[4.2rem] font-semibold leading-[1.02] tracking-tight">
              <span className="text-gradient-light">Derecho, IA y</span>
              <br />
              <span className="text-gradient-tech serif-italic">filosofía jurídica</span>
              <br />
              <span className="text-gradient-light">aplicada.</span>
            </h1>
          </motion.div>

          {/* One-line statement */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-[15px] sm:text-base text-zinc-400 leading-relaxed max-w-xl"
          >
            Investigo, enseño y construyo herramientas para entender —y rediseñar—
            cómo se estudia, se practica y se decide el derecho con inteligencia artificial.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button onClick={() => scrollTo('lab')} className="btn-primary">
              Ver proyectos
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button onClick={() => scrollTo('contacto')} className="btn-secondary glitch-hover">
              Trabajemos juntos
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Minimal status line — replaces the dense KPI grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="pt-6 border-t border-[var(--line-soft)] flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] mono text-zinc-600"
          >
            <span className="flex items-center gap-2 text-[oklch(0.78_0.13_162)]">
              <span className="status-dot bg-[oklch(0.74_0.14_165)]" />
              diegoojeda.cl
            </span>
            <span>Lcdo. Cs. Jurídicas PUCV</span>
            <span className="text-zinc-700">/</span>
            <span className="hidden sm:inline">Ayudante Filosofía del Derecho · 4 años</span>
            <span className="text-zinc-700 hidden sm:inline">/</span>
            <span className="inline-flex items-center gap-1.5">
              <DiogenesLamp className="w-3 h-3 lab-accent" />
              Diógenes Lab
            </span>
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => scrollTo('perfil')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-700 hover:text-[oklch(0.78_0.13_205)] transition-colors"
        aria-label="Bajar"
      >
        <span className="text-[10px] mono uppercase tracking-[0.2em]">scroll</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="block w-px h-7 bg-gradient-to-b from-[oklch(0.78_0.13_205/0.6)] to-transparent"
        />
      </motion.button>
    </section>
  );
}
