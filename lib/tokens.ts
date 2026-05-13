export const colors = {
  sapphire: '#0B0B0D',
  sapphireDeep: '#070708',
  obsidian: '#16161A',
  abyssal: '#000000',
  pearl: '#F0E8D6',
  pewter: '#B8B5B0',
  brushed: '#9B9A95',
  champagne: '#E8DDB8',
  champagneDeep: '#C6B884',
  // kept for the Decision section
  olive: '#2D3325',
  oliveDeep: '#23281D',
} as const;

export const easing = {
  arrival: [0.16, 1, 0.3, 1] as [number, number, number, number],
  interactive: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;
