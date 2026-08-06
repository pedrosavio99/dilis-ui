import type { ComponentManifest } from '../../meta/manifest.types';

export const selectManifest: ComponentManifest = {
  name: 'Select',
  group: 'Componentes',
  summary:
    'Select generico com dropdown customizado, rotulo flutuante opcional e a mesma linha de foco do Input. Controlado ou nao controlado.',
  import: "import { Select } from '@dilis/ui';",
  props: [
    { name: 'options', type: 'T[]', required: true, description: 'Lista de opcoes.' },
    {
      name: 'getOptionLabel',
      type: '(item: T) => string',
      required: true,
      description: 'Extrai o texto exibido de cada opcao.',
    },
    { name: 'value', type: 'T | null', description: 'Opcao selecionada (controlado).' },
    { name: 'onChange', type: '(item: T) => void', description: 'Chamado ao escolher uma opcao.' },
    {
      name: 'getOptionValue',
      type: '(item: T) => string | number',
      description: 'Chave unica de cada opcao. Padrao: o proprio label.',
    },
    { name: 'renderOption', type: '(item: T) => ReactNode', description: 'Render custom de cada opcao.' },
    {
      name: 'placeholder',
      type: 'string',
      default: 'Selecione',
      description: 'Texto quando nada esta selecionado.',
    },
    {
      name: 'floatingLabel',
      type: 'boolean',
      default: 'false',
      description: 'Ativa o rotulo flutuante (precisa de label).',
    },
    {
      name: 'selectSize',
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description: 'Tamanho do campo.',
    },
    {
      name: 'accentColor',
      type: 'string',
      default: 'var(--dui-color-primary-500)',
      description: 'Cor da linha de foco e do item ativo.',
    },
    { name: 'error', type: 'string', description: 'Mensagem de erro. Deixa a linha vermelha.' },
  ],
  examples: [
    {
      title: 'String simples',
      code: `<Select<string>
  label="UF"
  options={['PB', 'PE', 'RN']}
  getOptionLabel={(uf) => uf}
  onChange={setUf}
/>`,
    },
    {
      title: 'Objeto com label e valor',
      code: `<Select<Cargo>
  label="Cargo"
  floatingLabel
  options={cargos}
  getOptionLabel={(c) => c.nome}
  getOptionValue={(c) => c.id}
  onChange={setCargo}
/>`,
    },
  ],
  notes: [
    'Generico em T; o tipo vem de options/getOptionLabel.',
    'Gatilho e um button (nao <select> nativo). Teclado: setas, Enter/Espaco, Esc, Home/End.',
    'Roles ARIA de combobox + listbox; item selecionado marcado com check.',
  ],
};

export default selectManifest;
