import { useState } from 'react';
import { SearchInput } from '@dilis/ui';
import { CodeBlock } from '../components/CodeBlock';
import { Example } from '../components/Example';

/* Exemplo de funcao externa: busca estado/cidade via API do IBGE.
   Mostra como se tipa o dado que entra no SearchInput (o T). */

interface Localidade {
  id: number;
  nome: string;
  tipo: 'estado' | 'cidade';
  uf?: string;
}

let cacheEstados: Localidade[] | null = null;
let cacheCidades: Localidade[] | null = null;

async function buscarLocalidades(query: string): Promise<Localidade[]> {
  const q = query.trim().toLowerCase();

  if (!cacheEstados) {
    const r = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
    );
    const data: Array<{ id: number; sigla: string; nome: string }> = await r.json();
    cacheEstados = data.map((e) => ({
      id: e.id,
      nome: e.nome,
      tipo: 'estado',
      uf: e.sigla,
    }));
  }

  if (!cacheCidades) {
    const r = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome',
    );
    const data: Array<{
      id: number;
      nome: string;
      microrregiao?: { mesorregiao?: { UF?: { sigla?: string } } };
    }> = await r.json();
    cacheCidades = data.map((c) => ({
      id: c.id,
      nome: c.nome,
      tipo: 'cidade',
      uf: c.microrregiao?.mesorregiao?.UF?.sigla,
    }));
  }

  const estados = cacheEstados.filter((e) => e.nome.toLowerCase().includes(q));
  const cidades = cacheCidades
    .filter((c) => c.nome.toLowerCase().includes(q))
    .slice(0, 8);
  return [...estados, ...cidades].slice(0, 10);
}

const frutas = ['Banana', 'Maca', 'Uva', 'Manga', 'Abacaxi', 'Melancia', 'Morango'];
function buscarFrutas(q: string): string[] {
  return frutas.filter((f) => f.toLowerCase().includes(q.toLowerCase()));
}

export function SearchInputView() {
  const [local, setLocal] = useState<Localidade | null>(null);
  const [fruta, setFruta] = useState('');

  return (
    <div className="view">
      <header className="view__head">
        <h2 className="view__title">SearchInput</h2>
        <p className="view__lead">
          Autocomplete generico. Voce passa a funcao de busca por{' '}
          <code>fetchOptions</code> (sync ou async), diz como extrair o texto com{' '}
          <code>getOptionLabel</code> e trata a escolha em <code>onSelect</code>.
          Ele nao sabe nada do seu dado, so do tipo <code>T</code> que voce der.
        </p>
      </header>

      <div className="view__import">
        <span className="view__import-label">import</span>
        <CodeBlock lang="tsx" code={`import { SearchInput } from '@dilis/ui';`} />
      </div>

      <Example
        title="Estado ou cidade (API do IBGE, async)"
        code={`interface Localidade {
  id: number;
  nome: string;
  tipo: 'estado' | 'cidade';
  uf?: string;
}

async function buscarLocalidades(q: string): Promise<Localidade[]> {
  const r = await fetch(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
  );
  // ... mapeia estados e cidades pro tipo Localidade
}

<SearchInput<Localidade>
  label="Estado ou cidade"
  floatingLabel
  minChars={2}
  fetchOptions={buscarLocalidades}
  getOptionLabel={(l) => (l.tipo === 'cidade' ? l.nome + ' - ' + l.uf : l.nome)}
  getOptionKey={(l) => l.tipo + '-' + l.id}
  onSelect={setLocal}
/>`}
      >
        <div style={{ maxWidth: 420, width: '100%' }}>
          <SearchInput<Localidade>
            label="Estado ou cidade"
            floatingLabel
            minChars={2}
            fetchOptions={buscarLocalidades}
            getOptionLabel={(l) =>
              l.tipo === 'cidade' ? `${l.nome} - ${l.uf}` : l.nome
            }
            getOptionKey={(l) => `${l.tipo}-${l.id}`}
            renderOption={(l) => (
              <span>
                {l.nome}
                <span style={{ color: 'var(--dui-color-neutral-400)', marginLeft: 8 }}>
                  {l.tipo === 'cidade' ? `cidade / ${l.uf}` : 'estado'}
                </span>
              </span>
            )}
            onSelect={setLocal}
          />
          <p style={{ marginTop: '0.75rem', color: 'var(--dui-color-neutral-600)' }}>
            {local
              ? `Selecionado: ${local.nome} (${local.tipo}${local.uf ? ' / ' + local.uf : ''})`
              : 'Digite 2+ letras (ex: sao, rio, minas)'}
          </p>
        </div>
      </Example>

      <Example
        title="Funcao sync com string[] (T = string)"
        code={`const frutas = ['Banana', 'Maca', 'Uva'];
function buscarFrutas(q: string): string[] {
  return frutas.filter((f) => f.toLowerCase().includes(q.toLowerCase()));
}

<SearchInput<string>
  placeholder="Buscar fruta"
  fetchOptions={buscarFrutas}
  getOptionLabel={(f) => f}
  onSelect={setFruta}
/>`}
      >
        <div style={{ maxWidth: 420, width: '100%' }}>
          <SearchInput<string>
            placeholder="Buscar fruta"
            fetchOptions={buscarFrutas}
            getOptionLabel={(f) => f}
            onSelect={setFruta}
          />
          <p style={{ marginTop: '0.75rem', color: 'var(--dui-color-neutral-600)' }}>
            {fruta ? `Escolheu: ${fruta}` : 'Ex: ma, uva, mel'}
          </p>
        </div>
      </Example>

      <Example
        title="Cor da linha configuravel"
        code={`<SearchInput<string>
  placeholder="Verde"
  accentColor="#1aa053"
  fetchOptions={buscarFrutas}
  getOptionLabel={(f) => f}
/>`}
      >
        <div style={{ maxWidth: 420, width: '100%' }}>
          <SearchInput<string>
            placeholder="Verde"
            accentColor="#1aa053"
            fetchOptions={buscarFrutas}
            getOptionLabel={(f) => f}
          />
        </div>
      </Example>
    </div>
  );
}
