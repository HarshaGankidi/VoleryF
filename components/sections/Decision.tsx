'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { easing } from '@/lib/tokens';
import { cn } from '@/lib/cn';

type Stage = 0 | 1 | 2 | 3;

const labels = [
  { idx: '01', text: 'Intro' },
  { idx: '02', text: 'Founder' },
  { idx: '03', text: 'Score' },
  { idx: '04', text: 'Synthesis' },
];

function ConvictionGauge({ active }: { active: boolean }) {
  const target = 91;
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) {
      setVal(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (val / 100) * circumference;

  return (
    <div className="relative h-[320px] w-[320px]">
      <svg className="absolute inset-0" viewBox="0 0 320 320">
        <circle cx="160" cy="160" r={radius} stroke="rgba(239,233,218,0.10)" strokeWidth="2" fill="none" />
        <circle
          cx="160"
          cy="160"
          r={radius}
          stroke="#C7522A"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 160 160)"
          style={{ transition: 'stroke-dashoffset 0.3s linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pearl/55">
          Volery conviction
        </p>
        <p className="mt-2 font-serif text-[88px] leading-none tracking-display text-pearl">
          {Math.round(val)}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-eyebrow text-champagne">
          Top 5 fit
        </p>
      </div>
    </div>
  );
}

function StageContent({ stage }: { stage: Stage }) {
  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="s0"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: easing.arrival }}
            className="grid h-full place-items-center"
          >
            <div className="text-center">
              <Eyebrow tone="sapphire" ornaments>One specimen</Eyebrow>
              <p className="mt-7 font-serif text-[clamp(40px,5.5vw,72px)] font-light leading-[1.06]">
                One deal. <span className="italic text-champagne">Witnessed in real time.</span>
              </p>
              <div className="mt-12 inline-grid grid-cols-2 gap-x-12 gap-y-2 text-left">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pearl/55">
                    Specimen
                  </p>
                  <p className="mt-1 font-serif text-[22px] italic text-pearl">Halcyon Labs</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pearl/55">
                    Processing time
                  </p>
                  <p className="mt-1 font-serif text-[22px] tracking-display text-champagne">08:00</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: easing.arrival }}
            className="grid h-full grid-cols-1 items-center gap-12 md:grid-cols-2"
          >
            <div className="overflow-hidden rounded-md border border-pearl/10 bg-pearl/[0.04]">
              <div
                className="aspect-[4/5] w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2.4&w=900&q=80')",
                  filter: 'grayscale(40%) sepia(0.25) brightness(0.85)',
                }}
              />
              <div className="border-t border-pearl/10 p-5">
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-champagne">
                  Founder / Specimen
                </p>
                <p className="mt-1 font-serif text-[28px] italic leading-tight text-pearl">
                  Marcus Wei
                </p>
                <p className="mt-[2px] font-mono text-[10px] uppercase tracking-eyebrow text-pearl/55">
                  CEO, Halcyon Labs
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3 text-left">
                  {[
                    { l: 'Founded', v: '2024' },
                    { l: 'Team', v: '12' },
                    { l: 'ARR', v: '$4.2M' },
                  ].map((m) => (
                    <div key={m.l}>
                      <p className="font-mono text-[9.5px] uppercase tracking-eyebrow text-pearl/45">
                        {m.l}
                      </p>
                      <p className="mt-[2px] font-serif text-[16px] text-pearl">{m.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Eyebrow tone="sapphire">02 &middot; The founder</Eyebrow>
              <h3 className="mt-5 font-serif text-[40px] leading-[1.05] italic text-pearl">
                Volery noticed Marcus before the deck arrived.
              </h3>
              <p className="mt-6 max-w-[440px] text-[14px] leading-[1.6] text-pearl/70">
                A pattern: three of our last seven highest-conviction founders shipped before raising,
                were profitable inside twelve months, and stayed under ten people for the first year.
                Marcus matches each of those three signals.
              </p>
            </div>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: easing.arrival }}
            className="grid h-full place-items-center"
          >
            <div className="flex flex-col items-center text-center">
              <ConvictionGauge active />
              <p className="mt-10 max-w-[460px] font-serif text-[20px] italic leading-[1.45] text-pearl/75">
                Cross-referenced against your last 47 investments. <br />
                <span className="text-pearl">Top 5 fit.</span>
              </p>
            </div>
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: easing.arrival }}
            className="grid h-full place-items-center"
          >
            <div className="w-full max-w-[760px] overflow-hidden rounded-md border border-pearl/12 bg-pearl/[0.04] p-8">
              <div className="flex items-center justify-between border-b border-pearl/10 pb-4">
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-champagne">
                  Investment Memo &middot; Draft 1
                </p>
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pearl/55">
                  Generated 00:00:32
                </p>
              </div>
              <h3 className="mt-5 font-serif text-[32px] italic leading-tight text-pearl">
                Halcyon Labs &mdash; recommend Yes (Series B).
              </h3>
              {[
                {
                  k: 'Conviction',
                  v: '91 of 100. Highest single-deal score in 18 months. Top quintile against historical book.',
                },
                {
                  k: 'Market',
                  v: 'AI infra inference layer; $42B by 2028 (per internal forecast); 6 acceptable comparables.',
                },
                {
                  k: 'Risk',
                  v: 'Concentration in two enterprise pilots. Mitigation: contracted expansion by Q3.',
                },
                {
                  k: 'Next step',
                  v: 'Schedule founder dinner. Begin reference scrub. Draft term sheet by Friday.',
                },
              ].map((s) => (
                <div key={s.k} className="mt-5 grid grid-cols-[120px_1fr] gap-6 border-t border-pearl/10 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pearl/55">
                    {s.k}
                  </p>
                  <p className="text-[13.5px] leading-[1.55] text-pearl/80">{s.v}</p>
                </div>
              ))}
              <div className="mt-6 flex flex-wrap gap-2">
                {['Deeptech', 'Profitable', 'Tier-1 Founder', 'Fit 96%'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-champagne/55 px-3 py-[3px] font-mono text-[9.5px] uppercase tracking-eyebrow text-champagne"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Decision() {
  const [stage, setStage] = useState<Stage>(0);
  const markers = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => Number((e.target as HTMLElement).dataset.stage));
        if (visible.length > 0) {
          setStage(visible[visible.length - 1] as Stage);
        }
      },
      {
        rootMargin: '-45% 0% -45% 0%',
        threshold: 0,
      },
    );
    for (const m of markers.current) {
      if (m) observer.observe(m);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="decision" className="relative bg-sapphire/90 text-pearl sapphire-grain">
      <div className="relative">
        <div className="sticky top-0 z-10 flex h-screen items-center">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <div className="mb-8 flex items-center gap-8">
              {labels.map((l, idx) => {
                const isActive = idx === stage;
                return (
                  <div key={l.idx} className="flex items-center gap-2">
                    <span
                      className={cn(
                        'font-mono text-[10px] uppercase tracking-eyebrow transition-colors',
                        isActive ? 'text-champagne' : 'text-pearl/35',
                      )}
                    >
                      {l.idx}
                    </span>
                    <span
                      className={cn(
                        'font-mono text-[10px] uppercase tracking-eyebrow transition-colors',
                        isActive ? 'text-pearl' : 'text-pearl/45',
                      )}
                    >
                      {l.text}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mb-12 h-[1px] w-full bg-pearl/10">
              <motion.div
                className="h-[1px] bg-champagne"
                animate={{ width: `${((stage + 1) / 4) * 100}%` }}
                transition={{ duration: 0.6, ease: easing.arrival }}
              />
            </div>

            <div className="h-[480px]">
              <StageContent stage={stage} />
            </div>
          </div>
        </div>

        <div className="relative">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              ref={(el) => {
                markers.current[i] = el;
              }}
              data-stage={i}
              className="h-[100vh]"
              aria-hidden
            />
          ))}
        </div>
      </div>
    </section>
  );
}
