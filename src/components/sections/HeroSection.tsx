'use client';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, BookOpenText, GraduationCap, Code2,
  Microscope, FileText, Braces, Eye, CalendarDays, Activity,
} from 'lucide-react';
import { DiogenesLamp } from '@/components/common/DiogenesLamp';

const IDENTITY_BADGES = [
  'Transparencia algorítmica',
  'Filosofía del Derecho',
  'Prompt Engineering',
  'EdTech jurídica',
  'Claude & LLMs',
];

const TRIAD = [
  { icon: BookOpenText, label: 'Pensar', desc: 'filosofía · investigación' },
  { icon: GraduationCap, label: 'Enseñar', desc: 'docencia · talleres' },
  { icon: Code2, label: 'Construir', desc: 'plataformas · prototipos' },
];

const SIDEBAR_MODULES = [
  { icon: Microscope, label: 'Investigación', active: false },
  { icon: GraduationCap, label: 'Docencia', active: false },
  { icon: Code2, label: 'Prototipos', active: true },
  { icon: Braces, label: 'Prompts', active: false },
  { icon: Eye, label: 'Transparencia', active: false },
  { icon: FileText, label: 'Documentos', active: false },
  { icon: CalendarDays, label: 'Eventos', active: false },
];

const FEED = [
  { dot: 'bg-[oklch(0.74_0.14_165)]', text: 'Prototipo desplegado · plataforma de estudio', time: 'lab' },
  { dot: 'bg-[oklch(0.78_0.13_205)]', text: 'Taller 2026 · módulo de prompting publicado', time: 'aula' },
  { dot: 'bg-[oklch(0.62_0.19_285)]', text: 'Tesis · transparencia algorítmica — avance', time: 'tesis' },
];

const CHART_BARS = [28, 44, 38, 60, 52, 74, 68, 90];

function NodeNetwork() {
  return (
    <svg
      viewBox="0 0 560 520"
      fill="none"
      className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] opacity-50"
      aria-hidden
    >
      <defs>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.13 205)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.62 0.19 285)" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      {[
        'M60 80 L180 40', 'M180 40 L420 70', 'M420 70 L520 160',
        'M60 80 L40 280', 'M40 280 L90 460', 'M520 160 L500 380',
        'M500 380 L380 490', 'M90 460 L380 490', 'M40 280 L520 160',
      ].map(d => (
        <path
          key={d}
          d={d}
          stroke="url(#edge)"
          strokeWidth="1"
          strokeDasharray="4 8"
          style={{ animation: 'dash-flow 3.5s linear infinite' }}
        />
      ))}
      {[
        [60, 80], [180, 40], [420, 70], [520, 160],
        [40, 280], [90, 460], [500, 380], [380, 490],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="9" fill="oklch(0.78 0.13 205 / 0.08)" />
          <circle cx={cx} cy={cy} r="3" fill="oklch(0.78 0.13 205 / 0.7)" />
        </g>
      ))}
    </svg>
  );
}

