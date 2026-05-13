export interface Quarter {
  label: string;
  status: 'shipped' | 'in_progress' | 'planned';
  items: { title: string; tag: string }[];
}

export const roadmap: Quarter[] = [
  {
    label: 'Q1 &middot; 2026',
    status: 'shipped',
    items: [
      { title: 'Deal flow intelligence v1', tag: 'Deals' },
      { title: 'Portfolio analytics &amp; NAV', tag: 'Portfolio' },
      { title: 'LP quarterly drafts', tag: 'LP Ops' },
    ],
  },
  {
    label: 'Q2 &middot; 2026',
    status: 'shipped',
    items: [
      { title: 'Volery Conviction scoring', tag: 'Conviction' },
      { title: 'Affinity &amp; PitchBook integration', tag: 'Connectivity' },
    ],
  },
  {
    label: 'Q3 &middot; 2026',
    status: 'in_progress',
    items: [
      { title: 'LP relationship intelligence', tag: 'LP Ops' },
      { title: 'Mobile companion app', tag: 'Mobile' },
      { title: 'Workspace memo editor', tag: 'Memos' },
    ],
  },
  {
    label: 'Q4 &middot; 2026',
    status: 'planned',
    items: [
      { title: 'Private cloud deployment', tag: 'Enterprise' },
      { title: 'Constellation v2 (deal universe)', tag: 'Intelligence' },
    ],
  },
];
