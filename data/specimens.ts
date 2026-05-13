export interface Specimen {
  /** Slug used in the URL: /specimens/{slug} */
  slug: string;
  /** Display index ("01", "02", "03") */
  index: string;
  /** Engagement archetype name — kept abstract because these are illustrative, not real clients. */
  name: string;
  /** One-line tagline for the placard. */
  tagline: string;
  /** Short paragraph for the card. */
  excerpt: string;
  /** Full prose used on the detail page (4 paragraphs, each anchored with a concrete detail). */
  full: string[];
  /** Editorial photograph for the placard + detail hero. */
  photo: string;
  /** Plate caption shown on the photograph (lower corner). */
  plate: string;
  /** Skarlo-Balance style metadata. */
  metadata: {
    industry: string;
    aumBand: string;
    engagement: string;
    outcome: string;
    started: string;
  };
}

export const specimens: Specimen[] = [
  {
    slug: 'single-fund',
    index: '01',
    name: 'The single fund',
    tagline:
      'A first-time fund finding its first edge — one partner, one analyst, one quiet instrument.',
    excerpt:
      'For the emerging manager raising a debut fund, Volery returns the hours that were going to inbox triage and quarterly drafting. The thesis sharpens because the work that was crowding it is no longer crowding it.',
    full: [
      'The engagement begins quietly. Volery is plugged into the firm’s email, calendar, deal sources, and founder updates within the first week. Over the following month, the partner watches the inbox sort itself — deal threads grouped by sector, founder updates surfaced by signal change, cold intros scored against the thesis before they are opened.',
      'By month three the operating cadence has shifted. The partner spends mornings reading the brief Volery has assembled overnight — three deals worth attention, one founder update flagged for sentiment shift, one LP question pre-drafted in the firm’s voice. The analyst spends afternoons on diligence rather than triage.',
      'By the end of the first quarter the LP letter has drafted itself. The partner reviews for tone, signs, sends. The work the firm did is the work the LP letter describes — accurately, and without the usual frantic week before deadline.',
      'The first hire after the partner is almost always an analyst hired because the partner can no longer keep up with the inbox. With Volery, that analyst is hired for diligence instead — a different conversation in the interview, a different first six months on the job. The firm grows in the direction the founding partner intended, not in the direction the inbox forced.',
    ],
    // Single-desk close-up — a writing desk, a manuscript. Not a library.
    photo:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=2400&q=85',
    plate: 'Plate I · The writing desk',
    metadata: {
      industry: 'Generalist venture · Pre-seed to Series B',
      aumBand: '$80M–$300M',
      engagement: 'Deal flow intelligence · LP report drafting · Inbox sort',
      outcome: '~12 hrs/week returned per partner · quarterly drafted in 18 min',
      started: 'Illustrative engagement',
    },
  },
  {
    slug: 'family-office',
    index: '02',
    name: 'The multi-generation office',
    tagline:
      'A family office across two and three generations — many funds, many vintages, one memory.',
    excerpt:
      'When capital is held across decades and decisions cross generations, the firm’s memory becomes its instrument. Volery is the part of the room that remembers everything, in service of the partners who must decide.',
    full: [
      'The multi-generation office is the engagement Volery is most quietly suited to. Capital is held across vintages a decade apart, decisions are made by partners who have served under different generations of leadership, and the relevant context for any given deal lives in twenty thousand emails, four hundred founder updates, and a hundred handwritten notes scattered across a drawer in a cabinet two countries away.',
      'Volery does not summarise this. It indexes it. When a partner sits down to consider a new deal, the instrument quietly assembles the relevant precedents — three founders who built in adjacent categories, two LPs who have asked about exactly this thesis, one prior engagement that produced an outcome worth re-reading before any conversation begins.',
      'The friction the engagement removes is the friction of disagreement. Six investment-committee members across three generations carry different conviction frameworks — the eldest weights cap-table cleanliness above all else, the middle weights pace of customer development, the youngest weights the team’s prior public commits. Volery surfaces where these frameworks disagree on a given deal before the committee meets, so the partners argue about the substance and not about which version of the story each of them is remembering.',
      'The instrument also does the quiet family-side work. Twelve LPs across four bloodlines, each with different reporting preferences and different appetites for narrative versus number — the quarterly drafts itself in twelve voices, one per recipient, all signed by the same partner on the same Friday afternoon.',
    ],
    // Wood-panelled committee room (Trinity Long Room) — keeps the long-table aesthetic.
    photo:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2400&q=85',
    plate: 'Plate II · The long table',
    metadata: {
      industry: 'Multi-generation family capital · cross-asset',
      aumBand: '$1B–$5B',
      engagement: 'Cross-fund intelligence graph · relationship memory · institutional memo system',
      outcome: 'Two-day diligence cycle compressed to four hours · 100-year memory always present',
      started: 'Illustrative engagement',
    },
  },
  {
    slug: 'seed-specialist',
    index: '03',
    name: 'The seed-stage specialist',
    tagline:
      'A pre-seed deep-tech specialist — finding the founder six months before the deck.',
    excerpt:
      'For the seed-stage specialist, the work is identifying the founder before anyone else. Volery indexes the public web for the kinds of signals a great founder leaves behind long before the round.',
    full: [
      'The seed engagement is the most outward-facing. Volery is configured to watch for the kinds of signals the firm’s thesis tells it to watch — a GitHub repository with a particular shape of commit history, a Twitter cadence that reveals founder discipline, a research paper with three authors named in unsolicited contexts by the firm’s portfolio CEOs.',
      'When a founder matches, Volery surfaces a brief: the founder’s three closest analogues in the existing portfolio, the two patterns of signal that triggered the match, and the one piece of context the partner would have wanted before any outreach — a recent change in commit cadence, a paper rejection that became a pivot, a co-founder departure handled unusually well. The partner then writes their own introduction, in their own voice. Volery never writes the email.',
      'The seed-stage engagement is where Volery’s Conviction scoring sees its highest variance — early-stage signal is noisier, the prior portfolio is smaller, the room for false positives is wider. The threshold is calibrated severely: a founder must clear 41 of 100 on thesis fit before they appear in the partner’s morning brief at all.',
      'Eleven months is the average lag between Volery first noticing a founder and the founder closing a round. Three of the firm’s last seven highest-conviction bets were noticed before any cap-table movement at all. The engagement is calibrated for that lag — for the partner who would rather be early than fast.',
    ],
    // Modern dawn skyline — not a library. Reads as the world the founder is about to enter.
    photo:
      'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=2400&q=85',
    plate: 'Plate III · The early light',
    metadata: {
      industry: 'Pre-seed / seed · deep-tech · AI infrastructure',
      aumBand: '$60M–$250M',
      engagement: 'Founder intelligence · Conviction scoring · thesis-fit threshold enforcement',
      outcome: 'Three-times-faster founder discovery · 41/100 thesis-fit threshold enforced',
      started: 'Illustrative engagement',
    },
  },
];
