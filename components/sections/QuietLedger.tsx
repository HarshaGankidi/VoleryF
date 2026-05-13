'use client';

import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import {
  Cover,
  Endpaper,
  EntryLeftPage,
  EntryRightPage,
  type Entry,
} from './quiet-ledger/Pages';

/* ─────────────────────────────────────────────────────────────────────────
   The Quiet Ledger
   A leather-bound chronicle. Each entry is a spread; pages turn in 3D as
   the user scrolls. Built on a pinned sticky stage with one leaf per flip.
   ───────────────────────────────────────────────────────────────────────── */

const entries: Entry[] = [
  {
    date: '2026.01.14',
    line: 'A founder dinner that didn’t happen, because we already knew enough.',
    margin:
      'Volery had been watching the founder’s GitHub cadence for sixteen months. The dinner wasn’t necessary.',
  },
  {
    date: '2026.01.22',
    line: 'A pass that the market would say was wrong. We are at peace with it.',
    margin: 'Thesis fit returned 41 of 100. We have stopped chasing the noise.',
  },
  {
    date: '2026.02.03',
    line: 'A check written before the deck arrived.',
    margin:
      'The signal pattern matched eleven of our prior successes — and three of our largest.',
  },
  {
    date: '2026.02.11',
    line: 'A quarterly that drafted itself between 8 and 9 on a Wednesday.',
    margin:
      'NAV pulled from cap-table movement automatically. Operator reviewed in twelve minutes; partner signed before lunch.',
  },
  {
    date: '2026.02.18',
    line: 'A founder update flagged at midnight, surfaced by morning.',
    margin:
      'Sentiment shift in the bi-weekly note detected at 23:47. Call placed Wednesday at 09:10.',
  },
  {
    date: '2026.02.25',
    line: 'An LP letter that took two minutes to sign and zero minutes to draft.',
    margin: 'Two hours saved per LP, every quarter, against the firm’s prior cadence.',
  },
  {
    date: '2026.03.04',
    line: 'A deal won because we were already in the room.',
    margin:
      'Volery had indexed the founder six months prior. The relationship matured into a check.',
  },
];

// Number of leaves to flip = number of entries.
// Total visible spreads = entries.length + 1 (cover + entries).
const FLIPS = entries.length;
const TOTAL_SPREADS = FLIPS + 1;

