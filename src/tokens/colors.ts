/**
 * Tokens de cor da Dilis.
 *
 * Base retirada do manual da marca:
 *   primaria  #009fe3  (PANTONE 2925 C)
 *   chumbo    #333333  (PANTONE 7546 C)
 *   branco    #ffffff  (PANTONE Process White C)
 *
 * As escalas foram geradas a partir dessas cores base para dar
 * flexibilidade de uso (fundos, bordas, estados hover, etc) sem
 * fugir da identidade visual.
 */

export const primary = {
  50: '#e6f6fd',
  100: '#ccecfb',
  200: '#99d9f6',
  300: '#66c6f0',
  400: '#33b2eb',
  500: '#009fe3', // cor da marca
  600: '#0087c1',
  700: '#006f9f',
  800: '#00577d',
  900: '#00405b',
} as const;

export const neutral = {
  0: '#ffffff',
  50: '#f5f6f7',
  100: '#e9eaec',
  200: '#d3d5d8',
  300: '#b0b3b8',
  400: '#85898f',
  500: '#5f636a',
  600: '#474a50',
  700: '#3a3d42',
  800: '#333333', // chumbo da marca
  900: '#1a1a1a',
  1000: '#000000',
} as const;

/**
 * Cores semanticas para estados de interface.
 * Info reaproveita a primaria da marca. As demais vem das
 * paletas de apoio (triade) mostradas no manual.
 */
export const semantic = {
  info: '#009fe3',
  success: '#1aa053',
  warning: '#f5a623',
  danger: '#e4123b',
} as const;

export const colors = {
  primary,
  neutral,
  semantic,
  white: '#ffffff',
  black: '#000000',
} as const;

export type ColorScale = typeof primary;
export type Colors = typeof colors;
