export interface Plan {
  id: 'emerging' | 'established' | 'enterprise';
  name: string;
  tagline: string;
  description: string;
  price: string;
  features: string[];
}

export const plans: Plan[] = [
  {
    id: 'emerging',
    name: 'Emerging',
    tagline: 'For first-time funds and emerging managers.',
    description: 'A single fund, a sharpening thesis, and the start of a portfolio.',
    price: '$2,400 / month',
    features: [
      'Deal flow intelligence, one fund',
      'Portfolio analytics with NAV roll-up',
      'Quarterly LP report drafting',
      'Gmail, Calendar, Affinity',
      'Two named operators on call',
    ],
  },
  {
    id: 'established',
    name: 'Established',
    tagline: 'For institutional firms with multiple funds.',
    description: 'A firm with discipline, a portfolio of conviction, and partners across more than one office.',
    price: '$9,800 / month',
    features: [
      'Everything in Emerging',
      'Cross-fund intelligence graph',
      'Volery Conviction scoring, every deal',
      'LP relationship intelligence',
      'PitchBook, Crunchbase, Slack, Salesforce',
      'Eight named operators on call',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For multi-billion AUM firms with custom needs.',
    description: 'Institutions with private deployment requirements, multiple geographies, and an internal IT footprint.',
    price: 'By correspondence',
    features: [
      'Everything in Established',
      'Dedicated solutions architect',
      'Private deployment &amp; data residency',
      'Custom intelligence pipelines',
      'SOC 2 Type II &middot; ISO 27001',
      'Unlimited operators',
    ],
  },
];
