import type { ComponentManifest } from '../meta/manifest.types';

/**
 * Documenta a marca (logo e simbolo) para o guia do agente. Sao componentes
 * SVG que herdam a cor de currentColor, entao servem em qualquer fundo.
 */
export const brandManifest: ComponentManifest = {
  name: 'Marca',
  group: 'Marca',
  summary:
    'Logo (DilisLogo) e simbolo reduzido (DilisSymbol) como componentes SVG. A cor vem de currentColor (padrao no azul da marca), a largura acompanha a altura pela proporcao.',
  import: "import { DilisLogo, DilisSymbol } from '@dilis/ui';",
  props: [
    {
      name: 'size',
      type: 'number',
      default: '32 (logo) / 28 (simbolo)',
      description: 'Altura em px. A largura acompanha pela proporcao.',
    },
    {
      name: 'color',
      type: 'string',
      description: 'Cor de preenchimento. Padrao: azul da marca (currentColor).',
    },
    {
      name: 'title',
      type: 'string',
      description: 'Texto acessivel. Sem ele, o SVG fica decorativo (aria-hidden).',
    },
  ],
  examples: [
    {
      title: 'Logo em tamanhos e cores',
      code: `<DilisLogo size={40} title="Dilis" />
<DilisLogo size={40} color="#333333" />
<DilisLogo size={40} color="#ffffff" />`,
    },
    {
      title: 'Simbolo reduzido (favicon, avatar, selo)',
      code: `<DilisSymbol size={28} title="Dilis" />`,
    },
  ],
  notes: [
    'A cor sai de currentColor: troque com a prop color ou herdando a cor do container.',
    'Passe title pra leitura por leitor de tela; sem title vira decorativo.',
    'Use o simbolo quando o espaco e curto; o logo completo quando cabe o nome.',
  ],
};

export default brandManifest;
