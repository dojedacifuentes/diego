'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, TrendingUp, AlertTriangle, Users, CheckCircle2, ChevronDown } from 'lucide-react';
import { useDiagnostic } from '@/store/diagnosticContext';
import { ROI_BENCHMARK, OPPORTUNITY_AREAS } from '@/data/benchmark';

const ORG_TYPES = [
  'Estudio jurídico', 'Abogado/a independiente', 'Empresa', 'Institución educativa',
  'Pyme', 'Profesional independiente', 'Otro',
];

const PROCESSES = [
  'Generación de documentos', 'Gestión de clientes', 'Seguimiento de causas o proyectos',
  'Preparación de informes', 'Estudio o formación', 'Captación comercial', 'Gestión interna', 'Otro',
];

const HOURLY_RATES = [
  { label: '$15.000/h', value: 15_000 },
  { label: '$25.000/h', value: 25_000 },
  { label: '$40.000/h', value: 40_000 },
  { label: '$60.000/h', value: 60_000 },
];

const AUTO_PCTS = [
  { label: '15%', value: 0.15 },
  { label: '25%', value: 0.25 },
  { label: '40%', value: 0.40 },
  { label: '60%', value: 0.60 },
];

// Costo de implementación estimado por profesional/año (CLP)
const IMPL_COST_PER_PERSON = 280_000;

// Horas semanales perdidas en registro manual (Lemontech benchmark)
const WEEKLY_ADMIN_LOSS_HOURS = ROI_BENCHMARK.weekly_hours_lost_per_lawyer;

function fmt(n: number) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);
}

function getRecommendations(
  process: string,
  orgType: string,
  hours: number,
  autoPct: number,
  teamSize: number,
): Array<{ id: string; label: string; desc: string; textClass: string; borderClass: string; bgClass: string }> {
  const recs: string[] = [];

  if (
    process === 'Generación de documentos' ||
    process === 'Preparación de informes'
  ) recs.push('documentacion');

  if (
    process === 'Gestión de clientes' ||
    process === 'Seguimiento de causas o proyectos' ||
    process === 'Gestión interna'
  ) recs.push('dashboard');

  if (autoPct >= 0.4 && hours >= 10) recs.push('workflows');

  if (
    orgType === 'Estudio jurídico' ||
    orgType === 'Empresa' ||
    orgType === 'Abogado/a independiente'
  ) {
    if (!recs.includes('documentacion')) recs.push('iusmachina');
  }

  if (teamSize >= 5 && !recs.includes('capacitacion')) recs.push('capacitacion');
  if (recs.length < 2) recs.push('ia_aplicada');

  return recs.slice(0, 3).map(id => {
    const area = OPPORTUNITY_AREAS[id as keyof typeof OPPORTUNITY_AREAS];
    return {
      id,
      label: area.label,
      desc: area.description,
      textClass: area.textClass,
      borderClass: area.borderClass,
      bgClass: area.bgClass,
    };
  });
}

