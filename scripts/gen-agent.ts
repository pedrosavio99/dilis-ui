/**
 * Gera o guia de uso para agentes (agent.md) a partir dos manifests dos
 * componentes. Roda no build. Varre src/components procurando *.manifest.ts,
 * importa cada um, e usa o mesmo buildAgentDoc da lib. Fonte unica, zero
 * duplicacao de logica.
 *
 * Uso: tsx scripts/gen-agent.ts
 */
import {
  readdirSync,
  statSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readFileSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { buildAgentDoc } from '../src/meta/buildAgentDoc';
import type { ComponentManifest } from '../src/meta/manifest.types';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = join(root, 'src', 'components');

/** Anda recursivamente atras de arquivos *.manifest.ts. */
function findManifests(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...findManifests(full));
    else if (name.endsWith('.manifest.ts')) out.push(full);
  }
  return out;
}

async function main() {
  const files = findManifests(componentsDir);
  const manifests: ComponentManifest[] = [];

  for (const file of files) {
    const mod = await import(pathToFileURL(file).href);
    const manifest: ComponentManifest | undefined =
      mod.default ??
      Object.values(mod).find(
        (v) => v && typeof v === 'object' && 'name' in (v as object),
      );
    if (manifest) manifests.push(manifest);
  }

  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  const doc = buildAgentDoc(manifests, { version: pkg.version });

  const targets = [join(root, 'public', 'agent.md'), join(root, 'dist', 'AGENT.md')];
  for (const target of targets) {
    const dir = dirname(target);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(target, doc, 'utf8');
    console.log(`agent.md gerado: ${target} (${manifests.length} componentes)`);
  }
}

main().catch((err) => {
  console.error('Falha ao gerar agent.md:', err);
  process.exit(1);
});
