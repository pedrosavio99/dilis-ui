import type { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Texto ao lado da caixinha. */
  label?: ReactNode;
  /** Linha de apoio abaixo do label. */
  description?: ReactNode;
  /** Tamanho. Padrao: md. */
  checkboxSize?: CheckboxSize;
  /** Estado indeterminado (nem marcado nem desmarcado). Padrao: false. */
  indeterminate?: boolean;
  /** Cor do preenchimento marcado e do foco. Padrao: primary-500. */
  accentColor?: string;
  /** Classe extra. Entra por ultimo, sobrescreve o estilo base. */
  className?: string;
}
