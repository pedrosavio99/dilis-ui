# Dilis UI v0.1.0 - guia de uso para agentes

Biblioteca React de componentes em CSS puro com tokens da marca. Consuma a
lib por este guia, sem abrir o codigo fonte. 1 componente(s) documentado(s).

## Regras globais
- Importe o CSS uma unica vez no entry do app: `import '@dilis/ui/styles.css';`
- Importe componentes do pacote: `import { Button } from '@dilis/ui';`
- Todo componente aceita `className`, que entra por ultimo e sobrescreve o
  estilo base sem `!important` (compativel com utilities do Tailwind).
- Nao reescreva o CSS interno. Ajuste por `className` ou trocando as
  variaveis de token `--dui-*` no `:root` do projeto.
- Props nativas do elemento sao repassadas (onClick, aria-*, ref, etc).
- Tokens em runtime: `import { theme } from '@dilis/ui'` (ex: `theme.colors.primary[500]`).

## Componentes

### Button
Botao de acao com variantes, tamanhos, estado de loading e slots de icone.

import { Button } from '@dilis/ui';

Props:
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' (padrao primary) - Estilo visual do botao.
- `size`: 'sm' | 'md' | 'lg' (padrao md) - Tamanho do botao.
- `fullWidth`: boolean - Ocupa 100% da largura do container.
- `loading`: boolean - Mostra spinner e bloqueia o clique.
- `leftIcon`: ReactNode - Icone a esquerda do texto.
- `rightIcon`: ReactNode - Icone a direita do texto.

Exemplos:

<!-- Primario grande -->
```tsx
<Button variant="primary" size="lg">Enviar</Button>
```

<!-- Loading e largura total -->
```tsx
<Button loading fullWidth>Salvando</Button>
```

<!-- Override com Tailwind via className -->
```tsx
<Button className="rounded-full px-10">Custom</Button>
```

Notas:
- Herda todos os atributos de <button> (onClick, type, disabled, aria-*).
- Para override de estilo use className, que sempre vence o estilo base.
