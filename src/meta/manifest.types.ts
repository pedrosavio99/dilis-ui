/**
 * Contrato de documentacao de um componente da lib.
 *
 * Cada componente co-loca um arquivo `<Nome>.manifest.ts` exportando um objeto
 * deste tipo. Ele e a fonte unica da doc de USO (para quem consome a lib), e e
 * coletado automaticamente para montar o guia do agente. Mantenha curto: o
 * objetivo e dar ao agente o minimo necessario pra usar certo gastando o minimo
 * de token.
 */

export interface ManifestProp {
  /** Nome da prop, ex: 'variant'. */
  name: string;
  /** Tipo em texto, ex: "'primary' | 'secondary'" ou 'boolean'. */
  type: string;
  /** Valor padrao, se houver. */
  default?: string;
  /** Marca a prop como obrigatoria. */
  required?: boolean;
  /** Uma linha curta do que faz. */
  description: string;
}

export interface ManifestExample {
  /** Titulo curto do exemplo. */
  title: string;
  /** Codigo exato, pronto pra copiar. */
  code: string;
}

export interface ComponentManifest {
  /** Nome do componente, ex: 'Button'. */
  name: string;
  /** Grupo na doc. Padrao: 'Componentes'. */
  group?: string;
  /** Uma frase do que o componente faz. */
  summary: string;
  /** Import pronto, ex: "import { Button } from '@dilis/ui';". */
  import: string;
  /** Props publicas relevantes (nao precisa listar todas as nativas). */
  props?: ManifestProp[];
  /** Exemplos minimos e canonicos. 2 ou 3 bastam. */
  examples: ManifestExample[];
  /** Pegadinhas ou regras especificas do componente. */
  notes?: string[];
}
