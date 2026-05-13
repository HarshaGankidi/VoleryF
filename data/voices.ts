export interface Voice {
  name: string;
  title: string;
  firm: string;
  meta: string;
  quote: string;
  portrait: string;
}

export const voices: Voice[] = [
  {
    name: 'Anika Mehta',
    title: 'Partner',
    firm: 'Meridian Capital',
    meta: '$1.2B AUM · Series A &mdash; D',
    quote:
      'Volery is the closest thing we have to seeing the future of the firm before our competitors do. It is patient where other tools are loud.',
    portrait:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=facearea&facepad=2.4&w=900&q=82',
  },
  {
    name: 'Daniel Okafor',
    title: 'Managing Director',
    firm: 'Atlas Partners',
    meta: '$2.1B AUM · Multi-stage',
    quote:
      'We rebuilt our memo workflow around Volery in six weeks. The instrument disappears. What remains is judgment, slightly sharpened.',
    portrait:
      'https://images.unsplash.com/photo-1542178243-bc20204b769f?auto=format&fit=facearea&facepad=2.6&w=900&q=82',
  },
  {
    name: 'Sofia Linde',
    title: 'CIO',
    firm: 'Northstar Ventures',
    meta: '$640M AUM · Growth',
    quote:
      'I have used three platforms in the last decade. Volery is the first that respects the room it is operating in. The restraint is the feature.',
    portrait:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2.6&w=900&q=82',
  },
  {
    name: 'Hiroshi Tanaka',
    title: 'General Partner',
    firm: 'Halcyon Ventures',
    meta: '$1.6B AUM · Deeptech',
    quote:
      'Our LPs read fewer reports now. They read better ones. The quiet thing we did not realise we needed until it arrived.',
    portrait:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=facearea&facepad=2.6&w=900&q=82',
  },
];
