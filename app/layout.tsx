import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AmbientFieldWrapper } from '@/components/ambient/AmbientFieldWrapper';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Volery — The operating system for institutional venture',
  description:
    'Volery is the venture capital operating system. Deal flow intelligence, portfolio analytics, and LP operations for firms managing $100M to $2B+ in assets.',
  metadataBase: new URL('https://volery.ai'),
  openGraph: {
    title: 'Volery — The operating system for institutional venture',
    description:
      'Long-term capital. Clear conviction. The operating system for institutional venture.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        <AmbientFieldWrapper />
        <div className="relative" style={{ zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
