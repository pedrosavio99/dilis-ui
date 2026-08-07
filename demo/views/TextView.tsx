import { Text } from '@dilis/ui';
import type { TextVariant } from '@dilis/ui';
import { CodeBlock } from '../components/CodeBlock';
import { Example } from '../components/Example';

const escala: TextVariant[] = [
  'hero',
  'display',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body',
  'body-sm',
  'caption',
  'overline',
];

export function TextView() {
  return (
    <div className="view">
      <header className="view__head">
        <h2 className="view__title">Typography (Text)</h2>
        <p className="view__lead">
          Sistema tipografico completo, saindo dos tokens. Titulos grandes
          (<code>hero</code>, <code>display</code>, <code>h1</code>, <code>h2</code>)
          usam a fonte display com tracking negativo e leading apertado. Aceita{' '}
          <code>as</code>, <code>weight</code>, <code>tracking</code>,{' '}
          <code>color</code>, <code>align</code> e <code>truncate</code>.
        </p>
      </header>

      <div className="view__import">
        <span className="view__import-label">import</span>
        <CodeBlock lang="tsx" code={`import { Text } from '@dilis/ui';`} />
      </div>

      <Example
        title="Rotulo de secao + titulo (padrao da LP)"
        code={`<Text variant="label">Servicos</Text>
<Text variant="display">Producao de eventos e ativacoes</Text>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Text variant="label">Servicos</Text>
          <Text variant="display">Producao de eventos e ativacoes</Text>
        </div>
      </Example>

      <Example
        title="Escala completa"
        code={`<Text variant="hero">Hero</Text>
<Text variant="display">Display</Text>
<Text variant="h1">Heading 1</Text>
<Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>
<Text variant="body">Body padrao</Text>
<Text variant="label">Label</Text>
<Text variant="overline">Overline</Text>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
          {escala.map((v) => (
            <Text key={v} variant={v}>
              {v}
            </Text>
          ))}
          <Text variant="label">label</Text>
        </div>
      </Example>

      <Example
        title="Pesos (com o novo semibold 600)"
        code={`<Text weight="light">light</Text>
<Text weight="regular">regular</Text>
<Text weight="medium">medium</Text>
<Text weight="semibold">semibold</Text>
<Text weight="bold">bold</Text>
<Text weight="black">black</Text>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <Text weight="light">light</Text>
          <Text weight="regular">regular</Text>
          <Text weight="medium">medium</Text>
          <Text weight="semibold">semibold</Text>
          <Text weight="bold">bold</Text>
          <Text weight="black">black</Text>
        </div>
      </Example>

      <Example
        title="Tracking (letter-spacing)"
        code={`<Text variant="h2" tracking="tighter">tighter</Text>
<Text variant="h2" tracking="normal">normal</Text>
<Text variant="h2" tracking="wide">wide</Text>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <Text variant="h2" tracking="tighter">tighter</Text>
          <Text variant="h2" tracking="normal">normal</Text>
          <Text variant="h2" tracking="wide">wide</Text>
        </div>
      </Example>

      <Example
        title="Cores semanticas"
        code={`<Text color="muted">muted</Text>
<Text color="primary">primary</Text>
<Text color="danger">danger</Text>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <Text color="default">default</Text>
          <Text color="muted">muted</Text>
          <Text color="primary">primary</Text>
          <Text color="success">success</Text>
          <Text color="warning">warning</Text>
          <Text color="danger">danger</Text>
        </div>
      </Example>
    </div>
  );
}
