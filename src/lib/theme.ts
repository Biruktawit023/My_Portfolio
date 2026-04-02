export const theme = {
  bg: {
    primary: '#0F172A',  // page background
    card:    '#1E293B',  // card / navbar background
  },
  text: {
    primary:   '#F8FAFC',
    secondary: '#94A3B8',
  },
  accent: {
    primary: '#E11D48',  // rose-700 — active states, borders
    glow:    '#F43F5E',  // rose-500 — glows, particles, cursor
    hover:   '#FB7185',  // rose-400 — hover text
  },
} as const

// Flat exports for convenience
export const BG_PRIMARY    = theme.bg.primary
export const BG_CARD       = theme.bg.card
export const TEXT_PRIMARY  = theme.text.primary
export const TEXT_MUTED    = theme.text.secondary
export const ACCENT        = theme.accent.primary
export const ACCENT_GLOW   = theme.accent.glow
export const ACCENT_HOVER  = theme.accent.hover
