'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { easing } from '@/lib/tokens';

function ParticleDrift() {
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

    const particles = Array.from({ length: 36 }).map(() => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      r: 0.6 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -0.05 - Math.random() * 0.08,
      a: 0.12 + Math.random() * 0.30,
    }));

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 60);
      last = now;
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (const p of particles) {
        p.x += p.vx * dt * 0.06;
        p.y += p.vy * dt * 0.06;
        if (p.y < -10) {
          p.y = rect.height + 10;
          p.x = Math.random() * rect.width;
        }
        if (p.x < -10) p.x = rect.width + 10;
        if (p.x > rect.width + 10) p.x = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(240, 232, 214, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
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

export function Invitation() {
  return (
    <section
      id="invitation"
      className="relative overflow-hidden bg-abyssal pt-44 text-pearl sapphire-grain"
    >
      <ParticleDrift />

      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(55% 45% at 50% 35%, rgba(232,221,184,0.10) 0%, transparent 70%)',
        }}
      />

      {/* — TOP: Closing curtain — */}
      <div className="relative z-10 mx-auto flex max-w-[1000px] flex-col items-center px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.0, ease: easing.arrival }}
        >
          <Eyebrow ornaments>An invitation</Eyebrow>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.1, ease: easing.arrival, delay: 0.12 }}
          className="mt-9 font-serif text-[clamp(40px,5.8vw,80px)] font-normal leading-[1.04] tracking-display text-pearl"
        >
          The firms that will shape <br className="hidden md:block" /> the next decade are not <br className="hidden md:block" />
          <span className="italic text-champagne">waiting for the market to clear.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easing.arrival, delay: 0.32 }}
          className="mt-14"
        >
          <Button
            as="a"
            href="mailto:ABCDE@volery.co"
            variant="primary"
            className="!px-10 !py-4 text-[15px]"
          >
            Request access
          </Button>
        </motion.div>
      </div>

      {/* Long generous breathing room before the footer proper. */}
      <div className="relative z-10 mt-36 hairline-pearl mx-auto max-w-[1320px] opacity-50" />

      {/* — BOTTOM: Real footer — Skarlo-style.
          Named person, real address, one eccentric link, no copyright. */}
      <div className="relative z-10 mx-auto mt-20 max-w-[1320px] px-8 pb-20">
        <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-3 lg:gap-x-14">
          {/* The firm — named person */}
          <div>
            <Eyebrow>The firm</Eyebrow>
            <p className="mt-5 font-serif text-[34px] italic leading-tight text-pearl">
              ABCDE
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-eyebrow text-pewter">
              Founder &middot; Hyderabad
            </p>
            <a
              href="mailto:ABCDE@volery.co"
              className="mt-4 inline-block font-serif text-[17px] italic text-pearl underline decoration-champagne/40 underline-offset-[5px] transition-colors hover:text-champagne"
            >
              ABCDE@volery.co
            </a>

            <p className="mt-10 font-serif text-[16px] italic leading-[1.55] text-pearl/85">
              Operators across <span className="text-champagne">Hyderabad,</span>{' '}
              London, and New&nbsp;York.
            </p>
          </div>

          {/* The office — real physical address */}
          <div>
            <Eyebrow>The office</Eyebrow>
            {/* TODO: swap to real Banjara Hills street address before launch */}
            <address className="mt-5 not-italic">
              <p className="font-serif text-[22px] leading-[1.4] text-pearl">
                Road No. 12<br />
                Banjara Hills<br />
                Hyderabad&nbsp;500034
              </p>
              <p className="mt-3 font-mono text-[10.5px] uppercase tracking-eyebrow text-pewter">
                India &middot; IST &middot; By appointment
              </p>
            </address>

            <p className="mt-10 font-serif text-[16px] italic leading-[1.55] text-pewter">
              Built in Hyderabad for institutional venture.<br />
              Introduced by correspondence.
            </p>
          </div>

          {/* The folio — one eccentric link */}
          <div>
            <Eyebrow>The folio</Eyebrow>

            <Link
              href="/wire-room"
              className="group mt-5 block"
            >
              <p className="font-serif text-[28px] italic leading-tight text-pearl transition-colors group-hover:text-champagne">
                The Wire Room &rarr;
              </p>
              <p className="mt-2 max-w-[260px] text-[13px] leading-[1.55] text-pewter">
                Quarterly notes from the operating side of the firm. Mailed in
                private edition. The first issue is in composition.
              </p>
            </Link>

            <div className="mt-10 flex flex-col gap-2">
              <a
                href="#bulletin"
                className="font-mono text-[10.5px] uppercase tracking-eyebrow text-pewter transition-colors hover:text-champagne"
              >
                Bulletin 04 &middot; Spring 2026 &rarr;
              </a>
              <a
                href="#on-work"
                className="font-mono text-[10.5px] uppercase tracking-eyebrow text-pewter transition-colors hover:text-champagne"
              >
                The Quiet Ledger &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Single editorial closing — not a copyright, not a signature. */}
        <div className="mt-24 border-t border-pearl/10 pt-7">
          <p className="font-serif text-[15px] italic text-pewter">
            Volery is a quiet instrument operated from a single office in Hyderabad.
          </p>
        </div>
      </div>
    </section>
  );
}
