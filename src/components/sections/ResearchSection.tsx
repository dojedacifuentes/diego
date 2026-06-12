'use client';
import { motion } from 'framer-motion';
import { Box, Landmark, FileSearch, ScrollText, ShieldQuestion, Cpu } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { DiogenesLamp } from '@/components/common/DiogenesLamp';

const RESEARCH_LINES = [
  { icon: Cpu, label: 'Transparencia algorítmica' },
  { icon: Landmark, label: 'IA y derecho público' },
  { icon: ScrollText, label: 'Regulación de sistemas automatizados' },
  { icon: ShieldQuestion, label: 'Rendición de cuentas' },
  { icon: FileSearch, label: 'Explicabilidad y debido proceso' },
  { icon: Box, label: 'Filosofía del derecho y tecnología' },
];

/* Caja negra → lámpara → caja de cristal */
function TransparencyDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="panel-deep rounded-2xl p-6 sm:p-8 relative overflow-hidden noise"
    >
      <div className="flex items-center gap-2 mb-7">
        <span className="status-dot bg-[oklch(0.62_0.19_285)]" />
        <span className="eyebrow text-zinc-500">Tesis · el problema en una imagen</span>
      </div>

      <div className="grid sm:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 sm:gap-2 items-stretch">

        {/* Black box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-[var(--line-mid)] bg-[oklch(0.09_0.018_255)] p-5 flex flex-col items-center text-center gap-2.5"
        >
          <div className="w-10 h-10 rounded-lg bg-black border border-[var(--line-mid)] flex items-center justify-center">
            <Box className="w-4.5 h-4.5 text-zinc-600" strokeWidth={1.6} />
          </div>
          <div className="text-[13px] font-semibold text-zinc-300">Caja negra</div>
          <p className="text-[11px] text-zinc-600 leading-relaxed">
            Sistemas que deciden sobre personas sin explicar cómo ni por qué.
          </p>
          <span className="text-[9px] mono text-[oklch(0.7_0.18_18)] tracking-wider">OPACIDAD</span>
        </motion.div>

        {/* Arrow */}
        <div className="hidden sm:flex items-center justify-center">
          <svg width="32" height="12" viewBox="0 0 32 12" fill="none" aria-hidden>
            <path d="M1 6 H24" stroke="oklch(0.55 0.03 250)" strokeWidth="1" strokeDasharray="3 4" style={{ animation: 'dash-flow 2.5s linear infinite' }} />
            <path d="M24 2 L30 6 L24 10" stroke="oklch(0.55 0.03 250)" strokeWidth="1" fill="none" />
          </svg>
        </div>

        {/* The lamp — scrutiny */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border lab-chip p-5 flex flex-col items-center text-center gap-2.5 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 30%, oklch(0.74 0.14 165 / 0.1) 0%, transparent 65%)' }}
          />
          <div className="w-10 h-10 rounded-lg border border-[oklch(0.74_0.14_165/0.4)] bg-[oklch(0.74_0.14_165/0.08)] flex items-center justify-center relative">
            <DiogenesLamp className="w-5 h-5 lab-accent" />
          </div>
          <div className="text-[13px] font-semibold text-white">Escrutinio</div>
          <p className="text-[11px] text-zinc-500 leading-relaxed">
            Transparencia, explicabilidad y control jurídico del sistema.
          </p>
          <span className="text-[9px] mono lab-accent tracking-wider">LA LÁMPARA</span>
        </motion.div>

        {/* Arrow */}
        <div className="hidden sm:flex items-center justify-center">
          <svg width="32" height="12" viewBox="0 0 32 12" fill="none" aria-hidden>
            <path d="M1 6 H24" stroke="oklch(0.55 0.03 250)" strokeWidth="1" strokeDasharray="3 4" style={{ animation: 'dash-flow 2.5s linear infinite' }} />
            <path d="M24 2 L30 6 L24 10" stroke="oklch(0.55 0.03 250)" strokeWidth="1" fill="none" />
          </svg>
        </div>

        {/* Glass box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-[oklch(0.78_0.13_205/0.35)] bg-[oklch(0.78_0.13_205/0.05)] p-5 flex flex-col items-center text-center gap-2.5"
        >
          <div className="w-10 h-10 rounded-lg border border-[oklch(0.78_0.13_205/0.4)] bg-[oklch(0.78_0.13_205/0.08)] flex items-center justify-center">
            <Box className="w-4.5 h-4.5 text-[oklch(0.82_0.12_205)]" strokeWidth={1.6} />
          </div>
          <div className="text-[13px] font-semibold text-white">Caja de cristal</div>
          <p className="text-[11px] text-zinc-500 leading-relaxed">
            Sistemas auditables, impugnables y compatibles con el debido proceso.
          </p>
          <span className="text-[9px] mono text-[oklch(0.82_0.12_205)] tracking-wider">AUDITABLE</span>
        </motion.div>

      </div>

      <p className="serif-italic text-[15px] text-zinc-300 text-center mt-7 pt-5 border-t border-[var(--line-soft)]">
        “La pregunta no es solo qué decide la máquina, sino quién responde por ella.”
      </p>
    </motion.div>
  );
}

export function ResearchSection() {
  return (
    <section id="investigacion" className="py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 lg:px-8 space-y-12">

        <SectionHeader
          index="03"
          eyebrow="Investigación · Archivo"
          title={<>Abrir la <em className="serif-italic text-gradient-tech">caja negra</em> del poder algorítmico.</>}
          sub="Mi tesis de licenciatura investiga la transparencia algorítmica: qué exige el derecho cuando las decisiones que afectan a personas las toma —o las prepara— un sistema automatizado."
          accent="violet"
        />

        <TransparencyDiagram />

        {/* Research lines */}
        <div className="space-y-4">
          <div className="eyebrow text-zinc-600">Líneas de trabajo</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {RESEARCH_LINES.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: (i % 3) * 0.07, duration: 0.4 }}
                className="group panel rounded-xl px-4 py-3.5 flex items-center gap-3 card-surface-hover"
              >
                <div className="w-8 h-8 rounded-lg border border-[var(--line-soft)] bg-white/[0.02] flex items-center justify-center shrink-0 group-hover:border-[oklch(0.62_0.19_285/0.45)] transition-colors">
                  <Icon className="w-4 h-4 text-zinc-400 group-hover:text-[oklch(0.72_0.16_285)] transition-colors" strokeWidth={1.7} />
                </div>
                <span className="text-[13px] font-medium text-zinc-300 leading-snug">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
