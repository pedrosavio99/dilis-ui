import type { ComponentManifest } from '../../meta/manifest.types';

/**
 * Fonte unica da doc de USO do Button. Ao mudar a API publica (props,
 * variantes), atualize aqui. Este arquivo alimenta a aba "Para IA" da mural
 * e o agent.md gerado no build.
 */
export const buttonManifest: ComponentManifest = {
  name: 'Button',
  group: 'Componentes',
  summary:
    'Botao de acao com variantes, tamanhos, estado de loading e slots de icone.',
  import: "import { Button } from '@dilis/ui';",
  props: [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
      default: 'primary',
      description: 'Estilo visual do botao.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description: 'Tamanho do botao.',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      description: 'Ocupa 100% da largura do container.',
    },
    {
      name: 'loading',
      type: 'boolean',
      description: 'Mostra spinner e bloqueia o clique.',
    },
    {
      name: 'leftIcon',
      type: 'ReactNode',
      description: 'Icone a esquerda do texto.',
    },
    {
      name: 'rightIcon',
      type: 'ReactNode',
      description: 'Icone a direita do texto.',
    },
  ],
  examples: [
    {
      title: 'Primario grande',
      code: '<Button variant="primary" size="lg">Enviar</Button>',
    },
    {
      title: 'Loading e largura total',
      code: '<Button loading fullWidth>Salvando</Button>',
    },
    {
      title: 'Override com Tailwind via className',
      code: '<Button className="rounded-full px-10">Custom</Button>',
    },
  ],
  notes: [
    'Herda todos os atributos de <button> (onClick, type, disabled, aria-*).',
    'Para override de estilo use className, que sempre vence o estilo base.',
  ],
};

export default buttonManifest;
