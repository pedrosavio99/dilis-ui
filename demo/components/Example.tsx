import type { ReactNode } from 'react';
import { CodeBlock } from './CodeBlock';

interface ExampleProps {
  /** Titulo do exemplo. */
  title?: string;
  /** Codigo que sera exibido e copiado (o snippet de uso). */
  code: string;
  /** O componente renderizado ao vivo. */
  children: ReactNode;
  /** Centraliza o preview (bom pra logos e itens unicos). */
  center?: boolean;
  /** Fundo escuro no preview (pra ver versao negativa). */
  dark?: boolean;
}

/**
 * Bloco padrao de documentacao da mural.
 * Mostra o componente funcionando em cima e o codigo pronto pra copiar
 * embaixo, entao o dev nao precisa abrir o codigo fonte pra usar.
 */
export function Example({
  title,
  code,
  children,
  center = false,
  dark = false,
}: ExampleProps) {
  return (
    <section className="example">
      {title ? <h3 className="block__title">{title}</h3> : null}
      <div
        className={
          'example__preview' +
          (center ? ' example__preview--center' : '') +
          (dark ? ' example__preview--dark' : '')
        }
      >
        {children}
      </div>
      <CodeBlock code={code} />
    </section>
  );
}