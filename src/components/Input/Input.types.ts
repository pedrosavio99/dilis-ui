import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

// Omit 'size' porque o input nativo ja usa 'size' (number) pra largura em chars.
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Rotulo do campo. Com floatingLabel, vira o placeholder que sobe. */
  label?: string;
  /**
   * Ativa o rotulo flutuante: o texto comeca dentro do campo e sobe pequeno
   * pra cima ao focar ou quando ha conteudo. Padrao: false.
   */
  floatingLabel?: boolean;
  /** Tamanho do campo. Padrao: md. */
  inputSize?: InputSize;
  /**
   * Cor da linha de foco (que preenche do centro pros lados). Aceita qualquer
   * cor CSS ou token. Padrao: var(--dui-color-primary-500).
   */
  accentColor?: string;
  /** Mensagem de erro. Deixa a linha vermelha e exibe o texto abaixo. */
  error?: string;
  /** Texto de ajuda abaixo do campo (ignorado quando ha error). */
  hint?: string;
  /** Conteudo a esquerda do campo (icone, etc). */
  leftSlot?: ReactNode;
  /** Classe extra. Entra por ultimo, entao sobrescreve o estilo base. */
  className?: string;
}
