'use client';

import { useEffect, useState } from 'react';

interface ScrollDirectionState {
  /** True when the page should hide top-pinned chrome (scrolling down past the threshold). */
  hidden: boolean;
  /** True when the visitor has left the at-top zone — used to switch background states. */
  scrolled: boolean;
}

/**
 * Tracks vertical scroll direction. Both the AnnounceBar and the Nav consume this so
 * they slide as a single unit:
 *  - scrollY < threshold        →  always visible, transparent state
 *  - direction down past thresh →  hidden (slide up)
 *  - direction up past thresh   →  visible (slide back in)
 *
 * Throttled with requestAnimationFrame so heavy scroll wheels don't choke the main thread.
 */
export function useScrollDirection(threshold = 80): ScrollDirectionState {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let prevY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > threshold);
        if (y < threshold) {
          setHidden(false);
        } else if (y > prevY) {
          setHidden(true);
        } else if (y < prevY) {
          setHidden(false);
        }
        prevY = y;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { hidden, scrolled };
}
