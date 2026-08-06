export type ClassValue = string | number | null | false | undefined;

/**
 * Junta classes ignorando valores falsy.
 *
 * A classe da lib entra primeiro e a className do usuario entra por
 * ultimo, de proposito: assim as utilities do Tailwind (que vem depois
 * no CSS final) conseguem sobrescrever o estilo base do componente.
 *
 * @example cn('dui-btn', isPrimary && 'dui-btn--primary', className)
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
