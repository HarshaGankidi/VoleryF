'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { easing } from '@/lib/tokens';
import { cn } from '@/lib/cn';

interface Layer {
  id: string;
  index: number;
  caption: string;
  body: string;
  tag: string;
  calibrated: string;
}

const layers: Layer[] = [
  {
    id: 'surface',
    index: 1,
    caption: 'What you see',
    tag: 'Gmail · Slack · Affinity · Notion',
    body: 'The surfaces your partners already work in. Volery never asks you to leave them.',
    calibrated: 'Calibrated 2026.01.18',
  },
  {
    id: 'signals',
    index: 2,
    caption: 'The signals',
    tag: 'Emails · Calendar · Updates',
    body: 'Every message, every meeting, every founder note — read once, indexed, kept quiet.',
    calibrated: 'Calibrated 2026.02.04',
  },
  {
    id: 'intelligence',
    index: 3,
    caption: 'The Volery intelligence',
    tag: 'Pattern · Memory · Conviction',
    body: 'A graph of connections drawn between specimens, founders, sectors, your past decisions.',
    calibrated: 'Calibrated 2026.02.22',
  },
  {
    id: 'conviction',
    index: 4,
    caption: 'Your conviction',
    tag: 'The surface beneath the surface',
    body: 'The quiet place where judgment finally happens. The conclusion that everything else has been preparing for.',
    calibrated: 'Calibrated 2026.03.04',
  },
];

