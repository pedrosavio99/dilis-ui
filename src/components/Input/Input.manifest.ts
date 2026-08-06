import type { ComponentManifest } from '../../meta/manifest.types';

export const inputManifest: ComponentManifest = {
  name: 'Input',
  group: 'Componentes',
  summary:
    'Campo de texto com rotulo flutuante opcional e linha de foco que preenche do centro pros lados, com cor configuravel.',
  import: "import { Input } from '@dilis/ui';",
  props: [
    {
      name: 'label',
      type: 'string',
      description: 'Rotulo do campo. Com floatingLabel, vira o placeholder que sobe.',
    },
    {
      name: 'floatingLabel',
      type: 'boolean',
      default: 'false',
      description: 'Ativa o rotulo flutuante (sobe e encolhe ao focar/preencher).',
    },
    {
      name: 'inputSize',
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description: 'Tamanho do campo.',
    },
    {
      name: 'accentColor',
      type: 'string',
      default: 'var(--dui-color-primary-500)',
      description: 'Cor da linha de foco. Aceita qualquer cor CSS ou token.',
    },
    {
      name: 'error',
      type: 'string',
      description: 'Mensagem de erro. Deixa a linha vermelha e mostra o texto.',
    },
    {
      name: 'hint',
      type: 'string',
      description: 'Texto de ajuda abaixo do campo.',
    },
  ],
  examples: [
    {
      title: 'Basico',
      code: '<Input label="Nome" placeholder="Digite seu nome" />',
    },
    {
      title: 'Label flutuante',
      code: '<Input label="Email" floatingLabel />',
    },
    {
      title: 'Cor da linha customizada',
      code: '<Input label="Senha" floatingLabel accentColor="#e4123b" type="password" />',
    },
  ],
  notes: [
    'Herda todos os atributos de <input> (type, value, onChange, aria-*).',
    'floatingLabel so tem efeito quando label e passado.',
    'A linha de foco preenche do centro pros lados; a cor vem de accentColor.',
  ],
};

export default inputManifest;
