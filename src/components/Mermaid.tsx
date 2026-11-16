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
    const dark = resolvedTheme === 'dark';
    mermaid.initialize({
      startOnLoad: true,
      // The ar.io palette (ar.io/brand-kit): lavender nodes with primary
      // borders on light, translucent nodes with lavender borders on deep dark.
      theme: 'base',
      themeVariables: dark
        ? {
            background: '#0e0a1c',
            primaryColor: '#1f1838',
            primaryBorderColor: '#D4C6FF',
            primaryTextColor: '#FFFFFF',
            secondaryColor: '#2a2147',
            tertiaryColor: '#16112a',
            lineColor: '#D4C6FF',
            textColor: '#FFFFFF',
            edgeLabelBackground: '#0e0a1c',
            clusterBkg: '#16112a',
            clusterBorder: 'rgba(255,255,255,0.12)',
            noteBkgColor: '#1f1838',
            noteBorderColor: '#D4C6FF',
            noteTextColor: '#FFFFFF',
            actorBkg: '#1f1838',
            actorBorder: '#D4C6FF',
            actorTextColor: '#FFFFFF',
            signalColor: '#D4C6FF',
            signalTextColor: '#FFFFFF',
          }
        : {
            background: '#FFFFFF',
            primaryColor: '#f1ecff',
            primaryBorderColor: '#5427C8',
            primaryTextColor: '#23232D',
            secondaryColor: '#DFD6F7',
            tertiaryColor: '#F6F4EF',
            lineColor: '#5427C8',
            textColor: '#23232D',
            edgeLabelBackground: '#FFFFFF',
            clusterBkg: '#F6F4EF',
            clusterBorder: '#E6E4EF',
            noteBkgColor: '#F6F4EF',
            noteBorderColor: '#E6E4EF',
            noteTextColor: '#23232D',
            actorBkg: '#f1ecff',
            actorBorder: '#5427C8',
            actorTextColor: '#23232D',
            signalColor: '#23232D',
            signalTextColor: '#23232D',
          },
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
