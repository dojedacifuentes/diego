'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, RotateCcw, Copy, MessageCircle, ArrowRight,
  CheckCheck, ScanLine, Radar as RadarIcon, Gauge, AlertTriangle, Target, ArrowUpRight,
} from 'lucide-react';
import { WIZARD_QUESTIONS, buildResult, type WizardAnswers, type DiagnosticResult } from '@/data/wizard';
import { useDiagnostic } from '@/store/diagnosticContext';
import { SectionHeader } from '@/components/common/SectionHeader';

const WA_NUMBER = '56934301930';
const TOTAL_STEPS = WIZARD_QUESTIONS.length;

type Phase = 'intro' | 'quiz' | 'result';

const levelConfig = {
  initial:   { color: 'text-zinc-300', ring: 'oklch(0.7 0.02 245)' },
  good:      { color: 'text-[oklch(0.72_0.16_285)]', ring: 'oklch(0.66 0.18 285)' },
  high:      { color: 'text-[oklch(0.82_0.12_205)]', ring: 'oklch(0.78 0.13 205)' },
  strategic: { color: 'text-[oklch(0.84_0.1_85)]', ring: 'oklch(0.8 0.11 85)' },
};

/* ── Radar chart (SVG, 6 axes) ─────────────────────────────────── */
function RadarChart({ data, animate = true }: { data: { label: string; value: number }[]; animate?: boolean }) {
  const cx = 110, cy = 100, R = 72;
  const N = data.length;
  const angle = (i: number) => (Math.PI * 2 * i) / N - Math.PI / 2;
  const pt = (i: number, r: number) => [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))];

  const rings = [0.33, 0.66, 1];
  const valuePoints = data.map((d, i) => pt(i, (d.value / 100) * R));
  const polygon = valuePoints.map(p => p.join(',')).join(' ');

  return (
    <svg viewBox="0 0 220 210" className="w-full max-w-[280px] mx-auto" aria-hidden>
      {/* Grid rings */}
      {rings.map(f => (
        <polygon
          key={f}
          points={data.map((_, i) => pt(i, R * f).join(',')).join(' ')}
          fill="none"
          stroke="oklch(0.99 0.005 240 / 0.08)"
          strokeWidth="1"
        />
      ))}
      {/* Axes */}
      {data.map((_, i) => {
        const [x, y] = pt(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="oklch(0.99 0.005 240 / 0.06)" strokeWidth="1" />;
      })}
      {/* Value polygon */}
      <motion.polygon
        initial={animate ? { opacity: 0, scale: 0.6 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        points={polygon}
        fill="oklch(0.78 0.13 205 / 0.14)"
        stroke="oklch(0.78 0.13 205 / 0.8)"
        strokeWidth="1.5"
      />
      {/* Value dots */}
      {valuePoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="oklch(0.82 0.12 205)" />
      ))}
      {/* Labels */}
      {data.map((d, i) => {
        const [x, y] = pt(i, R + 17);
        return (
          <text
            key={d.label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="mono"
            style={{ fontSize: '7.5px', fill: 'oklch(0.62 0.015 245)', letterSpacing: '0.05em' }}
          >
            {d.label.toUpperCase()}
          </text>
        );
      })}
    </svg>
  );
}

/* ── Score ring ────────────────────────────────────────────────── */
function ScoreRing({ value, ring }: { value: number; ring: string }) {
  const r = 15.9155;
  const dash = (value / 100) * 100;
  return (
    <div className="relative w-32 h-32 mx-auto shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r={r} fill="none" stroke="oklch(0.99 0.005 240 / 0.08)" strokeWidth="2" />
        <motion.circle
          cx="18" cy="18" r={r} fill="none"
          stroke={ring}
          strokeWidth="2.2" strokeLinecap="round"
          initial={{ strokeDasharray: '0 100' }}
          animate={{ strokeDasharray: `${dash} ${100 - dash}` }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 6px ${ring})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white leading-none mono">{value}</span>
        <span className="text-[9px] text-zinc-500 mono mt-1 tracking-wider">SCORE /100</span>
      </div>
    </div>
  );
}

/* ── Strategic analysis readout — status bars + risk/opportunity
   tags + connected nodes, with reading micro-animations. ─────────── */
function tagFor(v: number) {
  if (v >= 66) return { label: 'OPORTUNIDAD', color: 'oklch(0.82 0.12 205)', dim: 'oklch(0.78 0.13 205 / 0.12)', bd: 'oklch(0.78 0.13 205 / 0.35)' };
  if (v >= 42) return { label: 'POTENCIAL', color: 'oklch(0.74 0.15 285)', dim: 'oklch(0.62 0.19 285 / 0.12)', bd: 'oklch(0.62 0.19 285 / 0.35)' };
  return { label: 'BRECHA', color: 'oklch(0.8 0.13 75)', dim: 'oklch(0.78 0.14 75 / 0.12)', bd: 'oklch(0.78 0.14 75 / 0.32)' };
}

function NodeMatrix({ data }: { data: { label: string; value: number }[] }) {
  const cx = 90, cy = 90, R = 64;
  const N = data.length;
  const angle = (i: number) => (Math.PI * 2 * i) / N - Math.PI / 2;
  const pt = (i: number, r: number) => [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))] as const;
  const topIdx = data.reduce((best, d, i) => (d.value > data[best].value ? i : best), 0);

  return (
    <svg viewBox="0 0 180 180" className="w-full max-w-[200px] mx-auto" aria-hidden>
      {/* edges core → node */}
      {data.map((d, i) => {
        const [x, y] = pt(i, R);
        const active = i === topIdx;
        return (
          <line
            key={`e${i}`}
            x1={cx} y1={cy} x2={x} y2={y}
            stroke={active ? 'oklch(0.78 0.13 205 / 0.6)' : 'oklch(0.99 0.005 240 / 0.1)'}
            strokeWidth="1"
            strokeDasharray="3 5"
            style={{ animation: `dash-flow ${active ? 2 : 3.4}s linear infinite` }}
          />
        );
      })}
      {/* nodes */}
      {data.map((d, i) => {
        const [x, y] = pt(i, R);
        const active = i === topIdx;
        const rad = 3 + (d.value / 100) * 4;
        return (
          <g key={`n${i}`}>
            <motion.circle
              cx={x} cy={y} r={rad + 5}
              fill={active ? 'oklch(0.78 0.13 205 / 0.12)' : 'oklch(0.99 0.005 240 / 0.03)'}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.08 }}
            />
            <motion.circle
              cx={x} cy={y} r={rad}
              fill={active ? 'oklch(0.84 0.12 205)' : 'oklch(0.55 0.04 245)'}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 260, damping: 16 }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
            {active && (
              <circle cx={x} cy={y} r={rad}>
                <animate attributeName="r" values={`${rad};${rad + 7};${rad}`} dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2.2s" repeatCount="indefinite" />
                <set attributeName="fill" to="oklch(0.84 0.12 205)" />
              </circle>
            )}
          </g>
        );
      })}
      {/* core */}
      <circle cx={cx} cy={cy} r="6" fill="oklch(0.16 0.025 255)" stroke="oklch(0.78 0.13 205 / 0.6)" strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r="2" fill="oklch(0.84 0.12 205)" />
    </svg>
  );
}

