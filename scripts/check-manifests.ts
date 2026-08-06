/**
 * Valida que TODO componente da lib tem um manifest bem formado.
 *
 * Roda no build (antes do resto). Se um componente estiver sem `.manifest.ts`,
 * ou com o manifest incompleto, o processo falha com mensagem clara. E a
 * garantia mecanica de que a doc para agentes nunca fica furada.
 *
 * Uso: tsx scripts/check-manifests.ts
 */
import { readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { ComponentManifest } from '../src/meta/manifest.types';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = join(root, 'src', 'components');

/** Pega o manifest exportado (default ou nomeado) de um modulo importado. */
function pickManifest(mod: Record<string, unknown>): ComponentManifest | undefined {
  const candidate =
    (mod.default as ComponentManifest | undefined) ??
    (Object.values(mod).find(
      (v) => v && typeof v === 'object' && 'name' in (v as object),
    ) as ComponentManifest | undefined);
  return candidate;
}

async function main() {
  const problems: string[] = [];

  for (const name of readdirSync(componentsDir)) {
    const full = join(componentsDir, name);
    if (!statSync(full).isDirectory()) continue; // ignora index.ts

    const files = readdirSync(full);
    const isComponent = files.some(
      (f) => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'),
    );
    if (!isComponent) continue; // pasta sem componente, ignora

    const manifestFile = files.find((f) => f.endsWith('.manifest.ts'));
    if (!manifestFile) {
      problems.push(`[${name}] falta o arquivo ${name}.manifest.ts`);
      continue;
    }

    const mod = await import(pathToFileURL(join(full, manifestFile)).href);
    const m = pickManifest(mod);
    if (!m) {
      problems.push(`[${name}] o manifest nao exporta um ComponentManifest`);
      continue;
    }
    if (!m.name) problems.push(`[${name}] manifest sem 'name'`);
    if (!m.summary) problems.push(`[${name}] manifest sem 'summary'`);
    if (!m.import) problems.push(`[${name}] manifest sem 'import'`);
    if (!m.examples || m.examples.length === 0)
      problems.push(`[${name}] manifest precisa de ao menos 1 exemplo`);
  }

  if (problems.length > 0) {
    console.error('Manifests com problema:');
    for (const p of problems) console.error(`  - ${p}`);
    console.error(
      '\nCada componente precisa de um <Nome>.manifest.ts valido. ' +
        'Rode "npm run new:component -- <Nome>" pra criar ja no formato certo.',
    );
    process.exit(1);
  }

  console.log('OK: todos os componentes tem manifest valido.');
}

main().catch((err) => {
  console.error('Falha ao validar manifests:', err);
  process.exit(1);
});
