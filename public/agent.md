# Dilis UI v0.1.0 - guia de uso para agentes

Biblioteca React de componentes em CSS puro com tokens da marca. Consuma a
lib por este guia, sem abrir o codigo fonte. 8 componente(s) documentado(s).

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

### Avatar
Avatar circular em 3 tamanhos. Mostra a imagem de src (caminho ou link) ou, na falta/erro dela, as iniciais de name (1 ou 2 letras) com cor derivada do nome.

import { Avatar } from '@dilis/ui';

Props:
- `src`: string - URL ou caminho da imagem. Se faltar ou falhar, cai nas iniciais.
- `name`: string - Texto de onde saem as iniciais (1 ou 2 letras) e o rotulo acessivel.
- `alt`: string - Alt da imagem. Padrao: name.
- `size`: 'sm' | 'md' | 'lg' (padrao md) - Tamanho do avatar.

Exemplos:

<!-- Com imagem -->
```tsx
<Avatar src="/fotos/ana.jpg" name="Ana Souza" />
```

<!-- Com iniciais (sem imagem) -->
```tsx
<Avatar name="Pedro Savio" size="lg" />
```

<!-- Tamanhos -->
```tsx
<Avatar name="Ana" size="sm" />
<Avatar name="Ana" size="md" />
<Avatar name="Ana" size="lg" />
```

Notas:
- name com 1 palavra vira 1 letra; com 2+ vira inicial do primeiro e do ultimo.
- Se src falhar ao carregar, cai automaticamente nas iniciais.
- Sem src nem name, mostra um icone generico de usuario.

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

### DatePicker
Campo de data que aceita digitar com mascara (dd/mm/aaaa) OU escolher no calendario, com hora opcional (withTime). onChange devolve o valor em varios formatos: Date, ISO, timestamp e string formatada.

import { DatePicker } from '@dilis/ui';

Props:
- `onChange`: (out: DatePickerOutput) => void - Recebe { date, iso, timestamp, formatted } de uma vez.
- `value`: Date | null - Data selecionada (controlado).
- `withTime`: boolean (padrao false) - Mostra selecao de hora e estende a mascara pra dd/mm/aaaa hh:mm.
- `label`: string - Rotulo. Com floatingLabel, sobe ao focar/preencher.
- `floatingLabel`: boolean (padrao false) - Ativa o rotulo flutuante.
- `placeholder`: string - Dica do campo. Padrao: dd/mm/aaaa (ou com hh:mm se withTime).
- `formatValue`: (date: Date, withTime: boolean) => string - Formata o campo out.formatted (o campo em si sempre usa a mascara).
- `minDate`: Date - Menor data selecionavel no calendario.
- `maxDate`: Date - Maior data selecionavel no calendario.
- `accentColor`: string (padrao var(--dui-color-primary-500)) - Cor da linha, do dia selecionado e do foco.

Exemplos:

<!-- Digitar ou escolher, so data -->
```tsx
<DatePicker
  label="Data"
  floatingLabel
  onChange={(out) => console.log(out.iso)}
/>
```

<!-- Data e hora -->
```tsx
<DatePicker
  label="Quando"
  withTime
  onChange={(out) => setValor(out.date)}
/>
```

<!-- Usando varios formatos de saida -->
```tsx
<DatePicker
  onChange={({ date, iso, timestamp, formatted }) => {
    // date: Date | iso: '2026-08-06T...' | timestamp: ms | formatted: '06/08/2026'
  }}
/>
```

Notas:
- Da pra digitar (mascara dd/mm/aaaa, ou dd/mm/aaaa hh:mm com withTime) ou clicar na lupa/calendario.
- onChange sempre devolve os 4 formatos; use o que precisar.
- Controlado (value) ou nao controlado (defaultValue). minDate/maxDate limitam o calendario.

### Input
Campo de texto com rotulo flutuante opcional e linha de foco que preenche do centro pros lados, com cor configuravel.

import { Input } from '@dilis/ui';

Props:
- `label`: string - Rotulo do campo. Com floatingLabel, vira o placeholder que sobe.
- `floatingLabel`: boolean (padrao false) - Ativa o rotulo flutuante (sobe e encolhe ao focar/preencher).
- `inputSize`: 'sm' | 'md' | 'lg' (padrao md) - Tamanho do campo.
- `accentColor`: string (padrao var(--dui-color-primary-500)) - Cor da linha de foco. Aceita qualquer cor CSS ou token.
- `error`: string - Mensagem de erro. Deixa a linha vermelha e mostra o texto.
- `hint`: string - Texto de ajuda abaixo do campo.

