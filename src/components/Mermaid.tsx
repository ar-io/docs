'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
  id?: string;
}

export default function Mermaid({ chart, id }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: resolvedTheme === 'dark' ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit',
      themeCSS: 'margin: 1.5rem auto 0;',
    });

    if (ref.current) {
      const chartId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      mermaid.render(chartId, chart).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg;
        }
      });
    }
    }, [chart, id, resolvedTheme]);

  return <div ref={ref} className="flex justify-center my-6" />;
}