function AnalysisReadout({ result }: { result: DiagnosticResult }) {
  return (
    <div className="panel-deep rounded-2xl overflow-hidden scanline">
      {/* Panel header — reading status */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--line-soft)] bg-[oklch(0.13_0.023_255/0.7)]">
        <div className="flex items-center gap-2.5">
          <RadarIcon className="w-3.5 h-3.5 text-[oklch(0.82_0.12_205)]" />
          <span className="text-[11px] mono text-zinc-400 tracking-wide">matriz de análisis · 6 ejes</span>
        </div>
        <span className="flex items-center gap-1.5">
          <span className="status-dot bg-[oklch(0.74_0.14_165)]" />
          <span className="text-[9px] mono text-zinc-500 uppercase">lectura completa</span>
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
        {/* Status bars with risk/opportunity tags */}
        <div className="p-5 sm:p-6 space-y-3 lg:border-r border-[var(--line-soft)]">
          {result.radar.map((axis, i) => {
            const t = tagFor(axis.value);
            return (
              <motion.div
                key={axis.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.09, duration: 0.4 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11.5px] mono text-zinc-400 tracking-wide">{axis.label}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] mono font-bold" style={{ color: t.color }}>
                      {axis.value}
                    </span>
                    <span
                      className="text-[8.5px] mono tracking-[0.12em] px-1.5 py-0.5 rounded border"
                      style={{ color: t.color, background: t.dim, borderColor: t.bd }}
                    >
                      {t.label}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-[oklch(0.99_0.005_240/0.05)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${axis.value}%` }}
                    transition={{ delay: 0.3 + i * 0.09, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${t.color} / 0.5, ${t.color})`, backgroundColor: t.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Connected nodes */}
        <div className="p-5 flex flex-col items-center justify-center gap-2 bg-[oklch(0.125_0.022_255/0.4)]">
          <NodeMatrix data={result.radar} />
          <p className="text-[10px] mono text-zinc-600 text-center leading-relaxed">
            nodo activo: eje de mayor<br />potencial detectado
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Scanner shell chrome ──────────────────────────────────────── */
function ScannerChrome({ phase, step }: { phase: Phase; step: number }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--line-soft)] bg-[oklch(0.13_0.023_255/0.85)]">
      <div className="flex items-center gap-2.5">
        <ScanLine className="w-3.5 h-3.5 text-[oklch(0.82_0.12_205)]" />
        <span className="text-[11px] mono text-zinc-400 tracking-wide">ai-readiness-scanner</span>
        <span className="hidden sm:inline text-[10px] mono text-zinc-700">v2.0</span>
      </div>
      <div className="flex items-center gap-3">
        {phase === 'quiz' && (
          <span className="text-[10px] mono text-zinc-500">
            módulo {step + 1}/{TOTAL_STEPS}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <span className={`status-dot ${phase === 'result' ? 'bg-[oklch(0.74_0.14_165)]' : 'bg-[oklch(0.78_0.13_205)]'}`} />
          <span className="text-[9px] mono text-zinc-500 uppercase">
            {phase === 'intro' ? 'standby' : phase === 'quiz' ? 'scanning' : 'completado'}
          </span>
        </span>
      </div>
    </div>
  );
}

export function AIEvaluationSection() {
  const { setResult } = useDiagnostic();
  const [phase, setPhase] = useState<Phase>('intro');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [result, setLocalResult] = useState<DiagnosticResult | null>(null);
  const [copied, setCopied] = useState(false);

  const currentQuestion = WIZARD_QUESTIONS[step];

  function handleSingle(questionId: string, optionId: string) {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);
    if (step < TOTAL_STEPS - 1) setStep(s => s + 1);
    else finishWizard(newAnswers);
  }

  function handleMultiToggle(questionId: string, optionId: string) {
    const current = (answers[questionId] as string[] | undefined) ?? [];
    const next = current.includes(optionId)
      ? current.filter(id => id !== optionId)
      : [...current, optionId];
    setAnswers(a => ({ ...a, [questionId]: next }));
  }

  function handleMultiContinue() {
    if (step < TOTAL_STEPS - 1) setStep(s => s + 1);
    else finishWizard(answers);
  }

  function finishWizard(finalAnswers: WizardAnswers) {
    const r = buildResult(finalAnswers);
    setLocalResult(r);
    setResult(r);
    setPhase('result');
  }

  function handleBack() {
    if (step > 0) setStep(s => s - 1);
    else setPhase('intro');
  }

  function handleRestart() {
    setPhase('intro');
    setStep(0);
    setAnswers({});
    setLocalResult(null);
  }

  function buildWAUrl() {
    if (!result) return '#';
    const text = encodeURIComponent(
      `Hola, quiero solicitar un diagnóstico para mi proceso.\n\nResultado AI Readiness Scanner:\n- Score: ${result.compatibility}/100\n- Nivel: ${result.level}\n- Madurez digital: ${result.maturityLabel}\n- Perfil: ${result.profile}\n- Oportunidad detectada: ${result.serviceLabel}\n- Horas semanales estimadas: ${result.weeklyHours}\n\nMe gustaría evaluar una solución para ordenar, automatizar o potenciar mi proceso.`
    );
    return `https://wa.me/${WA_NUMBER}?text=${text}`;
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(
      `AI Readiness Scanner — Diego Ojeda · Diógenes Lab\nScore: ${result.compatibility}/100\nNivel: ${result.level}\nMadurez digital: ${result.maturityLabel}\nRiesgo operativo: ${result.riskLabel}\nOportunidad: ${result.serviceLabel}\nHoras semanales: ${result.weeklyHours}\n\n${result.message}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const multiSelected = currentQuestion?.type === 'multi'
    ? ((answers[currentQuestion?.id] as string[] | undefined) ?? [])
    : [];

  const INTRO_RADAR = [
    { label: 'Automatización', value: 80 },
    { label: 'Flujos IA', value: 62 },
    { label: 'Plataformas', value: 70 },
    { label: 'LegalTech', value: 55 },
    { label: 'Capacitación', value: 45 },
    { label: 'Seguridad', value: 65 },
  ];

  return (
    <section id="evaluacion" className="py-24 lg:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 lg:px-8 space-y-10">

        <SectionHeader
          index="06"
          eyebrow="AI Readiness Scanner · experimento del lab"
          title="Evalúa qué partes de tu flujo pueden ser automatizadas."
          sub="Ocho preguntas. Un score de preparación, tu nivel de madurez digital y la oportunidad concreta detectada en tu proceso."
          align="center"
        />

        {/* Scanner system card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="panel-raised rounded-2xl overflow-hidden scanline corner-frame"
        >
          <ScannerChrome phase={phase} step={step} />

          {/* Progress bar */}
          <div className="h-[3px] bg-[oklch(0.99_0.005_240/0.05)]">
            <motion.div
              className="h-full"
              style={{ background: 'linear-gradient(90deg, oklch(0.78 0.13 205), oklch(0.62 0.19 285))' }}
              animate={{
                width: phase === 'intro' ? '0%' : phase === 'result' ? '100%' : `${((step + 1) / TOTAL_STEPS) * 100}%`,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <AnimatePresence mode="wait">

            {/* ─── INTRO ─── */}
            {phase === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="grid lg:grid-cols-[1.1fr_0.9fr]"
              >
                <div className="p-7 sm:p-9 space-y-6">
                  <div className="space-y-2.5">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Escáner de preparación para IA
                    </h3>
                    <p className="text-[13.5px] text-zinc-400 leading-relaxed">
                      Evalúa qué partes de tu flujo profesional pueden ser ordenadas,
                      automatizadas o potenciadas con IA. Sin registro, sin correo, en 3 minutos.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="eyebrow text-zinc-600">El resultado incluye</div>
                    {[
                      { icon: Gauge, label: 'Nivel de madurez digital' },
                      { icon: Target, label: 'Oportunidad detectada en tu proceso' },
                      { icon: AlertTriangle, label: 'Riesgo operativo actual' },
                      { icon: RadarIcon, label: 'Potencial de automatización por eje' },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3 rounded-lg border border-[var(--line-soft)] bg-white/[0.015] px-3.5 py-2.5">
                        <Icon className="w-4 h-4 text-[oklch(0.82_0.12_205)] shrink-0" strokeWidth={1.8} />
                        <span className="text-[13px] text-zinc-300">{label}</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => setPhase('quiz')} className="btn-primary w-full sm:w-auto">
                    <ScanLine className="w-4 h-4" />
                    Iniciar diagnóstico
                  </button>
                </div>

                <div className="relative border-t lg:border-t-0 lg:border-l border-[var(--line-soft)] bg-[oklch(0.125_0.022_255/0.5)] p-7 flex flex-col items-center justify-center gap-3">
                  <div className="eyebrow text-zinc-600">Matriz de ejemplo</div>
                  <RadarChart data={INTRO_RADAR} animate={false} />
                  <p className="text-[10.5px] mono text-zinc-600 text-center">
                    6 ejes evaluados · normalizado 0–100
                  </p>
                </div>
              </motion.div>
            )}

            {/* ─── QUIZ ─── */}
            {phase === 'quiz' && (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="p-7 sm:p-9 space-y-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mono"
                  >
                    <ChevronLeft className="w-4 h-4" /> atrás
                  </button>
                  <div className="flex gap-1.5">
                    {WIZARD_QUESTIONS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i < step ? 'w-5 bg-[oklch(0.78_0.13_205/0.55)]' :
                          i === step ? 'w-7 bg-[oklch(0.82_0.12_205)]' :
                          'w-2.5 bg-[oklch(0.99_0.005_240/0.1)]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
                    {currentQuestion.title}
                  </h3>
                  {currentQuestion.subtitle && (
                    <p className="text-xs text-zinc-500 mono">{currentQuestion.subtitle}</p>
                  )}
                </div>

                <div className={`grid gap-2.5 ${
                  currentQuestion.options.length <= 4
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {currentQuestion.options.map(option => {
                    const isSelected = currentQuestion.type === 'multi'
                      ? multiSelected.includes(option.id)
                      : answers[currentQuestion.id] === option.id;

                    return (
                      <button
                        key={option.id}
                        onClick={() =>
                          currentQuestion.type === 'multi'
                            ? handleMultiToggle(currentQuestion.id, option.id)
                            : handleSingle(currentQuestion.id, option.id)
                        }
                        className={`w-full text-left px-4 py-3 rounded-xl border text-[13.5px] font-medium transition-all duration-200 ${
                          isSelected
                            ? 'border-[oklch(0.78_0.13_205/0.55)] bg-[oklch(0.78_0.13_205/0.1)] text-[oklch(0.88_0.08_205)] shadow-[0_0_16px_oklch(0.78_0.13_205/0.12)]'
                            : 'border-[var(--line-soft)] bg-white/[0.02] text-zinc-400 hover:text-zinc-100 hover:border-[var(--line-strong)] hover:bg-white/[0.04]'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                {currentQuestion.type === 'multi' && (
                  <button
                    onClick={handleMultiContinue}
                    disabled={multiSelected.length === 0}
                    className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:filter-none"
                  >
                    Continuar <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            )}

            {/* ─── RESULT ─── */}
            {phase === 'result' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="p-7 sm:p-9 space-y-7"
              >
                {/* Score + radar */}
                <div className="grid sm:grid-cols-[auto_1fr_auto] gap-7 items-center">
                  <ScoreRing value={result.compatibility} ring={levelConfig[result.levelKey].ring} />

                  <div className="space-y-3 text-center sm:text-left">
                    <div className={`eyebrow ${levelConfig[result.levelKey].color}`}>
                      {result.level}
                    </div>
                    <h3 className="text-2xl font-black text-white leading-tight tracking-tight">
                      Potencial de automatización: {result.compatibility}%
                    </h3>
                    <p className="text-[13px] text-zinc-400 leading-relaxed max-w-md">
                      {result.message}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      <span className="badge-tech">{result.profile}</span>
                      <span className="badge-tech">{result.weeklyHours}</span>
                    </div>
                  </div>

                  <div className="hidden lg:block w-[230px]">
                    <RadarChart data={result.radar} />
                  </div>
                </div>

                {/* Strategic analysis panel — status bars, risk/opportunity, nodes */}
                <AnalysisReadout result={result} />

                {/* Diagnostic readout row */}
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { icon: Gauge, label: 'Madurez digital', value: result.maturityLabel, tone: 'oklch(0.82 0.12 205)' },
                    { icon: AlertTriangle, label: 'Riesgo operativo', value: result.riskLabel, tone: 'oklch(0.8 0.13 75)' },
                    { icon: Target, label: 'Prioridad declarada', value: result.priority, tone: 'oklch(0.74 0.15 285)' },
                  ].map(({ icon: Icon, label, value, tone }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                      className="rounded-xl border border-[var(--line-soft)] bg-white/[0.02] p-4 space-y-2 relative overflow-hidden"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5" style={{ color: tone }} strokeWidth={1.8} />
                        <span className="text-[10px] mono uppercase tracking-wider text-zinc-600">{label}</span>
                      </div>
                      <div className="text-[13px] font-semibold text-zinc-200 leading-snug">{value}</div>
                      {/* reading bar */}
                      <div className="h-0.5 rounded-full bg-[oklch(0.99_0.005_240/0.05)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: 0.6 + i * 0.1, duration: 1, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: tone, opacity: 0.6 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recommended next step */}
                <div className="rounded-xl border border-[oklch(0.78_0.13_205/0.3)] bg-[oklch(0.78_0.13_205/0.05)] p-5 space-y-2">
                  <div className="eyebrow text-[oklch(0.82_0.12_205)]">Próximo paso recomendado</div>
                  <div className="text-base font-bold text-white">{result.serviceLabel}</div>
                  <p className="text-[12.5px] text-zinc-400 leading-relaxed">{result.serviceDescription}</p>
                  <p className="text-[11.5px] text-zinc-500 leading-relaxed border-t border-[var(--line-soft)] pt-2.5 mt-2.5">
                    <span className="mono text-zinc-600">BENEFICIO →</span> {result.serviceBenefit}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button onClick={() => scrollTo('contacto')} className="btn-primary flex-1">
                    Solicitar diagnóstico
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <a
                    href={buildWAUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-[oklch(0.78_0.14_165)]! border-[oklch(0.74_0.14_165/0.3)]! hover:bg-[oklch(0.74_0.14_165/0.08)]!"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enviar por WhatsApp
                  </a>
                  <button onClick={handleCopy} className="btn-secondary">
                    {copied ? <CheckCheck className="w-4 h-4 text-[oklch(0.82_0.12_205)]" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copiado' : 'Copiar'}
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 items-center border-t border-[var(--line-soft)] pt-4">
                  <button
                    onClick={() => scrollTo('simulador')}
                    className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-[oklch(0.82_0.12_205)] transition-colors mono"
                  >
                    calcular ROI con estos datos <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors ml-auto mono"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> reiniciar scanner
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