export function SavingsSimulator() {
  const { result: diagResult } = useDiagnostic();

  const [orgType, setOrgType] = useState('');
  const [process, setProcess] = useState('');
  const [hours, setHours] = useState(8);
  const [teamSize, setTeamSize] = useState(1);
  const [hourlyRate, setHourlyRate] = useState(25_000);
  const [customRate, setCustomRate] = useState('');
  const [autoPct, setAutoPct] = useState(0.25);
  const [calculated, setCalculated] = useState(false);
  const [showBenchmark, setShowBenchmark] = useState(false);

  const effectiveRate = customRate
    ? parseInt(customRate.replace(/\D/g, ''), 10) || hourlyRate
    : hourlyRate;

  const sim = useMemo(() => {
    // Core savings
    const hSemanaTeam = teamSize * hours * autoPct;
    const hAnualTeam = hSemanaTeam * 48;
    const valAnual = hAnualTeam * effectiveRate;
    const valMes = valAnual / 12;

    // Hidden admin cost (time-tracking waste · Lemontech benchmark)
    const hiddenHoursAnual = teamSize * WEEKLY_ADMIN_LOSS_HOURS * 48;
    const hiddenCostAnual = hiddenHoursAnual * effectiveRate;

    // Total leakage
    const totalLeakage = valAnual + hiddenCostAnual;

    // Implementation cost estimate
    const implCostAnual = teamSize * IMPL_COST_PER_PERSON;

    // ROI & payback
    const netBenefit = valAnual - implCostAnual;
    const roi = implCostAnual > 0 ? Math.round((netBenefit / implCostAnual) * 100) : 0;
    const paybackMonths = valAnual > 0 ? parseFloat((implCostAnual / (valAnual / 12)).toFixed(1)) : 0;

    // Complexity
    const complexity: 'Baja' | 'Media' | 'Alta' =
      teamSize <= 3 ? 'Baja' : teamSize <= 15 ? 'Media' : 'Alta';

    return {
      hSemanaTeam,
      hAnualTeam,
      valAnual,
      valMes,
      hiddenCostAnual,
      totalLeakage,
      implCostAnual,
      netBenefit,
      roi,
      paybackMonths,
      complexity,
    };
  }, [hours, teamSize, autoPct, effectiveRate]);

  const recommendations = useMemo(
    () => getRecommendations(process, orgType, hours, autoPct, teamSize),
    [process, orgType, hours, autoPct, teamSize],
  );

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const complexityColor = {
    Baja: 'text-emerald-400 border-emerald-500/25 bg-emerald-500/8',
    Media: 'text-amber-400 border-amber-500/25 bg-amber-500/8',
    Alta: 'text-rose-400 border-rose-500/25 bg-rose-500/8',
  }[sim.complexity];

  return (
    <section id="simulador" className="py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 space-y-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-3"
        >
          <div className="text-[11px] text-zinc-600 uppercase tracking-widest mono font-medium">
            Simulador ROI
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Simula el valor de automatizar
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-xl mx-auto">
            Visualiza el costo oculto de procesos manuales, proyecta tu ROI y compara contra el benchmark del sector.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/[0.09] bg-white/[0.02] overflow-hidden"
        >
          {/* Diagnostic banner */}
          {diagResult && (
            <div className="px-6 py-3 bg-cyan-500/8 border-b border-cyan-500/20 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-xs text-cyan-400 font-medium">
                Evaluación IA completada — {diagResult.compatibility}% · {diagResult.level} · Madurez: {diagResult.maturityLabel}
              </span>
            </div>
          )}

          <div className="p-6 sm:p-8 space-y-7">

            {/* Inputs grid */}
            <div className="grid sm:grid-cols-2 gap-5">

              {/* Org type */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">Tipo de organización</label>
                <select
                  value={orgType}
                  onChange={e => setOrgType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.08] bg-[oklch(0.10_0.018_250)] text-sm text-zinc-300 focus:outline-none focus:border-cyan-500/40 transition-all appearance-none"
                >
                  <option value="">Seleccionar…</option>
                  {ORG_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Process */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">Proceso principal</label>
                <select
                  value={process}
                  onChange={e => setProcess(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.08] bg-[oklch(0.10_0.018_250)] text-sm text-zinc-300 focus:outline-none focus:border-cyan-500/40 transition-all appearance-none"
                >
                  <option value="">Seleccionar…</option>
                  {PROCESSES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              {/* Team size */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">
                  <Users className="w-3 h-3 inline mr-1 opacity-60" />
                  Número de profesionales:{' '}
                  <span className="text-indigo-400 mono font-bold">{teamSize}</span>
                </label>
                <input
                  type="range"
                  min={1} max={50} step={1}
                  value={teamSize}
                  onChange={e => setTeamSize(Number(e.target.value))}
                  className="w-full accent-indigo-400"
                />
                <div className="flex justify-between text-[10px] text-zinc-700 mono">
                  <span>1</span><span>25</span><span>50</span>
                </div>
              </div>

              {/* Weekly hours */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">
                  Horas semanales dedicadas al proceso:{' '}
                  <span className="text-cyan-400 mono font-bold">{hours}h</span>
                </label>
                <input
                  type="range"
                  min={1} max={40} step={1}
                  value={hours}
                  onChange={e => setHours(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-zinc-700 mono">
                  <span>1h</span><span>20h</span><span>40h</span>
                </div>
              </div>

              {/* Automation % */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">Porcentaje estimado de automatización</label>
                <div className="flex gap-2">
                  {AUTO_PCTS.map(({ label, value }) => (
                    <button
                      key={label}
                      onClick={() => setAutoPct(value)}
                      className={`flex-1 py-2 rounded-lg border text-xs font-bold mono transition-all ${
                        autoPct === value
                          ? 'border-cyan-500/50 bg-cyan-500/12 text-cyan-300'
                          : 'border-white/[0.08] bg-white/[0.02] text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hourly rate */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">Valor hora profesional</label>
                <div className="flex flex-wrap gap-2 items-center">
                  {HOURLY_RATES.map(({ label, value }) => (
                    <button
                      key={label}
                      onClick={() => { setHourlyRate(value); setCustomRate(''); }}
                      className={`px-3 py-2 rounded-lg border text-xs font-bold mono transition-all ${
                        hourlyRate === value && !customRate
                          ? 'border-indigo-500/50 bg-indigo-500/12 text-indigo-300'
                          : 'border-white/[0.08] bg-white/[0.02] text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                  <input
                    type="text"
                    placeholder="Personalizado…"
                    value={customRate}
                    onChange={e => setCustomRate(e.target.value)}
                    className="flex-1 min-w-[110px] px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-xs text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500/30 transition-all mono"
                  />
                </div>
              </div>
            </div>

            {/* Calculate button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCalculated(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-black bg-cyan-400 hover:bg-cyan-300 transition-colors glow-cyan"
            >
              <Zap className="w-4 h-4" />
              Calcular ROI y potencial de ahorro
            </motion.button>

            {/* Results */}
            <AnimatePresence>
              {calculated && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 border-t border-white/[0.06] pt-6"
                >

                  {/* Primary ROI metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { label: 'Valor liberado / año', value: fmt(sim.valAnual), color: 'text-cyan-400', sub: `${sim.hAnualTeam.toFixed(0)}h recuperadas` },
                      { label: 'Costo oculto anual', value: fmt(sim.hiddenCostAnual), color: 'text-amber-400', sub: `${(WEEKLY_ADMIN_LOSS_HOURS * teamSize).toFixed(1)}h admin/semana` },
                      { label: 'Pérdida total estimada', value: fmt(sim.totalLeakage), color: 'text-rose-400', sub: 'Sin automatización' },
                    ].map(({ label, value, color, sub }) => (
                      <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 space-y-1">
                        <div className={`text-lg sm:text-xl font-black mono ${color}`}>{value}</div>
                        <div className="text-[10px] text-zinc-600 leading-snug">{label}</div>
                        <div className={`text-[10px] mono font-medium ${color} opacity-70`}>{sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* ROI / Payback / Net benefit row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'ROI proyectado', value: `${sim.roi.toLocaleString('es-CL')}%`, color: 'text-violet-400' },
                      { label: 'Payback estimado', value: `${sim.paybackMonths} mes${sim.paybackMonths !== 1 ? 'es' : ''}`, color: 'text-emerald-400' },
                      { label: 'Beneficio neto / año', value: fmt(sim.netBenefit > 0 ? sim.netBenefit : 0), color: 'text-indigo-400' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 text-center space-y-1">
                        <div className={`text-base sm:text-lg font-black mono ${color}`}>{value}</div>
                        <div className="text-[10px] text-zinc-600">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Benchmark comparison */}
                  <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5 space-y-4">
                    <button
                      onClick={() => setShowBenchmark(v => !v)}
                      className="w-full flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-violet-400" />
                        <span className="text-xs font-semibold text-violet-300">Benchmark comparable</span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 text-violet-500 transition-transform ${showBenchmark ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {showBenchmark && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden space-y-3"
                        >
                          <p className="text-xs text-zinc-500 leading-relaxed">
                            Referencia documentada: firma de <span className="text-zinc-300 font-medium">20 abogados</span> a <span className="text-zinc-300 font-medium">USD 100/hora</span> implementando herramientas de time-tracking y automatización (Lemontech 2026):
                          </p>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { label: 'ROI benchmark', value: `${ROI_BENCHMARK.benchmark_roi_pct.toLocaleString('es-CL')}%`, color: 'text-violet-400' },
                              { label: 'Payback benchmark', value: `${ROI_BENCHMARK.benchmark_payback_months} meses`, color: 'text-emerald-400' },
                              { label: 'Inversión anual', value: `USD ${ROI_BENCHMARK.annual_license_usd}/abog.`, color: 'text-indigo-400' },
                            ].map(({ label, value, color }) => (
                              <div key={label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                                <div className={`text-sm font-black mono ${color}`}>{value}</div>
                                <div className="text-[9px] text-zinc-600 mt-0.5">{label}</div>
                              </div>
                            ))}
                          </div>

                          {/* ROI comparison bar */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-[10px] text-zinc-600 mono">
                              <span>Tu ROI estimado</span>
                              <span>{sim.roi.toLocaleString('es-CL')}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, (sim.roi / ROI_BENCHMARK.benchmark_roi_pct) * 100)}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className="h-full rounded-full bg-violet-400"
                              />
                            </div>
                            <div className="flex justify-between text-[10px] text-zinc-600 mono">
                              <span>Benchmark</span>
                              <span>{ROI_BENCHMARK.benchmark_roi_pct.toLocaleString('es-CL')}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
                              <div className="h-full w-full rounded-full bg-zinc-600/40" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Implementation complexity */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-500">Complejidad de implementación:</span>
                    <span className={`text-xs font-bold mono px-2.5 py-1 rounded-lg border ${complexityColor}`}>
                      {sim.complexity}
                    </span>
                    <span className="text-[11px] text-zinc-600">
                      {sim.complexity === 'Baja' && '· Implementación en días'}
                      {sim.complexity === 'Media' && '· Implementación en semanas'}
                      {sim.complexity === 'Alta' && '· Requiere planificación estructurada'}
                    </span>
                  </div>

                  {/* Recommended solutions */}
                  {recommendations.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[10px] mono uppercase tracking-widest text-zinc-600 font-medium">
                        Soluciones recomendadas para tu caso
                      </div>
                      <div className="grid sm:grid-cols-3 gap-2">
                        {recommendations.map(({ id, label, desc, textClass, borderClass, bgClass }) => (
                          <div
                            key={id}
                            className={`rounded-xl border p-3.5 space-y-1 ${borderClass} ${bgClass}`}
                          >
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className={`w-3 h-3 ${textClass} shrink-0`} />
                              <span className={`text-xs font-semibold ${textClass}`}>{label}</span>
                            </div>
                            <p className="text-[10px] text-zinc-500 leading-relaxed">{desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Disclaimer */}
                  <p className="text-[11px] text-zinc-700 leading-relaxed italic">
                    Simulación referencial. No reemplaza un diagnóstico técnico. Costo de implementación estimado en {fmt(IMPL_COST_PER_PERSON)} CLP/profesional/año. Datos de referencia: Lemontech / Webdox CLM / Fortune Business Insights (2026).
                  </p>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => scrollTo('contacto')}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-cyan-300 border border-cyan-500/30 bg-cyan-500/8 hover:bg-cyan-500/15 transition-all"
                  >
                    Solicitar diagnóstico con estos datos <ArrowRight className="w-4 h-4" />
                  </motion.button>

                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
