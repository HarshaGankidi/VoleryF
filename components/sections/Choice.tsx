'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { plans } from '@/data/pricing';
import { easing } from '@/lib/tokens';
import { cn } from '@/lib/cn';

interface TiltCardProps {
  isMiddle: boolean;
  index: number;
  children: ReactNode;
}

function TiltCard({ isMiddle, index, children }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hovered = useMotionValue(0);

  const spring = { stiffness: 170, damping: 22, mass: 0.55 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const sh = useSpring(hovered, { stiffness: 220, damping: 22 });

  // Centred values for rotation (-0.5 → 0.5)
  const cx = useTransform(sx, (v) => v - 0.5);
  const cy = useTransform(sy, (v) => v - 0.5);

  // Max rotation magnitude — slightly stronger for the middle card.
  const maxRot = isMiddle ? 7 : 5;
  const rotateY = useTransform(cx, [-0.5, 0.5], [-maxRot, maxRot]);
  const rotateX = useTransform(cy, [-0.5, 0.5], [maxRot, -maxRot]);

  const lift = useTransform(sh, [0, 1], [0, isMiddle ? -16 : -10]);
  const scale = useTransform(sh, [0, 1], [1, isMiddle ? 1.022 : 1.018]);

  // Cursor-following radial sheen position in % coords
  const sheenX = useTransform(sx, (v) => `${v * 100}%`);
  const sheenY = useTransform(sy, (v) => `${v * 100}%`);
  const sheen = useMotionTemplate`radial-gradient(circle at ${sheenX} ${sheenY}, rgba(232,221,184,0.16) 0%, rgba(232,221,184,0) 55%)`;

  // Shadow that strengthens with hover
  const shadowOpacity = useTransform(sh, [0, 1], [0.40, isMiddle ? 0.80 : 0.65]);
  const shadow = useMotionTemplate`0 ${useTransform(sh, [0, 1], [16, 60])}px ${useTransform(sh, [0, 1], [32, 90])}px -24px rgba(0,0,0,${shadowOpacity})`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const onEnter = () => hovered.set(1);
  const onLeave = () => {
    hovered.set(0);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: easing.arrival, delay: index * 0.1 }}
      style={{ perspective: 1200 }}
      className="relative"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          rotateX,
          rotateY,
          y: lift,
          scale,
          boxShadow: shadow,
          transformStyle: 'preserve-3d' as const,
        }}
        className={cn(
          'group relative flex h-full flex-col rounded-md border glass-panel p-9',
          isMiddle ? 'border-champagne' : 'border-pearl/10',
        )}
      >
        {/* persistent middle-card lift baseline */}
        {isMiddle && <div className="absolute inset-0 rounded-md border border-champagne" style={{ borderWidth: '1.5px' }} />}

        {/* cursor-following Persimmon sheen */}
        <motion.div
          aria-hidden
          style={{ background: sheen }}
          className="pointer-events-none absolute inset-0 rounded-md mix-blend-normal"
        />

        {/* corner CAD ticks for engraving feel */}
        <span aria-hidden className="absolute -left-[3px] -top-[3px] h-[10px] w-[10px] border-l border-t border-pearl/30" />
        <span aria-hidden className="absolute -right-[3px] -top-[3px] h-[10px] w-[10px] border-r border-t border-pearl/30" />
        <span aria-hidden className="absolute -bottom-[3px] -left-[3px] h-[10px] w-[10px] border-b border-l border-pearl/30" />
        <span aria-hidden className="absolute -bottom-[3px] -right-[3px] h-[10px] w-[10px] border-b border-r border-pearl/30" />

        {/* parallax-lifted content layer for genuine 3D feel */}
        <div className="relative" style={{ transform: 'translateZ(28px)', transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Choice() {
  return (
    <section id="choice" className="relative bg-obsidian/80 py-32 text-pearl">
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="mb-20 flex flex-col items-center gap-7 text-center">
          <Eyebrow ornaments>The choice</Eyebrow>
          <SectionHeading className="max-w-[820px]">
            Three quiet tiers. <span className="italic text-champagne">One instrument.</span>
          </SectionHeading>
          <p className="max-w-[480px] font-serif text-[18px] italic leading-[1.55] text-pewter">
            Three subscriptions, set like type. Hover any card.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:items-stretch">
          {plans.map((plan, idx) => {
            const isMiddle = plan.id === 'established';
            return (
              <TiltCard key={plan.id} index={idx} isMiddle={isMiddle}>
                {isMiddle && (
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-eyebrow text-champagne">
                    &mdash; Most chosen &mdash;
                  </p>
                )}
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pewter">
                  Tier {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-serif text-[40px] italic leading-[1.05] text-pearl">
                  {plan.name}
                </h3>
                <p className="mt-3 font-serif text-[18px] italic leading-tight text-pewter">
                  {plan.tagline}
                </p>
                <p className="mt-3 text-[13.5px] leading-[1.55] text-pewter">{plan.description}</p>

                <div className="mt-7 hairline-pearl" />

                <p
                  className={cn(
                    'mt-7 font-serif tracking-display text-pearl',
                    plan.id === 'enterprise'
                      ? 'text-[26px] italic leading-tight'
                      : 'text-[34px] leading-none',
                  )}
                >
                  {plan.price}
                </p>

                <ul className="mt-7 space-y-3 text-[13.5px] leading-[1.5] text-pearl/80">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-baseline gap-3">
                      <span className="mt-[2px] font-mono text-[10px] text-champagne">&#10022;</span>
                      <span dangerouslySetInnerHTML={{ __html: f }} />
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-9">
                  <Button
                    as="a"
                    href="#invitation"
                    variant={isMiddle ? 'primary' : 'ghost'}
                    tone="sapphire"
                    className="w-full justify-center"
                  >
                    Request access
                  </Button>
                </div>
              </TiltCard>
            );
          })}
        </div>

        <p className="mt-14 text-center font-mono text-[10px] uppercase tracking-eyebrow text-pewter">
          Subscriptions billed quarterly &middot; Three-month introductory period for new firms
        </p>
      </div>
    </section>
  );
}
