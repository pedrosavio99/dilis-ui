import { useState } from 'react';
import { Button } from '@dilis/ui';
import type { ButtonVariant, ButtonSize } from '@dilis/ui';
import { CodeBlock } from '../components/CodeBlock';
import { Example } from '../components/Example';


const variants: ButtonVariant[] = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'danger',
];
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ButtonsView() {
  const [variant, setVariant] = useState<ButtonVariant>('primary');
  const [size, setSize] = useState<ButtonSize>('md');
  const [loading, setLoading] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);

  const playgroundCode = `<Button variant="${variant}" size="${size}"${
    loading ? ' loading' : ''
  }${fullWidth ? ' fullWidth' : ''}>
  Botao Dilis
</Button>`;

  return (
    <div className="view">
      <header className="view__head">
        <h2 className="view__title">Button</h2>
        <p className="view__lead">
          Botao base. Aceita todas as props nativas de <code>button</code> mais{' '}
          <code>variant</code>, <code>size</code>, <code>loading</code>,{' '}
          <code>fullWidth</code> e icones.
        </p>
      </header>

      <div className="view__import">
        <span className="view__import-label">import</span>
        <CodeBlock lang="tsx" code={`import { Button } from '@dilis/ui';`} />
      </div>

      <Example
        title="Variantes"
        code={`<Button variant="primary">primary</Button>
<Button variant="secondary">secondary</Button>
<Button variant="outline">outline</Button>
<Button variant="ghost">ghost</Button>
<Button variant="danger">danger</Button>`}
      >
        <div className="row">
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {v}
            </Button>
          ))}
        </div>
      </Example>

      <Example
        title="Tamanhos"
        code={`<Button size="sm">Tamanho sm</Button>
<Button size="md">Tamanho md</Button>
<Button size="lg">Tamanho lg</Button>`}
      >
        <div className="row row--baseline">
          {sizes.map((s) => (
            <Button key={s} size={s}>
              Tamanho {s}
            </Button>
          ))}
        </div>
      </Example>

      <Example
        title="Estados"
        code={`<Button>Normal</Button>
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
<Button leftIcon={<ArrowIcon />}>Icone esquerda</Button>
<Button rightIcon={<ArrowIcon />}>Icone direita</Button>`}
      >
        <div className="row">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button leftIcon={<ArrowIcon />}>Icone esquerda</Button>
          <Button rightIcon={<ArrowIcon />}>Icone direita</Button>
        </div>
      </Example>

      <Example
        title="Override com Tailwind / className"
        code={`<Button className="rounded-full px-10 bg-neutral-900">
  Estilo customizado
</Button>`}
      >
        <div className="row">
          <Button className="custom-btn">Estilo customizado</Button>
        </div>
      </Example>

      <section className="block">
        <h3 className="block__title">Playground</h3>
        <div className="playground">
          <div className="controls">
            <label className="control">
              <span>variant</span>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value as ButtonVariant)}
              >
                {variants.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
            <label className="control">
              <span>size</span>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as ButtonSize)}
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="control control--check">
              <input
                type="checkbox"
                checked={loading}
                onChange={(e) => setLoading(e.target.checked)}
              />
              <span>loading</span>
            </label>
            <label className="control control--check">
              <input
                type="checkbox"
                checked={fullWidth}
                onChange={(e) => setFullWidth(e.target.checked)}
              />
              <span>fullWidth</span>
            </label>
          </div>
          <div className="preview">
            <Button
              variant={variant}
              size={size}
              loading={loading}
              fullWidth={fullWidth}
            >
              Botao Dilis
            </Button>
          </div>
        </div>
        <CodeBlock code={playgroundCode} />
      </section>
    </div>
  );
}