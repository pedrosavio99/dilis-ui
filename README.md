# Dilis UI

Design System da Dilis. Componentes React escritos em **CSS puro** com **tokens
da marca**, e que aceitam `className` para override (inclusive com Tailwind) sem
briga de estilo.

A lib e publicada como pacote e consumida em outros projetos (Vite, Next, Remix,
Astro). O repositorio ja vem com uma vitrine local (a **mural**) pra visualizar
os componentes durante o desenvolvimento.

Versao atual: `0.1.0`

---

## O que ja tem na v1

- Tokens completos (cores, tipografia, espacamento, radius, sombras, breakpoints)
- Variaveis CSS `--dui-*` para tematizacao
- Componente `Button`
- Vitrine (mural) com as secoes Tokens, Cores e Button
- Build em library mode (ESM + CJS + tipos + CSS unico)
- CI no GitHub Actions

---

## Rodando localmente

```bash
npm install
npm run dev
```

O `npm run dev` sobe a mural em `http://localhost:5173`. A mural importa a lib
direto de `src/`, entao qualquer edicao em componente ou token reflete na hora.

Outros scripts:

```bash
npm run build      # gera a lib em dist/
npm run typecheck  # checagem de tipos sem emitir
npm run preview    # preview de um build
```

---

## Arquitetura

```
src/
  index.ts                 entry da lib (importa CSS + reexporta tudo)
  tokens/
    colors.ts              escalas de cor derivadas do manual
    typography.ts          fonte, pesos, tamanhos
    layout.ts              espacamento, radius, sombra, breakpoints
    tokens.css             variaveis --dui-* (fonte de verdade do CSS)
    index.ts               objeto theme + reexports
  components/
    Button/
      Button.tsx           componente (forwardRef + memo + displayName)
      Button.types.ts      tipos e props
      Button.css           estilos em CSS puro usando var(--dui-*)
      index.ts             barril do componente
    index.ts               barril de todos os componentes
  utils/
    cn.ts                  junta classes (className entra por ultimo)
    index.ts
  styles/
    base.css               reset minimo

demo/                      a mural (nao vai pro pacote publicado)
  main.tsx
  App.tsx
  mural/
    registry.ts            lista das secoes da vitrine
    Mural.tsx              sidebar
  views/
    TokensView.tsx
    ColorsView.tsx
    ButtonsView.tsx
  demo.css
```

### Duas regras que sustentam tudo

1. **Nada de valor fixo em componente.** Toda cor, fonte, radius e espacamento
   vem de `var(--dui-*)`. Trocar o tema e so sobrescrever essas variaveis no
   `:root` do projeto host.

2. **`className` sempre por ultimo.** O util `cn()` coloca a classe base do
   componente primeiro e a `className` do usuario depois. Como o CSS da lib usa
   seletores de classe unica (baixa especificidade) e o Tailwind entra depois no
   CSS final, `<Button className="bg-black rounded-full" />` sobrescreve sem
   `!important`.

---

## Usando em outro projeto

### 1. Instalar

Pelo GitHub (sem precisar publicar no npm):

```bash
npm install git+https://github.com/SEU_USUARIO/dilis-ui.git
```

O `prepare` roda o build automaticamente na instalacao, entao o `dist/` e
gerado sozinho.

> Se um dia for pro npm registry, o install vira `npm install @dilis/ui`.

### 2. Importar o CSS uma vez

No entry do app (ex: `main.tsx` ou `_app.tsx`):

```ts
import '@dilis/ui/styles.css';
```

### 3. Usar os componentes

```tsx
import { Button } from '@dilis/ui';

export function Exemplo() {
  return (
    <Button variant="primary" size="lg" onClick={() => alert('oi')}>
      Enviar
    </Button>
  );
}
```

### 4. Usar os tokens no seu codigo (opcional)

```ts
import { theme } from '@dilis/ui';

const azul = theme.colors.primary[500]; // #009fe3
```

### Override com Tailwind

```tsx
<Button className="rounded-full px-10 bg-neutral-900">Custom</Button>
```

---

## Como criar um novo componente

Segue sempre o mesmo formato do `Button`. Exemplo criando um `Badge`:

