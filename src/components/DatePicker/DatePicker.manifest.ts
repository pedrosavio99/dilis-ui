import type { ComponentManifest } from '../../meta/manifest.types';

export const datePickerManifest: ComponentManifest = {
  name: 'DatePicker',
  group: 'Componentes',
  summary:
    'Campo de data que aceita digitar com mascara (dd/mm/aaaa) OU escolher no calendario, com hora opcional (withTime). onChange devolve o valor em varios formatos: Date, ISO, timestamp e string formatada.',
  import: "import { DatePicker } from '@dilis/ui';",
  props: [
    {
      name: 'onChange',
      type: '(out: DatePickerOutput) => void',
      description: 'Recebe { date, iso, timestamp, formatted } de uma vez.',
    },
    {
      name: 'value',
      type: 'Date | null',
      description: 'Data selecionada (controlado).',
    },
    {
      name: 'withTime',
      type: 'boolean',
      default: 'false',
      description: 'Mostra selecao de hora e estende a mascara pra dd/mm/aaaa hh:mm.',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Rotulo. Com floatingLabel, sobe ao focar/preencher.',
    },
    {
      name: 'floatingLabel',
      type: 'boolean',
      default: 'false',
      description: 'Ativa o rotulo flutuante.',
    },
    {
      name: 'placeholder',
      type: 'string',
      description: 'Dica do campo. Padrao: dd/mm/aaaa (ou com hh:mm se withTime).',
    },
    {
      name: 'formatValue',
      type: '(date: Date, withTime: boolean) => string',
      description: 'Formata o campo out.formatted (o campo em si sempre usa a mascara).',
    },
    {
      name: 'minDate',
      type: 'Date',
      description: 'Menor data selecionavel no calendario.',
    },
    {
      name: 'maxDate',
      type: 'Date',
      description: 'Maior data selecionavel no calendario.',
    },
    {
      name: 'accentColor',
      type: 'string',
      default: 'var(--dui-color-primary-500)',
      description: 'Cor da linha, do dia selecionado e do foco.',
    },
  ],
  examples: [
    {
      title: 'Digitar ou escolher, so data',
      code: `<DatePicker
  label="Data"
  floatingLabel
  onChange={(out) => console.log(out.iso)}
/>`,
    },
    {
      title: 'Data e hora',
      code: `<DatePicker
  label="Quando"
  withTime
  onChange={(out) => setValor(out.date)}
/>`,
    },
    {
      title: 'Usando varios formatos de saida',
      code: `<DatePicker
  onChange={({ date, iso, timestamp, formatted }) => {
    // date: Date | iso: '2026-08-06T...' | timestamp: ms | formatted: '06/08/2026'
  }}
/>`,
    },
  ],
  notes: [
    'Da pra digitar (mascara dd/mm/aaaa, ou dd/mm/aaaa hh:mm com withTime) ou clicar na lupa/calendario.',
    'onChange sempre devolve os 4 formatos; use o que precisar.',
    'Controlado (value) ou nao controlado (defaultValue). minDate/maxDate limitam o calendario.',
  ],
};

export default datePickerManifest;
