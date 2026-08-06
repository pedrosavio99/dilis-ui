import type { ComponentManifest } from '../../meta/manifest.types';

export const avatarManifest: ComponentManifest = {
  name: 'Avatar',
  group: 'Componentes',
  summary:
    'Avatar circular em 3 tamanhos. Mostra a imagem de src (caminho ou link) ou, na falta/erro dela, as iniciais de name (1 ou 2 letras) com cor derivada do nome.',
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
  ],
  examples: [
    {
      title: 'Com imagem',
      code: '<Avatar src="/fotos/ana.jpg" name="Ana Souza" />',
    },
    {
      title: 'Com iniciais (sem imagem)',
      code: '<Avatar name="Pedro Savio" size="lg" />',
    },
    {
      title: 'Tamanhos',
      code: `<Avatar name="Ana" size="sm" />
<Avatar name="Ana" size="md" />
<Avatar name="Ana" size="lg" />`,
    },
  ],
  notes: [
    'name com 1 palavra vira 1 letra; com 2+ vira inicial do primeiro e do ultimo.',
    'Se src falhar ao carregar, cai automaticamente nas iniciais.',
    'Sem src nem name, mostra um icone generico de usuario.',
  ],
};

export default avatarManifest;
