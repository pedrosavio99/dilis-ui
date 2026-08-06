/**
 * Tokens de layout: espacamento, radius, sombras e breakpoints.
 * Escala de espacamento com base de 4px (md = 16px).
 */

export const spacing = {
  none: '0',
  xs: '0.25rem', // 4
  sm: '0.5rem', // 8
  md: '1rem', // 16
  lg: '1.5rem', // 24
  xl: '2rem', // 32
  '2xl': '3rem', // 48
  '3xl': '4rem', // 64
} as const;

export const radius = {
  none: '0',
  sm: '0.25rem', // 4
  md: '0.5rem', // 8
  lg: '0.75rem', // 12
  xl: '1rem', // 16
  full: '9999px',
} as const;

/** Sombras baseadas no chumbo da marca para ficarem neutras. */
export const shadow = {
  none: 'none',
  sm: '0 1px 2px rgba(51, 51, 51, 0.08)',
  md: '0 4px 12px rgba(51, 51, 51, 0.12)',
  lg: '0 10px 24px rgba(51, 51, 51, 0.16)',
  xl: '0 20px 48px rgba(51, 51, 51, 0.20)',
} as const;

/** Breakpoints em px, usados em media queries. */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Spacing = typeof spacing;
export type Radius = typeof radius;
export type Shadow = typeof shadow;
export type Breakpoints = typeof breakpoints;
