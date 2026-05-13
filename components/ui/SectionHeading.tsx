import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  size?: 'display' | 'large' | 'medium';
}

const sizes = {
  display: 'text-[clamp(56px,8vw,104px)] leading-[0.96]',
  large: 'text-[clamp(40px,5.5vw,72px)] leading-[1.02]',
  medium: 'text-[clamp(32px,4vw,56px)] leading-[1.05]',
};

export function SectionHeading({
  children,
  className,
  as = 'h2',
  size = 'large',
}: SectionHeadingProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        // Cormorant 400 (regular) reads better than 300 (light) on dark backgrounds.
        'font-serif font-normal tracking-display text-pearl',
        sizes[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
