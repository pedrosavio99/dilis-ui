import type { InputHTMLAttributes, ReactNode } from 'react';

export type SearchInputSize = 'sm' | 'md' | 'lg';

/**
 * Autocomplete generico. T e o tipo de cada item retornado pela busca.
 * A busca vem de fora (fetchOptions), entao o componente nao sabe nada do
 * dado: quem usa diz como buscar, como extrair o rotulo e o que fazer ao
 * selecionar.
 */
export interface SearchInputProps<T>
  extends Omit
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'onChange' | 'onSelect' | 'value' | 'defaultValue'
  > {
  /** Funcao externa que busca os resultados a partir do texto. Sync ou async. */
  fetchOptions: (query: string) => T[] | Promise<T[]>;
  /** Extrai o texto exibido (e o que vai pro input ao selecionar). */
  getOptionLabel: (item: T) => string;
  /** Chave unica de cada item. Padrao: o proprio label. */
  getOptionKey?: (item: T) => string | number;
  /** Chamado ao selecionar um item do dropdown. */
  onSelect?: (item: T) => void;
  /** Chamado a cada digitacao (texto cru). */
  onQueryChange?: (query: string) => void;
  /** Render custom de cada opcao. Padrao: so o label. */
  renderOption?: (item: T) => ReactNode;
  /** Minimo de caracteres pra disparar a busca. Padrao: 1. */
  minChars?: number;
  /** Debounce em ms entre digitar e buscar. Padrao: 300. */
  debounceMs?: number;
  /** Texto quando a busca nao retorna nada. Padrao: 'Nada encontrado'. */
  emptyMessage?: string;
  /** Rotulo opcional. Com floatingLabel, sobe ao focar/preencher. */
  label?: string;
  /** Ativa o rotulo flutuante. Padrao: false. */
  floatingLabel?: boolean;
  /** Tamanho do campo. Padrao: md. */
  inputSize?: SearchInputSize;
  /** Cor da linha de foco e do item ativo. Padrao: var(--dui-color-primary-500). */
  accentColor?: string;
  /** Classe extra. Entra por ultimo, sobrescreve o estilo base. */
  className?: string;
}
