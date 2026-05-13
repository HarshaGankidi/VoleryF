'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { voices } from '@/data/voices';
import { easing } from '@/lib/tokens';

export function Voices() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="voices"
      className="relative overflow-hidden bg-abyssal py-32 text-pearl sapphire-grain"
    >
      {/* very subtle radial highlight behind the card row */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 38%, rgba(232,221,184,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1320px] px-8">
        <div className="mb-16 flex flex-col items-center gap-7 text-center">
          <Eyebrow ornaments>An overheard conversation</Eyebrow>
          <SectionHeading className="max-w-[820px]">
            What partners say <span className="italic text-champagne">in private.</span>
          </SectionHeading>
        </div>

        <div className="flex h-[480px] w-full gap-[6px] overflow-hidden rounded-md glass-panel">
          {voices.map((voice, idx) => {
            const isActive = idx === active;
            return (
              <motion.div
                key={voice.name}
                onMouseEnter={() => setActive(idx)}
                onFocus={() => setActive(idx)}
                tabIndex={0}
                role="button"
                aria-label={`Quote from ${voice.name}, ${voice.title}, ${voice.firm}`}
                animate={{ flex: isActive ? 7 : 1 }}
                transition={{ duration: 0.7, ease: easing.arrival }}
                className="relative h-full cursor-pointer overflow-hidden"
              >
                {/* Portrait — desaturated by default, sharpens on hover */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-[900ms] ease-arrival"
                  style={{
                    backgroundImage: `url('${voice.portrait}')`,
                    filter: isActive
                      ? 'grayscale(8%) brightness(0.78) contrast(1.06)'
                      : 'grayscale(80%) brightness(0.42) contrast(0.95)',
                    transform: isActive ? 'scale(1.04)' : 'scale(1.0)',
                  }}
                />
                {/* Sapphire multiply tints all portraits toward the body color */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(0,0,0,0.48)', mixBlendMode: 'multiply' }}
                />
                {/* Champagne screen on highlights */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(232,221,184,0.06)', mixBlendMode: 'screen' }}
                />
                {/* Bottom-darken mask for legibility */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.0)_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,1)_100%)]" />

                {/* Brushed pewter accent on active */}
                {isActive && (
                  <motion.div
                    layoutId="voice-bar"
                    transition={{ duration: 0.5, ease: easing.arrival }}
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-champagne"
                  />
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pearl/60">
                    {voice.title}
                  </p>
                  <p className="mt-1 font-serif text-[20px] italic leading-tight text-pearl">
                    {voice.name}
                  </p>
                  <p className="mt-[2px] font-mono text-[10px] uppercase tracking-eyebrow text-champagne">
                    {voice.firm}
                  </p>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.5, ease: easing.arrival, delay: 0.15 }}
                        className="mt-6 max-w-[520px]"
                      >
                        <p className="font-serif text-[22px] leading-[1.4] italic text-pearl">
                          <span className="text-champagne">&ldquo;</span>
                          {voice.quote}
                          <span className="text-champagne">&rdquo;</span>
                        </p>
                        <p
                          className="mt-4 font-mono text-[10px] uppercase tracking-eyebrow text-pearl/55"
                          dangerouslySetInnerHTML={{ __html: voice.meta }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-eyebrow text-pewter">
          Hover any portrait &middot; Quotes are paraphrased &amp; published with permission
        </p>
      </div>
    </section>
  );
}
