'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Star, ScanLine, Calculator, ArrowUpRight, Activity } from 'lucide-react';
import { projects, type Project, type ProjectCategory } from '@/data/projects';
import { SectionHeader } from '@/components/common/SectionHeader';
import { DiogenesLamp } from '@/components/common/DiogenesLamp';
import { TiltCard } from '@/components/common/TiltCard';
import { CountUp } from '@/components/common/CountUp';

const statusColors: Record<string, string> = {
  'Demo funcional': 'text-[oklch(0.78_0.13_162)] border-[oklch(0.74_0.14_165/0.3)] bg-[oklch(0.74_0.14_165/0.07)]',
  'Prototipo': 'text-[oklch(0.8_0.13_75)] border-[oklch(0.78_0.14_75/0.3)] bg-[oklch(0.78_0.14_75/0.07)]',
  'Plataforma activa': 'text-[oklch(0.82_0.12_205)] border-[oklch(0.78_0.13_205/0.3)] bg-[oklch(0.78_0.13_205/0.07)]',
  'En desarrollo': 'text-[oklch(0.72_0.16_285)] border-[oklch(0.62_0.19_285/0.35)] bg-[oklch(0.62_0.19_285/0.08)]',
  'Programa académico': 'text-[oklch(0.74_0.15_285)] border-[oklch(0.62_0.19_285/0.35)] bg-[oklch(0.62_0.19_285/0.08)]',
  'Repositorio': 'text-zinc-400 border-[var(--line-mid)] bg-white/[0.02]',
};

type MockVariant = 'dashboard' | 'cards' | 'doc' | 'game';

const VARIANT_BY_CATEGORY: Partial<Record<ProjectCategory, MockVariant>> = {
  'Legaltech': 'dashboard',
  'DIAT · Academia': 'doc',
  'Talleres y IA': 'doc',
  'Pymes': 'cards',
  'Apps personalizadas': 'cards',
  'RPG jurídico': 'game',
  'Administrativo y Público': 'doc',
  'Herramientas de estudio': 'cards',
  'Examen de Grado': 'game',
  'IA y prompting': 'dashboard',
};

/* Functional groups — the portfolio reads by purpose, not as a flat wall */
const GROUPS: { id: string; label: string; hint: string; cats: ProjectCategory[] }[] = [
  { id: 'legaltech', label: 'LegalTech & plataformas', hint: 'productos y sistemas a medida', cats: ['Legaltech', 'Talleres y IA', 'IA y prompting'] },
  { id: 'diat', label: 'DIAT · academia y divulgación', hint: 'programa, eventos y contenido', cats: ['DIAT · Academia'] },
  { id: 'estudio', label: 'Estudio & gamificación jurídica', hint: 'aprender derecho jugando y leyendo', cats: ['Herramientas de estudio', 'RPG jurídico', 'Examen de Grado', 'Administrativo y Público'] },
  { id: 'amedida', label: 'Apps a medida', hint: 'soluciones para personas y pymes', cats: ['Apps personalizadas', 'Pymes'] },
];

const accentByVariant: Record<MockVariant, string> = {
  dashboard: 'oklch(0.78 0.13 205)',
  doc: 'oklch(0.62 0.19 285)',
  cards: 'oklch(0.74 0.14 165)',
  game: 'oklch(0.78 0.14 75)',
};

