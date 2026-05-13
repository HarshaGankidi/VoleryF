'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { easing } from '@/lib/tokens';

// Champagne dust motes drifting like motes catching a lamp-beam.
function DustMotes() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let rect = canvas.getBoundingClientRect();

    const resize = () => {
      rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const motes = Array.from({ length: 4 }).map(() => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      r: 2 + Math.random() * 2.5,
      vx: 0.04 + Math.random() * 0.06,
      vy: -0.015 - Math.random() * 0.018,
      seed: Math.random() * Math.PI * 2,
    }));

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 60);
      last = now;
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (const m of motes) {
        const sway = Math.sin(now * 0.0006 + m.seed) * 0.18;
        m.x += (m.vx + sway) * dt * 0.06;
        m.y += m.vy * dt * 0.06;
        if (m.y < -10) {
          m.y = rect.height + 10;
          m.x = Math.random() * rect.width;
        }
        if (m.x > rect.width + 10) m.x = -10;

        // Soft champagne halo
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 6);
        grad.addColorStop(0, 'rgba(232, 221, 184, 0.10)');
        grad.addColorStop(1, 'rgba(232, 221, 184, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core mote — 7% opacity champagne
        ctx.fillStyle = 'rgba(232, 221, 184, 0.075)';
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}

export function Arrival() {
  return (
    <section className="relative overflow-hidden text-pearl">
      {/* Photograph — occupies right two-thirds, tilted slightly to add depth */}
      <div className="absolute inset-0" aria-hidden style={{ perspective: '2000px' }}>
        <motion.div
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 32, ease: [0.45, 0, 0.55, 1], repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0"
          style={{ transform: 'rotateX(2deg) translateZ(-20px)', transformOrigin: '50% 100%' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=2600&q=85')",
              filter: 'saturate(0.7) contrast(1.08) brightness(0.62)',
            }}
          />
        </motion.div>
      </div>

      {/* Sapphire wash over the photograph — darker on the left so type dominates,
          fading to ~25% on the right so the photograph emerges */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0B0B0D_0%,#0B0B0D_28%,rgba(11,11,13,0.92)_46%,rgba(11,11,13,0.55)_72%,rgba(11,11,13,0.35)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.15)_30%,rgba(0,0,0,0.70)_85%,rgba(0,0,0,1)_100%)]" />
      {/* corner vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_45%,transparent_0%,rgba(0,0,0,0.60)_100%)]" />

      {/* Champagne tint to highlights — very subtle screen layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(232,221,184,0.06)_0%,transparent_55%)]" />

      <DustMotes />

      <div className="relative z-10 mx-auto flex min-h-[100vh] max-w-[1440px] flex-col justify-between px-8 pb-14 pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: easing.arrival }}
        >
          <Eyebrow ornaments>A bulletin from Volery</Eyebrow>
        </motion.div>

        <div className="max-w-[1120px]">
          {/* Skarlo-scale: clamp(56,10vw,168px), 4 lines with a section break for rhythm.
              Each word lands on its own line; the italic emphasis kicks in after the break. */}
          <h1 className="font-serif font-normal leading-[0.90] tracking-display text-pearl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: easing.arrival, delay: 0.15 }}
              className="block text-[clamp(56px,10vw,168px)]"
            >
              Long-term
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: easing.arrival, delay: 0.30 }}
              className="block text-[clamp(56px,10vw,168px)]"
            >
              capital.
            </motion.span>
            {/* Section break — a beat of silence between the two propositions */}
            <span aria-hidden className="block h-[clamp(20px,1.6vw,32px)]" />
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: easing.arrival, delay: 0.60 }}
              className="block text-[clamp(56px,10vw,168px)] italic text-champagne"
            >
              Quiet
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: easing.arrival, delay: 0.75 }}
              className="block text-[clamp(56px,10vw,168px)] italic text-champagne"
            >
              conviction.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: easing.arrival, delay: 0.95 }}
            className="mt-12 max-w-[520px] text-[17px] leading-[1.55] text-pewter"
          >
            The operating system for institutional venture. One quiet instrument running in
            the background of your firm.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easing.arrival, delay: 1.15 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button as="a" href="#invitation" variant="primary">
              Request access
            </Button>
            <Button as="a" href="#on-work" variant="ghost" tone="sapphire">
              Read the manifesto &rarr;
            </Button>
          </motion.div>
        </div>

        {/* Animated baseline hairline that draws from 0 to 100% width on load */}
        <div className="mt-16">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.0, ease: easing.arrival, delay: 1.0 }}
            style={{ originX: 0 }}
            className="h-[1px] bg-[linear-gradient(to_right,transparent,rgba(240,232,214,0.20),rgba(240,232,214,0.10),transparent)]"
          />
          {/* Truthful single line — no fabricated client-count claims. */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easing.arrival, delay: 1.6 }}
            className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2"
          >
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-pewter">
              &mdash;
            </span>
            <span className="font-mono text-[11px] uppercase tracking-eyebrow text-pearl/80">
              Built in Hyderabad
            </span>
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-pewter">
              &middot;
            </span>
            <span className="font-mono text-[11px] uppercase tracking-eyebrow text-pearl/80">
              Operating now
            </span>
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-pewter">
              &middot;
            </span>
            <span className="font-serif text-[16px] italic text-pewter">
              Introductions by correspondence
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
