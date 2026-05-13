/* ─────────────────────────────────────────────────────────────────────────
   Quiet Ledger · page surfaces
   Cover, endpaper, and the two entry pages. Each renders the cream paper
   surface (gradient + grain + vignette), with content layered above.
   ───────────────────────────────────────────────────────────────────────── */

   export interface Entry {
    date: string;
    line: string;
    margin: string;
  }
  
  /* Paper background — used by all paper pages. The gradient subtly shades
     toward the spine to give the page a sense of curvature. */
  function PaperBg({ spineSide }: { spineSide: 'left' | 'right' }) {
    const grad =
      spineSide === 'left'
        ? 'linear-gradient(to right, #D6C9A6 0%, #EAE1C5 8%, #E8DDC0 100%)'
        : 'linear-gradient(to left, #D6C9A6 0%, #EAE1C5 8%, #E8DDC0 100%)';
    return (
      <>
        <div className="absolute inset-0" style={{ background: grad }} />
        <div
          className="absolute inset-0 pointer-events-none mix-blend-multiply"
          style={{
            opacity: 0.22,
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 65%, rgba(45,51,37,0.16) 100%)',
          }}
        />
      </>
    );
  }
  
  /* The cover (front of leaf 0) — dark leather with foil-stamped type */
  export function Cover() {
    return (
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(232,221,184,0.07), transparent 55%), linear-gradient(135deg, #1F2116 0%, #13150C 60%, #0A0C05 100%)',
        }}
      >
        {/* Frame outer */}
        <div
          className="absolute"
          style={{ inset: 18, border: '1px solid rgba(232,221,184,0.22)' }}
        />
        <div
          className="absolute"
          style={{ inset: 30, border: '0.5px solid rgba(232,221,184,0.10)' }}
        />
        {/* Corner ornaments */}
        <CornerMark className="left-9 top-9" pos="tl" />
        <CornerMark className="right-9 top-9" pos="tr" />
        <CornerMark className="bottom-9 left-9" pos="bl" />
        <CornerMark className="bottom-9 right-9" pos="br" />
  
        <div
          className="relative flex h-full flex-col items-center justify-between text-center"
          style={{
            padding:
              'clamp(60px, 8vh, 100px) clamp(28px, 4vw, 60px)',
            color: '#E8DDB8',
          }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.42em]" style={{ color: 'rgba(232,221,184,0.7)' }}>
            — Volery · folio —
          </div>
  
          <div className="flex flex-col items-center gap-4">
            <div
              className="grid place-items-center rounded-full font-serif italic"
              style={{
                width: 56,
                height: 56,
                border: '1px solid rgba(232,221,184,0.4)',
                boxShadow: 'inset 0 0 0 4px rgba(232,221,184,0.05)',
                fontSize: 26,
                color: 'rgba(232,221,184,0.85)',
              }}
            >
              V.
            </div>
            <div className="font-serif italic" style={{ fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,221,184,0.55)' }}>
              The
            </div>
            <div
              className="font-serif italic leading-[0.96]"
              style={{
                fontSize: 'clamp(42px, 6vw, 84px)',
                letterSpacing: '-0.02em',
                color: '#E8DDB8',
                textShadow: '0 2px 0 rgba(0,0,0,0.3), 0 0 30px rgba(232,221,184,0.12)',
              }}
            >
              Quiet<br />Ledger
            </div>
            <div style={{ width: 64, height: 1, background: 'rgba(232,221,184,0.55)', marginTop: 8 }} />
            <div className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: 'rgba(232,221,184,0.7)' }}>
              Vol. IV — Spring MMXXVI
            </div>
          </div>
  
          <div className="font-mono text-[9px] uppercase tracking-[0.36em]" style={{ color: 'rgba(184,181,176,0.6)' }}>
            Folio of the quiet instrument · Hyderabad
          </div>
        </div>
      </div>
    );
  }
  
  function CornerMark({ className, pos }: { className: string; pos: 'tl' | 'tr' | 'bl' | 'br' }) {
    const map: Record<typeof pos, React.CSSProperties> = {
      tl: { borderRight: 'none', borderBottom: 'none' },
      tr: { borderLeft: 'none', borderBottom: 'none' },
      bl: { borderRight: 'none', borderTop: 'none' },
      br: { borderLeft: 'none', borderTop: 'none' },
    };
    return (
      <span
        aria-hidden
        className={`absolute ${className}`}
        style={{
          width: 18,
          height: 18,
          border: '1px solid rgba(232,221,184,0.45)',
          ...map[pos],
        }}
      />
    );
  }
  
  /* The inside-front endpaper — what sits beneath the cover */
  export function Endpaper() {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <PaperBg spineSide="right" />
        <div
          className="relative flex h-full flex-col"
          style={{
            padding: 'clamp(28px, 4.4vw, 58px)',
            color: '#1A1C12',
          }}
        >
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[11px] uppercase" style={{ letterSpacing: '0.28em', color: '#3D4530' }}>
              ex libris
            </span>
            <span className="font-mono text-[9.5px] uppercase" style={{ letterSpacing: '0.28em', color: '#7A7860' }}>
              no. iv
            </span>
          </div>
  
          <div className="my-auto flex flex-col items-center gap-4 text-center">
            <div style={{ width: 46, height: 1, background: 'rgba(45,51,37,0.30)' }} />
            <p
              className="font-serif italic"
              style={{
                fontSize: 'clamp(16px, 1.4vw, 22px)',
                lineHeight: 1.55,
                maxWidth: 280,
                color: '#3A4128',
              }}
            >
              “From the folio of one quiet instrument, kept in the room.”
            </p>
            <div style={{ width: 46, height: 1, background: 'rgba(45,51,37,0.30)' }} />
          </div>
  
          <div className="flex items-baseline justify-between" style={{ color: '#5A5A41' }}>
            <span className="font-mono text-[9.5px] uppercase" style={{ letterSpacing: '0.28em' }}>
              folio i
            </span>
            <span className="font-mono text-[9.5px] uppercase" style={{ letterSpacing: '0.28em' }}>
              Hyderabad · MMXXVI
            </span>
          </div>
        </div>
      </div>
    );
  }
  
  /* The LEFT page of an entry spread — date + headline */
  export function EntryLeftPage({ entry, idx }: { entry: Entry; idx: number }) {
    const num = String(idx + 1).padStart(2, '0');
    return (
      <div className="relative h-full w-full overflow-hidden">
        <PaperBg spineSide="right" />
        <div
          className="relative flex h-full flex-col"
          style={{ padding: 'clamp(28px, 4.4vw, 58px)', color: '#1A1C12' }}
        >
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[11px] uppercase" style={{ letterSpacing: '0.28em', color: '#3D4530' }}>
              {entry.date}
            </span>
            <span
              className="font-serif italic leading-none"
              style={{ fontSize: 'clamp(28px, 2.6vw, 42px)', color: '#7A6B36' }}
            >
              {num}.
            </span>
          </div>
  
          <div className="mt-5 h-px" style={{ background: 'rgba(45,51,37,0.15)' }} />
  
          <div className="my-auto pr-2">
            <p
              className="font-serif italic"
              style={{
                fontSize: 'clamp(20px, 2.2vw, 34px)',
                lineHeight: 1.32,
                letterSpacing: '-0.005em',
                textWrap: 'balance' as 'balance',
              }}
            >
              <span style={{ color: '#7A6B36', fontSize: '1.18em', paddingRight: '0.06em' }}>“</span>
              {entry.line}
              <span style={{ color: '#7A6B36', fontSize: '1.18em', paddingLeft: '0.06em' }}>”</span>
            </p>
          </div>
  
          <div className="flex items-baseline justify-between" style={{ color: '#5A5A41' }}>
            <span className="font-mono text-[9.5px] uppercase" style={{ letterSpacing: '0.28em' }}>
              Entry · {num}
            </span>
            <span className="font-serif italic" style={{ fontSize: 13 }}>
              recto · p. {2 * idx + 1}
            </span>
          </div>
        </div>
      </div>
    );
  }
  
  /* The RIGHT page of an entry spread — margin note */
  export function EntryRightPage({ entry, idx }: { entry: Entry; idx: number }) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <PaperBg spineSide="left" />
        <div
          className="relative flex h-full flex-col"
          style={{ padding: 'clamp(28px, 4.4vw, 58px)', color: '#1A1C12' }}
        >
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[11px] uppercase" style={{ letterSpacing: '0.28em', color: '#3D4530' }}>
              Margin
            </span>
            <span className="font-mono text-[9.5px] uppercase" style={{ letterSpacing: '0.28em', color: '#7A7860' }}>
              note
            </span>
          </div>
  
          <div className="mt-3" style={{ width: '1.5px', height: 16, background: '#C6B884' }} />
  
          <div className="my-auto pr-3">
            <p
              className="font-serif italic"
              style={{
                fontSize: 'clamp(15px, 1.35vw, 21px)',
                lineHeight: 1.6,
                color: '#2D2F1F',
                textWrap: 'pretty' as 'pretty',
              }}
            >
              {entry.margin}
            </p>
          </div>
  
          <div className="flex items-baseline justify-between" style={{ color: '#5A5A41' }}>
            <span className="font-serif italic" style={{ fontSize: 13 }}>
              margin · p. {2 * idx + 2}
            </span>
            <span className="inline-flex items-center gap-2" style={{ color: '#7A6B36' }}>
              <span style={{ width: 30, height: 1, background: '#7A6B36', opacity: 0.5 }} />
              <span style={{ width: 4, height: 4, background: '#7A6B36', borderRadius: '50%', transform: 'rotate(45deg)' }} />
              <span style={{ width: 30, height: 1, background: '#7A6B36', opacity: 0.5 }} />
            </span>
          </div>
        </div>
      </div>
    );
  }
  