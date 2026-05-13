import Link from 'next/link';
import type { Metadata } from 'next';
import { AnnounceBar } from '@/components/layout/AnnounceBar';
import { Nav } from '@/components/layout/Nav';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const metadata: Metadata = {
  title: 'Volery — The Wire Room',
  description:
    'Quarterly notes from the operating side of the firm. The first issue is being composed.',
};

export default function WireRoomPage() {
  return (
    <main>
      <AnnounceBar />
      <Nav />

      <article className="relative min-h-[100vh] bg-sapphire/90 py-32 text-pearl sapphire-grain">
        <div className="mx-auto max-w-[920px] px-8">
          <Link
            href="/#invitation"
            className="inline-flex items-baseline gap-2 font-mono text-[10.5px] uppercase tracking-eyebrow text-pewter transition-colors hover:text-champagne"
          >
            &larr; Return to Volery
          </Link>

          <div className="mt-16">
            <Eyebrow ornaments>The Wire Room</Eyebrow>

            <h1 className="mt-7 font-serif text-[clamp(48px,7vw,104px)] font-normal leading-[0.95] tracking-display text-pearl">
              Quarterly notes from <br className="hidden md:block" />
              <span className="italic text-champagne">the operating side</span>{' '}
              of the firm.
            </h1>

            <p className="mt-10 max-w-[560px] font-serif text-[20px] italic leading-[1.5] text-pewter">
              The first issue is being composed.
            </p>

            <div className="mt-16 hairline-pearl max-w-[520px]" />

            <p className="mt-7 max-w-[560px] text-[15.5px] leading-[1.65] text-pewter">
              The Wire Room is a private edition — a short quarterly mailed to the
              operators we are working with, on the work we are doing with them. It
              is not a marketing publication. It is closer to the kind of memo a
              partner writes to one other partner about a quarter they will both
              remember in five years.
            </p>

            <p className="mt-6 max-w-[560px] text-[15.5px] leading-[1.65] text-pewter">
              The first issue ships when there is something worth sending. Until then
              you can write to{' '}
              <a
                href="mailto:rakesh@volery.co"
                className="text-pearl underline decoration-champagne/40 underline-offset-[5px] transition-colors hover:text-champagne"
              >
                rakesh@volery.co
              </a>{' '}
              and ask to be on the list.
            </p>

            <p className="mt-16 font-mono text-[10px] uppercase tracking-eyebrow text-pewter">
              In quiet composition &middot; Hyderabad &middot; MMXXVI
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
