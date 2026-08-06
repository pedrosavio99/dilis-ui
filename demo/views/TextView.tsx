import { Text } from '@dilis/ui';
import type { TextVariant } from '@dilis/ui';
import { CodeBlock } from '../components/CodeBlock';
import { Example } from '../components/Example';

const escala: TextVariant[] = [
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
          Sistema tipografico completo. Uma variante pra cada estilo, saindo dos
          tokens. Renderiza a tag HTML certa por variante e aceita <code>as</code>,{' '}
          <code>weight</code>, <code>color</code>, <code>align</code> e{' '}
          <code>truncate</code>.
        </p>
      </header>

      <div className="view__import">
        <span className="view__import-label">import</span>
        <CodeBlock lang="tsx" code={`import { Text } from '@dilis/ui';`} />
      </div>

      <Example
        title="Escala completa"
        code={`<Text variant="display">Display</Text>
<Text variant="h1">Heading 1</Text>
<Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>
<Text variant="h4">Heading 4</Text>
<Text variant="h5">Heading 5</Text>
<Text variant="h6">Heading 6</Text>
<Text variant="body">Body padrao</Text>
<Text variant="body-sm">Body small</Text>
<Text variant="caption">Caption</Text>
<Text variant="overline">Overline</Text>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
          {escala.map((v) => (
            <Text key={v} variant={v}>
              {v}
            </Text>
          ))}
        </div>
      </Example>

      <Example
        title="Cores semanticas"
        code={`<Text color="default">default</Text>
<Text color="muted">muted</Text>
<Text color="primary">primary</Text>
<Text color="success">success</Text>
<Text color="warning">warning</Text>
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

      <Example
        title="Pesos"
        code={`<Text weight="light">light</Text>
<Text weight="regular">regular</Text>
<Text weight="medium">medium</Text>
<Text weight="bold">bold</Text>
<Text weight="black">black</Text>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <Text weight="light">light</Text>
          <Text weight="regular">regular</Text>
          <Text weight="medium">medium</Text>
          <Text weight="bold">bold</Text>
          <Text weight="black">black</Text>
        </div>
      </Example>

      <Example
        title="Trocar a tag (as) e code inline"
        code={`<Text variant="h1" as="h2">h1 no estilo, h2 no HTML</Text>
<Text variant="body">Rode <Text as="span" variant="code">npm install</Text> antes.</Text>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Text variant="h3" as="h2">
            h3 no estilo, h2 no HTML
          </Text>
          <Text variant="body">
            Rode{' '}
            <Text as="span" variant="code">
              npm install
            </Text>{' '}
            antes.
          </Text>
        </div>
      </Example>

      <Example
        title="Truncate em 1 linha"
        code={`<Text truncate>Texto muito longo que corta com reticencias...</Text>`}
      >
        <div style={{ maxWidth: 280 }}>
          <Text truncate>
            Texto muito longo que nao cabe e vai cortar com reticencias no final
          </Text>
        </div>
      </Example>
    </div>
  );
}
