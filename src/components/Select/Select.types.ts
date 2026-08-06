import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';

/**
 * Select generico. T e o tipo de cada opcao. Voce passa as opcoes e diz como
 * extrair o rotulo (e opcionalmente o valor/chave). Funciona controlado
 * (value + onChange) ou sozinho (defaultValue).
 */
export interface SelectProps<T>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value' | 'defaultValue'> {
  /** Lista de opcoes. */
  options: T[];
  /** Opcao selecionada (controlado). */
  value?: T | null;
  /** Selecao inicial (nao controlado). */
  defaultValue?: T | null;
  /** Chamado ao escolher uma opcao. */
  onChange?: (item: T) => void;
  /** Extrai o texto exibido de cada opcao. */
  getOptionLabel: (item: T) => string;
  /** Chave/valor unico de cada opcao. Padrao: o proprio label. */
  getOptionValue?: (item: T) => string | number;
  /** Render custom de cada opcao. Padrao: so o label. */
  renderOption?: (item: T) => ReactNode;
  /** Texto quando nada esta selecionado. Padrao: 'Selecione'. */
  placeholder?: string;
  /** Rotulo. Com floatingLabel, sobe ao abrir/selecionar. */
  label?: string;
  /** Ativa o rotulo flutuante. Padrao: false. */
  floatingLabel?: boolean;
  /** Tamanho. Padrao: md. */
  selectSize?: SelectSize;
  /** Cor da linha de foco e do item ativo. Padrao: var(--dui-color-primary-500). */
  accentColor?: string;
  /** Mensagem de erro. Deixa a linha vermelha e mostra o texto. */
  error?: string;
  /** Texto de ajuda abaixo (ignorado quando ha error). */
  hint?: string;
  /** Classe extra. Entra por ultimo, sobrescreve o estilo base. */
  className?: string;
}
