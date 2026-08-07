import type { ComponentManifest } from '../meta/manifest.types';

/**
 * Documenta a paleta da marca para o guia do agente. As cores saem do manual
 * da Dilis e viram escalas para dar flexibilidade sem fugir da identidade.
 */
export const colorsManifest: ComponentManifest = {
  name: 'Cores',
  group: 'Fundacao',
  summary:
    'Paleta da marca em escalas. Azul primario #009fe3, chumbo #333333, mais neutros e semanticas. Use sempre via token --dui-color-* (ou theme.colors no JS).',
  import: "import { theme } from '@dilis/ui'; // theme.colors.primary[500]",
  examples: [
    {
      title: 'Cor de marca e texto',
      code: `<Text color="primary">Titulo em azul</Text>
<div style={{ background: 'var(--dui-color-primary-50)' }}>Painel suave</div>`,
    },
    {
      title: 'Escala no JS',
      code: `import { theme } from '@dilis/ui';
theme.colors.primary[600]; // hover do azul
theme.colors.neutral[800]; // chumbo da marca`,
    },
  ],
  notes: [
    'Primaria: --dui-color-primary-50..900. 500 (#009fe3) e a cor da marca; 600/700 pra hover/pressionado.',
    'Neutros: --dui-color-neutral-0 (#fff) .. 1000 (#000). 800 (#333) e o chumbo da marca; 400/500 pra texto secundario.',
    'Semanticas: --dui-color-info (#009fe3), --dui-color-success (#1aa053), --dui-color-warning (#f5a623), --dui-color-danger (#e4123b).',
    'Nao use preto puro (#000) em superficie nem branco puro como fundo de pagina; prefira neutral-900 e neutral-50.',
  ],
};

export default colorsManifest;