function LabConsole() {
  return (
    <div className="relative">
      <NodeNetwork />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8, ease: 'easeOut' }}
        className="relative panel-raised rounded-2xl overflow-hidden glow-cyan"
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--line-soft)] bg-[oklch(0.13_0.023_255/0.8)]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.66_0.19_18/0.8)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.78_0.14_75/0.8)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.74_0.14_165/0.8)]" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] mono text-zinc-500 tracking-wide">
            <DiogenesLamp className="w-3 h-3 lab-accent" />
            diogenes-lab · console
          </div>
          <div className="flex items-center gap-1.5">
            <span className="status-dot bg-[oklch(0.74_0.14_165)]" />
            <span className="text-[9px] mono text-[oklch(0.74_0.14_165)]">LIVE</span>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="hidden sm:block w-[148px] shrink-0 border-r border-[var(--line-soft)] bg-[oklch(0.125_0.022_255/0.6)] py-3">
            {SIDEBAR_MODULES.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={`flex items-center gap-2 px-3.5 py-[7px] text-[11px] ${
                  active
                    ? 'text-[oklch(0.84_0.11_205)] bg-[oklch(0.78_0.13_205/0.09)] border-r border-[oklch(0.78_0.13_205/0.6)]'
                    : 'text-zinc-500'
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                {label}
              </div>
            ))}
          </div>

          {/* Main area */}
          <div className="flex-1 p-4 space-y-3.5 min-w-0">
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: 'Prototipos', value: '7+', delta: 'desplegados' },
                { label: 'Docencia', value: '4 años', delta: 'filosofía del derecho' },
                { label: 'Talleres IA', value: '2', delta: '2026 en curso' },
              ].map(({ label, value, delta }) => (
                <div key={label} className="rounded-lg border border-[var(--line-soft)] bg-white/[0.02] p-2.5">
                  <div className="text-[9px] mono uppercase tracking-wider text-zinc-600">{label}</div>
                  <div className="text-base font-bold text-white mono mt-0.5">{value}</div>
                  <div className="text-[9px] mono text-[oklch(0.74_0.14_165)] truncate">{delta}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="rounded-lg border border-[var(--line-soft)] bg-white/[0.02] p-3">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] mono text-zinc-500">Actividad del lab · 2025–2026</span>
                <Activity className="w-3 h-3 text-[oklch(0.78_0.13_205)]" />
              </div>
              <div className="flex items-end gap-1.5 h-16">
                {CHART_BARS.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.8 + i * 0.07, duration: 0.5, ease: 'easeOut' }}
                    className="flex-1 rounded-sm"
                    style={{
                      background: i === CHART_BARS.length - 1
                        ? 'linear-gradient(180deg, oklch(0.82 0.13 205), oklch(0.78 0.13 205 / 0.35))'
                        : 'linear-gradient(180deg, oklch(0.78 0.13 205 / 0.45), oklch(0.78 0.13 205 / 0.12))',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Activity feed */}
            <div className="space-y-1.5">
              {FEED.map(({ dot, text, time }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 rounded-md border border-[var(--line-soft)] bg-white/[0.015] px-2.5 py-[7px]"
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                  <span className="text-[10px] text-zinc-400 truncate flex-1">{text}</span>
                  <span className="text-[9px] mono text-zinc-600 shrink-0">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating chip — top right: Diógenes Lab */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute -top-5 -right-3 sm:-right-7"
        style={{ animation: 'float-slow 7s ease-in-out infinite' }}
      >
        <div className="glass-panel rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 border-[oklch(0.74_0.14_165/0.35)]">
          <DiogenesLamp className="w-4 h-4 lab-accent" />
          <div>
            <div className="text-[10px] font-semibold text-white leading-none">Diógenes Lab</div>
            <div className="text-[9px] mono text-[oklch(0.74_0.14_165)] mt-1">● experimentando</div>
          </div>
        </div>
      </motion.div>

      {/* Floating chip — bottom left: tesis */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="absolute -bottom-5 -left-3 sm:-left-7"
        style={{ animation: 'float 6s ease-in-out infinite' }}
      >
        <div className="glass-panel rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 border-[oklch(0.62_0.19_285/0.35)]">
          <Eye className="w-3.5 h-3.5 text-[oklch(0.7_0.16_285)]" />
          <div>
            <div className="text-[10px] font-semibold text-white leading-none">Tesis</div>
            <div className="text-[9px] mono text-zinc-500 mt-1">transparencia algorítmica</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section id="hero" className="relative min-h-[94vh] flex items-center pt-32 pb-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 28% 38%, oklch(0.78 0.13 205 / 0.07) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full relative">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-10 items-center">

          {/* ── Left: identity ── */}
          <div className="space-y-7 max-w-xl">
            {/* Domain badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[var(--line-mid)] bg-white/[0.02] pl-3 pr-4 py-1.5"
            >
              <span className="status-dot bg-[oklch(0.74_0.14_165)]" />
              <span className="text-[11px] mono uppercase tracking-[0.16em] text-zinc-400">
                diegoojeda.cl · jurista &times; filósofo &times; constructor
              </span>
            </motion.div>

            {/* Name + headline */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.65, ease: 'easeOut' }}
              className="space-y-3"
            >
              <div className="text-sm mono text-zinc-500 tracking-wide">
                Diego Ojeda <span className="text-[oklch(0.62_0.19_285)]">/</span> Lcdo. en Ciencias Jurídicas PUCV
              </div>
              <h1 className="serif text-[2.5rem] sm:text-5xl lg:text-[3.3rem] font-semibold leading-[1.08] tracking-tight">
                <span className="text-gradient-light">Derecho, inteligencia artificial y</span>{' '}
                <em className="text-gradient-tech serif-italic">filosofía jurídica aplicada.</em>
              </h1>
            </motion.div>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-[15px] sm:text-base text-zinc-400 leading-relaxed"
            >
              Investigo, enseño y diseño herramientas para comprender —y transformar—
              cómo se estudia, se piensa y se ejerce el derecho en la era algorítmica.
            </motion.p>

            {/* Triad */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-3 gap-2.5 max-w-md"
            >
              {TRIAD.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="rounded-xl border border-[var(--line-soft)] bg-white/[0.02] px-3 py-2.5 card-surface-hover"
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-[oklch(0.82_0.12_205)]" strokeWidth={1.8} />
                    <span className="text-[12px] font-bold text-white">{label}</span>
                  </div>
                  <div className="text-[9.5px] mono text-zinc-600 mt-1">{desc}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button onClick={() => scrollTo('lab')} className="btn-primary">
                Ver proyectos
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button onClick={() => scrollTo('trayectoria')} className="btn-secondary">
                Conocer trayectoria
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Identity badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.62 }}
              className="flex flex-wrap gap-2"
            >
              {IDENTITY_BADGES.map((label, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.66 + i * 0.07 }}
                  className="badge-tech"
                >
                  <span className="w-1 h-1 rounded-full bg-[oklch(0.78_0.13_205/0.7)]" />
                  {label}
                </motion.span>
              ))}
            </motion.div>

            {/* Proof strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-5 border-t border-[var(--line-soft)] grid grid-cols-3 gap-6 max-w-md"
            >
              {[
                { n: '7+', label: 'Prototipos desplegados' },
                { n: '4 años', label: 'Ayudante Filosofía del Derecho' },
                { n: 'DIAT', label: 'Director operativo' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <div className="text-lg font-bold text-white mono tracking-tight">{n}</div>
                  <div className="text-[11px] text-zinc-600 mt-0.5 leading-snug">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Diógenes Lab console ── */}
          <div className="relative lg:pl-4">
            <LabConsole />
          </div>

        </div>
      </div>
    </section>
  );
}
