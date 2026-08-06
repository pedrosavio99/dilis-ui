import type { SVGProps, ReactNode } from 'react';

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  /** Tamanho (largura e altura) em px. Padrao: 24. */
  size?: number | string;
  /** viewBox do desenho. Padrao: 0 0 24 24. */
  viewBox?: string;
  /** Cor. Padrao: herda do texto (currentColor). */
  color?: string;
  /**
   * Texto acessivel. Se presente, o icone vira role="img" com label.
   * Se ausente, fica aria-hidden (decorativo).
   */
  label?: string;
  /** Conteudo do SVG (paths, etc). Use fill/stroke = currentColor. */
  children: ReactNode;
  className?: string;
}