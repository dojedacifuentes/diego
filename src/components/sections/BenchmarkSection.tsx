'use client';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Zap, BarChart3, ChevronRight } from 'lucide-react';
import {
  LEGALTECH_MARKET,
  CHILE_BENCHMARK,
  ROI_BENCHMARK,
  PROCESS_EFFICIENCY,
  LEY_21719,
  MATURITY_LEVELS,
} from '@/data/benchmark';
import { SectionHeader } from '@/components/common/SectionHeader';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const TOP_STATS = [
  {
    value: `${LEGALTECH_MARKET.legalAI_cagr_pct}%`,
    label: 'CAGR IA Legal Global',
    sublabel: '2026–2034 (Fortune Business Insights)',
    color: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    icon: TrendingUp,
  },
  {
    value: `${CHILE_BENCHMARK.adoption_pct}%`,
    label: 'Adopción IA Legal en Chile',
    sublabel: 'Único país LATAM bajo el 30% (LATAM: 28%)',
    color: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
    icon: BarChart3,
  },
  {
    value: `${ROI_BENCHMARK.benchmark_roi_pct.toLocaleString('es-CL')}%`,
    label: 'ROI de referencia',
    sublabel: 'Benchmark documentado en firma de 20 abogados',
    color: 'text-violet-400',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    icon: Zap,
  },
  {
    value: LEY_21719.effective_date,
    label: 'Ley 21.719 vigente',
    sublabel: 'Multas hasta 20.000 UTM (~CLP $1.380M)',
    color: 'text-rose-400',
    border: 'border-rose-500/20',
    bg: 'bg-rose-500/5',
    icon: AlertTriangle,
  },
];

const ADOPTION_BARS = [
  { label: 'Sector tecnología (LATAM)', pct: CHILE_BENCHMARK.tech_sector_pct, color: 'bg-cyan-400', textColor: 'text-cyan-400' },
  { label: 'Sector financiero (LATAM)', pct: CHILE_BENCHMARK.financial_sector_pct, color: 'bg-indigo-400', textColor: 'text-indigo-400' },
  { label: 'Promedio LATAM', pct: CHILE_BENCHMARK.latam_avg_pct, color: 'bg-zinc-400', textColor: 'text-zinc-400' },
  { label: 'Chile — sector legal', pct: CHILE_BENCHMARK.adoption_pct, color: 'bg-amber-400', textColor: 'text-amber-400' },
];