/* ── CSS-generated mini mockup — each project reads as a product ── */
function MiniMock({ variant }: { variant: MockVariant }) {
  const a = accentByVariant[variant];
  return (
    <div className="relative rounded-lg border border-[var(--line-mid)] bg-[oklch(0.1_0.02_255)] overflow-hidden h-[124px] group-hover:border-[oklch(0.78_0.13_205/0.4)] transition-colors">
      {/* window chrome */}
      <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-[var(--line-soft)] bg-[oklch(0.13_0.022_255)]">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: a, opacity: 0.7 }} />
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
        <div className="ml-2 h-1.5 w-16 rounded-full bg-white/[0.05]" />
        <span className="ml-auto w-1 h-1 rounded-full" style={{ background: a }} />
      </div>

      {variant === 'dashboard' && (
        <div className="flex h-full">
          <div className="w-9 border-r border-[var(--line-soft)] p-1.5 space-y-1.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-1.5 rounded-full" style={{ background: i === 0 ? a : 'oklch(1 0 0 / 0.07)', opacity: i === 0 ? 0.55 : 1 }} />
            ))}
          </div>
          <div className="flex-1 p-2 space-y-1.5">
            <div className="grid grid-cols-3 gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-5 rounded bg-white/[0.05] border border-[var(--line-soft)]" />
              ))}
            </div>
            <div className="h-10 rounded bg-white/[0.04] border border-[var(--line-soft)] flex items-end gap-1 p-1.5">
              {[40, 65, 50, 80, 60, 92].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm spark-bar"
                  style={{ height: `${h}%`, background: a, opacity: 0.5, animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {variant === 'cards' && (
        <div className="p-2 space-y-1.5">
          <div className="h-2 w-20 rounded-full" style={{ background: a, opacity: 0.5 }} />
          <div className="grid grid-cols-2 gap-1.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-9 rounded bg-white/[0.05] border border-[var(--line-soft)] p-1.5">
                <div className="h-1.5 w-8 rounded-full bg-white/[0.1]" />
                <div className="h-1.5 w-5 rounded-full mt-1" style={{ background: a, opacity: 0.4 }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {variant === 'doc' && (
        <div className="p-2.5 space-y-1.5">
          <div className="h-2 w-24 rounded-full" style={{ background: a, opacity: 0.55 }} />
          {[95, 100, 75, 90, 60].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-white/[0.07]" style={{ width: `${w}%` }} />
          ))}
          <div className="flex gap-1.5 pt-1">
            <div className="h-3.5 w-12 rounded border" style={{ background: `color-mix(in oklch, ${a} 18%, transparent)`, borderColor: `color-mix(in oklch, ${a} 35%, transparent)` }} />
            <div className="h-3.5 w-12 rounded bg-white/[0.05] border border-[var(--line-soft)]" />
          </div>
        </div>
      )}

      {variant === 'game' && (
        <div className="p-2.5 space-y-1.5">
          <div className="flex justify-between items-center">
            <div className="h-2 w-14 rounded-full" style={{ background: a, opacity: 0.55 }} />
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-sm" style={{ background: a, opacity: 0.5 }} />
              ))}
            </div>
          </div>
          <div className="h-9 rounded bg-white/[0.04] border border-[var(--line-soft)] p-1.5">
            <div className="h-1.5 w-3/4 rounded-full bg-white/[0.09]" />
            <div className="h-1.5 w-1/2 rounded-full bg-white/[0.06] mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-4 rounded border" style={{ background: `color-mix(in oklch, ${a} 18%, transparent)`, borderColor: `color-mix(in oklch, ${a} 35%, transparent)` }} />
            <div className="h-4 rounded bg-white/[0.05] border border-[var(--line-soft)]" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Live telemetry band — dynamic, readable, not overloaded ── */
function Sparkline({ color }: { color: string }) {
  const bars = [38, 60, 45, 72, 55, 84, 66, 92, 70];
  return (
    <div className="flex items-end gap-[3px] h-8" aria-hidden>
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-sm spark-bar"
          style={{ height: `${h}%`, background: color, opacity: 0.55, animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

function LabTelemetry() {
  const total = projects.length;
  const live = projects.filter(p => p.demoUrl).length;
  const cats = new Set(projects.map(p => p.category)).size;

  const metrics = [
    { label: 'Proyectos', to: total, color: 'oklch(0.82 0.12 205)' },
    { label: 'Demos en vivo', to: live, color: 'oklch(0.78 0.13 162)' },
    { label: 'Categorías', to: cats, color: 'oklch(0.72 0.16 285)' },
    { label: 'Regiones · Lex RPG', to: 7, color: 'oklch(0.8 0.13 75)' },
    { label: 'Textos · Umbral', to: 40, color: 'oklch(0.82 0.12 205)' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="panel-deep rounded-2xl overflow-hidden scanline"
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--line-soft)] bg-[oklch(0.13_0.023_255/0.7)]">
        <div className="flex items-center gap-2.5">
          <Activity className="w-3.5 h-3.5 text-[oklch(0.82_0.12_205)]" />
          <span className="text-[11px] mono text-zinc-400 tracking-wide">telemetría del lab</span>
        </div>
        <span className="flex items-center gap-1.5">
          <span className="status-dot bg-[oklch(0.74_0.14_165)]" />
          <span className="text-[9px] mono text-zinc-500 uppercase">live</span>
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-[var(--line-soft)]">
        {metrics.map((m, i) => (
          <div key={m.label} className={`p-4 ${i >= 3 ? 'border-t lg:border-t-0 border-[var(--line-soft)]' : ''} ${i === 2 ? 'border-t sm:border-t-0 border-[var(--line-soft)]' : ''}`}>
            <div className="flex items-end justify-between gap-2">
              <div className="text-2xl font-black mono tracking-tight" style={{ color: m.color }}>
                <CountUp to={m.to} />
              </div>
              <Sparkline color={m.color} />
            </div>
            <div className="text-[10px] text-zinc-600 mt-1.5 leading-snug">{m.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Project card ── */
function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
    >
      <TiltCard className="group panel rounded-2xl p-4 space-y-4 card-surface-hover flex flex-col h-full">
        <MiniMock variant={VARIANT_BY_CATEGORY[p.category] ?? 'dashboard'} />

        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] mono text-[oklch(0.78_0.1_205)]">{p.category}</span>
          <div className="flex items-center gap-1.5">
            {p.featured && <Star className="w-3 h-3 text-[oklch(0.82_0.11_85)] fill-[oklch(0.82_0.11_85)]" />}
            <span className={`text-[10px] mono px-2 py-0.5 rounded-md border ${statusColors[p.status] ?? ''}`}>
              {p.status}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-[15px] font-bold text-white tracking-tight">{p.title}</h3>
          <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">{p.description}</p>
        </div>

        <div className="rounded-lg bg-[oklch(0.12_0.022_255/0.6)] border border-[var(--line-soft)] p-2.5">
          <div className="text-[9px] text-zinc-600 uppercase tracking-[0.15em] mono mb-1">Problema resuelto</div>
          <p className="text-[11px] text-zinc-500 leading-relaxed">{p.problem}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {p.tags.slice(0, 4).map(t => (
            <span key={t} className="px-2 py-0.5 rounded-md border border-[var(--line-soft)] bg-white/[0.02] text-[10px] text-zinc-500 mono">
              {t}
            </span>
          ))}
        </div>

        <p className="text-[11px] text-zinc-600 leading-relaxed border-t border-[var(--line-soft)] pt-3">
          <span className="mono text-[oklch(0.74_0.14_165)]">RESULTADO →</span> {p.caseNote}
        </p>

        {(p.demoUrl || p.repoUrl) && (
          <div className="flex gap-2">
            {p.demoUrl && (
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-[oklch(0.78_0.13_205/0.35)] bg-[oklch(0.78_0.13_205/0.08)] text-[oklch(0.84_0.11_205)] hover:bg-[oklch(0.78_0.13_205/0.15)] transition-all"
              >
                <ExternalLink className="w-3 h-3" /> Ver demo
              </a>
            )}
            {p.repoUrl && (
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-[var(--line-mid)] bg-white/[0.02] text-zinc-400 hover:text-zinc-200 transition-all"
              >
                <Code2 className="w-3 h-3" /> Repo
              </a>
            )}
          </div>
        )}
      </TiltCard>
    </motion.div>
  );
}

export function PortfolioSection() {
  // Build groups, featured-first within each, skipping empty groups
  const grouped = GROUPS.map(g => {
    const items = projects
      .filter(p => g.cats.includes(p.category))
      .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    return { ...g, items };
  }).filter(g => g.items.length > 0);

  return (
    <section id="lab" className="py-24 lg:py-32 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 80% 12%, oklch(0.74 0.14 165 / 0.05) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10 relative">

        {/* Lab seal + header */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 rounded-full border lab-chip pl-3 pr-4 py-1.5"
          >
            <DiogenesLamp className="w-4 h-4" />
            <span className="text-[11px] mono uppercase tracking-[0.16em]">
              Diógenes Lab · software, aprendizaje jurídico y crítica algorítmica
            </span>
          </motion.div>

          <SectionHeader
            index="02"
            eyebrow="Laboratorio"
            title="Proyectos construidos sobre problemas reales."
            sub="Cada prototipo es evidencia de capacidad técnica y criterio de diseño: interfaces, automatización, IA aplicada y despliegue real en producción."
          />
        </div>

        {/* Telemetry */}
        <LabTelemetry />

        {/* Grouped projects */}
        <div className="space-y-12">
          {grouped.map(group => (
            <div key={group.id} className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="eyebrow text-[oklch(0.78_0.13_205)]">{group.label}</span>
                <span className="h-px flex-1 bg-[var(--line-soft)]" />
                <span className="text-[10px] mono text-zinc-600">{group.items.length} · {group.hint}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((p, i) => (
                  <ProjectCard key={p.title} p={p} i={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Live experiments bridge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="panel-deep rounded-2xl p-6 sm:p-7"
        >
          <div className="flex items-center gap-2 mb-5">
            <DiogenesLamp className="w-4 h-4 lab-accent" />
            <span className="eyebrow text-zinc-500">Experimentos en vivo · ábrelos en /diagnóstico</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <a
              href="/diagnostico"
              className="group/exp flex items-center gap-4 rounded-xl border border-[var(--line-soft)] bg-white/[0.02] p-4 text-left card-surface-hover"
            >
              <div className="w-10 h-10 rounded-lg border border-[oklch(0.78_0.13_205/0.35)] bg-[oklch(0.78_0.13_205/0.08)] flex items-center justify-center shrink-0">
                <ScanLine className="w-4.5 h-4.5 text-[oklch(0.82_0.12_205)]" />
              </div>
              <div className="flex-1">
                <div className="text-[13.5px] font-bold text-white glitch-hover">AI Readiness Scanner</div>
                <div className="text-[11.5px] text-zinc-500 mt-0.5">Diagnóstico de automatización en 8 preguntas</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover/exp:text-[oklch(0.82_0.12_205)] transition-colors" />
            </a>
            <a
              href="/diagnostico#simulador"
              className="group/exp flex items-center gap-4 rounded-xl border border-[var(--line-soft)] bg-white/[0.02] p-4 text-left card-surface-hover"
            >
              <div className="w-10 h-10 rounded-lg border border-[oklch(0.78_0.13_205/0.35)] bg-[oklch(0.78_0.13_205/0.08)] flex items-center justify-center shrink-0">
                <Calculator className="w-4.5 h-4.5 text-[oklch(0.82_0.12_205)]" />
              </div>
              <div className="flex-1">
                <div className="text-[13.5px] font-bold text-white glitch-hover">Simulador ROI</div>
                <div className="text-[11.5px] text-zinc-500 mt-0.5">El costo oculto del trabajo manual, en números</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover/exp:text-[oklch(0.82_0.12_205)] transition-colors" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
