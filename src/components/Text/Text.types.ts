import type { HTMLAttributes, ElementType, ReactNode } from 'react';

export type TextVariant =
  | 'hero'
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'overline'
  | 'label'
  | 'code';

export type TextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'black';
export type TextColor =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'inherit';
export type TextAlign = 'left' | 'center' | 'right';
export type TextTracking = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Estilo tipografico. Padrao: body. */
  variant?: TextVariant;
  /** Sobrescreve a tag HTML renderizada (padrao vem da variante). */
  as?: ElementType;
  /** Sobrescreve o peso da variante. */
  weight?: TextWeight;
  /** Sobrescreve o tracking (letter-spacing) da variante. */
  tracking?: TextTracking;
  /** Cor semantica do texto. Padrao: default. */
  color?: TextColor;
  /** Alinhamento do texto. */
  align?: TextAlign;
  /** Corta em uma linha com reticencias. */
  truncate?: boolean;
  /** Classe extra. Entra por ultimo, sobrescreve o estilo base. */
  className?: string;
  children?: ReactNode;
}
