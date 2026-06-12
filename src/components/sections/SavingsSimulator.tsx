'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, TrendingUp, Users, CheckCircle2, ChevronDown, Calculator,
  Clock, Wallet, CalendarRange, Percent, Undo2, ScanLine,
} from 'lucide-react';
import { useDiagnostic } from '@/store/diagnosticContext';
import { ROI_BENCHMARK, OPPORTUNITY_AREAS } from '@/data/benchmark';
import { SectionHeader } from '@/components/common/SectionHeader';

const ORG_TYPES = [
  'Estudio jurídico', 'Abogado/a independiente', 'Empresa', 'Institución educativa',
  'Pyme', 'Profesional independiente', 'Otro',
];

const PROCESSES = [
  'Generación de documentos', 'Gestión de clientes', 'Seguimiento de causas o proyectos',
  'Preparación de informes', 'Estudio o formación', 'Captación comercial', 'Gestión interna', 'Otro',
];

const HOURLY_RATES = [
  { label: '$15.000', value: 15_000 },
  { label: '$25.000', value: 25_000 },
  { label: '$40.000', value: 40_000 },
  { label: '$60.000', value: 60_000 },
];

const AUTO_PCTS = [
  { label: '15%', value: 0.15 },
  { label: '25%', value: 0.25 },
  { label: '40%', value: 0.40 },
  { label: '60%', value: 0.60 },
];

