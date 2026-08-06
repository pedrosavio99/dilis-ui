import type { ComponentManifest } from '../../meta/manifest.types';

export const searchInputManifest: ComponentManifest = {
  name: 'SearchInput',
  group: 'Componentes',
  summary:
    'Autocomplete generico. Recebe a funcao de busca por fora (sync ou async), mostra um dropdown de resultados e devolve o item escolhido em onSelect.',
  import: "import { SearchInput } from '@dilis/ui';",
  props: [
    {
      name: 'fetchOptions',
      type: '(query: string) => T[] | Promise<T[]>',
      required: true,
      description: 'Funcao externa que busca os resultados. Sync ou async.',
    },
    {
      name: 'getOptionLabel',
      type: '(item: T) => string',
      required: true,
      description: 'Extrai o texto exibido e o que vai pro input ao selecionar.',
    },
    {
      name: 'getOptionKey',
      type: '(item: T) => string | number',
      description: 'Chave unica de cada item. Padrao: o proprio label.',
    },
    {
      name: 'onSelect',
      type: '(item: T) => void',
      description: 'Chamado ao escolher um item do dropdown.',
    },
    {
      name: 'renderOption',
      type: '(item: T) => ReactNode',
      description: 'Render custom de cada opcao. Padrao: so o label.',
    },
    {
      name: 'minChars',
      type: 'number',
      default: '1',
      description: 'Minimo de caracteres pra disparar a busca.',
    },
    {
      name: 'debounceMs',
      type: 'number',
      default: '300',
      description: 'Debounce entre digitar e buscar.',
    },
    {
      name: 'floatingLabel',
      type: 'boolean',
      default: 'false',
      description: 'Ativa o rotulo flutuante (precisa de label).',
    },
    {
      name: 'accentColor',
      type: 'string',
      default: 'var(--dui-color-primary-500)',
      description: 'Cor da linha de foco e do item ativo.',
    },
  ],
  examples: [
    {
      title: 'Com tipo proprio (T = Localidade)',
      code: `<SearchInput<Localidade>
  label="Estado ou cidade"
  floatingLabel
  fetchOptions={buscarLocalidades}
  getOptionLabel={(l) => l.nome}
  onSelect={setLocal}
/>`,
    },
    {
      title: 'Funcao sync com string',
      code: `<SearchInput<string>
  placeholder="Buscar fruta"
  fetchOptions={(q) => frutas.filter((f) => f.includes(q))}
  getOptionLabel={(f) => f}
/>`,
    },
  ],
  notes: [
    'Generico em T: o tipo do item vem de fetchOptions/getOptionLabel.',
    'fetchOptions pode ser async; respostas fora de ordem sao descartadas.',
    'Teclado: setas navegam, Enter seleciona, Esc fecha. Roles ARIA de combobox.',
  ],
};

export default searchInputManifest;
