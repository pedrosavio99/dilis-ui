import type { ComponentManifest } from '../../meta/manifest.types';

export const textManifest: ComponentManifest = {
  name: 'Text',
  group: 'Componentes',
  summary:
    'Sistema tipografico completo. Uma variante pra cada estilo (hero, display, h1-h6, body, caption, overline, label, code), com peso, tracking, cor, alinhamento e truncate, tudo em tokens. Titulos grandes usam a fonte display com tracking negativo.',
  import: "import { Text } from '@dilis/ui';",
  props: [
    {
      name: 'variant',
      type: "'hero' | 'display' | 'h1'..'h6' | 'body' | 'body-sm' | 'caption' | 'overline' | 'label' | 'code'",
      default: 'body',
      description: 'Estilo tipografico. Define tamanho, peso, tracking e a tag HTML padrao.',
    },
    {
      name: 'as',
      type: 'ElementType',
      description: 'Troca a tag HTML renderizada (ex: usar h2 com estilo de h1).',
    },
    {
      name: 'weight',
      type: "'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'black'",
      description: 'Sobrescreve o peso da variante.',
    },
    {
      name: 'tracking',
      type: "'tighter' | 'tight' | 'normal' | 'wide' | 'wider'",
      description: 'Sobrescreve o letter-spacing da variante.',
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
      title: 'Hero e titulo de secao',
      code: `<Text variant="hero">Sua marca em movimento</Text>
<Text variant="display">O que a gente faz</Text>`,
    },
    {
      title: 'Rotulo de secao (label) e titulo',
      code: `<Text variant="label">Servicos</Text>
<Text variant="h2">Producao de eventos</Text>`,
    },
    {
      title: 'Trocar a tag mantendo o estilo',
      code: '<Text variant="h1" as="h2">Parece h1, mas e um h2 no HTML</Text>',
    },
  ],
  notes: [
    'hero e display sao fluidos (clamp) e usam a fonte display com tracking negativo; bons pra topo de pagina e abertura de secao.',
    'label e o rotulo de secao (fonte mono, azul da marca, tracking aberto); overline e a versao maiuscula neutra.',
    'A tag HTML sai da variante (h1 => h1, body => p) e troca com as; weight e tracking sobrescrevem quando preciso.',
  ],
};

export default textManifest;
