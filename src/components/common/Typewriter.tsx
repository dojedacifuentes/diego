'use client';
import { useEffect, useState } from 'react';

interface TypewriterProps {
  /** sequential lines; each types out, then the next begins */
  lines: string[];
  className?: string;
  speed?: number;       // ms per char
  startDelay?: number;  // ms before typing begins
  lineDelay?: number;   // ms pause between lines
  caret?: boolean;
  onDone?: () => void;
}

/**
 * Types out lines character-by-character with a blinking caret.
 * Used for the hero boot sequence — the "living terminal" feel.
 */
export function Typewriter({
  lines,
  className = '',
  speed = 38,
  startDelay = 350,
  lineDelay = 420,
  caret = true,
  onDone,
}: TypewriterProps) {
  const [rendered, setRendered] = useState<string[]>(lines.map(() => ''));
  const [active, setActive] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    async function run() {
      await wait(startDelay);
      for (let li = 0; li < lines.length; li++) {
        if (cancelled) return;
        setActive(li);
        const full = lines[li];
        for (let ci = 1; ci <= full.length; ci++) {
          if (cancelled) return;
          setRendered(prev => {
            const next = [...prev];
            next[li] = full.slice(0, ci);
            return next;
          });
          await wait(speed);
        }
        await wait(lineDelay);
      }
      if (!cancelled) {
        setDone(true);
        onDone?.();
      }
    }

    function wait(ms: number) {
      return new Promise<void>(res => {
        const t = setTimeout(res, ms);
        timers.push(t);
      });
    }

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      {rendered.map((line, i) => {
        const isLast = i === lines.length - 1;
        const showCaret = caret && (done ? isLast : i === active);
        return (
          <div key={i} className={showCaret ? 'caret' : ''}>
            {line || ' '}
          </div>
        );
      })}
    </div>
  );
}
