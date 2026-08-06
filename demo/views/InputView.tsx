import { useState } from 'react';
import { Input } from '@dilis/ui';
import type { InputSize } from '@dilis/ui';
import { CodeBlock } from '../components/CodeBlock';
import { Example } from '../components/Example';

const sizes: InputSize[] = ['sm', 'md', 'lg'];

export function InputView() {
  const [floating, setFloating] = useState(true);
  const [size, setSize] = useState<InputSize>('md');
  const [accent, setAccent] = useState('#009fe3');
  const [error, setError] = useState(false);

  const playgroundCode = `<Input
  label="Email"${floating ? '\n  floatingLabel' : ''}
  inputSize="${size}"
  accentColor="${accent}"${error ? '\n  error="Email invalido"' : ''}
/>`;

  return (
    <div className="view">
      <header className="view__head">
        <h2 className="view__title">Input</h2>
        <p className="view__lead">
          Campo de texto. Aceita todas as props nativas de <code>input</code>{' '}
          mais <code>label</code>, <code>floatingLabel</code>,{' '}
          <code>inputSize</code>, <code>accentColor</code>, <code>error</code> e{' '}
          <code>hint</code>. A linha de foco preenche do centro pros lados.
        </p>
      </header>

      <div className="view__import">
        <span className="view__import-label">import</span>
        <CodeBlock lang="tsx" code={`import { Input } from '@dilis/ui';`} />
      </div>

      <Example
        title="Label flutuante (opcional)"
        code={`<Input label="Nome" floatingLabel />
<Input label="Email" floatingLabel type="email" />`}
      >
        <div className="row" style={{ gap: '2rem', maxWidth: 420, width: '100%' }}>
          <Input label="Nome" floatingLabel />
          <Input label="Email" floatingLabel type="email" />
        </div>
      </Example>

      <Example
        title="Label fixo (sem floating)"
        code={`<Input label="Cidade" placeholder="Onde voce mora" />`}
      >
        <div style={{ maxWidth: 420, width: '100%' }}>
          <Input label="Cidade" placeholder="Onde voce mora" />
        </div>
      </Example>

      <Example
        title="Cor da linha configuravel"
        code={`<Input label="Verde" floatingLabel accentColor="#1aa053" />
<Input label="Rosa" floatingLabel accentColor="#e4123b" />`}
      >
        <div className="row" style={{ gap: '2rem', maxWidth: 420, width: '100%' }}>
          <Input label="Verde" floatingLabel accentColor="#1aa053" />
          <Input label="Rosa" floatingLabel accentColor="#e4123b" />
        </div>
      </Example>

      <Example
        title="Estados"
        code={`<Input label="Com ajuda" hint="Texto de apoio" />
<Input label="Com erro" error="Campo obrigatorio" />
<Input label="Desabilitado" disabled />`}
      >
        <div className="row" style={{ gap: '2rem', maxWidth: 640, width: '100%' }}>
          <Input label="Com ajuda" hint="Texto de apoio" />
          <Input label="Com erro" error="Campo obrigatorio" />
          <Input label="Desabilitado" disabled />
        </div>
      </Example>

      <section className="block">
        <h3 className="block__title">Playground</h3>
        <div className="playground">
          <div className="controls">
            <label className="control control--check">
              <input
                type="checkbox"
                checked={floating}
                onChange={(e) => setFloating(e.target.checked)}
              />
              <span>floatingLabel</span>
            </label>
            <label className="control">
              <span>inputSize</span>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as InputSize)}
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="control">
              <span>accentColor</span>
              <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
              />
            </label>
            <label className="control control--check">
              <input
                type="checkbox"
                checked={error}
                onChange={(e) => setError(e.target.checked)}
              />
              <span>error</span>
            </label>
          </div>
          <div className="preview">
            <div style={{ maxWidth: 360, width: '100%' }}>
              <Input
                label="Email"
                floatingLabel={floating}
                inputSize={size}
                accentColor={accent}
                error={error ? 'Email invalido' : undefined}
              />
            </div>
          </div>
        </div>
        <CodeBlock code={playgroundCode} />
      </section>
    </div>
  );
}
