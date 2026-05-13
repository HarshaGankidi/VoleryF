import { cn } from '@/lib/cn';

interface EyebrowProps {
  children: React.ReactNode;
  tone?: 'sapphire' | 'olive';
  className?: string;
  ornaments?: boolean;
}

export function Eyebrow({ children, tone = 'sapphire', className, ornaments = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        'font-mono text-[10.5px] font-medium uppercase tracking-eyebrow',
        tone === 'sapphire' ? 'text-champagne' : 'text-champagne/95',
        className,
      )}
    >
      {ornaments ? (
        <>
          <span aria-hidden className="mx-2 inline-block text-[12px] opacity-75">
            &#10022;
          </span>
          {children}
          <span aria-hidden className="mx-2 inline-block text-[12px] opacity-75">
            &#10022;
          </span>
        </>
      ) : (
        children
      )}
    </p>
  );
}
