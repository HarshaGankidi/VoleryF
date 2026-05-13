import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { AnnounceBar } from '@/components/layout/AnnounceBar';
import { Nav } from '@/components/layout/Nav';
import { Invitation } from '@/components/sections/Invitation';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { specimens } from '@/data/specimens';

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return specimens.map((s) => ({ id: s.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const specimen = specimens.find((s) => s.slug === params.id);
  if (!specimen) return { title: 'Volery — Specimen not found' };
  return {
    title: `Volery — Specimen ${specimen.index} · ${specimen.name}`,
    description: specimen.tagline,
  };
}

export default function SpecimenPage({ params }: PageProps) {
  const specimen = specimens.find((s) => s.slug === params.id);
  if (!specimen) notFound();

  const idx = specimens.findIndex((s) => s.slug === params.id);
  const prev = idx > 0 ? specimens[idx - 1] : null;
  const next = idx < specimens.length - 1 ? specimens[idx + 1] : null;

  return (
    <main>
      <AnnounceBar />
      <Nav />

      <article className="relative bg-sapphire/90 pb-32 pt-24 text-pearl sapphire-grain">
        <div className="mx-auto max-w-[1320px] px-8">
          {/* Crumb */}
          <Link
            href="/#specimens"
            className="inline-flex items-baseline gap-2 font-mono text-[10.5px] uppercase tracking-eyebrow text-pewter transition-colors hover:text-champagne"
          >
            &larr; Specimens
          </Link>

          {/* Title block */}
          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-[1fr_280px]">
            <div>
              <Eyebrow>Specimen {specimen.index} &middot; Illustrative</Eyebrow>
              <h1 className="mt-5 font-serif text-[clamp(48px,7vw,104px)] font-normal leading-[0.95] tracking-display text-pearl">
                {specimen.name}.
              </h1>
              <p className="mt-7 max-w-[640px] font-serif text-[20px] italic leading-[1.45] text-pewter">
                {specimen.tagline}
              </p>
            </div>

            {/* Metadata sidebar — Skarlo Balance style */}
            <aside className="lg:pt-3">
              <dl className="flex flex-col gap-5 border-t border-pearl/12 pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                {[
                  ['Industry', specimen.metadata.industry],
                  ['AUM band', specimen.metadata.aumBand],
                  ['Engagement', specimen.metadata.engagement],
                  ['Outcome', specimen.metadata.outcome],
                  ['Started', specimen.metadata.started],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-1 gap-[3px]">
                    <dt className="font-mono text-[9.5px] uppercase tracking-eyebrow text-pewter">
                      {label}
                    </dt>
                    <dd className="font-serif text-[15.5px] italic leading-[1.4] text-pearl">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          {/* Hero photograph */}
          <div className="relative mt-16 aspect-[16/9] w-full overflow-hidden rounded-md border border-pearl/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85)]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${specimen.photo}')`,
                filter: 'saturate(0.65) contrast(1.08) brightness(0.55)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.30)', mixBlendMode: 'multiply' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(232,221,184,0.06)', mixBlendMode: 'screen' }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.65)_100%)]" />
            {/* Plate caption + index, same as section */}
            <div className="absolute bottom-6 left-6">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pearl/80">
                {specimen.plate}
              </p>
              <p className="font-mono text-[9.5px] uppercase tracking-eyebrow text-pearl/55">
                From the Volery folio &middot; 2026
              </p>
            </div>
            <div className="absolute top-6 right-6 text-right">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pearl/60">
                Specimen
              </p>
              <p className="font-serif text-[36px] italic leading-none text-champagne">
                {specimen.index}
              </p>
            </div>
          </div>

          {/* Honesty disclaimer line — small editorial detail */}
          <p className="mt-7 font-mono text-[10px] uppercase tracking-eyebrow text-pewter">
            &mdash; Illustrative engagement &middot; drawn from the kinds of engagements Volery is built for
          </p>

          {/* Prose */}
          <div className="mt-14 grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-[200px_1fr]">
            <div className="lg:pt-2">
              <Eyebrow>On the work</Eyebrow>
            </div>
            <div className="max-w-[720px] space-y-7">
              {specimen.full.map((para, i) => (
                <p
                  key={i}
                  className="font-serif text-[19px] leading-[1.55] text-pearl/90"
                  style={i === 0 ? { fontStyle: 'italic', color: 'rgba(232,221,184,0.95)' } : undefined}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-pearl/12 pt-10">
            <Button as="a" href="/#invitation" variant="primary">
              Request access
            </Button>
            <Button as="a" href="/#specimens" variant="ghost" tone="sapphire">
              All specimens &rarr;
            </Button>
          </div>

          {/* Previous / next navigation */}
          <nav className="mt-20 grid grid-cols-1 gap-4 border-t border-pearl/12 pt-10 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/specimens/${prev.slug}`}
                className="group flex flex-col items-start gap-1"
              >
                <span className="font-mono text-[10px] uppercase tracking-eyebrow text-pewter transition-colors group-hover:text-champagne">
                  &larr; Previous specimen
                </span>
                <span className="font-serif text-[22px] italic text-pearl transition-colors group-hover:text-champagne">
                  {prev.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/specimens/${next.slug}`}
                className="group flex flex-col items-end gap-1 text-right"
              >
                <span className="font-mono text-[10px] uppercase tracking-eyebrow text-pewter transition-colors group-hover:text-champagne">
                  Next specimen &rarr;
                </span>
                <span className="font-serif text-[22px] italic text-pearl transition-colors group-hover:text-champagne">
                  {next.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </article>

      <Invitation />
    </main>
  );
}
