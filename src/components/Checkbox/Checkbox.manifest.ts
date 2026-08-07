import type { ComponentManifest } from '../../meta/manifest.types';

export const checkboxManifest: ComponentManifest = {
  name: 'Checkbox',
  group: 'Componentes',
  summary:
    'Caixa de selecao com label opcional, 3 tamanhos, estado indeterminado e cor por accentColor. Usa input nativo por baixo, entao funciona em formulario e com teclado normalmente.',
  import: "import { Checkbox } from '@dilis/ui';",
  props: [
    {
      name: 'label',
      type: 'ReactNode',
      description: 'Texto ao lado da caixinha.',
    },
    {
      name: 'checked',
      type: 'boolean',
      description: 'Estado marcado (controlado). Use com onChange.',
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      description: 'Estado inicial (nao controlado).',
    },
    {
      name: 'onChange',
      type: '(e: ChangeEvent<HTMLInputElement>) => void',
      description: 'Disparado ao marcar/desmarcar (e.target.checked).',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      default: 'false',
      description: 'Mostra o traco (nem marcado nem desmarcado), util pra "selecionar tudo".',
    },
    {
      name: 'description',
      type: 'ReactNode',
      description: 'Linha de apoio abaixo do label.',
    },
    {
      name: 'checkboxSize',
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description: 'Tamanho da caixinha.',
    },
    {
      name: 'accentColor',
      type: 'string',
      default: 'var(--dui-color-primary-500)',
      description: 'Cor do preenchimento marcado e do foco.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Desabilita o controle.',
    },
  ],
  examples: [
    {
      title: 'Simples (nao controlado)',
      code: '<Checkbox label="Aceito os termos" defaultChecked />',
    },
    {
      title: 'Controlado',
      code: `const [ok, setOk] = useState(false);
<Checkbox label="Receber novidades" checked={ok} onChange={(e) => setOk(e.target.checked)} />`,
    },
    {
      title: 'Indeterminado (selecionar tudo)',
      code: '<Checkbox label="Selecionar tudo" indeterminate />',
    },
  ],
  notes: [
    'indeterminate e so visual (estado do DOM); o valor real continua checked/unchecked.',
    'Controlado (checked + onChange) ou nao controlado (defaultChecked).',
    'Repassa props nativas do input (name, value, required, aria-*, ref).',
  ],
};

export default checkboxManifest;
