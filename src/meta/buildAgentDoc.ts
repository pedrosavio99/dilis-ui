import type { ComponentManifest, ManifestProp } from './manifest.types';

export interface AgentDocOptions {
  /** Nome do pacote no import. Padrao: '@dilis/ui'. */
  packageName?: string;
  /** Versao da lib, exibida no cabecalho. */
  version?: string;
  /** Import do CSS. Padrao: "import '@dilis/ui/styles.css';". */
  stylesImport?: string;
}

/** Peso de ordenacao de cada grupo: Marca, Fundacao, outros, Componentes. */
function groupWeight(g: string): number {
  if (g === 'Marca') return 0;
  if (g === 'Fundacao') return 1;
  if (g === 'Componentes') return 3;
  return 2;
}

/**
 * Agrupa os manifests por grupo e devolve as secoes ja ordenadas
 * (Marca, Fundacao, ..., Componentes), com os itens de cada secao por nome.
 */
function groupSections(list: ComponentManifest[]): [string, ComponentManifest[]][] {
  const map = new Map<string, ComponentManifest[]>();
  for (const m of list) {
    const g = m.group ?? 'Componentes';
    const arr = map.get(g) ?? [];
    arr.push(m);
    map.set(g, arr);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => groupWeight(a) - groupWeight(b))
    .map(([group, items]) => [
      group,
      [...items].sort((x, y) => x.name.localeCompare(y.name)),
    ]);
}

function propLine(p: ManifestProp): string {
  const def = p.default ? ` (padrao ${p.default})` : '';
  const req = p.required ? ' (obrigatoria)' : '';
  return `- \`${p.name}\`: ${p.type}${def}${req} - ${p.description}`;
}

function componentBlock(m: ComponentManifest): string {
  const out: string[] = [`### ${m.name}`, m.summary, '', m.import];

  if (m.props?.length) {
    out.push('', 'Props:');
    for (const p of m.props) out.push(propLine(p));
  }

  out.push('', 'Exemplos:');
  for (const ex of m.examples) {
    out.push('', `<!-- ${ex.title} -->`, '```tsx', ex.code, '```');
  }

  if (m.notes?.length) {
    out.push('', 'Notas:');
    for (const n of m.notes) out.push(`- ${n}`);
  }

  return out.join('\n');
}

/**
 * Monta o guia de uso para agentes a partir dos manifests coletados.
 * Saida enxuta em markdown: regras globais uma vez so, e por componente
 * apenas o essencial pra usar sem abrir o codigo fonte.
 */
export function buildAgentDoc(
  manifests: ComponentManifest[],
  options: AgentDocOptions = {},
): string {
  const pkg = options.packageName ?? '@dilis/ui';
  const stylesImport = options.stylesImport ?? `import '${pkg}/styles.css';`;
  const version = options.version ? ` v${options.version}` : '';

  const header = [
    `# Dilis UI${version} - guia de uso para agentes`,
    '',
    `Biblioteca React de componentes em CSS puro com tokens da marca. Consuma a`,
    `lib por este guia, sem abrir o codigo fonte. ${manifests.length} item(ns) documentado(s).`,
    '',
    '## Regras globais',
    `- Importe o CSS uma unica vez no entry do app: \`${stylesImport}\``,
    `- Importe componentes do pacote: \`import { Button } from '${pkg}';\``,
    '- Todo componente aceita `className`, que entra por ultimo e sobrescreve o',
    '  estilo base sem `!important` (compativel com utilities do Tailwind).',
    '- Nao reescreva o CSS interno. Ajuste por `className` ou trocando as',
    '  variaveis de token `--dui-*` no `:root` do projeto.',
    '- Props nativas do elemento sao repassadas (onClick, aria-*, ref, etc).',
    '- Tokens em runtime: `import { theme } from \'' + pkg + '\'` (ex: `theme.colors.primary[500]`).',
  ].join('\n');

  const sections = groupSections(manifests).map(([group, items]) =>
    [`## ${group}`, '', items.map(componentBlock).join('\n\n')].join('\n'),
  );

  return [header, '', sections.join('\n\n')].join('\n') + '\n';
}
