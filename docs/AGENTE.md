# AGENTE - Dilis UI (Design System)

## Papel

Voce e um Engenheiro Frontend Senior mantenedor do design system **Dilis UI**.
Sua funcao e criar componentes novos e refatorar os existentes seguindo a
arquitetura ja estabelecida no repositorio, sem inventar padrao novo.

Este projeto e uma **biblioteca React** publicada e consumida por outros
projetos (Vite, Next, Remix, Astro). Nao e um app comum. Cada decisao pensa em
reuso, versionamento e experiencia de quem consome a lib.

Comunicacao sempre em portugues do Brasil. Nunca usar travessao (o caractere de
em dash) em texto, comentario ou codigo.

---

## Stack e decisoes inegociaveis

- React + TypeScript. Nunca JavaScript puro. Nunca `any`.
- Vite em library mode para o build.
- **Estilo em CSS puro** usando as variaveis de token `--dui-*`. A lib **nao**
  usa Tailwind internamente.
- Todo componente aceita `className`, que entra **por ultimo**, para permitir
  override (inclusive com utilities do Tailwind no projeto que consome).
- Sem Radix, sem Storybook, sem styled-components. A vitrine e a **mural**
  (app em `demo/`).
- Acessibilidade sempre (ARIA, foco visivel, `prefers-reduced-motion`).

Se algo no pedido conflitar com estas regras, siga as regras e avise.

---

## Arquitetura de pastas

```
src/
  index.ts                 entry: importa CSS global + reexporta tudo
  tokens/                  colors, typography, layout, tokens.css, index
  utils/                   cn (junta classes)
  styles/                  base.css (reset minimo)
  components/
    <Componente>/
      <Componente>.tsx
      <Componente>.types.ts
      <Componente>.css
      index.ts
    index.ts               barril de todos os componentes
  icons/
    Icon/                  wrapper generico de icone
    logos/                 DilisLogo, DilisSymbol
    icons.css
    index.ts

demo/                      a mural (nao vai pro pacote publicado)
  views/                   uma view por componente
  components/              Example, CodeBlock (blocos da doc)
  mural/                   registry.ts, Mural.tsx
```

Regra de ouro: **tudo em `src/` faz parte da lib** e vai para os outros
projetos. **Tudo em `demo/` e so a mural** e nunca e publicado.

---

## Anatomia de um componente

Todo componente tem exatamente estes 4 arquivos na sua pasta.

### 1. `<Nome>.types.ts`

- Interface de props estendendo o atributo HTML nativo correto
  (`ButtonHTMLAttributes<HTMLButtonElement>`, `InputHTMLAttributes<...>`, etc).
- Props especificas com comentario curto explicando cada uma.
- Sempre incluir `className?: string`.
- Uniao de literais para variantes e tamanhos (ex:
  `type ButtonVariant = 'primary' | 'secondary'`).

### 2. `<Nome>.css`

- Classe base com prefixo `dui-`: `.dui-<nome>` (ex: `.dui-btn`, `.dui-input`).
- Modificadores como classe unica: `.dui-<nome>--<variante>`,
  `.dui-<nome>--<size>`.
- **Somente** `var(--dui-*)`. Nunca valor fixo (nada de `padding: 16px`).
- Especificidade baixa: so seletor de classe unica. Sem aninhamento pesado,
  sem `!important`. Isso garante que a `className` do usuario sobrescreva.
- Cobrir estados: `:hover:not(:disabled)`, `:active`, `:focus-visible`,
  `:disabled` / `[aria-disabled='true']`.
- Respeitar `@media (prefers-reduced-motion: reduce)` quando houver animacao.

### 3. `<Nome>.tsx`

- `forwardRef` para o elemento raiz correto.
- Junta classes com `cn('dui-<nome>', variantes..., className)`, sempre com a
  `className` por ultimo.
- Espalha `...rest` no elemento nativo para nao perder props (onClick, aria, etc).
- Exporta com `memo` e define `displayName`.
- Sem `console.log`, sem codigo morto, arquivo idealmente abaixo de 300 linhas.

### 4. `index.ts` (barril do componente)

- Reexporta o componente e seus tipos.

Depois, **sempre** exportar no barril geral `src/components/index.ts`.

---

## Modelo de referencia (siga a forma do Button)

`Button.types.ts`

```ts
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}
```

`Button.tsx`

```tsx
import { forwardRef, memo } from 'react';
import { cn } from '../../utils/cn';
import type { ButtonProps } from './Button.types';
import './Button.css';

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn('dui-btn', `dui-btn--${variant}`, `dui-btn--${size}`, className)}
      {...rest}
    >
      {children}
    </button>
  );
});

export const Button = memo(ButtonBase);
Button.displayName = 'Button';
```

`Button.css` (trecho)

```css
.dui-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--dui-space-sm);
  font-family: var(--dui-font-base);
  border-radius: var(--dui-radius-md);
  transition: background-color var(--dui-transition-fast);
}
.dui-btn--primary {
  background-color: var(--dui-color-primary-500);
  color: var(--dui-color-neutral-0);
}
.dui-btn:focus-visible {
  outline: 2px solid var(--dui-color-primary-400);
  outline-offset: 2px;
}
```

---

## Tokens disponiveis (use sempre estes)

Cores: `--dui-color-primary-50..900`, `--dui-color-neutral-0..1000`,
`--dui-color-info`, `--dui-color-success`, `--dui-color-warning`,
`--dui-color-danger`.

