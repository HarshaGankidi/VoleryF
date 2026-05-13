'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { easing } from '@/lib/tokens';

interface CableLine {
  text: string;
  stop?: boolean;
}

const cableLines: CableLine[] = [
  { text: 'TO PARTNER' },
  { text: 'THREE HOURS A DAY GIVEN BACK' },
  { text: 'FOUR WEEKS PER QUARTER ON LP OPS GIVEN BACK' },
  { text: 'ONE DEAL CAUGHT BEFORE IT LANDED ON A SATURDAY' },
  { text: 'VOLERY IS NOT SOFTWARE' },
  { text: 'IT IS A QUIET PROFESSIONAL' },
  { text: 'END MESSAGE', stop: false },
];

// A row of small perforation dots above and below the cable.
function PerforationRow({ position }: { position: 'top' | 'bottom' }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-0 right-0 h-[6px]"
      style={{
        [position]: '-3px',
        backgroundImage:
          'radial-gradient(circle, #0B0B0D 2.4px, transparent 2.6px)',
        backgroundSize: '14px 6px',
        backgroundPosition: '0 50%',
      } as React.CSSProperties}
    />
  );
}

export function Telegram() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(cardRef, { once: true, margin: '-25% 0% -25% 0%' });
  const totalLines = cableLines.length;
  const lastDelay = 0.3 + (totalLines - 1) * 0.25 + 0.4;

  return (
    <section id="cost" className="relative bg-sapphire/90 py-32 text-pearl sapphire-grain">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="mb-16 flex flex-col items-center gap-7 text-center">
          <Eyebrow ornaments>The cable from the wire room</Eyebrow>
          <SectionHeading className="max-w-[820px]">
            What Volery costs. <span className="italic text-champagne">What it returns.</span>
          </SectionHeading>
          <p className="max-w-[520px] font-serif text-[18px] italic leading-[1.55] text-pewter">
            Cabled at 07:38 on a Friday. Read with your morning coffee.
          </p>
        </div>

        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 1.0, ease: easing.arrival }}
          className="relative mx-auto w-full max-w-[820px]"
        >
          {/* Outer perforation card */}
          {/* Cable is a single piece of warm cream paper — a deliberate spotlight in the dark world */}
          <div
            className="relative rounded-[2px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85),0_4px_0_rgba(0,0,0,0.4)]"
            style={{ background: '#F0E8D6' }}
          >
            <PerforationRow position="top" />
            <PerforationRow position="bottom" />

            {/* Card body */}
            <div className="relative border border-sapphire/30 px-10 py-12 md:px-16 md:py-14">
              {/* Inner double-border like a heritage cable form */}
              <div className="pointer-events-none absolute inset-3 border border-sapphire/20" />

              {/* Header */}
              <div className="relative flex flex-wrap items-baseline justify-between gap-y-2 border-b-2 border-double border-sapphire/40 pb-5">
                <p className="font-mono text-[11px] uppercase tracking-eyebrow text-sapphire">
                  Western Volery &middot; Direct Wire
                </p>
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-sapphire/65">
                  Cable no. 04217
                </p>
              </div>

              {/* Recipient strip */}
              <div className="relative mt-5 grid grid-cols-2 gap-2 text-left">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-eyebrow text-sapphire/65">
                    From
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-eyebrow text-sapphire">
                    Volery &middot; Hyderabad
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[9px] uppercase tracking-eyebrow text-sapphire/65">
                    Filed
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-eyebrow text-sapphire">
                    14 Mar 2026 &middot; 0738 IST
                  </p>
                </div>
              </div>

              <div className="relative mt-7 hairline-ink" />

              {/* Stamped body — each line snaps in line-by-line */}
              <motion.div
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.25, delayChildren: 0.3 },
                  },
                  hidden: {},
                }}
                className="relative mt-7 space-y-4 text-center"
              >
                {cableLines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 10, scale: 0.985 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.32, ease: easing.arrival },
                      },
                    }}
                    className="flex items-baseline justify-center gap-3"
                  >
                    <p
                      className="font-serif text-[clamp(20px,2.2vw,28px)] font-light uppercase tracking-[0.10em] text-sapphire"
                      style={{ wordSpacing: '0.05em' }}
                    >
                      {line.text}
                    </p>
                    <span className="font-mono text-[12px] uppercase tracking-eyebrow text-champagne-deep">
                      STOP
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="relative mt-9 hairline-ink" />

              {/* Operator footer */}
              <div className="relative mt-5 flex flex-wrap items-baseline justify-between gap-y-2">
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-sapphire/65">
                  Operator &middot; SM &middot; No. 1217
                </p>
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-sapphire/65">
                  Charged &middot; 7 words at standard rate
                </p>
              </div>

              {/* Diagonal "RECEIVED" stamp — magic detail */}
              <motion.div
                initial={{ opacity: 0, rotate: -8, scale: 1.2 }}
                animate={inView ? { opacity: 0.92, rotate: -10, scale: 1 } : {}}
                transition={{ duration: 0.5, ease: easing.arrival, delay: lastDelay }}
                className="pointer-events-none absolute -right-2 bottom-12 hidden md:block"
              >
                <div className="rounded-sm border-[2px] border-champagne-deep/70 px-3 py-[3px] font-mono text-[12px] uppercase tracking-[0.32em] text-champagne-deep/90">
                  Received
                </div>
              </motion.div>
            </div>
          </div>

          {/* CTA below — fades in after telegram completes */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.6, ease: easing.arrival, delay: lastDelay + 0.2 }}
            className="mt-14 flex flex-col items-center gap-4"
          >
            <Button as="a" href="#invitation" variant="primary" className="!px-10 !py-4 text-[15px]">
              Begin a quiet contract &rarr;
            </Button>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pewter">
              Or reply by post &middot; sprdlx Lab &middot; Hyderabad &middot; India
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
