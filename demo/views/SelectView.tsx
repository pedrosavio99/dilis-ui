import { useState } from 'react';
import { Select } from '@dilis/ui';
import { CodeBlock } from '../components/CodeBlock';
import { Example } from '../components/Example';

interface Cargo {
  id: number;
  nome: string;
  area: string;
}

const cargos: Cargo[] = [
  { id: 1, nome: 'Desenvolvedor', area: 'Tech' },
  { id: 2, nome: 'Designer', area: 'Produto' },
  { id: 3, nome: 'Gerente de Projetos', area: 'Gestao' },
  { id: 4, nome: 'Analista de Dados', area: 'Tech' },
];

const ufs = ['PB', 'PE', 'RN', 'CE', 'BA', 'SP', 'RJ', 'MG'];

export function SelectView() {
  const [uf, setUf] = useState<string | null>(null);
  const [cargo, setCargo] = useState<Cargo | null>(null);
  const [err, setErr] = useState<string | null>(null);

  return (
    <div className="view">
      <header className="view__head">
        <h2 className="view__title">Select</h2>
        <p className="view__lead">
          Select generico com dropdown proprio. Voce passa <code>options</code> e{' '}
          <code>getOptionLabel</code>. Mesma linha de foco e rotulo flutuante do
          Input, mais navegacao por teclado (setas, Enter, Esc).
        </p>
      </header>

      <div className="view__import">
        <span className="view__import-label">import</span>
        <CodeBlock lang="tsx" code={`import { Select } from '@dilis/ui';`} />
      </div>

      <Example
        title="Opcoes string (T = string)"
        code={`const ufs = ['PB', 'PE', 'RN', 'CE'];

<Select<string>
  label="UF"
  options={ufs}
  getOptionLabel={(uf) => uf}
  onChange={setUf}
/>`}
      >
        <div style={{ maxWidth: 320, width: '100%' }}>
          <Select<string>
            label="UF"
            options={ufs}
            getOptionLabel={(u) => u}
            value={uf}
            onChange={setUf}
          />
          <p style={{ marginTop: '0.75rem', color: 'var(--dui-color-neutral-600)' }}>
            {uf ? `Escolheu: ${uf}` : 'Nada selecionado'}
          </p>
        </div>
      </Example>

      <Example
        title="Objeto com label flutuante (T = Cargo)"
        code={`interface Cargo { id: number; nome: string; area: string }

<Select<Cargo>
  label="Cargo"
  floatingLabel
  options={cargos}
  getOptionLabel={(c) => c.nome}
  getOptionValue={(c) => c.id}
  renderOption={(c) => c.nome + '  (' + c.area + ')'}
  onChange={setCargo}
/>`}
      >
        <div style={{ maxWidth: 360, width: '100%' }}>
          <Select<Cargo>
            label="Cargo"
            floatingLabel
            options={cargos}
            getOptionLabel={(c) => c.nome}
            getOptionValue={(c) => c.id}
            renderOption={(c) => (
              <span>
                {c.nome}
                <span style={{ color: 'var(--dui-color-neutral-400)', marginLeft: 8 }}>
                  {c.area}
                </span>
              </span>
            )}
            value={cargo}
            onChange={setCargo}
          />
          <p style={{ marginTop: '0.75rem', color: 'var(--dui-color-neutral-600)' }}>
            {cargo ? `Cargo: ${cargo.nome} (${cargo.area})` : 'Nenhum cargo'}
          </p>
        </div>
      </Example>

      <Example
        title="Cor da linha e estado de erro"
        code={`<Select<string>
  label="UF"
  options={ufs}
  getOptionLabel={(uf) => uf}
  accentColor="#1aa053"
/>

<Select<string>
  label="Obrigatorio"
  options={ufs}
  getOptionLabel={(uf) => uf}
  error="Selecione uma opcao"
/>`}
      >
        <div className="row" style={{ gap: '2rem', maxWidth: 480, width: '100%' }}>
          <div style={{ flex: 1 }}>
            <Select<string>
              label="Verde"
              options={ufs}
              getOptionLabel={(u) => u}
              accentColor="#1aa053"
            />
          </div>
          <div style={{ flex: 1 }}>
            <Select<string>
              label="Obrigatorio"
              options={ufs}
              getOptionLabel={(u) => u}
              error={err ?? undefined}
              onChange={() => setErr(null)}
            />
            <button
              type="button"
              onClick={() => setErr('Selecione uma opcao')}
              style={{ marginTop: 8, fontSize: 12 }}
            >
              simular erro
            </button>
          </div>
        </div>
      </Example>
    </div>
  );
}
