import { Table } from '@dilis/ui';
import type { TableColumn } from '@dilis/ui';
import { CodeBlock } from '../components/CodeBlock';
import { Example } from '../components/Example';

interface Pessoa {
  id: number;
  nome: string;
  cargo: string;
  area: string;
  email: string;
}

const pessoas: Pessoa[] = [
  { id: 1, nome: 'Pedro Savio', cargo: 'Dev Frontend', area: 'Tech', email: 'pedro@dilis.com.br' },
  { id: 2, nome: 'Danilo Nascimento', cargo: 'Dev Backend', area: 'Tech', email: 'danilo@dilis.com.br' },
  { id: 3, nome: 'Hiago Truta', cargo: 'Comercial', area: 'Vendas', email: 'hiago@dilis.com.br' },
  { id: 4, nome: 'Rui Fernando', cargo: 'Designer', area: 'Produto', email: 'rui@dilis.com.br' },
  { id: 5, nome: 'Henzo Barbosa', cargo: 'Dev Mobile', area: 'Tech', email: 'henzo@dilis.com.br' },
  { id: 6, nome: 'Ana Souza', cargo: 'Gerente', area: 'Gestao', email: 'ana@dilis.com.br' },
  { id: 7, nome: 'Clara Lima', cargo: 'Analista', area: 'Dados', email: 'clara@dilis.com.br' },
  { id: 8, nome: 'Mateus Rocha', cargo: 'Dev Frontend', area: 'Tech', email: 'mateus@dilis.com.br' },
  { id: 9, nome: 'Bianca Alves', cargo: 'Social Media', area: 'Marketing', email: 'bianca@dilis.com.br' },
  { id: 10, nome: 'Rafael Dias', cargo: 'DevOps', area: 'Tech', email: 'rafael@dilis.com.br' },
  { id: 11, nome: 'Julia Castro', cargo: 'UX Writer', area: 'Produto', email: 'julia@dilis.com.br' },
  { id: 12, nome: 'Bruno Melo', cargo: 'QA', area: 'Tech', email: 'bruno@dilis.com.br' },
];

const colunas: TableColumn<Pessoa>[] = [
  { id: 'nome', header: 'Nome', cell: (p) => p.nome },
  { id: 'cargo', header: 'Cargo', cell: (p) => p.cargo },
  { id: 'area', header: 'Area', cell: (p) => p.area, align: 'right' },
];

export function TableView() {
  return (
    <div className="view">
      <header className="view__head">
        <h2 className="view__title">Table</h2>
        <p className="view__lead">
          Tabela generica. As variantes vem por prop: <code>expandable</code> liga
          o acordeon e <code>pageSize</code> liga a paginacao. Da pra combinar as
          duas ou usar cada uma sozinha.
        </p>
      </header>

      <div className="view__import">
        <span className="view__import-label">import</span>
        <CodeBlock lang="tsx" code={`import { Table } from '@dilis/ui';`} />
      </div>

      <Example
        title="Sem acordeon, paginada (5 por pagina)"
        code={`const colunas: TableColumn<Pessoa>[] = [
  { id: 'nome', header: 'Nome', cell: (p) => p.nome },
  { id: 'cargo', header: 'Cargo', cell: (p) => p.cargo },
  { id: 'area', header: 'Area', cell: (p) => p.area, align: 'right' },
];

<Table<Pessoa>
  data={pessoas}
  columns={colunas}
  getRowKey={(p) => p.id}
  pageSize={5}
/>`}
      >
        <div style={{ width: '100%' }}>
          <Table<Pessoa>
            data={pessoas}
            columns={colunas}
            getRowKey={(p) => p.id}
            pageSize={5}
          />
        </div>
      </Example>

      <Example
        title="Com acordeon + paginacao"
        code={`<Table<Pessoa>
  data={pessoas}
  columns={colunas}
  getRowKey={(p) => p.id}
  expandable
  pageSize={5}
  renderExpanded={(p) => (
    <div>
      <strong>{p.nome}</strong> - {p.cargo}<br />
      Email: {p.email}
    </div>
  )}
/>`}
      >
        <div style={{ width: '100%' }}>
          <Table<Pessoa>
            data={pessoas}
            columns={colunas}
            getRowKey={(p) => p.id}
            expandable
            pageSize={5}
            renderExpanded={(p) => (
              <div>
                <strong>{p.nome}</strong> - {p.cargo}
                <br />
                Email: {p.email} / Area: {p.area}
              </div>
            )}
          />
        </div>
      </Example>

      <Example
        title="Sem acordeon, sem paginacao (tabela simples)"
        code={`<Table<Pessoa>
  data={pessoas.slice(0, 4)}
  columns={colunas}
  getRowKey={(p) => p.id}
  size="sm"
/>`}
      >
        <div style={{ width: '100%' }}>
          <Table<Pessoa>
            data={pessoas.slice(0, 4)}
            columns={colunas}
            getRowKey={(p) => p.id}
            size="sm"
          />
        </div>
      </Example>
    </div>
  );
}
