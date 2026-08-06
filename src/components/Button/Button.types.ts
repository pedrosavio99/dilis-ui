import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estilo visual do botao. Padrao: primary. */
  variant?: ButtonVariant;
  /** Tamanho do botao. Padrao: md. */
  size?: ButtonSize;
  /** Ocupa 100% da largura do container. */
  fullWidth?: boolean;
  /** Mostra spinner e bloqueia o clique. */
  loading?: boolean;
  /** Icone a esquerda do texto. */
  leftIcon?: ReactNode;
  /** Icone a direita do texto. */
  rightIcon?: ReactNode;
  /**
   * Classe extra. Entra por ultimo, entao utilities do Tailwind
   * conseguem sobrescrever o estilo base.
   */
  className?: string;
}
