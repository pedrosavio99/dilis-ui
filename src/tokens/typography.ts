/**
 * Tokens de tipografia.
 * A fonte base da marca e a Roboto (manual da marca). A display (Geist) e uma
 * camada opcional pros titulos grandes, com fallback pra Roboto se nao carregar.
 */

export const fontFamily = {
  base: "'Roboto', system-ui, -apple-system, Segoe UI, sans-serif",
  display: "'Geist', 'Roboto', system-ui, -apple-system, Segoe UI, sans-serif",
  condensed: "'Roboto Condensed', 'Roboto', system-ui, sans-serif",
  mono: "'Geist Mono', 'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 900,
} as const;

/** Escala de tamanhos em rem (base 16px), mais os fluidos display/hero. */
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
  display: 'clamp(2.5rem, 5.6vw, 5.125rem)', // titulo de secao fluido
  hero: 'clamp(3.5rem, 8.6vw, 7.5rem)', // hero fluido
} as const;

export const lineHeight = {
  none: 0.95,
  tight: 1.15,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.7,
} as const;

export const letterSpacing = {
  tighter: '-0.03em',
  tight: '-0.02em',
  normal: '0',
  wide: '0.06em',
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