export function BenchmarkSection() {
  return (
    <section id="benchmark" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-14">

        {/* Header */}
        <SectionHeader
          index="10"
          eyebrow="Contexto · Intelligence Report 2026"
          title="El mercado legal ya se está automatizando."
          sub="Datos del ecosistema LegalTech global y chileno. Entiende dónde está el sector — y dónde está tu práctica."
          align="center"
        />

        {/* Top 4 stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOP_STATS.map(({ value, label, sublabel, color, border, bg, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className={`rounded-2xl border p-5 space-y-3 card-surface-hover ${border} ${bg}`}
            >
              <div className={`w-8 h-8 rounded-xl border ${border} bg-white/[0.03] flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div>
                <div className={`text-3xl font-black mono tracking-tight ${color}`}>{value}</div>
                <div className="text-xs font-semibold text-zinc-300 mt-1 leading-snug">{label}</div>
                <div className="text-[10px] text-zinc-600 mt-1 leading-relaxed">{sublabel}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Two-column block: adoption + maturity */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Adopción IA legal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-5"
          >
            <div className="space-y-1">
              <div className="text-[10px] mono uppercase tracking-widest text-zinc-600 font-medium">
                Adopción de IA Legal
              </div>
              <h3 className="text-base font-bold text-white">Chile vs LATAM 2026</h3>
            </div>
            <div className="space-y-3.5">
              {ADOPTION_BARS.map(({ label, pct, color, textColor }, i) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">{label}</span>
                    <span className={`text-xs font-bold mono ${textColor}`}>{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.7, ease: 'easeOut' }}
                      className={`h-full rounded-full ${color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-zinc-600 leading-relaxed">
              Fuente: Encuesta "Retos y Perspectivas Gerencias Legales LATAM 2025"
            </p>
          </motion.div>

          {/* Índice de Madurez IA Legal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-5"
          >
            <div className="space-y-1">
              <div className="text-[10px] mono uppercase tracking-widest text-zinc-600 font-medium">
                Índice de Madurez IA Legal
              </div>
              <h3 className="text-base font-bold text-white">Distribución estimada Chile 2026</h3>
            </div>
            <div className="space-y-2.5">
              {Object.values(MATURITY_LEVELS).map((lvl, i) => (
                <div
                  key={lvl.key}
                  className={`flex items-center gap-3 rounded-xl border p-3 ${lvl.border} ${lvl.bg}`}
                >
                  <div className={`w-8 shrink-0 text-right`}>
                    <span className={`text-sm font-black mono ${lvl.color}`}>{lvl.sectorPct}%</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold ${lvl.color}`}>{lvl.label}</div>
                    <div className="text-[10px] text-zinc-600 leading-snug mt-0.5">{lvl.description}</div>
                  </div>
                  <div className="h-1.5 w-20 shrink-0 rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lvl.sectorPct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease: 'easeOut' }}
                      className={`h-full rounded-full ${lvl.color.replace('text-', 'bg-').replace('/400', '-400')}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-zinc-600 leading-relaxed">
              Estimación basada en datos de adopción del sector legal chileno
            </p>
          </motion.div>
        </div>

        {/* Process efficiency */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <div className="text-[10px] mono uppercase tracking-widest text-zinc-600 font-medium">
              Eficiencia operativa con IA
            </div>
            <h3 className="text-base font-bold text-white mt-1">Procesos jurídicos antes y después</h3>
            <p className="text-xs text-zinc-500 mt-1">Benchmarks documentados por Webdox CLM 2026</p>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {PROCESS_EFFICIENCY.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className="grid grid-cols-[1fr_auto_auto_auto] lg:grid-cols-[1.5fr_1fr_1fr_auto] items-center gap-4 px-6 py-4"
              >
                <div className="text-sm text-zinc-300 font-medium leading-snug">{item.process}</div>
                <div className="hidden lg:block text-xs text-zinc-600 mono text-right">{item.traditional}</div>
                <div className="hidden lg:block text-xs text-cyan-400 mono font-semibold text-right">{item.withAI}</div>
                <div className="text-right">
                  <span className="text-xs font-black mono text-emerald-400">{item.label}</span>
                  <div className="h-1 w-16 rounded-full bg-white/[0.05] overflow-hidden mt-1.5 ml-auto">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.3, duration: 0.6, ease: 'easeOut' }}
                      className="h-full rounded-full bg-emerald-400"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ley 21.719 + market growth (two-column) */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Ley 21.719 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 space-y-5"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4.5 h-4.5 text-amber-400" />
              </div>
              <div>
                <div className="text-[10px] mono uppercase tracking-widest text-amber-600 font-medium">
                  Ley 21.719 · Datos Personales
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Vigente desde {LEY_21719.effective_date}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Reemplaza Ley 19.628 · Homologa estándar GDPR europeo en Chile
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {Object.values(LEY_21719.fines).map((fine) => (
                <div
                  key={fine.label}
                  className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                >
                  <div>
                    <span className="text-xs font-semibold text-zinc-300">{fine.label}</span>
                    <span className="text-[10px] text-zinc-600 ml-2">hasta {fine.utmMax.toLocaleString('es-CL')} UTM</span>
                  </div>
                  <span className="text-xs font-black mono text-amber-400">
                    ~${(fine.clpApprox / 1_000_000).toFixed(0)}M
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/8 px-4 py-3 space-y-1">
              <div className="text-[10px] mono text-amber-600 uppercase tracking-wider font-medium">
                Grace period PYMEs
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Diciembre 2026 – Diciembre 2027: solo amonestaciones. Ventana para adecuar procesos y capacitar equipos.
              </p>
            </div>
          </motion.div>

          {/* Market growth */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-5"
          >
            <div className="space-y-1">
              <div className="text-[10px] mono uppercase tracking-widest text-zinc-600 font-medium">
                Mercado global
              </div>
              <h3 className="text-base font-bold text-white">Proyecciones 2026–2036</h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: 'Software de IA Legal',
                  from: `$${LEGALTECH_MARKET.legalAI_2026_bn}B`,
                  to: `$${LEGALTECH_MARKET.legalAI_2034_bn}B`,
                  years: '2026→2034',
                  cagr: `${LEGALTECH_MARKET.legalAI_cagr_pct}%`,
                  color: 'text-cyan-400',
                  bgBar: 'bg-cyan-400',
                  barWidth: '85%',
                },
                {
                  label: 'Mercado LegalTech',
                  from: `$${LEGALTECH_MARKET.legaltech_2026_bn}B`,
                  to: `$${LEGALTECH_MARKET.legaltech_2036_bn}B`,
                  years: '2026→2036',
                  cagr: `${LEGALTECH_MARKET.legaltech_cagr_pct}%`,
                  color: 'text-indigo-400',
                  bgBar: 'bg-indigo-400',
                  barWidth: '45%',
                },
              ].map((seg) => (
                <div key={seg.label} className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-zinc-300">{seg.label}</span>
                    <span className={`text-sm font-black mono ${seg.color}`}>{seg.cagr} CAGR</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    <span className="mono">{seg.from}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: seg.barWidth }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full rounded-full ${seg.bgBar}`}
                      />
                    </div>
                    <span className="mono">{seg.to}</span>
                  </div>
                  <p className="text-[10px] text-zinc-700">{seg.years}</p>
                </div>
              ))}

              <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-3">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <span className="text-violet-400 font-semibold">{ROI_BENCHMARK.adoption_efficiency_pct}%</span> de las firmas con adopción activa de IA reportan mejoras inmediatas en eficiencia operativa.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-3"
        >
          <p className="text-sm text-zinc-500">
            ¿En qué nivel de madurez está tu práctica?
          </p>
          <button onClick={() => scrollTo('evaluacion')} className="btn-ghost-cyan">
            <Zap className="w-4 h-4" />
            Ejecutar el AI Readiness Scanner
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
