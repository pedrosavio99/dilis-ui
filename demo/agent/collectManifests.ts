import type { ComponentManifest } from '@dilis/ui';

/**
 * Coleta TODOS os manifests da lib automaticamente.
 *
 * O glob varre src/components e src/foundation em tempo de build do Vite.
 * Criou um componente novo com seu `.manifest.ts`? Ele aparece aqui sozinho,
 * sem editar lista nenhuma. Essa e a garantia de que a doc nunca desatualiza.
 */
const modules = import.meta.glob<{ default?: ComponentManifest }>(
  ['../../src/components/**/*.manifest.ts', '../../src/foundation/**/*.manifest.ts'],
  { eager: true },
);

export function collectManifests(): ComponentManifest[] {
  const list: ComponentManifest[] = [];
  for (const mod of Object.values(modules)) {
    const manifest =
      mod.default ??
      (Object.values(mod).find(
        (v) => v && typeof v === 'object' && 'name' in (v as object),
      ) as ComponentManifest | undefined);
    if (manifest) list.push(manifest);
  }
  return list;
}
