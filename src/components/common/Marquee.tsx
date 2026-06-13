'use client';
import { DiogenesLamp } from '@/components/common/DiogenesLamp';

const ITEMS = [
  'Transparencia algorítmica',
  'Filosofía del Derecho',
  'Prompt Engineering',
  'Automatización documental',
  'Dashboards jurídicos',
  'EdTech jurídica',
  'Flujos multi-IA',
  'Claude & LLMs',
  'Diseño de plataformas',
  'Crítica del poder digital',
];

function Row() {
  return (
    <div className="marquee-track items-center gap-8 pr-8">
      {ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-8 shrink-0">
          <span className="text-[13px] mono uppercase tracking-[0.14em] text-zinc-500 whitespace-nowrap">
            {item}
          </span>
          <DiogenesLamp className="w-3.5 h-3.5 text-[oklch(0.78_0.13_205/0.5)] shrink-0" />
        </span>
      ))}
    </div>
  );
}

/**
 * Infinite credibility ticker. Two identical tracks scroll as one
 * continuous loop (translateX -50%). Edge-masked, reduced-motion safe.
 */
export function Marquee() {
  return (
    <div className="relative border-y border-[var(--line-soft)] bg-[oklch(0.12_0.021_255/0.5)] py-4 overflow-hidden">
      <div className="marquee-mask flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  );
}