Exemplos:

<!-- Basico -->
```tsx
<Input label="Nome" placeholder="Digite seu nome" />
```

<!-- Label flutuante -->
```tsx
<Input label="Email" floatingLabel />
```

<!-- Cor da linha customizada -->
```tsx
<Input label="Senha" floatingLabel accentColor="#e4123b" type="password" />
```

Notas:
- Herda todos os atributos de <input> (type, value, onChange, aria-*).
- floatingLabel so tem efeito quando label e passado.
- A linha de foco preenche do centro pros lados; a cor vem de accentColor.

### SearchInput
Autocomplete generico. Recebe a funcao de busca por fora (sync ou async), mostra um dropdown de resultados e devolve o item escolhido em onSelect.

import { SearchInput } from '@dilis/ui';

Props:
- `fetchOptions`: (query: string) => T[] | Promise<T[]> (obrigatoria) - Funcao externa que busca os resultados. Sync ou async.
- `getOptionLabel`: (item: T) => string (obrigatoria) - Extrai o texto exibido e o que vai pro input ao selecionar.
- `getOptionKey`: (item: T) => string | number - Chave unica de cada item. Padrao: o proprio label.
- `onSelect`: (item: T) => void - Chamado ao escolher um item do dropdown.
- `renderOption`: (item: T) => ReactNode - Render custom de cada opcao. Padrao: so o label.
- `minChars`: number (padrao 1) - Minimo de caracteres pra disparar a busca.
- `debounceMs`: number (padrao 300) - Debounce entre digitar e buscar.
- `floatingLabel`: boolean (padrao false) - Ativa o rotulo flutuante (precisa de label).
- `accentColor`: string (padrao var(--dui-color-primary-500)) - Cor da linha de foco e do item ativo.

Exemplos:

<!-- Com tipo proprio (T = Localidade) -->
```tsx
<SearchInput<Localidade>
  label="Estado ou cidade"
  floatingLabel
  fetchOptions={buscarLocalidades}
  getOptionLabel={(l) => l.nome}
  onSelect={setLocal}
/>
```

<!-- Funcao sync com string -->
```tsx
<SearchInput<string>
  placeholder="Buscar fruta"
  fetchOptions={(q) => frutas.filter((f) => f.includes(q))}
  getOptionLabel={(f) => f}
/>
```

Notas:
- Generico em T: o tipo do item vem de fetchOptions/getOptionLabel.
- fetchOptions pode ser async; respostas fora de ordem sao descartadas.
- Teclado: setas navegam, Enter seleciona, Esc fecha. Roles ARIA de combobox.

### Select
Select generico com dropdown customizado, rotulo flutuante opcional e a mesma linha de foco do Input. Controlado ou nao controlado.

import { Select } from '@dilis/ui';

Props:
- `options`: T[] (obrigatoria) - Lista de opcoes.
- `getOptionLabel`: (item: T) => string (obrigatoria) - Extrai o texto exibido de cada opcao.
- `value`: T | null - Opcao selecionada (controlado).
- `onChange`: (item: T) => void - Chamado ao escolher uma opcao.
- `getOptionValue`: (item: T) => string | number - Chave unica de cada opcao. Padrao: o proprio label.
- `renderOption`: (item: T) => ReactNode - Render custom de cada opcao.
- `placeholder`: string (padrao Selecione) - Texto quando nada esta selecionado.
- `floatingLabel`: boolean (padrao false) - Ativa o rotulo flutuante (precisa de label).
- `selectSize`: 'sm' | 'md' | 'lg' (padrao md) - Tamanho do campo.
- `accentColor`: string (padrao var(--dui-color-primary-500)) - Cor da linha de foco e do item ativo.
- `error`: string - Mensagem de erro. Deixa a linha vermelha.

Exemplos:

<!-- String simples -->
```tsx
<Select<string>
  label="UF"
  options={['PB', 'PE', 'RN']}
  getOptionLabel={(uf) => uf}
  onChange={setUf}
/>
```

