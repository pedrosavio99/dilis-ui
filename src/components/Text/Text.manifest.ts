import type { ComponentManifest } from '../../meta/manifest.types';

export const textManifest: ComponentManifest = {
  name: 'Text',
  group: 'Componentes',
  summary:
    'Sistema tipografico completo. Uma variante pra cada estilo (display, h1-h6, body, caption, overline, code), com peso, cor, alinhamento e truncate, tudo em tokens.',
  import: "import { Text } from '@dilis/ui';",
  props: [
    {
      name: 'variant',
      type: "'display' | 'h1'..'h6' | 'body' | 'body-sm' | 'caption' | 'overline' | 'code'",
      default: 'body',
      description: 'Estilo tipografico. Define tamanho, peso e a tag HTML padrao.',
    },
    {
      name: 'as',
      type: 'ElementType',
      description: 'Troca a tag HTML renderizada (ex: usar h2 com estilo de h1).',
    },
    {
      name: 'weight',
      type: "'light' | 'regular' | 'medium' | 'bold' | 'black'",
      description: 'Sobrescreve o peso da variante.',
    },
    {
      name: 'color',
      type: "'default' | 'muted' | 'subtle' | 'primary' | 'success' | 'warning' | 'danger' | 'inherit'",
      default: 'default',
      description: 'Cor semantica do texto.',
    },
    {
      name: 'align',
      type: "'left' | 'center' | 'right'",
      description: 'Alinhamento do texto.',
    },
    {
      name: 'truncate',
      type: 'boolean',
      default: 'false',
      description: 'Corta em uma linha com reticencias.',
    },
  ],
  examples: [
    {
      title: 'Titulo e paragrafo',
      code: `<Text variant="h1">Titulo da pagina</Text>
<Text variant="body" color="muted">Subtitulo em cinza.</Text>`,
    },
    {
      title: 'Trocar a tag mantendo o estilo',
      code: '<Text variant="h1" as="h2">Parece h1, mas e um h2 no HTML</Text>',
    },
    {
      title: 'Overline e code',
      code: `<Text variant="overline">Secao</Text>
<Text variant="code">npm install</Text>`,
    },
  ],
  notes: [
    'A tag HTML sai da variante (h1 => h1, body => p) e pode ser trocada com as.',
    'variant define tamanho/peso; weight e color sobrescrevem quando preciso.',
    'Herda os atributos do elemento (onClick, id, aria-*).',
  ],
};

export default textManifest;