const IMPL_COST_PER_PERSON = 280_000;
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
) {
  const recs: string[] = [];
  if (process === 'Generación de documentos' || process === 'Preparación de informes') recs.push('documentacion');
  if (process === 'Gestión de clientes' || process === 'Seguimiento de causas o proyectos' || process === 'Gestión interna') recs.push('dashboard');
  if (autoPct >= 0.4 && hours >= 10) recs.push('workflows');
  if (orgType === 'Estudio jurídico' || orgType === 'Empresa' || orgType === 'Abogado/a independiente') {
    if (!recs.includes('documentacion')) recs.push('iusmachina');
  }
  if (teamSize >= 5 && !recs.includes('capacitacion')) recs.push('capacitacion');
  if (recs.length < 2) recs.push('ia_aplicada');

  return recs.slice(0, 3).map(id => {
    const area = OPPORTUNITY_AREAS[id as keyof typeof OPPORTUNITY_AREAS];
    return { id, label: area.label, desc: area.description, textClass: area.textClass, borderClass: area.borderClass, bgClass: area.bgClass };
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
  const [showBenchmark, setShowBenchmark] = useState(false);

  const effectiveRate = customRate
    ? parseInt(customRate.replace(/\D/g, ''), 10) || hourlyRate
    : hourlyRate;

  const sim = useMemo(() => {
    const hSemanaTeam = teamSize * hours * autoPct;
    const hMesTeam = hSemanaTeam * 4;
    const hAnualTeam = hSemanaTeam * 48;
    const valAnual = hAnualTeam * effectiveRate;
    const valMes = valAnual / 12;

    const hiddenHoursAnual = teamSize * WEEKLY_ADMIN_LOSS_HOURS * 48;
    const hiddenCostAnual = hiddenHoursAnual * effectiveRate;

    const implCostAnual = teamSize * IMPL_COST_PER_PERSON;
    const netBenefit = valAnual - implCostAnual;
    const roi = implCostAnual > 0 ? Math.round((netBenefit / implCostAnual) * 100) : 0;
    const paybackMonths = valAnual > 0 ? parseFloat((implCostAnual / (valAnual / 12)).toFixed(1)) : 0;

    const manualWeekly = teamSize * hours;
    const remainingWeekly = manualWeekly * (1 - autoPct);

    return { hSemanaTeam, hMesTeam, hAnualTeam, valAnual, valMes, hiddenCostAnual, implCostAnual, netBenefit, roi, paybackMonths, manualWeekly, remainingWeekly };
  }, [hours, teamSize, autoPct, effectiveRate]);

  const recommendations = useMemo(
    () => getRecommendations(process, orgType, hours, autoPct, teamSize),
    [process, orgType, hours, autoPct, teamSize],
  );

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section id="simulador" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">

        <SectionHeader
          index="07"
          eyebrow="Simulador ROI · experimento del lab"
          title="Calcula el costo oculto del trabajo manual."
          sub="Mueve los parámetros y mira en tiempo real cuánto vale —en horas y en pesos— el proceso que hoy haces a mano."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="panel-raised rounded-2xl overflow-hidden"
        >
          {/* Console chrome */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--line-soft)] bg-[oklch(0.13_0.023_255/0.85)]">
            <div className="flex items-center gap-2.5">
              <Calculator className="w-3.5 h-3.5 text-[oklch(0.72_0.16_285)]" />
              <span className="text-[11px] mono text-zinc-400 tracking-wide">roi-simulator</span>
              <span className="hidden sm:inline text-[10px] mono text-zinc-700">· cálculo en vivo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="status-dot bg-[oklch(0.72_0.16_285)]" />
              <span className="text-[9px] mono text-zinc-500 uppercase">live</span>
            </div>
          </div>

          {/* Diagnostic banner */}
          {diagResult && (
            <div className="px-6 py-3 bg-[oklch(0.78_0.13_205/0.07)] border-b border-[oklch(0.78_0.13_205/0.2)] flex items-center gap-2">
              <ScanLine className="w-3.5 h-3.5 text-[oklch(0.82_0.12_205)] shrink-0" />
              <span className="text-xs text-[oklch(0.84_0.11_205)] font-medium">
                Scanner completado — score {diagResult.compatibility}/100 · {diagResult.level} · madurez {diagResult.maturityLabel}
              </span>
            </div>
          )}

          <div className="grid lg:grid-cols-[400px_1fr]">

            {/* ── Left: input panel ── */}
            <div className="p-6 sm:p-7 space-y-6 border-b lg:border-b-0 lg:border-r border-[var(--line-soft)] bg-[oklch(0.125_0.022_255/0.5)]">
              <div className="eyebrow text-zinc-600">Parámetros del proceso</div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Tipo de organización</label>
                  <select value={orgType} onChange={e => setOrgType(e.target.value)} className="input-tech appearance-none">
                    <option value="">Seleccionar…</option>
                    {ORG_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Proceso principal</label>
                  <select value={process} onChange={e => setProcess(e.target.value)} className="input-tech appearance-none">
                    <option value="">Seleccionar…</option>
                    {PROCESSES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3 h-3 opacity-60" /> Profesionales
                    </span>
                    <span className="text-[oklch(0.72_0.16_285)] mono font-bold">{teamSize}</span>
                  </label>
                  <input
                    type="range" min={1} max={50} step={1}
                    value={teamSize}
                    onChange={e => setTeamSize(Number(e.target.value))}
                    className="w-full accent-[#8b7cf6]"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-700 mono">
                    <span>1</span><span>25</span><span>50</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 flex items-center justify-between">
                    <span>Horas semanales en el proceso</span>
                    <span className="text-[oklch(0.82_0.12_205)] mono font-bold">{hours}h</span>
                  </label>
                  <input
                    type="range" min={1} max={40} step={1}
                    value={hours}
                    onChange={e => setHours(Number(e.target.value))}
                    className="w-full accent-[#22c8e6]"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-700 mono">
                    <span>1h</span><span>20h</span><span>40h</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Porcentaje automatizable</label>
                  <div className="grid grid-cols-4 gap-2">
                    {AUTO_PCTS.map(({ label, value }) => (
                      <button
                        key={label}
                        onClick={() => setAutoPct(value)}
                        className={`py-2 rounded-lg border text-xs font-bold mono transition-all ${
                          autoPct === value
                            ? 'border-[oklch(0.78_0.13_205/0.55)] bg-[oklch(0.78_0.13_205/0.12)] text-[oklch(0.86_0.09_205)]'
                            : 'border-[var(--line-soft)] bg-white/[0.02] text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Valor hora profesional (CLP)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {HOURLY_RATES.map(({ label, value }) => (
                      <button
                        key={label}
                        onClick={() => { setHourlyRate(value); setCustomRate(''); }}
                        className={`py-2 rounded-lg border text-xs font-bold mono transition-all ${
                          hourlyRate === value && !customRate
                            ? 'border-[oklch(0.62_0.19_285/0.55)] bg-[oklch(0.62_0.19_285/0.12)] text-[oklch(0.78_0.13_285)]'
                            : 'border-[var(--line-soft)] bg-white/[0.02] text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Valor personalizado…"
                    value={customRate}
                    onChange={e => setCustomRate(e.target.value)}
                    className="input-tech mono text-xs!"
                  />
                </div>
              </div>
            </div>

            {/* ── Right: results dashboard ── */}
            <div className="p-6 sm:p-8 space-y-6">

              {/* Hero metric */}
              <div className="rounded-xl border border-[oklch(0.78_0.13_205/0.3)] bg-[oklch(0.78_0.13_205/0.05)] p-5 relative overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 85% 20%, oklch(0.78 0.13 205 / 0.1) 0%, transparent 55%)' }}
                />
                <div className="eyebrow text-[oklch(0.82_0.12_205)]">Ahorro anual estimado</div>
                <div className="text-4xl sm:text-5xl font-black mono tracking-tight text-white mt-2">
                  {fmt(sim.valAnual)}
                </div>
                <div className="text-[12px] text-zinc-500 mt-1.5 mono">
                  {sim.hAnualTeam.toFixed(0)} horas/año recuperadas · equipo de {teamSize}
                </div>
              </div>

              {/* Metric grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { icon: Clock, label: 'Horas ahorradas / mes', value: `${sim.hMesTeam.toFixed(0)} h`, tone: 'text-[oklch(0.82_0.12_205)]' },
                  { icon: Wallet, label: 'Ahorro mensual', value: fmt(sim.valMes), tone: 'text-[oklch(0.78_0.13_162)]' },
                  { icon: Percent, label: 'Automatizable', value: `${Math.round(autoPct * 100)}%`, tone: 'text-[oklch(0.72_0.16_285)]' },
                  { icon: CalendarRange, label: 'Recuperación inversión', value: `${sim.paybackMonths} meses`, tone: 'text-[oklch(0.84_0.1_85)]' },
                ].map(({ icon: Icon, label, value, tone }) => (
                  <div key={label} className="rounded-xl border border-[var(--line-soft)] bg-white/[0.02] p-3.5">
                    <Icon className={`w-3.5 h-3.5 ${tone}`} strokeWidth={1.8} />
                    <div className={`text-base lg:text-lg font-black mono mt-2 ${tone}`}>{value}</div>
                    <div className="text-[10px] text-zinc-600 mt-0.5 leading-snug">{label}</div>
                  </div>
                ))}
              </div>

              {/* Before / after */}
              <div className="rounded-xl border border-[var(--line-soft)] bg-white/[0.02] p-5 space-y-4">
                <div className="eyebrow text-zinc-600">Antes / después · horas semanales del equipo</div>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] mono">
                      <span className="text-zinc-500">Hoy (manual)</span>
                      <span className="text-[oklch(0.74_0.15_18)]">{sim.manualWeekly.toFixed(0)} h/sem</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/[0.05] overflow-hidden">
                      <motion.div
                        animate={{ width: '100%' }}
                        className="h-full rounded-full bg-[oklch(0.66_0.19_18/0.55)]"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] mono">
                      <span className="text-zinc-500">Con automatización</span>
                      <span className="text-[oklch(0.78_0.13_162)]">{sim.remainingWeekly.toFixed(0)} h/sem</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/[0.05] overflow-hidden">
                      <motion.div
                        animate={{ width: `${Math.max(4, (1 - autoPct) * 100)}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full rounded-full bg-[oklch(0.74_0.14_165/0.7)]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-[10.5px] mono text-zinc-600 pt-1">
                  <span>ROI proyectado: <span className="text-[oklch(0.72_0.16_285)] font-bold">{sim.roi.toLocaleString('es-CL')}%</span></span>
                  <span>Costo oculto admin/año: <span className="text-[oklch(0.8_0.13_75)] font-bold">{fmt(sim.hiddenCostAnual)}</span></span>
                  <span>Beneficio neto/año: <span className="text-[oklch(0.78_0.13_162)] font-bold">{fmt(Math.max(0, sim.netBenefit))}</span></span>
                </div>
              </div>

              {/* Benchmark collapse */}
              <div className="rounded-xl border border-[oklch(0.62_0.19_285/0.3)] bg-[oklch(0.62_0.19_285/0.05)] overflow-hidden">
                <button
                  onClick={() => setShowBenchmark(v => !v)}
                  className="w-full flex items-center justify-between px-5 py-3.5"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[oklch(0.72_0.16_285)]" />
                    <span className="text-xs font-semibold text-[oklch(0.78_0.13_285)]">Comparar con benchmark del sector</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-[oklch(0.72_0.16_285)] transition-transform ${showBenchmark ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showBenchmark && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-3">
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          Referencia documentada (Lemontech 2026): firma de {ROI_BENCHMARK.study_team_size} abogados a USD {ROI_BENCHMARK.study_hourly_rate_usd}/hora con time-tracking y automatización.
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: 'ROI benchmark', value: `${ROI_BENCHMARK.benchmark_roi_pct.toLocaleString('es-CL')}%` },
                            { label: 'Payback', value: `${ROI_BENCHMARK.benchmark_payback_months} meses` },
                            { label: 'Inversión anual', value: `USD ${ROI_BENCHMARK.annual_license_usd}/prof.` },
                          ].map(({ label, value }) => (
                            <div key={label} className="rounded-lg border border-[var(--line-soft)] bg-white/[0.02] p-3 text-center">
                              <div className="text-sm font-black mono text-[oklch(0.78_0.13_285)]">{value}</div>
                              <div className="text-[9px] text-zinc-600 mt-0.5">{label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div className="space-y-2.5">
                  <div className="eyebrow text-zinc-600">Soluciones sugeridas para este perfil</div>
                  <div className="grid sm:grid-cols-3 gap-2.5">
                    {recommendations.map(({ id, label, desc, textClass, borderClass, bgClass }) => (
                      <div key={id} className={`rounded-xl border p-3.5 space-y-1 ${borderClass} ${bgClass}`}>
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

              {/* Disclaimer + CTA */}
              <p className="text-[11px] text-zinc-700 leading-relaxed italic">
                Simulación referencial; no reemplaza un diagnóstico técnico. Implementación estimada en {fmt(IMPL_COST_PER_PERSON)}/profesional/año. Fuentes: Lemontech · Webdox CLM · Fortune Business Insights (2026).
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button onClick={() => scrollTo('contacto')} className="btn-primary flex-1">
                  Solicitar diagnóstico con estos datos <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setHours(8); setTeamSize(1); setAutoPct(0.25); setHourlyRate(25_000); setCustomRate(''); }}
                  className="btn-secondary"
                >
                  <Undo2 className="w-4 h-4" /> Reiniciar
                </button>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
