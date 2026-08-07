import type { ComponentManifest } from '../meta/manifest.types';

/**
 * Documenta os tokens da lib para o guia do agente. Nao e um componente:
 * e a fundacao que todo o resto referencia. A IA precisa saber os nomes das
 * variaveis pra estilizar sem inventar valores.
 */
export const tokensManifest: ComponentManifest = {
  name: 'Tokens',
  group: 'Fundacao',
  summary:
    'Variaveis de design (prefixo --dui-*) que todo componente referencia. Tematize sobrescrevendo no :root do projeto. Em JS use o objeto theme.',
  import: "import { theme } from '@dilis/ui'; // ou use as variaveis --dui-* no CSS",
  examples: [
    {
      title: 'Usar tokens no CSS',
      code: `.minha-caixa {
  color: var(--dui-color-neutral-800);
  padding: var(--dui-space-md);
  border-radius: var(--dui-radius-lg);
  box-shadow: var(--dui-shadow-md);
}`,
    },
    {
      title: 'Tematizar sobrescrevendo no :root',
      code: `:root {
  --dui-color-primary-500: #0087c1;
  --dui-radius-md: 0.375rem;
}`,
    },
    {
      title: 'Ler tokens em runtime (JS)',
      code: `import { theme } from '@dilis/ui';
theme.colors.primary[500]; // '#009fe3'
theme.spacing.md;          // '1rem'`,
    },
  ],
  notes: [
    'Cor: --dui-color-primary-50..900 (500 = #009fe3 marca), --dui-color-neutral-0..1000, semanticas --dui-color-{info,success,warning,danger}.',
    'Tipografia: --dui-font-{base,display,condensed,mono}, --dui-weight-{light,regular,medium,semibold,bold,black}, --dui-text-{xs..5xl,display,hero}, --dui-leading-{none,tight,snug,normal,relaxed}, --dui-tracking-{tighter,tight,normal,wide,wider}.',
    'Espaco: --dui-space-{none,xs,sm,md,lg,xl,2xl,3xl} = 0/4/8/16/24/32/48/64px.',
    'Raio: --dui-radius-{none,sm,md,lg,xl,full}. Sombra: --dui-shadow-{sm,md,lg,xl}. Transicao: --dui-transition-{fast,base}.',
    'Nunca use valor fixo no CSS de um componente: sempre a variavel de token correspondente.',
  ],
};

export default tokensManifest;
