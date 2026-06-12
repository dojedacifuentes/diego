'use client';
import { motion } from 'framer-motion';
import {
  MessageSquareWarning, FileStack, EyeOff, Bot, TimerOff, Network,
  Inbox, Files, Hourglass, ShieldAlert, ChevronRight,
} from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';

const problems = [
  {
    icon: MessageSquareWarning,
    title: 'Información repartida entre WhatsApp, correos, PDFs y planillas',
    desc: 'Sin fuente única de verdad, cada respuesta exige reconstruir el contexto desde cero.',
  },
  {
    icon: FileStack,
    title: 'Documentos repetitivos creados manualmente',
    desc: 'Contratos, minutas e informes redactados una y otra vez, con los mismos errores.',
  },
  {
    icon: EyeOff,
    title: 'Falta de trazabilidad',
    desc: 'Nadie sabe con certeza quién hizo qué, cuándo, ni en qué estado quedó el proceso.',
  },
  {
    icon: Bot,
    title: 'Uso improvisado de IA sin control',
    desc: 'Prompts sueltos, sin flujo ni criterios sobre qué información se expone a qué herramienta.',
  },
  {
    icon: TimerOff,
    title: 'Pérdida de horas no medida',
    desc: 'El costo del trabajo manual es invisible hasta que se acumula en el resultado anual.',
  },
  {
    icon: Network,
    title: 'Dificultad para escalar conocimiento interno',
    desc: 'La experiencia vive en personas, no en sistemas: cada salida de equipo es una fuga.',
  },
];

const BROKEN_FLOW = [
  { icon: Inbox, label: 'Entrada caótica', status: 'INPUT', tone: 'text-zinc-300', border: 'border-[var(--line-mid)]' },
  { icon: Files, label: 'Documentos dispersos', status: 'SIN ÍNDICE', tone: 'text-[oklch(0.78_0.14_75)]', border: 'border-[oklch(0.78_0.14_75/0.3)]' },
  { icon: Hourglass, label: 'Decisiones lentas', status: 'CUELLO DE BOTELLA', tone: 'text-[oklch(0.78_0.14_75)]', border: 'border-[oklch(0.78_0.14_75/0.3)]' },
  { icon: ShieldAlert, label: 'Riesgo operativo', status: 'CRÍTICO', tone: 'text-[oklch(0.7_0.18_18)]', border: 'border-[oklch(0.7_0.18_18/0.35)]' },
];

function BrokenFlowMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="panel-deep rounded-2xl p-6 sm:p-8 relative overflow-hidden noise"
    >
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-2">
          <span className="status-dot bg-[oklch(0.7_0.18_18)]" />
          <span className="eyebrow text-zinc-500">Diagnóstico de flujo · estado actual</span>
        </div>
        <span className="hidden sm:inline text-[10px] mono text-zinc-700">trace_id: sin-registro</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-4 lg:gap-2 items-stretch">
        {BROKEN_FLOW.map(({ icon: Icon, label, status, tone, border }, i) => (
          <div key={label} className="contents">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className={`rounded-xl border ${border} bg-white/[0.02] p-4 flex flex-col items-center text-center gap-2.5`}
            >
              <div className={`w-9 h-9 rounded-lg border ${border} bg-white/[0.02] flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${tone}`} strokeWidth={1.8} />
              </div>
              <div className="text-[13px] font-semibold text-zinc-200 leading-snug">{label}</div>
              <span className={`text-[9px] mono tracking-wider ${tone}`}>{status}</span>
            </motion.div>

            {i < BROKEN_FLOW.length - 1 && (
              <div className="hidden lg:flex items-center justify-center px-1">
                <svg width="36" height="12" viewBox="0 0 36 12" fill="none" aria-hidden>
                  <path
                    d="M1 6 H28"
                    stroke="oklch(0.55 0.03 250)"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                    style={{ animation: 'dash-flow 2.5s linear infinite' }}
                  />
                  <path d="M28 2 L34 6 L28 10" stroke="oklch(0.55 0.03 250)" strokeWidth="1" fill="none" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-7 pt-5 border-t border-[var(--line-soft)] flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-zinc-500 leading-relaxed">
          Cada traspaso manual agrega fricción, error y pérdida de contexto. El riesgo no está en una etapa: está en las uniones.
        </p>
        <span className="text-[10px] mono px-2.5 py-1 rounded-md border border-[oklch(0.7_0.18_18/0.3)] bg-[oklch(0.7_0.18_18/0.07)] text-[oklch(0.74_0.15_18)]">
          ⚠ flujo sin trazabilidad
        </span>
      </div>
    </motion.div>
  );
}

export function ProblemSection() {
  return (
    <section id="problemas" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">

        <SectionHeader
          index="01"
          eyebrow="Diagnóstico operativo"
          title="Procesos críticos atrapados en herramientas dispersas."
          sub="Antes de automatizar, hay que nombrar el problema. Estos son los seis patrones que encontramos en casi todos los equipos profesionales."
        />

        <BrokenFlowMap />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.45 }}
              className="group panel rounded-xl p-5 card-surface-hover hover-lift"
            >
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-lg border border-[var(--line-soft)] bg-white/[0.02] flex items-center justify-center group-hover:border-[oklch(0.78_0.13_205/0.35)] transition-colors">
                  <Icon className="w-4 h-4 text-zinc-400 group-hover:text-[oklch(0.82_0.12_205)] transition-colors" strokeWidth={1.7} />
                </div>
                <span className="text-[10px] mono text-zinc-700">P-{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-[13.5px] font-semibold text-zinc-100 leading-snug mt-4">{title}</h3>
              <p className="text-[12.5px] text-zinc-500 mt-2 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bridge to solutions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 pt-2"
        >
          <span className="hairline-h w-16" />
          <button
            onClick={() => document.getElementById('soluciones')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-xs mono text-zinc-500 hover:text-[oklch(0.82_0.12_205)] transition-colors"
          >
            ver arquitecturas de solución <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <span className="hairline-h w-16" />
        </motion.div>

      </div>
    </section>
  );
}
