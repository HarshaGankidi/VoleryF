'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { easing } from '@/lib/tokens';

const lines = [
  {
    kind: 'lead' as const,
    text: 'A single quiet instrument for institutional venture, composed in Hyderabad.',
  },
  {
    kind: 'body' as const,
    text:
      'One operating system across deal flow, portfolio, and LP intelligence. Built for partners who would rather be early than fast.',
  },
  {
    kind: 'italic' as const,
    text: 'Introduced to firms by correspondence. The work names itself.',
  },
];

export function EditorialBulletin() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Parallax: image translates Y opposite to scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.0, 1.08]);
  const captionY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  // Ornament path draws itself as section enters
  const ornamentProgress = useTransform(scrollYProgress, [0.05, 0.4], [0, 1]);

  return (
    <section
      id="bulletin"
      ref={sectionRef}
      className="relative overflow-hidden bg-sapphire/90 text-pearl sapphire-grain"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-12">
        {/* Left column — editorial text on Vellum */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1, ease: easing.arrival }}
          className="relative z-10 col-span-1 flex flex-col justify-center px-8 py-24 lg:col-span-5 lg:px-16 lg:py-32"
        >
          <Eyebrow ornaments>A bulletin from Volery</Eyebrow>

          {/* Hand-drawn ornament that draws itself */}
          <svg viewBox="0 0 220 14" className="mt-7 h-3 w-[220px]" aria-hidden>
            <motion.path
              d="M 2 7 L 80 7 M 110 7 L 170 7 M 200 7 L 218 7"
              fill="none"
              stroke="#E8DDB8"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray={210}
              style={{
                strokeDashoffset: useTransform(ornamentProgress, [0, 1], [210, 0]),
              }}
            />
            <motion.circle
              cx="95"
              cy="7"
              r="2.4"
              fill="#E8DDB8"
              style={{ opacity: ornamentProgress }}
            />
            <motion.circle
              cx="185"
              cy="7"
              r="1.6"
              fill="#E8DDB8"
              style={{ opacity: ornamentProgress }}
            />
          </svg>

          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.9,
                ease: easing.arrival,
                delay: 0.25 + i * 0.22,
              }}
              className={
                line.kind === 'lead'
                  ? 'mt-9 font-serif text-[clamp(28px,3vw,42px)] leading-[1.18] tracking-display text-pearl'
                  : line.kind === 'italic'
                    ? 'mt-7 max-w-[460px] font-serif text-[22px] italic leading-[1.4] text-champagne'
                    : 'mt-7 max-w-[460px] text-[16.5px] leading-[1.6] text-pewter'
              }
            >
              {line.text}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease: easing.arrival, delay: 1.0 }}
            style={{ originX: 0 }}
            className="mt-14 hairline-pearl max-w-[320px]"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-6 font-mono text-[10px] uppercase tracking-eyebrow text-pewter"
          >
            Established 2024 &middot; Hyderabad &middot; Introductions by correspondence
          </motion.p>
        </motion.div>

        {/* Right column — photograph with parallax */}
        <div className="relative col-span-1 min-h-[480px] lg:col-span-7 lg:min-h-[780px]">
          <motion.div
            style={{ y: photoY, scale: photoScale }}
            className="absolute inset-0 will-change-transform"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2200&q=85')",
                filter: 'saturate(0.55) contrast(1.08) brightness(0.42)',
              }}
            />
            {/* Sapphire multiply tints shadows toward the body color */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.42)', mixBlendMode: 'multiply' }}
            />
            {/* Champagne screen tints highlights warm */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(232,221,184,0.06)', mixBlendMode: 'screen' }}
            />
            {/* Deep vignette pulling corners toward Abyssal */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.75)_100%)]" />

            {/* Plate caption that drifts in opposite direction (parallax) */}
            <motion.div
              style={{ y: captionY }}
              className="absolute bottom-6 left-6 flex flex-col gap-1"
            >
              <span className="font-mono text-[9px] uppercase tracking-eyebrow text-pearl/80">
                Plate I &middot; The reading room
              </span>
              <span className="font-mono text-[9px] uppercase tracking-eyebrow text-pearl/55">
                From the Volery archive &middot; 2026
              </span>
            </motion.div>
          </motion.div>

          {/* hairline interior gutter */}
          <span aria-hidden className="pointer-events-none absolute left-0 top-8 bottom-8 hidden w-[1px] bg-pearl/10 lg:block" />
        </div>
      </div>
    </section>
  );
}
