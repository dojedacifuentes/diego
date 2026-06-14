'use client';
import { motion } from 'framer-motion';
import { BookOpenText, GraduationCap, Code2 } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';

const PILLARS = [
  {
    num: '01',
    icon: BookOpenText,
    title: 'Pensar',
    desc: 'Filosofía del derecho, teoría jurídica, transparencia algorítmica, IA y poder.',
    items: ['Tesis en transparencia algorítmica', 'Formación filosófica (UC)', 'Crítica del poder digital'],
    accent: 'text-[oklch(0.72_0.16_285)]',
    border: 'hover:border-[oklch(0.62_0.19_285/0.45)]',
  },
  {
    num: '02',
    icon: GraduationCap,
    title: 'Enseñar',
    desc: 'Ayudantías, talleres de prompting, divulgación académica, formación jurídica.',
    items: ['Ayudante Filosofía del Derecho', 'Director Operativo · DIAT (desde 2020)', 'Ayudante de investigación · 2 talleres'],
    accent: 'text-[oklch(0.82_0.12_205)]',
    border: 'hover:border-[oklch(0.78_0.13_205/0.45)]',
  },
  {
    num: '03',
    icon: Code2,
    title: 'Construir',
    desc: 'Aplicaciones, plataformas de aprendizaje, prototipos con IA, herramientas para abogados y estudiantes.',
    items: ['7+ prototipos desplegados', 'Desarrollo con Claude y LLMs', 'Diógenes Lab'],
    accent: 'lab-accent',
    border: 'hover:border-[oklch(0.74_0.14_165/0.45)]',
  },
];

export function PillarsSection() {
  return (
    <section id="perfil" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">

        <SectionHeader
          index="01"
          eyebrow="Sobre mí"
          title={<>No soy un abogado que &quot;sabe de IA&quot;: soy un perfil <em className="serif-italic text-gradient-tech">híbrido</em>.</>}
          sub="Pienso, enseño y construyo. Esa combinación es la que convierte un proceso jurídico desordenado en un sistema claro, trazable y operativo."
        />

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 items-start">

          {/* Editorial statement */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:sticky lg:top-28"
          >
            <div className="panel-deep rounded-2xl p-7 noise relative overflow-hidden corner-frame">
              <span className="mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                Declaración de posicionamiento
              </span>
              <p className="serif text-lg sm:text-xl text-zinc-200 leading-relaxed mt-4">
                Entre la filosofía del derecho y la inteligencia artificial, mi trabajo explora
                cómo los sistemas digitales transforman la justicia, la enseñanza jurídica y la
                transparencia del poder algorítmico.
              </p>
              <p className="text-[13.5px] text-zinc-400 leading-relaxed mt-4">
                Desde la investigación académica hasta el diseño de prototipos educativos,
                desarrollo proyectos que buscan hacer el derecho más comprensible, crítico y
                tecnológicamente consciente.
              </p>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-[var(--line-soft)]">
                <span className="mono text-sm font-bold text-[oklch(0.86_0.1_205)]">
                  DO<span className="text-[oklch(0.62_0.19_285)]">/</span>
                </span>
                <span className="text-[11px] mono text-zinc-500">
                  pensando contra la máquina, construyendo con ella
                </span>
              </div>
            </div>
          </motion.div>

          {/* Pillars */}
          <div className="space-y-4">
            {PILLARS.map(({ num, icon: Icon, title, desc, items, accent, border }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group panel rounded-2xl p-6 card-surface-hover ${border}`}
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="w-11 h-11 rounded-xl border border-[var(--line-mid)] bg-white/[0.03] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className={`w-5 h-5 ${accent}`} strokeWidth={1.7} />
                    </div>
                    <span className="text-[10px] mono text-zinc-700">{num}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="serif text-xl font-semibold text-white tracking-tight">{title}</h3>
                    <p className="text-[13px] text-zinc-400 mt-1.5 leading-relaxed">{desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {items.map(item => (
                        <span key={item} className="badge-tech text-[10px]!">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
