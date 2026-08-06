/**
 * Cria um componente novo ja no formato da lib, com os 5 arquivos:
 * types, css, tsx, index e MANIFEST. Registra no barril de componentes.
 * Assim e impossivel esquecer o manifest.
 *
 * Uso: npm run new:component -- <Nome>
 * Ex:  npm run new:component -- Card
 */
import {
  existsSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const rawName = process.argv[2];
if (!rawName || !/^[A-Z][A-Za-z0-9]+$/.test(rawName)) {
  console.error('Nome invalido. Use PascalCase. Ex: npm run new:component -- Card');
  process.exit(1);
}

const Name = rawName;
const lower = Name.charAt(0).toLowerCase() + Name.slice(1); // cardManifest
const cls = Name.toLowerCase(); // classe base .dui-card (encurte se quiser)

const dir = join(root, 'src', 'components', Name);
if (existsSync(dir)) {
  console.error(`Ja existe src/components/${Name}. Abortei pra nao sobrescrever.`);
  process.exit(1);
}
mkdirSync(dir, { recursive: true });

const files: Record<string, string> = {
  [`${Name}.types.ts`]: `import type { HTMLAttributes, ReactNode } from 'react';

export type ${Name}Variant = 'primary' | 'neutral';

// Troque HTMLDivElement/HTMLAttributes<HTMLDivElement> pelo elemento certo.
export interface ${Name}Props extends HTMLAttributes<HTMLDivElement> {
  /** Estilo visual. Padrao: primary. */
  variant?: ${Name}Variant;
  /** Classe extra. Entra por ultimo, entao sobrescreve o estilo base. */
  className?: string;
  children?: ReactNode;
}
`,

  [`${Name}.css`]: `.dui-${cls} {
  font-family: var(--dui-font-base);
  color: var(--dui-color-neutral-800);
}
.dui-${cls}--primary {
  color: var(--dui-color-primary-600);
}
.dui-${cls}--neutral {
  color: var(--dui-color-neutral-600);
}
`,

  [`${Name}.tsx`]: `import { forwardRef, memo } from 'react';
import { cn } from '../../utils/cn';
import type { ${Name}Props } from './${Name}.types';
import './${Name}.css';

const ${Name}Base = forwardRef<HTMLDivElement, ${Name}Props>(function ${Name}(
  { variant = 'primary', className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('dui-${cls}', \`dui-${cls}--\${variant}\`, className)}
      {...rest}
    >
      {children}
    </div>
  );
});

export const ${Name} = memo(${Name}Base);
${Name}.displayName = '${Name}';
`,

  [`index.ts`]: `export { ${Name} } from './${Name}';
export type { ${Name}Props, ${Name}Variant } from './${Name}.types';
`,

  [`${Name}.manifest.ts`]: `import type { ComponentManifest } from '../../meta/manifest.types';

export const ${lower}Manifest: ComponentManifest = {
  name: '${Name}',
  group: 'Componentes',
  summary: 'TODO: uma frase do que o ${Name} faz.',
  import: "import { ${Name} } from '@dilis/ui';",
  props: [
    {
      name: 'variant',
      type: "'primary' | 'neutral'",
      default: 'primary',
      description: 'TODO: descreva a prop.',
    },
  ],
  examples: [
    {
      title: 'Basico',
      code: '<${Name} variant="primary">conteudo</${Name}>',
    },
  ],
};

export default ${lower}Manifest;
`,
};

for (const [file, content] of Object.entries(files)) {
  writeFileSync(join(dir, file), content, 'utf8');
}

// registra no barril de componentes (sem duplicar)
const barrel = join(root, 'src', 'components', 'index.ts');
const current = readFileSync(barrel, 'utf8');
const line = `export * from './${Name}';`;
if (!current.includes(line)) {
  writeFileSync(barrel, current.trimEnd() + '\n' + line + '\n', 'utf8');
}

console.log(`Componente ${Name} criado em src/components/${Name}/`);
console.log('Feito:');
console.log('  - 5 arquivos (types, css, tsx, index, manifest)');
console.log('  - export adicionado em src/components/index.ts');
console.log('');
console.log('Falta so o preview visual na mural (opcional, mas recomendado):');
console.log(`  1. crie demo/views/${Name}View.tsx`);
console.log(`  2. registre em demo/mural/registry.ts`);
console.log('A aba "Para IA" e o agent.md ja incluem o componente automaticamente.');