// Hand-drawn-feeling inbox rows (slight angle variation on each row)
function SurfaceIllustration() {
  return (
    <svg viewBox="0 0 320 110" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 12 + i * 16;
        const dot = 16 + (i % 2 === 0 ? 0 : 1);
        const wobble = ((i * 17) % 5) / 10;
        return (
          <g key={i} style={{ transform: `translateY(${wobble}px)` }}>
            <circle
              cx={dot}
              cy={y}
              r="2.4"
              fill="none"
              stroke="rgba(240,232,214,0.55)"
              strokeWidth="0.7"
            />
            <line
              x1={26}
              y1={y}
              x2={26 + (200 - i * 12)}
              y2={y + (i % 2 === 0 ? 0.4 : -0.4)}
              stroke="rgba(240,232,214,0.35)"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
            <text
              x={300}
              y={y + 1.5}
              textAnchor="end"
              fontFamily="var(--font-jetbrains), monospace"
              fontSize="5"
              fill="rgba(240,232,214,0.55)"
              style={{ letterSpacing: '0.18em' }}
            >
              {String(9 - i).padStart(2, '0')}:{String((40 - i * 7 + 60) % 60).padStart(2, '0')}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Hand-drawn dot constellation with arc connections (round caps, slight noise)
function SignalsIllustration() {
  const points = Array.from({ length: 28 }).map((_, i) => {
    const a = (i * 137.508 * Math.PI) / 180;
    const r = 12 + ((i * 991) % 100) / 4;
    const jitter = ((i * 73) % 17) / 25 - 0.34;
    return {
      x: 160 + Math.cos(a) * r + jitter * 4,
      y: 55 + Math.sin(a) * r * 0.62 + jitter * 3,
      r: 0.85 + ((i * 41) % 100) / 240,
    };
  });
  return (
    <svg viewBox="0 0 320 110" className="h-full w-full">
      {points.map((p, i) =>
        i > 0 && i % 4 === 0 ? (
          <path
            key={`l-${i}`}
            d={`M ${p.x} ${p.y} Q ${(p.x + points[i - 1].x) / 2} ${
              (p.y + points[i - 1].y) / 2 - 2
            } ${points[i - 1].x} ${points[i - 1].y}`}
            fill="none"
            stroke="rgba(240,232,214,0.18)"
            strokeWidth="0.4"
            strokeLinecap="round"
          />
        ) : null,
      )}
      {points.map((p, i) => (
        <circle
          key={`p-${i}`}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill={i % 7 === 0 ? '#E8DDB8' : 'rgba(240,232,214,0.55)'}
        />
      ))}
    </svg>
  );
}

// Knowledge-graph plate with hand-drawn curved arcs and small italic labels
function IntelligenceIllustration() {
  const nodes = [
    { x: 50,  y: 38, r: 2.6, l: 'AI' },
    { x: 110, y: 22, r: 2.0, l: 'Infra' },
    { x: 196, y: 28, r: 2.4, l: 'Conviction' },
    { x: 256, y: 42, r: 1.9, l: 'Founder' },
    { x: 70,  y: 78, r: 1.7, l: 'Thesis' },
    { x: 160, y: 64, r: 3.0, l: 'Halcyon' },
    { x: 230, y: 82, r: 1.8, l: 'Series B' },
    { x: 280, y: 70, r: 1.6, l: 'Top 5%' },
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 2], [5, 6], [3, 7], [6, 7], [1, 5],
  ];
  return (
    <svg viewBox="0 0 320 110" className="h-full w-full">
      {edges.map(([a, b], i) => {
        const na = nodes[a];
        const nb = nodes[b];
        const mx = (na.x + nb.x) / 2;
        const my = (na.y + nb.y) / 2 - 4 - (i % 3);
        return (
          <path
            key={i}
            d={`M ${na.x} ${na.y} Q ${mx} ${my} ${nb.x} ${nb.y}`}
            fill="none"
            stroke="rgba(232,221,184,0.65)"
            strokeWidth="0.55"
            strokeLinecap="round"
          />
        );
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r + 1.4} fill="none" stroke="rgba(232,221,184,0.30)" strokeWidth="0.4" />
          <circle cx={n.x} cy={n.y} r={n.r} fill="#E8DDB8" />
          <text
            x={n.x + n.r + 2.6}
            y={n.y + 1.2}
            fontSize="5"
            fontFamily="var(--font-cormorant), Georgia, serif"
            fontStyle="italic"
            fill="rgba(240,232,214,0.75)"
          >
            {n.l}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Destination plate — the conviction reading
function ConvictionIllustration() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-7 px-6">
      <div className="text-right">
        <p className="font-mono text-[8.5px] uppercase tracking-eyebrow text-pewter">Specimen</p>
        <p className="font-serif text-[18px] italic text-pearl">Halcyon Labs</p>
      </div>
      <div className="relative grid h-[78px] w-[78px] place-items-center rounded-full border border-champagne/50 bg-obsidian/95 shadow-[0_2px_18px_rgba(232,221,184,0.22)]">
        <span className="absolute -top-[6px] left-1/2 h-[6px] w-[1px] -translate-x-1/2 bg-champagne/65" />
        <span className="font-serif text-[32px] leading-none text-champagne">91</span>
        <span className="absolute -bottom-[12px] font-mono text-[7.5px] uppercase tracking-eyebrow text-pewter">
          Conviction
        </span>
      </div>
      <div className="text-left">
        <p className="font-mono text-[8.5px] uppercase tracking-eyebrow text-pewter">Recommendation</p>
        <p className="font-serif text-[18px] italic text-champagne">Lead Series B</p>
      </div>
    </div>
  );
}

const ILLUSTRATIONS: Record<string, () => JSX.Element> = {
  surface: SurfaceIllustration,
  signals: SignalsIllustration,
  intelligence: IntelligenceIllustration,
  conviction: ConvictionIllustration,
};

export function LayerStack() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-20% 0% -20% 0%' });
  const [hovered, setHovered] = useState<number | null>(null);

  // Parallax: layers shift a few px relative to scroll progress through the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <section id="stack" className="relative bg-sapphire/90 py-32 text-pearl sapphire-grain">
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[420px_1fr]">
          <div>
            <Eyebrow ornaments>The layer stack</Eyebrow>
            <SectionHeading className="mt-5">
              Volery does not replace your stack.{' '}
              <span className="italic text-champagne">It sits beneath it.</span>
            </SectionHeading>
            <p className="mt-7 max-w-[380px] text-[15px] leading-[1.55] text-pewter">
              An exploded view of one quiet instrument. Four laminated surfaces between
              your inbox and your conviction. Hover any layer to read its margin note.
            </p>

            <div className="mt-12 flex flex-col gap-0">
              {layers.map((layer, idx) => {
                const isActive = hovered === idx;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onMouseEnter={() => setHovered(idx)}
                    onFocus={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                    onBlur={() => setHovered(null)}
                    className="grid grid-cols-[42px_1fr] items-baseline gap-4 border-t border-pearl/10 py-5 text-left last:border-b last:border-pearl/10"
                  >
                    <span
                      className={cn(
                        'font-mono text-[10px] uppercase tracking-eyebrow transition-colors',
                        isActive ? 'text-champagne' : 'text-pewter',
                      )}
                    >
                      0{layer.index}
                    </span>
                    <span>
                      <span
                        className={cn(
                          'block font-serif text-[22px] italic leading-tight transition-colors',
                          isActive ? 'text-champagne' : 'text-pearl',
                        )}
                      >
                        {layer.caption}
                      </span>
                      <span className="mt-[2px] block font-mono text-[9.5px] uppercase tracking-eyebrow text-pewter">
                        {layer.tag}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            ref={sectionRef}
            className="relative mx-auto h-[760px] w-full max-w-[680px]"
            style={{ perspective: '1800px' }}
            onMouseLeave={() => setHovered(null)}
          >
            <motion.div
              className="relative h-full w-full"
              style={{ transformStyle: 'preserve-3d', y: parallaxY }}
            >
              {layers.map((layer, idx) => {
                const Illustration = ILLUSTRATIONS[layer.id];
                const baseY = -270 + idx * 175;
                const isActive = hovered === idx;
                const isFaded = hovered !== null && !isActive;

                return (
                  <motion.div
                    key={layer.id}
                    onMouseEnter={() => setHovered(idx)}
                    initial={{ y: 0, opacity: 0 }}
                    animate={inView ? { y: baseY, opacity: 1 } : { y: 0, opacity: 0 }}
                    transition={{
                      duration: 1.3,
                      ease: easing.arrival,
                      delay: 0.12 * idx,
                    }}
                    style={{
                      transform: `rotateX(-19deg) translateZ(${idx * -16}px)`,
                      transformStyle: 'preserve-3d',
                    }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <motion.div
                      animate={{
                        opacity: isFaded ? 0.30 : 1,
                        y: isActive ? -10 : 0,
                        scale: isActive ? 1.012 : 1,
                      }}
                      transition={{ duration: 0.45, ease: easing.interactive }}
                      className={cn(
                        'group relative h-[180px] w-[540px] rounded-md border bg-obsidian',
                        isActive
                          ? 'border-champagne/60 shadow-[inset_0_1px_0_rgba(240,232,214,0.06),0_0_0_1px_rgba(232,221,184,0.18),0_50px_80px_-20px_rgba(0,0,0,0.75)]'
                          : 'border-pearl/15 shadow-[inset_0_1px_0_rgba(240,232,214,0.04),0_0_0_1px_rgba(240,232,214,0.06),0_36px_60px_-22px_rgba(0,0,0,0.65),0_8px_24px_-8px_rgba(0,0,0,0.5)]',
                      )}
                    >
                      {/* Subtle inner page-tone shading */}
                      <div
                        aria-hidden
                        className="absolute inset-[2px] rounded-sm opacity-60"
                        style={{
                          background:
                            'radial-gradient(ellipse at top left, rgba(240,232,214,0.05), transparent 70%)',
                        }}
                      />

                      {/* Corner ticks like a CAD drawing */}
                      <span className="absolute -left-1 -top-1 h-2 w-2 border-l border-t border-pearl/30" />
                      <span className="absolute -right-1 -top-1 h-2 w-2 border-r border-t border-pearl/30" />
                      <span className="absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-pearl/30" />
                      <span className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-pearl/30" />

                      {/* Top label band */}
                      <div className="absolute inset-x-5 top-3 flex items-baseline justify-between">
                        <p className="font-mono text-[8.5px] uppercase tracking-eyebrow text-pewter">
                          Plate 0{layer.index} &middot; {layer.tag}
                        </p>
                        <p
                          className={cn(
                            'font-mono text-[8.5px] uppercase tracking-eyebrow transition-colors',
                            isActive ? 'text-champagne' : 'text-pewter',
                          )}
                        >
                          {layer.caption}
                        </p>
                      </div>

                      {/* Illustration body */}
                      <div className="absolute inset-x-3 top-9 bottom-9 overflow-hidden rounded-sm bg-sapphire-deep/55">
                        <Illustration />
                      </div>

                      {/* Bottom margin annotation — calibration date in Persimmon italic */}
                      <div className="absolute inset-x-5 bottom-2 flex items-baseline justify-between">
                        <p className="font-mono text-[8px] uppercase tracking-eyebrow text-pewter/70">
                          Volery instrument no. 4
                        </p>
                        <p
                          className={cn(
                            'font-mono text-[8px] italic uppercase tracking-eyebrow transition-colors',
                            isActive ? 'text-champagne' : 'text-pewter/70',
                          )}
                        >
                          {layer.calibrated}
                        </p>
                      </div>
                    </motion.div>

                    {/* Margin note to the right */}
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                      transition={{ duration: 0.4, ease: easing.interactive }}
                      className="pointer-events-none absolute left-full top-[18px] ml-8 w-[240px]"
                      style={{ transform: 'rotateX(19deg)' }}
                    >
                      <p className="font-mono text-[9px] uppercase tracking-eyebrow text-champagne">
                        Margin note
                      </p>
                      <p className="mt-2 font-serif text-[15px] italic leading-[1.45] text-pearl">
                        {layer.body}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* vertical scale rule on the left, with z-marks */}
            <div
              aria-hidden
              className="absolute left-[56px] top-1/2 h-[640px] w-[1px] -translate-y-1/2 bg-[linear-gradient(180deg,transparent_0%,rgba(240,232,214,0.18)_50%,transparent_100%)]"
            />
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                aria-hidden
                className="absolute left-[44px] flex items-center gap-2 text-[9px] font-mono uppercase tracking-eyebrow text-pewter/70"
                style={{ top: `calc(50% + ${-270 + i * 175 - 6}px)` }}
              >
                <span className="h-[1px] w-[14px] bg-pewter/55" />
                <span>z + {i}</span>
              </div>
            ))}

            {/* Compass / scale block, bottom-left */}
            <div className="absolute -bottom-2 left-2 flex items-center gap-3">
              <svg width="36" height="36" viewBox="0 0 36 36" className="text-pearl/55">
                <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="0.6" />
                <path d="M 18 4 L 21 18 L 18 32 L 15 18 Z" fill="currentColor" opacity="0.65" />
                <text x="18" y="3" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize="6" fill="currentColor" style={{ letterSpacing: '0.18em' }}>
                  N
                </text>
              </svg>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-eyebrow text-pewter">
                  Plate exploded view
                </p>
                <p className="font-mono text-[8.5px] uppercase tracking-eyebrow text-pewter/65">
                  Volery instrument &middot; 1:1 scale
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
