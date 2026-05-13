'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { specimens } from '@/data/specimens';
import { easing } from '@/lib/tokens';

export function Specimens() {
  // Hover stage focus: when one placard is hovered, the others dim to 0.55
  // so the hovered card becomes the subject.
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="specimens"
      className="relative bg-sapphire/90 py-32 text-pearl sapphire-grain"
    >
      <div className="mx-auto max-w-[1320px] px-8">
        <div className="mb-16 flex flex-col items-center gap-7 text-center">
          <Eyebrow ornaments>Illustrative</Eyebrow>
          <SectionHeading className="max-w-[920px]">
            Drawn from the kinds of engagements{' '}
            <span className="italic text-champagne">Volery is built for.</span>
          </SectionHeading>
          <p className="max-w-[640px] font-serif text-[18px] italic leading-[1.55] text-pewter">
            Three engagement archetypes presented as placards. Each is a model of the work
            Volery does, not a portrait of a particular firm. When real clients sign, they replace
            these one at a time.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-7 lg:grid-cols-3"
          onMouseLeave={() => setHovered(null)}
        >
          {specimens.map((specimen, idx) => {
            const dimmed = hovered !== null && hovered !== idx;
            return (
            <motion.article
              key={specimen.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: easing.arrival, delay: idx * 0.12 }}
              animate={{ opacity: dimmed ? 0.55 : 1 }}
              onMouseEnter={() => setHovered(idx)}
              onFocus={() => setHovered(idx)}
              onBlur={() => setHovered(null)}
              className="group flex flex-col"
            >
              <Link
                href={`/specimens/${specimen.slug}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-sapphire"
              >
                {/* Photograph */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-pearl/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-arrival group-hover:scale-[1.04]"
                    style={{
                      backgroundImage: `url('${specimen.photo}')`,
                      filter: 'saturate(0.6) contrast(1.08) brightness(0.5)',
                    }}
                  />
                  {/* Unified treatment: sapphire shadow tint + champagne highlight + vignette */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'rgba(0,0,0,0.35)', mixBlendMode: 'multiply' }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'rgba(232,221,184,0.06)', mixBlendMode: 'screen' }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.65)_100%)]" />

                  {/* Plate caption — corner like a museum print */}
                  <div className="absolute bottom-4 left-4">
                    <p className="font-mono text-[9px] uppercase tracking-eyebrow text-pearl/75">
                      {specimen.plate}
                    </p>
                  </div>

                  {/* Index number — large, opposite corner */}
                  <div className="absolute top-4 right-4">
                    <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pearl/60">
                      Specimen
                    </p>
                    <p className="text-right font-serif text-[22px] italic leading-none text-champagne">
                      {specimen.index}
                    </p>
                  </div>
                </div>

                {/* Card body */}
                <div className="mt-6 flex flex-1 flex-col gap-3">
                  <h3 className="font-serif text-[26px] italic leading-tight text-pearl transition-colors duration-300 group-hover:text-champagne">
                    {specimen.name}
                  </h3>
                  <p className="text-[14px] leading-[1.55] text-pewter">
                    {specimen.tagline}
                  </p>

                  {/* Compact metadata */}
                  <dl className="mt-4 space-y-2 border-t border-pearl/10 pt-4">
                    <div className="grid grid-cols-[88px_1fr] gap-3">
                      <dt className="font-mono text-[9.5px] uppercase tracking-eyebrow text-pewter">
                        Industry
                      </dt>
                      <dd className="text-[12.5px] leading-[1.4] text-pearl/85">
                        {specimen.metadata.industry}
                      </dd>
                    </div>
                    <div className="grid grid-cols-[88px_1fr] gap-3">
                      <dt className="font-mono text-[9.5px] uppercase tracking-eyebrow text-pewter">
                        AUM band
                      </dt>
                      <dd className="text-[12.5px] leading-[1.4] text-pearl/85">
                        {specimen.metadata.aumBand}
                      </dd>
                    </div>
                  </dl>

                  <span className="mt-5 inline-flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-champagne transition-transform duration-300 group-hover:translate-x-[3px]">
                    Read the file &rarr;
                  </span>
                </div>
              </Link>
            </motion.article>
            );
          })}
        </div>

        <p className="mt-14 text-center font-mono text-[10px] uppercase tracking-eyebrow text-pewter">
          Specimens are illustrative &middot; drawn from the engagement shapes Volery is built for
        </p>
      </div>
    </section>
  );
}
