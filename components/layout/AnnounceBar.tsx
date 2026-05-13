'use client';

import { useEffect, useState } from 'react';

const TOTAL_PAGES = 28;

/**
 * Returns the current "page" of the document, 1..TOTAL_PAGES, tied to scroll
 * position. A small editorial detail — discovered on second glance.
 */
function usePageOfScroll() {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // 1..TOTAL_PAGES, both endpoints inclusive.
      const next = Math.min(TOTAL_PAGES, Math.max(1, Math.round(progress * (TOTAL_PAGES - 1)) + 1));
      setPage((current) => (current === next ? current : next));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return page;
}

export function AnnounceBar() {
  const page = usePageOfScroll();

  return (
    <div className="sticky top-0 z-[100] bg-abyssal text-pearl">
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between px-8 py-[10px]">
        <p className="font-mono text-[10.5px] font-medium uppercase tracking-eyebrow text-pearl/75">
          <span aria-hidden className="mr-2 text-champagne">&#10022;</span>
          Vol. 04 &nbsp;&middot;&nbsp; Spring 2026 &nbsp;&middot;&nbsp;{' '}
          <span className="text-champagne tabular-nums" aria-label={`Page ${page} of ${TOTAL_PAGES}`}>
            Page {String(page).padStart(2, '0')} of {TOTAL_PAGES}
          </span>
        </p>
        <a
          href="#voices"
          className="font-mono text-[10.5px] uppercase tracking-eyebrow text-pearl/60 transition-colors hover:text-champagne"
        >
          A quiet conversation about institutional venture &rarr;
        </a>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-pearl/12" />
    </div>
  );
}
