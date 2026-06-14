'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Command, Search, CornerDownLeft, User, FolderGit2, Eye, Route as RouteIcon,
  ScanLine, Calculator, GraduationCap, MessageCircle, Mail, Copy, ArrowUpRight, Send,
} from 'lucide-react';

type Cmd = {
  id: string;
  label: string;
  group: 'Navegar' | 'Herramientas' | 'Contacto';
  icon: React.ComponentType<{ className?: string }>;
  keywords?: string;
  run: (ctx: CmdCtx) => void;
};

type CmdCtx = {
  router: ReturnType<typeof useRouter>;
  pathname: string;
  go: (anchor: string) => void;
  close: () => void;
};

const WA = `https://wa.me/56934301930?text=${encodeURIComponent('Hola Diego, vengo desde diegoojeda.cl.')}`;
const EMAIL = 'dojedacifuentes@gmail.com';

const COMMANDS: Cmd[] = [
  { id: 'perfil', group: 'Navegar', icon: User, label: 'Perfil', run: c => c.go('perfil') },
  { id: 'lab', group: 'Navegar', icon: FolderGit2, label: 'Proyectos · Diógenes Lab', keywords: 'portafolio', run: c => c.go('lab') },
  { id: 'investigacion', group: 'Navegar', icon: Eye, label: 'Investigación · transparencia algorítmica', run: c => c.go('investigacion') },
  { id: 'trayectoria', group: 'Navegar', icon: RouteIcon, label: 'Trayectoria', run: c => c.go('trayectoria') },
  { id: 'contacto', group: 'Navegar', icon: Send, label: 'Contacto', run: c => c.go('contacto') },

  { id: 'scanner', group: 'Herramientas', icon: ScanLine, label: 'AI Readiness Scanner', keywords: 'diagnostico ia evaluar', run: c => { c.router.push('/diagnostico'); c.close(); } },
  { id: 'roi', group: 'Herramientas', icon: Calculator, label: 'Simulador ROI', keywords: 'ahorro costo', run: c => { c.router.push('/diagnostico#simulador'); c.close(); } },
  { id: 'taller', group: 'Herramientas', icon: GraduationCap, label: 'Talleres de IA jurídica', keywords: 'capacitacion curso', run: c => { c.router.push('/capacitacion'); c.close(); } },

  { id: 'wa', group: 'Contacto', icon: MessageCircle, label: 'Escribir por WhatsApp', run: c => { window.open(WA, '_blank'); c.close(); } },
  { id: 'mail', group: 'Contacto', icon: Mail, label: 'Enviar correo', run: c => { window.location.href = `mailto:${EMAIL}`; c.close(); } },
  { id: 'copy', group: 'Contacto', icon: Copy, label: 'Copiar correo', keywords: 'email', run: c => { navigator.clipboard?.writeText(EMAIL); c.close(); } },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const go = (anchor: string) => {
    setOpen(false);
    if (pathname === '/') {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push(`/#${anchor}`);
    }
  };
  const ctx: CmdCtx = { router, pathname, go, close: () => setOpen(false) };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter(c =>
      (c.label + ' ' + (c.keywords ?? '') + ' ' + c.group).toLowerCase().includes(q),
    );
  }, [query]);

  // Toggle with ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { setActive(0); }, [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    if (e.key === 'Enter') { e.preventDefault(); filtered[active]?.run(ctx); }
  };

  const groups = ['Navegar', 'Herramientas', 'Contacto'] as const;
  let flatIndex = -1;

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[80] hidden md:inline-flex items-center gap-2 rounded-xl glass-panel border border-[var(--line-mid)] px-3.5 py-2.5 text-[12px] mono text-zinc-400 hover:text-zinc-100 hover:border-[oklch(0.78_0.13_205/0.4)] transition-all group"
        aria-label="Abrir paleta de comandos"
      >
        <Command className="w-3.5 h-3.5 text-[oklch(0.82_0.12_205)]" />
        <span>comandos</span>
        <kbd className="ml-1 rounded-md border border-[var(--line-mid)] bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-zinc-500 group-hover:text-zinc-300">⌘K</kbd>
      </button>

      {/* Mobile launcher (icon only) */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[80] md:hidden w-11 h-11 rounded-xl glass-panel border border-[var(--line-mid)] flex items-center justify-center text-[oklch(0.82_0.12_205)]"
        aria-label="Abrir paleta de comandos"
      >
        <Command className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="fixed left-1/2 top-[12vh] z-[95] w-[92vw] max-w-lg -translate-x-1/2"
              onKeyDown={onListKey}
            >
              <div className="panel-raised rounded-2xl overflow-hidden corner-frame">
                {/* Search */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--line-soft)]">
                  <Search className="w-4 h-4 text-zinc-500 shrink-0" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Buscar sección, herramienta o contacto…"
                    className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
                  />
                  <kbd className="rounded-md border border-[var(--line-mid)] bg-white/[0.03] px-1.5 py-0.5 text-[10px] mono text-zinc-500">esc</kbd>
                </div>

                {/* Results */}
                <div className="max-h-[52vh] overflow-y-auto py-2">
                  {filtered.length === 0 && (
                    <div className="px-4 py-8 text-center text-sm text-zinc-600 mono">sin resultados</div>
                  )}
                  {groups.map(group => {
                    const items = filtered.filter(c => c.group === group);
                    if (items.length === 0) return null;
                    return (
                      <div key={group} className="px-2 pb-1">
                        <div className="px-2 py-1.5 eyebrow text-zinc-700">{group}</div>
                        {items.map(item => {
                          flatIndex += 1;
                          const idx = flatIndex;
                          const isActive = idx === active;
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onMouseEnter={() => setActive(idx)}
                              onClick={() => item.run(ctx)}
                              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-left transition-colors ${
                                isActive ? 'bg-[oklch(0.78_0.13_205/0.1)]' : ''
                              }`}
                            >
                              <span className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 ${
                                isActive ? 'border-[oklch(0.78_0.13_205/0.4)] bg-[oklch(0.78_0.13_205/0.08)]' : 'border-[var(--line-soft)] bg-white/[0.02]'
                              }`}>
                                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[oklch(0.84_0.11_205)]' : 'text-zinc-500'}`} />
                              </span>
                              <span className={`flex-1 text-[13px] ${isActive ? 'text-white' : 'text-zinc-400'}`}>{item.label}</span>
                              {isActive && <CornerDownLeft className="w-3.5 h-3.5 text-zinc-600" />}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--line-soft)] bg-[oklch(0.12_0.022_255/0.5)]">
                  <span className="flex items-center gap-2 text-[10px] mono text-zinc-600">
                    <ArrowUpRight className="w-3 h-3 text-[oklch(0.78_0.13_162)]" /> diego ojeda · command palette
                  </span>
                  <span className="flex items-center gap-2 text-[10px] mono text-zinc-600">
                    <kbd className="rounded border border-[var(--line-mid)] px-1">↑↓</kbd> navegar
                    <kbd className="rounded border border-[var(--line-mid)] px-1">↵</kbd> abrir
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
