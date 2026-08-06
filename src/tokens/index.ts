import { colors } from './colors';
import { typography } from './typography';
import { spacing, radius, shadow, breakpoints } from './layout';

export * from './colors';
export * from './typography';
export * from './layout';

/**
 * Objeto unico com todos os tokens.
 * Use no lado JS quando precisar dos valores em runtime.
 * No lado CSS, prefira as variaveis --dui-* (tokens.css).
 */
export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadow,
  breakpoints,
} as const;

export type Theme = typeof theme;
