import type { ComponentManifest, ManifestProp } from './manifest.types';

export interface AgentDocOptions {
  /** Nome do pacote no import. Padrao: '@dilis/ui'. */
  packageName?: string;
  /** Versao da lib, exibida no cabecalho. */
  version?: string;
  /** Import do CSS. Padrao: "import '@dilis/ui/styles.css';". */
  stylesImport?: string;
}

/** Ordena por grupo (mantendo Componentes por ultimo) e depois por nome. */
function sortManifests(list: ComponentManifest[]): ComponentManifest[] {
  const groupWeight = (g: string) => (g === 'Marca' ? 0 : g === 'Componentes' ? 2 : 1);
  return [...list].sort((a, b) => {
    const ga = a.group ?? 'Componentes';
    const gb = b.group ?? 'Componentes';
    if (ga !== gb) return groupWeight(ga) - groupWeight(gb);
    return a.name.localeCompare(b.name);
  });
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
    `lib por este guia, sem abrir o codigo fonte. ${manifests.length} componente(s) documentado(s).`,
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

  const blocks = sortManifests(manifests).map(componentBlock);

  return [header, '', '## Componentes', '', blocks.join('\n\n')].join('\n') + '\n';
}
