'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { roadmap } from '@/data/roadmap';
import { easing } from '@/lib/tokens';
import { cn } from '@/lib/cn';

const statusLabel = {
  shipped: 'Shipped',
  in_progress: 'In progress',
  planned: 'Planned',
} as const;

function QuarterCard({
  quarter,
  idx,
  active,
}: {
  quarter: (typeof roadmap)[number];
  idx: number;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 22 });
  const sy = useSpring(py, { stiffness: 160, damping: 22 });

  const rotateY = useTransform(sx, [0, 1], [-3.5, 3.5]);
  const rotateX = useTransform(sy, [0, 1], [3.5, -3.5]);

  const sheenX = useTransform(sx, (v) => `${v * 100}%`);
  const sheenY = useTransform(sy, (v) => `${v * 100}%`);
  const sheen = useMotionTemplate`radial-gradient(circle at ${sheenX} ${sheenY}, rgba(232,221,184,0.10) 0%, rgba(232,221,184,0) 60%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: easing.arrival, delay: idx * 0.1 }}
      style={{ perspective: 1000 }}
      className="relative flex flex-col"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={cn(
          'group relative h-full rounded-md border bg-obsidian p-7 transition-shadow duration-300',
          active
            ? 'border-champagne shadow-[inset_0_1px_0_rgba(240,232,214,0.08),0_30px_60px_-22px_rgba(0,0,0,0.6),0_0_24px_-8px_rgba(232,221,184,0.20)]'
            : 'border-pearl/12 shadow-[inset_0_1px_0_rgba(240,232,214,0.04),0_24px_50px_-22px_rgba(0,0,0,0.65)] hover:border-pearl/30',
        )}
      >
        {/* cursor sheen */}
        <motion.div
          aria-hidden
          style={{ background: sheen }}
          className="pointer-events-none absolute inset-0 rounded-md"
        />

        {/* corner ticks */}
        <span aria-hidden className="absolute -left-[3px] -top-[3px] h-2 w-2 border-l border-t border-pearl/30" />
        <span aria-hidden className="absolute -right-[3px] -top-[3px] h-2 w-2 border-r border-t border-pearl/30" />
        <span aria-hidden className="absolute -bottom-[3px] -left-[3px] h-2 w-2 border-b border-l border-pearl/30" />
        <span aria-hidden className="absolute -bottom-[3px] -right-[3px] h-2 w-2 border-b border-r border-pearl/30" />

        <div style={{ transform: 'translateZ(18px)' }}>
          <p
            className="font-mono text-[10px] uppercase tracking-eyebrow text-pewter"
            dangerouslySetInnerHTML={{ __html: quarter.label }}
          />
          <div className="relative mt-5 flex items-center gap-3">
            <div
              className={cn(
                'relative h-[10px] w-[10px] rounded-full',
                quarter.status !== 'planned' ? 'bg-champagne' : 'border border-pearl/30 bg-obsidian',
              )}
            >
              {quarter.status === 'in_progress' && (
                <>
                  <motion.span
                    className="absolute inset-0 rounded-full bg-champagne"
                    animate={{ scale: [1, 2.6, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.span
                    className="absolute inset-0 rounded-full bg-champagne/70"
                    animate={{ scale: [1, 4.2, 1], opacity: [0.45, 0, 0.45] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  />
                </>
              )}
            </div>
            <p
              className={cn(
                'font-mono text-[9.5px] uppercase tracking-eyebrow',
                quarter.status === 'in_progress' ? 'text-champagne' : 'text-pewter',
              )}
            >
              {statusLabel[quarter.status]}
            </p>
          </div>

          <ul className="mt-7 space-y-5">
            {quarter.items.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  ease: easing.arrival,
                  delay: 0.25 + idx * 0.1 + i * 0.1,
                }}
              >
                <p className="font-mono text-[9.5px] uppercase tracking-eyebrow text-pewter">
                  {item.tag}
                </p>
                <p className="mt-[3px] font-serif text-[18px] italic leading-[1.28] text-pearl">
                  {item.title}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PlanAhead() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 40%'],
  });
  const railWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="roadmap" ref={sectionRef} className="relative bg-sapphire/90 py-32 text-pearl sapphire-grain">
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="mb-16 max-w-[640px]">
          <Eyebrow ornaments>The plan ahead</Eyebrow>
          <SectionHeading className="mt-5">
            Built quietly. <span className="italic text-champagne">Shipped quarterly.</span>
          </SectionHeading>
          <p className="mt-5 max-w-[460px] text-[14px] leading-[1.55] text-pewter">
            Four quarters of intent. Two behind, one in motion, one looking ahead. Hover any quarter.
          </p>
        </div>

        {/* Animated rail that draws left-to-right as user scrolls into section */}
        <div className="relative mb-3 h-[1px]">
          <div className="absolute inset-0 bg-pearl/12" />
          <motion.div
            style={{ width: railWidth }}
            className="absolute left-0 top-0 h-full bg-champagne"
          />
          {/* tick marks at quarter positions */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <span
              key={t}
              aria-hidden
              style={{ left: `${t * 100}%` }}
              className="absolute -top-[3px] h-[7px] w-[1px] -translate-x-1/2 bg-pearl/12"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roadmap.map((q, idx) => (
            <QuarterCard
              key={q.label}
              quarter={q}
              idx={idx}
              active={q.status === 'in_progress'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
