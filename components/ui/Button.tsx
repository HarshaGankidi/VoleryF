'use client';

import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'ghost';
type Tone = 'sapphire' | 'olive';

interface ButtonBaseProps {
  variant?: Variant;
  tone?: Tone;
  className?: string;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-7 py-[14px] text-[14px] font-medium tracking-[0.01em] ' +
  'transition-[transform,background-color,border-color,box-shadow] duration-200 ease-interactive ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-sapphire';

const variants = {
  // Solid Pearl pill with Sapphire ink text — the brief's specified primary.
  primary:
    'bg-pearl text-sapphire ' +
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_10px_28px_-12px_rgba(0,0,0,0.6)] ' +
    'hover:-translate-y-[1px] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_18px_36px_-12px_rgba(0,0,0,0.7)] ' +
    'active:translate-y-0',
  ghost: '',
} satisfies Record<Variant, string>;

// Brushed Pewter border ghost button — works on both Sapphire and Olive backgrounds.
const ghostTone = {
  sapphire:
    'bg-transparent text-pearl border border-brushed/40 hover:border-brushed/75 hover:bg-pearl/[0.04]',
  olive:
    'bg-transparent text-pearl border border-pearl/25 hover:border-pearl/55 hover:bg-pearl/[0.04]',
} satisfies Record<Tone, string>;

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string };

function isAnchor(p: ButtonProps | AnchorProps): p is AnchorProps {
  return (p as AnchorProps).as === 'a';
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | AnchorProps>(
  function Button(props, ref) {
    const { variant = 'primary', tone = 'sapphire', className } = props;
    const classes = cn(
      base,
      variant === 'primary' ? variants.primary : ghostTone[tone],
      className,
    );

    if (isAnchor(props)) {
      const { variant: _v, tone: _t, className: _c, as: _a, ...rest } = props;
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...rest}>
          {props.children}
        </a>
      );
    }

    const { variant: _v, tone: _t, className: _c, ...rest } = props;
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...rest}>
        {props.children}
      </button>
    );
  },
);