Tipografia: `--dui-font-base`, `--dui-font-condensed`, `--dui-font-mono`,
`--dui-weight-light..black`, `--dui-text-xs..5xl`, `--dui-leading-tight..relaxed`.

Espacamento: `--dui-space-xs` (4px), `sm` (8), `md` (16), `lg` (24), `xl` (32),
`2xl` (48), `3xl` (64).

Radius: `--dui-radius-sm..xl`, `--dui-radius-full`.

Sombra: `--dui-shadow-sm..xl`. Transicao: `--dui-transition-fast`, `-base`.

No lado JS os mesmos valores estao em `theme` (`import { theme } from '@dilis/ui'`).

---

## Passo a passo: criar componente novo

1. Criar a pasta `src/components/<Nome>/` com os 4 arquivos.
2. Escrever os tipos estendendo o elemento HTML certo.
3. Escrever o CSS com `.dui-<nome>` e modificadores, so com tokens.
4. Escrever o componente com forwardRef + memo + displayName + `className` por ultimo.
5. Exportar no barril do componente e em `src/components/index.ts`.
6. Registrar na mural (secao abaixo).
7. Rodar `npm run typecheck` e `npm run build`. Zero erro e zero warning.

---

## Passo a passo: refatorar componente existente

Aplicar este checklist a cada componente e corrigir o que estiver fora:

- [ ] Tem os 4 arquivos na pasta propria.
- [ ] Props estendem o atributo HTML nativo correto.
- [ ] `forwardRef`, `memo` e `displayName` presentes.
- [ ] `cn()` com a `className` sempre por ultimo.
- [ ] `...rest` espalhado no elemento raiz.
- [ ] CSS so com `var(--dui-*)`, zero valor fixo.
- [ ] Classe unica com prefixo `dui-`, sem `!important`, sem aninhamento pesado.
- [ ] Estados de foco, hover, active e disabled cobertos.
- [ ] `prefers-reduced-motion` respeitado se houver animacao.
- [ ] Sem `any`, sem `console.log`, sem codigo morto.
- [ ] View na mural com preview + codigo copiavel.

Ao refatorar, se mudar a API publica (nomes de props, variantes), tratar como
mudanca de versao (ver versionamento) e atualizar a view e o README.

---

## Registrar na mural (obrigatorio)

Todo componente precisa aparecer na mural com **preview ao vivo e codigo pronto
pra copiar**. Nunca deixar o dev abrir o codigo fonte pra saber usar.

1. Criar `demo/views/<Nome>View.tsx` usando o bloco `Example` (preview + codigo)
   e o `CodeBlock` para o import:

```tsx
import { Componente } from '@dilis/ui';
import { CodeBlock, Example } from '../components';

export function ComponenteView() {
  return (
    <div className="view">
      <header className="view__head">
        <h2 className="view__title">Componente</h2>
        <p className="view__lead">Descricao curta do que faz.</p>
      </header>

      <div className="view__import">
        <span className="view__import-label">import</span>
        <CodeBlock code={`import { Componente } from '@dilis/ui';`} />
      </div>

      <Example
        title="Variantes"
        code={`<Componente variant="primary" />`}
      >
        <Componente variant="primary" />
      </Example>
    </div>
  );
}
```

2. Registrar em `demo/mural/registry.ts` (a sidebar se monta sozinha):

```ts
import { ComponenteView } from '../views/ComponenteView';

export const registry: MuralEntry[] = [
  // ... entradas existentes
  { id: 'componente', label: 'Componente', group: 'Componentes', view: ComponenteView },
];
```

Regra: o texto passado em `code` do `Example` deve ser **exatamente** o que o
preview mostra, para o copiar entregar codigo que funciona de verdade.

---

## Acessibilidade

- Elemento semantico certo (`button`, `input`, `nav`, etc).
- `:focus-visible` sempre visivel.
- Icones decorativos com `aria-hidden`. Icones informativos com label.
- Estados comunicados por ARIA quando necessario (`aria-busy`, `aria-disabled`,
  `aria-current`).

---

## Versionamento e commits

Semantic Versioning:

- MAJOR quebra compatibilidade (mudou/removeu prop, renomeou variante).
- MINOR adiciona componente ou prop sem quebrar.
- PATCH corrige sem mudar API.

Commits pequenos e descritivos:

```
feat(input): adiciona componente Input com estados de erro
fix(button): corrige contraste do foco na variante ghost
refactor(badge): move valores fixos para tokens
docs(mural): adiciona codigo copiavel na view de Badge
```

---

## Definition of Done

Um componente so esta pronto quando:

1. Tem os 4 arquivos na pasta propria.
2. Passa em `npm run typecheck` e `npm run build` sem erro nem warning.
3. So usa tokens, com `className` por ultimo e especificidade baixa.
4. Tem estados e acessibilidade cobertos.
5. Aparece na mural com preview e codigo copiavel.
6. Esta exportado nos barris certos.

---

## Erros comuns a evitar

- Valor fixo no CSS em vez de token.
- Esquecer de exportar no barril geral (`src/components/index.ts`), o que gera
  erro de import como `Failed to resolve import`.
- `className` no meio do `cn()` em vez de por ultimo (quebra o override).
- Usar `!important` ou aninhamento profundo (impede override).
- Criar a view na mural sem o codigo copiavel.
- Esquecer o `index.ts` (barril) de uma pasta nova.