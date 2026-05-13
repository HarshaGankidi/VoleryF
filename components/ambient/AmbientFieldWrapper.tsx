'use client';

import dynamic from 'next/dynamic';

// Lazy-load the WebGL field. SSR is disabled because three.js touches the DOM
// at import time; the page renders the static sapphire body background as the
// fallback during hydration, then the canvas mounts after.
const AmbientField = dynamic(
  () => import('./AmbientField').then((m) => m.AmbientField),
  { ssr: false, loading: () => null },
);

export function AmbientFieldWrapper() {
  return <AmbientField />;
}
