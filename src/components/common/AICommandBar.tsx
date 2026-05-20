'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { Zap, Calculator, MessageSquare, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useDiagnostic } from '@/store/diagnosticContext';

const LEVEL_COLORS: Record<string, string> = {
  strategic: 'text-violet-400',
  high: 'text-cyan-400',
  good: 'text-indigo-400',
  initial: 'text-zinc-400',
};
const MATURITY_COLORS: Record<string, string> = {
  estrategico: 'text-violet-400',
  operativo: 'text-indigo-400',
  explorador: 'text-cyan-400',
  inicial: 'text-zinc-400',
};

function OrbIcon() {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-dashed border-cyan-500/50"
      />
      {/* Inner pulse */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.3, 0.8] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="w-2.5 h-2.5 rounded-full bg-cyan-400"
      />
    </div>
  );
}

export function AICommandBar() {
  const { result } = useDiagnostic();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navigate = (anchor: string) => {
    if (pathname === '/') {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push(`/#${anchor}`);
    }
  };

  const actions = [
    {
      icon: Zap,
      label: 'Evaluar compatibilidad IA',
      sublabel: 'Diagnóstico en 8 pasos',
      onClick: () => navigate('evaluacion'),
      color: 'text-cyan-400 hover:bg-cyan-500/10',
      dot: !result,
    },
    {
      icon: Calculator,
      label: 'Simular ahorro',
      sublabel: 'ROI y payback estimados',
      onClick: () => navigate('simulador'),
      color: 'text-indigo-400 hover:bg-indigo-500/10',
      dot: false,
    },
    {
      icon: MessageSquare,
      label: 'Contactar',
      sublabel: 'WhatsApp o correo',
      onClick: () => navigate('contacto'),
      color: 'text-emerald-400 hover:bg-emerald-500/10',
      dot: false,
    },
  ];

  return (
    <>
      {/* ── Desktop floating panel ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.5, ease: 'easeOut' }}
        className="hidden lg:flex fixed bottom-6 right-6 z-[100] flex-col"
        style={{ width: 220 }}
      >
        <div className="rounded-2xl border border-white/[0.09] bg-[oklch(0.09_0.018_250/0.97)] backdrop-blur-2xl shadow-2xl overflow-hidden">

          {/* Header with orb */}
          <button
            onClick={() => setCollapsed(v => !v)}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-white/[0.04] transition-colors group"
          >
            <OrbIcon />
            <span className="flex-1 text-left text-[11px] font-semibold text-zinc-300 tracking-tight">
              Sistema activo
            </span>
            {collapsed
              ? <ChevronDown className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              : <ChevronUp className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            }
          </button>

          {/* Actions */}
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-white/[0.06]"
              >
                <div className="py-1">
                  {actions.map(({ icon: Icon, label, sublabel, onClick, color, dot }) => (
                    <button
                      key={label}
                      onClick={onClick}
                      className={`relative w-full flex items-center gap-2.5 px-3.5 py-2.5 transition-colors group ${color}`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <div className="text-left">
                        <div className="text-[11px] font-semibold leading-none">{label}</div>
                        <div className="text-[10px] text-zinc-600 mt-0.5 leading-none">{sublabel}</div>
                      </div>
                      {dot && (
                        <motion.div
                          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute top-2 right-3 w-1.5 h-1.5 rounded-full bg-cyan-400"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Persistent result strip */}
                {result && (
                  <div className="border-t border-white/[0.06] px-3.5 py-2.5 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <div className={`text-sm font-black mono ${LEVEL_COLORS[result.levelKey]}`}>
                        {result.compatibility}%
                      </div>
                      <div className={`text-[10px] font-semibold ${LEVEL_COLORS[result.levelKey]}`}>
                        {result.level}
                      </div>
                    </div>
                    <div className="text-[10px] text-zinc-500 leading-snug">
                      Madurez: <span className={`font-semibold ${MATURITY_COLORS[result.maturityKey]}`}>{result.maturityLabel}</span>
                      {' · '}{result.serviceLabel.split(' ')[0]}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed result indicator */}
          {collapsed && result && (
            <div className="border-t border-white/[0.06] px-3.5 py-1.5 flex items-center gap-1.5">
              <div className={`text-xs font-black mono ${LEVEL_COLORS[result.levelKey]}`}>
                {result.compatibility}%
              </div>
              <div className="text-[10px] text-zinc-600 truncate">{result.level}</div>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Mobile bottom navigation ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        className="lg:hidden fixed bottom-0 inset-x-0 z-[100]"
      >
        {/* Result chip (above bar) */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mx-4 mb-1 px-3 py-1.5 rounded-xl bg-[oklch(0.09_0.018_250/0.97)] backdrop-blur-xl border border-white/[0.08] flex items-center gap-2"
            >
              <OrbIcon />
              <span className={`text-xs font-bold mono ${LEVEL_COLORS[result.levelKey]}`}>
                {result.compatibility}%
              </span>
              <span className={`text-[10px] ${LEVEL_COLORS[result.levelKey]}`}>{result.level}</span>
              <span className="text-[10px] text-zinc-600 ml-auto">{result.maturityLabel}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab bar */}
        <div className="border-t border-white/[0.07] bg-[oklch(0.07_0.015_250/0.98)] backdrop-blur-xl">
          <div className="flex">
            {actions.map(({ icon: Icon, label, onClick, color, dot }) => {
              const shortLabel = label.split(' ')[0];
              return (
                <button
                  key={label}
                  onClick={onClick}
                  className={`relative flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${color}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-medium leading-none">{shortLabel}</span>
                  {dot && (
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute top-2 right-1/2 translate-x-3 w-1.5 h-1.5 rounded-full bg-cyan-400"
                    />
                  )}
                </button>
              );
            })}
          </div>
          {/* iOS safe area */}
          <div className="h-safe-bottom" style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
        </div>
      </motion.div>
    </>
  );
}
