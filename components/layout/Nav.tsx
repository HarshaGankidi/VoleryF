'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const links = [
  { label: 'Bulletin', href: '#bulletin', id: 'bulletin' },
  { label: 'Specimens', href: '#specimens', id: 'specimens' },
  { label: 'Stack', href: '#stack', id: 'stack' },
  { label: 'On the work', href: '#on-work', id: 'on-work' },
  { label: 'Voices', href: '#voices', id: 'voices' },
  { label: 'Pricing', href: '#choice', id: 'choice' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section — whichever link's section is most visible gets the champagne color.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const ratios = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        }
        let bestId: string | null = null;
        let bestRatio = 0.05;
        for (const [id, r] of ratios.entries()) {
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        setActiveId(bestId);
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
        rootMargin: '-15% 0px -50% 0px',
      },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      className={cn(
        // top-[38px] sits below the AnnounceBar (which is itself sticky top-0).
        'sticky top-[38px] z-[90] transition-[background-color,backdrop-filter,box-shadow] duration-300 ease-interactive',
        scrolled
          ? 'bg-sapphire/85 backdrop-blur-xl shadow-[0_6px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-7">
        {/* Wordmark — journal-masthead scale. Italic serif at 46px, the unmistakable anchor. */}
        <a
          href="/"
          className="font-serif italic font-normal text-[46px] leading-none tracking-[-0.01em] text-pearl transition-opacity duration-200 hover:opacity-90"
        >
          Volery
        </a>

        <ul className="hidden items-center gap-[40px] md:flex">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'group relative inline-block font-serif text-[19px] font-normal leading-none transition-colors duration-200',
                    isActive ? 'text-champagne' : 'text-pewter hover:text-pearl',
                  )}
                >
                  {link.label}
                  {/* 1px champagne underline animates in from the left on hover.
                      Hidden entirely on the active link — color alone signals state. */}
                  {!isActive && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-[8px] left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-200 ease-interactive group-hover:scale-x-100"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-7">
          <a
            href="#"
            className="hidden font-serif text-[19px] font-normal leading-none text-pewter transition-colors duration-200 hover:text-pearl sm:inline"
          >
            Sign in
          </a>
          <Button
            as="a"
            href="#invitation"
            variant="primary"
            // Scaled up: 16px vertical / 32px horizontal padding, 17px text — proportional to the new masthead.
            className="!py-4 !px-8 !text-[17px]"
          >
            Request access
          </Button>
        </div>
      </div>
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 h-[1px] transition-opacity duration-300',
          scrolled ? 'bg-pearl/12 opacity-100' : 'opacity-0',
        )}
      />
    </nav>
  );
}
