'use client';
import { motion } from 'framer-motion';
import {
  Search, GitBranch, MonitorSmartphone, Code2, ShieldCheck, Rocket, GraduationCap,
} from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';

const STAGES = [
  {
    num: '01',
    icon: Search,
    en: 'Discovery',
    es: 'Diagnóstico',
    desc: 'Entender el problema, el flujo real, los usuarios y los documentos involucrados.',
  },
  {
    num: '02',
    icon: GitBranch,
    en: 'Process Mapping',
    es: 'Mapeo del proceso',
    desc: 'El proceso se convierte en arquitectura: entradas, estados, acciones y salidas.',
  },
  {
    num: '03',
    icon: MonitorSmartphone,
    en: 'Prototype',
    es: 'Prototipo',
    desc: 'Primera versión funcional para validar estructura, experiencia y utilidad.',
  },
  {
    num: '04',
    icon: Code2,
    en: 'Build',
    es: 'Construcción',
    desc: 'Desarrollo con componentes limpios, diseño responsive y lógica trazable.',
  },
  {
    num: '05',
    icon: ShieldCheck,
    en: 'Security Review',
    es: 'Revisión de seguridad',
    desc: 'Exposición de datos, privacidad, flujos sensibles y límites de la IA.',
  },
  {
    num: '06',
    icon: Rocket,
    en: 'Deployment',
    es: 'Despliegue',
    desc: 'Publicación en producción con dominio, monitoreo y entrega documentada.',
  },
  {
    num: '07',
    icon: GraduationCap,
    en: 'Training',
    es: 'Capacitación',
    desc: 'El equipo aprende a operar y extender el sistema. Sin dependencia ciega.',
  },
];

export function MethodSection() {
  return (
    <section id="metodo" className="py-24 lg:py-32 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 40% at 50% 0%, oklch(0.78 0.13 205 / 0.045) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-14 relative">

        <SectionHeader
          index="09"
          eyebrow="Método"
          title="Del diagnóstico al sistema operativo."
          sub="Un pipeline, no improvisación: siete etapas con entregables verificables en cada una."
          align="center"
        />

        {/* Pipeline */}
        <div className="relative">
          {/* Desktop connector */}
          <div
            className="hidden xl:block absolute top-[30px] left-[7%] right-[7%] h-px"
            style={{
              background:
                'linear-gradient(90deg, oklch(0.78 0.13 205 / 0.45), oklch(0.62 0.19 285 / 0.45), oklch(0.74 0.14 165 / 0.45))',
            }}
            aria-hidden
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4 xl:gap-3">
            {STAGES.map(({ num, icon: Icon, en, es, desc }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                className="group flex xl:flex-col items-start xl:items-center gap-4 panel rounded-xl p-4 card-surface-hover hover-lift"
              >
                {/* Node */}
                <div className="relative shrink-0 xl:mb-4">
                  <div className="w-[52px] h-[52px] xl:w-[60px] xl:h-[60px] rounded-2xl border border-[var(--line-mid)] bg-[oklch(0.15_0.025_255)] flex items-center justify-center relative z-10 group-hover:border-[oklch(0.78_0.13_205/0.55)] group-hover:shadow-[0_0_22px_oklch(0.78_0.13_205/0.2)] transition-all duration-300">
                    <Icon className="w-[20px] h-[20px] text-zinc-400 group-hover:text-[oklch(0.84_0.11_205)] transition-colors" strokeWidth={1.6} />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 z-20 text-[8.5px] mono px-1.5 py-0.5 rounded-md border border-[var(--line-mid)] bg-[oklch(0.13_0.023_255)] text-zinc-500">
                    {num}
                  </span>
                </div>

                {/* Labels */}
                <div className="xl:text-center min-w-0">
                  <div className="text-[13px] font-bold text-white tracking-tight">{en}</div>
                  <div className="text-[10px] mono text-[oklch(0.78_0.1_205)] mt-0.5 uppercase tracking-wider">{es}</div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed mt-2 xl:px-1">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3"
        >
          <span className="hairline-h w-16" />
          <p className="text-xs mono text-zinc-600 text-center">
            cada etapa deja evidencia: documentos, prototipos, código y métricas
          </p>
          <span className="hairline-h w-16" />
        </motion.div>

      </div>
    </section>
  );
}
