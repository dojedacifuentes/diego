'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  GraduationCap, Calendar, Clock, ChevronDown, Bot, FileText, Brain,
  CheckCircle2, Target, Wrench, ArrowLeft, ArrowUpRight, ScanLine,
  MessageSquare, Download, BookOpen,
} from 'lucide-react';
import { TRAINING_MODULES, TRAINING_DIFFERENTIALS, TYPE_LABELS } from '@/data/training';
import { team } from '@/data/team';
import { SectionHeader } from '@/components/common/SectionHeader';
import { SectionDivider } from '@/components/common/SectionDivider';
import { GlitchText } from '@/components/common/GlitchText';
import { Typewriter } from '@/components/common/Typewriter';

const MODULE_ICONS = [Bot, FileText, Brain];

const TYPE_COLORS: Record<string, string> = {
  theory: 'bg-white/[0.04] text-zinc-400 border-[var(--line-mid)]',
  demo: 'bg-[oklch(0.78_0.13_205/0.1)] text-[oklch(0.82_0.12_205)] border-[oklch(0.78_0.13_205/0.25)]',
  analysis: 'bg-[oklch(0.78_0.14_75/0.1)] text-[oklch(0.8_0.13_75)] border-[oklch(0.78_0.14_75/0.25)]',
  practice: 'bg-[oklch(0.62_0.19_285/0.1)] text-[oklch(0.74_0.15_285)] border-[oklch(0.62_0.19_285/0.25)]',
  workshop: 'bg-[oklch(0.62_0.19_285/0.1)] text-[oklch(0.74_0.15_285)] border-[oklch(0.62_0.19_285/0.25)]',
  closing: 'bg-[oklch(0.74_0.14_165/0.1)] text-[oklch(0.78_0.13_162)] border-[oklch(0.74_0.14_165/0.25)]',
};

const WA_NUMBER = '56934301930';
const WA_DOSSIER = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  'Hola Diego, quiero solicitar el dossier del Taller de IA Jurídica Aplicada.'
)}`;
const WA_INFO = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  'Hola Diego, quiero información sobre el Taller de IA Jurídica Aplicada (próxima fecha: 8 SEP 2026).'
)}`;

