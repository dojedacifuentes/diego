'use client';
import { motion } from 'framer-motion';
import {
  Workflow, FileCog, LayoutDashboard, Braces, Database, ShieldCheck, ArrowUpRight,
} from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';

const MODULES = [
  {
    code: 'MOD-01',
    icon: Workflow,
    title: 'AI Workflows',
    desc: 'Flujos de IA para análisis, síntesis, clasificación y generación asistida.',
    example: 'Ej: síntesis de expedientes extensos con verificación por etapas.',
    accent: 'cyan',
  },
  {
    code: 'MOD-02',
    icon: FileCog,
    title: 'Legal Automation',
    desc: 'Automatización de documentos, minutas, contratos, informes y formularios.',
    example: 'Ej: contrato de arriendo generado desde un formulario en 2 minutos.',
    accent: 'cyan',
  },
  {
    code: 'MOD-03',
    icon: LayoutDashboard,
    title: 'Custom Platforms',
    desc: 'Dashboards, paneles internos, sistemas de gestión y plataformas educativas.',
    example: 'Ej: panel de causas con estados, plazos y documentos centralizados.',
    accent: 'violet',
  },
  {
    code: 'MOD-04',
    icon: Braces,
    title: 'Prompt Engineering',
    desc: 'Diseño de prompts, metodologías, asistentes y flujos multi-IA.',
    example: 'Ej: biblioteca de prompts jurídicos con checklist de verificación.',
    accent: 'violet',
  },
  {
    code: 'MOD-05',
    icon: Database,
    title: 'Data & Traceability',
    desc: 'Ordenamiento de información, trazabilidad de procesos y métricas operativas.',
    example: 'Ej: historial completo de quién hizo qué, cuándo y con qué resultado.',
    accent: 'gold',
  },
  {
    code: 'MOD-06',
    icon: ShieldCheck,
    title: 'Cybersecurity & Governance',
    desc: 'Buenas prácticas, privacidad, resguardo de datos y uso responsable de IA.',
    example: 'Ej: protocolo de qué datos pueden (y no pueden) tocar herramientas de IA.',
    accent: 'gold',
  },
];

const ACCENTS: Record<string, { text: string; border: string; chip: string }> = {
  cyan: {
    text: 'text-[oklch(0.82_0.12_205)]',
    border: 'group-hover:border-[oklch(0.78_0.13_205/0.45)]',
    chip: 'border-[oklch(0.78_0.13_205/0.3)] text-[oklch(0.82_0.12_205)] bg-[oklch(0.78_0.13_205/0.07)]',
  },
  violet: {
    text: 'text-[oklch(0.72_0.16_285)]',
    border: 'group-hover:border-[oklch(0.62_0.19_285/0.5)]',
    chip: 'border-[oklch(0.62_0.19_285/0.35)] text-[oklch(0.74_0.15_285)] bg-[oklch(0.62_0.19_285/0.08)]',
  },
  gold: {
    text: 'text-[oklch(0.82_0.11_85)]',
    border: 'group-hover:border-[oklch(0.8_0.11_85/0.45)]',
    chip: 'border-[oklch(0.8_0.11_85/0.3)] text-[oklch(0.84_0.1_85)] bg-[oklch(0.8_0.11_85/0.07)]',
  },
};

export function SolutionsSection() {
  return (
    <section id="soluciones" className="py-24 lg:py-32 relative">
      {/* Section ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 70% 20%, oklch(0.62 0.19 285 / 0.05) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12 relative">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeader
            index="08"
            eyebrow="Servicios"
            title="Arquitecturas digitales para operar mejor."
            sub="Seis módulos que combino según tu proceso. No vendo páginas web: diseño sistemas."
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden lg:flex items-center gap-2 text-[11px] mono text-zinc-600 shrink-0 pb-2"
          >
            <span className="status-dot bg-[oklch(0.78_0.13_205)]" />
            6 módulos · combinables
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map(({ code, icon: Icon, title, desc, example, accent }, i) => {
            const a = ACCENTS[accent];
            return (
              <motion.div
                key={code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 3) * 0.09, duration: 0.5 }}
                className={`group panel rounded-2xl p-6 flex flex-col gap-4 card-surface-hover hover-lift relative overflow-hidden ${a.border}`}
              >
                {/* Corner glow on hover */}
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, oklch(0.78 0.13 205 / 0.08) 0%, transparent 70%)' }}
                />

                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl border border-[var(--line-mid)] bg-white/[0.03] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Icon className={`w-5 h-5 ${a.text}`} strokeWidth={1.7} />
                  </div>
                  <span className={`text-[10px] mono px-2 py-1 rounded-md border ${a.chip}`}>{code}</span>
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
                  <p className="text-[13px] text-zinc-400 mt-2 leading-relaxed">{desc}</p>
                </div>

                <div className="rounded-lg border border-[var(--line-soft)] bg-[oklch(0.12_0.022_255/0.6)] px-3 py-2.5">
                  <p className="text-[11.5px] text-zinc-500 leading-relaxed mono">{example}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Principle note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="panel-deep rounded-xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-[13px] text-zinc-400 leading-relaxed">
            <span className="text-white font-semibold">Principio de diseño:</span>{' '}
            la IA no resuelve procesos mal diseñados. Primero ordeno el flujo; después integro tecnología.
          </p>
          <button
            onClick={() => document.getElementById('evaluacion')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-ghost-cyan shrink-0 text-[13px]!"
          >
            Evaluar mi proceso
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
