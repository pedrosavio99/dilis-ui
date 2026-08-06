import type { HTMLAttributes, ElementType, ReactNode } from 'react';

export type TextVariant =
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
  | 'code';

export type TextWeight = 'light' | 'regular' | 'medium' | 'bold' | 'black';
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

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Estilo tipografico. Padrao: body. */
  variant?: TextVariant;
  /** Sobrescreve a tag HTML renderizada (padrao vem da variante). */
  as?: ElementType;
  /** Sobrescreve o peso da variante. */
  weight?: TextWeight;
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