export function QuietLedger() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Smooth, slightly slow — gives the page-turn a cinematic weight.
  const p = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    mass: 0.6,
  });

  return (
    <section
      id="on-work"
      ref={sectionRef}
      className="relative bg-sapphire-deep text-pearl"
      style={{ height: `calc(100vh + ${FLIPS * 75}vh)` }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-4 py-6">
        {/* ── Ambient backdrop ─────────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 68% 14%, rgba(232,221,184,0.08), transparent 55%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 28%, rgba(0,0,0,0.86) 100%)',
            }}
          />
          <div
            className="absolute inset-0 mix-blend-overlay"
            style={{
              opacity: 0.045,
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            }}
          />
        </div>

        {/* ── Header ───────────────────────────────────────────────────── */}
        <header className="relative z-10 mb-4 flex flex-col items-center gap-2 text-center md:mb-6">
          <Eyebrow ornaments>The quiet ledger</Eyebrow>
          <h2 className="mt-1 font-serif text-[clamp(22px,2.6vw,42px)] leading-[1.05] tracking-display text-pearl">
            Entries from <span className="italic text-champagne">a single instrument.</span>
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-brushed">
            Scroll to turn the page
          </p>
        </header>

        {/* ── Book stage ───────────────────────────────────────────────── */}
        <div
          className="relative z-10"
          style={{
            width: 'min(1040px, 94vw)',
            perspective: '2600px',
            perspectiveOrigin: '50% 40%',
          }}
        >
          <div
            className="relative"
            style={{
              width: '100%',
              aspectRatio: '8 / 5.1',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Table shadow */}
            <div
              aria-hidden
              className="absolute -bottom-6 left-[6%] right-[6%] h-8"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, transparent 70%)',
                filter: 'blur(20px)',
                zIndex: 0,
              }}
            />
            {/* Leather frame */}
            <div
              aria-hidden
              className="absolute"
              style={{
                inset: '-12px -14px -14px -14px',
                borderRadius: '4px',
                background:
                  'linear-gradient(135deg, #1A1C13 0%, #101207 60%, #080A04 100%)',
                boxShadow:
                  'inset 0 1px 0 rgba(232,221,184,0.10), inset 0 -1px 0 rgba(0,0,0,0.5), 0 0 0 1px rgba(232,221,184,0.08), 0 56px 100px rgba(0,0,0,0.75), 0 14px 32px rgba(0,0,0,0.55)',
                zIndex: 0,
              }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: '10px 12px 12px 12px',
                  border: '0.5px solid rgba(232,221,184,0.10)',
                }}
              />
            </div>

            {/* Base layers — visible at the extremes of the journey */}
            <div className="absolute left-0 top-0 h-full w-1/2" style={{ zIndex: 1 }}>
              <Endpaper />
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2" style={{ zIndex: 1 }}>
              <EntryRightPage entry={entries[entries.length - 1]} idx={entries.length - 1} />
            </div>

            {/* Leaves: cover + N-1 entry leaves */}
            <Leaf
              i={0}
              flips={FLIPS}
              p={p}
              front={<Cover />}
              back={<EntryLeftPage entry={entries[0]} idx={0} />}
            />
            {entries.slice(0, -1).map((entry, k) => (
              <Leaf
                key={k}
                i={k + 1}
                flips={FLIPS}
                p={p}
                front={<EntryRightPage entry={entry} idx={k} />}
                back={<EntryLeftPage entry={entries[k + 1]} idx={k + 1} />}
              />
            ))}

            {/* Bookmark ribbon */}
            <Ribbon p={p} />

            {/* Spine shadow gutter (on top of everything) */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 bottom-0"
              style={{
                left: '50%',
                width: '22px',
                transform: 'translateX(-50%)',
                zIndex: 600,
                background:
                  'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.62) 50%, rgba(0,0,0,0.45) 70%, transparent 100%)',
              }}
            />
          </div>
        </div>

        {/* ── Footer nav ───────────────────────────────────────────────── */}
        <BookFooter p={p} sectionRef={sectionRef} />
      </div>

      {/* ── Closing colophon (revealed as the section releases) ────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-0 pb-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pewter">
          From the Volery folio · Q1 ledger · Hyderabad · MMXXVI
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   LEAF — one physical page that pivots around the spine.
   The leaf has two faces (front + back). Visibility is controlled by
   opacity rather than backface-visibility, which is unreliable across some
   rendering contexts. Back face is pre-mirrored with scaleX(-1) so that
   when the leaf has rotated 180° around the spine, the back content
   reads normally to the user.
   ───────────────────────────────────────────────────────────────────────── */
function Leaf({
  i,
  flips,
  p,
  front,
  back,
}: {
  i: number;
  flips: number;
  p: MotionValue<number>;
  front: ReactNode;
  back: ReactNode;
}) {
  const start = i / flips;
  const end = (i + 1) / flips;

  // Eased rotation: 0 → -180
  const rotation = useTransform(p, (v) => {
    if (v <= start) return 0;
    if (v >= end) return -180;
    const t = (v - start) / (end - start);
    const tt = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    return tt * -180;
  });

  // Z-index: high during flip, ordered by stack position before/after
  const zIndex = useTransform(p, (v) => {
    if (v < start) return 30 - i;
    if (v > end) return 50 + i;
    return 500;
  });

  // Face visibility — drive from rotation
  const frontOpacity = useTransform(rotation, (r) => (Math.abs(r) < 90 ? 1 : 0));
  const backOpacity = useTransform(rotation, (r) => (Math.abs(r) < 90 ? 0 : 1));

  // Curl shadow opacity — peaks at the middle of the flip
  const shadeOpacity = useTransform(rotation, (r) => {
    const t = Math.abs(r) / 180;
    return 4 * t * (1 - t);
  });
  const frontShade = useTransform(shadeOpacity, (v) => v * 0.7);
  const backShade = useTransform(shadeOpacity, (v) => v * 0.55);

  return (
    <motion.div
      className="absolute right-0 top-0 h-full w-1/2"
      style={{
        rotateY: rotation,
        zIndex,
        transformOrigin: 'left center',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* FRONT face */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: frontOpacity }}
      >
        {front}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: frontShade,
            background:
              'linear-gradient(to left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 35%, transparent 80%)',
          }}
        />
      </motion.div>

      {/* BACK face — pre-mirrored with scaleX(-1) */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: backOpacity, scaleX: -1 }}
      >
        {back}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: backShade,
            background:
              'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.22) 40%, transparent 85%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   RIBBON — champagne bookmark hanging from the spine
   ───────────────────────────────────────────────────────────────────────── */
function Ribbon({ p }: { p: MotionValue<number> }) {
  const y = useTransform(p, [0, 1], [0, 30]);
  const opacity = useTransform(p, [0, 0.02, 0.97, 1], [0, 1, 1, 0]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        top: -2,
        left: 'calc(50% - 3px)',
        width: 6,
        height: '78%',
        background: 'linear-gradient(to bottom, #D6C58C 0%, #A48E4F 70%, #5C4D24 100%)',
        boxShadow: '0 6px 14px rgba(0,0,0,0.5), inset 1px 0 0 rgba(255,255,255,0.1)',
        zIndex: 650,
        y,
        opacity,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FOOTER — prev / dots / next + current spread label
   ───────────────────────────────────────────────────────────────────────── */
function BookFooter({
  p,
  sectionRef,
}: {
  p: MotionValue<number>;
  sectionRef: React.RefObject<HTMLElement>;
}) {
  const goToSpread = (n: number) => {
    const section = sectionRef.current;
    if (!section) return;
    n = Math.max(0, Math.min(FLIPS, n));
    const span = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const target = top + (n / FLIPS) * span;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <div className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-4 md:mt-6">
      <NavButton onClick={() => goToSpread(Math.round(p.get() * FLIPS) - 1)}>
        ←
      </NavButton>

      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL_SPREADS }).map((_, i) => (
          <Dot key={i} idx={i} p={p} onClick={() => goToSpread(i)} />
        ))}
      </div>

      <NavButton onClick={() => goToSpread(Math.round(p.get() * FLIPS) + 1)}>
        →
      </NavButton>

      <SpreadLabel p={p} />
    </div>
  );
}

function NavButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="grid h-11 w-11 place-items-center rounded-full border border-pearl/15 text-pearl transition-all duration-300 hover:border-champagne hover:bg-champagne/5 active:scale-95"
    >
      {children}
    </button>
  );
}

function Dot({
  idx,
  p,
  onClick,
}: {
  idx: number;
  p: MotionValue<number>;
  onClick: () => void;
}) {
  const scale = useTransform(p, (v) => {
    const dist = Math.abs(v * FLIPS - idx);
    return dist < 0.45 ? 1.4 : 1;
  });
  const bg = useTransform(p, (v) => {
    const dist = Math.abs(v * FLIPS - idx);
    if (dist < 0.45) return '#E8DDB8';
    if (dist < 1.0) return 'rgba(232,221,184,0.6)';
    return 'rgba(240,232,214,0.18)';
  });
  const boxShadow = useTransform(p, (v) => {
    const dist = Math.abs(v * FLIPS - idx);
    return dist < 0.45 ? '0 0 12px #E8DDB8' : 'none';
  });

  return (
    <motion.button
      onClick={onClick}
      aria-label={`Spread ${idx}`}
      className="h-2 w-2 rounded-full"
      style={{ scale, background: bg, boxShadow }}
    />
  );
}

function SpreadLabel({ p }: { p: MotionValue<number> }) {
  const cur = useTransform(p, (v) => {
    const n = Math.round(v * FLIPS);
    return n === 0 ? 'Cover' : `Entry ${String(n).padStart(2, '0')}`;
  });
  return (
    <span className="ml-2 font-mono text-[10px] uppercase tracking-eyebrow text-brushed">
      <motion.span className="text-pearl">{cur}</motion.span>
      {' · '}
      <span>{String(TOTAL_SPREADS).padStart(2, '0')}</span>
    </span>
  );
}
