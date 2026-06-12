'use client';
import { motion } from 'framer-motion';
import {
  GraduationCap, ArrowRight, Calendar, Clock, Bot, FileText, Brain,
  Users, Compass, Package,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TRAINING_MODULES } from '@/data/training';
import { SectionHeader } from '@/components/common/SectionHeader';

const MODULE_ICONS = [Bot, FileText, Brain];

const TEACHING_ROLES = [
  {
    icon: Users,
    title: 'Ayudante de Filosofía del Derecho',
    place: 'Facultad de Derecho PUCV',
    chip: '4 años',
  },
  {
    icon: Compass,
    title: 'Director Operativo · Programa DIAT',
    place: 'Eventos de divulgación, investigación e IA aplicada',
    chip: 'gestión académica',
  },
  {
    icon: GraduationCap,
    title: 'Talleres de Prompting e IA Jurídica',
    place: 'Co-director de la edición 2026',
    chip: '2 ediciones',
  },
];

export function TrainingPreviewSection() {
  const router = useRouter();

  const waUrl = `https://wa.me/56934301930?text=${encodeURIComponent(
    'Hola Diego, quiero información sobre el Taller de IA Jurídica Aplicada.'
  )}`;

  return (
    <section id="docencia" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 space-y-12">

        <SectionHeader
          index="04"
          eyebrow="Aula · Docencia y talleres"
          title="Capacitación aplicada en IA jurídica."
          sub="Del aula universitaria al taller práctico: formación con casos reales, flujos multi-IA y criterios de verificación profesional."
        />

        {/* Teaching roles strip */}
        <div className="grid sm:grid-cols-3 gap-3">
          {TEACHING_ROLES.map(({ icon: Icon, title, place, chip }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="panel rounded-xl p-4 card-surface-hover"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg border border-[var(--line-soft)] bg-white/[0.02] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[oklch(0.82_0.12_205)]" strokeWidth={1.7} />
                </div>
                <span className="badge-tech text-[10px]!">{chip}</span>
              </div>
              <div className="text-[13px] font-bold text-white mt-3 leading-snug">{title}</div>
              <div className="text-[11px] text-zinc-500 mt-1">{place}</div>
            </motion.div>
          ))}
        </div>

        {/* Program: Taller 2026 */}
        <div className="panel-deep rounded-2xl overflow-hidden">
          {/* Program header */}
          <div className="px-6 sm:px-8 py-5 border-b border-[var(--line-soft)] flex flex-wrap items-center justify-between gap-4 bg-[oklch(0.13_0.023_255/0.7)]">
            <div>
              <div className="eyebrow text-[oklch(0.82_0.12_205)]">Programa vigente · co-dirección</div>
              <h3 className="serif text-xl font-semibold text-white mt-1">Taller de IA Jurídica Aplicada — 2026</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[oklch(0.78_0.13_205/0.35)] bg-[oklch(0.78_0.13_205/0.08)] text-[oklch(0.86_0.09_205)] text-xs font-semibold">
                <Calendar className="w-3 h-3" />
                Inicio: 8 SEP 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line-mid)] bg-white/[0.02] text-zinc-400 text-xs">
                <Clock className="w-3 h-3" />
                6 horas · 3 módulos
              </span>
            </div>
          </div>

          {/* Module timeline */}
          <div className="p-6 sm:p-8">
            <div className="relative">
              {/* Connector */}
              <div className="hidden lg:block absolute top-[26px] left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-[oklch(0.78_0.13_205/0.4)] via-[oklch(0.62_0.19_285/0.4)] to-[oklch(0.62_0.19_285/0.4)]" aria-hidden />

              <div className="grid lg:grid-cols-3 gap-4">
                {TRAINING_MODULES.map((mod, i) => {
                  const Icon = MODULE_ICONS[i];
                  return (
                    <motion.div
                      key={mod.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ delay: i * 0.12, duration: 0.5 }}
                      className="group panel rounded-xl p-5 space-y-4 card-surface-hover hover-lift cursor-pointer relative"
                      onClick={() => router.push('/capacitacion')}
                    >
                      {/* Node */}
                      <div className="flex items-start justify-between">
                        <div className="w-[52px] h-[52px] rounded-xl border border-[oklch(0.78_0.13_205/0.3)] bg-[oklch(0.78_0.13_205/0.06)] flex items-center justify-center relative z-10">
                          <Icon className="w-5 h-5 text-[oklch(0.82_0.12_205)]" strokeWidth={1.7} />
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] mono text-zinc-600">{mod.displayDate}</span>
                          <div className="text-[10px] mono text-[oklch(0.78_0.1_205)] mt-0.5">{mod.duration}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] mono uppercase tracking-[0.15em] text-zinc-600">
                          Módulo {mod.id}
                        </div>
                        <h4 className="text-[14px] font-bold text-white leading-snug mt-1">{mod.title}</h4>
                        <p className="text-[12px] text-zinc-500 leading-relaxed mt-1.5">{mod.subtitle}</p>
                      </div>

                      {/* Tools */}
                      <div className="flex flex-wrap gap-1.5">
                        {mod.tools.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-[var(--line-soft)] text-zinc-400 text-[10px] mono">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Deliverable */}
                      <div className="rounded-lg border border-[var(--line-soft)] bg-[oklch(0.12_0.022_255/0.6)] px-3 py-2.5 flex items-start gap-2">
                        <Package className="w-3.5 h-3.5 text-[oklch(0.74_0.14_165)] mt-0.5 shrink-0" strokeWidth={1.7} />
                        <p className="text-[10.5px] text-zinc-500 leading-relaxed">{mod.deliverable}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center mt-8 pt-6 border-t border-[var(--line-soft)]">
              <button onClick={() => router.push('/capacitacion')} className="btn-ghost-cyan">
                <GraduationCap className="w-4 h-4" />
                Ver programa completo
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Solicitar taller para mi equipo
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