**1. Criar a pasta e os arquivos**

```
src/components/Badge/
  Badge.types.ts
  Badge.css
  Badge.tsx
  index.ts
```

**2. Tipos** (`Badge.types.ts`)

```ts
import type { HTMLAttributes } from 'react';

export type BadgeVariant = 'primary' | 'neutral' | 'danger';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  className?: string;
}
```

**3. Estilo** (`Badge.css`) sempre com `var(--dui-*)` e classe unica

```css
.dui-badge {
  display: inline-flex;
  align-items: center;
  padding: var(--dui-space-xs) var(--dui-space-sm);
  border-radius: var(--dui-radius-full);
  font-family: var(--dui-font-base);
  font-size: var(--dui-text-xs);
  font-weight: var(--dui-weight-medium);
}
.dui-badge--primary {
  background: var(--dui-color-primary-50);
  color: var(--dui-color-primary-700);
}
```

**4. Componente** (`Badge.tsx`) com `forwardRef`, `displayName` e `className` por ultimo

```tsx
import { forwardRef, memo } from 'react';
import { cn } from '../../utils/cn';
import type { BadgeProps } from './Badge.types';
import './Badge.css';

const BadgeBase = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'primary', className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn('dui-badge', `dui-badge--${variant}`, className)}
      {...rest}
    >
      {children}
    </span>
  );
});

export const Badge = memo(BadgeBase);
Badge.displayName = 'Badge';
```

**5. Barril** (`index.ts`)

```ts
export { Badge } from './Badge';
export type { BadgeProps, BadgeVariant } from './Badge.types';
```

**6. Exportar no barril geral** em `src/components/index.ts`

```ts
export * from './Badge';
```

Pronto. O componente ja esta na lib e disponivel via `import { Badge } from '@dilis/ui'`.

### Checklist de qualidade

- [ ] `className` entra por ultimo no `cn()`
- [ ] So variaveis `--dui-*`, sem valor fixo
- [ ] Seletores de classe unica (sem aninhamento pesado nem `!important`)
- [ ] `forwardRef` + `displayName`
- [ ] Sem `any`, sem `console.log`
- [ ] Props tipadas estendendo o atributo HTML nativo certo

---

## Colocando na vitrine (mural)

Para ver o componente novo na mural durante o dev:

1. Crie a view em `demo/views/BadgeView.tsx`
2. Registre em `demo/mural/registry.ts`:

```ts
import { BadgeView } from '../views/BadgeView';

export const registry: MuralEntry[] = [
  // ... entradas existentes
  { id: 'badge', label: 'Badge', group: 'Componentes', view: BadgeView },
];
```

A sidebar se monta sozinha a partir do registry.

---

## Versionamento

Semantic Versioning:

- **MAJOR** quebra compatibilidade
- **MINOR** adiciona funcionalidade sem quebrar
- **PATCH** correcoes compativeis

Para lancar uma versao:

```bash
npm version patch   # ou minor / major
git push --follow-tags
```

Os projetos que consomem a lib apontam para uma tag ou branch especifica:

```bash
npm install git+https://github.com/SEU_USUARIO/dilis-ui.git#v0.1.0
```

---

## Padrao de commits

Commits pequenos e descritivos:

```
feat(badge): adiciona componente Badge
fix(button): corrige foco no estado loading
docs(readme): melhora exemplos de uso
```

---

## Nota sobre Tailwind vs CSS puro

O spec de referencia previa Tailwind dentro da propria lib. Aqui a decisao foi
**CSS puro nos componentes** com `className` aberto para override. Motivos:

- A lib nao obriga o projeto host a ter Tailwind configurado
- Funciona igual em Vite, Next, Remix e Astro sem setup extra
- Quem usa Tailwind ainda sobrescreve tudo via `className`

Se em algum momento a decisao mudar, os tokens ja estao prontos para virar um
preset de Tailwind sem retrabalho.

---

## Proximos passos sugeridos

- Componentes basicos: `Input`, `Badge`, `Avatar`, `Spinner`
- Workflow de release automatico no GitHub Actions
- Testes com Vitest + Testing Library
- Dark mode via troca das variaveis `--dui-*`
