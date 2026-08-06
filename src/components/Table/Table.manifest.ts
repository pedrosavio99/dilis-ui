import type { ComponentManifest } from '../../meta/manifest.types';

export const tableManifest: ComponentManifest = {
  name: 'Table',
  group: 'Componentes',
  summary:
    'Tabela generica com colunas configuraveis. Variantes por prop: acordeon (expandable) e paginacao (pageSize). Controlada ou nao controlada.',
  import: "import { Table } from '@dilis/ui';",
  props: [
    { name: 'data', type: 'T[]', required: true, description: 'Linhas da tabela.' },
    {
      name: 'columns',
      type: 'TableColumn<T>[]',
      required: true,
      description: 'Colunas. Cada uma tem id, header e cell (item) => ReactNode.',
    },
    {
      name: 'getRowKey',
      type: '(item: T, index: number) => string | number',
      required: true,
      description: 'Chave unica de cada linha.',
    },
    {
      name: 'expandable',
      type: 'boolean',
      default: 'false',
      description: 'Liga o acordeon: cada linha expande mostrando renderExpanded.',
    },
    {
      name: 'renderExpanded',
      type: '(item: T) => ReactNode',
      description: 'Conteudo exibido ao expandir a linha (so com expandable).',
    },
    {
      name: 'pageSize',
      type: 'number',
      description: 'Liga a paginacao com N linhas por pagina.',
    },
    {
      name: 'page',
      type: 'number',
      description: 'Pagina atual (1-based) controlada.',
    },
    {
      name: 'onPageChange',
      type: '(page: number) => void',
      description: 'Chamado ao trocar de pagina.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description: 'Tamanho das celulas.',
    },
    {
      name: 'accentColor',
      type: 'string',
      default: 'var(--dui-color-primary-500)',
      description: 'Cor da pagina ativa e do indicador de expansao.',
    },
  ],
  examples: [
    {
      title: 'Sem acordeon, paginada',
      code: `<Table<Pessoa>
  data={pessoas}
  getRowKey={(p) => p.id}
  pageSize={5}
  columns={[
    { id: 'nome', header: 'Nome', cell: (p) => p.nome },
    { id: 'cargo', header: 'Cargo', cell: (p) => p.cargo },
  ]}
/>`,
    },
    {
      title: 'Com acordeon',
      code: `<Table<Pessoa>
  data={pessoas}
  getRowKey={(p) => p.id}
  expandable
  renderExpanded={(p) => <div>Email: {p.email}</div>}
  columns={colunas}
/>`,
    },
  ],
  notes: [
    'Generica em T; o conteudo de cada celula vem de column.cell(item).',
    'expandable e pageSize sao independentes: da pra usar juntos ou separados.',
    'Paginacao controlada (page + onPageChange) ou automatica (so pageSize).',
  ],
};

export default tableManifest;
