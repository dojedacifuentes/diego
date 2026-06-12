import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AIEvaluationSection } from '@/components/sections/AIEvaluationSection';
import { SavingsSimulator } from '@/components/sections/SavingsSimulator';
import { SolutionsSection } from '@/components/sections/SolutionsSection';
import { MethodSection } from '@/components/sections/MethodSection';
import { BenchmarkSection } from '@/components/sections/BenchmarkSection';

export const metadata: Metadata = {
  title: 'Diagnóstico IA · Diego Ojeda',
  description:
    'AI Readiness Scanner, simulador de ROI, servicios, método de trabajo y benchmark LegalTech. Evalúa qué parte de tu proceso puede ordenarse, automatizarse o potenciarse con IA.',
};

export default function DiagnosticoPage() {
  return (
    <div className="pt-24">
      {/* Route header */}
      <header className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[12px] mono text-zinc-500 hover:text-[oklch(0.82_0.12_205)] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> volver a diegoojeda.cl
        </Link>
        <div className="flex items-center gap-3">
          <span className="eyebrow text-[oklch(0.78_0.13_205)]">diógenes lab</span>
          <span className="h-px w-8 bg-[var(--line-strong)]" />
          <span className="eyebrow text-zinc-500">herramientas en vivo</span>
        </div>
        <h1 className="serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.08] tracking-tight text-gradient-light mt-4 max-w-2xl">
          Diagnóstico, ROI y método de trabajo.
        </h1>
        <p className="text-[15px] text-zinc-400 leading-relaxed mt-4 max-w-2xl">
          Tres experimentos del lab y la forma en que construyo: evalúa tu proceso,
          calcula el costo del trabajo manual y mira cómo paso del diagnóstico al sistema.
        </p>
      </header>

      <AIEvaluationSection />
      <SavingsSimulator />
      <SolutionsSection />
      <MethodSection />
      <BenchmarkSection />
    </div>
  );
}