export default function CapacitacionPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<Record<number, string>>({});

  const toggleModule = (id: number) => setOpenModule(prev => (prev === id ? null : id));
  const getTab = (id: number) => activeTab[id] ?? 'contenidos';
  const setTab = (id: number, tab: string) => setActiveTab(prev => ({ ...prev, [id]: tab }));

  return (
    <div className="min-h-screen pt-24">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative pt-8 pb-14 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 0%, oklch(0.78 0.13 205 / 0.07) 0%, transparent 60%)' }}
          aria-hidden
        />
        <div className="max-w-4xl mx-auto px-4 lg:px-8 relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12px] mono text-zinc-500 hover:text-[oklch(0.82_0.12_205)] transition-colors mb-7"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> volver a diegoojeda.cl
          </Link>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-[12px] mono text-zinc-500 mb-5"
          >
            <Typewriter
              lines={['diego@diogenes-lab:~$ ./taller --abrir', 'cargando programa · IA jurídica aplicada']}
              speed={24}
              lineDelay={280}
            />
          </motion.div>

          <div className="eyebrow text-[oklch(0.78_0.13_205)] mb-3">Aula · capacitación aplicada</div>
          <h1 className="serif text-4xl sm:text-5xl lg:text-[3.6rem] font-semibold leading-[1.05] tracking-tight">
            <span className="text-gradient-light">Taller de </span>
            <GlitchText text="IA Jurídica" live className="text-gradient-tech serif-italic" />
            <span className="text-gradient-light"> Aplicada.</span>
          </h1>
          <p className="text-[15px] text-zinc-400 leading-relaxed max-w-2xl mt-5">
            Formación práctica para abogados, estudiantes de Derecho y equipos jurídicos
            que quieren incorporar inteligencia artificial de manera profesional, crítica y verificable.
          </p>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            {[
              { icon: Calendar, label: 'Inicio: 8 SEP 2026' },
              { icon: Clock, label: '6 horas · 3 módulos' },
              { icon: GraduationCap, label: 'Co-dirección · ed. 2026' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="badge-tech">
                <Icon className="w-3 h-3" />
                {label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <a href={WA_INFO} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageSquare className="w-4 h-4" />
              Consultar por WhatsApp
            </a>
            <a href={WA_DOSSIER} target="_blank" rel="noopener noreferrer" className="btn-secondary glitch-hover">
              <Download className="w-4 h-4" />
              Solicitar dossier
            </a>
          </div>
        </div>
      </section>

      <SectionDivider label="program" />

      {/* ── Módulos ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 space-y-10">
          <SectionHeader
            index="01"
            eyebrow="Programa"
            title="Contenido por módulo."
            sub="Tres sesiones de dos horas. Cada una termina con un entregable real, no con apuntes."
            align="center"
          />

          <div className="space-y-3">
            {TRAINING_MODULES.map((mod, i) => {
              const Icon = MODULE_ICONS[i];
              const isOpen = openModule === mod.id;
              const tab = getTab(mod.id);

              return (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="panel rounded-2xl overflow-hidden card-surface-hover"
                >
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full flex items-center gap-4 p-5 text-left"
                  >
                    <div className="w-11 h-11 rounded-xl border border-[var(--line-mid)] bg-white/[0.03] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[oklch(0.82_0.12_205)]" strokeWidth={1.7} />
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="text-[10px] mono uppercase tracking-[0.14em] text-zinc-600">
                        Módulo {mod.id} · {mod.duration} · {mod.displayDate}
                      </div>
                      <h3 className="text-[15px] sm:text-base font-bold text-white leading-snug">{mod.title}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed hidden sm:block">{mod.subtitle}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 space-y-5 border-t border-[var(--line-soft)]">
                          <div className="flex flex-wrap gap-1 pt-4">
                            {[
                              { key: 'contenidos', label: 'Contenidos' },
                              { key: 'objetivos', label: 'Objetivos' },
                              { key: 'timeline', label: 'Cronograma' },
                              { key: 'actividad', label: 'Actividad' },
                            ].map(({ key, label }) => (
                              <button
                                key={key}
                                onClick={() => setTab(mod.id, key)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                  tab === key
                                    ? 'text-[oklch(0.84_0.11_205)] bg-[oklch(0.78_0.13_205/0.1)] border border-[oklch(0.78_0.13_205/0.25)]'
                                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] border border-transparent'
                                }`}
                              >
                                {label}
                              </button>
                            ))}
                          </div>

                          {tab === 'contenidos' && (
                            <div className="space-y-2">
                              {mod.contents.map((c, ci) => (
                                <div key={ci} className="flex items-start gap-2.5">
                                  <BookOpen className="w-3.5 h-3.5 text-[oklch(0.82_0.12_205)] shrink-0 mt-0.5" />
                                  <span className="text-xs text-zinc-400 leading-relaxed">{c}</span>
                                </div>
                              ))}
                              <div className="flex flex-wrap gap-1 pt-2">
                                {mod.tools.map(t => (
                                  <span key={t} className="badge-tech text-[10px]!">{t}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {tab === 'objetivos' && (
                            <div className="space-y-2">
                              {mod.objectives.map((obj, oi) => (
                                <div key={oi} className="flex items-start gap-2.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[oklch(0.78_0.13_162)] shrink-0 mt-0.5" />
                                  <span className="text-xs text-zinc-400 leading-relaxed">{obj}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {tab === 'timeline' && (
                            <div className="space-y-2">
                              {mod.timeline.map((item, ti) => (
                                <div key={ti} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-[var(--line-soft)]">
                                  <div className="shrink-0 space-y-0.5">
                                    <span className="text-[10px] mono font-bold text-[oklch(0.82_0.12_205)]">{item.time}</span>
                                    <span className={`block text-[9px] px-1.5 py-0.5 rounded border ${TYPE_COLORS[item.type] ?? TYPE_COLORS.theory}`}>
                                      {TYPE_LABELS[item.type] ?? item.type}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-zinc-300">{item.topic}</p>
                                    <p className="text-[11px] text-zinc-500 leading-relaxed mt-0.5">{item.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {tab === 'actividad' && (
                            <div className="space-y-3">
                              <div className="p-4 rounded-xl bg-white/[0.02] border border-[var(--line-soft)] space-y-2">
                                <div className="flex items-center gap-2">
                                  <Wrench className="w-3.5 h-3.5 text-[oklch(0.82_0.12_205)]" />
                                  <span className="eyebrow text-zinc-500">Actividad práctica</span>
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed">{mod.activity}</p>
                              </div>
                              <div className="p-4 rounded-xl bg-white/[0.02] border border-[var(--line-soft)] space-y-2">
                                <div className="flex items-center gap-2">
                                  <Target className="w-3.5 h-3.5 text-[oklch(0.78_0.13_162)]" />
                                  <span className="eyebrow text-zinc-500">Entregable</span>
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed">{mod.deliverable}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider label="why" />

      {/* ── Diferenciales ──────────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 space-y-10">
          <SectionHeader
            index="02"
            eyebrow="Diferenciales"
            title="Por qué este taller."
            sub="No es una charla genérica sobre IA. Se trabaja con casos reales, flujos verificables y criterio profesional."
            align="center"
          />
          <div className="grid sm:grid-cols-2 gap-3">
            {TRAINING_DIFFERENTIALS.map((diff, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: (i % 2) * 0.08, duration: 0.4 }}
                className="flex items-start gap-3 p-4 rounded-xl panel card-surface-hover"
              >
                <CheckCircle2 className="w-4 h-4 text-[oklch(0.82_0.12_205)] shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-400 leading-relaxed">{diff}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider label="team" />

      {/* ── Facilitadores ──────────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 space-y-10">
          <SectionHeader
            index="03"
            eyebrow="Equipo"
            title="Quién lo imparte."
            sub="Diseñado e impartido por quienes viven la intersección entre Derecho e IA."
            align="center"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="panel rounded-2xl p-6 space-y-4 card-surface-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl border border-[oklch(0.78_0.13_205/0.3)] bg-[oklch(0.78_0.13_205/0.06)] flex items-center justify-center shrink-0">
                    <span className="text-sm font-black text-[oklch(0.84_0.11_205)] mono">{member.initials}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{member.name}</h3>
                    <p className="text-xs text-[oklch(0.78_0.1_205)] leading-snug mt-0.5">{member.role}</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">{member.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {member.areas.slice(0, 4).map(area => (
                    <span key={area} className="badge-tech text-[10px]!">{area}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-1">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[oklch(0.82_0.12_205)] hover:opacity-80 transition-opacity"
                  >
                    <ArrowUpRight className="w-3 h-3" /> LinkedIn
                  </a>
                  <a href={`mailto:${member.email}`} className="text-xs mono text-zinc-600 hover:text-zinc-400 transition-colors truncate">
                    {member.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider label="next" />

      {/* ── Closing CTA ────────────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 lg:px-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="panel-raised rounded-2xl p-8 text-center space-y-6 corner-frame"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-[oklch(0.78_0.13_205/0.3)] bg-[oklch(0.78_0.13_205/0.08)] mx-auto glow-cyan">
              <GraduationCap className="w-6 h-6 text-[oklch(0.82_0.12_205)]" />
            </div>
            <div className="space-y-2">
              <h2 className="serif text-2xl font-semibold text-white">¿Tu institución o equipo quiere este taller?</h2>
              <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
                El programa se adapta a facultades de Derecho, estudios jurídicos y equipos.
                Cuéntame tu contexto y lo diseño a medida.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href={WA_INFO} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageSquare className="w-4 h-4" /> Consultar por WhatsApp
              </a>
              <a href={WA_DOSSIER} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Download className="w-4 h-4" /> Solicitar dossier
              </a>
            </div>
            <p className="text-[11px] mono text-zinc-600">dojedacifuentes@gmail.com · WA +56 9 3430 1930</p>
          </motion.div>

          {/* Cross-link to the lab tools */}
          <Link
            href="/diagnostico"
            className="group flex items-center gap-4 panel rounded-xl px-5 py-4 card-surface-hover"
          >
            <div className="w-10 h-10 rounded-lg border border-[oklch(0.78_0.13_205/0.35)] bg-[oklch(0.78_0.13_205/0.08)] flex items-center justify-center shrink-0">
              <ScanLine className="w-4.5 h-4.5 text-[oklch(0.82_0.12_205)]" />
            </div>
            <div className="flex-1">
              <div className="text-[13.5px] font-bold text-white glitch-hover">¿Y tu proceso, es candidato a IA?</div>
              <div className="text-[11.5px] text-zinc-500 mt-0.5">Corre el AI Readiness Scanner — diagnóstico en 8 preguntas</div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-[oklch(0.82_0.12_205)] transition-colors" />
          </Link>
        </div>
      </section>

    </div>
  );
}
