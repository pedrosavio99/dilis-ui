import type { HTMLAttributes, ReactNode } from 'react';

export type TableSize = 'sm' | 'md' | 'lg';
export type TableAlign = 'left' | 'center' | 'right';

/** Definicao de uma coluna. cell extrai o conteudo de cada linha (generico). */
export interface TableColumn<T> {
  /** Id unico da coluna. */
  id: string;
  /** Cabecalho da coluna. */
  header: ReactNode;
  /** Conteudo da celula pra cada item. */
  cell: (item: T) => ReactNode;
  /** Alinhamento do texto. Padrao: left. */
  align?: TableAlign;
  /** Largura fixa opcional (ex: '120px', '20%'). */
  width?: string;
}

/**
 * Tabela generica. T e o tipo de cada linha.
 * Variantes por prop: expandable (acordeon) e pageSize (paginacao).
 */
export interface TableProps<T>
  extends Omit<HTMLAttributes<HTMLTableElement>, 'children'> {
  /** Linhas. */
  data: T[];
  /** Colunas. */
  columns: TableColumn<T>[];
  /** Chave unica de cada linha. */
  getRowKey: (item: T, index: number) => string | number;
  /** Liga o acordeon: cada linha expande mostrando renderExpanded. */
  expandable?: boolean;
  /** Conteudo exibido quando a linha expande (so com expandable). */
  renderExpanded?: (item: T) => ReactNode;
  /** Liga a paginacao com N linhas por pagina. */
  pageSize?: number;
  /** Pagina atual (1-based) controlada. */
  page?: number;
  /** Chamado ao trocar de pagina. */
  onPageChange?: (page: number) => void;
  /** Tamanho. Padrao: md. */
  size?: TableSize;
  /** Cor do item ativo/paginacao. Padrao: var(--dui-color-primary-500). */
  accentColor?: string;
  /** Texto quando nao ha linhas. Padrao: 'Nada pra mostrar'. */
  emptyMessage?: string;
  /** Classe extra. Entra por ultimo, sobrescreve o estilo base. */
  className?: string;
}
