import type { InputHTMLAttributes } from 'react';

export type DatePickerSize = 'sm' | 'md' | 'lg';

/** Payload de saida: o valor em varios formatos de uma vez. Use o que quiser. */
export interface DatePickerOutput {
  /** Objeto Date (ou null se limpou). */
  date: Date | null;
  /** ISO 8601 (date.toISOString()) ou null. */
  iso: string | null;
  /** Epoch em ms (date.getTime()) ou null. */
  timestamp: number | null;
  /** Texto formatado. */
  formatted: string;
}

export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'defaultValue' | 'value'> {
  /** Data selecionada (controlado). */
  value?: Date | null;
  /** Selecao inicial (nao controlado). */
  defaultValue?: Date | null;
  /** Chamado ao mudar. Recebe o valor em varios formatos. */
  onChange?: (out: DatePickerOutput) => void;
  /** Mostra selecao de hora (HH:mm) e estende a mascara. Padrao: false. */
  withTime?: boolean;
  /** Rotulo. Com floatingLabel, sobe ao focar/preencher. */
  label?: string;
  /** Ativa o rotulo flutuante. Padrao: false. */
  floatingLabel?: boolean;
  /** Dica do campo. Padrao: dd/mm/aaaa (ou com hh:mm se withTime). */
  placeholder?: string;
  /** Formata out.formatted (o campo em si sempre usa a mascara). */
  formatValue?: (date: Date, withTime: boolean) => string;
  /** Menor data selecionavel. */
  minDate?: Date;
  /** Maior data selecionavel. */
  maxDate?: Date;
  /** Tamanho. Padrao: md. */
  inputSize?: DatePickerSize;
  /** Cor da linha, do dia selecionado e do foco. Padrao: primary-500. */
  accentColor?: string;
  /** Desabilita o campo. */
  disabled?: boolean;
  /** Classe extra. Entra por ultimo, sobrescreve o estilo base. */
  className?: string;
}
