import type { ComponentManifest } from '../../meta/manifest.types';

export const avatarManifest: ComponentManifest = {
  name: 'Avatar',
  group: 'Componentes',
  summary:
    'Avatar circular em 3 tamanhos. Mostra a imagem de src (caminho ou link) ou, na falta/erro dela, as iniciais de name (1 ou 2 letras) com cor derivada do nome. Da pra forcar bgColor e textColor.',
  import: "import { Avatar } from '@dilis/ui';",
  props: [
    {
      name: 'src',
      type: 'string',
      description: 'URL ou caminho da imagem. Se faltar ou falhar, cai nas iniciais.',
    },
    {
      name: 'name',
      type: 'string',
      description: 'Texto de onde saem as iniciais (1 ou 2 letras) e o rotulo acessivel.',
    },
    {
      name: 'alt',
      type: 'string',
      description: 'Alt da imagem. Padrao: name.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description: 'Tamanho do avatar.',
    },
    {
      name: 'bgColor',
      type: 'string',
      description: 'Cor de fundo custom. Sobrescreve a cor automatica derivada do nome.',
    },
    {
      name: 'textColor',
      type: 'string',
      description: 'Cor das iniciais e do icone de fallback.',
    },
  ],
  examples: [
    {
      title: 'Com imagem',
      code: '<Avatar src="/fotos/ana.jpg" name="Ana Souza" />',
    },
    {
      title: 'Com iniciais (cor automatica pelo nome)',
      code: '<Avatar name="Pedro Savio" size="lg" />',
    },
    {
      title: 'Cor de fundo e texto custom',
      code: '<Avatar name="Dilis" bgColor="#009fe3" textColor="#ffffff" />',
    },
  ],
  notes: [
    'name com 1 palavra vira 1 letra; com 2+ vira inicial do primeiro e do ultimo.',
    'bgColor/textColor tem prioridade sobre a cor automatica; sem eles, a cor sai do hash do nome.',
    'Se src falhar ao carregar, cai automaticamente nas iniciais. Sem src nem name, mostra icone generico.',
  ],
};

export default avatarManifest;
