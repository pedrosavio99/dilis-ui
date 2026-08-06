/**
 * Tokens de tipografia.
 * A fonte oficial da marca e a Roboto (manual da marca).
 */

export const fontFamily = {
  base: "'Roboto', system-ui, -apple-system, Segoe UI, sans-serif",
  condensed: "'Roboto Condensed', 'Roboto', system-ui, sans-serif",
  mono: "'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
} as const;

/** Escala de tamanhos em rem (base 16px). */
export const fontSize = {
  xs: '0.75rem', // 12
  sm: '0.875rem', // 14
  md: '1rem', // 16
  lg: '1.125rem', // 18
  xl: '1.25rem', // 20
  '2xl': '1.5rem', // 24
  '3xl': '1.875rem', // 30
  '4xl': '2.25rem', // 36
  '5xl': '3rem', // 48
} as const;

export const lineHeight = {
  tight: 1.15,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.7,
} as const;

export const letterSpacing = {
  tight: '-0.01em',
  normal: '0',
  wide: '0.04em',
  wider: '0.12em',
} as const;

export const typography = {
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
} as const;

export type Typography = typeof typography;
