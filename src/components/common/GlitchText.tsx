'use client';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  /** auto-fire the glitch in bursts (in addition to hover) */
  live?: boolean;
  as?: 'span' | 'div';
}

/**
 * Chromatic-split glitch text. Clean at rest; jitters on hover.
 * With `live`, it fires short random bursts so the page feels alive
 * without the glitch running constantly (which would read as broken).
 */
export function GlitchText({ text, className = '', live = false, as = 'span' }: GlitchTextProps) {
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (!live) return;
    let timeout: ReturnType<typeof setTimeout>;
    const loop = () => {
      // idle 2.5–6s, then glitch for ~280ms
      const idle = 2500 + Math.random() * 3500;
      timeout = setTimeout(() => {
        setBurst(true);
        timeout = setTimeout(() => {
          setBurst(false);
          loop();
        }, 280);
      }, idle);
    };
    loop();
    return () => clearTimeout(timeout);
  }, [live]);

  const Tag = as;
  return (
    <Tag
      className={`glitch ${burst ? 'glitch-live' : ''} ${className}`}
      data-text={text}
    >
      {text}
    </Tag>
  );
}