<!-- Objeto com label e valor -->
```tsx
<Select<Cargo>
  label="Cargo"
  floatingLabel
  options={cargos}
  getOptionLabel={(c) => c.nome}
  getOptionValue={(c) => c.id}
  onChange={setCargo}
/>
```

Notas:
- Generico em T; o tipo vem de options/getOptionLabel.
- Gatilho e um button (nao <select> nativo). Teclado: setas, Enter/Espaco, Esc, Home/End.
- Roles ARIA de combobox + listbox; item selecionado marcado com check.

### Table
Tabela generica com colunas configuraveis. Variantes por prop: acordeon (expandable) e paginacao (pageSize). Controlada ou nao controlada.

import { Table } from '@dilis/ui';

Props:
- `data`: T[] (obrigatoria) - Linhas da tabela.
- `columns`: TableColumn<T>[] (obrigatoria) - Colunas. Cada uma tem id, header e cell (item) => ReactNode.
- `getRowKey`: (item: T, index: number) => string | number (obrigatoria) - Chave unica de cada linha.
- `expandable`: boolean (padrao false) - Liga o acordeon: cada linha expande mostrando renderExpanded.
- `renderExpanded`: (item: T) => ReactNode - Conteudo exibido ao expandir a linha (so com expandable).
- `pageSize`: number - Liga a paginacao com N linhas por pagina.
- `page`: number - Pagina atual (1-based) controlada.
- `onPageChange`: (page: number) => void - Chamado ao trocar de pagina.
- `size`: 'sm' | 'md' | 'lg' (padrao md) - Tamanho das celulas.
- `accentColor`: string (padrao var(--dui-color-primary-500)) - Cor da pagina ativa e do indicador de expansao.

Exemplos:

<!-- Sem acordeon, paginada -->
```tsx
<Table<Pessoa>
  data={pessoas}
  getRowKey={(p) => p.id}
  pageSize={5}
  columns={[
    { id: 'nome', header: 'Nome', cell: (p) => p.nome },
    { id: 'cargo', header: 'Cargo', cell: (p) => p.cargo },
  ]}
/>
```

<!-- Com acordeon -->
```tsx
<Table<Pessoa>
  data={pessoas}
  getRowKey={(p) => p.id}
  expandable
  renderExpanded={(p) => <div>Email: {p.email}</div>}
  columns={colunas}
/>
```

Notas:
- Generica em T; o conteudo de cada celula vem de column.cell(item).
- expandable e pageSize sao independentes: da pra usar juntos ou separados.
- Paginacao controlada (page + onPageChange) ou automatica (so pageSize).

### Text
Sistema tipografico completo. Uma variante pra cada estilo (display, h1-h6, body, caption, overline, code), com peso, cor, alinhamento e truncate, tudo em tokens.

import { Text } from '@dilis/ui';

Props:
- `variant`: 'display' | 'h1'..'h6' | 'body' | 'body-sm' | 'caption' | 'overline' | 'code' (padrao body) - Estilo tipografico. Define tamanho, peso e a tag HTML padrao.
- `as`: ElementType - Troca a tag HTML renderizada (ex: usar h2 com estilo de h1).
- `weight`: 'light' | 'regular' | 'medium' | 'bold' | 'black' - Sobrescreve o peso da variante.
- `color`: 'default' | 'muted' | 'subtle' | 'primary' | 'success' | 'warning' | 'danger' | 'inherit' (padrao default) - Cor semantica do texto.
- `align`: 'left' | 'center' | 'right' - Alinhamento do texto.
- `truncate`: boolean (padrao false) - Corta em uma linha com reticencias.

Exemplos:

<!-- Titulo e paragrafo -->
```tsx
<Text variant="h1">Titulo da pagina</Text>
<Text variant="body" color="muted">Subtitulo em cinza.</Text>
```

<!-- Trocar a tag mantendo o estilo -->
```tsx
<Text variant="h1" as="h2">Parece h1, mas e um h2 no HTML</Text>
```

<!-- Overline e code -->
```tsx
<Text variant="overline">Secao</Text>
<Text variant="code">npm install</Text>
```

Notas:
- A tag HTML sai da variante (h1 => h1, body => p) e pode ser trocada com as.
- variant define tamanho/peso; weight e color sobrescrevem quando preciso.
- Herda os atributos do elemento (onClick, id, aria-*).
