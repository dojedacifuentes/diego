'use client';
import { useEffect, useRef } from 'react';

/**
 * Sophisticated cursor lighting for a premium legal-tech lab feel.
 * - A soft cyan/violet spotlight follows the cursor over the background.
 * - A second masked grid layer subtly brightens the technical grid nearby.
 * - Delegated pointer tracking sets per-card --x/--y so card borders glow
 *   toward the cursor (see .card-surface-hover::after in globals.css).
 * Only runs on fine pointers (desktop); respects reduced motion.
 */
export function CursorFX() {
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let card: HTMLElement | null = null;
    let cardRect: DOMRect | null = null;

    const apply = () => {
      raf = 0;
      const x = `${mx}px`;
      const y = `${my}px`;
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(520px circle at ${x} ${y}, oklch(0.78 0.13 205 / 0.06), oklch(0.62 0.19 285 / 0.04) 30%, transparent 60%)`;
      }
      if (gridRef.current) {
        const mask = `radial-gradient(240px circle at ${x} ${y}, black, transparent 72%)`;
        gridRef.current.style.webkitMaskImage = mask;
        gridRef.current.style.maskImage = mask;
      }
      if (card && cardRect) {
        card.style.setProperty('--x', `${mx - cardRect.left}px`);
        card.style.setProperty('--y', `${my - cardRect.top}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const next = (e.target as HTMLElement)?.closest?.('.card-surface-hover') as HTMLElement | null;
      if (next !== card) {
        card = next;
        cardRect = card ? card.getBoundingClientRect() : null;
      } else if (card) {
        cardRect = card.getBoundingClientRect();
      }
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Soft spotlight over the background (below content, above grid bg) */}
      <div ref={glowRef} className="fixed inset-0 z-[1] pointer-events-none" style={{ mixBlendMode: 'screen' }} aria-hidden />
      {/* Grid brightened near the cursor */}
      <div
        ref={gridRef}
        className="fixed inset-0 z-[1] pointer-events-none grid-bg"
        style={{ opacity: 0.5, WebkitMaskImage: 'radial-gradient(0px circle at 50% 50%, black, transparent)', maskImage: 'radial-gradient(0px circle at 50% 50%, black, transparent)' }}
        aria-hidden
      />
    </>
  );
}
