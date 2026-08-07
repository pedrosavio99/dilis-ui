import { useState } from 'react';
import { Checkbox } from '@dilis/ui';
import { CodeBlock } from '../components/CodeBlock';
import { Example } from '../components/Example';

export function CheckboxView() {
  const [novidades, setNovidades] = useState(true);

  // exemplo de "selecionar tudo" com estado indeterminado
  const [itens, setItens] = useState([true, false, true]);
  const marcados = itens.filter(Boolean).length;
  const todos = marcados === itens.length;
  const nenhum = marcados === 0;

  return (
    <div className="view">
      <header className="view__head">
        <h2 className="view__title">Checkbox</h2>
        <p className="view__lead">
          Caixa de selecao com label, 3 tamanhos, estado indeterminado e cor por{' '}
          <code>accentColor</code>. Usa <code>input</code> nativo por baixo, entao
          funciona em formulario e com teclado normalmente.
        </p>
      </header>

      <div className="view__import">
        <span className="view__import-label">import</span>
        <CodeBlock lang="tsx" code={`import { Checkbox } from '@dilis/ui';`} />
      </div>

      <Example
        title="Basico"
        code={`<Checkbox label="Aceito os termos" defaultChecked />
<Checkbox label="Receber novidades" />
<Checkbox label="Opcao desabilitada" disabled />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Checkbox label="Aceito os termos" defaultChecked />
          <Checkbox
            label="Receber novidades"
            checked={novidades}
            onChange={(e) => setNovidades(e.target.checked)}
          />
          <Checkbox label="Opcao desabilitada" disabled />
          <Checkbox label="Desabilitada e marcada" disabled defaultChecked />
        </div>
      </Example>

      <Example
        title="Com descricao"
        code={`<Checkbox
  label="Notificacoes por email"
  description="Enviamos no maximo um resumo por semana."
/>`}
      >
        <Checkbox
          label="Notificacoes por email"
          description="Enviamos no maximo um resumo por semana."
          defaultChecked
        />
      </Example>

      <Example
        title="Indeterminado (selecionar tudo)"
        code={`// pai fica indeterminado quando so parte dos filhos esta marcada
<Checkbox
  label="Selecionar tudo"
  checked={todos}
  indeterminate={!todos && !nenhum}
  onChange={(e) => marcarTodos(e.target.checked)}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Checkbox
            label="Selecionar tudo"
            checked={todos}
            indeterminate={!todos && !nenhum}
            onChange={(e) => setItens(itens.map(() => e.target.checked))}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.75rem' }}>
            {['Campina Grande', 'Caruaru', 'Sao Braz'].map((nome, i) => (
              <Checkbox
                key={nome}
                label={nome}
                checked={itens[i]}
                onChange={(e) =>
                  setItens(itens.map((v, j) => (j === i ? e.target.checked : v)))
                }
              />
            ))}
          </div>
        </div>
      </Example>

      <Example
        title="Tamanhos e cor custom"
        code={`<Checkbox label="sm" checkboxSize="sm" defaultChecked />
<Checkbox label="md" checkboxSize="md" defaultChecked />
<Checkbox label="lg" checkboxSize="lg" defaultChecked />
<Checkbox label="verde" accentColor="#1aa053" defaultChecked />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Checkbox label="sm" checkboxSize="sm" defaultChecked />
          <Checkbox label="md" checkboxSize="md" defaultChecked />
          <Checkbox label="lg" checkboxSize="lg" defaultChecked />
          <Checkbox label="cor custom (verde)" accentColor="#1aa053" defaultChecked />
        </div>
      </Example>
    </div>
  );
}
