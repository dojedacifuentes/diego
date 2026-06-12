'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navItems = [
  { href: '#perfil', label: 'Perfil', type: 'anchor' },
  { href: '#investigacion', label: 'Investigación', type: 'anchor' },
  { href: '#docencia', label: 'Docencia', type: 'anchor' },
  { href: '#lab', label: 'Diógenes Lab', type: 'anchor' },
  { href: '#evaluacion', label: 'Diagnóstico IA', type: 'anchor' },
  { href: '#servicios', label: 'Servicios', type: 'anchor' },
  { href: '#contacto', label: 'Contacto', type: 'anchor' },
];

/* DO/ — digital signature monogram */
function LogoMark() {
  return (
    <div className="relative h-9 px-2.5 rounded-[9px] border border-[oklch(0.78_0.13_205/0.4)] bg-gradient-to-br from-[oklch(0.78_0.13_205/0.14)] to-[oklch(0.62_0.19_285/0.1)] flex items-center justify-center">
      <span className="mono text-[13px] font-bold tracking-tight text-[oklch(0.86_0.1_205)] leading-none">
        DO<span className="text-[oklch(0.62_0.19_285)]">/</span>
      </span>
      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[oklch(0.74_0.14_165)] border border-[oklch(0.115_0.022_255)]" />
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (href: string, type: string) => {
    setMenuOpen(false);
    if (type === 'route') {
      router.push(href);
    } else {
      const id = href.replace('#', '');
      if (pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        router.push('/' + href);
      }
    }
  };

  const handleCTA = () => {
    setMenuOpen(false);
    if (pathname === '/') {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push('/#contacto');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-panel border-x-0 border-t-0 border-b border-[var(--line-soft)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Identity */}
          <button
            onClick={() => handleNav('/', 'route')}
            className="flex items-center gap-3 shrink-0 group"
          >
            <LogoMark />
            <div className="text-left leading-none">
              <div className="text-[15px] font-bold tracking-tight text-white">
                Diego Ojeda
              </div>
              <div className="text-[9px] mono uppercase tracking-[0.2em] text-zinc-500 mt-1">
                Derecho · IA · Filosofía
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 px-1.5 py-1.5 rounded-xl border border-[var(--line-soft)] bg-[oklch(0.13_0.022_255/0.5)] backdrop-blur-md">
            {navItems.map(({ href, label, type }) => {
              const isActive = type === 'route' && pathname === href;
              return (
                <button
                  key={href}
                  onClick={() => handleNav(href, type)}
                  className={`px-3 py-1.5 text-[12.5px] rounded-lg transition-all ${
                    isActive
                      ? 'text-[oklch(0.84_0.11_205)] bg-[oklch(0.78_0.13_205/0.1)]'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCTA}
              className="hidden md:inline-flex btn-primary px-4! py-2! text-[13px]!"
            >
              Trabajemos juntos
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="lg:hidden w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-zinc-200 rounded-lg border border-[var(--line-soft)] bg-white/[0.02] transition-colors"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-16 z-50 lg:hidden glass-panel border-x-0 border-t-0 border-b border-[var(--line-mid)]"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navItems.map(({ href, label, type }) => {
                  const isActive = type === 'route' && pathname === href;
                  return (
                    <button
                      key={href}
                      onClick={() => handleNav(href, type)}
                      className={`w-full text-left px-4 py-3 text-sm rounded-lg transition-all flex items-center justify-between ${
                        isActive
                          ? 'text-[oklch(0.84_0.11_205)] bg-[oklch(0.78_0.13_205/0.1)]'
                          : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {label}
                      <span className="text-[10px] mono text-zinc-600">{href.replace('#', '/')}</span>
                    </button>
                  );
                })}
                <div className="pt-3 pb-1">
                  <button onClick={handleCTA} className="btn-primary w-full">
                    Trabajemos juntos
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
