'use client';
import { motion } from 'framer-motion';
import {
  BookOpen, Scale, Users, Eye, Compass, Presentation, FlaskConical,
} from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';

const MILESTONES = [
  {
    icon: BookOpen,
    tag: 'BASE',
    title: 'Estudios de Filosofía',
    place: 'Pontificia Universidad Católica de Chile',
    desc: 'Formación filosófica de origen: lógica, ética y teoría del conocimiento. La base crítica de todo lo demás.',
  },
  {
    icon: Scale,
    tag: 'GRADO',
    title: 'Licenciatura en Ciencias Jurídicas',
    place: 'Pontificia Universidad Católica de Valparaíso',
    desc: 'Formación jurídica completa, con foco creciente en derecho público y tecnología.',
  },
  {
    icon: Users,
    tag: 'DOCENCIA · 4 AÑOS',
    title: 'Ayudante de Filosofía del Derecho',
    place: 'Facultad de Derecho PUCV',
    desc: 'Cuatro años acompañando la formación de estudiantes en teoría y filosofía jurídica.',
  },
  {
    icon: Eye,
    tag: 'INVESTIGACIÓN',
    title: 'Tesis en transparencia algorítmica',
    place: 'Licenciatura PUCV',
    desc: 'Sistemas automatizados, derecho público y rendición de cuentas: cómo se audita el poder que decide por algoritmo.',
  },
  {
    icon: Compass,
    tag: 'GESTIÓN',
    title: 'Director Operativo · Programa DIAT',
    place: 'Derecho, IA y Tecnología — PUCV',
    desc: 'Dirección operativa del programa; organización y gestión de eventos de divulgación académica, investigación e IA aplicada al derecho.',
  },
  {
    icon: Presentation,
    tag: 'FORMACIÓN · EN CURSO',
    title: 'Talleres de Prompting e IA aplicada al Derecho',
    place: '2 ediciones · co-director edición 2026',
    desc: 'IA aplicada al estudio y ejercicio del derecho: prompting estructurado, flujos multi-IA y verificación jurídica.',
  },
  {
    icon: FlaskConical,
    tag: 'LAB',
    title: 'Desarrollo freelance · Diógenes Lab',
    place: 'Plataformas de aprendizaje jurídico con Claude',
    desc: 'Exploración freelance de software educativo y herramientas jurídicas: más de 7 prototipos diseñados, construidos y desplegados.',
  },
];

export function TrajectorySection() {
  return (
    <section id="trayectoria" className="py-24 lg:py-32 relative">
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 15% 30%, oklch(0.62 0.19 285 / 0.05) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div className="max-w-5xl mx-auto px-4 lg:px-8 space-y-14 relative">

        <SectionHeader
          index="04"
          eyebrow="Trayectoria"
          title="Una ruta entre la academia y el código."
          sub="Cada etapa alimenta la siguiente: la filosofía da el criterio, el derecho da el campo, la tecnología da las herramientas."
        />

        {/* Timeline */}
        <div className="relative">
          {/* Spine */}
          <div
            className="absolute left-[21px] sm:left-[25px] top-2 bottom-2 w-px"
            style={{
              background:
                'linear-gradient(180deg, oklch(0.62 0.19 285 / 0.5) 0%, oklch(0.78 0.13 205 / 0.45) 55%, oklch(0.74 0.14 165 / 0.5) 100%)',
            }}
            aria-hidden
          />

          <div className="space-y-5">
            {MILESTONES.map(({ icon: Icon, tag, title, place, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="relative flex gap-5 sm:gap-7 group"
              >
                {/* Node */}
                <div className="relative shrink-0 mt-1">
                  <div className="w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] rounded-xl border border-[var(--line-mid)] bg-[oklch(0.15_0.025_255)] flex items-center justify-center relative z-10 group-hover:border-[oklch(0.78_0.13_205/0.5)] group-hover:shadow-[0_0_18px_oklch(0.78_0.13_205/0.15)] transition-all duration-300">
                    <Icon className="w-[18px] h-[18px] text-zinc-400 group-hover:text-[oklch(0.84_0.11_205)] transition-colors" strokeWidth={1.7} />
                  </div>
                </div>

                {/* Content */}
                <div className="panel rounded-xl p-5 flex-1 card-surface-hover">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-[9.5px] mono tracking-[0.15em] px-2 py-1 rounded-md border border-[var(--line-soft)] bg-white/[0.02] text-zinc-500">
                      {tag}
                    </span>
                    <span className="text-[10px] mono text-zinc-700 hidden sm:inline">
                      {String(i + 1).padStart(2, '0')} / {String(MILESTONES.length).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold text-white mt-2.5 tracking-tight">{title}</h3>
                  <div className="text-[12px] text-[oklch(0.78_0.1_205)] mt-0.5 mono">{place}</div>
                  <p className="text-[12.5px] text-zinc-500 mt-2 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
