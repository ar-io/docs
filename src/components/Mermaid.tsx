'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
  id?: string;
}

// The ar.io palette (ar.io/brand-kit): lavender nodes with primary borders on
// light, translucent nodes with lavender borders on deep dark. Node roles
// (`class X dg-strong | dg-soft | dg-muted | dg-dashed`) are coloured in
// global.css, because Mermaid's classDef cannot take CSS variables.
const THEME = {
  light: {
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
    actorLineColor: '#5427C8',
    signalColor: '#23232D',
    signalTextColor: '#23232D',
    labelBoxBkgColor: '#f1ecff',
    labelBoxBorderColor: '#5427C8',
    loopTextColor: '#23232D',
  },
  dark: {
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
    actorLineColor: '#D4C6FF',
    signalColor: '#D4C6FF',
    signalTextColor: '#FFFFFF',
    labelBoxBkgColor: '#1f1838',
    labelBoxBorderColor: '#D4C6FF',
    loopTextColor: '#FFFFFF',
  },
};

// Below this scale a diagram's 16px labels drop under ~10px.
const MIN_SCALE = 0.65;

const DIRECTION = /^(\s*(?:graph|flowchart)\s+)(LR|RL|TB|TD|BT)\b/m;
const FLIP: Record<string, string> = { LR: 'TB', RL: 'TB', TB: 'LR', TD: 'LR', BT: 'LR' };

// `accTitle:` is the diagram's one-line point. Mermaid puts it in the svg's
// <title> for screen readers; it is also shown as the visible caption.
const ACC_TITLE = /^\s*accTitle\s*:\s*(.+)$/m;

let counter = 0;

async function render(chart: string): Promise<{ svg: string; width: number }> {
  const { svg } = await mermaid.render(`mermaid-${++counter}`, chart);
  const width = Number(/viewBox="[\d.-]+ [\d.-]+ ([\d.]+)/.exec(svg)?.[1] ?? 0);
  return { svg, width };
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const caption = ACC_TITLE.exec(chart)?.[1].trim();

  useEffect(() => {
    let cancelled = false;
    const el = ref.current;
    if (!el) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: resolvedTheme === 'dark' ? THEME.dark : THEME.light,
      securityLevel: 'loose',
      fontFamily: 'inherit',
      // Wrap long messages instead of pushing participants apart, so a
      // sequence diagram fits the column rather than scrolling.
      sequence: { wrap: true },
    });

    (async () => {
      const available = el.clientWidth || 800;
      let best = await render(chart);

      // A flowchart too wide for the column is redrawn in the other
      // direction (the brand kit's "stacked rendition" rule) when that keeps
      // the labels larger. Sequence diagrams cannot reflow; they scroll.
      const dir = DIRECTION.exec(chart);
      if (dir && best.width * MIN_SCALE > available) {
        const flipped = await render(chart.replace(DIRECTION, `$1${FLIP[dir[2]]}`));
        if (flipped.width < best.width) best = flipped;
      }
      if (cancelled) return;

      el.innerHTML = best.svg;
      const svg = el.querySelector('svg');
      if (!svg) return;
      svg.setAttribute('role', 'img');
      // Keep text legible: never shrink below MIN_SCALE; the frame scrolls.
      const minWidth = Math.round(best.width * MIN_SCALE);
      if (minWidth > available) {
        svg.style.maxWidth = 'none';
        svg.style.width = `${minWidth}px`;
      }
    })().catch((error) => {
      console.error('Mermaid render failed', error);
    });

    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme]);

  return (
    <figure className="not-prose my-6">
      <div className="overflow-x-auto">
        <div ref={ref} className="mermaid-diagram flex min-w-fit justify-center [&_svg]:h-auto" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-fd-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
